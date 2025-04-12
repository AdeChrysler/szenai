import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Ubah WhatsApp Bisnis Anda Jadi Mesin Penjualan Otomatis
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          AI yang tak hanya membalas chat, tapi aktif mencari peluang, follow up leads, dan menutup deal untuk UMKM Anda
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/daftar">Mulai Gratis 14 Hari</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/demo">Lihat Demo</Link>
          </Button>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kenapa UMKM Butuh Lebih dari Sekadar Chatbot?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Leads Terlewat = Omzet Hilang</h3>
              <p>Chat yang tidak dibalas cepat berisiko tinggi beralih ke kompetitor. Zenith AI memastikan semua leads ditangani instan.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Follow-up Manual Menyita Waktu</h3>
              <p>Tim Anda bisa fokus ke tugas strategis, biarkan Zenith AI yang konsisten follow up sampai deal tercapai.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Data Pelanggan Berantakan</h3>
              <p>Semua interaksi dan data prospek tersimpan rapi, mudah diakses, dan siap dianalisis untuk keputusan bisnis yang lebih baik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kisah Sukses Pengguna Zenith AI
          </h2>
          <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
            <blockquote className="text-lg mb-6">
              "Sebelumnya butuh 4-5 jam untuk balas chat customer. Dengan Zenith AI, respons instan dan follow-up otomatis berhasil tingkatkan konversi kami 3x lipat dalam sebulan pertama."
            </blockquote>
            <div className="flex items-center">
              <div>
                <p className="font-semibold">Sarah Wijaya</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Founder, Healthy Bites Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fitur yang Membuat Zenith AI Berbeda
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Smart Sales Assistant</h3>
              <p>AI yang proaktif mengenali sinyal pembelian dan membimbing prospek menuju closing, tidak sekadar menjawab FAQ.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Automated Follow-up</h3>
              <p>Jadwalkan rangkaian follow-up yang personal untuk setiap prospek, tanpa perlu campur tangan manual.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Meeting Scheduler</h3>
              <p>Prospek bisa langsung booking jadwal demo atau konsultasi, terintegrasi dengan kalender tim Anda.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">CRM Terintegrasi</h3>
              <p>Kelola semua data prospek, histori interaksi, dan pipeline penjualan dalam satu dashboard yang intuitif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Closing */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Otomatisasi Penjualan Bisnis Anda?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Mulai gratis 14 hari, tanpa kartu kredit. Setup cuma 5 menit.
          </p>
          <Button size="lg" className="mr-4" asChild>
            <Link href="/daftar">Mulai Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}