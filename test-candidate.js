const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_KEY || 'your-secret-key');
async function run() {
  const { data: vac } = await supabase.from('job_vacancies').select('id').limit(1);
  const vacId = vac[0].id;
  const payload = {
    full_name: 'Calon Pegawai Test',
    email: 'calon@example.com',
    phone: '08123456789',
    gender: 'L',
    job_vacancy_id: vacId,
    status: 'BARU'
  };
  const { data, error } = await supabase.from('candidates').insert([payload]).select().single();
  console.log('Inserted candidate:', data?.id, error);
}
run();
