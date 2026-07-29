'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, CheckCircle, XCircle, RefreshCw, Save, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { useToast } from '@/components/ui/toast';

export default function ParticipantAttendancePage() { 
  const { addToast } = useToast();
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [selectedRealizationId, setSelectedRealizationId] = useState('');
  const [participants, setParticipants] = useState<any[]>([]);
  const [attendances, setAttendances] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  // Local editing states for attendance
  const [attendanceForm, setAttendanceForm] = useState<Record<string, { status: string; notes: string }>>({});

  const loadData = async () => {
    const plansRes = await TalentService.getPlannings();
    if (plansRes && plansRes.data) setPlannings(plansRes.data);

    const realsRes = await TalentService.getRealizations();
    if (realsRes && realsRes.data) {
      setRealizations(realsRes.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Fetch participants & their attendance for the selected realization
  useEffect(() => {
    if (selectedRealizationId) {
      // 1. Fetch participants
      TalentService.getParticipants(selectedRealizationId).then((res: any) => {
        if (res && res.data) {
          setParticipants(res.data);
          
          // 2. Fetch existing attendances
          TalentService.getAttendances(selectedRealizationId).then((attRes: any) => {
            const attMap: Record<string, { status: string; notes: string }> = {};
            
            // Initialize with "Absent" by default or load existing
            res.data.forEach((part: any) => {
              const match = attRes?.data?.find((a: any) => a.participant_id === part.id);
              attMap[part.id] = {
                status: match ? match.status : 'Absent',
                notes: match ? match.notes : ''
              };
            });
            setAttendanceForm(attMap);
            if (attRes && attRes.data) setAttendances(attRes.data);
          });
        }
      });
    } else {
      setParticipants([]);
      setAttendances([]);
      setAttendanceForm({});
    }
  }, [selectedRealizationId]);

  const selectedRealizationDetail = useMemo(() => {
    if (!selectedRealizationId) return null;
    const real = realizations.find(r => r.id === selectedRealizationId);
    if (!real) return null;
    const plan = plannings.find(p => p.id === real.planning_id);
    return {
      ...real,
      planningTitle: plan ? plan.title : '',
      planningUnit: plan ? plan.unit : '',
      planningDate: plan ? plan.start_date : '',
      planningTrainer: plan ? plan.trainer : ''
    };
  }, [selectedRealizationId, realizations, plannings]);

  const handleStatusChange = (partId: string, status: string) => {
    setAttendanceForm(prev => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        status
      }
    }));
  };

  const handleNotesChange = (partId: string, notes: string) => {
    setAttendanceForm(prev => ({
      ...prev,
      [partId]: {
        ...prev[partId],
        notes
      }
    }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedRealizationId) return;

    let savedCount = 0;
    for (const partId of Object.keys(attendanceForm)) {
      const data = attendanceForm[partId];
      await TalentService.saveAttendance({
        participant_id: partId,
        status: data.status,
        notes: data.notes,
        attendance_date: selectedRealizationDetail?.planningDate || new Date().toISOString().split('T')[0]
      });
      savedCount++;
    }

    addToast({ title: 'Notifikasi', description: `Berhasil menyimpan kehadiran untuk ${savedCount} peserta.`, variant: 'success' });
    // Reload state
    loadData();
  };

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => 
      p.employee_name.toLowerCase().includes(search.toLowerCase()) || 
      p.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [participants, search]);

  return (
    <SectionContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Select Realization */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="rounded-[28px] border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 font-semibold text-foreground">Pilih Realisasi Pelatihan</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Pilih Pelaksanaan (Realization)</label>
                <select
                  value={selectedRealizationId}
                  onChange={(e) => setSelectedRealizationId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                >
                  <option value="">-- Pilih Realisasi --</option>
                  {realizations.map(r => {
                    const plan = plannings.find(p => p.id === r.planning_id);
                    return (
                      <option key={r.id} value={r.id}>
                        {plan ? plan.title : 'Judul Tidak Ditemukan'} [{r.status}]
                      </option>
                    );
                  })}
                </select>
              </div>

              {selectedRealizationDetail && (
                <div className="border-t border-border pt-4 mt-4 space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Judul Pelatihan</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningTitle}</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Unit Kerja</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningUnit}</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Trainer / Pembicara</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningTrainer}</div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Tanggal Pelaksanaan</label>
                    <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningDate}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right column: Attendance sheet */}
        <div className="lg:col-span-2">
          {selectedRealizationId ? (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Lembar Kehadiran Peserta</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Isi kehadiran peserta. Kehadiran menentukan kelayakan penerbitan sertifikat.
                  </p>
                </div>
                <div>
                  <Button
                    onClick={handleSaveAttendance}
                    className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" /> Simpan Presensi
                  </Button>
                </div>
              </div>

              {/* Warnings */}
              <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl text-xs mb-6">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Aturan Kelayakan Sertifikat:</strong> Hanya peserta dengan status kehadiran <strong>Present (Hadir)</strong> yang memenuhi syarat untuk penerbitan sertifikat digital.
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4 max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama peserta..."
                  className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500"
                />
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Nama Lengkap</th>
                      <th className="px-6 py-4">Tipe / Perusahaan</th>
                      <th className="px-6 py-4">Status Kehadiran</th>
                      <th className="px-6 py-4">Catatan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredParticipants.map((part) => {
                      const state = attendanceForm[part.id] || { status: 'Absent', notes: '' };
                      return (
                        <tr key={part.id} className="hover:bg-secondary/40 transition">
                          <td className="px-6 py-4 font-semibold text-foreground">
                            {part.employee_name}
                          </td>
                          <td className="px-6 py-4 text-xs">
                            <div className="font-semibold text-foreground">{part.company}</div>
                            <div className="text-muted-foreground">{part.is_external ? 'Eksternal' : 'Internal'}</div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={state.status}
                              onChange={(e) => handleStatusChange(part.id, e.target.value)}
                              className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs outline-none focus:border-brand-500 font-semibold"
                            >
                              <option value="Present">Present (Hadir)</option>
                              <option value="Absent">Absent (Absen)</option>
                              <option value="Late">Late (Terlambat)</option>
                              <option value="Excused">Excused (Izin)</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={state.notes}
                              onChange={(e) => handleNotesChange(part.id, e.target.value)}
                              placeholder="Keterangan..."
                              className="w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs outline-none focus:border-brand-500"
                            />
                          </td>
                        </tr>
                      );
                    })}
                    {filteredParticipants.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-muted">Belum ada peserta dalam realisasi ini.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center text-muted">
              <Calendar className="h-12 w-12 text-muted mb-4 opacity-40" />
              <p className="font-semibold">Realisasi Pelatihan Belum Terpilih</p>
              <p className="text-sm mt-1 max-w-sm">Pilih salah satu realisasi pelatihan di sebelah kiri untuk mengelola absensi dan tingkat kehadiran peserta.</p>
            </Card>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
