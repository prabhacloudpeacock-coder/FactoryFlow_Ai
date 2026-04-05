const fs = require('fs');
const path = require('path');

function fixCards(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const stateNameMatch = content.match(/const \[([a-zA-Z0-9_]+), set[a-zA-Z0-9_]+\] = useState\(INITIAL_/);
  if (!stateNameMatch) return;
  const stateName = stateNameMatch[1];

  const mapRegex = new RegExp(`${stateName}\\.map\\(\\s*([a-zA-Z0-9_]+)\\s*=>`);
  const mapMatch = content.match(mapRegex);
  if (!mapMatch) return;
  
  const itemVar = mapMatch[1];

  // Replace ChevronRight button in cards
  const buttonRegex = /<button[^>]*>[\s\S]*?<ChevronRight[^>]*>[\s\S]*?<\/button>/g;
  
  if (content.match(buttonRegex)) {
    content = content.replace(buttonRegex, `<DataTableActions \n                    onEdit={() => setEditingRecord(${itemVar})}\n                    onDelete={() => handleDelete(${itemVar}.id)}\n                  />`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed cards in ${filePath}`);
  }
}

const filesToFix = [
  'src/components/erp/alerts/pages/ActiveAlerts.tsx',
  'src/components/erp/bom/pages/BOMList.tsx',
  'src/components/erp/bom/pages/RoutingSetup.tsx',
  'src/components/erp/inventory/pages/BatchTracking.tsx',
  'src/components/erp/inventory/pages/LineSideStock.tsx',
  'src/components/erp/inventory/pages/WIPTracking.tsx',
  'src/components/erp/maintenance/pages/WorkOrders.tsx',
  'src/components/erp/master/pages/ProductionLines.tsx'
];

for (const file of filesToFix) {
  if (fs.existsSync(file)) {
    fixCards(file);
  }
}
