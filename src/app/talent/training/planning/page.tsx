'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw, Printer, Download, Copy, Archive, Ban, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';
import { useToast } from '@/components/ui/toast';

const unitOptions = ['SDM', 'Teknologi', 'Penjualan', 'Keuangan', 'Produk', 'Hukum', 'Layanan Pelanggan', 'Production', 'Operations'];
const periodOptions = ['2026-Q1', '2026-Q2', '2026-Q3', '2026-Q4', '2027-Q1', '2027-Q2', '2027-Q3', '2027-Q4'];
const typeOptions = [
  'Safety',
  'Food Safety',
  'HRD',
  'Quality',
  'Technical',
  'Leadership',
  'ISO',
  'Internal Training',
  'External Training',
  'Compliance',
  'Other'
];

export default function TrainingPlanningPage() { 
  const { addToast } = useToast();
  const [plannings, setPlannings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterUnit, setFilterUnit] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('All');

  // Form Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    planning_number: '',
    title: '',
    unit: 'Teknologi',
    location: '',
    start_date: '',
    start_time: '',
    training_type: 'Technical',
    provider: '',
    trainer: '',
    cost: '',
    notes: '',
    period: '2026-Q3',
    status: 'Draft'
  });

  const loadPlannings = () => {
    TalentService.getPlannings().then((res: any) => {
      if (res && res.data) {
        setPlannings(res.data);
      }
    });
  };

  useEffect(() => {
    loadPlannings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      cost: Number(form.cost || 0)
    };

    if (editingId) {
      const plan = plannings.find(p => p.id === editingId);
      if (plan && (plan.status === 'Approved' || plan.status === 'Rejected')) {
        addToast({ title: 'Notifikasi', description: 'Proposal yang sudah disetujui atau ditolak tidak dapat diedit!', variant: 'success' });
        return;
      }
      const { error } = await TalentService.updatePlanning(editingId, payload);
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Proposal Pelatihan berhasil diperbarui!', variant: 'success' });
        setEditingId(null);
        setIsOpen(false);
        loadPlannings();
      } else {
        addToast({ title: 'Error', description: 'Gagal memperbarui: ' + error, variant: 'danger' });
      }
    } else {
      const { error } = await TalentService.createPlanning(payload);
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Proposal Pelatihan baru berhasil disimpan!', variant: 'success' });
        setIsOpen(false);
        loadPlannings();
      } else {
        addToast({ title: 'Error', description: 'Gagal menyimpan: ' + error, variant: 'danger' });
      }
    }
  };

  const handleEdit = (plan: any) => {
    if (plan.status === 'Approved' || plan.status === 'Rejected') {
      addToast({ title: 'Notifikasi', description: 'Proposal yang sudah disetujui atau ditolak tidak dapat diedit!', variant: 'success' });
      return;
    }
    setForm({
      planning_number: plan.planning_number || '',
      title: plan.title || '',
      unit: plan.unit || 'Teknologi',
      location: plan.location || '',
      start_date: plan.start_date || '',
      start_time: plan.start_time || '',
      training_type: plan.training_type || 'Technical',
      provider: plan.provider || '',
      trainer: plan.trainer || '',
      cost: String(plan.cost || ''),
      notes: plan.notes || '',
      period: plan.period || '2026-Q3',
      status: plan.status || 'Draft'
    });
    setEditingId(plan.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    const plan = plannings.find(p => p.id === id);
    if (plan && (plan.status === 'Approved' || plan.status === 'Rejected')) {
      addToast({ title: 'Notifikasi', description: 'Proposal yang sudah disetujui atau ditolak tidak dapat dihapus!', variant: 'success' });
      return;
    }
    if (true) { // auto-confirmed in demo
      const { error } = await TalentService.deletePlanning(id);
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Perencanaan pelatihan berhasil dihapus.', variant: 'success' });
        loadPlannings();
      } else {
        addToast({ title: 'Error', description: 'Gagal menghapus: ' + error, variant: 'danger' });
      }
    }
  };

  const handleDuplicate = async (plan: any) => {
    if (true) { // auto-confirmed in demo
      const payload = {
        title: `${plan.title} (Copy)`,
        unit: plan.unit,
        location: plan.location,
        start_date: plan.start_date,
        start_time: plan.start_time,
        training_type: plan.training_type,
        provider: plan.provider,
        trainer: plan.trainer,
        cost: plan.cost,
        notes: plan.notes,
        period: plan.period,
        status: 'Draft'
      };
      const { error } = await TalentService.createPlanning(payload);
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Proposal berhasil diduplikasi sebagai Draft.', variant: 'success' });
        loadPlannings();
      } else {
        addToast({ title: 'Error', description: 'Gagal menduplikasi: ' + error, variant: 'danger' });
      }
    }
  };

  const handleArchive = async (plan: any) => {
    if (true) { // auto-confirmed in demo
      const { error } = await TalentService.updatePlanning(plan.id, { is_archived: true });
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Proposal berhasil diarsipkan.', variant: 'success' });
        loadPlannings();
      } else {
        addToast({ title: 'Error', description: 'Gagal mengarsipkan: ' + error, variant: 'danger' });
      }
    }
  };

  const handleCancel = async (plan: any) => {
    if (true) { // auto-confirmed in demo
      const { error } = await TalentService.updatePlanning(plan.id, { is_cancelled: true, status: 'Cancelled' });
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Perencanaan pelatihan berhasil dibatalkan.', variant: 'success' });
        loadPlannings();
      } else {
        addToast({ title: 'Error', description: 'Gagal membatalkan: ' + error, variant: 'danger' });
      }
    }
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["No. Proposal,Judul,Unit,Kategori,Jadwal,Provider,Trainer,Biaya,Period,Status"]
      .concat(filteredPlannings.map(p => 
        `"${p.planning_number}","${p.title}","${p.unit}","${p.training_type}","${p.start_date} ${p.start_time}","${p.provider}","${p.trainer}",${p.cost},"${p.period}","${p.status}"`
      )).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `training-planning-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredPlannings = useMemo(() => {
    return plannings.filter(p => {
      if (p.is_archived) return false;
      const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || 
                          p.trainer?.toLowerCase().includes(search.toLowerCase()) ||
                          p.planning_number?.toLowerCase().includes(search.toLowerCase());
      const matchUnit = filterUnit === 'All' || p.unit === filterUnit;
      const matchPeriod = filterPeriod === 'All' || p.period === filterPeriod;
      return matchSearch && matchUnit && matchPeriod;
    });
  }, [plannings, search, filterUnit, filterPeriod]);

  return (
    <SectionContainer>
      <Card className="rounded-[28px] border border-border p-6 shadow-sm">
        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative w-64">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari proposal perencanaan..."
                className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500"
              />
            </div>
            
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none"
            >
              <option value="All">Semua Unit</option>
              {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none"
            >
              <option value="All">Semua Periode</option>
              {periodOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={loadPlannings} variant="outline" className="rounded-xl">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={() => window.location.href = '/talent/training/calendar'} variant="outline" className="rounded-xl">
              <Calendar className="h-4 w-4 mr-2" /> Kalender
            </Button>
            <Button onClick={handlePrint} variant="outline" className="rounded-xl">
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button onClick={handleExportExcel} variant="outline" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button
              onClick={() => {
                setEditingId(null);
                setForm({
                  planning_number: '',
                  title: '',
                  unit: 'Teknologi',
                  location: '',
                  start_date: '',
                  start_time: '',
                  training_type: 'Technical',
                  provider: '',
                  trainer: '',
                  cost: '',
                  notes: '',
                  period: '2026-Q3',
                  status: 'Draft'
                });
                setIsOpen(true);
              }}
              className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold"
            >
              <Plus className="h-4 w-4 mr-1" /> Proposal Baru
            </Button>
          </div>
        </div>

        {/* Table list */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">No. Proposal</th>
                <th className="px-6 py-4">Judul Proposal</th>
                <th className="px-6 py-4">Unit Kerja</th>
                <th className="px-6 py-4">Periode / Jenis</th>
                <th className="px-6 py-4">Trainer & Provider</th>
                <th className="px-6 py-4">Estimasi Biaya</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPlannings.map((plan) => (
                <tr key={plan.id} className="hover:bg-secondary/40 transition">
                  <td className="px-6 py-4 font-mono text-xs font-bold">{plan.planning_number}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{plan.title}</td>
                  <td className="px-6 py-4">{plan.unit}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs">{plan.period}</div>
                    <span className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase bg-blue-500/10 text-blue-500">
                      {plan.training_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold">{plan.trainer || '-'}</div>
                    <div className="text-[10px] text-muted-foreground">{plan.provider || '-'}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-xs">
                    Rp {Number(plan.cost || 0).toLocaleString('id-ID')}
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
                  <td className="px-6 py-4 text-right flex justify-end gap-1">
                    {plan.status !== 'Approved' && plan.status !== 'Rejected' && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(plan)} className="text-amber-500 p-1" aria-label="Edit Proposal">
                          <Edit className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(plan.id)} className="text-rose-500 p-1" aria-label="Hapus Proposal">
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleDuplicate(plan)} className="text-blue-500 p-1" title="Duplikasi" aria-label="Duplikasi Proposal">
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleArchive(plan)} className="text-purple-500 p-1" title="Arsipkan" aria-label="Arsipkan Proposal">
                      <Archive className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    {plan.status !== 'Cancelled' && plan.status !== 'Completed' && (
                      <Button variant="ghost" size="sm" onClick={() => handleCancel(plan)} className="text-red-500 p-1" title="Batalkan" aria-label="Batalkan Proposal">
                        <Ban className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPlannings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted">Belum ada proposal perencanaan pelatihan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Proposal Dialog Form */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Perencanaan Pelatihan' : 'Buat Proposal Pelatihan Baru'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {editingId && (
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground">Nomor Proposal</label>
                    <input
                      type="text"
                      readOnly
                      value={form.planning_number}
                      className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed border border-border"
                    />
                  </div>
                )}
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Judul Pelatihan</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    placeholder="Contoh: Pelatihan K3 Konstruksi"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Unit Kerja</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  >
                    {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Periode Pelaksanaan</label>
                  <select
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  >
                    {periodOptions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Waktu Mulai</label>
                  <input
                    type="time"
                    required
                    value={form.start_time}
                    onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Jenis Pelatihan</label>
                  <select
                    value={form.training_type}
                    onChange={(e) => setForm({ ...form, training_type: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  >
                    {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Lokasi / Media</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    placeholder="Contoh: R. Mawar / Zoom Online"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Penyedia (Provider)</label>
                  <input
                    type="text"
                    required
                    value={form.provider}
                    onChange={(e) => setForm({ ...form, provider: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    placeholder="Contoh: PT Indocater HRD / SGS"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Trainer / Instruktur</label>
                  <input
                    type="text"
                    required
                    value={form.trainer}
                    onChange={(e) => setForm({ ...form, trainer: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Status Proposal</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted (Kirim)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Biaya (Cost)</label>
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                    placeholder="Contoh: 1500000"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Catatan / Deskripsi</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 h-20"
                    placeholder="Keterangan tambahan..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="rounded-xl">
                  Batal
                </Button>
                <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold">
                  Simpan Proposal
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </SectionContainer>
  );
}
