
import React from 'react';
import { DashboardLayout } from './DashboardPage';
import { WhatsAppProvider } from '@/contexts/WhatsAppContext';
import { WhatsAppInterface } from '@/components/WhatsAppInterface';

const WhatsAppNewChatPage: React.FC = () => {
  return (
    <DashboardLayout>
      <WhatsAppProvider>
        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">WhatsApp Chat Interface</h1>
            <p className="text-muted-foreground">
              Manage and view your WhatsApp conversations
            </p>
          </div>
          <WhatsAppInterface />
        </div>
      </WhatsAppProvider>
    </DashboardLayout>
  );
};

export default WhatsAppNewChatPage;
