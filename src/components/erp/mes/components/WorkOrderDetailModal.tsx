import { motion, AnimatePresence } from 'framer-motion';
import { X, ClipboardCheck, GitMerge, FileText, Clock, CheckCircle2, AlertCircle, Settings } from 'lucide-react';

interface WorkOrder {
  id: string;
  product: string;
  status: string;
  qty: number;
  supervisor?: string;
}

interface WorkOrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workOrder: WorkOrder | null;
}

export default function WorkOrderDetailModal({ isOpen, onClose, workOrder }: WorkOrderDetailModalProps) {
  if (!workOrder) return null;

  const qualityParams = [
    { name: 'Motor Torque', value: '±0.5 Nm', status: 'Passed' },
    { name: 'Battery Voltage', value: '60.2V', status: 'Passed' },
    { name: 'Frame Alignment', value: '0.1 deg', status: 'Pending' },
    { name: 'Brake Tension', value: '150 N', status: 'Passed' },
  ];

  const routingSteps = [
    { step: 1, name: 'Frame Preparation', status: 'Completed', time: '2026-03-31 08:00' },
    { step: 2, name: 'Motor Installation', status: 'Completed', time: '2026-03-31 09:30' },
    { step: 3, name: 'Battery Mounting', status: 'In Progress', time: '2026-03-31 11:00' },
    { step: 4, name: 'Quality Inspection', status: 'Pending', time: '-' },
    { step: 5, name: 'Packaging & Labeling', status: 'Pending', time: '-' },
  ];

  const productionLogs = [
    { time: '11:15 AM', event: 'Operator J. Smith started Battery Mounting', type: 'info' },
    { time: '10:45 AM', event: 'Motor Installation completed successfully', type: 'success' },
    { time: '10:15 AM', event: 'Torque wrench calibration required', type: 'warning' },
    { time: '09:30 AM', event: 'Frame batch #F-2026-X loaded', type: 'info' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Settings className="text-orange-500" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">{workOrder.id}</h2>
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase rounded-full border border-zinc-700">
                      {workOrder.status || 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium">
                    {workOrder.product} • Target: {workOrder.qty} Units • Supervisor: <span className="text-zinc-300">{workOrder.supervisor || 'Unassigned'}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Quality Parameters */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <ClipboardCheck size={14} className="text-orange-500" /> Quality Parameters
                  </h3>
                  <div className="space-y-2">
                    {qualityParams.map((param, i) => (
                      <div key={i} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase">{param.name}</p>
                          <p className="text-sm font-mono text-zinc-200">{param.value}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          param.status === 'Passed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {param.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Routing Steps */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <GitMerge size={14} className="text-orange-500" /> Routing & Workflow
                  </h3>
                  <div className="space-y-3 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-800">
                    {routingSteps.map((step, i) => (
                      <div key={i} className="relative pl-10">
                        <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
                          step.status === 'Completed' ? 'bg-green-500 border-green-500 text-zinc-950' :
                          step.status === 'In Progress' ? 'bg-zinc-900 border-orange-500 text-orange-500' :
                          'bg-zinc-900 border-zinc-800 text-zinc-600'
                        }`}>
                          {step.status === 'Completed' ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{step.step}</span>}
                        </div>
                        <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl">
                          <p className="text-sm font-bold text-zinc-200">{step.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-zinc-500 font-mono">{step.time}</span>
                            <span className={`text-[10px] font-bold uppercase ${
                              step.status === 'Completed' ? 'text-green-500' :
                              step.status === 'In Progress' ? 'text-orange-500' :
                              'text-zinc-600'
                            }`}>
                              {step.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production Logs */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} className="text-orange-500" /> Recent Activity Logs
                  </h3>
                  <div className="space-y-3">
                    {productionLogs.map((log, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="shrink-0 mt-1">
                          {log.type === 'success' ? <CheckCircle2 size={14} className="text-green-500" /> :
                           log.type === 'warning' ? <AlertCircle size={14} className="text-yellow-500" /> :
                           <Clock size={14} className="text-blue-500" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-300 leading-relaxed">{log.event}</p>
                          <p className="text-[10px] text-zinc-600 font-mono">{log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2 text-[10px] font-bold uppercase text-zinc-500 hover:text-zinc-300 transition-colors border border-zinc-800 rounded-lg hover:bg-zinc-800">
                    View Full Audit Trail
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-8 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold rounded-xl transition-all"
              >
                Close View
              </button>
              <button className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all">
                Print Job Card
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
