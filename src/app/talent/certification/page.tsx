'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Award, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { certifications } from '@/lib/talent-data';

export default function TalentCertificationPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredCerts = useMemo(() => {
    const query = search.toLowerCase();
    return certifications.filter((cert) => {
      const matchesSearch =
        cert.employee.toLowerCase().includes(query) ||
        cert.certification.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || cert.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof certifications[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'certification', header: 'Certification' },
      { accessorKey: 'issuer', header: 'Issuer' },
      { accessorKey: 'issuedDate', header: 'Issued date' },
      { accessorKey: 'expiryDate', header: 'Expiry date' },
      { accessorKey: 'credentialId', header: 'Credential ID' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Active'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'Expiring'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/talent/certification" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-blue-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredCerts,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const metrics = [
    { label: 'Active certifications', value: '156', subtext: 'Current & valid' },
    { label: 'Expiring soon', value: '3', subtext: 'Next 90 days' },
    { label: 'Expired', value: '1', subtext: 'Action required' },
    { label: 'Renewal rate', value: '92%', subtext: 'Historical' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Talent / Certification</p>
            <h1 className="text-3xl font-semibold text-slate-900">Certification management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Track employee certifications, expiry dates, and renewal requirements.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-500">
            Back to talent
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.subtext}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-4">
            <AlertCircle className="h-5 w-5 mt-0.5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-200">Expiring soon</p>
              <p className="text-sm text-amber-100 mt-1">Zoe Kim's CSPO certification expires on 2026-11-20 (147 days).</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-3xl border border-rose-500/20 bg-rose-500/5 p-4">
            <AlertCircle className="h-5 w-5 mt-0.5 text-rose-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-rose-200">Expired</p>
              <p className="text-sm text-rose-100 mt-1">Maya Thompson's SHRM certification expired on 2026-05-10. Renewal recommended.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Certification table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">All certifications</h2>
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
              placeholder="Search employee, certification, or issuer"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring">Expiring</option>
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
