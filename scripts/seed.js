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
const DEPT_ID1 = 'de000000-0000-0000-0000-000000000001'; // HR
const DEPT_ID2 = 'de000000-0000-0000-0000-000000000002'; // IT
const DEPT_ID3 = 'de000000-0000-0000-0000-000000000003'; // Keuangan
const DEPT_ID4 = 'de000000-0000-0000-0000-000000000004'; // Operasional

const SEC_ID1 = 'ce000000-0000-0000-0000-000000000001';
const SEC_ID2 = 'ce000000-0000-0000-0000-000000000002';
const SEC_ID3 = 'ce000000-0000-0000-0000-000000000003';
const SEC_ID4 = 'ce000000-0000-0000-0000-000000000004';

const JG_ID1 = 'a0000000-0000-0000-0000-000000000001';
const JG_ID2 = 'a0000000-0000-0000-0000-000000000002';

const POS_ID1 = 'f0000000-0000-0000-0000-000000000001'; // HR Manager
const POS_ID1_STAFF = 'f0000000-0000-0000-0000-000000000011'; // HR Staff
const POS_ID2 = 'f0000000-0000-0000-0000-000000000002'; // IT Manager
const POS_ID2_STAFF = 'f0000000-0000-0000-0000-000000000022'; // IT Staff
const POS_ID3 = 'f0000000-0000-0000-0000-000000000003'; // Fin Manager
const POS_ID3_STAFF = 'f0000000-0000-0000-0000-000000000033'; // Fin Staff
const POS_ID4 = 'f0000000-0000-0000-0000-000000000004'; // Ops Manager
const POS_ID4_STAFF = 'f0000000-0000-0000-0000-000000000044'; // Ops Staff

const ET_ID1 = 'e0000000-0000-0000-0000-000000000001';
const ET_ID2 = 'e0000000-0000-0000-0000-000000000002';
const LT_ID1 = '10000000-0000-0000-0000-000000000001';
const LT_ID2 = '10000000-0000-0000-0000-000000000002';

const maleNames = [
  "Budi Santoso", "Agus Pratama", "Rizky Fadillah", "Hendra Wijaya", "Eko Purnomo",
  "Ahmad Fauzi", "I Made Sudarta", "Bambang Soeprapto", "Taufik Hidayat", "Yusuf Maulana",
  "Dwi Saputra", "Arief Rahman", "Dimas Anggara", "Surya Kusuma", "Fajar Nugroho",
  "Kevin Setiawan", "Rangga Aditya", "Yudi Pratama", "Ilham Akbar", "Reza Pahlawan",
  "Iqbal Ramadhan", "Andi Syahputra"
];

