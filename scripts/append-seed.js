/* eslint-disable */
const fs = require('fs');

let seedContent = fs.readFileSync('scripts/seed.js', 'utf8');

// We will insert our new logic right before \`console.log('Seeding finished!');\`
const insertionPoint = "  console.log('Seeding finished!');";

const newLogic = \`
  console.log('Seeding wave 2...');
  
  // PHASE 1
  const employee_educations = [];
  const employee_families = [];
  const employee_skills = [];
  const employee_emergency_contacts = [];

  const unis = ["Universitas Indonesia", "Institut Teknologi Bandung", "Universitas Gadjah Mada", "Universitas Airlangga", "Bina Nusantara"];
  const majors = ["Teknik Informatika", "Sistem Informasi", "Akuntansi", "Manajemen Bisnis", "Ilmu Komunikasi"];
  const skills = ["Pengembangan Web", "SQL", "Akuntansi", "Analisis Keuangan", "Manajemen Proyek", "Komunikasi", "Negosiasi"];

  employees.forEach((emp, index) => {
    // Educations (80% coverage)
    if (Math.random() > 0.2) {
      employee_educations.push({
        id: \\\`30000000-0000-0000-0000-0000000000\${index.toString().padStart(2, '0')}\\\`,
        employee_id: emp.id,
        education_level: Math.random() > 0.5 ? "S1" : "D3",
        institution_name: randomElement(unis),
        major: randomElement(majors),
        graduation_year: Math.floor(Math.random() * 15) + 2005,
        gpa: parseFloat((Math.random() * 1.0 + 3.0).toFixed(2))
      });
    }

    // Families (only KAWIN)
    if (emp.marital_status === 'KAWIN') {
      employee_families.push({
        id: \\\`40000000-0000-0000-0000-0000000000\${index.toString().padStart(2, '0')}\\\`,
        employee_id: emp.id,
        full_name: \\\`Keluarga \${emp.full_name}\\\`,
        relationship: randomElement(["Suami", "Istri", "Anak"]),
        is_dependent: true
      });
    }

    // Skills
    employee_skills.push({
      id: \\\`50000000-0000-0000-0000-0000000000\${index.toString().padStart(2, '0')}\\\`,
      employee_id: emp.id,
      skill_name: randomElement(skills),
      proficiency_level: randomElement(["Pemula", "Menengah", "Mahir"])
    });

    // Emergency Contacts
    employee_emergency_contacts.push({
      id: \\\`60000000-0000-0000-0000-0000000000\${index.toString().padStart(2, '0')}\\\`,
      employee_id: emp.id,
      full_name: \\\`Darurat \${emp.full_name}\\\`,
      relationship: "Saudara",
      phone: \\\`0819\${Math.floor(Math.random() * 9000000 + 1000000)}\\\`
    });
  });

  const { error: errEd } = await supabase.from('employee_educations').upsert(employee_educations);
  if (errEd) console.error('Edu Err:', errEd);
  const { error: errFam } = await supabase.from('employee_families').upsert(employee_families);
  if (errFam) console.error('Fam Err:', errFam);
  const { error: errSk } = await supabase.from('employee_skills').upsert(employee_skills);
  if (errSk) console.error('Skill Err:', errSk);
  const { error: errEc } = await supabase.from('employee_emergency_contacts').upsert(employee_emergency_contacts);
  if (errEc) console.error('EC Err:', errEc);

  // PHASE 2: Attendances
  const attendances = [];
  let attId = 1;
  const today = new Date();
  for(let i=0; i<5; i++) { // 5 days
    const dateStr = new Date(today.getTime() - i * 24*60*60*1000).toISOString().split('T')[0];
    for (const emp of employees) {
      const isLate = Math.random() > 0.8;
      const checkInTime = isLate ? "09:15:00" : "08:00:00";
      attendances.push({
        id: \\\`70000000-0000-0000-0000-\${attId.toString().padStart(12, '0')}\\\`,
        employee_id: emp.id,
        attendance_date: dateStr,
        scheduled_check_in: "08:00:00",
        scheduled_check_out: "17:00:00",
        actual_check_in: checkInTime,
        actual_check_out: "17:05:00",
        status: isLate ? "TERLAMBAT" : "HADIR",
        late_minutes: isLate ? 15 : 0,
        early_leave_minutes: 0
      });
      attId++;
    }
  }
  const { error: errAtt } = await supabase.from('attendances').upsert(attendances);
  if (errAtt) console.error('Att Err:', errAtt);

  // PHASE 3: Training Programs
  const training_programs = [
    { id: '80000000-0000-0000-0000-000000000001', code: 'TR-01', name: 'Pelatihan Kepemimpinan', duration_hours: 16 },
    { id: '80000000-0000-0000-0000-000000000002', code: 'TR-02', name: 'Sertifikasi K3', duration_hours: 24 },
    { id: '80000000-0000-0000-0000-000000000003', code: 'TR-03', name: 'Keamanan Siber untuk Karyawan', duration_hours: 8 }
  ];
  const { error: errTr } = await supabase.from('training_programs').upsert(training_programs);
  if (errTr) console.error('Tr Err:', errTr);

  // PHASE 4: Candidates
  const job_vacancies = [
    { id: 'v0000000-0000-0000-0000-000000000001', vacancy_code: 'JV-01', title: 'Staf IT', department_id: DEPT_ID2, position_id: POS_ID2_STAFF, quota: 2, status: 'DIBUKA', opened_date: '2026-07-01' }
  ];
  await supabase.from('job_vacancies').upsert(job_vacancies);

  const candidates = [
    { id: '90000000-0000-0000-0000-000000000001', full_name: 'Calon Pegawai Satu', email: 'calon1@gmail.com', phone: '0811111', gender: 'L', job_vacancy_id: 'v0000000-0000-0000-0000-000000000001', status: 'BARU', applied_at: new Date().toISOString() },
    { id: '90000000-0000-0000-0000-000000000002', full_name: 'Calon Pegawai Dua', email: 'calon2@gmail.com', phone: '0822222', gender: 'P', job_vacancy_id: 'v0000000-0000-0000-0000-000000000001', status: 'SCREENING', applied_at: new Date().toISOString() }
  ];
  const { error: errCa } = await supabase.from('candidates').upsert(candidates);
  if (errCa) console.error('Ca Err:', errCa);

\`;

seedContent = seedContent.replace(insertionPoint, newLogic + '\\n' + insertionPoint);
fs.writeFileSync('scripts/seed.js', seedContent);
