import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { AlertCircle, Clock, Activity, Settings } from 'lucide-react';

const LOSS_DATA = [
  { name: 'Unplanned Breakdown', value: 340, color: '#ef4444' },
  { name: 'Setup & Adjustments', value: 210, color: '#f97316' },
  { name: 'Minor Stops', value: 85, color: '#fb923c' },
  { name: 'Reduced Speed', value: 120, color: '#fdba74' },
  { name: 'Process Defects', value: 45, color: '#fed7aa' },
  { name: 'Startup Loss', value: 30, color: '#ffedd5' },
];

export default function LossAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-500" /> Top Loss Categories (Minutes)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LOSS_DATA} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide />
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
                  {LOSS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Activity className="text-orange-500" /> Loss Impact Summary
          </h2>
          <div className="space-y-4">
            {LOSS_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-zinc-300">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-zinc-100">{item.value} min</span>
                  <p className="text-[10px] text-zinc-500">
                    {((item.value / 830) * 100).toFixed(1)}% of total loss
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
