const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1]] = match[2].replace(/['"]/g, '').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

async function runVerification() {
  console.log('--- TASK 1: Verifikasi Realization ---');
  const { data: test, error: err } = await supabase.from('training_participants').insert([{ realization_id: 'real-1', employee_id: 'EMP-1' }]).select();
  console.log('Insert test (without employee_name):', test ? test : err?.message);
  
  const { data: certTest, error: certErr } = await supabase.from('certificates').select('*').limit(1);
  console.log('Certificates table exists?', certTest ? 'YES' : 'NO', certErr ? certErr.message : '');
  console.log('\n--- TASK 3: Verifikasi Upload Sertifikat ---');
  // Create dummy PDF
  const dummyPdf = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52, 10, 37, 195, 164, 195, 188, 195, 182, 195, 159, 10]);
  const fileName = `test_cert_${Date.now()}.pdf`;

  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from('certificate-documents')
    .upload(fileName, dummyPdf, { contentType: 'application/pdf' });

  if (uploadErr) {
    console.log('Upload error:', uploadErr);
  } else {
    console.log('Upload successful! Path:', uploadData.path);
    const { data: urlData } = supabase.storage.from('certificate-documents').getPublicUrl(uploadData.path);
    console.log('Public URL:', urlData.publicUrl);
    
    // Insert into certificates table
    const { data: certData, error: certErr } = await supabase.from('certificates').insert([
      { employee_id: 'EMP-1111', employee: 'TEST EMP 1', certification: 'Test Cert', category: 'Umum', issuer: 'External', credentialId: 'EXT-123', issuedDate: '2026-08-01', expiryDate: '2027-08-01', status: 'Aktif', document_url: urlData.publicUrl }
    ]).select();

    if (certErr) {
      console.log('Error saving to certificates table:', certErr);
    } else {
      console.log('Successfully saved to certificates table. Document URL:', certData[0].document_url);
    }
  }

  // Cleanup
  await supabase.from('certificates').delete().eq('credentialId', 'EXT-123');
  if (uploadData?.path) {
    await supabase.storage.from('certificate-documents').remove([uploadData.path]);
  }
  console.log('\nCleanup done.');
}

runVerification();
