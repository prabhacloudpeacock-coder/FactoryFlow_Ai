import React, { useState, useEffect } from 'react';
import { Activity, Power, AlertTriangle, CheckCircle2, RefreshCw, Database, Wifi, Cpu, Waves, Settings2, Gauge, BarChart3, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function SCADADashboard() {
  const [isConnected, setIsConnected] = useState(true);
  const [pumpActive, setPumpActive] = useState(true);
  const [valveOpen, setValveOpen] = useState(false);
  
  // Telemetry state
  const [tankLevel, setTankLevel] = useState(65);
  const [pressure, setPressure] = useState(120);
  const [temperature, setTemperature] = useState(45.2);
  const [flowRate, setFlowRate] = useState(350);
  
  // New metrics
  const [productionCount, setProductionCount] = useState(1240);
  const [cycleTime, setCycleTime] = useState(42.5);
  const [history, setHistory] = useState<{ time: string, cycleTime: number, count: number }[]>([]);

  // Simulate live data
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      setPressure(prev => Math.max(0, Math.min(200, prev + (Math.random() - 0.5) * 5)));
      setTemperature(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 1)));
      setProductionCount(prev => prev + (pumpActive ? 1 : 0));
      setCycleTime(prev => 40 + Math.random() * 5);

      if (pumpActive) {
        setFlowRate(prev => Math.max(300, Math.min(400, prev + (Math.random() - 0.5) * 20)));
        setTankLevel(prev => Math.max(0, Math.min(100, prev + (valveOpen ? -0.5 : 0.5))));
      } else {
        setFlowRate(prev => Math.max(0, prev - 10));
        setTankLevel(prev => Math.max(0, prev - (valveOpen ? 0.2 : 0)));
      }

      // Update history
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setHistory(prev => {
        const next = [...prev, { time: now, cycleTime: 40 + Math.random() * 5, count: Math.floor(Math.random() * 10) }];
        return next.slice(-10);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, pumpActive, valveOpen]);

  return (
    <div className="space-y-6">
      {/* Header & Connection Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isConnected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
            <Wifi size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">OPC UA Server</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2.5 w-2.5">
                {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-sm font-mono text-zinc-400">
                {isConnected ? 'tcp://192.168.1.100:4840' : 'Connection Lost'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsConnected(!isConnected)}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${isConnected ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-600'}`}
          >
            <RefreshCw size={16} className={isConnected ? '' : 'animate-spin'} />
            {isConnected ? 'Disconnect' : 'Reconnect'}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-bold uppercase">Production Count</p>
          <p className="text-2xl font-mono font-bold text-zinc-100">{productionCount}</p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-bold uppercase">Avg Cycle Time</p>
          <p className="text-2xl font-mono font-bold text-zinc-100">{cycleTime.toFixed(2)} <span className="text-sm text-zinc-500">s</span></p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-bold uppercase">Machine Status</p>
          <p className="text-2xl font-mono font-bold text-emerald-400">{pumpActive ? 'RUNNING' : 'STOPPED'}</p>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
          <p className="text-xs text-zinc-500 font-bold uppercase">System Load</p>
          <p className="text-2xl font-mono font-bold text-zinc-100">68 <span className="text-sm text-zinc-500">%</span></p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" size={20} /> Cycle Time Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                <Line type="monotone" dataKey="cycleTime" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="text-emerald-500" size={20} /> Production Output
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#666" fontSize={10} />
                <YAxis stroke="#666" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* HMI Visualization & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HMI Visualization */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Activity className="text-orange-500" size={20} />
              Process HMI
            </h3>
            <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
              Update Rate: 1000ms
            </span>
          </div>

          <div className="relative h-[400px] bg-zinc-950/50 rounded-xl border border-zinc-800/50 p-8 flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* SCADA Diagram */}
            <div className="relative w-full max-w-2xl h-full flex items-center justify-between z-10">
              
              {/* Tank */}
              <div className="relative w-40 h-64 border-4 border-zinc-700 rounded-b-xl rounded-t-sm bg-zinc-900 flex flex-col justify-end overflow-hidden">
                <div className="absolute top-2 left-0 w-full text-center z-20">
                  <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-900/80 px-2 py-1 rounded">TK-100</span>
                </div>
                <motion.div 
                  className="w-full bg-blue-500/80 relative"
                  animate={{ height: `${tankLevel}%` }}
                  transition={{ type: "tween", duration: 1 }}
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-400/50"></div>
                  {/* Bubbles */}
                  <div className="absolute bottom-0 w-full h-full overflow-hidden opacity-30">
                     <div className="w-2 h-2 bg-white rounded-full absolute bottom-2 left-4 animate-bounce"></div>
                     <div className="w-3 h-3 bg-white rounded-full absolute bottom-6 left-12 animate-pulse"></div>
                     <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-10 left-20 animate-ping"></div>
                  </div>
                </motion.div>
                {/* Level Indicator */}
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-xs font-mono text-blue-400">
                  {tankLevel.toFixed(1)}%
                </div>
              </div>

              {/* Pipe 1 */}
              <div className="absolute left-40 top-3/4 w-24 h-4 bg-zinc-700">
                <motion.div 
                  className="h-full bg-blue-500/50"
                  animate={{ x: pumpActive ? [0, 20, 0] : 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </div>

              {/* Pump */}
              <div className="relative z-20">
                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center bg-zinc-900 transition-colors ${pumpActive ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-zinc-700'}`}>
                  <RefreshCw size={32} className={`${pumpActive ? 'text-emerald-500 animate-spin' : 'text-zinc-600'}`} style={{ animationDuration: '2s' }} />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-zinc-400">P-200</div>
              </div>

              {/* Pipe 2 */}
              <div className="absolute left-[calc(10rem+6rem+5rem)] top-3/4 w-24 h-4 bg-zinc-700">
                <motion.div 
                  className="h-full bg-blue-500/50"
                  animate={{ x: (pumpActive && valveOpen) ? [0, 20, 0] : 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </div>

              {/* Valve */}
              <div className="relative z-20">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-t-md transition-colors ${valveOpen ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    <div className="w-4 h-1 bg-zinc-900"></div>
                  </div>
                  <div className="w-2 h-6 bg-zinc-500"></div>
                  <div className="w-12 h-8 bg-zinc-700 rounded-sm flex items-center justify-center">
                    <div className="w-8 h-8 border-t-8 border-b-8 border-l-8 border-r-8 border-t-transparent border-b-transparent border-l-zinc-900 border-r-zinc-900"></div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-zinc-400">XV-300</div>
              </div>

              {/* Output Pipe */}
              <div className="absolute right-0 top-3/4 w-16 h-4 bg-zinc-700 rounded-r-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500/50"
                  animate={{ x: (pumpActive && valveOpen) ? [0, 20, 0] : 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </div>

            </div>
          </div>
        </div>

        {/* Controls & Telemetry */}
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Settings2 className="text-orange-500" size={20} />
              Manual Control
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                <div>
                  <p className="font-bold text-zinc-200">Main Pump (P-200)</p>
                  <p className="text-xs text-zinc-500">Variable Frequency Drive</p>
                </div>
                <button 
                  onClick={() => setPumpActive(!pumpActive)}
                  disabled={!isConnected}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${pumpActive ? 'bg-emerald-500' : 'bg-zinc-700'} ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
                >
                  <motion.div 
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ x: pumpActive ? 24 : 0 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                <div>
                  <p className="font-bold text-zinc-200">Discharge Valve (XV-300)</p>
                  <p className="text-xs text-zinc-500">Solenoid Actuator</p>
                </div>
                <button 
                  onClick={() => setValveOpen(!valveOpen)}
                  disabled={!isConnected}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${valveOpen ? 'bg-emerald-500' : 'bg-zinc-700'} ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
                >
                  <motion.div 
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ x: valveOpen ? 24 : 0 }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Live Tags */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Database className="text-orange-500" size={20} />
              Live Tags
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Pressure (PT-101)</p>
                <p className="text-lg font-mono font-bold text-orange-400">{pressure.toFixed(1)} <span className="text-xs text-zinc-500">kPa</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Temp (TT-102)</p>
                <p className="text-lg font-mono font-bold text-red-400">{temperature.toFixed(1)} <span className="text-xs text-zinc-500">°C</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Flow (FT-201)</p>
                <p className="text-lg font-mono font-bold text-blue-400">{flowRate.toFixed(0)} <span className="text-xs text-zinc-500">L/m</span></p>
              </div>
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <p className="text-xs text-zinc-500 mb-1">Level (LT-100)</p>
                <p className="text-lg font-mono font-bold text-emerald-400">{tankLevel.toFixed(1)} <span className="text-xs text-zinc-500">%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alarm Log */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-500" size={20} />
          Active Alarms & Events
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/50">
              <tr>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Time</th>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Tag</th>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Message</th>
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {!isConnected && (
                <tr className="bg-red-500/5">
                  <td className="p-3 text-sm font-mono text-zinc-400">Just now</td>
                  <td className="p-3 text-sm font-mono text-zinc-300">SYS_COMM</td>
                  <td className="p-3 text-sm text-zinc-200">Lost connection to OPC UA Server</td>
                  <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/20">CRITICAL</span></td>
                </tr>
              )}
              {temperature > 80 && (
                <tr className="bg-orange-500/5">
                  <td className="p-3 text-sm font-mono text-zinc-400">Just now</td>
                  <td className="p-3 text-sm font-mono text-zinc-300">TT-102</td>
                  <td className="p-3 text-sm text-zinc-200">High Temperature Warning</td>
                  <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/20">HIGH</span></td>
                </tr>
              )}
              {tankLevel < 10 && (
                <tr className="bg-yellow-500/5">
                  <td className="p-3 text-sm font-mono text-zinc-400">2m ago</td>
                  <td className="p-3 text-sm font-mono text-zinc-300">LT-100</td>
                  <td className="p-3 text-sm text-zinc-200">Low Tank Level</td>
                  <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/20">MEDIUM</span></td>
                </tr>
              )}
              <tr>
                <td className="p-3 text-sm font-mono text-zinc-400">15m ago</td>
                <td className="p-3 text-sm font-mono text-zinc-300">P-200</td>
                <td className="p-3 text-sm text-zinc-200">Pump started manually</td>
                <td className="p-3"><span className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 font-bold border border-zinc-700">INFO</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
