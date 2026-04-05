import { Network, Cpu, Database, Share2, History, Monitor } from 'lucide-react';

export default function IntegrationLayerDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Network className="text-orange-500" size={24} /> Integration Layer
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          The Integration Layer is the critical bridge between physical factory hardware and the digital ERP system. It manages all data acquisition, protocol translation, and device mapping.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Cpu className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">PLC Configuration</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Direct connection to Siemens S7, Allen Bradley ControlLogix, and Beckhoff PLCs. Supports IP-based communication and real-time tag synchronization.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Database className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">LabVIEW Data Sync</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            High-frequency data acquisition for engineering data (vibration, thermal, strain). Synchronizes LabVIEW VI data directly into the ERP database.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Share2 className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">OPC-UA / MQTT Gateway</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Support for industry-standard communication protocols. Allows for seamless data exchange between disparate systems and IoT devices.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Monitor className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Device Mapping</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            A flexible mapping tool that links internal ERP variables to external PLC addresses (e.g., mapping `SPINDLE_TEMP` to `PLC_001.DB10.REAL4`).
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">Technical Connectivity</h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <History className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">API Logs</p>
                  <p className="text-xs text-zinc-500">Real-time monitoring of all system-to-system communication, including latency and status codes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Network className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Protocol Translation</p>
                  <p className="text-xs text-zinc-500">Automatically translates proprietary PLC protocols into standardized JSON/MQTT formats.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Cpu className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Edge Buffering</p>
                  <p className="text-xs text-zinc-500">Local data buffering to ensure no data loss during temporary network interruptions.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Share2 className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Secure Gateways</p>
                  <p className="text-xs text-zinc-500">Encrypted data transmission between the factory floor and the ERP intelligence layer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
