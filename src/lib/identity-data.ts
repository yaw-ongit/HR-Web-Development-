import {
  Bell,
  CheckCircle2,
  Clock3,
  Eye,
  Globe2,
  KeyRound,
  Laptop,
  LockKeyhole,
  Mail,
  MonitorSmartphone,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserCog,
  Users,
} from 'lucide-react';

export type SessionRecord = {
  id: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActivity: string;
  status: 'Current' | 'Trusted' | 'Expired' | 'Suspicious';
};

export type LoginHistoryRecord = {
  id: string;
  timestamp: string;
  user: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  result: 'Success' | 'Failed' | 'Blocked';
};

export type NotificationRecord = {
  id: string;
  avatar: string;
  title: string;
  body: string;
  category: 'System' | 'HR' | 'Training' | 'Medical' | 'Claims' | 'Approvals';
  priority: 'High' | 'Normal' | 'Low';
  timestamp: string;
  read: boolean;
};

export const identitySections = [
  { label: 'Security Dashboard', href: '/identity', icon: ShieldCheck },
  { label: 'Authentication', href: '/identity/authentication', icon: KeyRound },
  { label: 'Session Management', href: '/identity/session-management', icon: MonitorSmartphone },
  { label: 'Profile & Preferences', href: '/identity/profile-preferences', icon: UserCog },
  { label: 'Security Center', href: '/identity/security-center', icon: ShieldAlert },
  { label: 'Notification Center', href: '/identity/notification-center', icon: Bell },
  { label: 'Notification Preferences', href: '/identity/notification-preferences', icon: SlidersHorizontal },
  { label: 'Login History', href: '/identity/login-history', icon: Clock3 },
  { label: 'Active Sessions', href: '/identity/active-sessions', icon: Laptop },
  { label: 'MFA Placeholder', href: '/identity/mfa-placeholder', icon: Smartphone },
  { label: 'Password Policies', href: '/identity/password-policies', icon: LockKeyhole },
  { label: 'Role Visibility', href: '/identity/role-visibility', icon: Eye },
];

export const identityKpis = [
  { label: 'Active users', value: '1,197', note: 'Enabled accounts across HRIS' },
  { label: 'Current sessions', value: '286', note: 'Live browser and mobile sessions' },
  { label: 'Failed logins', value: '17', note: 'Last 24 hours' },
  { label: 'Password expiry', value: '42', note: 'Users expiring in 14 days' },
  { label: 'Security alerts', value: '6', note: 'Require administrator review' },
];

export const identityUsers = [
  { name: 'Dewi Lestari', email: 'dewi.lestari@nts.co.id', employeeId: 'EMP-ID-0218', department: 'HRIS & Payroll', role: 'Administrator', status: 'Active' },
  { name: 'Arif Rahman', email: 'arif.rahman@nts.co.id', employeeId: 'EMP-ID-0184', department: 'People Operations', role: 'HR Manager', status: 'Active' },
  { name: 'Siti Nurhaliza', email: 'siti.nurhaliza@nts.co.id', employeeId: 'EMP-ID-0331', department: 'Talent Development', role: 'HR Officer', status: 'Active' },
  { name: 'Bima Pratama', email: 'bima.pratama@nts.co.id', employeeId: 'EMP-ID-0109', department: 'Operations Kalimantan', role: 'Project Manager', status: 'Active' },
  { name: 'Raka Putra', email: 'raka.putra@nts.co.id', employeeId: 'EMP-ID-0527', department: 'Engineering Platform', role: 'Supervisor', status: 'Pending' },
  { name: 'Maya Anindita', email: 'maya.anindita@nts.co.id', employeeId: 'EMP-ID-0442', department: 'Finance', role: 'Director', status: 'Disabled' },
];

