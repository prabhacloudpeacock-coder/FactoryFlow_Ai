import { Calendar, Clock, UserPlus, Search, ChevronRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_SHIFTS = [
  { id: 'SH-001', name: 'Morning Shift', time: '06:00 - 14:00', operators: 12, lead: 'John Doe', status: 'Active' },
  { id: 'SH-002', name: 'Afternoon Shift', time: '14:00 - 22:00', operators: 10, lead: 'Jane Smith', status: 'Upcoming' },
  { id: 'SH-003', name: 'Night Shift', time: '22:00 - 06:00', operators: 8, lead: 'Mike Wilson', status: 'Scheduled' },
];

const ASSIGNMENTS = [
  { id: 'A-101', operator: 'Robert Fox', machine: 'CNC Mill #4', shift: 'Morning', status: 'On-site' },
  { id: 'A-102', operator: 'Esther Howard', machine: 'Casting Machine #1', shift: 'Morning', status: 'On-site' },
  { id: 'A-103', operator: 'Jenny Wilson', machine: 'Welding Robot #2', shift: 'Morning', status: 'On-site' },
  { id: 'A-104', operator: 'Guy Hawkins', machine: 'Assembly Line #1', shift: 'Morning', status: 'Break' },
];

export default function ShiftPlanning() {
  const [shifts, setShifts] = useState(INITIAL_SHIFTS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setShifts(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setShifts(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {shifts.map(shift => (
          <div key={shift.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg">
                  <Clock className="text-orange-500" size={20} />
                </div>
                <DataTableActions 
                  onEdit={() => setEditingRecord(shift)}
                  onDelete={() => handleDelete(shift.id)}
                />
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                shift.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
              }`}>
                {shift.status}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-zinc-100">{shift.name}</h3>
              <p className="text-xs text-zinc-500">{shift.time}</p>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-900">
              <span className="text-zinc-400">{shift.operators} Operators</span>
              <span className="text-zinc-500">Lead: {shift.lead}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-zinc-100 flex items-center gap-2">
            <UserPlus size={18} className="text-orange-500" /> Current Operator Assignments
          </h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
            <input 
              type="text" 
              placeholder="Search assignments..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Operator</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Machine</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Shift</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {ASSIGNMENTS.map(a => (
              <tr key={a.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{a.operator}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{a.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{a.machine}</td>
                <td className="p-4 text-sm text-zinc-400">{a.shift}</td>
                <td className="p-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    a.status === 'On-site' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(a)}
                    onDelete={() => {}} // Assignments are mock for now
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
