'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Info, Clock, MapPin, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function TrainingCalendarPage() {
  const router = useRouter();
  const [plannings, setPlannings] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // Default to August 2026 as per data
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const loadData = () => {
    TalentService.getPlannings().then((res: any) => {
      if (res && res.data) setPlannings(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const firstDayIndex = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);

  const prevMonthDays = useMemo(() => {
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;
    const totalDays = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    return Array.from({ length: firstDayIndex }, (_, i) => ({
      day: totalDays - firstDayIndex + i + 1,
      isCurrentMonth: false,
      date: new Date(prevMonthYear, prevMonth, totalDays - firstDayIndex + i + 1)
    }));
  }, [year, month, firstDayIndex]);

  const currentMonthDays = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
      date: new Date(year, month, i + 1)
    }));
  }, [year, month, daysInMonth]);

  const nextMonthDays = useMemo(() => {
    const totalDisplayed = prevMonthDays.length + currentMonthDays.length;
    const remaining = 42 - totalDisplayed; // Standard 6-row grid
    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    return Array.from({ length: remaining }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
      date: new Date(nextMonthYear, nextMonth, i + 1)
    }));
  }, [prevMonthDays, currentMonthDays, year, month]);

  const calendarDays = useMemo(() => {
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [prevMonthDays, currentMonthDays, nextMonthDays]);

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return plannings.filter(p => p.start_date === dateStr);
  };

  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    }
  };

  // Status Color badge helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500 text-white';
      case 'Submitted': return 'bg-blue-500 text-white';
      case 'Cancelled': return 'bg-rose-500 text-white';
      case 'Completed': return 'bg-green-600 text-white';
      default: return 'bg-amber-500 text-white';
    }
  };

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Siklus Pengembangan Talenta</p>
          <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-8 w-8 text-brand-600" /> Kalender Pelatihan
          </h1>
          <p className="mt-2 text-sm text-muted">
            Tinjau jadwal pelaksanaan pelatihan harian, mingguan, dan bulanan PT Indocater.
          </p>
        </div>
        <div className="flex gap-2 self-start md:self-center">
          <Button variant="outline" className="rounded-xl" onClick={() => router.push('/talent/training/planning')}>
            Kembali ke Proposal
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar Main Grid */}
        <div className="lg:col-span-3">
          <Card className="rounded-[28px] border border-border p-6 shadow-sm">
            {/* Header controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg p-2" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-bold text-foreground">
                  {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="outline" size="sm" className="rounded-lg p-2" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* View toggle */}
              <div className="flex gap-1 rounded-xl bg-secondary p-1">
                {(['month', 'week', 'day'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition ${
                      viewMode === mode ? 'bg-card text-foreground shadow' : 'text-muted hover:text-muted-foreground'
                    }`}
                  >
                    {mode === 'month' ? 'Bulan' : mode === 'week' ? 'Minggu' : 'Hari'}
                  </button>
                ))}
              </div>
            </div>

            {/* Month View grid */}
            {viewMode === 'month' && (
              <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden border border-border">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                  <div key={d} className="bg-secondary p-3 text-center text-xs font-bold text-muted-foreground">
                    {d}
                  </div>
                ))}
                {calendarDays.map((cell, idx) => {
                  const events = getEventsForDate(cell.date);
                  return (
                    <div
                      key={idx}
                      className={`bg-card min-h-24 p-2 transition hover:bg-secondary/20 flex flex-col justify-between ${
                        !cell.isCurrentMonth ? 'opacity-40 bg-secondary/5' : ''
                      }`}
                    >
                      <span className="text-xs font-semibold text-muted-foreground self-end">{cell.day}</span>
                      <div className="space-y-1 mt-2 flex-grow overflow-y-auto max-h-16">
                        {events.map(event => (
                          <div
                            key={event.id}
                            onClick={() => setSelectedPlan(event)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold truncate cursor-pointer transition hover:opacity-90 ${getStatusColor(event.status)}`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Week View */}
            {viewMode === 'week' && (
              <div className="border border-border rounded-xl divide-y divide-border overflow-hidden">
                {Array.from({ length: 7 }).map((_, i) => {
                  const dayDate = new Date(currentDate);
                  dayDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
                  const events = getEventsForDate(dayDate);
                  return (
                    <div key={i} className="flex p-4 hover:bg-secondary/10 transition">
                      <div className="w-24 flex-shrink-0 text-center border-r border-border pr-4">
                        <div className="text-xs font-bold text-muted-foreground">
                          {dayDate.toLocaleDateString('id-ID', { weekday: 'short' })}
                        </div>
                        <div className="text-2xl font-bold text-foreground">{dayDate.getDate()}</div>
                      </div>
                      <div className="pl-4 flex-grow space-y-2">
                        {events.map(event => (
                          <div
                            key={event.id}
                            onClick={() => setSelectedPlan(event)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer hover:bg-secondary/40 transition ${getStatusColor(event.status)} bg-opacity-10 border-current text-foreground`}
                          >
                            <div>
                              <div className="font-semibold text-sm">{event.title}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" /> {event.start_time} | <MapPin className="h-3 w-3" /> {event.location}
                              </div>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                        ))}
                        {events.length === 0 && (
                          <div className="text-xs text-muted italic p-2">Tidak ada jadwal pelatihan.</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Day View */}
            {viewMode === 'day' && (
              <div className="p-4 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground mb-4">
                  Jadwal Hari: {currentDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                {getEventsForDate(currentDate).map(event => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedPlan(event)}
                    className="p-4 rounded-2xl border border-border bg-secondary/10 hover:bg-secondary/20 transition cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-foreground">{event.title}</h4>
                      <div className="grid grid-cols-2 gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {event.start_time} WIB</div>
                        <div className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</div>
                        <div className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> {event.training_type}</div>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                ))}
                {getEventsForDate(currentDate).length === 0 && (
                  <Card className="p-8 text-center text-muted border border-dashed rounded-2xl">
                    Tidak ada jadwal pelatihan untuk hari ini.
                  </Card>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Side Panel: Selected Detail */}
        <div className="lg:col-span-1">
          {selectedPlan ? (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm bg-card space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-muted-foreground">{selectedPlan.planning_number}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${getStatusColor(selectedPlan.status)}`}>
                  {selectedPlan.status}
                </span>
              </div>
              <h3 className="font-bold text-lg text-foreground">{selectedPlan.title}</h3>
              
              <div className="space-y-3 text-xs text-muted-foreground">
                <div>
                  <span className="font-semibold block text-foreground">Unit Kerja</span>
                  {selectedPlan.unit}
                </div>
                <div>
                  <span className="font-semibold block text-foreground">Tanggal & Waktu</span>
                  {selectedPlan.start_date} | {selectedPlan.start_time} WIB
                </div>
                <div>
                  <span className="font-semibold block text-foreground">Lokasi / Media</span>
                  {selectedPlan.location}
                </div>
                <div>
                  <span className="font-semibold block text-foreground">Trainer / Provider</span>
                  {selectedPlan.trainer} ({selectedPlan.provider})
                </div>
                <div>
                  <span className="font-semibold block text-foreground">Estimasi Biaya</span>
                  Rp {Number(selectedPlan.cost || 0).toLocaleString('id-ID')}
                </div>
                {selectedPlan.notes && (
                  <div>
                    <span className="font-semibold block text-foreground">Deskripsi / Catatan</span>
                    {selectedPlan.notes}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <Link href={`/talent/training/planning`} className="w-full">
                  <Button className="w-full rounded-xl bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold">
                    Edit Perencanaan
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center text-muted bg-card">
              <Info className="h-10 w-10 opacity-30 mb-2" />
              <p className="font-semibold text-sm">Pilih Jadwal</p>
              <p className="text-xs max-w-[180px] mt-1">Klik salah satu program pelatihan di kalender untuk melihat detail jadwal.</p>
            </Card>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
