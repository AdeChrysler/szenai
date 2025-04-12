
import React, { useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
    <div className="login-container min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-[#0c1525] to-gray-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="login-blur-circle top-[10%] left-[15%]"></div>
        <div className="login-blur-circle top-[60%] right-[15%]"></div>
        <div className="login-blur-circle-sm bottom-[20%] left-[25%]"></div>
        <div className="login-blur-circle-sm top-[35%] right-[25%]"></div>
      </div>
      
      <div className="login-page-container relative z-10 w-full max-w-screen-xl flex flex-col md:flex-row mx-auto p-4 gap-8">
        <div className="login-hero md:w-1/2 flex flex-col justify-center space-y-6 p-6 md:p-12">
          <div className="login-brand flex items-center space-x-3 mb-8">
            <div className="brand-icon h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-100">Zenith AI</h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {mounted && (
              <span className="flex flex-col">
                <span>Kelola <span className="text-blue-400">WhatsApp</span></span>
                <span>Bisnis Anda dengan</span>
                <span>Kecerdasan Buatan</span>
              </span>
            )}
          </h2>
          
          <p className="text-gray-300 text-lg md:pr-12">
            Platform otomatisasi yang akan melayani pelanggan 24/7 dan menghasilkan leads tanpa bantuan manusia.
          </p>
          
          <div className="hidden md:flex space-y-4 mt-8">
            <div className="login-feature flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-200">Otomatisasi percakapan 24/7</span>
            </div>
            
            <div className="login-feature flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-200">Respons personal dari AI</span>
            </div>
            
            <div className="login-feature flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-200">Analitik data pelanggan lengkap</span>
            </div>
          </div>
        </div>
        
        <div className="login-form-container md:w-1/2 flex items-center justify-center py-8">
          <Card className="login-card w-full max-w-md space-y-6 bg-[#0c1a2e]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-blue-900/30 text-white transform transition-all duration-300 hover:shadow-blue-900/20 hover:border-blue-800/40">
            <CardHeader className="space-y-4 text-center p-0">
              <div className="mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/30">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                {currentForm === 'login' ? 'Selamat Datang' : 'Buat Akun'}
              </CardTitle>
              <CardDescription className="text-gray-300 text-base">
                {currentForm === 'login'
                  ? 'Masuk ke akun Anda untuk melanjutkan'
                  : 'Daftar untuk akun baru dan nikmati fitur Zenith AI'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-2">
              {error && (
                <Alert variant="destructive" className="mb-6 rounded-xl bg-red-900/30 p-4 border border-red-500/40">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <AlertDescription className="text-sm font-medium text-red-200 ml-2">
                      {error}
                    </AlertDescription>
                  </div>
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
    </div>
  );
};

export default LoginPage;
