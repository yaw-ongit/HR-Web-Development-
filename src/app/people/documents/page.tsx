'use client';

import Link from 'next/link';
import { FileText, FolderOpen, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { documentCenter } from '@/lib/people-data';

export default function DocumentsPage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Area People</p>
            <h1 className="text-3xl font-semibold text-foreground">Dokumen karyawan</h1>
            <p className="mt-2 text-sm text-muted">Pusat dokumen untuk kontrak karyawan, catatan kepatuhan, dan arsip HR.</p>
          </div>
          <Link href="/people" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Kembali ke direktori
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted">Pusat dokumen</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">File karyawan terbaru</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                <FolderOpen className="h-4 w-4" /> Berkas HR
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {documentCenter.map((document) => (
                <div key={document.title} className="rounded-3xl border border-border bg-card/80 p-5 transition hover:border-brand-500">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{document.title}</p>
                      <p className="mt-1 text-sm text-muted">{document.category}</p>
                    </div>
                    <span className="rounded-full bg-surface/90 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">{document.status}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
                    <p>Diperbarui {document.updated}</p>
                    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
                      <FileText className="h-4 w-4" /> Lihat berkas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center gap-3 text-muted">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.3em]">Kepatuhan</p>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
            <p>Pastikan dokumen karyawan tersusun rapi untuk onboarding, tinjauan kepatuhan, dan persiapan audit.</p>
            <p>Langkah selanjutnya: tambahkan tag, riwayat versi, alur persetujuan dokumen, dan unduhan aman.</p>
          </div>
          <div className="mt-6 rounded-3xl bg-card/80 p-4 text-sm text-muted-foreground">
            Tips: standarkan kategori dokumen agar HR dapat mencari dan mengambil berkas dengan cepat.
          </div>
        </Card>
      </div>
    </div>
  );
}
