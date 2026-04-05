import { useState } from 'react';
import { ShieldCheck, Plus, Search, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import MasterDataModal from '../components/MasterDataModal';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_PARAMS = [
  { id: 'QP-001', name: 'Outer Diameter', product: 'Steel Shaft 20mm', target: '20.00mm', tolerance: '±0.05mm', method: 'Caliper' },
  { id: 'QP-002', name: 'Surface Roughness', product: 'Aluminium Gear Box', target: 'Ra 1.6', tolerance: 'Max Ra 2.0', method: 'Profilometer' },
  { id: 'QP-003', name: 'Tensile Strength', product: 'Welding Rod 3.2mm', target: '450 MPa', tolerance: 'Min 420 MPa', method: 'Tensile Tester' },
  { id: 'QP-004', name: 'Operating Voltage', product: 'Control Panel V2', target: '24V DC', tolerance: '±0.5V', method: 'Multimeter' },
  { id: 'QP-005', name: 'Leak Test Pressure', product: 'Hydraulic Pump', target: '150 Bar', tolerance: 'No Leak @ 5 min', method: 'Pressure Rig' },
];

export default function QualityParameters() {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setParams(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setParams(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
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
            placeholder="Search Quality Parameters..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Parameter
        </button>
      </div>

      <MasterDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="quality" 
      />

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Parameter Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Product / SKU</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Target Value</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Tolerance</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Method</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {params.map(p => (
              <tr key={p.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{p.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{p.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{p.product}</td>
                <td className="p-4 text-sm text-zinc-400">{p.target}</td>
                <td className="p-4 text-sm text-zinc-400">{p.tolerance}</td>
                <td className="p-4 text-sm text-zinc-400">{p.method}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(p)}
                    onDelete={() => handleDelete(p.id)}
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
