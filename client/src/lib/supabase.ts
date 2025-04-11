import { createClient } from '@supabase/supabase-js';

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
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
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
