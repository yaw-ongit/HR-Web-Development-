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
  
  if (file.includes('button.tsx') && file.includes('components/ui/')) return;
  if (file.includes('button.tsx') && file.includes('components\\ui\\')) return;

  const buttonRegex = /<Button([\s\S]*?)>/g;
  let match;
  while ((match = buttonRegex.exec(content)) !== null) {
    const props = match[1];
    if (!props.includes('onClick=') && !props.includes('type="submit"') && !props.includes('comingSoon') && !props.includes('asChild')) {
      console.log(`File: ${file}`);
      console.log(`Button: ${match[0]}`);
      console.log('---');
    }
  }
});
