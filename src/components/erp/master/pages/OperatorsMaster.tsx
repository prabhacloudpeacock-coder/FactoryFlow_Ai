import { useState } from 'react';
import { Users, Plus, Search, ChevronRight, Star, User } from 'lucide-react';
import MasterDataModal from '../components/MasterDataModal';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_OPERATORS = [
  { id: 'EMP-001', name: 'Robert Fox', role: 'Senior Operator', shift: 'Morning', skills: 5, status: 'Active' },
  { id: 'EMP-002', name: 'Esther Howard', role: 'Machine Operator', shift: 'Morning', skills: 4, status: 'Active' },
  { id: 'EMP-003', name: 'Jenny Wilson', role: 'Junior Operator', shift: 'Evening', skills: 3, status: 'Active' },
  { id: 'EMP-004', name: 'Guy Hawkins', role: 'Senior Operator', shift: 'Night', skills: 5, status: 'On Leave' },
  { id: 'EMP-005', name: 'Cody Fisher', role: 'Machine Operator', shift: 'Evening', skills: 4, status: 'Active' },
];

export default function OperatorsMaster() {
  const [operators, setOperators] = useState(INITIAL_OPERATORS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setOperators(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setOperators(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Operators..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Operator
        </button>
      </div>

      <MasterDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="operators" 
      />

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Operator Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Role</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Shift</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Skill Level</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {operators.map(op => (
              <tr key={op.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{op.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{op.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{op.role}</td>
                <td className="p-4 text-sm text-zinc-400">{op.shift}</td>
                <td className="p-4 text-sm text-zinc-400">{op.skills}</td>
                <td className="p-4 text-sm text-zinc-400">{op.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(op)}
                    onDelete={() => handleDelete(op.id)}
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
