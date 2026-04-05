import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Database, Settings, Layout, Package, Users, Wrench, ShieldCheck } from 'lucide-react';
import MachinesMaster from './pages/MachinesMaster';
import ProductionLines from './pages/ProductionLines';
import ProductsSKUs from './pages/ProductsSKUs';
import OperatorsMaster from './pages/OperatorsMaster';
import ToolsFixtures from './pages/ToolsFixtures';
import QualityParameters from './pages/QualityParameters';

export default function MasterData() {
  const [activeTab, setActiveTab] = useState('machines');

  const tabs = [
    { id: 'machines', label: 'Machines', icon: Settings, component: <MachinesMaster /> },
    { id: 'lines', label: 'Production Lines', icon: Layout, component: <ProductionLines /> },
    { id: 'products', label: 'Products / SKUs', icon: Package, component: <ProductsSKUs /> },
    { id: 'operators', label: 'Operators', icon: Users, component: <OperatorsMaster /> },
    { id: 'tools', label: 'Tools / Fixtures', icon: Wrench, component: <ToolsFixtures /> },
    { id: 'quality', label: 'Quality Params', icon: ShieldCheck, component: <QualityParameters /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Master Data Management</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

