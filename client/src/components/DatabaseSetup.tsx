import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/AuthContext';

export const DatabaseSetup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [dbStatus, setDbStatus] = useState<'unchecked' | 'ready' | 'needs_setup'>('unchecked');
  const { toast } = useToast();
  const { user } = useAuth();

  // Check database status on first load
  useEffect(() => {
    const checkDatabase = async () => {
      if (!user) return;
      
      try {
        // First check if database is connected
        const dbStatusRes = await fetch('/api/db-status');
        const dbStatusData = await dbStatusRes.json();
        
        if (!dbStatusData.connected) {
          toast({
            title: 'Database Connection Issue',
            description: 'Unable to connect to PostgreSQL database.',
            variant: 'destructive',
          });
          setDbStatus('needs_setup');
          return;
        }
        
        // If connected, check if tables exist
        try {
          const response = await apiRequest('GET', '/api/chat/history', {
            queryParams: { sessionId: 'check-tables' }
          });
          
          // If we get here, the tables exist
          setDbStatus('ready');
          setSetupComplete(true);
        } catch (error) {
          // If there's an error, we might need to create tables
          setDbStatus('needs_setup');
        }
      } catch (error) {
        console.error('Database status check failed:', error);
        setDbStatus('needs_setup');
      }
    };
    
    checkDatabase();
  }, [user, toast]);

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
      
      setDbStatus('ready');
      setSetupComplete(true);
    } catch (error) {
      console.error('Error creating tables:', error);
      toast({
        title: 'Database Setup Failed',
        description: error instanceof Error ? error.message : 'Failed to create database tables',
        variant: 'destructive',
      });
      setDbStatus('needs_setup');
    } finally {
      setIsLoading(false);
    }
  };

  // Return null if setup is complete or no user is logged in
  if (setupComplete || !user || dbStatus === 'unchecked') return null;

  return (
    <Alert className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center justify-between">
        <AlertDescription className="text-yellow-800 dark:text-yellow-200">
          {dbStatus === 'needs_setup' 
            ? 'First-time setup: Initialize the database tables to enable message storage.'
            : 'PostgreSQL database is connected and ready.'}
        </AlertDescription>
        {dbStatus === 'needs_setup' && (
          <Button 
            variant="outline" 
            onClick={createTables} 
            disabled={isLoading}
            className="ml-2 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-800"
          >
            {isLoading ? 'Setting up...' : 'Initialize Database'}
          </Button>
        )}
      </div>
    </Alert>
  );
};