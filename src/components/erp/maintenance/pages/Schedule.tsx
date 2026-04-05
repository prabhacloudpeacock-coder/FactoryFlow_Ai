import { Calendar, Clock, Settings, ChevronRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_SCHEDULE = [
  { id: 'PM-001', machine: 'CNC Mill #4', task: 'Spindle Lubrication', frequency: 'Weekly', nextDue: '2026-04-02', priority: 'Medium' },
  { id: 'PM-002', machine: 'Casting Machine #1', task: 'Hydraulic Filter Change', frequency: 'Monthly', nextDue: '2026-04-15', priority: 'High' },
  { id: 'PM-003', machine: 'Welding Robot #2', task: 'Sensor Calibration', frequency: 'Quarterly', nextDue: '2026-03-31', priority: 'High' },
  { id: 'PM-004', machine: 'Assembly Line #1', task: 'Belt Tension Check', frequency: 'Weekly', nextDue: '2026-04-05', priority: 'Low' },
];

export default function MaintenanceSchedule() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setSchedule(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="text-orange-500" /> Preventive Maintenance Schedule
        </h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          Add Schedule
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Machine</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Task</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Frequency</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Next Due</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Priority</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {schedule.map(item => (
              <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{item.machine}</td>
                <td className="p-4 text-sm text-zinc-400">{item.task}</td>
                <td className="p-4 text-sm text-zinc-400">{item.frequency}</td>
                <td className="p-4 text-sm text-zinc-400">{item.nextDue}</td>
                <td className="p-4 text-sm text-zinc-400">{item.priority}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(item)}
                    onDelete={() => handleDelete(item.id)}
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
