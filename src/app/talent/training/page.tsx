'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { employeeDirectory } from '@/lib/people-data';
import { Calendar, Users, Award, AlertTriangle, Play, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

export default function TrainingDashboardPage() {
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [allParticipants, setAllParticipants] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  const loadData = async () => {
    const plansRes = await TalentService.getPlannings();
    if (plansRes && plansRes.data) setPlannings(plansRes.data);

    const realsRes = await TalentService.getRealizations();
    if (realsRes && realsRes.data) {
      setRealizations(realsRes.data);
      
      const tempParts: any[] = [];
      const tempCerts: any[] = [];
      for (const real of realsRes.data) {
        const parts = await TalentService.getParticipants(real.id);
        if (parts && parts.data) tempParts.push(...parts.data);
        const certs = await TalentService.getCertificatesByRealization(real.id);
        if (certs && certs.data) tempCerts.push(...certs.data);
      }
      setAllParticipants(tempParts);
      setCertificates(tempCerts);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 1. Upcoming Trainings count
  const upcomingCount = useMemo(() => {
    return plannings.filter(p => p.status === 'Approved' || p.status === 'Scheduled').length;
  }, [plannings]);

  // 2. Completed Trainings count
  const completedCount = useMemo(() => {
    return realizations.filter(r => r.status === 'Completed').length;
  }, [realizations]);

  // 3. Expired certificates count
  const expiredCount = useMemo(() => {
    return certificates.filter(c => {
      if (!c.expiration_date) return false;
      return new Date(c.expiration_date).getTime() < new Date().getTime();
    }).length;
  }, [certificates]);

  // 4. Training this month (Aug 2026 as reference year in mock data)
  const trainingsThisMonth = useMemo(() => {
    return plannings.filter(p => {
      if (!p.start_date) return false;
      return p.start_date.includes('2026-08');
    }).length;
  }, [plannings]);

  // 5. Participants this month
  const participantsThisMonth = useMemo(() => {
    const activeRealIds = realizations.map(r => r.id);
    return allParticipants.filter(p => activeRealIds.includes(p.realization_id)).length;
  }, [allParticipants, realizations]);

  // 6. Mandatory Compliance rate
  const complianceRate = useMemo(() => {
    const totalEmployees = employeeDirectory.length;
    // Mock compliant count (employees who completed Safety or Food Safety)
    const compliantCount = Math.floor(totalEmployees * 0.78);
    return Math.round((compliantCount / totalEmployees) * 100);
  }, []);

  // 7. Top Training Categories data for Chart
  const categoryChartData = useMemo(() => {
    const map: Record<string, number> = {};
    plannings.forEach(p => {
      const cat = p.training_type || 'Other';
      map[cat] = (map[cat] || 0) + 1;
    });
    return Object.keys(map).map(name => ({
      name,
      value: map[name]
    }));
  }, [plannings]);

  // 8. Upcoming list (next 3 scheduled/approved)
  const upcomingList = useMemo(() => {
    return plannings
      .filter(p => p.status === 'Approved' || p.status === 'Scheduled')
      .slice(0, 3);
  }, [plannings]);

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Siklus Pengembangan Talenta</p>
            <h1 className="text-3xl font-semibold text-foreground">Dashboard Analytics Pelatihan</h1>
            <p className="mt-2 text-sm text-muted">
              Pantau performa program pelatihan, tingkat kepatuhan wajib, sertifikat aktif, dan statistik partisipasi.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/talent/training/planning">
              <Button className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold">
                Buka Alur Kerja Pelatihan <Play className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        {/* KPI Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
          <Card className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Akan Datang</p>
                <p className="mt-4 text-3xl font-semibold text-foreground">{upcomingCount} Pelatihan</p>
                <p className="mt-2 text-xs text-muted-foreground">Status Approved / Scheduled</p>
              </div>
              <div className="p-3 bg-brand-500/10 text-brand-600 rounded-2xl">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Selesai Realisasi</p>
                <p className="mt-4 text-3xl font-semibold text-foreground">{completedCount} Program</p>
                <p className="mt-2 text-xs text-emerald-600 font-medium">Realisasi berstatus Selesai</p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Tingkat Kepatuhan</p>
                <p className="mt-4 text-3xl font-semibold text-foreground">{complianceRate}%</p>
                <p className="mt-2 text-xs text-muted-foreground">Matriks Pelatihan Wajib</p>
              </div>
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </Card>

          <Card className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Sertifikat Expired</p>
                <p className="mt-4 text-3xl font-semibold text-foreground">{expiredCount} Dokumen</p>
                <p className="mt-2 text-xs text-rose-500 font-medium">Butuh Pembaruan</p>
              </div>
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3 mb-8">
          {/* Top Categories Chart */}
          <Card className="xl:col-span-2 rounded-[28px] border border-border p-6 bg-card">
            <h3 className="text-lg font-bold mb-1 text-foreground">Kategori Pelatihan Utama</h3>
            <p className="text-xs text-muted-foreground mb-6">Distribusi program pelatihan berdasarkan jenis kompetensi.</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick Info Month & Upcoming list */}
          <Card className="rounded-[28px] border border-border p-6 bg-card space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">Statistik Bulan Ini</h3>
              <p className="text-xs text-muted-foreground">Periode berjalan: Agustus 2026</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-secondary/30">
                  <span className="text-2xl font-bold block">{trainingsThisMonth}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Pelatihan Aktif</span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/30">
                  <span className="text-2xl font-bold block">{participantsThisMonth}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">Peserta Terdaftar</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-bold text-sm text-foreground mb-3">Agenda Terdekat</h4>
              <div className="space-y-3">
                {upcomingList.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-xs border-b border-border pb-2 last:border-0 last:pb-0">
                    <div>
                      <strong className="block text-foreground truncate max-w-[150px]">{item.title}</strong>
                      <span className="text-[10px] text-muted-foreground">{item.start_date} | {item.location}</span>
                    </div>
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-500/10 px-2 py-0.5 rounded-full">{item.unit}</span>
                  </div>
                ))}
                {upcomingList.length === 0 && (
                  <p className="text-xs text-muted italic">Tidak ada agenda terdekat.</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
