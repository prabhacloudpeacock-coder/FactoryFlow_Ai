import { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DataTableActions({ onEdit, onDelete }: DataTableActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors"
      >
        <MoreVertical size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-36 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  onEdit();
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
              >
                <Edit2 size={14} /> Edit
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onDelete();
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
