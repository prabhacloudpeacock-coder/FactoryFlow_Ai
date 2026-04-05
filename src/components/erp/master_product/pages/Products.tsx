import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Reorder, useMotionValue } from 'framer-motion';
import { 
  Plus, 
  ArrowLeft, 
  MoreHorizontal, 
  MousePointer2, 
  GitBranch, 
  Link2, 
  Trash2, 
  Maximize2, 
  ArrowRight, 
  Camera, 
  MoreVertical,
  CheckCircle2,
  ZoomIn,
  RotateCw,
  ZoomOut,
  Search,
  Layout,
  Scan,
  ScanBarcode,
  Keyboard,
  Wrench,
  Printer,
  Scale,
  ClipboardCheck,
  Upload,
  Cpu,
  Settings,
  X,
  Image as ImageIcon,
  PlaySquare,
  PenTool,
  Circle,
  Hexagon,
  Info,
  AlignLeft,
  Type,
  Play
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';

interface ProcessStep {
  id: string;
  name: string;
  steps: number;
  inputs: number;
  image?: string;
  x: number;
  y: number;
  groupId?: string;
}

interface ProcessGroup {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'straight' | 'curved';
}

interface CADMetadata {
  id: string;
  fileFormat: string;
  version: string;
  rotation: string;
  linkedParts: number;
}

interface BOMPart {
  id: string;
  name: string;
  type: string;
  qty: number;
}

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: string;
}

interface TestingRecord {
  id: string;
  testName: string;
  result: 'PASS' | 'FAIL';
}

interface ProductsProps {
  activeProcessId: string | null;
  onProcessChange: (id: string | null) => void;
  isAddingExternal?: boolean;
  onAddComplete?: () => void;
}

