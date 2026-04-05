import { Search, Activity, Package, Clock, ChevronRight, Layers } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_WIP = [
  { id: 'WIP-101', product: 'Industrial Pump V2', batch: 'B-2026-001', stage: 'Milling', qty: 25, unit: 'pcs', started: '2026-03-29 08:00', completion: '65%' },
  { id: 'WIP-102', product: 'Conveyor Belt System', batch: 'B-2026-002', stage: 'Welding', qty: 5, unit: 'pcs', started: '2026-03-30 10:30', completion: '20%' },
  { id: 'WIP-103', product: 'Pump Housing (Semi)', batch: 'B-2026-003', stage: 'Casting', qty: 50, unit: 'pcs', started: '2026-03-28 14:00', completion: '90%' },
];

export default function WIPTracking() {
  const [wip, setWip] = useState(INITIAL_WIP);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setWip(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setWip(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search WIP Items..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {wip.map(item => (
          <div key={item.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{item.product}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-zinc-500">{item.id}</span>
                    <span className="text-[10px] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">Batch: {item.batch}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-zinc-200">{item.qty} {item.unit}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Current Stage: <span className="text-zinc-300 font-medium">{item.stage}</span></span>
                <span className="text-orange-500 font-bold">{item.completion}</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-orange-500 h-full rounded-full" 
                  style={{ width: item.completion }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-900">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock size={12} />
                Started: {item.started}
              </div>
              <div className="flex items-center gap-4">
                <button className="text-orange-500 hover:underline text-xs flex items-center gap-1">
                  View Details
                </button>
                <DataTableActions 
                  onEdit={() => setEditingRecord(item)}
                  onDelete={() => handleDelete(item.id)}
                />
              </div>
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
