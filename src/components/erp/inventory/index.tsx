import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Package, Activity, Layers, MapPin, Box, ArrowDownUp, Scan } from 'lucide-react';
import StockOverview from './pages/StockOverview';
import WIPTracking from './pages/WIPTracking';
import BatchTracking from './pages/BatchTracking';
import LineSideStock from './pages/LineSideStock';
import InventoryScan from './pages/InventoryScan';

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('stock');

  const tabs = [
    { id: 'stock', label: 'Stock Overview', icon: Package, component: <StockOverview /> },
    { id: 'scan', label: 'Scanner', icon: Scan, component: <InventoryScan /> },
    { id: 'wip', label: 'WIP Tracking', icon: Activity, component: <WIPTracking /> },
    { id: 'batch', label: 'Batch & Serial', icon: Layers, component: <BatchTracking /> },
    { id: 'lineside', label: 'Line-side Stock', icon: MapPin, component: <LineSideStock /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Inventory Management</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

