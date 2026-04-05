import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Hash, Calendar, Layers, User, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { sync } from '../../../../lib/sync';

interface WorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkOrderModal({ isOpen, onClose }: WorkOrderModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    qty: 0,
    dueDate: '',
    line: '',
    supervisor: '',
    priority: 'Medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.product || formData.qty <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await sync.fetch('/api/mes/work-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to create work order');

      const data = await res.json();
      if (data.status === 'queued') {
        toast.info('Offline: Work Order queued for synchronization');
      } else {
        toast.success('Work Order created and released successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error creating work order:', error);
      toast.error('Failed to release work order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Package className="text-orange-500" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Create Work Order</h2>
                  <p className="text-xs text-zinc-500 font-mono">NEW-WO-2026-001</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Package size={14} /> Product Selection
                  </label>
                  <select 
                    value={formData.product}
                    onChange={(e) => setFormData(prev => ({ ...prev, product: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  >
                    <option value="">Select Product SKU</option>
                    <option value="EV-BIKE-MODEL-S - EV Bike Model S">EV-BIKE-MODEL-S - EV Bike Model S</option>
                    <option value="EV-BIKE-MODEL-X - EV Bike Model X">EV-BIKE-MODEL-X - EV Bike Model X</option>
                    <option value="EV-BATT-48V - 48V Battery Pack">EV-BATT-48V - 48V Battery Pack</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Hash size={14} /> Target Quantity
                  </label>
                  <input 
                    type="number" 
                    value={formData.qty || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, qty: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter quantity"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={14} /> Due Date
                  </label>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Layers size={14} /> Production Line
                  </label>
                  <select 
                    value={formData.line}
                    onChange={(e) => setFormData(prev => ({ ...prev, line: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  >
                    <option value="">Select Line</option>
                    <option value="Line 1 - Frame Welding">Line 1 - Frame Welding</option>
                    <option value="Line 2 - Motor Assembly">Line 2 - Motor Assembly</option>
                    <option value="Line 3 - Final Assembly">Line 3 - Final Assembly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <User size={14} /> Assigned Supervisor
                  </label>
                  <select 
                    value={formData.supervisor}
                    onChange={(e) => setFormData(prev => ({ ...prev, supervisor: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  >
                    <option value="">Select Supervisor</option>
                    <option value="John Miller">John Miller</option>
                    <option value="Sarah Chen">Sarah Chen</option>
                    <option value="David Wilson">David Wilson</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    Priority Level
                  </label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High', 'Urgent'].map(priority => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, priority }))}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                          formData.priority === priority 
                            ? 'bg-orange-500 border-orange-500 text-zinc-950' 
                            : 'border-zinc-800 text-zinc-500 hover:border-orange-500/50 hover:bg-zinc-800'
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <p className="text-xs text-zinc-500 italic">
                  * All released orders are immediately visible on the shop floor.
                </p>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                    {loading ? 'Releasing...' : 'Release Order'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
