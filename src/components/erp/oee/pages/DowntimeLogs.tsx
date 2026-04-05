import { Search, Plus, Clock, AlertTriangle, Settings, Activity } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_DOWNTIME = [
  { id: 'DT-001', machine: 'CNC Mill #4', reason: 'Spindle Overheating', category: 'Breakdown', type: 'Auto', duration: '45 min', date: '2026-03-30 10:15', status: 'Resolved' },
  { id: 'DT-002', machine: 'Casting Machine #1', reason: 'Mold Changeover', category: 'Setup', type: 'Manual', duration: '120 min', date: '2026-03-30 08:00', status: 'In Progress' },
  { id: 'DT-003', machine: 'Welding Robot #2', reason: 'Sensor Cleaning', category: 'Minor Stop', type: 'Auto', duration: '5 min', date: '2026-03-30 11:30', status: 'Resolved' },
  { id: 'DT-004', machine: 'Assembly Line #1', reason: 'Material Shortage', category: 'External', type: 'Manual', duration: '30 min', date: '2026-03-30 09:45', status: 'Resolved' },
];

export default function DowntimeLogs() {
  const [downtime, setDowntime] = useState(INITIAL_DOWNTIME);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setDowntime(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setDowntime(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Downtime Logs..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus size={18} /> Manual Downtime Entry
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Machine</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Reason</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Duration</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Date & Time</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {downtime.map(dt => (
              <tr key={dt.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{dt.machine}</td>
                <td className="p-4 text-sm text-zinc-400">{dt.reason}</td>
                <td className="p-4 text-sm text-zinc-400">{dt.category}</td>
                <td className="p-4 text-sm text-zinc-400">{dt.type}</td>
                <td className="p-4 text-sm text-zinc-400">{dt.duration}</td>
                <td className="p-4 text-sm text-zinc-400">{dt.date}</td>
                <td className="p-4 text-sm text-zinc-400">{dt.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(dt)}
                    onDelete={() => handleDelete(dt.id)}
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
