'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, CheckCircle, XCircle, Clock, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';

export default function TrainingApprovalPage() {
  const [plannings, setPlannings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  
  // Approval Form state
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    approval_status: 'Approved',
    approver: 'Fitri Novita (Director HRD)',
    approval_notes: ''
  });

  const loadPlannings = () => {
    TalentService.getPlannings().then((res: any) => {
      if (res && res.data) setPlannings(res.data);
    });
  };

  useEffect(() => {
    loadPlannings();
  }, []);

  const handleOpenApproval = (plan: any) => {
    setSelectedPlan(plan);
    setForm({
      approval_status: 'Approved',
      approver: 'Fitri Novita (Director HRD)',
      approval_notes: ''
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    const payload = {
      planning_id: selectedPlan.id,
      approval_status: form.approval_status,
      approver: form.approver,
      approval_notes: form.approval_notes
    };

    const { error } = await TalentService.saveApproval(payload);
    if (!error) {
      alert(`Proposal Pelatihan berhasil ${form.approval_status === 'Approved' ? 'disetujui' : 'ditolak'}!`);
      setIsOpen(false);
      setSelectedPlan(null);
      loadPlannings();
    } else {
      alert('Gagal menyimpan persetujuan: ' + error);
    }
  };

  const filteredPlannings = useMemo(() => {
    return plannings.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.planning_number.toLowerCase().includes(search.toLowerCase());
      // Only show Submitted or Draft for review
      return matchSearch;
    });
  }, [plannings, search]);

  return (
    <SectionContainer>
      <Card className="rounded-[28px] border border-border p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative w-64">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari proposal..."
              className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500"
            />
          </div>
          <Button onClick={loadPlannings} variant="outline" className="rounded-xl">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">No. Proposal</th>
                <th className="px-6 py-4">Judul Program</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Trainer & Biaya</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPlannings.map((plan) => (
                <tr key={plan.id} className="hover:bg-secondary/40 transition">
                  <td className="px-6 py-4 font-mono font-bold text-xs">{plan.planning_number}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{plan.title}</div>
                    <div className="text-xs text-muted-foreground">Periode: {plan.period}</div>
                  </td>
                  <td className="px-6 py-4">{plan.unit}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-xs">{plan.trainer}</div>
                    <div className="font-semibold text-xs text-primary">Rp {Number(plan.cost || 0).toLocaleString('id-ID')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                      plan.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : plan.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-500'
                        : plan.status === 'Submitted'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {plan.status !== 'Approved' && plan.status !== 'Rejected' ? (
                      <Button onClick={() => handleOpenApproval(plan)} className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold text-xs">
                        Tinjau Proposal
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-semibold italic">Selesai Ditinjau</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPlannings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">Tidak ada proposal pelatihan untuk ditinjau.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Review Approval Modal */}
      {isOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Tinjau Proposal Pelatihan</h3>
            <div className="space-y-3 mb-6 p-4 rounded-xl bg-secondary/30 border border-border text-sm">
              <div><strong>No. Proposal:</strong> {selectedPlan.planning_number}</div>
              <div><strong>Judul Pelatihan:</strong> {selectedPlan.title}</div>
              <div><strong>Unit Kerja:</strong> {selectedPlan.unit}</div>
              <div><strong>Trainer / Instruktur:</strong> {selectedPlan.trainer}</div>
              <div><strong>Estimasi Biaya:</strong> Rp {Number(selectedPlan.cost || 0).toLocaleString('id-ID')}</div>
              <div><strong>Catatan Proposal:</strong> {selectedPlan.notes || '-'}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Keputusan Persetujuan</label>
                <select
                  value={form.approval_status}
                  onChange={(e) => setForm({ ...form, approval_status: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                >
                  <option value="Approved">Setujui (Approved)</option>
                  <option value="Rejected">Tolak (Rejected)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Nama Penyetuju (Approver)</label>
                <input
                  type="text"
                  required
                  value={form.approver}
                  onChange={(e) => setForm({ ...form, approver: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Catatan Persetujuan</label>
                <textarea
                  required
                  value={form.approval_notes}
                  onChange={(e) => setForm({ ...form, approval_notes: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 h-24"
                  placeholder="Berikan alasan penyetujuan atau penolakan proposal..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-xl">
                  Batal
                </Button>
                <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold">
                  Simpan Keputusan
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </SectionContainer>
  );
}
