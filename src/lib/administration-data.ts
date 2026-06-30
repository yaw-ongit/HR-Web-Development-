import {
  Activity,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  Database,
  FileClock,
  FileText,
  GitBranch,
  Globe2,
  KeyRound,
  Landmark,
  Layers3,
  Mail,
  MapPin,
  Network,
  Plug,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  Workflow,
} from 'lucide-react';

export type MasterDataRecord = {
  id: string;
  code: string;
  name: string;
  owner: string;
  status: 'Active' | 'Draft' | 'Archived';
  records: number;
  updated: string;
  history: string;
};

export type UserAdminRecord = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  role: string;
  status: 'Active' | 'Disabled' | 'Pending';
  lastLogin: string;
};

export type AuditRecord = {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Warning' | 'Failed';
};

export const adminKpis = [
  { label: 'Total users', value: '1,284', note: 'Across employee and admin accounts' },
  { label: 'Active users', value: '1,197', note: '93.2% enabled this month' },
  { label: 'Disabled users', value: '61', note: 'Mostly exits and suspended access' },
  { label: 'Roles', value: '7', note: 'Enterprise role catalog' },
  { label: 'Permissions', value: '312', note: 'Module-level permission grants' },
  { label: 'Pending approvals', value: '24', note: 'Workflow and matrix changes' },
  { label: 'System alerts', value: '6', note: 'Integration, security and policy alerts' },
  { label: 'Recent changes', value: '48', note: 'Configuration updates in 7 days' },
];

export const adminQuickActions = [
  { label: 'Create user', href: '/administration/user-management', icon: UserCog, description: 'Provision employee or administrator access.' },
  { label: 'Assign role', href: '/administration/role-management', icon: ShieldCheck, description: 'Map users to enterprise security roles.' },
  { label: 'Create department', href: '/administration/master-data', icon: Building2, description: 'Add master organization structures.' },
  { label: 'Create position', href: '/administration/master-data', icon: BriefcaseBusiness, description: 'Maintain position catalog and levels.' },
  { label: 'Create workflow', href: '/administration/workflow-configuration', icon: Workflow, description: 'Build approval routes and escalation rules.' },
  { label: 'View audit log', href: '/administration/audit-logs', icon: FileClock, description: 'Inspect admin and system-level events.' },
];

export const adminSections = [
  { label: 'Dashboard', href: '/administration', icon: Settings },
  { label: 'Master Data', href: '/administration/master-data', icon: Database },
  { label: 'Organization Management', href: '/administration/organization-management', icon: Network },
  { label: 'User Management', href: '/administration/user-management', icon: Users },
  { label: 'Role Management', href: '/administration/role-management', icon: ShieldCheck },
  { label: 'Permission Management', href: '/administration/permission-management', icon: KeyRound },
  { label: 'Workflow Configuration', href: '/administration/workflow-configuration', icon: Workflow },
  { label: 'Approval Matrix', href: '/administration/approval-matrix', icon: CheckCircle2 },
  { label: 'Company Settings', href: '/administration/company-settings', icon: Landmark },
  { label: 'Notification Templates', href: '/administration/notification-templates', icon: Bell },
  { label: 'Audit Logs', href: '/administration/audit-logs', icon: FileClock },
  { label: 'Activity Logs', href: '/administration/activity-logs', icon: Activity },
  { label: 'Integration Settings', href: '/administration/integration-settings', icon: Plug },
  { label: 'System Preferences', href: '/administration/system-preferences', icon: Globe2 },
];

export const masterDataCategories = [
  'Departments',
  'Positions',
  'Job Levels',
  'Employment Types',
  'Branches',
  'Business Units',
  'Project Sites',
  'Locations',
  'Training Categories',
  'Benefit Categories',
  'Leave Types',
  'Medical Types',
  'Insurance Providers',
  'Certificate Types',
  'Document Types',
];

