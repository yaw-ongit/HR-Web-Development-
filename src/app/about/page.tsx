'use client';

import { Info, Cpu, Code, Building, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';

export default function AboutSystemPage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
          <Info className="h-12 w-12 mx-auto text-brand-600" />
          <h1 className="text-3xl font-semibold text-foreground">Tentang Sistem</h1>
          <p className="text-sm text-muted">Informasi teknis dan spesifikasi sistem portal kepegawaian PT Indocater.</p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Version details */}
          <Card className="rounded-[28px] border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" /> Detail Sistem & Rilis
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><strong>Nama Aplikasi:</strong> Enterprise HRIS Foundation</div>
              <div><strong>Instansi / Perusahaan:</strong> PT Indocater Sejahtera Abadi</div>
              <div><strong>Versi Aplikasi:</strong> v1.2.4-stable</div>
              <div><strong>Build Number:</strong> #2026.07.28.001</div>
              <div><strong>Tanggal Deployment:</strong> 28 Juli 2026</div>
              <div><strong>Lisensi:</strong> Proprietary (Internal PT Indocater)</div>
            </div>
          </Card>

          {/* Tech stack details */}
          <Card className="rounded-[28px] border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" /> Arsitektur Teknologi
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><strong>Frontend Framework:</strong> Next.js 15 (React 19, App Router)</div>
              <div><strong>Database Layer:</strong> Supabase client (PostgreSQL, RLS Enabled)</div>
              <div><strong>Styling Engine:</strong> Tailwind CSS & CSS Variables</div>
              <div><strong>Utility Components:</strong> Lucide Icons & jsPDF + fflate (offline ZIP)</div>
              <div><strong>Failsafe Mode:</strong> Automatic Supabase Offline In-Memory Fallback</div>
            </div>
          </Card>

          {/* Developer Details */}
          <Card className="md:col-span-2 rounded-[28px] border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> Tim Pengembang & Dukungan
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Portal Kepegawaian PT Indocater dirancang, dikembangkan, dan dipelihara sepenuhnya oleh **HRIS Internal IT Division**. Untuk kendala sistem, permohonan hak akses baru, dan saran pengembangan fitur, silakan hubungi tim IT Helpdesk melalui Help Center.
            </p>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
