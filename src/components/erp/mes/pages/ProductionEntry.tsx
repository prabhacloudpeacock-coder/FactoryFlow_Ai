import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ChevronRight, 
  User, 
  QrCode, 
  ClipboardList, 
  AlertTriangle, 
  ArrowLeft,
  Settings,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProductionEntry() {
  const [step, setStep] = useState(1);
  const [operatorId, setOperatorId] = useState('');
  const [workOrderId, setWorkOrderId] = useState('');
  const [scannedComponent, setScannedComponent] = useState('');
  const [currentInstruction, setCurrentInstruction] = useState(0);

  const instructions = [
    { title: 'Frame Prep', detail: 'Inspect the EV bike frame for any defects or scratches before assembly.', check: 'Visual inspection complete' },
    { title: 'Fork Installation', detail: 'Install the front fork and secure the headset bearings.', check: 'Fork secured' },
    { title: 'Motor Mount', detail: 'Mount the electric motor to the rear hub and connect the primary phase wires.', check: 'Motor mounted' },
    { title: 'Battery Placement', detail: 'Carefully slide the battery pack into the down tube and lock it.', check: 'Battery locked' },
  ];

  const handleNextStep = () => {
    if (step === 1 && !operatorId) {
      toast.error('Please enter or scan Operator ID');
      return;
    }
    if (step === 2 && !workOrderId) {
      toast.error('Please select a Work Order');
      return;
    }
    setStep(step + 1);
  };

  const handleComponentScan = () => {
    if (scannedComponent.length > 5) {
      toast.success('Component verified (Poka-yoke check passed)');
      setStep(4);
    } else {
      toast.error('Invalid component barcode. Please try again.');
    }
  };

  const handleComplete = () => {
    toast.success('Production entry submitted successfully', {
      description: `WO: ${workOrderId} | Operator: ${operatorId} | Status: Completed`
    });
    setStep(1);
    setOperatorId('');
    setWorkOrderId('');
    setScannedComponent('');
    setCurrentInstruction(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Production Execution</h2>
          <p className="text-sm text-zinc-500">Guided assembly and real-time data entry</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                step === s ? "bg-orange-500 text-zinc-950 scale-110" : 
                step > s ? "bg-green-500/20 text-green-500 border border-green-500/30" : 
                "bg-zinc-800 text-zinc-500 border border-zinc-700"
              )}
            >
              {step > s ? <CheckCircle2 size={14} /> : s}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-4 text-orange-500 mb-2">
              <User size={32} />
              <h3 className="text-xl font-bold text-zinc-100">Operator Identification</h3>
            </div>
            <p className="text-zinc-400">Scan your employee badge or enter your ID to begin the shift.</p>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input 
                type="text" 
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder="Enter Operator ID..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
            <button 
              onClick={handleNextStep}
              className="w-full bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg transition-all active:scale-95"
            >
              Continue <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center gap-4 text-blue-500 mb-2">
              <ClipboardList size={32} />
              <h3 className="text-xl font-bold text-zinc-100">Select Work Order</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['WO-EV-001', 'WO-EV-002', 'WO-EV-003'].map((wo) => (
                <button 
                  key={wo}
                  onClick={() => setWorkOrderId(wo)}
                  className={clsx(
                    "p-6 rounded-2xl border text-left transition-all group",
                    workOrderId === wo ? "bg-blue-500/10 border-blue-500" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-zinc-100">{wo}</span>
                    <div className={clsx(
                      "w-4 h-4 rounded-full border-2",
                      workOrderId === wo ? "bg-blue-500 border-blue-500" : "border-zinc-700"
                    )} />
                  </div>
                  <p className="text-xs text-zinc-500">Product: {wo === 'WO-EV-002' ? 'EV Bike Model X' : 'EV Bike Model S'}</p>
                  <p className="text-xs text-zinc-500">Target: {wo === 'WO-EV-002' ? '25' : '50'} Units</p>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-4 rounded-2xl transition-all">Back</button>
              <button onClick={handleNextStep} className="flex-[2] bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-4 rounded-2xl transition-all">Start Assembly</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4 text-yellow-500">
                <QrCode size={32} />
                <h3 className="text-xl font-bold text-zinc-100">Component Verification (Poka-yoke)</h3>
              </div>
              <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                Error Proofing Active
              </div>
            </div>
            <p className="text-zinc-400">Scan the barcode on the main PCB to ensure correct component matching for <span className="text-zinc-100 font-bold">{workOrderId}</span>.</p>
            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
              <div className="w-48 h-48 border-2 border-dashed border-zinc-700 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:border-orange-500/50 group-hover:text-orange-500 transition-all">
                <QrCode size={64} />
              </div>
              <p className="text-sm text-zinc-500 font-mono">Awaiting Scan...</p>
            </div>
            <div className="relative">
              <input 
                type="text" 
                value={scannedComponent}
                onChange={(e) => setScannedComponent(e.target.value)}
                placeholder="Scan or enter component serial..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-4 text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleComponentScan()}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-4 rounded-2xl transition-all">Back</button>
              <button onClick={handleComponentScan} className="flex-[2] bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-4 rounded-2xl transition-all">Verify Component</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-green-500">
                    <ShieldCheck size={32} />
                    <h3 className="text-xl font-bold text-zinc-100">Worker Guidance</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Step {currentInstruction + 1} of {instructions.length}</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-zinc-100">{instructions[currentInstruction].title}</h4>
                  <p className="text-zinc-400 text-lg leading-relaxed">{instructions[currentInstruction].detail}</p>
                </div>

                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-green-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-zinc-700 flex items-center justify-center group-hover:border-green-500 transition-all">
                      <CheckCircle2 size={14} className="text-transparent group-hover:text-green-500" />
                    </div>
                    <span className="text-zinc-300 font-medium">{instructions[currentInstruction].check}</span>
                  </div>
                  <Zap size={18} className="text-zinc-700 group-hover:text-yellow-500 transition-all" />
                </div>

                <div className="flex gap-4">
                  <button 
                    disabled={currentInstruction === 0}
                    onClick={() => setCurrentInstruction(curr => curr - 1)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 font-bold py-4 rounded-2xl transition-all"
                  >
                    Previous
                  </button>
                  {currentInstruction < instructions.length - 1 ? (
                    <button 
                      onClick={() => setCurrentInstruction(curr => curr + 1)}
                      className="flex-[2] bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-4 rounded-2xl transition-all"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button 
                      onClick={handleComplete}
                      className="flex-[2] bg-green-500 hover:bg-green-600 text-zinc-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20"
                    >
                      Complete Assembly
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Build Context</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Work Order:</span>
                    <span className="text-zinc-300 font-mono">{workOrderId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Operator:</span>
                    <span className="text-zinc-300">{operatorId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Component:</span>
                    <span className="text-zinc-300 font-mono text-[10px]">{scannedComponent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Station:</span>
                    <span className="text-zinc-300">ASSY-04</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Safety Alerts</h4>
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-3">
                  <AlertTriangle className="text-rose-500 shrink-0" size={18} />
                  <p className="text-xs text-rose-200/70 leading-relaxed">Ensure ESD wrist strap is connected before handling the PCB.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

