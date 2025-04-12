
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
  Check
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

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Pengaturan</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola Preferensi Akun dan Aplikasi</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
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

          {/* Account Settings */}
          <TabsContent value="account">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Profil</CardTitle>
                  <CardDescription>Perbarui informasi profil Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user?.profile_image} />
                      <AvatarFallback className="text-xl bg-blue-600 text-white">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm" className="mb-2">
                        Ganti Foto
                      </Button>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        JPG, GIF atau PNG. Maks 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" defaultValue={user?.email?.split('@')[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user?.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Nama Bisnis</Label>
                      <Input id="company" placeholder="Nama Bisnis Anda" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" placeholder="+62..." />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Batal</Button>
                  <Button onClick={handleSave}>
                    {saved ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Tersimpan
                      </>
                    ) : (
                      'Simpan Perubahan'
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferensi Bahasa</CardTitle>
                  <CardDescription>Pilih bahasa tampilan aplikasi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Bahasa Aplikasi</Label>
                    <Select defaultValue="id">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Pilih Bahasa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>
                    {saved ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Tersimpan
                      </>
                    ) : (
                      'Simpan Perubahan'
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-500">Zona Bahaya</CardTitle>
                  <CardDescription>Tindakan permanen yang tidak dapat diubah</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Menghapus akun akan menghapus semua data dan tidak dapat dikembalikan.
                  </p>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus Akun
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>Sesuaikan kapan dan bagaimana Anda menerima pemberitahuan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Lead Baru</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dapatkan notifikasi saat ada prospek baru yang masuk
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Percakapan Baru</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dapatkan notifikasi saat ada percakapan baru dimulai
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Laporan Mingguan</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Kirim laporan mingguan aktivitas chatbot
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Pengumuman Produk</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dapatkan info fitur baru dan pembaruan produk
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifikasi Aplikasi</h3>
                  <Separator />
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Notifikasi Real-time</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tampilkan notifikasi dalam aplikasi
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Suara Notifikasi</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Putar suara saat ada notifikasi baru
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>
                  {saved ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Tersimpan
                    </>
                  ) : (
                    'Simpan Perubahan'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ubah Password</CardTitle>
                  <CardDescription>Perbarui password akun Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Password Saat Ini</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password Baru</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>
                    {saved ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Tersimpan
                      </>
                    ) : (
                      'Perbarui Password'
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autentikasi Dua Faktor</CardTitle>
                  <CardDescription>Tambahkan lapisan keamanan ekstra untuk akun Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Aktifkan 2FA</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lindungi akun dengan verifikasi dua langkah
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesi Aktif</CardTitle>
                  <CardDescription>Kelola perangkat yang sedang login</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <div>
                        <p className="font-medium">Chrome di Windows</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Jakarta, Indonesia • Saat ini</p>
                      </div>
                      <Button variant="outline" size="sm">Saat ini</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <div>
                        <p className="font-medium">Safari di iPhone</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Jakarta, Indonesia • 2 jam lalu</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        Akhiri Sesi
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-red-600">
                    Keluar dari Semua Perangkat
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paket Langganan</CardTitle>
                  <CardDescription>Paket langganan Anda saat ini</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-blue-600 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">UMKM Pro</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Ditagih bulanan</p>
                      </div>
                      <Badge className="bg-blue-600">Aktif</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Harga</span>
                        <span className="font-medium">Rp 199.000/bulan</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Masa aktif hingga</span>
                        <span className="font-medium">25 Agustus 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Status pembayaran</span>
                        <span className="text-green-600 font-medium">Lunas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="default">Upgrade Paket</Button>
                    <Button variant="outline">Batalkan Langganan</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                  <CardDescription>Kelola metode pembayaran Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Kedaluwarsa 12/25</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  
                  <Button variant="outline">Tambah Metode Pembayaran</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Pembayaran</CardTitle>
                  <CardDescription>Lihat riwayat pembayaran Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <div>
                        <p className="font-medium">UMKM Pro - Bulanan</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">25 Juli 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rp 199.000</p>
                        <Button variant="link" className="h-auto p-0 text-xs">Lihat faktur</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <div>
                        <p className="font-medium">UMKM Pro - Bulanan</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">25 Juni 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rp 199.000</p>
                        <Button variant="link" className="h-auto p-0 text-xs">Lihat faktur</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
