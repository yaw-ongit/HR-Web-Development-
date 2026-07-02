export type RoleKey = 'employee' | 'supervisor' | 'hr-officer' | 'hr-manager' | 'director' | 'administrator';

export const roles = [
  { key: 'employee', label: 'Karyawan' },
  { key: 'supervisor', label: 'Supervisor' },
  { key: 'hr-officer', label: 'HR Officer' },
  { key: 'hr-manager', label: 'HR Manager' },
  { key: 'director', label: 'Direktur' },
  { key: 'administrator', label: 'Administrator' },
] as const;

export const roleQuickActions = {
  employee: [
    { label: 'Ajukan Cuti', hint: 'Kirim pengajuan cuti/izin', icon: 'CalendarCheck' },
    { label: 'Unduh Dokumen', hint: 'Buka slip gaji atau kontrak', icon: 'FileText' },
    { label: 'Lihat Presensi', hint: 'Periksa status hari ini', icon: 'Clock' },
  ],
  supervisor: [
    { label: 'Persetujuan Cuti', hint: 'Tinjau pengajuan cuti tim', icon: 'CheckCircle' },
    { label: 'Lihat Tim', hint: 'Buka dashboard tim', icon: 'Users' },
    { label: 'Laporan Tim', hint: 'Buat ringkasan staf', icon: 'BarChart3' },
  ],
  'hr-officer': [
    { label: 'Tambah Karyawan', hint: 'Onboard karyawan baru', icon: 'UserPlus' },
    { label: 'Buat Laporan', hint: 'Buat laporan tenaga kerja', icon: 'FileChart' },
    { label: 'Buat Pelatihan', hint: 'Jadwalkan pengembangan', icon: 'BookOpen' },
    { label: 'Buka Lowongan', hint: 'Buka rekrutmen baru', icon: 'Briefcase' },
  ],
  'hr-manager': [
    { label: 'Tinjau Analitik', hint: 'Periksa KPI tenaga kerja', icon: 'TrendingUp' },
    { label: 'Setujui Anggaran', hint: 'Otorisasi pengeluaran', icon: 'Wallet' },
    { label: 'Tetapkan Target', hint: 'Publikasi prioritas tahunan', icon: 'Flag' },
  ],
  director: [
    { label: 'Kesehatan Organisasi', hint: 'Snapshot tenaga kerja eksekutif', icon: 'ShieldCheck' },
    { label: 'Tinjau Pertumbuhan', hint: 'Lacak pertumbuhan organisasi', icon: 'ArrowUpRight' },
    { label: 'Buka Proyeksi', hint: 'Periksa proyeksi rekrutmen', icon: 'Sparkles' },
  ],
  administrator: [
    { label: 'Tinjau Keamanan', hint: 'Periksa peringatan sistem', icon: 'ShieldAlert' },
    { label: 'Log Audit', hint: 'Lihat aktivitas terbaru', icon: 'ClipboardList' },
    { label: 'Kelola Hak Akses', hint: 'Sesuaikan kontrol akses', icon: 'Key' },
  ],
};

export const roleWidgets = {
  employee: [
    { title: 'Kalender Kehadiran', type: 'calendar' },
    { title: 'Sisa Cuti', type: 'balance' },
    { title: 'Acara Mendatang', type: 'events' },
    { title: 'Jadwal Pelatihan', type: 'training' },
    { title: 'Aktivitas Terbaru', type: 'activity' },
    { title: 'Pengumuman Perusahaan', type: 'announcements' },
  ],
  supervisor: [
    { title: 'Pusat Persetujuan', type: 'approvals' },
    { title: 'Ringkasan Kehadiran', type: 'attendance' },
    { title: 'Kalender Tim', type: 'calendar' },
    { title: 'Progres Pelatihan', type: 'training' },
    { title: 'Aktivitas Tim Terbaru', type: 'activity' },
  ],
  'hr-officer': [
    { title: 'Rekrutmen Terbaru', type: 'recruitment' },
    { title: 'Menunggu Persetujuan', type: 'approvals' },
    { title: 'Ulang Tahun Karyawan', type: 'birthdays' },
    { title: 'Pengumuman', type: 'announcements' },
    { title: 'Aktivitas Terbaru', type: 'activity' },
  ],
  'hr-manager': [
    { title: 'Analitik Tenaga Kerja', type: 'workforce' },
    { title: 'Perbandingan Departemen', type: 'comparison' },
    { title: 'Ketidakhadiran (Absen)', type: 'attendance' },
    { title: 'Funnel Rekrutmen', type: 'recruitment' },
    { title: 'Ringkasan Kepatuhan', type: 'compliance' },
  ],
  director: [
    { title: 'Dashboard Eksekutif', type: 'workforce' },
    { title: 'Tren Perekrutan', type: 'trend' },
    { title: 'Pertumbuhan Departemen', type: 'comparison' },
    { title: 'Distribusi Organisasi', type: 'distribution' },
  ],
  administrator: [
    { title: 'Status Sistem', type: 'status' },
    { title: 'Kesehatan Server', type: 'server' },
    { title: 'Log Audit', type: 'logs' },
    { title: 'Peringatan Keamanan', type: 'alerts' },
  ],
};

