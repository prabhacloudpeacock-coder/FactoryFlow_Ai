import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  User, 
  Settings, 
  Clock, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter 
} from 'lucide-react';

export default function TimelineSync() {
  const [selectedShift, setSelectedShift] = useState('Morning');

  const timelineData = [
    { time: '08:00', machine: 'Idle', operator: 'Shift Start', status: 'Info' },
    { time: '08:15', machine: 'Running', operator: 'Frame Prep Setup', status: 'Success' },
    { time: '09:30', machine: 'Running', operator: 'Motor Mount Assembly', status: 'Success' },
    { time: '10:15', machine: 'Downtime', operator: 'Torque Tool Calibration Error', status: 'Error' },
    { time: '10:45', machine: 'Running', operator: 'Resumed Battery Placement', status: 'Success' },
    { time: '12:00', machine: 'Idle', operator: 'Lunch Break', status: 'Info' },
    { time: '13:00', machine: 'Running', operator: 'Wiring Harness Assembly', status: 'Success' },
    { time: '14:30', machine: 'Running', operator: 'Final QA & Test', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="text-blue-500" /> Machine + Operator Sync
          </h2>
          <p className="text-sm text-zinc-500">Real-time timeline of human-machine interaction</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1">
            {['Morning', 'Afternoon', 'Night'].map((shift) => (
              <button
                key={shift}
                onClick={() => setSelectedShift(shift)}
                className={clsx(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  selectedShift === shift ? "bg-blue-500 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {shift}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-8">
          <div className="relative">
            <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-zinc-800 border-dashed border-l" />
            
            <div className="space-y-8">
              {timelineData.map((event, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-8 relative"
                >
                  <div className="w-12 text-right text-xs font-mono text-zinc-500 pt-1.5">
                    {event.time}
                  </div>
                  
                  <div className={clsx(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all",
                    event.status === 'Success' ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                    event.status === 'Error' ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
                    "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                  )}>
                    {event.status === 'Success' ? <CheckCircle2 size={18} /> :
                     event.status === 'Error' ? <AlertTriangle size={18} /> :
                     <Zap size={18} />}
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:border-zinc-700 transition-all group">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <Settings size={12} /> Machine State
                      </div>
                      <div className={clsx(
                        "text-lg font-bold",
                        event.machine === 'Running' ? "text-green-400" : "text-zinc-500"
                      )}>
                        {event.machine}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <User size={12} /> Operator Action
                      </div>
                      <div className="text-lg font-bold text-zinc-100">
                        {event.operator}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Efficiency Metrics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Sync Score</span>
                  <span className="text-green-500 font-bold">92%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-green-500" />
                </div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Idle Time</span>
                  <span className="text-yellow-500 font-bold">18m</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Operators</h3>
            <div className="space-y-3">
              {['John Doe', 'Jane Smith'].map((name) => (
                <div key={name} className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <User size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-200">{name}</p>
                    <p className="text-[10px] text-zinc-500 uppercase">Station ASSY-04</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
