
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";

export default function KontakPage() {
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
          <Button size="lg" variant="secondary" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20">
            <Link href="/daftar">Coba Gratis</Link>
          </Button>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hubungi <span className="text-blue-400">Tim Kami</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ada pertanyaan? Tim kami siap membantu Anda mengoptimalkan bisnis dengan Zenith AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-bold mb-2">Telepon</h3>
                  <p className="text-gray-400">+62 812-3456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-gray-400">hello@zenith-ai.id</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-bold mb-2">Lokasi</h3>
                  <p className="text-gray-400">
                    Jl. Sudirman No.123<br />
                    Jakarta Pusat, 10220
                  </p>
                </div>
              </div>
            </div>

            <form className="space-y-6 bg-blue-900/20 p-8 rounded-xl">
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-blue-950/50 rounded-lg border border-blue-800 focus:border-blue-400 focus:outline-none"
                  placeholder="Nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-blue-950/50 rounded-lg border border-blue-800 focus:border-blue-400 focus:outline-none"
                  placeholder="email@perusahaan.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea
                  className="w-full px-4 py-2 bg-blue-950/50 rounded-lg border border-blue-800 focus:border-blue-400 focus:outline-none"
                  rows={4}
                  placeholder="Bagaimana kami bisa membantu?"
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
