
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WAHAApiClient, WAHAChat, WAHAMessage, wahaApiClient } from '@/lib/wahaApiClient';

interface WhatsAppContextState {
  // Chats state
  chats: WAHAChat[];
  isLoadingChats: boolean;
  chatError: string | null;
  selectedChatId: string | null;
  
  // Messages state
  messages: WAHAMessage[];
  isLoadingMessages: boolean;
  messageError: string | null;
  
  // Actions
  setSelectedChatId: (chatId: string | null) => void;
  refreshChats: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  sendMessage: (text: string, quotedMessageId?: string) => Promise<void>;
  archiveChat: (chatId: string) => Promise<void>;
  unarchiveChat: (chatId: string) => Promise<void>;
  markAsUnread: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  pinMessage: (messageId: string) => Promise<void>;
  unpinMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, text: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
}

const WhatsAppContext = createContext<WhatsAppContextState | undefined>(undefined);

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  // Chats state
  const [chats, setChats] = useState<WAHAChat[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  
  // Messages state
  const [messages, setMessages] = useState<WAHAMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  
  // Load chats on mount
  useEffect(() => {
    refreshChats();
  }, []);
  
  // Load messages when selected chat changes
  useEffect(() => {
    if (selectedChatId) {
      refreshMessages();
    } else {
      setMessages([]);
    }
  }, [selectedChatId]);
  
  // Refresh chats action
  const refreshChats = useCallback(async () => {
    setIsLoadingChats(true);
    setChatError(null);
    
    try {
      const fetchedChats = await wahaApiClient.getChatsOverview(50, 0);
      setChats(fetchedChats);
      
      // Auto-select the first chat if none is selected
      if (fetchedChats.length > 0 && !selectedChatId) {
        setSelectedChatId(fetchedChats[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
      setChatError('Failed to load chats. Please try again.');
    } finally {
      setIsLoadingChats(false);
    }
  }, [selectedChatId]);
  
  // Refresh messages action
  const refreshMessages = useCallback(async () => {
    if (!selectedChatId) return;
    
    setIsLoadingMessages(true);
    setMessageError(null);
    
    try {
      const fetchedMessages = await wahaApiClient.getMessages(selectedChatId, {
        limit: 50,
        downloadMedia: true
      });
      
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setMessageError('Failed to load messages. Please try again.');
    } finally {
      setIsLoadingMessages(false);
    }
  }, [selectedChatId]);
  
  // Send message action
  const sendMessage = useCallback(async (text: string, quotedMessageId?: string) => {
    if (!selectedChatId || !text.trim()) return;
    
    try {
      // Optimistic update with a temporary message
      const tempMessage: WAHAMessage = {
        id: `temp-${Date.now()}`,
        timestamp: Math.floor(Date.now() / 1000),
        from: 'me',
        fromMe: true,
        body: text,
        hasMedia: false
      };
      
      setMessages(prev => [...prev, tempMessage]);
      
      await wahaApiClient.sendMessage(selectedChatId, {
        text,
        quotedMessageId
      });
      
      // Refresh messages to get the actual sent message
      await refreshMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessageError('Failed to send message. Please try again.');
      
      // Remove the optimistic message
      setMessages(prev => prev.filter(msg => msg.id !== `temp-${Date.now()}`));
    }
  }, [selectedChatId, refreshMessages]);
  
  // Archive chat action
  const archiveChat = useCallback(async (chatId: string) => {
    try {
      await wahaApiClient.archiveChat(chatId);
      
      // Update chat in state
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, archiveState: 'archived' } 
          : chat
      ));
      
      await refreshChats();
    } catch (error) {
      console.error('Failed to archive chat:', error);
      setChatError('Failed to archive chat. Please try again.');
    }
  }, [refreshChats]);
  
  // Unarchive chat action
  const unarchiveChat = useCallback(async (chatId: string) => {
    try {
      await wahaApiClient.unarchiveChat(chatId);
      
      // Update chat in state
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, archiveState: 'unarchived' } 
          : chat
      ));
      
      await refreshChats();
    } catch (error) {
      console.error('Failed to unarchive chat:', error);
      setChatError('Failed to unarchive chat. Please try again.');
    }
  }, [refreshChats]);
  
  // Mark chat as unread action
  const markAsUnread = useCallback(async (chatId: string) => {
    try {
      await wahaApiClient.markChatAsUnread(chatId);
      
      // Update chat in state
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, markedAsUnread: true } 
          : chat
      ));
    } catch (error) {
      console.error('Failed to mark chat as unread:', error);
      setChatError('Failed to mark chat as unread. Please try again.');
    }
  }, []);
  
  // Delete chat action
  const deleteChat = useCallback(async (chatId: string) => {
    try {
      await wahaApiClient.deleteChat(chatId);
      
      // Remove chat from state
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      
      // If the deleted chat was selected, select another one
      if (selectedChatId === chatId) {
        const nextChat = chats.find(chat => chat.id !== chatId);
        setSelectedChatId(nextChat?.id || null);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
      setChatError('Failed to delete chat. Please try again.');
    }
  }, [chats, selectedChatId]);
  
  // Pin message action
  const pinMessage = useCallback(async (messageId: string) => {
    if (!selectedChatId) return;
    
    try {
      await wahaApiClient.pinMessage(selectedChatId, messageId);
      
      // Update message in state
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isPinned: true } 
          : msg
      ));
    } catch (error) {
      console.error('Failed to pin message:', error);
      setMessageError('Failed to pin message. Please try again.');
    }
  }, [selectedChatId]);
  
  // Unpin message action
  const unpinMessage = useCallback(async (messageId: string) => {
    if (!selectedChatId) return;
    
    try {
      await wahaApiClient.unpinMessage(selectedChatId, messageId);
      
      // Update message in state
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isPinned: false } 
          : msg
      ));
    } catch (error) {
      console.error('Failed to unpin message:', error);
      setMessageError('Failed to unpin message. Please try again.');
    }
  }, [selectedChatId]);
  
  // Edit message action
  const editMessage = useCallback(async (messageId: string, text: string) => {
    if (!selectedChatId) return;
    
    try {
      await wahaApiClient.editMessage(selectedChatId, messageId, { text });
      
      // Update message in state
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, body: text, isEdited: true } 
          : msg
      ));
    } catch (error) {
      console.error('Failed to edit message:', error);
      setMessageError('Failed to edit message. Please try again.');
    }
  }, [selectedChatId]);
  
  // Delete message action
  const deleteMessage = useCallback(async (messageId: string) => {
    if (!selectedChatId) return;
    
    try {
      await wahaApiClient.deleteMessage(selectedChatId, messageId);
      
      // Remove message from state
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Failed to delete message:', error);
      setMessageError('Failed to delete message. Please try again.');
    }
  }, [selectedChatId]);
  
  // Context value
  const value: WhatsAppContextState = {
    chats,
    isLoadingChats,
    chatError,
    selectedChatId,
    messages,
    isLoadingMessages,
    messageError,
    setSelectedChatId,
    refreshChats,
    refreshMessages,
    sendMessage,
    archiveChat,
    unarchiveChat,
    markAsUnread,
    deleteChat,
    pinMessage,
    unpinMessage,
    editMessage,
    deleteMessage
  };
  
  return (
    <WhatsAppContext.Provider value={value}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
}
