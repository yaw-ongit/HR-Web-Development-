'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { attendanceOverview, attendanceRecords, attendanceCalendar, workforceDepartmentOptions } from '@/lib/workforce-data';

export default function WorkforceAttendancePage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredData = useMemo(() => {
    const query = search.toLowerCase();
    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.employee.toLowerCase().includes(query) ||
        record.department.toLowerCase().includes(query) ||
        record.shift.toLowerCase().includes(query);

      const matchesDepartment = department === 'All' || record.department === department;
      const matchesStatus = status === 'All' || record.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [search, department, status]);

  const columns = useMemo<ColumnDef<typeof attendanceRecords[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'department', header: 'Departemen' },
      { accessorKey: 'shift', header: 'Shift' },
      { accessorKey: 'checkIn', header: 'Waktu Masuk' },
      { accessorKey: 'checkOut', header: 'Waktu Keluar' },
      { accessorKey: 'hours', header: 'Jam Kerja' },
      {
        accessorKey: 'late', header: 'Terlambat', cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
              value === 'Yes' ? 'bg-amber-50 text-amber-200' : 'bg-emerald-50 text-emerald-200'
            }`}>
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Hadir'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'On Leave'
              ? 'bg-slate-600/15 text-slate-700'
              : value === 'WFH'
              ? 'bg-brand-50 text-brand-500'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <Link href={`/workforce/attendance`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-brand-500">
            Detail <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
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
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Workforce / Attendance</p>
            <h1 className="text-3xl font-semibold text-slate-900">Dashboard Presensi</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Status kehadiran langsung, presensi harian, dan operasi karyawan dalam satu tampilan.</p>
          </div>
          <Link href="/workforce" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-500">
            Kembali ke Workforce
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { label: 'Tingkat Kehadiran', value: attendanceOverview.attendanceRate },
          { label: 'Hadir', value: attendanceOverview.present },
          { label: 'Absen', value: attendanceOverview.absent },
          { label: 'Terlambat', value: attendanceOverview.late },
          { label: 'WFH', value: attendanceOverview.wfh },
          { label: 'Dinas', value: attendanceOverview.businessTrip },
          { label: 'Libur', value: attendanceOverview.holiday },
        ].map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Kalender Presensi</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Ringkasan Juni</h2>
            </div>
            <div className="text-sm text-slate-400">Sorotan akhir pekan / libur / dinas</div>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {attendanceCalendar.map((day) => (
              <div key={day.day} className={`${day.color} rounded-3xl p-2 text-xs`}>
                <p className="font-semibold text-slate-900">{day.day}</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-700">{day.status}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-400">
            <div className="rounded-3xl bg-white/80 p-4">Hadir / WFH / business trip statuses visualized</div>
            <div className="rounded-3xl bg-white/80 p-4">Arahkan kursor pada hari untuk catatan operasional dan konteks jadwal.</div>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Detail Presensi</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Heatmap Kehadiran</h2>
            </div>
            <div className="rounded-full bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700">Log harian</div>
          </div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <CalendarCheck className="h-4 w-4" />
                <span>{'Tren berlanjut dengan cakupan >97%.'}</span>
              </div>
            </div>
            <div className="rounded-3xl bg-white/80 p-4 text-sm text-slate-400">
              Tampilan ini dirancang untuk membuat status kehadiran, pengecualian, dan cakupan terlihat sekilas.
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Tabel Presensi</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Log operasional karyawan</h2>
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
              placeholder="Cari karyawan, departemen atau shift"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500">
            <option value="All">Semua departemen</option>
            {workforceDepartmentOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Hadir">Hadir</option>
            <option value="On Leave">On Leave</option>
            <option value="WFH">WFH</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
