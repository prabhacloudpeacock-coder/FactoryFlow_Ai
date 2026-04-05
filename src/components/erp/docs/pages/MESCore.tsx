import { Factory, Activity, ClipboardList, Package, CheckCircle2, ListChecks, ArrowRightCircle, BarChart2, ShieldCheck } from 'lucide-react';

export default function MESCoreDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Factory className="text-orange-500" size={24} /> MES Core & Shop Floor
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          The Manufacturing Execution System (MES) is the heart of FactoryFlow AI. It manages the execution of production orders, tracking every step from raw material release to final product completion. This module bridges the gap between enterprise planning (ERP) and shop floor control systems (SCADA/PLC).
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <ClipboardList className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Work Order Management</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Create, schedule, and track work orders across multiple production lines. Each order is linked to its BOM (Bill of Materials) and routing instructions.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Shop Floor Tracking</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Real-time visibility into machine status (Running, Idle, Maintenance) and operator assignments. Live telemetry data is updated every 100ms.
          </p>
        </div>
      </div>

      {/* Expanded Work Order Management Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <ListChecks className="text-emerald-500" size={20} />
          Detailed Work Order Management
        </h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 mb-6 leading-relaxed">
            The Work Order Management subsystem provides end-to-end control over the production lifecycle. It ensures that the right materials, personnel, and equipment are available at the right time.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                1
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold">Order Creation & Scheduling</h4>
                <p className="text-sm text-zinc-500 mt-1">Work orders can be generated automatically from sales orders or created manually. The scheduling engine assigns orders to specific production lines based on machine availability, capacity, and priority.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                2
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold">BOM & Routing Enforcement</h4>
                <p className="text-sm text-zinc-500 mt-1">Each work order strictly follows its defined Bill of Materials (BOM) and routing steps. Operators are guided through standard operating procedures (SOPs) to ensure quality and consistency.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                3
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold">Material Allocation & Consumption</h4>
                <p className="text-sm text-zinc-500 mt-1">Raw materials are allocated to the work order upon release. As production progresses, materials are automatically backflushed or manually consumed, updating inventory levels in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Shop Floor Tracking Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <BarChart2 className="text-blue-500" size={20} />
          Comprehensive Shop Floor Tracking
        </h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Shop Floor Tracking provides real-time visibility into the manufacturing process, enabling immediate response to issues and continuous improvement through data analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <h4 className="text-zinc-200 font-bold flex items-center gap-2">
                <Activity size={16} className="text-blue-400" /> Real-Time Machine Status
              </h4>
              <p className="text-sm text-zinc-500">
                Direct integration with PLCs and IoT sensors provides live updates on machine states (Running, Down, Starved, Blocked). This data feeds directly into the OEE calculations.
              </p>
            </div>
            <div className="space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <h4 className="text-zinc-200 font-bold flex items-center gap-2">
                <ArrowRightCircle size={16} className="text-blue-400" /> Work-in-Progress (WIP) Tracking
              </h4>
              <p className="text-sm text-zinc-500">
                Track the exact location and status of every batch or serial number on the floor. Identify bottlenecks and optimize flow between workstations.
              </p>
            </div>
            <div className="space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <h4 className="text-zinc-200 font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-400" /> Operator Performance
              </h4>
              <p className="text-sm text-zinc-500">
                Log operator activities, track cycle times against standards, and identify training needs. Ensure only certified operators are assigned to critical tasks.
              </p>
            </div>
            <div className="space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
              <h4 className="text-zinc-200 font-bold flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-400" /> In-Process Quality Control
              </h4>
              <p className="text-sm text-zinc-500">
                Trigger quality inspections at specific routing steps. Record measurements, capture defects, and automatically halt production if critical tolerances are breached.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">Key MES Features</h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Package className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">BOM & Routing</p>
                  <p className="text-xs text-zinc-500">Define complex multi-level BOMs and sequential production steps for each SKU.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Activity className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">OEE Tracking</p>
                  <p className="text-xs text-zinc-500">Automatically calculate Overall Equipment Effectiveness (Availability, Performance, Quality).</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <ClipboardList className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Inventory Sync</p>
                  <p className="text-xs text-zinc-500">Real-time consumption of raw materials and update of finished goods stock.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Activity className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Downtime Analysis</p>
                  <p className="text-xs text-zinc-500">Categorize and analyze downtime reasons to identify systemic production bottlenecks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
