import { Link } from 'wouter';
import { Github, Image, Code, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/40 border-t py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold mb-3 hover:text-primary">
              <Image className="h-5 w-5" />
              <span>AI Image Generator</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md text-sm">
              A modern, powerful text-to-image generation application built with OpenAI's DALL-E 3 model. Create stunning visuals from simple text prompts.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Generate Images
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://openai.com/blog/dall-e-3" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>DALL-E 3 Documentation</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://platform.openai.com/docs/guides/images" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>OpenAI Image API</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://platform.openai.com/docs/models/dall-e" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>OpenAI Model Reference</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            &copy; {currentYear} AI Image Generator. Built with React, Node.js, and OpenAI.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-1">
              <Code className="h-3 w-3" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
