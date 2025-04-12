import React from 'react';
import { DashboardLayout } from './DashboardPage';
import { 
  BarChart2, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Users, 
  MessageSquare,
  Clock,
  CheckCircle,
  Zap,
  BarChart,
  LineChart,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart as BarChartRecharts,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as LineChartRecharts,
  Line,
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  AreaChart as AreaChartRecharts,
  Area
} from 'recharts';


// Sample data for charts (from original code)
const chatActivity = [
  { name: 'Sen', WhatsApp: 40, Instagram: 24, WebChat: 10 },
  { name: 'Sel', WhatsApp: 30, Instagram: 13, WebChat: 15 },
  { name: 'Rab', WhatsApp: 20, Instagram: 28, WebChat: 5 },
  { name: 'Kam', WhatsApp: 27, Instagram: 39, WebChat: 8 },
  { name: 'Jum', WhatsApp: 18, Instagram: 48, WebChat: 12 },
  { name: 'Sab', WhatsApp: 23, Instagram: 38, WebChat: 7 },
  { name: 'Min', WhatsApp: 34, Instagram: 43, WebChat: 11 },
];

const conversionRateData = [
  { name: '1 May', rate: 18 },
  { name: '8 May', rate: 22 },
  { name: '15 May', rate: 19 },
  { name: '22 May', rate: 25 },
  { name: '29 May', rate: 32 },
  { name: '5 Jun', rate: 27 },
  { name: '12 Jun', rate: 36 },
  { name: '19 Jun', rate: 30 },
  { name: '26 Jun', rate: 28 },
];

const leadSourceData = [
  { name: 'WhatsApp', value: 55 },
  { name: 'Instagram', value: 30 },
  { name: 'Web Chat', value: 15 },
];

