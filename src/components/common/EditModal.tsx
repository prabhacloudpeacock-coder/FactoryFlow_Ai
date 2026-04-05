import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  title: string;
}

export default function EditModal({ isOpen, onClose, onSave, initialData, title }: EditModalProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
            <h2 className="text-xl font-bold text-zinc-100">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {Object.keys(formData).map((key) => {
              if (key === 'id') return null; // Don't edit ID
              
              return (
                <div key={key}>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={formData[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
              );
            })}
            
            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-bold text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
