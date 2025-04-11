import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/AuthContext';

export const DatabaseSetup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const createTables = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const response = await apiRequest('POST', '/api/create-tables', {});
      const data = await response.json();
      
      toast({
        title: 'Database Setup',
        description: data.message || 'Tables created successfully',
      });
      
      setSetupComplete(true);
    } catch (error) {
      console.error('Error creating tables:', error);
      toast({
        title: 'Database Setup Failed',
        description: error instanceof Error ? error.message : 'Failed to create database tables',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Return null if setup is complete or no user is logged in
  if (setupComplete || !user) return null;

  return (
    <Alert className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center justify-between">
        <AlertDescription className="text-yellow-800 dark:text-yellow-200">
          First-time setup: Initialize the database tables to enable message storage.
        </AlertDescription>
        <Button 
          variant="outline" 
          onClick={createTables} 
          disabled={isLoading}
          className="ml-2 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-800"
        >
          {isLoading ? 'Setting up...' : 'Initialize Database'}
        </Button>
      </div>
    </Alert>
  );
};