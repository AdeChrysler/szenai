export interface AuthUser {
  id: string;
  email: string;
  created_at?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}

export interface UserMenuProps {
  user: AuthUser;
  onSignOut: () => void;
}
