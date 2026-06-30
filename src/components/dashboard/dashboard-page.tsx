'use client';

import { createElement, useMemo, useState } from 'react';
import {
  Bell,
  ChevronDown,
  Search,
  SunMedium,
  Menu,
  Users,
  Sparkles,
  ShieldCheck,
  Server,
  CalendarCheck,
  FileText,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  UserPlus,
  Flag,
  ShieldAlert,
  ClipboardList,
  Key,
  Wallet,
  BookOpen,
} from 'lucide-react';
import { Sidebar } from '@/components/navigation/sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { PageContainer } from '@/components/layout/page-container';
import { SectionContainer } from '@/components/layout/section-container';
import { dashboardKpis, roleQuickActions, roles, roleWidgets, announcements, employeeMetrics, recentActivity, systemStatus, roleNotifications } from '@/lib/dashboard-data';
import { RoleKey } from '@/lib/dashboard-data';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, PieChart, Pie, LineChart, Line, XAxis, YAxis, Legend } from 'recharts';

const widgetComponents = {
  calendar: ({ title }: { title: string }) => (
    <Card title={title} description="A quick monthly summary of presence and planned time away.">
      <div className="grid grid-cols-7 gap-2 text-[11px] text-slate-400">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <span key={day} className="text-center font-semibold text-slate-500">
            {day}
          </span>
        ))}
        {Array.from({ length: 28 }).map((_, index) => (
          <div key={index} className="h-11 rounded-2xl bg-slate-900/80 shadow-inner ring-1 ring-white/5"></div>
        ))}
      </div>
    </Card>
  ),
  balance: ({ title }: { title: string }) => (
    <Card title={title} description="Leave balance and accrual summary.">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Annual leave', value: '9 days' },
            { label: 'Sick leave', value: '4 days' },
            { label: 'Personal leave', value: '2 days' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl bg-slate-950/90 p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  ),
  events: ({ title }: { title: string }) => (
    <Card title={title} description="Events on your company calendar that matter today.">
      <div className="space-y-4">
        {[
          { label: 'Q2 All-hands', time: 'Today 14:00', status: 'Live' },
          { label: 'Leadership workshop', time: 'Thu 09:00', status: 'Upcoming' },
        ].map((event) => (
          <div key={event.label} className="rounded-3xl bg-slate-950/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-100">{event.label}</p>
                <p className="text-sm text-slate-400">{event.time}</p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
  training: ({ title }: { title: string }) => (
    <Card title={title} description="Training schedule with session progress and focus areas.">
      <div className="space-y-4">
        {[
          { course: 'Manager Essentials', progress: '68%' },
          { course: 'Compliance Certification', progress: '92%' },
        ].map((item) => (
          <div key={item.course} className="rounded-3xl bg-slate-950/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-100">{item.course}</p>
              <p className="text-sm text-slate-400">{item.progress}</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-sky-400" style={{ width: item.progress }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
  activity: ({ title }: { title: string }) => (
    <Card title={title} description="Track the latest system and workforce events.">
      <div className="space-y-4">
        {recentActivity.map((item) => (
          <div key={item.actor} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-100">{item.actor}</p>
                <p className="text-sm text-slate-400">{item.action}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
  announcements: ({ title }: { title: string }) => (
    <Card title={title} description="Important announcements for the enterprise.">
      <div className="space-y-4">
        {announcements.map((notice) => (
          <div key={notice.title} className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
            <p className="text-sm font-semibold text-slate-100">{notice.title}</p>
            <p className="mt-1 text-sm text-slate-400">{notice.subtitle}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  approvals: ({ title }: { title: string }) => (
    <Card title={title} description="Pending approvals that require your action.">
      <div className="space-y-4">
        {[
          { label: 'Leave request: Jonah', status: 'Pending' },
          { label: 'Contract extension: Finance', status: 'Review' },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-950/80 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-100">{item.label}</p>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
  recruitment: ({ title }: { title: string }) => (
    <Card title={title} description="Active sourcing and hiring progress.">
      <div className="space-y-4">
        {[
          { label: 'New hires', value: '16 in pipeline' },
          { label: 'Open roles', value: '24 active searches' },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  birthdays: ({ title }: { title: string }) => (
    <Card title={title} description="Celebrating colleagues who have birthdays this week.">
      <div className="space-y-4">
        {['Maya Thompson', 'Noah Brooks', 'Avery Patel'].map((name) => (
          <div key={name} className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm font-semibold text-slate-100">{name}</p>
            <p className="text-sm text-slate-400">Team member</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  workforce: ({ title }: { title: string }) => (
    <Card title={title} description="Enterprise workforce analytics with lifecycle visibility.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={employeeMetrics.headcountTrend} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
            <defs>
              <linearGradient id="headcount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
            <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} fill="url(#headcount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  ),
  comparison: ({ title }: { title: string }) => (
    <Card title={title} description="Comparative department performance metrics.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={employeeMetrics.departments} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
            <Bar dataKey="value" fill="#22d3ee" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  ),
  trend: ({ title }: { title: string }) => (
    <Card title={title} description="Organizational trend insights over the last six months.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={employeeMetrics.headcountTrend} margin={{ top: 12, right: 18, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  ),
  distribution: ({ title }: { title: string }) => (
    <Card title={title} description="Organizational distribution by department.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={employeeMetrics.departments} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={92} paddingAngle={4}>
              {employeeMetrics.departments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#38bdf8', '#7c3aed', '#22c55e', '#f97316', '#0ea5e9'][index]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  ),
  status: ({ title }: { title: string }) => (
    <Card title={title} description="Current platform health metrics for administrators.">
      <div className="space-y-4">
        {systemStatus.map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-950/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                <p className="text-sm text-slate-400">{item.value}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${item.status === 'good' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-amber-500/10 text-amber-200'}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
  server: ({ title }: { title: string }) => (
    <Card title={title} description="Mock server health data with latency and status." footer={<div className="flex items-center gap-3 text-xs text-slate-500">Updated just now</div>}>
      <div className="space-y-4">
        {[
          { metric: 'CPU', value: '58%' },
          { metric: 'Memory', value: '72%' },
          { metric: 'Disk', value: '41%' },
        ].map((item) => (
          <div key={item.metric} className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">{item.metric}</p>
            <p className="mt-2 text-xl font-semibold text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  logs: ({ title }: { title: string }) => (
    <Card title={title} description="Latest audit entries for system administration.">
      <div className="space-y-3">
        {['User access updated', 'Policy audit completed', 'SSH key rotation'].map((item) => (
          <div key={item} className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm text-slate-100">{item}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  alerts: ({ title }: { title: string }) => (
    <Card title={title} description="Current security alerts that need admin review.">
      <div className="space-y-3">
        {[
          { label: 'Multifactor authentication configured', level: 'Info' },
          { label: 'Unusual login pattern detected', level: 'Critical' },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm font-semibold text-slate-100">{item.label}</p>
            <p className="text-xs text-slate-500">{item.level}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
};

const iconMap = {
  Clock,
  Users,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Briefcase,
  CalendarCheck,
  FileText,
  TrendingUp,
  UserPlus,
  Flag,
  ShieldAlert,
  ClipboardList,
  Key,
  Wallet,
};

function getRoleLabel(role: RoleKey) {
  return roles.find((item) => item.key === role)?.label ?? 'Employee';
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<RoleKey>('hr-officer');
  const quickActions = roleQuickActions[role];
  const kpis = dashboardKpis[role];
  const widgets = roleWidgets[role];
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  const hero = useMemo(() => {
    if (role === 'employee') {
      return {
        title: `Welcome back, Maya.`,
        subtitle: `Today is ${today}. Your working status is active.`,
        actions: ['My schedule', 'Open timecard'],
      };
    }

    if (role === 'supervisor') {
      return {
        title: `Team performance at a glance.`,
        subtitle: `Today is ${today}. Your team is operating within expected range.`,
        actions: ['Review approvals', 'Inspect team health'],
      };
    }
    if (role === 'hr-officer') {
      return {
        title: `Workforce operations command center.`,
        subtitle: `Today is ${today}. Focus on headcount, benefits, and upcoming compliance.`,
        actions: ['Complete onboarding', 'Review compliance'],
      };
    }
    if (role === 'hr-manager') {
      return {
        title: `Leadership checkpoint for HR performance.`,
        subtitle: `Today is ${today}. Monitor retention, training, and recruitment at executive scale.`,
        actions: ['Open analytics', 'Approve budget'],
      };
    }
    if (role === 'director') {
      return {
        title: `Executive workforce pulse.`,
        subtitle: `Today is ${today}. High-level insights for organizational health.`,
        actions: ['View forecast', 'Inspect growth'],
      };
    }
    return {
      title: `Operational dashboard for administration.`,
      subtitle: `Today is ${today}. All systems are monitored from a single pane.`,
      actions: ['Review alerts', 'Audit logs'],
    };
  }, [role, today]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar open={sidebarOpen} />
      <div className="lg:pl-80">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
          <PageContainer>
            <div className="flex items-center justify-between gap-4 py-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Toggle sidebar"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-slate-900 text-slate-200 lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
                  <h2 className="text-xl font-semibold text-slate-100">{getRoleLabel(role)} overview</h2>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    aria-label="Search"
                    placeholder="Search anything..."
                    className="w-full rounded-full border border-white/10 bg-slate-900/90 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
                  />
                </div>
                <button aria-label="Notifications" className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-900 text-slate-200 hover:bg-slate-800">
                  <Bell className="h-5 w-5" />
                </button>
                <button aria-label="Toggle theme" className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-900 text-slate-200 hover:bg-slate-800">
                  <SunMedium className="h-5 w-5" />
                </button>
                <button aria-label="User profile menu" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-100 hover:bg-slate-800">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-400 text-slate-950">M</div>
                  <span className="font-medium">Maya</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </PageContainer>
        </header>

        <PageContainer>
          <div className="grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] px-6 py-8">
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Today</p>
                    <h1 className="text-3xl font-semibold text-slate-100">{hero.title}</h1>
                    <p className="max-w-2xl text-sm leading-7 text-slate-400">{hero.subtitle}</p>
                    <div className="flex flex-wrap gap-3 pt-3">
                      {hero.actions.map((label) => (
                        <Button key={label} variant="outline" className="rounded-full px-4 py-2 text-sm">
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6">
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-3xl bg-sky-500/15 text-sky-300">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Working status</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-100">Active</p>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-3 rounded-[24px] bg-slate-900/80 p-4">
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>Check-in</span>
                        <span>08:34</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>Scheduled end</span>
                        <span>17:30</span>
                      </div>
                      <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-300">
                        Today’s focus: align team goals, complete onboarding review, and confirm leave approvals.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <SectionContainer title="Role selection">
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {roles.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setRole(item.key)}
                      className={
                        `rounded-3xl border px-4 py-4 text-left transition ${
                          role === item.key
                            ? 'border-sky-400 bg-slate-900/95 text-slate-100 shadow-card'
                            : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-slate-500 hover:bg-slate-900'
                        }`
                      }
                    >
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-2 text-xs text-slate-500">Dashboard view</p>
                    </button>
                  ))}
                </div>
              </SectionContainer>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                  <Card key={kpi.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{kpi.label}</p>
                        <p className={`mt-3 text-3xl font-semibold ${kpi.valueColor}`}>{kpi.value}</p>
                        <p className="mt-2 text-sm text-slate-400">{kpi.trend}</p>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-950/85 text-sky-300">
                        {createElement(iconMap[kpi.icon as keyof typeof iconMap] ?? Sparkles, {
                          className: 'h-5 w-5',
                        })}
                      </div>
                    </div>
                  </Card>
                ))}
              </section>

              <SectionContainer title="Quick actions">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {quickActions.map((action) => (
                    <Card key={action.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-5 hover:border-sky-400/25 hover:bg-slate-900">
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-sky-400/10 text-sky-300">
                          {createElement(iconMap[action.icon as keyof typeof iconMap] ?? Sparkles, {
                            className: 'h-5 w-5',
                          })}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-slate-100">{action.label}</p>
                          <p className="mt-1 text-sm text-slate-400">{action.hint}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </SectionContainer>

              <SectionContainer title="Widgets">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {widgets.map((widget) => {
                    const Component = widgetComponents[widget.type as keyof typeof widgetComponents];
                    return <Component key={widget.title} title={widget.title} />;
                  })}
                </div>
              </SectionContainer>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="rounded-[28px] border border-white/10 bg-slate-900/95 px-6 py-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Notifications</p>
                      <h2 className="text-2xl font-semibold text-slate-100">Recent alerts</h2>
                    </div>
                    <Button variant="secondary">View all</Button>
                  </div>
                  <div className="mt-6 space-y-4">
                    {roleNotifications.map((notification) => (
                      <div key={notification.title} className="rounded-[24px] border border-white/10 bg-slate-950/85 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-base font-semibold text-slate-100">{notification.title}</p>
                            <p className="mt-1 text-sm text-slate-400">{notification.description}</p>
                          </div>
                          <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <section className="grid gap-6">
                <Card title="Insights" description="Executive and operations analytics for the selected role.">
                  <div className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-5">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Attendance trend</p>
                          <p className="mt-2 text-xl font-semibold text-slate-100">Current cycle</p>
                        </div>
                        <div className="rounded-3xl bg-slate-900/80 px-3 py-2 text-sm text-slate-300">Stable</div>
                      </div>
                      <div className="mt-5 h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={employeeMetrics.attendance} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                            <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={false} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                            <Area type="monotone" dataKey="value" stroke="#22c55e" fill="rgba(34,197,94,0.15)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-5">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Training completion</p>
                          <p className="mt-2 text-xl font-semibold text-slate-100">Participation rate</p>
                        </div>
                        <div className="rounded-3xl bg-slate-900/80 px-3 py-2 text-sm text-slate-300">Target 90%</div>
                      </div>
                      <div className="mt-5 h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={employeeMetrics.trainingCompletion} margin={{ top: 10, right: 0, left: -16, bottom: 0 }}>
                            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                            <Bar dataKey="value" fill="#818cf8" radius={[12, 12, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}
