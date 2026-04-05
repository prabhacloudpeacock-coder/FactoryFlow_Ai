import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Beaker, CheckCircle, XCircle, FileText, Activity, BarChart3, AlertTriangle, FileCheck, Settings, Zap, Layout } from 'lucide-react';
import IncomingInspection from './pages/IncomingInspection';
import InProcessChecks from './pages/InProcessChecks';
import FinalTesting from './pages/FinalTesting';
import TestBench from './pages/TestBench';
import QualityParameters from './pages/QualityParameters';
import PassFailDashboard from './pages/PassFailDashboard';
import DefectAnalysis from './pages/DefectAnalysis';
import QualityCertificates from './pages/QualityCertificates';
import EVHandleSwitchTesting from './pages/EVHandleSwitchTesting';
import TestTemplates from './pages/TestTemplates';

export default function Quality() {
  const [activeTab, setActiveTab] = useState('incoming');

  const tabs = [
    { id: 'incoming', label: 'Incoming', icon: FileText, component: <IncomingInspection /> },
    { id: 'inprocess', label: 'In-Process', icon: Activity, component: <InProcessChecks /> },
    { id: 'final', label: 'Final Testing', icon: FileCheck, component: <FinalTesting /> },
    { id: 'ev-switch', label: 'EV Switch Testing', icon: Zap, component: <EVHandleSwitchTesting /> },
    { id: 'templates', label: 'Test Templates', icon: Layout, component: <TestTemplates /> },
    { id: 'bench', label: 'Test Bench', icon: Beaker, component: <TestBench /> },
    { id: 'parameters', label: 'Quality Parameters', icon: Settings, component: <QualityParameters /> },
    { id: 'dashboard', label: 'Pass/Fail', icon: BarChart3, component: <PassFailDashboard /> },
    { id: 'analysis', label: 'Defect Analysis', icon: AlertTriangle, component: <DefectAnalysis /> },
    { id: 'certs', label: 'Certificates', icon: FileText, component: <QualityCertificates /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Quality Control (Testing & Validation)</h1>
      
      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-b-xl rounded-tr-xl">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

