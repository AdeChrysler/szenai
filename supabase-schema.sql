-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT, -- Will be NULL for Supabase-managed users
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_session ON messages(user_id, session_id);