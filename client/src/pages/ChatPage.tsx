
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardPage';
import { 
  MessageSquare, 
  Filter, 
  Search, 
  ChevronDown, 
  Clock, 
  UserCircle, 
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

interface Chat {
  id: string;
  user: {
    id: string;
    name: string;
    initials: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  platform: 'WhatsApp' | 'Instagram' | 'Web Chat';
  status: 'answered' | 'unanswered';
  isSelected?: boolean;
}

const ChatPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  
  // Sample chats data
  const chats: Chat[] = [
    {
      id: '1',
      user: { id: '101', name: 'Budi Santoso', initials: 'BS' },
      lastMessage: 'Apakah ada diskon untuk paket Enterprise?',
      lastMessageTime: '10 menit lalu',
      platform: 'WhatsApp',
      status: 'answered',
    },
    {
      id: '2',
      user: { id: '102', name: 'Rina Wati', initials: 'RW' },
      lastMessage: 'Saya tertarik dengan paket Premium yang ditawarkan',
      lastMessageTime: '25 menit lalu',
      platform: 'Instagram',
      status: 'unanswered',
    },
    {
      id: '3',
      user: { id: '103', name: 'Denny Kurniawan', initials: 'DK' },
      lastMessage: 'Bagaimana cara mengintegrasikan dengan sistem yang sudah ada?',
      lastMessageTime: '1 jam lalu',
      platform: 'WhatsApp',
      status: 'answered',
    },
    {
      id: '4',
      user: { id: '104', name: 'Maya Indah', initials: 'MI' },
      lastMessage: 'Tolong info untuk paket UMKM, apakah bisa custom?',
      lastMessageTime: '2 jam lalu',
      platform: 'Web Chat',
      status: 'answered',
    },
    {
      id: '5',
      user: { id: '105', name: 'Agus Prayitno', initials: 'AP' },
      lastMessage: 'Apakah bisa digunakan untuk toko online saya?',
      lastMessageTime: '3 jam lalu',
      platform: 'Instagram',
      status: 'unanswered',
    },
    {
      id: '6',
      user: { id: '106', name: 'Dewi Lestari', initials: 'DL' },
      lastMessage: 'Saya sudah transfer untuk berlangganan paket Premium',
      lastMessageTime: '4 jam lalu',
      platform: 'WhatsApp',
      status: 'unanswered',
    },
    {
      id: '7',
      user: { id: '107', name: 'Joko Widodo', initials: 'JW' },
      lastMessage: 'Berapa harga untuk 10 pengguna?',
      lastMessageTime: '5 jam lalu',
      platform: 'Web Chat',
      status: 'answered',
    },
    {
      id: '8',
      user: { id: '108', name: 'Siti Nurhaliza', initials: 'SN' },
      lastMessage: 'Apakah ada fitur untuk analisis sentimen?',
      lastMessageTime: '6 jam lalu',
      platform: 'Instagram',
      status: 'unanswered',
    },
    {
      id: '9',
      user: { id: '109', name: 'Anwar Ibrahim', initials: 'AI' },
      lastMessage: 'Bagaimana dengan keamanan data pelanggan?',
      lastMessageTime: '7 jam lalu',
      platform: 'WhatsApp',
      status: 'answered',
    },
    {
      id: '10',
      user: { id: '110', name: 'Kartini Putri', initials: 'KP' },
      lastMessage: 'Butuh demo untuk tim marketing kami',
      lastMessageTime: '8 jam lalu',
      platform: 'Web Chat',
      status: 'unanswered',
    },
  ];

  // Filter chats based on search query and status filter
  const filteredChats = chats.filter(chat => {
    const matchesSearch = 
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'answered' && chat.status === 'answered') ||
      (statusFilter === 'unanswered' && chat.status === 'unanswered');
    
    return matchesSearch && matchesStatus;
  });

  // Set selected chat to first one by default
  useEffect(() => {
    if (filteredChats.length > 0 && !selectedChatId) {
      setSelectedChatId(filteredChats[0].id);
    }
  }, [filteredChats, selectedChatId]);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  // Sample messages for the selected chat
  const messages = [
    {
      id: '1',
      sender: 'user',
      text: 'Halo, saya tertarik dengan layanan Zenith AI',
      time: '14:30',
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Halo! Terima kasih telah menghubungi Zenith AI. Kami senang Anda tertarik dengan layanan kami. Ada yang bisa saya bantu?',
      time: '14:31',
    },
    {
      id: '3',
      sender: 'user',
      text: selectedChat?.lastMessage || 'Apakah ada paket khusus untuk UMKM?',
      time: '14:32',
    },
    {
      id: '4',
      sender: 'bot',
      text: 'Tentu, kami memiliki paket khusus untuk UMKM dengan harga terjangkau mulai dari Rp 299.000/bulan. Paket ini mencakup chatbot AI, integrasi WhatsApp, dan dashboard analitik dasar. Apakah Anda ingin saya kirimkan detail lengkapnya?',
      time: '14:33',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 animate-fade-in">
          <h1 className="text-2xl font-bold animate-fade-in-left">Riwayat Chat</h1>
          <p className="text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>Kelola semua percakapan dengan pelanggan dan prospek</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chat List */}
          <Card className="lg:col-span-4 dark:border-gray-800 dark:bg-gray-900 overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-2">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input 
                    placeholder="Cari chat..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as any)}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="unanswered">Belum Dijawab</TabsTrigger>
                  <TabsTrigger value="answered">Terjawab</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-0 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="space-y-1">
                {filteredChats.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all ${
                      selectedChatId === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600' : ''
                    }`}
                    onClick={() => setSelectedChatId(chat.id)}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-600 text-white font-medium">
                          {chat.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <div className="font-medium truncate">{chat.user.name}</div>
                          <div className="text-xs text-gray-500">{chat.lastMessageTime}</div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                          {chat.lastMessage}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs bg-opacity-50">
                            {chat.platform}
                          </Badge>
                          <Badge variant={chat.status === 'answered' ? 'outline' : 'secondary'} className="text-xs">
                            {chat.status === 'answered' ? 'Terjawab' : 'Belum Dijawab'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Detail */}
          <Card className="lg:col-span-8 dark:border-gray-800 dark:bg-gray-900 overflow-hidden animate-fade-in flex flex-col" style={{ animationDelay: '0.3s' }}>
            {selectedChat ? (
              <>
                <CardHeader className="py-3 px-4 border-b dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="icon" className="lg:hidden">
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {selectedChat.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedChat.user.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-[10px] h-5">
                            {selectedChat.platform}
                          </Badge>
                          <span>ID: #{selectedChat.user.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Lihat Info Kontak</DropdownMenuItem>
                          <DropdownMenuItem>Tambahkan ke Leads</DropdownMenuItem>
                          <DropdownMenuItem>Tandai sebagai Spam</DropdownMenuItem>
                          <DropdownMenuItem>Arsipkan Percakapan</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center text-xs text-gray-500 py-2">
                    {selectedChat.lastMessageTime.includes('menit') ? 'Hari ini' : 'Kemarin'}
                  </div>
                  
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        <div className={`text-xs mt-1 text-right ${
                          message.sender === 'user' 
                            ? 'text-gray-500 dark:text-gray-400' 
                            : 'text-blue-100'
                        }`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-500">
                      Menunggu balasan...
                    </div>
                  </div>
                </CardContent>
                
                <div className="p-4 border-t dark:border-gray-800">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ketik balasan..." 
                      className="flex-1"
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 animate-fade-in" style={{ animationDelay: '0.5s' }}>Kirim</Button>
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mb-4 animate-float-subtle" />
                <h3 className="text-lg font-medium mb-2">Tidak ada percakapan yang dipilih</h3>
                <p className="text-gray-500 text-center max-w-sm">
                  Pilih percakapan dari daftar atau mulai percakapan baru
                </p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { 
              title: 'Total Percakapan', 
              value: '235', 
              change: '+12%', 
              icon: <MessageSquare className="h-5 w-5 text-blue-600" /> 
            },
            { 
              title: 'Tingkat Respons', 
              value: '93%', 
              change: '+5%', 
              icon: <CheckCircle className="h-5 w-5 text-green-600" /> 
            },
            { 
              title: 'Waktu Respons Rata-rata', 
              value: '2.5 menit', 
              change: '-8%', 
              icon: <Clock className="h-5 w-5 text-purple-600" /> 
            },
            { 
              title: 'Total Panggilan', 
              value: '42', 
              change: '+22%', 
              icon: <Phone className="h-5 w-5 text-orange-600" /> 
            },
          ].map((stat, index) => (
            <Card key={index} className="dark:border-gray-800 dark:bg-gray-900 animate-slide-in-up" style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change} vs bulan lalu</p>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Activity Log */}
        <Card className="dark:border-gray-800 dark:bg-gray-900 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle>Log Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas sistem dan pengguna selama 24 jam terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Sistem', action: 'Percakapan #1234 otomatis ditutup karena tidak ada respons selama 24 jam', time: '10 menit lalu' },
                { user: 'Admin', action: 'Mengambil alih percakapan dengan Budi Santoso', time: '45 menit lalu' },
                { user: 'Sistem', action: 'WhatsApp Business API berhasil disinkronkan', time: '1 jam lalu' },
                { user: 'Admin', action: 'Menambahkan Rina Wati ke daftar leads', time: '2 jam lalu' },
                { user: 'Sistem', action: 'Chatbot berhasil menjawab 15 pertanyaan baru', time: '3 jam lalu' },
              ].map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-2 border-b dark:border-gray-800 last:border-0 animate-fade-in" style={{ animationDelay: `${0.7 + (index * 0.1)}s` }}>
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div>
                    <div className="flex gap-2">
                      <span className="font-medium">{log.user}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{log.time}</span>
                    </div>
                    <p className="text-sm">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
