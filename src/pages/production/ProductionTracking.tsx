import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  User, 
  Cpu, 
  Settings, 
  Plus, 
  Search 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductionTracking() {
  const [orders, setOrders] = useState([
    { id: '1', order_number: 'PO-2026-001', product: 'EV Bike Model S', quantity: 10, status: 'in-progress', progress: 65 },
    { id: '2', order_number: 'PO-2026-002', product: 'EV Scooter Pro', quantity: 5, status: 'pending', progress: 0 },
    { id: '3', order_number: 'PO-2026-003', product: 'EV Bike Model S', quantity: 20, status: 'completed', progress: 100 }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const steps = [
    { id: 's1', name: 'Frame Assembly', machine: 'M1', status: 'completed', time: '45m', operator: 'Robert Chen' },
    { id: 's2', name: 'Motor Install', machine: 'M2', status: 'in-progress', time: '30m', operator: 'Sarah Miller' },
    { id: 's3', name: 'Battery Integration', machine: 'M3', status: 'pending', time: '60m', operator: 'James Wilson' },
    { id: 's4', name: 'QC Testing', machine: 'QC1', status: 'pending', time: '20m', operator: 'QC Inspector' }
  ];

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-zinc-100">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Production Tracking</h1>
          <p className="text-zinc-500 mt-1">Monitor step-by-step manufacturing execution</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
          <Plus size={18} />
          New Production Order
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedOrder(order)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedOrder?.id === order.id 
                    ? 'bg-orange-500/10 border-orange-500/50' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-sm">{order.order_number}</h3>
                    <p className="text-xs text-zinc-500">{order.product}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                    order.status === 'in-progress' ? 'bg-orange-500/10 text-orange-500' : 
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${order.progress}%` }}
                    className="bg-orange-500 h-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Execution Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedOrder ? (
              <motion.div 
                key={selectedOrder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedOrder.order_number}</h2>
                    <p className="text-sm text-zinc-500">Product: {selectedOrder.product} • Qty: {selectedOrder.quantity}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                      <Settings size={16} />
                      Config
                    </button>
                    <button className="px-4 py-2 bg-orange-500 text-zinc-950 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-600 transition-colors">
                      <Play size={16} />
                      Resume
                    </button>
                  </div>
                </div>

                <div className="space-y-4 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-zinc-800" />

                  {steps.map((step, i) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-14"
                    >
                      {/* Step Indicator */}
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-zinc-900 flex items-center justify-center z-10 ${
                        step.status === 'completed' ? 'bg-emerald-500' : 
                        step.status === 'in-progress' ? 'bg-orange-500 animate-pulse' : 
                        'bg-zinc-800'
                      }`}>
                        {step.status === 'completed' && <CheckCircle2 size={12} className="text-zinc-950" />}
                        {step.status === 'in-progress' && <Activity size={12} className="text-zinc-950" />}
                      </div>

                      <div className={`p-4 rounded-xl border transition-all ${
                        step.status === 'in-progress' ? 'bg-orange-500/5 border-orange-500/30' : 'bg-zinc-950 border-zinc-800'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm">{step.name}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold">
                                <Cpu size={12} />
                                {step.machine}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold">
                                <User size={12} />
                                {step.operator}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold">
                                <Clock size={12} />
                                {step.time}
                              </div>
                            </div>
                          </div>
                          {step.status === 'in-progress' && (
                            <button className="px-3 py-1 bg-orange-500 text-zinc-950 rounded-lg text-[10px] font-bold uppercase hover:bg-orange-600 transition-colors">
                              Complete Step
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl">
                <Activity className="text-zinc-700 mb-4" size={48} />
                <h3 className="text-xl font-bold text-zinc-500">Select an order to track execution</h3>
                <p className="text-sm text-zinc-600 mt-2">Monitor real-time progress and step-by-step status.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
