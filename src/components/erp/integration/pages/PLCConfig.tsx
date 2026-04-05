import { Settings, Plus, Search, ChevronRight, Activity, Cpu, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_PLCS = [
  { id: 'PLC-001', name: 'Main CNC Controller', brand: 'Siemens', model: 'S7-1500', ip: '192.168.1.10', status: 'Connected', lastSync: '2s ago' },
  { id: 'PLC-002', name: 'Casting Unit PLC', brand: 'Allen Bradley', model: 'ControlLogix', ip: '192.168.1.11', status: 'Connected', lastSync: '5s ago' },
  { id: 'PLC-003', name: 'Welding Robot PLC', brand: 'Siemens', model: 'S7-1200', ip: '192.168.1.12', status: 'Disconnected', lastSync: '1h ago' },
  { id: 'PLC-004', name: 'Assembly Line PLC', brand: 'Beckhoff', model: 'TwinCAT 3', ip: '192.168.1.13', status: 'Connected', lastSync: '1s ago' },
];

export default function PLCConfig() {
  const [plcs, setPlcs] = useState(INITIAL_PLCS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setPlcs(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setPlcs(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3 text-zinc-900 dark:text-zinc-100 transition-colors">
          <div className="p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20">
            <Cpu size={24} />
          </div>
          PLC CONFIGURATION
        </h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 uppercase tracking-tighter">
          <Plus size={20} /> Add PLC Device
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-colors shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
              <tr>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Device Name</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Brand / Model</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">IP Address</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Last Sync</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 transition-colors">
              {plcs.map(plc => (
                <tr key={plc.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{plc.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{plc.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{plc.brand}</td>
                <td className="p-4 text-sm text-zinc-400">{plc.model}</td>
                <td className="p-4 text-sm text-zinc-400">{plc.ip}</td>
                <td className="p-4 text-sm text-zinc-400">{plc.status}</td>
                <td className="p-4 text-sm text-zinc-400">{plc.lastSync}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(plc)}
                    onDelete={() => handleDelete(plc.id)}
                  />
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
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