export default function Products({ activeProcessId, onProcessChange, isAddingExternal, onAddComplete }: ProductsProps) {
  const [activeTab, setActiveTab] = useState('products');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isAddingExternal) {
      setIsAdding(true);
    }
  }, [isAddingExternal]);
  
  // Creation State
  const [productName, setProductName] = useState('E-Bike X1 Pro');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [activeDesignTab, setActiveDesignTab] = useState('Definition');

  const renderTabContent = () => {
    switch (activeDesignTab) {
      case 'Definition':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Master Product Definition</h2>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Product ID</p>
                <p className="font-mono">EVB-X1-001</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Product Name</p>
                <p className="font-mono">E-Bike X1 Pro</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Category</p>
                <p className="font-mono">Electric Vehicle</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Variant</p>
                <p className="font-mono">Lithium Battery / 60V</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Length</p>
                <p className="font-mono">180 cm</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Width</p>
                <p className="font-mono">70 cm</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Height</p>
                <p className="font-mono">110 cm</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg">
                <p className="text-xs text-zinc-500 font-bold">Weight</p>
                <p className="font-mono">25 kg</p>
              </div>
              <div className="p-4 bg-zinc-100 rounded-lg col-span-2">
                <p className="text-xs text-zinc-500 font-bold">Material Composition</p>
                <p className="font-mono">Aluminum Alloy, Carbon Fiber, Steel</p>
              </div>
            </div>
          </div>
        );
      case '360° View':
        return (
          <div className="flex flex-col h-full bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
            <div className="flex-1 flex items-center justify-center bg-zinc-900 rounded-xl relative overflow-hidden shadow-inner">
              {/* Simulated 3D Viewer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
              <div className="flex flex-col items-center gap-4 text-zinc-500">
                <ImageIcon size={64} className="text-zinc-700" />
                <p className="text-sm font-medium">Interactive 3D Model Viewer</p>
              </div>
              
              {/* Simulated Controls */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm"><RotateCw size={16} /></button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm"><ZoomIn size={16} /></button>
              </div>
            </div>

            {/* Modern Metadata Display */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">CAD ID</p>
                <p className="font-mono text-sm font-bold text-zinc-900">{cadMetadata.id}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Format</p>
                <p className="font-mono text-sm font-bold text-zinc-900">{cadMetadata.fileFormat}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Version</p>
                <p className="font-mono text-sm font-bold text-zinc-900">{cadMetadata.version}</p>
              </div>
            </div>
          </div>
        );
      case 'Parts':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase">
                <th className="pb-4">Part ID</th>
                <th className="pb-4">Part Name</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Qty</th>
              </tr>
            </thead>
            <tbody>
              {bomParts.map(part => (
                <tr key={part.id} className="border-t border-zinc-100">
                  <td className="py-3 font-mono text-sm">{part.id}</td>
                  <td className="py-3 text-sm">{part.name}</td>
                  <td className="py-3 text-sm">{part.type}</td>
                  <td className="py-3 text-sm">{part.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Manufacturing':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Manufacturing Process</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-zinc-500 uppercase">
                  <th className="pb-4">Step No</th>
                  <th className="pb-4">Process</th>
                  <th className="pb-4">Machine / Station</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, process: 'Frame Assembly', station: 'Welding Unit' },
                  { id: 2, process: 'Motor Installation', station: 'Motor Fit Station' },
                  { id: 3, process: 'Battery Mounting', station: 'Battery Bay' },
                  { id: 4, process: 'Wiring Setup', station: 'Electrical Station' },
                  { id: 5, process: 'Controller Programming', station: 'ECU Station' },
                  { id: 6, process: 'Final Assembly', station: 'Assembly Line' },
                ].map(step => (
                  <tr key={step.id} className="border-t border-zinc-100">
                    <td className="py-3 font-mono text-sm">{step.id}</td>
                    <td className="py-3 text-sm">{step.process}</td>
                    <td className="py-3 text-sm">{step.station}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Testing':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase">
                <th className="pb-4">Test ID</th>
                <th className="pb-4">Test Name</th>
                <th className="pb-4">Result</th>
              </tr>
            </thead>
            <tbody>
              {testingRecords.map(test => (
                <tr key={test.id} className="border-t border-zinc-100">
                  <td className="py-3 font-mono text-sm">{test.id}</td>
                  <td className="py-3 text-sm">{test.testName}</td>
                  <td className={clsx("py-3 text-sm font-bold", test.result === 'PASS' ? 'text-emerald-600' : 'text-red-600')}>{test.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };
  const [toolMode, setToolMode] = useState<'select' | 'straight' | 'curved'>('select');
  const [linkSourceId, setLinkSourceId] = useState<string | null>(null);

  const [cadMetadata, setCadMetadata] = useState<CADMetadata>({
    id: 'CAD-EVB-X1',
    fileFormat: 'STEP / STL',
    version: 'v1.2',
    rotation: '360° Interactive',
    linkedParts: 24
  });

  const [bomParts, setBomParts] = useState<BOMPart[]>([
    { id: 'P001', name: 'Frame Chassis', type: 'Mechanical', qty: 1 },
    { id: 'P002', name: 'Hub Motor (BLDC)', type: 'Electrical', qty: 1 },
    { id: 'P003', name: 'Battery Pack (60V)', type: 'Electrical', qty: 1 },
    { id: 'P004', name: 'Motor Controller', type: 'PCB', qty: 1 },
    { id: 'P005', name: 'Throttle', type: 'Input Device', qty: 1 },
    { id: 'P006', name: 'Brake System', type: 'Mechanical', qty: 2 },
    { id: 'P007', name: 'Display Unit', type: 'Electronics', qty: 1 },
    { id: 'P008', name: 'Wiring Harness', type: 'Electrical', qty: 1 },
  ]);

  const [productionOrder, setProductionOrder] = useState<ProductionOrder>({
    id: 'PROD-2026-041',
    product: 'E-Bike X1 Pro',
    quantity: 100,
    startDate: '2026-04-05',
    endDate: '2026-04-10',
    status: 'In Progress'
  });

  const [testingRecords, setTestingRecords] = useState<TestingRecord[]>([
    { id: 'T001', testName: 'Battery Voltage Test', result: 'PASS' },
    { id: 'T002', testName: 'Motor RPM Test', result: 'PASS' },
    { id: 'T003', testName: 'Brake Efficiency', result: 'PASS' },
    { id: 'T004', testName: 'Controller Response', result: 'PASS' },
    { id: 'T005', testName: 'Road Test (5km)', result: 'PASS' },
  ]);
  
  const [groups, setGroups] = useState<ProcessGroup[]>([
    { id: 'g1', name: 'Frame & Powertrain', x: -450, y: -250, width: 620, height: 220 },
    { id: 'g2', name: 'Electronics & Wiring', x: -450, y: 50, width: 620, height: 220 }
  ]);

  const [processes, setProcesses] = useState<ProcessStep[]>([
    // Group 1: Frame & Powertrain
    { id: 'p1', name: 'Frame Prep', steps: 0, inputs: 0, x: -350, y: -150, groupId: 'g1' },
    { id: 'p2', name: 'Fork Installation', steps: 0, inputs: 0, x: -150, y: -150, groupId: 'g1' },
    { id: 'p3', name: 'Motor Mount', steps: 0, inputs: 0, x: 50, y: -150, groupId: 'g1' },
    
    // Group 2: Electronics & Wiring
    { id: 'p4', name: 'Battery Placement', steps: 0, inputs: 0, x: -350, y: 150, groupId: 'g2' },
    { id: 'p5', name: 'Controller Setup', steps: 0, inputs: 0, x: -150, y: 150, groupId: 'g2' },
    { id: 'p6', name: 'Wiring Harness', steps: 0, inputs: 0, x: 50, y: 150, groupId: 'g2' },

    // Outside Groups
    { id: 'p7', name: 'Wheels & Brakes', steps: 0, inputs: 0, x: 250, y: -50 },
    { id: 'p8', name: 'Final QA & Test', steps: 0, inputs: 0, x: 500, y: -50 },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', from: 'p1', to: 'p2', type: 'straight' },
    { id: 'c2', from: 'p2', to: 'p3', type: 'straight' },
    { id: 'c3', from: 'p3', to: 'p4', type: 'curved' },
    { id: 'c4', from: 'p4', to: 'p5', type: 'straight' },
    { id: 'c5', from: 'p5', to: 'p6', type: 'straight' },
    { id: 'c6', from: 'p6', to: 'p7', type: 'curved' },
    { id: 'c7', from: 'p7', to: 'p8', type: 'straight' },
  ]);

  const [editingProcessId, setEditingProcessId] = useState<string | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.8);
  const [activeProcessTab, setActiveProcessTab] = useState('List');
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [editingActionIndex, setEditingActionIndex] = useState<number | null>(null);
  const [currentActionStep, setCurrentActionStep] = useState<'select' | 'configure' | 'assign'>('select');
  const [selectedActionType, setSelectedActionType] = useState<string | null>(null);
  const [scanConfig, setScanConfig] = useState({
    label: 'Pack SN',
    pattern: '[00000',
    optional: false,
    unique: true,
    isSerial: true,
    upstream: false
  });
  const [manualConfig, setManualConfig] = useState({
    label: '',
    type: 'Number',
    min: '',
    max: '',
    optional: false
  });
  const [qualityConfig, setQualityConfig] = useState({
    label: '',
    type: 'Pass/Fail',
    instructions: '',
    optional: false
  });
  const [torqueConfig, setTorqueConfig] = useState({
    label: 'Torque Value',
    target: '',
    tolerance: '',
    unit: 'Nm',
    optional: false
  });
  const [printConfig, setPrintConfig] = useState({
    label: 'Print Label',
    template: 'Standard Label',
    copies: 1,
    autoPrint: true
  });
  const [measureConfig, setMeasureConfig] = useState({
    label: 'Measurement',
    unit: 'mm',
    min: '',
    max: '',
    optional: false
  });
  const [machineConfig, setMachineConfig] = useState({
    label: 'Machine Integration',
    machineId: '',
    command: 'Start Cycle',
    waitForCompletion: true
  });
  const [fileConfig, setFileConfig] = useState({
    label: 'Upload Document',
    allowedTypes: 'All',
    maxSize: 10,
    optional: false
  });
  const [photoConfig, setPhotoConfig] = useState({
    label: 'Take Photo',
    instructions: '',
    optional: false
  });
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [selectedSteps, setSelectedSteps] = useState<Set<string>>(new Set());
  const [processSteps, setProcessSteps] = useState([
    { id: 's1', name: 'Frame Prep', type: 'Manual', autoAdvance: true, actions: [{ id: 'scan', label: 'Scan Frame SN' }] },
    { id: 's2', name: 'Fork Installation', type: 'Torque', autoAdvance: true, actions: [{ id: 'torque', label: 'Torque Fork Bolts', target: '25', tolerance: '2' }] },
    { id: 's3', name: 'Motor Mount', type: 'Torque', autoAdvance: true, actions: [{ id: 'torque', label: 'Torque Motor Bolts', target: '40', tolerance: '5' }] },
    { id: 's4', name: 'Battery Placement', type: 'Scan', autoAdvance: true, actions: [{ id: 'scan', label: 'Scan Battery SN' }] },
    { id: 's5', name: 'Controller Setup', type: 'Manual', autoAdvance: true, actions: [{ id: 'manual', label: 'Enter Firmware Version' }] },
    { id: 's6', name: 'Wiring Harness', type: 'Quality', autoAdvance: true, actions: [{ id: 'quality', label: 'Check Harness Connections', type: 'Pass/Fail' }] },
    { id: 's7', name: 'Wheels & Brakes', type: 'Torque', autoAdvance: true, actions: [{ id: 'torque', label: 'Torque Wheel Nuts', target: '50', tolerance: '5' }] },
    { id: 's8', name: 'Final QA & Test', type: 'Quality', autoAdvance: true, actions: [{ id: 'quality', label: 'Final Pass/Fail Test', type: 'Pass/Fail' }] }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const actionTypes = [
    { id: 'scan', title: 'Scan', description: 'Scan a barcode with a handheld scanner or tablet', icon: <Scan size={24} strokeWidth={1.5} /> },
    { id: 'photo', title: 'Take photo', description: 'Capture an image with a tablet or USB', icon: <Camera size={24} strokeWidth={1.5} /> },
    { id: 'manual', title: 'Manual entry', description: 'Enter a SN or measurement via touchscreen or keyboard', icon: <Keyboard size={24} strokeWidth={1.5} /> },
    { id: 'torque', title: 'Torque/Rivet', description: 'Command and record torque data from connected tools', icon: <Wrench size={24} strokeWidth={1.5} /> },
    { id: 'print', title: 'Print', description: 'Dynamically print part labels', icon: <Printer size={24} strokeWidth={1.5} /> },
    { id: 'measure', title: 'Measure', description: 'Record values from test equipment', icon: <Scale size={24} strokeWidth={1.5} /> },
    { id: 'machine', title: 'Machine connections', description: 'Read and write data from machines, tag servers, PLCs', icon: <Cpu size={24} strokeWidth={1.5} /> },
    { id: 'quality', title: 'Quality check', description: 'Checklists, multiple choice, and pass/fail confirmations', icon: <ClipboardCheck size={24} strokeWidth={1.5} /> },
    { id: 'file', title: 'File upload', description: 'Save critical records stored in files', icon: <Upload size={24} strokeWidth={1.5} /> },
  ];

  useEffect(() => {
    if (activeProcessId) {
      setIsAdding(false);
    }
  }, [activeProcessId]);

  const handleAddProcess = () => {
    const lastProcess = processes[processes.length - 1];
    const newProcess: ProcessStep = {
      id: Math.random().toString(36).substr(2, 9),
      name: `New process ${processes.length + 1}`,
      steps: 0,
      inputs: 0,
      x: lastProcess ? lastProcess.x + 250 : 0,
      y: lastProcess ? lastProcess.y : 0
    };
    setProcesses([...processes, newProcess]);
    setEditingProcessId(newProcess.id);
  };

  const handleProcessClick = (id: string) => {
    if (toolMode === 'select') return;

    if (!linkSourceId) {
      setLinkSourceId(id);
      toast.info('Select target process to complete link');
    } else {
      if (linkSourceId === id) {
        setLinkSourceId(null);
        return;
      }

      // Create connection
      const newConn: Connection = {
        id: Math.random().toString(36).substr(2, 9),
        from: linkSourceId,
        to: id,
        type: toolMode === 'straight' ? 'straight' : 'curved'
      };

      setConnections([...connections, newConn]);
      setLinkSourceId(null);
      toast.success('Connection created');
    }
  };

  const handleProcessUpdate = (id: string, updates: Partial<ProcessStep>) => {
    setProcesses(processes.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleAddGroup = () => {
    const newGroup: ProcessGroup = {
      id: `g${Math.random().toString(36).substr(2, 9)}`,
      name: 'New Group',
      x: -100,
      y: -100,
      width: 400,
      height: 300
    };
    setGroups([...groups, newGroup]);
    setEditingGroupId(newGroup.id);
  };

  const handleGroupNameChange = (id: string, newName: string) => {
    setGroups(groups.map(g => g.id === id ? { ...g, name: newName } : g));
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
    // Ungroup processes in this group
    setProcesses(processes.map(p => p.groupId === id ? { ...p, groupId: undefined } : p));
    toast.error('Group deleted');
  };

  const handleGroupProcess = (processId: string, groupId?: string) => {
    setProcesses(processes.map(p => p.id === processId ? { ...p, groupId } : p));
    if (groupId) {
      toast.success('Added to group');
    } else {
      toast.info('Removed from group');
    }
  };

  const handleDrag = (id: string, info: any) => {
    setProcesses(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          x: p.x + info.delta.x / zoom,
          y: p.y + info.delta.y / zoom
        };
      }
      return p;
    }));
  };

  const handleGroupDrag = (id: string, info: any) => {
    const deltaX = info.delta.x / zoom;
    const deltaY = info.delta.y / zoom;

    setGroups(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, x: g.x + deltaX, y: g.y + deltaY };
      }
      return g;
    }));

    setProcesses(prev => prev.map(p => {
      if (p.groupId === id) {
        return { ...p, x: p.x + deltaX, y: p.y + deltaY };
      }
      return p;
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 2));
  };

  const handleSave = () => {
    toast.success('Product configuration saved', {
      description: `${productName} has been updated with ${processes.length} processes.`
    });
    setIsAdding(false);
    onAddComplete?.();
  };

  const handleCancel = () => {
    setIsAdding(false);
    onAddComplete?.();
  };

  // Simplified arrow renderer to match user's image
  const renderConnections = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>
        {connections.map(conn => {
          const from = processes.find(p => p.id === conn.from);
          const to = processes.find(p => p.id === conn.to);
          if (!from || !to) return null;

          const cardWidth = 192;
          const cardHeight = 160;
          
          const startX = from.x + cardWidth / 2;
          const startY = from.y + cardHeight / 2;
          
          const endX = to.x - cardWidth / 2;
          const endY = to.y + cardHeight / 2;

          if (conn.type === 'curved') {
            const midX = startX + (endX - startX) * 0.5;
            const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX - 5} ${endY}`;
            return (
              <path
                key={conn.id}
                d={path}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          }

          return (
            <line
              key={conn.id}
              x1={startX}
              y1={startY}
              x2={endX - 5}
              y2={endY}
              stroke="#cbd5e1"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>
    );
  };

  if (activeProcessId) {
    const activeProcess = processes.find(p => p.id === activeProcessId) || { name: 'Pack Seal' };
    
    return (
      <div className="flex-1 flex flex-col bg-[#f8f9fa] h-full overflow-hidden">
        {/* Process Header */}
        <header className="bg-white border-b border-zinc-200">
          <div className="p-6 flex items-start gap-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 border-2 border-dashed border-zinc-200 rounded flex flex-col items-center justify-center shrink-0 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group bg-zinc-50"
            >
              <span className="text-xs font-bold text-blue-500">Add image</span>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center mb-1">
                <button 
                  onClick={() => onProcessChange(null)}
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Back to {productName}
                </button>
              </div>
              
              <h1 className="text-3xl font-bold text-zinc-900">{activeProcess.name}</h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-zinc-500">
                  <span className="font-bold text-zinc-900">Stations 1</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-zinc-500">
                  <span>Version -</span>
                </div>
                <button className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-8 px-6">
            {['List', 'Design', 'Data', 'Analytics', 'BOM'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProcessTab(tab)}
                className={clsx(
                  "pb-3 text-xs font-bold transition-all border-b-2",
                  activeProcessTab === tab 
                    ? "text-blue-500 border-blue-500" 
                    : "text-zinc-400 border-transparent hover:text-zinc-600"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>

        {/* Content based on activeProcessTab */}
        {activeProcessTab === 'List' ? (
          <>
            {/* Toolbar */}
            <div className="bg-[#eef0f2] px-6 py-2 border-b border-zinc-200 flex items-center justify-end gap-4 h-12">
              <button 
                onClick={() => setProcessSteps([...processSteps, { id: Math.random().toString(), name: 'New Step', type: 'Manual', autoAdvance: true, actions: [] }])}
                className="w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-sm transition-all flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
              <button 
                disabled={selectedSteps.size === 0}
                onClick={() => {
                  setProcessSteps(processSteps.filter(s => !selectedSteps.has(s.id)));
                  setSelectedSteps(new Set());
                }}
                className="text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-50"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Steps Table */}
            <div className="flex-1 overflow-auto relative group/canvas">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white border-b border-zinc-200">
                    <th className="w-12 p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-zinc-300" 
                        checked={selectedSteps.size === processSteps.length && processSteps.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSteps(new Set(processSteps.map(s => s.id)));
                          } else {
                            setSelectedSteps(new Set());
                          }
                        }}
                      />
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-zinc-700">Step</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-zinc-700">Actions</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-zinc-700 flex items-center gap-1">
                      Auto-advance
                      <div className="w-4 h-4 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] text-zinc-500 font-bold">i</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {processSteps.map((step, idx) => (
                    <tr 
                      key={step.id} 
                      className={clsx(
                        "border-b border-zinc-100 transition-colors group",
                        selectedSteps.has(step.id) ? "bg-blue-50/50" : "hover:bg-zinc-50"
                      )}
                    >
                      <td className="p-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-zinc-300" 
                          checked={selectedSteps.has(step.id)}
                          onChange={(e) => {
                            const newSelected = new Set(selectedSteps);
                            if (e.target.checked) {
                              newSelected.add(step.id);
                            } else {
                              newSelected.delete(step.id);
                            }
                            setSelectedSteps(newSelected);
                          }}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-6">
                          <span className="text-sm font-medium text-zinc-500 w-4">{idx + 1}</span>
                          <div className="w-10 h-7 bg-[#2a2d3d] rounded flex items-center justify-center shrink-0">
                            <div className="w-4 h-4 bg-white rounded-sm rotate-45 flex items-center justify-center overflow-hidden relative">
                              <div className="absolute inset-0 bg-blue-500 opacity-20" />
                              <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-zinc-600">{step.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {step.actions.length === 0 ? (
                            <span className="text-zinc-400">--</span>
                          ) : (
                            step.actions.map((action, aIdx) => {
                              const actionId = typeof action === 'string' ? action : action.id;
                              const actionType = actionTypes.find(at => at.id === actionId);
                              return (
                                <div key={aIdx} className="group/action relative">
                                  <button 
                                    onClick={() => {
                                      setSelectedStepId(step.id);
                                      setEditingActionIndex(aIdx);
                                      setSelectedActionType(actionId);
                                      
                                      // Load config if it exists
                                      if (actionId === 'scan') setScanConfig({ ...scanConfig, ...action });
                                      if (actionId === 'manual') setManualConfig({ ...manualConfig, ...action });
                                      if (actionId === 'quality') setQualityConfig({ ...qualityConfig, ...action });
                                      if (actionId === 'torque') setTorqueConfig({ ...torqueConfig, ...action });
                                      if (actionId === 'print') setPrintConfig({ ...printConfig, ...action });
                                      if (actionId === 'measure') setMeasureConfig({ ...measureConfig, ...action });
                                      if (actionId === 'machine') setMachineConfig({ ...machineConfig, ...action });
                                      if (actionId === 'file') setFileConfig({ ...fileConfig, ...action });
                                      if (actionId === 'photo') setPhotoConfig({ ...photoConfig, ...action });
                                      
                                      setCurrentActionStep('configure');
                                      setIsAddingAction(true);
                                    }}
                                    className="w-8 h-8 rounded flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
                                  >
                                    {actionId === 'scan' ? <ScanBarcode size={20} strokeWidth={1.5} /> : <div className="scale-75">{actionType?.icon}</div>}
                                  </button>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newSteps = [...processSteps];
                                      newSteps[idx].actions = newSteps[idx].actions.filter((_, i) => i !== aIdx);
                                      setProcessSteps(newSteps);
                                      toast.success('Action removed');
                                    }}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/action:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-zinc-600">
                        {step.autoAdvance ? 'On' : 'Off'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeProcessTab === 'Design' ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar - Step Thumbnails */}
            <div className="w-48 bg-[#2a2d3d] border-r border-zinc-800 flex flex-col overflow-y-auto">
              {processSteps.map((step, idx) => (
                <div 
                  key={step.id}
                  className={clsx(
                    "p-4 cursor-pointer transition-colors",
                    selectedStepId === step.id ? "bg-blue-600" : "hover:bg-white/5"
                  )}
                  onClick={() => setSelectedStepId(step.id)}
                >
                  <div className="bg-white rounded-md p-2 flex gap-2 shadow-sm relative">
                    <div className="absolute -top-2 -left-2 w-5 h-5 bg-zinc-800 text-white text-[10px] font-bold rounded flex items-center justify-center border border-zinc-700">
                      {idx + 1}
                    </div>
                    <div className="w-16 h-12 bg-[#1a1c2e] rounded flex items-center justify-center shrink-0">
                      <div className="w-4 h-4 bg-white rounded-sm rotate-45 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-blue-500 opacity-20" />
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 py-1">
                      <div className="h-1.5 bg-zinc-200 rounded w-full" />
                      <div className="h-1.5 bg-zinc-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Design Area */}
            <div className="flex-1 flex flex-col bg-[#363a4f]">
              {/* Toolbar */}
              <div className="h-12 bg-[#e9ecef] border-b border-zinc-300 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4 text-zinc-500">
                  <button className="hover:text-zinc-800"><ImageIcon size={18} /></button>
                  <button className="hover:text-zinc-800"><PlaySquare size={18} /></button>
                  <button className="hover:text-zinc-800"><Layout size={18} /></button>
                </div>
                <div className="flex items-center gap-4 text-zinc-500">
                  <button className="hover:text-zinc-800"><PenTool size={16} /></button>
                  <button className="hover:text-zinc-800"><ArrowRight size={16} /></button>
                  <button className="hover:text-zinc-800"><Circle size={16} /></button>
                  <button className="hover:text-zinc-800"><Hexagon size={16} /></button>
                  <button className="hover:text-zinc-800"><Info size={16} /></button>
                  <button className="hover:text-zinc-800"><AlignLeft size={16} /></button>
                  <button className="hover:text-zinc-800"><Link2 size={16} /></button>
                  <button className="hover:text-zinc-800"><Type size={16} /></button>
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 overflow-auto p-12 flex justify-center items-start">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl min-h-[600px] flex overflow-hidden">
                  {/* Media Area */}
                  <div className="flex-[3] bg-[#f8f9fa] border-r border-zinc-200 border-dashed m-6 rounded-xl flex flex-col items-center justify-center relative group">
                    <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-zinc-600 mb-4 hover:text-blue-500 transition-colors">
                      <Upload size={16} />
                    </button>
                    <p className="text-sm text-zinc-500 text-center">
                      Drag and drop image or<br />
                      <button className="text-blue-500 hover:underline font-medium">select from album</button>
                    </p>
                  </div>

                  {/* Content Area */}
                  <div className="flex-[2] p-8 flex flex-col">
                    <input 
                      type="text"
                      placeholder="Enter step title"
                      className="text-2xl font-bold text-zinc-800 placeholder:text-zinc-400 border-none focus:ring-0 p-0 mb-4 bg-transparent"
                      value={processSteps.find(s => s.id === selectedStepId)?.name || ''}
                      onChange={(e) => {
                        const newSteps = [...processSteps];
                        const idx = newSteps.findIndex(s => s.id === selectedStepId);
                        if (idx !== -1) {
                          newSteps[idx].name = e.target.value;
                          setProcessSteps(newSteps);
                        }
                      }}
                    />
                    <textarea 
                      placeholder="Enter step instructions here"
                      className="text-sm text-zinc-500 placeholder:text-zinc-400 border-none focus:ring-0 p-0 mb-8 bg-transparent resize-none h-24"
                    />
                    
                    <button 
                      onClick={() => {
                        setCurrentActionStep('select');
                        setSelectedActionType(null);
                        setIsAddingAction(true);
                      }}
                      className="w-full py-3 bg-[#e67e22] hover:bg-[#d35400] rounded-lg text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      Add action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-400 bg-zinc-50">
            <div className="flex flex-col items-center gap-4">
              <Layout size={48} className="opacity-20" />
              <p className="text-sm font-medium">{activeProcessTab} view coming soon</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isAdding) {
    return (
      <div className="flex-1 flex flex-col bg-[#f8f9fa] h-full overflow-hidden">
        {/* Creation Header */}
        <header className="bg-white border-b border-zinc-200">
          <div className="p-6 flex items-start gap-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 bg-[#1a1c2e] rounded flex items-center justify-center shrink-0 cursor-pointer group relative overflow-hidden"
            >
              {productImage ? (
                <img src={productImage} alt="Product" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-8 h-8 bg-blue-500 rounded-full blur-[2px] opacity-50" />
                  <div className="w-6 h-6 bg-white rounded-sm rotate-45 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500 opacity-20" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between mb-1">
                <button 
                  onClick={handleCancel}
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 text-xs font-medium"
                >
                  <ArrowLeft size={14} />
                  Back to Products
                </button>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCancel}
                    className="text-sm font-bold text-zinc-500 hover:text-zinc-800 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="bg-[#e67e22] hover:bg-[#d35400] text-white font-bold px-6 py-2 rounded-lg shadow-lg transition-all active:scale-95"
                  >
                    Save
                  </button>
                </div>
              </div>
              <input 
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="text-3xl font-bold text-zinc-900 bg-transparent border-none focus:ring-0 p-0 w-full"
                placeholder="Enter product name"
              />
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-0.5">Configure</p>
            </div>
            
            <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Sub Tabs */}
          <div className="px-6 flex gap-2">
            {['Definition', '360° View', 'Parts', 'Manufacturing', 'Testing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDesignTab(tab)}
                className={clsx(
                  "px-4 py-2 text-sm font-bold transition-all border-b-2 rounded-t-lg",
                  activeDesignTab === tab 
                    ? "text-blue-600 border-blue-500 bg-blue-50" 
                    : "text-zinc-600 border-transparent hover:text-zinc-900 hover:bg-zinc-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-[#e9ecef] border-b border-zinc-200 p-2 flex justify-center gap-4 relative z-20">
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-lg border border-zinc-200">
            <button 
              onClick={handleAddProcess}
              className="p-1.5 hover:bg-white rounded text-blue-600 transition-all bg-blue-500/10"
              title="Add Process"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={handleAddGroup}
              className="p-1.5 hover:bg-white rounded text-indigo-600 transition-all bg-indigo-500/10"
              title="Add Group"
            >
              <Maximize2 size={18} />
            </button>
          </div>
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-lg border border-zinc-200">
            <button 
              onClick={() => {
                setToolMode('select');
                setLinkSourceId(null);
              }}
              className={clsx(
                "p-1.5 rounded transition-all",
                toolMode === 'select' ? "bg-white text-blue-600 shadow-sm" : "hover:bg-white text-zinc-600"
              )}
            >
              <MousePointer2 size={18} />
            </button>
            <button 
              onClick={() => {
                setToolMode('straight');
                setLinkSourceId(null);
              }}
              className={clsx(
                "p-1.5 rounded transition-all",
                toolMode === 'straight' ? "bg-white text-blue-600 shadow-sm" : "hover:bg-white text-zinc-600"
              )}
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <div className="w-full h-0.5 bg-current rotate-[-45deg]" />
              </div>
            </button>
            <button 
              onClick={() => {
                setToolMode('curved');
                setLinkSourceId(null);
              }}
              className={clsx(
                "p-1.5 rounded transition-all",
                toolMode === 'curved' ? "bg-white text-blue-600 shadow-sm" : "hover:bg-white text-zinc-600"
              )}
            >
              <GitBranch size={18} className="rotate-90" />
            </button>
            <button className="p-1.5 hover:bg-white rounded text-zinc-600 transition-all">
              <span className="text-[10px] font-bold px-1">5x</span>
            </button>
          </div>
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-lg border border-zinc-200">
            <button 
              onClick={() => setConnections([])}
              className="p-1.5 hover:bg-white rounded text-zinc-600 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          {/* Zoom Controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/50 p-1 rounded-lg border border-zinc-200">
            <button onClick={() => handleZoom(-0.1)} className="p-1.5 hover:bg-white rounded text-zinc-600 transition-all">
              <ZoomOut size={16} />
            </button>
            <span className="text-[10px] font-bold w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => handleZoom(0.1)} className="p-1.5 hover:bg-white rounded text-zinc-600 transition-all">
              <ZoomIn size={16} />
            </button>
          </div>
        </div>

        {/* Canvas Area / Tab Content */}
        {activeDesignTab === 'Manufacturing' ? (
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-auto bg-[#f8f9fa] cursor-crosshair"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <motion.div 
            style={{ scale: zoom }}
            className="absolute inset-0 origin-center transition-transform duration-200"
          >
            {renderConnections()}
            
            {/* Groups */}
            {groups.map(group => (
              <motion.div
                key={group.id}
                drag={toolMode === 'select'}
                dragMomentum={false}
                onDrag={(_, info) => handleGroupDrag(group.id, info)}
                initial={{ x: group.x, y: group.y }}
                animate={{ x: group.x, y: group.y }}
                className="absolute cursor-grab active:cursor-grabbing p-4 bg-zinc-200/50 border-2 border-zinc-300 rounded-2xl group/group"
                style={{ left: '50%', top: '50%', width: group.width, height: group.height }}
              >
                <div className="absolute -top-3 left-4 flex items-center gap-2">
                  {editingGroupId === group.id ? (
                    <input 
                      autoFocus
                      type="text"
                      value={group.name}
                      onChange={(e) => handleGroupNameChange(group.id, e.target.value)}
                      onBlur={() => setEditingGroupId(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingGroupId(null)}
                      className="px-2 py-0.5 bg-[#1a1c2e] text-white text-[10px] font-bold rounded uppercase tracking-wider border-none focus:ring-0 w-32"
                    />
                  ) : (
                    <div 
                      onClick={() => setEditingGroupId(group.id)}
                      className="px-2 py-0.5 bg-[#1a1c2e] text-white text-[10px] font-bold rounded uppercase tracking-wider cursor-pointer hover:bg-blue-600 transition-colors"
                    >
                      {group.name}
                    </div>
                  )}
                  <button 
                    onClick={() => handleDeleteGroup(group.id)}
                    className="p-1 bg-red-500 text-white rounded opacity-0 group-hover/group:opacity-100 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </motion.div>
            ))}

            {processes.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button 
                    onClick={handleAddProcess}
                    className="group flex flex-col items-center gap-4 p-12 border-2 border-dashed border-zinc-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all bg-white"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Plus size={24} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-blue-600 font-bold text-lg">Create a new process</span>
                      <span className="text-zinc-500 text-sm">or drag a process from the menu</span>
                    </div>
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="relative w-full h-full p-20">
                {processes.map((process, idx) => (
                  <motion.div
                    key={process.id}
                    drag={toolMode === 'select'}
                    dragMomentum={false}
                    onDrag={(_, info) => handleDrag(process.id, info)}
                    onClick={() => handleProcessClick(process.id)}
                    initial={{ x: process.x, y: process.y }}
                    animate={{ x: process.x, y: process.y }}
                    className={clsx(
                      "absolute cursor-grab active:cursor-grabbing group z-10",
                      toolMode !== 'select' && "cursor-pointer"
                    )}
                    style={{ left: '50%', top: '50%', marginTop: '-80px', marginLeft: '-96px' }}
                  >
                    <div className={clsx(
                      "w-56 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-lg transition-all",
                      editingProcessId === process.id || linkSourceId === process.id 
                        ? "ring-2 ring-blue-500 shadow-blue-500/20" 
                        : "hover:border-blue-300 hover:shadow-xl"
                    )}>
                      <div className="h-24 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center relative group/img">
                        <div className="w-10 h-10 bg-white/10 rounded-lg rotate-45 flex items-center justify-center overflow-hidden relative backdrop-blur-sm">
                          <div className="absolute inset-0 bg-blue-500 opacity-20" />
                          <div className="w-3 h-3 bg-blue-400 rounded-full" />
                        </div>
                        
                        {/* Actions Overlay */}
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setProcesses(processes.filter(p => p.id !== process.id));
                              setConnections(connections.filter(c => c.from !== process.id && c.to !== process.id));
                              toast.error('Process deleted');
                            }}
                            className="p-1.5 bg-red-500/90 hover:bg-red-600 rounded-lg text-white shadow-sm"
                            title="Delete process"
                          >
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="relative group/menu">
                            <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white shadow-sm">
                              <MoreVertical size={14} />
                            </button>
                            
                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-2xl border border-zinc-100 py-1 hidden group-hover/menu:block z-50">
                              {process.groupId ? (
                                <button 
                                  onClick={() => handleGroupProcess(process.id, undefined)}
                                  className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                                >
                                  <Maximize2 size={12} />
                                  Ungroup
                                </button>
                              ) : (
                                groups.map(g => (
                                  <button 
                                    key={g.id}
                                    onClick={() => handleGroupProcess(process.id, g.id)}
                                    className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                                  >
                                    <Plus size={12} />
                                    Move to {g.name}
                                  </button>
                                ))
                              )}
                              <button 
                                onClick={() => setEditingProcessId(process.id)}
                                className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                              >
                                <Search size={12} />
                                Edit Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        {editingProcessId === process.id ? (
                          <div className="flex flex-col gap-2">
                            <input 
                              autoFocus
                              type="text"
                              value={process.name}
                              onChange={(e) => handleProcessUpdate(process.id, { name: e.target.value })}
                              className="w-full text-sm font-bold text-zinc-900 border border-zinc-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="text-[9px] text-zinc-400 uppercase font-bold">Steps</label>
                                <input 
                                  type="number"
                                  value={process.steps}
                                  onChange={(e) => handleProcessUpdate(process.id, { steps: parseInt(e.target.value) || 0 })}
                                  className="w-full text-xs border border-zinc-200 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="text-[9px] text-zinc-400 uppercase font-bold">Inputs</label>
                                <input 
                                  type="number"
                                  value={process.inputs}
                                  onChange={(e) => handleProcessUpdate(process.id, { inputs: parseInt(e.target.value) || 0 })}
                                  className="w-full text-xs border border-zinc-200 rounded px-2 py-1"
                                />
                              </div>
                            </div>
                            <button 
                              onClick={() => setEditingProcessId(null)}
                              className="w-full py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2">
                            <h4 
                              onClick={() => setEditingProcessId(process.id)}
                              className="text-sm font-bold text-zinc-900 truncate cursor-pointer hover:text-blue-600 flex-1"
                            >
                              {process.name}
                            </h4>
                          </div>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                            {process.steps} steps
                          </span>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                            {process.inputs} inputs
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Floating Add Button */}
                <button 
                  onClick={handleAddProcess}
                  className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:bg-blue-700 transition-all active:scale-95 z-50"
                  title="Add process"
                >
                  <Plus size={28} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
        ) : (
          <div className="flex-1 p-8 overflow-auto">
            {renderTabContent()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <header className="p-8 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-zinc-900 capitalize">{activeTab}</h1>
          <p className="text-sm font-bold text-blue-500 uppercase tracking-widest">Configure</p>
        </div>
        <button 
          onClick={() => setIsAdding(false)}
          className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 transition-colors"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <h2 className="text-4xl font-medium text-zinc-800">
            {activeTab === 'products' 
              ? "You haven't added any products yet." 
              : "You haven't added any templates yet."}
          </h2>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-[#e67e22] hover:bg-[#d35400] text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-all active:scale-95"
          >
            {activeTab === 'products' ? "Add product" : "Add template"}
          </button>
        </div>
      </div>

      {/* Add New Action Modal */}
      <AnimatePresence>
        {isAddingAction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingAction(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-white">
                <h3 className="text-lg font-bold text-zinc-900">
                  {currentActionStep === 'select' ? 'Add new action' : editingActionIndex !== null ? 'Edit action' : 'Configure action'}
                </h3>
                <button 
                  onClick={() => setIsAddingAction(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex flex-1 overflow-hidden bg-zinc-50">
                {/* Stepper Sidebar */}
                {currentActionStep !== 'select' && (
                  <div className="w-64 bg-white border-r border-zinc-200 p-8 flex flex-col gap-8">
                    {[
                      { id: 'select', label: 'Select action', step: 1 },
                      { id: 'configure', label: 'Configure', step: 2 },
                      { id: 'assign', label: 'Assign device', step: 3 },
                    ].map((s) => {
                      const isCompleted = (s.id === 'select' && (currentActionStep === 'configure' || currentActionStep === 'assign')) ||
                                        (s.id === 'configure' && currentActionStep === 'assign');
                      const isActive = currentActionStep === s.id;

                      return (
                        <div key={s.id} className="flex items-center gap-4">
                          <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm",
                            isCompleted ? "bg-blue-600 text-white" : 
                            isActive ? "bg-blue-100 text-blue-700 ring-4 ring-blue-50" : 
                            "bg-zinc-100 text-zinc-500"
                          )}>
                            {isCompleted ? <CheckCircle2 size={16} /> : s.step}
                          </div>
                          <span className={clsx(
                            "text-sm font-bold transition-colors",
                            isActive ? "text-zinc-900" : "text-zinc-400"
                          )}>
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Main Content Area */}
                <div className={clsx("flex-1 overflow-y-auto bg-white flex flex-col", currentActionStep === 'select' ? "p-12" : "p-12")}>
                  {currentActionStep === 'select' ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto flex-1">
                        {actionTypes.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => {
                              setSelectedActionType(action.id);
                              setCurrentActionStep('configure');
                            }}
                            className="flex flex-col text-left p-6 rounded-2xl border border-zinc-200 hover:border-blue-300 hover:shadow-lg transition-all group bg-white gap-4"
                          >
                            <div className="w-14 h-14 shrink-0 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                              {action.icon}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-zinc-900 mb-1">{action.title}</h4>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                {action.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-end mt-12 pt-6 border-t border-zinc-100">
                        <button 
                          onClick={() => setIsAddingAction(false)}
                          className="px-6 py-2.5 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="max-w-xl mx-auto w-full space-y-10">
                      {/* Configuration Forms... (rest of the content) */}
                      {currentActionStep === 'configure' && selectedActionType === 'scan' && (
                        <div className="max-w-2xl mx-auto space-y-8">
                          {/* Preview Card */}
                      <div className="bg-zinc-100 rounded-lg p-8 flex flex-col items-center justify-center border border-zinc-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-20" />
                        <div className="bg-white rounded-lg border border-zinc-200 p-6 w-full max-w-md shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-50 rounded flex items-center justify-center text-zinc-400">
                            <Scan size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                              {scanConfig.label || 'EX: SENSE PCBA SN'}
                            </h4>
                            <p className="text-xs text-zinc-500">Scan barcode</p>
                          </div>
                        </div>
                        <p className="mt-4 text-[10px] text-zinc-400 italic font-medium">
                          Build Screen preview. This is what operators will see.
                        </p>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">What's being scanned?</label>
                          <input 
                            type="text"
                            placeholder="Pack SN"
                            value={scanConfig.label}
                            onChange={(e) => setScanConfig({...scanConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Expected pattern</label>
                            <div className="w-3 h-3 rounded-full bg-zinc-200 flex items-center justify-center text-[8px] text-zinc-500 font-bold">i</div>
                          </div>
                          <input 
                            type="text"
                            placeholder="[00000"
                            value={scanConfig.pattern}
                            onChange={(e) => setScanConfig({...scanConfig, pattern: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>

                        <div className="space-y-4 pt-2">
                          {[
                            { id: 'optional', label: 'Optional Input', info: true },
                            { id: 'unique', label: 'Must be a unique value', info: false },
                            { id: 'isSerial', label: 'This is the process serial number', info: false },
                          ].map((opt) => (
                            <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                              <div className="relative flex items-center">
                                <input 
                                  type="checkbox" 
                                  checked={(scanConfig as any)[opt.id]}
                                  onChange={(e) => setScanConfig({...scanConfig, [opt.id]: e.target.checked})}
                                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-300 transition-all checked:bg-blue-500 checked:border-blue-500" 
                                />
                                <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                              </div>
                              <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">{opt.label}</span>
                              {opt.info && <div className="w-3 h-3 rounded-full bg-zinc-200 flex items-center justify-center text-[8px] text-zinc-500 font-bold">i</div>}
                            </label>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-zinc-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-zinc-700">Upstream process dependency</span>
                              <div className="w-3 h-3 rounded-full bg-zinc-200 flex items-center justify-center text-[8px] text-zinc-500 font-bold">i</div>
                            </div>
                            <button 
                              onClick={() => setScanConfig({...scanConfig, upstream: !scanConfig.upstream})}
                              className={clsx(
                                "w-10 h-5 rounded-full transition-all relative",
                                scanConfig.upstream ? "bg-blue-500" : "bg-zinc-300"
                              )}
                            >
                              <div className={clsx(
                                "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                scanConfig.upstream ? "left-6" : "left-1"
                              )} />
                            </button>
                          </div>
                          <span className="text-xs text-zinc-400 font-medium">{scanConfig.upstream ? 'On' : 'Off'}</span>
                        </div>

                        {scanConfig.upstream && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Select upstream process</label>
                            <select 
                              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            >
                              <option>Frame Prep</option>
                              <option>Fork Installation</option>
                              <option>Motor Mount</option>
                              <option>Battery Placement</option>
                              <option>Controller Setup</option>
                              <option>Wiring Harness</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'manual' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      {/* Preview Card */}
                      <div className="bg-zinc-100 rounded-lg p-8 flex flex-col items-center justify-center border border-zinc-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-20" />
                        <div className="bg-white rounded-lg border border-zinc-200 p-6 w-full max-w-md shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-50 rounded flex items-center justify-center text-zinc-400">
                            <Keyboard size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                              {manualConfig.label || 'EX: ENTER VOLTAGE'}
                            </h4>
                            <p className="text-xs text-zinc-500">Manual entry ({manualConfig.type})</p>
                          </div>
                        </div>
                        <p className="mt-4 text-[10px] text-zinc-400 italic font-medium">
                          Build Screen preview. This is what operators will see.
                        </p>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">What's being entered?</label>
                          <input 
                            type="text"
                            placeholder="ex: Enter Voltage"
                            value={manualConfig.label}
                            onChange={(e) => setManualConfig({...manualConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Input Type</label>
                            <select 
                              value={manualConfig.type}
                              onChange={(e) => setManualConfig({...manualConfig, type: e.target.value})}
                              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            >
                              <option value="Number">Number</option>
                              <option value="Text">Text</option>
                              <option value="Date">Date</option>
                            </select>
                          </div>
                          {manualConfig.type === 'Number' && (
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Min</label>
                                <input 
                                  type="number"
                                  value={manualConfig.min}
                                  onChange={(e) => setManualConfig({...manualConfig, min: e.target.value})}
                                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Max</label>
                                <input 
                                  type="number"
                                  value={manualConfig.max}
                                  onChange={(e) => setManualConfig({...manualConfig, max: e.target.value})}
                                  className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4 pt-2">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input 
                                type="checkbox" 
                                checked={manualConfig.optional}
                                onChange={(e) => setManualConfig({...manualConfig, optional: e.target.checked})}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-300 transition-all checked:bg-blue-500 checked:border-blue-500" 
                              />
                              <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                            </div>
                            <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">Optional Input</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'quality' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      {/* Preview Card */}
                      <div className="bg-zinc-100 rounded-lg p-8 flex flex-col items-center justify-center border border-zinc-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-20" />
                        <div className="bg-white rounded-lg border border-zinc-200 p-6 w-full max-w-md shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-50 rounded flex items-center justify-center text-zinc-400">
                            <ClipboardCheck size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                              {qualityConfig.label || 'EX: CONFIRM PART ORIENTATION'}
                            </h4>
                            <p className="text-xs text-zinc-500">Quality check ({qualityConfig.type})</p>
                          </div>
                        </div>
                        <p className="mt-4 text-[10px] text-zinc-400 italic font-medium">
                          Build Screen preview. This is what operators will see.
                        </p>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">What's being confirmed?</label>
                          <input 
                            type="text"
                            placeholder="ex: Confirm Part Orientation"
                            value={qualityConfig.label}
                            onChange={(e) => setQualityConfig({...qualityConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Check Type</label>
                          <select 
                            value={qualityConfig.type}
                            onChange={(e) => setQualityConfig({...qualityConfig, type: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          >
                            <option value="Pass/Fail">Pass/Fail</option>
                            <option value="Checklist">Checklist</option>
                            <option value="Visual Confirmation">Visual Confirmation</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Instructions for Operator</label>
                          <textarea 
                            placeholder="ex: Ensure the part is facing the correct direction before proceeding."
                            value={qualityConfig.instructions}
                            onChange={(e) => setQualityConfig({...qualityConfig, instructions: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm min-h-[100px] resize-none"
                          />
                        </div>

                        <div className="space-y-4 pt-2">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input 
                                type="checkbox" 
                                checked={qualityConfig.optional}
                                onChange={(e) => setQualityConfig({...qualityConfig, optional: e.target.checked})}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-300 transition-all checked:bg-blue-500 checked:border-blue-500" 
                              />
                              <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                            </div>
                            <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">Optional Input</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'torque' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Label</label>
                          <input 
                            type="text"
                            value={torqueConfig.label}
                            onChange={(e) => setTorqueConfig({...torqueConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Target Value</label>
                            <input 
                              type="number"
                              value={torqueConfig.target}
                              onChange={(e) => setTorqueConfig({...torqueConfig, target: e.target.value})}
                              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tolerance (±)</label>
                            <input 
                              type="number"
                              value={torqueConfig.tolerance}
                              onChange={(e) => setTorqueConfig({...torqueConfig, tolerance: e.target.value})}
                              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'print' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Label</label>
                          <input 
                            type="text"
                            value={printConfig.label}
                            onChange={(e) => setPrintConfig({...printConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Template</label>
                          <select 
                            value={printConfig.template}
                            onChange={(e) => setPrintConfig({...printConfig, template: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          >
                            <option>Standard Label</option>
                            <option>Small Label</option>
                            <option>Large Label</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'measure' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Label</label>
                          <input 
                            type="text"
                            value={measureConfig.label}
                            onChange={(e) => setMeasureConfig({...measureConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Min Value</label>
                            <input 
                              type="number"
                              value={measureConfig.min}
                              onChange={(e) => setMeasureConfig({...measureConfig, min: e.target.value})}
                              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Max Value</label>
                            <input 
                              type="number"
                              value={measureConfig.max}
                              onChange={(e) => setMeasureConfig({...measureConfig, max: e.target.value})}
                              className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'machine' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Label</label>
                          <input 
                            type="text"
                            value={machineConfig.label}
                            onChange={(e) => setMachineConfig({...machineConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Command</label>
                          <select 
                            value={machineConfig.command}
                            onChange={(e) => setMachineConfig({...machineConfig, command: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          >
                            <option>Start Cycle</option>
                            <option>Stop Cycle</option>
                            <option>Read Status</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'file' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Label</label>
                          <input 
                            type="text"
                            value={fileConfig.label}
                            onChange={(e) => setFileConfig({...fileConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Allowed Types</label>
                          <select 
                            value={fileConfig.allowedTypes}
                            onChange={(e) => setFileConfig({...fileConfig, allowedTypes: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          >
                            <option>All</option>
                            <option>Images Only</option>
                            <option>PDF Only</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'configure' && selectedActionType === 'photo' && (
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Label</label>
                          <input 
                            type="text"
                            value={photoConfig.label}
                            onChange={(e) => setPhotoConfig({...photoConfig, label: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Instructions</label>
                          <textarea 
                            value={photoConfig.instructions}
                            onChange={(e) => setPhotoConfig({...photoConfig, instructions: e.target.value})}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm min-h-[100px] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentActionStep === 'assign' && (
                    <div className="max-w-2xl mx-auto space-y-8 w-full">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Device</label>
                        <select 
                          className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                        >
                          <option>Any Scanner</option>
                          <option>Scanner 1</option>
                          <option>Scanner 2</option>
                        </select>
                      </div>
                    </div>
                  )}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
                <button 
                  onClick={() => {
                    if (currentActionStep === 'configure') setCurrentActionStep('select');
                    else if (currentActionStep === 'assign') setCurrentActionStep('configure');
                    else setIsAddingAction(false);
                  }}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-800 bg-zinc-200/50 rounded-lg transition-all"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsAddingAction(false)}
                    className="text-sm font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      if (currentActionStep === 'select' && selectedActionType) setCurrentActionStep('configure');
                      else if (currentActionStep === 'configure') setCurrentActionStep('assign');
                      else if (currentActionStep === 'assign') {
                        // Finalize
                        if (selectedStepId) {
                          const newSteps = [...processSteps];
                          const stepIdx = newSteps.findIndex(s => s.id === selectedStepId);
                          if (stepIdx !== -1) {
                            let actionConfig: any = { id: selectedActionType };
                            if (selectedActionType === 'scan') actionConfig = { ...actionConfig, ...scanConfig };
                            if (selectedActionType === 'manual') actionConfig = { ...actionConfig, ...manualConfig };
                            if (selectedActionType === 'quality') actionConfig = { ...actionConfig, ...qualityConfig };
                            if (selectedActionType === 'torque') actionConfig = { ...actionConfig, ...torqueConfig };
                            if (selectedActionType === 'print') actionConfig = { ...actionConfig, ...printConfig };
                            if (selectedActionType === 'measure') actionConfig = { ...actionConfig, ...measureConfig };
                            if (selectedActionType === 'machine') actionConfig = { ...actionConfig, ...machineConfig };
                            if (selectedActionType === 'file') actionConfig = { ...actionConfig, ...fileConfig };
                            if (selectedActionType === 'photo') actionConfig = { ...actionConfig, ...photoConfig };

                            if (editingActionIndex !== null) {
                              newSteps[stepIdx].actions[editingActionIndex] = actionConfig;
                              toast.success('Action updated');
                            } else {
                              newSteps[stepIdx].actions = [...newSteps[stepIdx].actions, actionConfig];
                              toast.success('Action added');
                            }
                            setProcessSteps(newSteps);
                          }
                        }
                        setIsAddingAction(false);
                      }
                    }}
                    disabled={currentActionStep === 'select' && !selectedActionType}
                    className="px-8 py-2 bg-[#e67e22] hover:bg-[#d35400] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-lg transition-all active:scale-95"
                  >
                    {currentActionStep === 'assign' ? 'Add action' : 'Next'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
