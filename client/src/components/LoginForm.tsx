import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema, LoginUser } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LockOpen } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginUser) => void;
  onSwitchToRegister: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSwitchToRegister, isLoading }) => {
  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-gray-200">Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="email@example.com"
                  className="appearance-none rounded-xl h-12 relative block w-full px-4 py-3 bg-blue-950/50 backdrop-blur-sm border border-blue-900/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-gray-200">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="appearance-none rounded-xl h-12 relative block w-full px-4 py-3 bg-blue-950/50 backdrop-blur-sm border border-blue-900/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-blue-800 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
              Lupa password?
            </a>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 h-12 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-900/30 transition-all duration-200 hover:shadow-blue-800/40"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockOpen className="h-5 w-5 text-blue-300" aria-hidden="true" />
            </span>
            {isLoading ? 'Sedang masuk...' : 'Masuk ke Akun'}
          </Button>
        </div>
        
        <div className="text-center">
          <p className="mt-3 text-sm text-gray-300">
            Belum punya akun?{' '}
            <Button
              variant="link"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 p-0"
              onClick={onSwitchToRegister}
              type="button"
            >
              Daftar disini
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
