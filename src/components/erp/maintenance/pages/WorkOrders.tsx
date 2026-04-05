import { Wrench, Plus, AlertTriangle, User, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_WORK_ORDERS = [
  { id: 'WO-001', machine: 'CNC Mill #4', type: 'Preventive', task: 'Spindle Lubrication', assigned: 'John Doe', status: 'In Progress', priority: 'Medium' },
  { id: 'WO-002', machine: 'Casting Machine #1', type: 'Breakdown', task: 'Hydraulic Leak Fix', assigned: 'Jane Smith', status: 'Open', priority: 'High' },
  { id: 'WO-003', machine: 'Welding Robot #2', type: 'Preventive', task: 'Sensor Calibration', assigned: 'Mike Wilson', status: 'Completed', priority: 'High' },
];

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState(INITIAL_WORK_ORDERS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setWorkOrders(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setWorkOrders(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Wrench className="text-orange-500" /> Maintenance Work Orders
        </h2>
        <div className="flex gap-2">
          <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-500/20">
            <AlertTriangle size={16} /> Report Breakdown
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus size={16} /> New Work Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workOrders.map(wo => (
          <div key={wo.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  wo.type === 'Breakdown' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  <Wrench size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{wo.machine}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-zinc-500">{wo.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      wo.type === 'Breakdown' ? 'border-red-500/20 text-red-500' : 'border-blue-500/20 text-blue-500'
                    }`}>{wo.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  wo.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                  wo.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {wo.status}
                </span>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50 mb-4">
              <p className="text-sm text-zinc-300 font-medium">{wo.task}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User size={12} />
                  {wo.assigned}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  Priority: {wo.priority}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-orange-500 hover:underline">View Details</button>
                <DataTableActions 
                  onEdit={() => setEditingRecord(wo)}
                  onDelete={() => handleDelete(wo.id)}
                />
              </div>
            </div>
          </div>
        ))}
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
