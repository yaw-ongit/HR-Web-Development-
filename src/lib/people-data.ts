export type EmployeeRecord = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photo: string;
  initials: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  contractType: string;
  branch: string;
  location: string;
  gender: string;
  manager: string;
  lastActivity: string;
  email: string;
  phone: string;
  office: string;
};

export const departmentOptions = ['SDM', 'Teknologi', 'Penjualan', 'Keuangan', 'Produk', 'Hukum', 'Layanan Pelanggan'];
export const positionOptions = ['Generalist SDM', 'Manajer SDM', 'Pengembang Perangkat Lunak', 'Kepala Penjualan', 'Analis Produk', 'Desainer Produk', 'Konsultan Hukum', 'Direktur Layanan Pelanggan', 'Manajer Keuangan'];
export const statusOptions = ['Aktif', 'Cuti', 'Kontrak', 'Probation', 'Magang'];
export const contractOptions = ['Permanen', 'Waktu tertentu', 'Magang'];
export const branchOptions = ['Jakarta HQ', 'Surabaya Office', 'Bali Hub', 'Bandung Studio'];
export const locationOptions = ['Jakarta', 'Surabaya', 'Denpasar', 'Bandung', 'Remote'];
export const genderOptions = ['Perempuan', 'Laki-laki', 'Non-biner'];

export const employeeDirectory: EmployeeRecord[] = [
  {
    id: 'maya-sari',
    employeeId: 'EMP-1012',
    firstName: 'Maya',
    lastName: 'Sari',
    fullName: 'Maya Sari',
    photo: 'MS',
    initials: 'MS',
    department: 'SDM',
    position: 'Generalist SDM',
    status: 'Aktif',
    joinDate: '2021-04-12',
    contractType: 'Permanen',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: '2 jam lalu',
    email: 'maya.sari@indocater.co.id',
    phone: '+62 812-3456-7890',
    office: 'Tower A, Lt. 11',
  },
  {
    id: 'leo-wibowo',
    employeeId: 'EMP-1006',
    firstName: 'Leo',
    lastName: 'Wibowo',
    fullName: 'Leo Wibowo',
    photo: 'LW',
    initials: 'LW',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    status: 'Aktif',
    joinDate: '2022-01-19',
    contractType: 'Permanen',
    branch: 'Bandung Studio',
    location: 'Bandung',
    gender: 'Laki-laki',
    manager: 'Fitri Novita',
    lastActivity: 'Hari ini',
    email: 'leo.wibowo@indocater.co.id',
    phone: '+62 812-9988-2233',
    office: 'Bandung Studio Lt. 6',
  },
  {
    id: 'aulia-rizky',
    employeeId: 'EMP-1074',
    firstName: 'Aulia',
    lastName: 'Rizky',
    fullName: 'Aulia Rizky',
    photo: 'AR',
    initials: 'AR',
    department: 'Penjualan',
    position: 'Kepala Penjualan',
    status: 'Aktif',
    joinDate: '2020-09-03',
    contractType: 'Permanen',
    branch: 'Surabaya Office',
    location: 'Surabaya',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: 'Kemarin',
    email: 'aulia.rizky@indocater.co.id',
    phone: '+62 811-2233-4455',
    office: 'Surabaya Plaza Lt. 2',
  },
  {
    id: 'zara-nurhidayah',
    employeeId: 'EMP-1031',
    firstName: 'Zara',
    lastName: 'Nurhidayah',
    fullName: 'Zara Nurhidayah',
    photo: 'ZN',
    initials: 'ZN',
    department: 'Produk',
    position: 'Desainer Produk',
    status: 'Cuti',
    joinDate: '2019-06-28',
    contractType: 'Permanen',
    branch: 'Bali Hub',
    location: 'Denpasar',
    gender: 'Perempuan',
    manager: 'Maya Sari',
    lastActivity: '3 hari lalu',
    email: 'zara.nurhidayah@indocater.co.id',
    phone: '+62 812-5567-8910',
    office: 'Bali Creative Space Lt. 3',
  },
  {
    id: 'noor-fadhila',
    employeeId: 'EMP-1020',
    firstName: 'Noor',
    lastName: 'Fadhila',
    fullName: 'Noor Fadhila',
    photo: 'NF',
    initials: 'NF',
    department: 'SDM',
    position: 'Manajer SDM',
    status: 'Aktif',
    joinDate: '2017-11-15',
    contractType: 'Permanen',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Laki-laki',
    manager: 'Dewi Lestari',
    lastActivity: 'Hari ini',
    email: 'noor.fadhila@indocater.co.id',
    phone: '+62 811-3344-5566',
    office: 'Tower B, Lt. 8',
  },
  {
    id: 'lia-pratiwi',
    employeeId: 'EMP-1088',
    firstName: 'Lia',
    lastName: 'Pratiwi',
    fullName: 'Lia Pratiwi',
    photo: 'LP',
    initials: 'LP',
    department: 'Layanan Pelanggan',
    position: 'Direktur Layanan Pelanggan',
    status: 'Aktif',
    joinDate: '2021-12-05',
    contractType: 'Permanen',
    branch: 'Remote',
    location: 'Remote',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: '4 jam lalu',
    email: 'lia.pratiwi@indocater.co.id',
    phone: '+62 811-555-2233',
    office: 'Remote',
  },
  {
    id: 'caleb-santoso',
    employeeId: 'EMP-1105',
    firstName: 'Caleb',
    lastName: 'Santoso',
    fullName: 'Caleb Santoso',
    photo: 'CS',
    initials: 'CS',
    department: 'Keuangan',
    position: 'Manajer Keuangan',
    status: 'Aktif',
    joinDate: '2018-03-20',
    contractType: 'Permanen',
    branch: 'Bandung Studio',
    location: 'Bandung',
    gender: 'Laki-laki',
    manager: 'Dewi Lestari',
    lastActivity: 'Hari ini',
    email: 'caleb.santoso@indocater.co.id',
    phone: '+62 811-9988-5544',
    office: 'Bandung Studio Lt. 5',
  },
  {
    id: 'juni-rahmawati',
    employeeId: 'EMP-1112',
    firstName: 'Juni',
    lastName: 'Rahmawati',
    fullName: 'Juni Rahmawati',
    photo: 'JR',
    initials: 'JR',
    department: 'Hukum',
    position: 'Konsultan Hukum',
    status: 'Aktif',
    joinDate: '2020-02-14',
    contractType: 'Waktu tertentu',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Noor Fadhila',
    lastActivity: '1 minggu lalu',
    email: 'juni.rahmawati@indocater.co.id',
    phone: '+62 811-2233-9988',
    office: 'Tower A, Lt. 4',
  },
  {
    id: 'emily-putri',
    employeeId: 'EMP-1123',
    firstName: 'Emily',
    lastName: 'Putri',
    fullName: 'Emily Putri',
    photo: 'EP',
    initials: 'EP',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    status: 'Magang',
    joinDate: '2024-02-01',
    contractType: 'Magang',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Leo Wibowo',
    lastActivity: 'Hari ini',
    email: 'emily.putri@indocater.co.id',
    phone: '+62 813-9988-2233',
    office: 'Tower A, Lt. 6',
  },
  {
    id: 'sophia-septiani',
    employeeId: 'EMP-1141',
    firstName: 'Sophia',
    lastName: 'Septiani',
    fullName: 'Sophia Septiani',
    photo: 'SS',
    initials: 'SS',
    department: 'Produk',
    position: 'Analis Produk',
    status: 'Aktif',
    joinDate: '2023-08-07',
    contractType: 'Permanen',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    gender: 'Perempuan',
    manager: 'Zara Nurhidayah',
    lastActivity: '5 jam lalu',
    email: 'sophia.septiani@indocater.co.id',
    phone: '+62 811-555-7801',
    office: 'Tower B, Lt. 7',
  },
];

