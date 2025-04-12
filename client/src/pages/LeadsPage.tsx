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
  const [isAddLeadOpen, setIsAddLeadOpen] = useState<false | 'add' | 'edit'>(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

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
    setIsAddLeadOpen('add');
    setEditingLead(null);
  };

  const handleEditLead = (lead: Lead) => {
    setIsAddLeadOpen('edit');
    setEditingLead(lead);
  };

  const closeDialog = () => {
    setIsAddLeadOpen(false);
    setEditingLead(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Manajemen Leads</h1>
          <p className="text-gray-500 dark:text-gray-400">Kelola semua prospek dan kontak potensial</p>
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input 
                placeholder="Cari berdasarkan nama, email, atau no. telepon..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
            <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700" onClick={handleAddLead}>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Tambah Lead
            </Button>
          </div>
        </div>

        {/* Lead summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Leads', count: leads.length, color: 'bg-gray-500' },
            { label: 'Hot Leads', count: leads.filter(l => l.status === 'hot').length, color: 'bg-red-600' },
            { label: 'Warm Leads', count: leads.filter(l => l.status === 'warm').length, color: 'bg-orange-500' },
            { label: 'Cold Leads', count: leads.filter(l => l.status === 'cold').length, color: 'bg-blue-500' },
            { label: 'Customers', count: leads.filter(l => l.status === 'customer').length, color: 'bg-green-600' },
          ].map((stat, index) => (
            <Card key={index} className="dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-4 flex flex-col items-center">
                <div className={`${stat.color} w-3 h-3 rounded-full mb-2`}></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leads table */}
        <Card className="dark:border-gray-800 dark:bg-gray-900">
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
                    <tr key={lead.id} className="border-b dark:border-gray-800 [&>td]:py-3 [&>td]:px-2">
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
                            onClick={() => handleEditLead(lead)}
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
      <Dialog open={!!isAddLeadOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isAddLeadOpen === 'edit' ? 'Edit Lead' : 'Tambah Lead Baru'}</DialogTitle>
            <DialogDescription>
              {isAddLeadOpen === 'edit' 
                ? 'Perbarui informasi lead dalam database Anda.' 
                : 'Tambahkan prospek baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  defaultValue={editingLead?.name || ''} 
                  placeholder="Nama lengkap" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={editingLead?.email || ''} 
                  placeholder="Email" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">No. Telepon</Label>
                <Input 
                  id="phone" 
                  defaultValue={editingLead?.phone || ''} 
                  placeholder="08xxxx" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="source">Sumber</Label>
                <Select defaultValue={editingLead?.source || "website"}>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={editingLead?.status || "cold"}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea 
                id="notes" 
                defaultValue={editingLead?.notes || ''} 
                placeholder="Tambahkan catatan tentang lead ini..." 
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Batal</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isAddLeadOpen === 'edit' ? 'Perbarui Lead' : 'Tambah Lead'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LeadsPage;