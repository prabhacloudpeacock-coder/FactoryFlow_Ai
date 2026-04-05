import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Settings, Layout, Package, Users, Wrench, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { sync } from '../../../../lib/sync';

interface MasterDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'machines' | 'lines' | 'products' | 'operators' | 'tools' | 'quality';
}

const TYPE_CONFIG = {
  machines: {
    title: 'Add New Machine',
    icon: Settings,
    endpoint: '/api/master/machines',
    fields: [
      { name: 'name', label: 'Machine Name', type: 'text', placeholder: 'e.g. CNC Mill #5' },
      { name: 'type', label: 'Machine Type', type: 'select', options: ['Milling', 'Casting', 'Robotics', 'Assembly', 'Press'] },
      { name: 'line', label: 'Production Line', type: 'select', options: ['Line A', 'Line B', 'Line C'] },
      { name: 'status', label: 'Initial Status', type: 'select', options: ['Operational', 'Maintenance', 'Offline'] },
    ]
  },
  lines: {
    title: 'Add Production Line',
    icon: Layout,
    endpoint: '/api/master/lines',
    fields: [
      { name: 'name', label: 'Line Name', type: 'text', placeholder: 'e.g. Line D - Final Assembly' },
      { name: 'capacity', label: 'Daily Capacity', type: 'number', placeholder: 'e.g. 500' },
      { name: 'supervisor', label: 'Line Supervisor', type: 'text', placeholder: 'e.g. Sarah Chen' },
      { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Setup'] },
    ]
  },
  products: {
    title: 'Add Product / SKU',
    icon: Package,
    endpoint: '/api/master/products',
    fields: [
      { name: 'name', label: 'Product Name', type: 'text', placeholder: 'e.g. Precision Gear A' },
      { name: 'sku', label: 'SKU Code', type: 'text', placeholder: 'e.g. SKU-9920' },
      { name: 'category', label: 'Category', type: 'select', options: ['Mechanical', 'Hydraulic', 'Electronic', 'Consumable'] },
      { name: 'unit', label: 'Unit of Measure', type: 'select', options: ['pcs', 'kg', 'm', 'set'] },
      { name: 'minStock', label: 'Min Stock Level', type: 'number', placeholder: 'e.g. 50' },
    ]
  },
  operators: {
    title: 'Add Operator',
    icon: Users,
    endpoint: '/api/master/operators',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Robert Fox' },
      { name: 'role', label: 'Role', type: 'select', options: ['Senior Operator', 'Machine Operator', 'Junior Operator', 'Trainee'] },
      { name: 'shift', label: 'Assigned Shift', type: 'select', options: ['Morning', 'Evening', 'Night'] },
      { name: 'skills', label: 'Skill Level (1-5)', type: 'number', placeholder: '5' },
    ]
  },
  tools: {
    title: 'Add Tool / Fixture',
    icon: Wrench,
    endpoint: '/api/master/tools',
    fields: [
      { name: 'name', label: 'Tool Name', type: 'text', placeholder: 'e.g. Precision Caliper' },
      { name: 'id', label: 'Tool ID', type: 'text', placeholder: 'e.g. TOL-001' },
      { name: 'type', label: 'Tool Type', type: 'select', options: ['Measurement', 'Cutting', 'Holding', 'Power'] },
      { name: 'cycle', label: 'Maintenance Cycle (Days)', type: 'number', placeholder: '30' },
    ]
  },
  quality: {
    title: 'Add Quality Parameter',
    icon: ShieldCheck,
    endpoint: '/api/master/quality',
    fields: [
      { name: 'name', label: 'Parameter Name', type: 'text', placeholder: 'e.g. Surface Roughness' },
      { name: 'target', label: 'Target Value', type: 'text', placeholder: 'e.g. 0.5' },
      { name: 'tolerance', label: 'Tolerance (+/-)', type: 'text', placeholder: 'e.g. 0.05' },
      { name: 'unit', label: 'Unit', type: 'text', placeholder: 'e.g. μm' },
      { name: 'frequency', label: 'Check Frequency', type: 'select', options: ['Every Piece', 'Every Batch', 'Hourly', 'Daily'] },
    ]
  }
};

export default function MasterDataModal({ isOpen, onClose, type }: MasterDataModalProps) {
  const [loading, setLoading] = useState(false);
  const config = TYPE_CONFIG[type];
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sync.fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to create record');

      toast.success(`${config.title} created successfully`);
      onClose();
      setFormData({});
    } catch (error) {
      console.error('Error creating record:', error);
      toast.error('Failed to create record');
    } finally {
      setLoading(false);
    }
  };

  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Icon className="text-orange-500" size={20} />
                </div>
                <h2 className="text-xl font-bold text-zinc-100 tracking-tight">{config.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {config.fields.map(field => (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      required
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  )}
                </div>
              ))}

              <div className="pt-6 flex gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-2.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                  {loading ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
