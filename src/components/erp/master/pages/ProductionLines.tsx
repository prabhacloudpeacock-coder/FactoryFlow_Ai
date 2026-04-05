import { useState } from 'react';
import { Layout, Plus, Search, ChevronRight, Activity, Users } from 'lucide-react';
import MasterDataModal from '../components/MasterDataModal';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_LINES = [
  { id: 'LINE-A', name: 'Line A - High Precision', machines: 8, operators: 12, status: 'Active', capacity: '95%' },
  { id: 'LINE-B', name: 'Line B - Heavy Casting', machines: 5, operators: 8, status: 'Active', capacity: '82%' },
  { id: 'LINE-C', name: 'Line C - Robotic Welding', machines: 12, operators: 6, status: 'Active', capacity: '90%' },
  { id: 'LINE-D', name: 'Line D - Assembly', machines: 15, operators: 20, status: 'Active', capacity: '88%' },
];

export default function ProductionLines() {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setLines(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setLines(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Production Lines..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Production Line
        </button>
      </div>

      <MasterDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="lines" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lines.map(line => (
          <div key={line.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-4 hover:bg-zinc-900/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                  <Layout className="text-orange-500" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{line.name}</h3>
                  <p className="text-[10px] font-mono text-zinc-600">{line.id}</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full border bg-green-500/10 text-green-500 border-green-500/20">
                {line.status}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50 text-center">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Machines</p>
                <p className="text-sm font-bold text-zinc-200">{line.machines}</p>
              </div>
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50 text-center">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Operators</p>
                <p className="text-sm font-bold text-zinc-200">{line.operators}</p>
              </div>
              <div className="p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50 text-center">
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Capacity</p>
                <p className="text-sm font-bold text-zinc-200">{line.capacity}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Activity size={12} className="text-zinc-600" />
                Efficiency: 92%
              </div>
              <div className="flex items-center gap-4">
                <button className="text-orange-500 hover:underline text-xs flex items-center gap-1">
                  View Line Details <ChevronRight size={14} />
                </button>
                <DataTableActions 
                  onEdit={() => setEditingRecord(line)}
                  onDelete={() => handleDelete(line.id)}
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
