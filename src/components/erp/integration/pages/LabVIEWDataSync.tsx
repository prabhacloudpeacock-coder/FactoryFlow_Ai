import { Activity, RefreshCw, Clock, Database, ChevronRight, CheckCircle2 } from 'lucide-react';

const SYNC_TASKS = [
  { id: 'LV-001', name: 'Vibration Data Sync', source: 'LabVIEW VI #4', interval: '100ms', records: '1,240,500', status: 'Syncing' },
  { id: 'LV-002', name: 'Thermal Imaging Log', source: 'LabVIEW VI #1', interval: '500ms', records: '450,200', status: 'Syncing' },
  { id: 'LV-003', name: 'Acoustic Analysis', source: 'LabVIEW VI #2', interval: '1s', records: '85,000', status: 'Paused' },
  { id: 'LV-004', name: 'Strain Gauge Data', source: 'LabVIEW VI #3', interval: '50ms', records: '2,800,000', status: 'Syncing' },
];

export default function LabVIEWDataSync() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3 text-zinc-900 dark:text-zinc-100 transition-colors">
          <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20">
            <Database size={24} />
          </div>
          LABVIEW DATA SYNC
        </h2>
        <div className="flex gap-3">
          <button className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-100 px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all border border-zinc-200 dark:border-zinc-700/50 active:scale-95 uppercase tracking-tighter">
            <RefreshCw size={18} /> Force Sync All
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95 uppercase tracking-tighter">
            Configure New Sync
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SYNC_TASKS.map(task => (
          <div key={task.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all cursor-pointer group shadow-xl shadow-zinc-200/30 dark:shadow-none hover:border-orange-500/30 active:scale-[0.98]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Activity className="text-orange-500 group-hover:text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 transition-colors">{task.name}</h3>
                  <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 transition-colors">{task.id}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                task.status === 'Syncing' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              }`}>
                {task.status.toUpperCase()}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-100 dark:border-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Clock size={12} />
                  <span className="text-[10px] uppercase font-bold">Sync Interval</span>
                </div>
                <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-colors">{task.interval}</p>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-100 dark:border-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Database size={12} />
                  <span className="text-[10px] uppercase font-bold">Total Records</span>
                </div>
                <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 transition-colors">{task.records}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900 transition-colors">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <CheckCircle2 size={12} className="text-green-500" />
                Last Sync: 2s ago
              </div>
              <button className="text-orange-500 hover:underline text-xs flex items-center gap-1">
                View Data Stream <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
