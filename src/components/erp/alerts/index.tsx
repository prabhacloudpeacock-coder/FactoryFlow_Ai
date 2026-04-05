import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Bell, ShieldAlert, History, AlertTriangle, MessageSquare } from 'lucide-react';
import ActiveAlerts from './pages/ActiveAlerts';
import EscalationMatrix from './pages/EscalationMatrix';
import NotificationLogs from './pages/NotificationLogs';

export default function Alerts() {
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active Alerts', icon: Bell, component: <ActiveAlerts /> },
    { id: 'matrix', label: 'Escalation Matrix', icon: ShieldAlert, component: <EscalationMatrix /> },
    { id: 'logs', label: 'Notification Logs', icon: History, component: <NotificationLogs /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Alerts & Escalation</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

