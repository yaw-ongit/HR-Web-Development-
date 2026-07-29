'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChefHat, 
  ShieldCheck, 
  Award, 
  Phone, 
  Users, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Utensils, 
  Building, 
  Truck, 
  HeartPulse, 
  LogIn,
  Activity,
  HardHat,
  Anchor,
  Clock,
  Compass,
  FileCheck,
  Mail,
  PhoneCall
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const navigation = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang Kami', href: '#tentang' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Sertifikasi & HSE', href: '#sertifikasi' },
    { name: 'Hubungi Kami', href: '#kontak' },
  ];

  const stats = [
    { id: 1, name: 'Tahun Pengalaman', value: '45+', desc: 'Sejak 1978 melayani Indonesia', icon: Clock },
    { id: 2, name: 'Karyawan Profesional', value: '5,000+', desc: 'SDM terlatih & tersertifikasi', icon: Users },
    { id: 3, name: 'Lokasi Operasional', value: '120+', desc: 'Dari perkotaan hingga site terpencil', icon: Compass },
    { id: 4, name: 'Sertifikasi Mutu & HSE', value: '100%', desc: 'Komitmen penuh zero accident', icon: ShieldCheck },
  ];

  const services = [
    {
      name: 'Katering Industri & Remote Site',
      description: 'Layanan katering skala besar untuk pertambangan darat, perkebunan, dan konstruksi dengan standar nutrisi dan higienitas tertinggi.',
      icon: ChefHat,
      features: ['Perencanaan Menu Variatif', 'Ahli Gizi Tersertifikasi', 'Dapur Modular & Mobile'],
    },
    {
      name: 'Katering Lepas Pantai (Offshore)',
      description: 'Layanan katering dan housekeeping khusus di rig pengeboran lepas pantai dan kapal FPSO dengan kepatuhan HSE kelautan yang ketat.',
      icon: Anchor,
      features: ['Logistik Marine Container', 'Kru Bersertifikat BST', 'Kepatuhan Regulasi Kelautan'],
    },
    {
      name: 'Camp Management (Manajemen Kamp)',
      description: 'Solusi terpadu untuk pengelolaan akomodasi pekerja remote, mencakup housekeeping, laundry, kebersihan, dan fasilitas rekreasi.',
      icon: Building,
      features: ['Manajemen Kamar Real-time', 'Layanan Laundry Higienis', 'Fasilitas Rekreasi & Olahraga'],
    },
    {
      name: 'Katering Rumah Sakit & Institusi',
      description: 'Penyusunan menu diet klinis khusus pasien rumah sakit yang diawasi oleh nutritionist profesional dan diolah secara higienis.',
      icon: HeartPulse,
      features: ['Diet Khusus Pasien', 'Kontrol Kontaminasi Silang', 'Sertifikasi Higiene Sanitasi'],
    },
    {
      name: 'Rantai Pasok & Logistik Rantai Dingin',
      description: 'Jaringan distribusi bahan makanan segar yang andal menuju lokasi ekstrem dengan armada berpendingin (cold chain) berteknologi tinggi.',
      icon: Truck,
      features: ['Truk Pendingin Terkontrol', 'Gudang Suhu Ganda', 'Pelacakan Rantai Pasok'],
    },
    {
      name: 'Layanan Fasilitas Pendukung',
      description: 'Manajemen fasilitas menyeluruh meliputi pengendalian hama (pest control), penanganan limbah domestik, dan pemeliharaan utilitas site.',
      icon: HardHat,
      features: ['Pest & Vector Control', 'Manajemen Limbah Domestik', 'Pemeliharaan Utilitas & Listrik'],
    },
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'Sistem Manajemen Mutu', organization: 'Standardisasi Internasional' },
    { name: 'ISO 22000:2018', desc: 'Sistem Manajemen Keamanan Pangan', organization: 'HACCP Terintegrasi' },
    { name: 'ISO 45001:2018', desc: 'Sistem Manajemen Keselamatan & Kesehatan Kerja', organization: 'HSE Komitmen Tinggi' },
    { name: 'ISO 14001:2015', desc: 'Sistem Manajemen Lingkungan', organization: 'Ramah Lingkungan & Berkelanjutan' },
    { name: 'Sertifikasi Halal MUI', desc: 'Jaminan Produk Halal dengan Nilai A (Excellent)', organization: 'Majelis Ulama Indonesia' },
    { name: 'CSMS Gold Class', desc: 'Contractor Safety Management System', organization: 'Kualifikasi Keselamatan Kerja Tertinggi' },
  ];

  const offices = [
    {
      city: 'Kantor Pusat Jakarta',
      address: 'Gedung Indocater, Jl. Suryopranoto No. 2, Petojo Utara, Gambir, Jakarta Pusat 10130',
      phone: '+62-21-3810055',
      email: 'info@indocater.co.id',
    },
    {
      city: 'Kantor Cabang Balikpapan',
      address: 'Jl. Mulawarman No. 28, RT 23, Sepinggan, Balikpapan Selatan, Kalimantan Timur 76115',
      phone: '+62-542-764555',
      email: 'bpp-office@indocater.co.id',
    },
    {
      city: 'Kantor Cabang Timika',
      address: 'Jl. Ahmad Yani No. 8, Timika, Mimika, Papua Tengah 99910',
      phone: '+62-901-321333',
      email: 'tmk-office@indocater.co.id',
    },
  ];

  return (
    <div className="bg-[#081C3A] text-slate-100 min-h-screen font-sans scroll-smooth">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#081C3A]/90 backdrop-blur-md border-b border-white/5">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigasi Utama">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1 shadow-inner">
                <Image 
                  src="/logo-indocater.jpg" 
                  alt="Logo PT Indocater" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                  INDOCATER
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold leading-none">
                  Member of Media Group
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Login Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/10 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#081C3A]"
              >
                <LogIn className="h-4 w-4" />
                Portal HRIS
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Buka menu utama</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#081C3A] px-6 py-6 md:hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
                    <Image src="/logo-indocater.jpg" alt="Logo PT Indocater" width={32} height={32} className="object-contain" />
                  </div>
                  <span className="text-md font-extrabold tracking-wider text-amber-400">INDOCATER</span>
                </div>
                <button
                  type="button"
                  className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Tutup menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-8 space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-semibold text-slate-200 hover:bg-white/5 hover:text-amber-400 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 py-4 text-center text-md font-bold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                Masuk Portal HRIS
              </Link>
              <p className="text-center text-xs text-slate-500">
                PT Indocater HRIS Enterprise © 2026
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="beranda" className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        {/* Decorative background grid and gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.950),theme(colors.slate.950))] opacity-40" />
        <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-400">
                <Award className="h-3.5 w-3.5" />
                MITRA TERPERCAYA SEJAK 1978
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Solusi Katering & <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-100 bg-clip-text text-transparent">
                  Camp Management
                </span> <br />
                Kelas Dunia
              </h1>
              <p className="max-w-2xl text-md sm:text-lg leading-8 text-slate-300">
                Kami menyediakan katering industri skala besar, pengelolaan kamp hunian terpadu, dan logistik penunjang untuk sektor pertambangan, minyak & gas, rumah sakit, dan korporasi di seluruh pelosok Indonesia dengan jaminan kepatuhan HSE dan sertifikasi mutu tertinggi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#layanan"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-all"
                >
                  Jelajahi Layanan Kami
                </a>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01]"
                >
                  Portal HRIS Karyawan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Dashboard/Services Concept */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-[480px] overflow-hidden rounded-3xl border border-white/10 bg-[#0d274d]/40 p-6 shadow-2xl backdrop-blur-sm">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue-500/15 blur-2xl" />
                
                {/* Header-like info inside mock card */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-amber-400" />
                    <span className="text-xs uppercase font-extrabold tracking-widest text-slate-300">INDOCATER OPERATIONS</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Operations Overview items */}
                <div className="space-y-4 pt-6">
                  <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04]">
                    <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400">
                      <ChefHat className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Menu & Keamanan Pangan</h3>
                      <p className="text-xs text-slate-400 mt-1">100% Halal MUI, bersertifikat HACCP & ISO 22000 untuk jaminan higienitas prima.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04]">
                    <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                      <HardHat className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Keselamatan Kerja (HSE)</h3>
                      <p className="text-xs text-slate-400 mt-1">Sertifikasi ISO 45001 dan CSMS Gold Class untuk budaya keselamatan tanpa kompromi.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04]">
                    <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Manajemen Sumber Daya</h3>
                      <p className="text-xs text-slate-400 mt-1">Portal HRIS terpadu untuk monitoring kepatuhan lisensi, pelatihan HSE, & sertifikasi.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom link to login */}
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400">
                  <span>Akses portal staf internal</span>
                  <Link href="/login" className="flex items-center gap-1 text-amber-400 font-semibold hover:underline">
                    Login HRIS <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/5 bg-[#0b1e38]/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="relative pl-14 text-left">
                <dt className="text-sm font-medium text-slate-400">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <stat.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {stat.name}
                </dt>
                <dd className="mt-1 text-3xl font-extrabold tracking-tight text-white">{stat.value}</dd>
                <dd className="mt-1 text-xs text-slate-500 leading-normal">{stat.desc}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 lg:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Image Placeholder representing company history/heritage */}
            <div className="lg:col-span-5 order-last lg:order-first flex justify-center">
              <div className="relative w-full max-w-[400px] overflow-hidden rounded-3xl border border-white/10 bg-[#0d274d] p-8 shadow-xl text-left space-y-6">
                <div className="h-2 w-16 rounded-full bg-amber-400" />
                <h3 className="text-xl font-bold text-white">Visi Kami</h3>
                <p className="text-sm leading-7 text-slate-300">
                  &ldquo;Menjadi mitra katering dan camp management pilihan utama dengan reputasi tak tertandingi dalam kualitas makanan, kepedulian lingkungan, keselamatan kerja, serta pemberdayaan lokal.&rdquo;
                </p>
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <FileCheck className="h-4 w-4 text-amber-400" />
                    Kepatuhan Regulasi Nasional & Global
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <Users className="h-4 w-4 text-amber-400" />
                    Pemberdayaan Tenaga Kerja Lokal
                  </div>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">TENTANG PT INDOCATER</div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Lebih dari Empat Dekade Mengabdi untuk Negeri
              </h2>
              <p className="text-md leading-8 text-slate-300">
                PT Indocater didirikan pada tahun 1978 sebagai pionir penyedia jasa boga katering industri di Indonesia. Seiring berjalannya waktu, kami memperluas jangkauan layanan dengan menyediakan solusi manajemen akomodasi (camp management) dan layanan pendukung terpadu lainnya untuk industri pertambangan, minyak & gas, maritim, kesehatan, dan perkantoran komersil.
              </p>
              <p className="text-md leading-8 text-slate-300">
                Sebagai bagian dari komitmen kami, PT Indocater selalu menerapkan sistem manajemen mutu standar tinggi dan budaya K3LH (Kesehatan, Keselamatan Kerja, dan Lindung Lingkungan) yang ketat guna memastikan keselamatan seluruh pekerja dan kepuasan maksimal klien di setiap titik operasi kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-20 lg:py-28 bg-[#0b1e38]/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">LAYANAN UTAMA</div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Solusi Terintegrasi untuk Operasi Anda
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-normal">
            Kami mengelola seluruh kebutuhan katering, akomodasi, dan layanan logistik pendukung secara presisi demi memastikan kenyamanan kru Anda di lapangan.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-12 text-left">
            {services.map((service) => (
              <div 
                key={service.name} 
                className="rounded-3xl border border-white/5 bg-[#0d274d]/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/20 hover:bg-[#0d274d]/80 hover:translate-y-[-4px]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-6">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed min-h-[72px]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-white/5 pt-4" aria-label={`Fitur ${service.name}`}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & HSE Section */}
      <section id="sertifikasi" className="py-20 lg:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">STANDAR MUTU & HSE</div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Sertifikasi Nasional & Internasional
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-normal">
            Kami mengedepankan kepatuhan penuh terhadap standar mutu makanan, manajemen keselamatan kerja, dan perlindungan lingkungan di setiap unit dapur dan kamp.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-12 text-left">
            {certifications.map((cert) => (
              <div 
                key={cert.name} 
                className="rounded-2xl border border-white/5 bg-[#0b1e38]/40 p-6 transition-all hover:bg-[#0d274d]/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-white">{cert.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{cert.organization}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 lg:py-28 bg-[#0b1e38]/60 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Office Locations */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">HUBUNGI KAMI</div>
              <h2 className="text-3xl font-extrabold text-white">Jaringan Kantor Operasional Kami</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Hubungi kantor terdekat kami untuk berdiskusi tentang bagaimana kami dapat mendukung kelancaran operasional perusahaan Anda melalui layanan katering dan camp management berkualitas.
              </p>

              <div className="space-y-6 pt-6">
                {offices.map((office) => (
                  <div key={office.city} className="flex items-start gap-4">
                    <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-white">{office.city}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-normal">{office.address}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-300">
                        <span className="flex items-center gap-1">
                          <PhoneCall className="h-3 w-3 text-amber-400" />
                          {office.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-amber-400" />
                          {office.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Form Placeholder/Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[460px] rounded-3xl border border-white/5 bg-[#0d274d]/50 p-8 shadow-xl text-left space-y-6">
                <h3 className="text-lg font-bold text-white">Kirim Pesan Cepat</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor={nameId} className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">Nama Lengkap</label>
                    <input 
                      id={nameId}
                      type="text" 
                      placeholder="Masukkan nama Anda" 
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#081c3a] p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500" 
                    />
                  </div>
                  <div>
                    <label htmlFor={emailId} className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">Alamat Email</label>
                    <input 
                      id={emailId}
                      type="email" 
                      placeholder="nama@perusahaan.com" 
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#081c3a] p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500" 
                    />
                  </div>
                  <div>
                    <label htmlFor={messageId} className="block text-xs uppercase font-semibold text-slate-400 tracking-wider">Pesan</label>
                    <textarea 
                      id={messageId}
                      rows={3} 
                      placeholder="Tuliskan kebutuhan katering atau camp management Anda di sini..." 
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#081c3a] p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 resize-none" 
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full rounded-full bg-amber-500 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#06152a] border-t border-white/5 py-12 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1">
                <Image src="/logo-indocater.jpg" alt="Logo PT Indocater" width={24} height={24} className="object-contain" />
              </div>
              <div className="text-left">
                <span className="text-sm font-extrabold tracking-wider text-slate-300">PT INDOCATER</span>
                <p className="text-[9px] uppercase tracking-wider text-slate-500">CATERING & CAMP MANAGEMENT SERVICES</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
              <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
              <a href="#tentang" className="hover:text-white transition-colors">Tentang Kami</a>
              <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
              <a href="#sertifikasi" className="hover:text-white transition-colors">Sertifikasi & HSE</a>
              <Link href="/login" className="hover:text-amber-400 font-semibold transition-colors">Portal HRIS</Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p>Copyright © 2026 PT Indocater. Seluruh hak cipta dilindungi.</p>
            <p className="flex items-center gap-1.5 justify-center">
              <span>Sistem Manajemen Kepegawaian & Kepatuhan HSE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              <Link href="/login" className="hover:text-slate-300 underline">Login</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
