'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Plus } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { TalentService } from '@/lib/services';

export default function TalentInterviewsPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  
  const [candidates, setCandidates] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  
  const [form, setForm] = useState({
    candidate_id: '',
    interviewer_id: '',
    interview_stage: 'HR',
    scheduled_date: new Date().toISOString().split('T')[0],
    scheduled_time: '09:00',
    location: ''
  });
  
  const [resultForm, setResultForm] = useState({
    result: 'LULUS',
    score: 0,
    notes: ''
  });

  const loadData = () => {
    TalentService.getInterviews().then((result) => {
      if (result && Array.isArray(result.data)) setDataList(result.data);
    });
  };

  useEffect(() => {
    loadData();
    TalentService.getCandidates().then((res) => setCandidates(res.data || []));
    import('@/lib/services').then(({ PeopleService }) => {
      PeopleService.getEmployees().then((res) => setEmployees(res.data || []));
    });
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const scheduled_at = new Date(`${form.scheduled_date}T${form.scheduled_time}:00`).toISOString();
    const payload = {
      candidate_id: form.candidate_id,
      interviewer_id: form.interviewer_id,
      interview_stage: form.interview_stage,
      scheduled_at,
      location: form.location
    };
    
    const { error } = await TalentService.createInterview(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal membuat jadwal: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Jadwal interview berhasil dibuat!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterview) return;
    
    const nextStatus = resultForm.result === 'LULUS' ? 'OFFERING' : resultForm.result === 'TIDAK_LULUS' ? 'DITOLAK' : 'INTERVIEW';
    const { error } = await TalentService.updateInterviewResult(
      selectedInterview.id, 
      resultForm, 
      selectedInterview.candidate_id, 
      nextStatus
    );
    
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menyimpan hasil: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Hasil interview berhasil disimpan!', variant: 'success' });
      setIsResultOpen(false);
      loadData();
    }
  };

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['candidate', 'position', 'interviewer', 'date', 'time', 'type', 'status'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'interviews.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInterviews = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((interview) => {
      const matchesSearch =
        interview.candidate.toLowerCase().includes(query) ||
        interview.interviewer.toLowerCase().includes(query) ||
        interview.position.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || interview.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'candidate', header: 'Kandidat' },
      { accessorKey: 'position', header: 'Position' },
      { accessorKey: 'type', header: 'Interview type' },
      { accessorKey: 'interviewer', header: 'Interviewer' },
      { accessorKey: 'date', header: 'Tanggal' },
      { accessorKey: 'time', header: 'Time' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" onClick={() => { setSelectedInterview(row.original); setIsResultOpen(true); }} className="rounded-full px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
            Hasil <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredInterviews,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const metrics = [
    { label: 'This week', value: '18', subtext: 'Interviews scheduled' },
    { label: 'Completed', value: '42', subtext: 'This month' },
    { label: 'Avg duration', value: '45 min', subtext: 'Per interview' },
    { label: 'Advancement rate', value: '68%', subtext: 'To next round' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Talent / Interviews</p>
            <h1 className="text-3xl font-semibold text-foreground">Alur wawancara</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Schedule, track, and manage interviews across all rounds and interview types.</p>
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

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Interview table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Scheduled and completed</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setIsAddOpen(true)} variant="primary" className="rounded-full px-5 py-3">
              <Plus className="h-4 w-4" /> Jadwalkan
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-interview')?.focus()}>
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-interview"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kandidat, posisi, atau pewawancara"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Scheduled">Terjadwal</option>
            <option value="Completed">Selesai</option>
            <option value="Menunggu">Tertunda</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Jadwalkan Interview" description="Atur jadwal interview untuk kandidat.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Kandidat</label>
              <select required value={form.candidate_id} onChange={e => setForm({...form, candidate_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Kandidat</option>
                {candidates?.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Interviewer</label>
              <select required value={form.interviewer_id} onChange={e => setForm({...form, interviewer_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Interviewer</option>
                {employees?.map(e => <option key={e.id} value={e.id}>{e.fullName}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tahapan</label>
              <select required value={form.interview_stage} onChange={e => setForm({...form, interview_stage: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="HR">HR Interview</option>
                <option value="USER">User Interview</option>
                <option value="BOD">BOD Interview</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Lokasi / Link</label>
              <input required type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tanggal</label>
              <input required type="date" value={form.scheduled_date} onChange={e => setForm({...form, scheduled_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Waktu</label>
              <input required type="time" value={form.scheduled_time} onChange={e => setForm({...form, scheduled_time: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Jadwalkan</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={isResultOpen} onClose={() => setIsResultOpen(false)} title="Input Hasil Interview" description="Masukkan hasil evaluasi dari interviewer.">
        <form onSubmit={handleResultSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Keputusan</label>
              <select required value={resultForm.result} onChange={e => setResultForm({...resultForm, result: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="LULUS">Lulus</option>
                <option value="TIDAK_LULUS">Tidak Lulus</option>
                <option value="PERTIMBANGAN">Pertimbangan</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Skor (0-100)</label>
              <input required type="number" min="0" max="100" value={resultForm.score} onChange={e => setResultForm({...resultForm, score: parseInt(e.target.value)})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Catatan / Evaluasi</label>
              <textarea required value={resultForm.notes} onChange={e => setResultForm({...resultForm, notes: e.target.value})} rows={4} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsResultOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Simpan Hasil</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
