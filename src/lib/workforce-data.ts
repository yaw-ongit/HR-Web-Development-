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
  { label: 'Ajukan Cuti', href: '/workforce/leave-management', description: 'Submit a new leave request.' },
  { label: 'Setujui Cuti', href: '/workforce/leave-management', description: 'Review pending approvals.' },
  { label: 'Buat Laporan Kehadiran', href: '/workforce/attendance', description: 'Export today’s attendance data.' },
  { label: 'Jadwalkan Shift', href: '/workforce/shift-management', description: 'Map people to shift templates.' },
  { label: 'Setujui Lembur', href: '/workforce/overtime', description: 'Review overtime permintaan.' },
];

export const attendanceTrend = [
  { month: 'Jan', rate: 93 },
  { month: 'Feb', rate: 94 },
  { month: 'Mar', rate: 96 },
  { month: 'Apr', rate: 97 },
  { month: 'May', rate: 98 },
  { month: 'Jun', rate: 97 },
];

export const lateArrivalTrend = [
  { month: 'Jan', value: 76 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 54 },
  { month: 'Apr', value: 48 },
  { month: 'May', value: 42 },
  { month: 'Jun', value: 43 },
];

export const leaveTrend = [
  { month: 'Jan', value: 114 },
  { month: 'Feb', value: 128 },
  { month: 'Mar', value: 132 },
  { month: 'Apr', value: 126 },
  { month: 'May', value: 120 },
  { month: 'Jun', value: 118 },
];

