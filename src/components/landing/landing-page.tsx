'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, ShieldCheck, ArrowRight, Menu, X, 
  Building, LogIn, Activity, FileCheck, Mail, PhoneCall, MapPin, 
  Database, LineChart, Lock, Zap, CheckCircle2, ChevronRight, Globe
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const navigation = [
    { name: 'Tentang HRIS', href: '#tentang' },
    { name: 'Fitur Inti', href: '#fitur' },
    { name: 'Manfaat', href: '#manfaat' },
    { name: 'Layanan Unit', href: '#unit' },
    { name: 'Kontak', href: '#kontak' },
  ];

  const stats = [
    { id: 1, name: 'Karyawan Dikelola', value: '5,000+', desc: 'Data aktif & terpusat', icon: Users },
    { id: 2, name: 'Lokasi Operasional', value: '120+', desc: 'Distribusi remote site', icon: MapPin },
    { id: 3, name: 'Kepatuhan HSE', value: '100%', desc: 'Pelacakan sertifikasi', icon: ShieldCheck },
    { id: 4, name: 'Uptime Sistem', value: '99.9%', desc: 'Infrastruktur enterprise', icon: Zap },
  ];

  const coreFeatures = [
    {
      name: 'Manajemen Data Pegawai',
      description: 'Sentralisasi data profil, dokumen, dan riwayat karir untuk seluruh karyawan dari kantor pusat hingga remote site.',
      icon: Database,
    },
    {
      name: 'Pelacakan Sertifikasi HSE',
      description: 'Pemantauan masa berlaku lisensi, sertifikat BST, dan pelatihan keselamatan secara real-time untuk kepatuhan operasional.',
      icon: ShieldCheck,
    },
    {
      name: 'Analitik & Pelaporan',
      description: 'Dashboard komprehensif untuk memantau KPI demografi, produktivitas, dan absensi dengan visualisasi interaktif.',
      icon: LineChart,
    },
    {
      name: 'Manajemen Kehadiran & Shift',
      description: 'Sistem pengaturan jadwal roster kompleks dan rotasi shift untuk operasional katering industri dan lepas pantai.',
      icon: Activity,
    },
  ];

  const benefits = [
    'Akses terpadu dari berbagai perangkat untuk administrasi cepat.',
    'Peringatan otomatis untuk sertifikasi yang akan kedaluwarsa.',
    'Keamanan tingkat tinggi dengan enkripsi data dan kontrol akses berbasis peran (RBAC).',
    'Integrasi mulus dengan modul penggajian dan kompensasi.',
    'Dukungan penuh untuk skala ribuan pengguna aktif serentak.',
  ];

  const values = [
    { name: 'Safety First', desc: 'Prioritas utama pada keselamatan kerja dan lingkungan.' },
    { name: 'Operational Excellence', desc: 'Standar tinggi dalam pelayanan dan pengelolaan operasi.' },
    { name: 'Continuous Improvement', desc: 'Inovasi berkelanjutan dalam teknologi dan kapabilitas SDM.' },
  ];

  const certifications = [
    'ISO 9001:2015 - Sistem Manajemen Mutu',
    'ISO 22000:2018 - Manajemen Keamanan Pangan',
    'ISO 45001:2018 - Kesehatan & Keselamatan Kerja',
    'CSMS Gold Class Certification',
  ];

  return (
    <div className="bg-[#081C3A] text-slate-100 min-h-screen font-sans scroll-smooth">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#081C3A]/90 backdrop-blur-md border-b border-white/5 shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigasi Utama">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1 shadow-inner">
                <Image src="/logo-indocater.jpg" alt="Logo PT Indocater" width={40} height={40} className="object-contain" priority />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                  INDOCATER
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold leading-none">
                  Enterprise HRIS
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
                  {item.name}
                </a>
              ))}
            </div>

            {/* Login Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#081C3A]"
              >
                <LogIn className="h-4 w-4" />
                Login Portal
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button type="button" className="rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
                <span className="sr-only">Buka menu</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#081C3A] px-6 py-6 md:hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
                  <Image src="/logo-indocater.jpg" alt="Logo PT Indocater" width={32} height={32} className="object-contain" />
                </div>
                <span className="text-md font-extrabold tracking-wider text-amber-400">HRIS PORTAL</span>
              </div>
              <button type="button" className="rounded-xl p-2 text-slate-400 hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Tutup menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 flex flex-col space-y-4">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-200 hover:text-amber-400">
                  {item.name}
                </a>
              ))}
              <div className="pt-8 border-t border-white/5">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-center text-sm font-bold text-slate-950 hover:bg-amber-400">
                  <LogIn className="h-5 w-5" />
                  Masuk Sistem
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.blue.900/30),transparent_70%)]" />
        <div className="absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[100px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-400 mb-8">
            <Lock className="h-3.5 w-3.5" />
            SECURE ENTERPRISE PLATFORM
          </div>
          
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.1]">
            Transformasi Digital <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              Manajemen SDM & HSE
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Platform HRIS resmi PT Indocater yang dirancang khusus untuk mengelola operasional tenaga kerja, kepatuhan keselamatan, dan administrasi karyawan skala industri dengan presisi tinggi.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-sm font-bold text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20 transition-transform hover:-translate-y-1"
            >
              Login ke Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#fitur"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              Pelajari Fitur
            </a>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-white/5 bg-[#0b1e38]/80 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4 divide-x divide-white/5">
            {stats.map((stat, idx) => (
              <div key={stat.id} className={`text-center ${idx === 0 ? '' : 'pl-6'}`}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mb-4">
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <dd className="text-3xl font-extrabold tracking-tight text-white">{stat.value}</dd>
                <dt className="mt-1 text-sm font-semibold text-slate-300">{stat.name}</dt>
                <p className="mt-1 text-xs text-slate-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HRIS Platform Intro & Company Overview */}
      <section id="tentang" className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400">TENTANG PLATFORM</div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Sistem Terpusat untuk Operasi Skala Besar
              </h2>
              <p className="text-base leading-7 text-slate-300">
                PT Indocater Enterprise HRIS adalah fondasi digital yang menggerakkan lebih dari 5.000 karyawan di seluruh Indonesia. Dari katering remote site hingga manajemen fasilitas lepas pantai, sistem kami memastikan setiap tenaga kerja terpantau, terlatih, dan terpenuhi haknya secara akurat.
              </p>
              <div className="pt-6 border-t border-white/5 grid gap-4">
                {values.map((val) => (
                  <div key={val.name} className="flex gap-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{val.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative rounded-3xl border border-white/10 bg-[#0d274d] p-8 shadow-2xl">
              <div className="absolute -top-12 -right-12 h-32 w-32 bg-amber-500/20 blur-[60px] rounded-full" />
              <h3 className="text-xl font-bold text-white mb-6">Mengapa HRIS Kami Berbeda?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400"><Globe className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-sm text-white">Desain Berbasis Industri (Industry-Specific)</strong>
                    <span className="text-sm text-slate-400">Dibangun khusus untuk tantangan logistik dan penjadwalan katering industri jarak jauh.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400"><ShieldCheck className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-sm text-white">Kepatuhan HSE Terintegrasi</strong>
                    <span className="text-sm text-slate-400">Bukan sekadar HR, namun juga platform pelacakan keselamatan (CSMS & ISO).</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="fitur" className="py-24 bg-[#0b1e38]/50 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Modul Fitur Utama</h2>
            <p className="mt-4 text-slate-400">Kemampuan komprehensif untuk mendukung tata kelola sumber daya manusia berstandar enterprise.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feat) => (
              <div key={feat.name} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors">
                <feat.icon className="h-8 w-8 text-amber-400 mb-5" />
                <h3 className="text-base font-bold text-white mb-2">{feat.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Standards */}
      <section id="manfaat" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-8">Manfaat Bagi Operasional</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <ChevronRight className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="text-sm text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0b1e38]/80 rounded-3xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2">Standar & Sertifikasi</h2>
              <p className="text-sm text-slate-400 mb-8">Sistem dirancang untuk menunjang audit dan pelaporan sesuai standar baku mutu internasional.</p>
              
              <div className="grid gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#081C3A] p-4 rounded-xl border border-white/5">
                    <FileCheck className="h-6 w-6 text-emerald-400" />
                    <span className="text-sm font-semibold text-slate-200">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Units Supported */}
      <section id="unit" className="py-24 bg-[#0b1e38]/50 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-12">Mendukung Seluruh Unit Bisnis</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6">
              <Building className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Industrial Catering</h3>
              <p className="text-sm text-slate-400">Pengelolaan kru dapur dan ahli gizi untuk site pertambangan.</p>
            </div>
            <div className="p-6">
              <ShieldCheck className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Offshore Services</h3>
              <p className="text-sm text-slate-400">Pelacakan lisensi kelautan (BST, HUET) secara real-time.</p>
            </div>
            <div className="p-6">
              <Users className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Camp Management</h3>
              <p className="text-sm text-slate-400">Penjadwalan rotasi pekerja fasilitas akomodasi remote.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#0d274d] to-[#081c3a] border border-white/10 p-8 lg:p-16 text-center">
            <h2 className="text-3xl font-extrabold text-white">Butuh Bantuan Akses?</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto mb-10">
              Jika Anda mengalami kendala login, otorisasi peran, atau membutuhkan panduan sistem, silakan hubungi IT Helpdesk PT Indocater.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:it.support@indocater.co.id" className="flex items-center gap-3 text-slate-200 hover:text-amber-400">
                <div className="p-3 bg-white/5 rounded-full"><Mail className="h-5 w-5" /></div>
                <span className="font-semibold">it.support@indocater.co.id</span>
              </a>
              <a href="tel:+62213810055" className="flex items-center gap-3 text-slate-200 hover:text-amber-400">
                <div className="p-3 bg-white/5 rounded-full"><PhoneCall className="h-5 w-5" /></div>
                <span className="font-semibold">+62-21-3810055 (Ext. 202)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051124] border-t border-white/5 py-12 text-center text-slate-500 text-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1">
              <Image src="/logo-indocater.jpg" alt="Logo PT Indocater" width={32} height={32} className="object-contain" />
            </div>
          </div>
          <p className="font-bold text-slate-300 tracking-widest uppercase text-xs mb-2">PT INDOCATER</p>
          <p className="mb-6 text-xs">Sistem Informasi SDM Terpadu (HRIS)</p>
          <p>© {new Date().getFullYear()} PT Indocater. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
