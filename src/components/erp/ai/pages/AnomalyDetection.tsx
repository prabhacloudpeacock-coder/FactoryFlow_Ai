import { Activity, AlertTriangle, Search, ChevronRight, Clock, ShieldAlert } from 'lucide-react';

const ANOMALIES = [
  { id: 'AN-001', machine: 'CNC Mill #4', type: 'Vibration', severity: 'Critical', time: '10 min ago', description: 'Unusual vibration pattern detected in the main spindle, exceeding normal operating range by 25%.' },
  { id: 'AN-002', machine: 'Casting Machine #1', type: 'Temperature', severity: 'Warning', time: '45 min ago', description: 'Cooling system temperature spike detected, 15°C above baseline for current production cycle.' },
  { id: 'AN-003', machine: 'Welding Robot #2', type: 'Power Consumption', severity: 'Monitor', time: '2 hours ago', description: 'Irregular power consumption spikes during welding cycles, possible motor controller issue.' },
  { id: 'AN-004', machine: 'Assembly Line #1', type: 'Cycle Time', severity: 'Warning', time: '4 hours ago', description: 'Cycle time increased by 12% on station #3 without corresponding change in product type.' },
];

export default function AnomalyDetection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldAlert className="text-orange-500" /> AI Anomaly Detection
        </h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input 
            type="text" 
            placeholder="Search anomalies..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ANOMALIES.map(anomaly => (
          <div key={anomaly.id} className={`bg-zinc-950 border rounded-xl overflow-hidden p-4 transition-all hover:bg-zinc-900/50 ${
            anomaly.severity === 'Critical' ? 'border-red-500/30' : 
            anomaly.severity === 'Warning' ? 'border-orange-500/30' : 
            'border-zinc-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  anomaly.severity === 'Critical' ? 'bg-red-500/10 text-red-500' :
                  anomaly.severity === 'Warning' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{anomaly.machine} - {anomaly.type} Anomaly</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-zinc-500 font-mono">{anomaly.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      anomaly.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      anomaly.severity === 'Warning' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {anomaly.severity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                  <Clock size={10} />
                  {anomaly.time}
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50 flex items-center justify-between">
              <p className="text-sm text-zinc-300 leading-relaxed">{anomaly.description}</p>
              <button className="text-orange-500 hover:underline flex items-center gap-1 text-xs shrink-0 ml-4">
                View Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
