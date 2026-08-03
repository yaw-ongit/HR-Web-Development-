const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_KEY || 'your-secret-key');
async function run() {
  const code = 'TR-TEST-' + Math.floor(Math.random() * 9000);
  const payload = {
    code,
    name: 'Test Planning',
    category: 'Internal',
    description: 'This is a test',
    duration_hours: 8
  };
  const { data, error } = await supabase.from('training_programs').insert([payload]).select().single();
  console.log('Inserted:', data, error);
}
run();
