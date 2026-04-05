import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Download, Filter, Calendar, Clock } from 'lucide-react';

const HOURLY_DATA = [
  { time: '08:00', actual: 45, target: 50 },
  { time: '09:00', actual: 52, target: 50 },
  { time: '10:00', actual: 48, target: 50 },
  { time: '11:00', actual: 55, target: 50 },
  { time: '12:00', actual: 30, target: 50 }, // Lunch break
  { time: '13:00', actual: 51, target: 50 },
  { time: '14:00', actual: 49, target: 50 },
  { time: '15:00', actual: 53, target: 50 },
];

export default function ProductionReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Calendar className="text-orange-500" size={20} /> Production Performance
          </h2>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5">
            <Clock size={14} className="text-zinc-500" />
            <span className="text-xs text-zinc-300">Today, March 30, 2026</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total EV Bikes Produced</p>
          <h3 className="text-2xl font-bold text-zinc-100">383 <span className="text-sm font-normal text-zinc-500">Units</span></h3>
          <p className="text-[10px] text-green-500 mt-1">+4.2% vs Yesterday</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Target Achievement</p>
          <h3 className="text-2xl font-bold text-zinc-100">95.8%</h3>
          <p className="text-[10px] text-red-500 mt-1">-1.2% vs Target</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Avg. Cycle Time</p>
          <h3 className="text-2xl font-bold text-zinc-100">72 <span className="text-sm font-normal text-zinc-500">Sec</span></h3>
          <p className="text-[10px] text-green-500 mt-1">-2s Improvement</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Scrap Rate</p>
          <h3 className="text-2xl font-bold text-zinc-100">1.2%</h3>
          <p className="text-[10px] text-green-500 mt-1">Within Limit</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Hourly Production Output</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HOURLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#f4f4f5' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="actual" fill="#f97316" radius={[4, 4, 0, 0]} name="Actual Output" />
              <Bar dataKey="target" fill="#27272a" radius={[4, 4, 0, 0]} name="Target Output" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
