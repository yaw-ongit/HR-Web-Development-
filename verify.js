const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_KEY || 'your-secret-key');

async function verify() {
  const { count: empCount } = await supabase.from('employees').select('*', { count: 'exact', head: true });
  const { count: deptCount } = await supabase.from('departments').select('*', { count: 'exact', head: true });
  const { count: posCount } = await supabase.from('positions').select('*', { count: 'exact', head: true });
  const { count: lrCount } = await supabase.from('leave_requests').select('*', { count: 'exact', head: true });

  console.log(`Employees: ${empCount}`);
  console.log(`Departments: ${deptCount}`);
  console.log(`Positions: ${posCount}`);
  console.log(`Leave Requests: ${lrCount}`);
}
verify();