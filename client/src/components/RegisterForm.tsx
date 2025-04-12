import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon, UserPlusIcon, MailIcon, KeyIcon, UserIcon, BuildingIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [, setLocation] = useLocation();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Silakan isi semua field yang wajib",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password tidak sama",
        variant: "destructive",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "Anda harus menyetujui syarat dan ketentuan",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email,
        password,
        name,
        company: company || undefined
      });
      toast({
        title: "Pendaftaran berhasil",
        description: "Akun Anda telah dibuat. Silakan masuk.",
      });
      setLocation('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Pendaftaran gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md border-blue-500/20 shadow-xl dark:bg-gray-900/90 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">Buat Akun Baru</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Lengkapi data berikut untuk membuat akun Zenith AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">Nama Lengkap</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-gray-800/80 border-gray-700 text-white focus-visible:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-200">Perusahaan (Opsional)</Label>
              <div className="relative">
                <BuildingIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Nama Perusahaan"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="pl-10 bg-gray-800/80 border-gray-700 text-white focus-visible:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="nama@perusahaan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-800/80 border-gray-700 text-white focus-visible:ring-blue-500"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-gray-800/80 border-gray-700 text-white focus-visible:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-100"
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-xs text-gray-400">Minimal 8 karakter dengan huruf dan angka</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-200">Konfirmasi Password</Label>
            <div className="relative">
              <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-gray-800/80 border-gray-700 text-white focus-visible:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-400 leading-tight"
            >
              Saya menyetujui{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-400 hover:text-blue-300 text-sm"
                type="button"
              >
                Syarat dan Ketentuan
              </Button>{' '}
              serta{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-400 hover:text-blue-300 text-sm"
                type="button"
              >
                Kebijakan Privasi
              </Button>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 mt-2 group"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <UserPlusIcon className="mr-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
                Daftar
              </div>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-gray-800 pt-4">
        <div className="text-center text-sm text-gray-400 mt-4">
          Sudah punya akun?{' '}
          <Button 
            variant="link" 
            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
            onClick={() => setLocation('/login')}
          >
            Masuk Sekarang
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;