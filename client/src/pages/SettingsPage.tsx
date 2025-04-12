
import React, { useState } from 'react';
import { DashboardLayout } from './DashboardPage';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  MessageSquare,
  Shield,
  CreditCard,
  Save,
  Trash2,
  Check,
  ArrowUpRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  const handleSave = () => {
    setSaved(true);
    toast({
      title: "Pengaturan disimpan",
      description: "Perubahan pengaturan Anda telah berhasil disimpan.",
      variant: "default",
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Pengaturan</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola Preferensi Akun dan Aplikasi</p>
        </div>

        <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              <span>Akun</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              <span>Keamanan</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Paket & Tagihan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>
                  Kelola informasi profil Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.profile_image} alt={user?.email} />
                      <AvatarFallback className="text-xl bg-blue-600 text-white">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Ubah Foto
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" defaultValue={user?.name || user?.email?.split('@')[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user?.email} disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input id="phone" defaultValue={user?.phone_number || ''} placeholder="Contoh: 081234567890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Nama Perusahaan</Label>
                        <Input id="company" defaultValue={user?.company_name || ''} placeholder="Nama perusahaan Anda" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t dark:border-gray-800 pt-4">
                <div className="text-sm text-gray-500">
                  Terakhir diperbarui: 3 hari lalu
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={saved}
                  className="bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Disimpan
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Perubahan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Preferensi</CardTitle>
                <CardDescription>
                  Sesuaikan pengalaman pengguna Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Bahasa</Label>
                  <Select defaultValue="id">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Waktu</Label>
                  <Select defaultValue="wib">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Pilih zona waktu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wib">WIB (GMT+7)</SelectItem>
                      <SelectItem value="wita">WITA (GMT+8)</SelectItem>
                      <SelectItem value="wit">WIT (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Email Notifikasi</CardTitle>
                <CardDescription>
                  Pengaturan email notifikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifikasi Chat Baru</div>
                    <div className="text-sm text-gray-500">Terima email saat ada pesan baru dari pelanggan</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifikasi Lead Baru</div>
                    <div className="text-sm text-gray-500">Terima email saat ada lead baru yang masuk</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Laporan Mingguan</div>
                    <div className="text-sm text-gray-500">Ringkasan aktivitas mingguan via email</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Pembaruan Sistem</div>
                    <div className="text-sm text-gray-500">Pemberitahuan tentang fitur dan update baru</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-800 pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={saved}
                  className="bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Disimpan
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Pengaturan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Notifikasi Aplikasi</CardTitle>
                <CardDescription>
                  Pengaturan notifikasi dalam aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifikasi Real-time</div>
                    <div className="text-sm text-gray-500">Tampilkan notifikasi waktu nyata di aplikasi</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Suara Notifikasi</div>
                    <div className="text-sm text-gray-500">Putar suara saat ada notifikasi baru</div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Notifikasi Desktop</div>
                    <div className="text-sm text-gray-500">Tampilkan notifikasi desktop saat aplikasi tidak aktif</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-800 pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={saved}
                  className="bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Disimpan
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Pengaturan
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Ubah Password</CardTitle>
                <CardDescription>
                  Pastikan password Anda kuat dan unik
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                  <p className="text-xs text-gray-500">Password harus minimal 8 karakter dan mengandung huruf, angka, dan simbol</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="border-t dark:border-gray-800 pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={saved}
                  className="bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Disimpan
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Perbarui Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Keamanan Akun</CardTitle>
                <CardDescription>
                  Kelola pengaturan keamanan akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Autentikasi Dua Faktor</div>
                    <div className="text-sm text-gray-500">Aktifkan autentikasi dua faktor untuk keamanan tambahan</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Atur
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Riwayat Login</div>
                    <div className="text-sm text-gray-500">Lihat riwayat login ke akun Anda</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Lihat
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Sesi Aktif</div>
                    <div className="text-sm text-gray-500">Kelola sesi aktif di semua perangkat</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Kelola
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Tindakan yang tidak dapat dibatalkan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Reset API Keys</div>
                    <div className="text-sm text-gray-500">Semua koneksi API saat ini akan terputus</div>
                  </div>
                  <Button variant="destructive" size="sm">
                    Reset Keys
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Hapus Semua Data</div>
                    <div className="text-sm text-gray-500">Hapus semua data chat, leads, dan analitik</div>
                  </div>
                  <Button variant="destructive" size="sm">
                    Hapus Data
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Hapus Akun</div>
                    <div className="text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan</div>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus Akun
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Paket Anda</CardTitle>
                    <CardDescription className="mt-1">
                      Detail paket langganan Anda
                    </CardDescription>
                  </div>
                  <Badge className="self-start md:self-auto bg-blue-600 text-white px-4 py-1">UMKM Pro</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status Langganan</div>
                    <div className="font-medium text-xl mt-1 flex items-center">
                      <span className="text-green-600 mr-2">Aktif</span>
                      <Badge variant="outline" className="text-xs">
                        Auto-renewal
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Periode Langganan</div>
                    <div className="font-medium text-xl mt-1">6 bulan</div>
                    <div className="text-sm text-gray-500">Hingga 15 Des 2023</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pembayaran Berikutnya</div>
                    <div className="font-medium text-xl mt-1">Rp 499.000</div>
                    <div className="text-sm text-gray-500">Jatuh tempo 15 Des 2023</div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Fitur Paket</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "5 Agent AI",
                      "Integrasi WhatsApp Business",
                      "Integrasi Instagram",
                      "10,000 kata AI/bulan",
                      "Analitik Dasar",
                      "Support via Email",
                      "Max 3 admin",
                      "Export data"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 border-t dark:border-gray-800 pt-4">
                <Button variant="outline" className="sm:flex-1">Ubah Metode Pembayaran</Button>
                <Button className="sm:flex-1 bg-blue-600 hover:bg-blue-700">
                  Upgrade Paket
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card">
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>
                  Riwayat pembayaran langganan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left [&>th]:py-3 [&>th]:px-2 text-xs text-gray-500 dark:text-gray-400 border-b dark:border-gray-800">
                        <th>Tanggal</th>
                        <th>Deskripsi</th>
                        <th>Metode</th>
                        <th>Status</th>
                        <th className="text-right">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { date: "15 Jun 2023", desc: "Paket UMKM Pro - 6 bulan", method: "Credit Card", status: "Sukses", amount: "Rp 499.000" },
                        { date: "15 Des 2022", desc: "Paket UMKM Pro - 6 bulan", method: "Credit Card", status: "Sukses", amount: "Rp 499.000" },
                        { date: "15 Jun 2022", desc: "Paket UMKM Pro - 6 bulan", method: "Bank Transfer", status: "Sukses", amount: "Rp 499.000" },
                      ].map((tx, i) => (
                        <tr key={i} className="border-b dark:border-gray-800 [&>td]:py-4 [&>td]:px-2">
                          <td>{tx.date}</td>
                          <td>{tx.desc}</td>
                          <td>{tx.method}</td>
                          <td>
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-500 border-green-200 dark:border-green-800">
                              {tx.status}
                            </Badge>
                          </td>
                          <td className="text-right font-medium">{tx.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="dark:border-gray-800 dark:bg-gray-900 dashboard-card mt-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Butuh bantuan lebih lanjut?</h3>
                <p className="text-gray-500 dark:text-gray-400">Tim dukungan kami siap membantu pertanyaan dan kendala Anda</p>
              </div>
              <Button variant="outline" className="min-w-[140px]">
                Hubungi Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
