import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Wrench, Calendar, History, Package, Settings, AlertTriangle } from 'lucide-react';
import MaintenanceSchedule from './pages/Schedule';
import WorkOrders from './pages/WorkOrders';
import MachineHistory from './pages/MachineHistory';
import SpareParts from './pages/SpareParts';

export default function Maintenance() {
  const [activeTab, setActiveTab] = useState('workorders');

  const tabs = [
    { id: 'workorders', label: 'Work Orders', icon: Wrench, component: <WorkOrders /> },
    { id: 'schedule', label: 'PM Schedule', icon: Calendar, component: <MaintenanceSchedule /> },
    { id: 'history', label: 'Machine History', icon: History, component: <MachineHistory /> },
    { id: 'spareparts', label: 'Spare Parts', icon: Package, component: <SpareParts /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Maintenance Management</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

