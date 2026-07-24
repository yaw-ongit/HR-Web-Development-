'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { claims, claimTrendData } from '@/lib/compensation-data';
import { CompensationService } from '@/lib/services';

export default function ClaimsPage() {
  const [dataList, setDataList] = useState<any[]>(claims);
  const [search, setSearch] = useState('');
  const [claimStatus, setClaimStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    CompensationService.getClaims(claims).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setDataList(data);
      }
    });
  }, []);

  const filteredClaims = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((claim) => {
      const matchesSearch =
        claim.employee.toLowerCase().includes(query) ||
        claim.claimType.toLowerCase().includes(query) ||
        claim.approver.toLowerCase().includes(query);

      const matchesStatus = claimStatus === 'All' || claim.status === claimStatus;

      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, claimStatus]);

  const columns = useMemo<ColumnDef<typeof claims[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'claimType', header: 'Claim Type' },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return `Rp ${(value / 1000000).toFixed(1)}M`;
        },
      },
      { accessorKey: 'submissionDate', header: 'Submission Tanggal' },
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
              : value === 'Diproses'
              ? 'bg-brand-50 text-primary'
              : value === 'Ditolak'
              ? 'bg-rose-50 text-rose-200'
              : 'bg-slate-600/15 text-muted-foreground';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      { accessorKey: 'approver', header: 'Penyetuju' },
      {
        id: 'actions',
        header: 'Aksi',
        cell: () => (
          <Link href="/compensation/claims" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredClaims,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const pendingClaims = dataList.filter((c) => c.status === 'Menunggu').length;
  const approvedClaims = dataList.filter((c) => c.status === 'Disetujui').length;
  const rejectedClaims = dataList.filter((c) => c.status === 'Ditolak').length;
  const processingClaims = dataList.filter((c) => c.status === 'Diproses').length;
  const totalClaimAmount = dataList.reduce((sum, c) => sum + c.amount, 0);
  const approvedAmount = dataList.filter((c) => c.status === 'Disetujui').reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Compensation / Claims</p>
            <h1 className="text-3xl font-semibold text-foreground">Claims Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Track and manage employee insurance and benefit claims with approval workflows.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Total Claims</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{dataList.length}</p>
          <p className="mt-2 text-sm text-muted">All submissions</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Menunggu Claims</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{pendingClaims}</p>
          <p className="mt-2 text-sm text-amber-600">Awaiting review</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Disetujui Claims</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{approvedClaims}</p>
          <p className="mt-2 text-sm text-emerald-600">Rp {(approvedAmount / 1000000).toFixed(0)}M approved</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Rejection Rate</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{dataList.length > 0 ? Math.round((rejectedClaims / dataList.length) * 100) : 0}%</p>
          <p className="mt-2 text-sm text-muted">{rejectedClaims} rejected</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Claim status</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">Workflow Status</h2>
          <div className="mt-6 space-y-3">
            {[
              { label: 'Menunggu Review', count: pendingClaims, color: 'amber' },
              { label: 'Processing', count: processingClaims, color: 'sky' },
              { label: 'Disetujui', count: approvedClaims, color: 'emerald' },
              { label: 'Ditolak', count: rejectedClaims, color: 'rose' },
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl bg-card/80 p-3 border border-${item.color}-500/20`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <span className={`text-sm font-semibold text-${item.color}-400`}>{item.count} claims</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Processing</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">Menunggu Actions</h2>
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Rini Kusuma - CLM003</p>
                <p className="text-xs text-muted mt-1">Accident Insurance - Rp 5M (4 days pending)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Dodi Hermawan - CLM005</p>
                <p className="text-xs text-muted mt-1">Medical Outpatient - Ditolak (2 days ago)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Ahmad Wijaya - CLM006</p>
                <p className="text-xs text-muted mt-1">Medical Preventive - Rp 800K (1 day pending)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Analytics</p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">Monthly Trend</h2>
        <div className="mt-6 space-y-2">
          {claimTrendData.map((month) => {
            const total = month.submitted;
            const approvedWidth = (month.approved / total) * 100;
            const rejectedWidth = (month.rejected / total) * 100;
            const processingWidth = (month.processing / total) * 100;

            return (
              <div key={month.month}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-muted-foreground">{month.month}</span>
                  <span className="text-xs text-muted">{total} claims</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-secondary/80">
                  <div className="bg-emerald-500" style={{ width: `${approvedWidth}%` }} />
                  <div className="bg-brand-600" style={{ width: `${processingWidth}%` }} />
                  <div className="bg-rose-500" style={{ width: `${rejectedWidth}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Claims table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">All claims</h2>
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
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee or claim type"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={claimStatus} onChange={(event) => setClaimStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Processing">Processing</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
