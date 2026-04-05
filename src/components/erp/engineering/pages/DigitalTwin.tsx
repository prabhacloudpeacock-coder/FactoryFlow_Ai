import { useState } from 'react';
import { Box, Activity, Zap, Thermometer, Settings, AlertTriangle, Play, Pause, RefreshCw } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { motion } from 'framer-motion';

export default function DigitalTwin() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Box className="text-orange-500" size={24} /> Factory Digital Twin
          </h2>
          <p className="text-zinc-400 mt-1">Real-time 3D visualization and simulation of the shop floor.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20">
            <RefreshCw size={16} />
            Sync Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden relative min-h-[500px] flex items-center justify-center">
          {/* Placeholder for 3D Canvas */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
          
          {/* Simulated 3D Elements overlay */}
          <div className="relative z-10 w-full h-full p-8">
            <div className="absolute top-1/4 left-1/4">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-orange-500/30 rounded-full border-t-orange-500"
              />
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-3 rounded-xl shadow-xl w-48">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-100">CNC Mill #1</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Spindle Speed</span>
                    <span className="text-orange-500 font-mono">12,000 RPM</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Temp</span>
                    <span className="text-zinc-300 font-mono">45°C</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-1/4">
              <motion.div 
                animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 bg-blue-500/10 border-2 border-blue-500/50 rounded-xl flex items-center justify-center"
              >
                <Activity className="text-blue-500" size={32} />
              </motion.div>
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-3 rounded-xl shadow-xl w-48">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-100">Assembly Robot</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Cycle Time</span>
                    <span className="text-blue-500 font-mono">4.2s</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Efficiency</span>
                    <span className="text-zinc-300 font-mono">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-zinc-300">Live Sync Active</span>
            </div>
            <div className="w-px h-4 bg-zinc-700"></div>
            <span className="text-xs font-mono text-zinc-500">Latency: 12ms</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Activity className="text-orange-500" size={16} /> Overall Plant Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Production Efficiency</span>
                  <span className="text-emerald-500 font-bold">92%</span>
                </div>
                <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Energy Consumption</span>
                  <span className="text-orange-500 font-bold">450 kW</span>
                </div>
                <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[75%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Active Alerts</span>
                  <span className="text-red-500 font-bold">3</span>
                </div>
                <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={16} /> Active Anomalies
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <Thermometer className="text-red-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-bold text-red-500">High Temp: CNC #1</p>
                  <p className="text-[10px] text-zinc-400 mt-1">Spindle temperature exceeded 45°C threshold.</p>
                </div>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
                <Zap className="text-orange-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-bold text-orange-500">Voltage Drop: Line B</p>
                  <p className="text-[10px] text-zinc-400 mt-1">Detected 5% voltage drop on main feed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
