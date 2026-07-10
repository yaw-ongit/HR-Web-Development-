'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Plus, Upload, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { PageHeader } from '@/components/ui/page-header';
import { FilterBar, SearchInput, SelectFilter } from '@/components/ui/filter-bar';
import { SectionContainer } from '@/components/layout/section-container';
import { NoKaryawansEmptyState } from '@/components/ui/empty-state';
import {
  employeeDirectory, departmentOptions, positionOptions, statusOptions,
  contractOptions, branchOptions, locationOptions, genderOptions, KaryawanRecord,
} from '@/lib/people-data';

export default function PeopleDirectoryPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [position, setPosition] = useState('All');
  const [status, setStatus] = useState('All');
  const [contractType, setContractType] = useState('All');
  const [branch, setBranch] = useState('All');
  const [sorting, setSorting] = useState<any[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    return employeeDirectory.filter((e) => {
      const matchSearch = !q || e.fullName.toLowerCase().includes(q) || e.employeeId.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.department.toLowerCase().includes(q);
      return matchSearch
        && (department === 'All' || e.department === department)
        && (position === 'All' || e.position === position)
        && (status === 'All' || e.status === status)
        && (contractType === 'All' || e.contractType === contractType)
        && (branch === 'All' || e.branch === branch);
    });
  }, [search, department, position, status, contractType, branch]);

  const columns = useMemo<ColumnDef<KaryawanRecord>[]>(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <input type="checkbox" aria-label="Select all rows" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()}
          className="h-4 w-4 rounded border-slate-400 bg-slate-100 text-brand-600 focus:ring-brand-500" />
      ),
      cell: ({ row }) => (
        <input type="checkbox" aria-label={`Select ${row.original.fullName}`} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4 rounded border-slate-400 bg-slate-100 text-brand-600 focus:ring-brand-500" />
      ),
    },
    {
      id: 'employee',
      accessorFn: (r) => r.fullName,
      header: 'Karyawan',
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-sm font-semibold text-brand-500" aria-hidden="true">
            {row.original.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{row.original.fullName}</p>
            <p className="text-xs text-slate-400">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { accessorKey: 'employeeId', header: 'ID', enableSorting: true },
    { accessorKey: 'department', header: 'Departemen', enableSorting: true },
    { accessorKey: 'position', header: 'Jabatan', enableSorting: true },
    {
      accessorKey: 'status', header: 'Status', enableSorting: true,
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    { accessorKey: 'joinDate', header: 'Tanggal bergabung', enableSorting: true },
    { accessorKey: 'contractType', header: 'Kontrak' },
    { accessorKey: 'manager', header: 'Manajer' },
    {
      id: 'actions', header: 'Aksi',
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Link href={`/people/${row.original.id}`}
            className="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500">
            Profil
          </Link>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: filteredData, columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    initialState: { pagination: { pageSize: 15 } },
  });

  const deptOptions = [{ value: 'All', label: 'Semua departemen' }, ...departmentOptions.map((o) => ({ value: o, label: o }))];
  const posOptions = [{ value: 'All', label: 'Semua jabatan' }, ...positionOptions.map((o) => ({ value: o, label: o }))];
  const stOptions = [{ value: 'All', label: 'Semua status' }, ...statusOptions.map((o) => ({ value: o, label: o }))];
  const ctOptions = [{ value: 'All', label: 'Semua kontrak' }, ...contractOptions.map((o) => ({ value: o, label: o }))];
  const brOptions = [{ value: 'All', label: 'Semua cabang' }, ...branchOptions.map((o) => ({ value: o, label: o }))];

  return (
    <div className="space-y-6 py-6">
      <PageHeader
        breadcrumbs={[{ label: 'Data Karyawan', href: '/people' }, { label: 'Direktori' }]}
        title="Data Karyawan"
        description="Sumber utama profil karyawan, konteks organisasi, dan wawasan operasional."
        actions={
          <>
            <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>Tambah karyawan</Button>
            <Button variant="secondary" size="md" leftIcon={<Upload className="h-4 w-4" />}>Impor</Button>
            <Button variant="ghost" size="md" leftIcon={<Download className="h-4 w-4" />}>Ekspor</Button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <FilterBar>
            <SearchInput value={search} onChange={setSearch} placeholder="Cari nama, ID, email, departemen…" className="min-w-[260px] flex-1" label="Cari karyawan" />
            <SelectFilter label="Filter departemen" value={department} onChange={setDepartment} options={deptOptions} className="w-44" />
            <SelectFilter label="Filter jabatan" value={position} onChange={setPosition} options={posOptions} className="w-44" />
            <SelectFilter label="Filter status" value={status} onChange={setStatus} options={stOptions} className="w-40" />
            <SelectFilter label="Filter kontrak" value={contractType} onChange={setContractType} options={ctOptions} className="w-40" />
            <SelectFilter label="Filter cabang" value={branch} onChange={setBranch} options={brOptions} className="w-40" />
          </FilterBar>

          <SectionContainer title="Direktori karyawan" description={`Menampilkan ${filteredData.length} catatan`}>
            {filteredData.length === 0 ? (
              <NoKaryawansEmptyState onAdd={() => {}} />
            ) : (
              <DataTable table={table} caption="Tabel direktori karyawan" onExport={() => {}} />
            )}
          </SectionContainer>
        </div>

        {/* Sidebar summary */}
        <aside className="space-y-4" aria-label="Ringkasan modul People">
          <Card title="Area karyawan" description="Statistik singkat dan tindakan modul cepat.">
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/80 p-4">
                <p className="text-xs text-slate-400">Total karyawan</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">{employeeDirectory.length}</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <p className="text-xs text-slate-400">Cabang</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">{branchOptions.length}</p>
              </div>
            </div>
          </Card>
          <Card title="Aksi modul">
            <nav aria-label="Tindakan area People">
              <ul className="space-y-2">
                {[
                  { label: 'Struktur organisasi', href: '/people/org-structure' },
                  { label: 'Pusat dokumen', href: '/people/documents' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 transition hover:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500">
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </aside>
      </div>
    </div>
  );
}
