'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { overtimeOverview, overtimeRequests } from '@/lib/workforce-data';
import { WorkforceService } from '@/lib/services';

export default function WorkforceLemburPage() {
  const [dataList, setDataList] = useState<any[]>(overtimeRequests);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    WorkforceService.getOvertimeRequests(overtimeRequests).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setDataList(data);
      }
    });
  }, []);

  const filteredLembur = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((request) => {
      const matchesSearch =
        request.employee.toLowerCase().includes(query) ||
        request.department.toLowerCase().includes(query) ||
        request.reason.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || request.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, status]);

  const columns = useMemo<ColumnDef<typeof overtimeRequests[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'department', header: 'Departemen' },
      { accessorKey: 'date', header: 'Tanggal' },
      { accessorKey: 'hours', header: 'Jam' },
      { accessorKey: 'reason', header: 'Alasan' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Disetujui'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'Menunggu'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <Link href="/workforce/overtime" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
            Review <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredLembur,
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
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Workforce / Lembur</p>
            <h1 className="text-3xl font-semibold text-foreground">Dasbor lembur</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Lacak permintaan lembur, persetujuan, dan kapasitas operasional tim Anda.</p>
          </div>
          <Link href="/workforce" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Kembali ke Workforce
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 xl:grid-cols-4">
        {overtimeOverview.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Lembur detail</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Approval timeline</h2>
          </div>
          <div className="rounded-full bg-card/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">Request review</div>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-muted">
          <p>Each request includes hours, reason and approval status to help managers make quick decisions.</p>
          <div className="rounded-3xl bg-card/80 p-4">
            <p className="text-sm font-semibold text-foreground">Manajer comment</p>
            <p className="mt-2 text-muted">Verify workload and business need before approving overtime.</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Tabel lembur</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Permintaan tertunda</h2>
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
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari karyawan, alasan, atau departemen"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
