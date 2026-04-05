import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  ClipboardCheck, 
  AlertCircle, 
  Camera, 
  User, 
  Clock,
  ShieldCheck,
  FileText,
  ChevronRight,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function QualityCheck() {
  const [activeChecklist, setActiveChecklist] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const checklists = [
    { 
      id: 'pre-shift', 
      title: 'Pre-Shift Safety & Quality', 
      items: [
        'Verify ESD wrist strap grounding',
        'Inspect workstation for debris',
        'Calibrate torque driver (15Nm)',
        'Check battery connection terminals',
        'Verify safety guard operation'
      ]
    },
    { 
      id: 'first-article', 
      title: 'First Article Inspection', 
      items: [
        'Visual inspection of frame welds',
        'Verify fork alignment',
        'Check motor mounting torque',
        'Measure battery output voltage (48V ± 0.5V)',
        'Confirm safety label placement'
      ]
    }
  ];

  const toggleItem = (item: string) => {
    setCompletedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSave = () => {
    toast.success('Checklist saved and synced to ERP', {
      description: 'Digital log entry created successfully.'
    });
    setActiveChecklist(null);
    setCompletedItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <ClipboardCheck className="text-green-500" /> Digital Quality Logs
          </h2>
          <p className="text-sm text-zinc-500">Replacing paper logs with real-time digital verification</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-500 uppercase tracking-widest">
          Compliance Active
        </div>
      </div>

      {!activeChecklist ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklists.map((list) => (
            <motion.button
              key={list.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveChecklist(list.id)}
              className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl text-left hover:border-green-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 group-hover:text-green-500 transition-colors">
                  <FileText size={24} />
                </div>
                <ChevronRight size={20} className="text-zinc-700 group-hover:text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">{list.title}</h3>
              <p className="text-sm text-zinc-500 mb-4">{list.items.length} verification points required</p>
              <div className="flex items-center gap-4 text-xs text-zinc-600">
                <span className="flex items-center gap-1"><User size={12} /> Operator Required</span>
                <span className="flex items-center gap-1"><Clock size={12} /> ~5 mins</span>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-100">
              {checklists.find(l => l.id === activeChecklist)?.title}
            </h3>
            <button 
              onClick={() => setActiveChecklist(null)}
              className="text-sm text-zinc-500 hover:text-zinc-300"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-4">
            {checklists.find(l => l.id === activeChecklist)?.items.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => toggleItem(item)}
                className={clsx(
                  "p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4",
                  completedItems.includes(item) 
                    ? "bg-green-500/5 border-green-500/30 text-zinc-200" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                )}
              >
                <div className={clsx(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                  completedItems.includes(item) ? "bg-green-500 border-green-500" : "border-zinc-700"
                )}>
                  {completedItems.includes(item) && <CheckSquare size={14} className="text-zinc-950" />}
                </div>
                <span className="flex-1 font-medium">{item}</span>
                {idx === 2 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-xl text-[10px] font-bold text-zinc-400">
                    <Camera size={12} /> Photo Required
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-800 flex gap-4">
            <button 
              onClick={handleSave}
              disabled={completedItems.length < (checklists.find(l => l.id === activeChecklist)?.items.length || 0)}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <Save size={20} /> Submit Digital Log
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
