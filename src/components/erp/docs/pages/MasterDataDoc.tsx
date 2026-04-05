import { Database, Settings, Layout, Package, Users, Wrench, ShieldCheck } from 'lucide-react';

export default function MasterDataDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Database className="text-orange-500" size={24} /> Master Data Management
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Master Data Management (MDM) provides the foundational 'Source of Truth' for all factory operations. It ensures that all modules use consistent, accurate, and up-to-date information.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Settings size={18} />
            <h3 className="font-bold text-zinc-100">Machines</h3>
          </div>
          <p className="text-xs text-zinc-500">Registry of all factory equipment, including machine types, line assignments, and service history.</p>
        </div>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Layout size={18} />
            <h3 className="font-bold text-zinc-100">Production Lines</h3>
          </div>
          <p className="text-xs text-zinc-500">Management of production lines with machine count, operator allocation, and capacity utilization.</p>
        </div>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Package size={18} />
            <h3 className="font-bold text-zinc-100">Products / SKUs</h3>
          </div>
          <p className="text-xs text-zinc-500">Centralized product catalog tracking categories, pricing, and live stock levels for all items.</p>
        </div>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Users size={18} />
            <h3 className="font-bold text-zinc-100">Operators</h3>
          </div>
          <p className="text-xs text-zinc-500">Workforce database managing operator roles, shift assignments, and skill level tracking.</p>
        </div>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <Wrench size={18} />
            <h3 className="font-bold text-zinc-100">Tools / Fixtures</h3>
          </div>
          <p className="text-xs text-zinc-500">Inventory management for cutting tools, fixtures, and consumables with life-remaining tracking.</p>
        </div>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-orange-500">
            <ShieldCheck size={18} />
            <h3 className="font-bold text-zinc-100">Quality Params</h3>
          </div>
          <p className="text-xs text-zinc-500">Definition of quality standards for each product, including target values, tolerances, and methods.</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">Data Integrity Principles</h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Database className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Single Source of Truth</p>
                  <p className="text-xs text-zinc-500">All modules reference the same master data, eliminating data duplication and inconsistencies.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Data Validation</p>
                  <p className="text-xs text-zinc-500">Strict validation rules ensure that only accurate and complete data is entered into the system.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Settings className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Audit Logging</p>
                  <p className="text-xs text-zinc-500">All changes to master data are logged with timestamps and user IDs for full traceability.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Layout className="text-zinc-500 shrink-0" size={20} />
                <div>
                  <p className="font-bold text-zinc-200">Hierarchical Structure</p>
                  <p className="text-xs text-zinc-500">Data is organized in a logical hierarchy (e.g., Factory {'>'} Line {'>'} Machine {'>'} Tool).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
