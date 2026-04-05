import { Package, Search, Plus, AlertTriangle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_SPARE_PARTS = [
  { id: 'SP-001', name: 'Hydraulic Seal Kit', category: 'Seals', qty: 15, unit: 'set', minQty: 5, status: 'Healthy' },
  { id: 'SP-002', name: 'Spindle Motor Bearing', category: 'Bearings', qty: 2, unit: 'pcs', minQty: 4, status: 'Low Stock' },
  { id: 'SP-003', name: 'CNC Controller Fan', category: 'Electronics', qty: 8, unit: 'pcs', minQty: 2, status: 'Healthy' },
  { id: 'SP-004', name: 'Welding Tip #4', category: 'Consumables', qty: 50, unit: 'pcs', minQty: 100, status: 'Low Stock' },
];

export default function SpareParts() {
  const [spareParts, setSpareParts] = useState(INITIAL_SPARE_PARTS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setSpareParts(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setSpareParts(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Spare Parts..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus size={16} /> Add Spare Part
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Part Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Quantity</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {spareParts.map(part => (
              <tr key={part.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{part.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{part.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{part.category}</td>
                <td className="p-4 text-sm text-zinc-400">{part.qty}</td>
                <td className="p-4 text-sm text-zinc-400">{part.unit}</td>
                <td className="p-4 text-sm text-zinc-400">{part.minQty}</td>
                <td className="p-4 text-sm text-zinc-400">{part.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(part)}
                    onDelete={() => handleDelete(part.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
