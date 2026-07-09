import os
import re
from pathlib import Path

def process_tsx(file_path):
    try:
        content = file_path.read_text(encoding='utf-8')
        new_content = content
        
        # 1. Replace empty hrefs with onClick alert
        # We look for <Link href="#"> or <Link href="">
        # Next.js Link needs an href, so we can change it to <button onClick={...}> or keep href="#" and add onClick
        
        # Actually, let's just find <Button ...> that doesn't have onClick= or type="submit"
        # Since <Button ...> might span multiple lines, regex is tricky.
        # Let's do a simple regex:
        # Find all <Button tags
        pattern = re.compile(r'<Button([^>]*)>', re.DOTALL)
        
        def button_replacer(match):
            attrs = match.group(1)
            # If it already has onClick, or is type="submit", leave it
            if 'onClick=' in attrs or 'type="submit"' in attrs or 'href=' in attrs:
                return match.group(0)
            
            # Add onClick
            return f'<Button{attrs} onClick={{() => alert("Fitur ini akan segera hadir.")}}>'
            
        new_content = pattern.sub(button_replacer, new_content)
        
        # 2. Add overflow-x-auto to Recharts containers if missing
        # <ResponsiveContainer ...> usually handles it, but maybe we need <div className="overflow-x-auto"> around charts
        
        if new_content != content:
            file_path.write_text(new_content, encoding='utf-8')
            print(f"Updated Buttons in: {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

src_dir = Path("src/app")
for file_path in src_dir.rglob("*.tsx"):
    process_tsx(file_path)

components_dir = Path("src/components")
for file_path in components_dir.rglob("*.tsx"):
    process_tsx(file_path)

print("Placeholder updates complete.")
