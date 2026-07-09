'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, Heart, Home, Bus, Utensils, Award, Users2, Smile, Download, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { welfarePrograms } from '@/lib/compensation-data';

export default function WelfarePage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredPrograms = useMemo(() => {
    const query = search.toLowerCase();
    return welfarePrograms.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query) ||
        program.provider?.toLowerCase().includes(query);

      const matchesCategory = categoryFilter === 'All' || program.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      Assistance: <Heart className="h-5 w-5" />,
      Housing: <Home className="h-5 w-5" />,
      Transportation: <Bus className="h-5 w-5" />,
      Meal: <Utensils className="h-5 w-5" />,
      Recognition: <Award className="h-5 w-5" />,
      Family: <Users2 className="h-5 w-5" />,
      Wellness: <Smile className="h-5 w-5" />,
    };
    return icons[category] || <Heart className="h-5 w-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Assistance: 'from-rose-500/20 to-rose-500/10 border-rose-500/20 text-rose-300',
      Housing: 'from-brand-500/20 to-brand-500/10 border-brand-500/20 text-brand-300',
      Transportation: 'from-orange-500/20 to-orange-500/10 border-orange-500/20 text-orange-300',
      Meal: 'from-amber-500/20 to-amber-500/10 border-amber-500/20 text-amber-300',
      Recognition: 'from-emerald-500/20 to-emerald-500/10 border-emerald-500/20 text-emerald-300',
      Family: 'from-purple-500/20 to-purple-500/10 border-purple-500/20 text-purple-300',
      Wellness: 'from-cyan-500/20 to-cyan-500/10 border-cyan-500/20 text-cyan-300',
    };
    return colors[category] || 'from-slate-500/20 to-slate-500/10 border-slate-500/20 text-slate-700';
  };

  const totalBudget = welfarePrograms.reduce((sum, p) => sum + p.budget, 0);
  const totalParticipants = welfarePrograms.reduce((sum, p) => sum + p.participants, 0);
  const activePrograms = welfarePrograms.filter((p) => p.status === 'Active').length;

  const categories = ['All', ...new Set(welfarePrograms.map((p) => p.category))];

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Compensation / Welfare</p>
            <h1 className="text-3xl font-semibold text-slate-900">Karyawan Welfare Programs</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Explore comprehensive welfare and wellness initiatives supporting employee wellbeing and quality of life.</p>
          </div>
          <Link href="/compensation" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-500">
            Back to compensation
          </Link>
        </div>
      </SectionContainer>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Active Programs</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{activePrograms}</p>
          <p className="mt-2 text-sm text-emerald-600">Currently running</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Participants</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalParticipants}</p>
          <p className="mt-2 text-sm text-slate-400">Enrolled employees</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Budget</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">Rp {(totalBudget / 1000000000).toFixed(1)}B</p>
          <p className="mt-2 text-sm text-slate-400">Annual allocation</p>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Categories</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{categories.length - 1}</p>
          <p className="mt-2 text-sm text-slate-400">Program types</p>
        </Card>
      </div>

      <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Programs</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Welfare Programs</h2>
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
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search program"
              className="w-full rounded-3xl border border-slate-200 bg-white/90 py-4 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-brand-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-900 outline-none focus:border-brand-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className={`rounded-[28px] border-2 bg-gradient-to-br ${getCategoryColor(program.category)} p-6 shadow-card transition hover:shadow-lg hover:border-opacity-100`}>
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-slate-900">{getCategoryIcon(program.category)}</div>
              <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${program.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-700'}`}>
                {program.status}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">{program.name}</h3>
            <p className="mt-2 text-sm text-slate-700 line-clamp-2">{program.description}</p>

            <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Budget</span>
                <span className="text-sm font-semibold text-slate-900">Rp {(program.budget / 1000000).toFixed(0)}M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Participants</span>
                <span className="text-sm font-semibold text-slate-900">{program.participants}</span>
              </div>
              {program.provider && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Provider</span>
                  <span className="text-xs font-medium text-slate-700">{program.provider.split(' ').slice(0, 2).join(' ')}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white/20">Details</button>
              <button className="flex-1 rounded-2xl bg-brand-600/20 px-3 py-2 text-xs font-semibold text-brand-600 transition hover:bg-brand-600/30">Enroll</button>
            </div>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-slate-50/50 py-12 text-center">
          <p className="text-sm text-slate-400">No welfare programs match your search.</p>
        </div>
      )}
    </div>
  );
}
