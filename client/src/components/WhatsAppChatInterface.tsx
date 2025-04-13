
import React, { useState, useEffect, useRef } from 'react';
import { wahaApiClient, WAHAChat, WAHAMessage } from '@/lib/wahaApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Search, 
  MoreHorizontal, 
  Send, 
  Archive, 
  CheckCircle,
  MessageCircle,
  Phone,
  Pin,
  Trash,
  Edit,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const WhatsAppChatInterface: React.FC = () => {
  // State variables
  const [chats, setChats] = useState<WAHAChat[]>([]);
  const [messages, setMessages] = useState<WAHAMessage[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'archived'>('all');
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chats on component mount
  useEffect(() => {
    fetchChats();
  }, [statusFilter]);

  // Fetch messages when selected chat changes
  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }
  }, [selectedChatId]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch chats
  const fetchChats = async () => {
    try {
      setIsLoadingChats(true);
      setError(null);
      
      const fetchedChats = await wahaApiClient.getChatsOverview(50, 0);
      
      // Filter chats based on search
      const filteredChats = searchQuery 
        ? fetchedChats.filter(chat => 
            chat.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            chat.id.includes(searchQuery))
        : fetchedChats;
      
      setChats(filteredChats);
      
      // Select first chat by default if none is selected
      if (filteredChats.length > 0 && !selectedChatId) {
        setSelectedChatId(filteredChats[0].id);
      }
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError('Failed to load chats. Please try again.');
      toast({
        title: "Error loading chats",
        description: "Could not load WhatsApp chats. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingChats(false);
    }
  };

  // Fetch messages for a chat
  const fetchMessages = async (chatId: string) => {
    try {
      setIsLoadingMessages(true);
      setError(null);
      
      const fetchedMessages = await wahaApiClient.getMessages(chatId, {
        limit: 50,
        downloadMedia: true
      });
      
      setMessages(fetchedMessages);
    } catch (err) {
      console.error(`Error fetching messages for chat ${chatId}:`, err);
      setError('Failed to load messages. Please try again.');
      toast({
        title: "Error loading messages",
        description: "Could not load WhatsApp messages. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!selectedChatId || !messageText.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Optimistic update for better UX
      const optimisticMessage: WAHAMessage = {
        id: `temp-${Date.now()}`,
        timestamp: Math.floor(Date.now() / 1000),
        from: 'me',
        fromMe: true,
        body: messageText,
        hasMedia: false
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
      setMessageText('');
      
      await wahaApiClient.sendMessage(selectedChatId, { text: messageText });
      
      // Refetch messages to get the actual sent message
      fetchMessages(selectedChatId);
    } catch (err) {
      console.error('Error sending message:', err);
      toast({
        title: "Error sending message",
        description: "Your message could not be sent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Archive/unarchive chat
  const toggleArchiveChat = async (chatId: string, isArchived: boolean) => {
    try {
      if (isArchived) {
        await wahaApiClient.unarchiveChat(chatId);
        toast({
          title: "Chat unarchived",
          description: "Chat has been unarchived successfully.",
        });
      } else {
        await wahaApiClient.archiveChat(chatId);
        toast({
          title: "Chat archived",
          description: "Chat has been archived successfully.",
        });
      }
      
      // Refresh chats list
      fetchChats();
    } catch (err) {
      console.error(`Error ${isArchived ? 'unarchiving' : 'archiving'} chat:`, err);
      toast({
        title: `Error ${isArchived ? 'unarchiving' : 'archiving'} chat`,
        description: "The operation could not be completed. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Delete chat
  const deleteChat = async (chatId: string) => {
    if (!confirm('Are you sure you want to delete this chat?')) return;
    
    try {
      await wahaApiClient.deleteChat(chatId);
      
      toast({
        title: "Chat deleted",
        description: "Chat has been deleted successfully.",
      });
      
      // Remove from UI and select another chat
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      if (selectedChatId === chatId) {
        setSelectedChatId(chats.find(chat => chat.id !== chatId)?.id || null);
      }
    } catch (err) {
      console.error('Error deleting chat:', err);
      toast({
        title: "Error deleting chat",
        description: "The chat could not be deleted. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Mark as unread
  const markAsUnread = async (chatId: string) => {
    try {
      await wahaApiClient.markChatAsUnread(chatId);
      
      toast({
        title: "Marked as unread",
        description: "Chat has been marked as unread.",
      });
      
      // Update UI
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, markedAsUnread: true } 
          : chat
      ));
    } catch (err) {
      console.error('Error marking chat as unread:', err);
      toast({
        title: "Error marking as unread",
        description: "Could not mark the chat as unread. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Pin/unpin message
  const togglePinMessage = async (messageId: string, isPinned: boolean) => {
    if (!selectedChatId) return;
    
    try {
      if (isPinned) {
        await wahaApiClient.unpinMessage(selectedChatId, messageId);
        toast({
          title: "Message unpinned",
          description: "Message has been unpinned successfully.",
        });
      } else {
        await wahaApiClient.pinMessage(selectedChatId, messageId, { duration: 604800 }); // 7 days
        toast({
          title: "Message pinned",
          description: "Message has been pinned for 7 days.",
        });
      }
      
      // Refresh messages
      fetchMessages(selectedChatId);
    } catch (err) {
      console.error(`Error ${isPinned ? 'unpinning' : 'pinning'} message:`, err);
      toast({
        title: `Error ${isPinned ? 'unpinning' : 'pinning'} message`,
        description: "The operation could not be completed. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Delete message
  const deleteMessage = async (messageId: string) => {
    if (!selectedChatId || !confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await wahaApiClient.deleteMessage(selectedChatId, messageId);
      
      toast({
        title: "Message deleted",
        description: "Message has been deleted successfully.",
      });
      
      // Update UI
      setMessages(prev => prev.filter(message => message.id !== messageId));
    } catch (err) {
      console.error('Error deleting message:', err);
      toast({
        title: "Error deleting message",
        description: "The message could not be deleted. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Format chat display name
  const formatChatName = (chat: WAHAChat) => {
    if (chat.name) return chat.name;
    
    // Extract phone number from ID
    const phone = chat.id.split('@')[0];
    return `+${phone}`;
  };

  // Format timestamp
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for message groups
  const formatMessageDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Generate avatar fallback text (initials)
  const getAvatarFallback = (chat: WAHAChat) => {
    const name = chat.name || chat.id.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  // Group messages by date
  const groupMessagesByDate = (messages: WAHAMessage[]) => {
    const groups: { [key: string]: WAHAMessage[] } = {};
    
    messages.forEach(message => {
      const date = formatMessageDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return Object.entries(groups);
  };

  // Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
      {/* Chats List */}
      <Card className="lg:col-span-4 dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input 
                placeholder="Search WhatsApp chats..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && fetchChats()}
                className="pl-8"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchChats}
              disabled={isLoadingChats}
            >
              <RefreshCcw className={`h-4 w-4 ${isLoadingChats ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as 'all' | 'archived')}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="all">All Chats</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent className="p-0 max-h-[calc(100vh-300px)] overflow-y-auto">
          {isLoadingChats ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin mr-2">
                <RefreshCcw size={20} />
              </div>
              <span>Loading chats...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <AlertCircle size={40} className="text-red-500 mb-2" />
              <p className="text-red-500">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4" 
                onClick={fetchChats}
              >
                Retry
              </Button>
            </div>
          ) : chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No chats found</h3>
              <p className="text-gray-500 text-center max-w-sm px-4">
                No WhatsApp chats found. Try refreshing or checking your connection to the WhatsApp API.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {chats.map((chat) => (
                <div 
                  key={chat.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all ${
                    selectedChatId === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600' : ''
                  }`}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-green-600 text-white font-medium">
                        {getAvatarFallback(chat)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <div className="font-medium truncate">{formatChatName(chat)}</div>
                        <div className="text-xs text-gray-500">
                          {chat.conversationTimestamp ? formatTimestamp(chat.conversationTimestamp) : ''}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                        {chat.lastMessage?.body || 'No messages'}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs bg-opacity-50 bg-green-50 text-green-600 border-green-200">
                          WhatsApp
                        </Badge>
                        {chat.markedAsUnread && (
                          <Badge variant="secondary" className="text-xs">
                            Unread
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="lg:col-span-8 dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col">
        {selectedChatId && chats.length > 0 ? (
          <>
            <CardHeader className="py-3 px-4 border-b dark:border-gray-800">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-600 text-white">
                      {getAvatarFallback(chats.find(c => c.id === selectedChatId) || { id: selectedChatId })}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{formatChatName(chats.find(c => c.id === selectedChatId) || { id: selectedChatId })}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-600 border-green-200">
                        WhatsApp
                      </Badge>
                      <span>ID: {selectedChatId.split('@')[0]}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => markAsUnread(selectedChatId)}>
                        Mark as Unread
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleArchiveChat(selectedChatId, false)}>
                        Archive Chat
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500" onClick={() => deleteChat(selectedChatId)}>
                        Delete Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin mr-2">
                    <RefreshCcw size={20} />
                  </div>
                  <span>Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                  <p className="text-gray-500 text-center max-w-sm">
                    Send a message to start the conversation
                  </p>
                </div>
              ) : (
                <>
                  {groupMessagesByDate(messages).map(([date, dateMessages]) => (
                    <div key={date}>
                      <div className="text-center text-xs text-gray-500 py-2">
                        {date}
                      </div>
                      
                      {dateMessages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                          {!message.fromMe && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2 mt-1 overflow-hidden">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {chats.find(c => c.id === selectedChatId)?.name?.substring(0, 2) || 'WA'}
                              </span>
                            </div>
                          )}
                          <div 
                            className={`max-w-[80%] rounded-lg p-4 shadow-sm group relative ${
                              message.fromMe 
                                ? 'bg-green-500 text-white rounded-tr-none' 
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
                            }`}
                          >
                            <div className="whitespace-pre-wrap text-sm">{message.body}</div>
                            <div className={`text-xs mt-2 text-right flex items-center justify-end ${
                              message.fromMe 
                                ? 'text-green-100' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {formatTimestamp(message.timestamp)}
                              {message.fromMe && message.ack && (
                                <span className="ml-1" title={`Status: ${message.ackName || 'Sent'}`}>
                                  {message.ack >= 3 ? (
                                    <CheckCircle className="h-3 w-3" />
                                  ) : message.ack >= 2 ? (
                                    <div className="flex">
                                      <CheckCircle className="h-3 w-3" />
                                      <CheckCircle className="h-3 w-3 -ml-1" />
                                    </div>
                                  ) : (
                                    <CheckCircle className="h-3 w-3 opacity-70" />
                                  )}
                                </span>
                              )}
                            </div>
                            
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => togglePinMessage(message.id, false)}>
                                    <Pin className="h-4 w-4 mr-2" />
                                    Pin Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setMessageText(message.body)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Copy Text
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-500"
                                    onClick={() => deleteMessage(message.id)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          {message.fromMe && (
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center ml-2 mt-1 overflow-hidden">
                              <span className="text-sm font-medium text-white">
                                ME
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </CardContent>
            
            <div className="p-4 border-t dark:border-gray-800">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 transition-all duration-200"
                  disabled={isLoading || !messageText.trim()}
                >
                  {isLoading ? (
                    <div className="animate-spin">
                      <RefreshCcw className="h-4 w-4" />
                    </div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <Badge variant="outline" className="text-[10px] h-5 mr-2 bg-green-50 text-green-600 border-green-200">
                    WhatsApp API
                  </Badge>
                  Connected to WAHA API
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mb-4 animate-float-subtle" />
            <h3 className="text-lg font-medium mb-2">No chat selected</h3>
            <p className="text-gray-500 text-center max-w-sm">
              Select a WhatsApp chat from the list or connect to WhatsApp API
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WhatsAppChatInterface;
