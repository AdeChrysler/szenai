import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginUserSchema, registerUserSchema, chatRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      // Hash password
      const hashedPassword = crypto
        .createHash("sha256")
        .update(validatedData.password)
        .digest("hex");
      
      // Create user
      const user = await storage.createUser({
        email: validatedData.email,
        password: hashedPassword,
      });
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      
      // Get user
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Check password
      const hashedPassword = crypto
        .createHash("sha256")
        .update(validatedData.password)
        .digest("hex");
      
      if (user.password !== hashedPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId = crypto.randomUUID() } = chatRequestSchema.parse(req.body);
      const userId = req.body.userId; // In a real app, this would come from the session/token
      
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
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
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: fromZodError(error).message 
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/chat/history", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const sessionId = req.query.sessionId as string;
      
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const messages = await storage.getMessagesBySession(parseInt(userId), sessionId);
      
      return res.status(200).json({ messages });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
