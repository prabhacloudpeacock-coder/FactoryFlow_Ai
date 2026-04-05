import React, { useState } from 'react';
import { Cpu, Wifi, Activity, Settings, Plus, Trash2, RefreshCw, Database, ShieldCheck, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IoTDevice {
  id: string;
  name: string;
  type: 'sensor' | 'gateway' | 'actuator';
  protocol: 'MQTT' | 'OPC-UA' | 'Modbus' | 'HTTP';
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  telemetry: {
    temperature?: number;
    vibration?: number;
    energy?: number;
    pressure?: number;
  };
}

const initialDevices: IoTDevice[] = [
  {
    id: 'IOT-001',
    name: 'Main Conveyor Sensor',
    type: 'sensor',
    protocol: 'MQTT',
    status: 'online',
    lastSeen: '2s ago',
    telemetry: { temperature: 42.5, vibration: 0.12, energy: 1.2 }
  },
  {
    id: 'IOT-002',
    name: 'Hydraulic Press Monitor',
    type: 'gateway',
    protocol: 'OPC-UA',
    status: 'warning',
    lastSeen: '15s ago',
    telemetry: { pressure: 185.4, temperature: 68.2 }
  },
  {
    id: 'IOT-003',
    name: 'Packaging Unit Controller',
    type: 'actuator',
    protocol: 'Modbus',
    status: 'offline',
    lastSeen: '2h ago',
    telemetry: {}
  }
];

export default function IoTGateway() {
  const [devices, setDevices] = useState<IoTDevice[]>(initialDevices);
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingStream, setIsViewingStream] = useState(false);
  const [isGlobalSettings, setIsGlobalSettings] = useState(false);
  
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'sensor' as const,
    protocol: 'MQTT' as const
  });

  const [globalConfig, setGlobalConfig] = useState({
    mqttBroker: 'tcp://broker.factory.io:1883',
    opcUaServer: 'opc.tcp://192.168.1.50:4840',
    modbusEndpoint: '',
    tlsEnabled: false
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'offline': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const handleRefreshAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDevices(prev => prev.map(d => ({ ...d, lastSeen: 'Just now' })));
      setIsRefreshing(false);
    }, 1500);
  };

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `IOT-${Math.floor(100 + Math.random() * 900)}`;
    const device: IoTDevice = {
      id,
      name: newDevice.name,
      type: newDevice.type,
      protocol: newDevice.protocol,
      status: 'online',
      lastSeen: 'Just now',
      telemetry: {}
    };
    setDevices([device, ...devices]);
    setIsAdding(false);
    setNewDevice({ name: '', type: 'sensor', protocol: 'MQTT' });
  };

  const handleUpdateDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice) return;
    setDevices(devices.map(d => d.id === selectedDevice.id ? selectedDevice : d));
    setIsEditing(false);
    setSelectedDevice(null);
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 relative">
      {/* Add Device Modal */}
      <AnimatePresence>
        {isAdding && (
          <Modal title="Add New IoT Device" onClose={() => setIsAdding(false)}>
            <form onSubmit={handleAddDevice} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Device Name</label>
                <input 
                  required
                  type="text" 
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  placeholder="e.g. Pressure Sensor B1"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Device Type</label>
                  <select 
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="sensor">Sensor</option>
                    <option value="gateway">Gateway</option>
                    <option value="actuator">Actuator</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Protocol</label>
                  <select 
                    value={newDevice.protocol}
                    onChange={(e) => setNewDevice({ ...newDevice, protocol: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="MQTT">MQTT</option>
                    <option value="OPC-UA">OPC-UA</option>
                    <option value="Modbus">Modbus</option>
                    <option value="HTTP">HTTP</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
                >
                  Register Device
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Edit Device Modal */}
        {isEditing && selectedDevice && (
          <Modal title={`Edit ${selectedDevice.id}`} onClose={() => setIsEditing(false)}>
            <form onSubmit={handleUpdateDevice} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Device Name</label>
                <input 
                  required
                  type="text" 
                  value={selectedDevice.name}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Protocol</label>
                <select 
                  value={selectedDevice.protocol}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, protocol: e.target.value as any })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="MQTT">MQTT</option>
                  <option value="OPC-UA">OPC-UA</option>
                  <option value="Modbus">Modbus</option>
                  <option value="HTTP">HTTP</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* View Stream Modal */}
        {isViewingStream && selectedDevice && (
          <Modal title={`Live Stream: ${selectedDevice.name}`} onClose={() => setIsViewingStream(false)}>
            <div className="space-y-4">
              <div className="bg-zinc-950 rounded-2xl p-4 font-mono text-[10px] space-y-2 max-h-[300px] overflow-y-auto border border-zinc-800">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex gap-3 text-zinc-500">
                    <span className="text-orange-500/50">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-zinc-300">PUBLISH</span>
                    <span>topic: factory/telemetry/{selectedDevice.id}</span>
                    <span className="text-green-500">payload: {"{"} "val": {(Math.random() * 100).toFixed(2)} {"}"}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsViewingStream(false)}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-xs font-bold transition-all"
              >
                Close Stream
              </button>
            </div>
          </Modal>
        )}

        {/* Global Gateway Settings Modal */}
        {isGlobalSettings && (
          <Modal title="Global Gateway Configuration" onClose={() => setIsGlobalSettings(false)}>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">MQTT Broker URL</label>
                  <input 
                    type="text" 
                    value={globalConfig.mqttBroker}
                    onChange={(e) => setGlobalConfig({ ...globalConfig, mqttBroker: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">OPC-UA Server Endpoint</label>
                  <input 
                    type="text" 
                    value={globalConfig.opcUaServer}
                    onChange={(e) => setGlobalConfig({ ...globalConfig, opcUaServer: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <div>
                    <p className="text-xs font-bold text-zinc-200">Enable TLS/SSL</p>
                    <p className="text-[10px] text-zinc-500">Encrypt all gateway traffic</p>
                  </div>
                  <button 
                    onClick={() => setGlobalConfig({ ...globalConfig, tlsEnabled: !globalConfig.tlsEnabled })}
                    className={`w-10 h-5 rounded-full transition-colors relative ${globalConfig.tlsEnabled ? 'bg-orange-500' : 'bg-zinc-800'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${globalConfig.tlsEnabled ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsGlobalSettings(false)}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
              >
                Apply Global Configuration
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Cpu className="text-orange-500" size={24} /> IoT Machine Integration
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Manage edge devices, telemetry streams, and industrial protocols.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleRefreshAll}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> 
            {isRefreshing ? 'Refreshing...' : 'Refresh All'}
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus size={14} /> Add Device
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Devices', value: devices.length.toString(), icon: Cpu, color: 'text-blue-500' },
          { label: 'Active Streams', value: devices.filter(d => d.status === 'online').length.toString(), icon: Activity, color: 'text-green-500' },
          { label: 'Protocols', value: '4', icon: Database, color: 'text-purple-500' },
          { label: 'System Health', value: '98%', icon: ShieldCheck, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-zinc-900 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-zinc-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Protocol Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Wifi size={16} className="text-orange-500" /> Active Edge Devices
          </h3>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {devices.map((device) => (
                <motion.div 
                  layout
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-zinc-700 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-orange-500 transition-colors">
                        <Cpu size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-zinc-100">{device.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(device.status)}`}>
                            {device.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 font-mono">{device.id} • {device.protocol}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setSelectedDevice(device); setIsEditing(true); }}
                        className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-100 rounded-lg transition-colors"
                      >
                        <Settings size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteDevice(device.id)}
                        className="p-2 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(device.telemetry).map(([key, value]) => (
                      <div key={key} className="p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter mb-1">{key}</p>
                        <p className="text-sm font-mono text-zinc-200">{value} <span className="text-[10px] text-zinc-600">
                          {key === 'temperature' ? '°C' : key === 'vibration' ? 'mm/s' : key === 'energy' ? 'kWh' : 'bar'}
                        </span></p>
                      </div>
                    ))}
                    {Object.keys(device.telemetry).length === 0 && (
                      <div className="col-span-full py-2 text-xs text-zinc-600 italic">No active telemetry data</div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <div className={`w-1.5 h-1.5 rounded-full ${device.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
                      Last heartbeat: {device.lastSeen}
                    </div>
                    <button 
                      onClick={() => { setSelectedDevice(device); setIsViewingStream(true); }}
                      className="text-[10px] font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest"
                    >
                      View Stream Data
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Settings size={16} className="text-orange-500" /> Protocol Gateway
          </h3>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="space-y-4">
              <div 
                onClick={() => setIsGlobalSettings(true)}
                className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-200">MQTT Broker</span>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <p className="text-[10px] text-zinc-500 font-mono">{globalConfig.mqttBroker}</p>
              </div>

              <div 
                onClick={() => setIsGlobalSettings(true)}
                className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-200">OPC-UA Server</span>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <p className="text-[10px] text-zinc-500 font-mono">{globalConfig.opcUaServer}</p>
              </div>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all cursor-pointer group opacity-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-200">Modbus TCP</span>
                  <span className="w-2 h-2 rounded-full bg-zinc-600" />
                </div>
                <p className="text-[10px] text-zinc-500 font-mono">Not Configured</p>
              </div>
            </div>

            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-orange-500 shrink-0" size={16} />
                <div>
                  <p className="text-xs font-bold text-orange-500">Security Alert</p>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                    {globalConfig.tlsEnabled 
                      ? "TLS/SSL is enabled. All gateway traffic is encrypted."
                      : "3 devices are using unencrypted protocols. Enable TLS/SSL for production environments."}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsGlobalSettings(true)}
              className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-2xl text-xs font-bold transition-all border border-zinc-700/50 uppercase tracking-widest"
            >
              Global Gateway Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
