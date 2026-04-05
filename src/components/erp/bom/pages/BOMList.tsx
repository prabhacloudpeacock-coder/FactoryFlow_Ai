import { Search, Plus, ChevronRight, ChevronDown, Package, Layers } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_BOMS = [
  {
    id: 'BOM-001',
    product: 'Industrial Pump V2',
    version: '1.2.0',
    status: 'Active',
    items: [
      { id: 'P-101', name: 'Main Housing', qty: 1, unit: 'pcs', level: 1 },
      { id: 'P-102', name: 'Impeller Assembly', qty: 1, unit: 'pcs', level: 1, subItems: [
        { id: 'P-102-1', name: 'Impeller Blade', qty: 4, unit: 'pcs', level: 2 },
        { id: 'P-102-2', name: 'Shaft', qty: 1, unit: 'pcs', level: 2 },
      ]},
      { id: 'P-103', name: 'Seal Kit', qty: 2, unit: 'set', level: 1 },
    ]
  },
  {
    id: 'BOM-002',
    product: 'Conveyor Belt System',
    version: '2.0.1',
    status: 'Draft',
    items: [
      { id: 'C-201', name: 'Belt Section', qty: 10, unit: 'm', level: 1 },
      { id: 'C-202', name: 'Drive Motor', qty: 1, unit: 'pcs', level: 1 },
    ]
  }
];

export default function BOMList() {
  const [boms, setBoms] = useState(INITIAL_BOMS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setBoms(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setBoms(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search BOMs or Products..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus size={18} /> Create New BOM
        </button>
      </div>

      <div className="space-y-4">
        {boms.map(bom => (
          <div key={bom.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900/50 transition-colors"
              onClick={() => toggleExpand(bom.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <Package className="text-orange-500" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{bom.product}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-zinc-500">{bom.id}</span>
                    <span className="text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">v{bom.version}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-xs px-2 py-1 rounded-full ${bom.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                  {bom.status}
                </span>
                <div onClick={(e) => e.stopPropagation()}>
                  <DataTableActions 
                    onEdit={() => setEditingRecord(bom)}
                    onDelete={() => handleDelete(bom.id)}
                  />
                </div>
                {expanded.includes(bom.id) ? <ChevronDown size={20} className="text-zinc-500" /> : <ChevronRight size={20} className="text-zinc-500" />}
              </div>
            </div>

            {expanded.includes(bom.id) && (
              <div className="border-t border-zinc-800 p-4 bg-zinc-900/20">
                <div className="space-y-2">
                  <div className="grid grid-cols-4 text-xs font-bold text-zinc-500 uppercase px-4 mb-2">
                    <span>Item Name</span>
                    <span>Part ID</span>
                    <span>Quantity</span>
                    <span>Level</span>
                  </div>
                  {bom.items.map(item => (
                    <div key={item.id}>
                      <div className="grid grid-cols-4 text-sm p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                        <span className="flex items-center gap-2">
                          <Layers size={14} className="text-zinc-500" />
                          {item.name}
                        </span>
                        <span className="font-mono text-zinc-400">{item.id}</span>
                        <span>{item.qty} {item.unit}</span>
                        <span className="text-zinc-500">Level {item.level}</span>
                      </div>
                      {item.subItems && (
                        <div className="ml-8 mt-2 space-y-2 border-l border-zinc-800 pl-4">
                          {item.subItems.map(sub => (
                            <div key={sub.id} className="grid grid-cols-4 text-sm p-2 bg-zinc-900/30 rounded-lg border border-zinc-800/30">
                              <span className="flex items-center gap-2">
                                <ChevronRight size={12} className="text-zinc-600" />
                                {sub.name}
                              </span>
                              <span className="font-mono text-zinc-500">{sub.id}</span>
                              <span>{sub.qty} {sub.unit}</span>
                              <span className="text-zinc-600">Level {sub.level}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    
      <EditModal
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        onSave={handleSaveEdit}
        initialData={editingRecord}
        title={`Edit ${editingRecord?.name || editingRecord?.id || 'Record'}`}
      />
    </div>
  );
}
