import { Express, Request, Response } from 'express';
import axios, { AxiosInstance } from 'axios';
import { rateLimit } from 'express-rate-limit';
import { Server as SocketIOServer } from "socket.io";

// Configuration
const WAHA_BASE_URL = 'http://waha.sixzenith.space:3002/api';
const WAHA_SESSION = 'z17';
const WAHA_API_KEY = '666';

// Cache configuration
const CACHE_TTL = 60 * 1000; // 1 minute
const cache = new Map<string, { data: any; timestamp: number }>();

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Initialize axios instance for WAHA API
const wahaAxios: AxiosInstance = axios.create({
  baseURL: WAHA_BASE_URL,
  headers: {
    'accept': '*/*',
    'X-Api-Key': WAHA_API_KEY
  },
  timeout: 30000 // 30 seconds
});

// Get data from cache
function getCachedData(key: string): any | null {
  const cachedItem = cache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_TTL) {
    return cachedItem.data;
  }
  return null;
}

// Set data in cache
function setCachedData(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// Error handler
function handleApiError(error: any, res: Response) {
  console.error('WAHA API Error:', error);

  if (error.response) {
    return res.status(error.response.status).json({
      error: 'WAHA API Error',
      status: error.response.status,
      message: error.response.data.message || error.message,
      data: error.response.data
    });
  } else if (error.request) {
    return res.status(502).json({
      error: 'WAHA API Connection Error',
      message: 'No response received from WAHA API'
    });
  } else {
    return res.status(500).json({
      error: 'WAHA API Request Error',
      message: error.message
    });
  }
}

let io: SocketIOServer | null = null;

export function setupWAHAProxy(app: Express, socketServer?: SocketIOServer) {
  // Apply rate limiter to all WhatsApp API endpoints
  app.use('/api/whatsapp', apiLimiter);

  // CORS headers for all WhatsApp API endpoints
  app.use('/api/whatsapp', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });

  // Store the Socket.IO server if provided
  if (socketServer) {
    io = socketServer;
  }

  // Get all chats
  app.get('/api/whatsapp/chats', async (req: Request, res: Response) => {
    const { limit, offset, sortBy, sortOrder } = req.query;
    const cacheKey = `chats:${JSON.stringify(req.query)}`;

    try {
      // Check cache first
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        res.header('X-Cache', 'HIT');
        return res.json(cachedData);
      }

      const response = await wahaAxios.get(`/${WAHA_SESSION}/chats`, {
        params: { limit, offset, sortBy, sortOrder }
      });

      // Cache the result
      setCachedData(cacheKey, response.data);

      res.header('X-Cache', 'MISS');
      res.header('Cache-Control', 'max-age=60'); // Client-side cache for 1 minute
      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Get chats overview
  app.get('/api/whatsapp/chats/overview', async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    const cacheKey = `chats-overview:${JSON.stringify(req.query)}`;

    try {
      // Check cache first
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        res.header('X-Cache', 'HIT');
        return res.json(cachedData);
      }

      const response = await wahaAxios.get(`/${WAHA_SESSION}/chats/overview`, {
        params: { limit, offset }
      });

      // Cache the result
      setCachedData(cacheKey, response.data);

      res.header('X-Cache', 'MISS');
      res.header('Cache-Control', 'max-age=60'); // Client-side cache for 1 minute
      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Get chat picture
  app.get('/api/whatsapp/chats/:chatId/picture', async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { refresh } = req.query;
    const cacheKey = `chat-picture:${chatId}:${refresh}`;

    try {
      // Check cache first (unless refresh is true)
      if (refresh !== 'true') {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
          res.header('X-Cache', 'HIT');
          return res.json(cachedData);
        }
      }

      const response = await wahaAxios.get(`/${WAHA_SESSION}/chats/${chatId}/picture`, {
        params: { refresh }
      });

      // Cache the result
      setCachedData(cacheKey, response.data);

      res.header('X-Cache', 'MISS');
      res.header('Cache-Control', 'max-age=3600'); // Client-side cache for 1 hour
      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Archive chat
  app.post('/api/whatsapp/chats/:chatId/archive', async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const response = await wahaAxios.post(`/${WAHA_SESSION}/chats/${chatId}/archive`);

      // Clear related cache entries
      for (const key of Array.from(cache.keys())) {
        if (key.includes('chats')) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Unarchive chat
  app.post('/api/whatsapp/chats/:chatId/unarchive', async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const response = await wahaAxios.post(`/${WAHA_SESSION}/chats/${chatId}/unarchive`);

      // Clear related cache entries
      for (const key of Array.from(cache.keys())) {
        if (key.includes('chats')) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Mark chat as unread
  app.post('/api/whatsapp/chats/:chatId/unread', async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const response = await wahaAxios.post(`/${WAHA_SESSION}/chats/${chatId}/unread`);

      // Clear related cache entries
      for (const key of Array.from(cache.keys())) {
        if (key.includes('chats')) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Delete chat
  app.delete('/api/whatsapp/chats/:chatId', async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const response = await wahaAxios.delete(`/${WAHA_SESSION}/chats/${chatId}`);

      // Clear related cache entries
      for (const key of Array.from(cache.keys())) {
        if (key.includes('chats') || key.includes(chatId)) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Get messages
  app.get('/api/whatsapp/chats/:chatId/messages', async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { limit, offset, downloadMedia, filter } = req.query;
    const cacheKey = `messages:${chatId}:${JSON.stringify(req.query)}`;

    try {
      // Check cache first
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        res.header('X-Cache', 'HIT');
        return res.json(cachedData);
      }

      const response = await wahaAxios.get(`/${WAHA_SESSION}/chats/${chatId}/messages`, {
        params: { limit, offset, downloadMedia, filter }
      });

      // Cache the result
      setCachedData(cacheKey, response.data);

      res.header('X-Cache', 'MISS');
      res.header('Cache-Control', 'max-age=30'); // Client-side cache for 30 seconds
      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Get specific message
  app.get('/api/whatsapp/chats/:chatId/messages/:messageId', async (req: Request, res: Response) => {
    const { chatId, messageId } = req.params;
    const { downloadMedia } = req.query;
    const cacheKey = `message:${chatId}:${messageId}:${downloadMedia}`;

    try {
      // Check cache first
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        res.header('X-Cache', 'HIT');
        return res.json(cachedData);
      }

      const response = await wahaAxios.get(
        `/${WAHA_SESSION}/chats/${chatId}/messages/${messageId}`,
        { params: { downloadMedia } }
      );

      // Cache the result
      setCachedData(cacheKey, response.data);

      res.header('X-Cache', 'MISS');
      res.header('Cache-Control', 'max-age=300'); // Client-side cache for 5 minutes
      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Pin message
  app.post('/api/whatsapp/chats/:chatId/messages/:messageId/pin', async (req: Request, res: Response) => {
    const { chatId, messageId } = req.params;
    const { duration } = req.body;

    try {
      const response = await wahaAxios.post(
        `/${WAHA_SESSION}/chats/${chatId}/messages/${messageId}/pin`,
        { duration }
      );

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Unpin message
  app.post('/api/whatsapp/chats/:chatId/messages/:messageId/unpin', async (req: Request, res: Response) => {
    const { chatId, messageId } = req.params;

    try {
      const response = await wahaAxios.post(
        `/${WAHA_SESSION}/chats/${chatId}/messages/${messageId}/unpin`
      );

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Edit message
  app.put('/api/whatsapp/chats/:chatId/messages/:messageId', async (req: Request, res: Response) => {
    const { chatId, messageId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    try {
      const response = await wahaAxios.put(
        `/${WAHA_SESSION}/chats/${chatId}/messages/${messageId}`,
        { text }
      );

      // Invalidate message cache
      for (const key of Array.from(cache.keys())) {
        if (key.includes(messageId) || key.includes(`messages:${chatId}`)) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Delete message
  app.delete('/api/whatsapp/chats/:chatId/messages/:messageId', async (req: Request, res: Response) => {
    const { chatId, messageId } = req.params;

    try {
      const response = await wahaAxios.delete(
        `/${WAHA_SESSION}/chats/${chatId}/messages/${messageId}`
      );

      // Invalidate message cache
      for (const key of Array.from(cache.keys())) {
        if (key.includes(messageId) || key.includes(`messages:${chatId}`)) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Delete all messages
  app.delete('/api/whatsapp/chats/:chatId/messages', async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const response = await wahaAxios.delete(`/${WAHA_SESSION}/chats/${chatId}/messages`);

      // Invalidate message cache
      for (const key of Array.from(cache.keys())) {
        if (key.includes(`messages:${chatId}`) || key.includes(`message:${chatId}`)) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });

  // Middleware to handle API requests to WAHA
  app.use('/api/whatsapp', async (req, res) => {
    try {
      // Create a new URL for the WAHA API by replacing the prefix
      const wahaEndpoint = req.url.replace(/^\//, '/api/z17/');
      const url = `${WAHA_BASE_URL}${wahaEndpoint}`;

      console.log(`Proxying request to: ${url}`);

      // Check if this is a send message request to emit events after
      const isSendMessage = req.method === 'POST' &&
                            req.url.includes('/messages/chat') ||
                            req.url.includes('/messages/text');

      // Forward the same HTTP method and body
      const response = await wahaAxios({
        method: req.method,
        url,
        data: req.body,
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': WAHA_API_KEY
        },
        validateStatus: () => true, // Accept any status code
      });

      // If this was a successful message send, emit a socket event
      if (isSendMessage && response.status >= 200 && response.status < 300 && io) {
        io.emit('whatsapp_update', {
          chatId: req.body.chatId,
          messageId: response.data?.id,
          text: req.body.text,
          timestamp: Math.floor(Date.now() / 1000)
        });
      }

      // Forward the WAHA response back to the client
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('WAHA proxy error:', error);
      res.status(500).json({
        error: 'WAHA API Error',
        status: 500,
        message: error.message
      });
    }
  });

  // Send message
  app.post('/api/whatsapp/messages/chat', async (req: Request, res: Response) => {
    const { chatId, text, quotedMessageId } = req.body;

    if (!chatId || !text) {
      return res.status(400).json({ error: 'chatId and text are required' });
    }

    try {
      const response = await wahaAxios.post(`/${WAHA_SESSION}/messages/chat`, {
        chatId,
        text,
        quotedMessageId
      });

      // Invalidate chat messages cache
      for (const key of Array.from(cache.keys())) {
        if (key.includes(`messages:${chatId}`)) {
          cache.delete(key);
        }
      }

      return res.json(response.data);
    } catch (error) {
      return handleApiError(error, res);
    }
  });
}

// Export function to set the Socket.IO server later if needed
export function setSocketIOServer(socketServer: SocketIOServer) {
  io = socketServer;
}