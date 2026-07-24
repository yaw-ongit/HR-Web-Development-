import { createClient } from './client';

// Re-use or instantiate browser-client
const supabase = createClient();

export interface ServiceQueryResult<T> {
  data: T | null;
  error: string | null;
  isFallback: boolean;
}

async function safeQuery<T>(queryPromise: any, fallbackData: T): Promise<ServiceQueryResult<T>> {
  if (!supabase) {
    return { data: fallbackData, error: 'Supabase environment variables are not configured', isFallback: true };
  }

  try {
    const { data, error } = await queryPromise;
    if (error) {
      console.error('Supabase query error:', error);
      return { data: fallbackData, error: error.message || 'Supabase query failed', isFallback: true };
    }

    if (!data) {
      return { data: fallbackData, error: 'No data returned from Supabase', isFallback: true };
    }

    return { data: data as T, error: null, isFallback: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Supabase connection error';
    console.error('Supabase connection failed:', message);
    return { data: fallbackData, error: message, isFallback: true };
  }
}

// ----------------------------------------------------
// 1. IDENTITY & AUTH SERVICES
// ----------------------------------------------------
export const IdentityService = {
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
  
  async getNotifications(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('notifications').select('*').order('created_at', { ascending: false }),
      fallback
    );
  },

  async getAuditLogs(fallback: any[]) {
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
  async getEmployees(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('employees').select('*, employee_profiles(*)'),
      fallback
    );
  },

  async getEmployeeById(id: string | number, fallback: any) {
    if (!supabase) {
      return fallback;
    }

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
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('departments').select('*, units(*, positions(*))'),
      fallback
    );
  },

  async getDocuments(fallback: any[]) {
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
  async getAttendanceRecords(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('attendance_records').select('*').order('work_date', { ascending: false }),
      fallback
    );
  },

  async getLeaveRequests(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('leave_requests').select('*').order('start_date', { ascending: false }),
      fallback
    );
  },

  async getShiftSchedules(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('shift_schedules').select('*'),
      fallback
    );
  },

  async getOvertimeRequests(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('overtime_requests').select('*').order('overtime_date', { ascending: false }),
      fallback
    );
  }
};

export { TalentService } from '@/services/talentService';

// ----------------------------------------------------
// 5. COMPENSATION & PAYROLL SERVICES
// ----------------------------------------------------
export const CompensationService = {
  async getPayrollPeriods(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('payroll_periods').select('*'),
      fallback
    );
  },

  async getClaims(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('medical_claims').select('*'),
      fallback
    );
  },

  async getBenefits(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('benefits').select('*'),
      fallback
    );
  },

  async getBpjsRecords(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('bpjs_records').select('*'),
      fallback
    );
  },

  async getMcuRecords(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

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
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('analytics_kpis').select('*').single(),
      fallback
    );
  },

  async getDashboardSummary(fallback: any) {
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
  async getSystemSettings(fallback: any) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('system_settings').select('*').single(),
      fallback
    );
  }
};
