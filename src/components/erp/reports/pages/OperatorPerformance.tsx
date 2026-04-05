import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts';
import { Users, Download, Filter, TrendingUp, User } from 'lucide-react';

const OPERATOR_DATA = [
  { name: 'Robert Fox', efficiency: 98, quality: 99, color: '#f97316' },
  { name: 'Esther Howard', efficiency: 92, quality: 98, color: '#fb923c' },
  { name: 'Jenny Wilson', efficiency: 85, quality: 97, color: '#fdba74' },
  { name: 'Guy Hawkins', efficiency: 78, quality: 95, color: '#fed7aa' },
  { name: 'Cody Fisher', efficiency: 95, quality: 99, color: '#ffedd5' },
];

export default function OperatorPerformance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <Users className="text-orange-500" size={20} /> Operator Performance Reports
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Efficiency vs Quality (%)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OPERATOR_DATA} margin={{ left: 40 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }} 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="efficiency" fill="#f97316" radius={[4, 4, 0, 0]} name="Efficiency" />
                <Bar dataKey="quality" fill="#27272a" radius={[4, 4, 0, 0]} name="Quality" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Top Performer Insights</h3>
          <div className="space-y-4">
            {OPERATOR_DATA.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                    <User className="text-zinc-500" size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-zinc-200">{item.name}</span>
                    <p className="text-[10px] text-zinc-500">Efficiency: {item.efficiency}% | Quality: {item.quality}%</p>
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
                <TrendingUp size={16} />
                <span className="text-sm font-bold">Performance Trend</span>
              </div>
              <p className="text-xs text-zinc-400">
                Overall operator efficiency has increased by 3.5% this month following the new training program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