const femaleNames = [
  "Siti Rahmawati", "Ayu Kusuma", "Dewi Lestari", "Ratna Sari", "Maya Safitri",
  "Nisa Putri", "Luh Putu Eka", "Rina Amelia", "Sinta Wulandari", "Sri Wahyuni",
  "Dian Sastrowardoyo", "Fitriani Riska", "Indah Permatasari", "Kartika Sari", "Lia Amelia",
  "Mila Karmila", "Nadia Vega", "Novita Sari", "Putri Pertiwi", "Rani Mukerji",
  "Sari Nila", "Tari Zahra", "Ulfah Hasanah"
];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}
function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
    { id: SEC_ID2, department_id: DEPT_ID2, code: 'SEC-DEV', name: 'Development' },
    { id: SEC_ID3, department_id: DEPT_ID3, code: 'SEC-ACC', name: 'Accounting' },
    { id: SEC_ID4, department_id: DEPT_ID4, code: 'SEC-LOG', name: 'Logistics' }
  ];
  await supabase.from('sections').upsert(sections);

  const job_grades = [
    { id: JG_ID1, code: 'JG-1', name: 'Staff', level_order: 1, base_salary_min: 5000000, base_salary_max: 10000000 },
    { id: JG_ID2, code: 'JG-2', name: 'Manager', level_order: 2, base_salary_min: 15000000, base_salary_max: 30000000 }
  ];
  await supabase.from('job_grades').upsert(job_grades);

  const positions = [
    { id: POS_ID1, department_id: DEPT_ID1, section_id: SEC_ID1, job_grade_id: JG_ID2, code: 'P-HRM', title: 'HR Manager', is_managerial: true },
    { id: POS_ID1_STAFF, department_id: DEPT_ID1, section_id: SEC_ID1, job_grade_id: JG_ID1, code: 'P-HRS', title: 'HR Staff', is_managerial: false },
    
    { id: POS_ID2, department_id: DEPT_ID2, section_id: SEC_ID2, job_grade_id: JG_ID2, code: 'P-ITM', title: 'IT Manager', is_managerial: true },
    { id: POS_ID2_STAFF, department_id: DEPT_ID2, section_id: SEC_ID2, job_grade_id: JG_ID1, code: 'P-ITS', title: 'Software Engineer', is_managerial: false },
    
    { id: POS_ID3, department_id: DEPT_ID3, section_id: SEC_ID3, job_grade_id: JG_ID2, code: 'P-FINM', title: 'Finance Manager', is_managerial: true },
    { id: POS_ID3_STAFF, department_id: DEPT_ID3, section_id: SEC_ID3, job_grade_id: JG_ID1, code: 'P-FINS', title: 'Finance Staff', is_managerial: false },

    { id: POS_ID4, department_id: DEPT_ID4, section_id: SEC_ID4, job_grade_id: JG_ID2, code: 'P-OPSM', title: 'Operations Manager', is_managerial: true },
    { id: POS_ID4_STAFF, department_id: DEPT_ID4, section_id: SEC_ID4, job_grade_id: JG_ID1, code: 'P-OPSS', title: 'Operations Staff', is_managerial: false }
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

  const employees = [];
  
  // Create Managers First
  const deptConfigs = [
    { dept: DEPT_ID1, sec: SEC_ID1, mpos: POS_ID1, spos: POS_ID1_STAFF, mid: 'e0000000-0000-0000-0000-000000000001', gender: 'L', name: maleNames[0], quota: 5 }, // HR
    { dept: DEPT_ID2, sec: SEC_ID2, mpos: POS_ID2, spos: POS_ID2_STAFF, mid: 'e0000000-0000-0000-0000-000000000002', gender: 'P', name: femaleNames[0], quota: 10 }, // IT
    { dept: DEPT_ID3, sec: SEC_ID3, mpos: POS_ID3, spos: POS_ID3_STAFF, mid: 'e0000000-0000-0000-0000-000000000003', gender: 'L', name: maleNames[1], quota: 10 }, // KEU
    { dept: DEPT_ID4, sec: SEC_ID4, mpos: POS_ID4, spos: POS_ID4_STAFF, mid: 'e0000000-0000-0000-0000-000000000004', gender: 'P', name: femaleNames[1], quota: 16 } // OPS
  ];

  let nameIndexMale = 2;
  let nameIndexFemale = 2;

  // Insert Managers
  for(let c of deptConfigs) {
    employees.push({
      id: c.mid,
      company_id: C_ID,
      branch_id: B_ID1,
      business_unit_id: BU_ID,
      division_id: DIV_ID,
      department_id: c.dept,
      section_id: c.sec,
      employment_type_id: ET_ID1,
      position_id: c.mpos,
      job_grade_id: JG_ID2,
      employee_number: `NIK-M${employees.length + 1}`,
      full_name: c.name,
      email: `${c.name.split(' ')[0].toLowerCase()}@indocater.co.id`,
      birth_date: randomDate(new Date(1970, 0, 1), new Date(1985, 0, 1)),
      employee_status: 'AKTIF',
      join_date: randomDate(new Date(2015, 0, 1), new Date(2018, 0, 1)),
      gender: c.gender,
      national_id_number: `3171${Math.floor(Math.random() * 900000000000 + 100000000000)}`,
      marital_status: 'KAWIN',
      phone: `0812${Math.floor(Math.random() * 9000000 + 1000000)}`,
      manager_id: null
    });
  }

  // Insert Staff
  let empIdx = 5;
  for(let c of deptConfigs) {
    for(let i=0; i<c.quota; i++) {
      const isMale = Math.random() > 0.5;
      let gender = 'L';
      let name = '';
      if (isMale && nameIndexMale < maleNames.length) {
        name = maleNames[nameIndexMale++];
      } else if (!isMale && nameIndexFemale < femaleNames.length) {
        gender = 'P';
        name = femaleNames[nameIndexFemale++];
      } else {
        // fallback
        name = isMale ? `Test Pria ${empIdx}` : `Test Wanita ${empIdx}`; 
      }

      employees.push({
        id: `e0000000-0000-0000-0000-0000000000${empIdx.toString().padStart(2, '0')}`,
        company_id: C_ID,
        branch_id: B_ID1,
        business_unit_id: BU_ID,
        division_id: DIV_ID,
        department_id: c.dept,
        section_id: c.sec,
        employment_type_id: Math.random() > 0.2 ? ET_ID1 : ET_ID2,
        position_id: c.spos,
        job_grade_id: JG_ID1,
        employee_number: `NIK-${100 + empIdx}`,
        full_name: name,
        email: `${name.split(' ')[0].toLowerCase()}.${empIdx}@indocater.co.id`,
        birth_date: randomDate(new Date(1985, 0, 1), new Date(2002, 0, 1)),
        employee_status: 'AKTIF',
        join_date: randomDate(new Date(2018, 0, 1), new Date(2025, 0, 1)),
        gender: gender,
        national_id_number: `3171${Math.floor(Math.random() * 900000000000 + 100000000000)}`,
        marital_status: Math.random() > 0.5 ? 'KAWIN' : 'BELUM_KAWIN',
        phone: `0812${Math.floor(Math.random() * 9000000 + 1000000)}`,
        manager_id: c.mid
      });
      empIdx++;
    }
  }

  const { error: empError } = await supabase.from('employees').upsert(employees);
  if (empError) console.error('Employee Error:', empError);

  // Generate 20 leave requests
  const leave_requests = [];
  const reasons = [
    "Menghadiri acara keluarga di luar kota",
    "Pemulihan pasca sakit flu berat",
    "Urusan administrasi kependudukan",
    "Cuti melahirkan",
    "Perjalanan liburan keluarga",
    "Menjenguk keluarga yang sakit",
    "Renovasi rumah",
    "Pernikahan kerabat dekat"
  ];
  const statuses = ['DIAJUKAN', 'DISETUJUI', 'DISETUJUI', 'DISETUJUI', 'DITOLAK']; // weighted towards approved
  
  for(let i=1; i<=20; i++) {
    const emp = randomElement(employees.filter(e => e.manager_id !== null)); // staff
    const lType = Math.random() > 0.3 ? LT_ID1 : LT_ID2;
    const start = randomDate(new Date(2026, 0, 1), new Date(2026, 11, 28));
    const startD = new Date(start);
    const total_days = Math.floor(Math.random() * 4) + 1;
    const end = new Date(startD.getTime() + total_days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const status = randomElement(statuses);
    const reason = randomElement(reasons);
    
    leave_requests.push({
      id: `20000000-0000-0000-0000-0000000000${i.toString().padStart(2, '0')}`,
      employee_id: emp.id,
      leave_type_id: lType,
      start_date: start,
      end_date: end,
      total_days: total_days,
      reason: reason,
      status: status,
      approver_id: status !== 'DIAJUKAN' ? emp.manager_id : null,
      approved_at: status !== 'DIAJUKAN' ? new Date().toISOString() : null
    });
  }

  const { error: lrError } = await supabase.from('leave_requests').upsert(leave_requests);
  if (lrError) console.error('Leave Request Error:', lrError);

  console.log('Seeding finished!');
}

seed().catch(console.error);
