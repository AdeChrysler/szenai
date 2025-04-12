import React, { useState } from 'react';
import { DashboardLayout } from './DashboardPage';
import { 
  Search, 
  Filter, 
  UserCircle, 
  MoreHorizontal, 
  Plus, 
  Download, 
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Type definitions
type LeadStatus = 'hot' | 'warm' | 'cold' | 'customer' | 'lost';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  lastContact: string;
  notes: string;
  assignedTo?: string;
  tags: string[];
}

const LeadsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState<boolean>(false);
  const [newLead, setNewLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: 'website',
    status: 'cold',
    notes: '',
  });


  // Sample data
  const leads: Lead[] = [
    {
      id: 1,
      name: 'Joko Widodo',
      email: 'joko@example.com',
      phone: '081234567890',
      source: 'WhatsApp',
      status: 'hot',
      lastContact: '1 jam lalu',
      notes: 'Tertarik dengan paket premium, minta demo',
      assignedTo: 'Andi',
      tags: ['UMKM', 'Retail']
    },
    {
      id: 2,
      name: 'Siti Badriah',
      email: 'siti@example.com',
      phone: '089876543210',
      source: 'Instagram',
      status: 'hot',
      lastContact: '3 jam lalu',
      notes: 'Sudah menggunakan produk kompetitor, mencari alternatif yang lebih baik',
      tags: ['Enterprise', 'Manufaktur']
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '087654321098',
      source: 'Website',
      status: 'warm',
      lastContact: '1 hari lalu',
      notes: 'Mencari solusi untuk tim sales 12 orang',
      assignedTo: 'Maya',
      tags: ['Enterprise', 'Jasa']
    },
    {
      id: 4,
      name: 'Rina Wati',
      email: 'rina@example.com',
      phone: '082345678901',
      source: 'Instagram',
      status: 'warm',
      lastContact: '2 hari lalu',
      notes: 'Follow up setelah webinar',
      tags: ['UMKM', 'F&B']
    },
    {
      id: 5,
      name: 'Ahmad Fauzi',
      email: 'ahmad@example.com',
      phone: '083456789012',
      source: 'WhatsApp',
      status: 'cold',
      lastContact: '5 hari lalu',
      notes: 'Masih membandingkan beberapa produk',
      tags: ['UMKM', 'Pendidikan']
    },
    {
      id: 6,
      name: 'Dewi Lestari',
      email: 'dewi@example.com',
      phone: '084567890123',
      source: 'Website',
      status: 'customer',
      lastContact: '7 hari lalu',
      notes: 'Berlangganan paket bulanan',
      assignedTo: 'Andi',
      tags: ['Enterprise', 'Kesehatan']
    },
    {
      id: 7,
      name: 'Hendra Gunawan',
      email: 'hendra@example.com',
      phone: '085678901234',
      source: 'Web Chat',
      status: 'hot',
      lastContact: '6 jam lalu',
      notes: 'Minta penawaran untuk 10 agen',
      tags: ['UMKM', 'Properti']
    },
  ];

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'hot':
        return <Badge className="bg-red-600">Hot</Badge>;
      case 'warm':
        return <Badge className="bg-orange-500">Warm</Badge>;
      case 'cold':
        return <Badge className="bg-blue-500">Cold</Badge>;
      case 'customer':
        return <Badge className="bg-green-600">Customer</Badge>;
      case 'lost':
        return <Badge className="bg-gray-500">Lost</Badge>;
    }
  };

  const handleAddLead = () => {
    setIsAddLeadOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddLeadOpen(false);
    setNewLead({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      source: 'website',
      status: 'cold',
      notes: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle lead submission here...
    handleCloseDialog();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold animate-fade-in-left">Manajemen Leads</h1>
            <p className="text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>Kelola dan pantau semua prospek bisnis Anda</p>
          </div>
          <div className="flex gap-2 animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <Button variant="outline" size="icon" onClick={handleAddLead} className="transition-all hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Lead
            </Button>
            <Button variant="outline" className="transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Lead summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { label: 'Total Leads', count: leads.length, color: 'bg-gray-500' },
            { label: 'Hot Leads', count: leads.filter(l => l.status === 'hot').length, color: 'bg-red-600' },
            { label: 'Warm Leads', count: leads.filter(l => l.status === 'warm').length, color: 'bg-orange-500' },
            { label: 'Cold Leads', count: leads.filter(l => l.status === 'cold').length, color: 'bg-blue-500' },
            { label: 'Customers', count: leads.filter(l => l.status === 'customer').length, color: 'bg-green-600' },
          ].map((stat, index) => (
            <Card key={index} className="dark:border-gray-800 dark:bg-gray-900 animate-slide-in-up" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
              <CardContent className="p-4 flex flex-col items-center">
                <div className={`${stat.color} w-3 h-3 rounded-full mb-2`}></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leads table */}
        <Card className="dark:border-gray-800 dark:bg-gray-900 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Semua Leads</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter & Sort
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left [&>th]:py-3 [&>th]:px-2 text-xs text-gray-500 dark:text-gray-400 border-b dark:border-gray-800">
                    <th className="w-10"></th>
                    <th>Nama</th>
                    <th>Kontak</th>
                    <th>Sumber</th>
                    <th>Status</th>
                    <th>Tag</th>
                    <th>Terakhir Kontak</th>
                    <th className="text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b dark:border-gray-800 [&>td]:py-3 [&>td]:px-2 animate-fade-in" style={{ animationDelay: `${lead.id * 0.1}s` }}>
                      <td>
                        <div className="flex justify-center">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium">{lead.name}</span>
                          <span className="text-xs text-gray-500">{lead.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span>{lead.phone}</span>
                          {lead.assignedTo && (
                            <Badge variant="outline" className="text-[10px] h-5">
                              {lead.assignedTo}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        <Badge variant="outline">{lead.source}</Badge>
                      </td>
                      <td>
                        {getStatusBadge(lead.status)}
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {lead.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-[10px] h-5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="text-gray-500">{lead.lastContact}</td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                              <DropdownMenuItem>Kirim Email</DropdownMenuItem>
                              <DropdownMenuItem>Tambah Catatan</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Hapus Lead</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Lead Dialog */}
      <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
        <DialogContent className="max-w-md animate-fade-in-scale">
          <DialogHeader>
            <DialogTitle>Tambah Lead Baru</DialogTitle>
            <DialogDescription>
              Isi informasi lengkap lead baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <Label htmlFor="firstName">Nama Depan</Label>
                <Input id="firstName" name="firstName" value={newLead.firstName} onChange={handleChange} placeholder="Masukkan nama depan" className="transition-all focus:scale-[1.01]" />
              </div>
              <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.15s' }}>
                <Label htmlFor="lastName">Nama Belakang</Label>
                <Input id="lastName" name="lastName" value={newLead.lastName} onChange={handleChange} placeholder="Masukkan nama belakang" className="transition-all focus:scale-[1.01]" />
              </div>
            </div>
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={newLead.email} onChange={handleChange} placeholder="email@example.com" className="transition-all focus:scale-[1.01]" />
            </div>
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.25s' }}>
              <Label htmlFor="phone">No. Telepon</Label>
              <Input id="phone" name="phone" value={newLead.phone} onChange={handleChange} placeholder="+62812345678" className="transition-all focus:scale-[1.01]" />
            </div>
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <Label htmlFor="source">Sumber</Label>
              <Select value={newLead.source} onChange={handleChange} name="source">
                <SelectTrigger className="transition-all hover:border-blue-400">
                  <SelectValue placeholder="Pilih sumber lead" />
                </SelectTrigger>
                <SelectContent className="animate-fade-in-scale">
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.35s' }}>
              <Label htmlFor="status">Status</Label>
              <Select value={newLead.status} onChange={handleChange} name="status">
                <SelectTrigger className="transition-all hover:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="animate-fade-in-scale">
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <Label htmlFor="notes">Catatan</Label>
              <Textarea id="notes" name="notes" value={newLead.notes} onChange={handleChange} placeholder="Tambahkan catatan tentang lead ini" className="transition-all focus:scale-[1.01]" />
            </div>
          </form>
          <DialogFooter className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button variant="outline" onClick={handleCloseDialog} className="transition-all hover:bg-gray-100">Batal</Button>
            <Button type="submit" onClick={handleSubmit} className="transition-all hover:scale-105">Simpan Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LeadsPage;