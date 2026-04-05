import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Activity, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const OEE_DATA = [
  { name: 'Availability', value: 92, color: '#f97316' },
  { name: 'Performance', value: 88, color: '#fb923c' },
  { name: 'Quality', value: 99, color: '#fdba74' },
];

const MACHINE_OEE = [
  { machine: 'CNC Mill #4', oee: 84.5, status: 'Healthy' },
  { machine: 'Casting Machine #1', oee: 72.1, status: 'Warning' },
  { machine: 'Welding Robot #2', oee: 89.8, status: 'Healthy' },
  { machine: 'Assembly Line #1', oee: 78.4, status: 'Healthy' },
];

export default function OEEDashboard() {
  const overallOEE = 80.1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-100">Overall Equipment Effectiveness</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-orange-500">{overallOEE}%</span>
              <span className="text-zinc-500 text-sm">Target: 85%</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              Your factory's OEE is currently 4.9% below target. Main losses identified in Availability due to unplanned downtime.
            </p>
          </div>
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: overallOEE }, { value: 100 - overallOEE }]}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill="#f97316" />
                  <Cell fill="#27272a" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">OEE Components</h3>
          {OEE_DATA.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">{item.name}</span>
                <span className="font-bold text-zinc-100">{item.value}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MACHINE_OEE.map((m) => (
          <div key={m.machine} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-zinc-400">{m.machine}</h4>
              {m.status === 'Healthy' ? (
                <CheckCircle2 size={14} className="text-green-500" />
              ) : (
                <AlertTriangle size={14} className="text-yellow-500" />
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-zinc-100">{m.oee}%</span>
              <span className="text-[10px] text-zinc-500">OEE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
