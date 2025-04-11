import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
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
      
      // Find or create user profile in Supabase
      const userId = parseInt(supabaseUser.id);

      // Check if the user exists in our profiles table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (userError && userError.code !== 'PGRST116') { // Not found
        throw new Error(`User lookup error: ${userError.message}`);
      }
      
      // If user not found, create a profile
      if (!userData) {
        await supabase
          .from('users')
          .insert([{
            id: userId,
            email: supabaseUser.email,
            created_at: new Date()
          }]);
      }
      
      // Store user message in Supabase
      const { data: userMessageData, error: userMessageError } = await supabase
        .from('messages')
        .insert([{
          user_id: userId,
          content: message,
          role: "user",
          session_id: sessionId,
          created_at: new Date()
        }])
        .select();
        
      if (userMessageError) {
        throw new Error(`Failed to save user message: ${userMessageError.message}`);
      }
      
      // This is where you would call the n8n endpoint with the message
      // For now, simulate a response
      const assistantResponse = "This is a simulated response. In a real application, this would be the response from n8n calling the Groq AI model.";
      
      // Store assistant response in Supabase
      const { data: assistantMessageData, error: assistantMessageError } = await supabase
        .from('messages')
        .insert([{
          user_id: userId,
          content: assistantResponse,
          role: "assistant",
          session_id: sessionId,
          created_at: new Date()
        }])
        .select();
        
      if (assistantMessageError) {
        throw new Error(`Failed to save assistant message: ${assistantMessageError.message}`);
      }
      
      return res.status(200).json({ 
        message: assistantMessageData[0],
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
  
  // Route to create necessary tables
  app.post("/api/create-tables", verifyToken, async (req, res) => {
    try {
      // Create users table
      const { error: usersError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS users (
            id BIGINT PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `
      });
      
      // Create messages table - not dependent on users to avoid foreign key issues
      const { error: messagesError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL,
            content TEXT NOT NULL,
            role TEXT NOT NULL,
            session_id TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
          CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
        `
      });
      
      if (usersError || messagesError) {
        return res.status(500).json({ 
          message: "Table creation failed", 
          usersError: usersError?.message,
          messagesError: messagesError?.message 
        });
      }
      
      return res.status(200).json({ message: "Tables created successfully" });
    } catch (error) {
      console.error('Table creation error:', error);
      return res.status(500).json({ message: "Failed to create tables" });
    }
  });

  app.get("/api/chat/history", verifyToken, async (req, res) => {
    try {
      const supabaseUser = req.body.supabaseUser;
      const sessionId = req.query.sessionId as string;
      const userId = parseInt(supabaseUser.id);
      
      // First check if the messages table exists
      try {
        // Get messages from Supabase
        const { data: messages, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('user_id', userId)
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true });
          
        if (messagesError) {
          // Check if the error is that the table doesn't exist
          if (messagesError.message.includes('relation') && messagesError.message.includes('does not exist')) {
            // Table doesn't exist, return empty array for now
            return res.status(200).json({ messages: [] });
          }
          throw new Error(`Failed to retrieve message history: ${messagesError.message}`);
        }
        
        return res.status(200).json({ messages: messages || [] });
      } catch (error) {
        // In case of any other error, return empty array
        console.warn('Error fetching messages:', error);
        return res.status(200).json({ messages: [] });
      }
    } catch (error) {
      console.error('Chat history API error:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
