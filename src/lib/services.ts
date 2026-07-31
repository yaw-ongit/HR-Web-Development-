import { createClient } from './client';
import * as mappers from './mappers';

// Re-use or instantiate browser-client
const supabase = createClient();

export interface ServiceQueryResult<T> {
  data: T | null;
  error: string | null;
  isFallback: boolean;
}

async function safeQuery<T>(
  queryPromise: any,
  fallbackData?: T,
  transform?: (row: any) => any
): Promise<ServiceQueryResult<T>> {
  if (!supabase) {
    return { data: fallbackData || ([] as any), error: 'Supabase environment variables are not configured', isFallback: true };
  }

  try {
    const { data, error } = await queryPromise;
    if (error) {
      console.error('Supabase query error:', error);
      return { data: fallbackData || ([] as any), error: error.message || 'Supabase query failed', isFallback: true };
    }

    if (!data) {
      return { data: fallbackData || ([] as any), error: 'No data returned from Supabase', isFallback: true };
    }

    let finalData = data;
    if (transform) {
      finalData = Array.isArray(data) ? data.map(transform) : transform(data);
    }

    return { data: finalData as T, error: null, isFallback: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Supabase connection error';
    console.error('Supabase connection failed:', message);
    return { data: fallbackData || ([] as any), error: message, isFallback: true };
  }
}

// ----------------------------------------------------
// 1. IDENTITY & AUTH SERVICES
// ----------------------------------------------------
export const IdentityService = {
  async updateEmployeeProfile(id: string, data: { phone?: string; emergency_contact?: string }) {
    if (!supabase) return { error: 'No db' };
    const { error } = await supabase.from('employees').update(data).eq('id', id);
    return { error: error?.message };
  },

  async getSession() {
    if (!supabase) {
      return { data: null, error: 'Supabase environment variables are not configured' };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },
  
  async getUser() {
    if (!supabase) {
      return { data: null, error: 'Supabase environment variables are not configured' };
    }

    try {
      const { data, error } = await supabase.auth.getUser();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },
  
  async getNotifications(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('notifications').select('*').order('created_at', { ascending: false }),
      fallback
    );
  },

  async getAuditLogs(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100),
      fallback
    );
  }
};

// ----------------------------------------------------
// 2. PEOPLE & EMPLOYEE SERVICES
// ----------------------------------------------------
export const PeopleService = {
  async getReferenceData() {
    if (!supabase) return null;
    const [depts, positions, types, comp, br, bu, div, jg, sec] = await Promise.all([
      supabase.from('departments').select('id, name'),
      supabase.from('positions').select('id, title'),
      supabase.from('employment_types').select('id, name'),
      supabase.from('companies').select('id').limit(1),
      supabase.from('branches').select('id').limit(1),
      supabase.from('business_units').select('id').limit(1),
      supabase.from('divisions').select('id').limit(1),
      supabase.from('job_grades').select('id').limit(1),
      supabase.from('sections').select('id').limit(1)
    ]);
    return {
      departments: depts.data || [],
      positions: positions.data || [],
      employmentTypes: types.data || [],
      defaultComp: comp.data?.[0]?.id,
      defaultBranch: br.data?.[0]?.id,
      defaultBu: bu.data?.[0]?.id,
      defaultDiv: div.data?.[0]?.id,
      defaultJg: jg.data?.[0]?.id,
      defaultSec: sec.data?.[0]?.id
    };
  },

  async createEmployee(data: any) {
    if (!supabase) return { error: 'No db' };
    const { data: result, error } = await supabase.from('employees').insert([data]).select().single();
    return { data: result, error: error?.message };
  },

  async getEmployees(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('employees').select('*, employee_profiles(*), departments(name), positions(title), employment_types(name), branches(name, city), manager:employees!manager_id(full_name)'),
      fallback,
      mappers.mapEmployeeRecord
    );
  },

  async getEmployeeById(id: string | number, fallback?: any) {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*, employee_profiles(*), employee_families(*), employee_educations(*), employee_experiences(*), departments(name), positions(title), employment_types(name), branches(name, city), manager:employees!manager_id(full_name)')
        .eq('id', id)
        .single();
      if (error || !data) return null;
      return mappers.mapEmployeeRecord(data);
    } catch {
      return null;
    }
  },

  async getOrgStructure(fallback?: any) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('departments').select('*, units(*, positions(*))'),
      fallback
    );
  },

  async getDocuments(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('employee_documents').select('*'),
      fallback
    );
  }
};

