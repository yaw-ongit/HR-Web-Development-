const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://pmlzrpwurxeykbduxscf.supabase.co', process.env.SUPABASE_SERVICE_KEY || 'your-secret-key');
async function run() {
  // Test Employee Add
  const payloadEmp = {
    full_name: 'Pegawai Baru',
    email: 'baru@test.com',
    phone: '080000',
    national_id_number: '123123123123',
    gender: 'L',
    marital_status: 'BELUM_KAWIN',
    birth_date: '1990-01-01',
    join_date: '2026-08-01',
    department_id: 'de000000-0000-0000-0000-000000000001',
    position_id: 'f0000000-0000-0000-0000-000000000001',
    employment_type_id: 'e0000000-0000-0000-0000-000000000001',
    employee_number: 'NIK-TEST-99',
    employee_status: 'AKTIF',
    company_id: 'c0000000-0000-0000-0000-000000000001',
    branch_id: 'b0000000-0000-0000-0000-000000000001',
    business_unit_id: 'b0000001-0000-0000-0000-000000000001',
    division_id: 'd0000000-0000-0000-0000-000000000001',
    section_id: 'ce000000-0000-0000-0000-000000000001',
    job_grade_id: 'a0000000-0000-0000-0000-000000000001'
  };
  const { data: d1, error: e1 } = await supabase.from('employees').insert([payloadEmp]).select().single();
  console.log('Employee inserted:', d1?.id, e1);

  // Test Benefit Claim
  const payloadClaim = {
    description: 'Rawat Inap',
    claimed_amount: 500000,
    claim_date: '2026-08-01',
    status: 'DIAJUKAN',
    employee_id: 'e0000000-0000-0000-0000-000000000001',
    employee_insurance_id: '12000000-0000-0000-0000-000000000001',
    claim_number: 'CLM-TEST'
  };
  const { data: d2, error: e2 } = await supabase.from('medical_claims').insert([payloadClaim]).select().single();
  console.log('Claim inserted:', d2?.id, e2);
}
run();
