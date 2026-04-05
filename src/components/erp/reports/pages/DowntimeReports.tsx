import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts';
import { Clock, Download, Filter, AlertCircle } from 'lucide-react';

const DOWNTIME_REASONS = [
  { name: 'Mechanical Failure', value: 340, color: '#ef4444' },
  { name: 'Setup & Changeover', value: 210, color: '#f97316' },
  { name: 'Material Shortage', value: 120, color: '#fb923c' },
  { name: 'Operator Absence', value: 85, color: '#fdba74' },
  { name: 'Power Outage', value: 45, color: '#fed7aa' },
];

export default function DowntimeReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <Clock className="text-orange-500" size={20} /> Downtime & Loss Reports
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Downtime by Reason (Minutes)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DOWNTIME_REASONS} layout="vertical" margin={{ left: 40 }}>
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
                  {DOWNTIME_REASONS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Downtime Metrics Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Downtime</p>
                <h3 className="text-2xl font-bold text-zinc-100">800 <span className="text-sm font-normal text-zinc-500">Minutes</span></h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Impact on OEE</p>
                <h3 className="text-2xl font-bold text-red-500">-8.4%</h3>
              </div>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Mean Time To Repair (MTTR)</p>
                <h3 className="text-2xl font-bold text-zinc-100">42 <span className="text-sm font-normal text-zinc-500">Minutes</span></h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Mean Time Between Failures (MTBF)</p>
                <h3 className="text-2xl font-bold text-green-500">18.5 <span className="text-sm font-normal text-zinc-500">Hours</span></h3>
              </div>
            </div>
          </div>
          <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <AlertCircle size={16} />
              <span className="text-sm font-bold">Critical Loss Analysis</span>
            </div>
            <p className="text-xs text-zinc-400">
              Mechanical failures account for 42.5% of all downtime. Spindle motor issues on CNC Mill #4 are the primary cause.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
