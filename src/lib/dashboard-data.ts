export type RoleKey = 'employee' | 'supervisor' | 'hr-officer' | 'hr-manager' | 'director' | 'administrator';

export const roles = [
  { key: 'employee', label: 'Employee' },
  { key: 'supervisor', label: 'Supervisor' },
  { key: 'hr-officer', label: 'HR Officer' },
  { key: 'hr-manager', label: 'HR Manager' },
  { key: 'director', label: 'Director' },
  { key: 'administrator', label: 'Administrator' },
] as const;

export const roleQuickActions = {
  employee: [
    { label: 'Request Leave', hint: 'Submit a leave request', icon: 'CalendarCheck' },
    { label: 'Download Document', hint: 'Open payslip or contract', icon: 'FileText' },
    { label: 'View Attendance', hint: 'Inspect today’s status', icon: 'Clock' },
  ],
  supervisor: [
    { label: 'Approve Leave', hint: 'Review pending requests', icon: 'CheckCircle' },
    { label: 'View Team', hint: 'Open team dashboard', icon: 'Users' },
    { label: 'Team Report', hint: 'Generate staffing summary', icon: 'BarChart3' },
  ],
  'hr-officer': [
    { label: 'Add Employee', hint: 'Onboard new talent', icon: 'UserPlus' },
    { label: 'Generate Report', hint: 'Create workforce report', icon: 'FileChart' },
    { label: 'Create Training', hint: 'Schedule development', icon: 'BookOpen' },
    { label: 'Create Vacancy', hint: 'Open new role', icon: 'Briefcase' },
  ],
  'hr-manager': [
    { label: 'Review Analytics', hint: 'Inspect workforce KPIs', icon: 'TrendingUp' },
    { label: 'Approve Budget', hint: 'Authorize departmental spend', icon: 'Wallet' },
    { label: 'Set Goals', hint: 'Publish annual priorities', icon: 'Flag' },
  ],
  director: [
    { label: 'View Org Health', hint: 'Executive workforce snapshot', icon: 'ShieldCheck' },
    { label: 'Review Growth', hint: 'Track organizational growth', icon: 'ArrowUpRight' },
    { label: 'Open Forecast', hint: 'Inspect hiring forecast', icon: 'Sparkles' },
  ],
  administrator: [
    { label: 'Review Security', hint: 'Inspect system alerts', icon: 'ShieldAlert' },
    { label: 'Audit Logs', hint: 'View recent activity', icon: 'ClipboardList' },
    { label: 'Manage Roles', hint: 'Adjust access controls', icon: 'Key' },
  ],
};

export const roleWidgets = {
  employee: [
    { title: 'Attendance Calendar', type: 'calendar' },
    { title: 'Leave Balance', type: 'balance' },
    { title: 'Upcoming Events', type: 'events' },
    { title: 'Training Schedule', type: 'training' },
    { title: 'Recent Activities', type: 'activity' },
    { title: 'Company Announcements', type: 'announcements' },
  ],
  supervisor: [
    { title: 'Approval Center', type: 'approvals' },
    { title: 'Attendance Overview', type: 'attendance' },
    { title: 'Team Calendar', type: 'calendar' },
    { title: 'Training Progress', type: 'training' },
    { title: 'Recent Team Activity', type: 'activity' },
  ],
  'hr-officer': [
    { title: 'Recent Recruitment', type: 'recruitment' },
    { title: 'Pending Approval', type: 'approvals' },
    { title: 'Employee Birthdays', type: 'birthdays' },
    { title: 'Announcements', type: 'announcements' },
    { title: 'Recent Activities', type: 'activity' },
  ],
  'hr-manager': [
    { title: 'Workforce Analytics', type: 'workforce' },
    { title: 'Department Comparison', type: 'comparison' },
    { title: 'Absenteeism', type: 'attendance' },
    { title: 'Recruitment Funnel', type: 'recruitment' },
    { title: 'Compliance Overview', type: 'compliance' },
  ],
  director: [
    { title: 'Executive Workforce Dashboard', type: 'workforce' },
    { title: 'Hiring Trend', type: 'trend' },
    { title: 'Department Growth', type: 'comparison' },
    { title: 'Organization Distribution', type: 'distribution' },
  ],
  administrator: [
    { title: 'System Status', type: 'status' },
    { title: 'Server Health', type: 'server' },
    { title: 'Audit Logs', type: 'logs' },
    { title: 'Security Alerts', type: 'alerts' },
  ],
};

