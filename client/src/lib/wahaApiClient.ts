
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// Error types
export class WAHAApiError extends Error {
  status: number;
  data: any;
  
  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'WAHAApiError';
    this.status = status;
    this.data = data;
  }
}

export class WAHANetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WAHANetworkError';
  }
}

// Type definitions for API responses
export interface WAHAChat {
  id: string;
  name?: string;
  picture?: string;
  lastMessage?: WAHAMessage;
  conversationTimestamp?: number;
  readOnly?: boolean;
  ephemeralExpiration?: number;
  ephemeralSettingTimestamp?: number;
  notSpam?: boolean;
  disappearingMode?: {
    initiator: number;
  };
  unreadMentionCount?: number;
  markedAsUnread?: boolean;
  hasUnreadMessages?: boolean;
  archiveState?: 'archived' | 'unarchived';
  _chat?: any;
}

export interface WAHAMessage {
  id: string;
  timestamp: number;
  from: string;
  fromMe: boolean;
  to?: string;
  body: string;
  hasMedia?: boolean;
  mediaUrl?: string;
  mediaType?: string;
  caption?: string;
  filename?: string;
  size?: number;
  mimetype?: string;
  ack?: number;
  ackName?: string;
  isForwarded?: boolean;
  forwardingScore?: number;
  isPinned?: boolean;
  isStarred?: boolean;
  isStatus?: boolean;
  mentionedIds?: string[];
  isEdited?: boolean;
  links?: Array<{ link: string; isSuspicious: boolean }>;
  replyTo?: WAHAMessage;
  _data?: any;
}

export interface WAHAPictureResponse {
  url: string | null;
}

export interface SendMessageResponse {
  id: string;
  message: string;
  status: 'sent' | 'queued' | 'error';
}

// Request parameter types
export interface GetChatsParams {
  limit?: number;
  offset?: number;
  sortBy?: 'conversationTimestamp' | 'id' | 'name';
  sortOrder?: 'desc' | 'asc';
}

export interface GetMessagesParams {
  limit?: number;
  offset?: number;
  downloadMedia?: boolean;
  filter?: {
    timestamp?: {
      lte?: number;
      gte?: number;
    };
    fromMe?: boolean;
  };
}

export interface SendMessageParams {
  text: string;
  quotedMessageId?: string;
}

export interface PinMessageParams {
  duration?: number; // in seconds
}

export interface EditMessageParams {
  text: string;
}

// Main API client class
export class WAHAApiClient {
  private axiosInstance: AxiosInstance;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTTL: number = 60 * 1000; // 1 minute default cache TTL
  private baseUrl: string;
  private sessionName: string;
  private retryLimit: number = 3;
  private retryDelay: number = 1000; // 1 second

