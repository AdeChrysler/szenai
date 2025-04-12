
import React, { useState } from 'react';
import { DashboardLayout } from './DashboardPage';
import { 
  Share2, 
  Check, 
  X, 
  ExternalLink, 
  Settings, 
  Copy,
  RefreshCw,
  Key,
  MessageSquareText,
  Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  category: 'messaging' | 'data' | 'tools';
  connectedAt?: string;
  status?: 'healthy' | 'warning' | 'error';
  config?: Record<string, any>;
  setupUrl?: string;
}

const IntegrationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('messaging');
  const [configDialogOpen, setConfigDialogOpen] = useState<false | string>(false);
  
  const integrations: Integration[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Integrate with WhatsApp Business API to automate customer conversations',
      icon: <MessageSquareText className="h-6 w-6 text-green-600" />,
      isConnected: true,
      category: 'messaging',
      connectedAt: '2 bulan lalu',
      status: 'healthy',
      config: {
        phone: '+6281234567890',
        businessName: 'Zenith AI Demo',
        businessDescription: 'AI Chatbot untuk bisnis',
        webhookUrl: 'https://api.zenith-ai.id/webhooks/whatsapp'
      }
    },
    {
      id: 'instagram',
      name: 'Instagram DM',
      description: 'Connect Instagram direct messages to your chatbot',
      icon: <MessageSquareText className="h-6 w-6 text-purple-600" />,
      isConnected: true,
      category: 'messaging',
      connectedAt: '3 bulan lalu',
      status: 'warning',
      config: {
        username: 'zenith.ai.demo',
        pageId: '1234567890',
        webhookUrl: 'https://api.zenith-ai.id/webhooks/instagram'
      }
    },
    {
      id: 'webchat',
      name: 'Web Chat',
      description: 'Embed a chat widget on your website for visitors',
      icon: <MessageSquareText className="h-6 w-6 text-blue-600" />,
      isConnected: true,
      category: 'messaging',
      connectedAt: '5 bulan lalu',
      status: 'healthy',
      config: {
        websiteUrl: 'https://example.com',
        widgetColor: '#4F46E5',
        widgetPosition: 'bottom-right',
        welcomeMessage: 'Hai! Ada yang bisa kami bantu?'
      }
    },
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Connect Telegram bot to your business account',
      icon: <MessageSquareText className="h-6 w-6 text-blue-500" />,
      isConnected: false,
      category: 'messaging',
      setupUrl: 'https://core.telegram.org/bots#how-do-i-create-a-bot'
    },
    {
      id: 'sheets',
      name: 'Google Sheets',
      description: 'Sync leads and conversation data with Google Sheets',
      icon: <CustomBrandGoogle className="h-6 w-6 text-green-600" />,
      isConnected: false,
      category: 'data',
      setupUrl: 'https://developers.google.com/sheets/api'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Export and manage leads in Notion databases',
      icon: <Database className="h-6 w-6 text-slate-600" />,
      isConnected: false,
      category: 'data',
      setupUrl: 'https://developers.notion.com/'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect your chatbot to thousands of apps with Zapier',
      icon: <Share2 className="h-6 w-6 text-orange-600" />,
      isConnected: false,
      category: 'tools',
      setupUrl: 'https://zapier.com/developer'
    },
    {
      id: 'api',
      name: 'API Key',
      description: 'Connect with our API for custom integrations',
      icon: <Key className="h-6 w-6 text-blue-600" />,
      isConnected: true,
      category: 'tools',
      connectedAt: '1 bulan lalu',
      status: 'healthy',
      config: {
        apiKey: 'za_pk_***********************',
        usageLimit: '10,000 requests/month',
        endpoint: 'https://api.zenith-ai.id/v1'
      }
    },
  ];
  
  const filteredIntegrations = integrations.filter(
    integration => integration.category === activeTab
  );
  
  const getStatusBadge = (status?: 'healthy' | 'warning' | 'error') => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-600">Aktif</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-600">Perlu Perhatian</Badge>;
      case 'error':
        return <Badge className="bg-red-600">Error</Badge>;
      default:
        return null;
    }
  };
  
  const handleConnect = (integrationId: string) => {
    // In a real app, this would open an OAuth flow or setup process
    console.log(`Connecting to ${integrationId}`);
    toast({
      title: "Permintaan koneksi dikirim",
      description: "Anda akan diarahkan ke halaman otorisasi.",
    });
  };
  
  const handleDisconnect = (integrationId: string) => {
    console.log(`Disconnecting from ${integrationId}`);
    toast({
      title: "Integrasi diputuskan",
      description: "Layanan telah diputuskan dari akun Anda.",
    });
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Disalin ke clipboard",
      description: "Teks berhasil disalin.",
    });
  };
  
  const handleConfigSave = (integrationId: string) => {
    console.log(`Saving config for ${integrationId}`);
    setConfigDialogOpen(false);
    toast({
      title: "Pengaturan disimpan",
      description: "Perubahan pengaturan berhasil disimpan.",
    });
  };
  
  const selectedIntegration = configDialogOpen 
    ? integrations.find(i => i.id === configDialogOpen) 
    : null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Integrasi</h1>
          <p className="text-gray-500 dark:text-gray-400">Hubungkan Zenith AI dengan aplikasi dan layanan lain</p>
        </div>
        
        <Card className="overflow-hidden dark:border-gray-800 dark:bg-gray-900">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardTitle>Status Integrasi</CardTitle>
            <CardDescription className="text-blue-100">
              Pantau koneksi dengan aplikasi dan layanan pihak ketiga
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Integrasi</p>
                <p className="text-3xl font-bold mt-1">{integrations.length}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Terhubung</p>
                <p className="text-3xl font-bold mt-1">{integrations.filter(i => i.isConnected).length}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Aktif</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{integrations.filter(i => i.status === 'healthy').length}</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Memerlukan Perhatian</p>
                <p className="text-3xl font-bold mt-1 text-yellow-600">{integrations.filter(i => i.status === 'warning').length}</p>
              </div>
            </div>
            
            <Tabs defaultValue="messaging" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="messaging">Messaging</TabsTrigger>
                <TabsTrigger value="data">Data & CRM</TabsTrigger>
                <TabsTrigger value="tools">Alat & API</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredIntegrations.map((integration) => (
                    <Card key={integration.id} className="overflow-hidden dark:border-gray-800 dark:bg-gray-900">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              {integration.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{integration.name}</CardTitle>
                              <CardDescription className="text-sm">
                                {integration.description}
                              </CardDescription>
                            </div>
                          </div>
                          {integration.isConnected && getStatusBadge(integration.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 pt-4">
                        {integration.isConnected ? (
                          <>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                              Terhubung {integration.connectedAt}
                            </div>
                            <div className="flex justify-between items-center">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => setConfigDialogOpen(integration.id)}
                              >
                                <Settings className="h-3.5 w-3.5 mr-1.5" />
                                Konfigurasi
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                onClick={() => handleDisconnect(integration.id)}
                              >
                                <X className="h-3.5 w-3.5 mr-1.5" />
                                Putuskan
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between items-center">
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="text-xs bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleConnect(integration.id)}
                            >
                              <Share2 className="h-3.5 w-3.5 mr-1.5" />
                              Hubungkan
                            </Button>
                            {integration.setupUrl && (
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => window.open(integration.setupUrl, '_blank')}
                              >
                                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                Pelajari
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Config Dialog */}
      <Dialog open={!!configDialogOpen} onOpenChange={(open) => !open && setConfigDialogOpen(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedIntegration?.icon}
              <span>{selectedIntegration?.name} Configuration</span>
            </DialogTitle>
            <DialogDescription>
              Update settings and credentials for this integration
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {selectedIntegration?.id === 'whatsapp' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Nomor Telepon WhatsApp</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="phone" 
                      value={selectedIntegration.config?.phone} 
                      className="flex-1"
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleCopyToClipboard(selectedIntegration.config?.phone)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="businessName">Nama Bisnis</Label>
                  <Input 
                    id="businessName" 
                    defaultValue={selectedIntegration.config?.businessName} 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="businessDescription">Deskripsi Bisnis</Label>
                  <Input 
                    id="businessDescription" 
                    defaultValue={selectedIntegration.config?.businessDescription} 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="webhook" 
                      value={selectedIntegration.config?.webhookUrl} 
                      className="flex-1"
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleCopyToClipboard(selectedIntegration.config?.webhookUrl)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4 dark:border-gray-800">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-respond">Respons Otomatis</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Aktifkan AI untuk membalas chat WhatsApp secara otomatis
                    </p>
                  </div>
                  <Switch id="auto-respond" defaultChecked />
                </div>
              </>
            )}
            
            {selectedIntegration?.id === 'api' && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="apiKey" 
                      value={selectedIntegration.config?.apiKey} 
                      className="flex-1"
                      readOnly
                      type="password"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleCopyToClipboard('za_pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endpoint">API Endpoint</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="endpoint" 
                      value={selectedIntegration.config?.endpoint} 
                      className="flex-1"
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="shrink-0"
                      onClick={() => handleCopyToClipboard(selectedIntegration.config?.endpoint)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="usageLimit">Batas Penggunaan</Label>
                  <Input 
                    id="usageLimit" 
                    value={selectedIntegration.config?.usageLimit} 
                    readOnly
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleCopyToClipboard('# curl example\ncurl -X POST https://api.zenith-ai.id/v1/chat \\\n  -H "Authorization: Bearer za_pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"message": "Hello", "user_id": "user123"}\'')}>
                  <Code className="h-4 w-4 mr-2" />
                  Salin Contoh Kode
                </Button>
              </>
            )}
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setConfigDialogOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleConfigSave(selectedIntegration?.id || '')}
            >
              <Check className="h-4 w-4 mr-2" />
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

// Custom Google Brand icon
const CustomBrandGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.788 5.108A9 9 0 1021 12h-8"></path>
  </svg>
);

// Adding missing Code icon
const Code = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export default IntegrationsPage;
