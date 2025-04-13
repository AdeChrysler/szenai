import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import crypto from "crypto";
import { createClient } from '@supabase/supabase-js';
import { storage } from './storage';
import { pool } from './db';
import { setupWAHAProxy } from './waha-proxy';

// Create Supabase client for server-side operations (for authentication only)
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
  // Route to check database connection
  app.get("/api/db-status", async (req, res) => {
    try {
      // Check database connectivity
      const result = await pool.query('SELECT 1 as connected');
      return res.status(200).json({ 
        connected: result.rows[0].connected === 1,
        database: process.env.PGDATABASE || 'postgres'
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({ connected: false, error: "Database connection failed" });
    }
  });
  // Chat routes - protected by authentication
  app.post("/api/chat", verifyToken, async (req, res) => {
    try {
      const { message, sessionId = crypto.randomUUID() } = chatRequestSchema.parse(req.body);
      const supabaseUser = req.body.supabaseUser;

      // Find or create user profile in PostgreSQL database
      const userId = parseInt(supabaseUser.id);

      // Check if the user exists in our database
      let user = await storage.getUser(userId);

      // If user not found, create the profile
      if (!user) {
        // Update the database schema to handle the custom ID insertion
        try {
          await pool.query(
            'INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *',
            [userId, supabaseUser.email, '']
          );

          // Now get the user
          user = await storage.getUser(userId);

          if (!user) {
            throw new Error('Failed to create user');
          }
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user profile');
        }
      }

      // Store user message
      const userMessage = await storage.createMessage({
        user_id: userId,
        content: message,
        role: "user",
        session_id: sessionId
      });

      // This is where you would call the n8n endpoint with the message
      // For now, simulate a response
      const assistantResponse = "This is a simulated response. In a real application, this would be the response from n8n calling the Groq AI model.";

      // Store assistant response
      const assistantMessage = await storage.createMessage({
        user_id: userId,
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

  // Route to create necessary tables
  app.post("/api/create-tables", verifyToken, async (req, res) => {
    try {
      // Import the function to initialize database and call it
      const { initializeDatabase } = await import('./init-db');
      await initializeDatabase();

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

      try {
        // If sessionId is 'all', get all messages for the user
        if (sessionId === 'all') {
          // Get all messages for the user
          const messages = await storage.getAllUserMessages(userId);
          return res.status(200).json({ messages: messages || [] });
        } else {
          // Get messages from database via our storage interface for a specific session
          const messages = await storage.getMessagesBySession(userId, sessionId);
          return res.status(200).json({ messages: messages || [] });
        }
      } catch (error) {
        console.warn('Error fetching messages:', error);
        // In case of error, return empty array
        return res.status(200).json({ messages: [] });
      }
    } catch (error) {
      console.error('Chat history API error:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Set up WAHA API proxy routes
  setupWAHAProxy(app);

  const httpServer = createServer(app);

  return httpServer;
}