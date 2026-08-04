'use client';
import { StatusBadge } from '@/components/ui/status-badge';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Shield, AlertCircle, Plus } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { CompensationService } from '@/lib/services';

export default function InsurancePage() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [policyType, setPolicyType] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { addToast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [benefitTypesList, setBenefitTypesList] = useState<any[]>([]);
  const [insuranceProvidersList, setInsuranceProvidersList] = useState<any[]>([]);
  const [form, setForm] = useState({
    employee_id: '',
    insurance_provider_id: '',
    benefit_type_id: '',
    policy_number: '',
    coverage_amount: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: ''
  });

  const loadData = () => {
    CompensationService.getBpjsRecords().then((result) => {
      if (result && Array.isArray(result.data)) {
        setDataList(result.data);
      }
    });
  };

  useEffect(() => {
    loadData();
    CompensationService.getBenefitTypes().then((res) => setBenefitTypesList(res.data));
    CompensationService.getInsuranceProviders().then((res) => setInsuranceProvidersList(res.data));
    import('@/lib/services').then(({ PeopleService }) => {
      PeopleService.getEmployees().then((res) => {
        if (Array.isArray(res.data)) setEmployees(res.data);
      });
    });
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.end_date) delete (payload as any).end_date;
    if (!payload.coverage_amount) delete (payload as any).coverage_amount;
    
    const { error } = await CompensationService.createInsurance(payload);
    if (error) {
      addToast({ title: 'Error', description: 'Failed to assign insurance: ' + error, variant: 'danger' });
    } else {
      addToast({ title: 'Success', description: 'Insurance successfully assigned!', variant: 'success' });
      setIsAddOpen(false);
      loadData();
    }
  };

  const handleExportTable = () => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;
    const headers = ['employee', 'policyNumber', 'provider', 'policyType', 'coverage', 'issueDate', 'status'];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(header => `"${String(row.getValue(header)).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'insurance-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPolicies = useMemo(() => {
    const query = search.toLowerCase();
    return dataList.filter((policy) => {
      const matchesSearch =
        policy.employee.toLowerCase().includes(query) ||
        policy.provider.toLowerCase().includes(query) ||
        policy.policyNumber.toLowerCase().includes(query);

      const matchesPolicyType = policyType === 'All' || policy.policyType === policyType;
      const matchesStatus = status === 'All' || policy.status === status;

      return matchesSearch && matchesPolicyType && matchesStatus;
    });
  }, [dataList, search, policyType, status]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'employee', header: 'Karyawan' },
      { accessorKey: 'policyNumber', header: 'Policy Number' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'policyType', header: 'Type' },
      { accessorKey: 'coverage', header: 'Coverage' },
      { accessorKey: 'expiryDate', header: 'Expiry Tanggal' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: () => (
          <Link href="/compensation/insurance" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-brand-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredPolicies,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const activePolicies = dataList.filter((p) => p.status === 'Aktif').length;
  const expiredPolicies = dataList.filter((p) => p.status === 'Kedaluwarsa').length;
  const totalCoverage = dataList.reduce((sum, p) => sum + p.claimLimit, 0);
  const uniqueProviders = new Set(dataList.map((p) => p.provider)).size;

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Compensation / Insurance</p>
            <h1 className="text-3xl font-semibold text-foreground">Insurance Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Track employee insurance policies, coverage details, and dependent management.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand-500">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Active Policies</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{activePolicies}</p>
          <p className="mt-2 text-sm text-emerald-600">Currently active</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Expired Policies</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{expiredPolicies}</p>
          <p className="mt-2 text-sm text-rose-600">Renewal needed</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Total Coverage</p>
          <p className="mt-3 text-2xl font-semibold text-foreground">Rp {(totalCoverage / 1000000000).toFixed(1)}B</p>
          <p className="mt-2 text-sm text-muted">Combined limit</p>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Providers</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{uniqueProviders}</p>
          <p className="mt-2 text-sm text-muted">Active providers</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Coverage</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">Insurance Types</h2>
          <div className="mt-6 space-y-3">
            {[
              { name: 'Health Insurance', count: 4, premium: '850-950K' },
              { name: 'Life Insurance', count: 2, premium: '125K' },
              { name: 'Accident Insurance', count: 1, premium: '200K' },
              { name: 'Disability', count: 1, premium: 'Included' },
            ].map((type) => (
              <div key={type.name} className="rounded-2xl bg-card/80 p-3 border border-border/60">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{type.name}</p>
                  <span className="text-xs font-semibold text-primary">{type.count} policies</span>
                </div>
                <p className="text-xs text-muted mt-1">Premium: {type.premium}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Expiry monitoring</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">Upcoming Expirations</h2>
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Ahmad Wijaya - POL-2025-001</p>
                <p className="text-xs text-muted mt-1">Expires in 202 days (2026-01-14)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Ahmad Wijaya - POL-2025-002</p>
                <p className="text-xs text-muted mt-1">Expires in 202 days (2026-01-14)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-card/80 p-3 border border-amber-500/20">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Budi Santoso - POL-2025-005</p>
                <p className="text-xs text-muted mt-1">Expires in 219 days (2026-01-31)</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-border bg-surface/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Insurance table</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">All policies</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" className="rounded-full px-5 py-3" onClick={() => setIsAddOpen(true)}>
              <Plus className="h-4 w-4" /> Add Insurance
            </Button>
            <Button variant="secondary" className="rounded-full px-5 py-3" onClick={handleExportTable}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3" onClick={() => document.getElementById('search-insurance')?.focus()}>
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="search-insurance"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee or policy"
              className="w-full rounded-3xl border border-border bg-surface/90 py-4 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-brand-500"
            />
          </div>
          <select value={policyType} onChange={(event) => setPolicyType(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua jenis</option>
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Accident">Accident</option>
            <option value="Disability">Disability</option>
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-border bg-surface/90 p-4 text-sm text-foreground outline-none focus:border-brand-500">
            <option value="All">Semua status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Insurance" description="Register a new insurance policy for an employee.">
        <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Karyawan</label>
              <select required value={form.employee_id} onChange={e => setForm({...form, employee_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                <option value="">Pilih Karyawan</option>
                {employees?.map((emp: any) => <option key={emp.id} value={emp.id}>{emp.fullName}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Provider</label>
                <select required value={form.insurance_provider_id} onChange={e => setForm({...form, insurance_provider_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                  <option value="">Pilih Provider</option>
                  {insuranceProvidersList?.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Policy Type</label>
                <select required value={form.benefit_type_id} onChange={e => setForm({...form, benefit_type_id: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none">
                  <option value="">Pilih Tipe</option>
                  {benefitTypesList?.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Policy Number</label>
                <input required type="text" value={form.policy_number} onChange={e => setForm({...form, policy_number: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Coverage Amount</label>
                <input type="number" value={form.coverage_amount} onChange={e => setForm({...form, coverage_amount: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Start Date</label>
                <input required type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">End Date (Optional)</label>
                <input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Batal</Button>
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
