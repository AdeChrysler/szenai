
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, BarChart, Clock, Shield, Zap, Database, Share2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
      {/* Sticky Nav */}
      <nav className="sticky top-0 backdrop-blur-lg border-b border-blue-900/30 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Zenith AI
            </span>
          </Link>
          <div className="hidden md:flex space-x-8 text-gray-300">
            <Link href="/fitur">Fitur</Link>
            <Link href="/cara-kerja">Cara Kerja</Link>
            <Link href="/success-stories">Testimoni</Link>
            <Link href="/kontak">Kontak</Link>
          </div>
          <Button size="lg" variant="secondary" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20" asChild>
            <Link href="/daftar">Coba Gratis</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI Chatbot untuk Mengubah Chat Jadi 
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Closing</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Zenith AI bantu Anda membalas chat WhatsApp & DM 24 jam nonstop, kumpulkan leads, dan bantu closing otomatis.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-xl text-lg px-8 shadow-lg shadow-blue-500/20" asChild>
              <Link href="/daftar">Coba Gratis 14 Hari <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl text-lg px-8 border-blue-500/50 hover:bg-blue-950/50" asChild>
              <Link href="/demo">Lihat Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-blue-900/30 bg-[#0f172a]/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$2M+", label: "Total Transaksi", icon: BarChart },
              { value: "10.000+", label: "Leads Terkumpul", icon: Users },
              { value: "250+", label: "Bisnis Aktif", icon: MessageSquare },
              { value: "50+", label: "Mitra Integrator", icon: Share2 }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Masalah UMKM yang Kami Selesaikan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Leads Terlewat", desc: "Chat yang tidak dibalas cepat = pelanggan yang hilang", icon: Clock },
              { title: "CS Kewalahan", desc: "Tim support butuh istirahat, tapi pelanggan tetap butuh respon", icon: Users },
              { title: "Data Berantakan", desc: "Histori chat tercecer di berbagai platform tanpa dokumentasi", icon: Database }
            ].map((problem, i) => (
              <div key={i} className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:transform hover:scale-105">
                <problem.icon className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-4">{problem.title}</h3>
                <p className="text-gray-400">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0f172a]/50 border-y border-blue-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Solusi Zenith AI</h2>
          <div className="space-y-8">
            {[
              { title: "Balas Otomatis 24/7", desc: "WhatsApp & Instagram DM terintegrasi dengan AI pintar", icon: MessageSquare },
              { title: "CRM Terintegrasi", desc: "Simpan dan kelola semua histori chat dalam satu dashboard", icon: Database },
              { title: "Follow-up Otomatis", desc: "AI yang aktif mencari peluang dan menindaklanjuti leads", icon: Zap },
              { title: "Integrasi Tool Bisnis", desc: "Hubungkan dengan Notion, Sheets, dan aplikasi bisnis lainnya", icon: Share2 }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40">
                <feature.icon className="w-12 h-12 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Jangan Biarkan Pelanggan Menunggu
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Mulai tingkatkan penjualan bisnis Anda dengan Zenith AI hari ini. Gratis 14 hari, tanpa kartu kredit.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-xl text-lg px-8 shadow-lg shadow-blue-500/20" asChild>
            <Link href="/daftar">Coba Gratis Sekarang <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-gray-400">
            <div>
              <h3 className="font-bold text-white mb-4">Zenith AI</h3>
              <p className="text-sm">AI Chatbot CRM untuk UMKM Indonesia</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produk</h4>
              <div className="space-y-2">
                <Link href="/fitur"><div className="hover:text-white">Fitur</div></Link>
                <Link href="/cara-kerja"><div className="hover:text-white">Cara Kerja</div></Link>
                <Link href="/harga"><div className="hover:text-white">Harga</div></Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <div className="space-y-2">
                <Link href="/tentang-kami"><div className="hover:text-white">Tentang Kami</div></Link>
                <Link href="/partnerships"><div className="hover:text-white">Partnership</div></Link>
                <Link href="/kontak"><div className="hover:text-white">Kontak</div></Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/kebijakan-privasi"><div className="hover:text-white">Kebijakan Privasi</div></Link>
                <Link href="/syarat-ketentuan"><div className="hover:text-white">Syarat & Ketentuan</div></Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-900/30 text-center text-gray-500">
            © 2024 Zenith AI. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
