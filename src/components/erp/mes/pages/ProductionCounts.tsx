import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Package, TrendingUp, AlertCircle } from 'lucide-react';

interface WorkOrderProgress {
  id: string;
  product: string;
  target: number;
  completed: number;
  inProgress: number;
  status: 'Running' | 'Paused' | 'Completed';
}

const MOCK_PROGRESS: WorkOrderProgress[] = [
  { id: 'WO-EV-001', product: 'EV Bike Model S', target: 50, completed: 32, inProgress: 5, status: 'Running' },
  { id: 'WO-EV-002', product: 'EV Bike Model X', target: 25, completed: 0, inProgress: 10, status: 'Running' },
  { id: 'WO-EV-003', product: 'EV Bike Model S', target: 100, completed: 100, inProgress: 0, status: 'Completed' },
];

export default function ProductionCounts() {
  const totalTarget = MOCK_PROGRESS.reduce((acc, curr) => acc + curr.target, 0);
  const totalCompleted = MOCK_PROGRESS.reduce((acc, curr) => acc + curr.completed, 0);
  const totalInProgress = MOCK_PROGRESS.reduce((acc, curr) => acc + curr.inProgress, 0);
  const overallProgress = (totalCompleted / totalTarget) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Package size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Total Target</span>
          </div>
          <p className="text-2xl font-bold text-zinc-100">{totalTarget.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Total Completed</span>
          </div>
          <p className="text-2xl font-bold text-zinc-100">{totalCompleted.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-blue-500">
            <Clock size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-zinc-100">{totalInProgress.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <TrendingUp size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Overall Yield</span>
          </div>
          <p className="text-2xl font-bold text-zinc-100">{overallProgress.toFixed(1)}%</p>
        </div>
      </div>

      {/* Detailed Progress List */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/30">
          <h3 className="text-lg font-bold text-zinc-100">Active Work Order Progress</h3>
        </div>
        <div className="p-6 space-y-6">
          {MOCK_PROGRESS.map((wo) => {
            const progress = (wo.completed / wo.target) * 100;
            const inProgressWidth = (wo.inProgress / wo.target) * 100;
            
            return (
              <div key={wo.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-orange-500 font-bold">{wo.id}</span>
                    <h4 className="text-sm font-bold text-zinc-200">{wo.product}</h4>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      wo.status === 'Running' ? 'bg-green-500/10 text-green-500' :
                      wo.status === 'Completed' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {wo.status}
                    </span>
                    <p className="text-xs text-zinc-500 mt-1">
                      {wo.completed} / {wo.target} Units
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden flex border border-zinc-800/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                  />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${inProgressWidth}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-blue-500/40"
                  />
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    Completed ({progress.toFixed(0)}%)
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                    In Progress ({inProgressWidth.toFixed(0)}%)
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-600">
                    <div className="w-2 h-2 rounded-full bg-zinc-900" />
                    Remaining ({(100 - progress - inProgressWidth).toFixed(0)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend / Info */}
      <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl flex gap-3">
        <AlertCircle className="text-orange-500 shrink-0" size={20} />
        <p className="text-xs text-zinc-400 leading-relaxed">
          Production counts are updated in real-time from shop floor terminals. "In Progress" units represent items currently at active workstations.
        </p>
      </div>
    </div>
  );
}
