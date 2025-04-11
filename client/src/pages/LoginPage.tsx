import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginUser, RegisterUser } from '@shared/schema';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, register, isLoading, error } = useAuth();
  const [currentForm, setCurrentForm] = useState<'login' | 'register'>('login');

  const handleLoginSubmit = async (data: LoginUser) => {
    await login(data);
  };

  const handleRegisterSubmit = async (data: RegisterUser) => {
    await register(data);
  };

  const switchToRegister = () => {
    setCurrentForm('register');
  };

  const switchToLogin = () => {
    setCurrentForm('login');
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {currentForm === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {currentForm === 'login'
              ? 'Sign in to your account to continue'
              : 'Register for a new account'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <AlertDescription className="text-sm font-medium text-red-800 dark:text-red-200 ml-2">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {currentForm === 'login' ? (
          <LoginForm
            onSubmit={handleLoginSubmit}
            onSwitchToRegister={switchToRegister}
            isLoading={isLoading}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegisterSubmit}
            onSwitchToLogin={switchToLogin}
            isLoading={isLoading}
          />
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
