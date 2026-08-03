const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { count } = await supabase.from('employees').select('*', { count: 'exact', head: true });
  console.log('Total Row Count:', count);
  
  const { data: samples } = await supabase.from('employees').select('full_name').limit(5);
  console.log('Sample Names:', samples.map(s => s.full_name).join(', '));
  
  const { data: minDate } = await supabase.from('employees').select('join_date').order('join_date', { ascending: true }).limit(1);
  const { data: maxDate } = await supabase.from('employees').select('join_date').order('join_date', { ascending: false }).limit(1);
  console.log('Join Date Range:', minDate[0].join_date, 'to', maxDate[0].join_date);
  
  const { data: managers } = await supabase.from('employees').select('*, positions!inner(is_managerial)').eq('positions.is_managerial', true);
  console.log('Managerial Employees:', managers.length);
}

check().catch(console.error);
