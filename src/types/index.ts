
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'veterinarian' | 'admin';
  phone: string;
  location: string;
  isVerified?: boolean;
  avatar?: string;
}

export interface Consultation {
  id: string;
  farmerId: string;
  farmerName: string;
  vetId?: string;
  vetName?: string;
  title: string;
  description: string;
  animalType: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
  scheduledDate?: string;
  response?: string;
  prescription?: string;
  images?: string[];
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'pidgin';
  category: string;
  image?: string;
}

export interface Message {
  id: string;
  consultationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'prescription';
}

export interface Veterinarian {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  rating: number;
  isAvailable: boolean;
  location: string;
  phone: string;
  isVerified: boolean;
  schedule: string[];
}
