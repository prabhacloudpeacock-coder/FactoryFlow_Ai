import { Search, MapPin, Package, AlertTriangle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_LINES = [
  { 
    id: 'LINE-1', 
    name: 'Assembly Line #1', 
    stock: [
      { id: 'RM-001', name: 'Steel Sheet 2mm', qty: 50, unit: 'm²', status: 'Healthy' },
      { id: 'RM-002', name: 'Hydraulic Fluid', qty: 10, unit: 'L', status: 'Low Stock' },
    ]
  },
  { 
    id: 'LINE-2', 
    name: 'Casting Station #1', 
    stock: [
      { id: 'RM-003', name: 'Aluminum Alloy', qty: 200, unit: 'kg', status: 'Healthy' },
      { id: 'RM-004', name: 'Casting Sand', qty: 500, unit: 'kg', status: 'Healthy' },
    ]
  },
];

export default function LineSideStock() {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setLines(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setLines(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Line-side Stock..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <ArrowRight size={16} /> Transfer to Line
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lines.map(line => (
          <div key={line.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="text-orange-500" size={20} />
                <h3 className="font-bold text-zinc-100">{line.name}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-500">{line.id}</span>
                <DataTableActions 
                  onEdit={() => setEditingRecord(line)}
                  onDelete={() => handleDelete(line.id)}
                />
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {line.stock.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="text-zinc-500" size={16} />
                    <div>
                      <span className="text-sm font-medium text-zinc-200">{item.name}</span>
                      <p className="text-[10px] font-mono text-zinc-600">{item.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-mono ${item.status === 'Low Stock' ? 'text-red-500' : 'text-zinc-100'}`}>
                      {item.qty} {item.unit}
                    </span>
                    {item.status === 'Low Stock' && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 mt-1">
                        <AlertTriangle size={10} />
                        Low Stock
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
