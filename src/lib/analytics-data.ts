// Executive Dashboard KPIs
export const executiveKpi = {
  totalEmployees: 285,
  headcountGrowth: 12,
  attendanceRate: 94.2,
  turnoverRate: 2.1,
  trainingCompliance: 87.5,
  medicalCompliance: 91.3,
  benefitCoverage: 96.8,
  recruitmentSuccess: 78.5,
};

// Workforce Trend Data
export const workforceTrendData = [
  { month: 'Jan', headcount: 245, hired: 8, departed: 2 },
  { month: 'Feb', headcount: 251, hired: 6, departed: 0 },
  { month: 'Mar', headcount: 259, hired: 12, departed: 4 },
  { month: 'Apr', headcount: 268, hired: 14, departed: 5 },
  { month: 'May', headcount: 277, hired: 12, departed: 3 },
  { month: 'Jun', headcount: 285, hired: 10, departed: 2 },
];

// Hiring Trend Data
export const hiringTrendData = [
  { month: 'Jan', applications: 45, interviews: 18, offers: 8, hired: 6 },
  { month: 'Feb', applications: 38, interviews: 15, offers: 7, hired: 6 },
  { month: 'Mar', applications: 62, interviews: 24, offers: 14, hired: 12 },
  { month: 'Apr', applications: 78, interviews: 32, offers: 16, hired: 14 },
  { month: 'May', applications: 68, interviews: 28, offers: 13, hired: 12 },
  { month: 'Jun', applications: 55, interviews: 22, offers: 11, hired: 10 },
];

// Turnover Trend Data
export const turnoverTrendData = [
  { month: 'Jan', turnover: 2.4, resigned: 2, terminated: 1, retired: 0 },
  { month: 'Feb', turnover: 1.8, resigned: 1, terminated: 0, retired: 0 },
  { month: 'Mar', turnover: 2.7, resigned: 3, terminated: 1, retired: 0 },
  { month: 'Apr', turnover: 2.2, resigned: 2, terminated: 2, retired: 1 },
  { month: 'May', turnover: 1.9, resigned: 2, terminated: 1, retired: 0 },
  { month: 'Jun', turnover: 2.1, resigned: 1, terminated: 1, retired: 0 },
];

// Department Growth Data
export const departmentGrowthData = [
  { department: 'Operations MIGAS', headcount: 85, growth: 8, target: 90 },
  { department: 'Mining', headcount: 72, growth: 6, target: 75 },
  { department: 'HR & Recruitment', headcount: 28, growth: 2, target: 30 },
  { department: 'Facilities Management', headcount: 45, growth: 4, target: 45 },
  { department: 'Catering Services', headcount: 35, growth: 3, target: 40 },
  { department: 'Finance', headcount: 20, growth: 1, target: 22 },
];

// Training Completion Data
export const trainingCompletionData = [
  { month: 'Jan', completed: 72, pending: 28, overdue: 12 },
  { month: 'Feb', completed: 78, pending: 22, overdue: 8 },
  { month: 'Mar', completed: 85, pending: 15, overdue: 5 },
  { month: 'Apr', completed: 89, pending: 11, overdue: 3 },
  { month: 'May', completed: 87, pending: 13, overdue: 4 },
  { month: 'Jun', completed: 88, pending: 12, overdue: 2 },
];

// Leave Trend Data
export const leaveTrendData = [
  { month: 'Jan', approved: 45, pending: 8, days: 156 },
  { month: 'Feb', approved: 38, pending: 12, days: 132 },
  { month: 'Mar', approved: 52, pending: 6, days: 180 },
  { month: 'Apr', approved: 48, pending: 10, days: 166 },
  { month: 'May', approved: 55, pending: 14, days: 190 },
  { month: 'Jun', approved: 42, pending: 9, days: 145 },
];

// Attendance Trend Data
export const attendanceTrendData = [
  { month: 'Jan', present: 92.1, absent: 4.2, late: 3.7 },
  { month: 'Feb', present: 93.2, absent: 3.8, late: 3.0 },
  { month: 'Mar', present: 94.1, absent: 3.2, late: 2.7 },
  { month: 'Apr', present: 95.3, absent: 2.8, late: 1.9 },
  { month: 'May', present: 94.5, absent: 3.1, late: 2.4 },
  { month: 'Jun', present: 94.2, absent: 3.5, late: 2.3 },
];

// Workforce Demographics
export const ageDistribution = [
  { age: '18-25', count: 32, percentage: 11.2 },
  { age: '26-35', count: 98, percentage: 34.4 },
  { age: '36-45', count: 87, percentage: 30.5 },
  { age: '46-55', count: 52, percentage: 18.2 },
  { age: '56+', count: 16, percentage: 5.6 },
];

export const genderDistribution = [
  { gender: 'Male', count: 198, percentage: 69.5 },
  { gender: 'Female', count: 87, percentage: 30.5 },
];

