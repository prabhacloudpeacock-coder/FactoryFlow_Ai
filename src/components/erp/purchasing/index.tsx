import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { FileText, Users, PackageCheck } from 'lucide-react';
import PurchaseOrders from './pages/PurchaseOrders';
import Suppliers from './pages/Suppliers';
import GoodsReceipt from './pages/GoodsReceipt';

export default function Purchasing() {
  const [activeTab, setActiveTab] = useState('purchase-orders');

  const tabs = [
    { id: 'purchase-orders', label: 'Purchase Orders', icon: FileText, component: <PurchaseOrders /> },
    { id: 'goods-receipt', label: 'Goods Receipt', icon: PackageCheck, component: <GoodsReceipt /> },
    { id: 'suppliers', label: 'Suppliers', icon: Users, component: <Suppliers /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Purchasing & Procurement</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
