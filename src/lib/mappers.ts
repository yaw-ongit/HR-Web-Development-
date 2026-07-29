import { KaryawanRecord } from './people-data';
import { AttendanceRecord, LeaveRequest, ShiftSchedule, OvertimeRequest } from './workforce-data';
import { Candidate, Interview, OnboardingTask, Certification } from './talent-data';
import { Benefit, InsurancePolicy, MedicalRecord, Claim, PayrollReady } from './compensation-data';

export function mapEmployeeRecord(row: any): KaryawanRecord {
  const department = row.departments?.name || '';
  const position = row.positions?.title || '';
  const branch = row.branches?.name || '';
  const location = row.branches?.city || '';
  const contractType = row.employment_types?.name || '';
  const manager = row.manager?.full_name || '';
  
  const nameParts = (row.full_name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : (nameParts[0]?.[0] || '').toUpperCase();

  return {
    id: row.id,
    employeeId: row.employee_number || '',
    firstName,
    lastName,
    fullName: row.full_name || '',
    photo: row.photo_url || '',
    initials,
    department,
    position,
    status: row.employee_status || 'Aktif',
    joinDate: row.join_date || '',
    contractType,
    branch,
    location,
    gender: row.gender === 'Male' ? 'Laki-laki' : row.gender === 'Female' ? 'Perempuan' : row.gender || '',
    manager,
    lastActivity: row.employee_profiles?.[0]?.last_activity || 'Online',
    email: row.email || '',
    phone: row.phone || '',
    office: branch,
  };
}

export function mapAttendanceRecord(row: any): AttendanceRecord {
  const employeeName = row.employees?.full_name || '';
  const departmentName = row.employees?.departments?.name || '';
  const shiftName = row.shift_assignments?.[0]?.shifts?.name || 'Reguler';
  
  const late = row.late_minutes && row.late_minutes > 0 ? 'Yes' : 'No';
  const hours = row.work_duration_minutes ? `${Math.floor(row.work_duration_minutes / 60)}h ${row.work_duration_minutes % 60}m` : '-';
  
  const checkIn = row.actual_check_in ? new Date(`1970-01-01T${row.actual_check_in}`).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-';
  const checkOut = row.actual_check_out ? new Date(`1970-01-01T${row.actual_check_out}`).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-';

  return {
    id: row.id,
    employee: employeeName,
    department: departmentName,
    shift: shiftName,
    checkIn,
    checkOut,
    jam: hours,
    late,
    status: row.status || 'Hadir',
    date: row.attendance_date || '',
  };
}

export function mapLeaveRequest(row: any): LeaveRequest {
  const employeeName = row.employees?.full_name || '';
  const leaveType = row.leave_types?.name || '';
  const approverName = row.approver?.full_name || '-';
  
  return {
    id: row.id,
    employee: employeeName,
    leaveType,
    startDate: row.start_date || '',
    endDate: row.end_date || '',
    duration: row.total_days ? `${row.total_days} Hari` : '-',
    status: row.status === 'Approved' ? 'Disetujui' : row.status === 'Rejected' ? 'Ditolak' : 'Menunggu',
    approver: approverName,
  };
}

export function mapShiftSchedule(row: any): ShiftSchedule {
  return {
    id: row.id,
    shiftName: row.name || '',
    karyawan: row.shift_assignments ? row.shift_assignments.length : 0,
    workingHours: `${row.start_time || '00:00'} - ${row.end_time || '00:00'}`,
    manager: '-',
    status: 'Aktif',
  };
}

export function mapOvertimeRequest(row: any): OvertimeRequest {
  const employeeName = row.employees?.full_name || '';
  const departmentName = row.employees?.departments?.name || '';
  const hours = row.duration_minutes ? `${Math.floor(row.duration_minutes / 60)} Jam` : '-';

  return {
    id: row.id,
    employee: employeeName,
    department: departmentName,
    date: row.overtime_date || '',
    jam: hours,
    reason: row.reason || '-',
    status: row.status === 'Approved' ? 'Disetujui' : row.status === 'Rejected' ? 'Ditolak' : 'Menunggu',
  };
}

export function mapCandidate(row: any): Candidate {
  return {
    id: row.id,
    name: row.full_name || '',
    position: row.job_vacancies?.title || '',
    department: row.job_vacancies?.departments?.name || '',
    stage: row.status || 'New',
    appliedDate: row.applied_at || '',
    email: row.email || '',
    phone: row.phone || '',
  };
}

export function mapInterview(row: any): Interview {
  const candidateName = row.candidates?.full_name || '';
  const position = row.candidates?.job_vacancies?.title || '';
  const interviewer = row.interviewer?.full_name || '';
  
  const dt = row.scheduled_at ? new Date(row.scheduled_at) : null;
  const date = dt ? dt.toLocaleDateString('id-ID') : '';
  const time = dt ? dt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';

  return {
    id: row.id,
    candidate: candidateName,
    position,
    interviewer,
    date,
    time,
    type: row.interview_stage || 'Technical',
    status: row.status || 'Dijadwalkan',
    feedback: row.feedback || '',
  };
}

export function mapOnboardingTask(row: any): OnboardingTask {
  const employeeName = row.employees?.full_name || '';
  
  return {
    id: row.id,
    employee: employeeName,
    task: row.checklist ? 'Onboarding Checklist' : 'Task',
    category: 'SDM',
    dueDate: row.start_date || '',
    assignedTo: 'HR',
    status: row.completed_at ? 'Selesai' : 'Sedang Berlangsung',
  };
}

export function mapCertification(row: any): Certification {
  return {
    id: row.id,
    employee: row.employees?.full_name || row.employee_name || 'Karyawan',
    certification: row.certification_types?.name || row.certification_name || '',
    issuer: row.issued_by || row.issuer || '',
    credentialId: row.certificate_number || '',
    issuedDate: row.issued_at || row.issue_date || '',
    expiryDate: row.expired_at || row.expiration_date || '',
    status: row.status === 'Active' ? 'Aktif' : row.status === 'Expired' ? 'Kedaluwarsa' : row.status || 'Aktif',
  };
}

export function mapBenefit(row: any): Benefit {
  const employeeName = row.employees?.full_name || '';
  const departmentName = row.employees?.departments?.name || '';
  
  return {
    id: row.id,
    employeeId: row.employee_id,
    employee: employeeName,
    department: departmentName,
    benefitType: row.benefit_types?.name || '',
    provider: row.description || 'Internal',
    startDate: row.granted_date || '',
    endDate: row.expiry_date || '',
    status: 'Aktif',
  };
}

export function mapInsurancePolicy(row: any): InsurancePolicy {
  const employeeName = row.employees?.full_name || '';
  
  return {
    id: row.id,
    employeeId: row.employee_id,
    employee: employeeName,
    policyNumber: row.policy_number || '',
    provider: row.insurance_providers?.name || '',
    policyType: row.benefit_types?.name || 'Health Insurance',
    coverage: row.coverage_amount ? `Rp ${(row.coverage_amount/1000000).toFixed(0)}M` : '-',
    claimLimit: row.coverage_amount || 0,
    issueDate: row.start_date || '',
    expiryDate: row.end_date || '',
    status: row.is_active ? 'Aktif' : 'Kedaluwarsa',
    monthlyPremium: 0,
    dependents: 0,
  };
}

export function mapMedicalRecord(row: any): MedicalRecord {
  const employeeName = row.employees?.full_name || '';
  const departmentName = row.employees?.departments?.name || '';
  
  return {
    id: row.id,
    employeeId: row.employee_id,
    employee: employeeName,
    department: departmentName,
    medicalType: row.claim_type || 'MCU',
    provider: 'Klinik',
    issueDate: row.claim_date || '',
    expiryDate: row.claim_date || '',
    result: row.status === 'Approved' ? 'Fit' : 'Unfit',
    status: row.status === 'Approved' ? 'Selesai' : 'Dijadwalkan',
    attachments: 0,
  };
}

export function mapClaim(row: any): Claim {
  const employeeName = row.employees?.full_name || '';
  
  return {
    id: row.id,
    employeeId: row.employee_id,
    employee: employeeName,
    claimType: row.description || 'Medical',
    amount: row.claimed_amount || 0,
    submissionDate: row.claim_date || '',
    status: row.status === 'Approved' ? 'Disetujui' : row.status === 'Rejected' ? 'Ditolak' : row.status === 'Pending' ? 'Menunggu' : 'Diproses',
    approver: row.processed_by_employee?.full_name || '-',
    documents: 0,
  };
}

export function mapPayrollReady(row: any): PayrollReady {
  const employeeName = row.employees?.full_name || '';
  const departmentName = row.employees?.departments?.name || '';
  const position = row.employees?.positions?.title || '';
  const employmentType = row.employees?.employment_types?.name || '';
  
  return {
    id: row.id,
    employeeId: row.employee_id,
    employee: employeeName,
    department: departmentName,
    position,
    basicSalary: row.base_salary || 0,
    employmentType,
    payrollIntegrationStatus: row.status === 'Processed' ? 'Ready' : 'Menunggu',
    allowances: {
      transportation: row.total_earning ? row.total_earning * 0.1 : 0,
      meal: row.total_earning ? row.total_earning * 0.1 : 0,
      accommodation: 0,
      operational: 0,
    },
    deductions: {
      bpjs: 0,
      tax: 0,
    },
    salaryGrade: 'Grade A',
    bankAccount: '123456',
    bankName: 'Mandiri',
  };
}
