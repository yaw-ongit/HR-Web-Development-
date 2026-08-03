const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_KEY || 'your-secret-key');
async function run() {
  const { data: types } = await supabase.from('leave_types').select('id').limit(1);
  const typeId = types[0].id;
  const payload = {
    employee_id: 'e0000000-0000-0000-0000-000000000001',
    leave_type_id: typeId,
    start_date: '2026-09-01',
    end_date: '2026-09-03',
    total_days: 3,
    reason: 'Liburan',
    status: 'DIAJUKAN',
    approver_id: 'e0000000-0000-0000-0000-000000000002'
  };
  const { data, error } = await supabase.from('leave_requests').insert([payload]).select().single();
  console.log('Inserted leave:', data?.id, error);
}
run();
