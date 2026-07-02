'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { shiftOverview, shiftSchedules } from '@/lib/workforce-data';

export default function WorkforceShiftManagementPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredShifts = useMemo(() => {
    const query = search.toLowerCase();
    return shiftSchedules.filter((shift) => {
      const matchesSearch =
        shift.shiftName.toLowerCase().includes(query) ||
        shift.manager.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || shift.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof shiftSchedules[number]>[]>(
    () => [
      { accessorKey: 'shiftName', header: 'Shift name' },
      { accessorKey: 'employees', header: 'Employees' },
      { accessorKey: 'workingHours', header: 'Working hours' },
      { accessorKey: 'manager', header: 'Manager' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Active'
              ? 'bg-emerald-50 text-emerald-200'
              : 'bg-blue-50 text-blue-500';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link href="/workforce/shift-management" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-blue-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredShifts,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Workforce / Shift Management</p>
            <h1 className="text-3xl font-semibold text-slate-900">Shift dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Manage shift coverage, assignment and operational alignment in one place.</p>
          </div>
          <Link href="/workforce" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-500">
            Back to workforce
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 xl:grid-cols-4">
        {shiftOverview.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Shift table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Published shift plans</h2>
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
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search shift name or manager"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Planned">Planned</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Shift details</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Schedule coverage</h2>
          </div>
          <div className="rounded-full bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700">Overview</div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-sm text-slate-400">Assigned employees</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">328</p>
          </div>
          <div className="rounded-3xl bg-white/80 p-5">
            <p className="text-sm text-slate-400">Coverage</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">95%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
