'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Trash2, RefreshCw, Save, CheckSquare, Square, Users, BookOpen, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService, PeopleService } from '@/lib/services';
import { useToast } from '@/components/ui/toast';
import { employeeDirectory } from '@/lib/people-data';

export default function TrainingRealizationPage() { 
  const { addToast } = useToast();
  const [plannings, setPlannings] = useState<any[]>([]);
  const [realizations, setRealizations] = useState<any[]>([]);
  const [selectedRealization, setSelectedRealization] = useState<any | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  // Selection states
  const [selectedPlanningId, setSelectedPlanningId] = useState('');
  
  // Modals/Add UI state
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddOtherOpen, setIsAddOtherOpen] = useState(false);
  
  // Multi Participant state
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  
  // Other Participant form state
  const [otherForm, setOtherForm] = useState({
    name: '',
    company: '',
    position: ''
  });

  const [editingParticipantId, setEditingParticipantId] = useState<string | null>(null);

  const loadData = () => {
    TalentService.getPlannings().then((res: any) => {
      if (res && res.data) setPlannings(res.data);
    });
    TalentService.getRealizations().then((res: any) => {
      if (res && res.data) setRealizations(res.data);
    });
    PeopleService.getEmployees(employeeDirectory).then((res: any) => {
      if (res && res.data) setEmployees(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Load participants when a realization is selected
  useEffect(() => {
    if (selectedRealization) {
      TalentService.getParticipants(selectedRealization.id).then((res: any) => {
        if (res && res.data) setParticipants(res.data);
      });
    } else {
      setParticipants([]);
    }
  }, [selectedRealization]);

  // Load matching planning details for the selected realization
  const matchedPlanning = useMemo(() => {
    if (!selectedRealization) return null;
    return plannings.find(p => p.id === selectedRealization.planning_id) || null;
  }, [selectedRealization, plannings]);

  // Filter employees belonging to the Planning Unit
  const filteredEmployees = useMemo(() => {
    if (!matchedPlanning) return [];
    const planningUnit = matchedPlanning.unit?.toLowerCase();
    
    // Look at employeeDirectory or loaded employees. Match department/unit
    return employees.filter(emp => {
      const empDept = (emp.department || '').toLowerCase();
      // Simple unit check or sub-string match (e.g. Teknologi, SDM)
      return empDept.includes(planningUnit) || planningUnit.includes(empDept);
    });
  }, [matchedPlanning, employees]);

  const handleSelectPlanning = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planningId = e.target.value;
    if (!planningId) return;

    // Create or get realization for this planning
    const { data, error } = await TalentService.createRealization(planningId);
    if (!error && data) {
      // Find realization with full data or reload
      TalentService.getRealizations().then((res: any) => {
        if (res && res.data) {
          setRealizations(res.data);
          const found = res.data.find((r: any) => r.id === data.id);
          setSelectedRealization(found || data);
        }
      });
    } else {
      addToast({ title: 'Error', description: 'Gagal memuat realisasi: ' + error, variant: 'danger' });
    }
  };

  const handleToggleEmployeeSelect = (empId: string) => {
    setSelectedEmployeeIds(prev => 
      prev.includes(empId) ? prev.filter(id => id !== empId) : [...prev, empId]
    );
  };

  const handleToggleSelectAllEmployees = () => {
    if (selectedEmployeeIds.length === filteredEmployees.length) {
      setSelectedEmployeeIds([]);
    } else {
      setSelectedEmployeeIds(filteredEmployees.map(e => e.id));
    }
  };

  const handleAddSelectedEmployees = async () => {
    if (!selectedRealization || selectedEmployeeIds.length === 0) return;

    let addedCount = 0;
    for (const empId of selectedEmployeeIds) {
      // Avoid duplicate adding
      const isAlreadyAdded = participants.some(p => p.employee_id === empId);
      if (isAlreadyAdded) continue;

      const emp = filteredEmployees.find(e => e.id === empId);
      if (!emp) continue;

      await TalentService.addParticipant({
        realization_id: selectedRealization.id,
        employee_id: emp.id,
        employee_name: emp.fullName || emp.name || `${emp.firstName} ${emp.lastName}`,
        employee_email: emp.email || '',
        company: 'PT Indocater',
        position: emp.position || '',
        is_external: false
      });
      addedCount++;
    }

    addToast({ title: 'Notifikasi', description: `${addedCount} Karyawan berhasil ditambahkan ke daftar peserta!`, variant: 'success' });
    setSelectedEmployeeIds([]);
    setIsAddEmployeeOpen(false);
    
    // Reload participants
    TalentService.getParticipants(selectedRealization.id).then((res: any) => {
      if (res && res.data) setParticipants(res.data);
    });
  };

  const handleAddOtherParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRealization || !otherForm.name || !otherForm.company) return;

    if (editingParticipantId) {
      const { error } = await TalentService.updateParticipant(editingParticipantId, {
        employee_name: otherForm.name,
        company: otherForm.company,
        position: otherForm.position || ''
      });
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Data peserta eksternal berhasil diperbarui!', variant: 'success' });
        setEditingParticipantId(null);
        setOtherForm({ name: '', company: '', position: '' });
        setIsAddOtherOpen(false);
        
        // Reload participants
        TalentService.getParticipants(selectedRealization.id).then((res: any) => {
          if (res && res.data) setParticipants(res.data);
        });
      } else {
        addToast({ title: 'Error', description: 'Gagal memperbarui: ' + error, variant: 'danger' });
      }
    } else {
      const { error } = await TalentService.addParticipant({
        realization_id: selectedRealization.id,
        employee_id: null,
        employee_name: otherForm.name,
        employee_email: '',
        company: otherForm.company,
        position: otherForm.position || '',
        is_external: true
      });

      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Peserta Eksternal berhasil ditambahkan!', variant: 'success' });
        setOtherForm({ name: '', company: '', position: '' });
        setIsAddOtherOpen(false);
        
        // Reload participants
        TalentService.getParticipants(selectedRealization.id).then((res: any) => {
          if (res && res.data) setParticipants(res.data);
        });
      } else {
        addToast({ title: 'Error', description: 'Gagal menambahkan: ' + error, variant: 'danger' });
      }
    }
  };

  const handleEditOtherParticipant = (part: any) => {
    setOtherForm({
      name: part.employee_name,
      company: part.company,
      position: part.position || ''
    });
    setEditingParticipantId(part.id);
    setIsAddOtherOpen(true);
  };

  const handleRemoveParticipant = async (id: string) => {
    if (true) { // auto-confirmed in demo
      const { error } = await TalentService.removeParticipant(id);
      if (!error) {
        addToast({ title: 'Notifikasi', description: 'Peserta berhasil dihapus.', variant: 'success' });
        TalentService.getParticipants(selectedRealization.id).then((res: any) => {
          if (res && res.data) setParticipants(res.data);
        });
      } else {
        addToast({ title: 'Error', description: 'Gagal menghapus: ' + error, variant: 'danger' });
      }
    }
  };

  const handleSaveStatus = async (status: string) => {
    if (!selectedRealization) return;
    const { error } = await TalentService.updateRealizationStatus(selectedRealization.id, status);
    if (!error) {
      addToast({ title: 'Notifikasi', description: `Status Realisasi berhasil disimpan sebagai: ${status}`, variant: 'success' });
      loadData();
      setSelectedRealization((prev: any) => prev ? { ...prev, status } : null);
    } else {
      addToast({ title: 'Error', description: 'Gagal memperbarui status: ' + error, variant: 'danger' });
    }
  };

  return (
    <SectionContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Select Planning & Readonly Details */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="rounded-[28px] border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Pilih Proposal Pelatihan</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Pilih Proposal (Planning)</label>
                <select
                  value={selectedRealization?.planning_id || ''}
                  onChange={handleSelectPlanning}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                >
                  <option value="">-- Pilih Proposal --</option>
                  {plannings.filter(p => p.status === 'Approved').map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.unit} - {p.period})
                    </option>
                  ))}
                </select>
              </div>

              {matchedPlanning && (
                <div className="border-t border-border pt-4 mt-4 space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Judul Pelatihan</label>
                    <input type="text" readOnly value={matchedPlanning.title} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Trainer</label>
                    <input type="text" readOnly value={matchedPlanning.trainer} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Penyedia (Provider)</label>
                    <input type="text" readOnly value={matchedPlanning.provider} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Unit</label>
                      <input type="text" readOnly value={matchedPlanning.unit} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Kategori</label>
                      <input type="text" readOnly value={matchedPlanning.training_type} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Lokasi / Media</label>
                    <input type="text" readOnly value={matchedPlanning.location} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Tanggal Mulai</label>
                      <input type="text" readOnly value={matchedPlanning.start_date} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase">Estimasi Biaya</label>
                      <input type="text" readOnly value={`Rp ${Number(matchedPlanning.cost || 0).toLocaleString('id-ID')}`} className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground outline-none cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {selectedRealization && (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3">Simpan Realisasi</h3>
              <p className="text-xs text-muted-foreground mb-4">Simpan status pelaksanaan realisasi pelatihan ini.</p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleSaveStatus('Draft')} 
                  variant={selectedRealization.status === 'Draft' ? 'primary' : 'outline'}
                  className="flex-1 rounded-xl"
                >
                  Draft
                </Button>
                <Button 
                  onClick={() => handleSaveStatus('Ongoing')} 
                  variant={selectedRealization.status === 'Ongoing' ? 'primary' : 'outline'}
                  className="flex-1 rounded-xl"
                >
                  Berjalan
                </Button>
                <Button 
                  onClick={() => handleSaveStatus('Completed')} 
                  variant={selectedRealization.status === 'Completed' ? 'primary' : 'outline'}
                  className="flex-1 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Selesai
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right column: Participant Management */}
        <div className="lg:col-span-2">
          {selectedRealization ? (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Daftar Peserta Pelatihan</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hanya menampilkan karyawan unit: <strong className="text-primary">{matchedPlanning?.unit}</strong>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedEmployeeIds([]);
                      setIsAddEmployeeOpen(true);
                    }}
                    className="rounded-xl bg-slate-800 text-white hover:bg-slate-700"
                  >
                    + Karyawan Unit
                  </Button>
                  <Button
                    onClick={() => setIsAddOtherOpen(true)}
                    className="rounded-xl bg-brand-600 text-white hover:bg-brand-700"
                  >
                    + Peserta Lain
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Nama Lengkap</th>
                      <th className="px-6 py-4">Perusahaan</th>
                      <th className="px-6 py-4">Jabatan (Posisi)</th>
                      <th className="px-6 py-4">Tipe Peserta</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {participants.map((part) => (
                      <tr key={part.id} className="hover:bg-secondary/40 transition">
                        <td className="px-6 py-4 font-semibold text-foreground">
                          <div className="font-semibold">{part.employee_name}</div>
                          {part.employee_email && <div className="text-xs text-muted-foreground">{part.employee_email}</div>}
                        </td>
                        <td className="px-6 py-4">{part.company}</td>
                        <td className="px-6 py-4">{part.position || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            part.is_external ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                          }`}>
                            {part.is_external ? 'Eksternal' : 'Internal'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          {part.is_external && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditOtherParticipant(part)}
                              className="text-amber-500 hover:text-amber-700 hover:bg-amber-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveParticipant(part.id)}
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {participants.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted">Belum ada peserta terdaftar. Silakan tambah peserta.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center text-muted">
              <Users className="h-12 w-12 text-muted mb-4 opacity-40" />
              <p className="font-semibold">Realisasi Pelatihan Belum Terpilih</p>
              <p className="text-sm mt-1 max-w-sm">Pilih salah satu proposal perencanaan pelatihan di sebelah kiri untuk mengelola daftar peserta.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Add Employee Modal (Multi Selector) */}
      {isAddEmployeeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Tambah Karyawan Unit {matchedPlanning?.unit}</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Menampilkan semua karyawan di unit: <strong>{matchedPlanning?.unit}</strong>. Pilih peserta yang akan didaftarkan.
            </p>

            <div className="space-y-3 mb-6">
              <button 
                onClick={handleToggleSelectAllEmployees}
                className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline mb-2"
              >
                {selectedEmployeeIds.length === filteredEmployees.length ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                Pilih Semua ({filteredEmployees.length} Karyawan)
              </button>

              <div className="border border-border rounded-xl divide-y divide-border max-h-60 overflow-y-auto">
                {filteredEmployees.map(emp => {
                  const isChecked = selectedEmployeeIds.includes(emp.id);
                  const isAdded = participants.some(p => p.employee_id === emp.id);
                  return (
                    <div 
                      key={emp.id}
                      onClick={() => !isAdded && handleToggleEmployeeSelect(emp.id)}
                      className={`flex items-center justify-between p-3 text-sm cursor-pointer transition ${
                        isAdded ? 'bg-secondary/20 cursor-not-allowed opacity-60' : 'hover:bg-secondary/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isAdded ? (
                          <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-bold">Terdaftar</div>
                        ) : (
                          isChecked ? <CheckSquare className="h-4 w-4 text-brand-500" /> : <Square className="h-4 w-4 text-muted" />
                        )}
                        <div>
                          <div className="font-semibold text-foreground">{emp.fullName || emp.name}</div>
                          <div className="text-xs text-muted-foreground">{emp.position} - {emp.department}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredEmployees.length === 0 && (
                  <div className="p-6 text-center text-xs text-muted">Tidak ada karyawan di unit kerja ini.</div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)} className="rounded-xl">
                Batal
              </Button>
              <Button 
                onClick={handleAddSelectedEmployees} 
                disabled={selectedEmployeeIds.length === 0}
                className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold"
              >
                Tambah Terpilih ({selectedEmployeeIds.length})
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Other Participant Modal */}
      {isAddOtherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">{editingParticipantId ? 'Edit Peserta Eksternal' : 'Tambah Peserta Lain / Eksternal'}</h3>
            <form onSubmit={handleAddOtherParticipant} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={otherForm.name}
                  onChange={(e) => setOtherForm({ ...otherForm, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  placeholder="Contoh: John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Perusahaan</label>
                <input
                  type="text"
                  required
                  value={otherForm.company}
                  onChange={(e) => setOtherForm({ ...otherForm, company: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  placeholder="Contoh: PT Pihak Ketiga"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Jabatan (Opsional)</label>
                <input
                  type="text"
                  value={otherForm.position}
                  onChange={(e) => setOtherForm({ ...otherForm, position: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500"
                  placeholder="Contoh: Supervisor K3"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => { setIsAddOtherOpen(false); setEditingParticipantId(null); setOtherForm({ name: '', company: '', position: '' }); }} className="rounded-xl">
                  Batal
                </Button>
                <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold">
                  Tambah Peserta
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </SectionContainer>
  );
}
