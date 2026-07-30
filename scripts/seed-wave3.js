const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

async function run() {
  console.log('--- STARTING SEED WAVE 3 ---');

  const { data: employees, error: empErr } = await supabase.from('employees').select('*');
  if (empErr || !employees.length) {
    console.error('Failed to get employees', empErr);
    return;
  }
  const { data: depts } = await supabase.from('departments').select('*');
  const { data: poses } = await supabase.from('positions').select('*');

  // PHASE 1: Attendances & Overtimes
  console.log('--- PHASE 1 ---');
  const attendances = [];
  let attId = 1;
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(today.getTime() - i * 24*60*60*1000);
    const dateStr = d.toISOString().split('T')[0];
    for (const emp of employees) {
      const isLate = Math.random() > 0.8;
      const schedIn = '08:00:00';
      const schedOut = '17:00:00';
      const actIn = isLate ? dateStr + 'T09:15:00+07:00' : dateStr + 'T07:55:00+07:00';
      const actOut = dateStr + 'T17:05:00+07:00';
      
      attendances.push({
        id: '70000000-0000-0000-0000-' + attId.toString().padStart(12, '0'),
        employee_id: emp.id,
        attendance_date: dateStr,
        scheduled_check_in: schedIn,
        scheduled_check_out: schedOut,
        actual_check_in: actIn,
        actual_check_out: actOut,
        status: isLate ? 'TERLAMBAT' : 'HADIR',
        late_minutes: isLate ? 75 : 0,
        early_leave_minutes: 0
      });
      attId++;
    }
  }
  const { error: errAtt } = await supabase.from('attendances').upsert(attendances);
  if (errAtt) throw new Error('Attendances Err: ' + JSON.stringify(errAtt));
  console.log('OK: inserted ' + attendances.length + ' rows into attendances');

  const overtimes = [];
  for (let i=1; i<=5; i++) {
    const emp = randomElement(employees);
    overtimes.push({
      id: '81000000-0000-0000-0000-' + i.toString().padStart(12, '0'),
      employee_id: emp.id,
      overtime_date: '2026-07-28',
      start_time: '2026-07-28T17:00:00+07:00',
      end_time: '2026-07-28T20:00:00+07:00',
      duration_minutes: 180,
      reason: randomElement(['Menyelesaikan laporan bulanan', 'Deadline proyek klien']),
      status: randomElement(['DIAJUKAN', 'DISETUJUI']),
      approved_by: emp.manager_id,
      approved_at: new Date().toISOString()
    });
  }
  const { error: errOv } = await supabase.from('overtimes').upsert(overtimes);
  if (errOv) throw new Error('Overtimes Err: ' + JSON.stringify(errOv));
  console.log('OK: inserted ' + overtimes.length + ' rows into overtimes');

  // PHASE 2: Recruitment
  console.log('--- PHASE 2 ---');
  const job_vacancies = [
    { id: 'b0000000-0000-0000-0000-000000000001', vacancy_code: 'JV-01', title: 'Staf IT', department_id: depts[1].id, position_id: poses[3].id, quota: 2, status: 'DIBUKA', opened_date: '2026-07-01' },
    { id: 'b0000000-0000-0000-0000-000000000002', vacancy_code: 'JV-02', title: 'HR Manager', department_id: depts[0].id, position_id: poses[0].id, quota: 1, status: 'PROSES', opened_date: '2026-07-15' }
  ];
  const { error: errJv } = await supabase.from('job_vacancies').upsert(job_vacancies);
  if (errJv) throw new Error('Job Vacancies Err: ' + JSON.stringify(errJv));
  console.log('OK: inserted ' + job_vacancies.length + ' rows into job_vacancies');

  const candNames = ['Andi Setiawan', 'Siska Amelia', 'Joko Susanto', 'Rina Marlina', 'Fajar Sidik', 'Sari Mutiara', 'Dedi Kurniawan', 'Lia Rahayu'];
  const candidates = candNames.map((name, i) => ({
    id: '90000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
    full_name: name,
    email: 'calon' + (i+1) + '@gmail.com',
    phone: '08111222' + i,
    gender: i % 2 === 0 ? 'L' : 'P',
    job_vacancy_id: i < 5 ? job_vacancies[0].id : job_vacancies[1].id,
    status: randomElement(['BARU', 'SCREENING', 'INTERVIEW', 'OFFERING', 'DITERIMA']),
    applied_at: new Date().toISOString()
  }));
  const { error: errCa } = await supabase.from('candidates').upsert(candidates);
  if (errCa) throw new Error('Candidates Err: ' + JSON.stringify(errCa));
  console.log('OK: inserted ' + candidates.length + ' rows into candidates');

  const interview_schedules = [];
  for(let i=0; i<3; i++) {
    interview_schedules.push({
      id: 'a1000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      candidate_id: candidates[i].id,
      interviewer_id: employees[0].id,
      scheduled_at: new Date(Date.now() + 86400000 * (i+1)).toISOString(),
      interview_stage: 'HR Interview',
      location: 'Ruang Meeting 1'
    });
  }
  const { error: errIs } = await supabase.from('interview_schedules').upsert(interview_schedules);
  if (errIs) throw new Error('Interview Schedules Err: ' + JSON.stringify(errIs));
  console.log('OK: inserted ' + interview_schedules.length + ' rows into interview_schedules');

