import { useState } from 'react';
import { Settings, Plus, Search, Filter, CheckCircle2, AlertCircle, Box, ClipboardList } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface QualityParameter {
  id: string;
  name: string;
  type: 'Numeric' | 'Pass/Fail' | 'Text';
  unit?: string;
  min?: number;
  max?: number;
  description: string;
  associations: { type: 'Product' | 'WorkOrder'; id: string; name: string }[];
}

const mockParameters: QualityParameter[] = [
  {
    id: 'QP-001',
    name: 'Dimensional Tolerance',
    type: 'Numeric',
    unit: 'mm',
    min: 10.0,
    max: 10.5,
    description: 'Outer diameter measurement for precision shafts.',
    associations: [
      { type: 'Product', id: 'PROD-101', name: 'Steel Shaft A' },
      { type: 'WorkOrder', id: 'WO-5501', name: 'Shaft Batch 01' }
    ]
  },
  {
    id: 'QP-002',
    name: 'Surface Roughness',
    type: 'Numeric',
    unit: 'µm',
    min: 0.1,
    max: 0.8,
    description: 'Ra value for polished surfaces.',
    associations: [
      { type: 'Product', id: 'PROD-202', name: 'Mirror Plate' }
    ]
  },
  {
    id: 'QP-003',
    name: 'Visual Inspection',
    type: 'Pass/Fail',
    description: 'Check for surface scratches or dents.',
    associations: [
      { type: 'Product', id: 'PROD-ALL', name: 'All Finished Goods' }
    ]
  }
];

export default function QualityParameters() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search parameters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold border border-zinc-700">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20">
            <Plus size={18} />
            Define Parameter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockParameters.map((param) => (
          <div key={param.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-orange-500 border border-zinc-700 group-hover:border-orange-500/50 transition-all">
                  <Settings size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{param.name}</h3>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{param.id} • {param.type}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                {param.type === 'Numeric' && (
                  <span className="text-sm font-mono text-orange-500">
                    {param.min} - {param.max} {param.unit}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
              {param.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Associations</h4>
              <div className="flex flex-wrap gap-2">
                {param.associations.map((assoc, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300"
                  >
                    {assoc.type === 'Product' ? <Box size={12} className="text-blue-500" /> : <ClipboardList size={12} className="text-purple-500" />}
                    <span className="font-mono text-[10px] opacity-50">{assoc.id}</span>
                    <span>{assoc.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 flex gap-2">
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all">
                Edit Parameter
              </button>
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all">
                Manage Associations
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
