import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Activity, TrendingUp, TrendingDown, User, Clock } from 'lucide-react';

const PRODUCTIVITY_DATA = [
  { name: 'Robert Fox', value: 98, color: '#f97316' },
  { name: 'Esther Howard', value: 92, color: '#fb923c' },
  { name: 'Jenny Wilson', value: 85, color: '#fdba74' },
  { name: 'Guy Hawkins', value: 78, color: '#fed7aa' },
  { name: 'Cody Fisher', value: 95, color: '#ffedd5' },
];

export default function ProductivityTracking() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <TrendingUp className="text-orange-500" /> Top Performer Productivity (%)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCTIVITY_DATA} layout="vertical" margin={{ left: 40 }}>
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
                  {PRODUCTIVITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Activity className="text-orange-500" /> Performance Insights
          </h2>
          <div className="space-y-4">
            {PRODUCTIVITY_DATA.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                    <User className="text-zinc-500" size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-zinc-200">{item.name}</span>
                    <p className="text-[10px] text-zinc-500">Efficiency: {item.value}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-500 text-xs font-bold">
                    <TrendingUp size={12} />
                    +2.4%
                  </div>
                  <p className="text-[10px] text-zinc-600">vs Last Week</p>
                </div>
              </div>
            ))}
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <Clock size={16} />
                <span className="text-sm font-bold">Shift Efficiency</span>
              </div>
              <p className="text-xs text-zinc-400">
                Morning shift is currently operating at 94.2% efficiency, exceeding target by 4.2%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
