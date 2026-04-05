import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { BookOpen, BrainCircuit, Network, Activity, ShieldCheck, Database, Zap, Settings } from 'lucide-react';
import OverviewDoc from './pages/Overview';
import MESCoreDoc from './pages/MESCore';
import AIIntelligenceDoc from './pages/AIIntelligence';
import IntegrationLayerDoc from './pages/IntegrationLayer';
import QualityControlDoc from './pages/QualityControl';
import MasterDataDoc from './pages/MasterDataDoc';
import WorkingPrincipleDoc from './pages/WorkingPrinciple';
import UserGuideDoc from './pages/UserGuide';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen, component: <OverviewDoc /> },
    { id: 'guide', label: 'User Guide', icon: Settings, component: <UserGuideDoc /> },
    { id: 'principle', label: 'Working Principle', icon: Zap, component: <WorkingPrincipleDoc /> },
    { id: 'mes', label: 'MES Core', icon: Activity, component: <MESCoreDoc /> },
    { id: 'ai', label: 'AI & Smart', icon: BrainCircuit, component: <AIIntelligenceDoc /> },
    { id: 'integration', label: 'Integration', icon: Network, component: <IntegrationLayerDoc /> },
    { id: 'quality', label: 'Quality Control', icon: ShieldCheck, component: <QualityControlDoc /> },
    { id: 'master', label: 'Master Data', icon: Database, component: <MasterDataDoc /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
          <BookOpen className="text-orange-500" size={32} /> Documentation
        </h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
