import re
from pathlib import Path

# Fix the corrupted Tanggal accessors back to Date
tsx_replacements = {
    "startTanggal": "startDate",
    "endTanggal": "endDate",
    "issuedTanggal": "issuedDate",
    "expiryTanggal": "expiryDate",
    "assessmentTanggal": "assessmentDate",
    "dueTanggal": "dueDate",
    "joinTanggal": "joinDate",
    "hireTanggal": "hireDate",
    "nextReviewTanggal": "nextReviewDate",
    "issueTanggal": "issueDate",
    "submissionTanggal": "submissionDate",
    "'Tanggal', 'Success'": "'Date', 'Success'",
    "'Tanggal range'": "'Date range'"
}

def process_file(file_path):
    content = file_path.read_text(encoding='utf-8')
    new_content = content
    for old, new in tsx_replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        file_path.write_text(new_content, encoding='utf-8')

for p in Path("src/app").rglob("*.tsx"):
    process_file(p)

for p in Path("src/components").rglob("*.tsx"):
    process_file(p)

print("Fixed Tanggal back to Date for properties.")
