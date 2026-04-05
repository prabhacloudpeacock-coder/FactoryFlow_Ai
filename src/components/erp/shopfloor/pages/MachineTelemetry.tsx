import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Zap, Gauge, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MachineTelemetry() {
  const [telemetry, setTelemetry] = useState({
    temp: 45.2,
    vibration: 0.08,
    load: 72,
    speed: 1250
  });

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        temp: +(prev.temp + (Math.random() - 0.5) * 0.5).toFixed(1),
        vibration: +(prev.vibration + (Math.random() - 0.5) * 0.01).toFixed(3),
        load: Math.floor(prev.load + (Math.random() - 0.5) * 2),
        speed: Math.floor(prev.speed + (Math.random() - 0.5) * 10)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Activity size={16} className="text-orange-500" /> Live Machine Telemetry
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Streaming</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TelemetryCard 
          label="Temperature" 
          value={`${telemetry.temp}°C`} 
          icon={Thermometer} 
          color="text-orange-500" 
          trend={telemetry.temp > 50 ? 'warning' : 'normal'}
        />
        <TelemetryCard 
          label="Vibration" 
          value={`${telemetry.vibration} mm/s`} 
          icon={Activity} 
          color="text-blue-500" 
          trend={telemetry.vibration > 0.15 ? 'warning' : 'normal'}
        />
        <TelemetryCard 
          label="Motor Load" 
          value={`${telemetry.load}%`} 
          icon={Zap} 
          color="text-yellow-500" 
          trend="normal"
        />
        <TelemetryCard 
          label="Spindle Speed" 
          value={`${telemetry.speed} RPM`} 
          icon={Gauge} 
          color="text-purple-500" 
          trend="normal"
        />
      </div>

      <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
        <p className="text-[10px] text-zinc-600 font-mono">GATEWAY: IOT-NODE-042</p>
        <button className="text-[10px] font-bold text-zinc-500 hover:text-orange-500 transition-colors uppercase tracking-widest flex items-center gap-1">
          <RefreshCw size={10} /> Recalibrate
        </button>
      </div>
    </div>
  );
}

function TelemetryCard({ label, value, icon: Icon, color, trend }: any) {
  return (
    <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl group hover:border-zinc-700 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 ${color}`}>
          <Icon size={14} />
        </div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{label}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p 
          key={value}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-lg font-bold font-mono ${trend === 'warning' ? 'text-red-500' : 'text-zinc-100'}`}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
