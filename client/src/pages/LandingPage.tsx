
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Users, BarChart, Clock, Shield, Zap, Database, Share2, Bot, Check, ChevronDown, ChevronUp, ArrowUpRight, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [navBackground, setNavBackground] = useState(false);
  const prevScrollY = useRef(0);
  const demoRef = useRef<HTMLDivElement>(null);

  // For header visibility and background control based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Set background style when scrolled past 100px
      setNavBackground(currentScrollY > 100);
      
      // Hide header when scrolling down, show when scrolling up, but only after 100px
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

  // Enhanced smooth scroll function with offset for floating header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 100; // Offset for the floating header
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Enhanced smooth scroll to demo section
  const scrollToDemo = () => {
    if (demoRef.current) {
      const headerOffset = 100;
      const elementPosition = demoRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Create a smoother scroll effect with subtle animation
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // ms
      let start: number | null = null;
      
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        
        // Easing function for smoother animation
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        window.scrollTo({
          top: startPosition + distance * easeInOutCubic(percent),
          behavior: 'auto' // We're manually handling the smoothness
        });
        
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
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
      {/* Premium Floating Nav */}
      <nav 
        className={cn(
          "floating-nav transition-all duration-500",
          isHeaderVisible ? "translate-y-0" : "-translate-y-24",
          navBackground ? "scrolled" : ""
        )}
      >
        <div className="flex items-center justify-between h-14">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center animate-pulse-subtle">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Zenith AI
              </span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {[
              { name: 'Fitur', id: 'features' },
              { name: 'Cara Kerja', id: 'how-it-works' },
              { name: 'Testimoni', id: 'testimonials' },
              { name: 'FAQ', id: 'faq' },
              { name: 'Kontak', id: 'contact' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="px-4 py-1.5 text-sm text-gray-300 hover:text-white rounded-full transition-all duration-300 hover:bg-blue-800/30"
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/50 rounded-full px-4"
              asChild
            >
              <Link href="/login">Masuk</Link>
            </Button>
            <Button 
              className="premium-button text-white text-sm px-5 py-5 h-9"
              asChild
            >
              <Link href="/daftar">
                Coba Gratis <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with enhanced animations */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Dynamic decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-[20%] w-64 h-64 rounded-full bg-blue-600/20 blur-[100px] animate-pulse-scale"></div>
          <div className="absolute bottom-20 right-[20%] w-96 h-96 rounded-full bg-blue-400/20 blur-[120px] animate-float-slow"></div>
          <div className="absolute top-1/3 right-[15%] w-48 h-48 rounded-full bg-indigo-500/20 blur-[80px] animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-[15%] w-56 h-56 rounded-full bg-sky-500/20 blur-[90px] animate-float-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {Array.from({length: 8}).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-300 animate-float-rotate" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-block mb-4 animate-float-rotate">
            <div className="px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sm text-blue-300 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-scale"></span>
              <span className="animate-fade-in-scale" style={{animationDelay: '0.1s'}}>Teknologi AI Generasi Terbaru</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="inline-block animate-fade-in-left" style={{animationDelay: '0.2s'}}>AI Chatbot untuk</span><br/>
            <span className="inline-block animate-fade-in-right" style={{animationDelay: '0.4s'}}>Mengubah Chat Jadi</span>
            <div className="inline-block relative animate-fade-in-scale" style={{animationDelay: '0.6s'}}>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent relative z-10 animate-glow-intense"> Closing</span>
              <div className="absolute -bottom-2 left-1 right-1 h-1 bg-gradient-to-r from-blue-400/40 to-blue-600/40 blur-sm animate-pulse-scale"></div>
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in" style={{animationDelay: '0.7s'}}>
            Zenith AI bantu Anda membalas chat WhatsApp & DM <span className="text-blue-300 inline-block animate-pulse-subtle">24 jam nonstop</span>, 
            kumpulkan leads, dan bantu closing otomatis.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="premium-button h-14 text-lg px-8 font-medium animate-fade-in-scale" 
              style={{animationDelay: '0.9s'}}
              asChild
            >
              <Link href="/login">
                Coba Gratis 14 Hari 
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 rounded-full text-lg px-8 border-blue-500/30 hover:border-blue-400/60 bg-blue-950/30 hover:bg-blue-900/40 text-gray-200 backdrop-blur-sm animate-fade-in-scale"
              style={{animationDelay: '1.1s'}}
              onClick={scrollToDemo}
            >
              Lihat Demo
            </Button>
          </div>
          
          <div className="mt-16">
            <p className="text-sm text-gray-400 mb-3 animate-fade-in" style={{animationDelay: '1.3s'}}>Dipercaya oleh brand ternama</p>
            <div className="flex justify-center items-center gap-8 opacity-70">
              {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'].map((brand, i) => (
                <div 
                  key={i} 
                  className="text-gray-500 font-semibold text-sm animate-fade-in-scale" 
                  style={{animationDelay: `${1.4 + i * 0.1}s`}}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced decorative particle mesh at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-blue-900/20 bg-gradient-to-b from-[#0c1525] to-[#0f172a]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$2M+", label: "Total Transaksi", icon: BarChart },
              { value: "10.000+", label: "Leads Terkumpul", icon: Users },
              { value: "250+", label: "Bisnis Aktif", icon: MessageSquare },
              { value: "50+", label: "Mitra Integrator", icon: Share2 }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="premium-card p-8 animate-fade-in"
                style={{animationDelay: `${0.1 * i}s`}}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                    <stat.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-3">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with enhanced animations */}
      <section id="features" className="py-24 scroll-mt-24 relative">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] animate-pulse-scale"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-400/10 blur-[100px] animate-float-slow"></div>
          <div className="absolute top-1/2 left-[10%] w-40 h-40 rounded-full bg-indigo-500/10 blur-[80px] animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Animated decorative line */}
        <div className="absolute left-0 right-0 top-16 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse-subtle"></div>
      
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center max-w-2xl mx-auto mb-20 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sm text-blue-300 mb-4 animate-float">
              <span className="animate-fade-in-scale" style={{animationDelay: '0.1s'}}>Fitur Premium</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
              Fitur Lengkap untuk Otomatisasi Bisnis
            </h2>
            <p className="text-gray-400 text-lg animate-fade-in" style={{animationDelay: '0.3s'}}>
              Solusi all-in-one yang mengubah cara bisnis Anda berinteraksi dengan pelanggan
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Respon Otomatis 24/7",
                desc: "Balas chat WhatsApp & Instagram DM secara instan dengan AI yang mengerti konteks bisnis Anda",
                animation: "animate-fade-in-left"
              },
              {
                icon: Database,
                title: "CRM Terintegrasi",
                desc: "Simpan dan kelola semua histori chat dalam satu dashboard yang mudah diakses",
                animation: "animate-fade-in-scale"
              },
              {
                icon: Zap,
                title: "Follow-up Otomatis",
                desc: "AI yang proaktif menindaklanjuti leads dan membantu proses closing",
                animation: "animate-fade-in-right"
              },
              {
                icon: Share2,
                title: "Integrasi Multi-Platform",
                desc: "Hubungkan dengan tools bisnis favorit Anda: Notion, Sheets, dan lainnya",
                animation: "animate-fade-in-left"
              },
              {
                icon: Shield,
                title: "Keamanan Data",
                desc: "Data pelanggan Anda aman dengan enkripsi end-to-end",
                animation: "animate-fade-in-scale"
              },
              {
                icon: BarChart,
                title: "Analisis Performa",
                desc: "Pantau metrics penting: response time dan conversion rate",
                animation: "animate-fade-in-right"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`premium-card group p-8 ${feature.animation}`}
                style={{animationDelay: `${0.3 + 0.15 * i}s`}}
              >
                <div className="relative z-10">
                  <div 
                    className={`w-14 h-14 rounded-full bg-gradient-to-br from-blue-800/50 to-blue-600/50 flex items-center justify-center mb-6 border border-blue-500/30 ${i % 2 === 0 ? 'animate-pulse-subtle' : 'animate-glow'}`}
                    style={{animationDelay: `${0.2 * i}s`}}
                  >
                    <feature.icon className="w-7 h-7 text-blue-300 animate-fade-in-scale" style={{animationDelay: `${0.4 + 0.15 * i}s`}} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                  
                  {/* Subtle animated indicator */}
                  <div className="w-8 h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-6 group-hover:w-full transition-all duration-700"></div>
                </div>
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

      {/* Testimonials Section with Enhanced Scroll */}
      <section id="testimonials" className="py-24 scroll-mt-24" ref={demoRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center max-w-2xl mx-auto mb-20 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sm text-blue-300 mb-4 animate-float-rotate">
              <span className="animate-fade-in-scale" style={{animationDelay: '0.1s'}}>Hasil Nyata</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
              Kisah Sukses Pengguna
            </h2>
            <p className="text-gray-400 text-lg animate-fade-in" style={{animationDelay: '0.3s'}}>
              Lihat bagaimana Zenith AI membantu puluhan bisnis meningkatkan konversi dan efisiensi
            </p>
          </div>
          
          {/* Enhanced continuous scroll testimonials with premium styling */}
          <div className="relative overflow-hidden py-8 mb-16 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-[#020617] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-[#020617] after:to-transparent">
            <div className="flex animate-[scroll_30s_linear_infinite] gap-6 hover:pause">
              {[...testimonials, ...testimonials].map((item, i) => {
                // Create varied animations for each card
                const isOdd = i % 2 === 0;
                const isThird = i % 3 === 0;
                
                return (
                  <div 
                    key={i} 
                    className={`flex-shrink-0 max-w-sm w-80 p-6 premium-card ${isOdd ? 'hover:translate-y-2' : 'hover:-translate-y-2'}`}
                    style={{
                      animationDelay: `${0.2 * i}s`,
                      transform: `translateY(${isOdd ? -5 : isThird ? 5 : 0}px)`
                    }}
                  >
                    <div className="relative z-10">
                      <div className="text-yellow-300 mb-4 flex">
                        {[...Array(5)].map((_, idx) => (
                          <svg 
                            key={idx} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${idx === 0 ? 'animate-pulse-scale' : ''}`}
                            style={{animationDelay: `${0.2 * idx}s`}}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-200 mb-6 italic relative">
                        <span className="absolute -left-2 -top-2 text-4xl text-blue-500/20">"</span>
                        {item.text}
                        <span className="absolute -right-2 bottom-0 text-4xl text-blue-500/20">"</span>
                      </p>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-blue-800 to-blue-500 rounded-full overflow-hidden p-0.5 ${isOdd ? 'animate-pulse-subtle' : 'animate-glow'}`}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-blue-300">{item.position}</div>
                          <div className="text-gray-400 text-sm">{item.company}</div>
                        </div>
                      </div>
                      
                      {/* Animated accent line */}
                      <div className="w-0 group-hover:w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent mt-4 transition-all duration-1000"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Featured case studies with premium design */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="premium-card p-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 p-0.5 shadow-lg shadow-blue-900/50">
                    <img src="https://placehold.co/100x100/1e293b/white" alt="Company logo" className="w-full h-full rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">PT Global Retailindo</h3>
                    <p className="text-blue-300">Retail & E-commerce</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 text-center font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">3x</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg">Peningkatan Konversi</h4>
                      <p className="text-gray-300 text-sm">Dari 5% menjadi 15% dalam 2 bulan</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="w-16 text-center font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">65%</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg">Pengurangan Biaya CS</h4>
                      <p className="text-gray-300 text-sm">Tim CS berkurang dari 8 menjadi 3 orang</p>
                    </div>
                  </div>
                  <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-500/20 mt-6">
                    <p className="text-gray-200 italic">
                      "Zenith AI telah mengubah cara kami berinteraksi dengan pelanggan. Kami kini bisa berfokus pada strategi bisnis besar."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="premium-card p-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 p-0.5 shadow-lg shadow-blue-900/50">
                    <img src="https://placehold.co/100x100/1e293b/white" alt="Company logo" className="w-full h-full rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Karya Property Group</h3>
                    <p className="text-blue-300">Real Estate</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 text-center font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">24/7</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg">Respons Pelanggan</h4>
                      <p className="text-gray-300 text-sm">Chat direspon dalam 5 detik</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="w-16 text-center font-bold text-3xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">47%</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg">Peningkatan Lead</h4>
                      <p className="text-gray-300 text-sm">Lead qualification otomatis</p>
                    </div>
                  </div>
                  <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-500/20 mt-6">
                    <p className="text-gray-200 italic">
                      "Property adalah bisnis yang sangat bergantung pada respons cepat. Zenith AI membuat kami unggul dari kompetitor."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video or Interactive Demo */}
          <div className="mt-20 max-w-4xl mx-auto premium-card p-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-center">Lihat Zenith AI dalam Aksi</h3>
              <div className="rounded-xl bg-blue-950/50 h-80 flex items-center justify-center border border-blue-500/30 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600/80 flex items-center justify-center animate-pulse-subtle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <img src="https://placehold.co/800x400/1e293b/white" alt="Demo preview" className="w-full h-full object-cover opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section with Enhanced Animations */}
      <section id="faq" className="py-24 bg-gradient-to-b from-[#0c1525] to-[#0f172a] border-y border-blue-900/20 scroll-mt-24 relative">
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse-subtle"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse-subtle"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-600/5 blur-[120px] animate-float-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/5 blur-[120px] animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center max-w-2xl mx-auto mb-20 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sm text-blue-300 mb-4 animate-float">
              <span className="animate-fade-in-scale" style={{animationDelay: '0.1s'}}>FAQ</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in" style={{animationDelay: '0.2s'}}>
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-400 text-lg animate-fade-in" style={{animationDelay: '0.3s'}}>
              Jawaban untuk pertanyaan umum tentang Zenith AI
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`mb-5 border border-blue-900/20 rounded-xl overflow-hidden glass-effect ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}
                style={{animationDelay: `${0.3 + 0.1 * index}s`}}
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none transition-all duration-300 hover:bg-blue-900/10 group"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <h3 className="text-xl font-medium text-white group-hover:text-blue-300 transition-colors">{item.question}</h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-900/50 border border-blue-500/30 transition-all duration-500 ${
                    activeAccordion === index ? 'rotate-180 bg-blue-700/50 border-blue-400/50' : ''
                  } group-hover:animate-pulse-subtle`}>
                    <ChevronDown className="w-5 h-5 text-blue-300" />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-6 animate-pulse-subtle"></div>
                    <p className="text-gray-300 leading-relaxed animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
                      {item.answer}
                    </p>
                    
                    {/* Animated decorative element */}
                    <div className="h-1 w-16 bg-gradient-to-r from-blue-500/30 to-transparent rounded-full mt-6 animate-pulse-subtle"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Enhanced Animations */}
      <section id="contact" className="py-32 scroll-mt-24 relative">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0c1525]"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-[#020617]"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px] opacity-70 animate-pulse-scale"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-[150px] opacity-70 animate-float-slow"></div>
          <div className="absolute top-2/3 left-2/3 w-48 h-48 rounded-full bg-indigo-400/10 blur-[80px] opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {Array.from({length: 12}).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-300 animate-float-rotate" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="premium-card max-w-4xl mx-auto p-12 animate-fade-in-scale" style={{animationDelay: '0.1s'}}>
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900/80 border border-blue-500/30 text-sm text-blue-300 mb-6 animate-float">
                <span className="inline-block animate-fade-in-scale" style={{animationDelay: '0.3s'}}>Mulai Sekarang</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent animate-fade-in" style={{animationDelay: '0.4s'}}>
                Siap Meningkatkan Performa Bisnis Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
                Mulai <span className="text-blue-300 animate-pulse-subtle">gratis 14 hari</span>. Tanpa kartu kredit.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Button 
                  size="lg" 
                  className="premium-button h-14 text-lg px-10 font-medium w-full md:w-auto animate-fade-in-scale" 
                  style={{animationDelay: '0.6s'}}
                  asChild
                >
                  <Link href="/daftar">
                    Mulai Sekarang 
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <div className="flex items-center gap-4 text-gray-400 animate-fade-in-right" style={{animationDelay: '0.7s'}}>
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center animate-pulse-subtle">
                    <Shield className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="text-left">
                    <span className="text-gray-300">100% Aman & Terjamin</span>
                    <div className="text-sm">Dukungan 24/7</div>
                  </div>
                </div>
              </div>
              
              {/* Added decorative elements */}
              <div className="mt-10 pt-6 border-t border-blue-500/10 flex justify-center animate-fade-in" style={{animationDelay: '0.8s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-scale"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-scale" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-scale" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/20 py-16 bg-[#0c1525]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-gray-400">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                  Zenith AI
                </span>
              </div>
              <p className="text-gray-400 mb-6">AI Chatbot CRM untuk UMKM Indonesia yang ingin meningkatkan konversi penjualan.</p>
              <div className="flex space-x-4 mt-4">
                {['facebook', 'instagram', 'twitter', 'linkedin'].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-gray-400 hover:text-blue-300 hover:border-blue-500/40 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Produk</h4>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('features')} className="block hover:text-blue-300 transition-colors">Fitur</button>
                <button onClick={() => scrollToSection('how-it-works')} className="block hover:text-blue-300 transition-colors">Cara Kerja</button>
                <Link href="/harga" className="block hover:text-blue-300 transition-colors">Harga</Link>
                <Link href="/integrasi" className="block hover:text-blue-300 transition-colors">Integrasi</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Perusahaan</h4>
              <div className="space-y-3">
                <Link href="/tentang-kami" className="block hover:text-blue-300 transition-colors">Tentang Kami</Link>
                <Link href="/partnerships" className="block hover:text-blue-300 transition-colors">Partnership</Link>
                <Link href="/career" className="block hover:text-blue-300 transition-colors">Karir</Link>
                <button onClick={() => scrollToSection('contact')} className="block hover:text-blue-300 transition-colors">Kontak</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <div className="space-y-3">
                <Link href="/kebijakan-privasi" className="block hover:text-blue-300 transition-colors">Kebijakan Privasi</Link>
                <Link href="/syarat-ketentuan" className="block hover:text-blue-300 transition-colors">Syarat & Ketentuan</Link>
                <Link href="/keamanan" className="block hover:text-blue-300 transition-colors">Keamanan</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-blue-900/20 flex flex-col md:flex-row justify-between items-center text-gray-500">
            <div>© 2024 Zenith AI. Hak Cipta Dilindungi.</div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>in Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
