const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

async function run() {
  console.log('--- STARTING SEED HISTORICAL ---');

  // We need to add 3-5 terminated employees
  const { data: companies } = await supabase.from('companies').select('id').limit(1);
  const { data: branches } = await supabase.from('branches').select('id').limit(1);
  const { data: bus } = await supabase.from('business_units').select('id').limit(1);
  const { data: divs } = await supabase.from('divisions').select('id').limit(1);
  const { data: depts } = await supabase.from('departments').select('id').limit(1);
  const { data: secs } = await supabase.from('sections').select('id').limit(1);
  const { data: pos } = await supabase.from('positions').select('id').limit(1);
  const { data: jg } = await supabase.from('job_grades').select('id').limit(1);
  const { data: et } = await supabase.from('employment_types').select('id').limit(1);
  
  if (!companies || !branches) throw new Error('Missing base reference data');

  const C_ID = companies[0].id;
  const B_ID = branches[0].id;
  const BU_ID = bus[0].id;
  const DIV_ID = divs[0].id;
  const DEPT_ID = depts[0].id;
  const SEC_ID = secs[0].id;
  const POS_ID = pos[0].id;
  const JG_ID = jg[0].id;
  const ET_ID = et[0].id;

  const departedNames = ["Eko Prasetyo", "Rina Wulandari", "Galih Saputra", "Dita Anggraini"];
  
  const newEmployees = departedNames.map((name, i) => {
    // joined 10-12 months ago
    const joinDate = randomDate(new Date(2025, 6, 1), new Date(2025, 9, 1));
    // departed 1-3 months ago
    const deletedAt = randomDate(new Date(2026, 4, 1), new Date(2026, 6, 1));
    
    return {
      id: `e1000000-0000-0000-0000-${(i+1).toString().padStart(12, '0')}`,
      company_id: C_ID,
      branch_id: B_ID,
      business_unit_id: BU_ID,
      division_id: DIV_ID,
      department_id: DEPT_ID,
      section_id: SEC_ID,
      employment_type_id: ET_ID,
      position_id: POS_ID,
      job_grade_id: JG_ID,
      employee_number: `NIK-RES-${100 + i}`,
      full_name: name,
      email: `resigned${i}@indocater.co.id`,
      birth_date: '1992-01-01',
      employee_status: 'NON_AKTIF',
      join_date: joinDate,
      gender: i % 2 === 0 ? 'L' : 'P',
      national_id_number: `3171${Math.floor(Math.random() * 900000000000 + 100000000000)}`,
      marital_status: 'BELUM_KAWIN',
      phone: `0812${Math.floor(Math.random() * 9000000 + 1000000)}`,
      deleted_at: new Date(deletedAt).toISOString()
    };
  });

  const { error: empErr } = await supabase.from('employees').upsert(newEmployees);
  if (empErr) throw new Error('Employees Err: ' + JSON.stringify(empErr));
  console.log(`OK: inserted ${newEmployees.length} departed employees`);

  const employmentHistories = newEmployees.map((emp) => ({
    id: `e1100000-0000-0000-0000-${emp.id.split('-')[4]}`,
    employee_id: emp.id,
    effective_date: emp.deleted_at.split('T')[0],
    status: 'NON_AKTIF',
    notes: 'Mengundurkan diri'
  }));

  const { error: ehErr } = await supabase.from('employment_histories').upsert(employmentHistories);
  if (ehErr) throw new Error('Emp History Err: ' + JSON.stringify(ehErr));
  console.log(`OK: inserted ${employmentHistories.length} employment histories`);

  // MCU Data - We'll add medical claims with description 'MCU Tahunan' for some active employees
  const { data: activeEmployees } = await supabase.from('employees').select('id').eq('employee_status', 'AKTIF').limit(35);
  // Need employee insurances first to make claims
  const { data: insurances } = await supabase.from('employee_insurances').select('id, employee_id').limit(35);
  
  if (insurances && insurances.length > 0) {
    const claims = insurances.slice(0, 30).map((ins, i) => ({
      id: `f1100000-0000-0000-0000-${(i+1).toString().padStart(12, '0')}`,
      employee_id: ins.employee_id,
      employee_insurance_id: ins.id,
      claim_number: `MCU-2026-${i}`,
      claim_date: '2026-03-15',
      description: 'MCU Tahunan',
      claimed_amount: 500000,
      approved_amount: 500000,
      status: 'DISETUJUI'
    }));
    const { error: mcErr } = await supabase.from('medical_claims').upsert(claims);
    if (mcErr) throw new Error('Medical Claims Err: ' + JSON.stringify(mcErr));
    console.log(`OK: inserted ${claims.length} MCU claims`);
  } else {
    console.log('Skipped MCU claims: no insurances found');
  }

}

run().catch(console.error);
