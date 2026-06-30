'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, CartesianGrid, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { ArrowRight, Briefcase, Users, BookOpen, Award, CheckCircle2, UserCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { talentKpis, candidatePipeline, hiringFunnel, trainingProgress, competencyDistribution, departmentHiringTarget } from '@/lib/talent-data';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function TalentHomePage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-900/95 px-6 py-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Talent</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-100">Talent lifecycle</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">End-to-end talent management from recruitment through career development and certification.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/talent/candidates">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Users className="h-4 w-4" /> Candidates
              </Button>
            </Link>
            <Link href="/talent/onboarding">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <UserCheck className="h-4 w-4" /> Onboarding
              </Button>
            </Link>
            <Link href="/talent/training">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <BookOpen className="h-4 w-4" /> Training
              </Button>
            </Link>
            <Link href="/talent/competency">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Award className="h-4 w-4" /> Competency
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {talentKpis.map((kpi) => (
            <Card key={kpi.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{kpi.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-100">{kpi.value}</p>
              <p className="mt-2 text-sm text-slate-400">{kpi.note}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Candidate pipeline" description="Current candidate flow by stage.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidatePipeline} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="stage" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                <Bar dataKey="count" fill="#38bdf8" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Hiring funnel" description="Applications to offers conversion (last 6 months).">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringFunnel} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                <Line type="monotone" dataKey="applied" stroke="#3b82f6" strokeWidth={2} name="Applied" />
                <Line type="monotone" dataKey="screened" stroke="#38bdf8" strokeWidth={2} name="Screened" />
                <Line type="monotone" dataKey="interviewed" stroke="#06b6d4" strokeWidth={2} name="Interviewed" />
                <Line type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} name="Hired" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Training progress" description="Enrollment and completion trends.">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trainingProgress} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="trainingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="completed" stroke="#10b981" fill="url(#trainingGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Competency levels" description="Employee skill distribution.">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={competencyDistribution} cx="50%" cy="50%" labelLine={false} label={{ fill: '#94a3b8', fontSize: 12 }} outerRadius={80} fill="#8884d8" dataKey="value">
                  {competencyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Hiring by department" description="Target vs. actual new hires.">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentHiringTarget} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                <Bar dataKey="target" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
                <Bar dataKey="actual" fill="#38bdf8" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <SectionContainer title="Talent operations" className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pipeline health</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">84 candidates</p>
              </div>
              <Users className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>• 24 new submissions</p>
              <p>• 18 screening phase</p>
              <p>• 28 qualified candidates</p>
              <p>• 14 offer stage</p>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Onboarding active</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">4 employees</p>
              </div>
              <UserCheck className="h-6 w-6 text-emerald-300" />
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>• 15 total tasks pending</p>
              <p>• 8 tasks completed</p>
              <p>• Avg: 3.2 days to completion</p>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Development focus</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">28 programs</p>
              </div>
              <BookOpen className="h-6 w-6 text-amber-300" />
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>• 31 completed this month</p>
              <p>• 30 in progress</p>
              <p>• 156 active certifications</p>
            </div>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
