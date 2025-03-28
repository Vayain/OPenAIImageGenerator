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
      
      <div className="border-b bg-background">
        <div className="container px-4 md:px-6 py-20 flex flex-col items-center">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Powered by OpenAI
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-4 max-w-3xl">
            Generate images from text with AI
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-[42rem]">
            Transform your ideas into stunning visuals using OpenAI's DALL-E 3 model with GPT-4o prompt enhancement
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="gap-2" 
              onClick={() => document.getElementById('create-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <Zap className="h-4 w-4" />
              Start Creating
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2" 
              onClick={() => document.getElementById('examples-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <ImageIcon className="h-4 w-4" />
              View Examples
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-16 bg-background">
        {/* Features section */}
        <section className="container px-4 md:px-6 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Brain className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Prompt Enhancement</CardTitle>
                <CardDescription>
                  GPT-4o analyzes and enhances your text prompts for better image generation results.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <ImageIcon className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>High Resolution</CardTitle>
                <CardDescription>
                  Create detailed 1024×1024 images with DALL-E 3's advanced image generation capabilities.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Fast Generation</CardTitle>
                <CardDescription>
                  Images are generated quickly and automatically saved to your generation history.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
        
        {/* Create section */}
        <section id="create-section" className="container px-4 md:px-6 mb-24">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold mb-2">Create an Image</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              Enter a detailed description and let AI generate a unique image for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Generation Form */}
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Prompt</CardTitle>
                <CardDescription>
                  Be descriptive about style, lighting, and composition for better results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prompt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="An astronaut riding a horse on Mars, cinematic lighting, detailed, 8k..."
                              className="resize-none min-h-[180px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your prompt will be enhanced by GPT-4o for better results.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full gap-2"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
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
            <Card>
              <CardHeader>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  {generatedImage 
                    ? "Your image has been created. You can download or view it."
                    : "Your generated image will appear here."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                {generatedImage ? (
                  <div className="relative aspect-square w-full overflow-hidden border rounded-md">
                    <img 
                      src={generatedImage} 
                      alt="Generated AI image" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center bg-muted/10 text-center rounded-md border h-[320px]">
                    {isPending ? (
                      <div className="space-y-3">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
                        <div>
                          <p className="font-medium text-sm">Generating image...</p>
                          <p className="text-xs text-muted-foreground max-w-xs px-4 mt-1">
                            This usually takes 5-10 seconds
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                        <div>
                          <p className="text-sm font-medium">No image generated</p>
                          <p className="text-xs text-muted-foreground max-w-xs px-4 mt-1">
                            Enter a prompt and click "Generate Image"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {generatedImage && (
                <CardFooter className="flex justify-between gap-4 mt-4">
                  <div className="text-xs text-muted-foreground">
                    <Badge variant="secondary" className="gap-1 text-xs h-5 px-2">
                      <Sparkles className="h-3 w-3" />
                      DALL-E 3
                    </Badge>
                  </div>
                  <div className="flex gap-2">
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
                      <span>Download</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => window.open(generatedImage, '_blank')}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </section>
        
        {/* Recent Generations */}
        <section id="examples-section" className="container px-4 md:px-6 mb-20">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Recent Creations</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              Explore our gallery of recently generated AI images
            </p>
          </div>
          
          {isLoadingGenerations ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Loading gallery...</p>
              </div>
            </div>
          ) : recentGenerations?.data && recentGenerations.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentGenerations.data.map((item: ImageGeneration) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="aspect-square relative bg-muted/5 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={`AI generated image: ${item.prompt.substring(0, 30)}...`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                      <p className="text-white text-sm line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                  </div>
                  <CardFooter className="py-2 px-3 flex justify-between">
                    <Badge variant="secondary" className="text-xs h-5 px-2">
                      <span className="sr-only">Model:</span>
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
            <div className="flex flex-col items-center justify-center py-16 border rounded-lg">
              <div className="mb-4 text-muted-foreground">
                <ImageIcon className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-medium mb-1">No images yet</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Generate your first image to start building your collection.
              </p>
              <Button 
                onClick={() => document.getElementById('create-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                variant="outline"
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