import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Sparkles, Github, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-200 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary absolute transition-all duration-500 animate-in fade-in" />
              <ImageIcon className="h-5 w-5 text-primary absolute transition-all duration-500 animate-in fade-in-0 delay-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-foreground group-hover:text-primary transition-colors">AI Image Generator</span>
              <span className="text-xs text-muted-foreground leading-tight">Powered by OpenAI</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className="rounded-full text-foreground hover:text-primary hover:bg-primary/10">
                Generate
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="ghost" className="rounded-full text-foreground hover:text-primary hover:bg-primary/10">
                Portfolio
              </Button>
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" className="rounded-full text-foreground hover:text-primary hover:bg-primary/10 gap-1.5">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </a>
            <Badge variant="secondary" className="ml-2 gap-1 bg-primary/10 hover:bg-primary/15 text-primary border-0">
              <Sparkles className="h-3 w-3" />
              <span>New</span>
            </Badge>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
            className="md:hidden rounded-full hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-b absolute w-full animate-in slide-in-from-top-5 duration-200">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start rounded-lg">
                Generate
              </Button>
            </Link>
            <Link href="/portfolio" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start rounded-lg">
                Portfolio
              </Button>
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start rounded-lg gap-1.5">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
