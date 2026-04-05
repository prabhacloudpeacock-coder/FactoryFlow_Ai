import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Settings, TrendingUp, AlertTriangle, Download, Filter } from 'lucide-react';

const UTILIZATION_DATA = [
  { name: 'CNC Mill #4', value: 92, color: '#f97316' },
  { name: 'Casting Machine #1', value: 75, color: '#fb923c' },
  { name: 'Welding Robot #2', value: 88, color: '#fdba74' },
  { name: 'Assembly Line #1', value: 82, color: '#fed7aa' },
  { name: 'Press Machine #3', value: 65, color: '#ffedd5' },
];

export default function MachineUtilization() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <Settings className="text-orange-500" size={20} /> Machine Utilization Reports
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Utilization by Machine (%)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UTILIZATION_DATA} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  width={140}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {UTILIZATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Utilization Summary</h3>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">Peak Utilization</span>
              </div>
              <p className="text-xs text-zinc-400">
                CNC Mill #4 reached 98% utilization during the morning shift today.
              </p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <AlertTriangle size={16} />
                <span className="text-sm font-bold">Low Utilization Alert</span>
              </div>
              <p className="text-xs text-zinc-400">
                Press Machine #3 is below 70% utilization due to manual loading delays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
