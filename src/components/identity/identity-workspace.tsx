'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Archive, Download, Eye, FileDown, FileSpreadsheet, Filter, KeyRound, LockKeyhole, LogOut, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { SectionContainer } from '@/components/layout/section-container';
import {
  SessionRecord,
  LoginHistoryRecord,
  activeSessions,
  authProviderReadiness,
  identityKpis,
  identitySections,
  identityUsers,
  loginHistory,
  loginTrend,
  notificationPreferences,
  notifications,
  passwordPolicies,
  profilePreference,
  roleVisibility,
  securityCards,
  sessionDistribution,
} from '@/lib/identity-data';

type IdentityWorkspaceProps = {
  section?: string;
};

const chartColors = ['#38bdf8', '#34d399', '#f59e0b', '#a78bfa'];

function titleFromSection(section?: string) {
  if (!section) return 'Security Dashboard';
  return section.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');
}

function StatusBadge({ value }: { value: string }) {
  const color =
    value === 'Success' || value === 'Current' || value === 'Trusted' || value === 'Good' || value === 'Aktif'
      ? 'bg-emerald-50 text-emerald-200'
      : value === 'Failed' || value === 'Suspicious' || value === 'Review' || value === 'High'
        ? 'bg-amber-50 text-amber-200'
        : value === 'Blocked' || value === 'Disabled'
          ? 'bg-rose-50 text-rose-200'
          : 'bg-brand-50 text-brand-500';

  return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
}

function ExportButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" className="rounded-full px-4 py-2 text-xs"><FileDown className="h-4 w-4" /> PDF</Button>
      <Button variant="secondary" className="rounded-full px-4 py-2 text-xs"><FileSpreadsheet className="h-4 w-4" /> Excel</Button>
      <Button variant="ghost" className="rounded-full px-4 py-2 text-xs"><Download className="h-4 w-4" /> CSV</Button>
    </div>
  );
}

