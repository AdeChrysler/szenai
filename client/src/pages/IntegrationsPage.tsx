
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  MessageCircle, 
  Instagram, 
  Globe, 
  Database, 
  File, 
  Check, 
  X, 
  ExternalLink, 
  Copy, 
  Loader2, 
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

// Types
type IntegrationStatus = 'connected' | 'not-connected' | 'pending';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  icon: React.ReactNode;
  category: 'messaging' | 'data' | 'other';
  connectedAt?: string;
}

const IntegrationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'messaging' | 'data' | 'other'>('all');
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [copiedAPI, setCopiedAPI] = useState(false);
  
  // Dummy data for integrations
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Hubungkan dengan WhatsApp Business API untuk membalas pesan otomatis.',
      status: 'connected',
      icon: <MessageCircle className="h-6 w-6 text-green-500" />,
      category: 'messaging',
      connectedAt: '12 Juni 2023'
    },
    {
      id: 'instagram',
      name: 'Instagram DM',
      description: 'Kelola DM Instagram dan comments dengan AI chatbot.',
      status: 'connected',
      icon: <Instagram className="h-6 w-6 text-pink-500" />,
      category: 'messaging',
      connectedAt: '5 Juli 2023'
    },
    {
      id: 'webchat',
      name: 'Web Chat',
      description: 'Tambahkan widget chat ke website Anda.',
      status: 'connected',
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      category: 'messaging',
      connectedAt: '18 Mei 2023'
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Sinkronkan data leads dan chat ke spreadsheet.',
      status: 'not-connected',
      icon: <File className="h-6 w-6 text-green-600" />,
      category: 'data'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Ekspor data kontak dan percakapan ke Notion database.',
      status: 'not-connected',
      icon: <Database className="h-6 w-6 text-gray-700 dark:text-gray-300" />,
      category: 'data'
    },
    {
      id: 'crm',
      name: 'CRM Integration',
      description: 'Hubungkan dengan sistem CRM seperti HubSpot, Salesforce, dll.',
      status: 'not-connected',
      icon: <Database className="h-6 w-6 text-blue-600" />,
      category: 'data'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Hubungkan dengan ribuan aplikasi lain melalui Zapier.',
      status: 'not-connected',
      icon: <ExternalLink className="h-6 w-6 text-orange-500" />,
      category: 'other'
    },
  ]);
  
  // Connect/disconnect integration
  const toggleConnection = (id: string) => {
    // Simulate connection process
    setConnecting(id);
    
    setTimeout(() => {
      const updatedIntegrations = integrations.map(integration => {
        if (integration.id === id) {
          const newStatus: IntegrationStatus = 
            integration.status === 'connected' ? 'not-connected' : 'connected';
          
          return {
            ...integration,
            status: newStatus,
            connectedAt: newStatus === 'connected' ? new Date().toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }) : undefined
          };
        }
        return integration;
      });
      
      setIntegrations(updatedIntegrations);
      setConnecting(null);
      
      // For WhatsApp, show QR Code dialog
      if (id === 'whatsapp' && integrations.find(i => i.id === id)?.status === 'not-connected') {
        setShowQRCode(true);
      }
    }, 1500);
  };
  
  // Filter integrations based on active tab
  const filteredIntegrations = integrations.filter(integration => 
    activeTab === 'all' || integration.category === activeTab
  );
  
  // Copy API key
  const copyAPIKey = () => {
    navigator.clipboard.writeText('ZA_sk-7b8f9a1c-d2e3-4f5g-6h7i-8j9k0l1m2n3o');
    setCopiedAPI(true);
    setTimeout(() => setCopiedAPI(false), 2000);
  };
  
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Integrasi</h1>
        <p className="text-gray-500 dark:text-gray-400">Hubungkan Zenith AI dengan aplikasi dan platform lain</p>
      </div>
      
      {/* API Key Card */}
      <Card className="mb-6 dark:border-gray-800 dark:bg-gray-900">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                Zenith AI API Key
              </CardTitle>
              <CardDescription>
                Gunakan API key ini untuk menghubungkan aplikasi pihak ketiga dengan Zenith AI
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => {}}>
              Reset Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input 
                value="ZA_sk-7b8f9a1c-d2e3-4f5g-6h7i-8j9k0l1m2n3o" 
                className="pr-28 font-mono text-xs"
                type="password"
                readOnly
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 text-xs"
                onClick={copyAPIKey}
              >
                {copiedAPI ? (
                  <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                )}
                {copiedAPI ? 'Tersalin' : 'Salin Key'}
              </Button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="text-amber-600">⚠️ Peringatan:</span> Jaga API key ini tetap rahasia. Jangan pernah membagikannya kepada pihak lain.
          </p>
        </CardContent>
      </Card>
      
      {/* Integration filters */}
      <div className="flex overflow-x-auto pb-2 mb-4 space-x-2">
        <Button 
          variant={activeTab === 'all' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          Semua Integrasi
        </Button>
        <Button 
          variant={activeTab === 'messaging' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveTab('messaging')}
          className={activeTab === 'messaging' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          Messaging
        </Button>
        <Button 
          variant={activeTab === 'data' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveTab('data')}
          className={activeTab === 'data' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          Data & CRM
        </Button>
        <Button 
          variant={activeTab === 'other' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveTab('other')}
          className={activeTab === 'other' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          Lainnya
        </Button>
      </div>
      
      {/* Integrations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <Card 
            key={integration.id} 
            className={`dark:border-gray-800 dark:bg-gray-900 ${
              integration.status === 'connected' ? 'border-blue-500/30 dark:border-blue-500/30' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {integration.icon}
                </div>
                <Badge 
                  variant={integration.status === 'connected' ? 'default' : 'outline'}
                  className={integration.status === 'connected' ? 'bg-green-600' : ''}
                >
                  {integration.status === 'connected' ? 'Terhubung' : 'Tidak Terhubung'}
                </Badge>
              </div>
              <CardTitle className="mt-2">{integration.name}</CardTitle>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {integration.status === 'connected' && integration.connectedAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Terhubung sejak: {integration.connectedAt}
                </p>
              )}
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {}}
                className="text-xs"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Detail
              </Button>
              
              <Button 
                variant={integration.status === 'connected' ? "destructive" : "default"} 
                size="sm"
                onClick={() => toggleConnection(integration.id)}
                disabled={connecting === integration.id}
                className={
                  integration.status === 'connected' 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              >
                {connecting === integration.id ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                    Memproses...
                  </>
                ) : integration.status === 'connected' ? (
                  <>
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    Putuskan
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                    Hubungkan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hubungkan WhatsApp Business</DialogTitle>
            <DialogDescription>
              Scan QR code ini dengan aplikasi WhatsApp di perangkat utama Anda
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg mb-4">
              {/* Dummy QR Code - in real app this would be an actual QR code */}
              <div className="w-64 h-64 grid grid-cols-8 grid-rows-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Math.random() > 0.7 ? 'bg-black' : 'bg-transparent'} ${
                      // Corners for QR code
                      (i < 16 && (i < 8 || i % 8 === 0 || i % 8 === 7)) ||
                      (i > 47 && (i % 8 === 0 || i % 8 === 7)) ||
                      (i > 47 && i < 56)
                        ? 'bg-black'
                        : ''
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              QR code will expire in 05:00 minutes
            </p>
          </div>
          
          <DialogFooter className="flex sm:justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowQRCode(false)}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button 
              onClick={() => toggleConnection('whatsapp')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Hubungkan Manual
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsPage;