export const dashboardKpis = {
  employee: [
    { label: 'Attendance Today', value: 'Present', trend: 'On time', icon: 'Clock', valueColor: 'text-emerald-300' },
    { label: 'Remaining Leave', value: '12 days', trend: '3 days this month', icon: 'Leaf', valueColor: 'text-cyan-300' },
    { label: 'Upcoming Training', value: '1 session', trend: 'Starts in 4 days', icon: 'BookOpen', valueColor: 'text-sky-300' },
    { label: 'Benefits Summary', value: 'Active', trend: 'Health, retirement', icon: 'ShieldCheck', valueColor: 'text-violet-300' },
  ],
  supervisor: [
    { label: 'Team Attendance', value: '98%', trend: '+2% vs yesterday', icon: 'Users', valueColor: 'text-emerald-200' },
    { label: 'Pending Leave', value: '6 requests', trend: '2 urgent', icon: 'CalendarCheck', valueColor: 'text-amber-200' },
    { label: 'Late Employees', value: '3', trend: 'Improved', icon: 'Clock', valueColor: 'text-sky-200' },
    { label: 'Contracts Expiring', value: '5', trend: 'Next 30 days', icon: 'FileText', valueColor: 'text-rose-200' },
  ],
  'hr-officer': [
    { label: 'Headcount', value: '3,412', trend: '+24 this week', icon: 'Users', valueColor: 'text-emerald-200' },
    { label: 'New Employees', value: '16', trend: 'Onboarding underway', icon: 'UserPlus', valueColor: 'text-sky-200' },
    { label: 'Employees on Leave', value: '48', trend: 'Stable', icon: 'Bed', valueColor: 'text-amber-200' },
    { label: 'Medical Due', value: '7', trend: 'Next 14 days', icon: 'HeartPulse', valueColor: 'text-rose-200' },
  ],
  'hr-manager': [
    { label: 'Headcount', value: '3,412', trend: '+6% quarter', icon: 'Users', valueColor: 'text-emerald-200' },
    { label: 'Turnover', value: '8.2%', trend: 'Below target', icon: 'ArrowDownRight', valueColor: 'text-slate-200' },
    { label: 'Retention Rate', value: '92.3%', trend: 'Top quartile', icon: 'ShieldCheck', valueColor: 'text-cyan-200' },
    { label: 'Average Tenure', value: '4.7 yrs', trend: 'Up 0.3 yrs', icon: 'Hourglass', valueColor: 'text-violet-200' },
  ],
  director: [
    { label: 'Total Employees', value: '3,412', trend: 'Headcount growth', icon: 'Users', valueColor: 'text-emerald-200' },
    { label: 'Growth', value: '+7.4%', trend: 'Quarter over quarter', icon: 'TrendingUp', valueColor: 'text-cyan-200' },
    { label: 'Turnover', value: '8.2%', trend: 'Below benchmark', icon: 'ArrowDownRight', valueColor: 'text-slate-200' },
    { label: 'Budget Overview', value: '$124M', trend: 'On track', icon: 'Wallet', valueColor: 'text-amber-200' },
  ],
  administrator: [
    { label: 'System Status', value: 'Operational', trend: 'All services online', icon: 'Server', valueColor: 'text-emerald-200' },
    { label: 'Users', value: '4,947', trend: 'Active sessions 128', icon: 'UserCheck', valueColor: 'text-sky-200' },
    { label: 'Roles', value: '12 groups', trend: 'No pending changes', icon: 'Key', valueColor: 'text-violet-200' },
    { label: 'Security Alerts', value: '2', trend: 'Critical review', icon: 'ShieldAlert', valueColor: 'text-rose-200' },
  ],
};

export const announcements = [
  { title: 'Global HR town hall at 10:00 AM', subtitle: 'Join the live webcast for strategic updates.', status: 'info' },
  { title: 'Open enrollment deadline', subtitle: 'Enroll in benefits before Friday at 11:59 PM.', status: 'warning' },
  { title: 'New hybrid work policy published', subtitle: 'Review updated hours and meeting norms.', status: 'success' },
];

export const employeeMetrics = {
  attendance: [
    { label: 'Mon', value: 1 },
    { label: 'Tue', value: 1 },
    { label: 'Wed', value: 1 },
    { label: 'Thu', value: 1 },
    { label: 'Fri', value: 1 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 },
  ],
  headcountTrend: [
    { month: 'Jan', value: 3280 },
    { month: 'Feb', value: 3304 },
    { month: 'Mar', value: 3340 },
    { month: 'Apr', value: 3380 },
    { month: 'May', value: 3420 },
    { month: 'Jun', value: 3412 },
  ],
  leaveTrend: [
    { month: 'Jan', value: 128 },
    { month: 'Feb', value: 136 },
    { month: 'Mar', value: 142 },
    { month: 'Apr', value: 138 },
    { month: 'May', value: 132 },
    { month: 'Jun', value: 127 },
  ],
  trainingCompletion: [
    { name: 'Leadership', value: 82 },
    { name: 'Compliance', value: 91 },
    { name: 'Wellness', value: 75 },
    { name: 'Skills', value: 68 },
  ],
  departments: [
    { name: 'Engineering', value: 28 },
    { name: 'People Ops', value: 18 },
    { name: 'Sales', value: 24 },
    { name: 'Marketing', value: 14 },
    { name: 'Finance', value: 16 },
  ],
};

export const recentActivity = [
  { actor: 'Maya Thompson', role: 'HR Officer', action: 'Approved a leave request for Leo Hunter', time: '12m ago', status: 'success' },
  { actor: 'Avery Patel', role: 'Supervisor', action: 'Assigned training to the product team', time: '28m ago', status: 'info' },
  { actor: 'Riley Chen', role: 'Administrator', action: 'Updated role permissions for the security group', time: '1h ago', status: 'warning' },
  { actor: 'Noah Brooks', role: 'Employee', action: 'Submitted expense request for business travel', time: '2h ago', status: 'neutral' },
];

export const systemStatus = [
  { label: 'API latency', value: '72 ms', status: 'good' },
  { label: 'Database', value: 'Read/write healthy', status: 'good' },
  { label: 'Auth service', value: '2 min refresh', status: 'good' },
  { label: 'Backup sync', value: 'Completed', status: 'good' },
];

export const roleNotifications = [
  { title: 'Leave approval needed', description: 'Review Maya’s leave request.', type: 'urgent' },
  { title: 'Policy update available', description: 'Read the new hybrid work guide.', type: 'info' },
  { title: 'Training session starting soon', description: 'Leadership workshop begins in 3 days.', type: 'success' },
];
