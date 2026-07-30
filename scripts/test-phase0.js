const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('Testing Phase 0 Errors...');

  // Test Attendances
  const { data: employees } = await supabase.from('employees').select('id').limit(1);
  if (employees && employees.length > 0) {
    const empId = employees[0].id;
    const att = [{
        id: '70000000-0000-0000-0000-000000000001',
        employee_id: empId,
        attendance_date: '2026-07-01',
        scheduled_check_in: '08:00:00',
        scheduled_check_out: '17:00:00',
        actual_check_in: '08:00:00',
        actual_check_out: '17:00:00',
        status: 'HADIR',
        late_minutes: 0,
        early_leave_minutes: 0
    }];
    const { error: errAtt } = await supabase.from('attendances').upsert(att);
    console.log('Attendances Error:', errAtt || 'Success');
  }

  // Test Job Vacancies
  const jv = [{
    id: 'v0000000-0000-0000-0000-000000000001',
    vacancy_code: 'JV-01',
    title: 'Staf IT',
    department_id: 'de000000-0000-0000-0000-000000000002',
    position_id: 'f0000000-0000-0000-0000-000000000022',
    quota: 2,
    status: 'DIBUKA',
    opened_date: '2026-07-01'
  }];
  const { error: errJv } = await supabase.from('job_vacancies').upsert(jv);
  console.log('Job Vacancies Error:', errJv || 'Success');

  // Test Candidates
  const cand = [{
    id: '90000000-0000-0000-0000-000000000001',
    full_name: 'Calon Pegawai Satu',
    email: 'calon1@gmail.com',
    phone: '0811111',
    gender: 'L',
    job_vacancy_id: 'v0000000-0000-0000-0000-000000000001',
    status: 'BARU',
    applied_at: new Date().toISOString()
  }];
  const { error: errCa } = await supabase.from('candidates').upsert(cand);
  console.log('Candidates Error:', errCa || 'Success');
}
run();