// Years of Service Distribution
export const yearsOfServiceData = [
  { range: '0-1 years', count: 45, percentage: 15.8 },
  { range: '1-3 years', count: 78, percentage: 27.4 },
  { range: '3-5 years', count: 94, percentage: 33.0 },
  { range: '5-10 years', count: 52, percentage: 18.2 },
  { range: '10+ years', count: 16, percentage: 5.6 },
];

// Attendance Heatmap Data (by department)
export const attendanceHeatmapData = [
  { department: 'Operations MIGAS', weekAvg: 94.8, absenceRate: 2.1, lateRate: 3.1 },
  { department: 'Mining', weekAvg: 93.2, absenceRate: 3.8, lateRate: 3.0 },
  { department: 'HR & Recruitment', weekAvg: 96.5, absenceRate: 1.2, lateRate: 2.3 },
  { department: 'Facilities Management', weekAvg: 92.1, absenceRate: 4.5, lateRate: 3.4 },
  { department: 'Catering Services', weekAvg: 91.8, absenceRate: 4.8, lateRate: 3.4 },
  { department: 'Finance', weekAvg: 97.3, absenceRate: 1.0, lateRate: 1.7 },
];

// Late Trend Data
export const lateTrendData = [
  { date: 'Mon', incidents: 8, percentage: 2.8 },
  { date: 'Tue', incidents: 6, percentage: 2.1 },
  { date: 'Wed', incidents: 5, percentage: 1.8 },
  { date: 'Thu', incidents: 7, percentage: 2.5 },
  { date: 'Fri', incidents: 12, percentage: 4.2 },
  { date: 'Sat', incidents: 3, percentage: 1.1 },
];

// Overtime Trend Data
export const overtimeTrendData = [
  { week: 'Week 1', hours: 245, employees: 58, avgPerEmployee: 4.2 },
  { week: 'Week 2', hours: 268, employees: 64, avgPerEmployee: 4.2 },
  { week: 'Week 3', hours: 289, employees: 71, avgPerEmployee: 4.1 },
  { week: 'Week 4', hours: 312, employees: 78, avgPerEmployee: 4.0 },
];

// Leave Balance Data
export const leaveBalanceData = [
  { leaveType: 'Annual', total: 12, used: 3.2, balance: 8.8, employees: 285 },
  { leaveType: 'Sick', total: 10, used: 2.1, balance: 7.9, employees: 285 },
  { leaveType: 'Unpaid', total: 0, used: 0.5, balance: -0.5, employees: 45 },
  { leaveType: 'Bereavement', total: 5, used: 0.2, balance: 4.8, employees: 285 },
];

// Leave Type Distribution
export const leaveTypeDistribution = [
  { type: 'Annual', count: 95, percentage: 58.6, color: '#0ea5e9' },
  { type: 'Sick', count: 42, percentage: 25.9, color: '#f97316' },
  { type: 'Unpaid', count: 15, percentage: 9.3, color: '#8b5cf6' },
  { type: 'Bereavement', count: 10, percentage: 6.2, color: '#ef4444' },
];

// Training Mandatory Completion
export const mandatoryTrainingData = [
  { training: 'Safety & HSE', completed: 267, pending: 18, compliance: 93.7 },
  { training: 'Ethics & Compliance', completed: 285, pending: 0, compliance: 100.0 },
  { training: 'Data Privacy', completed: 249, pending: 36, compliance: 87.4 },
  { training: 'ISO 14001', completed: 245, pending: 40, compliance: 85.9 },
];

// Expired Certificates
export const expiredCertificatesData = [
  { certificate: 'First Aid', expired: 12, expiringSoon: 8, active: 265 },
  { certificate: 'Fire Safety', expired: 5, expiringSoon: 15, active: 265 },
  { certificate: 'Equipment Operation', expired: 8, expiringSoon: 22, active: 255 },
  { certificate: 'HSSE Induction', expired: 3, expiringSoon: 10, active: 272 },
];

// Competency Matrix
export const competencyMatrixData = [
  { competency: 'Safety Awareness', level: 'Advanced', employees: 215 },
  { competency: 'Technical Skills', level: 'Intermediate', employees: 189 },
  { competency: 'Leadership', level: 'Beginner', employees: 58 },
  { competency: 'Communication', level: 'Advanced', employees: 178 },
];

// Compensation Analytics
export const benefitUsageData = [
  { benefit: 'Health Insurance', usage: 78, coverage: 285 },
  { benefit: 'Life Insurance', usage: 89, coverage: 285 },
  { benefit: 'Dental', usage: 42, coverage: 285 },
  { benefit: 'Vision', usage: 35, coverage: 285 },
];

export const insuranceCoverageAnalyticsData = [
  { type: 'Health', total: 285, active: 278, expiring: 7 },
  { type: 'Life', total: 285, active: 285, expiring: 0 },
  { type: 'Accident', total: 245, active: 240, expiring: 5 },
  { type: 'Disability', total: 189, active: 185, expiring: 4 },
];

export const claimStatisticsData = [
  { status: 'Approved', count: 142, amount: 1850000000 },
  { status: 'Pending', count: 28, amount: 450000000 },
  { status: 'Processing', count: 15, amount: 280000000 },
  { status: 'Rejected', count: 8, amount: 120000000 },
];