const responseTimeData = [
  { name: '1 May', time: 3.5 },
  { name: '8 May', time: 3.2 },
  { name: '15 May', time: 2.8 },
  { name: '22 May', time: 2.5 },
  { name: '29 May', time: 2.3 },
  { name: '5 Jun', time: 2.4 },
  { name: '12 Jun', time: 2.2 },
  { name: '19 Jun', time: 2.0 },
  { name: '26 Jun', time: 1.8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 animate-fade-in">
          <h1 className="text-2xl font-bold animate-fade-in-left">Statistik</h1>
          <p className="text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>Analisis performa chatbot dan konversi leads</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-800 shadow-sm transition-all hover:shadow-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
            <Select defaultValue="7days">
              <SelectTrigger className="w-full sm:w-[180px] transition-all hover:border-blue-400 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="animate-fade-in-scale">
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="yesterday">Kemarin</SelectItem>
                <SelectItem value="7days">7 Hari Terakhir</SelectItem>
                <SelectItem value="30days">30 Hari Terakhir</SelectItem>
                <SelectItem value="custom">Rentang Kustom</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px] transition-all hover:border-blue-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="animate-fade-in-scale">
                <SelectItem value="all">Semua Platform</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="webchat">Web Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Laporan
          </Button>
        </div>

        {/* Key metrics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { 
              title: 'Total Percakapan', 
              value: '1,265',
              change: '+15%',
              isPositive: true,
              icon: <MessageSquare className="h-5 w-5 text-blue-600" />
            },
            { 
              title: 'Rata-rata Waktu Respons', 
              value: '2.4 menit',
              change: '-8%',
              isPositive: true,
              icon: <Clock className="h-5 w-5 text-green-600" />
            },
            { 
              title: 'Tingkat Konversi', 
              value: '32%',
              change: '+5%',
              isPositive: true,
              icon: <CheckCircle className="h-5 w-5 text-purple-600" />
            },
            { 
              title: 'Leads Baru', 
              value: '187',
              change: '-3%',
              isPositive: false,
              icon: <Users className="h-5 w-5 text-orange-600" />
            }
          ].map((metric, index) => (
            <Card key={index} className="dark:border-gray-800 dark:bg-gray-900">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.title}
                </CardTitle>
                <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                  {metric.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium flex items-center ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.isPositive ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </span>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    vs bulan lalu
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart tabs */}
        <Card className="dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Analisis Performa</CardTitle>
                <CardDescription>Metrik utama chatbot dan konversi</CardDescription>
              </div>
              <div className="flex gap-2">
                <Tabs defaultValue="leads">
                  <TabsList>
                    <TabsTrigger value="leads" className="text-xs">
                      <Users className="h-3.5 w-3.5 mr-1.5" />
                      Leads
                    </TabsTrigger>
                    <TabsTrigger value="chats" className="text-xs">
                      <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="response" className="text-xs">
                      <Zap className="h-3.5 w-3.5 mr-1.5" />
                      Respons
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end gap-2 pt-10">
              {/* Mock chart for visualization - in real app you'd use a charting library like recharts */}
              {[35, 42, 58, 63, 47, 75, 68, 82, 73, 62, 55, 70].map((height, index) => (
                <div key={index} className="relative flex-1 transition-all group">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 rounded-t-sm w-full relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {height} leads
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][index]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel performance and conversion charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Performance */}
          <Card className="dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600" />
                Performa per Saluran
              </CardTitle>
              <CardDescription>Analisis saluran komunikasi yang paling efektif</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { channel: 'WhatsApp', value: 45, total: 100 },
                  { channel: 'Instagram DM', value: 28, total: 100 },
                  { channel: 'Web Chat', value: 20, total: 100 },
                  { channel: 'Facebook', value: 7, total: 100 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.channel}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card className="dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                Funnel Konversi
              </CardTitle>
              <CardDescription>Customer journey dari awal hingga konversi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mt-2">
                {[
                  { stage: 'Visitor', count: 2780, color: 'bg-gray-300 dark:bg-gray-600' },
                  { stage: 'Lead', count: 1375, color: 'bg-blue-300 dark:bg-blue-700' },
                  { stage: 'Qualified', count: 843, color: 'bg-purple-300 dark:bg-purple-700' },
                  { stage: 'Proposal', count: 492, color: 'bg-orange-300 dark:bg-orange-700' },
                  { stage: 'Customer', count: 187, color: 'bg-green-300 dark:bg-green-700' },
                ].map((stage, index, array) => {
                  const widthPercentage = (stage.count / array[0].count) * 100;
                  return (
                    <div key={index} className="pb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{stage.stage}</span>
                        <span className="font-semibold">{stage.count.toLocaleString()}</span>
                      </div>
                      <div className={`h-8 ${stage.color} rounded-lg transition-all duration-500`} style={{ width: `${widthPercentage}%` }}></div>
                      {index < array.length - 1 && (
                        <div className="flex justify-center text-xs text-gray-500 my-1">
                          {((array[index + 1].count / stage.count) * 100).toFixed(1)}% →
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User activity and chatbot stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Topics */}
          <Card className="dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Topik Percakapan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative flex items-center justify-center">
                {/* Mock donut chart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 50%)' }}></div>
                    <div className="absolute inset-0 bg-green-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}></div>
                    <div className="absolute inset-0 bg-purple-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%)' }}></div>
                    <div className="absolute inset-0 bg-orange-500" style={{ clipPath: 'polygon(50% 50%, 0 100%, 0 70%)' }}></div>
                    <div className="absolute inset-0 bg-yellow-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0)' }}></div>
                    <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-full" style={{ transform: 'scale(0.65)' }}></div>
                  </div>
                </div>

                <div className="z-10 text-center">
                  <div className="text-xl font-bold">1,265</div>
                  <div className="text-xs text-gray-500">Total Percakapan</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                {[
                  { label: 'Harga & Paket', color: 'bg-blue-500', percentage: '35%' },
                  { label: 'Fitur Produk', color: 'bg-green-500', percentage: '28%' },
                  { label: 'Dukungan Teknis', color: 'bg-purple-500', percentage: '20%' },
                  { label: 'Pertanyaan Umum', color: 'bg-orange-500', percentage: '12%' },
                  { label: 'Lainnya', color: 'bg-yellow-500', percentage: '5%' },
                ].map((topic, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                    <div className="text-xs">
                      <span className="mr-1">{topic.label}</span>
                      <span className="text-gray-500">{topic.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Jam Sibuk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-1 h-60">
                {[10, 15, 25, 30, 35, 45, 65, 80, 75, 70, 60, 50, 55, 65, 70, 60, 50, 40, 35, 30, 20, 15, 10, 5].map((height, index) => (
                  <div key={index} className="flex flex-col items-center justify-end h-full">
                    <div 
                      className="w-full bg-blue-500 rounded-t-sm"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-[10px] text-gray-500 mt-1">
                      {index.toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Badge className="bg-blue-600">Jam Ramai: 10:00 - 14:00</Badge>
                <span className="text-sm text-gray-500">UTC+7</span>
              </div>
            </CardContent>
          </Card>

          {/* Chatbot Stats */}
          <Card className="dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Performa Chatbot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { 
                    label: 'Akurasi Jawaban', 
                    value: 92,
                    description: 'Berdasarkan umpan balik pengguna' 
                  },
                  { 
                    label: 'Respons Tanpa Bantuan Manusia', 
                    value: 78,
                    description: 'Persentase chat yang ditangani 100% oleh bot' 
                  },
                  { 
                    label: 'Kepuasan Pengguna', 
                    value: 85,
                    description: 'Rating rata-rata dari pengguna' 
                  },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">{stat.label}</div>
                      <div className="text-sm font-semibold">{stat.value}%</div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500" 
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Total kata AI yang digunakan</div>
                  <Badge variant="outline">6,243 / 10,000</Badge>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '62.4%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;