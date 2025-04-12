
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  MessageSquare, 
  Users, 
  Clock,
  BarChart2,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

// Sample data for charts
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
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold">Statistik</h1>
        <p className="text-gray-500 dark:text-gray-400">Analisis performa chatbot, konversi, dan aktivitas pengguna</p>
      </div>
      
      {/* Time range selector and export button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Select defaultValue="30d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih rentang waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 hari terakhir</SelectItem>
              <SelectItem value="30d">30 hari terakhir</SelectItem>
              <SelectItem value="90d">90 hari terakhir</SelectItem>
              <SelectItem value="custom">Kustom...</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export Data
        </Button>
      </div>
      
      {/* Key metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: 'Total Percakapan', 
            value: '1,265', 
            change: '+12.5%', 
            isPositive: true,
            icon: <MessageSquare className="h-4 w-4 text-blue-600" />
          },
          { 
            title: 'Total Leads', 
            value: '387', 
            change: '+8.2%', 
            isPositive: true,
            icon: <Users className="h-4 w-4 text-green-600" />
          },
          { 
            title: 'Konversi Rata-rata', 
            value: '28.3%', 
            change: '+3.7%', 
            isPositive: true,
            icon: <TrendingUp className="h-4 w-4 text-purple-600" />
          },
          { 
            title: 'Waktu Respons', 
            value: '1.8 menit', 
            change: '-14.3%', 
            isPositive: true,
            icon: <Clock className="h-4 w-4 text-orange-600" />
          },
        ].map((metric, index) => (
          <Card key={index} className="dark:border-gray-800 dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
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
                <span className={`text-xs font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  vs periode sebelumnya
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Chart tabs */}
      <Tabs defaultValue="chat" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid grid-cols-3 w-auto">
            <TabsTrigger value="chat" className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4" />
              <span>Aktivitas Chat</span>
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              <span>Konversi</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center gap-1.5">
              <PieChartIcon className="h-4 w-4" />
              <span>Sumber</span>
            </TabsTrigger>
          </TabsList>
          
          <Select defaultValue="daily">
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Pilih tampilan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Harian</SelectItem>
              <SelectItem value="weekly">Mingguan</SelectItem>
              <SelectItem value="monthly">Bulanan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card className="dark:border-gray-800 dark:bg-gray-900">
          <TabsContent value="chat" className="mt-0">
            <CardHeader>
              <CardTitle>Aktivitas Chat Harian</CardTitle>
              <CardDescription>
                Volume percakapan di semua platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chatActivity}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="WhatsApp" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Instagram" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="WebChat" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="conversion" className="mt-0">
            <CardHeader>
              <CardTitle>Tingkat Konversi</CardTitle>
              <CardDescription>
                Persentase pelanggan yang melakukan pembelian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={conversionRateData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }} 
                      formatter={(value) => [`${value}%`, 'Konversi']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#3B82F6" 
                      fill="url(#colorUv)" 
                      strokeWidth={2} 
                    />
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="channels" className="mt-0">
            <CardHeader>
              <CardTitle>Distribusi Sumber Lead</CardTitle>
              <CardDescription>
                Persentase lead berdasarkan saluran komunikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-around items-center">
              <div className="w-full max-w-xs h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }} 
                      formatter={(value) => [`${value}%`, 'Persentase']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4 mt-4 md:mt-0">
                {leadSourceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong className="text-blue-600">WhatsApp</strong> adalah sumber lead terbanyak dalam periode ini.
                  </p>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
      
      {/* Additional charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Waktu Respons Rata-rata</CardTitle>
            <CardDescription>
              Waktu yang dibutuhkan untuk merespon pesan (dalam menit)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={responseTimeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: '#F9FAFB'
                    }} 
                    formatter={(value) => [`${value} menit`, 'Waktu Respons']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="border-t dark:border-gray-800 pt-4">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Menurun 14.3%</span>
              </div>
              <Badge variant="outline" className="font-normal">
                Sangat Baik
              </Badge>
            </div>
          </CardFooter>
        </Card>
        
        <Card className="dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Efektivitas FAQ</CardTitle>
            <CardDescription>
              Persentase pertanyaan yang dijawab oleh chatbot vs agen manusia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Dijawab oleh AI', value: 78 },
                      { name: 'Eskalasi ke Manusia', value: 22 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#F59E0B" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: '#F9FAFB'
                    }} 
                    formatter={(value) => [`${value}%`, 'Persentase']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="border-t dark:border-gray-800 pt-4">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Meningkat 5% dari bulan lalu</span>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Lihat FAQ
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Top performing content */}
      <Card className="dark:border-gray-800 dark:bg-gray-900 mb-6">
        <CardHeader>
          <CardTitle>Pertanyaan Paling Sering</CardTitle>
          <CardDescription>
            Pertanyaan yang paling sering diajukan pelanggan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { question: 'Berapa harga paket bulanan?', count: 245, growth: 12 },
              { question: 'Apakah bisa diintegrasikan dengan Shopee?', count: 189, growth: 28 },
              { question: 'Bagaimana cara mengatur auto-responder?', count: 156, growth: -5 },
              { question: 'Apakah ada fitur untuk mengelola stok?', count: 132, growth: 8 },
              { question: 'Bisakah saya mencoba gratis terlebih dahulu?', count: 118, growth: 15 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600/10 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{item.question}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-normal">
                    {item.count} kali
                  </Badge>
                  <div className={`flex items-center gap-1 ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span className="text-xs font-medium">{Math.abs(item.growth)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Analytics insights */}
      <Card className="dark:border-gray-800 dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Insight Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                title: 'Waktu respons menurun signifikan', 
                description: 'Waktu respons rata-rata menurun 14.3% dibandingkan periode sebelumnya. Ini menunjukkan peningkatan efisiensi chatbot.',
                action: 'Pertahankan',
                color: 'text-green-600 bg-green-600/10'
              },
              { 
                title: 'Sumber lead dari Instagram meningkat', 
                description: 'Lead dari Instagram naik 28% bulan ini. Pertimbangkan untuk mengalokasikan lebih banyak resource untuk platform ini.',
                action: 'Tingkatkan',
                color: 'text-blue-600 bg-blue-600/10'
              },
              { 
                title: 'Pertanyaan teknis membutuhkan eskalasi', 
                description: '62% pertanyaan yang diteruskan ke agen manusia adalah pertanyaan teknis. Pertimbangkan untuk meningkatkan pelatihan AI di area ini.',
                action: 'Perhatikan',
                color: 'text-amber-600 bg-amber-600/10'
              },
            ].map((insight, index) => (
              <div key={index} className="flex gap-4">
                <div className={`${insight.color} p-2 rounded-full h-fit`}>
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{insight.description}</p>
                  <Badge variant="outline" className={insight.color.split(' ')[0]}>
                    {insight.action}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
