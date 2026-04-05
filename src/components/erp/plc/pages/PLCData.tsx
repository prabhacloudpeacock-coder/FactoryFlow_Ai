import { useState, useMemo, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Tag, Search, Hash, ToggleLeft, ToggleRight, Type, Activity } from 'lucide-react';
import { cn } from '../../../../lib/utils';

type DataType = 'integer' | 'float' | 'boolean' | 'string';

interface PLCTag {
  id: string;
  name: string;
  type?: DataType;
  value?: any;
  unit?: string;
  children?: PLCTag[];
}

const mockData: PLCTag[] = [
  {
    id: 'plant_a',
    name: 'Plant A - Assembly',
    children: [
      {
        id: 'line_1',
        name: 'Line 1 - Chassis',
        children: [
          {
            id: 'l1_robot_1',
            name: 'Welding Robot 1',
            children: [
              { id: 'l1_r1_status', name: 'Status_Code', type: 'integer', value: 3, unit: 'HEX' },
              { id: 'l1_r1_temp', name: 'Joint_1_Temp', type: 'float', value: 42.5, unit: '°C' },
              { id: 'l1_r1_active', name: 'Is_Active', type: 'boolean', value: true, unit: 'BOOL' },
              { id: 'l1_r1_error', name: 'Error_Flag', type: 'boolean', value: false, unit: 'BOOL' },
              { id: 'l1_r1_prog', name: 'Current_Program', type: 'string', value: 'WELD_SEQ_A', unit: 'STR' },
            ]
          },
          {
            id: 'l1_conv',
            name: 'Main Conveyor',
            children: [
              { id: 'l1_c_speed', name: 'Speed_m_s', type: 'float', value: 1.25, unit: 'm/s' },
              { id: 'l1_c_running', name: 'Motor_Running', type: 'boolean', value: true, unit: 'BOOL' },
              { id: 'l1_c_fault', name: 'VFD_Fault', type: 'boolean', value: false, unit: 'BOOL' },
            ]
          }
        ]
      },
      {
        id: 'line_2',
        name: 'Line 2 - Painting',
        children: [
          {
            id: 'l2_pump',
            name: 'Paint Pump A',
            children: [
              { id: 'l2_p_pressure', name: 'Pressure_bar', type: 'float', value: 4.8, unit: 'bar' },
              { id: 'l2_p_level', name: 'Tank_Level_pct', type: 'float', value: 78.2, unit: '%' },
              { id: 'l2_p_valve', name: 'Valve_Open', type: 'boolean', value: true, unit: 'BOOL' },
            ]
          },
          {
            id: 'l2_oven',
            name: 'Curing Oven',
            children: [
              { id: 'l2_o_temp1', name: 'Zone_1_Temp', type: 'float', value: 185.0, unit: '°C' },
              { id: 'l2_o_temp2', name: 'Zone_2_Temp', type: 'float', value: 190.5, unit: '°C' },
              { id: 'l2_o_heater', name: 'Heater_Active', type: 'boolean', value: true, unit: 'BOOL' },
              { id: 'l2_o_door', name: 'Door_Closed', type: 'boolean', value: true, unit: 'BOOL' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'plant_b',
    name: 'Plant B - Packaging',
    children: [
      {
        id: 'pkg_line_1',
        name: 'Packaging Line 1',
        children: [
          { id: 'pkg1_count', name: 'Box_Count', type: 'integer', value: 14520, unit: 'pcs' },
          { id: 'pkg1_rate', name: 'Boxes_Per_Min', type: 'integer', value: 45, unit: 'bpm' },
          { id: 'pkg1_running', name: 'System_Running', type: 'boolean', value: true, unit: 'BOOL' },
          { id: 'pkg1_jam', name: 'Jam_Sensor', type: 'boolean', value: false, unit: 'BOOL' },
        ]
      }
    ]
  }
];

const filterTree = (nodes: PLCTag[], query: string): PLCTag[] => {
  if (!query) return nodes;
  
  return nodes.reduce((acc: PLCTag[], node) => {
    const matches = node.name.toLowerCase().includes(query.toLowerCase());
    
    if (node.children) {
      const filteredChildren = filterTree(node.children, query);
      if (matches || filteredChildren.length > 0) {
        acc.push({ ...node, children: filteredChildren });
      }
    } else if (matches) {
      acc.push(node);
    }
    
    return acc;
  }, []);
};

const TypeIcon = ({ type, value }: { type?: DataType, value?: any }) => {
  if (type === 'integer') return <Hash size={14} className="text-blue-400" />;
  if (type === 'float') return <Activity size={14} className="text-cyan-400" />;
  if (type === 'boolean') return value ? <ToggleRight size={14} className="text-emerald-400" /> : <ToggleLeft size={14} className="text-rose-400/50" />;
  if (type === 'string') return <Type size={14} className="text-amber-400" />;
  return <Tag size={14} className="text-zinc-500" />;
};

const ValueDisplay = ({ type, value }: { type?: DataType, value?: any }) => {
  if (value === undefined) return null;
  
  switch (type) {
    case 'boolean':
      return (
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border transition-all shadow-sm",
          value 
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5" 
            : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/5"
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", value ? "bg-emerald-500" : "bg-rose-500")} />
          {value ? 'Active' : 'Inactive'}
        </div>
      );
    
    case 'integer':
      return (
        <span className="font-mono text-blue-400 text-sm font-bold bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
          {value.toLocaleString()}
        </span>
      );

    case 'float':
      return (
        <span className="font-mono text-cyan-400 text-sm font-bold bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
          {value.toFixed(3)}
        </span>
      );

    case 'string':
      return (
        <span className="font-medium text-amber-400 text-xs italic bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
          "{value}"
        </span>
      );

    default:
      return <span className="font-mono text-zinc-400 text-sm">{value}</span>;
  }
};

const TreeNode = ({ node, level = 0, searchQuery }: { node: PLCTag, level?: number, searchQuery: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const expanded = searchQuery ? true : isExpanded;
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div className="select-none">
      <div 
        className={cn(
          "grid grid-cols-12 items-center py-2 px-4 hover:bg-zinc-800/50 rounded-lg cursor-pointer group transition-colors border-b border-zinc-800/30",
          level === 0 ? "mt-1" : ""
        )}
        onClick={() => hasChildren && setIsExpanded(!expanded)}
      >
        <div className="col-span-5 flex items-center gap-2" style={{ paddingLeft: `${level * 1.5}rem` }}>
          {hasChildren ? (
            <button className="p-0.5 hover:bg-zinc-700 rounded text-zinc-400 transition-colors">
              {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <span className="w-5" />
          )}
          
          {hasChildren ? (
            expanded ? <FolderOpen size={16} className="text-orange-500" /> : <Folder size={16} className="text-orange-500" />
          ) : (
            <TypeIcon type={node.type} value={node.value} />
          )}
          
          <span className={cn("text-sm truncate", hasChildren ? "font-bold text-zinc-100" : "text-zinc-300")}>
            {node.name}
          </span>
        </div>
        
        <div className="col-span-2 px-2">
          {!hasChildren && node.type && (
            <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest bg-zinc-800 px-1.5 py-0.5 rounded">
              {node.type}
            </span>
          )}
        </div>

        <div className="col-span-3 px-2 flex justify-start">
          {!hasChildren && <ValueDisplay type={node.type} value={node.value} />}
        </div>

        <div className="col-span-2 px-2 text-right">
          {!hasChildren && node.unit && (
            <span className="text-xs font-bold text-zinc-500 font-mono">{node.unit}</span>
          )}
        </div>
      </div>
      
      {hasChildren && expanded && (
        <div className="relative">
          {node.children!.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} searchQuery={searchQuery} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function PLCData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const updateNode = (node: PLCTag): PLCTag => {
          if (node.children) {
            return { ...node, children: node.children.map(updateNode) };
          }
          if (node.type === 'float') {
            return { ...node, value: node.value + (Math.random() * 0.2 - 0.1) };
          }
          if (node.type === 'integer' && node.id.includes('count')) {
            return { ...node, value: node.value + Math.floor(Math.random() * 5) };
          }
          if (node.type === 'boolean' && Math.random() > 0.98) {
            return { ...node, value: !node.value };
          }
          return node;
        };
        return prevData.map(updateNode);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const filteredData = useMemo(() => filterTree(data, searchQuery), [data, searchQuery]);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="text-orange-500" size={24} /> PLC Tag Explorer
          </h2>
          <p className="text-zinc-400 mt-1">Real-time hierarchical monitoring of all connected PLC data points.</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[700px] shadow-2xl">
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/40 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by tag name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400" /> Integer</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-400" /> Float</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Boolean</div>
          </div>
        </div>

        <div className="grid grid-cols-12 bg-zinc-900/60 border-b border-zinc-800 px-4 py-3">
          <div className="col-span-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tag Name</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Data Type</div>
          <div className="col-span-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Current Value</div>
          <div className="col-span-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2 text-right">Unit</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
          {filteredData.length > 0 ? (
            filteredData.map(node => (
              <TreeNode key={node.id} node={node} searchQuery={searchQuery} />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-3">
              <Search size={48} className="text-zinc-800" />
              <p>No tags found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
