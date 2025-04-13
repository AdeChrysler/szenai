
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import type { Request, Response } from 'express';

// WAHA API Configuration
const WAHA_API_CONFIG = {
  baseUrl: process.env.WAHA_API_URL || 'http://waha.sixzenith.space:3002',
  sessionName: process.env.WAHA_SESSION_NAME || 'z17',
  apiKey: process.env.WAHA_API_KEY || '666',
};

// Create axios instance with default configuration
const wahaAxios = axios.create({
  baseURL: `${WAHA_API_CONFIG.baseUrl}/api/${WAHA_API_CONFIG.sessionName}`,
  headers: {
    'accept': '*/*',
    'X-Api-Key': WAHA_API_CONFIG.apiKey
  },
  timeout: 30000 // 30 seconds timeout
});

/**
 * Forward request to WAHA API with proper error handling
 */
export async function proxyWahaRequest(req: Request, res: Response) {
  const { path } = req.params;
  const method = req.method.toLowerCase();
  
  try {
    // Construct the URL properly
    const url = `/api/${WAHA_API_CONFIG.sessionName}/${path || ''}`;
    
    // Forward the request to WAHA API
    const response = await wahaAxios({
      method,
      url: `/${path || ''}`,
      params: req.query,
      data: method !== 'get' ? req.body : undefined,
      responseType: 'json',
    });
    
    // Send the WAHA API response back to the client
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('WAHA API Proxy Error:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Forward the WAHA API error response to the client
        return res.status(axiosError.response.status).json(axiosError.response.data);
      } else if (axiosError.request) {
        // Request was made but no response received
        return res.status(504).json({ 
          error: 'Gateway Timeout', 
          message: 'No response received from WAHA API' 
        });
      }
    }
    
    // Generic error handling
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'An unexpected error occurred while proxying to WAHA API' 
    });
  }
}

/**
 * Register all WAHA API proxy routes
 */
export function setupWahaProxyRoutes(app: any) {
  // Proxy endpoint for WAHA API
  app.all('/api/waha/:path(*)', proxyWahaRequest);
  
  // Specific helpers for common WAHA operations
  app.get('/api/whatsapp/chats', async (req: Request, res: Response) => {
    try {
      const response = await wahaAxios.get('/chats', { params: req.query });
      return res.json(response.data);
    } catch (error) {
      console.error('Error fetching WhatsApp chats:', error);
      return res.status(500).json({ error: 'Failed to fetch WhatsApp chats' });
    }
  });
  
  app.get('/api/whatsapp/chats/overview', async (req: Request, res: Response) => {
    try {
      const response = await wahaAxios.get('/chats/overview', { params: req.query });
      return res.json(response.data);
    } catch (error) {
      console.error('Error fetching WhatsApp chats overview:', error);
      return res.status(500).json({ error: 'Failed to fetch WhatsApp chats overview' });
    }
  });
  
  app.get('/api/whatsapp/chats/:chatId/messages', async (req: Request, res: Response) => {
    try {
      const { chatId } = req.params;
      const encodedChatId = encodeURIComponent(chatId);
      const response = await wahaAxios.get(`/chats/${encodedChatId}/messages`, { 
        params: req.query 
      });
      return res.json(response.data);
    } catch (error) {
      console.error('Error fetching WhatsApp messages:', error);
      return res.status(500).json({ error: 'Failed to fetch WhatsApp messages' });
    }
  });
  
  app.post('/api/whatsapp/send', async (req: Request, res: Response) => {
    try {
      const { chatId, text, quotedMessageId } = req.body;
      
      if (!chatId || !text) {
        return res.status(400).json({ error: 'chatId and text are required' });
      }
      
      const response = await wahaAxios.post('/messages/chat', {
        chatId,
        text,
        quotedMessageId
      });
      
      return res.json(response.data);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return res.status(500).json({ error: 'Failed to send WhatsApp message' });
    }
  });
}
