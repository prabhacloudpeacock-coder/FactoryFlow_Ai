import { History, Search, Settings, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_HISTORY = [
  { id: 'H-001', machine: 'CNC Mill #4', event: 'Breakdown', description: 'Spindle motor overheating', date: '2026-03-25 14:30', duration: '4h 30m', status: 'Resolved' },
  { id: 'H-002', machine: 'CNC Mill #4', event: 'Preventive', description: 'Monthly lubrication and filter change', date: '2026-03-10 09:15', duration: '2h 00m', status: 'Completed' },
  { id: 'H-003', machine: 'Casting Machine #1', event: 'Breakdown', description: 'Hydraulic leak in main cylinder', date: '2026-03-28 16:45', duration: '6h 15m', status: 'Resolved' },
];

export default function MachineHistory() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setHistory(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Machine History..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <History size={16} /> Export Logs
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Machine</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Event Type</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Date & Time</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Downtime</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {history.map(h => (
              <tr key={h.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{h.machine}</td>
                <td className="p-4 text-sm text-zinc-400">{h.event}</td>
                <td className="p-4 text-sm text-zinc-400">{h.description}</td>
                <td className="p-4 text-sm text-zinc-400">{h.date}</td>
                <td className="p-4 text-sm text-zinc-400">{h.duration}</td>
                <td className="p-4 text-sm text-zinc-400">{h.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(h)}
                    onDelete={() => handleDelete(h.id)}
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
