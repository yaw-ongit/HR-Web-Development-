import re
from pathlib import Path

# Fix the typescript types and data in compensation-data.ts
file_path = Path("src/lib/compensation-data.ts")
content = file_path.read_text(encoding='utf-8')

# Fix types and data
replacements = {
    "'Approved'": "'Disetujui'",
    "'Processing'": "'Diproses'",
    "'Paid'": "'Dibayar'",
    "'Inactive'": "'Tidak Aktif'",
    "'Suspended'": "'Ditangguhkan'",
    "'Overdue'": "'Terlambat'",
}

for old, new in replacements.items():
    content = content.replace(old, new)
    content = content.replace(old.replace("'", '"'), new.replace("'", '"'))

file_path.write_text(content, encoding='utf-8')

# Now fix the status checks in all tsx files
tsx_replacements = {
    "=== 'Approved'": "=== 'Disetujui'",
    "=== 'Processing'": "=== 'Diproses'",
    "=== 'Paid'": "=== 'Dibayar'",
    "=== 'Inactive'": "=== 'Tidak Aktif'",
    "=== 'Suspended'": "=== 'Ditangguhkan'",
    "=== 'Overdue'": "=== 'Terlambat'",
}

def process_file(file_path):
    content = file_path.read_text(encoding='utf-8')
    new_content = content
    for old, new in tsx_replacements.items():
        new_content = new_content.replace(old, new)
        new_content = new_content.replace(old.replace("'", '"'), new.replace("'", '"'))

    if new_content != content:
        file_path.write_text(new_content, encoding='utf-8')

for p in Path("src/app").rglob("*.tsx"):
    process_file(p)

for p in Path("src/components").rglob("*.tsx"):
    process_file(p)

print("Fixed compensation data and tsx comparisons.")
