import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Layout, 
  Cpu, 
  Settings2, 
  History, 
  HelpCircle, 
  Settings, 
  ChevronRight,
  Plus,
  ChevronDown,
  Box,
  Search
} from 'lucide-react';
import { clsx } from 'clsx';
import Products from './pages/Products';
import Stations from './pages/Stations';
import Devices from './pages/Devices';
import ChangeControl from './pages/ChangeControl';
import Traceability from './pages/Traceability';

export default function MasterProduct() {
  const [activeMenu, setActiveMenu] = useState('products');
  const [activeSidebarTab, setActiveSidebarTab] = useState('Products');
  const [activeProcessId, setActiveProcessId] = useState<string | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [products, setProducts] = useState([
    { 
      id: 'prod2', 
      name: 'EV Bike Assembly', 
      category: 'EV Systems',
      processes: [
        { id: 'p1', name: 'Frame Prep' },
        { id: 'p2', name: 'Fork Installation' },
        { id: 'p3', name: 'Motor Mount' },
        { id: 'p4', name: 'Battery Placement' },
        { id: 'p5', name: 'Controller Setup' },
        { id: 'p6', name: 'Wiring Harness' },
        { id: 'p7', name: 'Wheels & Brakes' },
        { id: 'p8', name: 'Final QA & Test' }
      ] 
    }
  ]);

  const menuItems = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'infrastructure', label: 'Infrastructure', icon: Cpu },
    { id: 'change-control', label: 'Change control', icon: Settings2 },
    { id: 'traceability', label: 'Traceability', icon: History },
  ];

  const bottomItems = [
    { id: 'resources', label: 'Resources', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stations = [
    { id: 's1', name: 'Assembly Line A', status: 'Active' },
    { id: 's2', name: 'Testing Station 4', status: 'Inactive' },
    { id: 's3', name: 'Packaging Unit 1', status: 'Active' },
  ];

  const devices = [
    { id: 'd1', name: 'Scanner 01', type: 'Input' },
    { id: 'd2', name: 'Torque Wrench A', type: 'Tool' },
    { id: 'd3', name: 'Label Printer 2', type: 'Output' },
  ];

  const renderSecondarySidebar = () => {
    switch (activeMenu) {
      case 'products':
        const categories = Array.from(new Set(products.map(p => p.category))).filter(c => c !== 'Unassigned');
        const unassignedProducts = products.filter(p => p.category === 'Unassigned');

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-zinc-800">
              {['Project', 'Templates'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSidebarTab(tab)}
                  className={clsx(
                    "pb-2 text-xs font-bold transition-all border-b-2",
                    activeSidebarTab === tab || (activeSidebarTab === 'Products' && tab === 'Project')
                      ? "text-blue-500 border-blue-500" 
                      : "text-zinc-500 border-transparent hover:text-zinc-400"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category} className="space-y-1">
                  <p className="px-3 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{category}</p>
                  {products.filter(p => p.category === category).map((product) => (
                    <div key={product.id} className="space-y-1">
                      <button 
                        onClick={() => {
                          setActiveProcessId(null);
                          setActiveMenu('products');
                          setIsAddingProduct(false);
                        }}
                        className={clsx(
                          "w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all group",
                          product.id === 'prod2' && !activeProcessId ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                        )}
                      >
                        <ChevronDown size={14} className={clsx(product.processes.length === 0 && "opacity-0")} />
                        <Box size={14} className={product.id === 'prod2' && !activeProcessId ? "text-blue-400" : "text-zinc-500"} />
                        <span className="truncate">{product.name}</span>
                      </button>
                      {product.id === 'prod2' && product.processes.length > 0 && (
                        <div className="ml-6 space-y-1 border-l border-zinc-800/50">
                          {product.processes.map((process) => (
                            <button 
                              key={process.id} 
                              onClick={() => {
                                setActiveProcessId(process.id);
                                setActiveMenu('products');
                                setIsAddingProduct(false);
                              }}
                              className={clsx(
                                "w-full text-left px-4 py-1.5 text-[10px] truncate flex items-center gap-2 group/item transition-all",
                                activeProcessId === process.id 
                                  ? "bg-blue-500 text-white rounded-r-lg" 
                                  : "text-zinc-500 hover:text-zinc-300"
                              )}
                            >
                              <div className={clsx(
                                "w-1 h-1 rounded-full transition-colors",
                                activeProcessId === process.id ? "bg-white" : "bg-zinc-700 group-hover/item:bg-blue-500"
                              )} />
                              {process.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {unassignedProducts.length > 0 && (
                <div className="pt-4 border-t border-zinc-800/50">
                  <p className="px-3 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Unassigned Products</p>
                  {unassignedProducts.map(product => (
                    <button 
                      key={product.id}
                      onClick={() => {
                        setActiveProcessId(null);
                        setActiveMenu('products');
                        setIsAddingProduct(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all"
                    >
                      <Box size={14} className="text-zinc-500" />
                      <span className="truncate">{product.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'infrastructure':
        return (
          <div className="space-y-4">
            <div>
              <p className="px-3 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Stations</p>
              {stations.map(s => (
                <button key={s.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all">
                  <Layout size={14} className="text-zinc-500" />
                  <span className="flex-1 text-left">{s.name}</span>
                  <div className={clsx("w-1.5 h-1.5 rounded-full", s.status === 'Active' ? 'bg-emerald-500' : 'bg-zinc-600')} />
                </button>
              ))}
            </div>
            <div>
              <p className="px-3 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Devices</p>
              {devices.map(d => (
                <button key={d.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all">
                  <Cpu size={14} className="text-zinc-500" />
                  <div className="flex flex-col items-start">
                    <span>{d.name}</span>
                    <span className="text-[8px] text-zinc-600 uppercase font-bold">{d.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <Settings2 size={32} className="text-zinc-700 mb-2 opacity-20" />
            <p className="text-[10px] text-zinc-500 font-medium">No items found for this category</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'products':
        return (
          <Products 
            activeProcessId={activeProcessId} 
            onProcessChange={setActiveProcessId} 
            isAddingExternal={isAddingProduct}
            onAddComplete={() => setIsAddingProduct(false)}
          />
        );
      case 'infrastructure':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Infrastructure</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-zinc-200">
                <h3 className="font-bold mb-4">Stations</h3>
                <Stations />
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200">
                <h3 className="font-bold mb-4">Devices</h3>
                <Devices />
              </div>
            </div>
          </div>
        );
      case 'change-control':
        return <ChangeControl />;
      case 'traceability':
        return <Traceability />;
      default:
        return <Products activeProcessId={activeProcessId} onProcessChange={setActiveProcessId} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-zinc-900 overflow-hidden">
      {/* Primary Sidebar (Icons) */}
      <aside className="w-20 bg-[#0f111a] flex flex-col items-center py-6 shrink-0 border-r border-white/5">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-10 shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-[10px] italic">FF</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  if (item.id === 'products') setActiveProcessId(null);
                }}
                className={clsx(
                  "p-3 rounded-xl transition-all group relative",
                  isActive 
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                <Icon size={20} />
                
                {/* Hover Label */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-zinc-800" />
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute -left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-r-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="p-3 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all group relative"
              >
                <Icon size={20} />
                
                {/* Hover Label */}
                <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-zinc-800" />
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Secondary Sidebar (Content) */}
      <aside className="w-64 bg-[#1a1c2e] flex flex-col shrink-0 border-r border-white/5">
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        <div className="p-6 pb-0 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] opacity-40">
              {menuItems.find(m => m.id === activeMenu)?.label}
            </span>
            <button 
              onClick={() => {
                setActiveMenu('products');
                setIsAddingProduct(true);
                setActiveProcessId(null);
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors text-zinc-500 hover:text-white"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {renderSecondarySidebar()}
          
          <div className="pt-6 mt-6 border-t border-zinc-800/50 space-y-4">
            <div>
              <p className="px-3 text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Help & Support</p>
              <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
                <HelpCircle size={14} />
                Documentation
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu + (activeMenu === 'products' ? activeProcessId : '')}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
