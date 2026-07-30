import { createClient } from './client';

const supabase = createClient();

export const DashboardService = {
  async getDashboardData() {
    if (!supabase) return null;
    
    // 1. Employee Count
    const { count: employeeCount } = await supabase.from('employees').select('*', { count: 'exact', head: true });
    
    // 2. Department Growth (Comparison)
    const { data: depts } = await supabase.from('departments').select('name, employees(id)');
    const departmentGrowth = depts ? depts.map(d => ({ name: d.name, value: d.employees.length })) : [];

    // 3. Attendance Activity (Recent)
    const { data: attendances } = await supabase.from('attendances')
      .select('status, late_minutes, attendance_date, employees(full_name, positions(title))')
      .order('attendance_date', { ascending: false })
      .limit(4);
      
    // 4. Leave Requests (Waiting)
    const { count: pendingLeaves } = await supabase.from('leave_requests').select('*', { count: 'exact', head: true }).eq('status', 'DIAJUKAN');
    
    return {
      employeeCount: employeeCount || 0,
      departmentGrowth,
      attendances: attendances || [],
      pendingLeaves: pendingLeaves || 0
    };
  }
};
