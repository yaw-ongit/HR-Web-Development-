import Link from 'next/link';
import { ArrowRight, Layers, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { orgStructure } from '@/lib/people-data';

export default function OrgStructurePage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Area People</p>
            <h1 className="text-3xl font-semibold text-foreground">Struktur organisasi</h1>
            <p className="mt-2 text-sm text-muted">Pelajari hierarki tim saat ini dan hubungan karyawan untuk HR dan manajemen.</p>
          </div>
          <Link href="/people" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            <ArrowRight className="h-4 w-4 rotate-180" /> Kembali ke direktori
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Gambaran tim</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Peta kepemimpinan People Ops</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <Layers className="h-4 w-4" /> Struktur Organisasi
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div className="rounded-[28px] border border-border bg-card/80 p-6">
              <p className="text-sm text-muted">Pimpinan</p>
              <div className="mt-6 flex items-center gap-4 rounded-3xl bg-surface/90 p-5">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-brand-50 text-primary text-xl font-semibold">{orgStructure.leader.split(' ').map((part) => part[0]).join('')}</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-muted">{orgStructure.title}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{orgStructure.leader}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-card/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Tim Inti</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {orgStructure.team.map((member) => (
                  <div key={member.name} className="rounded-3xl border border-border/60 bg-surface/90 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <p className="mt-1 text-sm text-muted">{member.role}</p>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-3xl bg-card/80 text-foreground">{member.name.split(' ').map((part) => part[0]).join('')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center gap-3 text-muted">
            <Users className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.3em]">Operasi People</p>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
            <p>Gunakan tampilan ini untuk memahami garis pelaporan, struktur tim, dan jalur kolaborasi yang penting bagi perencanaan talenta.</p>
            <p>Langkah berikutnya: tambahkan profil karyawan, metrik span of control, dan analitik people ketika modul People berkembang.</p>
          </div>
          <div className="mt-6 rounded-3xl bg-card/80 p-4 text-sm text-muted-foreground">
            Tips: jaga model organisasi tetap terbarui dengan perubahan peran dan karyawan baru agar pengambilan keputusan lebih cepat.
          </div>
        </Card>
      </div>
    </div>
  );
}
