
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Kisah Sukses <span className="text-blue-400">Pengguna Zenith AI</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Lihat bagaimana berbagai bisnis berhasil tumbuh dengan bantuan Zenith AI
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {[
              {
                company: "Kopi Nusantara",
                person: "Budi Santoso",
                role: "Founder",
                result: "3x peningkatan leads",
                quote: "Sebelum pakai Zenith AI, banyak chat customer yang kelewat karena tim CS sibuk. Sekarang respons instan dan follow-up otomatis berhasil naikin konversi 3x lipat dalam sebulan pertama."
              },
              {
                company: "Klinik Ratu Sehat",
                person: "dr. Sarah Wijaya",
                role: "CEO",
                result: "Response time 5 menit",
                quote: "Dari yang butuh 4-5 jam untuk balas chat pasien, sekarang dengan Zenith AI response time turun jadi rata-rata 5 menit. Tim bisa fokus ke pelayanan langsung."
              },
              {
                company: "Digital Class",
                person: "Reza Prasetyo",
                role: "Marketing Manager",
                result: "Closing otomatis 24/7",
                quote: "AI-nya pintar banget, bisa detect interest customer dan guide mereka sampai closing. Tiap pagi bangun udah ada laporan penjualan baru yang masuk automatis."
              }
            ].map((story, i) => (
              <div key={i} className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{story.company}</h3>
                    <p className="text-gray-400 mb-4">{story.result}</p>
                    <div className="flex space-x-1 mb-4">
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <blockquote className="text-lg mb-6">"{story.quote}"</blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-600" />
                      <div>
                        <p className="font-semibold">{story.person}</p>
                        <p className="text-sm text-gray-400">{story.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0f172a]/50 border-y border-blue-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Jadikan Bisnis Anda Kisah Sukses Berikutnya
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Mulai perjalanan sukses Anda dengan Zenith AI hari ini
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-xl text-lg px-8 shadow-lg shadow-blue-500/20" asChild>
            <Link href="/daftar">Mulai Gratis <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
