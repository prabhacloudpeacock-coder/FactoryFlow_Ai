import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
  NodeProps,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  NodeTypes,
  EdgeTypes,
  getBezierPath,
  EdgeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Plus, 
  Settings, 
  Trash2, 
  ChevronRight, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Package, 
  FileText,
  Save,
  Play,
  History,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Maximize2,
  MousePointer2
} from 'lucide-react';
import { toast } from 'sonner';

// --- Custom Node Components ---

const OperationNode = ({ data, selected }: NodeProps) => {
  const { name, type, duration, bom, qualityGate } = data as any;
  
  return (
    <div className={clsx(
      "min-w-[240px] p-4 bg-zinc-900 border rounded-2xl transition-all group relative",
      selected ? "border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10" : "border-zinc-800 hover:border-zinc-700"
    )}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500 border-2 border-zinc-900" />
      
      <div className="flex items-center gap-3 mb-3">
        <div className={clsx(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
          type === 'machine' ? "bg-blue-500/10 text-blue-500" :
          type === 'manual' ? "bg-purple-500/10 text-purple-500" :
          "bg-green-500/10 text-green-500"
        )}>
          {type === 'machine' ? <Cpu size={16} /> :
           type === 'manual' ? <Settings size={16} /> :
           <ShieldCheck size={16} />}
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-zinc-100 text-sm truncate">{name}</h3>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">{type}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {bom && bom.length > 0 && (
            <div className="px-1.5 py-0.5 bg-zinc-800 rounded-md text-[9px] text-zinc-400 flex items-center gap-1">
              <Package size={8} /> {bom.length}
            </div>
          )}
          {qualityGate && (
            <div className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md text-[9px] text-green-500 flex items-center gap-1">
              <ShieldCheck size={8} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-[9px] font-bold text-zinc-500">
          <Clock size={10} /> {duration}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500 border-2 border-zinc-900" />
    </div>
  );
};

const StageNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={clsx(
      "w-full h-full p-4 bg-zinc-950/40 border-2 border-dashed rounded-[32px] pointer-events-none transition-all",
      selected ? "border-blue-500/50 bg-blue-500/5" : "border-zinc-800/50"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Layers size={14} className="text-zinc-500" />
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{(data as any).label}</span>
      </div>
    </div>
  );
};

const ProminentEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  return (
    <motion.path
      id={id}
      style={{
        ...style,
        strokeWidth: 4,
        fill: 'none',
        stroke: style.stroke || '#3b82f6',
      }}
      className="react-flow__edge-path cursor-pointer"
      d={edgePath}
      markerEnd={markerEnd}
      whileHover={{ 
        strokeWidth: 8,
        stroke: '#60a5fa',
      }}
      transition={{ duration: 0.2 }}
    />
  );
};

const nodeTypes: NodeTypes = {
  operation: OperationNode,
  stage: StageNode,
};

const edgeTypes: EdgeTypes = {
  prominent: ProminentEdge,
};

// --- Main Component ---

interface WorkflowStep {
  id: string;
  name: string;
  type: 'machine' | 'manual' | 'quality';
  machine?: string;
  duration: string;
  bom: { part: string; qty: number }[];
  instructions: string[];
  qualityGate?: string;
}

export default function ProductWorkflow() {
  const [activeRouting, setActiveRouting] = useState('EV-BIKE-MODEL-S-MAIN');
  
  const initialNodes: Node[] = [
    { id: 'stage-1', type: 'stage', position: { x: -20, y: -40 }, data: { label: 'Preparation Stage' }, style: { width: 300, height: 400 }, dragHandle: '.drag-handle' },
    { id: 'stage-2', type: 'stage', position: { x: 320, y: -40 }, data: { label: 'Assembly Stage' }, style: { width: 300, height: 400 } },
    { id: 'stage-3', type: 'stage', position: { x: 660, y: -40 }, data: { label: 'Quality Stage' }, style: { width: 300, height: 400 } },
    
    { id: '1', type: 'operation', position: { x: 30, y: 50 }, parentId: 'stage-1', extent: 'parent', data: { name: 'Frame Preparation', type: 'manual', duration: '15m', bom: [{ part: 'FRAME-AL-01', qty: 1 }], instructions: ['Inspect frame', 'Clean mounting points'], qualityGate: 'Visual Inspection' } },
    { id: '2', type: 'operation', position: { x: 30, y: 200 }, parentId: 'stage-1', extent: 'parent', data: { name: 'Fork Installation', type: 'manual', duration: '10m', bom: [{ part: 'FORK-SUSP-01', qty: 1 }], instructions: ['Install headset', 'Insert fork'], qualityGate: 'Torque Verification' } },
    
    { id: '3', type: 'operation', position: { x: 30, y: 50 }, parentId: 'stage-2', extent: 'parent', data: { name: 'Motor Mount', type: 'machine', machine: 'ROBOT-ARM-02', duration: '5m', bom: [{ part: 'MOTOR-HUB-500W', qty: 1 }], instructions: ['Align motor', 'Automated torque'], qualityGate: 'Alignment Check' } },
    { id: '4', type: 'operation', position: { x: 30, y: 200 }, parentId: 'stage-2', extent: 'parent', data: { name: 'Battery Placement', type: 'manual', duration: '5m', bom: [{ part: 'BATT-48V-15AH', qty: 1 }], instructions: ['Slide battery', 'Engage lock'], qualityGate: 'Lock Verification' } },
    
    { id: '5', type: 'operation', position: { x: 30, y: 50 }, parentId: 'stage-3', extent: 'parent', data: { name: 'Quality Inspection', type: 'quality', duration: '10m', bom: [], instructions: ['Visual inspection'], qualityGate: 'Final Pass' } },
    { id: '6', type: 'operation', position: { x: 30, y: 200 }, parentId: 'stage-3', extent: 'parent', data: { name: 'Final Functional Test', type: 'quality', duration: '15m', bom: [], instructions: ['Connect to dyno', 'Run power sweep'], qualityGate: 'Full System Pass' } },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'prominent', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
    { id: 'e2-3', source: '2', target: '3', type: 'prominent', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
    { id: 'e3-4', source: '3', target: '4', type: 'prominent', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
    { id: 'e4-5', source: '4', target: '5', type: 'prominent', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
    { id: 'e5-6', source: '5', target: '6', type: 'prominent', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ 
      ...params, 
      type: 'prominent',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, 
    }, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((_: any, node: Node) => {
    if (node.type === 'operation') {
      setSelectedNodeId(node.id);
    } else {
      setSelectedNodeId(null);
    }
  }, []);

  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId]);

  const handleAddStep = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNode: Node = {
      id,
      type: 'operation',
      position: { x: 100, y: 100 },
      data: { 
        name: 'New Operation', 
        type: 'manual', 
        duration: '10m', 
        bom: [], 
        instructions: ['New instruction'] 
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setSelectedNodeId(id);
    toast.success('New operation added to canvas');
  };

  const handleAddStage = () => {
    const id = `stage-${Math.random().toString(36).substr(2, 9)}`;
    const newNode: Node = {
      id,
      type: 'stage',
      position: { x: 100, y: 100 },
      data: { label: 'New Stage' },
      style: { width: 300, height: 400 },
    };
    setNodes((nds) => nds.concat(newNode));
    toast.success('New logical stage added');
  };

  const handleDeleteSelected = () => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
      setSelectedNodeId(null);
      toast.error('Operation removed from routing');
    }
  };

  const handleSave = () => {
    toast.success('Product routing saved successfully', {
      description: `Version 1.4.2 released for ${activeRouting}`
    });
  };

  const updateNodeData = (field: string, value: any) => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.map((node) => {
      if (node.id === selectedNodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            [field]: value
          }
        };
      }
      return node;
    }));
  };

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <GitBranch className="text-blue-500" /> Visual Workflow Designer
          </h2>
          <p className="text-sm text-zinc-500">Graphically design process routing, stages, and dependencies</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1">
            <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 text-zinc-100">Draft</button>
            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-zinc-500 hover:text-zinc-300">Active</button>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-zinc-950 font-bold px-6 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Save size={18} /> Save Routing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Left: Workflow Canvas */}
        <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            colorMode="dark"
            className="bg-zinc-950"
          >
            <Background color="#27272a" gap={20} />
            <Controls className="bg-zinc-900 border-zinc-800 fill-zinc-100" />
            <MiniMap 
              className="bg-zinc-900 border-zinc-800" 
              nodeColor={(n) => {
                if (n.type === 'stage') return '#18181b';
                if (n.data.type === 'machine') return '#3b82f6';
                if (n.data.type === 'manual') return '#a855f7';
                return '#22c55e';
              }}
            />
            
            <Panel position="top-left" className="flex flex-col gap-2">
              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-2 rounded-2xl flex flex-col gap-1">
                <button 
                  onClick={handleAddStep}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                >
                  <Plus size={14} /> Add Operation
                </button>
                <button 
                  onClick={handleAddStage}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-purple-500 hover:bg-purple-500/10 rounded-xl transition-all"
                >
                  <Layers size={14} /> Add Stage
                </button>
                <div className="h-px bg-zinc-800 my-1" />
                <button 
                  onClick={handleDeleteSelected}
                  disabled={!selectedNodeId}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
              
              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-3 rounded-2xl">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Controls</p>
                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="flex items-center gap-1 text-[10px]">
                    <MousePointer2 size={12} /> Select
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <Maximize2 size={12} /> Pan
                  </div>
                </div>
              </div>
            </Panel>

            <Panel position="bottom-center" className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Machine</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Manual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Quality</span>
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Right: Step Details Panel */}
        <div className="overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-100">Operation Details</h3>
                  <button onClick={() => setSelectedNodeId(null)} className="text-zinc-500 hover:text-zinc-300">
                    <History size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Operation Name</label>
                    <input 
                      type="text" 
                      value={selectedNode.data.name as string}
                      onChange={(e) => updateNodeData('name', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Type</label>
                      <select 
                        value={selectedNode.data.type as string}
                        onChange={(e) => updateNodeData('type', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-sm text-zinc-100 focus:outline-none"
                      >
                        <option value="machine">Machine</option>
                        <option value="manual">Manual</option>
                        <option value="quality">Quality</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Duration</label>
                      <input 
                        type="text" 
                        value={selectedNode.data.duration as string}
                        onChange={(e) => updateNodeData('duration', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-sm text-zinc-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  {selectedNode.data.type === 'machine' && (
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Assigned Machine</label>
                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                        <Cpu size={16} className="text-blue-500" />
                        <input 
                          type="text"
                          value={(selectedNode.data.machine as string) || ''}
                          onChange={(e) => updateNodeData('machine', e.target.value)}
                          placeholder="Assign machine..."
                          className="bg-transparent border-none text-sm text-zinc-300 font-bold focus:outline-none w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Package size={14} /> Bill of Materials
                    </h4>
                    <button className="text-[10px] text-blue-500 font-bold hover:underline">Add Part</button>
                  </div>
                  <div className="space-y-2">
                    {(selectedNode.data.bom as any[]).map((item, idx) => (
                      <div key={idx} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-zinc-300 font-mono">{item.part}</span>
                        <span className="text-xs font-bold text-zinc-500">x{item.qty}</span>
                      </div>
                    ))}
                    {(selectedNode.data.bom as any[]).length === 0 && (
                      <p className="text-xs text-zinc-600 italic">No parts required for this step.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} /> Instructions
                  </h4>
                  <div className="space-y-2">
                    {(selectedNode.data.instructions as string[]).map((inst, idx) => (
                      <div key={idx} className="flex gap-3 text-xs text-zinc-400">
                        <span className="text-zinc-600 font-bold">{idx + 1}.</span>
                        <p>{inst}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Quality Gate</label>
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-green-500">
                      <ShieldCheck size={16} />
                      <input 
                        type="text"
                        value={(selectedNode.data.qualityGate as string) || ''}
                        onChange={(e) => updateNodeData('qualityGate', e.target.value)}
                        placeholder="Define quality gate..."
                        className="bg-transparent border-none text-sm font-bold text-zinc-200 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 h-full min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                  <GitBranch size={32} />
                </div>
                <p className="text-sm text-zinc-500">Select an operation node on the canvas to view and edit its detailed process parameters.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
