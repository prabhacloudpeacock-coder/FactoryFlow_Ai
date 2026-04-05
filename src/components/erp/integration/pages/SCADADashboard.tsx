import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Cpu, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  RefreshCw,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  Power,
  Circle,
  Waves,
  Settings
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';

// --- Mock Data Generation ---

const generateInitialData = () => {
  const data = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      voltage: 220 + Math.random() * 10 - 5,
      current: 15 + Math.random() * 4 - 2,
      temperature: 45 + Math.random() * 6 - 3,
    });
  }
  return data;
};

const initialEquipment = [
  { id: 'PLC-01', name: 'Main Assembly Line', status: 'running', ip: '192.168.1.10', protocol: 'Profinet', load: 78 },
  { id: 'PLC-02', name: 'Packaging Unit', status: 'warning', ip: '192.168.1.11', protocol: 'Modbus TCP', load: 92 },
  { id: 'PLC-03', name: 'Testing Bench', status: 'running', ip: '192.168.1.12', protocol: 'EtherNet/IP', load: 45 },
  { id: 'PLC-04', name: 'Raw Material Feed', status: 'down', ip: '192.168.1.13', protocol: 'OPC-UA', load: 0 },
];

export default function SCADADashboard() {
  const [telemetryData, setTelemetryData] = useState(generateInitialData());
  const [equipment, setEquipment] = useState(initialEquipment);
  const [selectedEquipment, setSelectedEquipment] = useState(initialEquipment[0]);
  const [isLive, setIsLive] = useState(true);
  const [pumpStatus, setPumpStatus] = useState(true);
  const [valveStatus, setValveStatus] = useState(false);

  // Live Data Simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const now = new Date();
      
      // Influence telemetry based on pump/valve status
      const baseCurrent = pumpStatus ? 18 : 1.5;
      const baseTemp = pumpStatus ? 52 : 38;
      const valveInfluence = valveStatus ? 2 : 0;

      const newEntry = {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        voltage: 220 + Math.random() * 6 - 3,
        current: baseCurrent + valveInfluence + Math.random() * 2 - 1,
        temperature: baseTemp + Math.random() * 4 - 2,
      };

      setTelemetryData(prev => [...prev.slice(1), newEntry]);
      
      // Randomly update equipment load
      setEquipment(prev => prev.map(e => {
        if (e.status === 'down') return e;
        const loadChange = Math.random() * 4 - 2;
        return { ...e, load: Math.min(100, Math.max(0, e.load + loadChange)) };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const latest = telemetryData[telemetryData.length - 1];
  const previous = telemetryData[telemetryData.length - 2];

  const getTrend = (current: number, prev: number) => {
    if (current > prev) return 'up';
    if (current < prev) return 'down';
    return 'stable';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="text-orange-500" /> Live SCADA Dashboard
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Real-time telemetry and equipment status from PLC nodes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500",
            isLive ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-zinc-800 border-zinc-700 text-zinc-500"
          )}>
            <div className={cn("w-2 h-2 rounded-full", isLive ? "bg-green-500 animate-pulse" : "bg-zinc-600")} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{isLive ? 'Live Stream' : 'Paused'}</span>
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-all"
          >
            <RefreshCw size={18} className={cn(isLive && "animate-spin-slow")} />
          </button>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TelemetryMetric 
          label="Line Voltage" 
          value={`${latest.voltage.toFixed(1)}V`} 
          trend={getTrend(latest.voltage, previous.voltage)}
          icon={Zap} 
          color="text-yellow-500" 
          subtext="Nominal: 220V"
        />
        <TelemetryMetric 
          label="Current Draw" 
          value={`${latest.current.toFixed(2)}A`} 
          trend={getTrend(latest.current, previous.current)}
          icon={Activity} 
          color="text-blue-500" 
          subtext="Peak: 25A"
        />
        <TelemetryMetric 
          label="Core Temperature" 
          value={`${latest.temperature.toFixed(1)}°C`} 
          trend={getTrend(latest.temperature, previous.temperature)}
          icon={Thermometer} 
          color="text-orange-500" 
          subtext="Threshold: 85°C"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Status List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Cpu size={16} /> Equipment Nodes
          </h3>
          <div className="space-y-3">
            {equipment.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedEquipment(item)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all group relative overflow-hidden",
                  selectedEquipment.id === item.id 
                    ? "bg-orange-500/10 border-orange-500/30 ring-1 ring-orange-500/20" 
                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-zinc-100 group-hover:text-orange-400 transition-colors">{item.name}</h4>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{item.id} • {item.ip}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                    <span>Processor Load</span>
                    <span className={cn(item.load > 85 ? "text-rose-500" : "text-zinc-300")}>{item.load.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                    <motion.div 
                      className={cn("h-full rounded-full", item.load > 85 ? "bg-rose-500" : "bg-orange-500")}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.load}%` }}
                    />
                  </div>
                </div>

                {selectedEquipment.id === item.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Manual Overrides */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Settings size={16} /> Process Controls
            </h3>
            
            <div className="space-y-4">
              {/* Pump Control */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-xl border transition-colors",
                    pumpStatus ? "bg-orange-500/10 border-orange-500/20 text-orange-500" : "bg-zinc-900 border-zinc-800 text-zinc-600"
                  )}>
                    <Power size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">Main Pump</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">P-101 • {pumpStatus ? 'Running' : 'Stopped'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPumpStatus(!pumpStatus)}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-300",
                    pumpStatus ? "bg-orange-500" : "bg-zinc-800"
                  )}
                >
                  <motion.div 
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                    animate={{ x: pumpStatus ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Valve Control */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-xl border transition-colors",
                    valveStatus ? "bg-blue-500/10 border-blue-500/20 text-blue-500" : "bg-zinc-900 border-zinc-800 text-zinc-600"
                  )}>
                    <Waves size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">Discharge Valve</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">V-202 • {valveStatus ? 'Open' : 'Closed'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setValveStatus(!valveStatus)}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-300",
                    valveStatus ? "bg-blue-500" : "bg-zinc-800"
                  )}
                >
                  <motion.div 
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                    animate={{ x: valveStatus ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
              <div className="flex gap-2 text-orange-500 mb-1">
                <AlertTriangle size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Safety Interlock</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Manual overrides bypass automated PLC logic. Ensure discharge path is clear before opening V-202.
              </p>
            </div>
          </div>
        </div>

        {/* Telemetry Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Telemetry Trends: {selectedEquipment.name}</h3>
                <p className="text-xs text-zinc-500">Historical data stream from {selectedEquipment.protocol} gateway.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-700 transition-all">Export CSV</button>
                <button className="px-3 py-1.5 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-orange-500/20 transition-all">Report</button>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#71717a' }} 
                    interval={4}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#71717a' }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="voltage" 
                    name="Voltage (V)"
                    stroke="#eab308" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorVoltage)" 
                    animationDuration={500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="current" 
                    name="Current (A)"
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCurrent)" 
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Thermometer size={16} /> Thermal Analysis
            </h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="stepAfter" 
                    dataKey="temperature" 
                    name="Temp (°C)"
                    stroke="#f97316" 
                    strokeWidth={2} 
                    dot={false}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelemetryMetric({ label, value, trend, icon: Icon, color, subtext }: any) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 transition-colors group-hover:border-orange-500/30", color)}>
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border",
          trend === 'up' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : 
          trend === 'down' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
          "bg-zinc-800 text-zinc-500 border-zinc-700"
        )}>
          {trend === 'up' && <ArrowUpRight size={12} />}
          {trend === 'down' && <ArrowDownRight size={12} />}
          {trend === 'stable' ? 'STABLE' : trend.toUpperCase()}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-zinc-100 font-mono tracking-tight">{value}</span>
        </div>
        <p className="text-[10px] text-zinc-500 mt-2 font-medium">{subtext}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs = {
    running: { label: 'Running', color: 'text-green-500 bg-green-500/10 border-green-500/20' },
    warning: { label: 'Warning', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    down: { label: 'Down', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
  };

  const config = configs[status as keyof typeof configs];

  return (
    <span className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border", config.color)}>
      {config.label}
    </span>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl shadow-2xl">
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-zinc-300 text-xs">{entry.name}</span>
              </div>
              <span className="text-zinc-100 font-mono text-xs font-bold">{entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
