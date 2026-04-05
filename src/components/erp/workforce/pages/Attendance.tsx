import { Search, Fingerprint, Clock, User, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_ATTENDANCE = [
  { id: 'EMP-001', name: 'Robert Fox', timeIn: '05:55', timeOut: '-', status: 'Present', method: 'Biometric' },
  { id: 'EMP-002', name: 'Esther Howard', timeIn: '06:02', timeOut: '-', status: 'Present', method: 'Biometric' },
  { id: 'EMP-003', name: 'Jenny Wilson', timeIn: '05:45', timeOut: '-', status: 'Present', method: 'Manual' },
  { id: 'EMP-004', name: 'Guy Hawkins', timeIn: '-', timeOut: '-', status: 'Absent', method: '-' },
  { id: 'EMP-005', name: 'Cody Fisher', timeIn: '06:15', timeOut: '-', status: 'Late', method: 'Biometric' },
];

export default function Attendance() {
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setAttendance(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setAttendance(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Employee Attendance..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Fingerprint size={16} /> Biometric Sync
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            Manual Entry
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Employee</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Clock In</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Clock Out</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Method</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {attendance.map(a => (
              <tr key={a.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{a.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{a.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{a.timeIn}</td>
                <td className="p-4 text-sm text-zinc-400">{a.timeOut}</td>
                <td className="p-4 text-sm text-zinc-400">{a.method}</td>
                <td className="p-4 text-sm text-zinc-400">{a.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(a)}
                    onDelete={() => handleDelete(a.id)}
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
