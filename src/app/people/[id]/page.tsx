'use client';

import { useMemo, useState, use, useEffect } from 'react';
import { ArrowRight, Briefcase, BookOpen, CalendarDays, CheckCircle2, ClipboardList, HeartPulse, Mail, MapPin, Phone, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getEmployeeProfile } from '@/lib/people-data';
import { PeopleService } from '@/lib/services';

interface EmployeePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EmployeeProfilePage(props: EmployeePageProps) {
  const params = use(props.params);
  const localProfile = getEmployeeProfile(params.id);
  const [profile, setProfile] = useState<any>(localProfile || {});
  const [activeTab, setActiveTab] = useState('Ringkasan');

  useEffect(() => {
    PeopleService.getEmployeeById(params.id, localProfile).then((data) => {
      if (data) {
        setProfile(data);
      }
    });
  }, [params.id, localProfile]);

  const tabs = ['Ringkasan', 'Pekerjaan', 'Pendidikan', 'Keluarga', 'Asuransi', 'Pelatihan', 'Kehadiran', 'Cuti', 'Medis', 'Benefit', 'Klaim', 'Fasilitas', 'Penggajian', 'Dokumen', 'Riwayat'];

  const stats = useMemo(
    () => [
      { label: 'Kehadiran', value: profile?.stats?.attendanceRate ?? '—', icon: CalendarDays },
      { label: 'Sisa cuti', value: profile?.stats?.remainingLeave ?? '—', icon: CheckCircle2 },
      { label: 'Pelatihan selesai', value: profile?.stats?.trainingCompleted ?? '—', icon: BookOpen },
      { label: 'Benefit', value: profile?.stats?.benefits ?? '—', icon: HeartPulse },
      { label: 'Masa kerja', value: profile?.stats?.yearsOfService ?? '—', icon: Star },
      { label: 'Kinerja', value: profile?.stats?.performance ?? '—', icon: ClipboardList },
    ],
    [profile],
  );

