import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginUserSchema, registerUserSchema, chatRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import crypto from "crypto";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Middleware to verify Supabase JWT token
const verifyToken = async (req: Request, res: Response, next: Function) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // Add user data to request
    req.body.supabaseUser = data.user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat routes - protected by authentication
  app.post("/api/chat", verifyToken, async (req, res) => {
    try {
      const { message, sessionId = crypto.randomUUID() } = chatRequestSchema.parse(req.body);
      const supabaseUser = req.body.supabaseUser;
      
      // For demo purposes, we'll create a simple mapping between Supabase user ID and our internal user ID
      // In a real app, this would be handled by the database relations
      let user = await storage.getUserByEmail(supabaseUser.email);
      
      // Create user if not exists in our local store
      if (!user) {
        user = await storage.createUser({
          email: supabaseUser.email,
          password: 'supabase-managed', // Password is managed by Supabase
        });
      }
      
      // Store user message
      const userMessage = await storage.createMessage({
        user_id: user.id,
        content: message,
        role: "user",
        session_id: sessionId
      });
      
      // This is where you would call the n8n endpoint with the message
      // For now, simulate a response
      const assistantResponse = "This is a simulated response. In a real application, this would be the response from n8n calling the Groq AI model.";
      
      // Store assistant response
      const assistantMessage = await storage.createMessage({
        user_id: user.id,
        content: assistantResponse,
        role: "assistant",
        session_id: sessionId
      });
      
      return res.status(200).json({ 
        message: assistantMessage,
        sessionId
      });
    } catch (error) {
      console.error('Chat API error:', error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/chat/history", verifyToken, async (req, res) => {
    try {
      const supabaseUser = req.body.supabaseUser;
      const sessionId = req.query.sessionId as string;
      
      // Find or create user in our local store
      let user = await storage.getUserByEmail(supabaseUser.email);
      
      if (!user) {
        user = await storage.createUser({
          email: supabaseUser.email,
          password: 'supabase-managed',
        });
      }
      
      const messages = await storage.getMessagesBySession(user.id, sessionId);
      
      return res.status(200).json({ messages });
    } catch (error) {
      console.error('Chat history API error:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
