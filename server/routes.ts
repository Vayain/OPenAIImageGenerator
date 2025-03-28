import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Define a basic contact message schema
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const contactData = contactSchema.parse(req.body);
      
      // In a real application, you would:
      // 1. Store the message in a database
      // 2. Send an email notification
      // 3. Set up any required automations
      
      // For now, we'll just log the data
      console.log('Contact form submission:', contactData);
      
      res.status(200).json({ 
        success: true, 
        message: 'Your message has been received. Thank you for reaching out!'
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(400).json({ 
        success: false, 
        message: 'Invalid form data provided. Please check your inputs and try again.'
      });
    }
  });

  // Portfolio data endpoint - in a real app this might come from a database
  app.get('/api/portfolio', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: [
        {
          title: "AI Text-to-Image Generator",
          description: "Created a state-of-the-art text-to-image generation system using diffusion models that produces high-quality visuals from textual descriptions.",
          image: "https://images.unsplash.com/photo-1677442135416-4023b264c9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
          category: "Generative AI",
          technologies: ["Stable Diffusion", "PyTorch", "CLIP"],
          link: "#"
        },
        {
          title: "Conversational AI Assistant",
          description: "Developed an enterprise-grade AI assistant capable of natural conversations, task automation, and business process integration.",
          image: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
          category: "NLP",
          technologies: ["GPT-4", "LangChain", "FastAPI"],
          link: "#"
        },
        {
          title: "Medical Imaging AI",
          description: "Built a deep learning system that assists radiologists by automatically detecting and classifying anomalies in medical scans.",
          image: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
          category: "Computer Vision",
          technologies: ["CNN", "TensorFlow", "DICOM"],
          link: "#"
        }
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
