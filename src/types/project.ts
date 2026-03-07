export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'deployment' | 'tools';
}

export interface DeploymentInfo {
  platform: string;
  details?: string;
  url?: string;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  shortDescription?: string;
  image: string;
  url: string;
  
  technologies: Technology[];
  role: string;
  responsibilities: string[];
  deployment?: DeploymentInfo;
  teamSize?: number;
  contributions: string;
  
  githubUrl?: string;
  liveUrl?: string;
  
  features: string[];
  challenges?: string[];
  outcomes?: string[];
  media?: ProjectMedia[];
  
  link: string;
}
