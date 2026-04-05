import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  User, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

export default function WorkflowAutomation() {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  const workflows = [
    { 
      id: '1', 
      title: 'EV Bike Work Order Release', 
      status: 'In Progress', 
      progress: 65,
      stages: [
        { name: 'BOM Verification', status: 'Completed', time: '08:00 AM', operator: 'Admin' },
        { name: 'Battery Allocation', status: 'Completed', time: '08:30 AM', operator: 'System' },
        { name: 'Line Assignment (Assembly)', status: 'In Progress', time: '09:00 AM', operator: 'Manager' },
        { name: 'Production Start', status: 'Pending', time: '-', operator: '-' },
      ]
    },
    { 
      id: '2', 
      title: 'EV Bike Quality Gate Approval', 
      status: 'Pending', 
      progress: 25,
      stages: [
        { name: 'Motor Test Complete', status: 'Completed', time: '10:15 AM', operator: 'John Doe' },
        { name: 'Battery Voltage Check', status: 'Pending', time: '-', operator: 'Jane Smith' },
        { name: 'Final QA Approval', status: 'Pending', time: '-', operator: 'Admin' },
        { name: 'Ready for Shipping', status: 'Pending', time: '-', operator: 'System' },
      ]
    }
  ];

  const handleApprove = (workflowId: string, stageName: string) => {
    toast.success(`Stage "${stageName}" approved for workflow ${workflowId}.`, {
      description: 'Workflow automation: Moving to next stage...'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <GitBranch className="text-purple-500" /> Workflow Automation
          </h2>
          <p className="text-sm text-zinc-500">Automated transitions from approval to next stage</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-500 uppercase tracking-widest">
          Automation Active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {workflows.map((workflow) => (
          <motion.div
            key={workflow.id}
            layout
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-6 overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all">
              <Zap size={64} className="text-purple-500" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-zinc-100">{workflow.title}</h3>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> Last update: 10 mins ago</span>
                  <span className="flex items-center gap-1"><User size={12} /> 2 Approvals Pending</span>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex-1 md:w-48 h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${workflow.progress}%` }}
                    className="h-full bg-purple-500"
                  />
                </div>
                <span className="text-xs font-bold text-purple-500">{workflow.progress}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {workflow.stages.map((stage, idx) => (
                <div key={idx} className="relative space-y-3">
                  {idx < workflow.stages.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-full w-full h-px bg-zinc-800 -translate-x-1/2 z-0" />
                  )}
                  
                  <div className={clsx(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 relative transition-all",
                    stage.status === 'Completed' ? "bg-green-500 text-zinc-950" :
                    stage.status === 'In Progress' ? "bg-purple-500 text-zinc-950 animate-pulse" :
                    "bg-zinc-900 text-zinc-600 border border-zinc-800"
                  )}>
                    {stage.status === 'Completed' ? <CheckCircle2 size={18} /> :
                     stage.status === 'In Progress' ? <Play size={18} /> :
                     <Pause size={18} />}
                  </div>

                  <div className="space-y-1">
                    <p className={clsx(
                      "text-sm font-bold",
                      stage.status === 'Completed' ? "text-zinc-100" : 
                      stage.status === 'In Progress' ? "text-purple-400" : "text-zinc-500"
                    )}>
                      {stage.name}
                    </p>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                      {stage.operator}
                    </p>
                  </div>

                  {stage.status === 'In Progress' && (
                    <button 
                      onClick={() => handleApprove(workflow.id, stage.name)}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-zinc-950 font-bold py-2 rounded-xl text-[10px] uppercase tracking-widest transition-all active:scale-95"
                    >
                      Approve & Move
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