export const dashboardKpis = {
  employee: [
    { label: 'Kehadiran Hari Ini', value: 'Hadir', trend: 'Tepat Waktu', icon: 'Clock', valueColor: 'text-emerald-600' },
    { label: 'Sisa Cuti', value: '12 hari', trend: '3 hari bulan ini', icon: 'Leaf', valueColor: 'text-blue-500' },
    { label: 'Pelatihan Mendatang', value: '1 sesi', trend: 'Mulai dalam 4 hari', icon: 'BookOpen', valueColor: 'text-blue-600' },
    { label: 'Status Benefit', value: 'Aktif', trend: 'Kesehatan, pensiun', icon: 'ShieldCheck', valueColor: 'text-purple-600' },
  ],
  supervisor: [
    { label: 'Kehadiran Tim', value: '98%', trend: '+2% vs kemarin', icon: 'Users', valueColor: 'text-emerald-600' },
    { label: 'Cuti Menunggu', value: '6 permintaan', trend: '2 mendesak', icon: 'CalendarCheck', valueColor: 'text-amber-600' },
    { label: 'Karyawan Terlambat', value: '3', trend: 'Meningkat', icon: 'Clock', valueColor: 'text-blue-600' },
    { label: 'Kontrak Akan Habis', value: '5', trend: 'Dalam 30 hari', icon: 'FileText', valueColor: 'text-rose-600' },
  ],
  'hr-officer': [
    { label: 'Karyawan Hadir', value: '3,102', trend: '92% dari total', icon: 'Users', valueColor: 'text-emerald-600' },
    { label: 'Karyawan Absen', value: '45', trend: 'Tanpa keterangan', icon: 'UserX', valueColor: 'text-rose-600' },
    { label: 'Sedang Cuti / Izin', value: '124', trend: 'Sakit, Tahunan', icon: 'Bed', valueColor: 'text-amber-600' },
    { label: 'Kontrak Kedaluwarsa', value: '18', trend: 'Bulan ini', icon: 'FileText', valueColor: 'text-blue-600' },
  ],
  'hr-manager': [
    { label: 'Total Karyawan', value: '3,412', trend: '+6% kuartal ini', icon: 'Users', valueColor: 'text-emerald-600' },
    { label: 'Tingkat Turnover', value: '8.2%', trend: 'Di bawah target', icon: 'ArrowDownRight', valueColor: 'text-slate-800' },
    { label: 'Kepatuhan MCU', value: '94%', trend: 'Jadwal bulan ini', icon: 'HeartPulse', valueColor: 'text-cyan-600' },
    { label: 'Rata-rata Masa Kerja', value: '4.7 thn', trend: 'Naik 0.3 thn', icon: 'Hourglass', valueColor: 'text-purple-600' },
  ],
  director: [
    { label: 'Total Karyawan', value: '3,412', trend: 'Pertumbuhan headcount', icon: 'Users', valueColor: 'text-emerald-600' },
    { label: 'Pertumbuhan', value: '+7.4%', trend: 'Kuartal ke kuartal', icon: 'TrendingUp', valueColor: 'text-cyan-600' },
    { label: 'Tingkat Turnover', value: '8.2%', trend: 'Di bawah benchmark', icon: 'ArrowDownRight', valueColor: 'text-slate-800' },
    { label: 'Ringkasan Anggaran', value: 'Rp 12.4M', trend: 'Sesuai target', icon: 'Wallet', valueColor: 'text-amber-600' },
  ],
  administrator: [
    { label: 'Status Sistem', value: 'Operasional', trend: 'Semua layanan online', icon: 'Server', valueColor: 'text-emerald-600' },
    { label: 'Pengguna', value: '4,947', trend: 'Sesi aktif 128', icon: 'UserCheck', valueColor: 'text-blue-600' },
    { label: 'Role Akses', value: '12 grup', trend: 'Tidak ada perubahan', icon: 'Key', valueColor: 'text-purple-600' },
    { label: 'Peringatan Keamanan', value: '2', trend: 'Tinjauan kritis', icon: 'ShieldAlert', valueColor: 'text-rose-600' },
  ],
};

