import re
from pathlib import Path

path = Path('src/lib/workforce-data.ts')
content = path.read_text(encoding='utf-8')

replacements = {
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
    'People Ops': 'SDM',
    'Sales': 'Penjualan',
    'Product': 'Produk',
    'Finance': 'Keuangan',
    'Customer Success': 'Layanan Pelanggan',
    'Legal': 'Hukum',
    'Morning shift': 'Shift Pagi',
    'Afternoon shift': 'Shift Sore',
    'Night shift': 'Shift Malam',
    'Weekend shift': 'Shift Akhir Pekan',
    'Present': 'Hadir',
    'Absent': 'Absen',
    'On Leave': 'Cuti',
    'WFH': 'WFH',
    'Business Trip': 'Dinas',
    'Holiday': 'Libur',
    'Late': 'Terlambat',
    'Pending': 'Menunggu',
    'Approved': 'Disetujui',
    'Rejected': 'Ditolak',
    'Annual Leave': 'Cuti Tahunan',
    'Sick Leave': 'Cuti Sakit',
    'Marriage Leave': 'Cuti Menikah',
    'Maternity Leave': 'Cuti Melahirkan',
    'Paternity Leave': 'Cuti Istri Melahirkan',
    'Special Leave': 'Cuti Khusus',
    'Unpaid Leave': 'Cuti di Luar Tanggungan',
    'Employees Present': 'Karyawan Hadir',
    'Employees Absent': 'Karyawan Absen',
    'Employees Late': 'Karyawan Terlambat',
    'Employees On Leave': 'Karyawan Cuti',
    'Overtime Today': 'Lembur Hari Ini',
    'Pending Leave Requests': 'Menunggu Persetujuan Cuti',
    'Attendance Rate': 'Tingkat Kehadiran',
    'Today': 'Hari Ini',
    'Since 8:00 AM': 'Sejak 08:00',
    'Current': 'Saat Ini',
    'Total requests': 'Total permintaan',
    'Action required': 'Perlu tindakan',
    'Rolling 30 days': '30 hari terakhir',
    'Request Leave': 'Ajukan Cuti',
    'Approve Leave': 'Setujui Cuti',
    'Generate Attendance Report': 'Buat Laporan Kehadiran',
    'Assign Shift': 'Jadwalkan Shift',
    'Approve Overtime': 'Setujui Lembur',
    'Morning Shift': 'Shift Pagi',
    'Afternoon Shift': 'Shift Sore',
    'Night Shift': 'Shift Malam',
    'Weekend Shift': 'Shift Akhir Pekan',
    'Total Overtime': 'Total Lembur',
    'Pending Approval': 'Menunggu Persetujuan',
    'days': 'hari',
    'hrs': 'jam',
}

for old, new in replacements.items():
    content = content.replace(f"'{old}'", f"'{new}'")
    content = content.replace(f'"{old}"', f'"{new}"')
    content = content.replace(f'> {old} <', f'> {new} <')

# Some might not have quotes like 112 employees -> 112 karyawan
content = content.replace('employees', 'karyawan')
content = content.replace('requests', 'permintaan')
content = content.replace('hours', 'jam')

path.write_text(content, encoding='utf-8')
print("workforce-data.ts updated")
