export type Candidate = {
  id: string;
  name: string;
  position: string;
  department: string;
  stage: 'Baru' | 'Penyaringan' | 'Memenuhi Syarat' | 'Ditolak';
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
  type: 'Wawancara Telepon' | 'Teknis' | 'SDM' | 'Babak Final';
  status: 'Dijadwalkan' | 'Selesai' | 'Menunggu';
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
  status: 'Tawaran Diberikan' | 'Diterima' | 'Ditolak' | 'Onboarding';
};

export type OnboardingTask = {
  id: string;
  employee: string;
  task: string;
  category: 'IT' | 'SDM' | 'Facility' | 'Training' | 'Documentation';
  dueDate: string;
  completionDate?: string;
  assignedTo: string;
  status: 'Menunggu' | 'Sedang Berlangsung' | 'Selesai';
};

export type TrainingProgram = {
  id: string;
  employee: string;
  program: string;
  startDate: string;
  endDate: string;
  provider: string;
  status: 'Dijadwalkan' | 'Sedang Berlangsung' | 'Selesai' | 'Dibatalkan';
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
  status: 'Aktif' | 'Hampir Habis' | 'Kedaluwarsa';
};

export type CompetencyRecord = {
  id: string;
  employee: string;
  competency: string;
  level: 'Pemula' | 'Menengah' | 'Mahir' | 'Ahli';
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
  { label: 'Posisi Terbuka', value: '12', note: 'Permintaan aktif' },
  { label: 'Kandidat Pipeline', value: '84', note: 'Dalam proses' },
  { label: 'Wawancara Minggu Ini', value: '18', note: 'Dijadwalkan' },
  { label: 'Karyawan Baru (30 hari)', value: '6', note: 'Telah Onboarding' },
  { label: 'Onboarding Aktif', value: '4', note: 'In progress' },
  { label: 'Program Pelatihan', value: '28', note: 'Pendaftaran aktif' },
  { label: 'Sertifikasi Saat Ini', value: '156', note: 'Aktif' },
];

export const candidates: Candidate[] = [
  { id: 'c1', name: 'Sari Chandrawati', position: 'Engineer Senior', department: 'Teknologi', stage: 'Memenuhi Syarat', appliedDate: '2026-05-15', email: 'sarah.chen@email.com', phone: '+1-555-0101' },
  { id: 'c2', name: 'Markus Junaidi', position: 'Manajer Produk', department: 'Produk', stage: 'Penyaringan', appliedDate: '2026-06-01', email: 'marcus.j@email.com', phone: '+1-555-0102' },
  { id: 'c3', name: 'Elina Rosita', position: 'Direktur Penjualan', department: 'Penjualan', stage: 'Baru', appliedDate: '2026-06-20', email: 'elena.r@email.com', phone: '+1-555-0103' },
  { id: 'c4', name: 'David Permana', position: 'Ilmuwan Data', department: 'Analitik', stage: 'Memenuhi Syarat', appliedDate: '2026-05-28', email: 'david.park@email.com', phone: '+1-555-0104' },
  { id: 'c5', name: 'Jessica Sasmita', position: 'Manajer Keuangan', department: 'Keuangan', stage: 'Ditolak', appliedDate: '2026-04-10', email: 'jessica.s@email.com', phone: '+1-555-0105' },
];

export const interviews: Interview[] = [
  { id: 'i1', candidate: 'Sari Chandrawati', position: 'Engineer Senior', interviewer: 'Leo Wibowo', date: '2026-06-25', time: '10:00 AM', type: 'Teknis', status: 'Dijadwalkan', feedback: '' },
  { id: 'i2', candidate: 'Markus Junaidi', position: 'Manajer Produk', interviewer: 'Zara Nurhidayah', date: '2026-06-24', time: '02:00 PM', type: 'Babak Final', status: 'Selesai', feedback: 'Strong strategic thinking, excellent communication skills.' },
  { id: 'i3', candidate: 'David Permana', position: 'Ilmuwan Data', interviewer: 'Noor Fadhila', date: '2026-06-26', time: '11:00 AM', type: 'Wawancara Telepon', status: 'Menunggu', feedback: '' },
  { id: 'i4', candidate: 'Sari Chandrawati', position: 'Engineer Senior', interviewer: 'Aulia Rizky', date: '2026-06-20', time: '03:00 PM', type: 'SDM', status: 'Selesai', feedback: 'Cultural fit excellent, compensation expectations align.' },
];

export const hiring: HiringRecord[] = [
  { id: 'h1', candidate: 'Alex Tirta', position: 'Pengembang Frontend', hireDate: '2026-07-15', department: 'Teknologi', manager: 'Leo Wibowo', salaryBand: 'Senior IC', status: 'Tawaran Diberikan' },
  { id: 'h2', candidate: 'Casey Wijaya', position: 'Desainer UX', hireDate: '2026-07-08', department: 'Produk', manager: 'Zara Nurhidayah', salaryBand: 'Mid IC', status: 'Diterima' },
  { id: 'h3', candidate: 'Jordan Marten', position: 'Ketua Layanan Pelanggan', hireDate: '2026-06-30', department: 'Layanan Pelanggan', manager: 'Maya Sari', salaryBand: 'Lead', status: 'Onboarding' },
];

