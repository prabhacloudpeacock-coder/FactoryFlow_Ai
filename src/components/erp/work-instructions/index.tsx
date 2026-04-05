import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Scan, 
  Keyboard, 
  ClipboardCheck, 
  Camera, 
  History, 
  User, 
  Clock, 
  Box,
  ArrowRight,
  Maximize2,
  Info,
  Check,
  X,
  RotateCcw,
  Settings
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';

interface Step {
  id: string;
  name: string;
  description: string;
  image?: string;
  actions: Action[];
}

interface Action {
  id: string;
  type: 'scan' | 'manual' | 'quality';
  label: string;
  required: boolean;
  value?: any;
  completed?: boolean;
  config?: any;
}

const MOCK_WORKFLOW = {
  id: 'wf1',
  productName: 'Battery Pack Assembly',
  sku: 'BP-2024-001',
  steps: [
    {
      id: 'step1',
      name: 'Scan Battery Module',
      description: 'Scan the unique serial number on the battery module before placing it in the enclosure.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000',
      actions: [
        { id: 'a1', type: 'scan', label: 'Scan Module Serial', required: true, config: { placeholder: 'BATT-XXXX-XXXX' } }
      ]
    },
    {
      id: 'step2',
      name: 'Apply Thermal Paste',
      description: 'Apply a thin layer of thermal paste (approx. 2mm) to the base of the module.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
      actions: [
        { id: 'a2', type: 'quality', label: 'Paste Applied Evenly?', required: true }
      ]
    },
    {
      id: 'step3',
      name: 'Secure Module',
      description: 'Place the module in the enclosure and secure with 4x M5 screws. Torque to 5.5Nm.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
      actions: [
        { id: 'a3', type: 'manual', label: 'Enter Torque Value (Nm)', required: true, config: { min: 5.0, max: 6.0 } },
        { id: 'a4', type: 'quality', label: 'Screws Seated Correctly?', required: true }
      ]
    },
    {
      id: 'step4',
      name: 'Final Inspection',
      description: 'Perform a visual inspection of all connections and ensure no debris is present.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
      actions: [
        { id: 'a5', type: 'quality', label: 'Visual Inspection Passed?', required: true }
      ]
    }
  ]
};