export type EmployeeProfile = {
  id: string;
  employeeId: string;
  fullName: string;
  photo: string;
  department: string;
  position: string;
  status: string;
  manager: string;
  branch: string;
  location: string;
  email: string;
  phone: string;
  workMode: string;
  hireDate: string;
  contractType: string;
  emergencyContact: { name: string; relationship: string; phone: string };
  stats: {
    attendanceRate: string;
    remainingLeave: string;
    trainingCompleted: string;
    benefits: string;
    yearsOfService: string;
    performance: string;
  };
  summary: string;
  employmentHistory: Array<{ period: string; role: string; department: string; location: string }>;
  leaveBalance: Array<{ type: string; used: string; remaining: string }>;
  trainingRecords: Array<{ title: string; status: string; due: string }>;
  medicalRecords: Array<{ label: string; status: string; expires: string }>;
  benefitSummary: Array<{ name: string; detail: string }>;
  documents: Array<{ title: string; category: string; date: string; status: string }>;
  timeline: Array<{ label: string; date: string; description: string }>;
  activityLog: Array<{ description: string; time: string; category: string }>;
};

const employeeProfiles: EmployeeProfile[] = [
  {
    id: 'maya-sari',
    employeeId: 'EMP-1012',
    fullName: 'Maya Sari',
    photo: 'MS',
    department: 'SDM',
    position: 'Generalist SDM',
    status: 'Aktif',
    manager: 'Noor Fadhila',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'maya.sari@indocater.co.id',
    phone: '+62 812-3456-7890',
    workMode: 'Hybrid',
    hireDate: '2021-04-12',
    contractType: 'Permanen',
    emergencyContact: { name: 'Rina Sari', relationship: 'Kakak', phone: '+62 811-777-4455' },
    stats: {
      attendanceRate: '98,6%',
      remainingLeave: '12 hari',
      trainingCompleted: '86%',
      benefits: 'Kesehatan + Pensiun',
      yearsOfService: '3,2 thn',
      performance: 'Memenuhi ekspektasi',
    },
    summary: 'Memimpin program onboarding karyawan baru, menjalankan inisiatif budaya perusahaan, dan mendukung strategi kepegawaian.',
    employmentHistory: [
      { period: 'Apr 2021 - Sekarang', role: 'Generalist SDM', department: 'SDM', location: 'Jakarta' },
      { period: 'Okt 2019 - Mar 2021', role: 'Koordinator SDM', department: 'SDM', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '8', remaining: '12' },
      { type: 'Sakit', used: '2', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Kepemimpinan Dasar', status: 'Selesai', due: '-' },
      { title: 'Keberagaman & Inklusi', status: 'Sedang berlangsung', due: '10 Jul' },
      { title: 'Perlindungan Data Pribadi', status: 'Akan datang', due: '22 Agt' },
    ],
    medicalRecords: [
      { label: 'MCU tahunan', status: 'Selesai', expires: '2026-03-19' },
      { label: 'Vaksinasi influenza', status: 'Aktif', expires: '2025-11-01' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket premium A' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 6%' },
      { name: 'Transportasi', detail: 'Tunjangan bulanan' },
    ],
    documents: [
      { title: 'Kontrak kerja', category: 'Kontrak', date: '2024-01-05', status: 'Ditandatangani' },
      { title: 'Perjanjian kerahasiaan', category: 'Hukum', date: '2024-01-05', status: 'Ditandatangani' },
      { title: 'Kartu identitas karyawan', category: 'Identitas', date: '2024-01-06', status: 'Aktif' },
    ],
    timeline: [
      { label: 'Bergabung dengan perusahaan', date: '12 Apr 2021', description: 'Memulai sebagai Generalist SDM di Jakarta.' },
      { label: 'Promosi', date: '09 Sep 2022', description: 'Memimpin transformasi onboarding karyawan.' },
      { label: 'Pelatihan selesai', date: '25 Mei 2024', description: 'Menyelesaikan program Kepemimpinan Dasar.' },
    ],
    activityLog: [
      { description: 'Memperbarui informasi kontak darurat.', time: 'Hari ini, 09:40', category: 'Profil' },
      { description: 'Menyetujui pendaftaran benefit tim.', time: 'Kemarin, 16:10', category: 'Aksi' },
      { description: 'Mengunduh kontrak kerja.', time: '2 hari lalu', category: 'Dokumen' },
    ],
  },
  {
    id: 'leo-wibowo',
    employeeId: 'EMP-1006',
    fullName: 'Leo Wibowo',
    photo: 'LW',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    status: 'Aktif',
    manager: 'Fitri Novita',
    branch: 'Bandung Studio',
    location: 'Bandung',
    email: 'leo.wibowo@indocater.co.id',
    phone: '+62 812-9988-2233',
    workMode: 'WFO',
    hireDate: '2022-01-19',
    contractType: 'Permanen',
    emergencyContact: { name: 'Dian Wibowo', relationship: 'Istri', phone: '+62 812-9988-2244' },
    stats: {
      attendanceRate: '99,2%',
      remainingLeave: '9 hari',
      trainingCompleted: '92%',
      benefits: 'Kesehatan + BPJS TK',
      yearsOfService: '2,4 thn',
      performance: 'Melebihi ekspektasi',
    },
    summary: 'Membangun fitur platform HRIS full-stack, membimbing engineer junior, dan bertanggung jawab atas pengalaman layanan mandiri karyawan.',
    employmentHistory: [
      { period: 'Jan 2022 - Sekarang', role: 'Pengembang Perangkat Lunak', department: 'Teknologi', location: 'Bandung' },
      { period: 'Agt 2020 - Des 2021', role: 'Frontend Engineer', department: 'Teknologi', location: 'Bandung' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '11', remaining: '9' },
      { type: 'Sakit', used: '1', remaining: '5' },
    ],
    trainingRecords: [
      { title: 'Pola React Lanjutan', status: 'Selesai', due: '-' },
      { title: 'Keamanan Cloud Native', status: 'Sedang berlangsung', due: '22 Jul' },
      { title: 'Pengujian Otomatis', status: 'Akan datang', due: '30 Agt' },
    ],
    medicalRecords: [
      { label: 'MCU tahunan', status: 'Selesai', expires: '2026-04-10' },
      { label: 'Pemeriksaan gigi', status: 'Aktif', expires: '2025-12-05' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket premium B' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 4%' },
      { name: 'BPJS TK', detail: 'Jaminan pensiun & JHT' },
    ],
    documents: [
      { title: 'Surat penawaran', category: 'Kontrak', date: '2022-01-15', status: 'Ditandatangani' },
      { title: 'Evaluasi kinerja', category: 'Teknologi', date: '2024-03-12', status: 'Final' },
      { title: 'Kartu identitas karyawan', category: 'Keamanan', date: '2024-01-20', status: 'Aktif' },
    ],
    timeline: [
      { label: 'Bergabung tim platform', date: '19 Jan 2022', description: 'Memulai pengembangan produk inti HRIS.' },
      { label: 'Merilis dashboard kinerja', date: '08 Nov 2023', description: 'Menyediakan analitik metrik SDM untuk pemimpin.' },
      { label: 'Memimpin perencanaan roadmap', date: '18 Mar 2025', description: 'Menyelaraskan pekerjaan teknis dengan tujuan SDM.' },
    ],
    activityLog: [
      { description: 'Merge rilis sprint ke production.', time: 'Hari ini, 10:05', category: 'Deployment' },
      { description: 'Review audit aksesibilitas.', time: 'Kemarin, 17:45', category: 'Kualitas' },
      { description: 'Menerbitkan spesifikasi fitur.', time: '2 hari lalu', category: 'Perencanaan' },
    ],
  },
  {
    id: 'aulia-rizky',
    employeeId: 'EMP-1074',
    fullName: 'Aulia Rizky',
    photo: 'AR',
    department: 'Penjualan',
    position: 'Kepala Penjualan',
    status: 'Aktif',
    manager: 'Noor Fadhila',
    branch: 'Surabaya Office',
    location: 'Surabaya',
    email: 'aulia.rizky@indocater.co.id',
    phone: '+62 811-2233-4455',
    workMode: 'Hybrid',
    hireDate: '2020-09-03',
    contractType: 'Permanen',
    emergencyContact: { name: 'Budi Rizky', relationship: 'Suami', phone: '+62 811-2233-5566' },
    stats: {
      attendanceRate: '96,8%',
      remainingLeave: '10 hari',
      trainingCompleted: '88%',
      benefits: 'Kesehatan + Tunjangan perjalanan',
      yearsOfService: '4,8 thn',
      performance: 'Berkinerja tinggi',
    },
    summary: 'Memimpin tim penjualan regional, memantau pencapaian target, dan mendukung pertumbuhan pelanggan strategis.',
    employmentHistory: [
      { period: 'Sep 2020 - Sekarang', role: 'Kepala Penjualan', department: 'Penjualan', location: 'Surabaya' },
      { period: 'Jan 2018 - Agt 2020', role: 'Account Executive', department: 'Penjualan', location: 'Surabaya' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '9', remaining: '10' },
      { type: 'Sakit', used: '3', remaining: '3' },
    ],
    trainingRecords: [
      { title: 'Penjualan Strategis', status: 'Selesai', due: '-' },
      { title: 'Workshop Customer Success', status: 'Sedang berlangsung', due: '15 Jul' },
      { title: 'Pelatihan Negosiasi', status: 'Akan datang', due: '24 Sep' },
    ],
    medicalRecords: [
      { label: 'MCU tahunan', status: 'Selesai', expires: '2026-01-14' },
      { label: 'Vaksinasi perjalanan dinas', status: 'Aktif', expires: '2025-10-01' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket eksekutif' },
      { name: 'Perjalanan', detail: 'Tunjangan perjalanan dinas' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 6%' },
    ],
    documents: [
      { title: 'Rencana kuota tahunan', category: 'Penjualan', date: '2024-02-01', status: 'Aktif' },
      { title: 'Evaluasi kinerja', category: 'Penjualan', date: '2024-02-20', status: 'Final' },
      { title: 'Salinan KTP', category: 'Kepatuhan', date: '2024-01-10', status: 'Terverifikasi' },
    ],
    timeline: [
      { label: 'Promosi Kepala Penjualan', date: '03 Sep 2020', description: 'Memimpin ekspansi regional.' },
      { label: 'Ekspansi tim Surabaya', date: 'Mei 2022', description: 'Menambah dua account manager regional.' },
      { label: 'Menutup kontrak besar', date: 'Feb 2024', description: 'Mengamankan kontrak multi-tahun.' },
    ],
    activityLog: [
      { description: 'Memperbarui rencana komisi penjualan.', time: 'Hari ini, 08:55', category: 'Kompensasi' },
      { description: 'Meninjau status onboarding pelanggan.', time: 'Kemarin, 15:20', category: 'Pelanggan' },
      { description: 'Mengajukan permintaan perjalanan dinas.', time: '2 hari lalu', category: 'Logistik' },
    ],
  },
  {
    id: 'zara-nurhidayah',
    employeeId: 'EMP-1031',
    fullName: 'Zara Nurhidayah',
    photo: 'ZN',
    department: 'Produk',
    position: 'Desainer Produk',
    status: 'Cuti',
    manager: 'Maya Sari',
    branch: 'Bali Hub',
    location: 'Denpasar',
    email: 'zara.nurhidayah@indocater.co.id',
    phone: '+62 812-5567-8910',
    workMode: 'Hybrid',
    hireDate: '2019-06-28',
    contractType: 'Permanen',
    emergencyContact: { name: 'Siti Nurhidayah', relationship: 'Ibu', phone: '+62 812-5567-0011' },
    stats: {
      attendanceRate: '94,7%',
      remainingLeave: '16 hari',
      trainingCompleted: '81%',
      benefits: 'Kesehatan + Wellness',
      yearsOfService: '5,0 thn',
      performance: 'Kontributor kuat',
    },
    summary: 'Mendesain alur pengalaman karyawan dan mendorong keputusan produk mobile-first untuk layanan mandiri SDM.',
    employmentHistory: [
      { period: 'Jun 2019 - Sekarang', role: 'Desainer Produk', department: 'Produk', location: 'Denpasar' },
      { period: 'Jan 2017 - Mei 2019', role: 'Desainer UX', department: 'Produk', location: 'Denpasar' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '4', remaining: '16' },
      { type: 'Sakit', used: '3', remaining: '2' },
    ],
    trainingRecords: [
      { title: 'Sistem Desain', status: 'Selesai', due: '-' },
      { title: 'Service Design', status: 'Sedang berlangsung', due: '31 Jul' },
      { title: 'Review Aksesibilitas', status: 'Akan datang', due: '12 Sep' },
    ],
    medicalRecords: [
      { label: 'Pemeriksaan ergonomi', status: 'Selesai', expires: '2025-10-10' },
      { label: 'Vaksinasi', status: 'Aktif', expires: '2026-01-01' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket wellness premium' },
      { name: 'Pembelajaran', detail: 'Tunjangan konferensi' },
      { name: 'Asuransi', detail: 'Gigi + Mata' },
    ],
    documents: [
      { title: 'Portofolio desain', category: 'Pengembangan', date: '2024-02-14', status: 'Aktif' },
      { title: 'Formulir kembali bekerja', category: 'SDM', date: '2024-06-01', status: 'Tertunda' },
      { title: 'Formulir perjalanan dinas', category: 'Perjalanan', date: '2024-05-11', status: 'Disetujui' },
    ],
    timeline: [
      { label: 'Bergabung tim produk', date: '28 Jun 2019', description: 'Mulai mendesain alur kerja karyawan.' },
      { label: 'Meluncurkan pengalaman mobile', date: '12 Okt 2022', description: 'Memimpin redesain mobile-first untuk aplikasi SDM.' },
      { label: 'Memulai periode cuti', date: '10 Jun 2026', description: 'Cuti berbayar.' },
    ],
    activityLog: [
      { description: 'Berbagi handoff desain dengan tim teknis.', time: 'Kemarin, 14:30', category: 'Desain' },
      { description: 'Menyelesaikan modul pelatihan D&I.', time: '3 hari lalu', category: 'Pelatihan' },
      { description: 'Meninjau permintaan cuti.', time: '1 minggu lalu', category: 'SDM' },
    ],
  },
  {
    id: 'noor-fadhila',
    employeeId: 'EMP-1020',
    fullName: 'Noor Fadhila',
    photo: 'NF',
    department: 'SDM',
    position: 'Manajer SDM',
    status: 'Aktif',
    manager: 'Dewi Lestari',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'noor.fadhila@indocater.co.id',
    phone: '+62 811-3344-5566',
    workMode: 'Hybrid',
    hireDate: '2017-11-15',
    contractType: 'Permanen',
    emergencyContact: { name: 'Aminah Fadhila', relationship: 'Istri', phone: '+62 811-3344-7788' },
    stats: {
      attendanceRate: '99,4%',
      remainingLeave: '8 hari',
      trainingCompleted: '95%',
      benefits: 'Paket eksekutif',
      yearsOfService: '6,7 thn',
      performance: 'Luar biasa',
    },
    summary: 'Mengawasi seluruh inisiatif SDM, mendorong strategi HR dan menyelaraskan kepemimpinan di seluruh tim SDM.',
    employmentHistory: [
      { period: 'Nov 2017 - Sekarang', role: 'Manajer SDM', department: 'SDM', location: 'Jakarta' },
      { period: 'Mei 2015 - Okt 2017', role: 'Senior Staf SDM', department: 'SDM', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '12', remaining: '8' },
      { type: 'Sakit', used: '1', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Kepemimpinan Eksekutif', status: 'Selesai', due: '-' },
      { title: 'Kepatuhan SDM Global', status: 'Selesai', due: '-' },
      { title: 'Workshop Strategi Talenta', status: 'Sedang berlangsung', due: '14 Agt' },
    ],
    medicalRecords: [
      { label: 'MCU eksekutif', status: 'Selesai', expires: '2026-02-15' },
      { label: 'Booster COVID-19', status: 'Aktif', expires: '2025-12-01' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket wellness eksekutif' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 10%' },
      { name: 'Perjalanan', detail: 'Tunjangan kelas bisnis' },
    ],
    documents: [
      { title: 'Laporan direksi', category: 'Eksekutif', date: '2024-06-01', status: 'Final' },
      { title: 'Komitmen kepemimpinan', category: 'SDM', date: '2024-01-10', status: 'Ditandatangani' },
      { title: 'Kartu identitas karyawan', category: 'Keamanan', date: '2024-01-05', status: 'Aktif' },
    ],
    timeline: [
      { label: 'Diangkat sebagai Manajer SDM', date: '15 Nov 2017', description: 'Menjadi kepala departemen SDM.' },
      { label: 'Memperkenalkan forum kepemimpinan', date: '02 Okt 2021', description: 'Meluncurkan diskusi eksekutif SDM.' },
      { label: 'Menyelaraskan target SDM', date: '10 Mar 2025', description: 'Membuat metrik keberhasilan SDM perusahaan.' },
    ],
    activityLog: [
      { description: 'Meninjau metrik talenta kuartalan.', time: 'Hari ini, 11:20', category: 'Strategi' },
      { description: 'Menandatangani rencana kompensasi.', time: 'Kemarin, 16:00', category: 'Kompensasi' },
      { description: 'Membagikan pembaruan kepemimpinan.', time: '3 hari lalu', category: 'Komunikasi' },
    ],
  },
  {
    id: 'lia-pratiwi',
    employeeId: 'EMP-1088',
    fullName: 'Lia Pratiwi',
    photo: 'LP',
    department: 'Layanan Pelanggan',
    position: 'Direktur Layanan Pelanggan',
    status: 'Aktif',
    manager: 'Noor Fadhila',
    branch: 'Remote',
    location: 'Remote',
    email: 'lia.pratiwi@indocater.co.id',
    phone: '+62 811-555-2233',
    workMode: 'Remote',
    hireDate: '2021-12-05',
    contractType: 'Permanen',
    emergencyContact: { name: 'Hasan Pratiwi', relationship: 'Saudara', phone: '+62 811-555-2234' },
    stats: {
      attendanceRate: '97,4%',
      remainingLeave: '14 hari',
      trainingCompleted: '89%',
      benefits: 'Kesehatan + Tunjangan remote',
      yearsOfService: '2,5 thn',
      performance: 'Berkinerja tinggi',
    },
    summary: 'Mengelola operasi layanan pelanggan dan mendukung pengalaman karyawan remote di seluruh cabang.',
    employmentHistory: [
      { period: 'Des 2021 - Sekarang', role: 'Direktur Layanan Pelanggan', department: 'Layanan Pelanggan', location: 'Remote' },
      { period: 'Mar 2019 - Nov 2021', role: 'Manajer Layanan Pelanggan', department: 'Layanan Pelanggan', location: 'Remote' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '7', remaining: '14' },
      { type: 'Sakit', used: '1', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Kepemimpinan Remote', status: 'Selesai', due: '-' },
      { title: 'Retensi Pelanggan', status: 'Sedang berlangsung', due: '07 Jul' },
      { title: 'Resolusi Konflik', status: 'Akan datang', due: '05 Sep' },
    ],
    medicalRecords: [
      { label: 'MCU remote', status: 'Selesai', expires: '2026-05-10' },
      { label: 'Pemeriksaan wellness', status: 'Aktif', expires: '2025-09-30' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket pekerja remote' },
      { name: 'Kantor rumah', detail: 'Tunjangan peralatan' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 5%' },
    ],
    documents: [
      { title: 'Panduan layanan pelanggan', category: 'Operasional', date: '2024-04-21', status: 'Aktif' },
      { title: 'Perjanjian kerja remote', category: 'SDM', date: '2024-01-20', status: 'Ditandatangani' },
      { title: 'Ringkasan benefit', category: 'Benefit', date: '2024-03-18', status: 'Aktif' },
    ],
    timeline: [
      { label: 'Bergabung tim remote', date: '05 Des 2021', description: 'Memulai membangun proses layanan pelanggan.' },
      { label: 'Mengembangkan tim', date: '18 Jul 2023', description: 'Menambah dua koordinator remote.' },
      { label: 'Memperbarui program pelanggan', date: '29 Jan 2025', description: 'Membentuk review kuartalan.' },
    ],
    activityLog: [
      { description: 'Meninjau metrik kepuasan pelanggan.', time: 'Hari ini, 08:10', category: 'Insight' },
      { description: 'Menyetujui bonus tim.', time: 'Kemarin, 13:40', category: 'Kompensasi' },
      { description: 'Menandatangani checklist onboarding remote.', time: '3 hari lalu', category: 'Kepatuhan' },
    ],
  },
  {
    id: 'caleb-santoso',
    employeeId: 'EMP-1105',
    fullName: 'Caleb Santoso',
    photo: 'CS',
    department: 'Keuangan',
    position: 'Manajer Keuangan',
    status: 'Aktif',
    manager: 'Dewi Lestari',
    branch: 'Bandung Studio',
    location: 'Bandung',
    email: 'caleb.santoso@indocater.co.id',
    phone: '+62 811-9988-5544',
    workMode: 'WFO',
    hireDate: '2018-03-20',
    contractType: 'Permanen',
    emergencyContact: { name: 'Maria Santoso', relationship: 'Istri', phone: '+62 811-9988-5545' },
    stats: {
      attendanceRate: '98,1%',
      remainingLeave: '11 hari',
      trainingCompleted: '90%',
      benefits: 'Kesehatan + Pensiun',
      yearsOfService: '6,2 thn',
      performance: 'Memenuhi ekspektasi',
    },
    summary: 'Mengawasi tim keuangan, menganggarkan investasi SDM, dan memastikan operasi payroll dan benefit berjalan lancar.',
    employmentHistory: [
      { period: 'Mar 2018 - Sekarang', role: 'Manajer Keuangan', department: 'Keuangan', location: 'Bandung' },
      { period: 'Jun 2015 - Feb 2018', role: 'Analis Keuangan', department: 'Keuangan', location: 'Bandung' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '10', remaining: '11' },
      { type: 'Sakit', used: '2', remaining: '4' },
    ],
    trainingRecords: [
      { title: 'Keuangan Korporat', status: 'Selesai', due: '-' },
      { title: 'Kepatuhan Payroll', status: 'Sedang berlangsung', due: '20 Jul' },
      { title: 'Kebijakan Pengeluaran', status: 'Akan datang', due: '18 Sep' },
    ],
    medicalRecords: [
      { label: 'MCU eksekutif', status: 'Selesai', expires: '2026-07-04' },
      { label: 'Pemeriksaan mata', status: 'Aktif', expires: '2025-10-15' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Asuransi kesehatan perusahaan' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 8%' },
      { name: 'Transportasi', detail: 'Tunjangan komuter' },
    ],
    documents: [
      { title: 'Rencana anggaran', category: 'Keuangan', date: '2024-04-02', status: 'Final' },
      { title: 'Jadwal payroll', category: 'Payroll', date: '2024-05-12', status: 'Aktif' },
      { title: 'Kebijakan pengeluaran', category: 'Kepatuhan', date: '2024-03-10', status: 'Diterbitkan' },
    ],
    timeline: [
      { label: 'Bergabung tim keuangan', date: '20 Mar 2018', description: 'Memulai mengelola operasi keuangan.' },
      { label: 'Meningkatkan pelaporan', date: '15 Okt 2022', description: 'Membangun dashboard keuangan bulanan.' },
      { label: 'Menyerahkan anggaran benefit', date: '22 Jan 2025', description: 'Menyelaraskan pengeluaran dengan tujuan SDM.' },
    ],
    activityLog: [
      { description: 'Menyelesaikan review anggaran.', time: 'Hari ini, 12:20', category: 'Anggaran' },
      { description: 'Memperbarui jadwal payroll.', time: 'Kemarin, 14:00', category: 'Operasional' },
      { description: 'Memvalidasi kebijakan pengeluaran.', time: '3 hari lalu', category: 'Kebijakan' },
    ],
  },
  {
    id: 'juni-rahmawati',
    employeeId: 'EMP-1112',
    fullName: 'Juni Rahmawati',
    photo: 'JR',
    department: 'Hukum',
    position: 'Konsultan Hukum',
    status: 'Aktif',
    manager: 'Noor Fadhila',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'juni.rahmawati@indocater.co.id',
    phone: '+62 811-2233-9988',
    workMode: 'WFO',
    hireDate: '2020-02-14',
    contractType: 'Waktu tertentu',
    emergencyContact: { name: 'Ahmad Rahmawati', relationship: 'Ayah', phone: '+62 811-2233-0099' },
    stats: {
      attendanceRate: '97,9%',
      remainingLeave: '8 hari',
      trainingCompleted: '93%',
      benefits: 'Kesehatan + Bantuan hukum',
      yearsOfService: '4,3 thn',
      performance: 'Kontributor kuat',
    },
    summary: 'Memberikan panduan hukum terkait kebijakan SDM, kontrak, dan kepatuhan operasional perusahaan.',
    employmentHistory: [
      { period: 'Feb 2020 - Sekarang', role: 'Konsultan Hukum', department: 'Hukum', location: 'Jakarta' },
      { period: 'Jul 2016 - Jan 2020', role: 'Asisten Konsultan Hukum', department: 'Hukum', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '12', remaining: '8' },
      { type: 'Sakit', used: '2', remaining: '3' },
    ],
    trainingRecords: [
      { title: 'Kepatuhan Regulasi', status: 'Selesai', due: '-' },
      { title: 'Review Hukum Ketenagakerjaan', status: 'Sedang berlangsung', due: '01 Agt' },
      { title: 'Negosiasi Kontrak', status: 'Akan datang', due: '30 Sep' },
    ],
    medicalRecords: [
      { label: 'Pemeriksaan kesehatan', status: 'Selesai', expires: '2026-06-20' },
      { label: 'Vaksinasi', status: 'Aktif', expires: '2025-11-10' },
    ],
    benefitSummary: [
      { name: 'Bantuan hukum', detail: 'Akses konsultasi' },
      { name: 'Kesehatan', detail: 'Paket wellness B' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 5%' },
    ],
    documents: [
      { title: 'Perjanjian kerja', category: 'Hukum', date: '2024-01-05', status: 'Ditandatangani' },
      { title: 'Memo review kebijakan', category: 'Hukum', date: '2024-03-22', status: 'Final' },
      { title: 'Checklist kepatuhan', category: 'Audit', date: '2024-05-10', status: 'Aktif' },
    ],
    timeline: [
      { label: 'Bergabung tim hukum', date: '14 Feb 2020', description: 'Mulai mendukung masalah hukum SDM.' },
      { label: 'Menerbitkan pembaruan kebijakan', date: '18 Apr 2023', description: 'Memperbarui alur review kontrak.' },
      { label: 'Menyelesaikan audit kepatuhan', date: '12 Jan 2025', description: 'Menyerahkan dokumentasi siap audit.' },
    ],
    activityLog: [
      { description: 'Menjawab pertanyaan kebijakan.', time: 'Hari ini, 09:25', category: 'Kepatuhan' },
      { description: 'Meninjau ketentuan kontrak.', time: 'Kemarin, 14:15', category: 'Hukum' },
      { description: 'Memperbarui dokumen kebijakan.', time: '2 hari lalu', category: 'Dokumentasi' },
    ],
  },
  {
    id: 'emily-putri',
    employeeId: 'EMP-1123',
    fullName: 'Emily Putri',
    photo: 'EP',
    department: 'Teknologi',
    position: 'Pengembang Perangkat Lunak',
    status: 'Magang',
    manager: 'Leo Wibowo',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'emily.putri@indocater.co.id',
    phone: '+62 813-9988-2233',
    workMode: 'Hybrid',
    hireDate: '2024-02-01',
    contractType: 'Magang',
    emergencyContact: { name: 'Ratna Putri', relationship: 'Ibu', phone: '+62 813-9988-2244' },
    stats: {
      attendanceRate: '95,5%',
      remainingLeave: '18 hari',
      trainingCompleted: '60%',
      benefits: 'Kesehatan standar',
      yearsOfService: '0,4 thn',
      performance: 'Menjanjikan',
    },
    summary: 'Karyawan baru teknik yang mengerjakan peningkatan produk HRIS internal dan stabilitas platform.',
    employmentHistory: [
      { period: 'Feb 2024 - Sekarang', role: 'Pengembang Perangkat Lunak', department: 'Teknologi', location: 'Jakarta' },
      { period: 'Jun 2023 - Jan 2024', role: 'Magang Perangkat Lunak', department: 'Teknologi', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '2', remaining: '18' },
      { type: 'Sakit', used: '0', remaining: '5' },
    ],
    trainingRecords: [
      { title: 'Bootcamp Onboarding', status: 'Selesai', due: '-' },
      { title: 'Dasar-Dasar React', status: 'Sedang berlangsung', due: '05 Jul' },
      { title: 'Dasar DevOps', status: 'Akan datang', due: '15 Agt' },
    ],
    medicalRecords: [
      { label: 'MCU karyawan baru', status: 'Selesai', expires: '2026-02-01' },
      { label: 'Catatan vaksinasi', status: 'Aktif', expires: '2026-01-01' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket kesehatan dasar' },
      { name: 'Pembelajaran', detail: 'Program mentoring' },
      { name: 'Wellness', detail: 'Tunjangan kesejahteraan' },
    ],
    documents: [
      { title: 'Paket onboarding', category: 'SDM', date: '2024-02-02', status: 'Selesai' },
      { title: 'Perjanjian magang', category: 'Kontrak', date: '2024-01-30', status: 'Ditandatangani' },
      { title: 'Alokasi laptop', category: 'Aset', date: '2024-02-01', status: 'Diterbitkan' },
    ],
    timeline: [
      { label: 'Memulai magang', date: '01 Feb 2024', description: 'Bergabung tim teknik sebagai karyawan magang.' },
      { label: 'Menyelesaikan onboarding', date: '15 Mar 2024', description: 'Menyelesaikan modul pelatihan awal.' },
      { label: 'Menyelesaikan fitur pertama', date: '07 Mei 2024', description: 'Merilis pembaruan filter layanan mandiri SDM.' },
    ],
    activityLog: [
      { description: 'Mengirim code review pertama.', time: 'Hari ini, 08:55', category: 'Pengembangan' },
      { description: 'Menyelesaikan kuis onboarding.', time: 'Kemarin, 18:20', category: 'Pelatihan' },
      { description: 'Memperbarui ringkasan profil.', time: '3 hari lalu', category: 'Profil' },
    ],
  },
  {
    id: 'sophia-septiani',
    employeeId: 'EMP-1141',
    fullName: 'Sophia Septiani',
    photo: 'SS',
    department: 'Produk',
    position: 'Analis Produk',
    status: 'Aktif',
    manager: 'Zara Nurhidayah',
    branch: 'Jakarta HQ',
    location: 'Jakarta',
    email: 'sophia.septiani@indocater.co.id',
    phone: '+62 811-555-7801',
    workMode: 'WFO',
    hireDate: '2023-08-07',
    contractType: 'Permanen',
    emergencyContact: { name: 'Dewi Septiani', relationship: 'Ibu', phone: '+62 811-555-7812' },
    stats: {
      attendanceRate: '97,1%',
      remainingLeave: '13 hari',
      trainingCompleted: '78%',
      benefits: 'Kesehatan + Pengembangan profesional',
      yearsOfService: '1,8 thn',
      performance: 'Berkinerja baik',
    },
    summary: 'Mendukung keputusan produk melalui wawasan SDM dan analitik untuk meningkatkan pengalaman tenaga kerja.',
    employmentHistory: [
      { period: 'Agt 2023 - Sekarang', role: 'Analis Produk', department: 'Produk', location: 'Jakarta' },
      { period: 'Jan 2022 - Jul 2023', role: 'Analis Bisnis', department: 'Produk', location: 'Jakarta' },
    ],
    leaveBalance: [
      { type: 'Tahunan', used: '9', remaining: '13' },
      { type: 'Sakit', used: '2', remaining: '3' },
    ],
    trainingRecords: [
      { title: 'Analitik SDM', status: 'Selesai', due: '-' },
      { title: 'Metode Riset', status: 'Sedang berlangsung', due: '30 Jul' },
      { title: 'Data Storytelling', status: 'Akan datang', due: '18 Sep' },
    ],
    medicalRecords: [
      { label: 'MCU', status: 'Selesai', expires: '2026-01-23' },
      { label: 'Vaksinasi', status: 'Aktif', expires: '2025-12-22' },
    ],
    benefitSummary: [
      { name: 'Kesehatan', detail: 'Paket kesehatan plus' },
      { name: 'Pembelajaran', detail: 'Tunjangan konferensi data' },
      { name: 'Pensiun', detail: 'Kontribusi perusahaan 5%' },
    ],
    documents: [
      { title: 'Brief proyek', category: 'Produk', date: '2024-05-05', status: 'Aktif' },
      { title: 'Sertifikasi pelatihan', category: 'Pelatihan', date: '2024-05-21', status: 'Selesai' },
      { title: 'Perjanjian kerahasiaan', category: 'Hukum', date: '2024-01-05', status: 'Ditandatangani' },
    ],
    timeline: [
      { label: 'Promosi ke analis', date: '07 Agt 2023', description: 'Mulai menjalankan analisis metrik produk.' },
      { label: 'Menerbitkan laporan insight', date: '10 Des 2023', description: 'Menyampaikan temuan engagement tenaga kerja.' },
      { label: 'Bermitra dengan SDM', date: '28 Feb 2025', description: 'Mengaktifkan metrik dashboard talenta baru.' },
    ],
    activityLog: [
      { description: 'Memperbarui metrik SDM kuartalan.', time: 'Hari ini, 09:05', category: 'Analitik' },
      { description: 'Berbagi catatan riset pengguna.', time: 'Kemarin, 16:50', category: 'Riset' },
      { description: 'Meninjau roadmap produk.', time: '2 hari lalu', category: 'Perencanaan' },
    ],
  },
];

export const peopleDirectoryIds = employeeDirectory.map((employee) => employee.id);

export function getEmployeeProfile(id: string) {
  return employeeProfiles.find((employee) => employee.id === id);
}

export const orgStructure = {
  leader: 'Noor Fadhila',
  title: 'Manajer SDM',
  team: [
    { name: 'Maya Sari', role: 'Generalist SDM' },
    { name: 'Zara Nurhidayah', role: 'Desainer Produk' },
    { name: 'Emily Putri', role: 'Pengembang Perangkat Lunak' },
  ],
};

export const documentCenter = [
  { title: 'Kontrak kerja', category: 'Kontrak', updated: 'Mei 2024', status: 'Ditandatangani' },
  { title: 'Evaluasi kinerja', category: 'SDM', updated: 'Mar 2024', status: 'Final' },
  { title: 'Kartu Asuransi Kesehatan', category: 'Benefit', updated: 'Jan 2024', status: 'Aktif' },
  { title: 'Sertifikat pelatihan', category: 'Pelatihan', updated: 'Jun 2024', status: 'Selesai' },
];
