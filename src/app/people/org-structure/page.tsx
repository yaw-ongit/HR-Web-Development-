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
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">People workspace</p>
            <h1 className="text-3xl font-semibold text-slate-100">Organization structure</h1>
            <p className="mt-2 text-sm text-slate-400">Explore the current team hierarchy and people relationships for HR and management.</p>
          </div>
          <Link href="/people" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400">
            <ArrowRight className="h-4 w-4 rotate-180" /> Back to directory
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Team overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">People Ops leadership map</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              <Layers className="h-4 w-4" /> Org chart
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm text-slate-400">Leader</p>
              <div className="mt-6 flex items-center gap-4 rounded-3xl bg-slate-900/90 p-5">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-sky-500/15 text-sky-300 text-xl font-semibold">{orgStructure.leader.split(' ').map((part) => part[0]).join('')}</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{orgStructure.title}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-100">{orgStructure.leader}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Core team</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {orgStructure.team.map((member) => (
                  <div key={member.name} className="rounded-3xl border border-white/5 bg-slate-900/90 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{member.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{member.role}</p>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-3xl bg-slate-950/80 text-slate-100">{member.name.split(' ').map((part) => part[0]).join('')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-center gap-3 text-slate-400">
            <Users className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.3em]">People operations</p>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400">
            <p>Use this view to understand reporting lines, team structure, and collaboration pathways that matter for talent planning.</p>
            <p>Next step: add employee profiles, span of control metrics, and people analytics once the People module expands.</p>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-300">
            Tip: keep the org model updated with role changes and new hires to drive faster workforce decisions.
          </div>
        </Card>
      </div>
    </div>
  );
}
