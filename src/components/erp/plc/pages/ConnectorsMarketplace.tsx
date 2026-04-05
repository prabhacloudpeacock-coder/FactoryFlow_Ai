import { useState } from 'react';
import { Plug, Server, Cpu, Monitor, Download, CheckCircle2, Search, Filter, Plus, Database, Network, Globe, X, BookOpen, Code, Terminal, Loader2, Save, Activity } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { toast } from 'sonner';

const initialConnectors = [
  {
    id: 'opc-ua',
    name: 'OPC-UA Client',
    category: 'Industrial Protocols',
    provider: 'FactoryFlow Core',
    description: 'Standardized industrial connectivity for PLCs, SCADA, and DCS systems. Supports secure, encrypted data transfer.',
    icon: Server,
    status: 'installed',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'mqtt',
    name: 'MQTT Broker & Client',
    category: 'IoT & Edge',
    provider: 'FactoryFlow Core',
    description: 'Lightweight messaging protocol for small sensors and mobile devices, optimized for high-latency or unreliable networks.',
    icon: Network,
    status: 'installed',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'labview',
    name: 'LabVIEW Integration',
    category: 'Test & Measurement',
    provider: 'NI Partner',
    description: 'Direct bi-directional communication with NI LabVIEW VIs. Stream high-frequency test data directly into the MES.',
    icon: Monitor,
    status: 'available',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  },
  {
    id: 'rest-api',
    name: 'REST API Gateway',
    category: 'Web Services',
    provider: 'FactoryFlow Core',
    description: 'Expose machine data and MES endpoints via secure RESTful APIs for custom enterprise integrations.',
    icon: Globe,
    status: 'installed',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    id: 'siemens-s7',
    name: 'Siemens S7 Connector',
    category: 'PLC Drivers',
    provider: 'IndustrialLink',
    description: 'Native driver for Siemens S7-300, S7-400, S7-1200, and S7-1500 PLCs without requiring an OPC server.',
    icon: Cpu,
    status: 'available',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10'
  },
  {
    id: 'rockwell-cip',
    name: 'Rockwell CIP/EtherNet/IP',
    category: 'PLC Drivers',
    provider: 'IndustrialLink',
    description: 'Direct communication with Allen-Bradley ControlLogix and CompactLogix PLCs.',
    icon: Cpu,
    status: 'available',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'aws-iot',
    name: 'AWS IoT Core Sync',
    category: 'Cloud IoT',
    provider: 'CloudConnect',
    description: 'Bi-directional synchronization of machine telemetry with AWS IoT Core for advanced cloud analytics.',
    icon: Database,
    status: 'available',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  }
];

