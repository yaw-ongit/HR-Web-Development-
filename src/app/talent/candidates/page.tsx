'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { candidates, candidatePipeline } from '@/lib/talent-data';

export default function TalentCandidatesPage() {
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredCandidates = useMemo(() => {
    const query = search.toLowerCase();
    return candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.position.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query);

      const matchesStage = stage === 'All' || candidate.stage === stage;
      return matchesSearch && matchesStage;
    });
  }, [search, stage]);

  const columns = useMemo<ColumnDef<typeof candidates[number]>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'position', header: 'Position' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      {
        accessorKey: 'stage',
        header: 'Stage',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Qualified'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'Screening'
              ? 'bg-brand-50 text-brand-500'
              : value === 'New'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/talent/candidates" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-brand-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredCandidates,
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
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Talent / Recruitment</p>
            <h1 className="text-3xl font-semibold text-slate-900">Pipeline kandidat</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Lacak kemajuan kandidat dari pengajuan hingga penyaringan dan kualifikasi.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-500">
            Kembali ke Talent
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {candidatePipeline.map((item) => (
          <Card key={item.stage} className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.stage}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.count}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Tabel kandidat</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Kandidat aktif</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="rounded-full px-5 py-3">
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, posisi, atau email"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={stage} onChange={(event) => setStage(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500">
            <option value="All">All stages</option>
            <option value="New">New</option>
            <option value="Screening">Screening</option>
            <option value="Qualified">Qualified</option>
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
