import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import { AuthUser } from '../types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Zap } from 'lucide-react';

interface ChatUIProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  user: AuthUser;
}

const ChatUI: React.FC<ChatUIProps> = ({ messages, isLoading, onSendMessage, user }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && !isLoading) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setMessageText(prompt);
  };

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 overflow-hidden" ref={chatContainerRef}>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-1 scrollbar-hide">
        {/* Welcome message */}
        <div className="flex items-start mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to AI Chat Assistant</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">I'm here to help answer your questions powered by Groq and n8n. Feel free to ask me anything!</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                variant="outline" 
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => handleSuggestedPrompt("How does this chat application work?")}
              >
                How does this chat work?
              </Button>
              <Button 
                variant="outline" 
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => handleSuggestedPrompt("What kind of tasks can you help me with?")}
              >
                What can you help with?
              </Button>
              <Button 
                variant="outline" 
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => handleSuggestedPrompt("Write me a short poem about artificial intelligence.")}
              >
                Write a poem about AI
              </Button>
            </div>
          </div>
        </div>

        {/* Message list */}
        {messages.map((message, index) => (
          <div key={index} className="flex items-start mb-4 max-w-4xl mx-auto">
            <div className="flex-shrink-0 mr-3">
              <div className={`h-8 w-8 rounded-full ${message.role === 'user' ? 'bg-primary-600' : 'bg-violet-600'} flex items-center justify-center text-white text-sm`}>
                {message.role === 'user' ? (
                  <span>{getUserInitials(user.email)}</span>
                ) : (
                  <Zap className="h-5 w-5" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className={`${message.role === 'user' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-violet-50 dark:bg-gray-800 border dark:border-gray-700'} p-3 rounded-lg`}>
                <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.created_at ? formatTimestamp(message.created_at) : ''}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-start mb-4 max-w-4xl mx-auto">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm">
                <Zap className="h-5 w-5" />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-violet-50 dark:bg-gray-800 border dark:border-gray-700 p-3 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 animate-pulse">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              id="message-input"
              type="text"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="block w-full pr-20 sm:pr-24 py-3 pl-4 form-input rounded-md shadow-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
              disabled={isLoading}
            />
            <div className="absolute right-1 bottom-1 flex">
              <Button 
                type="submit" 
                disabled={isLoading || !messageText.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span>Send</span>
                <Send className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Powered by Groq and n8n</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
