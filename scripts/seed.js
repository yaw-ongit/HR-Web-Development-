const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmlzrpwurxeykbduxscf.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Valid hex prefixes
const C_ID = 'c0000000-0000-0000-0000-000000000001';
const B_ID1 = 'b0000000-0000-0000-0000-000000000001';
const B_ID2 = 'b0000000-0000-0000-0000-000000000002';
const BU_ID = 'b0000001-0000-0000-0000-000000000001';
const DIV_ID = 'd0000000-0000-0000-0000-000000000001';
const DEPT_ID1 = 'de000000-0000-0000-0000-000000000001';
const DEPT_ID2 = 'de000000-0000-0000-0000-000000000002';
const DEPT_ID3 = 'de000000-0000-0000-0000-000000000003';
const DEPT_ID4 = 'de000000-0000-0000-0000-000000000004';
const SEC_ID1 = 'ce000000-0000-0000-0000-000000000001';
const SEC_ID2 = 'ce000000-0000-0000-0000-000000000002';
const JG_ID1 = 'a0000000-0000-0000-0000-000000000001';
const JG_ID2 = 'a0000000-0000-0000-0000-000000000002';
const POS_ID1 = 'f0000000-0000-0000-0000-000000000001';
const POS_ID2 = 'f0000000-0000-0000-0000-000000000002';
const POS_ID3 = 'f0000000-0000-0000-0000-000000000003';
const ET_ID1 = 'e0000000-0000-0000-0000-000000000001';
const ET_ID2 = 'e0000000-0000-0000-0000-000000000002';
const LT_ID1 = '10000000-0000-0000-0000-000000000001';
const LT_ID2 = '10000000-0000-0000-0000-000000000002';

