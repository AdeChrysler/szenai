
import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from './DashboardPage';
import { WhatsAppProvider, useWhatsApp } from '@/contexts/WhatsAppContext';
import { 
  getChatDisplayName,
  getAvatarInitials,
  formatRelativeTime,
  formatMessageTime,
  groupMessagesByDate,
  linkifyText,
  debounce
} from '@/lib/whatsAppUtils';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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
import { toast } from '@/hooks/use-toast';

// Icons
import {
  Search,
  RefreshCw,
  MessageSquare,
  MoreVertical,
  Send,
  Archive,
  Check,
  CheckCheck,
  Pin,
  Trash2,
  Edit2,
  Copy,
  Reply,
  AlertTriangle,
  X,
  ArrowDownUp,
  Filter,
  Phone,
  Image as ImageIcon,
  File as FileIcon,
  User
} from 'lucide-react';

// Internal component for the actual chat interface
const WhatsAppInterface: React.FC = () => {
  const {
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
  } = useWhatsApp();

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);
  const [messageText, setMessageText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'archived' | 'unarchived'>('all');
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Filter chats when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredChats(chats);
      return;
    }
    
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = chats.filter(chat => {
      const displayName = getChatDisplayName(chat).toLowerCase();
      const id = chat.id.toLowerCase();
      const lastMessage = chat.lastMessage?.body.toLowerCase() || '';
      
      return displayName.includes(lowerQuery) || 
             id.includes(lowerQuery) || 
             lastMessage.includes(lowerQuery);
    });
    
    setFilteredChats(filtered);
  }, [searchQuery, chats]);
  
  // Sort and filter chats
  useEffect(() => {
    let filtered = [...chats];
    
    // Apply archive filter
    if (archiveFilter !== 'all') {
      filtered = filtered.filter(chat => {
        if (archiveFilter === 'archived') {
          return chat.archiveState === 'archived';
        } else {
          return chat.archiveState !== 'archived';
        }
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const timeA = a.conversationTimestamp || 0;
      const timeB = b.conversationTimestamp || 0;
      
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
    
    setFilteredChats(filtered);
  }, [chats, sortOrder, archiveFilter]);

  // Search handler with debounce
  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);
  
  // Message submission handler
  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;
    
    if (editingMessageId) {
      // Edit existing message
      editMessage(editingMessageId, messageText);
      setEditingMessageId(null);
    } else {
      // Send new message
      sendMessage(messageText);
    }
    
    setMessageText('');
  };
  
  // Handle starting message edit
  const handleStartEdit = (message: any) => {
    setEditingMessageId(message.id);
    setMessageText(message.body);
    messageInputRef.current?.focus();
  };
  
  // Handle canceling message edit
  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setMessageText('');
  };
  
  // Toggle chat archive state
  const handleToggleArchive = (chatId: string, isArchived: boolean) => {
    if (isArchived) {
      unarchiveChat(chatId);
      toast({
        title: "Chat unarchived",
        description: "The chat has been moved back to your main chat list.",
      });
    } else {
      archiveChat(chatId);
      toast({
        title: "Chat archived",
        description: "The chat has been archived.",
      });
    }
  };
  
  // Delete chat with confirmation
  const handleDeleteChat = (chatId: string) => {
    if (window.confirm('Are you sure you want to delete this chat? This cannot be undone.')) {
      deleteChat(chatId);
      toast({
        title: "Chat deleted",
        description: "The chat has been permanently deleted.",
      });
    }
  };
  
  // Delete message with confirmation
  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageId);
      toast({
        title: "Message deleted",
        description: "The message has been deleted.",
      });
    }
  };
  
  // Handle "Pin" or "Unpin" message
  const handleTogglePin = (messageId: string, isPinned: boolean) => {
    if (isPinned) {
      unpinMessage(messageId);
      toast({
        title: "Message unpinned",
        description: "The message has been unpinned.",
      });
    } else {
      pinMessage(messageId);
      toast({
        title: "Message pinned",
        description: "The message has been pinned.",
      });
    }
  };
  
  // Copy message text to clipboard
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text copied",
      description: "The message text has been copied to clipboard.",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">WhatsApp Messages</h1>
        <p className="text-muted-foreground">
          Manage and view your WhatsApp conversations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[75vh]">
        {/* Chat List */}
        <Card className="lg:col-span-4 flex flex-col h-full">
          <CardHeader className="pb-2 space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search WhatsApp chats..." 
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={refreshChats}
                disabled={isLoadingChats}
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingChats ? 'animate-spin' : ''}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOrder('desc')}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder('asc')}>
                    Oldest First
                  </DropdownMenuItem>
                  <Separator className="my-2" />
                  <DropdownMenuItem onClick={() => setArchiveFilter('all')}>
                    Show All Chats
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setArchiveFilter('archived')}>
                    Archived Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setArchiveFilter('unarchived')}>
                    Unarchived Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Tabs defaultValue="all" onValueChange={(value) => setArchiveFilter(value as any)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unarchived">Active</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-0">
            {isLoadingChats ? (
              <div className="flex items-center justify-center h-full p-4">
                <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                <span>Loading chats...</span>
              </div>
            ) : chatError ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
                <p className="text-destructive">{chatError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshChats} 
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No chats found</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                      selectedChatId === chat.id 
                        ? 'bg-primary/10 border-l-2 border-primary' 
                        : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        {chat.picture ? (
                          <AvatarImage src={chat.picture} alt={getChatDisplayName(chat)} />
                        ) : null}
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {getAvatarInitials(chat)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate mb-1">
                            {getChatDisplayName(chat)}
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {chat.conversationTimestamp 
                              ? formatRelativeTime(chat.conversationTimestamp) 
                              : ''}
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage?.body || 'No messages'}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            WhatsApp
                          </Badge>
                          
                          {chat.archiveState === 'archived' && (
                            <Badge variant="secondary" className="text-xs">
                              Archived
                            </Badge>
                          )}
                          
                          {chat.markedAsUnread && (
                            <Badge variant="destructive" className="text-xs">
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
        <Card className="lg:col-span-8 flex flex-col h-full">
          {selectedChatId && filteredChats.length > 0 ? (
            <>
              <CardHeader className="py-3 px-4 border-b flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      {filteredChats.find(c => c.id === selectedChatId)?.picture ? (
                        <AvatarImage 
                          src={filteredChats.find(c => c.id === selectedChatId)?.picture || ''} 
                          alt={getChatDisplayName(filteredChats.find(c => c.id === selectedChatId) || { id: selectedChatId })} 
                        />
                      ) : null}
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {getAvatarInitials(filteredChats.find(c => c.id === selectedChatId) || { id: selectedChatId })}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-medium">
                        {getChatDisplayName(filteredChats.find(c => c.id === selectedChatId) || { id: selectedChatId })}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px] h-5">
                          WhatsApp
                        </Badge>
                        <span>ID: {selectedChatId.split('@')[0]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Call (not implemented)</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => refreshMessages()}>
                          Refresh Messages
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => markAsUnread(selectedChatId)}>
                          Mark as Unread
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleToggleArchive(
                            selectedChatId, 
                            filteredChats.find(c => c.id === selectedChatId)?.archiveState === 'archived'
                          )}
                        >
                          {filteredChats.find(c => c.id === selectedChatId)?.archiveState === 'archived' 
                            ? 'Unarchive Chat' 
                            : 'Archive Chat'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteChat(selectedChatId)}
                          className="text-destructive"
                        >
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
                    <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                    <span>Loading messages...</span>
                  </div>
                ) : messageError ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
                    <p className="text-destructive">{messageError}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={refreshMessages}
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No messages</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start a conversation by sending a message below.
                    </p>
                  </div>
                ) : (
                  <>
                    {groupMessagesByDate(messages).map(([date, dateMessages]) => (
                      <div key={date} className="space-y-4">
                        <div className="text-center">
                          <Badge variant="outline" className="text-xs font-normal">
                            {date}
                          </Badge>
                        </div>
                        
                        {dateMessages.map((message) => (
                          <div 
                            key={message.id}
                            className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'} ${
                              message.isPinned ? 'bg-amber-50 dark:bg-amber-950/20 rounded-lg p-2' : ''
                            }`}
                          >
                            {/* Message bubble */}
                            <div
                              className={`relative group max-w-[80%] rounded-lg p-3 shadow-sm ${
                                message.fromMe 
                                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                                  : 'bg-muted text-muted-foreground rounded-bl-none'
                              }`}
                            >
                              {/* Message content */}
                              <div className="whitespace-pre-wrap text-sm">
                                {linkifyText(message.body)}
                              </div>
                              
                              {/* Message media content if present */}
                              {message.hasMedia && (
                                <div className="mt-2 p-2 bg-background/30 rounded-lg flex items-center gap-2">
                                  {message.mediaType?.startsWith('image') ? (
                                    <ImageIcon className="h-4 w-4" />
                                  ) : (
                                    <FileIcon className="h-4 w-4" />
                                  )}
                                  <span className="text-xs">
                                    Media attachment
                                  </span>
                                </div>
                              )}
                              
                              {/* Message footer with time and status */}
                              <div className={`text-xs mt-1 text-right flex items-center justify-end gap-1 ${
                                message.fromMe 
                                  ? 'text-primary-foreground/70' 
                                  : 'text-muted-foreground'
                              }`}>
                                {formatMessageTime(message.timestamp)}
                                {message.isEdited && (
                                  <span title="Edited" className="text-[10px] italic">
                                    (edited)
                                  </span>
                                )}
                                {message.fromMe && (
                                  <span title={`Status: ${message.ack ? message.ackName : 'Sending'}`}>
                                    {message.ack === 3 ? (
                                      <CheckCheck className="h-3 w-3" />
                                    ) : message.ack >= 1 ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <Check className="h-3 w-3 opacity-50" />
                                    )}
                                  </span>
                                )}
                              </div>
                              
                              {/* Message pin indicator */}
                              {message.isPinned && (
                                <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                                  <Pin className="h-3 w-3" />
                                </div>
                              )}
                              
                              {/* Message actions menu */}
                              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                                      <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleTogglePin(message.id, !!message.isPinned)}>
                                      <Pin className="h-4 w-4 mr-2" />
                                      {message.isPinned ? 'Unpin Message' : 'Pin Message'}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCopyText(message.body)}>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy Text
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setMessageText(`> ${message.body}\n\n`)}>
                                      <Reply className="h-4 w-4 mr-2" />
                                      Quote Reply
                                    </DropdownMenuItem>
                                    {message.fromMe && (
                                      <DropdownMenuItem onClick={() => handleStartEdit(message)}>
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit Message
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteMessage(message.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Message
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </CardContent>
              
              <div className="p-4 border-t flex-shrink-0">
                <form onSubmit={handleSubmitMessage} className="space-y-2">
                  {editingMessageId && (
                    <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg">
                      <div className="text-sm text-muted-foreground">
                        Editing message
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleCancelEdit}
                        className="h-6 w-6 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Input 
                      ref={messageInputRef}
                      placeholder={editingMessageId ? "Edit your message..." : "Type a message..."}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary/90"
                      disabled={!messageText.trim()}
                    >
                      {editingMessageId ? <Edit2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Badge variant="outline" className="text-[10px] h-5">
                      WAHA API
                    </Badge>
                    Connected to WhatsApp
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshMessages}
                    className="text-xs h-7"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Chat Selected</h3>
              <p className="text-muted-foreground">
                Select a chat from the list to view your WhatsApp conversations.
              </p>
              <Button 
                variant="outline" 
                onClick={refreshChats} 
                className="mt-4"
                disabled={isLoadingChats}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingChats ? 'animate-spin' : ''}`} />
                Refresh Chats
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// Main page component that wraps the interface with the provider
const NewChatUIPage: React.FC = () => {
  return (
    <DashboardLayout>
      <WhatsAppProvider>
        <WhatsAppInterface />
      </WhatsAppProvider>
    </DashboardLayout>
  );
};

export default NewChatUIPage;