export default function ConnectorsMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [connectors, setConnectors] = useState(initialConnectors);
  const [selectedDoc, setSelectedDoc] = useState<typeof initialConnectors[0] | null>(null);
  const [configuringDoc, setConfiguringDoc] = useState<typeof initialConnectors[0] | null>(null);
  const [installingId, setInstallingId] = useState<string | null>(null);

  const categories = ['All', 'Industrial Protocols', 'IoT & Edge', 'PLC Drivers', 'Test & Measurement', 'Web Services', 'Cloud IoT'];

  const filteredConnectors = connectors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = (id: string, name: string) => {
    setInstallingId(id);
    toast.success(`Installing ${name}...`);
    setTimeout(() => {
      setConnectors(prev => prev.map(c => c.id === id ? { ...c, status: 'installed' } : c));
      setInstallingId(null);
      toast.success(`${name} installed successfully!`);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Plug className="text-orange-500" size={24} /> Plug & Play Connectors
          </h2>
          <p className="text-zinc-400 mt-1">Discover and install integrations for PLCs, SCADA, IoT devices, and REST APIs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.success('Opening custom connector builder...')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold"
          >
            <Plus size={16} />
            Custom Connector
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search connectors (e.g., OPC-UA, MQTT, LabVIEW)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === category 
                  ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                  : "bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:bg-zinc-800"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnectors.map((connector) => {
          const Icon = connector.icon;
          return (
            <div key={connector.id} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col h-full group hover:border-zinc-700 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", connector.bg, connector.color)}>
                  <Icon size={24} />
                </div>
                {connector.status === 'installed' ? (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} /> Installed
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Available
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-100 mb-1 group-hover:text-orange-400 transition-colors">{connector.name}</h3>
                <p className="text-xs text-zinc-500 mb-3 font-medium">{connector.provider} • {connector.category}</p>
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {connector.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedDoc(connector)}
                  className="text-sm text-zinc-400 hover:text-zinc-200 font-medium transition-colors"
                >
                  View Docs
                </button>
                {connector.status === 'installed' ? (
                  <button 
                    onClick={() => setConfiguringDoc(connector)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-sm font-bold transition-all"
                  >
                    Configure
                  </button>
                ) : (
                  <button 
                    onClick={() => handleInstall(connector.id, connector.name)}
                    disabled={installingId === connector.id}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {installingId === connector.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {installingId === connector.id ? 'Installing...' : 'Install'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Documentation Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", selectedDoc.bg, selectedDoc.color)}>
                  <selectedDoc.icon size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">{selectedDoc.name} Documentation</h3>
                  <p className="text-sm text-zinc-500">Provided by {selectedDoc.provider}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section>
                <h4 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-orange-500" /> Overview
                </h4>
                <p className="text-zinc-400 leading-relaxed">{selectedDoc.description}</p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                  <Download size={18} className="text-orange-500" /> Installation & Setup
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                  <li>Click the <strong>Install</strong> button in the Connectors Marketplace.</li>
                  <li>Wait for the installation process to complete.</li>
                  <li>Click the <strong>Configure</strong> button to set up your connection parameters.</li>
                  <li>Ensure your network allows traffic on the required ports for this protocol.</li>
                </ol>
              </section>

              <section>
                <h4 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                  <Code size={18} className="text-orange-500" /> Configuration Example
                </h4>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-300 overflow-x-auto">
                  <pre>
{`{
  "connectorId": "${selectedDoc.id}",
  "enabled": true,
  "connection": {
    "endpoint": "${selectedDoc.id === 'opc-ua' ? 'opc.tcp://localhost:4840' : selectedDoc.id === 'mqtt' ? 'mqtt://broker.hivemq.com:1883' : 'https://api.example.com/v1'}",
    "timeoutMs": 5000,
    "retryPolicy": "exponential_backoff"
  },
  "security": {
    "mode": "SignAndEncrypt",
    "policy": "Basic256Sha256"
  }
}`}
                  </pre>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                  <Terminal size={18} className="text-orange-500" /> Troubleshooting
                </h4>
                <ul className="list-disc list-inside space-y-2 text-zinc-400">
                  <li><strong>Connection Timeout:</strong> Verify that the target device is powered on and accessible from the FactoryFlow network.</li>
                  <li><strong>Authentication Failed:</strong> Check the credentials provided in the configuration panel.</li>
                  <li><strong>Data Not Syncing:</strong> Review the API Logs tab in the Integration Layer for detailed error messages.</li>
                </ul>
              </section>
            </div>
            
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end">
              <button 
                onClick={() => setSelectedDoc(null)}
                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-sm font-bold transition-all"
              >
                Close Documentation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {configuringDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", configuringDoc.bg, configuringDoc.color)}>
                  <configuringDoc.icon size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">Configure {configuringDoc.name}</h3>
                  <p className="text-sm text-zinc-500">Connection Settings</p>
                </div>
              </div>
              <button 
                onClick={() => setConfiguringDoc(null)}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Endpoint URL</label>
                  <input 
                    type="text" 
                    defaultValue={configuringDoc.id === 'opc-ua' ? 'opc.tcp://localhost:4840' : configuringDoc.id === 'mqtt' ? 'mqtt://broker.hivemq.com:1883' : 'https://api.example.com/v1'} 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:outline-none focus:border-orange-500" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Authentication</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:outline-none focus:border-orange-500">
                      <option>None / Anonymous</option>
                      <option>Username & Password</option>
                      <option>X.509 Certificate</option>
                      <option>OAuth 2.0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Polling Rate (ms)</label>
                    <input type="number" defaultValue={1000} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:outline-none focus:border-orange-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Username</label>
                    <input type="text" placeholder="admin" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:outline-none focus:border-orange-500" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 cursor-pointer hover:bg-zinc-800/50 transition-colors mt-2">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-zinc-700 text-orange-500 focus:ring-orange-500 focus:ring-offset-zinc-900 bg-zinc-950" />
                    <div>
                      <p className="text-sm font-bold text-zinc-100">Enable Auto-Reconnect</p>
                      <p className="text-xs text-zinc-500">Automatically attempt to reconnect if the connection drops.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
              <button 
                onClick={() => {
                  toast.info('Testing connection...');
                  setTimeout(() => toast.success('Connection successful!'), 1500);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-sm font-bold transition-all"
              >
                <Activity size={16} /> Test Connection
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setConfiguringDoc(null)}
                  className="px-4 py-2 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-xl text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success(`${configuringDoc.name} configuration saved!`);
                    setConfiguringDoc(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20"
                >
                  <Save size={16} /> Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
