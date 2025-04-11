import { pool } from './db';

// Initialize database tables using PostgreSQL
export async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Initializing database tables...');
    
    // Start a transaction
    await client.query('BEGIN');
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('Users table created or already exists');
    
    // Create messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        session_id TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('Messages table created or already exists');
    
    // Create indexes for faster queries
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
      CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
    `);
    console.log('Indexes created or already exist');
    
    // Commit the transaction
    await client.query('COMMIT');
    
    console.log('Database initialization complete');
  } catch (error) {
    // Rollback in case of error
    await client.query('ROLLBACK');
    console.error('Failed to initialize database:', error);
  } finally {
    client.release();
  }
}

// Pool is now imported from db.ts