export const masterDataRecords: MasterDataRecord[] = [
  { id: 'departments', code: 'MD-DEPT', name: 'Departments', owner: 'People Operations', status: 'Active', records: 18, updated: '30 Jun 2026', history: '3 updates this week' },
  { id: 'positions', code: 'MD-POS', name: 'Positions', owner: 'HR Business Partner', status: 'Active', records: 86, updated: '29 Jun 2026', history: '12 new positions imported' },
  { id: 'job-levels', code: 'MD-LVL', name: 'Job Levels', owner: 'Compensation', status: 'Active', records: 9, updated: '24 Jun 2026', history: 'Salary grade mapping revised' },
  { id: 'employment-types', code: 'MD-EMP', name: 'Employment Types', owner: 'HR Operations', status: 'Active', records: 6, updated: '21 Jun 2026', history: 'Internship policy archived' },
  { id: 'branches', code: 'MD-BRN', name: 'Branches', owner: 'Corporate Services', status: 'Active', records: 12, updated: '18 Jun 2026', history: 'Balikpapan branch activated' },
  { id: 'business-units', code: 'MD-BU', name: 'Business Units', owner: 'Strategy Office', status: 'Active', records: 7, updated: '17 Jun 2026', history: 'Digital Services renamed' },
  { id: 'project-sites', code: 'MD-SITE', name: 'Project Sites', owner: 'Project Office', status: 'Active', records: 23, updated: '16 Jun 2026', history: 'IKN site added' },
  { id: 'locations', code: 'MD-LOC', name: 'Locations', owner: 'Facilities', status: 'Active', records: 31, updated: '14 Jun 2026', history: 'Geo-fence adjusted' },
  { id: 'training-categories', code: 'MD-TRN', name: 'Training Categories', owner: 'Talent Development', status: 'Active', records: 14, updated: '13 Jun 2026', history: 'Safety category updated' },
  { id: 'benefit-categories', code: 'MD-BEN', name: 'Benefit Categories', owner: 'Rewards', status: 'Active', records: 11, updated: '12 Jun 2026', history: 'Wellness benefit added' },
  { id: 'leave-types', code: 'MD-LVE', name: 'Leave Types', owner: 'Workforce Admin', status: 'Active', records: 15, updated: '11 Jun 2026', history: 'Collective leave rule revised' },
  { id: 'medical-types', code: 'MD-MED', name: 'Medical Types', owner: 'Health & Safety', status: 'Active', records: 10, updated: '10 Jun 2026', history: 'Dental claim type changed' },
  { id: 'insurance-providers', code: 'MD-INS', name: 'Insurance Providers', owner: 'Rewards', status: 'Active', records: 8, updated: '09 Jun 2026', history: 'Provider SLA reviewed' },
  { id: 'certificate-types', code: 'MD-CERT', name: 'Certificate Types', owner: 'Compliance', status: 'Draft', records: 19, updated: '08 Jun 2026', history: 'Mining safety certificate pending' },
  { id: 'document-types', code: 'MD-DOC', name: 'Document Types', owner: 'People Services', status: 'Active', records: 27, updated: '07 Jun 2026', history: 'Digital signature rules updated' },
];

export const organizationNodes = [
  { level: 'Company', name: 'PT Nusantara Teknologi Sejahtera', count: '1,284 employees', status: 'Active' },
  { level: 'Division', name: 'Corporate Services', count: '328 employees', status: 'Expanded' },
  { level: 'Department', name: 'Human Capital Operations', count: '92 employees', status: 'Expanded' },
  { level: 'Section', name: 'HRIS & Payroll Administration', count: '26 employees', status: 'Expanded' },
  { level: 'Team', name: 'System Administration', count: '8 employees', status: 'Expanded' },
  { level: 'Employee', name: 'Dewi Lestari - HRIS Administrator', count: 'EMP-ID-0218', status: 'Selected' },
];

export const adminUsers: UserAdminRecord[] = [
  { id: 'usr-001', avatar: 'DL', name: 'Dewi Lestari', email: 'dewi.lestari@nts.co.id', employeeId: 'EMP-ID-0218', department: 'HRIS & Payroll', role: 'Administrator', status: 'Active', lastLogin: 'Today, 09:42' },
  { id: 'usr-002', avatar: 'AR', name: 'Arif Rahman', email: 'arif.rahman@nts.co.id', employeeId: 'EMP-ID-0184', department: 'People Operations', role: 'HR Manager', status: 'Active', lastLogin: 'Today, 08:17' },
  { id: 'usr-003', avatar: 'SN', name: 'Siti Nurhaliza', email: 'siti.nurhaliza@nts.co.id', employeeId: 'EMP-ID-0331', department: 'Talent Development', role: 'HR Officer', status: 'Active', lastLogin: 'Yesterday, 16:04' },
  { id: 'usr-004', avatar: 'BP', name: 'Bima Pratama', email: 'bima.pratama@nts.co.id', employeeId: 'EMP-ID-0109', department: 'Operations Kalimantan', role: 'Project Manager', status: 'Active', lastLogin: 'Yesterday, 12:45' },
  { id: 'usr-005', avatar: 'MA', name: 'Maya Anindita', email: 'maya.anindita@nts.co.id', employeeId: 'EMP-ID-0442', department: 'Finance', role: 'Director', status: 'Disabled', lastLogin: '19 Jun 2026' },
  { id: 'usr-006', avatar: 'RP', name: 'Raka Putra', email: 'raka.putra@nts.co.id', employeeId: 'EMP-ID-0527', department: 'Engineering', role: 'Supervisor', status: 'Pending', lastLogin: 'Never' },
];