// ----------------------------------------------------
// 3. WORKFORCE & ATTENDANCE SERVICES
// ----------------------------------------------------
export const WorkforceService = {
  async getAttendanceRecords(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('attendances').select('*, employees(full_name, departments(name)), shift_assignments(shifts(name))').order('attendance_date', { ascending: false }),
      fallback,
      mappers.mapAttendanceRecord
    );
  },

  async getLeaveRequests(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('leave_requests').select('*, employees(full_name), leave_types(name), approver:employees!approver_id(full_name)').order('start_date', { ascending: false }),
      fallback,
      mappers.mapLeaveRequest
    );
  },

  async getLeaveTypes() {
    if (!supabase) return [];
    const { data } = await supabase.from('leave_types').select('id, name');
    return data || [];
  },

  async createLeaveRequest(data: any) {
    if (!supabase) return { error: 'No db' };
    const { error } = await supabase.from('leave_requests').insert([data]);
    return { error: error?.message };
  },

  async updateLeaveRequestStatus(ids: string[], status: string) {
    if (!supabase) return { error: 'Supabase environment variables are not configured' };
    
    // Database schema uses 'DISETUJUI', 'DITOLAK', 'DIAJUKAN'
    const dbStatus = status === 'Disetujui' ? 'DISETUJUI' : status === 'Ditolak' ? 'DITOLAK' : 'DIAJUKAN';
    
    const { error } = await supabase
      .from('leave_requests')
      .update({ status: dbStatus })
      .in('id', ids);
      
    if (error) {
      console.error('Failed to update leave status:', error);
      return { error: error.message };
    }
    return { error: null };
  },

  async getShiftSchedules(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('shifts').select('*, shift_assignments(id)'),
      fallback,
      mappers.mapShiftSchedule
    );
  },

  async getOvertimeRequests(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('overtimes').select('*, employees(full_name, departments(name))').order('overtime_date', { ascending: false }),
      fallback,
      mappers.mapOvertimeRequest
    );
  }
};



// Fallback arrays to simulate DB in memory if Supabase offline/missing
let localCertifications = [
  { id: 'cert1', employee_id: 'emp1', employee: 'Leo Wibowo', certification: 'AWS Certified Solutions Architect', category: 'Teknologi', issuer: 'Amazon Web Services', credentialId: 'AWS-2024-001', issuedDate: '2024-03-15', expiryDate: '2027-03-15', status: 'Aktif', document_url: '' },
  { id: 'cert2', employee_id: 'emp2', employee: 'Zara Nurhidayah', certification: 'Certified Scrum Product Owner', category: 'Produk', issuer: 'Scrum Alliance', credentialId: 'CSPO-2023-042', issuedDate: '2023-11-20', expiryDate: '2026-11-20', status: 'Hampir Habis', document_url: '' },
  { id: 'cert3', employee_id: 'emp3', employee: 'Maya Sari', certification: 'SHRM Certified Professional', category: 'SDM', issuer: 'SHRM', credentialId: 'SHRM-2022-156', issuedDate: '2022-05-10', expiryDate: '2026-05-10', status: 'Kedaluwarsa', document_url: '' },
  { id: 'cert4', employee_id: 'emp4', employee: 'Noor Fadhila', certification: 'Kubernetes Application Developer', category: 'Teknologi', issuer: 'Linux Foundation', credentialId: 'CKAD-2024-089', issuedDate: '2024-08-15', expiryDate: '2027-08-15', status: 'Aktif', document_url: '' },
  { id: 'cert5', employee_id: 'emp5', employee: 'Emily Putri', certification: 'Google Cloud Associate Cloud Engineer', category: 'Teknologi', issuer: 'Google Cloud', credentialId: 'GCP-2024-033', issuedDate: '2024-01-20', expiryDate: '2026-01-20', status: 'Aktif', document_url: '' }
];

let localTrainingPrograms = [
  { id: 't1', title: 'Dasar-dasar Layanan Pelanggan', description: 'Pelatihan pelayanan pelanggan dasar PT Indocater', category: 'Customer Service', trainer: 'Internal Learning Coordinator', location: 'Lantai 3 Ruang Mawar', start_date: '2026-07-01', duration: '15 Jam', certificate_template: 'training-certificate.html' },
  { id: 't2', title: 'Keterampilan Kepemimpinan Lanjut', description: 'Program kepemimpinan untuk supervisor dan manager', category: 'Leadership', trainer: 'Maya Sari', location: 'Lantai 2 Ruang Melati', start_date: '2026-06-10', duration: '30 Jam', certificate_template: 'training-certificate.html' },
  { id: 't3', title: 'Masterclass Desain Sistem', description: 'Pelatihan arsitektur system design IT senior', category: 'Teknologi', trainer: 'Leo Wibowo', location: 'Zoom Meeting Online', start_date: '2026-05-20', duration: '40 Jam', certificate_template: 'training-certificate.html' },
  { id: 't4', title: 'Strategi Produk & Peta Jalan', description: 'Strategi product development modern', category: 'Produk', trainer: 'Zara Nurhidayah', location: 'Lantai 1 Executive Lounge', start_date: '2026-03-01', duration: '24 Jam', certificate_template: 'training-certificate.html' }
];

let localParticipants = [
  { id: 'tp1', training_id: 't1', employee_id: 'emp6', employee_name: 'Jordan Marten', employee_email: 'jordan@indocater.co.id', status: 'Selesai', certificate_generated: true, certificate_number: 'CERT-INDC-2026-001' },
  { id: 'tp2', training_id: 't1', employee_id: 'emp3', employee_name: 'Maya Sari', employee_email: 'maya@indocater.co.id', status: 'Terdaftar', certificate_generated: false, certificate_number: '' },
  { id: 'tp3', training_id: 't2', employee_id: 'emp3', employee_name: 'Maya Sari', employee_email: 'maya@indocater.co.id', status: 'Selesai', certificate_generated: true, certificate_number: 'CERT-INDC-2026-002' },
  { id: 'tp4', training_id: 't3', employee_id: 'emp1', employee_name: 'Leo Wibowo', employee_email: 'leo@indocater.co.id', status: 'Selesai', certificate_generated: false, certificate_number: '' }
];

