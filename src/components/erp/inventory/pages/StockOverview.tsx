import { Search, Package, ArrowDown, ArrowUp, Filter, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_STOCK = [
  { id: 'RM-001', name: 'Steel Sheet 2mm', category: 'Raw Material', qty: 450, unit: 'm²', minQty: 100, status: 'Healthy' },
  { id: 'RM-002', name: 'Hydraulic Fluid', category: 'Raw Material', qty: 85, unit: 'L', minQty: 100, status: 'Low Stock' },
  { id: 'WIP-101', name: 'Pump Housing (Semi)', category: 'WIP', qty: 45, unit: 'pcs', minQty: 0, status: 'In Production' },
  { id: 'FG-501', name: 'Industrial Pump V2', category: 'Finished Good', qty: 120, unit: 'pcs', minQty: 20, status: 'Healthy' },
  { id: 'FG-502', name: 'Conveyor System', category: 'Finished Good', qty: 8, unit: 'pcs', minQty: 5, status: 'Healthy' },
];

export default function StockOverview() {
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setStock(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setStock(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Inventory..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <ArrowDown size={16} /> Stock In
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Raw Materials</p>
          <h3 className="text-2xl font-bold text-zinc-100">1,240 <span className="text-sm font-normal text-zinc-500">Items</span></h3>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Work In Progress</p>
          <h3 className="text-2xl font-bold text-zinc-100">342 <span className="text-sm font-normal text-zinc-500">Units</span></h3>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Finished Goods</p>
          <h3 className="text-2xl font-bold text-zinc-100">128 <span className="text-sm font-normal text-zinc-500">Units</span></h3>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Item Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Quantity</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {stock.map(item => (
              <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{item.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{item.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{item.category}</td>
                <td className="p-4 text-sm text-zinc-400">{item.qty}</td>
                <td className="p-4 text-sm text-zinc-400">{item.unit}</td>
                <td className="p-4 text-sm text-zinc-400">{item.minQty}</td>
                <td className="p-4 text-sm text-zinc-400">{item.status}</td>
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