async function seed() {
  console.log('Seeding started...');

  const companies = [{ id: C_ID, code: 'COMP01', name: 'Indocater', legal_name: 'PT Indocater Nusantara' }];
  await supabase.from('companies').upsert(companies);
  
  const branches = [
    { id: B_ID1, company_id: C_ID, code: 'JKT-HQ', name: 'Jakarta Pusat', branch_type: 'HEAD_OFFICE', is_remote_site: false },
    { id: B_ID2, company_id: C_ID, code: 'SBY-BR', name: 'Surabaya', branch_type: 'BRANCH', is_remote_site: false }
  ];
  await supabase.from('branches').upsert(branches);

  const business_units = [{ id: BU_ID, company_id: C_ID, code: 'BU-CORP', name: 'Corporate' }];
  await supabase.from('business_units').upsert(business_units);

  const divisions = [{ id: DIV_ID, business_unit_id: BU_ID, code: 'DIV-HR', name: 'Human Resources' }];
  await supabase.from('divisions').upsert(divisions);

  const departments = [
    { id: DEPT_ID1, branch_id: B_ID1, division_id: DIV_ID, code: 'D-SDM', name: 'Sumber Daya Manusia' },
    { id: DEPT_ID2, branch_id: B_ID1, division_id: DIV_ID, code: 'D-TI', name: 'Teknologi Informasi' },
    { id: DEPT_ID3, branch_id: B_ID1, division_id: DIV_ID, code: 'D-KEU', name: 'Keuangan' },
    { id: DEPT_ID4, branch_id: B_ID1, division_id: DIV_ID, code: 'D-OPS', name: 'Operasional' }
  ];
  await supabase.from('departments').upsert(departments);

  const sections = [
    { id: SEC_ID1, department_id: DEPT_ID1, code: 'SEC-REC', name: 'Rekrutmen' },
    { id: SEC_ID2, department_id: DEPT_ID2, code: 'SEC-DEV', name: 'Development' }
  ];
  await supabase.from('sections').upsert(sections);

  const job_grades = [
    { id: JG_ID1, code: 'JG-1', name: 'Staff', level_order: 1, base_salary_min: 5000000, base_salary_max: 10000000 },
    { id: JG_ID2, code: 'JG-2', name: 'Manager', level_order: 2, base_salary_min: 15000000, base_salary_max: 30000000 }
  ];
  await supabase.from('job_grades').upsert(job_grades);

  const positions = [
    { id: POS_ID1, department_id: DEPT_ID1, section_id: SEC_ID1, job_grade_id: JG_ID2, code: 'P-HRM', title: 'HR Manager', is_managerial: true },
    { id: POS_ID2, department_id: DEPT_ID2, section_id: SEC_ID2, job_grade_id: JG_ID1, code: 'P-SDE', title: 'Software Engineer', is_managerial: false },
    { id: POS_ID3, department_id: DEPT_ID3, section_id: SEC_ID1, job_grade_id: JG_ID1, code: 'P-FIN', title: 'Finance Staff', is_managerial: false }
  ];
  await supabase.from('positions').upsert(positions);

  const employment_types = [
    { id: ET_ID1, code: 'ET-TETAP', name: 'Tetap', is_permanent: true },
    { id: ET_ID2, code: 'ET-KONTRAK', name: 'Kontrak', is_permanent: false }
  ];
  await supabase.from('employment_types').upsert(employment_types);

  const leave_types = [
    { id: LT_ID1, code: 'LT-TAHUNAN', name: 'Cuti Tahunan', default_days_per_year: 12, is_paid: true, requires_document: false },
    { id: LT_ID2, code: 'LT-SAKIT', name: 'Cuti Sakit', default_days_per_year: 14, is_paid: true, requires_document: true }
  ];
  await supabase.from('leave_types').upsert(leave_types);

  const names = ['Budi Santoso', 'Siti Rahmawati', 'Agus Pratama', 'Ayu Kusuma', 'Rizky Fadillah', 'Dewi Lestari', 'Hendra Wijaya', 'Ratna Sari', 'Eko Purnomo', 'Maya Safitri'];
  const employees = [];
  
  let emp2Id = '';
  let emp3Id = '';

  for(let i=1; i<=45; i++) {
    const id = `e0000000-0000-0000-0000-0000000000${i.toString().padStart(2, '0')}`;
    if (i === 2) emp2Id = id;
    if (i === 3) emp3Id = id;

    const nameIndex = i % names.length;
    employees.push({
      id: id,
      company_id: C_ID,
      branch_id: B_ID1,
      business_unit_id: BU_ID,
      division_id: DIV_ID,
      department_id: i % 2 === 0 ? DEPT_ID1 : DEPT_ID2, section_id: i % 2 === 0 ? SEC_ID1 : SEC_ID2,
      employment_type_id: i % 3 === 0 ? ET_ID2 : ET_ID1,
      position_id: i === 1 ? POS_ID1 : POS_ID2,
      job_grade_id: i === 1 ? JG_ID2 : JG_ID1,
      employee_number: `NIK-${100 + i}`,
      full_name: `${names[nameIndex]} ${i}`,
      email: `emp${i}@indocater.co.id`,
      birth_date: '1990-01-01',
      employee_status: 'AKTIF',
      join_date: '2020-01-01',
      national_id_number: `3171${100000000000 + i}`, marital_status: 'BELUM_KAWIN', phone: `0812345678${i.toString().padStart(2, '0')}`, gender: i % 2 === 0 ? 'L' : 'P'
    });
  }

  const { error: empError } = await supabase.from('employees').upsert(employees);
  if (empError) console.error('Employee Error:', empError);

  const leave_requests = [
    { id: '20000000-0000-0000-0000-000000000001', employee_id: emp2Id, leave_type_id: LT_ID1, start_date: '2026-08-10', end_date: '2026-08-12', total_days: 3, reason: 'Menghadiri acara keluarga di Bandung', status: 'DISETUJUI' },
    { id: '20000000-0000-0000-0000-000000000002', employee_id: emp3Id, leave_type_id: LT_ID2, start_date: '2026-07-28', end_date: '2026-07-29', total_days: 2, reason: 'Pemulihan pasca sakit demam berdarah', status: 'DIAJUKAN' }
  ];
  const { error: lrError } = await supabase.from('leave_requests').upsert(leave_requests);
  if (lrError) console.error('Leave Request Error:', lrError);

  console.log('Seeding finished!');
}

seed().catch(console.error);
