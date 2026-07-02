'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { trainingPrograms } from '@/lib/talent-data';

export default function TalentTrainingPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredPrograms = useMemo(() => {
    const query = search.toLowerCase();
    return trainingPrograms.filter((program) => {
      const matchesSearch =
        program.employee.toLowerCase().includes(query) ||
        program.program.toLowerCase().includes(query) ||
        program.provider.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || program.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof trainingPrograms[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'program', header: 'Program' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'startDate', header: 'Start date' },
      { accessorKey: 'endDate', header: 'End date' },
      {
        accessorKey: 'progress',
        header: 'Progress',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return (
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: `${value}%` }} />
              </div>
              <span className="text-sm text-slate-400">{value}%</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Completed'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'In Progress'
              ? 'bg-blue-50 text-blue-500'
              : value === 'Scheduled'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/talent/training" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-blue-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredPrograms,
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
    { label: 'Program aktif', value: '28', subtext: 'Sedang berjalan' },
    { label: 'Sertifikasi bulan ini', value: '31', subtext: 'Sertifikasi' },
    { label: 'Sedang berlangsung', value: '30', subtext: 'Pelatihan aktif' },
    { label: 'Tingkat putus', value: '4.6%', subtext: 'Kuartal ini' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Talent / Pelatihan</p>
            <h1 className="text-3xl font-semibold text-slate-900">Pelatihan & pengembangan</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Lacak program pelatihan karyawan, kemajuan, dan penyelesaian untuk pengembangan keterampilan.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-500">
            Kembali ke Talent
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Tabel pelatihan</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Program aktif</h2>
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
              placeholder="Cari karyawan, program, atau penyedia"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500">
            <option value="All">All statuses</option>
            <option value="Completed">Selesai</option>
            <option value="In Progress">Sedang Berlangsung</option>
            <option value="Scheduled">Terjadwal</option>
            <option value="Cancelled">Dibatalkan</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
