'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Save, Award, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { useToast } from '@/components/ui/toast';

const effectivenessOptions = ['Sangat Efektif', 'Efektif', 'Cukup', 'Kurang'];

export default function TrainingEvaluationPage() { 
  const { addToast } = useToast();
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [selectedRealizationId, setSelectedRealizationId] = useState('');
  const [evaluation, setEvaluation] = useState({
    score: '',
    effectiveness: 'Efektif',
    notes: '',
    recommendation: '',
    document_url: '',
    evaluation_date: new Date().toISOString().split('T')[0]
  });

  const loadData = () => {
    TalentService.getPlannings().then((res: any) => {
      if (res && res.data) setPlannings(res.data);
    });
    TalentService.getRealizations().then((res: any) => {
      if (res && res.data) {
        setRealizations(res.data);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Fetch evaluation when realization changes
  useEffect(() => {
    if (selectedRealizationId) {
      TalentService.getEvaluations(selectedRealizationId).then((res: any) => {
        if (res && res.data && res.data.length > 0) {
          const evalObj = res.data[0];
          setEvaluation({
            score: String(evalObj.score || ''),
            effectiveness: evalObj.effectiveness || 'Efektif',
            notes: evalObj.notes || '',
            recommendation: evalObj.recommendation || '',
            document_url: evalObj.document_url || '',
            evaluation_date: evalObj.evaluation_date || new Date().toISOString().split('T')[0]
          });
        } else {
          // Reset if none exists
          setEvaluation({
            score: '',
            effectiveness: 'Efektif',
            notes: '',
            recommendation: '',
            document_url: '',
            evaluation_date: new Date().toISOString().split('T')[0]
          });
        }
      });
    } else {
      setEvaluation({
        score: '',
        effectiveness: 'Efektif',
        notes: '',
        recommendation: '',
        document_url: '',
        evaluation_date: new Date().toISOString().split('T')[0]
      });
    }
  }, [selectedRealizationId]);

  // Realizations list mapped with their Planning details
  const realizationsWithPlanning = useMemo(() => {
    return realizations.map(r => {
      const plan = plannings.find(p => p.id === r.planning_id);
      return {
        ...r,
        planningTitle: plan ? plan.title : 'Judul Tidak Ditemukan',
        planningUnit: plan ? plan.unit : '-',
        planningPeriod: plan ? plan.period : '-',
        planningTrainer: plan ? plan.trainer : '-',
        planningType: plan ? plan.training_type : '-',
        planningDate: plan ? plan.start_date : '-'
      };
    });
  }, [realizations, plannings]);

  const selectedRealizationDetail = useMemo(() => {
    return realizationsWithPlanning.find(r => r.id === selectedRealizationId) || null;
  }, [realizationsWithPlanning, selectedRealizationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRealizationId) return;

    const payload = {
      realization_id: selectedRealizationId,
      score: Number(evaluation.score),
      effectiveness: evaluation.effectiveness,
      notes: evaluation.notes,
      recommendation: evaluation.recommendation,
      document_url: evaluation.document_url,
      evaluation_date: evaluation.evaluation_date
    };

    const { error } = await TalentService.saveEvaluation(payload);
    if (!error) {
      addToast({ title: 'Notifikasi', description: 'Evaluasi Pelatihan berhasil disimpan!', variant: 'success' });
      loadData();
    } else {
      addToast({ title: 'Error', description: 'Gagal menyimpan evaluasi: ' + error, variant: 'danger' });
    }
  };

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
                  {realizationsWithPlanning.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.planningTitle} [{r.status}]
                    </option>
                  ))}
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
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Kategori</label>
                      <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningType}</div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Tanggal</label>
                      <div className="text-sm font-semibold text-foreground mt-1">{selectedRealizationDetail.planningDate}</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Status Realisasi</label>
                    <div className="mt-1">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                        selectedRealizationDetail.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : selectedRealizationDetail.status === 'Ongoing'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {selectedRealizationDetail.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right column: Evaluation Form */}
        <div className="lg:col-span-2">
          {selectedRealizationId ? (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-6">Formulir Evaluasi & Penilaian</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Skor Rata-rata Pelatihan (0 - 100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={evaluation.score}
                      onChange={(e) => setEvaluation({ ...evaluation, score: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                      placeholder="Contoh: 85"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Efektivitas Pelatihan</label>
                    <select
                      value={evaluation.effectiveness}
                      onChange={(e) => setEvaluation({ ...evaluation, effectiveness: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    >
                      {effectivenessOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground">Tanggal Evaluasi</label>
                    <input
                      type="date"
                      required
                      value={evaluation.evaluation_date}
                      onChange={(e) => setEvaluation({ ...evaluation, evaluation_date: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Catatan Hasil Evaluasi</label>
                  <textarea
                    required
                    value={evaluation.notes}
                    onChange={(e) => setEvaluation({ ...evaluation, notes: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 h-28"
                    placeholder="Tuliskan ulasan komprehensif mengenai hasil pelatihan, tingkat keaktifan peserta, dan pencapaian target materi..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Rekomendasi Tindak Lanjut</label>
                  <textarea
                    required
                    value={evaluation.recommendation}
                    onChange={(e) => setEvaluation({ ...evaluation, recommendation: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 h-24"
                    placeholder="Contoh: Peserta direkomendasikan untuk sertifikasi kelulusan level lanjut / pelatihan praktik lapangan..."
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Dokumen Pendukung / Tautan Laporan (Opsional)</label>
                  <input
                    type="text"
                    value={evaluation.document_url}
                    onChange={(e) => setEvaluation({ ...evaluation, document_url: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    placeholder="Contoh: https://link-to-eval-doc.com/report.pdf atau upload document path"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold flex items-center gap-2">
                    <Save className="h-4 w-4" /> Simpan Evaluasi Pelatihan
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center text-muted">
              <FileText className="h-12 w-12 text-muted mb-4 opacity-40" />
              <p className="font-semibold">Realisasi Pelatihan Belum Terpilih</p>
              <p className="text-sm mt-1 max-w-sm">Pilih salah satu realisasi pelatihan di sebelah kiri untuk mengisi formulir penilaian dan evaluasi.</p>
            </Card>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
