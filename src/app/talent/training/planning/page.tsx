'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';

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
  const [plannings, setPlannings] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterUnit, setFilterUnit] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('All');

  // Form Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
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
    period: '2026-Q3'
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
      const { error } = await TalentService.updatePlanning(editingId, payload);
      if (!error) {
        alert('Proposal Pelatihan berhasil diperbarui!');
        setEditingId(null);
        setIsOpen(false);
        loadPlannings();
      } else {
        alert('Gagal memperbarui: ' + error);
      }
    } else {
      const { error } = await TalentService.createPlanning(payload);
      if (!error) {
        alert('Proposal Pelatihan baru berhasil disimpan!');
        setIsOpen(false);
        loadPlannings();
      } else {
        alert('Gagal menyimpan: ' + error);
      }
    }
  };

  const handleEdit = (plan: any) => {
    setForm({
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
      period: plan.period || '2026-Q3'
    });
    setEditingId(plan.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus proposal perencanaan pelatihan ini?')) {
      const { error } = await TalentService.deletePlanning(id);
      if (!error) {
        alert('Perencanaan pelatihan berhasil dihapus.');
        loadPlannings();
      } else {
        alert('Gagal menghapus: ' + error);
      }
    }
  };

  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Judul,Unit,Kategori,Jadwal,Provider,Trainer,Biaya,Period,Catatan"]
      .concat(filteredPlannings.map(p => 
        `"${p.title}","${p.unit}","${p.training_type}","${p.start_date} ${p.start_time}","${p.provider}","${p.trainer}",${p.cost},"${p.period}","${p.notes}"`
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
      const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || 
                          p.trainer?.toLowerCase().includes(search.toLowerCase());
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
                  period: '2026-Q3'
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
                <th className="px-6 py-4">Judul Proposal</th>
                <th className="px-6 py-4">Unit Kerja</th>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4">Jenis Pelatihan</th>
                <th className="px-6 py-4">Trainer & Provider</th>
                <th className="px-6 py-4">Estimasi Biaya</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPlannings.map((plan) => (
                <tr key={plan.id} className="hover:bg-secondary/40 transition">
                  <td className="px-6 py-4 font-semibold text-foreground">{plan.title}</td>
                  <td className="px-6 py-4">{plan.unit}</td>
                  <td className="px-6 py-4">{plan.period}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] bg-blue-500/10 text-blue-500">
                      {plan.training_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold">{plan.trainer || '-'}</div>
                    <div className="text-xs text-muted-foreground">{plan.provider || '-'}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    Rp {Number(plan.cost || 0).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(plan)} className="text-amber-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(plan.id)} className="text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredPlannings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted">Belum ada proposal perencanaan pelatihan.</td>
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
                <div className="col-span-2">
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
