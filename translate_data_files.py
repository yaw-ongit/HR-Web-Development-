import re
from pathlib import Path

replacements = {
    'Sarah Chen': 'Sari Chandrawati',
    'Marcus Johnson': 'Markus Junaidi',
    'Elena Rodriguez': 'Elina Rosita',
    'David Park': 'David Permana',
    'Jessica Smith': 'Jessica Sasmita',
    'Alex Thompson': 'Alex Tirta',
    'Casey Williams': 'Casey Wijaya',
    'Jordan Martinez': 'Jordan Marten',
    
    'Maya Thompson': 'Maya Sari',
    'Leo Hunter': 'Leo Wibowo',
    'Avery Patel': 'Aulia Rizky',
    'Zoe Kim': 'Zara Nurhidayah',
    'Noah Brooks': 'Noor Fadhila',
    'Lia Chang': 'Lia Pratiwi',
    'Caleb Ortega': 'Caleb Santoso',
    'June Martinez': 'Juni Rahmawati',
    'Emily Wong': 'Emily Putri',
    'Sophia Murphy': 'Sophia Septiani',

    'Engineering': 'Teknologi',
    'Product': 'Produk',
    'Sales': 'Penjualan',
    'Analytics': 'Analitik',
    'Finance': 'Keuangan',
    'Customer Success': 'Layanan Pelanggan',
    'People Ops': 'SDM',
    'Legal': 'Hukum',

    'New': 'Baru',
    'Screening': 'Penyaringan',
    'Qualified': 'Memenuhi Syarat',
    'Rejected': 'Ditolak',
    'Offer Extended': 'Tawaran Diberikan',
    'Accepted': 'Diterima',
    'Onboarding': 'Onboarding',

    'Phone Screen': 'Wawancara Telepon',
    'Technical': 'Teknis',
    'HR': 'SDM',
    'Final Round': 'Babak Final',

    'Scheduled': 'Dijadwalkan',
    'Completed': 'Selesai',
    'Pending': 'Menunggu',
    'In Progress': 'Sedang Berlangsung',
    'Cancelled': 'Dibatalkan',

    'Active': 'Aktif',
    'Expiring': 'Hampir Habis',
    'Expired': 'Kedaluwarsa',

    'Beginner': 'Pemula',
    'Intermediate': 'Menengah',
    'Advanced': 'Mahir',
    'Expert': 'Ahli',

    'Open Positions': 'Posisi Terbuka',
    'Pipeline Candidates': 'Kandidat Pipeline',
    'Interviews This Week': 'Wawancara Minggu Ini',
    'New Hires (30 days)': 'Karyawan Baru (30 hari)',
    'Onboarding Active': 'Onboarding Aktif',
    'Training Programs': 'Program Pelatihan',
    'Certifications Current': 'Sertifikasi Saat Ini',

    'Active requisitions': 'Permintaan aktif',
    'In process': 'Dalam proses',
    'Onboarded': 'Telah Onboarding',
    'Active enrollments': 'Pendaftaran aktif',

    'Frontend Developer': 'Pengembang Frontend',
    'UX Designer': 'Desainer UX',
    'Customer Success Lead': 'Ketua Layanan Pelanggan',
    'Senior Engineer': 'Engineer Senior',
    'Product Manager': 'Manajer Produk',
    'Sales Director': 'Direktur Penjualan',
    'Data Scientist': 'Ilmuwan Data',
    'Finance Manager': 'Manajer Keuangan',

    'IT Setup - Laptop & Accounts': 'Penyiapan TI - Laptop & Akun',
    'Complete Orientation Training': 'Selesaikan Pelatihan Orientasi',
    'Security & Compliance Certification': 'Sertifikasi Keamanan & Kepatuhan',
    'Office Access & Facilities': 'Akses Kantor & Fasilitas',

    'Customer Success Fundamentals': 'Dasar-dasar Layanan Pelanggan',
    'Advanced Leadership Skills': 'Keterampilan Kepemimpinan Lanjut',
    'System Design Masterclass': 'Masterclass Desain Sistem',
    'Product Strategy & Roadmapping': 'Strategi Produk & Peta Jalan',
    'Cloud Architecture on AWS': 'Arsitektur Cloud di AWS',
}

files_to_update = [
    'src/lib/talent-data.ts',
    'src/lib/compensation-data.ts',
    'src/lib/analytics-data.ts'
]

for file_str in files_to_update:
    path = Path(file_str)
    if not path.exists():
        continue
    content = path.read_text(encoding='utf-8')
    for old, new in replacements.items():
        content = content.replace(f"'{old}'", f"'{new}'")
        content = content.replace(f'"{old}"', f'"{new}"')
        content = content.replace(f'> {old} <', f'> {new} <')
    path.write_text(content, encoding='utf-8')
    print(f"{file_str} updated")

