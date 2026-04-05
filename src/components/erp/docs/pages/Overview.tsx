import { BookOpen, Zap, ShieldCheck, Cpu, Activity } from 'lucide-react';

export default function OverviewDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <BookOpen className="text-orange-500" size={24} /> Platform Overview
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          FactoryFlow AI is an enterprise-grade Smart Factory Management System (SFMS) that integrates Manufacturing Execution Systems (MES), Industrial IoT (IIoT), and Artificial Intelligence into a single, cohesive platform.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
          <Zap className="text-yellow-500" size={32} />
          <h3 className="font-bold text-zinc-100">Real-Time Control</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">Monitor every machine, operator, and work order as it happens on the shop floor.</p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
          <ShieldCheck className="text-green-500" size={32} />
          <h3 className="font-bold text-zinc-100">Quality Assurance</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">Automated quality parameters and inspection logs ensure zero-defect manufacturing.</p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
          <Cpu className="text-blue-500" size={32} />
          <h3 className="font-bold text-zinc-100">AI Optimization</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">Predictive maintenance and smart scheduling powered by advanced ML models.</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">SCADA vs MES: Core Differences</h3>
        <p className="text-sm text-zinc-500">Understanding the roles of Supervisory Control and Manufacturing Execution systems in a smart factory.</p>
        <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Capability</th>
                <th className="p-4 text-xs font-bold text-orange-500 uppercase tracking-widest">SCADA</th>
                <th className="p-4 text-xs font-bold text-blue-500 uppercase tracking-widest">MES</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-zinc-800/50">
                <td className="p-4 font-bold text-zinc-300">Core Focus</td>
                <td className="p-4 text-zinc-500 italic">Machine automation and monitoring</td>
                <td className="p-4 text-zinc-400">Error-proofing, establishing standard work, and process compliance</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="p-4 font-bold text-zinc-300">Best At</td>
                <td className="p-4 text-zinc-500 italic">Real-time machine data and control</td>
                <td className="p-4 text-zinc-400">Worker guidance with end-to-end traceability (capturing operator actions + build context)</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="p-4 font-bold text-zinc-300">Type of Data Captured</td>
                <td className="p-4 text-zinc-500 italic">Machine runtime, sensor values, equipment status</td>
                <td className="p-4 text-zinc-400">Operator inputs and data from connected IoT tools, devices, and equipment</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="p-4 font-bold text-zinc-300">Traceability Capabilities</td>
                <td className="p-4 text-zinc-500 italic">Machine logs</td>
                <td className="p-4 text-zinc-400">Complete build history with human + machine data recorded in one system</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-zinc-300">Operator Input Capabilities</td>
                <td className="p-4 text-zinc-500 italic">Could capture this data via custom apps, but needs developer effort</td>
                <td className="p-4 text-zinc-400">Purpose-built for manual assembly, poka-yoke, and operator guidance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">MES Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
              <Activity size={20} />
            </div>
            <h4 className="font-bold text-zinc-100">Visual Workflow Designer</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Define complex process routings with integrated BOM, quality gates, and step-by-step operator instructions.</p>
          </div>
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-zinc-100">Digital Quality Control</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Replace paper logs with digital checklists, automated Poka-yoke verification, and real-time compliance monitoring.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">Core Architecture</h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">1</div>
              <div>
                <p className="font-bold text-zinc-200">Edge Layer</p>
                <p className="text-sm text-zinc-500">Direct connection to PLCs, sensors, and LabVIEW instances on the factory floor.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">2</div>
              <div>
                <p className="font-bold text-zinc-200">Data Processing Layer</p>
                <p className="text-sm text-zinc-500">Real-time stream processing and anomaly detection using high-performance gateways.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold shrink-0">3</div>
              <div>
                <p className="font-bold text-zinc-200">Intelligence Layer</p>
                <p className="text-sm text-zinc-500">AI-driven forecasting, predictive maintenance, and operational optimization.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
