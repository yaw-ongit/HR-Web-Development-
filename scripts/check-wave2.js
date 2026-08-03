const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const tables = [
    'employee_educations', 'employee_families', 'employee_skills', 'employee_emergency_contacts',
    'attendances', 'training_programs', 'job_vacancies', 'candidates', 'certification_types', 'certificates'
  ];

  console.log('--- Row Counts ---');
  for (const t of tables) {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
    console.log(`${t}: ${count}`);
  }

  console.log('\n--- Sample Educations ---');
  const { data: edu } = await supabase.from('employee_educations').select('*').limit(2);
  console.log(edu);

  console.log('\n--- Sample Training ---');
  const { data: tp } = await supabase.from('training_programs').select('*').limit(2);
  console.log(tp);

  console.log('\n--- Sample Candidates ---');
  const { data: cand } = await supabase.from('candidates').select('*').limit(2);
  console.log(cand);
  
  console.log('\n--- Sample Certificates ---');
  const { data: cert } = await supabase.from('certificates').select('*').limit(2);
  console.log(cert);
}
check();