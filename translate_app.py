import os
from pathlib import Path

replacements = {
    "'Employee'": "'Karyawan'",
    "'Department'": "'Departemen'",
    "'Shift'": "'Shift'",
    "'Check in'": "'Waktu Masuk'",
    "'Check out'": "'Waktu Keluar'",
    "'Working hours'": "'Jam Kerja'",
    "'Late'": "'Terlambat'",
    "'Status'": "'Status'",
    "'Actions'": "'Aksi'",
    "Details <ArrowRight": "Detail <ArrowRight",
    "Attendance dashboard": "Dashboard Presensi",
    "Live attendance status, daily presence and employee operations in a single view.": "Status kehadiran langsung, presensi harian, dan operasi karyawan dalam satu tampilan.",
    "Attendance rate": "Tingkat Kehadiran",
    "Present": "Hadir",
    "Absent": "Absen",
    "Business Trip": "Dinas",
    "Holiday": "Libur",
    "Attendance calendar": "Kalender Presensi",
    "June snapshot": "Ringkasan Juni",
    "Weekend / holiday / business trip highlights": "Sorotan akhir pekan / libur / dinas",
    "Present / WFH / business trip statuses visualized": "Visualisasi status hadir / WFH / dinas",
    "Hover over days for operational notes and schedule context.": "Arahkan kursor pada hari untuk catatan operasional dan konteks jadwal.",
    "Attendance detail": "Detail Presensi",
    "Attendance heatmap": "Heatmap Kehadiran",
    "Daily log": "Log harian",
    "Trend continues with >97% coverage.": "Tren berlanjut dengan cakupan >97%.",
    "This view is designed to make attendance status, exceptions, and coverage visible at a glance.": "Tampilan ini dirancang untuk membuat status kehadiran, pengecualian, dan cakupan terlihat sekilas.",
    "Attendance table": "Tabel Presensi",
    "Operational employee log": "Log operasional karyawan",
    "Search employee, department or shift": "Cari karyawan, departemen atau shift",
    "All departments": "Semua departemen",
    "All statuses": "Semua status",
    "Leave Management": "Manajemen Cuti",
    "Leave dashboard": "Dashboard Cuti",
    "Manage and track employee time off, balances, and operational leave coverage.": "Kelola dan lacak cuti karyawan, saldo, dan cakupan cuti operasional.",
    "Kembali ke Workforce": "Kembali ke Workforce",
    "Leave overview": "Ringkasan Cuti",
    "Requests": "Permintaan",
    "Approved": "Disetujui",
    "Rejected": "Ditolak",
    "Pending": "Menunggu",
    "Leave calendar": "Kalender Cuti",
    "Leave table": "Tabel Cuti",
    "Employee": "Karyawan",
    "Leave Type": "Jenis Cuti",
    "Start Date": "Tanggal Mulai",
    "End Date": "Tanggal Selesai",
    "Duration": "Durasi",
    "Approver": "Penyetuju",
    "Search leave requests": "Cari permintaan cuti",
    "All types": "Semua jenis",
    "Shift Management": "Manajemen Shift",
    "Shift schedules": "Jadwal Shift",
    "Design and map employee shifts for optimized 24/7 coverage.": "Rancang dan petakan shift karyawan untuk cakupan 24/7 yang optimal.",
    "Shift overview": "Ringkasan Shift",
    "Active shift templates": "Template shift aktif",
    "Shift name": "Nama shift",
    "Employees": "Karyawan",
    "Manager": "Manajer",
    "Search shifts": "Cari shift",
    "Overtime": "Lembur",
    "Overtime management": "Manajemen Lembur",
    "Review, approve and track overtime requests against operational budgets.": "Tinjau, setujui, dan lacak permintaan lembur terhadap anggaran operasional.",
    "Overtime overview": "Ringkasan Lembur",
    "Total Overtime": "Total Lembur",
    "Overtime table": "Tabel Lembur",
    "Date": "Tanggal",
    "Hours": "Jam",
    "Reason": "Alasan",
    "Search overtime requests": "Cari permintaan lembur",
    "Dashboard": "Dashboard",
    "Welcome to the Indocater HRIS": "Selamat datang di HRIS Indocater",
    "Human Resources Information System": "Sistem Informasi Sumber Daya Manusia",
}

def process_file(file_path):
    try:
        content = file_path.read_text(encoding='utf-8')
        new_content = content
        for eng, ind in replacements.items():
            new_content = new_content.replace(eng, ind)
        
        if new_content != content:
            file_path.write_text(new_content, encoding='utf-8')
            print(f"Updated: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

src_dir = Path("src/app")
for file_path in src_dir.rglob("*.tsx"):
    process_file(file_path)

components_dir = Path("src/components")
for file_path in components_dir.rglob("*.tsx"):
    process_file(file_path)

print("Translation done.")
