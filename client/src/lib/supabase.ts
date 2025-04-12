import { createClient } from '@supabase/supabase-js';
import { type User, type Message } from '@shared/schema';

// Retrieve environment variables or provide fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log environment variables for debugging (values are not exposed)
console.log(`Supabase URL exists: ${!!supabaseUrl}`);
console.log(`Supabase Key exists: ${!!supabaseAnonKey}`);

// Create Supabase client with specific options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Session management
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error);
    return { user: null, session: null, error };
  }

  return { user: data.user, session: data.session, error: null };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get session token for authenticated API requests
export const getSessionToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) throw new Error('No session found');
  return data.session.access_token;
};

// Database functions for users
export const createUserProfile = async (user: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select();

  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }

  return data[0];
};

export const getUserProfile = async (userId: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }

  return data;
};

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "Not Found"
    console.error('Error getting user by email:', error);
    throw error;
  }

  return data || null;
};

// Database functions for messages
export const createMessage = async (message: Partial<Message>) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select();

  if (error) {
    console.error('Error creating message:', error);
    throw error;
  }

  return data[0];
};

export const getMessagesBySession = async (userId: number, sessionId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error getting messages:', error);
    throw error;
  }

  return data || [];
};