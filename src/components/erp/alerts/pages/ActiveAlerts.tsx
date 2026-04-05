import { AlertTriangle, AlertCircle, Package, ShieldAlert, ChevronRight, Clock, Bell } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_ALERTS = [
  { id: 'AL-001', type: 'Breakdown', source: 'CNC Mill #4', message: 'Spindle motor overheating - Critical', priority: 'Critical', time: '10 min ago', status: 'Active' },
  { id: 'AL-002', type: 'Quality', source: 'Assembly Line #1', message: 'Defect rate exceeded 5% threshold', priority: 'High', time: '25 min ago', status: 'Active' },
  { id: 'AL-003', type: 'Material', source: 'Inventory', message: 'Steel Sheet 2mm below safety stock', priority: 'Medium', time: '1 hour ago', status: 'Acknowledged' },
  { id: 'AL-004', type: 'Breakdown', source: 'Casting Machine #1', message: 'Hydraulic pressure drop detected', priority: 'Critical', time: '2 hours ago', status: 'Escalated' },
];

export default function ActiveAlerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setAlerts(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setAlerts(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="text-orange-500" /> Active System Alerts
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-bold px-4 py-2 rounded-lg text-sm transition-colors">
            Acknowledge All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert.priority === 'Critical' ? 'bg-red-500/10 text-red-500' :
                  alert.priority === 'High' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{alert.source}</h3>
                  <p className="text-xs text-zinc-500">{alert.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.status === 'Active' ? 'bg-red-500/10 text-red-500' :
                  alert.status === 'Escalated' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-zinc-500/10 text-zinc-500'
                }`}>
                  {alert.status}
                </span>
                <DataTableActions 
                  onEdit={() => setEditingRecord(alert)}
                  onDelete={() => handleDelete(alert.id)}
                />
              </div>
            </div>
            <p className="text-sm text-zinc-300 mb-2">{alert.message}</p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Clock size={12} />
              {alert.time}
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
