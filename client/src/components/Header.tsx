import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Image, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <header className={`sticky top-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b border-gray-100 transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image className="h-6 w-6 text-primary" />
            <span className="text-primary font-bold text-xl">AI Image Generator</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Generate
            </Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-gray-100 absolute w-full">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link href="/" className="block py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left">
              Generate
            </Link>
            <Link href="/portfolio" className="block py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left">
              Portfolio
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
