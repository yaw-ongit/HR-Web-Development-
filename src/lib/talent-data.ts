export type Candidate = {
  id: string;
  name: string;
  position: string;
  department: string;
  stage: 'New' | 'Screening' | 'Qualified' | 'Rejected';
  appliedDate: string;
  email: string;
  phone: string;
};

export type Interview = {
  id: string;
  candidate: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  type: 'Phone Screen' | 'Technical' | 'HR' | 'Final Round';
  status: 'Scheduled' | 'Completed' | 'Pending';
  feedback: string;
};

export type HiringRecord = {
  id: string;
  candidate: string;
  position: string;
  hireDate: string;
  department: string;
  manager: string;
  salaryBand: string;
  status: 'Offer Extended' | 'Accepted' | 'Rejected' | 'Onboarding';
};

export type OnboardingTask = {
  id: string;
  employee: string;
  task: string;
  category: 'IT' | 'HR' | 'Facility' | 'Training' | 'Documentation';
  dueDate: string;
  completionDate?: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
};

export type TrainingProgram = {
  id: string;
  employee: string;
  program: string;
  startDate: string;
  endDate: string;
  provider: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  progress: number;
};

export type Certification = {
  id: string;
  employee: string;
  certification: string;
  issuedDate: string;
  expiryDate: string;
  issuer: string;
  credentialId: string;
  status: 'Active' | 'Expiring' | 'Expired';
};

export type CompetencyRecord = {
  id: string;
  employee: string;
  competency: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  assessmentDate: string;
  assessor: string;
  nextReviewDate: string;
};

export type TalentKpi = {
  label: string;
  value: string;
  note: string;
};

export const talentKpis: TalentKpi[] = [
  { label: 'Open Positions', value: '12', note: 'Active requisitions' },
  { label: 'Pipeline Candidates', value: '84', note: 'In process' },
  { label: 'Interviews This Week', value: '18', note: 'Scheduled' },
  { label: 'New Hires (30 days)', value: '6', note: 'Onboarded' },
  { label: 'Onboarding Active', value: '4', note: 'In progress' },
  { label: 'Training Programs', value: '28', note: 'Active enrollments' },
  { label: 'Certifications Current', value: '156', note: 'Active' },
];

export const candidates: Candidate[] = [
  { id: 'c1', name: 'Sarah Chen', position: 'Senior Engineer', department: 'Engineering', stage: 'Qualified', appliedDate: '2026-05-15', email: 'sarah.chen@email.com', phone: '+1-555-0101' },
  { id: 'c2', name: 'Marcus Johnson', position: 'Product Manager', department: 'Product', stage: 'Screening', appliedDate: '2026-06-01', email: 'marcus.j@email.com', phone: '+1-555-0102' },
  { id: 'c3', name: 'Elena Rodriguez', position: 'Sales Director', department: 'Sales', stage: 'New', appliedDate: '2026-06-20', email: 'elena.r@email.com', phone: '+1-555-0103' },
  { id: 'c4', name: 'David Park', position: 'Data Scientist', department: 'Analytics', stage: 'Qualified', appliedDate: '2026-05-28', email: 'david.park@email.com', phone: '+1-555-0104' },
  { id: 'c5', name: 'Jessica Smith', position: 'Finance Manager', department: 'Finance', stage: 'Rejected', appliedDate: '2026-04-10', email: 'jessica.s@email.com', phone: '+1-555-0105' },
];

export const interviews: Interview[] = [
  { id: 'i1', candidate: 'Sarah Chen', position: 'Senior Engineer', interviewer: 'Leo Hunter', date: '2026-06-25', time: '10:00 AM', type: 'Technical', status: 'Scheduled', feedback: '' },
  { id: 'i2', candidate: 'Marcus Johnson', position: 'Product Manager', interviewer: 'Zoe Kim', date: '2026-06-24', time: '02:00 PM', type: 'Final Round', status: 'Completed', feedback: 'Strong strategic thinking, excellent communication skills.' },
  { id: 'i3', candidate: 'David Park', position: 'Data Scientist', interviewer: 'Noah Brooks', date: '2026-06-26', time: '11:00 AM', type: 'Phone Screen', status: 'Pending', feedback: '' },
  { id: 'i4', candidate: 'Sarah Chen', position: 'Senior Engineer', interviewer: 'Avery Patel', date: '2026-06-20', time: '03:00 PM', type: 'HR', status: 'Completed', feedback: 'Cultural fit excellent, compensation expectations align.' },
];

