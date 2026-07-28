'use client';

import { Activity, Clock, ShieldCheck, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';

const releases = [
  {
    version: 'v1.2.4 (Terbaru)',
    date: '28 Juli 2026',
    changes: [
      'Menambahkan lembar absensi kehadiran terintegrasi (Attendance Stage 4).',
      'Menambahkan alur persetujuan proposal (Approval Stage 2).',
      'Mengimplementasikan generator sertifikat masal berbasis client-side ZIP (fflate) offline.',
      'Menambahkan QR Code verification URL pada PDF sertifikat.',
      'Menambahkan tab profil & riwayat pelatihan karyawan dinamis.'
    ]
  },
  {
    version: 'v1.1.0',
    date: '10 Juli 2026',
    changes: [
      'Penyediaan modul dasar pelatihan dan program (Stage 1 Planning).',
      'Fungsi integrasi data karyawan berdasar unit kerja (Stage 3 Realization).'
    ]
  },
  {
    version: 'v1.0.0',
    date: '20 Juni 2026',
    changes: [
      'Inisialisasi arsitektur Enterprise HRIS Foundation.',
      'Dasbor analitik talenta & Direktori Karyawan (People Directory).'
    ]
  }
];

export default function ReleaseNotesPage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
          <Clock className="h-12 w-12 mx-auto text-brand-600" />
          <h1 className="text-3xl font-semibold text-foreground">Catatan Rilis (Release Notes)</h1>
          <p className="text-sm text-muted">Pelajari pembaruan fitur, perbaikan bug, dan rilis versi portal HRIS PT Indocater.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {releases.map((rel, idx) => (
            <div key={idx} className="relative pl-8 border-l border-border pb-6 last:pb-0">
              <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-brand-600 border border-card" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-foreground">{rel.version}</h3>
                  <span className="text-xs text-muted-foreground">{rel.date}</span>
                </div>
                <Card className="p-5 rounded-2xl border border-border bg-card">
                  <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground leading-relaxed">
                    {rel.changes.map((change, cIdx) => (
                      <li key={cIdx}>{change}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
