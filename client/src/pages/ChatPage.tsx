import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import ChatUI from '../components/ChatUI';
import UserMenu from '../components/UserMenu';
import { DatabaseSetup } from '../components/DatabaseSetup';
import { Message } from '../types/chat';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChatPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [sessionId, setSessionId] = useState<string>(() => {
    return sessionStorage.getItem('chatSessionId') || crypto.randomUUID();
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    sessionStorage.setItem('chatSessionId', sessionId);
  }, [sessionId]);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fetch chat history
  const {
    data: chatHistory,
    isLoading: isFetchingHistory,
    error: fetchError,
  } = useQuery({
    queryKey: ['/api/chat/history', user?.id, sessionId],
    enabled: !!user,
  });

  useEffect(() => {
    if (chatHistory?.messages) {
      setMessages(chatHistory.messages);
    }
  }, [chatHistory]);

  // Send message mutation
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/chat', {
        message,
        sessionId,
        userId: user?.id,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Add the new messages to the UI
      setMessages((prev) => [...prev, data.message]);
      // Update the session ID if a new one was returned
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
      }
      // Invalidate the chat history query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history', user?.id, sessionId] });
    },
    onError: (error) => {
      toast({
        title: 'Error sending message',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
    },
  });

  const handleSendMessage = (text: string) => {
    if (!user) return;
    
    // Optimistically add user message to the UI
    const userMessage: Message = {
      id: Date.now(),
      content: text,
      role: 'user',
      session_id: sessionId,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    sendMessage(text);
  };

  const handleSignOut = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">AI Chat</span>
            </div>
          </div>
          <div className="flex items-center">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* User dropdown */}
            <div className="ml-3 relative">
              <UserMenu user={user} onSignOut={handleSignOut} />
            </div>
          </div>
        </div>
      </header>

      {/* Chat UI */}
      <ChatUI
        messages={messages}
        isLoading={isSending}
        onSendMessage={handleSendMessage}
        user={user}
      />
    </div>
  );
};

export default ChatPage;
