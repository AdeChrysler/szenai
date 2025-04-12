
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardPage';
import { DatabaseSetup } from '@/components/DatabaseSetup';
import { 
  MessageSquare, 
  Filter, 
  Search, 
  ChevronDown, 
  Clock, 
  UserCircle, 
  MoreHorizontal 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const ChatPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const chatList = [
    {
      id: 1,
      name: 'Budi Santoso',
      lastMessage: 'Apakah ada diskon untuk pembelian paket premium?',
      timestamp: '10 menit lalu',
      status: 'terjawab',
      platform: 'WhatsApp',
      isNew: false,
      avatar: null
    },
    {
      id: 2,
      name: 'Rina Wati',
      lastMessage: 'Saya tertarik dengan paket premium Zenith AI',
      timestamp: '25 menit lalu',
      status: 'belum',
      platform: 'Instagram',
      isNew: true,
      avatar: null
    },
    {
      id: 3,
      name: 'Denny Kurniawan',
      lastMessage: 'Bagaimana cara mengintegrasikan dengan website saya?',
      timestamp: '1 jam lalu',
      status: 'terjawab',
      platform: 'WhatsApp',
      isNew: false,
      avatar: null
    },
    {
      id: 4,
      name: 'Maya Indah',
      lastMessage: 'Tolong info untuk paket UMKM',
      timestamp: '2 jam lalu',
      status: 'terjawab',
      platform: 'Web Chat',
      isNew: false,
      avatar: null
    },
    {
      id: 5,
      name: 'Agus Prayitno',
      lastMessage: 'Apakah bisa digunakan untuk multiple user?',
      timestamp: '3 jam lalu',
      status: 'belum',
      platform: 'Instagram',
      isNew: true,
      avatar: null
    },
    {
      id: 6,
      name: 'Dewi Lestari',
      lastMessage: 'Saya sudah transfer untuk paket bulanan',
      timestamp: '4 jam lalu',
      status: 'belum',
      platform: 'WhatsApp',
      isNew: false,
      avatar: null
    },
    {
      id: 7,
      name: 'Hendra Gunawan',
      lastMessage: 'Terima kasih infonya, sangat membantu!',
      timestamp: '1 hari lalu',
      status: 'terjawab',
      platform: 'Web Chat',
      isNew: false,
      avatar: null
    },
  ];

  const filteredChats = chatList.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 animate-fade-in">
          <h1 className="text-2xl font-bold animate-fade-in-left">Riwayat Chat</h1>
          <p className="text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>Kelola semua percakapan dengan pelanggan</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chat list */}
          <div className="lg:w-1/3">
            <Card className="h-[calc(100vh-13rem)] flex flex-col dark:border-gray-800 dark:bg-gray-900">
              <CardHeader className="pb-2 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input 
                      placeholder="Cari chat..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                
                <Tabs defaultValue="all">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">Semua</TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">Belum Dijawab</TabsTrigger>
                    <TabsTrigger value="answered" className="flex-1">Terjawab</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto pt-0">
                <div className="space-y-1">
                  {filteredChats.map((chat) => (
                    <div 
                      key={chat.id}
                      className={`flex gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                        chat.id === 2 ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : ''
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar || undefined} alt={chat.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{chat.name}</div>
                          <div className="text-xs text-gray-500">{chat.timestamp}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] h-5">
                            {chat.platform}
                          </Badge>
                          {chat.status === 'belum' ? (
                            <Badge className="bg-orange-500 text-[10px] h-5">
                              Belum Dijawab
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-600 border-green-600 text-[10px] h-5">
                              Terjawab
                            </Badge>
                          )}
                          {chat.isNew && (
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat detail */}
          <div className="lg:w-2/3">
            <Card className="h-[calc(100vh-13rem)] flex flex-col dark:border-gray-800 dark:bg-gray-900">
              <CardHeader className="flex-row items-center justify-between border-b pb-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      RW
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Rina Wati</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] h-5">
                        Instagram
                      </Badge>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>25 menit lalu</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="lead">
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                      <SelectValue placeholder="Status lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Hot Lead</SelectItem>
                      <SelectItem value="warm">Warm Lead</SelectItem>
                      <SelectItem value="cold">Cold Lead</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Arsipkan Chat</DropdownMenuItem>
                      <DropdownMenuItem>Kirim ke CRM</DropdownMenuItem>
                      <DropdownMenuItem>Blacklist</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {/* System Message */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-500">
                      Chat dimulai • 25 Mei 2024
                    </div>
                  </div>
                  
                  {/* Automated message */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        ZA
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Zenith AI</span>
                        <span className="text-xs text-gray-500">14:25</span>
                        <Badge variant="outline" className="text-[10px] h-5">Bot</Badge>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-md">
                        Halo! Terima kasih telah menghubungi Zenith AI. Ada yang bisa saya bantu terkait produk AI kami?
                      </div>
                    </div>
                  </div>
                  
                  {/* Customer message */}
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 space-y-2 flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">14:32</span>
                        <span className="font-medium">Rina Wati</span>
                      </div>
                      <div className="bg-blue-600 text-white p-3 rounded-lg max-w-md">
                        Saya tertarik dengan paket premium Zenith AI
                      </div>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        RW
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Automated reply */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        ZA
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Zenith AI</span>
                        <span className="text-xs text-gray-500">14:32</span>
                        <Badge variant="outline" className="text-[10px] h-5">Bot</Badge>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-md">
                        Terima kasih atas ketertarikan Anda pada paket premium kami! 
                        <br/><br/>
                        Paket Premium Zenith AI menawarkan:
                        <br/>
                        • Unlimited chats dan respons
                        <br/>
                        • Integrasi dengan 5 platform
                        <br/>
                        • Dukungan prioritas 24/7
                        <br/>
                        • Dashboard analitik lanjutan
                        <br/>
                        • Custom AI training
                        <br/><br/>
                        Harga paket premium kami mulai dari Rp 499.000/bulan. Apakah Anda ingin tahu lebih lanjut tentang fitur tertentu atau berminat untuk demo gratis?
                      </div>
                    </div>
                  </div>
                  
                  {/* System Message */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-500">
                      Menunggu balasan...
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <div className="p-4 border-t dark:border-gray-800">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Ketik balasan..." 
                    className="flex-1"
                  />
                  <Button>Kirim</Button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <Badge variant="outline" className="text-[10px] h-5 mr-2">AI Mode: Active</Badge>
                    Bot akan otomatis membalas pesan
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                    Ambil Alih Chat
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
