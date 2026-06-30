'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { medicalRecords } from '@/lib/compensation-data';

export default function MedicalPage() {
  const [search, setSearch] = useState('');
  const [medicalType, setMedicalType] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredRecords = useMemo(() => {
    const query = search.toLowerCase();
    return medicalRecords.filter((record) => {
      const matchesSearch =
        record.employee.toLowerCase().includes(query) ||
        record.department.toLowerCase().includes(query) ||
        record.provider.toLowerCase().includes(query);

      const matchesMedicalType = medicalType === 'All' || record.medicalType === medicalType;
      const matchesStatus = status === 'All' || record.status === status;

      return matchesSearch && matchesMedicalType && matchesStatus;
    });
  }, [search, medicalType, status]);

  const columns = useMemo<ColumnDef<typeof medicalRecords[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'medicalType', header: 'Medical Type' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'issueDate', header: 'Issue Date' },
      { accessorKey: 'expiryDate', header: 'Expiry Date' },
      {
        accessorKey: 'result',
        header: 'Result',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Fit'
              ? 'bg-emerald-500/15 text-emerald-200'
              : value === 'Conditional'
              ? 'bg-amber-500/15 text-amber-200'
              : value === 'Unfit'
              ? 'bg-rose-500/15 text-rose-200'
              : 'bg-slate-600/15 text-slate-300';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Completed'
              ? 'bg-emerald-500/15 text-emerald-200'
              : value === 'Expired'
              ? 'bg-rose-500/15 text-rose-200'
              : value === 'Scheduled'
              ? 'bg-sky-500/15 text-sky-200'
              : 'bg-amber-500/15 text-amber-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/compensation/medical" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredRecords,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const completedRecords = medicalRecords.filter((r) => r.status === 'Completed').length;
  const scheduledRecords = medicalRecords.filter((r) => r.status === 'Scheduled').length;
  const expiredRecords = medicalRecords.filter((r) => r.status === 'Expired').length;
  const fitRecords = medicalRecords.filter((r) => r.result === 'Fit').length;

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Compensation / Medical</p>
            <h1 className="text-3xl font-semibold text-slate-100">Medical Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Track employee medical check-ups (MCU), vaccinations, and medical compliance across all project sites.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Completed MCU</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{completedRecords}</p>
          <p className="mt-2 text-sm text-emerald-400">Current & valid</p>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Scheduled</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{scheduledRecords}</p>
          <p className="mt-2 text-sm text-sky-400">Upcoming checks</p>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Expired Medical</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{expiredRecords}</p>
          <p className="mt-2 text-sm text-rose-400">Renewal needed</p>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Fitness Rate</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">{Math.round((fitRecords / medicalRecords.length) * 100)}%</p>
          <p className="mt-2 text-sm text-emerald-400">Fit for duty</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Medical timeline</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-100">Compliance Status</h2>
          <div className="mt-6 space-y-3">
            {[
              { label: 'Fit for Duty', count: fitRecords, color: 'emerald', borderClass: 'border-emerald-500/20', textClass: 'text-emerald-400' },
              { label: 'Completed', count: completedRecords, color: 'sky', borderClass: 'border-sky-500/20', textClass: 'text-sky-400' },
              { label: 'Scheduled', count: scheduledRecords, color: 'amber', borderClass: 'border-amber-500/20', textClass: 'text-amber-400' },
              { label: 'Expired / Overdue', count: expiredRecords, color: 'rose', borderClass: 'border-rose-500/20', textClass: 'text-rose-400' },
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl bg-slate-950/80 p-3 border ${item.borderClass}`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-100">{item.label}</p>
                  <span className={`text-sm font-semibold ${item.textClass}`}>{item.count} records</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Expiry monitoring</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-100">Upcoming Expirations</h2>
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-slate-950/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-100">Ahmad Wijaya - MCU</p>
                <p className="text-xs text-slate-400 mt-1">Expires in 371 days (2027-06-19)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-slate-950/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-100">Siti Nurhaliza - MCU</p>
                <p className="text-xs text-slate-400 mt-1">Expires in 389 days (2027-07-19)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-rose-500/5 p-3 border border-rose-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-rose-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-100">Dodi Hermawan - MCU</p>
                <p className="text-xs text-slate-400 mt-1">Expired on 2025-09-11 (URGENT)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Medical table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">All medical records</h2>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee or provider"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <select value={medicalType} onChange={(event) => setMedicalType(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
            <option value="All">All types</option>
            <option value="MCU">MCU</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Health Check">Health Check</option>
            <option value="Specialist Review">Specialist Review</option>
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
            <option value="All">All statuses</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Overdue">Overdue</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
