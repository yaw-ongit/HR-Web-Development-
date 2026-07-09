'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, BookOpen, AlertCircle, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { trainingPrograms, certifications, competencies } from '@/lib/talent-data';
import { StatusBadge } from '@/components/ui/status-badge';
import { Dialog } from '@/components/ui/dialog';

const vendors = [
  { id: 'v1', name: 'Lembaga Sertifikasi Profesi (LSP)', focus: 'Sertifikasi BNSP', rating: 4.8, active: 12 },
  { id: 'v2', name: 'K3 Safety Training Center', focus: 'K3, HSE, First Aid', rating: 4.9, active: 25 },
  { id: 'v3', name: 'ITB Executive Education', focus: 'Manajemen, Leadership', rating: 4.7, active: 5 },
  { id: 'v4', name: 'Food Safety Institute', focus: 'HACCP, Food Safety', rating: 4.9, active: 18 },
];

export default function TalentTrainingPage() {
  const [activeTab, setActiveTab] = useState<'programs' | 'certifications' | 'competencies' | 'vendors'>('programs');
  const [search, setSearch] = useState('');
  
  // Interactive UI Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Columns for Programs
  const programColumns = useMemo<ColumnDef<typeof trainingPrograms[number]>[]>(() => [
    { accessorKey: 'employee', header: 'Karyawan' },
    { accessorKey: 'program', header: 'Program' },
    { accessorKey: 'provider', header: 'Penyedia' },
    { accessorKey: 'startDate', header: 'Tgl Mulai' },
    { accessorKey: 'endDate', header: 'Tgl Selesai' },
    {
      accessorKey: 'progress',
      header: 'Progres',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return (
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-brand-500" style={{ width: `${value}%` }} />
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
        const color = value === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : value === 'Sedang Berlangsung' ? 'bg-brand-50 text-brand-600' : value === 'Dijadwalkan' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600';
        return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
      },
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: () => (
        <Button variant="ghost" size="sm" onClick={() => alert('Fitur Edit belum tersedia')}>
          Edit
        </Button>
      ),
    },
  ], []);

  // Columns for Certifications
  const certColumns = useMemo<ColumnDef<typeof certifications[number]>[]>(() => [
    { accessorKey: 'employee', header: 'Karyawan' },
    { accessorKey: 'certification', header: 'Sertifikasi' },
    { accessorKey: 'issuer', header: 'Penerbit' },
    { accessorKey: 'issuedDate', header: 'Tgl Terbit' },
    { accessorKey: 'expiryDate', header: 'Kadaluarsa' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        if (value === 'Aktif') return <StatusBadge status="Aktif" />;
        if (value === 'Hampir Habis') return <StatusBadge status="Warning" />;
        return <StatusBadge status="Expired" />;
      },
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: () => (
        <Button variant="outline" size="sm" onClick={() => alert('Mengingatkan karyawan...')}>
          Ingatkan
        </Button>
      ),
    },
  ], []);

  // Columns for Competencies
  const compColumns = useMemo<ColumnDef<typeof competencies[number]>[]>(() => [
    { accessorKey: 'employee', header: 'Karyawan' },
    { accessorKey: 'competency', header: 'Kompetensi' },
    { accessorKey: 'level', header: 'Level' },
    { accessorKey: 'assessmentDate', header: 'Tgl Penilaian' },
    { accessorKey: 'assessor', header: 'Penilai' },
    {
      id: 'actions',
      header: 'Aksi',
      cell: () => (
        <Button variant="ghost" size="sm" onClick={() => alert('Buka Profil Karyawan')}>
          Lihat Profil
        </Button>
      ),
    },
  ], []);

  const tableData = useMemo(() => {
    const q = search.toLowerCase();
    if (activeTab === 'programs') return trainingPrograms.filter(p => p.employee.toLowerCase().includes(q) || p.program.toLowerCase().includes(q));
    if (activeTab === 'certifications') return certifications.filter(c => c.employee.toLowerCase().includes(q) || c.certification.toLowerCase().includes(q));
    if (activeTab === 'competencies') return competencies.filter(c => c.employee.toLowerCase().includes(q) || c.competency.toLowerCase().includes(q));
    return [];
  }, [activeTab, search]);

  const activeColumns = useMemo(() => {
    if (activeTab === 'certifications') return certColumns;
    if (activeTab === 'competencies') return compColumns;
    return programColumns;
  }, [activeTab, certColumns, compColumns, programColumns]);

  const table = useReactTable({
    data: tableData as any,
    columns: activeColumns as any,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">HR Manajemen</p>
            <h1 className="text-3xl font-semibold text-slate-900">Pusat Pelatihan & Sertifikasi</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Kelola riwayat pelatihan, sertifikasi wajib (K3, MCU, HSE), dan mitra pelatihan PT Indocater.</p>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-full bg-brand-600 text-white hover:bg-brand-700" onClick={() => setIsAddModalOpen(true)}>
              + Data Baru
            </Button>
            <Dialog 
              open={isAddModalOpen} 
              onClose={() => setIsAddModalOpen(false)}
              title="Tambah Data Pelatihan / Sertifikasi"
              description="Silakan pilih jenis data yang akan dimasukkan ke sistem HRIS."
            >
              <div className="space-y-4 py-4">
                <select className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-500">
                  <option>Riwayat Pelatihan Baru</option>
                  <option>Sertifikasi Baru (K3, HACCP, dll)</option>
                  <option>Penilaian Kompetensi</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Batal</Button>
                <Button onClick={() => { alert('Data berhasil disimpan'); setIsAddModalOpen(false); }} className="bg-brand-600 text-white hover:bg-brand-700">Simpan</Button>
              </div>
            </Dialog>
          </div>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Program</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">45</p>
          <p className="mt-2 text-sm text-brand-600 font-medium">Bulan Ini</p>
        </Card>
        <Card className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sertifikasi Aktif</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">128</p>
          <p className="mt-2 text-sm text-emerald-600 font-medium">Memenuhi Syarat</p>
        </Card>
        <Card className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Hampir Kadaluarsa</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">12</p>
          <p className="mt-2 text-sm text-rose-600 font-medium">Perlu Diperbarui</p>
        </Card>
        <Card className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mitra Vendor</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">4</p>
          <p className="mt-2 text-sm text-slate-400 font-medium">Lembaga Terdaftar</p>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 p-6 shadow-sm">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 mb-6 max-w-2xl">
          <button onClick={() => setActiveTab('programs')} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === 'programs' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>Riwayat Pelatihan</button>
          <button onClick={() => setActiveTab('certifications')} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === 'certifications' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>Sertifikasi</button>
          <button onClick={() => setActiveTab('competencies')} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === 'competencies' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>Kompetensi</button>
          <button onClick={() => setActiveTab('vendors')} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === 'vendors' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>Vendor</button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari data..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl" onClick={() => alert('Mengekspor data ke CSV/Excel...')}>
              <Download className="h-4 w-4 mr-2" /> Ekspor Data
            </Button>
          </div>
        </div>

        {activeTab !== 'vendors' ? (
          <div className="rounded-xl border border-slate-200">
            <DataTable table={table} />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {vendors.map(v => (
              <div key={v.id} className="rounded-2xl border border-slate-200 p-5 hover:border-brand-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{v.name}</p>
                      <p className="text-xs text-slate-400">Rating: {v.rating} • {v.active} Program Aktif</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => alert(`Membuka profil vendor ${v.name}`)}>Detail</Button>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">{v.focus}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
