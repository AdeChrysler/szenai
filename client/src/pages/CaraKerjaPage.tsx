
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Workflow, Database } from "lucide-react";

export default function CaraKerjaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
      {/* Sticky Nav - same as other pages */}
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

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bagaimana <span className="text-blue-400">Zenith AI Bekerja</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Proses sederhana namun powerful untuk mengotomatisasi customer service bisnis Anda
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Bot className="w-16 h-16 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">1. Training AI</h3>
                <p className="text-gray-400">
                  AI kami dilatih dengan data bisnis Anda untuk memberikan respons yang akurat dan personal
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Training" className="rounded-xl" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Integration" className="rounded-xl" />
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <Workflow className="w-16 h-16 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">2. Integrasi Otomatis</h3>
                <p className="text-gray-400">
                  Hubungkan dengan WhatsApp Business dan platform chat lainnya dalam hitungan menit
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Database className="w-16 h-16 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">3. Pengumpulan Data</h3>
                <p className="text-gray-400">
                  Semua interaksi pelanggan tersimpan dan teranalisis untuk insight bisnis yang lebih baik
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Data Collection" className="rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Siap Mengotomatisasi Bisnis Anda?
          </h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-xl text-lg px-8 shadow-lg shadow-blue-500/20">
            <Link href="/daftar">Mulai Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
