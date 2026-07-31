'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SectionContainer } from '@/components/layout/section-container';
import { ClipboardList, ThumbsUp, Play, CheckSquare, FileCheck, BarChart3, Award } from 'lucide-react';

const steps = [
  { path: '/talent/training/planning', label: '1. Planning', desc: 'Proposal & Anggaran', icon: ClipboardList },
  { path: '/talent/training/approval', label: '2. Approval', desc: 'Persetujuan Proposal', icon: ThumbsUp },
  { path: '/talent/training/realization', label: '3. Realization', desc: 'Pelaksanaan & Peserta', icon: Play },
  { path: '/talent/training/attendance', label: '4. Attendance', desc: 'Kehadiran Peserta', icon: CheckSquare },
  { path: '/talent/training/evaluation', label: '5. Evaluation', desc: 'Penilaian & Feedback', icon: FileCheck },
  { path: '/talent/training/report', label: '6. Report', desc: 'Laporan & Matrix', icon: BarChart3 },
  { path: '/talent/training/certificate', label: '7. Certificate', desc: 'Penerbitan Sertifikat', icon: Award }
];

export default function TrainingWorkflowLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // No redirect; /talent/training will show the dashboard landing page

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
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = pathname === step.path;
            return (
              <button
                key={step.path}
                onClick={() => router.push(step.path)}
                className={`flex flex-col items-start gap-2 p-3 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'border-brand-500 bg-primary/100/5 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'border-border bg-card text-foreground hover:bg-secondary/40'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-primary/100 text-white' : 'bg-secondary text-muted'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider font-semibold opacity-90">{step.label}</p>
                  <p className="text-[9px] text-muted-foreground truncate mt-0.5">{step.desc}</p>
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
