import React, { useState } from 'react';
import { Search, Plus, GitBranch, User, Clock, ChevronRight, Package, Layers, Calendar, Hash, CheckCircle2, AlertCircle, X, Edit2, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_BATCHES = [
  {
    id: 'B-2026-001',
    product: 'Industrial Pump V2',
    qty: 25,
    unit: 'pcs',
    productionDate: '2026-03-25 14:30',
    user: 'John Doe',
    status: 'In Production',
    serials: Array.from({ length: 25 }, (_, i) => `SN-100${i + 1}`)
  },
  {
    id: 'B-2026-002',
    product: 'Conveyor Belt System',
    qty: 5,
    unit: 'pcs',
    productionDate: '2026-03-10 09:15',
    user: 'Jane Smith',
    status: 'Completed',
    serials: ['SN-2001', 'SN-2002', 'SN-2003', 'SN-2004', 'SN-2005']
  },
  {
    id: 'B-2026-003',
    product: 'Pump Housing (Semi)',
    qty: 50,
    unit: 'pcs',
    productionDate: '2026-03-28 16:45',
    user: 'Mike Wilson',
    status: 'In Production',
    serials: Array.from({ length: 50 }, (_, i) => `SN-300${i + 1}`)
  }
];

export default function BatchTracking() {
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setBatches(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setBatches(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<typeof INITIAL_BATCHES[0] | null>(null);

  const filteredBatches = batches.filter(b => 
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Batch ID or Product..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20">
          <Plus size={18} /> Create Batch
        </button>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/50">
              <tr>
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Batch ID</th>
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Product</th>
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Quantity</th>
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Production Date</th>
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredBatches.map(batch => (
                <tr 
                  key={batch.id} 
                  onClick={() => setSelectedBatch(batch)}
                  className="hover:bg-zinc-800/30 transition-colors cursor-pointer group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-zinc-800/50 rounded-xl flex items-center justify-center border border-zinc-700/50 group-hover:border-orange-500/30 group-hover:text-orange-400 transition-colors">
                        <Layers size={16} />
                      </div>
                      <span className="font-mono text-sm font-medium text-zinc-200">{batch.id}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-zinc-500" />
                      <span className="text-sm font-medium text-zinc-200">{batch.product}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <Hash size={14} className="text-zinc-500" />
                      <span className="text-sm font-mono text-zinc-300">{batch.qty}</span>
                      <span className="text-xs text-zinc-500">{batch.unit}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Calendar size={14} className="text-zinc-500" />
                      {batch.productionDate}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border ${
                      batch.status === 'Completed' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {batch.status === 'Completed' ? <CheckCircle2 size={12} /> : <Activity size={12} />}
                      {batch.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div onClick={(e) => e.stopPropagation()}>
                        <DataTableActions 
                          onEdit={() => setEditingRecord(batch)}
                          onDelete={() => handleDelete(batch.id)}
                        />
                      </div>
                      <button 
                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors inline-flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBatch(batch);
                        }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBatches.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500 text-sm">
                    No batches found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Details Modal */}
      <AnimatePresence>
        {selectedBatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBatch(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800/50 flex justify-between items-start bg-zinc-900/30">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 text-orange-500">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-100 font-mono">{selectedBatch.id}</h2>
                      <p className="text-zinc-400 text-sm flex items-center gap-2">
                        <Package size={14} /> {selectedBatch.product}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800">
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => setSelectedBatch(null)} 
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-zinc-950/50 space-y-6">
                
                {/* Batch Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-1">Quantity</p>
                    <p className="text-lg font-mono text-zinc-100">{selectedBatch.qty} <span className="text-sm text-zinc-500">{selectedBatch.unit}</span></p>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-1">Status</p>
                    <p className={`text-sm font-medium mt-1 ${selectedBatch.status === 'Completed' ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {selectedBatch.status}
                    </p>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 sm:col-span-2">
                    <p className="text-xs text-zinc-500 mb-1">Production Date</p>
                    <p className="text-sm font-medium text-zinc-200 mt-1 flex items-center gap-2">
                      <Calendar size={14} className="text-zinc-500" />
                      {selectedBatch.productionDate}
                    </p>
                  </div>
                </div>

                {/* Serial Numbers Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                      <Hash size={16} className="text-zinc-500" />
                      Generated Serial Numbers
                    </h3>
                    <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
                      {selectedBatch.serials.length} Total
                    </span>
                  </div>
                  
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 max-h-[250px] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {selectedBatch.serials.map((serial, idx) => (
                        <div key={idx} className="bg-zinc-950 border border-zinc-800 py-2 px-3 rounded-lg flex items-center justify-between group hover:border-orange-500/30 transition-colors">
                          <span className="text-xs font-mono text-zinc-300 group-hover:text-orange-400 transition-colors">{serial}</span>
                          <CheckCircle2 size={12} className="text-emerald-500/50" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/30 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedBatch(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-bold bg-zinc-100 text-zinc-950 hover:bg-white transition-colors">
                  Print Labels
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    
      <EditModal
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        onSave={handleSaveEdit}
        initialData={editingRecord}
        title={`Edit ${editingRecord?.name || editingRecord?.id || 'Record'}`}
      />
    </div>
  );
}
