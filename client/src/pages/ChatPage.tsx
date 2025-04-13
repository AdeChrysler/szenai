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

  // Enhanced sample chats data with rich information
  const chats: Chat[] = [
    {
      id: '1',
      user: { 
        id: '101', 
        name: 'Budi Santoso', 
        initials: 'BS',
        email: 'budi.santoso@example.com',
        phone: '081234567890',
        company: 'PT Maju Sejahtera'
      },
      lastMessage: 'Apakah ada diskon untuk paket Enterprise jika berlangganan 1 tahun?',
      lastMessageTime: '10 menit lalu',
      platform: 'WhatsApp',
      status: 'answered',
      messageCount: 8,
      potentialValue: 'Rp 15,000,000',
      leadScore: 85
    },
    {
      id: '2',
      user: { 
        id: '102', 
        name: 'Rina Wati', 
        initials: 'RW',
        email: 'rina.wati@example.com',
        phone: '085678901234',
        company: 'CV Digital Kreatif'
      },
      lastMessage: 'Saya tertarik dengan paket Premium yang ditawarkan, kapan ada waktu untuk demo?',
      lastMessageTime: '25 menit lalu',
      platform: 'Instagram',
      status: 'unanswered',
      messageCount: 5,
      potentialValue: 'Rp 8,500,000',
      leadScore: 75
    },
    {
      id: '3',
      user: { 
        id: '103', 
        name: 'Denny Kurniawan', 
        initials: 'DK',
        email: 'denny.k@example.com',
        phone: '081122334455',
        company: 'PT Tech Solutions'
      },
      lastMessage: 'Bagaimana cara mengintegrasikan dengan sistem CRM yang sudah ada? Kami menggunakan Salesforce.',
      lastMessageTime: '1 jam lalu',
      platform: 'WhatsApp',
      status: 'answered',
      messageCount: 12,
      potentialValue: 'Rp 24,000,000',
      leadScore: 90
    },
    {
      id: '4',
      user: { 
        id: '104', 
        name: 'Maya Indah', 
        initials: 'MI',
        email: 'maya.indah@example.com',
        phone: '089876543210',
        company: 'Batik Nusantara'
      },
      lastMessage: 'Tolong info untuk paket UMKM, apakah bisa custom chatbot untuk toko batik?',
      lastMessageTime: '2 jam lalu',
      platform: 'Web Chat',
      status: 'answered',
      messageCount: 7,
      potentialValue: 'Rp 5,500,000',
      leadScore: 65
    },
    {
      id: '5',
      user: { 
        id: '105', 
        name: 'Agus Prayitno', 
        initials: 'AP',
        email: 'agus.p@example.com',
        phone: '087890123456',
        company: 'Toko Online Sejahtera'
      },
      lastMessage: 'Apakah bisa digunakan untuk toko online saya? Kami punya sekitar 5000 produk di katalog.',
      lastMessageTime: '3 jam lalu',
      platform: 'Instagram',
      status: 'unanswered',
      messageCount: 4,
      potentialValue: 'Rp 6,200,000',
      leadScore: 70
    },
    {
      id: '6',
      user: { 
        id: '106', 
        name: 'Dewi Lestari', 
        initials: 'DL',
        email: 'dewi.l@example.com',
        phone: '081234567891',
        company: 'Mode Fashion Indonesia'
      },
      lastMessage: 'Saya sudah transfer untuk berlangganan paket Premium, mohon konfirmasi aktivasinya.',
      lastMessageTime: '4 jam lalu',
      platform: 'WhatsApp',
      status: 'unanswered',
      messageCount: 15,
      potentialValue: 'Rp 9,800,000',
      leadScore: 95
    },
    {
      id: '7',
      user: { 
        id: '107', 
        name: 'Joko Widodo', 
        initials: 'JW',
        email: 'joko.w@example.com',
        phone: '085678901235',
        company: 'PT Konstruksi Jaya'
      },
      lastMessage: 'Berapa harga untuk 10 pengguna dalam tim customer service kami? Apakah ada diskon kuantitas?',
      lastMessageTime: '5 jam lalu',
      platform: 'Web Chat',
      status: 'answered',
      messageCount: 9,
      potentialValue: 'Rp 18,500,000',
      leadScore: 80
    },
    {
      id: '8',
      user: { 
        id: '108', 
        name: 'Siti Nurhaliza', 
        initials: 'SN',
        email: 'siti.n@example.com',
        phone: '081122334466',
        company: 'Restoran Padang Sedap'
      },
      lastMessage: 'Apakah ada fitur untuk analisis sentimen dari komentar pelanggan restoran kami?',
      lastMessageTime: '6 jam lalu',
      platform: 'Instagram',
      status: 'unanswered',
      messageCount: 6,
      potentialValue: 'Rp 7,200,000',
      leadScore: 65
    },
    {
      id: '9',
      user: { 
        id: '109', 
        name: 'Anwar Ibrahim', 
        initials: 'AI',
        email: 'anwar.i@example.com',
        phone: '089876543211',
        company: 'Bank Digital Now'
      },
      lastMessage: 'Bagaimana dengan keamanan data pelanggan? Kami di industri perbankan sangat concern tentang ini.',
      lastMessageTime: '7 jam lalu',
      platform: 'WhatsApp',
      status: 'answered',
      messageCount: 18,
      potentialValue: 'Rp 32,000,000',
      leadScore: 95
    },
    {
      id: '10',
      user: { 
        id: '110', 
        name: 'Kartini Putri', 
        initials: 'KP',
        email: 'kartini.p@example.com',
        phone: '087890123457',
        company: 'PT Edukasi Maju'
      },
      lastMessage: 'Butuh demo untuk tim marketing kami, kapan tim Anda bisa presentasi?',
      lastMessageTime: '8 jam lalu',
      platform: 'Web Chat',
      status: 'unanswered',
      messageCount: 7,
      potentialValue: 'Rp 12,500,000',
      leadScore: 85
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

  // Enhanced sample messages for the selected chat with more interactions
  const messages = selectedChat ? [
    {
      id: '1',
      sender: 'user',
      text: 'Halo, saya tertarik dengan layanan Zenith AI untuk bisnis kami',
      time: '14:30',
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Halo! Terima kasih telah menghubungi Zenith AI. Kami senang Anda tertarik dengan layanan kami. Boleh saya tahu jenis bisnis apa yang Anda jalankan saat ini?',
      time: '14:31',
    },
    {
      id: '3',
      sender: 'user',
      text: `Kami di ${selectedChat.user.company || 'perusahaan kami'} bergerak di bidang ${selectedChat.user.company?.includes('Tech') ? 'teknologi dan perangkat lunak' : selectedChat.user.company?.includes('Digital') ? 'pemasaran digital' : 'retail dan distribusi'}`,
      time: '14:32',
    },
    {
      id: '4',
      sender: 'bot',
      text: `Terima kasih informasinya. Kami memiliki solusi yang cocok untuk bisnis ${selectedChat.user.company?.includes('Tech') ? 'teknologi' : selectedChat.user.company?.includes('Digital') ? 'pemasaran digital' : 'retail'} seperti yang Anda jalankan. Zenith AI dapat membantu dengan otomatisasi pesan, kualifikasi leads, dan analisis percakapan.`,
      time: '14:33',
    },
    {
      id: '5',
      sender: 'user',
      text: selectedChat.lastMessage,
      time: '14:35',
    },
    {
      id: '6',
      sender: 'bot',
      text: selectedChat.status === 'answered' ? 
        `Tentu, ${selectedChat.platform === 'WhatsApp' ? 'kami bisa membantu dengan pertanyaan WhatsApp Anda' : selectedChat.platform === 'Instagram' ? 'kami bisa membantu dengan pertanyaan Instagram Anda' : 'kami bisa membantu dengan pertanyaan Web Chat Anda'}. ${selectedChat.user.company ? `Untuk perusahaan ${selectedChat.user.company}, ` : ''}kami menawarkan paket yang bisa disesuaikan dengan kebutuhan Anda. Paket mulai dari Rp 299.000/bulan untuk UMKM hingga paket Enterprise dengan fitur lengkap.` :
        'Mohon tunggu sebentar, tim kami akan segera membantu Anda dengan pertanyaan ini.',
      time: '14:36',
    },
    ...(selectedChat.status === 'answered' ? [
      {
        id: '7',
        sender: 'bot',
        text: 'Apakah ada pertanyaan spesifik lain yang ingin Anda tanyakan? Atau Anda ingin kami mengirimkan proposal yang lebih detail sesuai kebutuhan bisnis Anda?',
        time: '14:37',
      }
    ] : [])
  ] : [];

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

                  {messages.map((message, index) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}
                      style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
                    >
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2 mt-1 overflow-hidden">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {selectedChat?.user.initials}
                          </span>
                        </div>
                      )}
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
                          message.sender === 'user' 
                            ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none' 
                            : 'bg-blue-600 text-white rounded-tr-none'
                        } transition-all duration-300 hover:shadow-md`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                        <div className={`text-xs mt-2 text-right flex items-center justify-end ${
                          message.sender === 'user' 
                            ? 'text-gray-500 dark:text-gray-400' 
                            : 'text-blue-100'
                        }`}>
                          {message.time}
                          {message.sender !== 'user' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {message.sender !== 'user' && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 mt-1 overflow-hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}

                  {selectedChat?.status === 'unanswered' && (
                    <div className="flex justify-center my-4 animate-pulse-subtle">
                      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-xs text-gray-500 flex items-center">
                        <div className="flex space-x-1 mr-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        Menunggu agen membalas...
                      </div>
                    </div>
                  )}

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