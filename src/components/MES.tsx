import { useState, useEffect } from 'react';
import { WorkOrder, Machine, UserProfile } from '../types';
import { 
  Plus, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Cpu, 
  Settings,
  Activity,
  User as UserIcon,
  Layers,
  Zap,
  Thermometer,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { clsx } from 'clsx';

export default function MES({ profile }: { profile: UserProfile | null }) {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const fetchData = async () => {
    try {
      const [woRes, machinesRes] = await Promise.all([
        fetch('/api/mes/work-orders'),
        fetch('/api/hardware/status')
      ]);
      const [woData, machinesData] = await Promise.all([
        woRes.json(),
        machinesRes.json()
      ]);
      setWorkOrders(woData);
      setMachines(machinesData);
    } catch (error) {
      console.error('Error fetching MES data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (id: string, status: WorkOrder['status']) => {
    try {
      const response = await fetch(`/api/mes/work-orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success(`Work order ${status}`);
        fetchData();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleCreateWO = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newWO = {
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      machineId: formData.get('machineId'),
      operatorId: profile?.uid || 'unknown',
      status: 'scheduled',
      priority: formData.get('priority'),
    };

    try {
      const response = await fetch('/api/mes/work-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWO),
      });

      if (response.ok) {
        setIsModalOpen(false);
        toast.success('Work order created');
        fetchData();
      } else {
        throw new Error('Failed to create work order');
      }
    } catch (error) {
      toast.error('Failed to create work order');
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Manufacturing Execution</h1>
          <p className="text-zinc-500 mt-1">Real-time production control and machine monitoring.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-2.5 px-5 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          <Plus size={20} />
          Create Work Order
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <Layers size={20} className="text-orange-500" />
                Active Work Orders
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-mono text-zinc-400 uppercase">Total: {workOrders.length}</span>
              </div>
            </div>
            <div className="divide-y divide-zinc-800">
              {workOrders.length === 0 ? (
                <div className="p-12 text-center text-zinc-500">
                  <Clock size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No active work orders found.</p>
                </div>
              ) : (
                workOrders.map((wo) => (
                  <div key={wo.id} className="p-6 hover:bg-zinc-800/20 transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className={clsx(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                          wo.status === 'in-progress' ? "bg-orange-500/10 text-orange-500 animate-pulse" :
                          wo.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" :
                          "bg-zinc-800 text-zinc-500"
                        )}>
                          {wo.status === 'in-progress' ? <Activity size={24} /> : 
                           wo.status === 'completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-zinc-100">{wo.orderId}</h4>
                            <span className={clsx(
                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                              wo.priority === 'high' ? "bg-red-500/10 text-red-500" :
                              wo.priority === 'medium' ? "bg-orange-500/10 text-orange-500" :
                              "bg-blue-500/10 text-blue-500"
                            )}>
                              {wo.priority}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span className="flex items-center gap-1.5">
                              <Settings size={14} /> {wo.machineId}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UserIcon size={14} /> {wo.operatorId.slice(0, 8)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {wo.status === 'scheduled' && (
                          <button 
                            onClick={() => handleUpdateStatus(wo.id, 'in-progress')}
                            className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-zinc-950 rounded-lg transition-all"
                          >
                            <Play size={18} />
                          </button>
                        )}
                        {wo.status === 'in-progress' && (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(wo.id, 'paused')}
                              className="p-2 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-zinc-950 rounded-lg transition-all"
                            >
                              <Pause size={18} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(wo.id, 'completed')}
                              className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-zinc-950 rounded-lg transition-all"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          </>
                        )}
                        {wo.status === 'paused' && (
                          <button 
                            onClick={() => handleUpdateStatus(wo.id, 'in-progress')}
                            className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-zinc-950 rounded-lg transition-all"
                          >
                            <Play size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                    {wo.status === 'in-progress' && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-mono mb-2">
                          <span>Production Progress</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            className="bg-orange-500 h-full" 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
              <Cpu size={20} className="text-orange-500" />
              Machine Status
            </h3>
            <div className="space-y-4">
              {machines.map((machine) => (
                <div 
                  key={machine.id} 
                  onClick={() => setSelectedMachine(machine)}
                  className={cn(
                    "p-4 bg-zinc-950 border rounded-xl cursor-pointer transition-all",
                    selectedMachine?.id === machine.id 
                      ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]" 
                      : "border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-100">{machine.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase">{machine.id}</p>
                    </div>
                    <div className={clsx(
                      "w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                      machine.status === 'running' ? "bg-emerald-500 shadow-emerald-500/50" :
                      machine.status === 'idle' ? "bg-zinc-500" :
                      machine.status === 'error' ? "bg-red-500 shadow-red-500/50" :
                      "bg-orange-500 shadow-orange-500/50"
                    )} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase font-mono">Temp</p>
                      <div className="flex items-center gap-2">
                        <Thermometer size={12} className="text-zinc-500" />
                        <span className="text-xs font-bold text-zinc-300">{machine.telemetry.temperature.toFixed(1)}°C</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase font-mono">Pressure</p>
                      <div className="flex items-center gap-2">
                        <Gauge size={12} className="text-zinc-500" />
                        <span className="text-xs font-bold text-zinc-300">{machine.telemetry.pressure.toFixed(0)} PSI</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {selectedMachine && (
            <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-blue-500" />
                Detailed Telemetry: {selectedMachine.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Temperature</p>
                  <div className="flex items-center gap-2">
                    <Thermometer size={16} className="text-orange-500" />
                    <span className="text-lg font-bold text-zinc-100">{selectedMachine.telemetry.temperature.toFixed(1)}°C</span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Pressure</p>
                  <div className="flex items-center gap-2">
                    <Gauge size={16} className="text-blue-500" />
                    <span className="text-lg font-bold text-zinc-100">{selectedMachine.telemetry.pressure.toFixed(0)} PSI</span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Voltage</p>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" />
                    <span className="text-lg font-bold text-zinc-100">{selectedMachine.telemetry.voltage.toFixed(0)} V</span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Speed</p>
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-emerald-500" />
                    <span className="text-lg font-bold text-zinc-100">{selectedMachine.telemetry.speed.toFixed(0)} RPM</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-4">OEE Dashboard</h3>
            <div className="flex items-center justify-center py-8">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-zinc-800 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                  <circle className="text-orange-500 stroke-current" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="45.2"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-zinc-100">82%</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-mono">Overall</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-mono">Avail</p>
                <p className="text-sm font-bold text-zinc-100">94%</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-mono">Perf</p>
                <p className="text-sm font-bold text-zinc-100">88%</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-mono">Qual</p>
                <p className="text-sm font-bold text-zinc-100">99%</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl"
            >
              <h3 className="text-xl font-bold text-zinc-100 mb-6">New Work Order</h3>
              <form onSubmit={handleCreateWO} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase mb-1.5">Target Machine</label>
                  <select name="machineId" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-zinc-100">
                    {machines.map(m => <option key={m.id} value={m.id}>{m.name} ({m.id})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 uppercase mb-1.5">Priority Level</label>
                  <select name="priority" required className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-zinc-100">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 font-bold hover:bg-zinc-800 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-orange-500 text-zinc-950 font-bold hover:bg-orange-600 transition-all">Schedule WO</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
