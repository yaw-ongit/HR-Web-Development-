'use client';

import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Award, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { mandatoryTrainingData, expiredCertificatesData, competencyMatrixData, trainingCompletionData } from '@/lib/analytics-data';

const COLORS = ['#0ea5e9', '#10b981', '#f97316', '#ef4444'];

export default function TrainingAnalyticsPage() {
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
              <h1 className="text-3xl font-semibold text-foreground">Analitik Pelatihan</h1>
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Tingkat Penyelesaian</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">87.5%</p>
              <p className="mt-2 text-sm text-emerald-600">↑ 2.1% dari bulan lalu</p>
            </div>
            <Award className="h-8 w-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Segera Kedaluwarsa</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">38</p>
              <p className="mt-2 text-sm text-amber-600">Dalam 60 hari</p>
            </div>
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
        </Card>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Kepatuhan Pelatihan Wajib</p>
          <div className="space-y-3">
            {mandatoryTrainingData.map((training) => (
              <div key={training.training} className="rounded-2xl bg-card/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{training.training}</p>
                  <span className={`text-sm font-semibold ${training.compliance >= 95 ? 'text-emerald-600' : training.compliance >= 85 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {training.compliance.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-surface/70 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${training.compliance >= 95 ? 'bg-emerald-500' : training.compliance >= 85 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${training.compliance}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-muted">
                  {training.completed} completed • {training.pending} pending
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Status Kedaluwarsa Sertifikat</p>
          <div className="space-y-3">
            {expiredCertificatesData.map((cert) => (
              <div key={cert.certificate} className="rounded-2xl bg-card/80 p-4">
                <p className="text-sm font-semibold text-foreground mb-3">{cert.certificate}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-rose-600 font-semibold">{cert.expired} Kedaluwarsa</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-600 font-semibold">{cert.expiringSoon} Segera Kedaluwarsa</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600 font-semibold">{cert.active} Aktif</p>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionContainer>
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Tren Penyelesaian Pelatihan</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trainingCompletionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" />
                <Bar dataKey="overdue" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Matriks Kompetensi</p>
            <div className="space-y-3">
              {competencyMatrixData.map((competency) => (
                <div key={competency.competency} className="rounded-2xl bg-card/80 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{competency.competency}</p>
                      <p className="text-xs text-muted">{competency.level}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{competency.employees}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </SectionContainer>
      </div>
    </div>
  );
}