export const announcements = [
  { title: 'Town Hall Global SDM pukul 10:00', subtitle: 'Bergabung dengan siaran langsung untuk pembaruan strategis.', status: 'info' },
  { title: 'Batas akhir pendaftaran asuransi', subtitle: 'Daftar benefit sebelum Jumat pukul 23:59.', status: 'warning' },
  { title: 'Kebijakan kerja hybrid baru diterbitkan', subtitle: 'Tinjau jam kerja terbaru dan norma rapat.', status: 'success' },
];

export const employeeMetrics = {
  attendance: [
    { label: 'Sen', value: 1 },
    { label: 'Sel', value: 1 },
    { label: 'Rab', value: 1 },
    { label: 'Kam', value: 1 },
    { label: 'Jum', value: 1 },
    { label: 'Sab', value: 0 },
    { label: 'Min', value: 0 },
  ],
  headcountTrend: [
    { month: 'Jan', value: 3280 },
    { month: 'Feb', value: 3304 },
    { month: 'Mar', value: 3340 },
    { month: 'Apr', value: 3380 },
    { month: 'Mei', value: 3420 },
    { month: 'Jun', value: 3412 },
  ],
  leaveTrend: [
    { month: 'Jan', value: 128 },
    { month: 'Feb', value: 136 },
    { month: 'Mar', value: 142 },
    { month: 'Apr', value: 138 },
    { month: 'Mei', value: 132 },
    { month: 'Jun', value: 127 },
  ],
  trainingCompletion: [
    { name: 'Kepemimpinan', value: 82 },
    { name: 'Kepatuhan', value: 91 },
    { name: 'Kesehatan', value: 75 },
    { name: 'Keahlian', value: 68 },
  ],
  departments: [
    { name: 'Engineering', value: 28 },
    { name: 'Personalia', value: 18 },
    { name: 'Sales', value: 24 },
    { name: 'Marketing', value: 14 },
    { name: 'Finance', value: 16 },
  ],
};

export const recentActivity = [
  { actor: 'Maya Thompson', role: 'HR Officer', action: 'Menyetujui permintaan cuti untuk Leo Hunter', time: '12m lalu', status: 'success' },
  { actor: 'Avery Patel', role: 'Supervisor', action: 'Menugaskan pelatihan ke tim produk', time: '28m lalu', status: 'info' },
  { actor: 'Riley Chen', role: 'Administrator', action: 'Memperbarui izin role untuk grup keamanan', time: '1j lalu', status: 'warning' },
  { actor: 'Noah Brooks', role: 'Karyawan', action: 'Mengajukan permintaan biaya perjalanan dinas', time: '2j lalu', status: 'neutral' },
];

export const systemStatus = [
  { label: 'Latensi API', value: '72 ms', status: 'good' },
  { label: 'Database', value: 'Baca/tulis sehat', status: 'good' },
  { label: 'Layanan Auth', value: 'Refresh 2 mnt', status: 'good' },
  { label: 'Sinkronisasi Backup', value: 'Selesai', status: 'good' },
];

export const roleNotifications = [
  { title: 'Persetujuan cuti diperlukan', description: 'Tinjau permintaan cuti Maya.', type: 'urgent' },
  { title: 'Pembaruan kebijakan tersedia', description: 'Baca panduan kerja hybrid baru.', type: 'info' },
  { title: 'Sesi pelatihan segera dimulai', description: 'Workshop kepemimpinan dimulai dalam 3 hari.', type: 'success' },
];
