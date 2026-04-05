import { useState } from 'react';
import { Package, Plus, Search, ChevronRight, BarChart3, Tag } from 'lucide-react';
import MasterDataModal from '../components/MasterDataModal';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_PRODUCTS = [
  { id: 'SKU-001', name: 'Aluminium Gear Box', category: 'Casting', price: '$45.00', stock: 1200, status: 'Active' },
  { id: 'SKU-002', name: 'Steel Shaft 20mm', category: 'Machining', price: '$12.50', stock: 5000, status: 'Active' },
  { id: 'SKU-003', name: 'Control Panel V2', category: 'Electronics', price: '$120.00', stock: 150, status: 'Active' },
  { id: 'SKU-004', name: 'Hydraulic Pump', category: 'Assembly', price: '$85.00', stock: 450, status: 'Active' },
  { id: 'SKU-005', name: 'Welding Rod 3.2mm', category: 'Consumables', price: '$2.50', stock: 10000, status: 'Active' },
];

export default function ProductsSKUs() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setProducts(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
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
            placeholder="Search Products / SKUs..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add Product / SKU
        </button>
      </div>

      <MasterDataModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="products" 
      />

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Product Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Price</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Stock</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{p.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{p.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{p.category}</td>
                <td className="p-4 text-sm text-zinc-400">{p.price}</td>
                <td className="p-4 text-sm text-zinc-400">{p.stock}</td>
                <td className="p-4 text-sm text-zinc-400">{p.status}</td>
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
