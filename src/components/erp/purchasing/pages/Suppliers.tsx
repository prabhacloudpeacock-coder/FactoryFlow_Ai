import { useState } from 'react';
import { Search, Filter, Plus, Users, Star, MapPin, Mail, Edit2, X } from 'lucide-react';
import { clsx } from 'clsx';

const INITIAL_SUPPLIERS = [
  {
    id: 'SUP-001',
    name: 'VoltTech Batteries Ltd.',
    email: 'contact@volttech.com',
    category: 'Batteries & Energy',
    location: 'Shenzhen, China',
    leadTime: '14 Days',
    rating: 4.8,
    status: 'Active',
  },
  {
    id: 'SUP-002',
    name: 'ElectroDrive Motors',
    email: 'sales@electrodrive.de',
    category: 'Powertrain',
    location: 'Stuttgart, Germany',
    leadTime: '21 Days',
    rating: 4.9,
    status: 'Active',
  },
  {
    id: 'SUP-003',
    name: 'AeroFrame Metals',
    email: 'orders@aeroframe.tw',
    category: 'Chassis & Frames',
    location: 'Taichung, Taiwan',
    leadTime: '30 Days',
    rating: 4.5,
    status: 'Active',
  },
  {
    id: 'SUP-004',
    name: 'BrakeMaster Systems',
    email: 'info@brakemaster.it',
    category: 'Braking Systems',
    location: 'Milan, Italy',
    leadTime: '10 Days',
    rating: 4.7,
    status: 'Under Review',
  },
  {
    id: 'SUP-005',
    name: 'Global Rubber Co.',
    email: 'support@globalrubber.com',
    category: 'Tires',
    location: 'Akron, USA',
    leadTime: '7 Days',
    rating: 4.2,
    status: 'Inactive',
  }
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? editingSupplier : s));
    setEditingSupplier(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Users className="text-orange-500" size={20} /> Approved Suppliers
          </h2>
          <p className="text-sm text-zinc-500">Manage raw material vendors and supply chain partners.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search suppliers, categories, emails..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
            <Filter size={18} />
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
            <Plus size={16} /> Add Supplier
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-800">
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Supplier</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Contact</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Location</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Lead Time</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Rating</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-zinc-100">{supplier.name}</div>
                  <div className="text-xs text-orange-500 mt-1">{supplier.category}</div>
                </td>
                <td className="p-4 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-zinc-500" />
                    <a href={`mailto:${supplier.email}`} className="hover:text-orange-500 transition-colors">{supplier.email}</a>
                  </div>
                </td>
                <td className="p-4 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-zinc-500" />
                    {supplier.location}
                  </div>
                </td>
                <td className="p-4 text-zinc-300 font-medium">{supplier.leadTime}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-zinc-300">{supplier.rating}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className={clsx(
                    "inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border",
                    supplier.status === 'Active' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    supplier.status === 'Under Review' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                  )}>
                    {supplier.status}
                  </div>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => setEditingSupplier(supplier)}
                    className="p-2 text-zinc-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredSuppliers.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            No suppliers found matching your search.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h3 className="text-xl font-bold text-zinc-100">Edit Supplier</h3>
              <button 
                onClick={() => setEditingSupplier(null)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Supplier Name</label>
                <input 
                  type="text" 
                  value={editingSupplier.name}
                  onChange={(e) => setEditingSupplier({...editingSupplier, name: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={editingSupplier.email}
                  onChange={(e) => setEditingSupplier({...editingSupplier, email: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Category</label>
                <input 
                  type="text" 
                  value={editingSupplier.category}
                  onChange={(e) => setEditingSupplier({...editingSupplier, category: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Location</label>
                <input 
                  type="text" 
                  value={editingSupplier.location}
                  onChange={(e) => setEditingSupplier({...editingSupplier, location: e.target.value})}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800">
                <button 
                  type="button"
                  onClick={() => setEditingSupplier(null)}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-600 text-zinc-950 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