export const overtimeTrend = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 84 },
  { month: 'Apr', value: 82 },
  { month: 'May', value: 90 },
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
  { day: 1, weekday: 'Mo', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Most karyawan on site' },
  { day: 2, weekday: 'Tu', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Minimal late arrivals' },
  { day: 3, weekday: 'We', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Executive town hall' },
  { day: 4, weekday: 'Th', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Normal attendance' },
  { day: 5, weekday: 'Fr', status: 'WFH', color: 'bg-brand-50/50 text-brand-500', note: 'Remote work day' },
  { day: 6, weekday: 'Sa', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Company holiday' },
  { day: 7, weekday: 'Su', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 8, weekday: 'Mo', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'High attendance' },
  { day: 9, weekday: 'Tu', status: 'Absen', color: 'bg-rose-50 text-rose-200', note: 'Planned leave starts' },
  { day: 10, weekday: 'We', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Steady attendance' },
  { day: 11, weekday: 'Th', status: 'Dinas', color: 'bg-violet-500/10 text-violet-200', note: 'Sales team travel' },
  { day: 12, weekday: 'Fr', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Team planning session' },
  { day: 13, weekday: 'Sa', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 14, weekday: 'Su', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 15, weekday: 'Mo', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Traffic delay' },
  { day: 16, weekday: 'Tu', status: 'WFH', color: 'bg-brand-50/50 text-brand-500', note: 'Remote day' },
  { day: 17, weekday: 'We', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Strong attendance' },
  { day: 18, weekday: 'Th', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Operational cadence' },
  { day: 19, weekday: 'Fr', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Station closure' },
  { day: 20, weekday: 'Sa', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 21, weekday: 'Su', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 22, weekday: 'Mo', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Core workforce present' },
  { day: 23, weekday: 'Tu', status: 'Dinas', color: 'bg-violet-500/10 text-violet-200', note: 'Regional team travel' },
  { day: 24, weekday: 'We', status: 'Absen', color: 'bg-rose-50 text-rose-200', note: 'Office maintenance' },
  { day: 25, weekday: 'Th', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Strong operations' },
  { day: 26, weekday: 'Fr', status: 'Terlambat', color: 'bg-amber-50 text-amber-200', note: 'Late shift handoff' },
  { day: 27, weekday: 'Sa', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 28, weekday: 'Su', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 29, weekday: 'Mo', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Planning day' },
  { day: 30, weekday: 'Tu', status: 'Hadir', color: 'bg-emerald-50 text-emerald-200', note: 'Regular attendance' },
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
  balance: '14 days',
};

export const leaveCalendar: WorkforceCalendarDay[] = [
  { day: 1, weekday: 'Mo', status: 'Disetujui', color: 'bg-emerald-50 text-emerald-200', note: 'Annual leave' },
  { day: 2, weekday: 'Tu', status: 'Menunggu', color: 'bg-amber-50 text-amber-200', note: 'Request review' },
  { day: 3, weekday: 'We', status: 'Sick', color: 'bg-rose-50 text-rose-200', note: 'Sick leave' },
  { day: 4, weekday: 'Th', status: 'Disetujui', color: 'bg-emerald-50 text-emerald-200', note: 'Marriage leave' },
  { day: 5, weekday: 'Fr', status: 'Disetujui', color: 'bg-emerald-50 text-emerald-200', note: 'Annual leave' },
  { day: 6, weekday: 'Sa', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 7, weekday: 'Su', status: 'Libur', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
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
  { label: 'Total Lembur', value: '78 hrs' },
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
  { id: 'l1', employee: 'Zara Nurhidayah', leaveType: 'Cuti Tahunan', startDate: '2026-07-05', endDate: '2026-07-09', duration: '5 days', status: 'Menunggu', approver: 'Maya Sari' },
  { id: 'l2', employee: 'Emily Putri', leaveType: 'Cuti Sakit', startDate: '2026-06-21', endDate: '2026-06-23', duration: '3 days', status: 'Disetujui', approver: 'Leo Wibowo' },
  { id: 'l3', employee: 'Lia Pratiwi', leaveType: 'Cuti Menikah', startDate: '2026-08-02', endDate: '2026-08-06', duration: '5 days', status: 'Menunggu', approver: 'Noor Fadhila' },
  { id: 'l4', employee: 'Aulia Rizky', leaveType: 'Cuti Tahunan', startDate: '2026-07-12', endDate: '2026-07-16', duration: '5 days', status: 'Disetujui', approver: 'Noor Fadhila' },
  { id: 'l5', employee: 'Caleb Santoso', leaveType: 'Cuti Sakit', startDate: '2026-06-17', endDate: '2026-06-18', duration: '2 days', status: 'Ditolak', approver: 'Aulia Rizky' },
  { id: 'l6', employee: 'Juni Rahmawati', leaveType: 'Cuti di Luar Tanggungan', startDate: '2026-06-29', endDate: '2026-07-01', duration: '3 days', status: 'Menunggu', approver: 'Maya Sari' },
  { id: 'l7', employee: 'Sophia Septiani', leaveType: 'Cuti Khusus', startDate: '2026-09-14', endDate: '2026-09-16', duration: '3 days', status: 'Disetujui', approver: 'Zara Nurhidayah' },
];

export const shiftSchedules: ShiftSchedule[] = [
  { id: 's1', shiftName: 'Shift Pagi', karyawan: 112, workingHours: '08:00 - 16:00', manager: 'Noor Fadhila', status: 'Active' },
  { id: 's2', shiftName: 'Shift Sore', karyawan: 86, workingHours: '12:00 - 20:00', manager: 'Lia Pratiwi', status: 'Active' },
  { id: 's3', shiftName: 'Shift Malam', karyawan: 42, workingHours: '22:00 - 06:00', manager: 'Emily Putri', status: 'Active' },
  { id: 's4', shiftName: 'Shift Akhir Pekan', karyawan: 28, workingHours: '09:00 - 17:00', manager: 'Aulia Rizky', status: 'Planned' },
];

export const overtimeRequests: OvertimeRequest[] = [
  { id: 'o1', employee: 'Leo Wibowo', department: 'Teknologi', date: '2026-06-18', jam: '3.5', reason: 'Release support', status: 'Menunggu' },
  { id: 'o2', employee: 'Caleb Santoso', department: 'Keuangan', date: '2026-06-17', jam: '2.0', reason: 'Month-end close', status: 'Disetujui' },
  { id: 'o3', employee: 'Lia Pratiwi', department: 'Layanan Pelanggan', date: '2026-06-18', jam: '1.5', reason: 'Client onboarding', status: 'Menunggu' },
  { id: 'o4', employee: 'Maya Sari', department: 'SDM', date: '2026-06-16', jam: '2.5', reason: 'Event prep', status: 'Disetujui' },
  { id: 'o5', employee: 'Juni Rahmawati', department: 'Hukum', date: '2026-06-15', jam: '3.0', reason: 'Contract review', status: 'Ditolak' },
  { id: 'o6', employee: 'Sophia Septiani', department: 'Produk', date: '2026-06-18', jam: '2.0', reason: 'Launch readiness', status: 'Menunggu' },
];
