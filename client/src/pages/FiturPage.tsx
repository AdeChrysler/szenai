
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare, Database, Zap, Share2, BarChart, Users, Shield, ArrowRight } from "lucide-react";

export default function FiturPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fitur Lengkap untuk <span className="text-blue-400">Otomatisasi Bisnis</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Kumpulkan leads dari WhatsApp tanpa takut chat kelewat. Zenith AI aktif 24/7 untuk bisnis Anda.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Respon Otomatis Cerdas",
                desc: "Balas chat WhatsApp & Instagram DM secara instan dengan AI yang mengerti konteks bisnis Anda"
              },
              {
                icon: Database,
                title: "CRM Terintegrasi",
                desc: "Semua histori chat tersimpan rapi dan terorganisir dalam satu dashboard yang mudah diakses"
              },
              {
                icon: Zap,
                title: "Follow-up Otomatis",
                desc: "AI yang proaktif menindaklanjuti leads dan membantu proses closing tanpa campur tangan manusia"
              },
              {
                icon: Share2,
                title: "Integrasi Multi-Platform",
                desc: "Hubungkan dengan tools bisnis favorit Anda: Notion, Google Sheets, dan lainnya"
              },
              {
                icon: BarChart,
                title: "Analisis Performa",
                desc: "Pantau metrics penting: response time, conversion rate, dan efektivitas follow-up"
              },
              {
                icon: Shield,
                title: "Keamanan Data",
                desc: "Data pelanggan Anda aman dengan enkripsi end-to-end dan backup otomatis"
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <feature.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0f172a]/50 border-y border-blue-900/30">
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
    </div>
  );
}
