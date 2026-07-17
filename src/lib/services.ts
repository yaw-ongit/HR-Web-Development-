import { createClient } from './client';

// Re-use or instantiate browser-client
const supabase = createClient();

/**
 * Service Layer for Supabase integration.
 * If backend query fails or table is missing, falls back to original mock data
 * as fallback to keep the frontend completely functional (no dead UI).
 */

// Helper to check if a table exists/is readable, or safely query it
async function safeQuery<T>(queryPromise: any, fallbackData: T): Promise<T> {
  try {
    const { data, error } = await queryPromise;
    if (error || !data) {
      console.warn("Supabase query error or no data, falling back to mock data:", error);
      return fallbackData;
    }
    return data;
  } catch (err) {
    console.error("Supabase connection failed, falling back to mock data:", err);
    return fallbackData;
  }
}

// ----------------------------------------------------
// 1. IDENTITY & AUTH SERVICES
// ----------------------------------------------------
export const IdentityService = {
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },
  
  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },
  
  async getNotifications(fallback: any[]) {
    return safeQuery(
      supabase.from('notifications').select('*').order('created_at', { ascending: false }),
      fallback
    );
  },

  async getAuditLogs(fallback: any[]) {
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
  async getEmployees(fallback: any[]) {
    return safeQuery(
      supabase.from('employees').select('*, employee_profiles(*)'),
      fallback
    );
  },

  async getEmployeeById(id: string | number, fallback: any) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*, employee_profiles(*), employee_families(*), employee_educations(*), employee_experiences(*)')
        .eq('id', id)
        .single();
      if (error || !data) return fallback;
      return data;
    } catch {
      return fallback;
    }
  },

  async getOrgStructure(fallback: any) {
    return safeQuery(
      supabase.from('departments').select('*, units(*, positions(*))'),
      fallback
    );
  },

  async getDocuments(fallback: any[]) {
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
  async getAttendanceRecords(fallback: any[]) {
    return safeQuery(
      supabase.from('attendance_records').select('*').order('work_date', { ascending: false }),
      fallback
    );
  },

  async getLeaveRequests(fallback: any[]) {
    return safeQuery(
      supabase.from('leave_requests').select('*').order('start_date', { ascending: false }),
      fallback
    );
  },

  async getShiftSchedules(fallback: any[]) {
    return safeQuery(
      supabase.from('shift_schedules').select('*'),
      fallback
    );
  },

  async getOvertimeRequests(fallback: any[]) {
    return safeQuery(
      supabase.from('overtime_requests').select('*').order('overtime_date', { ascending: false }),
      fallback
    );
  }
};

// ----------------------------------------------------
// 4. TALENT & RECRUITMENT SERVICES
// ----------------------------------------------------
export const TalentService = {
  async getCandidates(fallback: any[]) {
    return safeQuery(
      supabase.from('candidates').select('*'),
      fallback
    );
  },

  async getInterviews(fallback: any[]) {
    return safeQuery(
      supabase.from('interviews').select('*'),
      fallback
    );
  },

  async getOnboardingTasks(fallback: any[]) {
    return safeQuery(
      supabase.from('onboarding_tasks').select('*'),
      fallback
    );
  },

  async getTrainingPrograms(fallback: any[]) {
    return safeQuery(
      supabase.from('training_programs').select('*'),
      fallback
    );
  },

  async getCertifications(fallback: any[]) {
    return safeQuery(
      supabase.from('certifications').select('*'),
      fallback
    );
  }
};

// ----------------------------------------------------
// 5. COMPENSATION & PAYROLL SERVICES
// ----------------------------------------------------
export const CompensationService = {
  async getPayrollPeriods(fallback: any[]) {
    return safeQuery(
      supabase.from('payroll_periods').select('*'),
      fallback
    );
  },

  async getClaims(fallback: any[]) {
    return safeQuery(
      supabase.from('medical_claims').select('*'),
      fallback
    );
  },

  async getBenefits(fallback: any[]) {
    return safeQuery(
      supabase.from('benefits').select('*'),
      fallback
    );
  },

  async getBpjsRecords(fallback: any[]) {
    return safeQuery(
      supabase.from('bpjs_records').select('*'),
      fallback
    );
  },

  async getMcuRecords(fallback: any[]) {
    return safeQuery(
      supabase.from('mcu_records').select('*'),
      fallback
    );
  }
};

// ----------------------------------------------------
// 6. ANALYTICS & DASHBOARD SERVICES
// ----------------------------------------------------
export const AnalyticsService = {
  async getAnalyticsKpi(fallback: any) {
    return safeQuery(
      supabase.from('analytics_kpis').select('*').single(),
      fallback
    );
  },

  async getDashboardSummary(fallback: any) {
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
  async getSystemSettings(fallback: any) {
    return safeQuery(
      supabase.from('system_settings').select('*').single(),
      fallback
    );
  }
};
