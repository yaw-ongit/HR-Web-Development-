import { supabase, safeQuery } from './baseService';

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
