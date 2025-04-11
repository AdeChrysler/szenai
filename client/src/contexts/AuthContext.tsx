import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthState, AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth';
import { signIn, signUp, signOut, getUser, supabase } from '../lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        
        // Check if we have a session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData.session) {
          // We have a session, get the user
          const user = await getUser();
          console.log('Authentication initialized:', !!user);
          
          setAuthState({
            user: user ? { id: user.id, email: user.email || '' } : null,
            isLoading: false,
            error: null,
          });
        } else {
          // No active session, but that's okay - user needs to log in
          console.log('No authentication session found - user needs to login');
          setAuthState({
            user: null,
            isLoading: false,
            error: null, // Don't show an error - it's a normal state
          });
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        
        // Check if this is a missing session error - if so, don't show it as an error
        if (error instanceof Error && error.message.includes('session')) {
          console.log('Session missing - user needs to login');
          setAuthState({
            user: null,
            isLoading: false,
            error: null, // Don't show an error - it's a normal state
          });
        } else {
          // Provide a more helpful error message for actual errors
          const errorMessage = error instanceof Error 
            ? `Authentication error: ${error.message}` 
            : 'Failed to initialize authentication';
            
          setAuthState({
            user: null,
            isLoading: false,
            error: errorMessage,
          });
        }
      }
    };

    initializeAuth();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setAuthState({
            user: { id: session.user.id, email: session.user.email || '' },
            isLoading: false,
            error: null,
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      }
    );
    
    // Clean up listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user } = await signIn(credentials.email, credentials.password);
      
      if (user) {
        setAuthState({
          user: { id: user.id, email: user.email || '' },
          isLoading: false,
          error: null,
        });
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to login',
      }));
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'Failed to login',
        variant: "destructive",
      });
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      
      const { user } = await signUp(credentials.email, credentials.password);
      
      setAuthState({
        user: user ? { id: user.id, email: user.email || '' } : null,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification.",
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to register',
      }));
      
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : 'Failed to register',
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await signOut();
      setAuthState({ user: null, isLoading: false, error: null });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to logout',
      }));
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : 'Failed to logout',
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
