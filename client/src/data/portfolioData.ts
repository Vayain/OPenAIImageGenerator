export type ProjectType = {
  title: string;
  description: string;
  image: string;
  category: 'Generative AI' | 'Machine Learning' | 'NLP' | 'Computer Vision';
  technologies: string[];
  link: string;
};

export const portfolioProjects: ProjectType[] = [
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
  },
  {
    title: "AI-Powered Recommendation Engine",
    description: "Designed and implemented a personalized recommendation system for e-commerce platforms using collaborative filtering and deep learning.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "Machine Learning",
    technologies: ["Matrix Factorization", "XGBoost", "TensorFlow"],
    link: "#"
  },
  {
    title: "Real-time Object Detection",
    description: "Created a real-time object detection system for autonomous vehicles that can identify and track multiple objects in various lighting conditions.",
    image: "https://images.unsplash.com/photo-1558383817-c36e19ece96d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "Computer Vision",
    technologies: ["YOLO", "OpenCV", "TensorRT"],
    link: "#"
  },
  {
    title: "AI Music Composer",
    description: "Developed a generative AI system that composes original music pieces across different genres and styles based on textual prompts.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    category: "Generative AI",
    technologies: ["RNN", "LSTM", "Transformers"],
    link: "#"
  }
];
