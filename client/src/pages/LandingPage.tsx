
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, BarChart, Clock, Shield, Zap, Database, Share2, Bot, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const prevScrollY = useRef(0);

  // For header visibility control based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > 100) {
        setIsHeaderVisible(prevScrollY.current > currentScrollY);
      } else {
        setIsHeaderVisible(true);
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Testimonial data
  const testimonials = [
    {
      name: "Ahmad Rizki",
      position: "CEO, Tokopedia",
      company: "E-commerce",
      text: "Zenith AI meningkatkan konversi kami sebesar 37% dalam 2 bulan pertama. Layanan pelanggan kami sekarang bisa fokus pada kasus yang lebih kompleks.",
      image: "https://placehold.co/200x200/1e293b/white"
    },
    {
      name: "Lina Wijaya",
      position: "Pemilik, Wijaya Property",
      company: "Real Estate",
      text: "Respons cepat dari AI membuat lebih banyak calon pembeli tertarik dan bertanya lebih lanjut. ROI sudah 5x dalam 3 bulan.",
      image: "https://placehold.co/200x200/1e293b/white"
    },
    {
      name: "Budi Santoso",
      position: "Marketing Director, BukaLapak",
      company: "Marketplace",
      text: "Tim kami bisa fokus pada strategi sambil Zenith menangani ribuan chat setiap hari. Game changer untuk bisnis kami.",
      image: "https://placehold.co/200x200/1e293b/white"
    },
    {
      name: "Diana Putri",
      position: "Founder, Kopi Kenangan",
      company: "F&B",
      text: "Zenith AI berhasil mengumpulkan feedback pelanggan dan data penting yang membantu kami meningkatkan layanan.",
      image: "https://placehold.co/200x200/1e293b/white"
    },
    {
      name: "Reza Pratama",
      position: "Digital Manager, Traveloka",
      company: "Travel",
      text: "Pelanggan kami sering bertanya hal yang sama berulang kali. Zenith AI menyelesaikan masalah ini dan meningkatkan kepuasan pelanggan.",
      image: "https://placehold.co/200x200/1e293b/white"
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Bagaimana cara kerja Zenith AI?",
      answer: "Zenith AI menggunakan teknologi AI canggih yang dilatih khusus untuk bisnis Anda. Setelah Anda memberikan informasi tentang produk dan layanan Anda, Zenith AI akan mampu menjawab pertanyaan pelanggan, mengumpulkan leads, dan membantu proses closing secara otomatis 24/7."
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk setup?",
      answer: "Setup awal Zenith AI hanya membutuhkan waktu sekitar 30 menit. Anda cukup menghubungkan akun WhatsApp Business atau Instagram Anda dan memberikan informasi produk. Tim kami juga akan membantu proses onboarding dengan penuh."
    },
    {
      question: "Apakah Zenith AI dapat diintegrasikan dengan CRM yang sudah ada?",
      answer: "Ya, Zenith AI dapat diintegrasikan dengan berbagai CRM populer seperti HubSpot, Salesforce, dan sistem custom. Kami juga menyediakan API yang memudahkan integrasi dengan sistem lainnya."
    },
    {
      question: "Bagaimana dengan keamanan data pelanggan saya?",
      answer: "Keamanan adalah prioritas utama kami. Semua data dienkripsi end-to-end dan disimpan dengan aman sesuai standar industri. Kami juga mematuhi regulasi privasi data terbaru untuk memastikan data Anda dan pelanggan tetap aman."
    },
    {
      question: "Apakah ada batasan jumlah chat yang bisa dikelola?",
      answer: "Tidak ada batasan teknis untuk jumlah chat yang bisa dikelola. Paket kami menawarkan berbagai tingkatan berdasarkan volume chat bulanan, sehingga Anda dapat memilih yang paling sesuai dengan kebutuhan bisnis Anda."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
      {/* Floating Nav */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 backdrop-blur-lg z-50 transition-all duration-300",
          isHeaderVisible 
            ? "transform translate-y-0 shadow-lg shadow-blue-900/20 border-b border-blue-900/30" 
            : "transform -translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Zenith AI
            </span>
          </Link>
          <div className="hidden md:flex space-x-8 text-gray-300">
            <button onClick={() => scrollToSection('features')} className="hover:text-blue-400 transition-colors">Fitur</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-blue-400 transition-colors">Cara Kerja</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-blue-400 transition-colors">Testimoni</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-blue-400 transition-colors">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Kontak</button>
          </div>
          <Button size="lg" variant="secondary" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20" asChild>
            <Link href="/daftar">Coba Gratis</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 pt-32">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI Chatbot untuk Mengubah Chat Jadi 
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Closing</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Zenith AI bantu Anda membalas chat WhatsApp & DM 24 jam nonstop, kumpulkan leads, dan bantu closing otomatis.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 rounded-xl text-lg px-8 shadow-lg shadow-blue-500/20" asChild>
              <Link href="/login">Coba Gratis 14 Hari <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-xl text-lg px-8 border-blue-500/50 hover:bg-blue-950/50"
              onClick={() => scrollToSection('testimonials')}
            >
              Lihat Demo
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
      <section id="features" className="py-20 scroll-mt-20">
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
              <div key={i} className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:transform hover:-translate-y-1">
                <feature.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#0f172a]/50 border-y border-blue-900/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Bagaimana Zenith AI Bekerja</h2>
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">1</div>
                  <Bot className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Training AI</h3>
                <p className="text-gray-400 mb-4">
                  AI kami dilatih dengan data bisnis Anda untuk memberikan respons yang akurat dan personal
                </p>
                <ul className="space-y-2">
                  {[
                    "Integrasi cepat dengan database produk Anda",
                    "Template respon siap pakai",
                    "Pelatihan AI khusus untuk bisnis Anda"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Training" className="rounded-xl shadow-lg shadow-blue-900/20" />
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Integration" className="rounded-xl shadow-lg shadow-blue-900/20" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">2</div>
                  <Share2 className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Integrasi Platform</h3>
                <p className="text-gray-400 mb-4">
                  Hubungkan dengan WhatsApp Business, Instagram, dan platform chat lainnya dalam hitungan menit
                </p>
                <ul className="space-y-2">
                  {[
                    "Setup cepat tanpa coding",
                    "Dukungan multi-platform",
                    "Akses dashboard terintegrasi"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">3</div>
                  <BarChart className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Pertumbuhan & Analisis</h3>
                <p className="text-gray-400 mb-4">
                  Lacak performa bisnis dan kenali peluang pertumbuhan dengan analitik real-time
                </p>
                <ul className="space-y-2">
                  {[
                    "Dashboard analitik komprehensif",
                    "Laporan konversi otomatis",
                    "Saran peningkatan berdasarkan data"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/white" alt="Analytics" className="rounded-xl shadow-lg shadow-blue-900/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Scroll */}
      <section id="testimonials" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Kisah Sukses Pengguna</h2>
          
          {/* Continuous scroll testimonials */}
          <div className="relative overflow-hidden py-4 mb-12">
            <div className="flex animate-[scroll_25s_linear_infinite] gap-6">
              {[...testimonials, ...testimonials].map((item, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 max-w-sm w-80 p-6 rounded-2xl bg-blue-950/30 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                >
                  <div className="text-blue-400 mb-4">★★★★★</div>
                  <p className="text-gray-400 mb-6">"{item.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-900 rounded-full overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-gray-400">{item.position}</div>
                      <div className="text-gray-500 text-sm">{item.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Featured case studies */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20">
              <div className="flex items-center gap-4 mb-6">
                <img src="https://placehold.co/100x100/1e293b/white" alt="Company logo" className="w-16 h-16 rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold">PT Global Retailindo</h3>
                  <p className="text-gray-400">Retail & E-commerce</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-16 text-center font-bold text-blue-400">3x</div>
                  <div className="flex-1">
                    <h4 className="font-bold">Peningkatan Konversi</h4>
                    <p className="text-gray-400 text-sm">Dari 5% menjadi 15% dalam 2 bulan</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-16 text-center font-bold text-blue-400">65%</div>
                  <div className="flex-1">
                    <h4 className="font-bold">Pengurangan Biaya CS</h4>
                    <p className="text-gray-400 text-sm">Tim CS berkurang dari 8 menjadi 3 orang</p>
                  </div>
                </div>
                <p className="text-gray-300 mt-6">
                  "Zenith AI telah mengubah cara kami berinteraksi dengan pelanggan. Kami kini bisa berfokus pada strategi bisnis besar."
                </p>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20">
              <div className="flex items-center gap-4 mb-6">
                <img src="https://placehold.co/100x100/1e293b/white" alt="Company logo" className="w-16 h-16 rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold">Karya Property Group</h3>
                  <p className="text-gray-400">Real Estate</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-16 text-center font-bold text-blue-400">24/7</div>
                  <div className="flex-1">
                    <h4 className="font-bold">Respons Pelanggan</h4>
                    <p className="text-gray-400 text-sm">Chat direspon dalam 5 detik</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-16 text-center font-bold text-blue-400">47%</div>
                  <div className="flex-1">
                    <h4 className="font-bold">Peningkatan Lead</h4>
                    <p className="text-gray-400 text-sm">Lead qualification otomatis</p>
                  </div>
                </div>
                <p className="text-gray-300 mt-6">
                  "Property adalah bisnis yang sangat bergantung pada respons cepat. Zenith AI membuat kami unggul dari kompetitor."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#0f172a]/50 border-y border-blue-900/30 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Pertanyaan yang Sering Diajukan</h2>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="mb-4 border border-blue-900/30 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <h3 className="text-xl font-medium">{item.question}</h3>
                  {activeAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 scroll-mt-20">
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
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produk</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('features')} className="block hover:text-white">Fitur</button>
                <button onClick={() => scrollToSection('how-it-works')} className="block hover:text-white">Cara Kerja</button>
                <Link href="/harga" className="block hover:text-white">Harga</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Perusahaan</h4>
              <div className="space-y-2">
                <Link href="/tentang-kami" className="block hover:text-white">Tentang Kami</Link>
                <Link href="/partnerships" className="block hover:text-white">Partnership</Link>
                <button onClick={() => scrollToSection('contact')} className="block hover:text-white">Kontak</button>
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