export let localPlannings = [
  { id: 'plan-1', planning_number: 'PLN-2026-0001', title: 'Pelatihan Keselamatan Kerja K3', unit: 'Teknologi', location: 'Lantai 3 Ruang Mawar', start_date: '2026-08-01', start_time: '09:00', training_type: 'Compliance', provider: 'PT Indocater', trainer: 'Internal Learning Coordinator', cost: 1500000, notes: 'Wajib untuk departemen IT', period: '2026-Q3', status: 'Approved', is_archived: false, is_cancelled: false },
  { id: 'plan-2', planning_number: 'PLN-2026-0002', title: 'Food Safety Management', unit: 'SDM', location: 'Lantai 2 Ruang Melati', start_date: '2026-08-15', start_time: '10:00', training_type: 'Food Safety', provider: 'Food Safety Indonesia', trainer: 'Maya Sari', cost: 3500000, notes: 'Sertifikasi kepatuhan', period: '2026-Q3', status: 'Submitted', is_archived: false, is_cancelled: false },
  { id: 'plan-3', planning_number: 'PLN-2026-0003', title: 'ISO 9001:2015 Quality Lead Auditor', unit: 'Produk', location: 'Zoom Meeting', start_date: '2026-09-01', start_time: '08:00', training_type: 'ISO', provider: 'SGS Academy', trainer: 'External Expert', cost: 12000000, notes: 'Sertifikasi auditor mutu', period: '2026-Q3', status: 'Draft', is_archived: false, is_cancelled: false }
];

export let localRealizations = [
  { id: 'real-1', planning_id: 'plan-1', status: 'Ongoing' }
];

export let localNewParticipants = [
  { id: 'part-1', realization_id: 'real-1', employee_id: 'leo-wibowo', employee_name: 'Leo Wibowo', employee_email: 'leo.wibowo@indocater.co.id', company: 'PT Indocater', position: 'Pengembang Perangkat Lunak', is_external: false },
  { id: 'part-2', realization_id: 'real-1', employee_id: 'maya-sari', employee_name: 'Maya Sari', employee_email: 'maya.sari@indocater.co.id', company: 'PT Indocater', position: 'Generalist SDM', is_external: false }
];

export let localEvaluations = [
  { id: 'eval-1', realization_id: 'real-1', score: 85, effectiveness: 'Sangat Efektif', notes: 'Lulus dengan baik', recommendation: 'Diberikan sertifikat', document_url: '', evaluation_date: '2026-08-02' }
];

export let localNewCertificates = [
  { id: 'cert-gen-1', realization_id: 'real-1', participant_id: 'part-1', certificate_number: 'CERT-2026-000001', issued_date: '2026-08-02', expiration_date: '2029-08-02', status: 'Valid', qr_code_url: 'CERT-2026-000001|leo-wibowo|Pelatihan Keselamatan Kerja K3|2026-08-02', signature_manager_url: '/signatures/manager.png', signature_hr_url: '/signatures/hr.png', download_count: 1 }
];

export let localApprovals = [
  { id: 'appr-1', planning_id: 'plan-1', approval_status: 'Approved', approver: 'Fitri Novita', approval_date: '2026-07-28', approval_notes: 'Proposal disetujui, anggaran sesuai.' }
];

export let localAttendances = [
  { id: 'att-1', participant_id: 'part-1', status: 'Present', attendance_date: '2026-08-01', notes: 'Hadir penuh waktu' },
  { id: 'att-2', participant_id: 'part-2', status: 'Absent', attendance_date: '2026-08-01', notes: 'Sakit' }
];

export let localNotifications = [
  { id: 'not-1', user_id: 'leo-wibowo', title: 'Upcoming Training', content: 'Pelatihan Keselamatan Kerja K3 akan dimulai tanggal 2026-08-01.', type: 'Training', is_read: false, created_at: '2026-07-28' },
  { id: 'not-2', user_id: 'leo-wibowo', title: 'Certificate Generated', content: 'Sertifikat untuk Pelatihan Keselamatan Kerja K3 telah diterbitkan.', type: 'Certificate', is_read: true, created_at: '2026-07-28' }
];

export let localActivityLogs = [
  { id: 'log-1', user_name: 'yawwwwwww', action: 'Added Training Planning', module: 'Training', status: 'Success', created_at: '2026-07-28 09:00:00' },
  { id: 'log-2', user_name: 'yawwwwwww', action: 'Approved Training Proposal', module: 'Approval', status: 'Success', created_at: '2026-07-28 10:00:00' }
];

export let localFeedback = [
  { id: 'fb-1', category: 'Suggestion', title: 'Peningkatan UI Kalender', description: 'Mohon tambahkan filter unit pada tampilan kalender.', priority: 'Medium', attachment_url: '', created_at: '2026-07-28' }
];

