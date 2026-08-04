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
  console.log('Logging in demo user...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'demo@indocater.co.id',
    password: 'password123',
  });
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data.session ? 'Got session' : 'No session');
  }
}

loginDemoUser();