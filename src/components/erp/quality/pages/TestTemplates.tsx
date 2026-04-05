import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  ChevronRight, 
  Settings, 
  Trash2, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Layout,
  ListChecks,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../../../../lib/utils';

interface TestParameter {
  id: string;
  name: string;
  type: 'Numeric' | 'Pass/Fail' | 'Text';
  unit?: string;
  min?: number;
  max?: number;
  required: boolean;
}

interface TestTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  parameters: TestParameter[];
  lastUpdated: string;
  version: string;
}

const mockTemplates: TestTemplate[] = [
  {
    id: 'TMP-001',
    name: 'Final Assembly Inspection',
    category: 'Assembly',
    description: 'Standard checklist for final product assembly verification.',
    version: '1.2',
    lastUpdated: '2024-03-15',
    parameters: [
      { id: 'P1', name: 'Visual Surface Check', type: 'Pass/Fail', required: true },
      { id: 'P2', name: 'Mounting Torque', type: 'Numeric', unit: 'Nm', min: 12, max: 15, required: true },
      { id: 'P3', name: 'Operational Noise Level', type: 'Numeric', unit: 'dB', max: 65, required: false }
    ]
  },
  {
    id: 'TMP-002',
    name: 'Raw Material Verification',
    category: 'Incoming',
    description: 'Verification of raw material chemical and physical properties.',
    version: '2.0',
    lastUpdated: '2024-03-20',
    parameters: [
      { id: 'P4', name: 'Material Grade', type: 'Text', required: true },
      { id: 'P5', name: 'Hardness (Rockwell)', type: 'Numeric', unit: 'HRC', min: 45, max: 55, required: true }
    ]
  }
];

export default function TestTemplates() {
  const [templates, setTemplates] = useState<TestTemplate[]>(mockTemplates);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTemplate, setNewTemplate] = useState<Partial<TestTemplate>>({
    name: '',
    category: 'General',
    description: '',
    parameters: []
  });

  const handleAddParameter = () => {
    const newParam: TestParameter = {
      id: `P${(newTemplate.parameters?.length || 0) + 1}`,
      name: '',
      type: 'Pass/Fail',
      required: true
    };
    setNewTemplate(prev => ({
      ...prev,
      parameters: [...(prev.parameters || []), newParam]
    }));
  };

  const handleRemoveParameter = (id: string) => {
    setNewTemplate(prev => ({
      ...prev,
      parameters: prev.parameters?.filter(p => p.id !== id)
    }));
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name) {
      toast.error('Template name is required');
      return;
    }
    
    const template: TestTemplate = {
      id: `TMP-00${templates.length + 1}`,
      name: newTemplate.name!,
      category: newTemplate.category!,
      description: newTemplate.description || '',
      version: '1.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      parameters: newTemplate.parameters || []
    };

    setTemplates([template, ...templates]);
    setIsCreating(false);
    setNewTemplate({ name: '', category: 'General', description: '', parameters: [] });
    toast.success('Testing template created successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Layout className="text-orange-500" /> Testing Templates
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Define and manage standardized QC test checklists</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20"
        >
          <Plus size={18} />
          Create New Template
        </button>
      </div>

      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((template) => (
          <motion.div 
            layout
            key={template.id} 
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-orange-500 border border-zinc-700 group-hover:border-orange-500/50 transition-all">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{template.name}</h3>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{template.id} • v{template.version}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-bold text-zinc-400 border border-zinc-700 uppercase tracking-widest">
                {template.category}
              </span>
            </div>

            <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
              {template.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Parameters ({template.parameters.length})</h4>
                <span className="text-[10px] text-zinc-500">Last Updated: {template.lastUpdated}</span>
              </div>
              <div className="space-y-2">
                {template.parameters.slice(0, 3).map((param) => (
                  <div key={param.id} className="flex items-center justify-between text-xs p-2 bg-zinc-950/50 border border-zinc-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <ListChecks size={14} className="text-orange-500/50" />
                      <span className="text-zinc-300">{param.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">{param.type}</span>
                  </div>
                ))}
                {template.parameters.length > 3 && (
                  <p className="text-[10px] text-zinc-500 text-center italic">+{template.parameters.length - 3} more parameters</p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 flex gap-2">
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                <Settings size={14} /> Edit Template
              </button>
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                <ArrowRight size={14} /> Use Template
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Template Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">Create Testing Template</h3>
                    <p className="text-xs text-zinc-500">Define a new standardized checklist</p>
                  </div>
                </div>
                <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Template Name</label>
                    <input 
                      type="text" 
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="e.g. Battery Safety Test"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</label>
                    <select 
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all appearance-none"
                    >
                      <option>General</option>
                      <option>Assembly</option>
                      <option>Incoming</option>
                      <option>Electrical</option>
                      <option>Mechanical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Description</label>
                  <textarea 
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    placeholder="Describe the purpose of this template..."
                    rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Test Parameters</label>
                    <button 
                      onClick={handleAddParameter}
                      className="text-[10px] font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
                    >
                      <Plus size={12} /> Add Parameter
                    </button>
                  </div>

                  <div className="space-y-3">
                    {newTemplate.parameters?.map((param, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        key={param.id} 
                        className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4 relative group"
                      >
                        <button 
                          onClick={() => handleRemoveParameter(param.id)}
                          className="absolute top-2 right-2 p-1.5 text-zinc-600 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Parameter Name</label>
                            <input 
                              type="text" 
                              value={param.name}
                              onChange={(e) => {
                                const updated = [...(newTemplate.parameters || [])];
                                updated[idx].name = e.target.value;
                                setNewTemplate({...newTemplate, parameters: updated});
                              }}
                              placeholder="e.g. Voltage Check"
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Type</label>
                            <select 
                              value={param.type}
                              onChange={(e) => {
                                const updated = [...(newTemplate.parameters || [])];
                                updated[idx].type = e.target.value as any;
                                setNewTemplate({...newTemplate, parameters: updated});
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                            >
                              <option>Numeric</option>
                              <option>Pass/Fail</option>
                              <option>Text</option>
                            </select>
                          </div>
                        </div>

                        {param.type === 'Numeric' && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Unit</label>
                              <input 
                                type="text" 
                                value={param.unit}
                                onChange={(e) => {
                                  const updated = [...(newTemplate.parameters || [])];
                                  updated[idx].unit = e.target.value;
                                  setNewTemplate({...newTemplate, parameters: updated});
                                }}
                                placeholder="V, mm, etc."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Min</label>
                              <input 
                                type="number" 
                                value={param.min}
                                onChange={(e) => {
                                  const updated = [...(newTemplate.parameters || [])];
                                  updated[idx].min = parseFloat(e.target.value);
                                  setNewTemplate({...newTemplate, parameters: updated});
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Max</label>
                              <input 
                                type="number" 
                                value={param.max}
                                onChange={(e) => {
                                  const updated = [...(newTemplate.parameters || [])];
                                  updated[idx].max = parseFloat(e.target.value);
                                  setNewTemplate({...newTemplate, parameters: updated});
                                }}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {(!newTemplate.parameters || newTemplate.parameters.length === 0) && (
                      <div className="py-8 text-center border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-xs text-zinc-500">No parameters added yet. Click "Add Parameter" to start.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex gap-3">
                <button 
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveTemplate}
                  className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Template
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
