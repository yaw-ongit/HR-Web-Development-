'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { AnalyticsService } from '@/lib/services';
import { medicalExpiryData, certificateExpiryData, complianceRateData as mockComplianceRateData, missingRequirementsData } from '@/lib/analytics-data';

const COLORS = ['#ef4444', '#f97316', '#0ea5e9', '#10b981'];

export default function ComplianceAnalyticsPage() {
  const [data, setData] = useState<{ certs: any[], insurances: any[] }>({ certs: [], insurances: [] });

  useEffect(() => {
    AnalyticsService.getComplianceAnalytics().then(res => {
      if (res.data) setData(res.data as any);
    });
  }, []);

  const complianceRateData = data.certs.length > 0 ? [
    { item: 'Kepatuhan Medis', rate: 95, target: 100 },
    { item: 'Kepatuhan Sertifikat', rate: 85, target: 100 },
    { item: 'Kepatuhan Pelatihan', rate: 92, target: 100 },
  ] : [];

  const handleExport = () => {
    const csv = `Category,Rate\nMedis,${complianceRateData[0].rate}\nSertifikat,${complianceRateData[1].rate}\nPelatihan,${complianceRateData[2].rate}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'compliance-analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/analytics">
              <Button variant="ghost" className="rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-500">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Analitik</p>
              <h1 className="text-3xl font-semibold text-foreground">Analitik Kepatuhan</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-500">Filter</Button>
            <Button variant="secondary" onClick={handleExport} className="rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-foreground hover:border-brand-500">Ekspor CSV</Button>
            <Button variant="primary" onClick={() => window.print()} className="rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-semibold text-white">Cetak PDF</Button>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Kepatuhan Total</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">90.4%</p>
              <p className="mt-2 text-sm text-emerald-600">↑ 1.2% dari bulan lalu</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Berisiko</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">28</p>
              <p className="mt-2 text-sm text-rose-600">Karyawan dengan masalah</p>
            </div>
            <AlertCircle className="h-8 w-8 text-rose-600" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Kepatuhan Medis</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">91.3%</p>
              <p className="mt-2 text-sm text-emerald-600">Sesuai target</p>
            </div>
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Status Kedaluwarsa Medis</p>
          <div className="space-y-3">
            {medicalExpiryData.map((item) => (
              <div key={item.description} className="rounded-2xl bg-card/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{item.description}</p>
                  <span className={`text-sm font-semibold ${
                    item.level === 'critical' ? 'text-rose-600' :
                    item.level === 'warning' ? 'text-amber-600' :
                    item.level === 'info' ? 'text-primary' :
                    'text-emerald-600'
                  }`}>{item.count} employees</span>
                </div>
                <div className="h-2 w-full bg-slate-50/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.level === 'critical' ? 'bg-rose-500' :
                      item.level === 'warning' ? 'bg-amber-500' :
                      item.level === 'info' ? 'bg-brand-600' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${(item.count / 250) * 100}%` }}
                  />
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
            {certificateExpiryData.map((item) => (
              <div key={item.description} className="rounded-2xl bg-card/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{item.description}</p>
                  <span className={`text-sm font-semibold ${
                    item.level === 'critical' ? 'text-rose-600' :
                    item.level === 'warning' ? 'text-amber-600' :
                    'text-emerald-600'
                  }`}>{item.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-50/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.level === 'critical' ? 'bg-rose-500' :
                      item.level === 'warning' ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${(item.count / 285) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Tingkat Kepatuhan per Kategori</p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={complianceRateData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="item" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend />
              <Bar dataKey="rate" fill="#0ea5e9" name="Current Rate" />
              <Bar dataKey="target" fill="#10b981" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Persyaratan Tidak Lengkap</p>
          <div className="space-y-3">
            {missingRequirementsData.map((item) => (
              <div key={item.requirement} className="rounded-2xl bg-card/80 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.requirement}</p>
                  <p className="mt-1 text-xs text-muted">{item.department}</p>
                </div>
                <span className="text-lg font-semibold text-rose-600">{item.missing}</span>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>
    </div>
  );
}
