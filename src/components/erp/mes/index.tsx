import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  List, 
  PlusCircle, 
  GitBranch, 
  Activity, 
  Edit3, 
  BarChart2, 
  RefreshCw, 
  Plus, 
  AlertTriangle, 
  TrendingUp,
  ClipboardCheck,
  Bell,
  Zap,
  Workflow
} from 'lucide-react';
import WorkOrderList from './pages/WorkOrderList';
import CreateWorkOrder from './pages/CreateWorkOrder';
import LineAssignment from './pages/LineAssignment';
import OperationTracking from './pages/OperationTracking';
import ProductionEntry from './pages/ProductionEntry';
import OutputDashboard from './pages/OutputDashboard';
import ReworkScrap from './pages/ReworkScrap';
import ProductionCounts from './pages/ProductionCounts';
import QualityCheck from './pages/QualityCheck';
import TimelineSync from './pages/TimelineSync';
import SmartAlerts from './pages/SmartAlerts';
import WorkflowAutomation from './pages/WorkflowAutomation';
import PredictiveMaintenance from './pages/PredictiveMaintenance';
import ProductWorkflow from './pages/ProductWorkflow';
import GanttChart from './pages/GanttChart';
import WorkOrderModal from './components/WorkOrderModal';
import DowntimeModal from './components/DowntimeModal';

export default function MES() {
  const [activeTab, setActiveTab] = useState('list');
  const [isWOModalOpen, setIsWOModalOpen] = useState(false);
  const [isDowntimeModalOpen, setIsDowntimeModalOpen] = useState(false);

  const tabs = [
    { id: 'list', label: 'Work Order List', icon: List, component: <WorkOrderList /> },
    { id: 'gantt', label: 'Gantt Chart', icon: Activity, component: <GanttChart /> },
    { id: 'counts', label: 'Production Counts', icon: TrendingUp, component: <ProductionCounts /> },
    { id: 'create', label: 'Create / Release', icon: PlusCircle, component: <CreateWorkOrder /> },
    { id: 'line', label: 'Line Assignment', icon: GitBranch, component: <LineAssignment /> },
    { id: 'workflow', label: 'Product Workflow', icon: Workflow, component: <ProductWorkflow /> },
    { id: 'tracking', label: 'Operation Tracking', icon: Activity, component: <OperationTracking /> },
    { id: 'entry', label: 'Production Entry', icon: Edit3, component: <ProductionEntry /> },
    { id: 'quality', label: 'Quality Check', icon: ClipboardCheck, component: <QualityCheck /> },
    { id: 'timeline', label: 'Timeline Sync', icon: Activity, component: <TimelineSync /> },
    { id: 'alerts', label: 'Smart Alerts', icon: Bell, component: <SmartAlerts /> },
    { id: 'automation', label: 'Workflow Automation', icon: Zap, component: <WorkflowAutomation /> },
    { id: 'maintenance', label: 'Predictive Maintenance', icon: TrendingUp, component: <PredictiveMaintenance /> },
    { id: 'dashboard', label: 'Output vs Target', icon: BarChart2, component: <OutputDashboard /> },
    { id: 'rework', label: 'Rework / Scrap', icon: RefreshCw, component: <ReworkScrap /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Production Execution (MES Core)</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDowntimeModalOpen(true)}
            className="bg-zinc-800 hover:bg-zinc-700 text-yellow-500 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 border border-yellow-500/20 active:scale-95 transition-all"
          >
            <AlertTriangle size={18} /> Log Downtime
          </button>
          <button 
            onClick={() => setIsWOModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            <Plus size={20} /> Create Work Order
          </button>
        </div>
      </div>
      
      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl min-h-[500px] shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find(tab => tab.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </div>

      <WorkOrderModal 
        isOpen={isWOModalOpen} 
        onClose={() => setIsWOModalOpen(false)} 
      />

      <DowntimeModal 
        isOpen={isDowntimeModalOpen} 
        onClose={() => setIsDowntimeModalOpen(false)} 
      />
    </div>
  );
}

