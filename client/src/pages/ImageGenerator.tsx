import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      
      <main className="flex-1 container max-w-5xl py-12 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-primary">
          AI Image Generator
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Create unique images from text prompts using OpenAI's DALL-E 3 model
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Generation Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Create New Image</h2>
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
                          placeholder="Describe the image you want to generate..."
                          className="resize-none min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Image'
                  )}
                </Button>
              </form>
            </Form>
          </Card>
          
          {/* Generated Image Display */}
          <Card className="flex flex-col justify-center items-center">
            <CardContent className="p-6 w-full h-full flex flex-col justify-center items-center">
              {generatedImage ? (
                <div className="space-y-4 w-full">
                  <h2 className="text-2xl font-semibold">Your Generated Image</h2>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                    <img 
                      src={generatedImage} 
                      alt="Generated AI image" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open(generatedImage, '_blank')}
                    >
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  {isPending ? (
                    <div className="flex flex-col items-center space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p>Creating your image...</p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-2">No image generated yet</p>
                      <p className="text-sm">Your generated image will appear here</p>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Generations */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Recent Generations</h2>
          
          {isLoadingGenerations ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentGenerations?.data && recentGenerations.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recentGenerations.data.map((item: ImageGeneration) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={item.imageUrl} 
                      alt={`Generated from: ${item.prompt}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm line-clamp-2 text-muted-foreground">
                      {item.prompt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/40">
              <p className="text-muted-foreground">No generations found. Create your first image!</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}