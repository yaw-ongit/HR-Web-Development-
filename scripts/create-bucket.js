const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseServiceKey) {
  console.log('No service key provided');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data, error } = await supabase.storage.createBucket('certificate-documents', {
    public: true, // we can make it true for easy view, or false and use signed urls. Let's make it public for simplicity and standard public bucket setup unless strict RLS is required. Wait, prompt says: "hanya user terautentikasi yang bisa upload/lihat, konsisten dengan RLS". So public: false.
  });
  if (error && error.message !== 'The resource already exists') {
    console.error('Error creating bucket:', error);
  } else {
    console.log('Bucket created or already exists.');
  }

  // Create RLS via execute_sql if possible
  const sql = `
    INSERT INTO storage.buckets (id, name, public) VALUES ('certificate-documents', 'certificate-documents', false) ON CONFLICT DO NOTHING;
    
    DROP POLICY IF EXISTS "Auth_Select_CertDocs" ON storage.objects;
    CREATE POLICY "Auth_Select_CertDocs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'certificate-documents');
    
    DROP POLICY IF EXISTS "Auth_Insert_CertDocs" ON storage.objects;
    CREATE POLICY "Auth_Insert_CertDocs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'certificate-documents');
  `;
  const { error: sqlError } = await supabase.rpc('execute_sql', { sql_query: sql });
  if (sqlError) {
    console.log('Failed to execute SQL for policies (maybe rpc not available). Error:', sqlError.message);
  } else {
    console.log('Policies created successfully.');
  }
}
run();