export let localSettings = {
  companyName: 'PT Indocater',
  timeZone: 'Asia/Jakarta',
  dateFormat: 'DD/MM/YYYY',
  theme: 'system',
  language: 'id',
  emailNotifications: true,
  browserNotifications: true,
  tableDensity: 'comfortable',
  sidebarCollapse: false,
  defaultDashboard: 'all'
};

export const TalentService = {
  // --- CANDIDATES, INTERVIEWS, ONBOARDING ---
  async getJobVacancies() {
    if (!supabase) return { data: [] };
    const { data } = await supabase.from('job_vacancies').select('*').order('created_at', { ascending: false });
    return { data: data || [] };
  },

  async createCandidate(data: any) {
    if (!supabase) return { error: 'No db' };
    const { data: result, error } = await supabase.from('candidates').insert([data]).select().single();
    return { data: result, error: error?.message };
  },

  async getCandidates(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }
    return safeQuery(
      supabase.from('candidates').select('*, job_vacancies(title, departments(name))'),
      fallback,
      mappers.mapCandidate
    );
  },

  async getInterviews(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }
    return safeQuery(
      supabase.from('interview_schedules').select('*, candidates(full_name, job_vacancies(title)), interviewer:employees!interviewer_id(full_name)'),
      fallback,
      mappers.mapInterview
    );
  },

  async getOnboardingTasks(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }
    return safeQuery(
      supabase.from('onboardings').select('*, employees(full_name)'),
      fallback,
      mappers.mapOnboardingTask
    );
  },

  // --- CERTIFICATIONS ---
  async getCertifications(fallback?: any[]) {
    if (!supabase) {
      return { data: localCertifications, error: null, isFallback: true };
    }
    return safeQuery(
      supabase.from('certificates').select('*, employees(full_name), certification_types(name)'),
      localCertifications,
      mappers.mapCertification
    );
  },

  async createCertification(data: any) {
    if (!supabase) {
      const newCert = {
        id: 'cert_' + Math.random().toString(36).substr(2, 9),
        employee_id: data.employee_id || 'emp1',
        employee: data.employee || 'Karyawan',
        certification: data.certification || data.name,
        category: data.category || 'Umum',
        issuer: data.issuer || data.issuing_organization,
        credentialId: data.credentialId || data.certificate_number,
        issuedDate: data.issuedDate || data.issue_date,
        expiryDate: data.expiryDate || data.expiration_date,
        status: data.status || 'Aktif',
        document_url: data.document_url || ''
      };
      localCertifications.push(newCert);
      return { data: newCert, error: null };
    }

    const { data: dbData, error } = await supabase
      .from('certifications')
      .insert([{
        employee_id: data.employee_id,
        employee_name: data.employee,
        certification_name: data.certification || data.name,
        category: data.category,
        issuer: data.issuer || data.issuing_organization,
        certificate_number: data.credentialId || data.certificate_number,
        issue_date: data.issuedDate || data.issue_date,
        expiration_date: data.expiryDate || data.expiration_date,
        status: data.status,
        document_url: data.document_url
      }])
      .select()
      .single();

    return { data: dbData, error };
  },

  async updateCertification(id: string, data: any) {
    if (!supabase) {
      localCertifications = localCertifications.map(c => {
        if (c.id === id) {
          return {
            ...c,
            employee: data.employee || c.employee,
            certification: data.certification || data.name || c.certification,
            category: data.category || c.category,
            issuer: data.issuer || data.issuing_organization || c.issuer,
            credentialId: data.credentialId || data.certificate_number || c.credentialId,
            issuedDate: data.issuedDate || data.issue_date || c.issuedDate,
            expiryDate: data.expiryDate || data.expiration_date || c.expiryDate,
            status: data.status || c.status,
            document_url: data.document_url || c.document_url
          };
        }
        return c;
      });
      return { error: null };
    }

    const { error } = await supabase
      .from('certifications')
      .update({
        employee_name: data.employee,
        certification_name: data.certification || data.name,
        category: data.category,
        issuer: data.issuer || data.issuing_organization,
        certificate_number: data.credentialId || data.certificate_number,
        issue_date: data.issuedDate || data.issue_date,
        expiration_date: data.expiryDate || data.expiration_date,
        status: data.status,
        document_url: data.document_url
      })
      .eq('id', id);

    return { error };
  },

  async deleteCertification(id: string) {
    if (!supabase) {
      localCertifications = localCertifications.filter(c => c.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    return { error };
  },

  // --- TRAINING PROGRAMS ---
  async getTrainingPrograms(fallback?: any[]) {
    if (!supabase) {
      return { data: localTrainingPrograms, error: null, isFallback: true };
    }
    return safeQuery(
      supabase.from('training_programs').select('*'),
      localTrainingPrograms,
      (t: any) => ({
        id: t.id,
        title: t.title || t.training_title,
        description: t.description || t.training_description,
        category: t.category,
        trainer: t.trainer || t.trainer_name,
        location: t.location,
        start_date: t.start_date || t.training_date,
        duration: t.duration || t.training_duration,
        certificate_template: t.certificate_template
      })
    );
  },

  async createTrainingProgram(data: any) {
    if (!supabase) {
      const newProg = {
        id: 't_' + Math.random().toString(36).substr(2, 9),
        title: data.title || data.training_title,
        description: data.description || data.training_description,
        category: data.category,
        trainer: data.trainer || data.trainer_name,
        location: data.location,
        start_date: data.start_date || data.training_date,
        duration: data.duration || data.training_duration,
        certificate_template: data.certificate_template || 'training-certificate.html'
      };
      localTrainingPrograms.push(newProg);
      return { data: newProg, error: null };
    }

    const { data: dbData, error } = await supabase
      .from('training_programs')
      .insert([{
        training_title: data.title || data.training_title,
        training_description: data.description || data.training_description,
        category: data.category,
        trainer_name: data.trainer || data.trainer_name,
        location: data.location,
        training_date: data.start_date || data.training_date,
        training_duration: data.duration || data.training_duration,
        certificate_template: data.certificate_template || 'training-certificate.html'
      }])
      .select()
      .single();

    return { data: dbData, error };
  },

  async updateTrainingProgram(id: string, data: any) {
    if (!supabase) {
      localTrainingPrograms = localTrainingPrograms.map(t => {
        if (t.id === id) {
          return {
            ...t,
            title: data.title || data.training_title || t.title,
            description: data.description || data.training_description || t.description,
            category: data.category || t.category,
            trainer: data.trainer || data.trainer_name || t.trainer,
            location: data.location || t.location,
            start_date: data.start_date || data.training_date || t.start_date,
            duration: data.duration || data.training_duration || t.duration,
            certificate_template: data.certificate_template || t.certificate_template
          };
        }
        return t;
      });
      return { error: null };
    }

    const { error } = await supabase
      .from('training_programs')
      .update({
        training_title: data.title || data.training_title,
        training_description: data.description || data.training_description,
        category: data.category,
        trainer_name: data.trainer || data.trainer_name,
        location: data.location,
        training_date: data.start_date || data.training_date,
        training_duration: data.duration || data.training_duration,
        certificate_template: data.certificate_template
      })
      .eq('id', id);

    return { error };
  },

  async deleteTrainingProgram(id: string) {
    if (!supabase) {
      localTrainingPrograms = localTrainingPrograms.filter(t => t.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_programs').delete().eq('id', id);
    return { error };
  },

  // --- TRAINING PARTICIPANTS ---
  async getTrainingParticipants(trainingId: string, fallback?: any[]) {
    if (!supabase) {
      return { data: localParticipants.filter(p => p.training_id === trainingId), error: null, isFallback: true };
    }
    return safeQuery(
      supabase.from('training_participants').select('*').eq('training_id', trainingId),
      localParticipants.filter(p => p.training_id === trainingId)
    );
  },

  async addTrainingParticipant(data: any) {
    if (!supabase) {
      const newPart = {
        id: 'tp_' + Math.random().toString(36).substr(2, 9),
        training_id: data.training_id,
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_email: data.employee_email || '',
        status: data.status || 'Terdaftar',
        certificate_generated: false,
        certificate_number: ''
      };
      localParticipants.push(newPart);
      return { data: newPart, error: null };
    }

    const { data: dbData, error } = await supabase
      .from('training_participants')
      .insert([{
        training_id: data.training_id,
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_email: data.employee_email,
        status: data.status || 'Terdaftar',
        certificate_generated: false,
        certificate_number: ''
      }])
      .select()
      .single();

    return { data: dbData, error };
  },

  async removeTrainingParticipant(id: string) {
    if (!supabase) {
      localParticipants = localParticipants.filter(p => p.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_participants').delete().eq('id', id);
    return { error };
  },

  async updateParticipantCertificateStatus(id: string, certNumber: string) {
    if (!supabase) {
      localParticipants = localParticipants.map(p => {
        if (p.id === id) {
          return {
            ...p,
            certificate_generated: true,
            certificate_number: certNumber,
            status: 'Selesai'
          };
        }
        return p;
      });
      return { error: null };
    }

    const { error } = await supabase
      .from('training_participants')
      .update({
        certificate_generated: true,
        certificate_number: certNumber,
        status: 'Selesai'
      })
      .eq('id', id);

    return { error };
  },

  // --- TRAINING PLANNING (LIFECYCLE STAGE 1) ---
  async getPlannings() {
    if (!supabase) {
      return { data: localPlannings, error: null, isFallback: true };
    }
    return safeQuery(supabase.from('training_plannings').select('*').order('created_at', { ascending: false }), localPlannings);
  },

  async createPlanning(data: any) {
    if (!supabase) {
      const planNum = data.planning_number || 'PLN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      const newPlan = {
        id: 'plan-' + Math.random().toString(36).substr(2, 9),
        planning_number: planNum,
        title: data.title,
        unit: data.unit,
        location: data.location,
        start_date: data.start_date,
        start_time: data.start_time,
        training_type: data.training_type,
        provider: data.provider,
        trainer: data.trainer,
        cost: Number(data.cost || 0),
        notes: data.notes,
        period: data.period,
        status: data.status || 'Draft',
        is_archived: false,
        is_cancelled: false
      };
      localPlannings.unshift(newPlan);
      return { data: newPlan, error: null };
    }
    const planNum = data.planning_number || 'PLN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const { data: dbData, error } = await supabase
      .from('training_plannings')
      .insert([{ ...data, planning_number: planNum }])
      .select()
      .single();
    return { data: dbData, error };
  },

  async updatePlanning(id: string, data: any) {
    if (!supabase) return { error: 'No db' };
    const payload = {
      name: data.title,
      category: data.training_type,
      description: data.notes
    };
    const { error } = await supabase.from('training_programs').update(payload).eq('id', id);
    return { error: error?.message };
  },

  async deletePlanning(id: string) {
    if (!supabase) {
      localPlannings = localPlannings.filter(p => p.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_plannings').delete().eq('id', id);
    return { error };
  },

  // --- TRAINING REALIZATION (LIFECYCLE STAGE 2) ---
  async getRealizations() {
    if (!supabase) {
      return { data: localRealizations, error: null, isFallback: true };
    }
    return safeQuery(supabase.from('training_realizations').select('*, training_plannings(*)'), localRealizations);
  },

  async createRealization(planningId: string) {
    if (!supabase) {
      const existing = localRealizations.find(r => r.planning_id === planningId);
      if (existing) return { data: existing, error: null };
      const newReal = {
        id: 'real-' + Math.random().toString(36).substr(2, 9),
        planning_id: planningId,
        status: 'Draft'
      };
      localRealizations.unshift(newReal);
      return { data: newReal, error: null };
    }
    const { data: existing } = await supabase
      .from('training_realizations')
      .select('*')
      .eq('planning_id', planningId)
      .maybeSingle();
    if (existing) {
      return { data: existing, error: null };
    }
    const { data: dbData, error } = await supabase
      .from('training_realizations')
      .insert([{ planning_id: planningId, status: 'Draft' }])
      .select()
      .single();
    return { data: dbData, error };
  },

  async updateRealizationStatus(id: string, status: string) {
    if (!supabase) {
      localRealizations = localRealizations.map(r => r.id === id ? { ...r, status } : r);
      return { error: null };
    }
    const { error } = await supabase.from('training_realizations').update({ status }).eq('id', id);
    return { error };
  },

  async deleteRealization(id: string) {
    if (!supabase) {
      localRealizations = localRealizations.filter(r => r.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_realizations').delete().eq('id', id);
    return { error };
  },

  // --- TRAINING PARTICIPANTS (LIFECYCLE STAGE 3) ---
  async getParticipants(realizationId: string) {
    if (!supabase) {
      return { data: localNewParticipants.filter(p => p.realization_id === realizationId), error: null, isFallback: true };
    }
    return safeQuery(supabase.from('training_participants').select('*').eq('realization_id', realizationId), localNewParticipants.filter(p => p.realization_id === realizationId));
  },

  async addParticipant(data: any) {
    if (!supabase) {
      const newPart = {
        id: 'part-' + Math.random().toString(36).substr(2, 9),
        realization_id: data.realization_id,
        employee_id: data.employee_id || null,
        employee_name: data.employee_name,
        employee_email: data.employee_email || '',
        company: data.company || 'PT Indocater',
        position: data.position || '',
        is_external: !!data.is_external
      };
      localNewParticipants.push(newPart);
      return { data: newPart, error: null };
    }
    const { data: dbData, error } = await supabase
      .from('training_participants')
      .insert([data])
      .select()
      .single();
    return { data: dbData, error };
  },

  async removeParticipant(id: string) {
    if (!supabase) {
      localNewParticipants = localNewParticipants.filter(p => p.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_participants').delete().eq('id', id);
    return { error };
  },

  async updateParticipant(id: string, data: any) {
    if (!supabase) {
      localNewParticipants = localNewParticipants.map(p => p.id === id ? { ...p, ...data } : p);
      return { error: null };
    }
    const { error } = await supabase.from('training_participants').update(data).eq('id', id);
    return { error };
  },

  // --- TRAINING EVALUATION (LIFECYCLE STAGE 4) ---
  async getEvaluations(realizationId: string) {
    if (!supabase) {
      return { data: localEvaluations.filter(e => e.realization_id === realizationId), error: null, isFallback: true };
    }
    return safeQuery(supabase.from('training_evaluations').select('*').eq('realization_id', realizationId), localEvaluations.filter(e => e.realization_id === realizationId));
  },

  async saveEvaluation(data: any) {
    if (!supabase) {
      const idx = localEvaluations.findIndex(e => e.realization_id === data.realization_id);
      const evalData = {
        id: idx !== -1 ? localEvaluations[idx].id : 'eval-' + Math.random().toString(36).substr(2, 9),
        realization_id: data.realization_id,
        score: Number(data.score),
        effectiveness: data.effectiveness || 'Efektif',
        notes: data.notes,
        recommendation: data.recommendation,
        document_url: data.document_url || '',
        evaluation_date: data.evaluation_date || new Date().toISOString().split('T')[0]
      };
      if (idx !== -1) {
        localEvaluations[idx] = evalData;
      } else {
        localEvaluations.push(evalData);
      }
      return { data: evalData, error: null };
    }
    const { data: existing } = await supabase
      .from('training_evaluations')
      .select('*')
      .eq('realization_id', data.realization_id)
      .maybeSingle();

    if (existing) {
      const { data: dbData, error } = await supabase
        .from('training_evaluations')
        .update(data)
        .eq('id', existing.id)
        .select()
        .single();
      return { data: dbData, error };
    } else {
      const { data: dbData, error } = await supabase
        .from('training_evaluations')
        .insert([data])
        .select()
        .single();
      return { data: dbData, error };
    }
  },

  // --- TRAINING CERTIFICATES (LIFECYCLE STAGE 5) ---
  async getCertificatesByRealization(realizationId: string) {
    if (!supabase) {
      return { data: localNewCertificates.filter(c => c.realization_id === realizationId), error: null, isFallback: true };
    }
    return safeQuery(supabase.from('training_certificates').select('*').eq('realization_id', realizationId), localNewCertificates.filter(c => c.realization_id === realizationId));
  },

  async generateCertificate(data: any) {
    if (!supabase) {
      const newCert = {
        id: 'cert-gen-' + Math.random().toString(36).substr(2, 9),
        realization_id: data.realization_id,
        participant_id: data.participant_id,
        certificate_number: data.certificate_number,
        issued_date: data.issued_date,
        expiration_date: data.expiration_date || '',
        status: data.status || 'Valid',
        qr_code_url: data.qr_code_url || '',
        signature_manager_url: data.signature_manager_url || '',
        signature_hr_url: data.signature_hr_url || '',
        download_count: data.download_count || 1
      };
      localNewCertificates.push(newCert);
      return { data: newCert, error: null };
    }
    const { data: dbData, error } = await supabase
      .from('training_certificates')
      .insert([data])
      .select()
      .single();
    return { data: dbData, error };
  },

  async deleteCertificate(id: string) {
    if (!supabase) {
      localNewCertificates = localNewCertificates.filter(c => c.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_certificates').delete().eq('id', id);
    return { error };
  },

  // --- APPROVAL WORKFLOW ---
  async getApprovals(planningId: string) {
    if (!supabase) {
      return { data: localApprovals.filter(a => a.planning_id === planningId), error: null, isFallback: true };
    }
    return safeQuery(supabase.from('training_approvals').select('*').eq('planning_id', planningId), localApprovals.filter(a => a.planning_id === planningId));
  },

  async saveApproval(data: any) {
    // Also update training_plannings status
    const status = data.approval_status === 'Approved' ? 'Approved' : 'Rejected';
    await this.updatePlanning(data.planning_id, { status });

    if (!supabase) {
      const idx = localApprovals.findIndex(a => a.planning_id === data.planning_id);
      const appData = {
        id: idx !== -1 ? localApprovals[idx].id : 'appr-' + Math.random().toString(36).substr(2, 9),
        planning_id: data.planning_id,
        approval_status: data.approval_status,
        approver: data.approver || 'Manager HRD',
        approval_date: new Date().toISOString().split('T')[0],
        approval_notes: data.approval_notes
      };
      if (idx !== -1) {
        localApprovals[idx] = appData;
      } else {
        localApprovals.push(appData);
      }
      return { data: appData, error: null };
    }

    const { data: existing } = await supabase
      .from('training_approvals')
      .select('*')
      .eq('planning_id', data.planning_id)
      .maybeSingle();

    if (existing) {
      const { data: dbData, error } = await supabase
        .from('training_approvals')
        .update(data)
        .eq('id', existing.id)
        .select()
        .single();
      return { data: dbData, error };
    } else {
      const { data: dbData, error } = await supabase
        .from('training_approvals')
        .insert([data])
        .select()
        .single();
      return { data: dbData, error };
    }
  },

  // --- ATTENDANCE SYSTEM ---
  async getAttendances(realizationId: string) {
    if (!supabase) {
      // Find all participant IDs for this realization
      const partIds = localNewParticipants.filter(p => p.realization_id === realizationId).map(p => p.id);
      return { data: localAttendances.filter(a => partIds.includes(a.participant_id)), error: null, isFallback: true };
    }
    // Query attendance join training_participants
    return safeQuery(supabase.from('training_attendances').select('*, training_participants(*)'), localAttendances);
  },

  async saveAttendance(data: any) {
    if (!supabase) {
      const idx = localAttendances.findIndex(a => a.participant_id === data.participant_id);
      const attData = {
        id: idx !== -1 ? localAttendances[idx].id : 'att-' + Math.random().toString(36).substr(2, 9),
        participant_id: data.participant_id,
        status: data.status,
        attendance_date: data.attendance_date || new Date().toISOString().split('T')[0],
        notes: data.notes || ''
      };
      if (idx !== -1) {
        localAttendances[idx] = attData;
      } else {
        localAttendances.push(attData);
      }
      return { data: attData, error: null };
    }

    const { data: existing } = await supabase
      .from('training_attendances')
      .select('*')
      .eq('participant_id', data.participant_id)
      .maybeSingle();

    if (existing) {
      const { data: dbData, error } = await supabase
        .from('training_attendances')
        .update(data)
        .eq('id', existing.id)
        .select()
        .single();
      return { data: dbData, error };
    } else {
      const { data: dbData, error } = await supabase
        .from('training_attendances')
        .insert([data])
        .select()
        .single();
      return { data: dbData, error };
    }
  },

  // --- NOTIFICATION CENTER ---
  async getNotifications() {
    if (!supabase) {
      return { data: localNotifications, error: null, isFallback: true };
    }
    return safeQuery(supabase.from('notifications').select('*').order('created_at', { ascending: false }), localNotifications);
  },

  async markNotificationRead(id: string) {
    if (!supabase) {
      localNotifications = localNotifications.map(n => n.id === id ? { ...n, is_read: true } : n);
      return { error: null };
    }
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    return { error };
  },

  async markAllNotificationsRead() {
    if (!supabase) {
      localNotifications = localNotifications.map(n => ({ ...n, is_read: true }));
      return { error: null };
    }
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('is_read', false);
    return { error };
  },

  async deleteNotification(id: string) {
    if (!supabase) {
      localNotifications = localNotifications.filter(n => n.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    return { error };
  },

  // --- ACTIVITY LOGS ---
  async getActivityLogs() {
    if (!supabase) {
      return { data: localActivityLogs, error: null, isFallback: true };
    }
    return safeQuery(supabase.from('activity_logs').select('*').order('created_at', { ascending: false }), localActivityLogs);
  },

  async logActivity(action: string, module: string, status: string = 'Success') {
    const newLog = {
      id: 'log-' + Math.random().toString(36).substr(2, 9),
      user_name: 'yawwwwwww',
      action,
      module,
      status,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    if (!supabase) {
      localActivityLogs.unshift(newLog);
      return { data: newLog, error: null };
    }
    const { data: dbData, error } = await supabase
      .from('activity_logs')
      .insert([newLog])
      .select()
      .single();
    return { data: dbData, error };
  },

  // --- USER FEEDBACK ---
  async getFeedbacks() {
    if (!supabase) {
      return { data: localFeedback, error: null, isFallback: true };
    }
    return safeQuery(supabase.from('user_feedbacks').select('*').order('created_at', { ascending: false }), localFeedback);
  },

  async submitFeedback(data: any) {
    const newFb = {
      id: 'fb-' + Math.random().toString(36).substr(2, 9),
      category: data.category,
      title: data.title,
      description: data.description,
      priority: data.priority || 'Medium',
      attachment_url: data.attachment_url || '',
      created_at: new Date().toISOString().split('T')[0]
    };
    if (!supabase) {
      localFeedback.unshift(newFb);
      return { data: newFb, error: null };
    }
    const { data: dbData, error } = await supabase
      .from('user_feedbacks')
      .insert([newFb])
      .select()
      .single();
    return { data: dbData, error };
  },

  // --- SETTINGS ---
  async getSettings() {
    return { data: localSettings, error: null };
  },

  async updateSettings(data: any) {
    localSettings = { ...localSettings, ...data };
    return { data: localSettings, error: null };
  }
};


// ----------------------------------------------------
// 5. COMPENSATION & PAYROLL SERVICES
// ----------------------------------------------------
export const CompensationService = {
  async getPayrollPeriods(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    const res = await safeQuery(
      supabase.from('payrolls').select('*, employees(full_name, departments(name), positions(title), employment_types(name))'),
      fallback,
      mappers.mapPayrollReady
    );
  },

  async createClaim(data: any) {
    if (!supabase) return { error: 'No db' };
    const { data: result, error } = await supabase.from('medical_claims').insert([data]).select().single();
    return { data: result, error: error?.message };
  },

  async getClaims(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('medical_claims').select('*, employees(full_name), processed_by_employee:employees!processed_by(full_name)'),
      fallback,
      mappers.mapClaim
    );
  },

  async getBenefits(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('benefits').select('*, employees(full_name, departments(name)), benefit_types(name)'),
      fallback,
      mappers.mapBenefit
    );
  },

  async getBpjsRecords(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('employee_insurances').select('*, employees(full_name), insurance_providers(name), benefit_types(name)'),
      fallback,
      mappers.mapInsurancePolicy
    );
  },

  async getMcuRecords(fallback?: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('medical_claims').select('*, employees(full_name, departments(name))'),
      fallback,
      mappers.mapMedicalRecord
    );
  }
};

// ----------------------------------------------------
// 6. ANALYTICS & DASHBOARD SERVICES
// ----------------------------------------------------
export const AnalyticsService = {
  async getAnalyticsKpi(fallback?: any) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('analytics_kpis').select('*').single(),
      fallback
    );
  },

  async getDashboardSummary(fallback?: any) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('dashboard_summaries').select('*').single(),
      fallback
    );
  }
};

// ----------------------------------------------------
// 7. ADMINISTRATION & SYSTEM SERVICES
// ----------------------------------------------------
export const AdministrationService = {
  async getSystemSettings(fallback?: any) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('system_settings').select('*').single(),
      fallback
    );
  }
};
