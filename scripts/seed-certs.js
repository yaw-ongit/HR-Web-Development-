const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: employees } = await supabase.from('employees').select('id, full_name, marital_status');

  // Insurances, documents, certificates
  const cert_types = [
    { id: 'c0000000-0000-0000-0000-000000000001', code: 'CERT-01', name: 'Sertifikasi K3 Umum', is_mandatory: false, validity_months: 36 }
  ];
  await supabase.from('certification_types').upsert(cert_types);

  const certificates = [];
  // For first 3 employees
  for(let i=0; i<3; i++) {
    certificates.push({
      id: `d0000000-0000-0000-0000-${i.toString().padStart(12, '0')}`,
      employee_id: employees[i].id,
      certification_type_id: 'c0000000-0000-0000-0000-000000000001',
      certificate_number: `CERT-K3-2026-${i}`,
      issued_at: '2026-01-01',
      expired_at: '2029-01-01',
      issued_by: 'Kemenaker',
      status: 'AKTIF'
    });
  }
  await supabase.from('certificates').upsert(certificates);
  console.log('Certificates seeded');
}
run();