export const allowanceDistributionData = [
  { allowance: 'Transportation', employees: 245, percentage: 86 },
  { allowance: 'Meals', employees: 285, percentage: 100 },
  { allowance: 'Accommodation', employees: 145, percentage: 51 },
  { allowance: 'Operational', employees: 98, percentage: 34 },
];

// Recruitment Analytics
export const hiringFunnelData = [
  { stage: 'Applications', count: 346, percentage: 100 },
  { stage: 'Screening', count: 139, percentage: 40.2 },
  { stage: 'Interviews', count: 73, percentage: 21.1 },
  { stage: 'Offers', count: 42, percentage: 12.1 },
  { stage: 'Hired', count: 36, percentage: 10.4 },
];

export const timeToHireData = [
  { month: 'Jan', days: 34, offers: 8 },
  { month: 'Feb', days: 31, offers: 7 },
  { month: 'Mar', days: 28, offers: 14 },
  { month: 'Apr', days: 26, offers: 16 },
  { month: 'May', days: 29, offers: 13 },
  { month: 'Jun', days: 31, offers: 11 },
];

export const offerAcceptanceData = [
  { month: 'Jan', offers: 8, accepted: 6, declined: 2, acceptanceRate: 75 },
  { month: 'Feb', offers: 7, accepted: 6, declined: 1, acceptanceRate: 86 },
  { month: 'Mar', offers: 14, accepted: 12, declined: 2, acceptanceRate: 86 },
  { month: 'Apr', offers: 16, accepted: 14, declined: 2, acceptanceRate: 88 },
  { month: 'May', offers: 13, accepted: 12, declined: 1, acceptanceRate: 92 },
  { month: 'Jun', offers: 11, accepted: 10, declined: 1, acceptanceRate: 91 },
];

export const interviewSuccessData = [
  { interviewer: 'All', successRate: 52.1, interviews: 139 },
  { interviewer: 'HR Team', successRate: 58.3, interviews: 72 },
  { interviewer: 'Department Heads', successRate: 45.2, interviews: 67 },
];

export const vacancyStatusData = [
  { position: 'Operations Manager', status: 'Open', applications: 28, posted: '2 weeks ago' },
  { position: 'Safety Officer', status: 'Open', applications: 15, posted: '1 week ago' },
  { position: 'Maintenance Technician', status: 'In Progress', applications: 34, posted: '3 weeks ago' },
  { position: 'Data Analyst', status: 'Closed', applications: 42, posted: '1 month ago' },
];

// Compliance Analytics
export const medicalExpiryData = [
  { description: 'Expiring This Month', count: 12, level: 'critical' },
  { description: 'Expiring Next Month', count: 28, level: 'warning' },
  { description: 'Expiring in 60 Days', count: 45, level: 'info' },
  { description: 'Current & Valid', count: 200, level: 'success' },
];

export const certificateExpiryData = [
  { description: 'Expired', count: 28, level: 'critical' },
  { description: 'Expiring This Month', count: 15, level: 'warning' },
  { description: 'Expiring Next Month', count: 22, level: 'warning' },
  { description: 'Current & Valid', count: 220, level: 'success' },
];

export const complianceRateData = [
  { item: 'Medical Compliance', rate: 91.3, target: 95 },
  { item: 'Training Compliance', rate: 87.5, target: 90 },
  { item: 'Safety Compliance', rate: 94.0, target: 98 },
  { item: 'Documentation', rate: 88.8, target: 95 },
];

export const missingRequirementsData = [
  { requirement: 'Medical Clearance', missing: 18, department: 'Operations' },
  { requirement: 'Safety Induction', missing: 12, department: 'Mining' },
  { requirement: 'HSSE Certification', missing: 25, department: 'Multi' },
  { requirement: 'Background Check', missing: 5, department: 'HR' },
];

// Department Comparison Data
export const departmentComparisonData = [
  { 
    department: 'Operations MIGAS', 
    headcount: 85, 
    avgSalary: 12500000, 
    turnover: 1.2, 
    attendance: 94.8,
    training: 91,
  },
  { 
    department: 'Mining', 
    headcount: 72, 
    avgSalary: 14200000, 
    turnover: 2.8, 
    attendance: 93.2,
    training: 85,
  },
  { 
    department: 'HR & Recruitment', 
    headcount: 28, 
    avgSalary: 9800000, 
    turnover: 0.0, 
    attendance: 96.5,
    training: 95,
  },
  { 
    department: 'Facilities Management', 
    headcount: 45, 
    avgSalary: 8500000, 
    turnover: 3.3, 
    attendance: 92.1,
    training: 82,
  },
  { 
    department: 'Catering Services', 
    headcount: 35, 
    avgSalary: 7200000, 
    turnover: 4.2, 
    attendance: 91.8,
    training: 78,
  },
  { 
    department: 'Finance', 
    headcount: 20, 
    avgSalary: 11500000, 
    turnover: 0.0, 
    attendance: 97.3,
    training: 98,
  },
];
