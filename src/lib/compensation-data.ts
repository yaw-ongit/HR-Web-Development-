// Compensation & Employee Services Module Data
// For PT Indocater - Integrated Workforce Management Platform

export type BenefitType = 'Health Insurance' | 'Life Insurance' | 'Transportation' | 'Meal Allowance' | 'Accommodation' | 'Project Allowance' | 'Communication Allowance' | 'Operational Allowance' | 'Uniform' | 'PPE Allocation' | 'Other';

export type BenefitStatus = 'Aktif' | 'Inactive' | 'Suspended' | 'Kedaluwarsa';

export type InsuranceStatus = 'Aktif' | 'Kedaluwarsa' | 'Menunggu' | 'Dibatalkan';

export type MedicalStatus = 'Selesai' | 'Dijadwalkan' | 'Overdue' | 'Kedaluwarsa';

export type ClaimStatus = 'Menunggu' | 'Approved' | 'Ditolak' | 'Processing' | 'Paid';

export interface Benefit {
  id: string;
  employeeId: string;
  employee: string;
  department: string;
  benefitType: BenefitType;
  provider: string;
  startDate: string;
  endDate: string | null;
  status: BenefitStatus;
  amount?: number;
  coverage?: string;
}

export interface InsurancePolicy {
  id: string;
  employeeId: string;
  employee: string;
  policyNumber: string;
  provider: string;
  policyType: 'Health' | 'Life' | 'Disability' | 'Accident';
  coverage: string;
  monthlyPremium: number;
  issueDate: string;
  expiryDate: string;
  status: InsuranceStatus;
  dependents: number;
  claimLimit: number;
}

export interface InsuranceDependent {
  id: string;
  policyId: string;
  name: string;
  relationship: 'Spouse' | 'Child' | 'Parent' | 'Sibling';
  dateOfBirth: string;
  covered: boolean;
}

export interface MedicalRecord {
  id: string;
  employeeId: string;
  employee: string;
  department: string;
  medicalType: 'MCU' | 'Vaccination' | 'Health Check' | 'Specialist Review';
  provider: string;
  issueDate: string;
  expiryDate: string;
  result: 'Fit' | 'Conditional' | 'Unfit' | 'Menunggu';
  status: MedicalStatus;
  doctorNotes?: string;
  attachments: number;
}

export interface Claim {
  id: string;
  employeeId: string;
  employee: string;
  claimType: string;
  amount: number;
  submissionDate: string;
  status: ClaimStatus;
  approver: string;
  approvalDate?: string;
  rejectionReason?: string;
  documents: number;
  processingTime?: number; // in days
}

export interface EmployeeWelfareProgram {
  id: string;
  name: string;
  category: 'Assistance' | 'Wellness' | 'Housing' | 'Transportation' | 'Meal' | 'Family' | 'Recognition';
  description: string;
  eligibility: string;
  budget: number;
  participants: number;
  provider?: string;
  status: 'Aktif' | 'Inactive';
}

export interface PayrollReady {
  id: string;
  employeeId: string;
  employee: string;
  department: string;
  position: string;
  salaryGrade: string;
  basicSalary: number;
  allowances: {
    transportation: number;
    meal: number;
    accommodation: number;
    operational: number;
    project?: number;
    other?: number;
  };
  deductions: {
    bpjs: number;
    tax: number;
    loans?: number;
  };
  bankAccount: string;
  bankName: string;
  employmentType: 'Permanent' | 'Contract' | 'Probation';
  payrollIntegrationStatus: 'Ready' | 'Menunggu' | 'Error';
}

export interface CompensationKpi {
  employeesCovered: number;
  activeInsurance: number;
  medicalDue: number;
  claimsPending: number;
  benefitUtilization: number; // percentage
  certificatesExpiring: number;
}

