import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Users, DollarSign, Briefcase, Star, Plus, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Payroll from './pages/Payroll';
import Recruitment from './pages/Recruitment';
import Performance from './pages/Performance';
import HRModal from './components/HRModal';
import { cn } from '../../../lib/utils';

const tabs = [
  { id: 'directory', label: 'Employee Directory', icon: Users, component: <EmployeeDirectory /> },
  { id: 'payroll', label: 'Payroll', icon: DollarSign, component: <Payroll /> },
  { id: 'recruitment', label: 'Recruitment', icon: Briefcase, component: <Recruitment /> },
  { id: 'performance', label: 'Performance', icon: Star, component: <Performance /> },
];

export default function HRManagement() {
  const [activeTab, setActiveTab] = useState('directory');
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; type: 'directory' | 'payroll' | 'recruitment' | 'performance' }>({
    isOpen: false,
    type: 'directory'
  });

  const openModal = (type: 'directory' | 'payroll' | 'recruitment' | 'performance') => {
    setModalConfig({ isOpen: true, type });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">HR Management</h1>
          <p className="text-zinc-500 mt-1">Manage your workforce, payroll, and talent acquisition.</p>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'directory' && (
            <button 
              onClick={() => openModal('directory')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20"
            >
              <Plus size={18} />
              Add Employee
            </button>
          )}
          {activeTab === 'payroll' && (
            <button 
              onClick={() => openModal('payroll')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20"
            >
              <Plus size={18} />
              Process Payroll
            </button>
          )}
          {activeTab === 'recruitment' && (
            <button 
              onClick={() => openModal('recruitment')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20"
            >
              <Plus size={18} />
              Post Job
            </button>
          )}
          {activeTab === 'performance' && (
            <button 
              onClick={() => openModal('performance')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20"
            >
              <Plus size={18} />
              New Review Cycle
            </button>
          )}
        </div>
      </div>

      <HRModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        type={modalConfig.type}
      />

      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[600px]"
      >
        {tabs.find(tab => tab.id === activeTab)?.component}
      </motion.div>
    </div>
  );
}
