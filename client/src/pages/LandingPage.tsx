
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Timer, Users, BarChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Ubah Chat WhatsApp Jadi <span className="text-blue-600 dark:text-blue-400">Mesin Penjualan</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          AI pintar yang aktif mencari peluang, follow up leads, dan closing penjualan - khusus untuk UMKM Indonesia
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/daftar">Mulai Gratis 14 Hari <ArrowRight className="h-5 w-5" /></Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/demo">Lihat Demo</Link>
          </Button>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Masalah yang Zenith AI Selesaikan untuk UMKM Anda
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
              <Timer className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Chat Terlewat = Omzet Hilang</h3>
              <p className="text-gray-600 dark:text-gray-300">Stop kehilangan pelanggan karena lambat respon. Zenith AI membalas instan 24/7, mengubah chat jadi transaksi.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
              <Users className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Tim Kewalahan Follow Up</h3>
              <p className="text-gray-600 dark:text-gray-300">Otomatisasi follow up berkualitas tinggi. Zenith AI konsisten menindaklanjuti sampai closing.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
              <BarChart className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Data Leads Berantakan</h3>
              <p className="text-gray-600 dark:text-gray-300">Kelola semua data prospek dan interaksi dalam satu dashboard. Analisis yang membantu keputusan bisnis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            UMKM yang Sudah Berhasil dengan Zenith AI
          </h2>
          <div className="max-w-3xl mx-auto bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
            <blockquote className="text-lg mb-6">
              "Dulu butuh 4-5 jam untuk balas chat customer. Sekarang dengan Zenith AI, respons instan dan follow-up otomatis berhasil naikin konversi 3x lipat dalam sebulan pertama. Tim bisa fokus ke pengembangan bisnis."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-600" />
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Asisten Penjualan Cerdas</h3>
              <p className="text-gray-600 dark:text-gray-300">Proaktif mengenali sinyal pembelian dan membimbing prospek menuju closing. Bukan sekadar bot FAQ.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Follow-up Otomatis</h3>
              <p className="text-gray-600 dark:text-gray-300">Jadwalkan rangkaian follow-up personal untuk setiap prospek. Konsisten tanpa perlu campur tangan manual.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Closing */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Tingkatkan Penjualan UMKM Anda?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Mulai gratis 14 hari. Setup cuma 5 menit. Tanpa kartu kredit.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="/daftar">Mulai Sekarang <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
