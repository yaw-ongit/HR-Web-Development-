'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SectionContainer } from '@/components/layout/section-container';
import { Card } from '@/components/ui/card';
import { ClipboardList, Play, FileCheck, BarChart3, Award } from 'lucide-react';

const steps = [
  { path: '/talent/training/planning', label: '1. Planning', desc: 'Proposal & Anggaran', icon: ClipboardList },
  { path: '/talent/training/realization', label: '2. Realization', desc: 'Pelaksanaan & Peserta', icon: Play },
  { path: '/talent/training/evaluation', label: '3. Evaluation', desc: 'Penilaian & Feedback', icon: FileCheck },
  { path: '/talent/training/report', label: '4. Report', desc: 'Laporan Pelatihan', icon: BarChart3 },
  { path: '/talent/training/certificate', label: '5. Certificate', desc: 'Penerbitan Sertifikat', icon: Award }
];

export default function TrainingWorkflowLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect from /talent/training root to planning stage
  if (pathname === '/talent/training') {
    router.replace('/talent/training/planning');
    return null;
  }

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Siklus Pengembangan Talenta</p>
          <h1 className="text-3xl font-semibold text-foreground">Sistem Manajemen Pelatihan</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Kelola seluruh siklus program pengembangan kompetensi karyawan secara terstruktur dan terintegrasi.
          </p>
        </div>

        {/* Workflow Tracker Header */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = pathname === step.path;
            return (
              <button
                key={step.path}
                onClick={() => router.push(step.path)}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'border-brand-500 bg-brand-500/5 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'border-border bg-card text-foreground hover:bg-secondary/40'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-brand-500 text-white' : 'bg-secondary text-muted'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider font-semibold opacity-90">{step.label}</p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">{step.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </SectionContainer>

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
