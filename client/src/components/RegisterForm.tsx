import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserSchema, RegisterUser } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface RegisterFormProps {
  onSubmit: (data: RegisterUser) => void;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onSwitchToLogin, isLoading }) => {
  const form = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-200">Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="email@example.com"
                  className="appearance-none rounded-xl h-12 relative block w-full px-4 py-3 bg-blue-950/50 backdrop-blur-sm border border-blue-900/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Confirm Password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 h-12 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-900/30 transition-all duration-200 hover:shadow-blue-800/40"
          >
            {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
          </Button>
        </div>
        
        <div className="text-center">
          <p className="mt-3 text-sm text-gray-300">
            Sudah punya akun?{' '}
            <Button
              variant="link"
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 p-0"
              onClick={onSwitchToLogin}
              type="button"
            >
              Masuk disini
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