  constructor(
    baseUrl: string = '/api/whatsapp', // Use our proxy endpoint
    sessionName: string = 'z17',
    cacheTTL?: number
  ) {
    this.baseUrl = baseUrl;
    this.sessionName = sessionName;
    
    if (cacheTTL) {
      this.cacheTTL = cacheTTL;
    }
    
    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000, // 30 seconds timeout
    });
    
    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      response => response,
      this.handleApiError
    );
  }
  
  // Error handler
  private handleApiError = (error: AxiosError) => {
    console.error('WAHA API Error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      return Promise.reject(new WAHAApiError(
        error.message,
        error.response.status,
        error.response.data
      ));
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new WAHANetworkError('No response received from WAHA API'));
    } else {
      // Something happened in setting up the request
      return Promise.reject(new WAHANetworkError(`Error setting up request: ${error.message}`));
    }
  };
  
  // Utility functions
  
  private encodeId(id: string): string {
    return encodeURIComponent(id);
  }
  
  private getCacheKey(endpoint: string, params?: any): string {
    return `${endpoint}:${params ? JSON.stringify(params) : ''}`;
  }
  
  private getCachedData<T>(cacheKey: string): T | null {
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && Date.now() - cachedItem.timestamp < this.cacheTTL) {
      console.log(`Cache hit for ${cacheKey}`);
      return cachedItem.data as T;
    }
    return null;
  }
  
  private setCachedData(cacheKey: string, data: any): void {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }
  
  private clearCache(): void {
    this.cache.clear();
  }
  
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    retries: number = this.retryLimit
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (retries <= 0) throw error;
      
      if (error instanceof WAHANetworkError || 
         (error instanceof WAHAApiError && (error.status >= 500 || error.status === 429))) {
        console.log(`Retrying request, ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.retryRequest(requestFn, retries - 1);
      }
      
      throw error;
    }
  }
  
  // API methods
  
  async getChats(params?: GetChatsParams, useCache: boolean = true): Promise<WAHAChat[]> {
    const endpoint = '/chats';
    const cacheKey = this.getCacheKey(endpoint, params);
    
    if (useCache) {
      const cachedData = this.getCachedData<WAHAChat[]>(cacheKey);
      if (cachedData) return cachedData;
    }
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.get<WAHAChat[]>(endpoint, { params })
      );
      
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }
  
  async getChatsOverview(limit: number = 20, offset: number = 0): Promise<WAHAChat[]> {
    const endpoint = '/chats/overview';
    const params = { limit, offset };
    const cacheKey = this.getCacheKey(endpoint, params);
    
    const cachedData = this.getCachedData<WAHAChat[]>(cacheKey);
    if (cachedData) return cachedData;
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.get<WAHAChat[]>(endpoint, { params })
      );
      
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching chats overview:', error);
      throw error;
    }
  }
  
  async getChatPicture(chatId: string, refresh: boolean = false): Promise<WAHAPictureResponse> {
    const encodedChatId = this.encodeId(chatId);
    const endpoint = `/chats/${encodedChatId}/picture`;
    const params = { refresh };
    const cacheKey = this.getCacheKey(endpoint, params);
    
    if (!refresh) {
      const cachedData = this.getCachedData<WAHAPictureResponse>(cacheKey);
      if (cachedData) return cachedData;
    }
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.get<WAHAPictureResponse>(endpoint, { params })
      );
      
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chat picture for ${chatId}:`, error);
      throw error;
    }
  }
  
  async archiveChat(chatId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post(`/chats/${encodedChatId}/archive`)
      );
      
      // Invalidate relevant cache entries
      this.clearCache();
      
      return response.data;
    } catch (error) {
      console.error(`Error archiving chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async unarchiveChat(chatId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post(`/chats/${encodedChatId}/unarchive`)
      );
      
      // Invalidate relevant cache entries
      this.clearCache();
      
      return response.data;
    } catch (error) {
      console.error(`Error unarchiving chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async markChatAsUnread(chatId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post(`/chats/${encodedChatId}/unread`)
      );
      
      // Invalidate relevant cache entries
      this.clearCache();
      
      return response.data;
    } catch (error) {
      console.error(`Error marking chat ${chatId} as unread:`, error);
      throw error;
    }
  }
  
  async deleteChat(chatId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.delete(`/chats/${encodedChatId}`)
      );
      
      // Invalidate relevant cache entries
      this.clearCache();
      
      return response.data;
    } catch (error) {
      console.error(`Error deleting chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async getMessages(
    chatId: string, 
    params: GetMessagesParams = { limit: 50, downloadMedia: true }
  ): Promise<WAHAMessage[]> {
    const encodedChatId = this.encodeId(chatId);
    const endpoint = `/chats/${encodedChatId}/messages`;
    const cacheKey = this.getCacheKey(endpoint, params);
    
    const cachedData = this.getCachedData<WAHAMessage[]>(cacheKey);
    if (cachedData) return cachedData;
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.get<WAHAMessage[]>(endpoint, { params })
      );
      
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async getMessage(
    chatId: string, 
    messageId: string, 
    downloadMedia: boolean = true
  ): Promise<WAHAMessage> {
    const encodedChatId = this.encodeId(chatId);
    const encodedMessageId = this.encodeId(messageId);
    const endpoint = `/chats/${encodedChatId}/messages/${encodedMessageId}`;
    const params = { downloadMedia };
    const cacheKey = this.getCacheKey(endpoint, params);
    
    const cachedData = this.getCachedData<WAHAMessage>(cacheKey);
    if (cachedData) return cachedData;
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.get<WAHAMessage>(endpoint, { params })
      );
      
      this.setCachedData(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching message ${messageId} from chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async pinMessage(
    chatId: string, 
    messageId: string, 
    params: PinMessageParams = { duration: 604800 } // Default: 7 days
  ): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    const encodedMessageId = this.encodeId(messageId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post(
          `/chats/${encodedChatId}/messages/${encodedMessageId}/pin`,
          params
        )
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error pinning message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async unpinMessage(chatId: string, messageId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    const encodedMessageId = this.encodeId(messageId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post(
          `/chats/${encodedChatId}/messages/${encodedMessageId}/unpin`
        )
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error unpinning message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async editMessage(
    chatId: string, 
    messageId: string, 
    params: EditMessageParams
  ): Promise<WAHAMessage> {
    const encodedChatId = this.encodeId(chatId);
    const encodedMessageId = this.encodeId(messageId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.put(
          `/chats/${encodedChatId}/messages/${encodedMessageId}`,
          params
        )
      );
      
      // Invalidate message cache
      this.cache.delete(this.getCacheKey(`/chats/${encodedChatId}/messages/${encodedMessageId}`));
      
      return response.data;
    } catch (error) {
      console.error(`Error editing message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async deleteMessage(chatId: string, messageId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    const encodedMessageId = this.encodeId(messageId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.delete(
          `/chats/${encodedChatId}/messages/${encodedMessageId}`
        )
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error deleting message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async deleteAllMessages(chatId: string): Promise<any> {
    const encodedChatId = this.encodeId(chatId);
    
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.delete(`/chats/${encodedChatId}/messages`)
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error deleting all messages in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  async sendMessage(
    chatId: string, 
    params: SendMessageParams
  ): Promise<SendMessageResponse> {
    try {
      const response = await this.retryRequest(() => 
        this.axiosInstance.post('/messages/chat', {
          chatId,
          ...params
        })
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error sending message to chat ${chatId}:`, error);
      throw error;
    }
  }
}

// Create and export a default instance
export const wahaApiClient = new WAHAApiClient();

export default wahaApiClient;
