import { useState } from 'react';
import { Settings, Plus, Search, ChevronRight, Activity } from 'lucide-react';
import MasterDataModal from '../components/MasterDataModal';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_MACHINES = [
  { id: 'MAC-001', name: 'CNC Mill #4', type: 'Milling', line: 'Line A', status: 'Operational', lastService: '2026-03-15', serialNumber: 'MAC-SN-12345' },
  { id: 'MAC-002', name: 'Casting Machine #1', type: 'Casting', line: 'Line B', status: 'Operational', lastService: '2026-02-28', serialNumber: 'MAC-SN-12345' },
  { id: 'MAC-003', name: 'Welding Robot #2', type: 'Robotics', line: 'Line C', status: 'Maintenance', lastService: '2026-03-25', serialNumber: 'MAC-SN-12345' },
  { id: 'MAC-004', name: 'Assembly Line #1', type: 'Assembly', line: 'Line A', status: 'Operational', lastService: '2026-03-10', serialNumber: 'MAC-SN-12345' },
  { id: 'MAC-005', name: 'Press Machine #3', type: 'Press', line: 'Line B', status: 'Operational', lastService: '2026-01-20', serialNumber: 'MAC-SN-12345' },
];

export default function MachinesMaster() {
  const [machines, setMachines] = useState(INITIAL_MACHINES);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setMachines(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setMachines(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
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
            placeholder="Search Machines..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Machine
        </button>
      </div>

      <MasterDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="machines" 
      />

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Machine Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Serial Number</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Line</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Last Service</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {machines.map(m => (
              <tr key={m.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{m.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{m.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm font-mono text-zinc-400">{m.serialNumber}</td>
                <td className="p-4 text-sm text-zinc-400">{m.type}</td>
                <td className="p-4 text-sm text-zinc-400">{m.line}</td>
                <td className="p-4 text-sm text-zinc-400">{m.status}</td>
                <td className="p-4 text-sm text-zinc-400">{m.lastService}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(m)}
                    onDelete={() => handleDelete(m.id)}
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
