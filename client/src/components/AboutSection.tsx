import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A2540]">About Me</h2>
            <p className="text-lg text-gray-600 mb-6">
              I'm a passionate AI and Machine Learning Engineer with over 8 years of experience developing cutting-edge solutions for complex problems. My expertise spans across generative AI, computer vision, and natural language processing.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              After completing my Master's in Computer Science with a focus on Machine Learning at Stanford University, I've worked with leading tech companies to implement AI solutions that transform businesses and create meaningful impact.
            </p>
            
            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-semibold">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0A2540]/10 text-[#0A2540] px-3 py-1 rounded-full text-sm">Generative AI</span>
                <span className="bg-[#0A2540]/10 text-[#0A2540] px-3 py-1 rounded-full text-sm">Machine Learning</span>
                <span className="bg-[#0A2540]/10 text-[#0A2540] px-3 py-1 rounded-full text-sm">Computer Vision</span>
                <span className="bg-[#0A2540]/10 text-[#0A2540] px-3 py-1 rounded-full text-sm">Natural Language Processing</span>
                <span className="bg-[#0A2540]/10 text-[#0A2540] px-3 py-1 rounded-full text-sm">Deep Learning</span>
              </div>
            </div>
            
            <Button className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#635BFF]/90 text-white px-6 py-3 rounded-lg font-medium transition-all">
              Download Resume <Download className="w-4 h-4" />
            </Button>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-[#00D4FF]/10">
              <img 
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="John Doe, AI Engineer" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#635BFF]/10 rounded-full z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#00D4FF]/10 rounded-full z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
