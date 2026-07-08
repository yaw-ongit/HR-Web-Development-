'use client';

import Link from 'next/link';
import { ReactNode, useMemo, useState } from 'react';
import { ColumnDef, SortingState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  ArrowRight,
  Archive,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  Edit3,
  Eye,
  FileDown,
  FileSpreadsheet,
  Filter,
  History,
  Plus,
  Search,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { SectionContainer } from '@/components/layout/section-container';
import {
  accessDistribution,
  activityLogs,
  adminKpis,
  adminQuickActions,
  adminSections,
  adminUsers,
  approvalMatrix,
  auditLogs,
  changeTrend,
  companySettings,
  integrationCards,
  masterDataCategories,
  masterDataRecords,
  notificationTemplates,
  organizationNodes,
  permissionActions,
  permissionModules,
  permissionRoles,
  roleCatalog,
  systemPreferences,
  workflows,
  AuditRecord,
  MasterDataRecord,
  UserAdminRecord,
} from '@/lib/administration-data';

const pieColors = ['#38bdf8', '#34d399', '#f59e0b', '#a78bfa', '#fb7185'];

type AdministrationWorkspaceProps = {
  section?: string;
};

function titleFromSection(section?: string) {
  if (!section) return 'Administration Dashboard';
  return section.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');
}

function StatusBadge({ value }: { value: string }) {
  const color =
    value === 'Active' || value === 'Success' || value === 'Configured'
      ? 'bg-emerald-50 text-emerald-200'
      : value === 'Warning' || value === 'Review' || value === 'Draft' || value === 'Pending'
        ? 'bg-amber-50 text-amber-200'
        : value === 'Failed' || value === 'Disabled'
          ? 'bg-rose-50 text-rose-200'
          : 'bg-brand-50 text-brand-500';

  return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
}

function ExportButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" className="rounded-full px-4 py-2 text-xs">
        <FileDown className="h-4 w-4" /> PDF
      </Button>
      <Button variant="secondary" className="rounded-full px-4 py-2 text-xs">
        <FileSpreadsheet className="h-4 w-4" /> Excel
      </Button>
      <Button variant="ghost" className="rounded-full px-4 py-2 text-xs">
        <Download className="h-4 w-4" /> CSV
      </Button>
    </div>
  );
}