// Seed Data - Compensation & Benefits
export const benefits: Benefit[] = [
  {
    id: 'BEN001',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    department: 'Operations - MIGAS',
    benefitType: 'Health Insurance',
    provider: 'PT Asuransi Kesehatan Indonesia',
    startDate: '2025-01-15',
    endDate: null,
    status: 'Aktif',
    coverage: 'Self + 2 dependents',
  },
  {
    id: 'BEN002',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    department: 'Operations - MIGAS',
    benefitType: 'Project Allowance',
    provider: 'Internal',
    startDate: '2026-06-01',
    endDate: null,
    status: 'Aktif',
    amount: 5000000,
  },
  {
    id: 'BEN003',
    employeeId: 'EMP002',
    employee: 'Siti Nurhaliza',
    department: 'HR Administration',
    benefitType: 'Health Insurance',
    provider: 'PT Asuransi Kesehatan Indonesia',
    startDate: '2024-06-01',
    endDate: null,
    status: 'Aktif',
    coverage: 'Self + 1 dependent',
  },
  {
    id: 'BEN004',
    employeeId: 'EMP002',
    employee: 'Siti Nurhaliza',
    department: 'HR Administration',
    benefitType: 'Transportation',
    provider: 'Internal',
    startDate: '2025-01-01',
    endDate: null,
    status: 'Aktif',
    amount: 1200000,
  },
  {
    id: 'BEN005',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    department: 'Facility Management',
    benefitType: 'Health Insurance',
    provider: 'PT Asuransi Kesehatan Indonesia',
    startDate: '2025-02-01',
    endDate: null,
    status: 'Aktif',
  },
  {
    id: 'BEN006',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    department: 'Facility Management',
    benefitType: 'Meal Allowance',
    provider: 'Internal',
    startDate: '2025-02-01',
    endDate: null,
    status: 'Aktif',
    amount: 800000,
  },
  {
    id: 'BEN007',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    department: 'Facility Management',
    benefitType: 'Accommodation',
    provider: 'PT Indocater Company Housing',
    startDate: '2025-02-01',
    endDate: null,
    status: 'Aktif',
    amount: 2000000,
  },
  {
    id: 'BEN008',
    employeeId: 'EMP004',
    employee: 'Rini Kusuma',
    department: 'Operations - Mining',
    benefitType: 'Health Insurance',
    provider: 'PT Asuransi Kesehatan Indonesia',
    startDate: '2025-03-15',
    endDate: null,
    status: 'Aktif',
  },
  {
    id: 'BEN009',
    employeeId: 'EMP004',
    employee: 'Rini Kusuma',
    department: 'Operations - Mining',
    benefitType: 'PPE Allocation',
    provider: 'Internal',
    startDate: '2025-03-15',
    endDate: null,
    status: 'Aktif',
    amount: 3500000,
  },
  {
    id: 'BEN010',
    employeeId: 'EMP005',
    employee: 'Dodi Hermawan',
    department: 'Catering Services',
    benefitType: 'Health Insurance',
    provider: 'PT Asuransi Kesehatan Indonesia',
    startDate: '2025-04-01',
    endDate: null,
    status: 'Aktif',
  },
];

