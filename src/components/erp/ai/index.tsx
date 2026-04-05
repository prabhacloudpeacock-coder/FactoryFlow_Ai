import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { BrainCircuit, Activity, TrendingUp, ShieldAlert, Calendar, Zap } from 'lucide-react';
import PredictiveMaintenance from './pages/PredictiveMaintenance';
import ProductionForecasting from './pages/ProductionForecasting';
import AnomalyDetection from './pages/AnomalyDetection';
import SmartScheduling from './pages/SmartScheduling';
import ProductionOptimization from './pages/ProductionOptimization';

export default function AI() {
  const [activeTab, setActiveTab] = useState('optimization');

  const tabs = [
    { id: 'optimization', label: 'Production Optimization', icon: Zap, component: <ProductionOptimization /> },
    { id: 'predictive', label: 'Predictive Maintenance', icon: Activity, component: <PredictiveMaintenance /> },
    { id: 'forecasting', label: 'Production Forecasting', icon: TrendingUp, component: <ProductionForecasting /> },
    { id: 'anomaly', label: 'Anomaly Detection', icon: ShieldAlert, component: <AnomalyDetection /> },
    { id: 'scheduling', label: 'Smart Scheduling', icon: Calendar, component: <SmartScheduling /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
          <BrainCircuit className="text-orange-500" size={32} /> AI & Smart Features
        </h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

