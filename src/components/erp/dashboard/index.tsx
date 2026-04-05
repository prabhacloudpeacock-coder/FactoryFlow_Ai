import React, { useState, useEffect } from 'react';
import { 
  Activity, Users, Package, TrendingUp, AlertTriangle, CheckCircle2, Clock,
  ArrowUpRight, ArrowDownRight, Zap, Cpu, BarChart3, ShieldCheck,
  Factory, Wrench, Settings, AlertCircle, PlayCircle, PauseCircle, StopCircle,
  Wifi, BrainCircuit, Thermometer, Waves, Database, ChevronDown, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Line, ComposedChart, Legend
} from 'recharts';

// --- SaaS Configuration & Feature Flags ---

const SAAS_TENANTS = {
  acme: {
    id: 'acme',
    name: 'Acme Corp',
    plan: 'Enterprise',
    theme: 'emerald',
    flags: {
      enableAI: true,
      enableSCADA: true,
      enableAdvancedCharts: true,
    }
  },
  globex: {
    id: 'globex',
    name: 'Globex Mfg',
    plan: 'Professional',
    theme: 'blue',
    flags: {
      enableAI: false,
      enableSCADA: true,
      enableAdvancedCharts: true,
    }
  },
  initech: {
    id: 'initech',
    name: 'Initech',
    plan: 'Starter',
    theme: 'violet',
    flags: {
      enableAI: false,
      enableSCADA: false,
      enableAdvancedCharts: false,
    }
  }
};

const THEME_CLASSES = {
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'bg-emerald-500/10',
    lightGlow: 'bg-emerald-500/5',
    hex: '#10b981'
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'bg-blue-500/10',
    lightGlow: 'bg-blue-500/5',
    hex: '#3b82f6'
  },
  violet: {
    bg: 'bg-violet-500',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    glow: 'bg-violet-500/10',
    lightGlow: 'bg-violet-500/5',
    hex: '#8b5cf6'
  }
};

// --- Mock Data ---

const productionTrend = [
  { time: '06:00', actual: 120, target: 150 },
  { time: '08:00', actual: 310, target: 300 },
  { time: '10:00', actual: 480, target: 450 },
  { time: '12:00', actual: 590, target: 600 },
  { time: '14:00', actual: 750, target: 750 },
  { time: '16:00', actual: 880, target: 900 },
  { time: '18:00', actual: 1050, target: 1050 },
];

const initialMachineStatus = [
  { id: 'CNC-01', name: '5-Axis CNC Mill', status: 'running', efficiency: 94.2, currentJob: 'WO-8492', protocol: 'OPC-UA', sensors: { temp: 42.5, vibration: 1.1 }, aiPrediction: { risk: 'low', timeToFailure: '> 30d' } },
  { id: 'ASM-02', name: 'Assembly Line B', status: 'warning', efficiency: 72.8, currentJob: 'WO-8493', protocol: 'Modbus TCP', sensors: { temp: 78.4, vibration: 3.8 }, aiPrediction: { risk: 'high', timeToFailure: '4h 12m' } },
  { id: 'PKG-01', name: 'Auto Packaging', status: 'down', efficiency: 0, currentJob: 'Maintenance', protocol: 'EtherNet/IP', sensors: { temp: 24.1, vibration: 0.0 }, aiPrediction: { risk: 'critical', timeToFailure: 'Failed' } },
  { id: 'MLD-04', name: 'Injection Molding', status: 'running', efficiency: 88.5, currentJob: 'WO-8488', protocol: 'OPC-UA', sensors: { temp: 185.2, vibration: 2.4 }, aiPrediction: { risk: 'medium', timeToFailure: '12d' } },
];

const activeWorkOrders = [
  { id: 'WO-8492', product: 'Titanium Valves (A4)', progress: 78, status: 'on-track', due: 'Today, 14:00' },
  { id: 'WO-8493', product: 'Ceramic Bearings', progress: 34, status: 'delayed', due: 'Today, 16:00' },
  { id: 'WO-8494', product: 'Housing Units v2', progress: 12, status: 'starting', due: 'Tomorrow, 09:00' },
];

