import { createClient } from './client';

const supabase = createClient();

export const DashboardService = {
  async getDashboardData() {
    if (!supabase) return null;
    
    // 1. Employee Count (Active)
    const { count: employeeCount } = await supabase.from('employees')
      .select('*', { count: 'exact', head: true })
      .eq('employee_status', 'AKTIF');
    
    // 2. Department Growth (Comparison)
    const { data: depts } = await supabase.from('departments').select('name, employees(id, employee_status)');
    const departmentGrowth = depts ? depts.map(d => ({ 
      name: d.name, 
      value: d.employees.filter((e: any) => e.employee_status === 'AKTIF').length 
    })) : [];

    // 3. Attendance Activity (Recent)
    const { data: attendances } = await supabase.from('attendances')
      .select('status, late_minutes, attendance_date, employees(full_name, positions(title))')
      .order('attendance_date', { ascending: false })
      .limit(4);
      
    // 4. Leave Requests (Waiting)
    const { count: pendingLeaves } = await supabase.from('leave_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'DIAJUKAN');

    // 5. MCU Compliance
    const { count: mcuClaims } = await supabase.from('medical_claims')
      .select('id', { count: 'exact', head: true })
      .eq('description', 'MCU Tahunan');
    const mcuCompliance = employeeCount && mcuClaims ? Math.round((mcuClaims / employeeCount) * 100) : 0;

    // 6. Historical Headcount Trend & Turnover (Last 6 Months)
    const { data: allEmps } = await supabase.from('employees').select('join_date, deleted_at, employee_status');
    
    const headcountTrend = [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let departedCount = 0;
    
    // Compute last 6 months buckets
    for (let i = 5; i >= 0; i--) {
      let d = new Date(currentYear, currentMonth - i, 1);
      let nextMonth = new Date(currentYear, currentMonth - i + 1, 1);
      
      let monthLabel = d.toLocaleString('id-ID', { month: 'short' });
      
      let hc = 0;
      allEmps?.forEach(e => {
        let joined = new Date(e.join_date);
        let left = e.deleted_at ? new Date(e.deleted_at) : null;
        
        // Count as headcount if joined before nextMonth and (hasn't left OR left on/after this month)
        if (joined < nextMonth && (!left || left >= d)) {
          hc++;
        }
        
        // Count as departed this period if they left in this specific month
        if (left && left >= d && left < nextMonth) {
          departedCount++;
        }
      });
      headcountTrend.push({ month: monthLabel, value: hc });
    }

    const averageHc = headcountTrend.reduce((sum, item) => sum + item.value, 0) / 6;
    const turnoverRate = averageHc ? ((departedCount / averageHc) * 100).toFixed(1) : 0;

    // 7. Attendance Trend (Last 7 Days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const { data: recentAtts } = await supabase.from('attendances')
      .select('attendance_date')
      .gte('attendance_date', last7Days[0])
      .lte('attendance_date', last7Days[6]);

    const attendanceCounts = last7Days.map(dateStr => {
      const d = new Date(dateStr);
      const label = d.toLocaleDateString('id-ID', { weekday: 'short' });
      const count = recentAtts?.filter(a => a.attendance_date === dateStr).length || 0;
      return { label, value: count };
    });

    return {
      employeeCount: employeeCount || 0,
      departmentGrowth,
      attendances: attendances || [],
      pendingLeaves: pendingLeaves || 0,
      mcuCompliance,
      headcountTrend,
      turnoverRate,
      attendanceTrend: attendanceCounts
    };
  }
};