export const roleCatalog = [
  { role: 'Employee', users: 1048, modules: 'Self Service, Workforce, Talent', approvalRights: 'Submit only', visibility: 'Employee workspace' },
  { role: 'Supervisor', users: 142, modules: 'People, Workforce, Talent', approvalRights: 'Level 1 approvals', visibility: 'Team workspace' },
  { role: 'HR Officer', users: 31, modules: 'People, Workforce, Talent, Compensation', approvalRights: 'Operational approvals', visibility: 'HR operations' },
  { role: 'HR Manager', users: 18, modules: 'All HR modules', approvalRights: 'Level 2 approvals', visibility: 'Management workspace' },
  { role: 'Project Manager', users: 25, modules: 'Workforce, Claims, Training', approvalRights: 'Project site approvals', visibility: 'Project workspace' },
  { role: 'Director', users: 12, modules: 'Analytics, Compensation, Approvals', approvalRights: 'Final approval', visibility: 'Executive workspace' },
  { role: 'Administrator', users: 8, modules: 'Administration, Security, Integrations', approvalRights: 'System configuration', visibility: 'Full platform' },
];

export const permissionModules = ['Dashboard', 'People', 'Employee 360', 'Workforce', 'Talent', 'Compensation', 'Analytics', 'Administration', 'Integrations'];
export const permissionActions = ['Create', 'Read', 'Update', 'Delete', 'Approve', 'Export', 'Print'];
export const permissionRoles = ['Employee', 'Supervisor', 'HR Officer', 'HR Manager', 'Project Manager', 'Director', 'Administrator'];

export const workflows = [
  { name: 'Leave Approval', steps: ['Manager', 'HR', 'Director'], sla: '2 business days', status: 'Active' },
  { name: 'Training Approval', steps: ['Supervisor', 'Talent Development', 'HR Manager'], sla: '3 business days', status: 'Active' },
  { name: 'Medical Approval', steps: ['HR Officer', 'Medical Admin', 'Finance'], sla: '4 business days', status: 'Active' },
  { name: 'Claims Approval', steps: ['Manager', 'Finance Reviewer', 'Director'], sla: '5 business days', status: 'Active' },
  { name: 'Recruitment Approval', steps: ['Hiring Manager', 'HR Manager', 'Director'], sla: '3 business days', status: 'Draft' },
  { name: 'Overtime Approval', steps: ['Supervisor', 'Project Manager', 'HR'], sla: '1 business day', status: 'Active' },
];

export const approvalMatrix = [
  { department: 'Human Capital Operations', level: 'Level 1', approver: 'Arif Rahman', backup: 'Dewi Lestari', status: 'Active' },
  { department: 'Engineering Platform', level: 'Level 2', approver: 'Raka Putra', backup: 'Nadia Safitri', status: 'Active' },
  { department: 'Operations Kalimantan', level: 'Project', approver: 'Bima Pratama', backup: 'Yusuf Hidayat', status: 'Active' },
  { department: 'Finance & Accounting', level: 'Finance', approver: 'Maya Anindita', backup: 'Taufik Wijaya', status: 'Review' },
  { department: 'Talent Development', level: 'HR', approver: 'Siti Nurhaliza', backup: 'Arif Rahman', status: 'Active' },
];

export const companySettings = [
  { label: 'Company information', value: 'PT Nusantara Teknologi Sejahtera', icon: Building2 },
  { label: 'Logo', value: 'Primary brand mark configured', icon: FileText },
  { label: 'Business units', value: '7 active units', icon: Layers3 },
  { label: 'Working hours', value: '08:00 - 17:00 WIB', icon: CalendarClock },
  { label: 'Holiday calendar', value: 'Indonesia national + site holidays', icon: MapPin },
  { label: 'Leave rules', value: 'Annual, sick, maternity, collective leave', icon: CheckCircle2 },
  { label: 'Attendance rules', value: 'Geo-fence, shift tolerance, overtime caps', icon: Activity },
];

export const notificationTemplates = [
  { event: 'Leave Approved', channels: ['Email', 'In-App', 'Push Placeholder'], owner: 'Workforce Admin', status: 'Active' },
  { event: 'Leave Rejected', channels: ['Email', 'In-App'], owner: 'Workforce Admin', status: 'Active' },
  { event: 'Training Reminder', channels: ['Email', 'In-App', 'SMS Placeholder'], owner: 'Talent Development', status: 'Active' },
  { event: 'Medical Reminder', channels: ['Email', 'In-App'], owner: 'Health & Safety', status: 'Active' },
  { event: 'Certificate Expiry', channels: ['Email', 'In-App', 'Push Placeholder'], owner: 'Compliance', status: 'Active' },
  { event: 'New Employee', channels: ['Email', 'In-App'], owner: 'People Services', status: 'Draft' },
  { event: 'Claims Approved', channels: ['Email', 'In-App'], owner: 'Rewards', status: 'Active' },
];