const allAlerts = [
  { id: 1, type: 'ai-critical', message: 'AI Prediction: 92% probability of spindle bearing failure on ASM-02 within 4 hours.', time: 'Just now' },
  { id: 2, type: 'critical', message: 'PLC Disconnect: Lost heartbeat from PKG-01 SCADA node.', time: '10m ago' },
  { id: 3, type: 'warning', message: 'IoT Sensor Anomaly: Vibration spike detected on MLD-04.', time: '1h ago' },
];

// --- Components ---

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('Today');
  const [machines, setMachines] = useState(initialMachineStatus);
  
  // SaaS State
  const [activeTenantId, setActiveTenantId] = useState<keyof typeof SAAS_TENANTS>('acme');
  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);
  
  const tenant = SAAS_TENANTS[activeTenantId];
  const theme = THEME_CLASSES[tenant.theme as keyof typeof THEME_CLASSES];

  // Live SCADA/IoT Simulation
  useEffect(() => {
    if (!tenant.flags.enableSCADA) return;

    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'down') return m;
        const tempFluctuation = (Math.random() * 1 - 0.5);
        const vibFluctuation = (Math.random() * 0.1 - 0.05);
        const effFluctuation = (Math.random() * 0.4 - 0.2);

        return {
          ...m,
          efficiency: Math.min(100, Math.max(60, m.efficiency + effFluctuation)),
          sensors: {
            temp: Math.max(20, m.sensors.temp + tempFluctuation),
            vibration: Math.max(0, m.sensors.vibration + vibFluctuation)
          }
        };
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [tenant.flags.enableSCADA]);

  // Filter alerts based on feature flags
  const visibleAlerts = allAlerts.filter(alert => {
    if (alert.type === 'ai-critical' && !tenant.flags.enableAI) return false;
    return true;
  });

  return (
    <div className="relative min-h-full space-y-6 pb-12 max-w-[1600px] mx-auto font-sans z-0">
      
      {/* Ambient Background - Dynamically themed per tenant */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#09090b] transition-colors duration-1000">
        <div className={`absolute top-[-10%] left-[10%] w-[40%] h-[40%] rounded-full ${theme.glow} blur-[120px] transition-all duration-1000`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full ${theme.lightGlow} blur-[120px] transition-all duration-1000`} />
      </div>

      {/* Header & SaaS Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10"
      >
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            {/* Feature Flag: SCADA Link */}
            {tenant.flags.enableSCADA ? (
              <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${theme.glow} border ${theme.border} transition-colors duration-500`}>
                <div className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.bg} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.bg}`}></span>
                </div>
                <span className={`text-[10px] font-mono ${theme.text} uppercase tracking-widest font-semibold flex items-center gap-1`}>
                  <Wifi size={10} /> Live SCADA Link
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-500/10 border border-zinc-500/20">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <Wifi size={10} /> Offline
                </span>
              </div>
            )}
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">Plant 01 • Active Shift</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Manufacturing Operations</h1>
        </div>

        {/* SaaS Tenant Switcher */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            >
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-white">{tenant.name}</span>
                <span className={`text-[10px] font-mono ${theme.text}`}>{tenant.plan} Plan</span>
              </div>
              <ChevronDown size={16} className="text-zinc-400" />
            </button>

            <AnimatePresence>
              {isTenantMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#18181b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-2 text-[10px] font-mono text-zinc-500 uppercase tracking-wider border-b border-white/5">Switch Tenant</div>
                  {Object.values(SAAS_TENANTS).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setActiveTenantId(t.id as any); setIsTenantMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors flex flex-col ${activeTenantId === t.id ? 'bg-white/5' : ''}`}
                    >
                      <span className="font-medium text-white">{t.name}</span>
                      <span className="text-[10px] text-zinc-400">{t.plan}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Overall Equipment Effectiveness" value="82.4%" target="Target: 85%" trend="up" change="+1.2%" icon={Activity} theme={theme} delay={0.1} />
        <MetricCard title="Production Output" value="1,050" target="Target: 1,050" trend="up" change="On Track" icon={Package} theme={theme} delay={0.2} />
        <MetricCard title="First Pass Yield (Quality)" value="98.1%" target="Target: 98.0%" trend="down" change="-0.3%" icon={ShieldCheck} theme={theme} delay={0.3} />
        <MetricCard title="Active Work Orders" value="24" target="4 Delayed" trend="down" change="-2" icon={Factory} theme={theme} delay={0.4} />
      </div>

      {/* Main Dashboard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Production Chart (Spans 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Production Volume vs Target</h3>
              <p className="text-xs text-zinc-400 mt-1">Cumulative units produced across all lines</p>
            </div>
            {tenant.flags.enableAdvancedCharts && (
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${theme.bg}`}></div><span className="text-zinc-300">Actual</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-zinc-500 border border-zinc-500 border-dashed"></div><span className="text-zinc-300">Target</span></div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-h-[300px] w-full mt-4 relative">
            {/* Feature Flag: Advanced Charts */}
            {!tenant.flags.enableAdvancedCharts ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#09090b]/80 backdrop-blur-sm rounded-xl border border-white/5">
                <Lock className="text-zinc-500 mb-3" size={32} />
                <h4 className="text-white font-semibold mb-1">Advanced Analytics Locked</h4>
                <p className="text-xs text-zinc-400 mb-4 text-center max-w-xs">Upgrade to the Professional or Enterprise plan to unlock real-time production charting and historical trends.</p>
                <button className={`px-4 py-2 rounded-lg ${theme.bg} text-white text-xs font-bold hover:opacity-90 transition-opacity`}>
                  Upgrade Plan
                </button>
              </div>
            ) : null}

            <ResponsiveContainer width="100%" height="100%" className={!tenant.flags.enableAdvancedCharts ? 'opacity-20 grayscale pointer-events-none' : ''}>
              <AreaChart data={productionTrend} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.hex} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={theme.hex} stopOpacity={0}/>
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#71717a' }} />
                <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                  type="monotone" dataKey="target" stroke="#71717a" strokeWidth={2} strokeDasharray="4 4"
                  fillOpacity={0} dot={false} activeDot={false}
                />
                <Area 
                  type="monotone" dataKey="actual" stroke={theme.hex} strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" 
                  dot={{ r: 4, fill: '#09090b', stroke: theme.hex, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: theme.hex, stroke: '#fff', strokeWidth: 2 }}
                  filter="url(#glow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Machine Status - Live IoT & AI (Spans 1 column) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
          className="lg:col-span-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Cpu size={18} className="text-zinc-400" /> Equipment Telemetry
            </h3>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {machines.map((machine) => (
              <div key={machine.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <StatusIndicator status={machine.status} theme={theme} />
                      <span className="text-sm font-bold text-white">{machine.id}</span>
                      {tenant.flags.enableSCADA && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 font-mono border border-white/5 flex items-center gap-1">
                          <Database size={8} /> {machine.protocol}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">{machine.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-300">{machine.efficiency.toFixed(1)}% OEE</span>
                  </div>
                </div>

                {/* Feature Flag: Live SCADA Sensors */}
                {tenant.flags.enableSCADA ? (
                  <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
                    <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-lg border border-white/5">
                      <Thermometer size={12} className={machine.sensors.temp > 80 ? 'text-rose-400' : 'text-blue-400'} />
                      <span className="text-[10px] font-mono text-zinc-300">{machine.sensors.temp.toFixed(1)}°C</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-lg border border-white/5">
                      <Waves size={12} className={machine.sensors.vibration > 3.0 ? 'text-amber-400' : theme.text} />
                      <span className="text-[10px] font-mono text-zinc-300">{machine.sensors.vibration.toFixed(2)} mm/s</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 mb-3 p-2 bg-black/20 rounded-lg border border-white/5 flex items-center justify-center gap-2">
                    <Lock size={10} className="text-zinc-500" />
                    <span className="text-[10px] text-zinc-500">Live Telemetry Locked</span>
                  </div>
                )}

                {/* Feature Flag: AI Predictive Maintenance */}
                {tenant.flags.enableAI && (
                  <div className={`flex items-center justify-between mt-2 pt-2 border-t border-white/5 ${
                    machine.aiPrediction.risk === 'high' || machine.aiPrediction.risk === 'critical' ? 'text-rose-400' : 
                    machine.aiPrediction.risk === 'medium' ? 'text-amber-400' : theme.text
                  }`}>
                    <span className="text-[10px] uppercase tracking-wider flex items-center gap-1 font-bold">
                      <BrainCircuit size={12} /> AI Forecast
                    </span>
                    <span className="text-[10px] font-mono font-medium">TTF: {machine.aiPrediction.timeToFailure}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Work Orders (Spans 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
          className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Wrench size={18} className="text-zinc-400" /> Active Work Orders
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Progress</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeWorkOrders.map((wo) => (
                  <tr key={wo.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 text-sm font-mono text-white">{wo.id}</td>
                    <td className="py-4 text-sm text-zinc-300">{wo.product}</td>
                    <td className="py-4 w-1/3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${wo.status === 'delayed' ? 'bg-amber-500' : theme.bg}`} 
                            style={{ width: `${wo.progress}%` }} 
                          />
                        </div>
                        <span className="text-xs font-mono text-zinc-400 w-8">{wo.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        wo.status === 'on-track' ? `${theme.glow} ${theme.text} border ${theme.border}` :
                        wo.status === 'delayed' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                      }`}>
                        {wo.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 text-xs text-zinc-400 text-right">{wo.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Alerts & Notifications (Spans 1 column) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
          className="lg:col-span-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <AlertTriangle size={18} className="text-zinc-400" /> System Alerts
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/20">
              {visibleAlerts.length} Alerts
            </span>
          </div>

          <div className="space-y-3">
            {visibleAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-xl border flex gap-3 items-start ${
                alert.type === 'ai-critical' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-white/5 border-white/5'
              }`}>
                <div className="mt-0.5">
                  {alert.type === 'ai-critical' && <BrainCircuit size={16} className="text-purple-400" />}
                  {alert.type === 'critical' && <AlertCircle size={16} className="text-rose-500" />}
                  {alert.type === 'warning' && <AlertTriangle size={16} className="text-amber-500" />}
                  {alert.type === 'info' && <Activity size={16} className="text-blue-500" />}
                </div>
                <div>
                  <p className={`text-sm font-medium leading-snug mb-1 ${
                    alert.type === 'ai-critical' ? 'text-purple-100' :
                    alert.type === 'critical' ? 'text-rose-100' : 'text-zinc-200'
                  }`}>
                    {alert.message}
                  </p>
                  <p className="text-[10px] text-zinc-500">{alert.time}</p>
                </div>
              </div>
            ))}
            
            {/* Feature Flag Upsell: AI Alerts */}
            {!tenant.flags.enableAI && (
              <div className="p-4 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-2 mt-4">
                <BrainCircuit size={20} className="text-zinc-500" />
                <p className="text-xs text-zinc-400">Unlock AI Predictive Maintenance alerts to prevent downtime before it happens.</p>
                <button className={`mt-1 text-[10px] font-bold ${theme.text} hover:underline`}>Upgrade to Enterprise</button>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// --- Subcomponents ---

function MetricCard({ title, value, target, trend, change, icon: Icon, theme, delay }: any) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col relative group hover:bg-white/10 transition-colors"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 pointer-events-none whitespace-nowrap"
          >
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">{title}</p>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${theme.glow} ${theme.text} border ${theme.border} transition-colors duration-500`}>
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold border ${
          trend === 'up' && change !== 'On Track' ? `${theme.glow} ${theme.text} ${theme.border}` : 
          trend === 'down' && change.includes('-') ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
          'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
        }`}>
          {trend === 'up' && change !== 'On Track' && <ArrowUpRight size={12} />}
          {trend === 'down' && change.includes('-') && <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <h4 className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1">{title}</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        </div>
        <p className="text-xs text-zinc-500 mt-2 font-medium">{target}</p>
      </div>
    </motion.div>
  );
}

function StatusIndicator({ status, theme }: { status: string, theme: any }) {
  if (status === 'running') {
    return (
      <div className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.bg} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${theme.bg}`}></span>
      </div>
    );
  }
  if (status === 'warning') {
    return <div className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />;
  }
  return <div className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />;
}

const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#18181b]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-zinc-400 text-xs mb-2 font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color === '#3b82f6' ? theme.hex : entry.color }} />
              <span className="text-zinc-300 text-xs capitalize">{entry.name}</span>
            </div>
            <span className="text-white font-mono text-sm font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
