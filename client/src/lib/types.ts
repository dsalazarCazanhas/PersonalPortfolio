// Define the API response types for better type safety
export interface ApiResponse {
  status: 'success' | 'error';
  data?: CV;
  message?: string;
  code?: string;
}

export interface CV {
  name: string;
  title: string;
  about: string;
  contact: string;
  experience: string[];
  education: string[];
  skills: string[];
}