export default function WorkInstructions() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [actionValues, setActionValues] = useState<Record<string, any>>({});
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentStep = MOCK_WORKFLOW.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / MOCK_WORKFLOW.steps.length) * 100;

  useEffect(() => {
    let interval: any;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - (startTime || Date.now())) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    toast.info('Work instruction started');
  };

  const handleActionComplete = (actionId: string, value: any) => {
    setActionValues(prev => ({ ...prev, [actionId]: value }));
  };

  const canMoveToNext = () => {
    return currentStep.actions.every(action => {
      if (!action.required) return true;
      const val = actionValues[action.id];
      if (action.type === 'quality') return val === true;
      return val !== undefined && val !== '';
    });
  };

  const handleNext = () => {
    if (!canMoveToNext()) {
      toast.error('Please complete all required actions correctly');
      return;
    }

    if (currentStepIndex < MOCK_WORKFLOW.steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsFinished(true);
      toast.success('Workflow completed successfully!');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setActionValues({});
    setIsStarted(false);
    setIsFinished(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  if (!isStarted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden"
        >
          <div className="p-12 text-center space-y-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play size={40} className="text-blue-500 ml-2" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">{MOCK_WORKFLOW.productName}</h1>
              <p className="text-zinc-500 font-medium">SKU: {MOCK_WORKFLOW.sku} • {MOCK_WORKFLOW.steps.length} Steps</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-zinc-100">
              <div className="text-center">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Estimated Time</p>
                <p className="text-lg font-bold text-zinc-800">12:00</p>
              </div>
              <div className="text-center border-x border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Difficulty</p>
                <p className="text-lg font-bold text-zinc-800">Medium</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Tools Required</p>
                <p className="text-lg font-bold text-zinc-800">4 Items</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={handleStart}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Start Instructions
                <ArrowRight size={20} />
              </button>
              <button className="w-full py-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 rounded-2xl font-bold transition-all">
                View Prerequisites
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden"
        >
          <div className="p-12 text-center space-y-8">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Assembly Complete</h1>
              <p className="text-zinc-500 font-medium">All steps for {MOCK_WORKFLOW.productName} finished successfully.</p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 grid grid-cols-2 gap-8">
              <div className="text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Time</p>
                <p className="text-2xl font-bold text-zinc-800">{formatTime(elapsedTime)}</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Actions Recorded</p>
                <p className="text-2xl font-bold text-zinc-800">{Object.keys(actionValues).length}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={handleReset}
                className="w-full py-4 bg-zinc-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95"
              >
                Submit Report & Close
              </button>
              <button 
                onClick={handleReset}
                className="w-full py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Start New Unit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Box size={20} className="text-blue-500" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-900">{MOCK_WORKFLOW.productName}</h2>
            <p className="text-xs text-zinc-500 font-medium">{MOCK_WORKFLOW.sku}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-zinc-400" />
            <span className="text-sm font-mono font-bold text-zinc-700">{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-zinc-400" />
            <span className="text-sm font-bold text-zinc-700">Operator: John Doe</span>
          </div>
          <button onClick={handleReset} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-zinc-100 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
        <div className="absolute inset-0 flex">
          {MOCK_WORKFLOW.steps.map((_, i) => (
            <div key={i} className="flex-1 border-r border-white/20 last:border-0" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Instruction Area */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-zinc-100 overflow-hidden"
          >
            {/* Step Image */}
            <div className="relative h-[400px] bg-zinc-100 group">
              <img 
                src={currentStep.image} 
                alt={currentStep.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    Step {currentStepIndex + 1} of {MOCK_WORKFLOW.steps.length}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{currentStep.name}</h1>
              </div>
              <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-xl transition-all">
                <Maximize2 size={20} />
              </button>
            </div>

            {/* Step Content */}
            <div className="p-8 space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Info size={24} className="text-blue-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-zinc-900 text-lg">Instructions</h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    {currentStep.description}
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Required Actions</h3>
                <div className="grid grid-cols-1 gap-4">
                  {currentStep.actions.map((action) => (
                    <div 
                      key={action.id}
                      className={clsx(
                        "p-6 rounded-2xl border-2 transition-all flex items-center justify-between",
                        actionValues[action.id] !== undefined
                          ? "bg-green-50 border-green-200"
                          : "bg-zinc-50 border-zinc-100"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={clsx(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          actionValues[action.id] !== undefined ? "bg-green-500 text-white" : "bg-white text-zinc-400 shadow-sm"
                        )}>
                          {action.type === 'scan' && <Scan size={24} />}
                          {action.type === 'manual' && <Keyboard size={24} />}
                          {action.type === 'quality' && <ClipboardCheck size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{action.label}</p>
                          <p className="text-xs text-zinc-500">
                            {actionValues[action.id] !== undefined 
                              ? `Value: ${actionValues[action.id] === true ? 'Passed' : actionValues[action.id]}`
                              : 'Pending completion'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {action.type === 'quality' ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleActionComplete(action.id, false)}
                              className={clsx(
                                "px-4 py-2 rounded-lg font-bold text-sm transition-all",
                                actionValues[action.id] === false 
                                  ? "bg-red-500 text-white" 
                                  : "bg-white text-red-500 border border-red-200 hover:bg-red-50"
                              )}
                            >
                              Fail
                            </button>
                            <button 
                              onClick={() => handleActionComplete(action.id, true)}
                              className={clsx(
                                "px-4 py-2 rounded-lg font-bold text-sm transition-all",
                                actionValues[action.id] === true 
                                  ? "bg-green-500 text-white" 
                                  : "bg-white text-green-500 border border-green-200 hover:bg-green-50"
                              )}
                            >
                              Pass
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <input 
                              type="text"
                              placeholder={action.config?.placeholder || "Enter value..."}
                              value={actionValues[action.id] || ''}
                              onChange={(e) => handleActionComplete(action.id, e.target.value)}
                              className="bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                            />
                            {actionValues[action.id] && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                <Check size={16} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
              <button 
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 px-6 py-3 text-zinc-500 font-bold hover:text-zinc-800 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
                Previous Step
              </button>
              <button 
                onClick={handleNext}
                className={clsx(
                  "flex items-center gap-2 px-10 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95",
                  canMoveToNext() 
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20" 
                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                )}
              >
                {currentStepIndex === MOCK_WORKFLOW.steps.length - 1 ? 'Finish Assembly' : 'Next Step'}
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Overview */}
          <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-6 space-y-6">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Workflow Overview</h3>
            <div className="space-y-4">
              {MOCK_WORKFLOW.steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold",
                    index < currentStepIndex ? "bg-green-500 text-white" :
                    index === currentStepIndex ? "bg-blue-500 text-white" :
                    "bg-zinc-100 text-zinc-400"
                  )}>
                    {index < currentStepIndex ? <Check size={12} /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={clsx(
                      "text-sm font-bold",
                      index === currentStepIndex ? "text-zinc-900" : "text-zinc-500"
                    )}>
                      {step.name}
                    </p>
                    {index === currentStepIndex && (
                      <p className="text-[10px] text-blue-500 font-bold uppercase mt-0.5">Current Step</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Safety */}
          <div className="bg-zinc-900 rounded-3xl shadow-xl p-6 space-y-6 text-white">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Safety & Tools</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <AlertCircle size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">Wear ESD Strap</p>
                  <p className="text-[10px] text-zinc-500">Required for all module handling</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Settings size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold">Torque Wrench (5.5Nm)</p>
                  <p className="text-[10px] text-zinc-500">Calibrated within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* History/Logs */}
          <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recent Activity</h3>
              <History size={14} className="text-zinc-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span className="font-bold text-zinc-400">10:24:01</span>
                <span>Module BATT-9928 scanned</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span className="font-bold text-zinc-400">10:23:45</span>
                <span>Started Step 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
