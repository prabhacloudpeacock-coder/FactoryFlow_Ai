import { useState } from 'react';
import { Search, Filter, Package, ChevronRight, CheckCircle2, Clock, Truck } from 'lucide-react';
import { clsx } from 'clsx';

const ORDERS = [
  {
    id: 'ORD-2026-001',
    date: '2026-04-01',
    customer: 'TechRides Inc.',
    total: 12495,
    items: 5,
    status: 'Delivered',
  },
  {
    id: 'ORD-2026-002',
    date: '2026-04-03',
    customer: 'EcoCommute LLC',
    total: 6598,
    items: 2,
    status: 'In Transit',
  },
  {
    id: 'ORD-2026-003',
    date: '2026-04-04',
    customer: 'CityRentals',
    total: 14990,
    items: 10,
    status: 'Processing',
  },
  {
    id: 'ORD-2026-004',
    date: '2026-04-05',
    customer: 'Individual Buyer',
    total: 3299,
    items: 1,
    status: 'Pending',
  }
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Package className="text-orange-500" size={20} /> Order History
          </h2>
          <p className="text-sm text-zinc-500">Track your recent B2B and B2C orders.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-800">
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Order ID</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Date</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Customer</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Items</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Total</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors cursor-pointer group">
                <td className="p-4 font-mono text-zinc-300 font-medium">{order.id}</td>
                <td className="p-4 text-zinc-400">{order.date}</td>
                <td className="p-4 text-zinc-300">{order.customer}</td>
                <td className="p-4 text-zinc-400">{order.items} Units</td>
                <td className="p-4 font-bold text-zinc-100">${order.total.toLocaleString()}</td>
                <td className="p-4">
                  <div className={clsx(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    order.status === 'Delivered' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    order.status === 'In Transit' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    order.status === 'Processing' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                    "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                  )}>
                    {order.status === 'Delivered' && <CheckCircle2 size={12} />}
                    {order.status === 'In Transit' && <Truck size={12} />}
                    {order.status === 'Processing' && <Clock size={12} />}
                    {order.status === 'Pending' && <Clock size={12} />}
                    {order.status}
                  </div>
                </td>
                <td className="p-4 text-zinc-600 group-hover:text-orange-500 transition-colors text-right">
                  <ChevronRight size={18} className="inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            No orders found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
