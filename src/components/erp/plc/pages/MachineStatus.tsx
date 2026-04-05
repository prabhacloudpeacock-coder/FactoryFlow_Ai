import { useState, useEffect } from 'react';
import { Thermometer, Zap, Activity } from 'lucide-react';

const INITIAL_MACHINES = [
  { name: 'CNC Machine 1', status: 'Running', color: 'bg-green-500', temp: 45.2, voltage: 230.1, current: 12.4 },
  { name: 'Injection Molder 2', status: 'Idle', color: 'bg-yellow-500', temp: 38.5, voltage: 229.8, current: 2.1 },
  { name: 'Robot Arm 3', status: 'Error', color: 'bg-red-500', temp: 65.8, voltage: 231.0, current: 0.0 },
  { name: 'Conveyor Belt 4', status: 'Maintenance', color: 'bg-blue-500', temp: 25.0, voltage: 0.0, current: 0.0 },
];

export default function MachineStatus() {
  const [machines, setMachines] = useState(INITIAL_MACHINES);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'Maintenance') return m;
        
        const tempChange = (Math.random() - 0.5) * 0.5;
        const voltChange = (Math.random() - 0.5) * 0.2;
        const currChange = (Math.random() - 0.5) * 0.3;

        return {
          ...m,
          temp: m.status === 'Running' || m.status === 'Error' ? Math.max(20, m.temp + tempChange) : m.temp,
          voltage: m.voltage > 0 ? Math.max(220, Math.min(240, m.voltage + voltChange)) : 0,
          current: m.status === 'Running' ? Math.max(5, m.current + currChange) : m.current,
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {machines.map((machine) => (
        <div key={machine.name} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                {(machine.status === 'Running' || machine.status === 'Error') && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${machine.color}`}></span>
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${machine.color}`}></span>
              </span>
              <h3 className="text-zinc-200 font-medium">{machine.name}</h3>
            </div>
            <p className={`text-sm font-bold px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 ${
              machine.status === 'Running' ? 'text-green-400' :
              machine.status === 'Idle' ? 'text-yellow-400' :
              machine.status === 'Error' ? 'text-red-400' :
              'text-blue-400'
            }`}>
              {machine.status}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800/50">
            <div className="bg-zinc-900/50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <Thermometer size={16} className="text-orange-500 mb-1" />
              <span className="text-xs text-zinc-500 font-medium mb-1">Temp</span>
              <span className="text-sm font-mono font-bold text-zinc-200">{machine.temp.toFixed(1)}°C</span>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <Zap size={16} className="text-yellow-500 mb-1" />
              <span className="text-xs text-zinc-500 font-medium mb-1">Voltage</span>
              <span className="text-sm font-mono font-bold text-zinc-200">{machine.voltage.toFixed(1)}V</span>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <Activity size={16} className="text-blue-500 mb-1" />
              <span className="text-xs text-zinc-500 font-medium mb-1">Current</span>
              <span className="text-sm font-mono font-bold text-zinc-200">{machine.current.toFixed(1)}A</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