export const activeSessions: SessionRecord[] = [
  { id: 'ses-001', device: 'ThinkPad X1 Carbon', browser: 'Microsoft Edge 126', os: 'Windows 11', ipAddress: '103.18.77.24', location: 'Jakarta, Indonesia', lastActivity: 'Now', status: 'Current' },
  { id: 'ses-002', device: 'iPhone 15 Pro', browser: 'Mobile Safari', os: 'iOS 18', ipAddress: '114.10.21.89', location: 'Bandung, Indonesia', lastActivity: '14 minutes ago', status: 'Trusted' },
  { id: 'ses-003', device: 'MacBook Pro', browser: 'Chrome 126', os: 'macOS Sequoia', ipAddress: '103.18.77.31', location: 'Jakarta, Indonesia', lastActivity: '1 hour ago', status: 'Trusted' },
  { id: 'ses-004', device: 'Galaxy S24', browser: 'Chrome Mobile', os: 'Android 15', ipAddress: '36.72.15.110', location: 'Surabaya, Indonesia', lastActivity: 'Yesterday', status: 'Expired' },
  { id: 'ses-005', device: 'Unknown Windows device', browser: 'Firefox', os: 'Windows 10', ipAddress: '180.244.91.17', location: 'Location pending', lastActivity: '2 days ago', status: 'Suspicious' },
];

export const loginHistory: LoginHistoryRecord[] = [
  { id: 'log-001', timestamp: '30 Jun 2026, 10:42', user: 'Dewi Lestari', device: 'ThinkPad X1 Carbon', browser: 'Edge', os: 'Windows 11', ip: '103.18.77.24', result: 'Success' },
  { id: 'log-002', timestamp: '30 Jun 2026, 09:17', user: 'Arif Rahman', device: 'MacBook Pro', browser: 'Chrome', os: 'macOS', ip: '103.18.77.31', result: 'Success' },
  { id: 'log-003', timestamp: '30 Jun 2026, 08:58', user: 'Raka Putra', device: 'Unknown Windows device', browser: 'Firefox', os: 'Windows 10', ip: '180.244.91.17', result: 'Failed' },
  { id: 'log-004', timestamp: '29 Jun 2026, 22:12', user: 'Siti Nurhaliza', device: 'Galaxy S24', browser: 'Chrome Mobile', os: 'Android 15', ip: '36.72.15.110', result: 'Success' },
  { id: 'log-005', timestamp: '29 Jun 2026, 21:03', user: 'System policy', device: 'Unknown Linux host', browser: 'Headless', os: 'Linux', ip: '45.90.14.22', result: 'Blocked' },
  { id: 'log-006', timestamp: '29 Jun 2026, 17:30', user: 'Bima Pratama', device: 'iPhone 15 Pro', browser: 'Safari', os: 'iOS 18', ip: '114.10.21.89', result: 'Success' },
];

export const notifications: NotificationRecord[] = [
  { id: 'ntf-001', avatar: 'AR', title: 'Approval matrix needs review', body: 'Finance backup approver has been inactive for seven days.', category: 'Approvals', priority: 'High', timestamp: '8 minutes ago', read: false },
  { id: 'ntf-002', avatar: 'SY', title: 'Training reminder', body: 'Leadership Essentials cohort starts tomorrow at 09:00 WIB.', category: 'Training', priority: 'Normal', timestamp: '32 minutes ago', read: false },
  { id: 'ntf-003', avatar: 'MD', title: 'Medical document expiring', body: 'Three project-site medical certificates expire this week.', category: 'Medical', priority: 'High', timestamp: '1 hour ago', read: false },
  { id: 'ntf-004', avatar: 'CL', title: 'Claims approved', body: 'Travel reimbursement batch CLM-2026-118 is ready for finance export.', category: 'Claims', priority: 'Normal', timestamp: 'Today, 09:02', read: true },
  { id: 'ntf-005', avatar: 'IT', title: 'System maintenance window', body: 'Identity provider connector UI is prepared for future SSO integration.', category: 'System', priority: 'Low', timestamp: 'Yesterday', read: true },
  { id: 'ntf-006', avatar: 'HR', title: 'New employee profile completed', body: 'Nadia Safitri completed onboarding identity verification.', category: 'HR', priority: 'Normal', timestamp: 'Yesterday', read: true },
];

