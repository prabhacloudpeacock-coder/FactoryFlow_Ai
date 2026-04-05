import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Scan, Tag, Barcode as BarcodeIcon, History, Settings } from 'lucide-react';
import BarcodeScanner from './pages/BarcodeScanner';
import BarcodeGenerator from './pages/BarcodeGenerator';

export default function Barcode() {
  const [activeTab, setActiveTab] = useState('scan');

  const tabs = [
    { id: 'scan', label: 'Scan Barcode', icon: Scan, component: <BarcodeScanner /> },
    { id: 'generate', label: 'Generate Label', icon: Tag, component: <BarcodeGenerator /> },
    { id: 'history', label: 'Scan History', icon: History, component: <div className="p-12 text-center text-zinc-500 italic">No scan history recorded for this session.</div> },
    { id: 'settings', label: 'Scanner Config', icon: Settings, component: <div className="p-12 text-center text-zinc-500 italic">Default scanner settings active.</div> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
          <BarcodeIcon className="text-orange-500" size={32} /> Barcode Management
        </h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
