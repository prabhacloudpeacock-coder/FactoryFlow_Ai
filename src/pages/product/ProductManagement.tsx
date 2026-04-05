import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  ChevronRight, 
  Layers, 
  Settings, 
  Trash2, 
  Eye, 
  Box, 
  Cpu, 
  Battery, 
  Disc 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductManagement() {
  const [products, setProducts] = useState([
    { id: '1', name: 'EV Bike Model S', sku: 'EVB-S-001', category: 'EV', status: 'active' },
    { id: '2', name: 'EV Scooter Pro', sku: 'EVS-P-002', category: 'EV', status: 'active' },
    { id: '3', name: 'EV Battery Pack', sku: 'BATT-48V-20A', category: 'Components', status: 'active' }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showBOM, setShowBOM] = useState(false);

  const bomData = [
    { id: 'p1', name: 'Aluminum Frame', qty: 1, unit: 'pcs', icon: Box },
    { id: 'p2', name: 'Traction Motor 2kW', qty: 1, unit: 'pcs', icon: Cpu },
    { id: 'p3', name: 'Lithium Battery 48V', qty: 1, unit: 'pcs', icon: Battery },
    { id: 'p4', name: 'All-Terrain Tires', qty: 2, unit: 'pcs', icon: Disc }
  ];

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-zinc-100">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-zinc-500 mt-1">Manage products, BOMs, and structures</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
          <Plus size={18} />
          Create Product
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProduct?.id === product.id 
                    ? 'bg-orange-500/10 border-orange-500/50' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                      <Package className="text-zinc-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{product.name}</h3>
                      <p className="text-xs text-zinc-500 font-mono uppercase">{product.sku}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product Details & 360 View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <motion.div 
                key={selectedProduct.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                      <Package className="text-orange-500" size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-mono text-zinc-500 uppercase">{selectedProduct.sku}</span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                        <span className="text-xs text-zinc-500">{selectedProduct.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors">
                      <Settings size={18} />
                    </button>
                    <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => setShowBOM(false)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      !showBOM ? 'bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/20' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    <Eye size={18} />
                    360° Structure
                  </button>
                  <button 
                    onClick={() => setShowBOM(true)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      showBOM ? 'bg-orange-500 text-zinc-950 shadow-lg shadow-orange-500/20' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    <Layers size={18} />
                    Bill of Materials
                  </button>
                </div>

                <div className="flex-1 bg-zinc-950 rounded-2xl border border-zinc-800 p-8 relative overflow-hidden">
                  {!showBOM ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                      <div className="relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          className="w-48 h-48 border-2 border-dashed border-orange-500/30 rounded-full flex items-center justify-center"
                        >
                          <Package className="text-orange-500 opacity-20" size={64} />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Box className="text-orange-500" size={48} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Interactive 360° View</h3>
                        <p className="text-sm text-zinc-500 mt-2 max-w-xs mx-auto">
                          Visualize product assembly, component placement, and structural integrity.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-4">Components List</h3>
                      {bomData.map((part) => (
                        <div key={part.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center group hover:border-orange-500/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-orange-500/10 transition-all">
                              <part.icon className="text-zinc-500 group-hover:text-orange-500 transition-all" size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{part.name}</p>
                              <p className="text-[10px] text-zinc-500 uppercase font-mono">{part.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-orange-500">{part.qty} {part.unit}</p>
                            <p className="text-[10px] text-zinc-600 uppercase font-bold">Required</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl">
                <Package className="text-zinc-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-zinc-500">Select a product to view details</h3>
                <p className="text-sm text-zinc-600 mt-2">Manage BOM, structure, and manufacturing workflows.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
