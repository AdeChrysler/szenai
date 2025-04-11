import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Supabase client for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize database tables
export async function initializeDatabase() {
  try {
    console.log('Initializing database tables...');
    
    // Check if users table exists
    const { error: usersTableError } = await supabase.from('users').select('count').limit(1);
    
    if (usersTableError && usersTableError.code === '42P01') {
      console.log('Users table does not exist. It will be created through the API.');
    } else {
      console.log('Users table already exists.');
    }
    
    // Check if messages table exists
    const { error: messagesTableError } = await supabase.from('messages').select('count').limit(1);
    
    if (messagesTableError && messagesTableError.code === '42P01') {
      console.log('Messages table does not exist. It will be created through the API.');
    } else {
      console.log('Messages table already exists.');
    }
    
    console.log('Database initialization check complete.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}