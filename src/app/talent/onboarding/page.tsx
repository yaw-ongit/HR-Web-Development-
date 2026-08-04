'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, CheckCircle2, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { TalentService } from '@/lib/services';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

export default function TalentOnboardingPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

  const [form, setForm] = useState({
    employee_id: '',
    hiring_id: '00000000-0000-0000-0000-000000000000', // Mock hiring ID for now
    start_date: new Date().toISOString().split('T')[0],
  });

  const loadData = () => {
    TalentService.getOnboardingTasks().then((result) => {
      if (result && Array.isArray(result.data)) setDataList(result.data);
    });
  };

  useEffect(() => {
    loadData();
    import('@/lib/services').then(({ PeopleService }) => {
      PeopleService.getEmployees().then(res => setEmployees(res.data || []));
    });
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      checklist: [{ task: 'Dokumen', completed: false }, { task: 'Setup Email', completed: false }]
    };
    const { error } = await TalentService.createOnboarding(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal membuat tugas onboarding: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Tugas onboarding berhasil dibuat.', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleCompleteTask = async (id: string) => {
    const { error } = await TalentService.completeOnboarding(id);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal menyelesaikan: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Onboarding diselesaikan!', variant: 'success' });
      loadData();
    }
  };

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employee', 'task', 'category', 'dueDate', 'assignedTo', 'status'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'onboarding.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((task) => {
      const matchesSearch =
        task.employee.toLowerCase().includes(query) ||
        task.task.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || task.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'task', header: 'Task' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'assignedTo', header: 'Assigned to' },
      { accessorKey: 'dueDate', header: 'Due date' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          row.original.status !== 'Selesai' ? (
            <Button variant="ghost" size="sm" onClick={() => handleCompleteTask(row.original.id)} className="rounded-full px-3 py-2 text-xs font-semibold text-brand-600 hover:bg-brand-50">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Selesaikan
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">Selesai</span>
          )
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const table = useReactTable({
    data: filteredTasks,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const taskCategories = [
    { category: 'IT', tasks: 4, icon: '💻' },
    { category: 'HR', tasks: 3, icon: '📋' },
    { category: 'Facility', tasks: 2, icon: '🏢' },
    { category: 'Training', tasks: 3, icon: '📚' },
    { category: 'Documentation', tasks: 2, icon: '📄' },
  ];

  const metrics = [
    { label: 'Active onboarding', value: '4', subtext: 'Karyawans' },
    { label: 'Tasks pending', value: '15', subtext: 'This week' },
    { label: 'Completed', value: '8', subtext: 'This week' },
    { label: 'Avg time', value: '7 days', subtext: 'To full onboarding' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Talent / Onboarding</p>
            <h1 className="text-3xl font-semibold text-foreground">Onboarding karyawan baru</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Lacak tugas onboarding, penugasan, dan kesiapan karyawan baru antar departemen.</p>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {taskCategories.map((item) => (
          <Card key={item.category} className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.category}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{item.tasks} tasks</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Onboarding table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Task checklist</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setIsAddOpen(true)} variant="primary" className="rounded-full px-5 py-3">
              <Plus className="h-4 w-4" /> Tugas Baru
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-onboarding')?.focus()}>
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-onboarding"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee, task, or category"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Menunggu">Menunggu</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Buat Tugas Onboarding" description="Tugaskan checklist onboarding baru kepada karyawan.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Karyawan</label>
              <select required value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Karyawan</option>
                {employees?.map(e => <option key={e.id} value={e.id}>{e.fullName}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tanggal Mulai</label>
              <input required type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Buat Tugas</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
