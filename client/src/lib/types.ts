// Define the API response types for better type safety
export interface ApiResponse {
  status: "success" | "error";
  data?: CV;
  message?: string;
  code?: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  name: string;
  badge: boolean;
  loader: string;
}

export interface Experience {
  role: string;
  organization: string;
  start: string;
  end: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  url: string;
}

export interface CV {
  name: string;
  title: string[];
  about: string;
  contact: Contact;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillGroup[];
}
