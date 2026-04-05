import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';
import WhereUsedModal from '../components/WhereUsedModal';
import { 
  Package, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  Info,
  Box,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface BOMItem {
  id: string;
  name: string;
  qty: number;
  unit: string;
  level: number;
  subItems?: BOMItem[];
}

const INITIAL_BOM: BOMItem = {
  id: 'FG-1001',
  name: 'Industrial Pump V2 - Main Assembly',
  qty: 1,
  unit: 'pcs',
  level: 0,
  subItems: [
    {
      id: 'P-101',
      name: 'Main Housing',
      qty: 1,
      unit: 'pcs',
      level: 1,
    },
    {
      id: 'P-102',
      name: 'Impeller Assembly',
      qty: 1,
      unit: 'pcs',
      level: 1,
      subItems: [
        { id: 'P-102-1', name: 'Impeller Blade', qty: 4, unit: 'pcs', level: 2 },
        { id: 'P-102-2', name: 'Shaft', qty: 1, unit: 'pcs', level: 2 },
      ]
    },
    {
      id: 'P-103',
      name: 'Seal Kit',
      qty: 2,
      unit: 'set',
      level: 1,
      subItems: [
        { id: 'P-103-1', name: 'O-Ring Large', qty: 4, unit: 'pcs', level: 2 },
        { id: 'P-103-2', name: 'Gasket', qty: 1, unit: 'pcs', level: 2 },
      ]
    },
    {
      id: 'P-104',
      name: 'Electric Motor 5HP',
      qty: 1,
      unit: 'pcs',
      level: 1,
    }
  ]
};

export default function BillOfMaterials() {
  const [bom, setBom] = useState<BOMItem>(INITIAL_BOM);
  const [isEditing, setIsEditing] = useState(false);
  const [isWhereUsedModalOpen, setIsWhereUsedModalOpen] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<string | undefined>(undefined);

  const handleWhereUsed = (partId: string) => {
    setSelectedPartId(partId);
    setIsWhereUsedModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Multi-Level Bill of Materials</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage hierarchical product structures and component relationships.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              isEditing 
                ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700" 
                : "bg-orange-500 text-zinc-950 hover:bg-orange-600 shadow-lg shadow-orange-500/20"
            )}
          >
            {isEditing ? <><X size={18} /> Cancel Edit</> : <><Edit3 size={18} /> Edit Structure</>}
          </button>
          {isEditing && (
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-zinc-950 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-green-500/20">
              <Save size={18} /> Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Summary & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Info size={14} className="text-orange-500" /> BOM Summary
            </h3>
            <div className="space-y-3">
              <SummaryItem label="Total Components" value="12 Items" />
              <SummaryItem label="Max Depth" value="3 Levels" />
              <SummaryItem label="Last Updated" value="2026-03-31" />
              <SummaryItem label="Status" value="Released" status="success" />
            </div>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Box size={14} className="text-orange-500" /> Quick Actions
            </h3>
            <div className="space-y-2">
              <ActionButton label="Export to PDF" />
              <ActionButton label="Export to CSV" />
              <ActionButton label="Compare Versions" />
              <button 
                onClick={() => setIsWhereUsedModalOpen(true)}
                className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-between group"
              >
                Where Used Analysis
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Hierarchical Tree */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 grid grid-cols-12 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <div className="col-span-6 pl-10">Component Name / Structure</div>
              <div className="col-span-2">Part ID</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2 text-right pr-4">Actions</div>
            </div>
            
            <div className="p-2 max-h-[700px] overflow-y-auto custom-scrollbar">
              <BOMTreeNode item={bom} isEditing={isEditing} onWhereUsed={handleWhereUsed} />
            </div>
          </div>
        </div>
      </div>

      <WhereUsedModal 
        isOpen={isWhereUsedModalOpen} 
        onClose={() => { setIsWhereUsedModalOpen(false); setSelectedPartId(undefined); }}
        partId={selectedPartId}
      />
    </div>
  );
}

function BOMTreeNode({ item, isEditing, onWhereUsed, depth = 0 }: { item: BOMItem, isEditing: boolean, onWhereUsed: (partId: string) => void, depth?: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <div className="group">
      <div className={cn(
        "grid grid-cols-12 items-center py-3 px-4 rounded-2xl transition-all border border-transparent",
        depth === 0 ? "bg-zinc-800/30 border-zinc-700/50 mb-2" : "hover:bg-zinc-800/50 hover:border-zinc-800",
        depth > 0 && "ml-6 border-l-2 border-l-zinc-800"
      )}>
        <div className="col-span-6 flex items-center gap-3">
          <div className="flex items-center">
            {hasSubItems ? (
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 hover:bg-zinc-700 rounded-lg text-zinc-500 transition-colors"
              >
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <div className="w-6" />
            )}
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center border",
              depth === 0 ? "bg-orange-500/10 border-orange-500/20 text-orange-500" : "bg-zinc-900 border-zinc-800 text-zinc-400"
            )}>
              {depth === 0 ? <Package size={16} /> : <Layers size={14} />}
            </div>
          </div>
          <div>
            <p className={cn(
              "text-sm font-bold tracking-tight",
              depth === 0 ? "text-zinc-100" : "text-zinc-300"
            )}>
              {item.name}
            </p>
            <p className="text-[10px] text-zinc-500 font-mono uppercase">Level {item.level}</p>
          </div>
        </div>

        <div className="col-span-2">
          <span className="text-xs font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            {item.id}
          </span>
        </div>

        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-zinc-200">{item.qty}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">{item.unit}</span>
          </div>
        </div>

        <div className="col-span-2 flex justify-end gap-1">
          <button 
            onClick={() => onWhereUsed(item.id)}
            className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-500 hover:text-orange-500 transition-all"
            title="Where Used"
          >
            <Layers size={14} />
          </button>
          <DataTableActions 
            onEdit={() => {}} // Tree editing is complex, placeholder
            onDelete={() => {}}
          />
          {isEditing ? (
            <>
              <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-orange-500 transition-all">
                <Plus size={14} />
              </button>
              <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-red-500 transition-all">
                <Trash2 size={14} />
              </button>
            </>
          ) : (
            <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-100 transition-all">
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && hasSubItems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.subItems?.map((sub, idx) => (
              <BOMTreeNode key={sub.id} item={sub} isEditing={isEditing} onWhereUsed={onWhereUsed} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryItem({ label, value, status }: { label: string, value: string, status?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-500 font-medium">{label}</span>
      <span className={cn(
        "text-xs font-bold",
        status === 'success' ? "text-green-500" : "text-zinc-200"
      )}>{value}</span>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="w-full text-left px-4 py-2 text-xs font-bold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-all flex items-center justify-between group">
      {label}
      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
    </button>
  );
}
