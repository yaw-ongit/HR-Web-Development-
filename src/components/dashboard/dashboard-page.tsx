'use client';

import { createElement, useMemo, useState } from 'react';
import {
  Sparkles, Clock, Users, BookOpen, ShieldCheck, Server, Briefcase,
  TrendingUp, ArrowUpRight, ArrowDownRight, UserPlus, Flag, ShieldAlert,
  ClipboardList, Key, Wallet, CalendarCheck, FileText,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KpiCard } from '@/components/ui/kpi-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { SectionContainer } from '@/components/layout/section-container';
import {
  dashboardKpis, roleQuickActions, roles, roleWidgets,
  announcements, employeeMetrics, recentActivity, systemStatus,
  roleNotifications, RoleKey,
} from '@/lib/dashboard-data';
import {
  AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip,
  BarChart, Bar, Cell, PieChart, Pie, LineChart, Line, XAxis, YAxis,
} from 'recharts';

const CHART_TOOLTIP_STYLE = {
  background: '#020617',
  border: '1px solid rgba(148,163,184,0.18)',
  color: '#e2e8f0',
  borderRadius: '12px',
};

const iconMap = {
  Clock, Users, BookOpen, Sparkles, ShieldCheck, ArrowUpRight, ArrowDownRight,
  Server, Briefcase, CalendarCheck, FileText, TrendingUp, UserPlus, Flag,
  ShieldAlert, ClipboardList, Key, Wallet,
};

/* ---------------------------------------------------------------
   Widget renderers — extracted as stable components
--------------------------------------------------------------- */
function WidgetCalendar({ title }: { title: string }) {
  return (
    <Card title={title} description="Monthly presence and time-away summary.">
      <div className="grid grid-cols-7 gap-1.5 text-[11px] text-slate-400">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <span key={d} className="text-center font-semibold text-slate-400">{d}</span>
        ))}
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="h-10 rounded-xl bg-slate-50/80 ring-1 ring-slate-100" />
        ))}
      </div>
    </Card>
  );
}

