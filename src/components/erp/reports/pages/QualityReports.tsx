import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ShieldCheck, Download, Filter, AlertTriangle } from 'lucide-react';

const DEFECT_DATA = [
  { name: 'Battery Alignment', value: 45, color: '#f97316' },
  { name: 'Motor Noise', value: 25, color: '#fb923c' },
  { name: 'Frame Scratch', value: 15, color: '#fdba74' },
  { name: 'Wiring Issue', value: 10, color: '#fed7aa' },
  { name: 'Other', value: 5, color: '#ffedd5' },
];

export default function QualityReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="text-orange-500" size={20} /> Quality & Defect Reports
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
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Defect Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEFECT_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEFECT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Quality Metrics Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">First Pass Yield</p>
              <h3 className="text-2xl font-bold text-green-500">98.2%</h3>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Defect Rate</p>
              <h3 className="text-2xl font-bold text-red-500">1.8%</h3>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Rework Count</p>
              <h3 className="text-2xl font-bold text-zinc-100">45 <span className="text-sm font-normal text-zinc-500">Units</span></h3>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Scrap Value</p>
              <h3 className="text-2xl font-bold text-zinc-100">$1,240</h3>
            </div>
          </div>
          <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <AlertTriangle size={16} />
              <span className="text-sm font-bold">Quality Alert</span>
            </div>
            <p className="text-xs text-zinc-400">
              Battery alignment defects have increased by 15% this week. Investigation required on assembly station #2.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