export const hiring: HiringRecord[] = [
  { id: 'h1', candidate: 'Alex Thompson', position: 'Frontend Developer', hireDate: '2026-07-15', department: 'Engineering', manager: 'Leo Hunter', salaryBand: 'Senior IC', status: 'Offer Extended' },
  { id: 'h2', candidate: 'Casey Williams', position: 'UX Designer', hireDate: '2026-07-08', department: 'Product', manager: 'Zoe Kim', salaryBand: 'Mid IC', status: 'Accepted' },
  { id: 'h3', candidate: 'Jordan Martinez', position: 'Customer Success Lead', hireDate: '2026-06-30', department: 'Customer Success', manager: 'Maya Thompson', salaryBand: 'Lead', status: 'Onboarding' },
];

export const onboardingTasks: OnboardingTask[] = [
  { id: 'o1', employee: 'Jordan Martinez', task: 'IT Setup - Laptop & Accounts', category: 'IT', dueDate: '2026-06-28', completionDate: '2026-06-27', assignedTo: 'Noah Brooks', status: 'Completed' },
  { id: 'o2', employee: 'Jordan Martinez', task: 'Complete Orientation Training', category: 'Training', dueDate: '2026-07-02', assignedTo: 'Maya Thompson', status: 'In Progress' },
  { id: 'o3', employee: 'Jordan Martinez', task: 'Security & Compliance Certification', category: 'Documentation', dueDate: '2026-07-05', assignedTo: 'Emily Wong', status: 'Pending' },
  { id: 'o4', employee: 'Jordan Martinez', task: 'Office Access & Facilities', category: 'Facility', dueDate: '2026-06-29', assignedTo: 'June Martinez', status: 'Completed' },
  { id: 'o5', employee: 'Casey Williams', task: 'IT Setup - Laptop & Accounts', category: 'IT', dueDate: '2026-07-06', assignedTo: 'Noah Brooks', status: 'Pending' },
];

export const trainingPrograms: TrainingProgram[] = [
  { id: 't1', employee: 'Jordan Martinez', program: 'Customer Success Fundamentals', startDate: '2026-07-01', endDate: '2026-07-15', provider: 'Internal Learning', status: 'Scheduled', progress: 0 },
  { id: 't2', employee: 'Maya Thompson', program: 'Advanced Leadership Skills', startDate: '2026-06-10', endDate: '2026-07-10', provider: 'LinkedIn Learning', status: 'In Progress', progress: 60 },
  { id: 't3', employee: 'Leo Hunter', program: 'System Design Masterclass', startDate: '2026-05-20', endDate: '2026-06-30', provider: 'Coursera', status: 'In Progress', progress: 85 },
  { id: 't4', employee: 'Zoe Kim', program: 'Product Strategy & Roadmapping', startDate: '2026-03-01', endDate: '2026-06-01', provider: 'Maven', status: 'Completed', progress: 100 },
  { id: 't5', employee: 'Noah Brooks', program: 'Cloud Architecture on AWS', startDate: '2026-06-15', endDate: '2026-08-15', provider: 'AWS Training', status: 'In Progress', progress: 40 },
];

export const certifications: Certification[] = [
  { id: 'cert1', employee: 'Leo Hunter', certification: 'AWS Certified Solutions Architect', issuedDate: '2024-03-15', expiryDate: '2027-03-15', issuer: 'Amazon Web Services', credentialId: 'AWS-2024-001', status: 'Active' },
  { id: 'cert2', employee: 'Zoe Kim', certification: 'Certified Scrum Product Owner', issuedDate: '2023-11-20', expiryDate: '2026-11-20', issuer: 'Scrum Alliance', credentialId: 'CSPO-2023-042', status: 'Expiring' },
  { id: 'cert3', employee: 'Maya Thompson', certification: 'SHRM Certified Professional', issuedDate: '2022-05-10', expiryDate: '2026-05-10', issuer: 'SHRM', credentialId: 'SHRM-2022-156', status: 'Expired' },
  { id: 'cert4', employee: 'Noah Brooks', certification: 'Kubernetes Application Developer', issuedDate: '2024-08-15', expiryDate: '2027-08-15', issuer: 'Linux Foundation', credentialId: 'CKAD-2024-089', status: 'Active' },
  { id: 'cert5', employee: 'Emily Wong', certification: 'Google Cloud Associate Cloud Engineer', issuedDate: '2024-01-20', expiryDate: '2026-01-20', issuer: 'Google Cloud', credentialId: 'GCP-2024-033', status: 'Active' },
];

