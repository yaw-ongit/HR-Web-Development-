const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'your-secret-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  // Check audit_logs
  const { data: auditCols, error: errCols } = await supabase.rpc('execute_sql', { sql_query: `
    SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'audit_logs';
  `});
  if (errCols) {
    console.log('Using fallback for audit_logs columns');
    const { data: fallbackCols } = await supabase.from('audit_logs').select('*').limit(1);
    console.log('audit_logs columns (fallback):', Object.keys(fallbackCols?.[0] || {}));
  } else {
    console.log('audit_logs columns:', auditCols);
  }

  const { data: auditData, error: errAudit } = await supabase.from('audit_logs').select('*');
  console.log('audit_logs count:', auditData?.length);
  if (auditData?.length) console.log('audit_logs sample:', auditData.slice(0, 2));

  // Check employees
  const { data: empData, error: errEmp } = await supabase.from('employees').select('id, employee_status');
  const total = empData?.length || 0;
  const aktif = empData?.filter(e => e.employee_status === 'AKTIF').length || 0;
  const nonAktif = empData?.filter(e => e.employee_status === 'NON_AKTIF').length || 0;
  console.log(`Employees: Total=${total}, AKTIF=${aktif}, NON_AKTIF=${nonAktif}`);
}
run();
