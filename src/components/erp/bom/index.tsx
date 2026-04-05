import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Package, GitBranch, History, Layers, Settings, FileText } from 'lucide-react';
import BOMList from './pages/BOMList';
import BillOfMaterials from './pages/BillOfMaterials';
import RoutingSetup from './pages/RoutingSetup';
import VersionControl from './pages/VersionControl';

export default function BOM() {
  const [activeTab, setActiveTab] = useState('bom-list');

  const tabs = [
    { id: 'bom-list', label: 'BOM List', icon: Package, component: <BOMList /> },
    { id: 'bom-detail', label: 'Bill of Materials', icon: Layers, component: <BillOfMaterials /> },
    { id: 'routing', label: 'Routing & Flow', icon: GitBranch, component: <RoutingSetup /> },
    { id: 'versions', label: 'Version Control', icon: History, component: <VersionControl /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">BOM & Routing</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

