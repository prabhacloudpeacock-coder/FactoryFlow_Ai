import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Activity, Zap, Monitor, Wifi, FileText, Clock, BarChart3, Cpu, Waves, Car, Plug, Database } from 'lucide-react';
import MachineStatus from './pages/MachineStatus';
import PLCData from './pages/PLCData';
import LabVIEWInterface from './pages/LabVIEWInterface';
import ConnectivityStatus from './pages/ConnectivityStatus';
import SignalLogs from './pages/SignalLogs';
import CycleTime from './pages/CycleTime';
import AutoProductionCount from './pages/AutoProductionCount';
import IoTGateway from './pages/IoTGateway';
import SCADADashboard from './pages/SCADADashboard';
import SCADATemplate from './pages/SCADATemplate';
import EVTestCell from './pages/EVTestCell';
import ConnectorsMarketplace from './pages/ConnectorsMarketplace';

export default function PLCIntegration() {
  const [activeTab, setActiveTab] = useState('template');

  const tabs = [
    { id: 'template', label: 'SCADA Template', icon: Database, component: <SCADATemplate /> },
    { id: 'connectors', label: 'Connectors Marketplace', icon: Plug, component: <ConnectorsMarketplace /> },
    { id: 'ev-scada', label: 'EV Test Cell', icon: Car, component: <EVTestCell /> },
    { id: 'scada', label: 'Fluid SCADA', icon: Waves, component: <SCADADashboard /> },
    { id: 'status', label: 'Machine Status', icon: Activity, component: <MachineStatus /> },
    { id: 'plc', label: 'PLC Data', icon: Zap, component: <PLCData /> },
    { id: 'iot', label: 'IoT Gateway', icon: Cpu, component: <IoTGateway /> },
    { id: 'labview', label: 'LabVIEW', icon: Monitor, component: <LabVIEWInterface /> },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi, component: <ConnectivityStatus /> },
    { id: 'logs', label: 'Signal Logs', icon: FileText, component: <SignalLogs /> },
    { id: 'cycle', label: 'Cycle Time', icon: Clock, component: <CycleTime /> },
    { id: 'count', label: 'Production Count', icon: BarChart3, component: <AutoProductionCount /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Machine & PLC Integration</h1>
      
      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-b-xl rounded-tr-xl">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

