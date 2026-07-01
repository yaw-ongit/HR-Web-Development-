'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { onboardingTasks } from '@/lib/talent-data';

export default function TalentOnboardingPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase();
    return onboardingTasks.filter((task) => {
      const matchesSearch =
        task.employee.toLowerCase().includes(query) ||
        task.task.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || task.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof onboardingTasks[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'task', header: 'Task' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'assignedTo', header: 'Assigned to' },
      { accessorKey: 'dueDate', header: 'Due date' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Completed'
              ? 'bg-emerald-500/15 text-emerald-200'
              : value === 'In Progress'
              ? 'bg-sky-500/15 text-sky-200'
              : 'bg-amber-500/15 text-amber-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/talent/onboarding" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400">
            Update <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredTasks,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const taskCategories = [
    { category: 'IT', tasks: 4, icon: '💻' },
    { category: 'HR', tasks: 3, icon: '📋' },
    { category: 'Facility', tasks: 2, icon: '🏢' },
    { category: 'Training', tasks: 3, icon: '📚' },
    { category: 'Documentation', tasks: 2, icon: '📄' },
  ];

  const metrics = [
    { label: 'Active onboarding', value: '4', subtext: 'Employees' },
    { label: 'Tasks pending', value: '15', subtext: 'This week' },
    { label: 'Completed', value: '8', subtext: 'This week' },
    { label: 'Avg time', value: '7 days', subtext: 'To full onboarding' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Talent / Onboarding</p>
            <h1 className="text-3xl font-semibold text-slate-100">New employee onboarding</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Track onboarding tasks, assignments, and new employee readiness across departments.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400">
            Back to talent
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.subtext}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {taskCategories.map((item) => (
          <Card key={item.category} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.category}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{item.tasks} tasks</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Onboarding table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">Task checklist</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="rounded-full px-5 py-3">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee, task, or category"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
            <option value="All">All statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
