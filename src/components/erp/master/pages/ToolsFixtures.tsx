import { useState } from 'react';
import { Wrench, Plus, Search, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import MasterDataModal from '../components/MasterDataModal';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_TOOLS = [
  { id: 'TOOL-001', name: 'Carbide End Mill 10mm', type: 'Cutting Tool', machine: 'CNC Mill #4', life: '65%', status: 'In Use' },
  { id: 'TOOL-002', name: 'Hydraulic Clamp V2', type: 'Fixture', machine: 'Casting Machine #1', life: '92%', status: 'In Use' },
  { id: 'TOOL-003', name: 'Welding Torch Tip', type: 'Consumable', machine: 'Welding Robot #2', life: '20%', status: 'Replace Soon' },
  { id: 'TOOL-004', name: 'Torque Wrench 50Nm', type: 'Hand Tool', machine: 'Assembly Line #1', life: '88%', status: 'In Use' },
  { id: 'TOOL-005', name: 'Precision Caliper', type: 'Measuring', machine: 'QC Station', life: '95%', status: 'In Use' },
];

export default function ToolsFixtures() {
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setTools(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setTools(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
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
            placeholder="Search Tools & Fixtures..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Tool / Fixture
        </button>
      </div>

      <MasterDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="tools" 
      />

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tool Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Assigned Machine</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Life Remaining</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {tools.map(t => (
              <tr key={t.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{t.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{t.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{t.type}</td>
                <td className="p-4 text-sm text-zinc-400">{t.machine}</td>
                <td className="p-4 text-sm text-zinc-400">{t.life}</td>
                <td className="p-4 text-sm text-zinc-400">{t.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(t)}
                    onDelete={() => handleDelete(t.id)}
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
