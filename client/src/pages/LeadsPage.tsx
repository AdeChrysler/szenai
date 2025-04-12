
import React, { useState } from 'react';
import { DashboardPage } from './DashboardPage';
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
  X
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
import { Textarea } from '@/components/ui/textarea';

// Type definitions
interface Lead {
  id: string;
  name: string;
  contact: string;
  source: string;
  status: 'Hot' | 'Warm' | 'Cold';
  lastActive: string;
  notes: string;
  email?: string;
  tags: string[];
}

const LeadsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  
  // Dummy leads data
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Joko Widodo',
      contact: '081234567890',
      email: 'joko@example.com',
      source: 'WhatsApp',
      status: 'Hot',
      lastActive: '1 jam lalu',
      notes: 'Tertarik dengan paket premium. Follow up minggu depan.',
      tags: ['Potensi', 'Bisnis Besar']
    },
    {
      id: '2',
      name: 'Siti Badriah',
      contact: '089876543210',
      email: 'siti@example.com',
      source: 'Instagram',
      status: 'Hot',
      lastActive: '3 jam lalu',
      notes: 'Menanyakan detail integrasi dengan sistem accounting.',
      tags: ['UMKM', 'Teknologi']
    },
    {
      id: '3',
      name: 'Hendra Gunawan',
      contact: '085111222333',
      email: 'hendra@example.com',
      source: 'Web Chat',
      status: 'Hot',
      lastActive: '6 jam lalu',
      notes: 'Demo scheduled for next week.',
      tags: ['Teknologi', 'Enterprise']
    },
    {
      id: '4',
      name: 'Sri Mulyani',
      contact: '081122334455',
      email: 'sri@example.com',
      source: 'WhatsApp',
      status: 'Warm',
      lastActive: '1 hari lalu',
      notes: 'Comparing with competitors. Need to emphasize our USPs.',
      tags: ['UMKM', 'Retail']
    },
    {
      id: '5',
      name: 'Budi Santoso',
      contact: '082233445566',
      email: 'budi@example.com',
      source: 'Instagram',
      status: 'Warm',
      lastActive: '2 hari lalu',
      notes: 'Interested in basic plan but concerned about pricing.',
      tags: ['Starter', 'Budget']
    },
    {
      id: '6',
      name: 'Dewi Lestari',
      contact: '083344556677',
      email: 'dewi@example.com',
      source: 'Web Chat',
      status: 'Cold',
      lastActive: '5 hari lalu',
      notes: 'Initial inquiry but went silent. Needs follow-up.',
      tags: ['Retail', 'New']
    },
    {
      id: '7',
      name: 'Agus Salim',
      contact: '084455667788',
      email: 'agus@example.com',
      source: 'WhatsApp',
      status: 'Cold',
      lastActive: '1 minggu lalu',
      notes: 'Requested brochure but no further communication.',
      tags: ['Potensi', 'Midsized']
    },
  ]);
  
  // Create a new lead form state
  const [newLead, setNewLead] = useState<Omit<Lead, 'id'>>({
    name: '',
    contact: '',
    email: '',
    source: 'WhatsApp',
    status: 'Warm',
    lastActive: 'Baru',
    notes: '',
    tags: []
  });
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (editingLead) {
      setEditingLead({
        ...editingLead,
        [name]: value
      });
    } else {
      setNewLead({
        ...newLead,
        [name]: value
      });
    }
  };
  
  // Add new lead
  const handleAddLead = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const leadToAdd = {
      ...newLead,
      id,
      tags: newLead.tags.length ? newLead.tags : ['New'],
    };
    
    setLeads([leadToAdd, ...leads]);
    setNewLead({
      name: '',
      contact: '',
      email: '',
      source: 'WhatsApp',
      status: 'Warm',
      lastActive: 'Baru',
      notes: '',
      tags: []
    });
    setIsAddDialogOpen(false);
  };
  
  // Update lead
  const handleUpdateLead = () => {
    if (!editingLead) return;
    
    const updatedLeads = leads.map(lead => 
      lead.id === editingLead.id ? editingLead : lead
    );
    
    setLeads(updatedLeads);
    setEditingLead(null);
  };
  
  // Delete lead
  const handleDeleteLead = () => {
    if (!leadToDelete) return;
    
    const filteredLeads = leads.filter(lead => lead.id !== leadToDelete);
    setLeads(filteredLeads);
    setLeadToDelete(null);
    setIsDeleteDialogOpen(false);
  };
  
  // Filter leads based on search and filter criteria
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) || 
      lead.contact.includes(search) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-600 hover:bg-red-700';
      case 'Warm': return 'bg-amber-600 hover:bg-amber-700';
      case 'Cold': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  // Source icon mapping
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'WhatsApp': return '📱';
      case 'Instagram': return '📸';
      case 'Web Chat': return '💻';
      default: return '📌';
    }
  };
  
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Manajemen Leads</h1>
        <p className="text-gray-500 dark:text-gray-400">Kelola dan pantau semua lead potensial dari berbagai sumber</p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input 
            placeholder="Cari nama, email, atau nomor telepon..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Hot">Hot</SelectItem>
              <SelectItem value="Warm">Warm</SelectItem>
              <SelectItem value="Cold">Cold</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Sumber" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Sumber</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Web Chat">Web Chat</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white hidden md:flex">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tambah Lead Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan informasi lead baru ke dalam sistem.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={newLead.name} 
                      onChange={handleInputChange}
                      placeholder="Masukkan nama" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact">Nomor Telepon</Label>
                    <Input 
                      id="contact" 
                      name="contact" 
                      value={newLead.contact} 
                      onChange={handleInputChange}
                      placeholder="cth: 081234567890" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={newLead.email} 
                      onChange={handleInputChange}
                      placeholder="contoh@email.com" 
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={newLead.status} 
                      onValueChange={(value) => setNewLead({...newLead, status: value as 'Hot' | 'Warm' | 'Cold'})}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot">Hot</SelectItem>
                        <SelectItem value="Warm">Warm</SelectItem>
                        <SelectItem value="Cold">Cold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="source">Sumber</Label>
                  <Select 
                    value={newLead.source} 
                    onValueChange={(value) => setNewLead({...newLead, source: value})}
                  >
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Pilih sumber" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Web Chat">Web Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    value={newLead.notes} 
                    onChange={handleInputChange}
                    placeholder="Tambahkan catatan tentang lead ini" 
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                <Button onClick={handleAddLead} className="bg-blue-600 hover:bg-blue-700 text-white">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex md:hidden">
          <Plus className="h-4 w-4 mr-2" />
          Tambah
        </Button>
      </div>
      
      {/* Leads count and export buttons */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan <span className="font-medium text-gray-900 dark:text-white">{filteredLeads.length}</span> dari <span className="font-medium text-gray-900 dark:text-white">{leads.length}</span> leads
        </p>
        
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Export CSV
        </Button>
      </div>
      
      {/* Leads Table */}
      <Card className="dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left [&>th]:py-3 [&>th]:px-4 text-xs text-gray-500 dark:text-gray-400 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th>Nama</th>
                  <th>Kontak</th>
                  <th>Sumber</th>
                  <th>Status</th>
                  <th>Terakhir Aktif</th>
                  <th>Catatan</th>
                  <th>Tags</th>
                  <th className="text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <UserCircle className="w-7 h-7 text-blue-600" />
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          {lead.email && (
                            <div className="text-xs text-gray-500">{lead.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{lead.contact}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="font-normal">
                        <span className="mr-1">{getSourceIcon(lead.source)}</span>
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{lead.lastActive}</td>
                    <td className="py-3 px-4 max-w-[150px]">
                      <p className="text-sm truncate" title={lead.notes}>
                        {lead.notes || '-'}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.slice(0, 2).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                        {lead.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs font-normal">
                            +{lead.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => setEditingLead(lead)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Lead
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={() => {
                              setLeadToDelete(lead.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredLeads.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">Tidak ada leads ditemukan</p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Coba ubah filter atau tambahkan lead baru</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Lead Baru
                    </Button>
                  </DialogTrigger>
                  <DialogContent>{/* Same content as add dialog above */}</DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Lead Dialog */}
      {editingLead && (
        <Dialog open={!!editingLead} onOpenChange={(open) => !open && setEditingLead(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
              <DialogDescription>
                Perbarui informasi lead dalam sistem.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">Nama Lengkap</Label>
                  <Input 
                    id="edit-name" 
                    name="name" 
                    value={editingLead.name} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-contact">Nomor Telepon</Label>
                  <Input 
                    id="edit-contact" 
                    name="contact" 
                    value={editingLead.contact} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    name="email" 
                    value={editingLead.email} 
                    onChange={handleInputChange}
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={editingLead.status} 
                    onValueChange={(value) => setEditingLead({...editingLead, status: value as 'Hot' | 'Warm' | 'Cold'})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hot">Hot</SelectItem>
                      <SelectItem value="Warm">Warm</SelectItem>
                      <SelectItem value="Cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-source">Sumber</Label>
                <Select 
                  value={editingLead.source} 
                  onValueChange={(value) => setEditingLead({...editingLead, source: value})}
                >
                  <SelectTrigger id="edit-source">
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Web Chat">Web Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-notes">Catatan</Label>
                <Textarea 
                  id="edit-notes" 
                  name="notes" 
                  value={editingLead.notes} 
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingLead(null)}>
                Batal
              </Button>
              <Button onClick={handleUpdateLead} className="bg-blue-600 hover:bg-blue-700 text-white">
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus lead ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteLead}>
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsPage;
