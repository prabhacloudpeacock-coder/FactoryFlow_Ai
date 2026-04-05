import { Search, Plus, GitBranch, Settings, Clock, Activity } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_ROUTINGS = [
  {
    id: 'RT-001',
    product: 'Industrial Pump V2',
    operations: [
      { id: 'OP-10', name: 'Casing Casting', machine: 'Casting Machine #1', time: '120 min', status: 'Active' },
      { id: 'OP-20', name: 'Precision Milling', machine: 'CNC Mill #4', time: '45 min', status: 'Active' },
      { id: 'OP-30', name: 'Impeller Assembly', machine: 'Assembly Bench #2', time: '30 min', status: 'Active' },
      { id: 'OP-40', name: 'Final Testing', machine: 'Test Bench #1', time: '15 min', status: 'Active' },
    ]
  },
  {
    id: 'RT-002',
    product: 'Conveyor Belt System',
    operations: [
      { id: 'OP-10', name: 'Frame Welding', machine: 'Welding Robot #2', time: '90 min', status: 'Active' },
      { id: 'OP-20', name: 'Belt Installation', machine: 'Assembly Line #1', time: '60 min', status: 'Active' },
    ]
  }
];

export default function RoutingSetup() {
  const [routings, setRoutings] = useState(INITIAL_ROUTINGS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setRoutings(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setRoutings(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Routings or Products..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus size={18} /> New Routing Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routings.map(routing => (
          <div key={routing.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitBranch className="text-orange-500" size={20} />
                <h3 className="font-bold text-zinc-100">{routing.product}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-500">{routing.id}</span>
                <DataTableActions 
                  onEdit={() => setEditingRecord(routing)}
                  onDelete={() => handleDelete(routing.id)}
                />
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {routing.operations.map((op, idx) => (
                <div key={op.id} className="relative flex gap-4">
                  {idx !== routing.operations.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-20px] w-0.5 bg-zinc-800" />
                  )}
                  <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 z-10 shrink-0">
                    <span className="text-xs font-bold text-zinc-500">{idx + 1}</span>
                  </div>
                  <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-zinc-200 text-sm">{op.name}</h4>
                      <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20">{op.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Settings size={12} className="text-zinc-500" />
                        {op.machine}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-zinc-500" />
                        {op.time}
                      </div>
                    </div>
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
