export type WorkforceKpi = {
  label: string;
  value: string;
  note: string;
};

export type WorkforceQuickAction = {
  label: string;
  href: string;
  description: string;
};

export type AttendanceRecord = {
  id: string;
  employee: string;
  department: string;
  shift: string;
  checkIn: string;
  checkOut: string;
  jam: string;
  late: 'Yes' | 'No';
  status: string;
  date: string;
};

export type LeaveRequest = {
  id: string;
  employee: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: string;
  approver: string;
};

export type ShiftSchedule = {
  id: string;
  shiftName: string;
  karyawan: number;
  workingHours: string;
  manager: string;
  status: string;
};

export type OvertimeRequest = {
  id: string;
  employee: string;
  department: string;
  date: string;
  jam: string;
  reason: string;
  status: string;
};

export type WorkforceCalendarDay = {
  day: number;
  weekday: string;
  status: string;
  color: string;
  note: string;
};

export const workforceKpis: WorkforceKpi[] = [
  { label: 'Karyawan Hadir', value: '2,816', note: 'Hari Ini' },
  { label: 'Karyawan Absen', value: '248', note: 'Hari Ini' },
  { label: 'Karyawan Terlambat', value: '43', note: 'Sejak 08:00' },
  { label: 'Karyawan Cuti', value: '56', note: 'Saat Ini' },
  { label: 'Lembur Hari Ini', value: '78', note: 'Total permintaan' },
  { label: 'Menunggu Persetujuan Cuti', value: '12', note: 'Perlu tindakan' },
  { label: 'Tingkat Kehadiran', value: '97.2%', note: '30 hari terakhir' },
];

export const workforceQuickActions: WorkforceQuickAction[] = [
  { label: 'Ajukan Cuti', href: '/workforce/leave-management', description: 'Kirim pengajuan cuti baru.' },
  { label: 'Setujui Cuti', href: '/workforce/leave-management', description: 'Tinjau persetujuan yang tertunda.' },
  { label: 'Buat Laporan Kehadiran', href: '/workforce/attendance', description: 'Ekspor data kehadiran hari ini.' },
  { label: 'Jadwalkan Shift', href: '/workforce/shift-management', description: 'Atur template shift karyawan.' },
  { label: 'Setujui Lembur', href: '/workforce/overtime', description: 'Tinjau permintaan lembur.' },
];

export const attendanceTrend = [
  { month: 'Jan', rate: 93 },
  { month: 'Feb', rate: 94 },
  { month: 'Mar', rate: 96 },
  { month: 'Apr', rate: 97 },
  { month: 'Mei', rate: 98 },
  { month: 'Jun', rate: 97 },
];

export const lateArrivalTrend = [
  { month: 'Jan', value: 76 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 54 },
  { month: 'Apr', value: 48 },
  { month: 'Mei', value: 42 },
  { month: 'Jun', value: 43 },
];

export const leaveTrend = [
  { month: 'Jan', value: 114 },
  { month: 'Feb', value: 128 },
  { month: 'Mar', value: 132 },
  { month: 'Apr', value: 126 },
  { month: 'Mei', value: 120 },
  { month: 'Jun', value: 118 },
];

export const overtimeTrend = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 84 },
  { month: 'Apr', value: 82 },
  { month: 'Mei', value: 90 },
  { month: 'Jun', value: 78 },
];

export const departmentAttendance = [
  { name: 'Teknologi', value: 96 },
  { name: 'SDM', value: 98 },
  { name: 'Penjualan', value: 94 },
  { name: 'Produk', value: 95 },
  { name: 'Keuangan', value: 97 },
  { name: 'Layanan Pelanggan', value: 93 },
];

export const attendanceOverview = {
  attendanceRate: '97.2%',
  present: '2,816',
  absent: '248',
  late: '43',
  wfh: '112',
  businessTrip: '18',
  holiday: '4',
};

