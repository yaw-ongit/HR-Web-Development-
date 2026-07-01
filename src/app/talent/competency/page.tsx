'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, RowSelectionState, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, ArrowRight, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { DataTable } from '@/components/ui/data-table';
import { competencies } from '@/lib/talent-data';

export default function TalentCompetencyPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const filteredCompetencies = useMemo(() => {
    const query = search.toLowerCase();
    return competencies.filter((comp) => {
      const matchesSearch =
        comp.employee.toLowerCase().includes(query) ||
        comp.competency.toLowerCase().includes(query) ||
        comp.assessor.toLowerCase().includes(query);

      const matchesLevel = level === 'All' || comp.level === level;
      return matchesSearch && matchesLevel;
    });
  }, [search, level]);

  const columns = useMemo<ColumnDef<typeof competencies[number]>[]>(
    () => [
      { accessorKey: 'employee', header: 'Employee' },
      { accessorKey: 'competency', header: 'Competency' },
      {
        accessorKey: 'level',
        header: 'Level',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const color =
            value === 'Expert'
              ? 'bg-emerald-500/15 text-emerald-200'
              : value === 'Advanced'
              ? 'bg-sky-500/15 text-sky-200'
              : value === 'Intermediate'
              ? 'bg-amber-500/15 text-amber-200'
              : 'bg-slate-600/15 text-slate-300';
          return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}>{value}</span>;
        },
      },
      { accessorKey: 'assessmentDate', header: 'Assessment date' },
      { accessorKey: 'assessor', header: 'Assessor' },
      { accessorKey: 'nextReviewDate', header: 'Next review' },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Link href="/talent/competency" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-sky-400">
            Review <ArrowRight className="h-3.5 w-3.5" />
          </Link>
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

  const levelCounts = [
    { level: 'Expert', count: 42, percentage: 11 },
    { level: 'Advanced', count: 124, percentage: 33 },
    { level: 'Intermediate', count: 68, percentage: 18 },
    { level: 'Beginner', count: 24, percentage: 6 },
  ];

  const metrics = [
    { label: 'Total competencies tracked', value: '258', subtext: 'Across organization' },
    { label: 'Expert level', value: '42', subtext: 'Employees' },
    { label: 'Pending review', value: '18', subtext: 'Due in next 30 days' },
    { label: 'Development plans', value: '34', subtext: 'In progress' },
  ];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Talent / Competency</p>
            <h1 className="text-3xl font-semibold text-slate-100">Competency management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Assess and develop employee competencies to ensure skill alignment and career growth.</p>
          </div>
          <Link href="/talent" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400">
            Back to talent
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => (
          <Card key={item.label} className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.subtext}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Skill distribution</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-100">Competency levels</h2>
          <div className="mt-6 space-y-4">
            {levelCounts.map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold text-slate-100">{item.level}</span>
                  <span className="text-sm text-slate-400">{item.count} employees</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div className="h-2 rounded-full bg-sky-400" style={{ width: `${item.percentage * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Competency focus</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-100">Top areas</h2>
          <div className="mt-6 space-y-3">
            <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/5">
              <p className="text-sm font-semibold text-slate-100">System Design</p>
              <p className="text-sm text-slate-400 mt-1">Expert: 8 | Advanced: 12</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/5">
              <p className="text-sm font-semibold text-slate-100">Cloud Architecture</p>
              <p className="text-sm text-slate-400 mt-1">Expert: 5 | Advanced: 18</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4 border border-white/5">
              <p className="text-sm font-semibold text-slate-100">People Management</p>
              <p className="text-sm text-slate-400 mt-1">Expert: 14 | Advanced: 22</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Competency table</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">Employee assessments</h2>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employee, competency, or assessor"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400">
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
    </div>
  );
}
