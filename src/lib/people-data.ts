export type EmployeeRecord = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photo: string;
  initials: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  contractType: string;
  branch: string;
  location: string;
  gender: string;
  manager: string;
  lastActivity: string;
  email: string;
  phone: string;
  office: string;
};

export const departmentOptions = ['SDM', 'Teknologi', 'Penjualan', 'Keuangan', 'Produk', 'Hukum', 'Layanan Pelanggan'];
export const positionOptions = ['Generalist SDM', 'Manajer SDM', 'Pengembang Perangkat Lunak', 'Kepala Penjualan', 'Analis Produk', 'Desainer Produk', 'Konsultan Hukum', 'Direktur Layanan Pelanggan', 'Manajer Keuangan'];
export const statusOptions = ['Aktif', 'Cuti', 'Kontrak', 'Probation', 'Magang'];
export const contractOptions = ['Permanen', 'Waktu tertentu', 'Magang'];
export const branchOptions = ['Jakarta HQ', 'Surabaya Office', 'Bali Hub', 'Bandung Studio'];
export const locationOptions = ['Jakarta', 'Surabaya', 'Denpasar', 'Bandung', 'Remote'];
export const genderOptions = ['Perempuan', 'Laki-laki', 'Non-biner'];

export const employeeDirectory: EmployeeRecord[] = [
  {
    id: 'maya-sari',
    employeeId: 'EMP-1012',
    firstName: 'Maya',
    lastName: 'Sari',
    fullName: 'Maya Sari',
    photo: 'MS',
    initials: 'MS',
    department: 'SDM',
    position: 'Generalist SDM',
    status: 'Aktif',
    joinDate: '2021-04-12',
    contractType: 'Permanen',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: '2 jam lalu',
    email: 'maya.sari@indocater.co.id',
    phone: '+62 812-3456-7890',
    office: 'Tower A, Lt. 11',
  },
  {
    id: 'leo-wibowo',
    employeeId: 'EMP-1006',
    firstName: 'Leo',
    lastName: 'Wibowo',
    fullName: 'Leo Wibowo',
    photo: 'LW',
    initials: 'LW',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    status: 'Aktif',
    joinDate: '2022-01-19',
    contractType: 'Permanen',
    branch: 'Bandung Studio',
    location: 'Bandung',
    gender: 'Laki-laki',
    manager: 'Fitri Novita',
    lastActivity: 'Hari ini',
    email: 'leo.wibowo@indocater.co.id',
    phone: '+62 812-9988-2233',
    office: 'Bandung Studio Lt. 6',
  },
  {
    id: 'aulia-rizky',
    employeeId: 'EMP-1074',
    firstName: 'Aulia',
    lastName: 'Rizky',
    fullName: 'Aulia Rizky',
    photo: 'AR',
    initials: 'AR',
    department: 'Penjualan',
    position: 'Kepala Penjualan',
    status: 'Aktif',
    joinDate: '2020-09-03',
    contractType: 'Permanen',
    branch: 'Surabaya Office',
    location: 'Surabaya',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: 'Kemarin',
    email: 'aulia.rizky@indocater.co.id',
    phone: '+62 811-2233-4455',
    office: 'Surabaya Plaza Lt. 2',
  },
  {
    id: 'zara-nurhidayah',
    employeeId: 'EMP-1031',
    firstName: 'Zara',
    lastName: 'Nurhidayah',
    fullName: 'Zara Nurhidayah',
    photo: 'ZN',
    initials: 'ZN',
    department: 'Produk',
    position: 'Desainer Produk',
    status: 'Cuti',
    joinDate: '2019-06-28',
    contractType: 'Permanen',
    branch: 'Bali Hub',
    location: 'Denpasar',
    gender: 'Perempuan',
    manager: 'Maya Sari',
    lastActivity: '3 hari lalu',
    email: 'zara.nurhidayah@indocater.co.id',
    phone: '+62 812-5567-8910',
    office: 'Bali Creative Space Lt. 3',
  },
  {
    id: 'noor-fadhila',
    employeeId: 'EMP-1020',
    firstName: 'Noor',
    lastName: 'Fadhila',
    fullName: 'Noor Fadhila',
    photo: 'NF',
    initials: 'NF',
    department: 'SDM',
    position: 'Manajer SDM',
    status: 'Aktif',
    joinDate: '2017-11-15',
    contractType: 'Permanen',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Laki-laki',
    manager: 'Dewi Lestari',
    lastActivity: 'Hari ini',
    email: 'noor.fadhila@indocater.co.id',
    phone: '+62 811-3344-5566',
    office: 'Tower B, Lt. 8',
  },
  {
    id: 'lia-pratiwi',
    employeeId: 'EMP-1088',
    firstName: 'Lia',
    lastName: 'Pratiwi',
    fullName: 'Lia Pratiwi',
    photo: 'LP',
    initials: 'LP',
    department: 'Layanan Pelanggan',
    position: 'Direktur Layanan Pelanggan',
    status: 'Aktif',
    joinDate: '2021-12-05',
    contractType: 'Permanen',
    branch: 'Remote',
    location: 'Remote',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: '4 jam lalu',
    email: 'lia.pratiwi@indocater.co.id',
    phone: '+62 811-555-2233',
    office: 'Remote',
  },
  {
    id: 'caleb-santoso',
    employeeId: 'EMP-1105',
    firstName: 'Caleb',
    lastName: 'Santoso',
    fullName: 'Caleb Santoso',
    photo: 'CS',
    initials: 'CS',
    department: 'Keuangan',
    position: 'Manajer Keuangan',
    status: 'Aktif',
    joinDate: '2018-03-20',
    contractType: 'Permanen',
    branch: 'Bandung Studio',
    location: 'Bandung',
    gender: 'Laki-laki',
    manager: 'Dewi Lestari',
    lastActivity: 'Hari ini',
    email: 'caleb.santoso@indocater.co.id',
    phone: '+62 811-9988-5544',
    office: 'Bandung Studio Lt. 5',
  },
  {
    id: 'juni-rahmawati',
    employeeId: 'EMP-1112',
    firstName: 'Juni',
    lastName: 'Rahmawati',
    fullName: 'Juni Rahmawati',
    photo: 'JR',
    initials: 'JR',
    department: 'Hukum',
    position: 'Konsultan Hukum',
    status: 'Aktif',
    joinDate: '2020-02-14',
    contractType: 'Waktu tertentu',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: '1 minggu lalu',
    email: 'juni.rahmawati@indocater.co.id',
    phone: '+62 811-2233-9988',
    office: 'Tower A, Lt. 4',
  },
  {
    id: 'emily-putri',
    employeeId: 'EMP-1123',
    firstName: 'Emily',
    lastName: 'Putri',
    fullName: 'Emily Putri',
    photo: 'EP',
    initials: 'EP',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    status: 'Magang',
    joinDate: '2024-02-01',
    contractType: 'Magang',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Leo Wibowo',
    lastActivity: 'Hari ini',
    email: 'emily.putri@indocater.co.id',
    phone: '+62 813-9988-2233',
    office: 'Tower A, Lt. 6',
  },
  {
    id: 'sophia-septiani',
    employeeId: 'EMP-1141',
    firstName: 'Sophia',
    lastName: 'Septiani',
    fullName: 'Sophia Septiani',
    photo: 'SS',
    initials: 'SS',
    department: 'Produk',
    position: 'Analis Produk',
    status: 'Aktif',
    joinDate: '2023-08-07',
    contractType: 'Permanen',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Zara Nurhidayah',
    lastActivity: '5 jam lalu',
    email: 'sophia.septiani@indocater.co.id',
    phone: '+62 811-555-7801',
    office: 'Tower B, Lt. 7',
  },
];

