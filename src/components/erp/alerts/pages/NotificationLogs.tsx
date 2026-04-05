import { Search, History, Clock, User, CheckCircle2, XCircle, Mail, Phone, Bell } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_LOGS = [
  { id: 'LOG-001', recipient: 'John Doe', method: 'SMS', message: 'Alert: CNC Mill #4 Breakdown - Critical', time: '2026-03-30 14:30', status: 'Delivered' },
  { id: 'LOG-002', recipient: 'Jane Smith', method: 'Email', message: 'Alert: Quality Failure on Line #1', time: '2026-03-30 14:35', status: 'Delivered' },
  { id: 'LOG-003', recipient: 'Mike Wilson', method: 'Push', message: 'Warning: Material Shortage (Part X)', time: '2026-03-30 14:40', status: 'Failed' },
  { id: 'LOG-004', recipient: 'Robert Fox', method: 'SMS', message: 'Escalation: CNC Mill #4 Breakdown - Critical', time: '2026-03-30 15:00', status: 'Delivered' },
];

export default function NotificationLogs() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setLogs(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setLogs(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Notification Logs..." 
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
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Recipient</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Method</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Message</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Time</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{log.recipient}</td>
                <td className="p-4 text-sm text-zinc-400">{log.method}</td>
                <td className="p-4 text-sm text-zinc-400">{log.message}</td>
                <td className="p-4 text-sm text-zinc-400">{log.time}</td>
                <td className="p-4 text-sm text-zinc-400">{log.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(log)}
                    onDelete={() => handleDelete(log.id)}
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
