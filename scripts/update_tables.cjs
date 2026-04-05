const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it has MOCK_
  const mockMatch = content.match(/const MOCK_([A-Z_]+)\s*=\s*\[([\s\S]*?)\];/);
  if (!mockMatch) return;

  const mockName = mockMatch[1];
  const mockVarName = `MOCK_${mockName}`;
  const stateName = mockName.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  const setStateName = `set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}`;
  
  // Replace MOCK_ with INITIAL_
  content = content.replace(`const ${mockVarName} = [`, `const INITIAL_${mockName} = [`);
  
  // Add imports
  if (!content.includes('DataTableActions')) {
    const depth = filePath.split('/').length - 4; // src/components/erp/master/pages/MachinesMaster.tsx -> 6 - 4 = 2
    const relativePath = '../'.repeat(depth) + 'common/';
    
    // Find last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
    
    const importsToAdd = `import DataTableActions from '${relativePath}DataTableActions';\nimport EditModal from '${relativePath}EditModal';\n`;
    content = content.slice(0, endOfLastImport) + importsToAdd + content.slice(endOfLastImport);
  }

  // Find component function
  const componentMatch = content.match(/export default function ([A-Za-z0-9_]+)\(\) {/);
  if (!componentMatch) return;
  
  const componentName = componentMatch[1];
  const componentStart = componentMatch.index + componentMatch[0].length;
  
  // Check if state already exists
  if (!content.includes(`const [${stateName}, ${setStateName}]`)) {
    const stateToAdd = `\n  const [${stateName}, ${setStateName}] = useState(INITIAL_${mockName});\n  const [editingRecord, setEditingRecord] = useState<any>(null);\n\n  const handleDelete = (id: string) => {\n    ${setStateName}(prev => prev.filter(item => item.id !== id));\n  };\n\n  const handleSaveEdit = (updatedRecord: any) => {\n    ${setStateName}(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));\n    setEditingRecord(null);\n  };\n`;
    content = content.slice(0, componentStart) + stateToAdd + content.slice(componentStart);
  }

  // Replace MOCK_VAR.map with stateName.map
  content = content.replace(new RegExp(`${mockVarName}\\.map`, 'g'), `${stateName}.map`);

  // Replace ChevronRight button with DataTableActions
  // We need to find the map callback parameter name
  const mapMatch = content.match(new RegExp(`${stateName}\\.map\\(\\s*([a-zA-Z0-9_]+)\\s*=>`));
  if (mapMatch) {
    const itemVar = mapMatch[1];
    
    // Replace the action button
    // Look for <button ...><ChevronRight .../></button> or similar in the last td
    const actionCellRegex = /<td[^>]*>[\s\S]*?<button[^>]*>[\s\S]*?<ChevronRight[^>]*>[\s\S]*?<\/button>[\s\S]*?<\/td>/g;
    content = content.replace(actionCellRegex, (match) => {
      return `<td className="p-4 text-right">\n                  <DataTableActions \n                    onEdit={() => setEditingRecord(${itemVar})}\n                    onDelete={() => handleDelete(${itemVar}.id)}\n                  />\n                </td>`;
    });
    
    // Also handle MoreVertical if it was already used
    const actionCellRegex2 = /<td[^>]*>[\s\S]*?<button[^>]*>[\s\S]*?<MoreVertical[^>]*>[\s\S]*?<\/button>[\s\S]*?<\/td>/g;
    content = content.replace(actionCellRegex2, (match) => {
      return `<td className="p-4 text-right">\n                  <DataTableActions \n                    onEdit={() => setEditingRecord(${itemVar})}\n                    onDelete={() => handleDelete(${itemVar}.id)}\n                  />\n                </td>`;
    });
  }

  // Add EditModal before the final closing div
  if (!content.includes('<EditModal')) {
    const lastDivIndex = content.lastIndexOf('</div>');
    if (lastDivIndex !== -1) {
      const modalToAdd = `\n      <EditModal\n        isOpen={!!editingRecord}\n        onClose={() => setEditingRecord(null)}\n        onSave={handleSaveEdit}\n        initialData={editingRecord}\n        title={\`Edit \${editingRecord?.name || editingRecord?.id || 'Record'}\`}\n      />\n    `;
      content = content.slice(0, lastDivIndex) + modalToAdd + content.slice(lastDivIndex);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src/components/erp');
