'use client';

import { useState } from 'react';
import { HelpCircle, Search, Mail, Phone, BookOpen, MessageSquare, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';

const faqs = [
  { q: 'Bagaimana cara menambahkan rencana pelatihan baru?', a: 'Masuk ke menu Pelatihan & Sertifikasi -> 1. Planning -> Klik "Proposal Baru", lalu lengkapi detail proposal pelatihan Anda.' },
  { q: 'Siapa yang berhak menyetujui proposal pelatihan?', a: 'Proposal pelatihan yang diajukan akan ditinjau oleh HRD Director atau Training Manager melalui tahap 2. Approval sebelum masuk ke realisasi.' },
  { q: 'Kenapa saya tidak bisa mencetak sertifikat peserta?', a: 'Sertifikat hanya dapat diterbitkan untuk peserta yang status kehadirannya di-set sebagai "Present (Hadir)" pada tahap 4. Attendance.' },
  { q: 'Apakah sistem ini terhubung ke Supabase?', a: 'Ya, sistem HRIS menggunakan Supabase untuk basis data utama. Namun jika koneksi internet terputus, sistem akan mengaktifkan Supabase Failsafe in-memory mode.' }
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(search.toLowerCase()) || 
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
          <HelpCircle className="h-12 w-12 mx-auto text-brand-600" />
          <h1 className="text-3xl font-semibold text-foreground">Pusat Bantuan HRIS</h1>
          <p className="text-sm text-muted">
            Temukan jawaban dari pertanyaan umum, panduan penggunaan, atau hubungi kontak dukungan teknis kami.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari solusi atau pertanyaan..."
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand-500 shadow-sm"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* FAQ Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Pertanyaan Sering Diajukan (FAQ)</h3>
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => (
                <Card key={idx} className="p-5 rounded-2xl border border-border bg-card space-y-2">
                  <strong className="text-sm text-foreground block">{faq.q}</strong>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </Card>
              ))}
              {filteredFaqs.length === 0 && (
                <p className="text-sm text-muted italic">Tidak ada FAQ yang cocok.</p>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Kontak Hubungi Kami</h3>
            <Card className="p-6 rounded-[28px] border border-border bg-card space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Hubungi HRD</span>
                  <strong className="text-xs">hr.support@indocater.co.id</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/100/10 text-brand-600 rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Telepon Support</span>
                  <strong className="text-xs">+62 21-555-1000</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">IT Helpdesk</span>
                  <strong className="text-xs">it.helpdesk@indocater.co.id</strong>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
