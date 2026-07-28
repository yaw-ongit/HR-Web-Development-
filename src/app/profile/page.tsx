'use client';

import { useState, useEffect, useMemo } from 'react';
import { User, Phone, Mail, MapPin, Briefcase, Calendar, Award, Shield, FileText, Save, Camera, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/section-container';
import { TalentService } from '@/lib/services';

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState('general');
  const [userTrainings, setUserTrainings] = useState<any[]>([]);

  // Local state for user profile
  const [profile, setProfile] = useState({
    id: 'leo-wibowo',
    fullName: 'Leo Wibowo',
    employeeId: 'EMP-1006',
    email: 'leo.wibowo@indocater.co.id',
    phone: '+62 812-9988-2233',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    joinDate: '2022-01-19',
    manager: 'Fitri Novita',
    location: 'Bandung Studio',
    photo: 'LW',
    emergencyContact: 'Maya Sari (+62 812-3456-7890)',
    address: 'Jl. Merdeka No. 45, Bandung',
    bloodType: 'O',
    gender: 'Laki-laki'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  useEffect(() => {
    // Load training history for Leo Wibowo
    Promise.all([
      TalentService.getPlannings(),
      TalentService.getRealizations()
    ]).then(async ([plansRes, realsRes]) => {
      if (plansRes.data && realsRes.data) {
        const tempHistory: any[] = [];
        for (const real of realsRes.data) {
          const plan = plansRes.data.find(p => p.id === real.planning_id);
          if (!plan) continue;

          const partsRes = await TalentService.getParticipants(real.id);
          if (partsRes.data) {
            const matchedPart = partsRes.data.find(p => p.employee_id === profile.id || p.employee_name?.toLowerCase() === profile.fullName.toLowerCase());
            if (matchedPart) {
              const attsRes = await TalentService.getAttendances(real.id);
              const att = attsRes.data?.find(a => a.participant_id === matchedPart.id);
              const certsRes = await TalentService.getCertificatesByRealization(real.id);
              const cert = certsRes.data?.find(c => c.participant_id === matchedPart.id);

              tempHistory.push({
                title: plan.title,
                date: plan.start_date,
                trainer: plan.trainer,
                attendance: att ? att.status : 'Absent',
                certificateNumber: cert ? cert.certificate_number : null,
                expirationDate: cert ? cert.expiration_date : null
              });
            }
          }
        }
        setUserTrainings(tempHistory);
      }
    });
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <SectionContainer>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group shrink-0">
              <div className="grid h-24 w-24 place-items-center rounded-[2.5rem] bg-brand-500 text-3xl font-bold text-white shadow-lg">
                {profile.photo}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 shadow border border-border">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{profile.fullName}</h1>
              <div className="grid gap-2 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3">
                <p>ID: {profile.employeeId}</p>
                <p>{profile.position} ({profile.department})</p>
                <p>{profile.location}</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold self-start lg:self-center">
            {isEditing ? 'Batal Edit' : 'Edit Profil'}
          </Button>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-1 rounded-xl bg-secondary p-1 mt-8 max-w-2xl">
          {([
            { id: 'general', label: 'Umum', icon: User },
            { id: 'employment', label: 'Pekerjaan', icon: Briefcase },
            { id: 'training', label: 'Pelatihan', icon: Calendar },
            { id: 'security', label: 'Keamanan', icon: Shield }
          ] as const).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === tab.id ? 'bg-card text-foreground shadow font-bold' : 'text-muted hover:text-muted-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="mt-6">
          {activeTab === 'general' && (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-foreground">Informasi Pribadi</h3>
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground">No. Telepon / WhatsApp</label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground">Kontak Darurat</label>
                      <input
                        type="text"
                        value={form.emergencyContact}
                        onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground">Alamat Tinggal</label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="rounded-xl bg-brand-600 text-white hover:bg-brand-700 font-semibold flex items-center gap-1.5">
                      <Save className="h-4 w-4" /> Simpan Perubahan
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Email</span>
                    <strong>{profile.email}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">No. Telepon / WhatsApp</span>
                    <strong>{profile.phone}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Kontak Darurat</span>
                    <strong>{profile.emergencyContact}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Golongan Darah</span>
                    <strong>{profile.bloodType}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-muted-foreground block">Alamat</span>
                    <strong>{profile.address}</strong>
                  </div>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'employment' && (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-foreground">Informasi Kepegawaian (Read-Only)</h3>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">ID Karyawan</span>
                  <strong>{profile.employeeId}</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Tanggal Bergabung</span>
                  <strong>{profile.joinDate}</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Departemen</span>
                  <strong>{profile.department}</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Posisi / Jabatan</span>
                  <strong>{profile.position}</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Atasan Langsung (Manager)</span>
                  <strong>{profile.manager}</strong>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Lokasi Kantor</span>
                  <strong>{profile.location}</strong>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'training' && (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-foreground">Riwayat Pelatihan & Sertifikasi</h3>
              <div className="space-y-4">
                {userTrainings.map((t, idx) => (
                  <div key={idx} className="p-4 bg-secondary/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                    <div>
                      <strong className="block text-base text-foreground">{t.title}</strong>
                      <span className="text-xs text-muted-foreground">Trainer: {t.trainer} | Tanggal: {t.date}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.attendance === 'Present' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          Kehadiran: {t.attendance}
                        </span>
                        {t.certificateNumber && (
                          <span className="text-xs text-primary font-semibold">Sertifikat: {t.certificateNumber} (Berlaku s/d {t.expirationDate})</span>
                        )}
                      </div>
                    </div>
                    {t.certificateNumber && (
                      <Button onClick={() => alert(`Mengunduh sertifikat ${t.certificateNumber}...`)} variant="outline" size="sm" className="rounded-xl flex items-center gap-1.5 self-start sm:self-center">
                        <Download className="h-3.5 w-3.5" /> Unduh PDF
                      </Button>
                    )}
                  </div>
                ))}
                {userTrainings.length === 0 && (
                  <p className="text-sm text-muted italic py-6 text-center">Belum ada riwayat pelatihan terdaftar.</p>
                )}
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="rounded-[28px] border border-border p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-foreground">Keamanan Akun</h3>
              <p className="text-xs text-muted-foreground">Perbarui kata sandi dan amankan akses akun HRIS Anda.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Kata Sandi Saat Ini</label>
                  <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Kata Sandi Baru</label>
                  <input type="password" placeholder="Min. 8 karakter" className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold">
                  Ganti Kata Sandi
                </Button>
              </div>
            </Card>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
