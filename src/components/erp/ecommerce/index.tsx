import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { ShoppingCart, LayoutGrid, GitCompare, Settings } from 'lucide-react';
import Storefront from './pages/Storefront';
import ProductCompare from './pages/ProductCompare';
import Orders from './pages/Orders';

export default function ECommerce() {
  const [activeTab, setActiveTab] = useState('storefront');

  const tabs = [
    { id: 'storefront', label: 'Storefront', icon: LayoutGrid, component: <Storefront /> },
    { id: 'compare', label: 'Compare Products', icon: GitCompare, component: <ProductCompare /> },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, component: <Orders /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">B2B E-Commerce Portal</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
