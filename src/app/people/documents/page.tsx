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
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">People workspace</p>
            <h1 className="text-3xl font-semibold text-slate-100">Employee documents</h1>
            <p className="mt-2 text-sm text-slate-400">Central document center for employee contracts, compliance records, and HR files.</p>
          </div>
          <Link href="/people" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400">
            Back to directory
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Document center</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">Latest employee files</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              <FolderOpen className="h-4 w-4" /> HR files
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {documentCenter.map((document) => (
              <div key={document.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition hover:border-sky-400">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{document.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{document.category}</p>
                  </div>
                  <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">{document.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
                  <p>Updated {document.updated}</p>
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400">
                    <FileText className="h-4 w-4" /> View file
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-center gap-3 text-slate-400">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.3em]">Compliance</p>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400">
            <p>Keep employee documents organized for onboarding, compliance reviews and audit readiness.</p>
            <p>Next phase: add tags, version history, document approval workflow, and secure downloads.</p>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-300">
            Tip: standardize document categories so HR can search and retrieve records faster.
          </div>
        </Card>
      </div>
    </div>
  );
}
