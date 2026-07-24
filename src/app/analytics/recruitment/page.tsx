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
              <Button className="rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-500">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Analitik</p>
              <h1 className="text-3xl font-semibold text-foreground">Analitik Rekrutmen</h1>
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Total Lamaran</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">346</p>
              <p className="mt-2 text-sm text-muted">6 bulan terakhir</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Rata-rata Waktu Hire</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">29 hari</p>
              <p className="mt-2 text-sm text-emerald-600">↓ 3 hari dari bulan lalu</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Penerimaan Tawaran</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">88%</p>
              <p className="mt-2 text-sm text-primary">Kuartal ini</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Funnel Rekrutmen</p>
          <div className="space-y-3">
            {hiringFunnelData.map((stage) => (
              <div key={stage.stage} className="rounded-2xl bg-card/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{stage.stage}</p>
                  <span className="text-sm font-semibold text-primary">{stage.count} candidates • {stage.percentage.toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-surface/70 rounded-full overflow-hidden">
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
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Tren Waktu Hire</p>
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
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Tingkat Penerimaan Tawaran</p>
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
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Lowongan Saat Ini</p>
          <div className="space-y-3">
            {vacancyStatusData.map((vacancy) => (
              <div key={vacancy.position} className="rounded-2xl bg-card/80 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{vacancy.position}</p>
                    <p className="mt-1 text-xs text-muted">
                      {vacancy.applications} lamaran • Diposting {vacancy.posted}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] ${
                    vacancy.status === 'Open' ? 'bg-emerald-50 text-emerald-300' : 
                    vacancy.status === 'Sedang Berlangsung' ? 'bg-brand-50 text-primary' :
                    'bg-surface0/15 text-muted-foreground'
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
