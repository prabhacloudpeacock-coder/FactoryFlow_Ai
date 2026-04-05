import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { BarChart2, Settings, ShieldCheck, Clock, Users, FileText, TrendingUp } from 'lucide-react';
import ProductionReports from './pages/ProductionReports';
import MachineUtilization from './pages/MachineUtilization';
import QualityReports from './pages/QualityReports';
import DowntimeReports from './pages/DowntimeReports';
import OperatorPerformance from './pages/OperatorPerformance';
import CustomReports from './pages/CustomReports';
import SalesReports from './pages/SalesReports';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('production');

  const tabs = [
    { id: 'production', label: 'Production', icon: BarChart2, component: <ProductionReports /> },
    { id: 'quality', label: 'Quality', icon: ShieldCheck, component: <QualityReports /> },
    { id: 'sales', label: 'Sales', icon: TrendingUp, component: <SalesReports /> },
    { id: 'utilization', label: 'Utilization', icon: Settings, component: <MachineUtilization /> },
    { id: 'downtime', label: 'Downtime', icon: Clock, component: <DowntimeReports /> },
    { id: 'workforce', label: 'Workforce', icon: Users, component: <OperatorPerformance /> },
    { id: 'custom', label: 'Custom', icon: FileText, component: <CustomReports /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Reports & Analytics</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

