import { Search, Plus, ChevronRight, Activity, Cpu, CheckCircle2, XCircle, Share2, Monitor } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_MAPPINGS = [
  { id: 'MAP-001', internal: 'CNC_MILL_4_SPINDLE_TEMP', external: 'PLC_001.DB10.REAL4', gateway: 'OPC-UA Server Hub', status: 'Mapped' },
  { id: 'MAP-002', internal: 'CASTING_UNIT_1_PRESSURE', external: 'PLC_002.TAG_PRESSURE_VAL', gateway: 'OPC-UA Server Hub', status: 'Mapped' },
  { id: 'MAP-003', internal: 'WELDING_ROBOT_2_CURRENT', external: 'PLC_003.CURRENT_FEED', gateway: 'MQTT Broker', status: 'Error' },
  { id: 'MAP-004', internal: 'ASSEMBLY_LINE_1_COUNTER', external: 'PLC_004.COUNTER_TOTAL', gateway: 'OPC-UA Server Hub', status: 'Mapped' },
];

export default function DeviceMapping() {
  const [mappings, setMappings] = useState(INITIAL_MAPPINGS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setMappings(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setMappings(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3 text-zinc-900 dark:text-zinc-100 transition-colors">
          <div className="p-3 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20">
            <Monitor size={24} />
          </div>
          DEVICE MAPPING
        </h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 uppercase tracking-tighter">
          <Plus size={20} /> New Mapping
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors shadow-xl shadow-zinc-200/40 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
              <tr>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Internal Variable</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">External Address</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Gateway</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 transition-colors">
              {mappings.map(map => (
                <tr key={map.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{map.internal}</td>
                <td className="p-4 text-sm text-zinc-400">{map.external}</td>
                <td className="p-4 text-sm text-zinc-400">{map.gateway}</td>
                <td className="p-4 text-sm text-zinc-400">{map.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(map)}
                    onDelete={() => handleDelete(map.id)}
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
