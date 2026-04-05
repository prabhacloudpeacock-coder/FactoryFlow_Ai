import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { sync } from '../../../../lib/sync';
import { Loader2, RefreshCw, Eye } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import WorkOrderDetailModal from '../components/WorkOrderDetailModal';

interface WorkOrder {
  id: string;
  product: string;
  status: string;
  qty: number;
  supervisor?: string;
}

export default function WorkOrderList() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await sync.fetch('/api/mes/work-orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (order: WorkOrder) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  useEffect(() => {
    fetchOrders();

    // Subscribe to real-time updates
    const unsubscribe = sync.subscribe((event) => {
      if (event.type === 'WORK_ORDER_CREATED') {
        setOrders(prev => [event.data, ...prev]);
      }
    });

    return () => { unsubscribe(); };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Active Work Orders</h2>
        <button 
          onClick={fetchOrders}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
              <th className="p-4">ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Supervisor</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Qty</th>
              <th className="p-4 text-center">QR Code</th>
              <th className="p-4 text-center w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-zinc-500 italic">
                  No work orders found for this tenant.
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr 
                  key={o.id} 
                  onClick={() => handleRowClick(o)}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                >
                  <td className="p-4 font-mono text-orange-500 text-sm">{o.id}</td>
                  <td className="p-4 text-sm font-medium">{o.product}</td>
                  <td className="p-4 text-sm text-zinc-400">{o.supervisor || 'Unassigned'}</td>
                  <td className="p-4">
                    <span className={clsx(
                      "px-2 py-1 text-[10px] font-bold uppercase rounded-full border",
                      o.status === 'In Progress' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      o.status === 'Completed' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      o.status === 'Paused' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      "bg-zinc-800 text-zinc-300 border-zinc-700"
                    )}>
                      {o.status || 'Scheduled'}
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm font-mono">{o.qty}</td>
                  <td className="p-4 text-center">
                    <QRCodeSVG value={`/mes/work-orders/${o.id}`} size={40} className="mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 text-zinc-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )
            }
          </tbody>
        </table>
      </div>

      <WorkOrderDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        workOrder={selectedOrder} 
      />
    </div>
  );
}

