'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Gift, Plus } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { benefitDistributionData } from '@/lib/compensation-data';
import { CompensationService } from '@/lib/services';

export default function BenefitsPage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [benefitType, setBenefitType] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [benefitTypesList, setBenefitTypesList] = useState<any[]>([]);
  const [form, setForm] = useState({
    employee_id: '',
    benefit_type_id: '',
    description: '',
    granted_date: new Date().toISOString().split('T')[0],
    expiry_date: ''
  });

  const loadData = () => {
    CompensationService.getBenefits().then((data) => {
      if (data.data && Array.isArray(data.data)) {
        setDataList(data.data);
      }
    });
  };

  useEffect(() => {
    loadData();
    CompensationService.getBenefitTypes().then((res) => setBenefitTypesList(res.data));
    import('@/lib/services').then(({ PeopleService }) => {
      PeopleService.getEmployees().then((res) => {
        if (Array.isArray(res.data)) setEmployees(res.data);
      });
    });
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.expiry_date) delete (payload as any).expiry_date;
    
    const { error } = await CompensationService.createBenefit(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Failed to assign benefit: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Success', description: 'Benefit successfully assigned!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employee', 'department', 'benefitType', 'provider', 'startDate', 'endDate', 'status'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header)).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'benefits-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBenefits = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((benefit) => {
      const matchesSearch =
        benefit.employee.toLowerCase().includes(query) ||
        benefit.department.toLowerCase().includes(query) ||
        benefit.provider.toLowerCase().includes(query);

      const matchesBenefitType = benefitType === 'All' || benefit.benefitType === benefitType;
      const matchesStatus = status === 'All' || benefit.status === status;

      return matchesSearch && matchesBenefitType && matchesStatus;
    });
  }, [dataList, search, benefitType, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'department', header: 'Departemen' },
      { accessorKey: 'benefitType', header: 'Benefit Type' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'startDate', header: 'Tanggal Mulai' },
      {
        accessorKey: 'endDate',
        header: 'Tanggal Selesai',
        cell: ({ getValue }) => getValue() || '—',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: () => (
          <Link href="/compensation/benefits" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
            Edit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredBenefits,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const benefitTypes = ['Health Insurance', 'Life Insurance', 'Transportation', 'Meal Allowance', 'Accommodation', 'Project Allowance', 'Communication Allowance', 'Operational Allowance', 'Uniform', 'PPE Allocation', 'Other'];

  const totalBenefits = dataList.length;
  const activeBenefits = dataList.filter((b) => b.status === 'Aktif').length;
  const uniqueKaryawans = new Set(dataList.map((b) => b.employeeId)).size;
  const uniqueDepartments = new Set(dataList.map((b) => b.department)).size;

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Compensation / Benefits</p>
            <h1 className="text-3xl font-semibold text-foreground">Benefits Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Manage and track employee benefits, allocations, and coverage across the organization.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Total Benefits</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{totalBenefits}</p>
          <p className="mt-2 text-sm text-muted">{activeBenefits} active</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Karyawans Covered</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{uniqueKaryawans}</p>
          <p className="mt-2 text-sm text-muted">Active enrollment</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Benefit Categories</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{benefitTypes.length}</p>
          <p className="mt-2 text-sm text-muted">Types available</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Departments</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{uniqueDepartments}</p>
          <p className="mt-2 text-sm text-muted">With benefits</p>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Distribution</p>
        <h2 className="mt-2 text-lg font-semibold text-foreground">Benefit Categories</h2>
        <div className="mt-6 space-y-3">
          {benefitDistributionData.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                <span className="text-sm font-semibold text-foreground">{item.value} employees</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/80">
                <div className="h-2 rounded-full" style={{ backgroundColor: item.fill, width: `${(item.value / 250) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Benefits table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">All benefits</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" className="rounded-full px-5 py-3" onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4" /> Assign Benefit
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-benefit')?.focus()}>
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-benefit"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee or department"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={benefitType} onChange={(event) => setBenefitType(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">All benefit types</option>
            {benefitTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Assign Benefit" description="Assign a new benefit to an employee.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Karyawan</label>
              <select required value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Karyawan</option>
                {employees?.map((emp: any) => <option key={emp.id} value={emp.id}>{emp.fullName}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Jenis Benefit</label>
              <select required value={form.benefit_type_id} onChange={e => setForm({...form, benefit_type_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Jenis</option>
                {benefitTypesList?.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Description (Optional)</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"></textarea>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tanggal Mulai</label>
                <input required type="date" value={form.granted_date} onChange={e => setForm({...form, granted_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tanggal Selesai (Optional)</label>
                <input type="date" value={form.expiry_date} onChange={e => setForm({...form, expiry_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Assign</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
