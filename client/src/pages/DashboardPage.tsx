import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  BarChart2, 
  Share2, 
  Settings, 
  Bell, 
  LogOut, 
  Moon,
  Sun,
  Search,
  ChevronRight,
  ArrowUpRight,
  Zap,
  UserCircle,
  MessageCircle,
  UserPlus,
  LineChart,
  Timer
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigationItems = [
    { path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/chat', icon: <MessageSquare className="h-5 w-5" />, label: 'Riwayat Chat' },
    { path: '/leads', icon: <Users className="h-5 w-5" />, label: 'Manajemen Leads' },
    { path: '/analytics', icon: <BarChart2 className="h-5 w-5" />, label: 'Statistik' },
    { path: '/integrations', icon: <Share2 className="h-5 w-5" />, label: 'Integrasi' },
    { path: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Pengaturan' },
  ];

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] dark:bg-gray-950 text-white">
      {/* Sidebar for desktop */}
      <aside className="z-30 hidden md:flex md:w-64 flex-col fixed h-full bg-[#0c1525] dark:bg-gray-900 border-r border-blue-900/30 dark:border-gray-800">
        <div className="p-4 flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-blue-500">Zenith AI</span>
        </div>

        <Separator className="my-2 bg-blue-900/30" />

        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => (
            <div key={item.path} className="w-full">
              <Link href={item.path}>
                <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  location === item.path 
                    ? 'bg-blue-600/20 text-blue-400 font-medium' 
                    : 'text-gray-300 hover:bg-[#182338] hover:text-blue-300'
                }`}>
                  {item.icon}
                  <span>{item.label}</span>
                  {location === item.path && (
                    <div className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-[#182338] rounded-lg p-3 text-xs">
            <p className="font-medium text-gray-300 mb-1">Penggunaan AI</p>
            <div className="w-full h-2 bg-gray-800 rounded-full mb-2">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-gray-400">6,000 / 10,000 kata</p>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/70"
            onClick={toggleSidebar}
          ></div>
          <aside className="relative w-64 max-w-[80%] bg-[#0c1525] dark:bg-gray-900 h-full">
            <div className="p-4 flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-500">Zenith AI</span>
            </div>

            <Separator className="my-2 bg-blue-900/30" />

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-6rem)]">
              {navigationItems.map((item, index) => (
                <div key={item.path} className="w-full">
                  <Link href={item.path}>
                    <div 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                        location === item.path 
                          ? 'bg-blue-600/20 text-blue-400 font-medium' 
                          : 'text-gray-300 hover:bg-[#182338] hover:text-blue-300'
                      }`}
                      onClick={toggleSidebar}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {location === item.path && (
                        <div className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-blue-900/30">
              <div className="bg-[#182338] rounded-lg p-3 text-xs">
                <p className="font-medium text-gray-300 mb-1">Penggunaan AI</p>
                <div className="w-full h-2 bg-gray-800 rounded-full mb-2">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-gray-400">6,000 / 10,000 kata</p>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="md:ml-64 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#0c1525]/90 backdrop-blur-md border-b border-blue-900/30">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar} 
                className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-[#182338] hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Cari..." 
                  className="pl-8 bg-[#182338] border-blue-900/30 focus-visible:ring-blue-500 text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-gray-300 hover:bg-[#182338] hover:text-blue-300"
                      onClick={() => console.log('Notifications clicked')}
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifikasi</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:bg-[#182338] hover:text-blue-300"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Mode Terang' : 'Mode Gelap'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Separator orientation="vertical" className="h-8 bg-blue-900/30" />

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profile_image} alt={user?.email} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{user?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-xs text-blue-400">UMKM Pro</p>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:bg-[#182338] hover:text-red-300"
                        onClick={logout}
                      >
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Keluar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-5 md:p-6 overflow-x-hidden">
          <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Selamat datang kembali di Zenith AI</p>
        </div>

        {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { 
                title: "Total Pesan", 
                value: "2,437", 
                change: "+12.4%", 
                changeType: "positive",
                icon: <MessageCircleIcon className="h-5 w-5 text-blue-500" /> 
              },
              { 
                title: "Pengguna Baru", 
                value: "187", 
                change: "+32.1%", 
                changeType: "positive",
                icon: <UserPlusIcon className="h-5 w-5 text-green-500" /> 
              },
              { 
                title: "Tingkat Konversi", 
                value: "3.2%", 
                change: "+0.8%", 
                changeType: "positive",
                icon: <LineChartIcon className="h-5 w-5 text-yellow-500" /> 
              },
              { 
                title: "Waktu Respons", 
                value: "~1.4s", 
                change: "-0.3s", 
                changeType: "positive",
                icon: <TimerIcon className="h-5 w-5 text-purple-500" /> 
              }
            ].map((card, index) => (
              <Card
                key={index}
                className="dark:border-gray-800 dark:bg-gray-900 dashboard-card"
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.title}
                  </CardTitle>
                  <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                    {card.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {card.value}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs font-medium ${card.changeType === "positive" ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change}
                    </span>
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      {/* Add description here if needed */}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        {/* Chart and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 dark:border-gray-800 dark:bg-gray-900 dashboard-card">
            <CardHeader>
              <CardTitle>Aktivitas Chat</CardTitle>
              <CardDescription>7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end gap-2 pt-10">
                {[
                  {day: 'Sen', value: 42, chats: 34, platform: 'WhatsApp', whatsapp: 22, instagram: 8, webchat: 4},
                  {day: 'Sel', value: 65, chats: 52, platform: 'Instagram', whatsapp: 18, instagram: 27, webchat: 7},
                  {day: 'Rab', value: 53, chats: 45, platform: 'WhatsApp', whatsapp: 25, instagram: 14, webchat: 6},
                  {day: 'Kam', value: 78, chats: 63, platform: 'Web Chat', whatsapp: 20, instagram: 30, webchat: 13},
                  {day: 'Jum', value: 75, chats: 60, platform: 'Instagram', whatsapp: 15, instagram: 35, webchat: 10},
                  {day: 'Sab', value: 90, chats: 72, platform: 'WhatsApp', whatsapp: 40, instagram: 25, webchat: 7},
                  {day: 'Min', value: 62, chats: 48, platform: 'Web Chat', whatsapp: 17, instagram: 19, webchat: 12}
                ].map((item, index) => (
                  <div key={index} className="relative flex-1 transition-all group">
                    <div 
                      className="bg-blue-600 rounded-t-md w-full transition-all hover:bg-blue-500"
                      style={{ 
                        height: `${item.value}%`
                      }}
                    >
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-2 py-1.5 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                        <div className="font-medium">{item.chats} percakapan</div>
                        <div className="text-blue-200 text-[10px]">WhatsApp: {item.whatsapp}</div>
                        <div className="text-blue-200 text-[10px]">Instagram: {item.instagram}</div>
                        <div className="text-blue-200 text-[10px]">Web Chat: {item.webchat}</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-blue-900"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                      {item.day}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Percakapan Terbaru</CardTitle>
                <Link href="/chat">
                  <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-500 transition-colors">
                    Lihat semua
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentChats.map((chat, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {chat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{chat.name}</p>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{chat.message}</p>
                      <div className="flex gap-2">
                        <Badge variant={chat.status === 'terjawab' ? 'outline' : 'secondary'} className="text-[10px] h-5">
                          {chat.status === 'terjawab' ? 'Terjawab' : 'Perlu Ditindak'}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] h-5">
                          {chat.platform}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hot Leads */}
        <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Leads Terpanas</CardTitle>
              <Link href="/leads">
                <Button variant="link" className="h-auto p-0 text-blue-600 hover:text-blue-500 transition-colors">
                  Kelola semua leads
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left [&>th]:py-3 [&>th]:px-2 text-xs text-gray-500 dark:text-gray-400 border-b dark:border-gray-800">
                    <th>Nama</th>
                    <th>Kontak</th>
                    <th>Sumber</th>
                    <th>Status</th>
                    <th>Terakhir Aktif</th>
                    <th className="text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    {
                      name: 'Joko Widodo',
                      contact: '081234567890',
                      source: 'WhatsApp',
                      status: 'Hot',
                      lastActive: '1 jam lalu'
                    },
                    {
                      name: 'Siti Badriah',
                      contact: '089876543210',
                      source: 'Instagram',
                      status: 'Hot',
                      lastActive: '3 jam lalu'
                    },
                    {
                      name: 'Hendra Gunawan',
                      contact: '085111222333',
                      source: 'Web Chat',
                      status: 'Hot',
                      lastActive: '6 jam lalu'
                    },
                  ].map((lead, index) => (
                    <tr 
                      key={index} 
                      className="border-b dark:border-gray-800 [&>td]:py-3 [&>td]:px-2 hover:shadow-sm"
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <UserCircle className="w-7 h-7 text-blue-600" />
                          <span>{lead.name}</span>
                        </div>
                      </td>
                      <td>{lead.contact}</td>
                      <td>
                        <Badge variant="outline" className="font-normal transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          {lead.source}
                        </Badge>
                      </td>
                      <td>
                        <Badge className="bg-red-600 hover:bg-red-700 transition-colors">
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="text-gray-500">{lead.lastActive}</td>
                      <td className="text-right">
                        <Link href={`/leads/${index}`}>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="px-2 h-8 text-xs transition-all hover:bg-blue-100 dark:hover:bg-blue-900/20 group"
                          >
                            Detail
                            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
            <CardHeader>
              <CardTitle>Status Integrasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'WhatsApp Business', status: 'connected', statusText: 'Terhubung' },
                  { name: 'Instagram DM', status: 'connected', statusText: 'Terhubung' },
                  { name: 'Google Sheets', status: 'not-connected', statusText: 'Tidak Terhubung' },
                  { name: 'Notion', status: 'not-connected', statusText: 'Tidak Terhubung' },
                ].map((integration, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        integration.status === 'connected' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <span>{integration.name}</span>
                    </div>
                    <Badge 
                      variant={integration.status === 'connected' ? 'outline' : 'secondary'}
                      className="transition-all hover:scale-105"
                    >
                      {integration.statusText}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/integrations" className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10 dark:border-blue-500 dark:text-blue-500 transition-all hover:scale-[1.02]"
                >
                  Kelola Integrasi
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
            <CardHeader>
              <CardTitle>Chatbot Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { metric: 'Response Rate', value: '95%' },
                  { metric: 'Rata-rata Waktu Respons', value: '2.5 menit' },
                  { metric: 'Kepuasan Pelanggan', value: '4.8/5.0' },
                  { metric: 'Akurasi Jawaban', value: '92%' },
                ].map((metric, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <span className="text-gray-600 dark:text-gray-400">{metric.metric}</span>
                    <span className="font-medium">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/analytics" className="w-full">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-[1.02] group"
                >
                  Lihat Analisis Lengkap
                  <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard Home
const DashboardPage: React.FC = () => {
  // Sample data for dashboard
  const recentChats = [
    { 
      name: 'Budi Santoso', 
      time: '2 jam yang lalu', 
      message: 'Apakah bisa custom untuk jumlah user?',
      status: 'terjawab',
      platform: 'WhatsApp'
    },
    { 
      name: 'Rina Wati', 
      time: '3 jam yang lalu', 
      message: 'Saya tertarik dengan paket premium',
      status: 'belum',
      platform: 'Instagram'
    },
    { 
      name: 'Ahmad Fauzi', 
      time: '5 jam yang lalu', 
      message: 'Tolong info harga untuk 10 agent',
      status: 'terjawab',
      platform: 'WhatsApp'
    },
    { 
      name: 'Dewi Lestari', 
      time: '7 jam yang lalu', 
      message: 'Apakah ada fitur untuk integrasi dengan toko online?',
      status: 'terjawab',
      platform: 'Instagram'
    },
  ];

  // Sample data for dashboard
  const recentChats = [
    { 
      name: 'Budi Santoso', 
      time: '2 jam yang lalu', 
      message: 'Apakah bisa custom untuk jumlah user?',
      status: 'terjawab',
      platform: 'WhatsApp'
    },
    { 
      name: 'Rina Wati', 
      time: '3 jam yang lalu', 
      message: 'Saya tertarik dengan paket premium',
      status: 'belum',
      platform: 'Instagram'
    },
    { 
      name: 'Ahmad Fauzi', 
      time: '5 jam yang lalu', 
      message: 'Tolong info harga untuk 10 agent',
      status: 'terjawab',
      platform: 'WhatsApp'
    },
    { 
      name: 'Dewi Lestari', 
      time: '7 jam yang lalu', 
      message: 'Apakah ada fitur untuk integrasi dengan toko online?',
      status: 'terjawab',
      platform: 'Instagram'
    },
  ];
  
  return (
    <DashboardLayout>
      
    </DashboardLayout>
  );
};

export default DashboardPage;