// Insurance Policies
export const insurancePolicies: InsurancePolicy[] = [
  {
    id: 'INS001',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    policyNumber: 'POL-2025-001',
    provider: 'PT Asuransi Kesehatan Indonesia',
    policyType: 'Health',
    coverage: 'Outpatient + Inpatient + Surgery',
    monthlyPremium: 850000,
    issueDate: '2025-01-15',
    expiryDate: '2026-01-14',
    status: 'Aktif',
    dependents: 2,
    claimLimit: 500000000,
  },
  {
    id: 'INS002',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    policyNumber: 'POL-2025-002',
    provider: 'PT Asuransi Jiwa Bersama',
    policyType: 'Life',
    coverage: '500% of annual salary',
    monthlyPremium: 125000,
    issueDate: '2025-01-15',
    expiryDate: '2026-01-14',
    status: 'Aktif',
    dependents: 0,
    claimLimit: 2500000000,
  },
  {
    id: 'INS003',
    employeeId: 'EMP002',
    employee: 'Siti Nurhaliza',
    policyNumber: 'POL-2025-003',
    provider: 'PT Asuransi Kesehatan Indonesia',
    policyType: 'Health',
    coverage: 'Outpatient + Inpatient',
    monthlyPremium: 650000,
    issueDate: '2024-06-01',
    expiryDate: '2026-05-31',
    status: 'Aktif',
    dependents: 1,
    claimLimit: 300000000,
  },
  {
    id: 'INS004',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    policyNumber: 'POL-2025-004',
    provider: 'PT Asuransi Kesehatan Indonesia',
    policyType: 'Health',
    coverage: 'Comprehensive + Dental',
    monthlyPremium: 950000,
    issueDate: '2025-02-01',
    expiryDate: '2026-07-31',
    status: 'Aktif',
    dependents: 0,
    claimLimit: 600000000,
  },
  {
    id: 'INS005',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    policyNumber: 'POL-2025-005',
    provider: 'PT Asuransi Kerja Profesional',
    policyType: 'Accident',
    coverage: 'On-site + Off-site coverage',
    monthlyPremium: 200000,
    issueDate: '2025-02-01',
    expiryDate: '2026-01-31',
    status: 'Aktif',
    dependents: 0,
    claimLimit: 1000000000,
  },
  {
    id: 'INS006',
    employeeId: 'EMP004',
    employee: 'Rini Kusuma',
    policyNumber: 'POL-2025-006',
    provider: 'PT Asuransi Kesehatan Indonesia',
    policyType: 'Health',
    coverage: 'Comprehensive + Preventive Care',
    monthlyPremium: 900000,
    issueDate: '2025-03-15',
    expiryDate: '2026-08-31',
    status: 'Aktif',
    dependents: 3,
    claimLimit: 800000000,
  },
];

// Insurance Dependents
export const insuranceDependents: InsuranceDependent[] = [
  {
    id: 'DEP001',
    policyId: 'INS001',
    name: 'Ratna Wijaya',
    relationship: 'Spouse',
    dateOfBirth: '1988-05-12',
    covered: true,
  },
  {
    id: 'DEP002',
    policyId: 'INS001',
    name: 'Dini Wijaya',
    relationship: 'Child',
    dateOfBirth: '2012-03-20',
    covered: true,
  },
  {
    id: 'DEP003',
    policyId: 'INS003',
    name: 'Eka Nurhaliza',
    relationship: 'Child',
    dateOfBirth: '2015-07-08',
    covered: true,
  },
  {
    id: 'DEP004',
    policyId: 'INS006',
    name: 'Bambang Kusuma',
    relationship: 'Spouse',
    dateOfBirth: '1986-11-25',
    covered: true,
  },
  {
    id: 'DEP005',
    policyId: 'INS006',
    name: 'Adit Kusuma',
    relationship: 'Child',
    dateOfBirth: '2010-02-14',
    covered: true,
  },
  {
    id: 'DEP006',
    policyId: 'INS006',
    name: 'Bella Kusuma',
    relationship: 'Child',
    dateOfBirth: '2014-06-18',
    covered: true,
  },
];

