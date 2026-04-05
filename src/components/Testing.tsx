import { useState, useEffect } from 'react';
import { TestLog, UserProfile, Machine } from '../types';
import { 
  Beaker, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  FileText, 
  Download,
  Activity,
  ShieldCheck,
  ClipboardCheck,
  History
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { clsx } from 'clsx';

export default function Testing({ profile }: { profile: UserProfile | null }) {
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [logsRes, machinesRes] = await Promise.all([
        fetch('/api/qa/logs'),
        fetch('/api/hardware/status')
      ]);
      const [logsData, machinesData] = await Promise.all([
        logsRes.json(),
        machinesRes.json()
      ]);
      setLogs(logsData);
      setMachines(machinesData);
    } catch (error) {
      console.error('Error fetching Testing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runTest = async (machineId: string) => {
    const toastId = toast.loading(`Running automated test sequence for ${machineId}...`);
    
    // Simulate test delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = Math.random() > 0.1 ? 'pass' : 'fail';
    const newLog = {
      machineId,
      testType: 'Automated Calibration',
      result,
      metrics: {
        accuracy: 95 + Math.random() * 5,
        latency: 10 + Math.random() * 5,
        stability: 98 + Math.random() * 2
      },
      operatorId: profile?.uid || 'system'
    };
    
    try {
      const response = await fetch('/api/qa/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog),
      });

      if (response.ok) {
        toast.dismiss(toastId);
        if (result === 'pass') {
          toast.success('Test Sequence Passed');
        } else {
          toast.error('Test Sequence Failed - Threshold Violation');
        }
        fetchData();
      } else {
        throw new Error('Failed to record test result');
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to record test result');
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">QA & Testing Platform</h1>
          <p className="text-zinc-500 mt-1">Automated machine testing and quality assurance logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-100 font-bold py-2.5 px-5 rounded-xl transition-all flex items-center gap-2">
            <Download size={20} />
            Export Reports
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-orange-500" />
              Active Machines
            </h3>
            <div className="space-y-3">
              {machines.map((machine) => (
                <div key={machine.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-100">{machine.name}</span>
                    <div className={clsx(
                      "w-2 h-2 rounded-full",
                      machine.status === 'running' ? "bg-emerald-500" : "bg-zinc-500"
                    )} />
                  </div>
                  <button 
                    onClick={() => runTest(machine.id)}
                    disabled={machine.status !== 'running'}
                    className="w-full py-2 bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold rounded-lg text-xs transition-all hover:bg-orange-600 active:scale-95"
                  >
                    Run Test Suite
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-100 mb-4">QA Metrics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Avg. Pass Rate</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-emerald-500">98.4%</span>
                  <Activity size={16} className="text-emerald-500/50 mb-1" />
                </div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Tests Today</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-blue-500">142</span>
                  <ClipboardCheck size={16} className="text-blue-500/50 mb-1" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-3">
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <History size={20} className="text-orange-500" />
                Test History Logs
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search logs..." 
                    className="bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/50 text-zinc-500 text-[10px] uppercase tracking-widest font-mono">
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">Machine</th>
                    <th className="px-6 py-4 font-medium">Test Type</th>
                    <th className="px-6 py-4 font-medium">Result</th>
                    <th className="px-6 py-4 font-medium">Operator</th>
                    <th className="px-6 py-4 font-medium text-right">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                        No test logs recorded yet.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-zinc-800/30 transition-all group">
                        <td className="px-6 py-4 text-xs font-mono text-zinc-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-zinc-100">{log.machineId}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-300">
                          {log.testType}
                        </td>
                        <td className="px-6 py-4">
                          <div className={clsx(
                            "flex items-center gap-1.5 text-[10px] font-bold uppercase",
                            log.result === 'pass' ? "text-emerald-500" : "text-red-500"
                          )}>
                            {log.result === 'pass' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {log.result}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-500">
                          {log.operatorId.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-zinc-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all">
                            <FileText size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
