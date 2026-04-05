import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Activity, Clock, AlertCircle, TrendingUp, BarChart3, Settings } from 'lucide-react';
import OEEDashboard from './pages/OEEDashboard';
import DowntimeLogs from './pages/DowntimeLogs';
import LossAnalysis from './pages/LossAnalysis';
import EfficiencyTrends from './pages/EfficiencyTrends';

export default function OEE() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'OEE Dashboard', icon: Activity, component: <OEEDashboard /> },
    { id: 'downtime', label: 'Downtime Logs', icon: Clock, component: <DowntimeLogs /> },
    { id: 'loss', label: 'Loss Analysis', icon: AlertCircle, component: <LossAnalysis /> },
    { id: 'trends', label: 'Efficiency Trends', icon: TrendingUp, component: <EfficiencyTrends /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Downtime & OEE Management</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