function WidgetBalance({ title }: { title: string }) {
  return (
    <Card title={title} description="Leave balance and accrual summary.">
      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Annual', value: '9 days' }, { label: 'Sick', value: '4 days' }, { label: 'Personal', value: '2 days' }].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white/90 p-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function WidgetActivity({ title }: { title: string }) {
  return (
    <Card title={title} description="Latest system and workforce events.">
      <ul className="space-y-3" aria-label="Recent activity">
        {recentActivity.map((item) => (
          <li key={item.actor} className="rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.actor}</p>
                <p className="text-sm text-slate-400">{item.action}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function WidgetAnnouncements({ title }: { title: string }) {
  return (
    <Card title={title} description="Important enterprise announcements.">
      <ul className="space-y-3" aria-label="Announcements">
        {announcements.map((notice) => (
          <li key={notice.title} className="rounded-2xl bg-white/80 p-4 ring-1 ring-slate-100">
            <p className="text-sm font-semibold text-slate-900">{notice.title}</p>
            <p className="mt-1 text-sm text-slate-400">{notice.subtitle}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function WidgetStatus({ title }: { title: string }) {
  return (
    <Card title={title} description="Current platform health metrics.">
      <ul className="space-y-3" aria-label="System status">
        {systemStatus.map((item) => (
          <li key={item.label} className="flex items-center justify-between rounded-2xl bg-white/80 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="text-sm text-slate-400">{item.value}</p>
            </div>
            <StatusBadge status={item.status} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function WidgetTraining({ title }: { title: string }) {
  return (
    <Card title={title} description="Training schedule and session progress.">
      <div className="space-y-4">
        {[{ course: 'Manager Essentials', progress: 68 }, { course: 'Compliance Certification', progress: 92 }].map((item) => (
          <div key={item.course} className="rounded-2xl bg-white/80 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{item.course}</p>
              <p className="text-sm text-slate-400">{item.progress}%</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-50" role="progressbar" aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.course} progress`}>
              <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function WidgetWorkforce({ title }: { title: string }) {
  return (
    <Card title={title} description="Headcount trend over six months.">
      <div className="h-64" aria-label="Headcount trend chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={employeeMetrics.headcountTrend} margin={{ top: 8, right: 12, left: -12, bottom: 8 }}>
            <defs>
              <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} fill="url(#hcGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function WidgetComparison({ title }: { title: string }) {
  return (
    <Card title={title} description="Comparative department performance.">
      <div className="h-64" aria-label="Department comparison chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={employeeMetrics.departments} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Bar dataKey="value" fill="#22d3ee" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function WidgetDistribution({ title }: { title: string }) {
  const PIE_COLORS = ['#38bdf8', '#7c3aed', '#22c55e', '#f97316', '#0ea5e9'];
  return (
    <Card title={title} description="Org distribution by department.">
      <div className="h-64" aria-label="Department distribution chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={employeeMetrics.departments} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={52} outerRadius={84} paddingAngle={4}>
              {employeeMetrics.departments.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function WidgetApprovals({ title }: { title: string }) {
  return (
    <Card title={title} description="Pending approvals requiring your action.">
      <ul className="space-y-3" aria-label="Pending approvals">
        {[{ label: 'Leave request — Jonah', status: 'Pending' }, { label: 'Contract extension — Finance', status: 'Review' }].map((item) => (
          <li key={item.label} className="flex items-center justify-between rounded-2xl bg-white/80 p-4">
            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
            <StatusBadge status={item.status} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

const widgetComponents: Record<string, React.FC<{ title: string }>> = {
  calendar: WidgetCalendar,
  balance: WidgetBalance,
  activity: WidgetActivity,
  announcements: WidgetAnnouncements,
  status: WidgetStatus,
  training: WidgetTraining,
  workforce: WidgetWorkforce,
  comparison: WidgetComparison,
  distribution: WidgetDistribution,
  approvals: WidgetApprovals,
  events: ({ title }) => (
    <Card title={title} description="Company calendar events today.">
      <ul className="space-y-3">
        {[{ label: 'Q2 All-hands', time: 'Today 14:00', status: 'Live' }, { label: 'Leadership workshop', time: 'Thu 09:00', status: 'Upcoming' }].map((e) => (
          <li key={e.label} className="flex items-center justify-between rounded-2xl bg-white/80 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{e.label}</p>
              <p className="text-sm text-slate-400">{e.time}</p>
            </div>
            <StatusBadge status={e.status} />
          </li>
        ))}
      </ul>
    </Card>
  ),
  recruitment: ({ title }) => (
    <Card title={title} description="Active sourcing and hiring progress.">
      <div className="space-y-3">
        {[{ label: 'New hires', value: '16 in pipeline' }, { label: 'Open roles', value: '24 active searches' }].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white/80 p-4">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-1.5 text-lg font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  birthdays: ({ title }) => (
    <Card title={title} description="Colleagues celebrating birthdays this week.">
      <ul className="space-y-3">
        {['Maya Thompson', 'Noah Brooks', 'Avery Patel'].map((name) => (
          <li key={name} className="rounded-2xl bg-white/80 p-4">
            <p className="text-sm font-semibold text-slate-900">🎂 {name}</p>
            <p className="text-xs text-slate-400">Team member</p>
          </li>
        ))}
      </ul>
    </Card>
  ),
  trend: ({ title }) => (
    <Card title={title} description="Organizational trend over six months.">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={employeeMetrics.headcountTrend} margin={{ top: 12, right: 18, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  ),
  server: ({ title }) => (
    <Card title={title} description="Server health — CPU, memory, disk." footer={<p className="text-xs text-slate-400">Updated just now</p>}>
      <div className="space-y-3">
        {[{ metric: 'CPU', value: '58%' }, { metric: 'Memory', value: '72%' }, { metric: 'Disk', value: '41%' }].map((item) => (
          <div key={item.metric} className="rounded-2xl bg-white/80 p-4">
            <p className="text-sm text-slate-400">{item.metric}</p>
            <p className="mt-1.5 text-xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  logs: ({ title }) => (
    <Card title={title} description="Latest audit entries.">
      <ul className="space-y-3">
        {['User access updated', 'Policy audit completed', 'SSH key rotation'].map((item) => (
          <li key={item} className="rounded-2xl bg-white/80 p-4">
            <p className="text-sm text-slate-900">{item}</p>
            <p className="text-xs text-slate-400">Completed</p>
          </li>
        ))}
      </ul>
    </Card>
  ),
  alerts: ({ title }) => (
    <Card title={title} description="Security alerts requiring admin review.">
      <ul className="space-y-3">
        {[{ label: 'MFA configured', level: 'Info' }, { label: 'Unusual login pattern', level: 'Critical' }].map((item) => (
          <li key={item.label} className="rounded-2xl bg-white/80 p-4">
            <p className="text-sm font-semibold text-slate-900">{item.label}</p>
            <StatusBadge status={item.level} className="mt-1" />
          </li>
        ))}
      </ul>
    </Card>
  ),
};

function getRoleLabel(role: RoleKey) {
  return roles.find((r) => r.key === role)?.label ?? 'Employee';
}

/* ---------------------------------------------------------------
   Main Dashboard Component
--------------------------------------------------------------- */
export default function DashboardPage() {
  const [role, setRole] = useState<RoleKey>('hr-officer');
  const quickActions = roleQuickActions[role];
  const kpis = dashboardKpis[role];
  const widgets = roleWidgets[role];
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  const hero = useMemo(() => {
    const heroMap: Record<RoleKey, { title: string; subtitle: string; actions: string[] }> = {
      employee: { title: 'Selamat datang kembali, Maya.', subtitle: `Hari ini adalah ${today}. Status kerja Anda aktif.`, actions: ['Jadwal Saya', 'Buka Timesheet'] },
      supervisor: { title: 'Sekilas kinerja tim.', subtitle: `Hari ini adalah ${today}. Tim Anda dalam rentang yang diharapkan.`, actions: ['Tinjau Persetujuan', 'Periksa Tim'] },
      'hr-officer': { title: 'Pusat komando operasional.', subtitle: `Hari ini adalah ${today}. Fokus pada kehadiran, cuti, dan kontrak.`, actions: ['Selesaikan Onboarding', 'Tinjau Kepatuhan'] },
      'hr-manager': { title: 'Checkpoint kepemimpinan kinerja HR.', subtitle: `Hari ini adalah ${today}. Pantau retensi, pelatihan dan rekrutmen.`, actions: ['Buka Analitik', 'Setujui Anggaran'] },
      director: { title: 'Pusat eksekutif tenaga kerja.', subtitle: `Hari ini adalah ${today}. Wawasan tingkat tinggi untuk kesehatan organisasi.`, actions: ['Lihat Proyeksi', 'Periksa Pertumbuhan'] },
      administrator: { title: 'Dashboard operasional administrasi.', subtitle: `Hari ini adalah ${today}. Semua sistem dipantau dari satu panel.`, actions: ['Tinjau Peringatan', 'Log Audit'] },
    };
    return heroMap[role];
  }, [role, today]);

  return (
    <AppShell pageTitle={`${getRoleLabel(role)} overview`} moduleName="Dashboard">
      <div className="space-y-6 pb-12 pt-2">
        {/* Hero card */}
        <Card>
          <div className="grid gap-6 p-6 lg:grid-cols-[1fr_260px]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Hari Ini</p>
              <h1 className="text-3xl font-semibold text-slate-900">{hero.title}</h1>
              <p className="max-w-xl text-sm leading-7 text-slate-400">{hero.subtitle}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {hero.actions.map((label) => (
                  <Button key={label} variant="outline" size="sm">{label}</Button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600" aria-hidden="true">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Status Kerja</p>
                  <p className="mt-1.5 text-2xl font-semibold text-slate-900">Aktif</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 rounded-xl bg-slate-50/80 p-4 text-sm text-slate-400">
                <div className="flex justify-between"><span>Check-in</span><span className="text-slate-800">08:34</span></div>
                <div className="flex justify-between"><span>Jam Pulang</span><span className="text-slate-800">17:30</span></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Role switcher */}
        <SectionContainer title="Tampilan Peran">
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6" role="radiogroup" aria-label="Select dashboard role">
            {roles.map((item) => (
              <button
                key={item.key}
                type="button"
                role="radio"
                aria-checked={role === item.key}
                onClick={() => setRole(item.key)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  role === item.key
                    ? 'border-blue-500 bg-blue-50/50 text-slate-900'
                    : 'border-slate-200 bg-white/70 text-slate-400 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </SectionContainer>

        {/* KPI cards */}
        <section aria-label="Key performance indicators">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <KpiCard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                trend={kpi.trend}
                trendVariant={kpi.valueColor?.includes('emerald') ? 'up' : kpi.valueColor?.includes('rose') ? 'down' : 'neutral'}
                icon={createElement(iconMap[kpi.icon as keyof typeof iconMap] ?? Sparkles, { className: 'h-5 w-5', 'aria-hidden': true })}
              />
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <SectionContainer title="Aksi Cepat">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Card key={action.label} className="p-5 transition hover:border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50/50 text-blue-600" aria-hidden="true">
                    {createElement(iconMap[action.icon as keyof typeof iconMap] ?? Sparkles, { className: 'h-5 w-5' })}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                    <p className="mt-1 text-xs text-slate-400">{action.hint}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SectionContainer>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Widgets */}
          <SectionContainer title="Widget Ruang Kerja">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {widgets.map((widget) => {
                const Component = widgetComponents[widget.type] ?? WidgetActivity;
                return <Component key={widget.title} title={widget.title} />;
              })}
            </div>
          </SectionContainer>

          {/* Notifications sidebar */}
          <aside aria-label="Notifications">
            <Card
              title="Peringatan Terbaru"
              description="Notifikasi untuk peran Anda."
              headerActions={<Button variant="ghost" size="sm">Lihat semua</Button>}
            >
              <ul className="space-y-3" aria-label="Notification list">
                {roleNotifications.map((n) => (
                  <li key={n.title} className="rounded-2xl border border-slate-100 bg-white/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{n.description}</p>
                      </div>
                      <StatusBadge status={n.type} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Insights mini-charts */}
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white/85 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Tren Kehadiran</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Siklus Saat Ini</p>
                <div className="mt-4 h-36" aria-label="Attendance trend chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={employeeMetrics.attendance} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(148,163,184,0.10)" vertical={false} />
                      <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                      <Area type="monotone" dataKey="value" stroke="#22c55e" fill="rgba(34,197,94,0.12)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/85 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Penyelesaian Pelatihan</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Tingkat Partisipasi</p>
                <div className="mt-4 h-36" aria-label="Training completion chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeeMetrics.trainingCompletion} margin={{ top: 4, right: 0, left: -16, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(148,163,184,0.10)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                      <Bar dataKey="value" fill="#818cf8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
