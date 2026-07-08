'use client';

import Link from 'next/link';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Calendar, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import {
  leaveBalanceData,
  leaveTypeDistribution,
  leaveTrendData,
  departmentComparisonData,
} from '@/lib/analytics-data';

const COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#ef4444'];

export default function LeaveAnalyticsPage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/analytics">
              <Button className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-brand-500">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Analitik</p>
              <h1 className="text-3xl font-semibold text-slate-900">Analitik Cuti</h1>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Ikhtisar Saldo Cuti</p>
            <div className="space-y-4">
              {leaveBalanceData.map((leave) => (
                <div key={leave.leaveType} className="rounded-2xl bg-white/80 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-900">{leave.leaveType}</p>
                    <span className="text-xs font-semibold text-slate-400">{leave.employees} karyawan</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-slate-400">Alokasi</p>
                      <p className="text-sm font-semibold text-slate-900">{leave.total}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Dipakai</p>
                      <p className="text-sm font-semibold text-rose-600">{leave.used}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Saldo</p>
                      <p className={`text-sm font-semibold ${leave.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {leave.balance}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Distribusi Jenis Cuti</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={leaveTypeDistribution} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={80} label>
                  {leaveTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Tren Persetujuan Cuti</p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={leaveTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend />
              <Bar dataKey="approved" fill="#10b981" />
              <Bar dataKey="pending" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </SectionContainer>

      <SectionContainer>
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Perbandingan Cuti Departemen</p>
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
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Waktu Proses Permintaan Cuti</p>
          <div className="space-y-3">
            <div className="rounded-2xl bg-white/80 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Rata-rata Waktu Proses</p>
                <p className="mt-1 text-xs text-slate-400">30 hari terakhir</p>
              </div>
              <span className="text-2xl font-semibold text-brand-600">2.3 hari</span>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Departemen Tercepat</p>
                <p className="mt-1 text-xs text-slate-400">Keuangan - rata-rata 1.5 hari</p>
              </div>
              <span className="text-2xl font-semibold text-emerald-600">1.5d</span>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Departemen Terlambat</p>
                <p className="mt-1 text-xs text-slate-400">Fasilitas - rata-rata 3.2 hari</p>
              </div>
              <span className="text-2xl font-semibold text-amber-600">3.2d</span>
            </div>
          </div>
        </Card>
      </SectionContainer>
    </div>
  );
}
