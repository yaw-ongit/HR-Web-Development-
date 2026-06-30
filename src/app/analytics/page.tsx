'use client';

import Link from 'next/link';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Briefcase, Activity, BookOpen, Heart, DollarSign, Award, Filter, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import {
  executiveKpi,
  workforceTrendData,
  hiringTrendData,
  turnoverTrendData,
  departmentGrowthData,
  trainingCompletionData,
  leaveTrendData,
  attendanceTrendData,
} from '@/lib/analytics-data';

const COLORS = ['#0ea5e9', '#f97316', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Enterprise Intelligence</p>
            <h1 className="text-3xl font-semibold text-slate-100">Analytics Center</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Comprehensive workforce analytics platform for strategic decision-making and operational insights.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Employees</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{executiveKpi.totalEmployees}</p>
                <p className="mt-2 text-sm text-emerald-400">↑ {executiveKpi.headcountGrowth} this month</p>
              </div>
              <Users className="h-8 w-8 text-sky-400" />
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Attendance Rate</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{executiveKpi.attendanceRate}%</p>
                <p className="mt-2 text-sm text-slate-400">On average</p>
              </div>
              <Activity className="h-8 w-8 text-emerald-400" />
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Turnover Rate</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{executiveKpi.turnoverRate}%</p>
                <p className="mt-2 text-sm text-rose-400">This month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-rose-400" />
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Training Compliance</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{executiveKpi.trainingCompliance}%</p>
                <p className="mt-2 text-sm text-sky-400">Completed</p>
              </div>
              <BookOpen className="h-8 w-8 text-sky-400" />
            </div>
          </Card>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Workforce Headcount Trend</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={workforceTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Area type="monotone" dataKey="headcount" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorHeadcount)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Hiring Funnel Progress</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend />
                <Bar dataKey="offers" fill="#0ea5e9" />
                <Bar dataKey="hired" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Turnover Trend</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={turnoverTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend />
                <Line type="monotone" dataKey="turnover" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Department Growth</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 60 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="department" type="category" stroke="#94a3b8" width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Bar dataKey="headcount" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Training Completion Rate</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trainingCompletionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>

        <SectionContainer>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-6">Leave vs Attendance Balance</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Legend />
                <Bar dataKey="present" fill="#0ea5e9" />
                <Bar dataKey="absent" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </SectionContainer>
      </div>

      <SectionContainer>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/analytics/workforce">
            <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card hover:border-sky-400 cursor-pointer transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">View More</p>
                <Users className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Workforce Analytics</h3>
              <p className="mt-2 text-sm text-slate-400">Headcount, demographics, and organizational structure</p>
            </Card>
          </Link>

          <Link href="/analytics/attendance">
            <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card hover:border-sky-400 cursor-pointer transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">View More</p>
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Attendance Analytics</h3>
              <p className="mt-2 text-sm text-slate-400">Attendance heatmaps, late trends, and overtime</p>
            </Card>
          </Link>

          <Link href="/analytics/leave">
            <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card hover:border-sky-400 cursor-pointer transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">View More</p>
                <BookOpen className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Leave Analytics</h3>
              <p className="mt-2 text-sm text-slate-400">Leave balances, types, and department comparison</p>
            </Card>
          </Link>

          <Link href="/analytics/recruitment">
            <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card hover:border-sky-400 cursor-pointer transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">View More</p>
                <Briefcase className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Recruitment Analytics</h3>
              <p className="mt-2 text-sm text-slate-400">Hiring funnel, time to hire, and offer acceptance</p>
            </Card>
          </Link>

          <Link href="/analytics/training">
            <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card hover:border-sky-400 cursor-pointer transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">View More</p>
                <Award className="h-5 w-5 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Training Analytics</h3>
              <p className="mt-2 text-sm text-slate-400">Completion rates, certificates, and competencies</p>
            </Card>
          </Link>

          <Link href="/analytics/compliance">
            <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card hover:border-sky-400 cursor-pointer transition">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">View More</p>
                <Heart className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">Compliance Analytics</h3>
              <p className="mt-2 text-sm text-slate-400">Medical compliance, certificate expiry, and requirements</p>
            </Card>
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
}
