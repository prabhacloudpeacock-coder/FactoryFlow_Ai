import { Calendar, Plus, Search, ChevronRight, Activity, Clock, CheckCircle2 } from 'lucide-react';

const SUGGESTIONS = [
  { id: 'SCH-001', title: 'Optimize Batch Sequence', impact: '+12% Efficiency', description: 'Reordering the production sequence for Product A and B will reduce changeover time by 45 minutes.', status: 'Pending Approval' },
  { id: 'SCH-002', title: 'Shift Resource Reallocation', impact: '-8% Downtime', description: 'Moving 2 operators from Line B to Line A during the morning shift will balance workload and reduce bottlenecks.', status: 'Applied' },
  { id: 'SCH-003', title: 'Preventive Maintenance Window', impact: 'Avoids Breakdown', description: 'Scheduling a 2-hour maintenance window for CNC Mill #4 on Wednesday at 14:00 will prevent a predicted motor failure.', status: 'Scheduled' },
  { id: 'SCH-004', title: 'Material Delivery Sync', impact: 'Zero Wait Time', description: 'Adjusting the material delivery schedule to arrive 30 minutes earlier will eliminate idle time on the casting line.', status: 'Pending Approval' },
];

export default function SmartScheduling() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="text-orange-500" /> AI Smart Scheduling Suggestions
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Activity size={16} /> Run Optimizer
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus size={18} /> Create Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SUGGESTIONS.map(suggestion => (
          <div key={suggestion.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-4 hover:bg-zinc-900/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                  <Clock className="text-orange-500" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{suggestion.title}</h3>
                  <p className="text-[10px] font-mono text-zinc-600">{suggestion.id}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                suggestion.status === 'Applied' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                suggestion.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
              }`}>
                {suggestion.status}
              </span>
            </div>
            
            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <p className="text-xs text-zinc-400 leading-relaxed mb-2">{suggestion.description}</p>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                <CheckCircle2 size={12} />
                Impact: {suggestion.impact}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-zinc-900">
              <button className="text-orange-500 hover:underline text-xs flex items-center gap-1">
                Apply Suggestion <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
