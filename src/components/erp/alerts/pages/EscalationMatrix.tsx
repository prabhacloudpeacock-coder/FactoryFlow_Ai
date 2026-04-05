import { ShieldAlert, User, Phone, Mail, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_LEVELS = [
  { 
    level: 1, 
    id: 'L1',
    role: 'Shift Supervisor', 
    time: 'Immediate', 
    contact: 'Robert Fox', 
    phone: '+1 234 567 8901', 
    email: 'robert.fox@factory.com',
    status: 'Active'
  },
  { 
    level: 2, 
    id: 'L2',
    role: 'Production Manager', 
    time: '30 min delay', 
    contact: 'Esther Howard', 
    phone: '+1 234 567 8902', 
    email: 'esther.howard@factory.com',
    status: 'Active'
  },
  { 
    level: 3, 
    id: 'L3',
    role: 'Plant Head', 
    time: '2 hour delay', 
    contact: 'Jenny Wilson', 
    phone: '+1 234 567 8903', 
    email: 'jenny.wilson@factory.com',
    status: 'Active'
  },
  { 
    level: 4, 
    id: 'L4',
    role: 'Operations Director', 
    time: '4 hour delay', 
    contact: 'Guy Hawkins', 
    phone: '+1 234 567 8904', 
    email: 'guy.hawkins@factory.com',
    status: 'Active'
  },
];

export default function EscalationMatrix() {
  const [levels, setLevels] = useState(INITIAL_LEVELS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setLevels(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setLevels(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldAlert className="text-orange-500" /> Escalation Matrix
        </h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          Update Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {levels.map((level, idx) => (
          <div key={level.id} className="relative flex gap-6">
            {idx !== levels.length - 1 && (
              <div className="absolute left-6 top-12 bottom-[-24px] w-0.5 bg-zinc-800" />
            )}
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 z-10 shrink-0">
              <span className="text-sm font-bold text-orange-500">L{level.level}</span>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-bold text-zinc-100">{level.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={12} className="text-zinc-500" />
                      <span className="text-xs text-zinc-500">Escalation Trigger: {level.time}</span>
                    </div>
                  </div>
                  <DataTableActions 
                    onEdit={() => setEditingRecord(level)}
                    onDelete={() => handleDelete(level.id)}
                  />
                </div>
                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20">{level.status}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                  <User size={14} className="text-zinc-500" />
                  <span className="text-sm text-zinc-300">{level.contact}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                  <Phone size={14} className="text-zinc-500" />
                  <span className="text-sm text-zinc-300">{level.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                  <Mail size={14} className="text-zinc-500" />
                  <span className="text-sm text-zinc-300 truncate">{level.email}</span>
                </div>
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
        title={`Edit ${editingRecord?.role || editingRecord?.id || 'Record'}`}
      />
    </div>
  );
}
