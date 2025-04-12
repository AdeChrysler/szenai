import { users, messages, type User, type InsertUser, type Message, type InsertMessage } from "@shared/schema";
import { pool } from './db';

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySession(userId: number, sessionId: string): Promise<Message[]>;
  getAllUserMessages(userId: number): Promise<Message[]>;
}

// PostgreSQL-based storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    return result.rows[0] || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows[0] || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [insertUser.email, insertUser.password]
    );
    
    return result.rows[0];
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = await pool.query(
      'INSERT INTO messages (user_id, content, role, session_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        insertMessage.user_id,
        insertMessage.content,
        insertMessage.role,
        insertMessage.session_id
      ]
    );
    
    return result.rows[0];
  }

  async getMessagesBySession(userId: number, sessionId: string): Promise<Message[]> {
    const result = await pool.query(
      'SELECT * FROM messages WHERE user_id = $1 AND session_id = $2 ORDER BY created_at ASC',
      [userId, sessionId]
    );
    
    return result.rows;
  }
  
  async getAllUserMessages(userId: number): Promise<Message[]> {
    const result = await pool.query(
      'SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at ASC',
      [userId]
    );
    
    return result.rows;
  }
}

// Export DatabaseStorage instance
export const storage = new DatabaseStorage();
