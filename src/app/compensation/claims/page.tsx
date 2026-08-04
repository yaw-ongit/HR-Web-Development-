'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, FileText, AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { claimTrendData } from '@/lib/compensation-data';
import { CompensationService } from '@/lib/services';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

export default function ClaimsPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [claimStatus, setClaimStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [insurances, setInsurances] = useState<any[]>([]);
  const [form, setForm] = useState({
    employee_id: '',
    employee_insurance_id: '',
    description: '',
    claimed_amount: '',
    claim_date: new Date().toISOString().split('T')[0]
  });

  const loadData = () => {
    CompensationService.getClaims().then((data) => {
      if (data.data && Array.isArray(data.data)) setDataList(data.data);
    });
  };

  useEffect(() => {
    loadData();
    CompensationService.getBpjsRecords().then((res) => {
      if (res.data && Array.isArray(res.data)) setInsurances(res.data);
    });
    import('@/lib/services').then(({ PeopleService }) => {
      PeopleService.getEmployees().then((res) => {
        if (Array.isArray(res.data)) setEmployees(res.data);
      });
    });
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      claimed_amount: Number(form.claimed_amount),
      status: 'DIAJUKAN',
      claim_number: 'CLM-' + Math.floor(1000 + Math.random() * 9000)
    };
    const { error } = await CompensationService.createClaim(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal mengajukan klaim: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Klaim berhasil diajukan!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employee', 'claimType', 'amount', 'submissionDate', 'status', 'approver'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header)).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'claims-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = async () => {
    const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id);
    if (selectedIds.length === 0) {
      addToast({ title: 'Pilih data', description: 'Pilih klaim yang akan disetujui.', variant: 'warning' });
      return;
    }
    for (const id of selectedIds) {
      await CompensationService.updateClaimStatus(id, 'DISETUJUI');
    }
    addToast({ title: 'Berhasil', description: 'Klaim disetujui.', variant: 'success' });
    loadData();
    setRowSelection({});
  };

  const handleRejectSubmit = async () => {
    const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id);
    for (const id of selectedIds) {
      await CompensationService.updateClaimStatus(id, 'DITOLAK', undefined, rejectReason);
    }
    addToast({ title: 'Klaim Ditolak', description: 'Klaim telah ditolak.', variant: 'success' });
    setRejectDialogOpen(false);
    setRejectReason('');
    loadData();
    setRowSelection({});
  };

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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input type="checkbox" aria-label="Select all rows" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-400 bg-secondary text-primary focus:ring-brand-500" />
        ),
        cell: ({ row }) => (
          <input type="checkbox" aria-label={`Select row`} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-slate-400 bg-secondary text-primary focus:ring-brand-500" />
        ),
      },
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'claimType', header: 'Claim Type' },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ getValue }) => `Rp ${(getValue() as number).toLocaleString('id-ID')}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
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
            <Button onClick={handleApprove} variant="primary" className="rounded-full px-5 py-3">
              Approve Selected
            </Button>
            <Button onClick={() => {
                if (table.getSelectedRowModel().rows.length === 0) {
                  addToast({ title: 'Pilih data', description: 'Pilih klaim yang akan ditolak.', variant: 'warning' });
                  return;
                }
                setRejectDialogOpen(true);
              }} variant="destructive" className="rounded-full px-5 py-3">
              Reject Selected
            </Button>
            <Button onClick={() => setIsAddOpen(true)} variant="secondary" className="rounded-full px-5 py-3">
              <Plus className="h-4 w-4" /> Klaim Baru
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-claim')?.focus()}>
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-claim"
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

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Klaim Baru" description="Masukkan data klaim baru.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Karyawan</label>
              <select required value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Karyawan</option>
                {employees?.map((emp: any) => <option key={emp.id} value={emp.id}>{emp.fullName}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Asuransi Terkait</label>
              <select required value={form.employee_insurance_id} onChange={e => setForm({...form, employee_insurance_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Polis Asuransi</option>
                {insurances?.map((ins: any) => <option key={ins.id} value={ins.id}>{ins.policyNumber} - {ins.provider}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Deskripsi / Jenis Klaim</label>
              <input required type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tanggal Klaim</label>
              <input required type="date" value={form.claim_date} onChange={e => setForm({...form, claim_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Jumlah (Rp)</label>
              <input required type="number" value={form.claimed_amount} onChange={e => setForm({...form, claimed_amount: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Ajukan</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} title="Tolak Klaim" description="Masukkan alasan penolakan klaim ini.">
        <div className="mt-4">
          <textarea
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none"
            rows={4}
            placeholder="Alasan penolakan..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setRejectDialogOpen(false)}>Batal</Button>
          <Button variant="destructive" onClick={handleRejectSubmit}>Tolak Klaim</Button>
        </div>
      </Dialog>
    </div>
  );
}
