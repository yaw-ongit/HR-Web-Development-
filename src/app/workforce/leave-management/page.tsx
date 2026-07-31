'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, CheckCircle2, ClipboardList, Download, Filter } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { leaveCalendar, leaveOverview, leaveTypes, workforceDepartmentOptions } from '@/lib/workforce-data';
import { WorkforceService } from '@/lib/services';

export default function WorkforceLeaveManagementPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [leaveTypesData, setLeaveTypesData] = useState<any[]>([]);
  const [form, setForm] = useState({
    leave_type_id: '',
    start_date: '',
    end_date: '',
    reason: ''
  });

  const loadData = () => {
    WorkforceService.getLeaveRequests().then((result) => {
      if (Array.isArray(result.data)) setDataList(result.data);
    });
  };

  useEffect(() => {
    loadData();
    WorkforceService.getLeaveTypes().then(setLeaveTypesData);
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const startDate = new Date(form.start_date);
    const endDate = new Date(form.end_date);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const payload = {
      ...form,
      total_days: totalDays,
      employee_id: 'e0000000-0000-0000-0000-000000000001',
      status: 'DIAJUKAN',
      approver_id: 'e0000000-0000-0000-0000-000000000002'
    };
    const { error } = await WorkforceService.createLeaveRequest(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal mengajukan cuti: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Permintaan cuti berhasil diajukan!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleApprove = async () => {
    const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id);
    if (selectedIds.length === 0) {
      addToast({ title: 'Pilih data', description: 'Pilih setidaknya satu permintaan cuti untuk disetujui.', variant: 'warning' });
      return;
    }
    const { error } = await WorkforceService.updateLeaveRequestStatus(selectedIds, 'Disetujui');
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menyetujui cuti: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Cuti disetujui', description: `${selectedIds.length} permintaan cuti telah berhasil disetujui.`, variant: 'success' });
      // Refresh data
      WorkforceService.getLeaveRequests().then((result) => {
        if (Array.isArray(result.data)) setDataList(result.data);
      });
      setRowSelection({});
    }
  };

  const handleReject = async () => {
    setRejectDialogOpen(false);
    const selectedIds = table.getSelectedRowModel().rows.map(r => r.original.id);
    if (selectedIds.length === 0) return;
    
    const { error } = await WorkforceService.updateLeaveRequestStatus(selectedIds, 'Ditolak');
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menolak cuti: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Cuti ditolak', description: `${selectedIds.length} permintaan cuti telah ditolak.`, variant: 'danger' });
      WorkforceService.getLeaveRequests().then((result) => {
        if (Array.isArray(result.data)) setDataList(result.data);
      });
      setRowSelection({});
    }
  };



  const filteredLeaves = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((request) => {
      const matchesSearch =
        request.employee.toLowerCase().includes(query) ||
        request.leaveType.toLowerCase().includes(query) ||
        request.approver.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || request.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'leaveType', header: 'Leave type' },
      { accessorKey: 'startDate', header: 'Start date' },
      { accessorKey: 'endDate', header: 'End date' },
      { accessorKey: 'duration', header: 'Durasi' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      { accessorKey: 'approver', header: 'Penyetuju' },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <Link href="/workforce/leave-management" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
            Review <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredLeaves,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employee', 'leaveType', 'startDate', 'endDate', 'duration', 'status', 'approver'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header)).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'leave-requests.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Workforce / Manajemen Cuti</p>
            <h1 className="text-3xl font-semibold text-foreground">Dasbor Cuti</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Workspace terpusat untuk permintaan cuti, saldo, dan persetujuan.</p>
          </div>
          <Link href="/workforce" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Kembali ke Workforce
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 xl:grid-cols-3">
        {[
          { label: 'Leave requests', value: `${leaveOverview.requests}` },
          { label: 'Menunggu', value: `${leaveOverview.pending}` },
          { label: 'Disetujui', value: `${leaveOverview.approved}` },
          { label: 'Ditolak', value: `${leaveOverview.rejected}` },
          { label: 'Leave balance', value: leaveOverview.balance },
        ].map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Leave types</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Company leave programs</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {leaveTypes.map((type) => (
              <div key={type} className="rounded-3xl bg-card/80 p-4">
                <p className="text-sm font-semibold text-foreground">{type}</p>
                <p className="mt-2 text-sm text-muted">Dikelola melalui alur kerja HR dan jalur persetujuan.</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Approval panel</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Menunggu leave actions</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm text-muted">
            <p>Review leave requests, add comments, and move requests through the workflow.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={handleApprove} variant="primary" className="rounded-full px-5 py-3">Approve Selected</Button>
              <Button onClick={() => {
                if (table.getSelectedRowModel().rows.length === 0) {
                  addToast({ title: 'Pilih data', description: 'Pilih setidaknya satu permintaan cuti.', variant: 'warning' });
                  return;
                }
                setRejectDialogOpen(true);
              }} variant="destructive" className="rounded-full px-5 py-3">Reject Selected</Button>
              <Button comingSoon variant="secondary" className="rounded-full px-5 py-3">Request revision</Button>
              <Button comingSoon variant="ghost" className="rounded-full px-5 py-3">Add comment</Button>
            </div>
          </div>
        </Card>

        <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} title="Tolak Cuti" description="Apakah Anda yakin ingin menolak permintaan cuti ini? Tindakan ini tidak dapat dibatalkan.">
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setRejectDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleReject}>Tolak Cuti</Button>
          </div>
        </Dialog>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Kalender Cuti</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Team leave schedule</h2>
            </div>
            <div className="text-sm text-muted">Color coded for approvals and planned time away.</div>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.2em] text-muted">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {leaveCalendar.map((day) => (
              <div key={day.day} className={`${day.color} rounded-3xl p-2 text-xs`}>
                <p className="font-semibold text-foreground">{day.day}</p>
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{day.status}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Leave balance</p>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>Monitor leave availability and balance before approving new requests.</p>
            <div className="rounded-3xl bg-card/80 p-4">
              <p className="text-sm font-semibold text-foreground">Current balance</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{leaveOverview.balance}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Tabel Cuti</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Request pipeline</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={handleExportTable} className="rounded-full px-5 py-3">
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button comingSoon variant="ghost" className="rounded-full px-5 py-3">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <label htmlFor="search-leave" className="sr-only">Cari Cuti</label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-leave"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari karyawan, jenis cuti atau pemberi persetujuan"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="sr-only">Filter Status</label>
            <select id="filter-status" value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
              <option value="All">Semua status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
          </div>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Ajukan Cuti" description="Isi form untuk mengajukan cuti baru.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Jenis Cuti</label>
              <select required value={form.leave_type_id} onChange={e => setForm({...form, leave_type_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Jenis</option>
                {leaveTypesData?.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tanggal Mulai</label>
                <input required type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tanggal Selesai</label>
                <input required type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Alasan</label>
              <textarea required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} rows={3} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Ajukan</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