function AdminShell({ children, section }: { children: ReactNode; section?: string }) {
  const currentTitle = titleFromSection(section);

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="rounded-[28px] border border-slate-200 bg-slate-50/95 px-6 py-6 shadow-card">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Administration</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{currentTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-400">
              Enterprise control center for HR administrators and system administrators to govern data, identity, roles, workflows, integrations, auditability and platform preferences.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" className="rounded-full px-5 py-3">
              <Plus className="h-4 w-4" /> Create
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3">
              <SlidersHorizontal className="h-4 w-4" /> Configure
            </Button>
            <ExportButtons />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {adminSections.map((item) => {
            const active = (!section && item.href === '/administration') || (section && item.href.endsWith(section));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-3xl border px-4 py-3 text-sm transition ${
                  active ? 'border-brand-500 bg-brand-50/50 text-sky-100' : 'border-slate-200 bg-white/70 text-slate-700 hover:border-brand-500'
                }`}
              >
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
  const [globalSearch, setGlobalSearch] = useState('');
  const results = useMemo(() => {
    const query = globalSearch.toLowerCase();
    if (!query) return masterDataRecords.slice(0, 5);
    return masterDataRecords.filter((record) => `${record.name} ${record.code} ${record.owner}`.toLowerCase().includes(query)).slice(0, 8);
  }, [globalSearch]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => (
          <Card key={kpi.label} className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{kpi.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{kpi.value}</p>
            <p className="mt-2 text-sm text-slate-400">{kpi.note}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card title="Global master data search" description="Search across departments, positions, project sites, branches, benefit catalogs and compliance records.">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Search every master data catalog"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500"
            />
          </div>
          <div className="mt-5 grid gap-3">
            {results.map((record) => (
              <Link key={record.id} href="/administration/master-data" className="rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 transition hover:border-brand-500">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{record.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{record.code} - {record.owner} - {record.records} records</p>
                  </div>
                  <StatusBadge value={record.status} />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card title="Quick actions" description="High-frequency administration operations.">
          <div className="grid gap-3">
            {adminQuickActions.map((action) => (
              <Link key={action.label} href={action.href} className="rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 transition hover:border-brand-500">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-brand-50">
                      <action.icon className="h-4 w-4 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                      <p className="mt-1 text-xs text-slate-400">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card title="Recent changes and alerts" description="Configuration updates and system alerts over the last seven days.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={changeTrend} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminChanges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="changes" stroke="#38bdf8" fill="url(#adminChanges)" strokeWidth={3} />
                <Area type="monotone" dataKey="alerts" stroke="#fb7185" fill="#fb718533" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Access distribution" description="User population by role family.">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={accessDistribution} dataKey="value" nameKey="name" innerRadius={58} outerRadius={96} paddingAngle={3}>
                  {accessDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2">
            {accessDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl bg-white/80 px-3 py-2 text-sm">
                <span className="flex items-center gap-2 text-slate-700"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />{item.name}</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function MasterDataView() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => {
    const query = search.toLowerCase();
    return masterDataRecords.filter((record) => {
      const matchesSearch = `${record.name} ${record.code} ${record.owner} ${record.history}`.toLowerCase().includes(query);
      const matchesStatus = status === 'All' || record.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<MasterDataRecord>[]>(() => [
    { accessorKey: 'code', header: 'Code' },
    {
      accessorKey: 'name',
      header: 'Catalog',
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-900">{row.original.name}</p>
          <p className="text-xs text-slate-400">{row.original.history}</p>
        </div>
      ),
    },
    { accessorKey: 'owner', header: 'Owner' },
    { accessorKey: 'records', header: 'Records' },
    { accessorKey: 'updated', header: 'Updated' },
    { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <StatusBadge value={getValue() as string} /> },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex flex-wrap justify-end gap-2">
          <button className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 hover:border-brand-500"><Edit3 className="inline h-3.5 w-3.5" /> Edit</button>
          <button className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 hover:border-brand-500"><Archive className="inline h-3.5 w-3.5" /> Archive</button>
          <button className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 hover:border-brand-500"><History className="inline h-3.5 w-3.5" /> History</button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Card title="Master data catalogs" description="Departments, positions, job levels, employment types, branches, business units, project sites and enterprise reference data.">
        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.6fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search catalog, owner or history" className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-brand-500" />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500">
            <option>All</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
          <Button className="rounded-full px-5 py-3"><Plus className="h-4 w-4" /> New catalog</Button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {masterDataCategories.map((category) => (
            <span key={category} className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-700">{category}</span>
          ))}
        </div>
      </Card>
      <SectionContainer title="Enterprise master data table">
        <DataTable table={table} />
      </SectionContainer>
    </>
  );
}

function OrganizationView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
      <Card title="Interactive organization chart" description="Company to employee structure with expand, collapse, search, move employee and move department controls.">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" className="rounded-full"><Search className="h-4 w-4" /> Search</Button>
          <Button variant="secondary" className="rounded-full"><ChevronDown className="h-4 w-4" /> Expand</Button>
          <Button variant="ghost" className="rounded-full"><ChevronRight className="h-4 w-4" /> Collapse</Button>
          <Button className="rounded-full">Move employee</Button>
          <Button variant="outline" className="rounded-full">Move department</Button>
        </div>
        <div className="mt-8 space-y-4">
          {organizationNodes.map((node, index) => (
            <div key={node.level} className="relative rounded-3xl border border-slate-200 bg-white/80 p-4" style={{ marginLeft: `${Math.min(index * 18, 90)}px` }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-600">{node.level}</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{node.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{node.count}</p>
                </div>
                <StatusBadge value={node.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Structure health" description="Org governance checks.">
        <div className="space-y-3">
          {['Every active employee has a manager', '2 departments require backup approvers', '4 project sites pending geo-fence review', '1 vacant director position requires owner'].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-3xl bg-white/80 p-4">
              {index === 0 ? <Check className="h-5 w-5 text-emerald-300" /> : <ShieldAlert className="h-5 w-5 text-amber-300" />}
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function UserManagementView() {
  const columns = useMemo<ColumnDef<UserAdminRecord>[]>(() => [
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-brand-50 text-sm font-semibold text-slate-900">{row.original.avatar}</div>
          <div>
            <p className="font-semibold text-slate-900">{row.original.name}</p>
            <p className="text-xs text-slate-400">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { accessorKey: 'employeeId', header: 'Employee ID' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <StatusBadge value={getValue() as string} /> },
    { accessorKey: 'lastLogin', header: 'Last login' },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => <div className="flex flex-wrap justify-end gap-2">{['Reset password', 'Disable', 'Enable', 'Assign role', 'Activity'].map((action) => <button key={action} className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 hover:border-brand-500">{action}</button>)}</div>,
    },
  ], []);

  const table = useReactTable({ data: adminUsers, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel() });
  return <SectionContainer title="Enterprise user table"><DataTable table={table} /></SectionContainer>;
}

function RoleManagementView() {
  return (
    <div className="grid gap-4 xl:grid-cols-7">
      {roleCatalog.map((role) => (
        <Card key={role.role} className="p-5 xl:col-span-1">
          <p className="text-sm font-semibold text-slate-900">{role.role}</p>
          <p className="mt-3 text-2xl font-semibold text-brand-500">{role.users}</p>
          <p className="mt-1 text-xs text-slate-400">assigned users</p>
        </Card>
      ))}
      <Card title="Role detail" description="Permissions, accessible modules, approval rights and navigation visibility." className="xl:col-span-7">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roleCatalog.map((role) => (
            <div key={role.role} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
              <p className="text-base font-semibold text-slate-900">{role.role}</p>
              <p className="mt-3 text-sm text-slate-400">Modules: {role.modules}</p>
              <p className="mt-2 text-sm text-slate-400">Approval rights: {role.approvalRights}</p>
              <p className="mt-2 text-sm text-slate-400">Navigation: {role.visibility}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PermissionManagementView() {
  return (
    <Card title="Permission matrix" description="Rows are modules, columns are roles, and each role exposes Create, Read, Update, Delete, Approve, Export and Print capabilities.">
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-slate-50 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-400">Module</th>
              {permissionRoles.map((role) => <th key={role} className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">{role}</th>)}
            </tr>
          </thead>
          <tbody>
            {permissionModules.map((module, moduleIndex) => (
              <tr key={module} className="border-t border-slate-200">
                <td className="sticky left-0 bg-slate-50 px-4 py-4 font-semibold text-slate-900">{module}</td>
                {permissionRoles.map((role, roleIndex) => (
                  <td key={`${module}-${role}`} className="px-4 py-4">
                    <div className="grid grid-cols-7 gap-1">
                      {permissionActions.map((action, actionIndex) => {
                        const checked = role === 'Administrator' || role === 'HR Manager' || action === 'Read' || (roleIndex + moduleIndex + actionIndex) % 4 === 0;
                        return (
                          <label key={action} title={action} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white">
                            <input type="checkbox" checked={checked} readOnly className="h-3.5 w-3.5 rounded border-slate-400 bg-slate-100 text-brand-600" />
                          </label>
                        );
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function WorkflowView() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {workflows.map((workflow) => (
        <Card key={workflow.name} title={workflow.name} description={`${workflow.sla} - ${workflow.status}`}>
          <div className="flex flex-wrap items-center gap-3">
            {workflow.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className="rounded-3xl border border-brand-500/30 bg-brand-50/50 px-4 py-3 text-sm font-semibold text-sky-100">{step}</div>
                {index < workflow.steps.length - 1 && <ArrowRight className="h-4 w-4 text-slate-400" />}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ApprovalMatrixView() {
  return (
    <Card title="Approval matrix" description="Department approver, backup approver and approval-level governance.">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-800">
          <thead><tr className="text-xs uppercase tracking-[0.24em] text-slate-400">{['Department', 'Approval level', 'Approver', 'Backup approver', 'Status'].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>{approvalMatrix.map((row) => <tr key={row.department} className="border-t border-slate-200"><td className="px-4 py-4 font-semibold">{row.department}</td><td className="px-4 py-4">{row.level}</td><td className="px-4 py-4">{row.approver}</td><td className="px-4 py-4">{row.backup}</td><td className="px-4 py-4"><StatusBadge value={row.status} /></td></tr>)}</tbody>
        </table>
      </div>
    </Card>
  );
}

function CompanySettingsView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {companySettings.map((setting) => (
        <Card key={setting.label} className="p-6">
          <setting.icon className="h-6 w-6 text-brand-600" />
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-slate-400">{setting.label}</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{setting.value}</p>
        </Card>
      ))}
    </div>
  );
}

function NotificationView() {
  return (
    <Card title="Notification center" description="Manage email, in-app, SMS placeholder and push placeholder templates.">
      <div className="grid gap-3">
        {notificationTemplates.map((template) => (
          <div key={template.event} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{template.event}</p>
                <p className="mt-1 text-sm text-slate-400">{template.owner} - {template.channels.join(', ')}</p>
              </div>
              <StatusBadge value={template.status} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AuditLogView() {
  const columns = useMemo<ColumnDef<AuditRecord>[]>(() => [
    { accessorKey: 'timestamp', header: 'Timestamp' },
    { accessorKey: 'user', header: 'User' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'action', header: 'Action' },
    { accessorKey: 'module', header: 'Module' },
    { accessorKey: 'ipAddress', header: 'IP address' },
    { accessorKey: 'device', header: 'Device' },
    { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <StatusBadge value={getValue() as string} /> },
  ], []);
  const table = useReactTable({ data: auditLogs, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel() });
  return (
    <>
      <Card title="Audit filters" description="Date, module, user and action filters with timeline/table mode.">
        <div className="grid gap-3 md:grid-cols-4">
          {['Date range', 'Module', 'User', 'Action'].map((label) => <select key={label} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900"><option>{label}</option></select>)}
        </div>
        <div className="mt-4 flex gap-2"><Button variant="secondary" className="rounded-full"><Filter className="h-4 w-4" /> Timeline view</Button><Button variant="ghost" className="rounded-full"><Eye className="h-4 w-4" /> Table view</Button></div>
      </Card>
      <SectionContainer title="Enterprise audit viewer"><DataTable table={table} /></SectionContainer>
    </>
  );
}

function ActivityLogView() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {activityLogs.map((activity) => (
        <Card key={activity.detail} className="p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-600">{activity.category}</p>
          <p className="mt-3 text-base font-semibold text-slate-900">{activity.detail}</p>
          <p className="mt-2 text-sm text-slate-400">{activity.time}</p>
        </Card>
      ))}
    </div>
  );
}

function SystemPreferencesView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {systemPreferences.map((preference) => (
        <Card key={preference.label} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{preference.label}</p>
              <p className="mt-3 text-base font-semibold text-slate-900">{preference.value}</p>
            </div>
            <StatusBadge value={preference.status} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function IntegrationView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {integrationCards.map((integration) => (
        <Card key={integration.name} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <integration.icon className="h-7 w-7 text-brand-600" />
            <StatusBadge value={integration.status} />
          </div>
          <p className="mt-5 text-base font-semibold text-slate-900">{integration.name}</p>
          <p className="mt-2 text-sm text-slate-400">{integration.description}</p>
        </Card>
      ))}
    </div>
  );
}

function AnalyticsStrip() {
  return (
    <Card title="Administration volume" description="Configuration workload by day.">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={changeTrend} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.18)', color: '#e2e8f0' }} />
            <Bar dataKey="changes" fill="#38bdf8" radius={[12, 12, 0, 0]} />
            <Bar dataKey="alerts" fill="#fb7185" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function renderSection(section?: string) {
  switch (section) {
    case 'master-data':
      return <MasterDataView />;
    case 'organization-management':
      return <OrganizationView />;
    case 'user-management':
      return <UserManagementView />;
    case 'role-management':
      return <RoleManagementView />;
    case 'permission-management':
      return <PermissionManagementView />;
    case 'workflow-configuration':
      return <WorkflowView />;
    case 'approval-matrix':
      return <ApprovalMatrixView />;
    case 'company-settings':
      return <CompanySettingsView />;
    case 'notification-templates':
      return <NotificationView />;
    case 'audit-logs':
      return <AuditLogView />;
    case 'activity-logs':
      return <ActivityLogView />;
    case 'integration-settings':
      return <IntegrationView />;
    case 'system-preferences':
      return <SystemPreferencesView />;
    default:
      return <DashboardView />;
  }
}

export function AdministrationWorkspace({ section }: AdministrationWorkspaceProps) {
  return (
    <AdminShell section={section}>
      {renderSection(section)}
      {section && section !== 'audit-logs' && <AnalyticsStrip />}
    </AdminShell>
  );
}
