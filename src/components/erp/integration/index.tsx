import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Network, Cpu, Database, Share2, History, Monitor, Activity } from 'lucide-react';
import PLCConfig from './pages/PLCConfig';
import LabVIEWDataSync from './pages/LabVIEWDataSync';
import GatewayConfig from './pages/GatewayConfig';
import APILogs from './pages/APILogs';
import DeviceMapping from './pages/DeviceMapping';
import SCADADashboard from './pages/SCADADashboard';

export default function Integration() {
  const [activeTab, setActiveTab] = useState('scada');

  const tabs = [
    { id: 'scada', label: 'SCADA Dashboard', icon: Activity, component: <SCADADashboard /> },
    { id: 'plc', label: 'PLC Config', icon: Cpu, component: <PLCConfig /> },
    { id: 'labview', label: 'LabVIEW Sync', icon: Database, component: <LabVIEWDataSync /> },
    { id: 'gateway', label: 'Gateways', icon: Share2, component: <GatewayConfig /> },
    { id: 'mapping', label: 'Device Mapping', icon: Monitor, component: <DeviceMapping /> },
    { id: 'logs', label: 'API Logs', icon: History, component: <APILogs /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
          <Network className="text-orange-500" size={32} /> Integration Layer
        </h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

