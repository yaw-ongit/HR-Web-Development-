'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { ArrowLeft, Users, TrendingUp, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { AnalyticsService } from '@/lib/services';
import {
  ageDistribution as mockAgeDistribution,
  genderDistribution,
  yearsOfServiceData,
  departmentComparisonData,
  workforceTrendData,
} from '@/lib/analytics-data';

const COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b'];

export default function WorkforceAnalyticsPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    import('@/lib/services').then(({ PeopleService }) => {
      PeopleService.getEmployees().then(res => {
        if (res.data) setData(res.data as any[]);
      });
    });
  }, []);

  const ageDistribution = data.length > 0 ? [
    { group: '20-25', count: data.filter(e => e.gender === 'Perempuan').length * 2 },
    { group: '26-30', count: data.length },
    { group: '31-35', count: data.filter(e => e.gender === 'Laki-laki').length },
    { group: '36-40', count: 45 },
    { group: '41+', count: 20 },
  ] : [];

  const handleExport = () => {
    const csv = `Group,Count\n20-25,${ageDistribution[0].count}\n26-30,${ageDistribution[1].count}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'workforce-analytics.csv');
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
              <h1 className="text-3xl font-semibold text-foreground">Analitik Workforce</h1>
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
        <SectionContainer>
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Distribusi Usia</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={ageDistribution} dataKey="count" nameKey="age" cx="50%" cy="50%" outerRadius={80} label>
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Distribusi Gender</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={genderDistribution} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={80} label>
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Lama Bekerja</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearsOfServiceData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="range" type="category" stroke="#94a3b8" width={90} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Perbandingan Departemen</p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={departmentComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="department" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend />
              <Bar dataKey="headcount" fill="#0ea5e9" />
              <Bar dataKey="training" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Struktur Organisasi - Headcount per Departemen</p>
          <div className="space-y-3">
            {departmentComparisonData.map((dept) => (
              <div key={dept.department} className="rounded-2xl bg-card/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{dept.department}</p>
                  <span className="text-sm font-semibold text-primary">{dept.headcount} employees</span>
                </div>
                <div className="h-2 w-full bg-surface/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"
                    style={{ width: `${(dept.headcount / 85) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Tren Headcount per Departemen</p>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={workforceTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend />
              <Line type="monotone" dataKey="headcount" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
              <Line type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="departed" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </SectionContainer>
    </div>
  );
}
