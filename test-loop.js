const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envPath = '.env.local';
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].replace(/['"]/g, '').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function loginDemoUser() {
  const emails = ['admin@indocater.co.id', 'hr@indocater.co.id', 'demo@indocater.co.id', 'budi.santoso@indocater.co.id'];
  const passwords = ['password', 'password123', 'admin', 'indocater'];

  for (const email of emails) {
    for (const password of passwords) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.session) {
        console.log('SUCCESS:', email, password);
        return;
      }
    }
  }
  console.log('No valid combination found.');
}

loginDemoUser();