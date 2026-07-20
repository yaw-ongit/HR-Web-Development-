import { supabase, safeQuery } from './baseService';

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
