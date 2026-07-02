'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { payrollReady } from '@/lib/compensation-data';

export default function PayrollReadyPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredRecords = useMemo(() => {
    const query = search.toLowerCase();
    return payrollReady.filter((record) => {
      const matchesSearch =
        record.employee.toLowerCase().includes(query) ||
        record.department.toLowerCase().includes(query) ||
        record.position.toLowerCase().includes(query);

      const matchesDepartment = department === 'All' || record.department === department;
      const matchesStatus = status === 'All' || record.payrollIntegrationStatus === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [search, department, status]);

  const columns = useMemo<ColumnDef<typeof payrollReady[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'position', header: 'Position' },
      { accessorKey: 'department', header: 'Department' },
      {
        accessorKey: 'basicSalary',
        header: 'Basic Salary',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return <span>Rp {(value / 1000000).toFixed(1)}M</span>;
        },
      },
      {
        accessorKey: 'employmentType',
        header: 'Employment Type',
      },
      {
        accessorKey: 'payrollIntegrationStatus',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Ready'
              ? 'bg-emerald-50 text-emerald-200'
              : value === 'Pending'
              ? 'bg-amber-50 text-amber-200'
              : 'bg-rose-50 text-rose-200';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/compensation/payroll-ready" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-blue-500">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredRecords,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const readyCount = payrollReady.filter((p) => p.payrollIntegrationStatus === 'Ready').length;
  const totalSalaryBudget = payrollReady.reduce((sum, p) => sum + p.basicSalary, 0);
  const totalAllowances = payrollReady.reduce((sum, p) => sum + Object.values(p.allowances).reduce((a: number, b: number) => a + b, 0), 0);
  const uniqueDepartments = new Set(payrollReady.map((p) => p.department)).size;

  const departments = ['All', ...new Set(payrollReady.map((p) => p.department))];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Compensation / Payroll Ready</p>
            <h1 className="text-3xl font-semibold text-slate-900">Payroll Ready Setup</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Prepare payroll information including salary grades, allowances, deductions, and bank account details for integration.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-500">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Payroll Ready</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{readyCount}</p>
          <p className="mt-2 text-sm text-emerald-600">Of {payrollReady.length} employees</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Salary Budget</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">Rp {(totalSalaryBudget / 1000000000).toFixed(2)}B</p>
          <p className="mt-2 text-sm text-slate-400">Monthly payroll</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Allowances</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">Rp {(totalAllowances / 1000000000).toFixed(2)}B</p>
          <p className="mt-2 text-sm text-slate-400">Monthly total</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Departments</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{uniqueDepartments}</p>
          <p className="mt-2 text-sm text-slate-400">With payroll data</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Configuration</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Allowance Components</h2>
          <div className="mt-6 space-y-3">
            {[
              { name: 'Basic Salary', employees: payrollReady.length, total: totalSalaryBudget },
              { name: 'Transportation', employees: payrollReady.filter((p) => p.allowances.transportation > 0).length, total: payrollReady.reduce((sum, p) => sum + p.allowances.transportation, 0) },
              { name: 'Meal Allowance', employees: payrollReady.filter((p) => p.allowances.meal > 0).length, total: payrollReady.reduce((sum, p) => sum + p.allowances.meal, 0) },
              { name: 'Accommodation', employees: payrollReady.filter((p) => p.allowances.accommodation > 0).length, total: payrollReady.reduce((sum, p) => sum + p.allowances.accommodation, 0) },
            ].map((item) => (
              <div key={item.name} className="rounded-2xl bg-white/80 p-3 border border-slate-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  <span className="text-xs font-semibold text-blue-600">Rp {(item.total / 1000000).toFixed(0)}M</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{item.employees} employees</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Integration</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Payroll Integration Status</h2>
          <div className="mt-6 space-y-3">
            {[
              { status: 'Ready', count: readyCount, color: 'bg-emerald-500' },
              { status: 'Pending', count: payrollReady.filter((p) => p.payrollIntegrationStatus === 'Pending').length, color: 'bg-amber-500' },
              { status: 'Error', count: payrollReady.filter((p) => p.payrollIntegrationStatus === 'Error').length, color: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.status} className="rounded-2xl bg-white/80 p-3 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <p className="text-sm font-medium text-slate-900">{item.status}</p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-3 rounded-2xl bg-blue-50/50 border border-sky-500/20">
            <p className="text-xs font-semibold text-blue-600 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Ready for payroll integration system
            </p>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Payroll table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">All employees</h2>
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
              placeholder="Search employee or position"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'All departments' : dept}
              </option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-blue-500">
            <option value="All">All statuses</option>
            <option value="Ready">Ready</option>
            <option value="Pending">Pending</option>
            <option value="Error">Error</option>
          </select>
        </div>

        <div className="mt-6">
          <DataTable table={table} />
        </div>
      </Card>
    </div>
  );
}
