import re
from pathlib import Path

replacements = {
    "=== 'Active'": "=== 'Aktif'",
    "=== 'Scheduled'": "=== 'Dijadwalkan'",
    "=== 'Completed'": "=== 'Selesai'",
    "=== 'Pending'": "=== 'Menunggu'",
    "=== 'In Progress'": "=== 'Sedang Berlangsung'",
    "=== 'Cancelled'": "=== 'Dibatalkan'",
    "=== 'Expiring'": "=== 'Hampir Habis'",
    "=== 'Expired'": "=== 'Kedaluwarsa'",
    "=== 'Beginner'": "=== 'Pemula'",
    "=== 'Intermediate'": "=== 'Menengah'",
    "=== 'Advanced'": "=== 'Mahir'",
    "=== 'Expert'": "=== 'Ahli'"
}

def process_file(file_path):
    try:
        content = file_path.read_text(encoding='utf-8')
        new_content = content
        for old, new in replacements.items():
            new_content = new_content.replace(old, new)
        
        # also check for double quotes like === "Active"
        for old, new in replacements.items():
            old_dq = old.replace("'", '"')
            new_dq = new.replace("'", '"')
            new_content = new_content.replace(old_dq, new_dq)

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

print("Status comparison replacements done.")
