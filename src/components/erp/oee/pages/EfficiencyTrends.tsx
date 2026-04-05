import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const TREND_DATA = [
  { day: 'Mon', CNC: 82, Casting: 70, Welding: 88, Assembly: 75 },
  { day: 'Tue', CNC: 85, Casting: 72, Welding: 90, Assembly: 78 },
  { day: 'Wed', CNC: 78, Casting: 65, Welding: 85, Assembly: 72 },
  { day: 'Thu', CNC: 88, Casting: 75, Welding: 92, Assembly: 82 },
  { day: 'Fri', CNC: 90, Casting: 78, Welding: 95, Assembly: 85 },
  { day: 'Sat', CNC: 84, Casting: 72, Welding: 89, Assembly: 78 },
  { day: 'Sun', CNC: 80, Casting: 68, Welding: 86, Assembly: 75 },
];

export default function EfficiencyTrends() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <TrendingUp className="text-orange-500" /> Machine Efficiency Trends (OEE %)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="day" 
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
                <Line type="monotone" dataKey="CNC" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Casting" stroke="#fb923c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Welding" stroke="#fdba74" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Assembly" stroke="#fed7aa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Activity className="text-orange-500" /> Weekly Insights
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">Best Performer</span>
              </div>
              <p className="text-xs text-zinc-400">
                Welding Robot #2 maintained a 91.2% average OEE this week, exceeding target by 6.2%.
              </p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <TrendingDown size={16} />
                <span className="text-sm font-bold">Needs Attention</span>
              </div>
              <p className="text-xs text-zinc-400">
                Casting Machine #1 average OEE dropped to 71.5% due to increased setup times on Wednesday.
              </p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <Clock size={16} />
                <span className="text-sm font-bold">Downtime Trend</span>
              </div>
              <p className="text-xs text-zinc-400">
                Unplanned downtime is concentrated in the morning shifts (08:00 - 10:00).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
