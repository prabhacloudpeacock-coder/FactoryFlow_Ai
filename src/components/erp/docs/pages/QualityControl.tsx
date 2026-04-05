import { ShieldCheck, Beaker, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';

export default function QualityControlDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <ShieldCheck className="text-orange-500" size={24} /> Quality Control
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          The Quality Control module ensures that every product manufactured meets the highest standards. It integrates automated inspection data with manual checks to provide a comprehensive quality profile.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Beaker className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Quality Parameters</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Define critical quality standards for each SKU, including target values, tolerances, and inspection methods (e.g., Caliper, Multimeter, Profilometer).
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Inspection Logs</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Automated and manual inspection logs track the quality of each batch. The system automatically flags any parameters that fall outside of defined tolerances.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Quality Analytics</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Track first-pass yield, defect rates, and scrap values. Analyze defect trends to identify systemic quality issues in specific production lines.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Non-Conformance (NCR)</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Manage non-conforming products with built-in workflows for quarantine, rework, or scrap. Ensures that no defective product reaches the customer.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">Quality Inspection Workflow</h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-orange-500 shrink-0 border border-zinc-800">1</div>
              <div>
                <p className="font-bold text-zinc-200">Parameter Setup</p>
                <p className="text-xs text-zinc-500">Define target values and tolerances in the Quality Parameters master for each SKU.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-orange-500 shrink-0 border border-zinc-800">2</div>
              <div>
                <p className="font-bold text-zinc-200">Real-Time Inspection</p>
                <p className="text-xs text-zinc-500">Data is collected from automated sensors and manual operator checks during production.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-orange-500 shrink-0 border border-zinc-800">3</div>
              <div>
                <p className="font-bold text-zinc-200">Validation & Alerting</p>
                <p className="text-xs text-zinc-500">The system validates data against standards and triggers immediate alerts for any non-conformance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
