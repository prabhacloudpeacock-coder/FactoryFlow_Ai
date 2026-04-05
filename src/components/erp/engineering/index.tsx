import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { motion } from 'framer-motion';
import { Settings, FileCode, Share2, Layers, GitBranch, Terminal, Database, Box } from 'lucide-react';
import { cn } from '../../../lib/utils';
import DigitalTwin from './pages/DigitalTwin';

const tabs = [
  { id: 'twin', label: 'Digital Twin', icon: Box },
  { id: 'cad', label: 'CAD/CAM Integration', icon: FileCode },
  { id: 'collaboration', label: 'Design Collaboration', icon: Share2 },
  { id: 'bom', label: 'BOM Management', icon: Layers },
  { id: 'versions', label: 'Version Control', icon: GitBranch },
];

export default function Engineering() {
  const [activeTab, setActiveTab] = useState('twin');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Engineering & Design</h1>
          <p className="text-zinc-500 mt-1">Sync design files directly with the ERP and reduce production errors.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold flex items-center gap-2">
            <Terminal size={16} /> Sync CAD Data
          </button>
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20">
            Upload Design File
          </button>
        </div>
      </div>

      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
      >
        {activeTab === 'twin' && <DigitalTwin />}
        {activeTab === 'cad' && <CADIntegration />}
        {activeTab === 'collaboration' && <DesignCollaboration />}
        {activeTab === 'bom' && <BOMManagement />}
        {activeTab === 'versions' && <VersionControl />}
      </motion.div>
    </div>
  );
}

function CADIntegration() {
  const designs = [
    { id: 'DSN-001', name: 'Precision Gear X1 - V2.1', type: 'SolidWorks', lastSync: '2026-03-31 09:15', status: 'Synced' },
    { id: 'DSN-002', name: 'Hydraulic Valve V2 - V1.0', type: 'AutoCAD', lastSync: '2026-03-31 10:30', status: 'Synced' },
    { id: 'DSN-003', name: 'Control Module M4 - V3.4', type: 'Fusion 360', lastSync: '2026-03-30 14:20', status: 'Out of Sync' },
    { id: 'DSN-004', name: 'Main Frame Assembly - V2.0', type: 'SolidWorks', lastSync: '2026-03-31 11:00', status: 'Synced' },
  ];

  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">Design ID</th>
            <th className="p-4">Design Name</th>
            <th className="p-4">CAD Software</th>
            <th className="p-4">Last Sync</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((design) => (
            <tr key={design.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{design.id}</td>
              <td className="p-4 text-sm font-medium">{design.name}</td>
              <td className="p-4 text-sm text-zinc-400">{design.type}</td>
              <td className="p-4 text-sm font-mono">{design.lastSync}</td>
              <td className="p-4 text-center">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  design.status === 'Synced' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                )}>
                  {design.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DesignCollaboration() {
  const tasks = [
    { id: 'TSK-001', title: 'Review X1 Gear Mesh', assignedTo: 'Mike R.', priority: 'High', status: 'In Review' },
    { id: 'TSK-002', title: 'Optimize Valve Flow', assignedTo: 'Sarah L.', priority: 'Medium', status: 'In Progress' },
    { id: 'TSK-003', title: 'Update Frame Specs', assignedTo: 'David K.', priority: 'Low', status: 'Completed' },
  ];
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-orange-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-zinc-500">{task.id}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase",
                task.priority === 'High' ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
              )}>{task.priority}</span>
            </div>
            <h4 className="text-sm font-bold text-zinc-100 mb-1">{task.title}</h4>
            <p className="text-xs text-zinc-500 mb-4">Assigned to: {task.assignedTo}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{task.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BOMManagement() {
  const boms = [
    { id: 'BOM-101', product: 'Precision Shaft X1', components: 12, status: 'Released', lastUpdate: '2026-03-25' },
    { id: 'BOM-102', product: 'Hydraulic Valve V2', components: 45, status: 'Draft', lastUpdate: '2026-03-28' },
    { id: 'BOM-103', product: 'Control Module M4', components: 8, status: 'Released', lastUpdate: '2026-03-20' },
  ];
  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">BOM ID</th>
            <th className="p-4">Product</th>
            <th className="p-4">Components</th>
            <th className="p-4">Last Update</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {boms.map((bom) => (
            <tr key={bom.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{bom.id}</td>
              <td className="p-4 text-sm font-medium">{bom.product}</td>
              <td className="p-4 text-sm text-zinc-400">{bom.components} items</td>
              <td className="p-4 text-sm text-zinc-500">{bom.lastUpdate}</td>
              <td className="p-4 text-center">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  bom.status === 'Released' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                )}>
                  {bom.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VersionControl() {
  const commits = [
    { id: 'v2.1.4', author: 'Mike R.', message: 'Optimized gear tooth profile for noise reduction', date: '2 hours ago' },
    { id: 'v2.1.3', author: 'Sarah L.', message: 'Updated material specs to High-Carbon Steel', date: '1 day ago' },
    { id: 'v2.1.2', author: 'Mike R.', message: 'Initial draft for X1 series overhaul', date: '3 days ago' },
  ];
  return (
    <div className="p-6 space-y-4">
      {commits.map((commit) => (
        <div key={commit.id} className="flex gap-4 items-start p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
            <GitBranch size={16} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-orange-500 font-mono">{commit.id}</span>
              <span className="text-[10px] text-zinc-600 font-mono">{commit.date}</span>
            </div>
            <p className="text-sm text-zinc-200 mb-1">{commit.message}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Authored by {commit.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