export const onboardingTasks: OnboardingTask[] = [
  { id: 'o1', employee: 'Jordan Marten', task: 'Penyiapan TI - Laptop & Akun', category: 'IT', dueDate: '2026-06-28', completionDate: '2026-06-27', assignedTo: 'Noor Fadhila', status: 'Selesai' },
  { id: 'o2', employee: 'Jordan Marten', task: 'Selesaikan Pelatihan Orientasi', category: 'Training', dueDate: '2026-07-02', assignedTo: 'Maya Sari', status: 'Sedang Berlangsung' },
  { id: 'o3', employee: 'Jordan Marten', task: 'Sertifikasi Keamanan & Kepatuhan', category: 'Documentation', dueDate: '2026-07-05', assignedTo: 'Emily Putri', status: 'Menunggu' },
  { id: 'o4', employee: 'Jordan Marten', task: 'Akses Kantor & Fasilitas', category: 'Facility', dueDate: '2026-06-29', assignedTo: 'Juni Rahmawati', status: 'Selesai' },
  { id: 'o5', employee: 'Casey Wijaya', task: 'Penyiapan TI - Laptop & Akun', category: 'IT', dueDate: '2026-07-06', assignedTo: 'Noor Fadhila', status: 'Menunggu' },
];

export const trainingPrograms: TrainingProgram[] = [
  { id: 't1', employee: 'Jordan Marten', program: 'Dasar-dasar Layanan Pelanggan', startDate: '2026-07-01', endDate: '2026-07-15', provider: 'Internal Learning', status: 'Dijadwalkan', progress: 0 },
  { id: 't2', employee: 'Maya Sari', program: 'Keterampilan Kepemimpinan Lanjut', startDate: '2026-06-10', endDate: '2026-07-10', provider: 'LinkedIn Learning', status: 'Sedang Berlangsung', progress: 60 },
  { id: 't3', employee: 'Leo Wibowo', program: 'Masterclass Desain Sistem', startDate: '2026-05-20', endDate: '2026-06-30', provider: 'Coursera', status: 'Sedang Berlangsung', progress: 85 },
  { id: 't4', employee: 'Zara Nurhidayah', program: 'Strategi Produk & Peta Jalan', startDate: '2026-03-01', endDate: '2026-06-01', provider: 'Maven', status: 'Selesai', progress: 100 },
  { id: 't5', employee: 'Noor Fadhila', program: 'Arsitektur Cloud di AWS', startDate: '2026-06-15', endDate: '2026-08-15', provider: 'AWS Training', status: 'Sedang Berlangsung', progress: 40 },
];

export const certifications: Certification[] = [
  { id: 'cert1', employee: 'Leo Wibowo', certification: 'AWS Certified Solutions Architect', issuedDate: '2024-03-15', expiryDate: '2027-03-15', issuer: 'Amazon Web Services', credentialId: 'AWS-2024-001', status: 'Aktif' },
  { id: 'cert2', employee: 'Zara Nurhidayah', certification: 'Certified Scrum Product Owner', issuedDate: '2023-11-20', expiryDate: '2026-11-20', issuer: 'Scrum Alliance', credentialId: 'CSPO-2023-042', status: 'Hampir Habis' },
  { id: 'cert3', employee: 'Maya Sari', certification: 'SHRM Certified Professional', issuedDate: '2022-05-10', expiryDate: '2026-05-10', issuer: 'SHRM', credentialId: 'SHRM-2022-156', status: 'Kedaluwarsa' },
  { id: 'cert4', employee: 'Noor Fadhila', certification: 'Kubernetes Application Developer', issuedDate: '2024-08-15', expiryDate: '2027-08-15', issuer: 'Linux Foundation', credentialId: 'CKAD-2024-089', status: 'Aktif' },
  { id: 'cert5', employee: 'Emily Putri', certification: 'Google Cloud Associate Cloud Engineer', issuedDate: '2024-01-20', expiryDate: '2026-01-20', issuer: 'Google Cloud', credentialId: 'GCP-2024-033', status: 'Aktif' },
];

export const competencies: CompetencyRecord[] = [
  { id: 'comp1', employee: 'Leo Wibowo', competency: 'System Design', level: 'Ahli', assessmentDate: '2026-05-15', assessor: 'Aulia Rizky', nextReviewDate: '2026-11-15' },
  { id: 'comp2', employee: 'Zara Nurhidayah', competency: 'Product Strategy', level: 'Mahir', assessmentDate: '2026-04-20', assessor: 'Noor Fadhila', nextReviewDate: '2026-10-20' },
  { id: 'comp3', employee: 'Maya Sari', competency: 'People Management', level: 'Ahli', assessmentDate: '2026-03-10', assessor: 'Lia Pratiwi', nextReviewDate: '2026-09-10' },
  { id: 'comp4', employee: 'Noor Fadhila', competency: 'DevOps & Infrastructure', level: 'Mahir', assessmentDate: '2026-05-01', assessor: 'Emily Putri', nextReviewDate: '2026-11-01' },
  { id: 'comp5', employee: 'Emily Putri', competency: 'Cloud Architecture', level: 'Mahir', assessmentDate: '2026-06-05', assessor: 'Leo Wibowo', nextReviewDate: '2026-12-05' },
  { id: 'comp6', employee: 'Aulia Rizky', competency: 'Sales Strategy', level: 'Ahli', assessmentDate: '2026-04-15', assessor: 'Maya Sari', nextReviewDate: '2026-10-15' },
];

export const candidatePipeline = [
  { stage: 'Baru', count: 24 },
  { stage: 'Penyaringan', count: 18 },
  { stage: 'Memenuhi Syarat', count: 28 },
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
  { name: 'Pemula', value: 24 },
  { name: 'Menengah', value: 68 },
  { name: 'Mahir', value: 124 },
  { name: 'Ahli', value: 42 },
];

export const departmentHiringTarget = [
  { name: 'Teknologi', target: 18, actual: 14 },
  { name: 'Produk', target: 6, actual: 5 },
  { name: 'Penjualan', target: 12, actual: 8 },
  { name: 'Layanan Pelanggan', target: 8, actual: 6 },
  { name: 'Keuangan', target: 4, actual: 3 },
  { name: 'SDM', target: 3, actual: 2 },
];
