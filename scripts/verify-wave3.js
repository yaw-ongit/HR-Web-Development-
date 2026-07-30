const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);

async function verify() {
  const tables = [
    'attendances', 'overtimes', 
    'job_vacancies', 'candidates', 'interview_schedules', 'hirings', 'onboardings',
    'document_types', 'employee_documents', 'employee_assets', 'contract_histories',
    'insurance_providers', 'benefit_types', 'employee_insurances',
    'announcements', 'notifications', 'audit_logs'
  ];
  
  for (const t of tables) {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
    console.log(t + ': ' + count);
  }
}
verify();
