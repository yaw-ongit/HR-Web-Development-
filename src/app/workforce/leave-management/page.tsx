'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, CheckCircle2, ClipboardList, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { leaveCalendar, leaveOverview, leaveRequests, leaveTypes, workforceDepartmentOptions } from '@/lib/workforce-data';

export default function WorkforceLeaveManagementPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredLeaves = useMemo(() => {
    const query = search.toLowerCase();
    return leaveRequests.filter((request) => {
      const matchesSearch =
        request.employee.toLowerCase().includes(query) ||
        request.leaveType.toLowerCase().includes(query) ||
        request.approver.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || request.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = useMemo<ColumnDef<typeof leaveRequests[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'leaveType', header: 'Leave type' },
      { accessorKey: 'startDate', header: 'Start date' },
      { accessorKey: 'endDate', header: 'End date' },
      { accessorKey: 'duration', header: 'Duration' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Approved'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'Pending'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      { accessorKey: 'approver', header: 'Approver' },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link href="/workforce/leave-management" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-brand-500">
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

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Workforce / Manajemen Cuti</p>
            <h1 className="text-3xl font-semibold text-slate-900">Dasbor Cuti</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Workspace terpusat untuk permintaan cuti, saldo, dan persetujuan.</p>
          </div>
          <Link href="/workforce" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-500">
            Kembali ke Workforce
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 xl:grid-cols-3">
        {[
          { label: 'Leave requests', value: `${leaveOverview.requests}` },
          { label: 'Pending', value: `${leaveOverview.pending}` },
          { label: 'Approved', value: `${leaveOverview.approved}` },
          { label: 'Rejected', value: `${leaveOverview.rejected}` },
          { label: 'Leave balance', value: leaveOverview.balance },
        ].map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leave types</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Company leave programs</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {leaveTypes.map((type) => (
              <div key={type} className="rounded-3xl bg-white/80 p-4">
                <p className="text-sm font-semibold text-slate-900">{type}</p>
                <p className="mt-2 text-sm text-slate-400">Dikelola melalui alur kerja HR dan jalur persetujuan.</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Approval panel</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Pending leave actions</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm text-slate-400">
            <p>Review leave requests, add comments, and move requests through the workflow.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="primary" className="rounded-full px-5 py-3">Approve</Button>
              <Button variant="destructive" className="rounded-full px-5 py-3">Reject</Button>
              <Button variant="secondary" className="rounded-full px-5 py-3">Request revision</Button>
              <Button variant="ghost" className="rounded-full px-5 py-3">Add comment</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leave calendar</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Team leave schedule</h2>
            </div>
            <div className="text-sm text-slate-400">Color coded for approvals and planned time away.</div>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {leaveCalendar.map((day) => (
              <div key={day.day} className={`${day.color} rounded-3xl p-2 text-xs`}>
                <p className="font-semibold text-slate-900">{day.day}</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-700">{day.status}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leave balance</p>
          <div className="mt-6 space-y-3 text-sm text-slate-400">
            <p>Monitor leave availability and balance before approving new requests.</p>
            <div className="rounded-3xl bg-white/80 p-4">
              <p className="text-sm font-semibold text-slate-900">Current balance</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{leaveOverview.balance}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Leave table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Request pipeline</h2>
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
              placeholder="Cari karyawan, jenis cuti atau pemberi persetujuan"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500">
            <option value="All">All statuses</option>
            <option value="Pending">Menunggu</option>
            <option value="Approved">Disetujui</option>
            <option value="Rejected">Ditolak</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
