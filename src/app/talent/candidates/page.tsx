'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { candidatePipeline } from '@/lib/talent-data';
import { TalentService } from '@/lib/services';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

export default function TalentCandidatesPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    gender: 'L',
    job_vacancy_id: ''
  });

  const loadData = () => {
    TalentService.getCandidates().then((result) => {
      if (result && Array.isArray(result.data)) setDataList(result.data);
    });
  };

  useEffect(() => {
    loadData();
    // Load job vacancies for dropdown
    TalentService.getJobVacancies().then((res) => {
      if (res && Array.isArray(res.data)) setVacancies(res.data);
    });
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      status: 'BARU'
    };
    const { error } = await TalentService.createCandidate(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menambah kandidat: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Kandidat baru berhasil ditambahkan!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedCandidate) return;
    const { error } = await TalentService.updateCandidateStatus(selectedCandidate.id, newStatus);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal memperbarui status: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Status kandidat diperbarui.', variant: 'success' });
      setSelectedCandidate({ ...selectedCandidate, stage: newStatus });
      loadData();
    }
  };

  const filteredCandidates = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.position.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query);

      const matchesStage = stage === 'All' || candidate.stage === stage;
      return matchesSearch && matchesStage;
    });
  }, [dataList, search, stage]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'position', header: 'Position' },
      { accessorKey: 'department', header: 'Departemen' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      {
        accessorKey: 'stage',
        header: 'Stage',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" onClick={() => { setSelectedCandidate(row.original); setIsDetailOpen(true); }} className="rounded-full px-3 py-2 text-xs font-semibold">
            View <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredCandidates,
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
    const headers = ['name', 'position', 'department', 'email', 'phone', 'stage'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'candidates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Talent / Recruitment</p>
            <h1 className="text-3xl font-semibold text-foreground">Pipeline kandidat</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Lacak kemajuan kandidat dari pengajuan hingga penyaringan dan kualifikasi.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Kembali ke Talent
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {candidatePipeline.map((item) => (
          <Card key={item.stage} className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.stage}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.count}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Tabel kandidat</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Kandidat aktif</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setIsAddOpen(true)} variant="primary" className="rounded-full px-5 py-3">
              <Plus className="h-4 w-4" /> Tambah Kandidat
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-candidate')?.focus()}>
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-candidate"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, posisi, atau email"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={stage} onChange={(event) => setStage(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">All stages</option>
            <option value="New">New</option>
            <option value="Screening">Screening</option>
            <option value="Qualified">Qualified</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Tambah Kandidat" description="Masukkan data kandidat baru.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Nama Lengkap</label>
              <input required type="text" value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Email</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Telepon</label>
              <input required type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Lowongan</label>
              <select required value={form.job_vacancy_id} onChange={e => setForm({...form, job_vacancy_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Lowongan</option>
                {vacancies?.map((v: any) => <option key={v.id} value={v.id}>{v.title || v.position_title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Jenis Kelamin</label>
              <select required value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Simpan</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detail Kandidat" description="Informasi kandidat dan pembaruan tahapan pipeline.">
        {selectedCandidate && (
          <div className="mt-4 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground font-semibold">Nama Lengkap</p>
                <p>{selectedCandidate.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Posisi Dilamar</p>
                <p>{selectedCandidate.position}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Email</p>
                <p>{selectedCandidate.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Telepon</p>
                <p>{selectedCandidate.phone}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <p className="text-xs uppercase tracking-widest text-primary mb-3">Update Tahapan</p>
              <div className="flex flex-wrap gap-2">
                {['BARU', 'SCREENING', 'INTERVIEW', 'OFFERING', 'DITERIMA', 'DITOLAK'].map(stage => (
                  <Button 
                    key={stage} 
                    variant={selectedCandidate.stage === stage ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => handleUpdateStatus(stage)}
                  >
                    {stage}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
