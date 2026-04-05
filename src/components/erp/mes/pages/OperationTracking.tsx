import { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ChevronRight, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText,
  Database,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OperationTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<any>(null);

  const buildHistory = [
    { 
      serial: 'EV-SN-001', 
      product: 'EV Bike Model S',
      operator: 'John Doe (OP-102)',
      timestamp: '2026-04-01 14:22:15',
      status: 'Passed',
      steps: [
        { name: 'Frame Prep', status: 'Passed', time: '14:15:02', data: 'Inspection: OK' },
        { name: 'Fork Installation', status: 'Passed', time: '14:17:45', data: 'Torque: 15Nm' },
        { name: 'Motor Mount', status: 'Passed', time: '14:19:30', data: 'Alignment: OK' },
        { name: 'Battery Placement', status: 'Passed', time: '14:22:10', data: 'Lock engaged' },
      ]
    },
    { 
      serial: 'EV-SN-002', 
      product: 'EV Bike Model X',
      operator: 'Jane Smith (OP-105)',
      timestamp: '2026-04-01 14:45:30',
      status: 'Failed',
      steps: [
        { name: 'Frame Prep', status: 'Passed', time: '14:38:12', data: 'Inspection: OK' },
        { name: 'Fork Installation', status: 'Passed', time: '14:40:55', data: 'Torque: 14.8Nm' },
        { name: 'Motor Mount', status: 'Failed', time: '14:45:20', data: 'Alignment: Deviation 2mm' },
        { name: 'Battery Placement', status: 'Pending', time: '-', data: '-' },
      ]
    },
    { 
      serial: 'EV-SN-003', 
      product: 'EV Bike Model S',
      operator: 'John Doe (OP-102)',
      timestamp: '2026-04-01 15:10:05',
      status: 'Passed',
      steps: [
        { name: 'Frame Prep', status: 'Passed', time: '15:02:10', data: 'Inspection: OK' },
        { name: 'Fork Installation', status: 'Passed', time: '15:05:30', data: 'Torque: 15.1Nm' },
        { name: 'Motor Mount', status: 'Passed', time: '15:08:15', data: 'Alignment: OK' },
        { name: 'Battery Placement', status: 'Passed', time: '15:10:00', data: 'Lock engaged' },
      ]
    },
  ];

  const filteredHistory = buildHistory.filter(h => 
    h.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <History className="text-blue-500" /> End-to-End Traceability
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Complete build history with human + machine data</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search Serial / Operator..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800">
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Unit Serial</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Operator</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Completion</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredHistory.map((unit) => (
                  <tr 
                    key={unit.serial} 
                    onClick={() => setSelectedUnit(unit)}
                    className={clsx(
                      "border-b border-zinc-800/50 cursor-pointer transition-colors",
                      selectedUnit?.serial === unit.serial ? "bg-blue-500/5" : "hover:bg-zinc-800/30"
                    )}
                  >
                    <td className="p-4 font-mono text-zinc-300">{unit.serial}</td>
                    <td className="p-4 text-zinc-400">{unit.operator}</td>
                    <td className="p-4 text-zinc-500 text-xs">{unit.timestamp}</td>
                    <td className="p-4">
                      <span className={clsx(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        unit.status === 'Passed' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      )}>
                        {unit.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-600">
                      <ChevronRight size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedUnit ? (
              <motion.div 
                key={selectedUnit.serial}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-100">Build Details</h3>
                  <button onClick={() => setSelectedUnit(null)} className="text-zinc-500 hover:text-zinc-300">
                    <XCircle size={18} />
                  </button>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3 text-blue-500 mb-2">
                    <FileText size={20} />
                    <span className="font-bold text-zinc-200">{selectedUnit.serial}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Product:</span>
                      <span className="text-zinc-300">{selectedUnit.product}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Operator:</span>
                      <span className="text-zinc-300">{selectedUnit.operator}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Completed:</span>
                      <span className="text-zinc-300">{selectedUnit.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Database size={14} /> Process Steps
                  </h4>
                  <div className="space-y-3">
                    {selectedUnit.steps.map((step: any, idx: number) => (
                      <div key={idx} className="relative pl-6 border-l border-zinc-800 pb-4 last:pb-0">
                        <div className={clsx(
                          "absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full",
                          step.status === 'Passed' ? "bg-green-500" : step.status === 'Failed' ? "bg-rose-500" : "bg-zinc-700"
                        )} />
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-zinc-200">{step.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{step.time}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                          <Cpu size={10} /> {step.data}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2">
                  <FileText size={14} /> Export Build Report (PDF)
                </button>
              </motion.div>
            ) : (
              <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                  <History size={32} />
                </div>
                <p className="text-sm text-zinc-500">Select a unit serial to view its complete build history and traceability data.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

