
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// Base types for WAHA API
export interface WAHAChat {
  id: string;
  conversationTimestamp?: number;
  readOnly?: boolean;
  ephemeralExpiration?: number;
  ephemeralSettingTimestamp?: number;
  notSpam?: boolean;
  disappearingMode?: any;
  unreadMentionCount?: number;
  markedAsUnread?: boolean;
  tcToken?: any;
  tcTokenTimestamp?: number;
  contactPrimaryIdentityKey?: any;
  tcTokenSenderTimestamp?: number;
  lidJid?: string;
  commentsCount?: number;
  locked?: boolean;
  name?: string;
  picture?: string;
  lastMessage?: WAHAMessage;
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
  ack?: number;
  ackName?: string;
  replyTo?: any;
  _data?: any;
}

export interface WAHAPictureResponse {
  url: string | null;
}

// Types for request parameters
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

export interface PinMessageParams {
  duration?: number; // in seconds (default: 7 days = 604800)
}

export interface EditMessageParams {
  text: string;
}

export interface SendMessageParams {
  text: string;
  quotedMessageId?: string;
}

// WAHA API client class
export class WAHAApiClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  private sessionName: string;

  constructor(baseUrl: string = 'http://waha.sixzenith.space:3002', sessionName: string = 'z17', apiKey: string = '666') {
    this.baseUrl = baseUrl;
    this.sessionName = sessionName;
    
    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}/api/${sessionName}`,
      headers: {
        'accept': '*/*',
        'X-Api-Key': apiKey
      },
      timeout: 30000 // 30 seconds timeout
    });
    
    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      response => response,
      this.handleApiError
    );
  }
  
  // Error handler
  private handleApiError(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('WAHA API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      
      // Return custom error with more context
      return Promise.reject({
        status: error.response.status,
        message: error.message,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('WAHA API No Response:', error.request);
      return Promise.reject({
        status: 0,
        message: 'No response received from WAHA API',
        error: error.request
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('WAHA API Request Error:', error.message);
      return Promise.reject({
        status: 0,
        message: 'Error setting up WAHA API request',
        error: error.message
      });
    }
  }
  
  // Utility function to encode chat and message IDs properly
  private encodeId(id: string): string {
    return encodeURIComponent(id);
  }
  
  // Chat endpoints
  
  /**
   * Get all chats with optional sorting and pagination
   */
  async getChats(params?: GetChatsParams) {
    try {
      const response = await this.axiosInstance.get<WAHAChat[]>('/chats', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  }
  
  /**
   * Get chat overview information
   */
  async getChatsOverview(limit?: number, offset?: number) {
    try {
      const response = await this.axiosInstance.get<WAHAChat[]>('/chats/overview', { 
        params: { limit, offset } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chats overview:', error);
      throw error;
    }
  }
  
  /**
   * Get chat profile picture
   */
  async getChatPicture(chatId: string, refresh?: boolean) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.get<WAHAPictureResponse>(`/chats/${encodedChatId}/picture`, {
        params: { refresh }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching chat picture for ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Archive a chat
   */
  async archiveChat(chatId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.post(`/chats/${encodedChatId}/archive`);
      return response.data;
    } catch (error) {
      console.error(`Error archiving chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Unarchive a chat
   */
  async unarchiveChat(chatId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.post(`/chats/${encodedChatId}/unarchive`);
      return response.data;
    } catch (error) {
      console.error(`Error unarchiving chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Mark chat as unread
   */
  async markChatAsUnread(chatId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.post(`/chats/${encodedChatId}/unread`);
      return response.data;
    } catch (error) {
      console.error(`Error marking chat ${chatId} as unread:`, error);
      throw error;
    }
  }
  
  /**
   * Delete a chat
   */
  async deleteChat(chatId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.delete(`/chats/${encodedChatId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting chat ${chatId}:`, error);
      throw error;
    }
  }
  
  // Message endpoints
  
  /**
   * Get messages from a chat with pagination
   */
  async getMessages(chatId: string, params?: GetMessagesParams) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.get<WAHAMessage[]>(`/chats/${encodedChatId}/messages`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Get specific message by ID
   */
  async getMessage(chatId: string, messageId: string, downloadMedia: boolean = true) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const encodedMessageId = this.encodeId(messageId);
      const response = await this.axiosInstance.get<WAHAMessage>(
        `/chats/${encodedChatId}/messages/${encodedMessageId}`,
        { params: { downloadMedia } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching message ${messageId} from chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Pin message
   */
  async pinMessage(chatId: string, messageId: string, params?: PinMessageParams) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const encodedMessageId = this.encodeId(messageId);
      const response = await this.axiosInstance.post(
        `/chats/${encodedChatId}/messages/${encodedMessageId}/pin`,
        params
      );
      return response.data;
    } catch (error) {
      console.error(`Error pinning message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Unpin message
   */
  async unpinMessage(chatId: string, messageId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const encodedMessageId = this.encodeId(messageId);
      const response = await this.axiosInstance.post(
        `/chats/${encodedChatId}/messages/${encodedMessageId}/unpin`
      );
      return response.data;
    } catch (error) {
      console.error(`Error unpinning message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Edit message
   */
  async editMessage(chatId: string, messageId: string, params: EditMessageParams) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const encodedMessageId = this.encodeId(messageId);
      const response = await this.axiosInstance.put(
        `/chats/${encodedChatId}/messages/${encodedMessageId}`,
        params
      );
      return response.data;
    } catch (error) {
      console.error(`Error editing message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete message
   */
  async deleteMessage(chatId: string, messageId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const encodedMessageId = this.encodeId(messageId);
      const response = await this.axiosInstance.delete(
        `/chats/${encodedChatId}/messages/${encodedMessageId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting message ${messageId} in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Delete all messages in a chat
   */
  async deleteAllMessages(chatId: string) {
    try {
      const encodedChatId = this.encodeId(chatId);
      const response = await this.axiosInstance.delete(
        `/chats/${encodedChatId}/messages`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting all messages in chat ${chatId}:`, error);
      throw error;
    }
  }
  
  /**
   * Send a message to a chat
   */
  async sendMessage(chatId: string, params: SendMessageParams) {
    try {
      const response = await this.axiosInstance.post('/messages/chat', {
        chatId,
        ...params
      });
      return response.data;
    } catch (error) {
      console.error(`Error sending message to chat ${chatId}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance with default configuration
export const wahaApiClient = new WAHAApiClient();

// Export default for flexibility
export default wahaApiClient;
