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

export interface CV {
  name: string;
  title: string[];
  about: string;
  contact: Contact;
  experience: string[];
  education: string[];
  skills: string[];
}
