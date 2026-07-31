const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-key-here';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  console.log('--- STARTING SEED PHASE 2 ---');
  
  // 1. Approvals
  const { data: leaves } = await supabase.from('leave_requests').select('id, employee_id').limit(3);
  const { data: managers } = await supabase.from('employees').select('id').eq('employee_status', 'AKTIF').limit(1);
  
  if (leaves && leaves.length > 0 && managers && managers.length > 0) {
    const approver_id = managers[0].id;
    const approvalsToInsert = leaves.map((lv, i) => ({
      id: `fa000000-0000-0000-0000-${(i+1).toString().padStart(12, '0')}`,
      entity_id: lv.id,
      entity_type: 'LEAVE_REQUEST',
      requester_id: lv.employee_id,
      approver_id: approver_id,
      status: i === 0 ? 'DISETUJUI' : 'MENUNGGU',
      sequence_order: 1
    }));
    const { error: apErr } = await supabase.from('approvals').upsert(approvalsToInsert);
    if (apErr) throw new Error('Approvals Err: ' + JSON.stringify(apErr));
    console.log(`OK: inserted ${approvalsToInsert.length} approvals`);
  }

  // 2. Training Schedules & Participants
  const { data: progs } = await supabase.from('training_programs').select('*').limit(2);
  if (progs && progs.length > 0) {
    const schedules = progs.map((p, i) => ({
      id: `f8000000-0000-0000-0000-${(i+1).toString().padStart(12, '0')}`,
      training_program_id: p.id,
      start_date: '2026-08-01',
      end_date: '2026-08-02',
      status: 'TERJADWAL',
      quota: 20,
      batch_code: `BATCH-${i+1}`
    }));
    const { error: tsErr } = await supabase.from('training_schedules').upsert(schedules);
    if (tsErr) throw new Error('Training Sched Err: ' + JSON.stringify(tsErr));
    console.log(`OK: inserted ${schedules.length} training schedules`);

    const { data: activeEmployees } = await supabase.from('employees').select('id').eq('employee_status', 'AKTIF').limit(5);
    if (activeEmployees && activeEmployees.length > 0) {
      let participants = [];
      schedules.forEach((sch, i) => {
        activeEmployees.forEach((emp, j) => {
          participants.push({
            id: `f9000000-0000-0000-0000-${(i*10 + j + 1).toString().padStart(12, '0')}`,
            training_schedule_id: sch.id,
            employee_id: emp.id,
            attendance_status: (j % 2 === 0) ? 'HADIR' : 'TERDAFTAR'
          });
        });
      });
      const { error: tpErr } = await supabase.from('training_participants').upsert(participants);
      if (tpErr) throw new Error('Training Part Err: ' + JSON.stringify(tpErr));
      console.log(`OK: inserted ${participants.length} training participants`);
    }
  }
}
run().catch(console.error);
