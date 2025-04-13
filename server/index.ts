// waha-api-client.ts
import axios from 'axios';

interface WAHAAPIResponse {
  data: any;
  status: number;
}

export class WAHAApiClient {
  private apiKey: string;
  private baseUrl: string = 'https://api.waha.io'; // Replace with your actual base URL

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(phoneNumber: string, message: string): Promise<WAHAAPIResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/messages`, {
        to: phoneNumber,
        body: message,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return { data: response.data, status: response.status };
    } catch (error: any) {
      return { data: error.response?.data, status: error.response?.status || 500 };
    }
  }

  // Add other WAHA API methods as needed
}


// server-proxy.ts
import express from 'express';
import { WAHAApiClient } from './waha-api-client';

const router = express.Router();

// Replace with your actual API key
const wahaApiClient = new WAHAApiClient('YOUR_WAHA_API_KEY');

router.post('/send', async (req, res) => {
  const { phoneNumber, message } = req.body;
  const response = await wahaApiClient.sendMessage(phoneNumber, message);
  res.json(response);
});

export default router;


// server/routes.ts
import express from 'express';
import wahaProxy from './server-proxy';


export function registerRoutes(app: express.Application) {
  app.use('/waha', wahaProxy);
  // ... other routes
}


// whatsapp-context.ts
import { createContext, useContext, useState } from 'react';

interface WhatsAppContextType {
  messages: { from: string; body: string }[];
  sendMessage: (phoneNumber: string, message: string) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | null>(null);

export const WhatsAppProvider = ({ children }: any) => {
  const [messages, setMessages] = useState<{ from: string; body: string }[]>([]);

  const sendMessage = async (phoneNumber: string, message: string) => {
    try {
      const response = await fetch('/waha/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages([...messages, { from: phoneNumber, body: message }]);
      } else {
        console.error('Error sending message:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <WhatsAppContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsAppContext = () => {
  const context = useContext(WhatsAppContext);
  if (context === null) {
    throw new Error('useWhatsAppContext must be used within a WhatsAppProvider');
  }
  return context;
};



// chat-utils.ts
import { WAHAApiClient } from './waha-api-client';


//This is a placeholder, replace with your actual logic
export const getChatHistory = async (phoneNumber:string) => {
    return [];
}


// new-chat-ui.tsx
import React, { useState } from 'react';
import { useWhatsAppContext } from './whatsapp-context';


const NewChatUI: React.FC = () => {
  const { messages, sendMessage } = useWhatsAppContext();
  const [newMessage, setNewMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && newMessage) {
      await sendMessage(phoneNumber, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>New Chat UI</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.from}:</strong> {msg.body}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Message:
          <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default NewChatUI;


// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeDatabase } from "./init-db";
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Initialize Supabase database tables
    await initializeDatabase();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    // Continue with server startup even if database initialization fails
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();