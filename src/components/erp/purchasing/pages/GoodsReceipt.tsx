import { useState } from 'react';
import { Search, Filter, PackageCheck, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { clsx } from 'clsx';

const RECEIPTS = [
  {
    id: 'GRN-2026-089',
    poNumber: 'PO-2026-1043',
    supplier: 'ElectroDrive Motors',
    items: '200x 750W Hub Motor',
    receivedDate: '2026-04-05',
    inspector: 'John Smith',
    status: 'Pending Inspection',
  },
  {
    id: 'GRN-2026-088',
    poNumber: 'PO-2026-1040',
    supplier: 'Global Rubber Co.',
    items: '1000x All-Terrain Tires',
    receivedDate: '2026-04-04',
    inspector: 'Sarah Connor',
    status: 'Approved',
  },
  {
    id: 'GRN-2026-087',
    poNumber: 'PO-2026-1039',
    supplier: 'AeroFrame Metals',
    items: '50x Aluminum Alloy Frame Type-S',
    receivedDate: '2026-04-03',
    inspector: 'Mike Johnson',
    status: 'Rejected',
    notes: 'Frames scratched during transit.',
  }
];

export default function GoodsReceipt() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReceipts = RECEIPTS.filter(r => 
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <PackageCheck className="text-orange-500" size={20} /> Goods Receipt Notes (GRN)
          </h2>
          <p className="text-sm text-zinc-500">Track incoming raw materials and quality inspections.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search GRN, PO..." 
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
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">GRN Number</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">PO Ref</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Supplier & Items</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Received</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Inspector</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredReceipts.map((receipt) => (
              <tr key={receipt.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors cursor-pointer">
                <td className="p-4 font-mono text-zinc-300 font-medium">{receipt.id}</td>
                <td className="p-4 text-orange-500 font-medium">{receipt.poNumber}</td>
                <td className="p-4">
                  <div className="font-medium text-zinc-200">{receipt.supplier}</div>
                  <div className="text-xs text-zinc-500 mt-1">{receipt.items}</div>
                  {receipt.notes && (
                    <div className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertTriangle size={10} /> {receipt.notes}
                    </div>
                  )}
                </td>
                <td className="p-4 text-zinc-400">{receipt.receivedDate}</td>
                <td className="p-4 text-zinc-300">{receipt.inspector}</td>
                <td className="p-4">
                  <div className={clsx(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    receipt.status === 'Approved' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    receipt.status === 'Rejected' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  )}>
                    {receipt.status === 'Approved' && <CheckCircle2 size={12} />}
                    {receipt.status === 'Rejected' && <AlertTriangle size={12} />}
                    {receipt.status === 'Pending Inspection' && <Clock size={12} />}
                    {receipt.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReceipts.length === 0 && (
          <div className="p-8 text-center text-zinc-500">
            No goods receipts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
