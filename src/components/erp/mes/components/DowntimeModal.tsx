import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Settings, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface DowntimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DowntimeModal({ isOpen, onClose }: DowntimeModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Downtime event logged successfully');
    onClose();
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
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <AlertTriangle className="text-yellow-500" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Log Downtime</h2>
                  <p className="text-xs text-zinc-500 font-mono">DOWNTIME-LOG-2026-042</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                  <Settings size={14} /> Select Machine
                </label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all">
                  <option>Select Machine</option>
                  <option>Frame Welding Robot - Line 1</option>
                  <option>Assembly Conveyor Motor - Line 1</option>
                  <option>Battery Lift Mechanism - Line 1</option>
                  <option>Dyno Testing Station - Line 1</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={14} /> Downtime Reason
                </label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all">
                  <option>Select Reason</option>
                  <option>Mechanical Failure</option>
                  <option>Electrical Issue</option>
                  <option>No Raw Material</option>
                  <option>Operator Unavailable</option>
                  <option>Scheduled Maintenance</option>
                  <option>Quality Inspection Hold</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} /> Duration (Minutes)
                </label>
                <input 
                  type="number" 
                  placeholder="Enter duration in minutes"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                  <FileText size={14} /> Additional Notes
                </label>
                <textarea 
                  rows={3}
                  placeholder="Optional details about the downtime..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-yellow-500/20 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <CheckCircle2 size={18} /> Log Downtime
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
