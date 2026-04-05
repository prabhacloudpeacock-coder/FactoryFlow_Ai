import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { sync } from '../../../../lib/sync';
import { Loader2 } from 'lucide-react';

interface WorkOrder {
  id: string;
  product: string;
  status: string;
  startDate: string;
  endDate: string;
  duration: number; // in days
}

export default function GanttChart() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Mocking data for Gantt since API might not have dates
        const mockData: WorkOrder[] = [
          { id: 'WO-EV-001', product: 'EV Bike Model S', status: 'In Progress', startDate: '2026-04-01', endDate: '2026-04-10', duration: 9 },
          { id: 'WO-EV-002', product: 'EV Bike Model X', status: 'Scheduled', startDate: '2026-04-05', endDate: '2026-04-15', duration: 10 },
          { id: 'WO-EV-003', product: 'EV Bike Model S', status: 'Completed', startDate: '2026-03-15', endDate: '2026-03-25', duration: 10 },
        ];
        setOrders(mockData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  const data = orders.map(o => ({
    ...o,
    startDay: new Date(o.startDate).getDate(),
    duration: o.duration
  }));

  return (
    <div className="h-[500px] w-full bg-zinc-950 p-6 rounded-xl border border-zinc-800">
      <h2 className="text-xl font-semibold mb-6 text-zinc-100">Work Order Timeline</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis type="number" dataKey="startDay" domain={[1, 30]} stroke="#71717a" />
          <YAxis type="category" dataKey="id" stroke="#71717a" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#e4e4e7' }}
            cursor={{ fill: '#27272a' }}
          />
          <Bar dataKey="duration" fill="#f97316" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
