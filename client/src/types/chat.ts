export interface User {
  id: string;
  name: string;
  initials: string;
  email?: string;
  phone?: string;
  company?: string;
  profile_image?: string;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  platform: 'WhatsApp' | 'Instagram' | 'Web Chat';
  status: 'answered' | 'unanswered';
  isSelected?: boolean;
  messageCount?: number;
  potentialValue?: string;
  leadScore?: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  time: string;
  attachments?: string[];
  isRead?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
}