// Medical Records
export const medicalRecords: MedicalRecord[] = [
  {
    id: 'MED001',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    department: 'Operations - MIGAS',
    medicalType: 'MCU',
    provider: 'Klinik Kesehatan Kerja Jakarta',
    issueDate: '2025-06-15',
    expiryDate: '2026-06-14',
    result: 'Fit',
    status: 'Selesai',
    doctorNotes: 'All parameters within normal range. Fit for offshore operations.',
    attachments: 3,
  },
  {
    id: 'MED002',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    department: 'Operations - MIGAS',
    medicalType: 'Vaccination',
    provider: 'Klinik Kesehatan Kerja Jakarta',
    issueDate: '2025-12-01',
    expiryDate: '2026-12-01',
    result: 'Fit',
    status: 'Selesai',
    attachments: 1,
  },
  {
    id: 'MED003',
    employeeId: 'EMP002',
    employee: 'Siti Nurhaliza',
    department: 'HR Administration',
    medicalType: 'MCU',
    provider: 'Rumah Sakit Mitra Kesehatan',
    issueDate: '2025-07-20',
    expiryDate: '2026-07-19',
    result: 'Fit',
    status: 'Selesai',
    attachments: 3,
  },
  {
    id: 'MED004',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    department: 'Facility Management',
    medicalType: 'MCU',
    provider: 'Klinik Kesehatan Kerja Jakarta',
    issueDate: '2025-05-10',
    expiryDate: '2026-05-09',
    result: 'Fit',
    status: 'Selesai',
    doctorNotes: 'Slight elevation in cholesterol. Recommend dietary modification.',
    attachments: 3,
  },
  {
    id: 'MED005',
    employeeId: 'EMP004',
    employee: 'Rini Kusuma',
    department: 'Operations - Mining',
    medicalType: 'MCU',
    provider: 'Klinik Pertambangan Profesional',
    issueDate: '2025-08-05',
    expiryDate: '2026-08-04',
    result: 'Fit',
    status: 'Selesai',
    doctorNotes: 'Fit for mining operations. HSE clearance granted.',
    attachments: 4,
  },
  {
    id: 'MED006',
    employeeId: 'EMP005',
    employee: 'Dodi Hermawan',
    department: 'Catering Services',
    medicalType: 'MCU',
    provider: 'Klinik Kesehatan Kerja Jakarta',
    issueDate: '2024-09-12',
    expiryDate: '2025-09-11',
    result: 'Fit',
    status: 'Kedaluwarsa',
    attachments: 3,
  },
  {
    id: 'MED007',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    department: 'Operations - MIGAS',
    medicalType: 'Health Check',
    provider: 'Klinik Kesehatan Kerja Jakarta',
    issueDate: '2026-06-20',
    expiryDate: '2027-06-19',
    result: 'Menunggu',
    status: 'Dijadwalkan',
    attachments: 0,
  },
];

// Claims
export const claims: Claim[] = [
  {
    id: 'CLM001',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    claimType: 'Medical - Hospitalization',
    amount: 15000000,
    submissionDate: '2026-05-15',
    status: 'Approved',
    approver: 'Eka Puspita (HR Manager)',
    approvalDate: '2026-05-20',
    documents: 6,
    processingTime: 5,
  },
  {
    id: 'CLM002',
    employeeId: 'EMP002',
    employee: 'Siti Nurhaliza',
    claimType: 'Medical - Outpatient',
    amount: 3500000,
    submissionDate: '2026-06-10',
    status: 'Approved',
    approver: 'Eka Puspita (HR Manager)',
    approvalDate: '2026-06-12',
    documents: 4,
    processingTime: 2,
  },
  {
    id: 'CLM003',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    claimType: 'Accident Insurance',
    amount: 5000000,
    submissionDate: '2026-06-15',
    status: 'Processing',
    approver: 'Eka Puspita (HR Manager)',
    documents: 8,
  },
  {
    id: 'CLM004',
    employeeId: 'EMP004',
    employee: 'Rini Kusuma',
    claimType: 'Medical - Dental',
    amount: 2000000,
    submissionDate: '2026-06-18',
    status: 'Menunggu',
    approver: 'Eka Puspita (HR Manager)',
    documents: 3,
  },
  {
    id: 'CLM005',
    employeeId: 'EMP005',
    employee: 'Dodi Hermawan',
    claimType: 'Medical - Outpatient',
    amount: 1500000,
    submissionDate: '2026-06-20',
    status: 'Ditolak',
    approver: 'Eka Puspita (HR Manager)',
    rejectionReason: 'Claim exceeds policy limits for outpatient treatment.',
    approvalDate: '2026-06-22',
    documents: 2,
    processingTime: 2,
  },
  {
    id: 'CLM006',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    claimType: 'Medical - Preventive Care',
    amount: 800000,
    submissionDate: '2026-06-22',
    status: 'Menunggu',
    approver: 'Eka Puspita (HR Manager)',
    documents: 2,
  },
];

