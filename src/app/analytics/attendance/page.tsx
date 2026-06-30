'use client';

import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import {
  attendanceHeatmapData,
  lateTrendData,
  overtimeTrendData,
  attendanceTrendData,
} from '@/lib/analytics-data';

export default function AttendanceAnalyticsPage() {
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
              <h1 className="text-3xl font-semibold text-slate-100">Attendance Analytics</h1>
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Avg Weekly Attendance</p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">94.2%</p>
              <p className="mt-2 text-sm text-emerald-400">↑ 0.5% from last week</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-400" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Late Incidents</p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">41</p>
              <p className="mt-2 text-sm text-amber-400">This week</p>
            </div>
            <Clock className="h-8 w-8 text-amber-400" />
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Absence Rate</p>
              <p className="mt-3 text-3xl font-semibold text-slate-100">3.2%</p>
              <p className="mt-2 text-sm text-slate-400">9 employees absent today</p>
            </div>
            <AlertCircle className="h-8 w-8 text-sky-400" />
          </div>
        </Card>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Attendance Heatmap by Department</p>
          <div className="space-y-3">
            {attendanceHeatmapData.map((dept) => (
              <div key={dept.department} className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-100">{dept.department}</p>
                  <span className="text-sm font-semibold text-sky-400">{dept.weekAvg}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-slate-500">Attendance</p>
                    <p className="text-sm font-semibold text-slate-100">{dept.weekAvg}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Absence</p>
                    <p className="text-sm font-semibold text-rose-400">{dept.absenceRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Late</p>
                    <p className="text-sm font-semibold text-amber-400">{dept.lateRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Late Trend by Day</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lateTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Bar dataKey="incidents" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Overtime Trend</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={overtimeTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOvertime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorOvertime)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>
      </div>

      <SectionContainer>
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Daily Attendance Trend</p>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend />
              <Area type="monotone" dataKey="present" stroke="#10b981" fillOpacity={1} fill="url(#colorPresent)" />
              <Area type="monotone" dataKey="absent" stroke="#ef4444" fillOpacity={1} fill="url(#colorAbsent)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </SectionContainer>
    </div>
  );
}
