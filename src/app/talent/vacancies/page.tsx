'use client';

import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Plus, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { TalentService } from '@/lib/services';

export default function VacanciesPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  
  const [form, setForm] = useState({
    title: '',
    vacancy_code: '',
    quota: 1,
    requirements: '',
    status: 'DIBUKA',
    opened_date: new Date().toISOString().split('T')[0],
    closed_date: '',
    position_id: '15000000-0000-0000-0000-000000000001', // Seeded position
    department_id: '13000000-0000-0000-0000-000000000001', // Seeded department
  });

  const loadData = () => {
    TalentService.getJobVacancies().then((res) => {
      if (Array.isArray(res.data)) setDataList(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.closed_date) delete (payload as any).closed_date;

    const { error } = await TalentService.createJobVacancy(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal membuat lowongan: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Lowongan berhasil dibuat.', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...editData };
    if (!payload.closed_date) delete payload.closed_date;

    const { error } = await TalentService.updateJobVacancy(editData.id, payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal memperbarui lowongan: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Lowongan berhasil diperbarui.', variant: 'success' });
      setIsEditOpen(false);
      loadData();
    }
  };

  const filteredData = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((item) => {
      const matchSearch = item.title?.toLowerCase().includes(query) || item.vacancy_code?.toLowerCase().includes(query);
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [dataList, search, statusFilter]);

  const columns = useMemo<ColumnDef<any>[]>(() => [
    { accessorKey: 'vacancy_code', header: 'Kode' },
    { accessorKey: 'title', header: 'Posisi' },
    { accessorFn: (row) => row.departments?.name || '-', header: 'Departemen' },
    { accessorKey: 'quota', header: 'Kuota' },
    { accessorKey: 'opened_date', header: 'Dibuka' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={() => {
          setEditData(row.original);
          setIsEditOpen(true);
        }}>Edit</Button>
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
  });

  const handleExportTable = () => {
    if (filteredData.length === 0) return;
    const headers = ['vacancy_code', 'title', 'status', 'quota', 'opened_date'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => headers.map(header => `"${String(row[header] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'vacancies.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Rekrutmen</p>
            <h1 className="text-3xl font-semibold text-foreground">Lowongan Kerja</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Kelola rekrutmen, kuota, dan status lowongan kerja perusahaan.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Kembali ke Talent
          </Link>
        </div>
      </SectionContainer>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Daftar Lowongan</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Manajemen Lowongan</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" className="rounded-full px-5 py-3" onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4" /> Lowongan Baru
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari posisi atau kode" className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500" />
          </div>
          <div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
              <option value="All">Semua Status</option>
              <option value="DIBUKA">Dibuka</option>
              <option value="PROSES">Proses</option>
              <option value="DITUTUP">Ditutup</option>
              <option value="DIBATALKAN">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Buat Lowongan" description="Tambah posisi pekerjaan baru ke portal rekrutmen.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Posisi (Judul)</label>
              <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Kode Lowongan</label>
              <input required type="text" value={form.vacancy_code} onChange={e => setForm({...form, vacancy_code: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Kuota</label>
              <input required type="number" min="1" value={form.quota} onChange={e => setForm({...form, quota: parseInt(e.target.value)})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Status</label>
              <select required value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="DIBUKA">Dibuka</option>
                <option value="PROSES">Proses</option>
                <option value="DITUTUP">Ditutup</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Persyaratan / Deskripsi</label>
              <textarea value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} rows={3} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Buat Lowongan</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Lowongan" description="Perbarui detail lowongan pekerjaan.">
        {editData && (
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Posisi (Judul)</label>
                <input required type="text" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Kode Lowongan</label>
                <input required type="text" value={editData.vacancy_code} onChange={e => setEditData({...editData, vacancy_code: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Kuota</label>
                <input required type="number" min="1" value={editData.quota} onChange={e => setEditData({...editData, quota: parseInt(e.target.value)})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Status</label>
                <select required value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                  <option value="DIBUKA">Dibuka</option>
                  <option value="PROSES">Proses</option>
                  <option value="DITUTUP">Ditutup</option>
                  <option value="DIBATALKAN">Dibatalkan</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" type="button" onClick={() => setIsEditOpen(false)}>Batal</Button>
              <Button variant="primary" type="submit">Simpan Perubahan</Button>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
}
