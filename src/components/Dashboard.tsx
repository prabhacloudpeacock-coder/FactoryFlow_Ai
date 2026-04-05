import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Thermometer,
  Gauge,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { UserProfile, Machine } from '../types';
import { clsx } from 'clsx';

const data = [
  { name: '08:00', value: 400 },
  { name: '10:00', value: 300 },
  { name: '12:00', value: 600 },
  { name: '14:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '18:00', value: 900 },
  { name: '20:00', value: 700 },
];

const productionData = [
  { name: 'CNC-01', efficiency: 85 },
  { name: 'INJ-02', efficiency: 92 },
  { name: 'LAS-03', efficiency: 78 },
  { name: 'CNC-04', efficiency: 88 },
  { name: 'INJ-05', efficiency: 95 },
];

export default function Dashboard({ profile }: { profile: UserProfile | null }) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('/api/hardware/status');
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Error fetching machine status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Active Work Orders', value: '18', trend: '+2', icon: Clock, color: 'text-blue-500' },
    { label: 'Machine Efficiency', value: '88.4%', trend: '-1.2%', icon: Activity, color: 'text-orange-500' },
    { label: 'QA Pass Rate', value: '99.2%', trend: '+0.4%', icon: CheckCircle2, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Factory Overview</h1>
          <p className="text-zinc-500 mt-1">Real-time operational intelligence and system status.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm font-mono text-zinc-400">SYSTEM ONLINE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:shadow-xl hover:shadow-orange-500/5 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-zinc-800 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend}
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-zinc-100 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-zinc-100">Production Output (Units/h)</h3>
              <select className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#f97316' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-8">Machine Efficiency Index</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    cursor={{ fill: '#27272a' }}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  />
                  <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                    {productionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.efficiency > 90 ? '#10b981' : '#f97316'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-100">Live IoT Feed</h3>
              <Activity size={18} className="text-orange-500 animate-pulse" />
            </div>
            <div className="space-y-4">
              {machines.map((machine) => (
                <motion.div 
                  key={machine.id} 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:shadow-lg hover:shadow-orange-500/5 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-100">{machine.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase">{machine.id}</p>
                    </div>
                    <div className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      machine.status === 'running' ? "bg-emerald-500/10 text-emerald-500" :
                      machine.status === 'idle' ? "bg-zinc-500/10 text-zinc-500" :
                      machine.status === 'error' ? "bg-red-500/10 text-red-500" :
                      "bg-orange-500/10 text-orange-500"
                    )}>
                      {machine.status}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Thermometer size={14} className="text-zinc-500" />
                      <span className="text-xs text-zinc-300 font-mono">{machine.telemetry.temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge size={14} className="text-zinc-500" />
                      <span className="text-xs text-zinc-300 font-mono">{machine.telemetry.pressure.toFixed(0)} PSI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-zinc-500" />
                      <span className="text-xs text-zinc-300 font-mono">{machine.telemetry.voltage.toFixed(0)}V</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu size={14} className="text-zinc-500" />
                      <span className="text-xs text-zinc-300 font-mono">{machine.telemetry.speed.toFixed(0)} RPM</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-6">Recent Alerts</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-bold text-red-500">Critical: CNC-01 Overheat</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Temperature exceeded 55°C threshold.</p>
                  <p className="text-[10px] text-zinc-600 mt-2 font-mono">12:45 PM • SYSTEM</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                <Clock className="text-orange-500 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-bold text-orange-500">Maintenance Due: LAS-03</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Scheduled maintenance window in 2 hours.</p>
                  <p className="text-[10px] text-zinc-600 mt-2 font-mono">11:30 AM • SCHEDULER</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