// Employee Welfare Programs
export const welfarePrograms: EmployeeWelfareProgram[] = [
  {
    id: 'WEL001',
    name: 'Emergency Financial Assistance',
    category: 'Assistance',
    description: 'Quick financial aid for employees facing unexpected emergencies',
    eligibility: 'Permanent employees with 6+ months tenure',
    budget: 500000000,
    participants: 45,
    provider: 'PT Indocater HR Department',
    status: 'Aktif',
  },
  {
    id: 'WEL002',
    name: 'Fitness & Wellness Program',
    category: 'Wellness',
    description: 'Gym membership and health monitoring for all employees',
    eligibility: 'All permanent employees',
    budget: 300000000,
    participants: 156,
    provider: 'Elite Fitness Centers',
    status: 'Aktif',
  },
  {
    id: 'WEL003',
    name: 'Company Housing Support',
    category: 'Housing',
    description: 'Subsidized housing for employees on assignment',
    eligibility: 'Operational staff on projects',
    budget: 1200000000,
    participants: 89,
    provider: 'PT Indocater Real Estate',
    status: 'Aktif',
  },
  {
    id: 'WEL004',
    name: 'Transportation Shuttle Service',
    category: 'Transportation',
    description: 'Free shuttle service for office employees',
    eligibility: 'Office staff in Jakarta',
    budget: 450000000,
    participants: 78,
    provider: 'PT Indocater Transport',
    status: 'Aktif',
  },
  {
    id: 'WEL005',
    name: 'Employee Meal Vouchers',
    category: 'Meal',
    description: 'Daily meal vouchers for site employees',
    eligibility: 'All operational staff',
    budget: 800000000,
    participants: 234,
    provider: 'PT Indocater Catering',
    status: 'Aktif',
  },
  {
    id: 'WEL006',
    name: 'Family Health Insurance',
    category: 'Family',
    description: 'Extended health coverage for employee families',
    eligibility: 'Permanent employees with dependents',
    budget: 600000000,
    participants: 123,
    provider: 'PT Asuransi Kesehatan Indonesia',
    status: 'Aktif',
  },
  {
    id: 'WEL007',
    name: 'Employee Recognition Awards',
    category: 'Recognition',
    description: 'Monthly and annual recognition for outstanding performance',
    eligibility: 'All employees',
    budget: 200000000,
    participants: 234,
    provider: 'PT Indocater HR Department',
    status: 'Aktif',
  },
  {
    id: 'WEL008',
    name: 'Mental Health Support Program',
    category: 'Wellness',
    description: 'Counseling and mental health support services',
    eligibility: 'All employees',
    budget: 150000000,
    participants: 34,
    provider: 'Professional Counseling Services',
    status: 'Aktif',
  },
];

// Payroll Ready Information
export const payrollReady: PayrollReady[] = [
  {
    id: 'PAY001',
    employeeId: 'EMP001',
    employee: 'Ahmad Wijaya',
    department: 'Operations - MIGAS',
    position: 'Senior Operator',
    salaryGrade: 'Grade 4',
    basicSalary: 12000000,
    allowances: {
      transportation: 1200000,
      meal: 800000,
      accommodation: 3000000,
      operational: 2000000,
      project: 5000000,
    },
    deductions: {
      bpjs: 1080000,
      tax: 1200000,
    },
    bankAccount: '1234567890',
    bankName: 'Bank Mandiri',
    employmentType: 'Permanent',
    payrollIntegrationStatus: 'Ready',
  },
  {
    id: 'PAY002',
    employeeId: 'EMP002',
    employee: 'Siti Nurhaliza',
    department: 'HR Administration',
    position: 'HR Officer',
    salaryGrade: 'Grade 2',
    basicSalary: 7500000,
    allowances: {
      transportation: 1200000,
      meal: 600000,
      accommodation: 0,
      operational: 0,
    },
    deductions: {
      bpjs: 675000,
      tax: 600000,
    },
    bankAccount: '0987654321',
    bankName: 'Bank BCA',
    employmentType: 'Permanent',
    payrollIntegrationStatus: 'Ready',
  },
  {
    id: 'PAY003',
    employeeId: 'EMP003',
    employee: 'Budi Santoso',
    department: 'Facility Management',
    position: 'Facility Manager',
    salaryGrade: 'Grade 3',
    basicSalary: 9500000,
    allowances: {
      transportation: 1000000,
      meal: 750000,
      accommodation: 2000000,
      operational: 1500000,
    },
    deductions: {
      bpjs: 855000,
      tax: 800000,
    },
    bankAccount: '5555666677',
    bankName: 'Bank BNI',
    employmentType: 'Permanent',
    payrollIntegrationStatus: 'Ready',
  },
  {
    id: 'PAY004',
    employeeId: 'EMP004',
    employee: 'Rini Kusuma',
    department: 'Operations - Mining',
    position: 'Mining Supervisor',
    salaryGrade: 'Grade 4',
    basicSalary: 11000000,
    allowances: {
      transportation: 1200000,
      meal: 800000,
      accommodation: 2500000,
      operational: 2500000,
      project: 4000000,
    },
    deductions: {
      bpjs: 990000,
      tax: 1100000,
    },
    bankAccount: '8888999900',
    bankName: 'Bank Mandiri',
    employmentType: 'Permanent',
    payrollIntegrationStatus: 'Ready',
  },
  {
    id: 'PAY005',
    employeeId: 'EMP005',
    employee: 'Dodi Hermawan',
    department: 'Catering Services',
    position: 'Head Chef',
    salaryGrade: 'Grade 3',
    basicSalary: 8500000,
    allowances: {
      transportation: 1000000,
      meal: 500000,
      accommodation: 1500000,
      operational: 0,
    },
    deductions: {
      bpjs: 765000,
      tax: 680000,
    },
    bankAccount: '1111222233',
    bankName: 'Bank Permata',
    employmentType: 'Permanent',
    payrollIntegrationStatus: 'Ready',
  },
];