const hirings = [];  for(let i=0; i<2; i++) {    hirings.push({      id: 'a3000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),      candidate_id: candidates[i].id,      job_vacancy_id: candidates[i].job_vacancy_id,      offer_date: '2026-07-25',      offered_job_grade_id: 'a0000000-0000-0000-0000-000000000001',      offered_position_id: 'f0000000-0000-0000-0000-000000000022',      offered_salary: 8000000,      accepted: true,      start_date: '2026-08-01'    });  }  const { error: errHi } = await supabase.from('hirings').upsert(hirings);  if (errHi) throw new Error('Hirings Err: ' + JSON.stringify(errHi));  console.log('OK: inserted ' + hirings.length + ' rows into hirings');  const onboardings = [];  for(let i=0; i<2; i++) {    onboardings.push({      id: 'a2000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),      hiring_id: hirings[i].id,      start_date: '2026-08-01',      checklist: { "IT Setup": true, "HR Induction": false }    });  }  const { error: errOn } = await supabase.from('onboardings').upsert(onboardings);  if (errOn) throw new Error('Onboardings Err: ' + JSON.stringify(errOn));  console.log('OK: inserted ' + onboardings.length + ' rows into onboardings');


  // PHASE 3: Compensation & remaining sub-records
  console.log('--- PHASE 3 ---');
  const document_types = [
    { id: 'd1000000-0000-0000-0000-000000000001', code: 'DOC-KTP', name: 'KTP', is_mandatory: true },
    { id: 'd1000000-0000-0000-0000-000000000002', code: 'DOC-IJZ', name: 'Ijazah', is_mandatory: true },
    { id: 'd1000000-0000-0000-0000-000000000003', code: 'DOC-NPWP', name: 'NPWP', is_mandatory: false }
  ];
  const { error: errDt } = await supabase.from('document_types').upsert(document_types);
  if (errDt) throw new Error('Doc Types Err: ' + JSON.stringify(errDt));
  console.log('OK: inserted ' + document_types.length + ' rows into document_types');

  const employee_documents = [];
  for(let i=0; i<10; i++) {
    employee_documents.push({
      id: 'd2000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      employee_id: employees[i].id,
      document_type_id: document_types[0].id,
      document_number: 'KTP-' + (1000+i),
      file_url: 'https://storage/docs/' + employees[i].id + '_ktp.pdf',
      status: 'AKTIF',
      uploaded_at: new Date().toISOString()
    });
  }
  const { error: errEd } = await supabase.from('employee_documents').upsert(employee_documents);
  if (errEd) throw new Error('Employee Docs Err: ' + JSON.stringify(errEd));
  console.log('OK: inserted ' + employee_documents.length + ' rows into employee_documents');

  const employee_assets = [];
  for(let i=0; i<10; i++) {
    employee_assets.push({
      id: 'a3000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      employee_id: employees[i].id,
      asset_code: 'LAP-2026-' + i,
      asset_name: 'Laptop ThinkPad T14',
      assigned_date: '2026-01-01',
      condition_note: 'Baik'
    });
  }
  const { error: errAs } = await supabase.from('employee_assets').upsert(employee_assets);
  if (errAs) throw new Error('Employee Assets Err: ' + JSON.stringify(errAs));
  console.log('OK: inserted ' + employee_assets.length + ' rows into employee_assets');

  const contract_histories = [];
  const kontrakEmps = employees.filter(e => e.employment_type_id === 'e0000000-0000-0000-0000-000000000002');
  for(let i=0; i<kontrakEmps.length; i++) {
    contract_histories.push({
      id: 'c1000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      employee_id: kontrakEmps[i].id,
      employment_type_id: kontrakEmps[i].employment_type_id,
      contract_number: 'KON/2026/' + i,
      start_date: '2026-01-01',
      end_date: '2026-12-31',
      status: 'AKTIF'
    });
  }
  if (contract_histories.length > 0) {
    const { error: errCh } = await supabase.from('contract_histories').upsert(contract_histories);
    if (errCh) throw new Error('Contract Histories Err: ' + JSON.stringify(errCh));
    console.log('OK: inserted ' + contract_histories.length + ' rows into contract_histories');
  }

  // Insurance Providers & Benefit Types (Prerequisites for employee_insurances and benefits)
  const insurance_providers = [
    { id: '11000000-0000-0000-0000-000000000001', code: 'BPJS-KES', name: 'BPJS Kesehatan', provider_type: 'GOVERNMENT' },
    { id: '11000000-0000-0000-0000-000000000002', code: 'BPJS-TK', name: 'BPJS Ketenagakerjaan', provider_type: 'GOVERNMENT' }
  ];
  await supabase.from('insurance_providers').upsert(insurance_providers);

  const benefit_types = [
    { id: 'b1000000-0000-0000-0000-000000000001', code: 'BEN-KES', name: 'Asuransi Kesehatan' },
    { id: 'b1000000-0000-0000-0000-000000000002', code: 'BEN-TK', name: 'Jaminan Hari Tua' }
  ];
  await supabase.from('benefit_types').upsert(benefit_types);

  const employee_insurances = [];
  for(let i=0; i<30; i++) {
    employee_insurances.push({
      id: '12000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      employee_id: employees[i].id,
      insurance_provider_id: insurance_providers[0].id,
      benefit_type_id: benefit_types[0].id,
      policy_number: '000' + Math.floor(Math.random() * 9000000 + 1000000),
      is_active: true,
      start_date: '2026-01-01'
    });
  }
  const { error: errIns } = await supabase.from('employee_insurances').upsert(employee_insurances);
  if (errIns) throw new Error('Employee Insurances Err: ' + JSON.stringify(errIns));
  console.log('OK: inserted ' + employee_insurances.length + ' rows into employee_insurances');

  // PHASE 4: Misc
  console.log('--- PHASE 4 ---');
  const announcements = [
    { id: '13000000-0000-0000-0000-000000000001', title: 'Libur Nasional', content: 'Hari kemerdekaan RI 17 Agustus 2026', target_scope: 'ALL_EMPLOYEES', published_at: new Date().toISOString() },
    { id: '13000000-0000-0000-0000-000000000002', title: 'Jadwal MCU Tahunan', content: 'Pendaftaran MCU dibuka', target_scope: 'ALL_EMPLOYEES', published_at: new Date().toISOString() }
  ];
  const { error: errAn } = await supabase.from('announcements').upsert(announcements);
  if (errAn) throw new Error('Announcements Err: ' + JSON.stringify(errAn));
  console.log('OK: inserted ' + announcements.length + ' rows into announcements');

  const notifications = [];
  for(let i=0; i<15; i++) {
    notifications.push({
      id: '14000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      employee_id: employees[i].id,
      title: 'Persetujuan Cuti',
      message: 'Permohonan cuti Anda telah disetujui',
      is_read: false
    });
  }
  const { error: errNot } = await supabase.from('notifications').upsert(notifications);
  if (errNot) throw new Error('Notifications Err: ' + JSON.stringify(errNot));
  console.log('OK: inserted ' + notifications.length + ' rows into notifications');

  const audit_logs = [];
  for(let i=0; i<10; i++) {
    audit_logs.push({
      id: 'a4000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      employee_id: employees[0].id, // HR manager doing actions
      action: 'UPDATE_LEAVE_STATUS',
      table_name: 'leave_requests',
      record_id: '20000000-0000-0000-0000-' + (i+1).toString().padStart(12, '0'),
      new_values: { status: 'DISETUJUI' },
      ip_address: '192.168.1.10'
    });
  }
  const { error: errAu } = await supabase.from('audit_logs').upsert(audit_logs);
  if (errAu) throw new Error('Audit Logs Err: ' + JSON.stringify(errAu));
  console.log('OK: inserted ' + audit_logs.length + ' rows into audit_logs');

}
run().catch(err => {
  console.error('\n\nCRITICAL SEED FAILURE:', err.message);
});