function IdentityShell({ children, section }: { children: React.ReactNode; section?: string }) {
  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="rounded-[28px] border border-slate-200 bg-slate-50/95 px-6 py-6 shadow-card">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Identity</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{titleFromSection(section)}</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-400">
              Enterprise identity, authentication, authorization, sessions, notifications, preferences and security controls prepared for future provider integration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/login"><Button className="rounded-full px-5 py-3"><KeyRound className="h-4 w-4" /> Login</Button></Link>
            <Button variant="secondary" className="rounded-full px-5 py-3"><SlidersHorizontal className="h-4 w-4" /> Policies</Button>
            <ExportButtons />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {identitySections.map((item) => {
            const active = (!section && item.href === '/identity') || (section && item.href.endsWith(section));
            return (
              <Link key={item.label} href={item.href} className={`rounded-3xl border px-4 py-3 text-sm transition ${active ? 'border-brand-500 bg-brand-50/50 text-sky-100' : 'border-slate-200 bg-white/70 text-slate-700 hover:border-brand-500'}`}>
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-brand-600" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {children}
    </div>
  );
}

function DashboardView() {
  const [search, setSearch] = useState('');
  const users = useMemo(() => {
    const query = search.toLowerCase();
    return identityUsers.filter((user) => `${user.name} ${user.email} ${user.employeeId} ${user.department} ${user.role} ${user.status}`.toLowerCase().includes(query));
  }, [search]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {identityKpis.map((kpi) => (
          <Card key={kpi.label} className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{kpi.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{kpi.value}</p>
            <p className="mt-2 text-sm text-slate-400">{kpi.note}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card title="Global user search" description="Search by user, role, department, status or employee ID.">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search identity users" className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500" />
          </div>
          <div className="mt-5 grid gap-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.employeeId} className="rounded-3xl border border-slate-200 bg-white/80 px-4 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{user.employeeId} - {user.department} - {user.role}</p>
                  </div>
                  <StatusBadge value={user.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Session distribution" description="Live access by device class.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sessionDistribution} dataKey="value" nameKey="name" innerRadius={58} outerRadius={96} paddingAngle={3}>
                  {sessionDistribution.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <LoginTrendChart />
    </>
  );
}

function LoginTrendChart() {
  return (
    <Card title="Login and failed-login trend" description="Authentication activity over the last seven days.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={loginTrend} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
            <Bar dataKey="success" fill="#38bdf8" radius={[12, 12, 0, 0]} />
            <Bar dataKey="failed" fill="#fb7185" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function AuthenticationView() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {authProviderReadiness.map((provider) => (
        <Card key={provider.name} className="p-6">
          <provider.icon className="h-7 w-7 text-brand-600" />
          <p className="mt-5 text-base font-semibold text-slate-900">{provider.name}</p>
          <p className="mt-2 text-sm text-slate-400">Frontend architecture placeholder for future authentication provider wiring.</p>
          <div className="mt-4"><StatusBadge value={provider.status} /></div>
        </Card>
      ))}
    </div>
  );
}

function ProfilePreferencesView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
      <Card title="Profile" description="Personal information and employee context.">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-[28px] bg-brand-50 text-2xl font-semibold text-slate-900">{profilePreference.avatar}</div>
          <div>
            <p className="text-xl font-semibold text-slate-900">{profilePreference.name}</p>
            <p className="text-sm text-slate-400">{profilePreference.position}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          {Object.entries(profilePreference).filter(([key]) => key !== 'avatar' && key !== 'name').map(([key, value]) => (
            <div key={key} className="rounded-3xl bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{key.replace(/([A-Z])/g, ' $1')}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </Card>
      <NotificationPreferenceGrid />
    </div>
  );
}

function SecurityCenterView() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {securityCards.map((card) => (
          <Card key={card.label} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{card.label}</p>
                <p className="mt-4 text-2xl font-semibold text-slate-900">{card.value}</p>
                <p className="mt-2 text-sm text-slate-400">{card.note}</p>
              </div>
              <StatusBadge value={card.status} />
            </div>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <PasswordSettingsView />
        <ActiveSessionsView compact />
      </div>
      <LoginHistoryView compact />
    </>
  );
}

function sessionColumns(): ColumnDef<SessionRecord>[] {
  return [
    { accessorKey: 'device', header: 'Device' },
    { accessorKey: 'browser', header: 'Browser' },
    { accessorKey: 'os', header: 'OS' },
    { accessorKey: 'ipAddress', header: 'IP address' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'lastActivity', header: 'Last activity' },
    { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <StatusBadge value={getValue() as string} /> },
    { id: 'actions', header: 'Aksi', cell: () => <button className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 hover:border-brand-500">Terminate</button> },
  ];
}

function ActiveSessionsView({ compact = false }: { compact?: boolean }) {
  const table = useReactTable({ data: compact ? activeSessions.slice(0, 3) : activeSessions, columns: sessionColumns(), getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel() });
  return (
    <SectionContainer title={compact ? 'Active sessions' : 'Enterprise active sessions'}>
      <div className="mb-4 flex flex-wrap gap-3">
        <Button variant="destructive" className="rounded-full"><LogOut className="h-4 w-4" /> Sign out all devices</Button>
        <Button variant="secondary" className="rounded-full"><ShieldCheck className="h-4 w-4" /> Trusted devices</Button>
      </div>
      <DataTable table={table} />
    </SectionContainer>
  );
}

function loginColumns(): ColumnDef<LoginHistoryRecord>[] {
  return [
    { accessorKey: 'timestamp', header: 'Timestamp' },
    { accessorKey: 'user', header: 'User' },
    { accessorKey: 'device', header: 'Device' },
    { accessorKey: 'browser', header: 'Browser' },
    { accessorKey: 'os', header: 'OS' },
    { accessorKey: 'ip', header: 'IP' },
    { accessorKey: 'result', header: 'Result', cell: ({ getValue }) => <StatusBadge value={getValue() as string} /> },
  ];
}

function LoginHistoryView({ compact = false }: { compact?: boolean }) {
  const table = useReactTable({ data: compact ? loginHistory.slice(0, 4) : loginHistory, columns: loginColumns(), getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel() });
  return (
    <>
      {!compact && (
        <Card title="Login filters" description="Filter by date, success, failed and location.">
          <div className="grid gap-3 md:grid-cols-4">
            {['Date', 'Success', 'Failed', 'Location'].map((label) => <select key={label} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900"><option>{label}</option></select>)}
          </div>
          <div className="mt-4"><Button variant="secondary" className="rounded-full"><Filter className="h-4 w-4" /> Apply filters</Button></div>
        </Card>
      )}
      <SectionContainer title={compact ? 'Recent login history' : 'Login history'}>
        <DataTable table={table} />
      </SectionContainer>
    </>
  );
}

function NotificationCenterView() {
  const tabs = ['Unread', 'Read', 'High Priority', 'System', 'HR', 'Training', 'Medical', 'Claims', 'Approvals'];
  const [tab, setTab] = useState('Unread');
  const filtered = notifications.filter((item) => {
    if (tab === 'Unread') return !item.read;
    if (tab === 'Read') return item.read;
    if (tab === 'High Priority') return item.priority === 'High';
    return item.category === tab;
  });

  return (
    <Card title="Notification center" description="Unread, read, high priority and category views for enterprise HR events.">
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-full border px-4 py-2 text-xs font-semibold ${tab === item ? 'border-brand-500 bg-brand-50/50 text-sky-100' : 'border-slate-200 bg-white/80 text-slate-700'}`}>{item}</button>)}
      </div>
      <div className="mt-6 grid gap-3">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-3xl bg-brand-50 text-sm font-semibold text-slate-900">{item.avatar}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-slate-900">{item.title}</p><StatusBadge value={item.priority} /></div>
                  <p className="mt-1 text-sm text-slate-400">{item.body}</p>
                  <p className="mt-2 text-xs text-slate-400">{item.category} - {item.timestamp}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="rounded-full px-3 py-2 text-xs">Action</Button>
                <Button variant="ghost" className="rounded-full px-3 py-2 text-xs"><Eye className="h-4 w-4" /> Mark read</Button>
                <Button variant="ghost" className="rounded-full px-3 py-2 text-xs"><Archive className="h-4 w-4" /> Archive</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NotificationPreferenceGrid() {
  return (
    <Card title="Notification preferences" description="Configure email, in-app, SMS placeholder and push placeholder delivery.">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead><tr className="text-xs uppercase tracking-[0.24em] text-slate-400">{['Category', 'Email', 'In-App', 'SMS Placeholder', 'Push Placeholder'].map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr></thead>
          <tbody>
            {notificationPreferences.map((preference, rowIndex) => (
              <tr key={preference} className="border-t border-slate-200">
                <td className="px-4 py-4 font-semibold text-slate-900">{preference}</td>
                {['Email', 'In-App', 'SMS', 'Push'].map((channel, index) => <td key={channel} className="px-4 py-4"><input type="checkbox" readOnly checked={index < 2 || rowIndex % 3 === index} className="h-4 w-4 rounded border-slate-400 bg-slate-100 text-brand-600" /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function PasswordSettingsView() {
  return (
    <Card title="Password settings" description="Password update UI prepared for future auth provider integration.">
      <div className="grid gap-4">
        {['Current password', 'New password', 'Confirm password'].map((label) => <input key={label} type="password" placeholder={label} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500" />)}
      </div>
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Password strength</p>
        <div className="mt-3 h-3 rounded-full bg-white"><div className="h-3 w-4/5 rounded-full bg-emerald-400" /></div>
      </div>
      <div className="mt-5 grid gap-2">
        {passwordPolicies.map((policy) => <div key={policy} className="flex items-center gap-2 text-sm text-slate-700"><LockKeyhole className="h-4 w-4 text-brand-600" />{policy}</div>)}
      </div>
    </Card>
  );
}

function MfaPlaceholderView() {
  return (
    <Card title="MFA placeholder" description="Prepared controls for future multi-factor authentication rollout.">
      <div className="grid gap-4 md:grid-cols-3">
        {['Authenticator app', 'SMS placeholder', 'Email one-time code'].map((item) => <div key={item} className="rounded-3xl border border-slate-200 bg-white/80 p-5"><ShieldCheck className="h-6 w-6 text-brand-600" /><p className="mt-4 font-semibold text-slate-900">{item}</p><p className="mt-2 text-sm text-slate-400">Ready for backend authentication integration.</p></div>)}
      </div>
    </Card>
  );
}

function RoleVisibilityView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {roleVisibility.map((role) => (
        <Card key={role.role} className="p-6">
          <p className={`text-lg font-semibold ${role.color}`}>{role.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {role.modules.map((module) => <span key={module} className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-700">{module}</span>)}
          </div>
        </Card>
      ))}
    </div>
  );
}

function SessionManagementView() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {['Current Session', 'Previous Sessions', 'Trusted Devices'].map((label, index) => (
          <Card key={label} className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{[1, 4, 3][index]}</p>
            <p className="mt-2 text-sm text-slate-400">Tracked by device, browser, operating system, IP and activity.</p>
          </Card>
        ))}
      </div>
      <ActiveSessionsView />
    </>
  );
}

function renderSection(section?: string) {
  switch (section) {
    case 'authentication':
      return <AuthenticationView />;
    case 'session-management':
      return <SessionManagementView />;
    case 'profile-preferences':
      return <ProfilePreferencesView />;
    case 'security-center':
      return <SecurityCenterView />;
    case 'notification-center':
      return <NotificationCenterView />;
    case 'notification-preferences':
      return <NotificationPreferenceGrid />;
    case 'login-history':
      return <LoginHistoryView />;
    case 'active-sessions':
      return <ActiveSessionsView />;
    case 'mfa-placeholder':
      return <MfaPlaceholderView />;
    case 'password-policies':
      return <PasswordSettingsView />;
    case 'role-visibility':
      return <RoleVisibilityView />;
    default:
      return <DashboardView />;
  }
}

export function IdentityWorkspace({ section }: IdentityWorkspaceProps) {
  return (
    <IdentityShell section={section}>
      {renderSection(section)}
      {section && !['login-history', 'active-sessions', 'password-policies'].includes(section) && <LoginTrendChart />}
    </IdentityShell>
  );
}