// Analytics Data
export const benefitDistributionData = [
  { name: 'Health Insurance', value: 89, fill: '#0ea5e9' },
  { name: 'Transportation', value: 156, fill: '#06b6d4' },
  { name: 'Meal Allowance', value: 234, fill: '#10b981' },
  { name: 'Project Allowance', value: 78, fill: '#f59e0b' },
  { name: 'Accommodation', value: 112, fill: '#8b5cf6' },
  { name: 'Other Benefits', value: 45, fill: '#ef4444' },
];

export const insuranceCoverageData = [
  { name: 'Health', active: 234, expired: 2, pending: 3 },
  { name: 'Life', active: 156, expired: 0, pending: 1 },
  { name: 'Accident', active: 89, expired: 1, pending: 0 },
  { name: 'Disability', active: 45, expired: 0, pending: 2 },
];

export const medicalComplianceData = [
  { month: 'Jan', completed: 45, overdue: 2, scheduled: 8 },
  { month: 'Feb', completed: 52, overdue: 3, scheduled: 5 },
  { month: 'Mar', completed: 48, overdue: 1, scheduled: 7 },
  { month: 'Apr', completed: 61, overdue: 2, scheduled: 4 },
  { month: 'May', completed: 58, overdue: 4, scheduled: 6 },
  { month: 'Jun', completed: 67, overdue: 3, scheduled: 9 },
];

export const claimTrendData = [
  { month: 'Jan', submitted: 8, approved: 6, rejected: 1, processing: 1 },
  { month: 'Feb', submitted: 10, approved: 8, rejected: 1, processing: 1 },
  { month: 'Mar', submitted: 12, approved: 10, rejected: 1, processing: 1 },
  { month: 'Apr', submitted: 9, approved: 7, rejected: 1, processing: 1 },
  { month: 'May', submitted: 14, approved: 12, rejected: 2, processing: 0 },
  { month: 'Jun', submitted: 11, approved: 8, rejected: 1, processing: 2 },
];

export const departmentComparisonData = [
  { department: 'Operations - MIGAS', employees: 123, benefitValue: 2850000000, coverage: 98 },
  { department: 'Operations - Mining', employees: 89, benefitValue: 1940000000, coverage: 96 },
  { department: 'Facility Management', employees: 67, benefitValue: 1250000000, coverage: 95 },
  { department: 'HR Administration', employees: 45, benefitValue: 850000000, coverage: 100 },
  { department: 'Catering Services', employees: 156, benefitValue: 2100000000, coverage: 92 },
];

export const compensationKpi: CompensationKpi = {
  employeesCovered: 689,
  activeInsurance: 524,
  medicalDue: 3,
  claimsPending: 4,
  benefitUtilization: 87,
  certificatesExpiring: 6,
};
