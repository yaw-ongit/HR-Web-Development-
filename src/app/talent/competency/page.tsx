'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { TalentService } from '@/lib/services';

export default function TalentCompetencyPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  const [form, setForm] = useState({
    performance_review_id: '00000000-0000-0000-0000-000000000000',
    competency_name: '',
    score: 0,
    notes: ''
  });

  const loadData = () => {
    TalentService.getCompetencies().then((result) => {
      if (result && Array.isArray(result.data)) setDataList(result.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      score: Number(form.score)
    };
    const { error } = await TalentService.addCompetency(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menambah kompetensi: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Kompetensi berhasil ditambahkan.', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const filteredCompetencies = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((comp) => {
      const compName = comp.competency_name || '';
      const matchesSearch = compName.toLowerCase().includes(query);
      return matchesSearch;
    });
  }, [dataList, search]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorFn: () => 'Karyawan', header: 'Karyawan' },
      { accessorKey: 'competency_name', header: 'Competency' },
      { accessorKey: 'score', header: 'Score' },
      {
        id: 'actions',
        header: 'Aksi',
        cell: () => (
          <Button variant="ghost" size="sm" className="rounded-full px-3 py-2 text-xs font-semibold">
            View
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredCompetencies,
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
    const headers = ['competency_name', 'score'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'competency-records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const levelCounts = [
    { level: 'Expert', count: 42, percentage: 11 },
    { level: 'Advanced', count: 124, percentage: 33 },
    { level: 'Intermediate', count: 68, percentage: 18 },
    { level: 'Beginner', count: 24, percentage: 6 },
  ];

  const metrics = [
    { label: 'Total competencies tracked', value: '258', subtext: 'Across organization' },
    { label: 'Expert level', value: '42', subtext: 'Karyawans' },
    { label: 'Menunggu review', value: '18', subtext: 'Due in next 30 days' },
    { label: 'Development plans', value: '34', subtext: 'In progress' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Talent / Kompetensi</p>
            <h1 className="text-3xl font-semibold text-foreground">Manajemen kompetensi</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Nilai dan kembangkan kompetensi karyawan untuk kesesuaian keterampilan dan pengembangan karier.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Kembali ke Talent
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
            <p className="mt-2 text-sm text-muted">{item.subtext}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Skill distribution</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">Competency levels</h2>
          <div className="mt-6 space-y-4">
            {levelCounts.map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold text-foreground">{item.level}</span>
                  <span className="text-sm text-muted">{item.count} employees</span>
                </div>
                <div className="h-2 rounded-full bg-secondary/80">
                  <div className="h-2 rounded-full bg-primary/100" style={{ width: `${item.percentage * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Competency focus</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">Top areas</h2>
          <div className="mt-6 space-y-3">
            <div className="rounded-3xl bg-card/80 p-4 border border-border/60">
              <p className="text-sm font-semibold text-foreground">System Design</p>
              <p className="text-sm text-muted mt-1">Expert: 8 | Advanced: 12</p>
            </div>
            <div className="rounded-3xl bg-card/80 p-4 border border-border/60">
              <p className="text-sm font-semibold text-foreground">Cloud Architecture</p>
              <p className="text-sm text-muted mt-1">Expert: 5 | Advanced: 18</p>
            </div>
            <div className="rounded-3xl bg-card/80 p-4 border border-border/60">
              <p className="text-sm font-semibold text-foreground">People Management</p>
              <p className="text-sm text-muted mt-1">Expert: 14 | Advanced: 22</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Tabel kompetensi</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Penilaian karyawan</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" className="rounded-full px-5 py-3" onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4" /> Tambah Assessment
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-comp')?.focus()}>
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-comp"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari karyawan, kompetensi, atau penilai"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">All levels</option>
            <option value="Expert">Expert</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Tambah Assessment" description="Input hasil evaluasi kompetensi.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Kompetensi</label>
              <input required type="text" value={form.competency_name} onChange={e => setForm({...form, competency_name: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Skor (1-100)</label>
              <input required type="number" min="1" max="100" value={form.score} onChange={e => setForm({...form, score: Number(e.target.value)})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Catatan Evaluasi</label>
              <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Simpan Assessment</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
