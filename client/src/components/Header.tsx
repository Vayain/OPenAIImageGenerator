import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
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

  const handleNavLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full bg-background/90 backdrop-blur-sm z-50 border-b border-gray-100 transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-primary font-bold text-xl">John Doe</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavLinkClick('portfolio')} 
              className="text-text hover:text-secondary transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => handleNavLinkClick('ai-showcase')} 
              className="text-text hover:text-secondary transition-colors"
            >
              AI Showcase
            </button>
            <button 
              onClick={() => handleNavLinkClick('innovations')} 
              className="text-text hover:text-secondary transition-colors"
            >
              Innovations
            </button>
            <button 
              onClick={() => handleNavLinkClick('about')} 
              className="text-text hover:text-secondary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavLinkClick('contact')} 
              className="text-text hover:text-secondary transition-colors"
            >
              Contact
            </button>
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
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <button 
              onClick={() => handleNavLinkClick('portfolio')} 
              className="block py-2 text-text hover:text-secondary transition-colors w-full text-left"
            >
              Portfolio
            </button>
            <button 
              onClick={() => handleNavLinkClick('ai-showcase')} 
              className="block py-2 text-text hover:text-secondary transition-colors w-full text-left"
            >
              AI Showcase
            </button>
            <button 
              onClick={() => handleNavLinkClick('innovations')} 
              className="block py-2 text-text hover:text-secondary transition-colors w-full text-left"
            >
              Innovations
            </button>
            <button 
              onClick={() => handleNavLinkClick('about')} 
              className="block py-2 text-text hover:text-secondary transition-colors w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => handleNavLinkClick('contact')} 
              className="block py-2 text-text hover:text-secondary transition-colors w-full text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
