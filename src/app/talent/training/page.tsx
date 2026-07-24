'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  Search,
  Download,
  Award,
  BookOpen,
  Users,
  Printer,
  Trash2,
  Edit,
  ArrowLeft,
  CheckCircle,
  Eye,
  Plus,
  X,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SectionContainer } from '@/components/layout/section-container';
import { StatusBadge } from '@/components/ui/status-badge';
import { Dialog } from '@/components/ui/dialog';
import { TalentService, PeopleService } from '@/lib/services';

export default function TalentTrainingPage() {
  // Page states
  const [activeTab, setActiveTab] = useState<'programs' | 'certifications'>('programs');
  const [search, setSearch] = useState('');
  
  // Data lists
  const [employees, setEmployees] = useState<any[]>([]);
  const [programsList, setProgramsList] = useState<any[]>([]);
  const [certificationsList, setCertificationsList] = useState<any[]>([]);
  const [participantsList, setParticipantsList] = useState<any[]>([]);

  // Navigation / Detail view state
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  
  // Modals
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [isAddParticipantOpen, setIsAddParticipantOpen] = useState(false);
  const [previewCertificateData, setPreviewCertificateData] = useState<any | null>(null);

  // Forms states
  const [newProgram, setNewProgram] = useState({
    title: '',
    description: '',
    category: 'Teknologi',
    trainer: '',
    location: '',
    start_date: '',
    duration: '',
    certificate_template: 'training-certificate.html'
  });

  const [newCert, setNewCert] = useState({
    employee_id: '',
    certification: '',
    category: 'Teknologi',
    issuer: '',
    credentialId: '',
    issuedDate: '',
    expiryDate: '',
    status: 'Aktif',
    document_url: ''
  });

  const [newParticipant, setNewParticipant] = useState({
    employee_id: '',
    status: 'Terdaftar'
  });

  // Edit states
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);

  // Load Initial Data
  const loadData = () => {
    PeopleService.getEmployees([]).then((res: any) => {
      if (res && res.data) setEmployees(res.data);
    });
    TalentService.getTrainingPrograms([]).then((res: any) => {
      if (res && res.data) setProgramsList(res.data);
    });
    TalentService.getCertifications([]).then((res: any) => {
      if (res && res.data) setCertificationsList(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Load participants when a program is selected
  useEffect(() => {
    if (selectedProgram) {
      TalentService.getTrainingParticipants(selectedProgram.id).then((res: any) => {
        if (res && res.data) setParticipantsList(res.data);
      });
    }
  }, [selectedProgram]);

  // Handle Training Program Actions
  const handleCreateProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgramId) {
      const { error } = await TalentService.updateTrainingProgram(editingProgramId, newProgram);
      if (!error) {
        alert('Program pelatihan berhasil diperbarui!');
        setEditingProgramId(null);
      } else {
        alert('Gagal memperbarui program: ' + error);
      }
    } else {
      const { error } = await TalentService.createTrainingProgram(newProgram);
      if (!error) {
        alert('Program pelatihan baru berhasil dibuat!');
      } else {
        alert('Gagal membuat program: ' + error);
      }
    }
    setIsAddProgramOpen(false);
    setNewProgram({
      title: '',
      description: '',
      category: 'Teknologi',
      trainer: '',
      location: '',
      start_date: '',
      duration: '',
      certificate_template: 'training-certificate.html'
    });
    loadData();
  };

  const handleEditProgram = (prog: any) => {
    setNewProgram({
      title: prog.title,
      description: prog.description,
      category: prog.category,
      trainer: prog.trainer,
      location: prog.location,
      start_date: prog.start_date,
      duration: prog.duration,
      certificate_template: prog.certificate_template
    });
    setEditingProgramId(prog.id);
    setIsAddProgramOpen(true);
  };

  const handleDeleteProgram = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus program pelatihan ini? Semua data peserta juga akan terpengaruh.')) {
      const { error } = await TalentService.deleteTrainingProgram(id);
      if (!error) {
        alert('Program berhasil dihapus.');
        if (selectedProgram && selectedProgram.id === id) {
          setSelectedProgram(null);
        }
        loadData();
      } else {
        alert('Gagal menghapus program: ' + error);
      }
    }
  };

  // Handle Certification Actions
  const handleCreateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(em => em.id === newCert.employee_id);
    const employeeName = emp ? (emp.fullName || emp.name) : 'Karyawan';

    const certPayload = {
      ...newCert,
      employee: employeeName
    };

    if (editingCertId) {
      const { error } = await TalentService.updateCertification(editingCertId, certPayload);
      if (!error) {
        alert('Sertifikasi berhasil diperbarui!');
        setEditingCertId(null);
      } else {
        alert('Gagal memperbarui sertifikasi: ' + error);
      }
    } else {
      const { error } = await TalentService.createCertification(certPayload);
      if (!error) {
        alert('Sertifikasi baru berhasil ditambahkan!');
      } else {
        alert('Gagal menambahkan sertifikasi: ' + error);
      }
    }
    setIsAddCertOpen(false);
    setNewCert({
      employee_id: '',
      certification: '',
      category: 'Teknologi',
      issuer: '',
      credentialId: '',
      issuedDate: '',
      expiryDate: '',
      status: 'Aktif',
      document_url: ''
    });
    loadData();
  };

  const handleEditCert = (cert: any) => {
    setNewCert({
      employee_id: cert.employee_id || '',
      certification: cert.certification,
      category: cert.category,
      issuer: cert.issuer,
      credentialId: cert.credentialId,
      issuedDate: cert.issuedDate,
      expiryDate: cert.expiryDate,
      status: cert.status,
      document_url: cert.document_url || ''
    });
    setEditingCertId(cert.id);
    setIsAddCertOpen(true);
  };

  const handleDeleteCert = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus sertifikasi ini?')) {
      const { error } = await TalentService.deleteCertification(id);
      if (!error) {
        alert('Sertifikasi berhasil dihapus.');
        loadData();
      } else {
        alert('Gagal menghapus sertifikasi: ' + error);
      }
    }
  };

  // Handle Participant Actions
  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    const emp = employees.find(em => em.id === newParticipant.employee_id);
    if (!emp) {
      alert('Pilih karyawan terlebih dahulu.');
      return;
    }

    const payload = {
      training_id: selectedProgram.id,
      employee_id: emp.id,
      employee_name: emp.fullName || emp.name,
      employee_email: emp.email || '',
      status: newParticipant.status
    };

    const { error } = await TalentService.addTrainingParticipant(payload);
    if (!error) {
      alert('Peserta berhasil ditambahkan!');
      setIsAddParticipantOpen(false);
      setNewParticipant({ employee_id: '', status: 'Terdaftar' });
      // Reload participants
      TalentService.getTrainingParticipants(selectedProgram.id).then((res: any) => {
        if (res && res.data) setParticipantsList(res.data);
      });
    } else {
      alert('Gagal menambahkan peserta: ' + error);
    }
  };

  const handleRemoveParticipant = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus peserta ini dari program pelatihan?')) {
      const { error } = await TalentService.removeTrainingParticipant(id);
      if (!error) {
        alert('Peserta berhasil dihapus.');
        if (selectedProgram) {
          TalentService.getTrainingParticipants(selectedProgram.id).then((res: any) => {
            if (res && res.data) setParticipantsList(res.data);
          });
        }
      } else {
        alert('Gagal menghapus peserta: ' + error);
      }
    }
  };

  // Handle Certificate Generation & Automation
  const handleGenerateCertificate = async (participant: any) => {
    if (!selectedProgram) return;

    const certNumber = 'CERT-INDC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    
    // 1. Update participant status to "Selesai" and store certificate number
    const { error: partErr } = await TalentService.updateParticipantCertificateStatus(participant.id, certNumber);
    if (partErr) {
      alert('Gagal memperbarui status peserta: ' + partErr);
      return;
    }

    // 2. Automatically save certificate into employee certification records
    const certPayload = {
      employee_id: participant.employee_id,
      employee: participant.employee_name,
      certification: selectedProgram.title,
      category: selectedProgram.category,
      issuer: 'PT Indocater HRD Department',
      credentialId: certNumber,
      issuedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString().split('T')[0], // 3 years validity
      status: 'Aktif',
      document_url: 'Generated automatically from training'
    };

    const { error: certErr } = await TalentService.createCertification(certPayload);
    if (certErr) {
      console.error('Gagal menyimpan sertifikasi ke profil karyawan:', certErr);
    }

    alert(`Sertifikat berhasil dibuat untuk ${participant.employee_name}! Nomor Sertifikat: ${certNumber}`);
    
    // Refresh participant list and certification database
    TalentService.getTrainingParticipants(selectedProgram.id).then((res: any) => {
      if (res && res.data) setParticipantsList(res.data);
    });
    loadData();
  };

  const handleGenerateAllCertificates = async () => {
    if (!selectedProgram || participantsList.length === 0) return;
    
    const ungenerated = participantsList.filter(p => !p.certificate_generated);
    if (ungenerated.length === 0) {
      alert('Semua peserta sudah memiliki sertifikat.');
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menerbitkan sertifikat untuk ${ungenerated.length} peserta secara masal?`)) {
      for (const p of ungenerated) {
        await handleGenerateCertificate(p);
      }
      alert('Proses penerbitan sertifikat masal selesai.');
    }
  };

  const handlePreviewCertificate = (part: any) => {
    if (!selectedProgram) return;

    setPreviewCertificateData({
      employee_name: part.employee_name,
      employee_id: part.employee_id,
      training_title: selectedProgram.title,
      training_category: selectedProgram.category,
      training_date: selectedProgram.start_date,
      training_duration: selectedProgram.duration,
      trainer_name: selectedProgram.trainer,
      certificate_number: part.certificate_number || 'DRAFT-INDC-' + Math.floor(1000 + Math.random() * 9000),
      issuer: 'PT Indocater HRD Department',
      issued_date: new Date().toISOString().split('T')[0]
    });
  };

  // Filtered lists for rendering
  const filteredPrograms = useMemo(() => {
    const q = search.toLowerCase();
    return programsList.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.trainer.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [programsList, search]);

  const filteredCertifications = useMemo(() => {
    const q = search.toLowerCase();
    return certificationsList.filter(c =>
      c.employee.toLowerCase().includes(q) ||
      c.certification.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q)
    );
  }, [certificationsList, search]);

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Siklus Talenta</p>
            <h1 className="text-3xl font-semibold text-foreground">Pelatihan & Sertifikasi</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Kelola program pelatihan internal/eksternal PT Indocater, daftar peserta, dan generate sertifikat digital resmi karyawan secara otomatis.
            </p>
          </div>
          <div className="flex gap-3">
            {selectedProgram ? (
              <Button onClick={() => setSelectedProgram(null)} className="rounded-full bg-slate-800 text-white hover:bg-slate-700">
                <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Daftar
              </Button>
            ) : (
              <Button
                className="rounded-full bg-brand-600 text-white hover:bg-brand-700"
                onClick={() => {
                  setEditingProgramId(null);
                  setNewProgram({
                    title: '',
                    description: '',
                    category: 'Teknologi',
                    trainer: '',
                    location: '',
                    start_date: '',
                    duration: '',
                    certificate_template: 'training-certificate.html'
                  });
                  setIsAddProgramOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Program Baru
              </Button>
            )}
          </div>
        </div>
      </SectionContainer>

      {!selectedProgram ? (
        // LIST VIEW (Programs & Certifications Tabs)
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Total Program</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{programsList.length}</p>
              <p className="mt-2 text-sm text-primary font-medium">Bulan Ini</p>
            </Card>
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Sertifikasi Terdaftar</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{certificationsList.length}</p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">Memenuhi Syarat</p>
            </Card>
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Status Sistem</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">Aktif</p>
              <p className="mt-2 text-sm text-emerald-600 font-medium">Supabase Failsafe</p>
            </Card>
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Penerbit Sertifikat</p>
              <p className="mt-3 text-3xl font-semibold text-foreground">Resmi</p>
              <p className="mt-2 text-sm text-muted font-medium">PT Indocater HR</p>
            </Card>
          </div>

          <Card className="rounded-[28px] border border-border p-6 shadow-sm">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1 mb-6 max-w-md">
              <button
                onClick={() => setActiveTab('programs')}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  activeTab === 'programs' ? 'bg-card text-foreground shadow' : 'text-muted hover:text-muted-foreground'
                }`}
              >
                Daftar Program Pelatihan
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  activeTab === 'certifications' ? 'bg-card text-foreground shadow' : 'text-muted hover:text-muted-foreground'
                }`}
              >
                Sertifikasi Karyawan
              </button>
            </div>

            {/* Filter and search bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={activeTab === 'programs' ? 'Cari program...' : 'Cari sertifikasi...'}
                  className="w-full rounded-xl border border-border bg-card py-2 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500"
                />
              </div>
              <div>
                {activeTab === 'certifications' && (
                  <Button
                    onClick={() => {
                      setEditingCertId(null);
                      setNewCert({
                        employee_id: '',
                        certification: '',
                        category: 'Teknologi',
                        issuer: '',
                        credentialId: '',
                        issuedDate: '',
                        expiryDate: '',
                        status: 'Aktif',
                        document_url: ''
                      });
                      setIsAddCertOpen(true);
                    }}
                    className="rounded-xl bg-brand-600 text-white hover:bg-brand-700"
                  >
                    + Tambah Sertifikasi Manual
                  </Button>
                )}
              </div>
            </div>

            {/* Content Lists */}
            {activeTab === 'programs' ? (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Judul Program</th>
                      <th className="px-6 py-4">Kategori</th>
                      <th className="px-6 py-4">Trainer / Pembicara</th>
                      <th className="px-6 py-4">Jadwal Pelaksanaan</th>
                      <th className="px-6 py-4">Durasi</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredPrograms.map((prog) => (
                      <tr key={prog.id} className="hover:bg-secondary/40 transition">
                        <td className="px-6 py-4 font-semibold text-foreground">{prog.title}</td>
                        <td className="px-6 py-4">{prog.category}</td>
                        <td className="px-6 py-4">{prog.trainer}</td>
                        <td className="px-6 py-4">{prog.start_date}</td>
                        <td className="px-6 py-4">{prog.duration}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedProgram(prog)}
                            className="text-primary hover:text-white"
                          >
                            <Users className="h-4 w-4 mr-1" /> Detail & Peserta
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProgram(prog)}
                            className="text-amber-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProgram(prog.id)}
                            className="text-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredPrograms.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-muted">Tidak ada program pelatihan ditemukan.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Nama Karyawan</th>
                      <th className="px-6 py-4">Sertifikasi</th>
                      <th className="px-6 py-4">Penerbit</th>
                      <th className="px-6 py-4">Masa Berlaku</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Nomor Kredensial</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCertifications.map((cert) => (
                      <tr key={cert.id} className="hover:bg-secondary/40 transition">
                        <td className="px-6 py-4 font-semibold text-foreground">{cert.employee}</td>
                        <td className="px-6 py-4">{cert.certification}</td>
                        <td className="px-6 py-4">{cert.issuer}</td>
                        <td className="px-6 py-4 text-xs">
                          {cert.issuedDate} s/d {cert.expiryDate}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            cert.status === 'Aktif'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : cert.status === 'Hampir Habis'
                              ? 'bg-amber-500/10 text-amber-500'
                              : 'bg-rose-500/10 text-rose-500'
                          }`}>{cert.status}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono">{cert.credentialId}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditCert(cert)}
                            className="text-amber-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCert(cert.id)}
                            className="text-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredCertifications.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-muted">Tidak ada sertifikasi ditemukan.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      ) : (
        // TRAINING DETAIL & PARTICIPANT MANAGEMENT
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Program details */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Detail Program</p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">{selectedProgram.title}</h2>
              <p className="mt-4 text-sm text-muted leading-relaxed">{selectedProgram.description}</p>
              
              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Kategori</p>
                  <p className="text-sm font-semibold mt-1 text-foreground">{selectedProgram.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Trainer / Pembicara</p>
                  <p className="text-sm font-semibold mt-1 text-foreground">{selectedProgram.trainer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Lokasi / Media</p>
                  <p className="text-sm font-semibold mt-1 text-foreground">{selectedProgram.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Tanggal Mulai</p>
                  <p className="text-sm font-semibold mt-1 text-foreground">{selectedProgram.start_date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Durasi</p>
                  <p className="text-sm font-semibold mt-1 text-foreground">{selectedProgram.duration}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Participant Management & Certificate Generator */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Manajemen Peserta & Penerbitan Sertifikat</h3>
                  <p className="text-xs text-muted-foreground mt-1">Daftar karyawan yang mengikuti pelatihan ini.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setIsAddParticipantOpen(true)}
                    className="rounded-xl bg-slate-800 text-white hover:bg-slate-700"
                  >
                    + Tambah Peserta
                  </Button>
                  <Button
                    onClick={handleGenerateAllCertificates}
                    className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold"
                  >
                    Generate Semua
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">Nama Peserta</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Sertifikat</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {participantsList.map((part) => (
                      <tr key={part.id} className="hover:bg-secondary/40 transition">
                        <td className="px-6 py-4 font-semibold text-foreground">{part.employee_name}</td>
                        <td className="px-6 py-4 text-xs">{part.employee_email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            part.status === 'Selesai' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>{part.status}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono">
                          {part.certificate_generated ? (
                            <span className="text-emerald-500 font-semibold flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" /> {part.certificate_number}
                            </span>
                          ) : (
                            <span className="text-muted">Belum Diterbitkan</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          {part.certificate_generated ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreviewCertificate(part)}
                              className="text-primary hover:text-white"
                            >
                              <Eye className="h-4 w-4 mr-1" /> Cetak / Lihat
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGenerateCertificate(part)}
                              className="text-emerald-500 hover:text-white"
                            >
                              Generate
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveParticipant(part.id)}
                            className="text-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {participantsList.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-muted">Belum ada peserta pelatihan terdaftar.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* MODAL: ADD/EDIT TRAINING PROGRAM */}
      <Dialog
        open={isAddProgramOpen}
        onClose={() => setIsAddProgramOpen(false)}
        title={editingProgramId ? 'Edit Program Pelatihan' : 'Buat Program Pelatihan Baru'}
        description="Lengkapi detail program pelatihan PT Indocater."
      >
        <form onSubmit={handleCreateProgram} className="space-y-4 py-4">
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Judul Program</label>
            <input
              required
              type="text"
              value={newProgram.title}
              onChange={e => setNewProgram({ ...newProgram, title: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              placeholder="Contoh: K3 Basic Safety Training"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Deskripsi</label>
            <textarea
              required
              value={newProgram.description}
              onChange={e => setNewProgram({ ...newProgram, description: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500 h-20"
              placeholder="Tuliskan tujuan dan pokok materi..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Kategori</label>
              <select
                value={newProgram.category}
                onChange={e => setNewProgram({ ...newProgram, category: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              >
                <option>Teknologi</option>
                <option>K3 & Keselamatan Kerja</option>
                <option>Leadership</option>
                <option>Customer Service</option>
                <option>Food Safety & HACCP</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Trainer / Pembicara</label>
              <input
                required
                type="text"
                value={newProgram.trainer}
                onChange={e => setNewProgram({ ...newProgram, trainer: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
                placeholder="Nama Trainer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Lokasi / Room</label>
              <input
                required
                type="text"
                value={newProgram.location}
                onChange={e => setNewProgram({ ...newProgram, location: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
                placeholder="Contoh: Site Duri / Zoom Meeting"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Tanggal Mulai</label>
              <input
                required
                type="date"
                value={newProgram.start_date}
                onChange={e => setNewProgram({ ...newProgram, start_date: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Durasi</label>
            <input
              required
              type="text"
              value={newProgram.duration}
              onChange={e => setNewProgram({ ...newProgram, duration: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              placeholder="Contoh: 15 Jam / 2 Hari"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddProgramOpen(false)}>Batal</Button>
            <Button type="submit" className="bg-brand-600 text-white hover:bg-brand-700">Simpan Program</Button>
          </div>
        </form>
      </Dialog>

      {/* MODAL: ADD/EDIT CERTIFICATION MANUAL */}
      <Dialog
        open={isAddCertOpen}
        onClose={() => setIsAddCertOpen(false)}
        title={editingCertId ? 'Edit Sertifikasi Karyawan' : 'Tambah Sertifikasi Karyawan Manual'}
        description="Masukkan sertifikasi eksternal atau manual yang dimiliki karyawan."
      >
        <form onSubmit={handleCreateCert} className="space-y-4 py-4">
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Pilih Karyawan</label>
            <select
              required
              value={newCert.employee_id}
              onChange={e => setNewCert({ ...newCert, employee_id: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
            >
              <option value="">-- Pilih Karyawan --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.fullName || emp.name} ({emp.employeeId})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Nama Sertifikasi</label>
            <input
              required
              type="text"
              value={newCert.certification}
              onChange={e => setNewCert({ ...newCert, certification: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              placeholder="Contoh: Ahli K3 Umum BNSP"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Kategori</label>
              <select
                value={newCert.category}
                onChange={e => setNewCert({ ...newCert, category: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              >
                <option>Teknologi</option>
                <option>K3 & Keselamatan Kerja</option>
                <option>Leadership</option>
                <option>Customer Service</option>
                <option>Food Safety & HACCP</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Organisasi Penerbit</label>
              <input
                required
                type="text"
                value={newCert.issuer}
                onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
                placeholder="Contoh: BNSP / AWS / Scrum Alliance"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Tanggal Terbit</label>
              <input
                required
                type="date"
                value={newCert.issuedDate}
                onChange={e => setNewCert({ ...newCert, issuedDate: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Tanggal Kedaluwarsa</label>
              <input
                required
                type="date"
                value={newCert.expiryDate}
                onChange={e => setNewCert({ ...newCert, expiryDate: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Nomor Kredensial (Sertifikat)</label>
              <input
                required
                type="text"
                value={newCert.credentialId}
                onChange={e => setNewCert({ ...newCert, credentialId: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
                placeholder="Nomor Sertifikat"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Status</label>
              <select
                value={newCert.status}
                onChange={e => setNewCert({ ...newCert, status: e.target.value })}
                className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
              >
                <option>Aktif</option>
                <option>Hampir Habis</option>
                <option>Kedaluwarsa</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Upload File Sertifikat (Simulasi)</label>
            <input
              type="file"
              onChange={e => {
                const filename = e.target.files && e.target.files[0] ? e.target.files[0].name : '';
                setNewCert({ ...newCert, document_url: filename || 'uploaded_cert.pdf' });
              }}
              className="w-full rounded-xl border border-border bg-card p-2 text-sm outline-none focus:border-brand-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddCertOpen(false)}>Batal</Button>
            <Button type="submit" className="bg-brand-600 text-white hover:bg-brand-700">Simpan Sertifikasi</Button>
          </div>
        </form>
      </Dialog>

      {/* MODAL: ADD PARTICIPANT TO PROGRAM */}
      <Dialog
        open={isAddParticipantOpen}
        onClose={() => setIsAddParticipantOpen(false)}
        title="Tambah Peserta Pelatihan"
        description="Pilih karyawan PT Indocater untuk didaftarkan ke kelas pelatihan ini."
      >
        <form onSubmit={handleAddParticipant} className="space-y-4 py-4">
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Pilih Karyawan</label>
            <select
              required
              value={newParticipant.employee_id}
              onChange={e => setNewParticipant({ ...newParticipant, employee_id: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
            >
              <option value="">-- Pilih Karyawan --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.fullName || emp.name} ({emp.employeeId})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Status Pendaftaran</label>
            <select
              value={newParticipant.status}
              onChange={e => setNewParticipant({ ...newParticipant, status: e.target.value })}
              className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-brand-500"
            >
              <option>Terdaftar</option>
              <option>Selesai</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
            <Button type="button" variant="outline" onClick={() => setIsAddParticipantOpen(false)}>Batal</Button>
            <Button type="submit" className="bg-brand-600 text-white hover:bg-brand-700">Daftarkan Karyawan</Button>
          </div>
        </form>
      </Dialog>

      {/* PRINT PREVIEW / CERTIFICATE MODAL */}
      {previewCertificateData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white text-slate-900 rounded-[28px] border border-slate-200 w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-100 border-b border-slate-200">
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-600" /> Preview Sertifikat Resmi PT Indocater
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
                >
                  <Printer className="h-4 w-4" /> Cetak / Unduh PDF
                </button>
                <button
                  onClick={() => setPreviewCertificateData(null)}
                  className="p-2 text-slate-500 hover:bg-slate-200 rounded-full transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Simulated Live Render of Training Certificate Template */}
            <div className="p-8 overflow-x-auto flex justify-center bg-slate-200/50">
              <div
                className="relative bg-white border border-slate-300 shadow-md flex flex-col justify-between text-center select-none"
                style={{
                  width: '297mm',
                  height: '210mm',
                  minWidth: '297mm',
                  minHeight: '210mm',
                  padding: '16mm',
                  fontFamily: 'Georgia, Times, serif',
                  transform: 'scale(0.8)',
                  transformOrigin: 'top center',
                  margin: '0 auto -40mm auto'
                }}
              >
                {/* Geometrics */}
                <div style={{ position: 'absolute', top: '8mm', left: '8mm', right: '8mm', bottom: '8mm', border: '4px solid #0A2540', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '10mm', left: '10mm', right: '10mm', bottom: '10mm', border: '1px solid #D4AF37', pointerEvents: 'none' }} />
                
                {/* Corner Accents */}
                <div style={{ position: 'absolute', top: '8mm', left: '8mm', width: '30mm', height: '30mm', borderTop: '10px solid #0A2540', borderLeft: '10px solid #0A2540' }} />
                <div style={{ position: 'absolute', top: '12mm', left: '12mm', width: '22mm', height: '22mm', borderTop: '3px solid #A30000', borderLeft: '3px solid #A30000' }} />
                
                <div style={{ position: 'absolute', top: '8mm', right: '8mm', width: '30mm', height: '30mm', borderTop: '10px solid #0A2540', borderRight: '10px solid #0A2540' }} />
                <div style={{ position: 'absolute', top: '12mm', right: '12mm', width: '22mm', height: '22mm', borderTop: '3px solid #A30000', borderRight: '3px solid #A30000' }} />

                <div style={{ position: 'absolute', bottom: '8mm', left: '8mm', width: '30mm', height: '30mm', borderBottom: '10px solid #0A2540', borderLeft: '10px solid #0A2540' }} />
                <div style={{ position: 'absolute', bottom: '12mm', left: '12mm', width: '22mm', height: '22mm', borderBottom: '3px solid #A30000', borderLeft: '3px solid #A30000' }} />

                <div style={{ position: 'absolute', bottom: '8mm', right: '8mm', width: '30mm', height: '30mm', borderBottom: '10px solid #0A2540', borderRight: '10px solid #0A2540' }} />
                <div style={{ position: 'absolute', bottom: '12mm', right: '12mm', width: '22mm', height: '22mm', borderBottom: '3px solid #A30000', borderRight: '3px solid #A30000' }} />

                {/* Content */}
                <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8mm 16mm' }}>
                  {/* Header */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3mm' }}>
                      <svg viewBox="0 0 400 100" width="160" height="40">
                        <rect width="400" height="100" rx="8" fill="#0A2540" />
                        <g transform="translate(20, 20)">
                          <polygon points="30,0 60,50 0,50" fill="#A30000" />
                          <polygon points="30,15 50,48 10,48" fill="#FFD700" />
                          <circle cx="30" cy="38" r="8" fill="#0A2540" />
                        </g>
                        <text x="100" y="48" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#FFFFFF">PT INDOCATER</text>
                        <text x="100" y="70" fontFamily="Arial, sans-serif" fontSize="12" fill="#FFD700" opacity="0.8" style={{ letterSpacing: '3px' }}>ENTERPRISE HR SERVICES</text>
                      </svg>
                    </div>
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt', fontWeight: 'bold', letterSpacing: '4px', color: '#0A2540', margin: '0 0 1mm 0' }}>PT INDOCATER</h2>
                    <h1 style={{ fontFamily: 'Times New Roman, serif', fontSize: '28pt', color: '#0A2540', margin: '0', letterSpacing: '1px' }}>CERTIFICATE</h1>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '9pt', fontWeight: 'bold', letterSpacing: '4px', color: '#A30000', margin: '1mm 0 4mm 0', textTransform: 'uppercase' }}>OF TRAINING COMPLETION</div>
                  </div>

                  {/* Body */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2mm' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '10pt', color: '#555555', margin: '0' }}>This certificate is proudly presented to:</p>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '22pt', fontWeight: 'bold', color: '#0A2540', borderBottom: '2px solid #D4AF37', paddingBottom: '1mm', margin: '1mm 0', minWidth: '120mm' }}>
                      {previewCertificateData.employee_name}
                    </div>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '8pt', color: '#666666', marginTop: '-1mm', marginBottom: '1mm' }}>
                      Employee ID: {previewCertificateData.employee_id}
                    </div>
                    
                    <p style={{ fontSize: '10pt', color: '#555555', margin: '0' }}>for successfully completing the training program:</p>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '15pt', fontWeight: 'bold', color: '#A30000', margin: '1mm 0' }}>
                      {previewCertificateData.training_title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5mm', fontFamily: 'Arial, sans-serif', fontSize: '8.5pt', color: '#333333', margin: '2mm 0', backgroundColor: '#F8F9FA', padding: '2mm 4mm', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                      <div><strong style={{ color: '#0A2540' }}>Category:</strong> {previewCertificateData.training_category}</div>
                      <div><strong style={{ color: '#0A2540' }}>Date:</strong> {previewCertificateData.training_date}</div>
                      <div><strong style={{ color: '#0A2540' }}>Duration:</strong> {previewCertificateData.training_duration}</div>
                      <div><strong style={{ color: '#0A2540' }}>Trainer:</strong> {previewCertificateData.trainer_name}</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4mm' }}>
                    <div style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '8pt', color: '#666666', lineHeight: '1.4' }}>
                      <div><strong>Certificate Number:</strong> <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', color: '#0A2540' }}>{previewCertificateData.certificate_number}</span></div>
                      <div><strong>Issued Date:</strong> {previewCertificateData.issued_date}</div>
                      <div><strong>Issuer:</strong> {previewCertificateData.issuer}</div>
                    </div>

                    <div style={{ width: '25mm', height: '25mm', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 120 120" width="70" height="70" style={{ opacity: 0.85 }}>
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#A30000" strokeWidth="3" strokeDasharray="100 5"/>
                        <circle cx="60" cy="60" r="44" fill="none" stroke="#A30000" strokeWidth="1" />
                        <text x="60" y="42" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#A30000" textAnchor="middle">PT INDOCATER</text>
                        <text x="60" y="64" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#A30000" textAnchor="middle">HR DEPT</text>
                        <text x="60" y="84" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#A30000" textAnchor="middle">OFFICIAL SEAL</text>
                      </svg>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50mm' }}>
                      <div style={{ height: '12mm', display: 'flex', alignItems: 'flex-end', marginBottom: '2mm' }}>
                        <svg viewBox="0 0 200 80" width="120" height="40">
                          <path d="M 20,50 Q 40,20 60,45 T 100,30 T 140,55 T 180,40" fill="none" stroke="#1A365D" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M 40,55 L 160,55" fill="none" stroke="#A30000" strokeWidth="1" strokeDasharray="3,3" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '8.5pt', fontWeight: 'bold', color: '#0A2540', borderTop: '1px solid #333333', paddingTop: '1px', width: '100%', textAlign: 'center', margin: '0' }}>Training Manager</p>
                      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '7pt', color: '#666666', textTransform: 'uppercase', margin: '0' }}>Human Resource Department</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Padder for scale overflow */}
            <div className="h-10 bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}
