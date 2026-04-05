import { History, ChevronRight, GitBranch, User, Clock } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_VERSIONS = [
  {
    id: 'V-101',
    product: 'Industrial Pump V2',
    version: '1.2.0',
    date: '2026-03-25 14:30',
    user: 'John Doe',
    change: 'Updated Impeller Assembly sub-components',
    status: 'Active'
  },
  {
    id: 'V-102',
    product: 'Industrial Pump V2',
    version: '1.1.5',
    date: '2026-03-10 09:15',
    user: 'Jane Smith',
    change: 'Initial release for production line 4',
    status: 'Archived'
  },
  {
    id: 'V-201',
    product: 'Conveyor Belt System',
    version: '2.0.1',
    date: '2026-03-28 16:45',
    user: 'Mike Wilson',
    change: 'Added Drive Motor specifications',
    status: 'Draft'
  }
];

export default function VersionControl() {
  const [versions, setVersions] = useState(INITIAL_VERSIONS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setVersions(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setVersions(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <History className="text-orange-500" /> BOM Version History
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm">
            Export History
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm">
            Compare Versions
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Product</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Version</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Change Description</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Modified By</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {versions.map(v => (
              <tr key={v.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 text-sm text-zinc-400">{v.product}</td>
                <td className="p-4 text-sm text-zinc-400">{v.version}</td>
                <td className="p-4 text-sm text-zinc-400">{v.date}</td>
                <td className="p-4 text-sm text-zinc-400">{v.user}</td>
                <td className="p-4 text-sm text-zinc-400">{v.change}</td>
                <td className="p-4 text-sm text-zinc-400">{v.status}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(v)}
                    onDelete={() => handleDelete(v.id)}
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
