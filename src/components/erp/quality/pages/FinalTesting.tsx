import { useState } from 'react';
import { CheckCircle2, XCircle, Activity, Battery, Zap, Settings } from 'lucide-react';
import { clsx } from 'clsx';

const EOL_TESTS = [
  {
    id: 'TEST-2026-001',
    product: 'EV Bike Model S',
    serialNumber: 'SN-EVS-2026-8842',
    type: 'Full Bike',
    tests: [
      { name: 'Battery Range Simulation', status: 'Passed', value: '122 km' },
      { name: 'Motor Torque Output', status: 'Passed', value: '85 Nm' },
      { name: 'Brake Stress Test', status: 'Passed', value: '0.8g deceleration' },
      { name: 'Electrical Systems', status: 'Passed', value: 'Nominal' }
    ],
    overallStatus: 'Passed',
    inspector: 'John Smith',
    date: '2026-04-05 10:30 AM'
  },
  {
    id: 'TEST-2026-002',
    product: '750W Hub Motor',
    serialNumber: 'SN-MOT-2026-1102',
    type: 'Part',
    tests: [
      { name: 'Coil Resistance', status: 'Passed', value: '0.15 Ohms' },
      { name: 'No-Load RPM', status: 'Passed', value: '320 RPM' },
      { name: 'Heat Dissipation', status: 'Failed', value: '85°C (Limit 80°C)' }
    ],
    overallStatus: 'Failed',
    inspector: 'Sarah Connor',
    date: '2026-04-05 11:15 AM'
  },
  {
    id: 'TEST-2026-003',
    product: 'EV Bike Cargo Pro',
    serialNumber: 'SN-EVC-2026-3391',
    type: 'Full Bike',
    tests: [
      { name: 'Battery Range Simulation', status: 'Pending', value: '-' },
      { name: 'Motor Torque Output', status: 'Pending', value: '-' },
      { name: 'Brake Stress Test', status: 'Pending', value: '-' },
      { name: 'Electrical Systems', status: 'Pending', value: '-' }
    ],
    overallStatus: 'In Progress',
    inspector: 'Mike Johnson',
    date: '2026-04-05 11:45 AM'
  }
];

export default function FinalTesting() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Activity className="text-orange-500" size={20} /> End-of-Line (EOL) Testing
          </h2>
          <p className="text-sm text-zinc-500">Final validation for complete EV bikes and individual parts before sales.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {EOL_TESTS.map((test) => (
          <div key={test.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-zinc-100">{test.product}</h3>
                <p className="text-xs text-zinc-500 font-mono mt-1">{test.serialNumber}</p>
              </div>
              <div className={clsx(
                "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border",
                test.overallStatus === 'Passed' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                test.overallStatus === 'Failed' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                "bg-blue-500/10 text-blue-500 border-blue-500/20"
              )}>
                {test.overallStatus}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                {test.type}
              </span>
              <span className="text-[10px] text-zinc-500">{test.date}</span>
            </div>

            <div className="space-y-3 flex-1 mb-6">
              {test.tests.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {t.status === 'Passed' ? <CheckCircle2 size={14} className="text-green-500" /> :
                     t.status === 'Failed' ? <XCircle size={14} className="text-red-500" /> :
                     <Activity size={14} className="text-blue-500 animate-pulse" />}
                    <span className="text-zinc-300">{t.name}</span>
                  </div>
                  <span className="text-zinc-500 font-mono text-xs">{t.value}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-sm font-bold rounded-xl transition-colors border border-zinc-800">
              View Full Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
