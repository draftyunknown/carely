
export enum ConversationStatus {
  OPEN = 'open',
  AI_HANDLED = 'ai_handled',
  HUMAN_REQUIRED = 'human_required',
  CLOSED = 'closed'
}

export interface Message {
  id: string;
  sender: 'user' | 'ai' | 'agent';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  customerName: string;
  lastMessage: string;
  status: ConversationStatus;
  updatedAt: Date;
  messages: Message[];
}

export interface BusinessProfile {
  name: string;
  industry: string;
  description: string;
  personality: 'professional' | 'friendly' | 'witty';
  services: Service[];
  faqs: FAQ[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Booking {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface AnalyticsData {
  date: string;
  conversations: number;
  bookings: number;
  aiEfficiency: number;
}