export const competencies: CompetencyRecord[] = [
  { id: 'comp1', employee: 'Leo Hunter', competency: 'System Design', level: 'Expert', assessmentDate: '2026-05-15', assessor: 'Avery Patel', nextReviewDate: '2026-11-15' },
  { id: 'comp2', employee: 'Zoe Kim', competency: 'Product Strategy', level: 'Advanced', assessmentDate: '2026-04-20', assessor: 'Noah Brooks', nextReviewDate: '2026-10-20' },
  { id: 'comp3', employee: 'Maya Thompson', competency: 'People Management', level: 'Expert', assessmentDate: '2026-03-10', assessor: 'Lia Chang', nextReviewDate: '2026-09-10' },
  { id: 'comp4', employee: 'Noah Brooks', competency: 'DevOps & Infrastructure', level: 'Advanced', assessmentDate: '2026-05-01', assessor: 'Emily Wong', nextReviewDate: '2026-11-01' },
  { id: 'comp5', employee: 'Emily Wong', competency: 'Cloud Architecture', level: 'Advanced', assessmentDate: '2026-06-05', assessor: 'Leo Hunter', nextReviewDate: '2026-12-05' },
  { id: 'comp6', employee: 'Avery Patel', competency: 'Sales Strategy', level: 'Expert', assessmentDate: '2026-04-15', assessor: 'Maya Thompson', nextReviewDate: '2026-10-15' },
];

export const candidatePipeline = [
  { stage: 'New', count: 24 },
  { stage: 'Screening', count: 18 },
  { stage: 'Qualified', count: 28 },
  { stage: 'Offer', count: 14 },
];

export const hiringFunnel = [
  { month: 'Jan', applied: 120, screened: 84, interviewed: 52, hired: 8 },
  { month: 'Feb', applied: 135, screened: 94, interviewed: 61, hired: 10 },
  { month: 'Mar', applied: 110, screened: 78, interviewed: 48, hired: 7 },
  { month: 'Apr', applied: 155, screened: 108, interviewed: 72, hired: 12 },
  { month: 'May', applied: 140, screened: 98, interviewed: 65, hired: 11 },
  { month: 'Jun', applied: 128, screened: 89, interviewed: 58, hired: 6 },
];

export const trainingProgress = [
  { month: 'Jan', enrolled: 45, completed: 18, inProgress: 22, dropout: 5 },
  { month: 'Feb', enrolled: 52, completed: 24, inProgress: 25, dropout: 3 },
  { month: 'Mar', enrolled: 48, completed: 20, inProgress: 24, dropout: 4 },
  { month: 'Apr', enrolled: 61, completed: 28, inProgress: 29, dropout: 4 },
  { month: 'May', enrolled: 58, completed: 26, inProgress: 28, dropout: 4 },
  { month: 'Jun', enrolled: 64, completed: 31, inProgress: 30, dropout: 3 },
];

export const competencyDistribution = [
  { name: 'Beginner', value: 24 },
  { name: 'Intermediate', value: 68 },
  { name: 'Advanced', value: 124 },
  { name: 'Expert', value: 42 },
];

export const departmentHiringTarget = [
  { name: 'Engineering', target: 18, actual: 14 },
  { name: 'Product', target: 6, actual: 5 },
  { name: 'Sales', target: 12, actual: 8 },
  { name: 'Customer Success', target: 8, actual: 6 },
  { name: 'Finance', target: 4, actual: 3 },
  { name: 'People Ops', target: 3, actual: 2 },
];
