
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, BarChart, Clock, Shield, Zap, Database, Share2, Bot } from "lucide-react";

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
            <a href="#features">Fitur</a>
            <a href="#how-it-works">Cara Kerja</a>
            <a href="#success-stories">Testimoni</a>
            <a href="#contact">Kontak</a>
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
              <Link href="/login">Coba Gratis 14 Hari <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl text-lg px-8 border-blue-500/50 hover:bg-blue-950/50">
              <a href="#success-stories">Lihat Demo</a>
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

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Fitur Lengkap untuk Otomatisasi Bisnis</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Respon Otomatis 24/7",
                desc: "Balas chat WhatsApp & Instagram DM secara instan dengan AI yang mengerti konteks bisnis Anda"
              },
              {
                icon: Database,
                title: "CRM Terintegrasi",
                desc: "Simpan dan kelola semua histori chat dalam satu dashboard yang mudah diakses"
              },
              {
                icon: Zap,
                title: "Follow-up Otomatis",
                desc: "AI yang proaktif menindaklanjuti leads dan membantu proses closing"
              },
              {
                icon: Share2,
                title: "Integrasi Multi-Platform",
                desc: "Hubungkan dengan tools bisnis favorit Anda: Notion, Sheets, dan lainnya"
              },
              {
                icon: Shield,
                title: "Keamanan Data",
                desc: "Data pelanggan Anda aman dengan enkripsi end-to-end"
              },
              {
                icon: BarChart,
                title: "Analisis Performa",
                desc: "Pantau metrics penting: response time dan conversion rate"
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <feature.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#0f172a]/50 border-y border-blue-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Bagaimana Zenith AI Bekerja</h2>
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Bot className="w-16 h-16 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Training AI</h3>
                <p className="text-gray-400">
                  AI kami dilatih dengan data bisnis Anda untuk memberikan respons yang akurat dan personal
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Training" className="rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Kisah Sukses Pengguna</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20">
                <div className="text-blue-400 mb-4">★★★★★</div>
                <p className="text-gray-400 mb-6">
                  "Zenith AI membantu bisnis kami menghemat waktu dan resources dengan otomatisasi chat yang pintar."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full"></div>
                  <div>
                    <div className="font-bold">Nama Pengguna</div>
                    <div className="text-gray-400">Posisi, Perusahaan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#0f172a]/50 border-y border-blue-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Meningkatkan Performa Bisnis Anda?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Mulai gratis 14 hari. Tanpa kartu kredit.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-xl text-lg px-8 shadow-lg shadow-blue-500/20" asChild>
            <Link href="/daftar">Mulai Sekarang <ArrowRight className="ml-2" /></Link>
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
                <a href="#features" className="block hover:text-white">Fitur</a>
                <a href="#how-it-works" className="block hover:text-white">Cara Kerja</a>
                <Link href="/harga" className="block hover:text-white">Harga</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <div className="space-y-2">
                <Link href="/tentang-kami" className="block hover:text-white">Tentang Kami</Link>
                <Link href="/partnerships" className="block hover:text-white">Partnership</Link>
                <a href="#contact" className="block hover:text-white">Kontak</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/kebijakan-privasi" className="block hover:text-white">Kebijakan Privasi</Link>
                <Link href="/syarat-ketentuan" className="block hover:text-white">Syarat & Ketentuan</Link>
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
