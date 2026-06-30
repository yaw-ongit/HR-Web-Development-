'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { hiring } from '@/lib/talent-data';

export default function TalentHiringPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredHiring = useMemo(() => {
    const query = search.toLowerCase();
    return hiring.filter((record) => {
      const matchesSearch =
        record.candidate.toLowerCase().includes(query) ||
        record.position.toLowerCase().includes(query) ||
        record.department.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || record.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof hiring[number]>[]>(
    () => [
      { accessorKey: 'candidate', header: 'Candidate' },
      { accessorKey: 'position', header: 'Position' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'manager', header: 'Manager' },
      { accessorKey: 'hireDate', header: 'Hire date' },
      { accessorKey: 'salaryBand', header: 'Salary band' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Accepted'
              ? 'bg-emerald-500/15 text-emerald-200'
              : value === 'Offer Extended'
              ? 'bg-sky-500/15 text-sky-200'
              : 'bg-amber-500/15 text-amber-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/talent/hiring" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredHiring,
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
    { label: 'Offers extended', value: '6', subtext: 'Pending response' },
    { label: 'Accepted', value: '14', subtext: 'This quarter' },
    { label: 'Offer acceptance rate', value: '88%', subtext: 'Historical' },
    { label: 'Time to hire', value: '24 days', subtext: 'Average' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Talent / Hiring</p>
            <h1 className="text-3xl font-semibold text-slate-100">Offer management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Track offer extensions, acceptances, and prepare candidates for onboarding.</p>
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

      <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Hiring table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">Offer pipeline</h2>
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
              placeholder="Search candidate, position, or department"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
            <option value="All">All statuses</option>
            <option value="Offer Extended">Offer Extended</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Onboarding">Onboarding</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
