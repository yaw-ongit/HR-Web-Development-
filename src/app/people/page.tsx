'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Search, Plus, Upload, Download, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { PageContainer } from '@/components/layout/page-container';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { employeeDirectory, departmentOptions, positionOptions, statusOptions, contractOptions, branchOptions, locationOptions, genderOptions, EmployeeRecord } from '@/lib/people-data';

export default function PeopleDirectoryPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [position, setPosition] = useState('All');
  const [status, setStatus] = useState('All');
  const [contractType, setContractType] = useState('All');
  const [branch, setBranch] = useState('All');
  const [location, setLocation] = useState('All');
  const [gender, setGender] = useState('All');
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const filteredData = useMemo(() => {
    return employeeDirectory.filter((employee) => {
      const query = search.toLowerCase();
      const matchesSearch =
        employee.fullName.toLowerCase().includes(query) ||
        employee.employeeId.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query);

      const matchesDepartment = department === 'All' || employee.department === department;
      const matchesPosition = position === 'All' || employee.position === position;
      const matchesStatus = status === 'All' || employee.status === status;
      const matchesContract = contractType === 'All' || employee.contractType === contractType;
      const matchesBranch = branch === 'All' || employee.branch === branch;
      const matchesLocation = location === 'All' || employee.location === location;
      const matchesGender = gender === 'All' || employee.gender === gender;

      return matchesSearch && matchesDepartment && matchesPosition && matchesStatus && matchesContract && matchesBranch && matchesLocation && matchesGender;
    });
  }, [search, department, position, status, contractType, branch, location, gender]);

  const columns = useMemo<ColumnDef<EmployeeRecord>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-400 focus:ring-sky-400"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-400 focus:ring-sky-400"
          />
        ),
      },
      {
        accessorFn: (row) => row.fullName,
        id: 'employee',
        header: 'Employee',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-sky-500/15 text-slate-100">
              {row.original.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">{row.original.fullName}</p>
              <p className="text-xs text-slate-500">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'employeeId',
        header: 'Employee ID',
      },
      {
        accessorKey: 'department',
        header: 'Department',
      },
      {
        accessorKey: 'position',
        header: 'Position',
      },
      {
        accessorKey: 'status',
        header: 'Employment status',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color = value === 'Active' ? 'bg-emerald-500/15 text-emerald-200' : value === 'On leave' ? 'bg-amber-500/15 text-amber-200' : 'bg-slate-700/15 text-slate-300';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      {
        accessorKey: 'joinDate',
        header: 'Join date',
      },
      {
        accessorKey: 'contractType',
        header: 'Contract',
      },
      {
        accessorKey: 'manager',
        header: 'Manager',
      },
      {
        accessorKey: 'lastActivity',
        header: 'Last activity',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              href={`/people/${row.original.id}`}
              className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400"
            >
              Profile
            </Link>
            <button type="button" className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 hover:border-slate-600">
              Docs
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-slate-900/95 px-6 py-5 shadow-card">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-300">People</p>
              <h1 className="text-3xl font-semibold text-slate-100">Employee directory</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">A single source for employee profiles, org context and operational insight.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="rounded-full px-5 py-3">
                <Plus className="h-4 w-4" /> Add employee
              </Button>
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Upload className="h-4 w-4" /> Import
              </Button>
              <Button variant="ghost" className="rounded-full px-5 py-3">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="grid gap-4 xl:grid-cols-[1.6fr_minmax(0,1fr)]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  aria-label="Search employee"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search employee ID, name, department, email"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <select aria-label="Filter by department" value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All departments</option>
                  {departmentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select aria-label="Filter by position" value={position} onChange={(event) => setPosition(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All positions</option>
                  {positionOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All statuses</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select aria-label="Filter by contract type" value={contractType} onChange={(event) => setContractType(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All contracts</option>
                  {contractOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select aria-label="Filter by branch" value={branch} onChange={(event) => setBranch(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All branches</option>
                  {branchOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select aria-label="Filter by location" value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All locations</option>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select aria-label="Filter by gender" value={gender} onChange={(event) => setGender(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
                  <option value="All">All genders</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300">People module</p>
                <h2 className="text-xl font-semibold text-slate-100">Employee workspace</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-400">
              <p>Build faster employee workflows with a single workspace for directory, profile, org design, documents and analytics.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-sm text-slate-500">Total employee records</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">{employeeDirectory.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-sm text-slate-500">Branches</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-100">{branchOptions.length}</p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Workspace actions</p>
            <div className="mt-6 grid gap-3">
              <Link href="/people/org-structure" className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-4 text-sm text-slate-100 transition hover:border-sky-400">
                <div className="flex items-center justify-between gap-3">
                  <span>Organization structure</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </Link>
              <Link href="/people/documents" className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-4 text-sm text-slate-100 transition hover:border-sky-400">
                <div className="flex items-center justify-between gap-3">
                  <span>Document center</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <SectionContainer title="Employee directory">
        <DataTable table={table} />
      </SectionContainer>

      {filteredData.length === 0 && (
        <EmptyState
          title="No employees match your filters"
          description="Adjust search terms or remove filters to expand the employee list."
          ctaLabel="Clear search"
          href="/people"
        />
      )}
    </div>
  );
}