  if (!profile) {
    return (
      <div className="grid min-h-screen place-items-center bg-white text-slate-900">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-10 text-center shadow-card">
          <p className="text-xl font-semibold">Karyawan tidak ditemukan</p>
          <p className="mt-3 text-sm text-slate-400">Profil karyawan yang diminta tidak tersedia dalam direktori People.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 pt-6 lg:pb-16">
      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-[2rem] bg-white/90 text-3xl font-semibold text-slate-900">
                {profile.photo}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-semibold text-slate-900">{profile.fullName}</h1>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">{profile.status}</span>
                </div>
                <div className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-3">
                  <p>{profile.employeeId}</p>
                  <p>{profile.department}</p>
                  <p>{profile.position}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Mail className="h-4 w-4" /> Kirim pesan
              </Button>
              <Button variant="secondary" className="rounded-full px-5 py-3">
                <Phone className="h-4 w-4" /> Panggil
              </Button>
              <Button variant="primary" className="rounded-full px-5 py-3">
                <ArrowRight className="h-4 w-4" /> Edit profil
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Manajer', value: profile.manager, icon: Users },
              { label: 'Cabang', value: profile.branch, icon: MapPin },
              { label: 'Lokasi', value: profile.location, icon: MapPin },
              { label: 'Email', value: profile.email, icon: Mail },
              { label: 'Telepon', value: profile.phone, icon: Phone },
              { label: 'Kontrak', value: profile.contractType, icon: Briefcase },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white/80 p-5">
                <div className="flex items-center gap-3 text-slate-400">
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.3em]">{item.label}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-brand-50 text-brand-600">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Profil karyawan 360</p>
            <h2 className="text-2xl font-semibold text-slate-900">{activeTab}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab ? 'bg-brand-600 text-slate-950' : 'bg-slate-50/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Ringkasan' && (
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Ringkasan</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">Profil singkat</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-400">{profile.summary}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Mode kerja', value: profile.workMode },
                    { label: 'Tanggal bergabung', value: profile.hireDate },
                    { label: 'Kontak darurat', value: `${profile.emergencyContact.name} • ${profile.emergencyContact.relationship}` },
                    { label: 'Kantor', value: profile.location },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                      <p className="mt-3 text-sm font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Organisasi</p>
                <div className="mt-5 rounded-[28px] border border-slate-200 bg-white/80 p-6">
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-slate-50/90 p-4">
                      <p className="text-sm text-slate-400">Manajer</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">{profile.manager}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50/90 p-4">
                      <p className="text-sm text-slate-400">Departemen</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">{profile.department}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Riwayat pekerjaan</p>
                <div className="mt-5 grid gap-4">
                  {profile.employmentHistory?.map((item: any) => (
                    <div key={item.period} className="rounded-3xl bg-white/80 p-4">
                      <p className="text-sm text-slate-400">{item.period}</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">{item.role}</p>
                      <p className="text-sm text-slate-400">{item.department} • {item.location}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Ringkasan kontrak</p>
                <div className="mt-5 space-y-4">
                  <p className="text-sm text-slate-400">Kontrak {profile.contractType} dimulai sejak {profile.hireDate}.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {profile.leaveBalance?.map((leave: any) => (
                      <div key={leave.type} className="rounded-3xl bg-white/80 p-4">
                        <p className="text-sm text-slate-400">{leave.type}</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">Sisa {leave.remaining}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab !== 'Ringkasan' && (
          <section className="space-y-6">
            {activeTab === 'Pekerjaan' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Riwayat pekerjaan</p>
                <div className="mt-6 space-y-4">
                  {profile.employmentHistory?.map((item: any) => (
                    <div key={item.period} className="rounded-3xl bg-white/80 p-5">
                      <p className="text-sm text-slate-400">{item.period}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{item.role}</p>
                      <p className="text-sm text-slate-400">{item.department} • {item.location}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Kehadiran' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Detail kehadiran</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-sm text-slate-400">Persentase kehadiran</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{profile.stats.attendanceRate}</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-sm text-slate-400">Review terakhir</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">April 2026</p>
                  </div>
                </div>
                <div className="mt-6 rounded-3xl bg-white/80 p-5 text-sm text-slate-400">
                  Kehadiran diukur berdasarkan tolok ukur kinerja regional dan mencakup hari kerja di lokasi remote.
                </div>
              </Card>
            )}

            {activeTab === 'Cuti' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Saldo cuti</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {profile.leaveBalance?.map((leave: any) => (
                    <div key={leave.type} className="rounded-3xl bg-white/80 p-5">
                      <p className="text-sm text-slate-400">{leave.type}</p>
                      <p className="mt-3 text-xl font-semibold text-slate-900">Sisa {leave.remaining} hari</p>
                      <p className="text-sm text-slate-400">Terpakai {leave.used} hari</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Pelatihan' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Progres pelatihan</p>
                <div className="mt-6 space-y-4">
                  {profile.trainingRecords?.map((training: any) => (
                    <div key={training.title} className="rounded-3xl bg-white/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{training.title}</p>
                          <p className="mt-2 text-sm text-slate-400">{training.status}</p>
                        </div>
                        <span className="rounded-full bg-slate-50/90 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700">Jatuh tempo {training.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Medis' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Kepatuhan medis</p>
                <div className="mt-6 space-y-4">
                  {profile.medicalRecords?.map((record: any) => (
                    <div key={record.label} className="rounded-3xl bg-white/80 p-5">
                      <p className="text-lg font-semibold text-slate-900">{record.label}</p>
                      <p className="mt-2 text-sm text-slate-400">Status: {record.status}</p>
                      <p className="mt-2 text-sm text-slate-400">Berlaku hingga {record.expires}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Benefit' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Ringkasan benefit</p>
                <div className="mt-6 space-y-4">
                  {profile.benefitSummary?.map((benefit: any) => (
                    <div key={benefit.name} className="rounded-3xl bg-white/80 p-5">
                      <p className="text-lg font-semibold text-slate-900">{benefit.name}</p>
                      <p className="mt-2 text-sm text-slate-400">{benefit.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Asuransi' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Polis asuransi</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-lg font-semibold text-slate-900">Asuransi kesehatan</p>
                    <p className="mt-2 text-sm text-slate-400">Aktif • PT Asuransi Kesehatan Indonesia</p>
                    <p className="mt-3 text-sm text-slate-400">Cakupan: Diri sendiri + Keluarga • Berlaku hingga 2026-01-14</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-lg font-semibold text-slate-900">Asuransi jiwa</p>
                    <p className="mt-2 text-sm text-slate-400">Aktif • PT Asuransi Jiwa Bersama</p>
                    <p className="mt-3 text-sm text-slate-400">Cakupan: 500% gaji tahunan • Berlaku hingga 2026-01-14</p>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'Klaim' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Riwayat klaim</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-white/80 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">Klaim medis - rawat inap</p>
                        <p className="mt-2 text-sm text-slate-400">Rp 15,0M • Mei 2026</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Disetujui</span>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">Klaim medis - pemeriksaan preventif</p>
                        <p className="mt-2 text-sm text-slate-400">Rp 0,8M • Juni 2026</p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Menunggu</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'Fasilitas' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Program terdaftar</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-lg font-semibold text-slate-900">Program kebugaran & kesejahteraan</p>
                    <p className="mt-2 text-sm text-slate-400">Pendaftaran aktif</p>
                    <p className="mt-3 text-sm text-slate-400">Keanggotaan gym dan pemantauan kesehatan untuk pegawai operasional.</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-lg font-semibold text-slate-900">Voucher makan karyawan</p>
                    <p className="mt-2 text-sm text-slate-400">Pendaftaran aktif</p>
                    <p className="mt-3 text-sm text-slate-400">Voucher harian untuk karyawan PT Indocater Catering.</p>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'Penggajian' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Konfigurasi payroll</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-sm text-slate-400">Gaji pokok</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">Rp 12.0M</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-sm text-slate-400">Jenis pekerjaan</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">Permanen</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-sm text-slate-400">Rekening bank</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">1234567890</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-5">
                    <p className="text-sm text-slate-400">Bank</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">Bank Mandiri</p>
                  </div>
                </div>
                <div className="mt-6 rounded-3xl bg-white/80 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Status payroll</p>
                  <p className="mt-3 text-base font-semibold text-emerald-300">Siap integrasi</p>
                </div>
              </Card>
            )}

            {activeTab === 'Dokumen' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Dokumen karyawan</p>
                <div className="mt-6 space-y-4">
                  {profile.documents?.map((doc: any) => (
                    <div key={doc.title} className="rounded-3xl bg-white/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{doc.title}</p>
                          <p className="mt-2 text-sm text-slate-400">{doc.category}</p>
                        </div>
                        <span className="rounded-full bg-slate-50/90 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-700">{doc.status}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-400">Ditambahkan {doc.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Riwayat' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Riwayat</p>
                <div className="mt-6 space-y-4">
                  {profile.timeline?.map((event: any) => (
                    <div key={event.date} className="rounded-3xl bg-white/80 p-5">
                      <p className="text-sm font-semibold text-slate-900">{event.date}</p>
                      <p className="mt-2 text-base text-slate-800">{event.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{event.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'Log Aktivitas' && (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/95 p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-700">Log aktivitas</p>
                <div className="mt-6 space-y-4">
                  {profile.activityLog?.map((entry: any) => (
                    <div key={entry.time} className="rounded-3xl bg-white/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-base font-semibold text-slate-900">{entry.description}</p>
                        <span className="text-sm text-slate-400">{entry.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">{entry.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </section>
        )}
      </section>
    </div>
  );
}
