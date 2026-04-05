const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the INITIAL_ array
  const initialMatch = content.match(/const INITIAL_([A-Z_]+)\s*=\s*\[([\s\S]*?)\];/);
  if (!initialMatch) return;

  // Extract the first object to get its keys
  const arrayContent = initialMatch[2];
  const firstObjectMatch = arrayContent.match(/\{([^}]+)\}/);
  if (!firstObjectMatch) return;

  const objectContent = firstObjectMatch[1];
  const keys = [];
  const keyRegex = /([a-zA-Z0-9_]+)\s*:/g;
  let match;
  while ((match = keyRegex.exec(objectContent)) !== null) {
    keys.push(match[1]);
  }

  // Find the map function
  const stateNameMatch = content.match(/const \[([a-zA-Z0-9_]+), set[a-zA-Z0-9_]+\] = useState\(INITIAL_/);
  if (!stateNameMatch) return;
  const stateName = stateNameMatch[1];

  const mapRegex = new RegExp(`${stateName}\\.map\\(\\s*([a-zA-Z0-9_]+)\\s*=>\\s*\\([\\s\\S]*?<tr[^>]*>([\\s\\S]*?)<\\/tr>`);
  const mapMatch = content.match(mapRegex);
  
  if (mapMatch) {
    const itemVar = mapMatch[1];
    const trContent = mapMatch[2];
    
    // Generate new td elements
    let newTrContent = '\n';
    for (const key of keys) {
      if (key === 'id') continue; // Usually id is not displayed directly or combined with name
      // Let's just display all keys except id, and maybe id as a subtitle for the first column
      if (key === 'name' || key === 'title') {
        newTrContent += `                <td className="p-4">\n                  <div>\n                    <p className="font-medium text-zinc-200">{${itemVar}.${key}}</p>\n                    <p className="text-[10px] font-mono text-zinc-500">{${itemVar}.id}</p>\n                  </div>\n                </td>\n`;
      } else {
        newTrContent += `                <td className="p-4 text-sm text-zinc-400">{${itemVar}.${key}}</td>\n`;
      }
    }
    
    // Add the actions column
    newTrContent += `                <td className="p-4 text-right">\n                  <DataTableActions \n                    onEdit={() => setEditingRecord(${itemVar})}\n                    onDelete={() => handleDelete(${itemVar}.id)}\n                  />\n                </td>\n              `;
    
    // Replace the old tr content with the new one
    const fullTrRegex = new RegExp(`(${stateName}\\.map\\(\\s*${itemVar}\\s*=>\\s*\\([\\s\\S]*?<tr[^>]*>)[\\s\\S]*?(<\\/tr>)`);
    content = content.replace(fullTrRegex, `$1${newTrContent}$2`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      fixFile(fullPath);
    }
  }
}

walkDir('./src/components/erp');
