'use client';

import { BookOpen, User, ClipboardList, Play, Award, BarChart3, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';

const guides = [
  {
    title: '1. Login Aplikasi',
    desc: 'Masukan alamat email perusahaan dan kata sandi Anda di halaman Login. Jika lupa password, hubungi tim IT.',
    icon: User
  },
  {
    title: '2. Pengelolaan Rencana Pelatihan',
    desc: 'Buat proposal proposal baru di halaman 1. Planning. Isi data judul, unit, estimasi biaya, trainer dan jadwalkan.',
    icon: ClipboardList
  },
  {
    title: '3. Persetujuan Proposal (Approval)',
    desc: 'Semua proposal masuk ke tahap 2. Approval. Hanya proposal yang disetujui (Approved) yang dapat direalisasikan.',
    icon: Play
  },
  {
    title: '4. Pelaksanaan & Daftar Peserta',
    desc: 'Kelola realisasi pelatihan di 3. Realization. Anda hanya dapat mendaftarkan karyawan yang unitnya sesuai dengan proposal.',
    icon: Play
  },
  {
    title: '5. Pencatatan Kehadiran (Attendance)',
    desc: 'Catat absensi di 4. Attendance. Hati-hati, hanya peserta yang di-set Present (Hadir) yang bisa mendapatkan sertifikat kelulusan.',
    icon: BarChart3
  },
  {
    title: '6. Penerbitan Sertifikat (Certificate)',
    desc: 'Cetak sertifikat di 7. Certificate. Masukkan tanda tangan dan masa berlaku sertifikat, lalu klik "Generate ZIP" untuk mengunduh.',
    icon: Award
  }
];

export default function UserGuidePage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-8">
          <BookOpen className="h-12 w-12 mx-auto text-brand-600" />
          <h1 className="text-3xl font-semibold text-foreground">Panduan Pengguna (User Guide)</h1>
          <p className="text-sm text-muted">Ikuti petunjuk langkah demi langkah untuk mengoperasikan portal HRIS kepegawaian PT Indocater.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {guides.map((g, idx) => {
            const Icon = g.icon;
            return (
              <Card key={idx} className="p-6 rounded-[28px] border border-border bg-card flex flex-col justify-between space-y-4 shadow-sm hover:shadow transition">
                <div className="space-y-3">
                  <div className="p-3 bg-primary/100/10 text-brand-600 rounded-2xl w-max">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{g.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </div>
  );
}
