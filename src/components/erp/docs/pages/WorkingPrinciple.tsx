import { motion } from 'framer-motion';
import { Cpu, Network, BrainCircuit, Factory, LayoutDashboard, ArrowRight, ArrowDown, Zap, ShieldCheck, Activity } from 'lucide-react';

export default function WorkingPrincipleDoc() {
  const flowSteps = [
    {
      id: 'edge',
      title: 'Edge Layer',
      icon: Cpu,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      description: 'Sensors, PLCs (Siemens/AB), and LabVIEW VIs collect raw machine data.'
    },
    {
      id: 'integration',
      title: 'Integration Layer',
      icon: Network,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      description: 'OPC-UA & MQTT Gateways translate protocols and map device tags to ERP variables.'
    },
    {
      id: 'ai',
      title: 'AI Engine',
      icon: BrainCircuit,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      description: 'ML models perform real-time inference for predictive maintenance and anomaly detection.'
    },
    {
      id: 'mes',
      title: 'MES Core',
      icon: Factory,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      description: 'Operational logic executes work orders, tracks OEE, and manages shop floor resources.'
    },
    {
      id: 'viz',
      title: 'Visualization',
      icon: LayoutDashboard,
      color: 'text-zinc-100',
      bg: 'bg-zinc-100/10',
      description: 'Real-time dashboards and reports provide actionable insights to management.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <Zap className="text-orange-500" size={24} /> System Working Principle
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          FactoryFlow AI operates on a closed-loop intelligence cycle. Data flows from the physical machine layer through our integration gateways, is processed by AI models, and results in optimized operational execution on the shop floor.
        </p>
      </section>

      {/* Visual Flowchart */}
      <div className="relative py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          {flowSteps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center text-center max-w-[180px] group">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-4 border border-zinc-800 group-hover:border-orange-500/50 transition-all shadow-lg`}
              >
                <step.icon className={step.color} size={32} />
              </motion.div>
              <h4 className="font-bold text-zinc-100 text-sm mb-2">{step.title}</h4>
              <p className="text-[10px] text-zinc-500 leading-tight">{step.description}</p>
              
              {idx < flowSteps.length - 1 && (
                <>
                  <div className="hidden md:block absolute top-8 left-[calc(10%+(idx*20%)+40px)] w-[calc(20%-80px)] h-px bg-gradient-to-r from-zinc-800 via-orange-500/30 to-zinc-800"></div>
                  <ArrowRight className="hidden md:block absolute top-6 left-[calc(20%+(idx*20%)-10px)] text-zinc-800" size={16} />
                  <ArrowDown className="md:hidden my-4 text-zinc-800" size={20} />
                </>
              )}
            </div>
          ))}
        </div>
        {/* Background Connection Line */}
        <div className="hidden md:block absolute top-[72px] left-[10%] right-[10%] h-px bg-zinc-800 -z-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="text-orange-500" size={20} /> Data Lifecycle
          </h3>
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-bold text-zinc-200">1. Ingestion & Normalization</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Raw data from disparate sources (Modbus, OPC-UA, MQTT) is ingested. Our Integration Layer normalizes these signals into a standard JSON format, ensuring that a "Temperature" tag from a Siemens PLC is identical to one from an Allen Bradley controller.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-zinc-200">2. Real-Time Stream Processing</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Data streams are processed in real-time. Anomaly detection models run at the edge to identify immediate risks, while aggregated data is sent to the cloud for long-term trend analysis.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-zinc-200">3. Feedback Loop</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Insights from the AI Engine (like predictive maintenance alerts) are pushed back to the MES Core. This triggers automatic work order generation or shift adjustments, closing the loop between insight and action.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="text-orange-500" size={20} /> Security & Reliability
          </h3>
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-6">
            <div className="flex gap-4">
              <div className="p-2 bg-zinc-900 rounded-lg h-fit border border-zinc-800">
                <ShieldCheck className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200">End-to-End Encryption</p>
                <p className="text-xs text-zinc-500 leading-relaxed">All data transmitted between the factory floor and the ERP is encrypted using TLS 1.3, protecting sensitive industrial secrets.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 bg-zinc-900 rounded-lg h-fit border border-zinc-800">
                <Activity className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200">Edge Resilience</p>
                <p className="text-xs text-zinc-500 leading-relaxed">Our gateways feature local buffering. In the event of a network outage, data is stored locally and synchronized once the connection is restored.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 bg-zinc-900 rounded-lg h-fit border border-zinc-800">
                <Cpu className="text-purple-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200">High Availability</p>
                <p className="text-xs text-zinc-500 leading-relaxed">The system architecture is distributed, ensuring that a failure in one module (e.g., Reporting) does not affect core production tracking.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