export type EmployeeProfile = {
  id: string;
  employeeId: string;
  fullName: string;
  photo: string;
  department: string;
  position: string;
  status: string;
  manager: string;
  branch: string;
  location: string;
  email: string;
  phone: string;
  workMode: string;
  hireDate: string;
  contractType: string;
  emergencyContact: { name: string; relationship: string; phone: string };
  stats: {
    attendanceRate: string;
    remainingLeave: string;
    trainingCompleted: string;
    benefits: string;
    yearsOfService: string;
    performance: string;
  };
  summary: string;
  employmentHistory: Array<{ period: string; role: string; department: string; location: string }>;
  leaveBalance: Array<{ type: string; used: string; remaining: string }>;
  trainingRecords: Array<{ title: string; status: string; due: string }>;
  medicalRecords: Array<{ label: string; status: string; expires: string }>;
  benefitSummary: Array<{ name: string; detail: string }>;
  documents: Array<{ title: string; category: string; date: string; status: string }>;
  timeline: Array<{ label: string; date: string; description: string }>;
  activityLog: Array<{ description: string; time: string; category: string }>;
};

const employeeProfiles: EmployeeProfile[] = [
  {
    id: 'maya-thompson',
    employeeId: 'EMP-1012',
    fullName: 'Maya Thompson',
    photo: 'MT',
    department: 'People Ops',
    position: 'HR Generalist',
    status: 'Active',
    manager: 'Noah Brooks',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'maya.thompson@workspan.com',
    phone: '+62 812-3456-7890',
    workMode: 'Hybrid',
    hireDate: '2021-04-12',
    contractType: 'Permanent',
    emergencyContact: { name: 'Aria Thompson', relationship: 'Sister', phone: '+62 811-777-4455' },
    stats: {
      attendanceRate: '98.6%',
      remainingLeave: '12 days',
      trainingCompleted: '86%',
      benefits: 'Health + Retirement',
      yearsOfService: '3.2 yrs',
      performance: 'Meets expectations',
    },
    summary: 'Leads onboarding programs for new hires across APAC, champions culture rituals, and supports leadership staffing initiatives.',
    employmentHistory: [
      { period: 'Apr 2021 - Present', role: 'HR Generalist', department: 'People Ops', location: 'Jakarta' },
      { period: 'Oct 2019 - Mar 2021', role: 'HR Coordinator', department: 'People Ops', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '8', remaining: '12' },
      { type: 'Sick', used: '2', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Leadership Essentials', status: 'Completed', due: '-' },
      { title: 'Diversity & Inclusion', status: 'In progress', due: 'Jul 10' },
      { title: 'Data Privacy', status: 'Upcoming', due: 'Aug 22' },
    ],
    medicalRecords: [
      { label: 'Annual health check', status: 'Completed', expires: '2026-03-19' },
      { label: 'Flu vaccine', status: 'Active', expires: '2025-11-01' },
    ],
    benefitSummary: [
      { name: 'Medical', detail: 'Premium plan A' },
      { name: 'Retirement', detail: '6% employer match' },
      { name: 'Commuter', detail: 'Monthly stipend' },
    ],
    documents: [
      { title: 'Employment contract', category: 'Contract', date: '2024-01-05', status: 'Signed' },
      { title: 'NDA', category: 'Legal', date: '2024-01-05', status: 'Signed' },
      { title: 'ID card', category: 'Identity', date: '2024-01-06', status: 'Active' },
    ],
    timeline: [
      { label: 'Joined company', date: 'Apr 12, 2021', description: 'Started as HR Generalist in Jakarta.' },
      { label: 'Promotion', date: 'Sep 09, 2022', description: 'Led APAC onboarding transformation.' },
      { label: 'Training completed', date: 'May 25, 2024', description: 'Finished Leadership Essentials program.' },
    ],
    activityLog: [
      { description: 'Updated emergency contact information.', time: 'Today, 09:40', category: 'Profile' },
      { description: 'Approved benefit enrollment for team.', time: 'Yesterday, 16:10', category: 'Action' },
      { description: 'Downloaded employment contract.', time: '2 days ago', category: 'Documents' },
    ],
  },
  {
    id: 'leo-hunter',
    employeeId: 'EMP-1006',
    fullName: 'Leo Hunter',
    photo: 'LH',
    department: 'Engineering',
    position: 'Software Engineer',
    status: 'Active',
    manager: 'Avery Patel',
    branch: 'New York Studio',
    location: 'New York',
    email: 'leo.hunter@workspan.com',
    phone: '+1 646-555-0129',
    workMode: 'Onsite',
    hireDate: '2022-01-19',
    contractType: 'Permanent',
    emergencyContact: { name: 'Nina Hunter', relationship: 'Partner', phone: '+1 646-555-0199' },
    stats: {
      attendanceRate: '99.2%',
      remainingLeave: '9 days',
      trainingCompleted: '92%',
      benefits: 'Health + Stock options',
      yearsOfService: '2.4 yrs',
      performance: 'Exceeds expectations',
    },
    summary: 'Builds full-stack HR platform features, mentors junior engineers, and owns the employee self-service experience.',
    employmentHistory: [
      { period: 'Jan 2022 - Present', role: 'Software Engineer', department: 'Engineering', location: 'New York' },
      { period: 'Aug 2020 - Dec 2021', role: 'Frontend Engineer', department: 'Engineering', location: 'New York' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '11', remaining: '9' },
      { type: 'Sick', used: '1', remaining: '5' },
    ],
    trainingRecords: [
      { title: 'Advanced React Patterns', status: 'Completed', due: '-' },
      { title: 'Cloud Native Security', status: 'In progress', due: 'Jul 22' },
      { title: 'Automated Testing', status: 'Upcoming', due: 'Aug 30' },
    ],
    medicalRecords: [
      { label: 'Annual checkup', status: 'Completed', expires: '2026-04-10' },
      { label: 'Dental screening', status: 'Active', expires: '2025-12-05' },
    ],
    benefitSummary: [
      { name: 'Medical', detail: 'Premium plan B' },
      { name: 'Retirement', detail: '4% employer match' },
      { name: 'Stock options', detail: '2,500 RSUs' },
    ],
    documents: [
      { title: 'Offer letter', category: 'Contract', date: '2022-01-15', status: 'Signed' },
      { title: 'Performance review', category: 'Engineering', date: '2024-03-12', status: 'Finalized' },
      { title: 'ID badge', category: 'Security', date: '2024-01-20', status: 'Active' },
    ],
    timeline: [
      { label: 'Joined platform team', date: 'Jan 19, 2022', description: 'Started product engineering for HRIS core.' },
      { label: 'Delivered performance dashboard', date: 'Nov 08, 2023', description: 'Enabled leader analytics for HR metrics.' },
      { label: 'Led roadmap planning', date: 'Mar 18, 2025', description: 'Aligned engineering work with people ops goals.' },
    ],
    activityLog: [
      { description: 'Merged sprint release to production.', time: 'Today, 10:05', category: 'Deployment' },
      { description: 'Reviewed accessibility audit.', time: 'Yesterday, 17:45', category: 'Quality' },
      { description: 'Published feature spec.', time: '2 days ago', category: 'Planning' },
    ],
  },
  {
    id: 'avery-patel',
    employeeId: 'EMP-1074',
    fullName: 'Avery Patel',
    photo: 'AP',
    department: 'Sales',
    position: 'Sales Lead',
    status: 'Active',
    manager: 'Noah Brooks',
    branch: 'London Hub',
    location: 'London',
    email: 'avery.patel@workspan.com',
    phone: '+44 20 7946 0084',
    workMode: 'Hybrid',
    hireDate: '2020-09-03',
    contractType: 'Permanent',
    emergencyContact: { name: 'Riley Patel', relationship: 'Partner', phone: '+44 7700 900900' },
    stats: {
      attendanceRate: '96.8%',
      remainingLeave: '10 days',
      trainingCompleted: '88%',
      benefits: 'Medical + Travel allowance',
      yearsOfService: '4.8 yrs',
      performance: 'Strong performer',
    },
    summary: 'Leads the international sales team, tracks quota attainment, and supports strategic customer growth in EMEA.',
    employmentHistory: [
      { period: 'Sep 2020 - Present', role: 'Sales Lead', department: 'Sales', location: 'London' },
      { period: 'Jan 2018 - Aug 2020', role: 'Account Executive', department: 'Sales', location: 'London' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '9', remaining: '10' },
      { type: 'Sick', used: '3', remaining: '3' },
    ],
    trainingRecords: [
      { title: 'Strategic Selling', status: 'Completed', due: '-' },
      { title: 'Customer Success Workshop', status: 'In progress', due: 'Jul 15' },
      { title: 'Negotiation Training', status: 'Upcoming', due: 'Sep 24' },
    ],
    medicalRecords: [
      { label: 'Annual health check', status: 'Completed', expires: '2026-01-14' },
      { label: 'Travel vaccine', status: 'Active', expires: '2025-10-01' },
    ],
    benefitSummary: [
      { name: 'Health', detail: 'Executive medical package' },
      { name: 'Travel', detail: 'International allowance' },
      { name: 'Pension', detail: '6% employer match' },
    ],
    documents: [
      { title: 'Annual quota plan', category: 'Sales', date: '2024-02-01', status: 'Active' },
      { title: 'Performance review', category: 'Sales', date: '2024-02-20', status: 'Finalized' },
      { title: 'Passport copy', category: 'Compliance', date: '2024-01-10', status: 'Verified' },
    ],
    timeline: [
      { label: 'Promoted to Sales Lead', date: 'Sep 03, 2020', description: 'Took over EMEA expansion efforts.' },
      { label: 'Expanded London team', date: 'May 2022', description: 'Added two regional account managers.' },
      { label: 'Closed enterprise deal', date: 'Feb 2024', description: 'Secured multi-year account.' },
    ],
    activityLog: [
      { description: 'Updated sales commission plan.', time: 'Today, 08:55', category: 'Compensation' },
      { description: 'Reviewed customer onboarding status.', time: 'Yesterday, 15:20', category: 'Customer' },
      { description: 'Filed travel request.', time: '2 days ago', category: 'Logistics' },
    ],
  },
  {
    id: 'zoe-kim',
    employeeId: 'EMP-1031',
    fullName: 'Zoe Kim',
    photo: 'ZK',
    department: 'Product',
    position: 'Product Designer',
    status: 'On leave',
    manager: 'Maya Thompson',
    branch: 'Singapore Office',
    location: 'Singapore',
    email: 'zoe.kim@workspan.com',
    phone: '+65 9123 4567',
    workMode: 'Hybrid',
    hireDate: '2019-06-28',
    contractType: 'Permanent',
    emergencyContact: { name: 'Min Kim', relationship: 'Mother', phone: '+65 9123 5567' },
    stats: {
      attendanceRate: '94.7%',
      remainingLeave: '16 days',
      trainingCompleted: '81%',
      benefits: 'Medical + Wellness',
      yearsOfService: '5.0 yrs',
      performance: 'Strong contributor',
    },
    summary: 'Designs employee experience flows and drives mobile-first product decisions for HR self-service tools.',
    employmentHistory: [
      { period: 'Jun 2019 - Present', role: 'Product Designer', department: 'Product', location: 'Singapore' },
      { period: 'Jan 2017 - May 2019', role: 'UX Designer', department: 'Product', location: 'Singapore' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '4', remaining: '16' },
      { type: 'Sick', used: '3', remaining: '2' },
    ],
    trainingRecords: [
      { title: 'Design Systems', status: 'Completed', due: '-' },
      { title: 'Service Design', status: 'In progress', due: 'Jul 31' },
      { title: 'Accessibility review', status: 'Upcoming', due: 'Sep 12' },
    ],
    medicalRecords: [
      { label: 'Ergonomics check', status: 'Completed', expires: '2025-10-10' },
      { label: 'Vaccinations', status: 'Active', expires: '2026-01-01' },
    ],
    benefitSummary: [
      { name: 'Health', detail: 'Premium wellness plan' },
      { name: 'Learning', detail: 'Conference stipend' },
      { name: 'Insurance', detail: 'Dental + Vision' },
    ],
    documents: [
      { title: 'Design portfolio', category: 'Development', date: '2024-02-14', status: 'Active' },
      { title: 'Return-to-work forms', category: 'HR', date: '2024-06-01', status: 'Pending' },
      { title: 'Business travel form', category: 'Travel', date: '2024-05-11', status: 'Approved' },
    ],
    timeline: [
      { label: 'Joined product team', date: 'Jun 28, 2019', description: 'Started designing employee-facing workflows.' },
      { label: 'Launched mobile experience', date: 'Oct 12, 2022', description: 'Led mobile-first redesign for HR app.' },
      { label: 'Started leave period', date: 'Jun 10, 2026', description: 'Paid leave out of office.' },
    ],
    activityLog: [
      { description: 'Shared design handoff with engineering.', time: 'Yesterday, 14:30', category: 'Design' },
      { description: 'Completed D&I training module.', time: '3 days ago', category: 'Training' },
      { description: 'Reviewed leave requests.', time: '1 week ago', category: 'HR' },
    ],
  },
  {
    id: 'noah-brooks',
    employeeId: 'EMP-1020',
    fullName: 'Noah Brooks',
    photo: 'NB',
    department: 'People Ops',
    position: 'HR Director',
    status: 'Active',
    manager: 'Executive Board',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'noah.brooks@workspan.com',
    phone: '+62 811-2233-4455',
    workMode: 'Hybrid',
    hireDate: '2017-11-15',
    contractType: 'Permanent',
    emergencyContact: { name: 'Sofia Brooks', relationship: 'Wife', phone: '+62 811-3344-5566' },
    stats: {
      attendanceRate: '99.4%',
      remainingLeave: '8 days',
      trainingCompleted: '95%',
      benefits: 'Executive package',
      yearsOfService: '6.7 yrs',
      performance: 'Outstanding',
    },
    summary: 'Oversees all people initiatives, drives HR strategy and anchors leadership alignment across global HR teams.',
    employmentHistory: [
      { period: 'Nov 2017 - Present', role: 'HR Director', department: 'People Ops', location: 'Jakarta' },
      { period: 'May 2015 - Oct 2017', role: 'Senior HR Manager', department: 'People Ops', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '12', remaining: '8' },
      { type: 'Sick', used: '1', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Executive leadership', status: 'Completed', due: '-' },
      { title: 'Global HR compliance', status: 'Completed', due: '-' },
      { title: 'Talent strategy workshop', status: 'In progress', due: 'Aug 14' },
    ],
    medicalRecords: [
      { label: 'Executive health check', status: 'Completed', expires: '2026-02-15' },
      { label: 'COVID-19 booster', status: 'Active', expires: '2025-12-01' },
    ],
    benefitSummary: [
      { name: 'Medical', detail: 'Executive wellness plan' },
      { name: 'Retirement', detail: '10% employer match' },
      { name: 'Travel', detail: 'Business class allowance' },
    ],
    documents: [
      { title: 'Board report', category: 'Executive', date: '2024-06-01', status: 'Finalized' },
      { title: 'Leadership pledge', category: 'HR', date: '2024-01-10', status: 'Signed' },
      { title: 'ID card', category: 'Security', date: '2024-01-05', status: 'Active' },
    ],
    timeline: [
      { label: 'Appointed HR Director', date: 'Nov 15, 2017', description: 'Became head of People Ops.' },
      { label: 'Introduced leadership forum', date: 'Oct 02, 2021', description: 'Launched executive HR roundtables.' },
      { label: 'Aligned global HR targets', date: 'Mar 10, 2025', description: 'Created company-wide people success metrics.' },
    ],
    activityLog: [
      { description: 'Reviewed quarterly talent metrics.', time: 'Today, 11:20', category: 'Strategy' },
      { description: 'Signed off on compensation plan.', time: 'Yesterday, 16:00', category: 'Compensation' },
      { description: 'Shared leadership update.', time: '3 days ago', category: 'Communication' },
    ],
  },
  {
    id: 'lia-chang',
    employeeId: 'EMP-1088',
    fullName: 'Lia Chang',
    photo: 'LC',
    department: 'Customer Success',
    position: 'Customer Success Director',
    status: 'Active',
    manager: 'Noah Brooks',
    branch: 'New York Studio',
    location: 'Remote',
    email: 'lia.chang@workspan.com',
    phone: '+1 917-555-2233',
    workMode: 'Remote',
    hireDate: '2021-12-05',
    contractType: 'Permanent',
    emergencyContact: { name: 'Mason Chang', relationship: 'Brother', phone: '+1 917-555-2234' },
    stats: {
      attendanceRate: '97.4%',
      remainingLeave: '14 days',
      trainingCompleted: '89%',
      benefits: 'Health + Remote stipend',
      yearsOfService: '2.5 yrs',
      performance: 'High performer',
    },
    summary: 'Manages customer success operations and supports remote employee experience across the Americas.',
    employmentHistory: [
      { period: 'Dec 2021 - Present', role: 'Customer Success Director', department: 'Customer Success', location: 'Remote' },
      { period: 'Mar 2019 - Nov 2021', role: 'Customer Success Manager', department: 'Customer Success', location: 'Remote' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '7', remaining: '14' },
      { type: 'Sick', used: '1', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Remote leadership', status: 'Completed', due: '-' },
      { title: 'Customer retention', status: 'In progress', due: 'Jul 07' },
      { title: 'Conflict resolution', status: 'Upcoming', due: 'Sep 05' },
    ],
    medicalRecords: [
      { label: 'Remote health check', status: 'Completed', expires: '2026-05-10' },
      { label: 'Wellness screening', status: 'Active', expires: '2025-09-30' },
    ],
    benefitSummary: [
      { name: 'Medical', detail: 'Remote worker health plan' },
      { name: 'Home office', detail: 'Equipment allowance' },
      { name: 'Retirement', detail: '5% employer match' },
    ],
    documents: [
      { title: 'Customer playbook', category: 'Operations', date: '2024-04-21', status: 'Active' },
      { title: 'Remote work agreement', category: 'HR', date: '2024-01-20', status: 'Signed' },
      { title: 'Benefits summary', category: 'Benefits', date: '2024-03-18', status: 'Active' },
    ],
    timeline: [
      { label: 'Joined remote team', date: 'Dec 05, 2021', description: 'Started building customer success processes.' },
      { label: 'Scaled success team', date: 'Jul 18, 2023', description: 'Added two remote coordinators.' },
      { label: 'Renewed customer program', date: 'Jan 29, 2025', description: 'Established quarterly success reviews.' },
    ],
    activityLog: [
      { description: 'Reviewed customer satisfaction metrics.', time: 'Today, 08:10', category: 'Insight' },
      { description: 'Approved team bonus.', time: 'Yesterday, 13:40', category: 'Compensation' },
      { description: 'Signed remote onboarding checklist.', time: '3 days ago', category: 'Compliance' },
    ],
  },
  {
    id: 'caleb-ortega',
    employeeId: 'EMP-1105',
    fullName: 'Caleb Ortega',
    photo: 'CO',
    department: 'Finance',
    position: 'Finance Manager',
    status: 'Active',
    manager: 'Avery Patel',
    branch: 'London Hub',
    location: 'London',
    email: 'caleb.ortega@workspan.com',
    phone: '+44 20 7946 0099',
    workMode: 'Onsite',
    hireDate: '2018-03-20',
    contractType: 'Permanent',
    emergencyContact: { name: 'Lucia Ortega', relationship: 'Wife', phone: '+44 20 7946 0198' },
    stats: {
      attendanceRate: '98.1%',
      remainingLeave: '11 days',
      trainingCompleted: '90%',
      benefits: 'Health + Pension',
      yearsOfService: '6.2 yrs',
      performance: 'Meets expectations',
    },
    summary: 'Oversees the finance team, budgets HR investments, and ensures payroll and benefits operations run smoothly.',
    employmentHistory: [
      { period: 'Mar 2018 - Present', role: 'Finance Manager', department: 'Finance', location: 'London' },
      { period: 'Jun 2015 - Feb 2018', role: 'Financial Analyst', department: 'Finance', location: 'London' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '10', remaining: '11' },
      { type: 'Sick', used: '2', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Corporate finance', status: 'Completed', due: '-' },
      { title: 'Payroll compliance', status: 'In progress', due: 'Jul 20' },
      { title: 'Expense policies', status: 'Upcoming', due: 'Sep 18' },
    ],
    medicalRecords: [
      { label: 'Executive health review', status: 'Completed', expires: '2026-07-04' },
      { label: 'Vision exam', status: 'Active', expires: '2025-10-15' },
    ],
    benefitSummary: [
      { name: 'Health', detail: 'Company health insurance' },
      { name: 'Retirement', detail: '8% employer match' },
      { name: 'Travel', detail: 'Commuter allowance' },
    ],
    documents: [
      { title: 'Budget plan', category: 'Finance', date: '2024-04-02', status: 'Finalized' },
      { title: 'Payroll schedule', category: 'Payroll', date: '2024-05-12', status: 'Active' },
      { title: 'Expense policy', category: 'Compliance', date: '2024-03-10', status: 'Published' },
    ],
    timeline: [
      { label: 'Joined finance team', date: 'Mar 20, 2018', description: 'Started managing financial operations.' },
      { label: 'Improved reporting cadence', date: 'Oct 15, 2022', description: 'Built monthly finance dashboards.' },
      { label: 'Delivered benefits budget', date: 'Jan 22, 2025', description: 'Aligned spend with HR goals.' },
    ],
    activityLog: [
      { description: 'Finalized budget review.', time: 'Today, 12:20', category: 'Budget' },
      { description: 'Updated payroll schedule.', time: 'Yesterday, 14:00', category: 'Operations' },
      { description: 'Validated employee expense policy.', time: '3 days ago', category: 'Policy' },
    ],
  },
  {
    id: 'june-martinez',
    employeeId: 'EMP-1112',
    fullName: 'June Martinez',
    photo: 'JM',
    department: 'Legal',
    position: 'Legal Counsel',
    status: 'Active',
    manager: 'Noah Brooks',
    branch: 'Singapore Office',
    location: 'Singapore',
    email: 'june.martinez@workspan.com',
    phone: '+65 9876 5432',
    workMode: 'Onsite',
    hireDate: '2020-02-14',
    contractType: 'Fixed-term',
    emergencyContact: { name: 'Carlos Martinez', relationship: 'Father', phone: '+65 9876 9988' },
    stats: {
      attendanceRate: '97.9%',
      remainingLeave: '8 days',
      trainingCompleted: '93%',
      benefits: 'Health + Legal support',
      yearsOfService: '4.3 yrs',
      performance: 'Strong contributor',
    },
    summary: 'Provides legal guidance on HR policies, contracts, and compliance across APAC operations.',
    employmentHistory: [
      { period: 'Feb 2020 - Present', role: 'Legal Counsel', department: 'Legal', location: 'Singapore' },
      { period: 'Jul 2016 - Jan 2020', role: 'Associate Counsel', department: 'Legal', location: 'Singapore' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '12', remaining: '8' },
      { type: 'Sick', used: '2', remaining: '3' },
    ],
    trainingRecords: [
      { title: 'Regulatory compliance', status: 'Completed', due: '-' },
      { title: 'Employment law review', status: 'In progress', due: 'Aug 01' },
      { title: 'Contract negotiation', status: 'Upcoming', due: 'Sep 30' },
    ],
    medicalRecords: [
      { label: 'Health assessment', status: 'Completed', expires: '2026-06-20' },
      { label: 'Vaccination', status: 'Active', expires: '2025-11-10' },
    ],
    benefitSummary: [
      { name: 'Legal support', detail: 'Counsel access' },
      { name: 'Medical', detail: 'Wellness plan B' },
      { name: 'Retirement', detail: '5% employer match' },
    ],
    documents: [
      { title: 'Employment agreement', category: 'Legal', date: '2024-01-05', status: 'Signed' },
      { title: 'Policy review memo', category: 'Legal', date: '2024-03-22', status: 'Finalized' },
      { title: 'Compliance checklist', category: 'Audit', date: '2024-05-10', status: 'Active' },
    ],
    timeline: [
      { label: 'Joined legal team', date: 'Feb 14, 2020', description: 'Started supporting HR legal matters.' },
      { label: 'Published policy update', date: 'Apr 18, 2023', description: 'Updated contract review workflow.' },
      { label: 'Completed compliance audit', date: 'Jan 12, 2025', description: 'Delivered audit-ready documentation.' },
    ],
    activityLog: [
      { description: 'Answered policy question.', time: 'Today, 09:25', category: 'Compliance' },
      { description: 'Reviewed contract terms.', time: 'Yesterday, 14:15', category: 'Legal' },
      { description: 'Updated policy docs.', time: '2 days ago', category: 'Documentation' },
    ],
  },
  {
    id: 'emily-wong',
    employeeId: 'EMP-1123',
    fullName: 'Emily Wong',
    photo: 'EW',
    department: 'Engineering',
    position: 'Software Engineer',
    status: 'Probation',
    manager: 'Leo Hunter',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'emily.wong@workspan.com',
    phone: '+62 813-9988-2233',
    workMode: 'Hybrid',
    hireDate: '2024-02-01',
    contractType: 'Internship',
    emergencyContact: { name: 'Jason Wong', relationship: 'Brother', phone: '+62 813-9988-2244' },
    stats: {
      attendanceRate: '95.5%',
      remainingLeave: '18 days',
      trainingCompleted: '60%',
      benefits: 'Standard health',
      yearsOfService: '0.4 yrs',
      performance: 'Promising',
    },
    summary: 'New engineering hire working on internal HR product enhancements and platform stability.',
    employmentHistory: [
      { period: 'Feb 2024 - Present', role: 'Software Engineer', department: 'Engineering', location: 'Jakarta' },
      { period: 'Jun 2023 - Jan 2024', role: 'Software Intern', department: 'Engineering', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '2', remaining: '18' },
      { type: 'Sick', used: '0', remaining: '5' },
    ],
    trainingRecords: [
      { title: 'Onboarding bootcamp', status: 'Completed', due: '-' },
      { title: 'React fundamentals', status: 'In progress', due: 'Jul 05' },
      { title: 'DevOps basics', status: 'Upcoming', due: 'Aug 15' },
    ],
    medicalRecords: [
      { label: 'New hire checkup', status: 'Completed', expires: '2026-02-01' },
      { label: 'Vaccine record', status: 'Active', expires: '2026-01-01' },
    ],
    benefitSummary: [
      { name: 'Health', detail: 'Basic health plan' },
      { name: 'Learning', detail: 'Mentorship program' },
      { name: 'Refresh', detail: 'Wellness stipend' },
    ],
    documents: [
      { title: 'Onboarding packet', category: 'HR', date: '2024-02-02', status: 'Completed' },
      { title: 'Intern agreement', category: 'Contract', date: '2024-01-30', status: 'Signed' },
      { title: 'Laptop allocation', category: 'Asset', date: '2024-02-01', status: 'Issued' },
    ],
    timeline: [
      { label: 'Started probation', date: 'Feb 01, 2024', description: 'Joined engineering team as probation hire.' },
      { label: 'Completed onboarding', date: 'Mar 15, 2024', description: 'Finished initial training modules.' },
      { label: 'Delivered first feature', date: 'May 07, 2024', description: 'Released HR self-service filter update.' },
    ],
    activityLog: [
      { description: 'Submitted first code review.', time: 'Today, 08:55', category: 'Development' },
      { description: 'Completed onboarding quiz.', time: 'Yesterday, 18:20', category: 'Training' },
      { description: 'Updated profile summary.', time: '3 days ago', category: 'Profile' },
    ],
  },
  {
    id: 'sophia-murphy',
    employeeId: 'EMP-1141',
    fullName: 'Sophia Murphy',
    photo: 'SM',
    department: 'Product',
    position: 'Product Analyst',
    status: 'Active',
    manager: 'Zoe Kim',
    branch: 'New York Studio',
    location: 'New York',
    email: 'sophia.murphy@workspan.com',
    phone: '+1 646-555-7801',
    workMode: 'Onsite',
    hireDate: '2023-08-07',
    contractType: 'Permanent',
    emergencyContact: { name: 'Leah Murphy', relationship: 'Mother', phone: '+1 646-555-7812' },
    stats: {
      attendanceRate: '97.1%',
      remainingLeave: '13 days',
      trainingCompleted: '78%',
      benefits: 'Health + Professional development',
      yearsOfService: '1.8 yrs',
      performance: 'Solid performer',
    },
    summary: 'Supports product decisions through people insights and HR analytics to improve workforce experience.',
    employmentHistory: [
      { period: 'Aug 2023 - Present', role: 'Product Analyst', department: 'Product', location: 'New York' },
      { period: 'Jan 2022 - Jul 2023', role: 'Business Analyst', department: 'Product', location: 'New York' },
    ],
    leaveBalance: [
      { type: 'Annual', used: '9', remaining: '13' },
      { type: 'Sick', used: '2', remaining: '3' },
    ],
    trainingRecords: [
      { title: 'People analytics', status: 'Completed', due: '-' },
      { title: 'Research methods', status: 'In progress', due: 'Jul 30' },
      { title: 'Data storytelling', status: 'Upcoming', due: 'Sep 18' },
    ],
    medicalRecords: [
      { label: 'Health check', status: 'Completed', expires: '2026-01-23' },
      { label: 'Vaccination', status: 'Active', expires: '2025-12-22' },
    ],
    benefitSummary: [
      { name: 'Health', detail: 'Enhanced medical plan' },
      { name: 'Learning', detail: 'Data conference stipend' },
      { name: 'Retirement', detail: '5% employer match' },
    ],
    documents: [
      { title: 'Project brief', category: 'Product', date: '2024-05-05', status: 'Active' },
      { title: 'Training certification', category: 'Training', date: '2024-05-21', status: 'Completed' },
      { title: 'NDA', category: 'Legal', date: '2024-01-05', status: 'Signed' },
    ],
    timeline: [
      { label: 'Promoted to analyst', date: 'Aug 07, 2023', description: 'Started driving product metric analysis.' },
      { label: 'Published insights report', date: 'Dec 10, 2023', description: 'Delivered workforce engagement findings.' },
      { label: 'Partnered with HR', date: 'Feb 28, 2025', description: 'Enabled new talent dashboard metrics.' },
    ],
    activityLog: [
      { description: 'Updated quarterly people metrics.', time: 'Today, 09:05', category: 'Analytics' },
      { description: 'Shared user research notes.', time: 'Yesterday, 16:50', category: 'Research' },
      { description: 'Reviewed product roadmap.', time: '2 days ago', category: 'Planning' },
    ],
  },
];

export const peopleDirectoryIds = employeeDirectory.map((employee) => employee.id);

export function getEmployeeProfile(id: string) {
  return employeeProfiles.find((employee) => employee.id === id);
}

export const orgStructure = {
  leader: 'Noor Fadhila',
  title: 'Head of People Ops',
  team: [
    { name: 'Maya Sari', role: 'HR Generalist' },
    { name: 'Zara Nurhidayah', role: 'Product Designer' },
    { name: 'Emily Putri', role: 'Software Engineer' },
  ],
};

export const documentCenter = [
  { title: 'Kontrak kerja', category: 'Kontrak', updated: 'Mei 2024', status: 'Ditandatangani' },
  { title: 'Evaluasi kinerja', category: 'HR', updated: 'Mar 2024', status: 'Final' },
  { title: 'Kartu Asuransi Kesehatan', category: 'Benefit', updated: 'Jan 2024', status: 'Aktif' },
  { title: 'Sertifikat pelatihan', category: 'Pelatihan', updated: 'Jun 2024', status: 'Selesai' },
];
