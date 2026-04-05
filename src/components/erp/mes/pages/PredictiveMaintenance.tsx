import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Settings, 
  Clock, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Database,
  BarChart2,
  Calendar,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

export default function PredictiveMaintenance() {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const machines = [
    { 
      id: 'M-101', 
      name: 'Frame Welding Robot - Line 1', 
      health: 82, 
      rul: '14 Days', 
      status: 'Warning', 
      prediction: 'Joint Wear', 
      confidence: 94,
      lastMaintenance: '2026-03-15',
      telemetry: { temp: 42, vib: 0.85, volt: 12.1 }
    },
    { 
      id: 'M-102', 
      name: 'Assembly Conveyor Motor - Line 1', 
      health: 95, 
      rul: '45 Days', 
      status: 'Healthy', 
      prediction: 'Normal', 
      confidence: 98,
      lastMaintenance: '2026-03-20',
      telemetry: { temp: 38, vib: 0.42, volt: 12.0 }
    },
    { 
      id: 'M-103', 
      name: 'Battery Lift Mechanism - Line 1', 
      health: 68, 
      rul: '5 Days', 
      status: 'Critical', 
      prediction: 'Hydraulic Seal Failure', 
      confidence: 89,
      lastMaintenance: '2026-02-10',
      telemetry: { temp: 55, vib: 1.22, volt: 11.8 }
    },
  ];

  const handleSchedule = (machineId: string) => {
    toast.success(`Maintenance scheduled for machine ${machineId}.`, {
      description: 'AI prediction: Failure prevented.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <TrendingUp className="text-blue-500" /> AI-Based Predictive Maintenance
          </h2>
          <p className="text-sm text-zinc-500">Machine health monitoring and failure prediction</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-500 uppercase tracking-widest">
          AI Monitoring Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {machines.map((machine) => (
              <motion.div
                key={machine.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedMachine(machine.id)}
                className={clsx(
                  "p-6 bg-zinc-950 border rounded-3xl cursor-pointer transition-all flex flex-col md:flex-row gap-6 items-start md:items-center",
                  selectedMachine === machine.id ? "border-blue-500 bg-blue-500/5" : "border-zinc-800 hover:border-zinc-700"
                )}
              >
                <div className={clsx(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  machine.status === 'Healthy' ? "bg-green-500/10 text-green-500" :
                  machine.status === 'Warning' ? "bg-yellow-500/10 text-yellow-500" :
                  "bg-rose-500/10 text-rose-500"
                )}>
                  <Cpu size={24} />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-zinc-100">{machine.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest">{machine.id}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> Last: {machine.lastMaintenance}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Health Score</p>
                    <p className={clsx(
                      "text-xl font-bold",
                      machine.health > 90 ? "text-green-500" : machine.health > 70 ? "text-yellow-500" : "text-rose-500"
                    )}>
                      {machine.health}%
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">RUL Prediction</p>
                    <p className="text-xl font-bold text-zinc-100">{machine.rul}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedMachine ? (
              <motion.div
                key={selectedMachine}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-100">AI Diagnostics</h3>
                  <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-500">
                    {machines.find(m => m.id === selectedMachine)?.confidence}% Confidence
                  </div>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3 text-yellow-500 mb-2">
                    <AlertTriangle size={20} />
                    <span className="font-bold text-zinc-200">Predicted Issue</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    {machines.find(m => m.id === selectedMachine)?.prediction} detected based on vibration patterns and temperature trends.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} /> Real-time Telemetry
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase">Temp</p>
                      <p className="text-sm font-bold text-zinc-200">{machines.find(m => m.id === selectedMachine)?.telemetry.temp}°C</p>
                    </div>
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase">Vib</p>
                      <p className="text-sm font-bold text-zinc-200">{machines.find(m => m.id === selectedMachine)?.telemetry.vib}g</p>
                    </div>
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase">Volt</p>
                      <p className="text-sm font-bold text-zinc-200">{machines.find(m => m.id === selectedMachine)?.telemetry.volt}V</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleSchedule(selectedMachine)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-zinc-950 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Calendar size={20} /> Schedule Maintenance
                </button>
              </motion.div>
            ) : (
              <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                  <TrendingUp size={32} />
                </div>
                <p className="text-sm text-zinc-500">Select a machine to view AI-driven health diagnostics and predictions.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
