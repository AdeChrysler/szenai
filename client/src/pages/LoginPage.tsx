
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginUser, RegisterUser } from '@shared/schema';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Zap } from 'lucide-react';

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
    <div className="flex min-h-screen bg-[#0f172a] dark:bg-gray-950">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="max-w-md w-full space-y-6 bg-[#0c1525] dark:bg-gray-900 p-8 rounded-lg shadow-md border-blue-900/30 dark:border-gray-800 text-white">
          <CardHeader className="space-y-2 text-center p-0">
            <div className="mx-auto mb-2 bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              {currentForm === 'login' ? 'Selamat Datang' : 'Buat Akun'}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {currentForm === 'login'
                ? 'Masuk ke akun Anda untuk melanjutkan'
                : 'Daftar untuk akun baru dan nikmati fitur Zenith AI'}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {error && (
              <Alert variant="destructive" className="mb-6 rounded-md bg-red-50 dark:bg-red-900/30 p-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
