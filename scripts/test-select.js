const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'your-secret-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  const { data, error } = await supabase.from('companies').select('*');
  console.log('Companies:', data);
  console.log('Error:', error);
}

test();
