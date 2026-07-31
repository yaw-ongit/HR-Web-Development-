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

    // 8. Recent Audit Logs
    const { data: auditLogs } = await supabase.from('audit_logs')
      .select('action, table_name, created_at, employees(full_name, positions(title))')
      .order('created_at', { ascending: false })
      .limit(5);

    const recentAuditLogs = auditLogs ? auditLogs.map(log => {
      const emp = log.employees as any;
      const d = new Date(log.created_at);
      return {
        actor: emp?.full_name || 'System',
        role: emp?.positions?.title || 'System',
        action: `${log.action} pada ${log.table_name}`,
        time: d.toLocaleDateString('id-ID')
      };
    }) : [];

    // 9. Announcements
    const { data: announcements } = await supabase.from('announcements')
      .select('title, content, published_at')
      .order('published_at', { ascending: false })
      .limit(3);
    const mappedAnnouncements = announcements ? announcements.map(a => ({
      title: a.title,
      subtitle: a.content,
      status: 'info'
    })) : [];

    // 10. Recruitment Funnel
    const { data: candidates } = await supabase.from('candidates').select('status');
    const recruitMap: Record<string, number> = { 'BARU': 0, 'SCREENING': 0, 'INTERVIEW': 0, 'OFFERING': 0 };
    candidates?.forEach(c => {
      recruitMap[c.status] = (recruitMap[c.status] || 0) + 1;
    });
    const recruitmentFunnel = [
      { label: 'Kandidat Baru', value: `${recruitMap['BARU']} dalam proses` },
      { label: 'Screening', value: `${recruitMap['SCREENING']} tahap awal` },
      { label: 'Interview', value: `${recruitMap['INTERVIEW']} dijadwalkan` },
      { label: 'Offering', value: `${recruitMap['OFFERING']} tahap akhir` }
    ];

    // 11. Birthdays
    const bdayMonth = new Date().getMonth() + 1;
    const { data: bdayEmps } = await supabase.from('employees')
      .select('full_name, birth_date, positions(title)')
      .eq('employee_status', 'AKTIF');
    const upcomingBirthdays = bdayEmps?.filter(e => {
      if (!e.birth_date) return false;
      const bMonth = new Date(e.birth_date).getMonth() + 1;
      return bMonth === bdayMonth; 
    }).slice(0, 5).map(e => ({
      name: e.full_name,
      role: (e.positions as any)?.title || 'Karyawan'
    })) || [];

    // 12. Approvals
    const { data: rawApprovals } = await supabase.from('approvals')
      .select('status, entity_type, employees!approvals_requester_id_fkey(full_name)')
      .eq('status', 'MENUNGGU')
      .limit(3);
    const mappedApprovals = rawApprovals ? rawApprovals.map(a => {
      const typeStr = a.entity_type === 'LEAVE_REQUEST' ? 'Permintaan Cuti' :
                      a.entity_type === 'OVERTIME' ? 'Lembur' : 'Persetujuan';
      return {
        label: `${typeStr} — ${(a.employees as any)?.full_name}`,
        status: a.status === 'MENUNGGU' ? 'Menunggu' : 'Review'
      }
    }) : [];

    // 13. Training Progress & Chart
    const { data: trData } = await supabase.from('training_participants')
      .select('attendance_status, training_schedules(training_programs(name))');
    
    const courseStats: Record<string, { total: number, present: number }> = {};
    trData?.forEach(tp => {
      const courseName = (tp.training_schedules as any)?.training_programs?.name;
      if (courseName) {
        if (!courseStats[courseName]) courseStats[courseName] = { total: 0, present: 0 };
        courseStats[courseName].total++;
        if (tp.attendance_status === 'HADIR' || tp.attendance_status === 'SELESAI') {
          courseStats[courseName].present++;
        }
      }
    });
    
    const trainingProgress = Object.keys(courseStats).map(c => ({
      course: c,
      progress: Math.round((courseStats[c].present / courseStats[c].total) * 100)
    }));
    
    const trainingCompletionChart = trainingProgress.map(tp => ({
      name: tp.course.split(' ').slice(1).join(' ') || tp.course,
      value: tp.progress
    }));

    return {
      employeeCount: employeeCount || 0,
      departmentGrowth,
      attendances: attendances || [],
      pendingLeaves: pendingLeaves || 0,
      mcuCompliance,
      headcountTrend,
      turnoverRate,
      attendanceTrend: attendanceCounts,
      recentAuditLogs,
      announcements: mappedAnnouncements,
      recruitmentFunnel,
      upcomingBirthdays,
      pendingApprovals: mappedApprovals,
      trainingProgress,
      trainingCompletionChart
    };
  }
};
