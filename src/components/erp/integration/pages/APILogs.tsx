import { Search, History, Clock, User, CheckCircle2, XCircle, Terminal, Globe, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_API_LOGS = [
  { id: 'API-001', method: 'POST', endpoint: '/api/v1/telemetry', status: 200, latency: '45ms', time: '2026-03-30 15:30:01' },
  { id: 'API-002', method: 'GET', endpoint: '/api/v1/machines/MAC-001', status: 200, latency: '12ms', time: '2026-03-30 15:30:05' },
  { id: 'API-003', method: 'PUT', endpoint: '/api/v1/production/order/123', status: 403, latency: '8ms', time: '2026-03-30 15:30:10' },
  { id: 'API-004', method: 'POST', endpoint: '/api/v1/alerts/escalate', status: 201, latency: '120ms', time: '2026-03-30 15:30:15' },
  { id: 'API-005', method: 'GET', endpoint: '/api/v1/inventory/stock', status: 500, latency: '2500ms', time: '2026-03-30 15:30:20' },
];

export default function APILogs() {
  const [apiLogs, setApiLogs] = useState(INITIAL_API_LOGS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setApiLogs(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setApiLogs(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Search API Logs..." 
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm font-medium"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-zinc-200 dark:border-zinc-700/50 active:scale-95 uppercase tracking-tighter">
            <History size={18} /> Export Logs
          </button>
          <div className="p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20 hidden md:block">
            <Terminal size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors shadow-xl shadow-zinc-200/40 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
              <tr>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Method</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Endpoint</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Latency</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Time</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 transition-colors">
              {apiLogs.map(log => (
                <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{log.method}</td>
                <td className="p-4 text-sm text-zinc-400">{log.endpoint}</td>
                <td className="p-4 text-sm text-zinc-400">{log.status}</td>
                <td className="p-4 text-sm text-zinc-400">{log.latency}</td>
                <td className="p-4 text-sm text-zinc-400">{log.time}</td>
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
