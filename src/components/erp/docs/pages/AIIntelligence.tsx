import { BrainCircuit, Activity, TrendingUp, ShieldAlert, Calendar } from 'lucide-react';

export default function AIIntelligenceDoc() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <BrainCircuit className="text-orange-500" size={24} /> AI & Smart Intelligence
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          FactoryFlow AI leverages advanced machine learning models to transform raw factory data into actionable intelligence. Our AI engine is designed to optimize every aspect of the manufacturing process.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Activity className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Predictive Maintenance</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            AI models analyze vibration, temperature, and power data to predict component failures. The system provides specific alerts (e.g., "Replace spindle bearings in 48 hours") to prevent unplanned downtime.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Production Forecasting</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Time-series forecasting models predict future production output and demand surges. This allows for proactive material ordering and workforce planning.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Anomaly Detection</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Real-time monitoring of machine telemetry to identify irregular patterns. The system can detect subtle mechanical or electrical issues that traditional threshold-based alerts might miss.
          </p>
        </div>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-orange-500" size={24} />
            <h3 className="font-bold text-zinc-100">Smart Scheduling</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            The AI optimizer suggests the most efficient production sequence, batch sizes, and resource allocations to maximize throughput and minimize changeover times.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">AI Model Architecture</h3>
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-orange-500 shrink-0 border border-zinc-800">1</div>
              <div>
                <p className="font-bold text-zinc-200">Data Normalization</p>
                <p className="text-xs text-zinc-500">Raw PLC and sensor data is cleaned and normalized across different machine types and protocols.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-orange-500 shrink-0 border border-zinc-800">2</div>
              <div>
                <p className="font-bold text-zinc-200">Feature Engineering</p>
                <p className="text-xs text-zinc-500">Key performance indicators (KPIs) and mechanical health features are extracted for model training.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-orange-500 shrink-0 border border-zinc-800">3</div>
              <div>
                <p className="font-bold text-zinc-200">Real-Time Inference</p>
                <p className="text-xs text-zinc-500">Trained models run on incoming data streams, providing low-latency insights and alerts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
