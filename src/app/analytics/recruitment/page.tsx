'use client';

import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel } from 'recharts';
import { ArrowLeft, Briefcase, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { hiringFunnelData, timeToHireData, offerAcceptanceData, vacancyStatusData } from '@/lib/analytics-data';

export default function RecruitmentAnalyticsPage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/analytics">
              <Button className="rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Analytics</p>
              <h1 className="text-3xl font-semibold text-slate-100">Recruitment Analytics</h1>
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Applications</p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">346</p>
              <p className="mt-2 text-sm text-slate-400">Last 6 months</p>
            </div>
            <Briefcase className="h-8 w-8 text-sky-400" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Avg Time to Hire</p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">29 days</p>
              <p className="mt-2 text-sm text-emerald-400">↓ 3 days from last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Offer Acceptance</p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">88%</p>
              <p className="mt-2 text-sm text-sky-400">This quarter</p>
            </div>
            <TrendingUp className="h-8 w-8 text-sky-400" />
          </div>
        </Card>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Hiring Funnel</p>
          <div className="space-y-3">
            {hiringFunnelData.map((stage) => (
              <div key={stage.stage} className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-100">{stage.stage}</p>
                  <span className="text-sm font-semibold text-sky-400">{stage.count} candidates • {stage.percentage.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Time to Hire Trend</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeToHireData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend />
                <Line type="monotone" dataKey="days" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Offer Acceptance Rate</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={offerAcceptanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend />
                <Bar dataKey="accepted" fill="#10b981" />
                <Bar dataKey="declined" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Current Vacancies</p>
          <div className="space-y-3">
            {vacancyStatusData.map((vacancy) => (
              <div key={vacancy.position} className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-100">{vacancy.position}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {vacancy.applications} applications • Posted {vacancy.posted}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                    vacancy.status === 'Open' ? 'bg-emerald-500/15 text-emerald-300' : 
                    vacancy.status === 'In Progress' ? 'bg-sky-500/15 text-sky-300' :
                    'bg-slate-500/15 text-slate-300'
                  }`}>
                    {vacancy.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>
    </div>
  );
}
