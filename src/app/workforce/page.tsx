'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, CartesianGrid, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, Clock, FileText, Layers, Search, ShieldCheck, TrendingUp, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { workforceKpis, workforceQuickActions, attendanceTrend, lateArrivalTrend, leaveTrend, overtimeTrend, departmentAttendance, attendanceRecords } from '@/lib/workforce-data';

export default function WorkforceHomePage() {
  const [search, setSearch] = useState('');

  const filteredWorkforce = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return attendanceRecords.slice(0, 6);
    return attendanceRecords.filter((record) =>
      record.employee.toLowerCase().includes(query) ||
      record.department.toLowerCase().includes(query) ||
      record.shift.toLowerCase().includes(query) ||
      record.status.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-900/95 px-6 py-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Workforce</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-100">Workforce workspace</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">One operational view for attendance, leave, shift planning and overtime approvals.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/workforce/attendance">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <CalendarCheck className="h-4 w-4" /> Attendance
              </Button>
            </Link>
            <Link href="/workforce/leave-management">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <CheckCircle2 className="h-4 w-4" /> Leave
              </Button>
            </Link>
            <Link href="/workforce/shift-management">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Layers className="h-4 w-4" /> Shifts
              </Button>
            </Link>
            <Link href="/workforce/overtime">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <ClipboardList className="h-4 w-4" /> Overtime
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {workforceKpis.map((kpi) => (
                <Card key={kpi.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{kpi.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-100">{kpi.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{kpi.note}</p>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <Card title="Workforce search" description="Find employee attendance, shift, or leave status immediately.">
                <div className="relative">
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search employee, department, shift or status"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 px-5 text-sm text-slate-100 outline-none transition focus:border-sky-400"
                  />
                  <Search className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>
                <div className="mt-6 space-y-3 text-sm text-slate-400">
                  {filteredWorkforce.length ? (
                    filteredWorkforce.slice(0, 5).map((row) => (
                      <div key={row.id} className="rounded-3xl bg-slate-950/80 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-100">{row.employee}</p>
                            <p className="text-sm text-slate-400">{row.department} · {row.shift}</p>
                          </div>
                          <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{row.status}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No matching workforce records found.</p>
                  )}
                </div>
              </Card>

              <Card title="Quick actions" description="Common operational actions for the workforce team.">
                <div className="grid gap-3">
                  {workforceQuickActions.map((action) => (
                    <Link key={action.label} href={action.href} className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 transition hover:border-sky-400">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{action.label}</p>
                          <p className="mt-1 text-sm text-slate-400">{action.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card title="Attendance trend" description="Attendance rate across the last six months.">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceTrend} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                    <Area type="monotone" dataKey="rate" stroke="#38bdf8" fill="url(#attendanceGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Department attendance" description="Attendance by department for the current month.">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentAttendance} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                    <Bar dataKey="value" fill="#38bdf8" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <SectionContainer title="Workforce analytics" className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-4">
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Late arrival trend</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">43 incidents</p>
              </div>
              <TrendingUp className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lateArrivalTrend}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                  <Line type="monotone" dataKey="value" stroke="#fb7185" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Leave trend</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">118 reports</p>
              </div>
              <FileText className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leaveTrend}>
                  <defs>
                    <linearGradient id="leaveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                  <Area type="monotone" dataKey="value" stroke="#34d399" fill="url(#leaveGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Overtime trend</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">78 hrs</p>
              </div>
              <Clock className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overtimeTrend}>
                  <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                  <Bar dataKey="value" fill="#f97316" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Operational readiness</p>
                <p className="mt-2 text-2xl font-semibold text-slate-100">Live staff view</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <p>Attendance, leave, shift and overtime are synced into the workforce command center.</p>
            </div>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