export const notificationPreferences = [
  'Leave Notifications',
  'Training Notifications',
  'Medical Notifications',
  'Claims Notifications',
  'Approval Notifications',
  'System Notifications',
];

export const securityCards = [
  { label: 'Password status', value: 'Strong', note: 'Last changed 18 days ago', status: 'Good' },
  { label: 'Last login', value: 'Today, 10:42', note: 'Jakarta office network', status: 'Good' },
  { label: 'Failed login attempts', value: '2', note: 'One unknown device blocked', status: 'Review' },
  { label: 'Security score', value: '86%', note: 'MFA placeholder pending rollout', status: 'Good' },
  { label: 'Device trust', value: '4 trusted', note: 'One suspicious device detected', status: 'Review' },
];

export const passwordPolicies = [
  'Minimum 12 characters',
  'Uppercase, lowercase, number and symbol required',
  'Password history remembers last 8 passwords',
  'Expiry reminder starts 14 days before expiration',
  'Account lock after 5 failed attempts',
  'Future-ready for Auth.js, Clerk, NextAuth, Entra ID, LDAP and SSO',
];

export const roleVisibility = [
  { role: 'Employee', modules: ['Dashboard', 'Profile', 'Workforce', 'Training', 'Claims'], color: 'text-brand-500' },
  { role: 'Supervisor', modules: ['People', 'Workforce', 'Approvals', 'Team Analytics'], color: 'text-emerald-200' },
  { role: 'HR Officer', modules: ['People', 'Employee 360', 'Talent', 'Compensation'], color: 'text-amber-200' },
  { role: 'HR Manager', modules: ['All HR Modules', 'Analytics', 'Approval Matrix', 'Audit View'], color: 'text-purple-200' },
  { role: 'Project Manager', modules: ['Project Sites', 'Overtime', 'Claims', 'Training'], color: 'text-orange-200' },
  { role: 'Director', modules: ['Executive Dashboard', 'Analytics', 'Compensation', 'Final Approvals'], color: 'text-rose-200' },
  { role: 'Administrator', modules: ['Administration', 'Identity', 'Security', 'Integrations'], color: 'text-cyan-200' },
];

export const loginTrend = [
  { day: 'Mon', success: 280, failed: 9 },
  { day: 'Tue', success: 312, failed: 11 },
  { day: 'Wed', success: 298, failed: 6 },
  { day: 'Thu', success: 341, failed: 17 },
  { day: 'Fri', success: 326, failed: 12 },
  { day: 'Sat', success: 121, failed: 4 },
  { day: 'Sun', success: 88, failed: 3 },
];

export const sessionDistribution = [
  { name: 'Desktop', value: 154 },
  { name: 'Mobile', value: 96 },
  { name: 'Tablet', value: 24 },
  { name: 'Service', value: 12 },
];

export const profilePreference = {
  avatar: 'DL',
  name: 'Dewi Lestari',
  email: 'dewi.lestari@nts.co.id',
  phone: '+62 812-7766-1024',
  department: 'HRIS & Payroll',
  position: 'HRIS Administrator',
  language: 'English',
  timezone: 'Asia/Jakarta',
  theme: 'Enterprise dark',
};

export const authProviderReadiness = [
  { name: 'NextAuth', status: 'Prepared UI', icon: KeyRound },
  { name: 'Clerk', status: 'Prepared UI', icon: Users },
  { name: 'Auth.js', status: 'Prepared UI', icon: LockKeyhole },
  { name: 'Microsoft Entra ID', status: 'Prepared UI', icon: ShieldCheck },
  { name: 'LDAP', status: 'Prepared UI', icon: Globe2 },
  { name: 'SSO', status: 'Prepared UI', icon: Mail },
];
