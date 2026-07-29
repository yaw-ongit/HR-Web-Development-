const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Find <Button ... > or <Button ... />
  // but ensure it's not a generic usage in button.tsx itself
  if (file.includes('button.tsx') && file.includes('components\\ui\\')) return;
  if (file.includes('button.tsx') && file.includes('components/ui/')) return;

  const buttonRegex = /<Button([\s\S]*?)>/g;
  content = content.replace(buttonRegex, (match, p1) => {
    if (match.includes('onClick=') || match.includes('type="submit"') || match.includes('comingSoon')) {
      return match;
    }
    changed = true;
    return `<Button comingSoon${p1}>`;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
