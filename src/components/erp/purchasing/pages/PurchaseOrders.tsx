import { useState } from 'react';
import { Search, Filter, Plus, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const PURCHASE_ORDERS = [
  {
    id: 'PO-2026-1042',
    supplier: 'VoltTech Batteries Ltd.',
    items: '500x 48V 15Ah Lithium-ion Battery',
    date: '2026-04-01',
    expectedDelivery: '2026-04-15',
    total: 125000,
    status: 'In Transit',
  },
  {
    id: 'PO-2026-1043',
    supplier: 'ElectroDrive Motors',
    items: '200x 750W Hub Motor',
    date: '2026-04-02',
    expectedDelivery: '2026-04-10',
    total: 45000,
    status: 'Received',
  },
  {
    id: 'PO-2026-1044',
    supplier: 'AeroFrame Metals',
    items: '1000x Aluminum Alloy Frame Type-S',
    date: '2026-04-03',
    expectedDelivery: '2026-04-20',
    total: 85000,
    status: 'Pending Approval',
  },
  {
    id: 'PO-2026-1045',
    supplier: 'BrakeMaster Systems',
    items: '800x Hydraulic Disc Brake Set',
    date: '2026-04-04',
    expectedDelivery: '2026-04-18',
    total: 32000,
    status: 'Sent',
  }
];

export default function PurchaseOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPOs = PURCHASE_ORDERS.filter(po => 
    po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <FileText className="text-orange-500" size={20} /> Purchase Orders
          </h2>
          <p className="text-sm text-zinc-500">Manage raw material procurement for EV production.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search PO number, supplier, or items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
            <Filter size={18} />
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
            <Plus size={16} /> Create PO
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-800">
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">PO Number</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Supplier</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Items</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Expected</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Total</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredPOs.map((po) => (
              <tr key={po.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors cursor-pointer">
                <td className="p-4 font-mono text-zinc-300 font-medium">{po.id}</td>
                <td className="p-4 text-zinc-300 font-medium">{po.supplier}</td>
                <td className="p-4 text-zinc-400 truncate max-w-[200px]">{po.items}</td>
                <td className="p-4 text-zinc-400">{po.expectedDelivery}</td>
                <td className="p-4 font-bold text-zinc-100">${po.total.toLocaleString()}</td>
                <td className="p-4">
                  <div className={clsx(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    po.status === 'Received' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    po.status === 'In Transit' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    po.status === 'Pending Approval' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                  )}>
                    {po.status === 'Received' && <CheckCircle2 size={12} />}
                    {po.status === 'In Transit' && <Clock size={12} />}
                    {po.status === 'Pending Approval' && <AlertCircle size={12} />}
                    {po.status === 'Sent' && <Clock size={12} />}
                    {po.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPOs.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            No purchase orders found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
