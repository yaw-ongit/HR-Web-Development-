'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { benefits, benefitDistributionData } from '@/lib/compensation-data';

export default function BenefitsPage() {
  const [search, setSearch] = useState('');
  const [benefitType, setBenefitType] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredBenefits = useMemo(() => {
    const query = search.toLowerCase();
    return benefits.filter((benefit) => {
      const matchesSearch =
        benefit.employee.toLowerCase().includes(query) ||
        benefit.department.toLowerCase().includes(query) ||
        benefit.provider.toLowerCase().includes(query);

      const matchesBenefitType = benefitType === 'All' || benefit.benefitType === benefitType;
      const matchesStatus = status === 'All' || benefit.status === status;

      return matchesSearch && matchesBenefitType && matchesStatus;
    });
  }, [search, benefitType, status]);

  const columns = useMemo<ColumnDef<typeof benefits[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'department', header: 'Department' },
      { accessorKey: 'benefitType', header: 'Benefit Type' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'startDate', header: 'Start Date' },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        cell: ({ getValue }) => getValue() || '—',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Active'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'Inactive'
              ? 'bg-slate-600/15 text-slate-700'
              : value === 'Suspended'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/compensation/benefits" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-blue-500">
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

  const totalBenefits = benefits.length;
  const activeBenefits = benefits.filter((b) => b.status === 'Active').length;
  const uniqueEmployees = new Set(benefits.map((b) => b.employeeId)).size;
  const uniqueDepartments = new Set(benefits.map((b) => b.department)).size;

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Compensation / Benefits</p>
            <h1 className="text-3xl font-semibold text-slate-900">Benefits Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Manage and track employee benefits, allocations, and coverage across the organization.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-500">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Benefits</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalBenefits}</p>
          <p className="mt-2 text-sm text-slate-400">{activeBenefits} active</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Employees Covered</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{uniqueEmployees}</p>
          <p className="mt-2 text-sm text-slate-400">Active enrollment</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Benefit Categories</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{benefitTypes.length}</p>
          <p className="mt-2 text-sm text-slate-400">Types available</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Departments</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{uniqueDepartments}</p>
          <p className="mt-2 text-sm text-slate-400">With benefits</p>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Distribution</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Benefit Categories</h2>
        <div className="mt-6 space-y-3">
          {benefitDistributionData.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                <span className="text-sm font-semibold text-slate-900">{item.value} employees</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full" style={{ backgroundColor: item.fill, width: `${(item.value / 250) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Benefits table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">All benefits</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" className="rounded-full px-5 py-3">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" className="rounded-full px-5 py-3">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee or department"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>
          <select value={benefitType} onChange={(event) => setBenefitType(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500">
            <option value="All">All benefit types</option>
            {benefitTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500">
            <option value="All">All statuses</option>
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
    </div>
  );
}
