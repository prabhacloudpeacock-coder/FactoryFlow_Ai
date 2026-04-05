import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, FileText, Users, TrendingUp, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { sync } from '../../../../lib/sync';

interface CRMModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'orders' | 'quotes' | 'customers' | 'pipeline';
}

const TYPE_CONFIG = {
  orders: {
    title: 'New Sales Order',
    icon: ShoppingCart,
    endpoint: '/api/crm/orders',
    fields: [
      { name: 'customer', label: 'Customer Name', type: 'select', options: ['Global Motors Corp', 'TechFlow Systems', 'Apex Engineering', 'Precision Parts Ltd'] },
      { name: 'orderDate', label: 'Order Date', type: 'date' },
      { name: 'amount', label: 'Total Amount ($)', type: 'number', placeholder: 'e.g. 50000' },
      { name: 'status', label: 'Initial Status', type: 'select', options: ['Draft', 'Pending Approval', 'Production'] },
      { name: 'notes', label: 'Internal Notes', type: 'textarea', placeholder: 'Special instructions...' },
    ]
  },
  quotes: {
    title: 'Generate Quote',
    icon: FileText,
    endpoint: '/api/crm/quotes',
    fields: [
      { name: 'customer', label: 'Customer Name', type: 'text', placeholder: 'e.g. New Prospect Inc' },
      { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
      { name: 'estimatedValue', label: 'Estimated Value ($)', type: 'number', placeholder: 'e.g. 15000' },
      { name: 'items', label: 'Items / Services', type: 'textarea', placeholder: 'List items...' },
    ]
  },
  customers: {
    title: 'Add New Customer',
    icon: Users,
    endpoint: '/api/crm/customers',
    fields: [
      { name: 'name', label: 'Company Name', type: 'text', placeholder: 'e.g. Acme Corp' },
      { name: 'contactPerson', label: 'Contact Person', type: 'text', placeholder: 'e.g. Jane Doe' },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@acme.com' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
      { name: 'industry', label: 'Industry', type: 'select', options: ['Automotive', 'Aerospace', 'Electronics', 'Manufacturing', 'Other'] },
    ]
  },
  pipeline: {
    title: 'New Sales Lead',
    icon: TrendingUp,
    endpoint: '/api/crm/leads',
    fields: [
      { name: 'leadName', label: 'Lead / Opportunity Name', type: 'text', placeholder: 'e.g. Q3 Expansion Project' },
      { name: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Future Tech' },
      { name: 'value', label: 'Expected Value ($)', type: 'number', placeholder: 'e.g. 100000' },
      { name: 'stage', label: 'Pipeline Stage', type: 'select', options: ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'] },
      { name: 'probability', label: 'Probability (%)', type: 'number', placeholder: 'e.g. 50' },
    ]
  }
};

export default function CRMModal({ isOpen, onClose, type }: CRMModalProps) {
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

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
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
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                    />
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
