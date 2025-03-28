import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioProjects, ProjectType } from '@/data/portfolioData';

type ProjectCategoryType = 'All Projects' | 'Generative AI' | 'Machine Learning' | 'NLP' | 'Computer Vision';

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryType>('All Projects');
  
  const filteredProjects = activeFilter === 'All Projects' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2540]">Professional Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my expertise in artificial intelligence, machine learning, and emerging technologies.
          </p>
        </motion.div>
        
        {/* Portfolio Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['All Projects', 'Generative AI', 'Machine Learning', 'NLP', 'Computer Vision'] as ProjectCategoryType[]).map((filter) => (
            <Button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? 'default' : 'secondary'}
              className={`rounded-full px-4 py-2 ${
                activeFilter === filter 
                  ? 'bg-[#0A2540] text-white hover:bg-[#0A2540]/90' 
                  : 'bg-gray-200 text-[#1A1F36] hover:bg-gray-300'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-[#0A2540] px-6 py-3 rounded-lg font-medium transition-all"
          >
            See All Projects 
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectType, index: number }) {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-[#635BFF] text-white text-xs px-2 py-1 rounded-full">
          {project.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{tech}</span>
          ))}
        </div>
        <a href={project.link} className="text-[#635BFF] font-medium hover:text-[#635BFF]/80 transition-colors inline-flex items-center">
          View Project <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </motion.div>
  );
}
