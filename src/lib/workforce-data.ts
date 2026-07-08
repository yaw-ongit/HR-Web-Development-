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
  hours: string;
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
  employees: number;
  workingHours: string;
  manager: string;
  status: string;
};

export type OvertimeRequest = {
  id: string;
  employee: string;
  department: string;
  date: string;
  hours: string;
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
  { label: 'Employees Present', value: '2,816', note: 'Today' },
  { label: 'Employees Absent', value: '248', note: 'Today' },
  { label: 'Employees Late', value: '43', note: 'Since 8:00 AM' },
  { label: 'Employees On Leave', value: '56', note: 'Current' },
  { label: 'Overtime Today', value: '78', note: 'Total requests' },
  { label: 'Pending Leave Requests', value: '12', note: 'Action required' },
  { label: 'Attendance Rate', value: '97.2%', note: 'Rolling 30 days' },
];

export const workforceQuickActions: WorkforceQuickAction[] = [
  { label: 'Request Leave', href: '/workforce/leave-management', description: 'Submit a new leave request.' },
  { label: 'Approve Leave', href: '/workforce/leave-management', description: 'Review pending approvals.' },
  { label: 'Generate Attendance Report', href: '/workforce/attendance', description: 'Export today’s attendance data.' },
  { label: 'Assign Shift', href: '/workforce/shift-management', description: 'Map people to shift templates.' },
  { label: 'Approve Overtime', href: '/workforce/overtime', description: 'Review overtime requests.' },
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
  { name: 'Engineering', value: 96 },
  { name: 'People Ops', value: 98 },
  { name: 'Sales', value: 94 },
  { name: 'Product', value: 95 },
  { name: 'Finance', value: 97 },
  { name: 'Customer Success', value: 93 },
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
  { day: 1, weekday: 'Mo', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Most employees on site' },
  { day: 2, weekday: 'Tu', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Minimal late arrivals' },
  { day: 3, weekday: 'We', status: 'Late', color: 'bg-amber-50 text-amber-200', note: 'Executive town hall' },
  { day: 4, weekday: 'Th', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Normal attendance' },
  { day: 5, weekday: 'Fr', status: 'WFH', color: 'bg-brand-50/50 text-brand-500', note: 'Remote work day' },
  { day: 6, weekday: 'Sa', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Company holiday' },
  { day: 7, weekday: 'Su', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 8, weekday: 'Mo', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'High attendance' },
  { day: 9, weekday: 'Tu', status: 'Absent', color: 'bg-rose-50 text-rose-200', note: 'Planned leave starts' },
  { day: 10, weekday: 'We', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Steady attendance' },
  { day: 11, weekday: 'Th', status: 'Business Trip', color: 'bg-violet-500/10 text-violet-200', note: 'Sales team travel' },
  { day: 12, weekday: 'Fr', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Team planning session' },
  { day: 13, weekday: 'Sa', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 14, weekday: 'Su', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 15, weekday: 'Mo', status: 'Late', color: 'bg-amber-50 text-amber-200', note: 'Traffic delay' },
  { day: 16, weekday: 'Tu', status: 'WFH', color: 'bg-brand-50/50 text-brand-500', note: 'Remote day' },
  { day: 17, weekday: 'We', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Strong attendance' },
  { day: 18, weekday: 'Th', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Operational cadence' },
  { day: 19, weekday: 'Fr', status: 'Late', color: 'bg-amber-50 text-amber-200', note: 'Station closure' },
  { day: 20, weekday: 'Sa', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 21, weekday: 'Su', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 22, weekday: 'Mo', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Core workforce present' },
  { day: 23, weekday: 'Tu', status: 'Business Trip', color: 'bg-violet-500/10 text-violet-200', note: 'Regional team travel' },
  { day: 24, weekday: 'We', status: 'Absent', color: 'bg-rose-50 text-rose-200', note: 'Office maintenance' },
  { day: 25, weekday: 'Th', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Strong operations' },
  { day: 26, weekday: 'Fr', status: 'Late', color: 'bg-amber-50 text-amber-200', note: 'Late shift handoff' },
  { day: 27, weekday: 'Sa', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 28, weekday: 'Su', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 29, weekday: 'Mo', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Planning day' },
  { day: 30, weekday: 'Tu', status: 'Present', color: 'bg-emerald-50 text-emerald-200', note: 'Regular attendance' },
];

export const leaveTypes = [
  'Annual Leave',
  'Sick Leave',
  'Marriage Leave',
  'Maternity Leave',
  'Paternity Leave',
  'Special Leave',
  'Unpaid Leave',
];

export const leaveOverview = {
  requests: 84,
  pending: 12,
  approved: 64,
  rejected: 8,
  balance: '14 days',
};

export const leaveCalendar: WorkforceCalendarDay[] = [
  { day: 1, weekday: 'Mo', status: 'Approved', color: 'bg-emerald-50 text-emerald-200', note: 'Annual leave' },
  { day: 2, weekday: 'Tu', status: 'Pending', color: 'bg-amber-50 text-amber-200', note: 'Request review' },
  { day: 3, weekday: 'We', status: 'Sick', color: 'bg-rose-50 text-rose-200', note: 'Sick leave' },
  { day: 4, weekday: 'Th', status: 'Approved', color: 'bg-emerald-50 text-emerald-200', note: 'Marriage leave' },
  { day: 5, weekday: 'Fr', status: 'Approved', color: 'bg-emerald-50 text-emerald-200', note: 'Annual leave' },
  { day: 6, weekday: 'Sa', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
  { day: 7, weekday: 'Su', status: 'Holiday', color: 'bg-slate-600/10 text-slate-800', note: 'Weekend' },
];

export const workforceDepartmentOptions = [
  'People Ops',
  'Engineering',
  'Sales',
  'Product',
  'Finance',
  'Customer Success',
  'Legal',
];

export const shiftOverview = [
  { label: 'Morning Shift', value: '112 employees' },
  { label: 'Afternoon Shift', value: '86 employees' },
  { label: 'Night Shift', value: '42 employees' },
  { label: 'Weekend Shift', value: '28 employees' },
];

export const overtimeOverview = [
  { label: 'Total Overtime', value: '78 hrs' },
  { label: 'Pending Approval', value: '18 requests' },
  { label: 'Approved', value: '52 requests' },
  { label: 'Rejected', value: '8 requests' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', employee: 'Maya Thompson', department: 'People Ops', shift: 'Morning shift', checkIn: '08:52', checkOut: '17:28', hours: '8h 36m', late: 'No', status: 'Present', date: '2026-06-18' },
  { id: 'a2', employee: 'Leo Hunter', department: 'Engineering', shift: 'Morning shift', checkIn: '09:04', checkOut: '18:05', hours: '8h 1m', late: 'Yes', status: 'Present', date: '2026-06-18' },
  { id: 'a3', employee: 'Avery Patel', department: 'Sales', shift: 'Afternoon shift', checkIn: '13:02', checkOut: '21:10', hours: '8h 8m', late: 'No', status: 'Present', date: '2026-06-18' },
  { id: 'a4', employee: 'Zoe Kim', department: 'Product', shift: 'Morning shift', checkIn: '-', checkOut: '-', hours: '-', late: 'No', status: 'On Leave', date: '2026-06-18' },
  { id: 'a5', employee: 'Noah Brooks', department: 'People Ops', shift: 'Morning shift', checkIn: '08:45', checkOut: '17:30', hours: '8h 45m', late: 'No', status: 'Present', date: '2026-06-18' },
  { id: 'a6', employee: 'Lia Chang', department: 'Customer Success', shift: 'Afternoon shift', checkIn: '13:15', checkOut: '21:22', hours: '8h 7m', late: 'Yes', status: 'Present', date: '2026-06-18' },
  { id: 'a7', employee: 'Caleb Ortega', department: 'Finance', shift: 'Morning shift', checkIn: '08:58', checkOut: '17:18', hours: '8h 20m', late: 'No', status: 'Present', date: '2026-06-18' },
  { id: 'a8', employee: 'June Martinez', department: 'Legal', shift: 'Morning shift', checkIn: '08:50', checkOut: '17:40', hours: '8h 50m', late: 'No', status: 'Present', date: '2026-06-18' },
  { id: 'a9', employee: 'Emily Wong', department: 'Engineering', shift: 'Night shift', checkIn: '22:05', checkOut: '06:02', hours: '7h 57m', late: 'Yes', status: 'Present', date: '2026-06-18' },
  { id: 'a10', employee: 'Sophia Murphy', department: 'Product', shift: 'Remote', checkIn: '09:00', checkOut: '17:00', hours: '8h 00m', late: 'No', status: 'WFH', date: '2026-06-18' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', employee: 'Zoe Kim', leaveType: 'Annual Leave', startDate: '2026-07-05', endDate: '2026-07-09', duration: '5 days', status: 'Pending', approver: 'Maya Thompson' },
  { id: 'l2', employee: 'Emily Wong', leaveType: 'Sick Leave', startDate: '2026-06-21', endDate: '2026-06-23', duration: '3 days', status: 'Approved', approver: 'Leo Hunter' },
  { id: 'l3', employee: 'Lia Chang', leaveType: 'Marriage Leave', startDate: '2026-08-02', endDate: '2026-08-06', duration: '5 days', status: 'Pending', approver: 'Noah Brooks' },
  { id: 'l4', employee: 'Avery Patel', leaveType: 'Annual Leave', startDate: '2026-07-12', endDate: '2026-07-16', duration: '5 days', status: 'Approved', approver: 'Noah Brooks' },
  { id: 'l5', employee: 'Caleb Ortega', leaveType: 'Sick Leave', startDate: '2026-06-17', endDate: '2026-06-18', duration: '2 days', status: 'Rejected', approver: 'Avery Patel' },
  { id: 'l6', employee: 'June Martinez', leaveType: 'Unpaid Leave', startDate: '2026-06-29', endDate: '2026-07-01', duration: '3 days', status: 'Pending', approver: 'Maya Thompson' },
  { id: 'l7', employee: 'Sophia Murphy', leaveType: 'Special Leave', startDate: '2026-09-14', endDate: '2026-09-16', duration: '3 days', status: 'Approved', approver: 'Zoe Kim' },
];

export const shiftSchedules: ShiftSchedule[] = [
  { id: 's1', shiftName: 'Morning shift', employees: 112, workingHours: '08:00 - 16:00', manager: 'Noah Brooks', status: 'Active' },
  { id: 's2', shiftName: 'Afternoon shift', employees: 86, workingHours: '12:00 - 20:00', manager: 'Lia Chang', status: 'Active' },
  { id: 's3', shiftName: 'Night shift', employees: 42, workingHours: '22:00 - 06:00', manager: 'Emily Wong', status: 'Active' },
  { id: 's4', shiftName: 'Weekend shift', employees: 28, workingHours: '09:00 - 17:00', manager: 'Avery Patel', status: 'Planned' },
];

export const overtimeRequests: OvertimeRequest[] = [
  { id: 'o1', employee: 'Leo Hunter', department: 'Engineering', date: '2026-06-18', hours: '3.5', reason: 'Release support', status: 'Pending' },
  { id: 'o2', employee: 'Caleb Ortega', department: 'Finance', date: '2026-06-17', hours: '2.0', reason: 'Month-end close', status: 'Approved' },
  { id: 'o3', employee: 'Lia Chang', department: 'Customer Success', date: '2026-06-18', hours: '1.5', reason: 'Client onboarding', status: 'Pending' },
  { id: 'o4', employee: 'Maya Thompson', department: 'People Ops', date: '2026-06-16', hours: '2.5', reason: 'Event prep', status: 'Approved' },
  { id: 'o5', employee: 'June Martinez', department: 'Legal', date: '2026-06-15', hours: '3.0', reason: 'Contract review', status: 'Rejected' },
  { id: 'o6', employee: 'Sophia Murphy', department: 'Product', date: '2026-06-18', hours: '2.0', reason: 'Launch readiness', status: 'Pending' },
];
