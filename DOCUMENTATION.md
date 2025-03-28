# AI Image Generator - Technical Documentation

This document provides detailed technical information about the implementation of the AI Image Generator application.

## Architecture Overview

The application follows a modern full-stack architecture with clear separation of concerns:

### Frontend (React + TypeScript)
- Built with Vite for fast development and optimized production builds
- Utilizes shadcn/ui components and Tailwind CSS for styling
- React Query for data fetching and state management
- React Hook Form for form handling and validation

### Backend (Express.js + Node.js)
- RESTful API endpoints for image generation and data management
- Service-oriented architecture with separation of OpenAI API interactions
- Storage interface for database operations

### Database (PostgreSQL)
- Relational database for storing image generation history
- Drizzle ORM for type-safe database access
- Database schema defined in shared TypeScript types

## Key Components

### Database Schema (`shared/schema.ts`)

The database schema defines two main entities:

1. **Users** - For potential future authentication features
2. **Image Generations** - Stores generated images with their prompts and metadata

```typescript
export const imageGenerations = pgTable("image_generations", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  enhancedPrompt: text("enhanced_prompt"),
  model: text("model").notNull().default("dall-e-3"),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### Storage Layer (`server/storage.ts`)

The PostgreSQL storage implementation provides methods for:
- Creating new image generation records
- Retrieving all or recent image generations
- Finding specific image generations by ID

```typescript
export class PostgresStorage implements IStorage {
  // Image generation operations
  async createImageGeneration(generation: InsertImageGeneration & { imageUrl: string }): Promise<ImageGeneration> {
    const [newGeneration] = await db
      .insert(imageGenerations)
      .values(generation)
      .returning();
    return newGeneration;
  }
  
  async getAllImageGenerations(): Promise<ImageGeneration[]> {
    return db.select().from(imageGenerations).orderBy(desc(imageGenerations.createdAt));
  }
  
  async getRecentImageGenerations(limit: number): Promise<ImageGeneration[]> {
    return db
      .select()
      .from(imageGenerations)
      .orderBy(desc(imageGenerations.createdAt))
      .limit(limit);
  }
  
  async getImageGeneration(id: number): Promise<ImageGeneration | undefined> {
    const [generation] = await db
      .select()
      .from(imageGenerations)
      .where(eq(imageGenerations.id, id));
    return generation;
  }
}
```

### OpenAI Service (`server/services/openai.ts`)

The OpenAI service handles interactions with OpenAI's API:

1. **Prompt Enhancement** - Uses GPT-4o to improve the user's original prompt
2. **Image Generation** - Uses DALL-E 3 to generate the image based on the enhanced prompt

```typescript
export async function enhancePromptWithGPT4o(userPrompt: string): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o", // The newest OpenAI model
    messages: [
      {
        role: "system",
        content: "You are an expert at crafting detailed, descriptive prompts for DALL-E image generation..."
      },
      {
        role: "user",
        content: `Enhance this image generation prompt: ${userPrompt}`
      }
    ],
    max_tokens: 500,
  });

  return response.choices[0].message.content || userPrompt;
}

export async function generateImage(prompt: string): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
  });

  return response.data[0].url;
}
```

### API Routes (`server/routes.ts`)

The backend exposes several RESTful endpoints:

```typescript
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const enhancedPrompt = await enhancePromptWithGPT4o(prompt);
    const imageUrl = await generateImage(enhancedPrompt);
    
    const newGeneration = await storage.createImageGeneration({
      prompt,
      enhancedPrompt,
      model: "dall-e-3",
      imageUrl
    });
    
    res.json({
      success: true,
      message: "Image generated successfully",
      data: newGeneration
    });
  } catch (error) {
    // Error handling
  }
});

app.get('/api/image-generations/recent/:limit', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    const generations = await storage.getRecentImageGenerations(limit);
    
    res.json({
      success: true,
      data: generations
    });
  } catch (error) {
    // Error handling
  }
});

// Additional endpoints...
```

### Image Generation Page (`client/src/pages/ImageGenerator.tsx`)

The main frontend component handles:
- Form display and validation
- API request submission
- Display of generated images
- Gallery of recent generations

Key hooks used:
- `useForm` for form handling
- `useMutation` for image generation API requests
- `useQuery` for fetching recent generations

## Data Flow

1. User enters text prompt in the form
2. Form submission triggers API request to `/api/generate-image`
3. Backend enhances prompt with GPT-4o
4. Enhanced prompt is sent to DALL-E 3 for image generation
5. Image URL and metadata are stored in the PostgreSQL database
6. Generated image is displayed to the user
7. Recent generations are updated in the gallery

## Styling System

The application uses:
- **Tailwind CSS** for utility-based styling
- **shadcn/ui** for pre-built, customizable components
- **Theme configuration** via theme.json for consistent color palette

```json
{
  "variant": "professional",
  "primary": "hsl(213.1, 100%, 45.1%)",
  "appearance": "light",
  "radius": 0.5
}
```

## Performance Considerations

- Images are loaded with appropriate sizing and lazy loading
- React Query for efficient data fetching and caching
- Optimistic UI updates for better user experience

## Security Considerations

- API key stored in environment variables
- Input validation for all user-submitted data
- Error handling to prevent information leakage

## Deployment Considerations

For deploying this application:

1. Ensure PostgreSQL database is properly configured and accessible
2. Set up all required environment variables
3. Build the frontend with `npm run build`
4. Serve the application with proper HTTPS setup
5. Consider rate limiting for the OpenAI API to control costs