import React, { useState, useEffect } from 'react';
import { 
  Workflow, 
  Plus, 
  Save, 
  Trash2, 
  GripVertical, 
  Cpu, 
  User, 
  Clock, 
  Settings, 
  RefreshCw, 
  ChevronRight, 
  Box 
} from 'lucide-react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface WorkflowStep {
  id: string;
  step_name: string;
  machine_id: string;
  sequence_order: number;
  estimated_duration_minutes: number;
  operator_role: string;
}

export default function WorkflowEditor() {
  const [products, setProducts] = useState([
    { id: '1', name: 'EV Bike Model S', sku: 'EVB-S-001' },
    { id: '2', name: 'EV Scooter Pro', sku: 'EVS-P-002' }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const loadWorkflow = (productId: string) => {
    // Mock loading workflow from API
    const mockWorkflow = [
      { id: 's1', step_name: 'Frame Assembly', machine_id: 'M1', sequence_order: 1, estimated_duration_minutes: 45, operator_role: 'Assembler' },
      { id: 's2', step_name: 'Motor Install', machine_id: 'M2', sequence_order: 2, estimated_duration_minutes: 30, operator_role: 'Technician' },
      { id: 's3', step_name: 'Battery Integration', machine_id: 'M3', sequence_order: 3, estimated_duration_minutes: 60, operator_role: 'Electrician' },
      { id: 's4', step_name: 'QC Testing', machine_id: 'QC1', sequence_order: 4, estimated_duration_minutes: 20, operator_role: 'QC Inspector' }
    ];
    setSteps(mockWorkflow);
  };

  useEffect(() => {
    if (selectedProduct) {
      loadWorkflow(selectedProduct.id);
    }
  }, [selectedProduct]);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      step_name: 'New Process Step',
      machine_id: 'M1',
      sequence_order: steps.length + 1,
      estimated_duration_minutes: 30,
      operator_role: 'Operator'
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const updateStep = (id: string, field: keyof WorkflowStep, value: any) => {
    setSteps(steps.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Workflow configuration saved successfully');
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-zinc-100">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Engine</h1>
          <p className="text-zinc-500 mt-1">Design dynamic manufacturing processes per product</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving || !selectedProduct}
          className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          Save Workflow
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Selector */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Select Product</h2>
          <div className="space-y-2">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedProduct?.id === product.id 
                    ? 'bg-orange-500/10 border-orange-500/50' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Box size={20} className={selectedProduct?.id === product.id ? 'text-orange-500' : 'text-zinc-500'} />
                    <div>
                      <h3 className="font-bold text-sm">{product.name}</h3>
                      <p className="text-xs text-zinc-500 font-mono uppercase">{product.sku}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workflow Steps Editor */}
        <div className="lg:col-span-3 space-y-4">
          {selectedProduct ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Workflow size={20} className="text-orange-500" />
                  Process Steps: {selectedProduct.name}
                </h2>
                <button 
                  onClick={addStep}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>

              <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-3">
                <AnimatePresence initial={false}>
                  {steps.map((step) => (
                    <Reorder.Item 
                      key={step.id} 
                      value={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 group hover:border-zinc-700 transition-all"
                    >
                      <div className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400">
                        <GripVertical size={20} />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Step Name</label>
                          <input 
                            type="text" 
                            value={step.step_name}
                            onChange={(e) => updateStep(step.id, 'step_name', e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Machine / Station</label>
                          <div className="relative">
                            <Cpu className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                            <input 
                              type="text" 
                              value={step.machine_id}
                              onChange={(e) => updateStep(step.id, 'machine_id', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Operator Role</label>
                          <div className="relative">
                            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                            <input 
                              type="text" 
                              value={step.operator_role}
                              onChange={(e) => updateStep(step.id, 'operator_role', e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase">Duration (min)</label>
                          <div className="relative">
                            <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                            <input 
                              type="number" 
                              value={step.estimated_duration_minutes}
                              onChange={(e) => updateStep(step.id, 'estimated_duration_minutes', parseInt(e.target.value))}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => removeStep(step.id)}
                        className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/50 border-2 border-dashed border-zinc-800 rounded-2xl">
              <Workflow className="text-zinc-700 mb-4" size={48} />
              <h3 className="text-xl font-bold text-zinc-500">Select a product to design its workflow</h3>
              <p className="text-sm text-zinc-600 mt-2">Define step-by-step manufacturing processes, machines, and roles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
