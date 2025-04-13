
import React from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, MessageSquare, MessagesSquare, Users, BarChart2, Share2, Settings } from 'lucide-react';

const Sidebar = () => {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <svg className="h-8 w-8 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Zenith AI
        </h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/dashboard') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/chat">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/chat') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <MessageSquare className="h-5 w-5 mr-3" />
                Riwayat Chat
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/whatsapp-new-chat">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/whatsapp-new-chat') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <MessagesSquare className="h-5 w-5 mr-3" />
                WhatsApp New Chat
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/leads">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/leads') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <Users className="h-5 w-5 mr-3" />
                Manajemen Leads
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/analytics">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/analytics') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <BarChart2 className="h-5 w-5 mr-3" />
                Statistik
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/integrations">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/integrations') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <Share2 className="h-5 w-5 mr-3" />
                Integrasi
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/settings">
              <a className={`flex items-center p-3 rounded-lg ${
                isActive('/settings') ? 'bg-blue-700' : 'hover:bg-gray-800'
              }`}>
                <Settings className="h-5 w-5 mr-3" />
                Pengaturan
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Penggunaan AI</div>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
