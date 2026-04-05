import { AlertTriangle, Clock, Activity, ChevronRight, CheckCircle2 } from 'lucide-react';

const PREDICTIVE_ALERTS = [
  { id: 'PM-001', machine: 'CNC Mill #4', component: 'Spindle Motor', probability: '92%', timeToFailure: '48 Hours', status: 'Critical', recommendation: 'Replace bearings and check lubrication levels immediately.' },
  { id: 'PM-002', machine: 'Casting Machine #1', component: 'Hydraulic Pump', probability: '75%', timeToFailure: '5 Days', status: 'Warning', recommendation: 'Schedule hydraulic fluid change and seal inspection.' },
  { id: 'PM-003', machine: 'Welding Robot #2', component: 'Servo Drive', probability: '60%', timeToFailure: '12 Days', status: 'Monitor', recommendation: 'Monitor vibration levels and heat dissipation.' },
  { id: 'PM-004', machine: 'Press Machine #3', component: 'Main Gearbox', probability: '45%', timeToFailure: '18 Days', status: 'Monitor', recommendation: 'Routine inspection during next scheduled downtime.' },
];

export default function PredictiveMaintenance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="text-orange-500" /> AI Predictive Maintenance
        </h2>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm">
            Analysis Settings
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm">
            Run Full Diagnostics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {PREDICTIVE_ALERTS.map(alert => (
          <div key={alert.id} className={`bg-zinc-950 border rounded-xl overflow-hidden p-4 transition-all hover:bg-zinc-900/50 ${
            alert.status === 'Critical' ? 'border-red-500/30' : 
            alert.status === 'Warning' ? 'border-orange-500/30' : 
            'border-zinc-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert.status === 'Critical' ? 'bg-red-500/10 text-red-500' :
                  alert.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{alert.machine} - {alert.component}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-zinc-500 font-mono">{alert.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      alert.status === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      alert.status === 'Warning' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 mb-1">Failure Probability</p>
                <p className={`text-xl font-bold ${
                  alert.status === 'Critical' ? 'text-red-500' : 'text-orange-500'
                }`}>{alert.probability}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Clock size={12} />
                  <span className="text-[10px] uppercase font-bold">Estimated Time To Failure</span>
                </div>
                <p className="text-sm font-bold text-zinc-200">{alert.timeToFailure}</p>
              </div>
              <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <CheckCircle2 size={12} />
                  <span className="text-[10px] uppercase font-bold">AI Recommendation</span>
                </div>
                <p className="text-sm text-zinc-400 leading-tight">{alert.recommendation}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-end">
              <button className="text-orange-500 hover:underline text-xs flex items-center gap-1">
                Create Maintenance Work Order <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