export const auditLogs: AuditRecord[] = [
  { id: 'aud-001', timestamp: '30 Jun 2026, 10:21', user: 'Dewi Lestari', role: 'Administrator', action: 'Updated permission matrix', module: 'Permission Management', ipAddress: '103.18.77.24', device: 'Edge on Windows', status: 'Success' },
  { id: 'aud-002', timestamp: '30 Jun 2026, 09:58', user: 'Arif Rahman', role: 'HR Manager', action: 'Created department', module: 'Master Data', ipAddress: '103.18.77.31', device: 'Chrome on macOS', status: 'Success' },
  { id: 'aud-003', timestamp: '30 Jun 2026, 09:12', user: 'System', role: 'Integration', action: 'Payroll webhook retry', module: 'Integration Settings', ipAddress: '10.12.4.18', device: 'Service account', status: 'Warning' },
  { id: 'aud-004', timestamp: '29 Jun 2026, 17:44', user: 'Siti Nurhaliza', role: 'HR Officer', action: 'Archived document type', module: 'Master Data', ipAddress: '103.18.77.42', device: 'Firefox on Windows', status: 'Success' },
  { id: 'aud-005', timestamp: '29 Jun 2026, 15:03', user: 'Raka Putra', role: 'Supervisor', action: 'Failed admin access attempt', module: 'Administration', ipAddress: '114.10.21.89', device: 'Mobile Safari', status: 'Failed' },
];

export const activityLogs = [
  { category: 'Recent Activities', detail: 'Dewi assigned Administrator role to backup HRIS account.', time: '8 minutes ago' },
  { category: 'System Events', detail: 'Nightly permission cache rebuilt successfully.', time: '42 minutes ago' },
  { category: 'Configuration Changes', detail: 'Leave workflow SLA changed from 3 to 2 business days.', time: '1 hour ago' },
  { category: 'Role Changes', detail: 'Project Manager role granted export permission for workforce reports.', time: '2 hours ago' },
  { category: 'Workflow Changes', detail: 'Recruitment approval route saved as draft.', time: 'Yesterday' },
];

export const systemPreferences = [
  { label: 'Theme', value: 'Enterprise dark theme', status: 'Configured' },
  { label: 'Localization', value: 'Indonesia primary, English secondary', status: 'Configured' },
  { label: 'Timezone', value: 'Asia/Jakarta', status: 'Configured' },
  { label: 'Language', value: 'English UI with Indonesian enterprise data', status: 'Configured' },
  { label: 'Date format', value: 'DD MMM YYYY', status: 'Configured' },
  { label: 'Number format', value: '1.000.000,00', status: 'Configured' },
  { label: 'Maintenance mode', value: 'Placeholder only', status: 'Ready' },
];

export const integrationCards = [
  { name: 'Payroll Integration', description: 'Outbound payroll-ready data sync placeholder.', icon: Landmark, status: 'Prepared UI' },
  { name: 'LDAP', description: 'Directory sync and account mapping placeholder.', icon: Network, status: 'Prepared UI' },
  { name: 'SSO', description: 'Single sign-on configuration placeholder.', icon: KeyRound, status: 'Prepared UI' },
  { name: 'Microsoft Entra ID', description: 'Enterprise identity provisioning placeholder.', icon: ShieldCheck, status: 'Prepared UI' },
  { name: 'Google Workspace', description: 'Workspace account sync placeholder.', icon: Globe2, status: 'Prepared UI' },
  { name: 'Email Service', description: 'SMTP and email provider placeholder.', icon: Mail, status: 'Prepared UI' },
  { name: 'Storage', description: 'Document storage provider placeholder.', icon: Database, status: 'Prepared UI' },
  { name: 'Webhook', description: 'Event delivery and retry placeholder.', icon: Workflow, status: 'Prepared UI' },
  { name: 'API Keys', description: 'Service credential management placeholder.', icon: KeyRound, status: 'Prepared UI' },
];

export const changeTrend = [
  { day: 'Mon', changes: 8, alerts: 1 },
  { day: 'Tue', changes: 11, alerts: 2 },
  { day: 'Wed', changes: 6, alerts: 0 },
  { day: 'Thu', changes: 13, alerts: 1 },
  { day: 'Fri', changes: 10, alerts: 2 },
  { day: 'Sat', changes: 4, alerts: 0 },
  { day: 'Sun', changes: 3, alerts: 0 },
];

export const accessDistribution = [
  { name: 'Employee', value: 1048 },
  { name: 'Supervisor', value: 142 },
  { name: 'HR', value: 49 },
  { name: 'Admin', value: 8 },
  { name: 'Director', value: 12 },
];
