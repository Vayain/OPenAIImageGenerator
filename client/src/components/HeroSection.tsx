import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DotGrid from '@/assets/DotGrid';

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative bg-gradient-to-br from-[#0A2540] to-[#0A2540]/90">
      <div className="absolute inset-0 opacity-10">
        <DotGrid />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Pioneering the future with <span className="text-[#00D4FF]">Generative AI</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-200 max-w-md">
              Building innovative solutions at the intersection of technology and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white px-6 py-6 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
              >
                View My Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-6 rounded-lg font-medium transition-all"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#00D4FF]/20">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="AI-generated artwork showcasing technological innovation" 
                className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A2540]/80 to-transparent p-4">
                <p className="text-white text-sm">Featured AI-generated artwork: "Neural Pathways"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
