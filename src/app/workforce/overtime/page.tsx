'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { overtimeOverview, overtimeRequests } from '@/lib/workforce-data';

export default function WorkforceOvertimePage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredOvertime = useMemo(() => {
    const query = search.toLowerCase();
    return overtimeRequests.filter((request) => {
      const matchesSearch =
        request.employee.toLowerCase().includes(query) ||
        request.department.toLowerCase().includes(query) ||
        request.reason.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || request.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof overtimeRequests[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'date', header: 'Date' },
      { accessorKey: 'hours', header: 'Hours' },
      { accessorKey: 'reason', header: 'Reason' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Approved'
              ? 'bg-emerald-500/15 text-emerald-200'
              : value === 'Pending'
              ? 'bg-amber-500/15 text-amber-200'
              : 'bg-rose-500/15 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link href="/workforce/overtime" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400">
            Review <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredOvertime,
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
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Workforce / Overtime</p>
            <h1 className="text-3xl font-semibold text-slate-100">Overtime dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Track overtime requests, approvals and operational capacity for your teams.</p>
          </div>
          <Link href="/workforce" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400">
            Back to workforce
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 xl:grid-cols-4">
        {overtimeOverview.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{item.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Overtime detail</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">Approval timeline</h2>
          </div>
          <div className="rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">Request review</div>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-slate-400">
          <p>Each request includes hours, reason and approval status to help managers make quick decisions.</p>
          <div className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-sm font-semibold text-slate-100">Manager comment</p>
            <p className="mt-2 text-slate-400">Verify workload and business need before approving overtime.</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Overtime table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">Pending requests</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="rounded-full px-5 py-3">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee, reason or department"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
