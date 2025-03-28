import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, CheckCircle, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AIShowcaseSection() {
  const [prompt, setPrompt] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the prompt to an API
    console.log("Prompt submitted:", prompt);
    // Clear the input
    setPrompt('');
  };

  return (
    <section id="ai-showcase" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2540]">Interactive AI Showcase</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my latest work with generative AI models, showcasing the power and potential of these emerging technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-w-16 aspect-h-9 h-[400px] bg-gradient-to-br from-[#0A2540]/10 to-[#635BFF]/10 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1659794067106-ae88d255b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="AI art generation in process" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors cursor-pointer group">
                <span className="w-14 h-14 flex items-center justify-center bg-white rounded-full">
                  <Play className="w-6 h-6 text-[#0A2540] ml-1" />
                </span>
                <span className="absolute bottom-4 left-4 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Watch AI Generation Demo
                </span>
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Generative Art AI</h3>
              <p className="text-gray-600">
                This project demonstrates how AI can create original artwork based on textual prompts, showcasing the creative potential of machine learning algorithms.
              </p>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#0A2540]/10 rounded-full flex items-center justify-center mr-3">
                  <Cpu className="w-5 h-5 text-[#0A2540]" />
                </div>
                <h3 className="text-xl font-semibold">Interactive Text-to-Image</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Type any text prompt and see AI generate corresponding images in real-time. Powered by advanced diffusion models fine-tuned on diverse datasets.
              </p>
              <form onSubmit={handlePromptSubmit} className="relative">
                <Input 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Try a prompt like 'sunset over mountains with cyberpunk city'"
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 focus:border-[#635BFF]"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-2 p-1 bg-[#635BFF] text-white rounded-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#0A2540]/10 rounded-full flex items-center justify-center mr-3">
                  <Code className="w-5 h-5 text-[#0A2540]" />
                </div>
                <h3 className="text-xl font-semibold">AI Technical Capabilities</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Style transfer and artistic adaptations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Real-time image generation at 4K resolution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Multi-modal inputs (text, image, audio)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Custom fine-tuning for specialized domains</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
