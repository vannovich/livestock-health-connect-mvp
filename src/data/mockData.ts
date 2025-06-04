
import { User, Consultation, HealthTip, Message, Veterinarian } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Farmer',
    email: 'john@farmer.com',
    role: 'farmer',
    phone: '+237 670 123 456',
    location: 'Buea Town, Southwest Region',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Mary Vet',
    email: 'mary@vet.com',
    role: 'veterinarian',
    phone: '+237 680 234 567',
    location: 'Buea Central, Southwest Region',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@healthconnect.cm',
    role: 'admin',
    phone: '+237 690 345 678',
    location: 'Buea, Southwest Region'
  }
];

export const mockVeterinarians: Veterinarian[] = [
  {
    id: '2',
    name: 'Dr. Mary Vet',
    email: 'mary@vet.com',
    specialization: 'Large Animals',
    experience: 8,
    rating: 4.8,
    isAvailable: true,
    location: 'Buea Central',
    phone: '+237 680 234 567',
    isVerified: true,
    schedule: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: '4',
    name: 'Dr. Paul Ngole',
    email: 'paul@vet.com',
    specialization: 'Poultry & Small Animals',
    experience: 12,
    rating: 4.9,
    isAvailable: true,
    location: 'Molyko, Buea',
    phone: '+237 675 456 789',
    isVerified: true,
    schedule: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00']
  },
  {
    id: '5',
    name: 'Dr. Sarah Manu',
    email: 'sarah@vet.com',
    specialization: 'Cattle & Dairy',
    experience: 6,
    rating: 4.7,
    isAvailable: false,
    location: 'Bonduma, Buea',
    phone: '+237 685 567 890',
    isVerified: false,
    schedule: ['10:00', '11:00', '12:00', '15:00', '16:00']
  }
];

export const mockConsultations: Consultation[] = [
  {
    id: 'c1',
    farmerId: '1',
    farmerName: 'John Farmer',
    vetId: '2',
    vetName: 'Dr. Mary Vet',
    title: 'Cow showing signs of illness',
    description: 'My cow has been refusing to eat for 2 days and seems lethargic. She is also producing less milk than usual.',
    animalType: 'Cattle',
    urgency: 'high',
    status: 'assigned',
    createdAt: '2024-06-03T10:00:00Z',
    scheduledDate: '2024-06-05T14:00:00Z',
    response: 'Based on the symptoms, this could be a digestive issue. I recommend immediate examination.',
    images: ['https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=300&h=200&fit=crop']
  },
  {
    id: 'c2',
    farmerId: '1',
    farmerName: 'John Farmer',
    title: 'Vaccination schedule for chickens',
    description: 'I need advice on vaccination schedule for my 50 chickens. They are 2 months old.',
    animalType: 'Poultry',
    urgency: 'medium',
    status: 'pending',
    createdAt: '2024-06-04T08:30:00Z'
  },
  {
    id: 'c3',
    farmerId: '6',
    farmerName: 'Grace Farmer',
    vetId: '4',
    vetName: 'Dr. Paul Ngole',
    title: 'Pig respiratory issues',
    description: 'Several pigs showing coughing and breathing difficulties.',
    animalType: 'Swine',
    urgency: 'high',
    status: 'completed',
    createdAt: '2024-06-02T15:20:00Z',
    response: 'Respiratory infection treated with antibiotics. Follow-up in 1 week.',
    prescription: 'Oxytetracycline 20mg/kg body weight, twice daily for 5 days'
  }
];

export const mockHealthTips: HealthTip[] = [
  {
    id: 'tip1',
    title: 'Proper Cattle Nutrition',
    content: 'Ensure your cattle have access to clean water and quality grass. Supplement with mineral licks during dry season.',
    language: 'en',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=400&h=250&fit=crop'
  },
  {
    id: 'tip2',
    title: 'How to Feed Cow Proper',
    content: 'Make sure say your cow dem get clean water and good grass. For dry season, give dem mineral salt.',
    language: 'pidgin',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=400&h=250&fit=crop'
  },
  {
    id: 'tip3',
    title: 'Chicken Disease Prevention',
    content: 'Keep chicken coops clean and dry. Vaccinate according to schedule and separate sick birds immediately.',
    language: 'en',
    category: 'Disease Prevention',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=250&fit=crop'
  },
  {
    id: 'tip4',
    title: 'How to Prevent Chicken Sickness',
    content: 'Keep your chicken house clean and dry. Give dem injection on time and separate sick chicken quick quick.',
    language: 'pidgin',
    category: 'Disease Prevention',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=250&fit=crop'
  },
  {
    id: 'tip5',
    title: 'Goat Breeding Tips',
    content: 'Select healthy breeding stock. Provide proper nutrition 2 months before breeding season.',
    language: 'en',
    category: 'Breeding',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=250&fit=crop'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    consultationId: 'c1',
    senderId: '1',
    senderName: 'John Farmer',
    content: 'Doctor, the cow condition don worsen. She no dey eat anything at all.',
    timestamp: '2024-06-04T09:15:00Z',
    type: 'text'
  },
  {
    id: 'm2',
    consultationId: 'c1',
    senderId: '2',
    senderName: 'Dr. Mary Vet',
    content: 'Thank you for the update. Please bring the cow to the clinic tomorrow morning. This sounds like it needs immediate attention.',
    timestamp: '2024-06-04T09:30:00Z',
    type: 'text'
  },
  {
    id: 'm3',
    consultationId: 'c1',
    senderId: '2',
    senderName: 'Dr. Mary Vet',
    content: 'I am prescribing antibiotics. Give 20ml twice daily for 5 days.',
    timestamp: '2024-06-04T09:35:00Z',
    type: 'prescription'
  }
];

// Mock credentials for authentication simulation
export const mockCredentials = {
  farmer: { email: 'john@farmer.com', password: 'farmer123' },
  veterinarian: { email: 'mary@vet.com', password: 'vet123' },
  admin: { email: 'admin@healthconnect.cm', password: 'admin123' }
};
