'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { TalentService } from '@/lib/services';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';

export default function TalentHiringPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  
  const { addToast } = useToast();
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  
  const [form, setForm] = useState({
    employee_number: '',
    company_id: '10000000-0000-0000-0000-000000000001',
    branch_id: '11000000-0000-0000-0000-000000000001',
    business_unit_id: '12000000-0000-0000-0000-000000000001',
    division_id: '14000000-0000-0000-0000-000000000001',
    department_id: '13000000-0000-0000-0000-000000000001',
    section_id: '16000000-0000-0000-0000-000000000001',
    position_id: '15000000-0000-0000-0000-000000000001',
    job_grade_id: '17000000-0000-0000-0000-000000000001',
    employment_type_id: '18000000-0000-0000-0000-000000000001',
    birth_date: '1990-01-01',
    national_id_number: '0000000000000000',
    gender: 'Male',
  });

  const loadData = () => {
    TalentService.getCandidates().then(res => {
      if (res.data && Array.isArray(res.data)) {
        // Filter those in OFFERING or DITERIMA
        const hiringList = res.data.filter((c: any) => c.stage === 'OFFERING' || c.stage === 'DITERIMA');
        setDataList(hiringList);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    const employeeData = {
      ...form,
      full_name: selectedCandidate.name,
      email: selectedCandidate.email,
      phone: selectedCandidate.phone
    };

    const { error } = await TalentService.hireCandidate(selectedCandidate.id, employeeData);
    if (error) {
      addToast({ title: 'Error', description: 'Gagal hire kandidat: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Berhasil', description: 'Kandidat berhasil dihire dan data employee dibuat.', variant: 'success' });
      setIsHireOpen(false);
      loadData();
    }
  };

  const filteredHiring = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((record) => {
      const matchesSearch =
        record.name?.toLowerCase().includes(query) ||
        record.position?.toLowerCase().includes(query) ||
        record.department?.toLowerCase().includes(query);

      const matchesStatus = status === 'All' || record.stage === status;
      return matchesSearch && matchesStatus;
    });
  }, [dataList, search, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'name', header: 'Kandidat' },
      { accessorKey: 'position', header: 'Position' },
      { accessorKey: 'department', header: 'Departemen' },
      { accessorKey: 'email', header: 'Email' },
      {
        accessorKey: 'stage',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => (
          row.original.stage === 'OFFERING' ? (
            <Button variant="primary" size="sm" onClick={() => {
              setSelectedCandidate(row.original);
              setForm(prev => ({
                ...prev,
                employee_number: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
                gender: row.original.gender || 'Male'
              }));
              setIsHireOpen(true);
            }} className="rounded-full px-3 py-2 text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Hire
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">Hired</span>
          )
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredHiring,
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
    const headers = ['name', 'position', 'department', 'email', 'stage'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header) || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'hiring-pipeline.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const metrics = [
    { label: 'Offers extended', value: '6', subtext: 'Menunggu response' },
    { label: 'Accepted', value: '14', subtext: 'This quarter' },
    { label: 'Offer acceptance rate', value: '88%', subtext: 'Historical' },
    { label: 'Time to hire', value: '24 days', subtext: 'Average' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Talent / Hiring</p>
            <h1 className="text-3xl font-semibold text-foreground">Offer management</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Track offer extensions, acceptances, and prepare candidates for onboarding.</p>
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
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Hiring table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Offer pipeline</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Ekspor
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-hiring')?.focus()}>
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-hiring"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kandidat, posisi, atau departemen"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Offer Extended">Tawaran Diperpanjang</option>
            <option value="Accepted">Diterima</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Onboarding">Onboarding</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isHireOpen} onClose={() => setIsHireOpen(false)} title="Hire Candidate" description="Ubah status kandidat menjadi DITERIMA dan buat data Employee.">
        <form onSubmit={handleHireSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Nomor Induk Karyawan</label>
              <input required type="text" value={form.employee_number} onChange={e => setForm({...form, employee_number: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Tanggal Lahir</label>
              <input required type="date" value={form.birth_date} onChange={e => setForm({...form, birth_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">No KTP (NIK)</label>
              <input required type="text" value={form.national_id_number} onChange={e => setForm({...form, national_id_number: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsHireOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Konfirmasi Hire</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
