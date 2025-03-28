import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Download, ExternalLink, Image as ImageIcon, Zap, Brain } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

// Form validation schema
const formSchema = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters long"),
  model: z.string().default('gpt-4o')
});

// API response type
interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    prompt: string;
    imageUrl: string;
    model: string;
    createdAt: string;
  };
}

// Image generation type
interface ImageGeneration {
  id: number;
  prompt: string;
  imageUrl: string;
  model: string;
  createdAt: string;
}

type FormValues = z.infer<typeof formSchema>;

export default function ImageGenerator() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      model: 'gpt-4o'
    }
  });

  // Fetch recent image generations
  const { data: recentGenerations, isLoading: isLoadingGenerations } = useQuery<{
    success: boolean;
    data: ImageGeneration[];
  }>({
    queryKey: ['/api/image-generations/recent/5'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Image generation mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      return await response.json() as ApiResponse;
    },
    onSuccess: (response) => {
      // Update the generated image
      setGeneratedImage(response.data.imageUrl);
      
      // Show success toast
      toast({
        title: 'Image Generated!',
        description: 'Your image has been generated successfully.',
      });
      
      // Reset form
      form.reset();
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/image-generations/recent/5'] });
    },
    onError: (error) => {
      console.error('Error generating image:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate image. Please try again.',
        variant: 'destructive'
      });
    }
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    setGeneratedImage(null);
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="absolute inset-0 bg-grid-small-white/10 [mask-image:radial-gradient(white,transparent_85%)]"></div>
        <div className="container relative z-10 max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium bg-primary/10 border-primary/20">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
              Powered by OpenAI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              AI Image Generator
            </h1>
            <p className="text-xl max-w-2xl text-muted-foreground mb-8 leading-relaxed">
              Transform your ideas into stunning visuals using OpenAI's cutting-edge DALL-E 3 model, enhanced by GPT-4o
            </p>
            <div className="flex gap-3 animate-in fade-in duration-700">
              <Button size="lg" className="gap-2 rounded-full" onClick={() => document.getElementById('create-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                <Zap className="h-4 w-4" />
                Start Creating
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full" onClick={() => document.getElementById('examples-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                <ImageIcon className="h-4 w-4" />
                See Examples
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-16 bg-background">
        {/* Features section */}
        <section className="container max-w-6xl px-4 md:px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border bg-background shadow-sm">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Advanced Prompt Enhancement</CardTitle>
                <CardDescription>
                  GPT-4o analyzes and enhances your prompts to produce the best possible images
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border bg-background shadow-sm">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>High Resolution Images</CardTitle>
                <CardDescription>
                  Create beautiful 1024×1024 images with incredible detail and visual fidelity
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border bg-background shadow-sm">
              <CardHeader>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fast Generation</CardTitle>
                <CardDescription>
                  Images are generated in seconds and saved to your generation history
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
        
        {/* Create section */}
        <section id="create-section" className="container max-w-6xl px-4 md:px-6 mb-24">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold">Create Your Image</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Describe what you want to see, and our AI will generate a custom image just for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Generation Form */}
            <Card className="border shadow-sm bg-background relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-small-white/5 [mask-image:radial-gradient(white,transparent_95%)]"></div>
              <CardHeader className="relative z-10">
                <CardTitle>Enter Your Prompt</CardTitle>
                <CardDescription>
                  Be descriptive for the best results. Try including details about style, colors, and composition.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Prompt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="An astronaut riding a horse on Mars, cinematic lighting, detailed, 8k..."
                              className="resize-none min-h-[180px] bg-background/60"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your prompt will be enhanced by GPT-4o for better results
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full gap-2 font-medium"
                      size="lg"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating Your Image...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Generated Image Display */}
            <Card className="border shadow-sm bg-background overflow-hidden">
              <CardHeader>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  {generatedImage 
                    ? "Your image has been created! You can save or share it."
                    : "Your generated image will appear here"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 border-t">
                {generatedImage ? (
                  <div className="relative aspect-square w-full overflow-hidden">
                    <img 
                      src={generatedImage} 
                      alt="Generated AI image" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center bg-muted/20 text-center h-[400px]">
                    {isPending ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-primary">Creating your masterpiece...</p>
                          <p className="text-sm text-muted-foreground max-w-xs px-4">
                            This typically takes 5-10 seconds as we enhance your prompt and generate the image
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="h-20 w-20 rounded-full bg-muted/40 flex items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
                        </div>
                        <div>
                          <p className="font-medium">No image generated yet</p>
                          <p className="text-sm text-muted-foreground max-w-xs px-4">
                            Enter a descriptive prompt and click "Generate Image" to create your first image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {generatedImage && (
                <CardFooter className="px-6 py-4 flex justify-between gap-4 bg-muted/10">
                  <div className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>DALL-E 3 + GPT-4o</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = generatedImage;
                        a.download = `ai-image-${Date.now()}.png`;
                        a.click();
                      }}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Save</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => window.open(generatedImage, '_blank')}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Open</span>
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </section>
        
        {/* Recent Generations */}
        <section id="examples-section" className="container max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold">Recent Creations</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Browse through the gallery of recently generated images
            </p>
          </div>
          
          {isLoadingGenerations ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading recent generations...</p>
              </div>
            </div>
          ) : recentGenerations?.data && recentGenerations.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentGenerations.data.map((item: ImageGeneration) => (
                <Card key={item.id} className="overflow-hidden group border shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="aspect-square relative bg-muted/20 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={`Generated from: ${item.prompt}`}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                  </div>
                  <CardFooter className="py-3 px-4 flex justify-between">
                    <Badge variant="secondary" className="h-6">
                      <Sparkles className="h-3 w-3 mr-1" />
                      DALL-E 3
                    </Badge>
                    <time className="text-xs text-muted-foreground" dateTime={item.createdAt}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </time>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-lg border border-dashed">
              <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-lg font-medium mb-1">No images yet</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Get started by generating your first image! Enter a prompt above and click "Generate Image".
              </p>
              <Button 
                onClick={() => document.getElementById('create-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Create Your First Image
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}