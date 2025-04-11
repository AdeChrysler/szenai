export interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  session_id: string;
  created_at: string;
  userId?: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
}