export const attendanceCalendar: WorkforceCalendarDay[] = [
  { day: 1, weekday: 'Sen', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Sebagian besar karyawan hadir' },
  { day: 2, weekday: 'Sel', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Keterlambatan minim' },
  { day: 3, weekday: 'Rab', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Town hall eksekutif' },
  { day: 4, weekday: 'Kam', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Kehadiran normal' },
  { day: 5, weekday: 'Jum', status: 'WFH', color: 'bg-brand-50/50 text-brand-500', note: 'Hari kerja remote' },
  { day: 6, weekday: 'Sab', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Hari libur perusahaan' },
  { day: 7, weekday: 'Min', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 8, weekday: 'Sen', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Kehadiran tinggi' },
  { day: 9, weekday: 'Sel', status: 'Absen', color: 'bg-rose-50 text-rose-200', note: 'Dimulainya cuti terencana' },
  { day: 10, weekday: 'Rab', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Kehadiran stabil' },
  { day: 11, weekday: 'Kam', status: 'Dinas', color: 'bg-violet-500/10 text-violet-200', note: 'Perjalanan tim penjualan' },
  { day: 12, weekday: 'Jum', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Sesi perencanaan tim' },
  { day: 13, weekday: 'Sab', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 14, weekday: 'Min', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 15, weekday: 'Sen', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Keterlambatan lalu lintas' },
  { day: 16, weekday: 'Sel', status: 'WFH', color: 'bg-brand-50/50 text-brand-500', note: 'Hari remote' },
  { day: 17, weekday: 'Rab', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Kehadiran kuat' },
  { day: 18, weekday: 'Kam', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Operasional lancar' },
  { day: 19, weekday: 'Jum', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Penutupan stasiun' },
  { day: 20, weekday: 'Sab', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 21, weekday: 'Min', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 22, weekday: 'Sen', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Tenaga kerja inti hadir' },
  { day: 23, weekday: 'Sel', status: 'Dinas', color: 'bg-violet-500/10 text-violet-200', note: 'Perjalanan tim regional' },
  { day: 24, weekday: 'Rab', status: 'Absen', color: 'bg-rose-50 text-rose-200', note: 'Pemeliharaan kantor' },
  { day: 25, weekday: 'Kam', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Operasional lancar' },
  { day: 26, weekday: 'Jum', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Pergantian shift terlambat' },
  { day: 27, weekday: 'Sab', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 28, weekday: 'Min', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 29, weekday: 'Sen', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Hari perencanaan' },
  { day: 30, weekday: 'Sel', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Kehadiran reguler' },
];

export const leaveTypes = [
  'Cuti Tahunan',
  'Cuti Sakit',
  'Cuti Menikah',
  'Cuti Melahirkan',
  'Cuti Istri Melahirkan',
  'Cuti Khusus',
  'Cuti di Luar Tanggungan',
];

export const leaveOverview = {
  requests: 84,
  pending: 12,
  approved: 64,
  rejected: 8,
  balance: '14 hari',
};

export const leaveCalendar: WorkforceCalendarDay[] = [
  { day: 1, weekday: 'Sen', status: 'Disetujui', color: 'bg-emerald-50 text-emerald-200', note: 'Cuti tahunan' },
  { day: 2, weekday: 'Sel', status: 'Menunggu', color: 'bg-amber-50 text-amber-200', note: 'Review pengajuan' },
  { day: 3, weekday: 'Rab', status: 'Sakit', color: 'bg-rose-50 text-rose-200', note: 'Cuti sakit' },
  { day: 4, weekday: 'Kam', status: 'Disetujui', color: 'bg-emerald-50 text-emerald-200', note: 'Cuti menikah' },
  { day: 5, weekday: 'Jum', status: 'Disetujui', color: 'bg-emerald-50 text-emerald-200', note: 'Cuti tahunan' },
  { day: 6, weekday: 'Sab', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
  { day: 7, weekday: 'Min', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Akhir pekan' },
];

export const workforceDepartmentOptions = [
  'SDM',
  'Teknologi',
  'Penjualan',
  'Produk',
  'Keuangan',
  'Layanan Pelanggan',
  'Hukum',
];

export const shiftOverview = [
  { label: 'Shift Pagi', value: '112 karyawan' },
  { label: 'Shift Sore', value: '86 karyawan' },
  { label: 'Shift Malam', value: '42 karyawan' },
  { label: 'Shift Akhir Pekan', value: '28 karyawan' },
];

export const overtimeOverview = [
  { label: 'Total Lembur', value: '78 jam' },
  { label: 'Menunggu Persetujuan', value: '18 permintaan' },
  { label: 'Disetujui', value: '52 permintaan' },
  { label: 'Ditolak', value: '8 permintaan' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', employee: 'Maya Sari', department: 'SDM', shift: 'Shift Pagi', checkIn: '08:52', checkOut: '17:28', jam: '8h 36m', late: 'No', status: 'Hadir', date: '2026-06-18' },
  { id: 'a2', employee: 'Leo Wibowo', department: 'Teknologi', shift: 'Shift Pagi', checkIn: '09:04', checkOut: '18:05', jam: '8h 1m', late: 'Yes', status: 'Hadir', date: '2026-06-18' },
  { id: 'a3', employee: 'Aulia Rizky', department: 'Penjualan', shift: 'Shift Sore', checkIn: '13:02', checkOut: '21:10', jam: '8h 8m', late: 'No', status: 'Hadir', date: '2026-06-18' },
  { id: 'a4', employee: 'Zara Nurhidayah', department: 'Produk', shift: 'Shift Pagi', checkIn: '-', checkOut: '-', jam: '-', late: 'No', status: 'Cuti', date: '2026-06-18' },
  { id: 'a5', employee: 'Noor Fadhila', department: 'SDM', shift: 'Shift Pagi', checkIn: '08:45', checkOut: '17:30', jam: '8h 45m', late: 'No', status: 'Hadir', date: '2026-06-18' },
  { id: 'a6', employee: 'Lia Pratiwi', department: 'Layanan Pelanggan', shift: 'Shift Sore', checkIn: '13:15', checkOut: '21:22', jam: '8h 7m', late: 'Yes', status: 'Hadir', date: '2026-06-18' },
  { id: 'a7', employee: 'Caleb Santoso', department: 'Keuangan', shift: 'Shift Pagi', checkIn: '08:58', checkOut: '17:18', jam: '8h 20m', late: 'No', status: 'Hadir', date: '2026-06-18' },
  { id: 'a8', employee: 'Juni Rahmawati', department: 'Hukum', shift: 'Shift Pagi', checkIn: '08:50', checkOut: '17:40', jam: '8h 50m', late: 'No', status: 'Hadir', date: '2026-06-18' },
  { id: 'a9', employee: 'Emily Putri', department: 'Teknologi', shift: 'Shift Malam', checkIn: '22:05', checkOut: '06:02', jam: '7h 57m', late: 'Yes', status: 'Hadir', date: '2026-06-18' },
  { id: 'a10', employee: 'Sophia Septiani', department: 'Produk', shift: 'Remote', checkIn: '09:00', checkOut: '17:00', jam: '8h 00m', late: 'No', status: 'WFH', date: '2026-06-18' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', employee: 'Zara Nurhidayah', leaveType: 'Cuti Tahunan', startDate: '2026-07-05', endDate: '2026-07-09', duration: '5 hari', status: 'Menunggu', approver: 'Maya Sari' },
  { id: 'l2', employee: 'Emily Putri', leaveType: 'Cuti Sakit', startDate: '2026-06-21', endDate: '2026-06-23', duration: '3 hari', status: 'Disetujui', approver: 'Leo Wibowo' },
  { id: 'l3', employee: 'Lia Pratiwi', leaveType: 'Cuti Menikah', startDate: '2026-08-02', endDate: '2026-08-06', duration: '5 hari', status: 'Menunggu', approver: 'Noor Fadhila' },
  { id: 'l4', employee: 'Aulia Rizky', leaveType: 'Cuti Tahunan', startDate: '2026-07-12', endDate: '2026-07-16', duration: '5 hari', status: 'Disetujui', approver: 'Noor Fadhila' },
  { id: 'l5', employee: 'Caleb Santoso', leaveType: 'Cuti Sakit', startDate: '2026-06-17', endDate: '2026-06-18', duration: '2 hari', status: 'Ditolak', approver: 'Aulia Rizky' },
  { id: 'l6', employee: 'Juni Rahmawati', leaveType: 'Cuti di Luar Tanggungan', startDate: '2026-06-29', endDate: '2026-07-01', duration: '3 hari', status: 'Menunggu', approver: 'Maya Sari' },
  { id: 'l7', employee: 'Sophia Septiani', leaveType: 'Cuti Khusus', startDate: '2026-09-14', endDate: '2026-09-16', duration: '3 hari', status: 'Disetujui', approver: 'Zara Nurhidayah' },
];

export const shiftSchedules: ShiftSchedule[] = [
  { id: 's1', shiftName: 'Shift Pagi', karyawan: 112, workingHours: '08:00 - 16:00', manager: 'Noor Fadhila', status: 'Aktif' },
  { id: 's2', shiftName: 'Shift Sore', karyawan: 86, workingHours: '12:00 - 20:00', manager: 'Lia Pratiwi', status: 'Aktif' },
  { id: 's3', shiftName: 'Shift Malam', karyawan: 42, workingHours: '22:00 - 06:00', manager: 'Emily Putri', status: 'Aktif' },
  { id: 's4', shiftName: 'Shift Akhir Pekan', karyawan: 28, workingHours: '09:00 - 17:00', manager: 'Aulia Rizky', status: 'Direncanakan' },
];

export const overtimeRequests: OvertimeRequest[] = [
  { id: 'o1', employee: 'Leo Wibowo', department: 'Teknologi', date: '2026-06-18', jam: '3.5', reason: 'Dukungan rilis', status: 'Menunggu' },
  { id: 'o2', employee: 'Caleb Santoso', department: 'Keuangan', date: '2026-06-17', jam: '2.0', reason: 'Tutup buku akhir bulan', status: 'Disetujui' },
  { id: 'o3', employee: 'Lia Pratiwi', department: 'Layanan Pelanggan', date: '2026-06-18', jam: '1.5', reason: 'Onboarding klien', status: 'Menunggu' },
  { id: 'o4', employee: 'Maya Sari', department: 'SDM', date: '2026-06-16', jam: '2.5', reason: 'Persiapan acara', status: 'Disetujui' },
  { id: 'o5', employee: 'Juni Rahmawati', department: 'Hukum', date: '2026-06-15', jam: '3.0', reason: 'Review kontrak', status: 'Ditolak' },
  { id: 'o6', employee: 'Sophia Septiani', department: 'Produk', date: '2026-06-18', jam: '2.0', reason: 'Persiapan peluncuran', status: 'Menunggu' },
];
