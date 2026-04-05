import { BookOpen, Settings, PlayCircle, Database, Network, ShieldCheck, Users } from 'lucide-react';

export default function UserGuideDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <BookOpen className="text-orange-500" size={24} /> User & Configuration Guide
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Welcome to the FactoryFlow AI user guide. This document outlines how to navigate the application, configure initial settings, and perform daily manufacturing operations.
        </p>
      </section>

      {/* 1. Initial Configuration */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Settings className="text-blue-500" size={20} />
          1. Initial System Configuration
        </h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <p className="text-zinc-400 text-sm leading-relaxed">
            Before running production, the system requires foundational data to be established in the Master Data module.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <h4 className="text-zinc-200 font-bold flex items-center gap-2 mb-2">
                <Database size={16} className="text-blue-400" /> Define Items & BOMs
              </h4>
              <ul className="list-disc list-inside text-sm text-zinc-500 space-y-1">
                <li>Navigate to <strong>Master Data &gt; Item Master</strong> to create raw materials and finished goods.</li>
                <li>Go to <strong>BOM Management</strong> to define the recipe/components required for each finished good.</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <h4 className="text-zinc-200 font-bold flex items-center gap-2 mb-2">
                <Network size={16} className="text-blue-400" /> Setup Work Centers
              </h4>
              <ul className="list-disc list-inside text-sm text-zinc-500 space-y-1">
                <li>Navigate to <strong>Master Data &gt; Work Centers</strong>.</li>
                <li>Define your production lines, machines, and their capacities.</li>
                <li>Assign standard hourly rates and operators.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Daily Operations */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <PlayCircle className="text-emerald-500" size={20} />
          2. Daily Operations & Execution
        </h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                A
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold">Creating Work Orders</h4>
                <p className="text-sm text-zinc-500 mt-1">Go to the <strong>MES Core</strong> module. Click "Create Order" to schedule a new production run. Select the target item, quantity, and assigned work center.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                B
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold">Shop Floor Execution</h4>
                <p className="text-sm text-zinc-500 mt-1">Operators use the <strong>Shop Floor Execution</strong> module to start, pause, and complete jobs. They can report scrap, consume materials, and log downtime directly from their terminal.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                C
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold">Quality Inspections</h4>
                <p className="text-sm text-zinc-500 mt-1">During or after production, navigate to <strong>Quality Control</strong> to perform inspections. Log defects, attach images, and generate Non-Conformance Reports (NCRs) if necessary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Machine Integration & SCADA */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Network className="text-purple-500" size={20} />
          3. Machine Integration & SCADA
        </h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            FactoryFlow AI connects directly to your shop floor equipment via OPC UA, MQTT, and REST APIs.
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-500 space-y-2">
            <li><strong>PLC Integration:</strong> View live machine states, cycle times, and signal logs in the <strong>Machine & PLC Integration</strong> module.</li>
            <li><strong>SCADA Dashboards:</strong> Access interactive HMI screens (like the Fluid SCADA or EV Test Cell) to monitor live telemetry (temperature, pressure, RPM) and control simulated equipment.</li>
            <li><strong>IoT Gateway:</strong> Configure edge devices and sensor mappings under the IoT Gateway tab.</li>
          </ul>
        </div>
      </section>

      {/* 4. Administration & Settings */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Users className="text-orange-500" size={20} />
          4. Administration & Settings
        </h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <ul className="list-disc list-inside text-sm text-zinc-500 space-y-2">
            <li><strong>User Management:</strong> Navigate to <strong>Settings &gt; Users & Roles</strong> to add team members and assign role-based access control (e.g., Operator, Supervisor, Admin).</li>
            <li><strong>System Preferences:</strong> Configure global settings like timezone, currency, and shift schedules in the <strong>Settings</strong> module.</li>
            <li><strong>AI Configuration:</strong> Adjust predictive maintenance thresholds and anomaly detection sensitivity in the <strong>AI Intelligence</strong> module.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
