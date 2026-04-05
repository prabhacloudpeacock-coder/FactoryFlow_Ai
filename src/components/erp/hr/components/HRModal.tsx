import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, DollarSign, Briefcase, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { sync } from '../../../../lib/sync';

interface HRModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'directory' | 'payroll' | 'recruitment' | 'performance';
}

const TYPE_CONFIG = {
  directory: {
    title: 'Add New Employee',
    icon: Users,
    endpoint: '/api/hr/employees',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. John Doe' },
      { name: 'role', label: 'Role / Position', type: 'text', placeholder: 'e.g. Production Manager' },
      { name: 'department', label: 'Department', type: 'select', options: ['Operations', 'Quality', 'Maintenance', 'HR', 'Finance', 'Engineering'] },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john.doe@industrial.com' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
      { name: 'joined', label: 'Joining Date', type: 'date' },
    ]
  },
  payroll: {
    title: 'Process Payroll',
    icon: DollarSign,
    endpoint: '/api/hr/payroll',
    fields: [
      { name: 'month', label: 'Payroll Month', type: 'select', options: ['January 2026', 'February 2026', 'March 2026', 'April 2026'] },
      { name: 'paymentDate', label: 'Payment Date', type: 'date' },
      { name: 'notes', label: 'Internal Notes', type: 'textarea', placeholder: 'Any special adjustments...' },
    ]
  },
  recruitment: {
    title: 'Post New Job',
    icon: Briefcase,
    endpoint: '/api/hr/jobs',
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', placeholder: 'e.g. Senior Engineer' },
      { name: 'department', label: 'Department', type: 'select', options: ['Operations', 'Quality', 'Maintenance', 'HR', 'Finance', 'Engineering'] },
      { name: 'type', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
      { name: 'description', label: 'Job Description', type: 'textarea', placeholder: 'Key responsibilities and requirements...' },
    ]
  },
  performance: {
    title: 'New Review Cycle',
    icon: Star,
    endpoint: '/api/hr/performance',
    fields: [
      { name: 'period', label: 'Review Period', type: 'select', options: ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'] },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'description', label: 'Cycle Description', type: 'textarea', placeholder: 'Goals for this review cycle...' },
    ]
  }
};

export default function HRModal({ isOpen, onClose, type }: HRModalProps) {
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
