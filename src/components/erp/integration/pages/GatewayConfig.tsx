import { Network, Plus, Search, ChevronRight, Activity, Cpu, CheckCircle2, XCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import DataTableActions from '../../../common/DataTableActions';
import EditModal from '../../../common/EditModal';

const INITIAL_GATEWAYS = [
  { id: 'GW-001', name: 'OPC-UA Server Hub', protocol: 'OPC-UA', endpoint: 'opc.tcp://192.168.1.100:4840', status: 'Online', nodes: 1240 },
  { id: 'GW-002', name: 'MQTT Broker', protocol: 'MQTT', endpoint: 'mqtt://192.168.1.101:1883', status: 'Online', nodes: 450 },
  { id: 'GW-003', name: 'Modbus Gateway', protocol: 'Modbus TCP', endpoint: '192.168.1.102:502', status: 'Offline', nodes: 0 },
  { id: 'GW-004', name: 'REST API Bridge', protocol: 'HTTP/JSON', endpoint: 'http://192.168.1.103/api', status: 'Online', nodes: 85 },
];

export default function GatewayConfig() {
  const [gateways, setGateways] = useState(INITIAL_GATEWAYS);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const handleDelete = (id: string) => {
    setGateways(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveEdit = (updatedRecord: any) => {
    setGateways(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm">
        <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3 text-zinc-900 dark:text-zinc-100 transition-colors">
          <div className="p-3 bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-500/20">
            <Share2 size={24} />
          </div>
          OPC-UA / MQTT GATEWAY
        </h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 uppercase tracking-tighter">
          <Plus size={20} /> Configure Gateway
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors shadow-xl shadow-zinc-200/40 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
              <tr>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Gateway Name</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Protocol</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Endpoint</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Active Nodes</th>
                <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 transition-colors">
              {gateways.map(gw => (
                <tr key={gw.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{gw.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{gw.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-zinc-400">{gw.protocol}</td>
                <td className="p-4 text-sm text-zinc-400">{gw.endpoint}</td>
                <td className="p-4 text-sm text-zinc-400">{gw.status}</td>
                <td className="p-4 text-sm text-zinc-400">{gw.nodes}</td>
                <td className="p-4 text-right">
                  <DataTableActions 
                    onEdit={() => setEditingRecord(gw)}
                    onDelete={() => handleDelete(gw.id)}
                  />
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
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
