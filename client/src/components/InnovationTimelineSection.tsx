import { motion } from 'framer-motion';
import { MessageSquare, Image, Eye, Cpu, Layers, Code, Database, Cloud, Server } from 'lucide-react';
import { timelineItems } from '@/data/timelineData';
import { techStackItems } from '@/data/techStackData';

export default function InnovationTimelineSection() {
  return (
    <section id="innovations" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2540]">Tech Innovation Timeline</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tracking my journey through the evolution of AI and emerging technologies over the years.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
        
        {/* Tech Stack Showcase */}
        <div className="mt-20">
          <motion.h3 
            className="text-2xl font-semibold text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technology Stack
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techStackItems.map((tech, index) => (
              <TechStackItem key={index} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get the appropriate icon
function getIcon(iconName: string) {
  switch (iconName) {
    case 'message-square': return <MessageSquare className="w-5 h-5 text-white" />;
    case 'image': return <Image className="w-5 h-5 text-white" />;
    case 'eye': return <Eye className="w-5 h-5 text-white" />;
    case 'cpu': return <Cpu className="w-8 h-8 text-[#635BFF]" />;
    case 'layers': return <Layers className="w-8 h-8 text-[#635BFF]" />;
    case 'code': return <Code className="w-8 h-8 text-[#635BFF]" />;
    case 'database': return <Database className="w-8 h-8 text-[#635BFF]" />;
    case 'cloud': return <Cloud className="w-8 h-8 text-[#635BFF]" />;
    case 'server': return <Server className="w-8 h-8 text-[#635BFF]" />;
    default: return <Cpu className="w-5 h-5 text-white" />;
  }
}

function TimelineItem({ item, index }: { item: typeof timelineItems[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'} ${isEven ? 'mb-6 md:mb-0' : 'hidden md:block'}`}>
        {isEven && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 inline-block">
            <span className="text-sm text-gray-500 block mb-1">{item.year}</span>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">
              {item.description}
            </p>
          </div>
        )}
      </div>
      <div className="md:w-0 flex justify-center">
        <div className="w-10 h-10 rounded-full bg-[#635BFF] flex items-center justify-center relative z-10 shadow-lg">
          {getIcon(item.icon)}
        </div>
      </div>
      <div className={`md:w-1/2 ${!isEven ? 'md:pl-12' : 'md:pr-12'} ${!isEven ? 'mb-6 md:mb-0' : 'hidden md:block'}`}>
        {!isEven && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 inline-block">
            <span className="text-sm text-gray-500 block mb-1">{item.year}</span>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">
              {item.description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TechStackItem({ tech, index }: { tech: typeof techStackItems[0], index: number }) {
  return (
    <motion.div 
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-4 bg-gray-50 rounded-full">
        {getIcon(tech.icon)}
      </div>
      <span className="text-sm font-medium text-center">{tech.name}</span>
    </motion.div>
  );
}
