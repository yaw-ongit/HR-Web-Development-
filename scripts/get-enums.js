const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_KEY || 'your-secret-key');

async function getEnums() {
  const { data: q1 } = await supabase.rpc('graphql', { query: '{ __type(name: "gender_type") { enumValues { name } } }' });
  const { data: q2 } = await supabase.rpc('graphql', { query: '{ __type(name: "leave_status_type") { enumValues { name } } }' });
  console.log('Gender:', q1);
  console.log('Leave Status:', q2);
}
getEnums();