import { useState } from 'react';
import { Activity, TrendingUp, Zap, Settings, CheckCircle2, AlertTriangle, ArrowRight, Play } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { motion } from 'framer-motion';

const OPTIMIZATION_SCENARIOS = [
  { 
    id: 'OPT-001', 
    name: 'Energy Efficiency Mode', 
    description: 'Reduces overall energy consumption by 15% during non-peak hours by adjusting spindle speeds and cooling cycles.', 
    impact: { output: '-2%', energy: '-15%', cost: '-8%' },
    status: 'Active'
  },
  { 
    id: 'OPT-002', 
    name: 'Max Throughput Mode', 
    description: 'Prioritizes production speed to meet urgent demand. Increases machine wear slightly but boosts output.', 
    impact: { output: '+12%', energy: '+5%', cost: '+2%' },
    status: 'Available'
  },
  { 
    id: 'OPT-003', 
    name: 'Quality First Mode', 
    description: 'Slows down critical operations by 5% to ensure maximum precision and reduce scrap rates on high-value parts.', 
    impact: { output: '-5%', quality: '+18%', scrap: '-25%' },
    status: 'Available'
  }
];

export default function ProductionOptimization() {
  const [activeScenario, setActiveScenario] = useState('OPT-001');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Zap className="text-orange-500" size={24} /> AI Production Optimization
          </h2>
          <p className="text-zinc-400 mt-1">AI-driven scenarios to balance throughput, quality, and energy consumption.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold">
            <Settings size={16} />
            Configure AI Models
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-zinc-100 mb-4">Optimization Scenarios</h3>
            <div className="space-y-4">
              {OPTIMIZATION_SCENARIOS.map(scenario => (
                <div 
                  key={scenario.id} 
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer",
                    activeScenario === scenario.id 
                      ? "bg-orange-500/10 border-orange-500/30" 
                      : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                  )}
                  onClick={() => setActiveScenario(scenario.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        activeScenario === scenario.id ? "bg-orange-500/20 text-orange-500" : "bg-zinc-800 text-zinc-400"
                      )}>
                        <Zap size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-100">{scenario.name}</h4>
                        <p className="text-xs text-zinc-500 font-mono">{scenario.id}</p>
                      </div>
                    </div>
                    {scenario.status === 'Active' ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Available
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">{scenario.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(scenario.impact).map(([key, value]) => (
                      <div key={key} className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
                        <span className="text-xs text-zinc-500 capitalize">{key}</span>
                        <span className={cn(
                          "text-xs font-bold",
                          value.startsWith('+') && key !== 'scrap' && key !== 'energy' && key !== 'cost' ? "text-emerald-500" : 
                          value.startsWith('-') && (key === 'scrap' || key === 'energy' || key === 'cost') ? "text-emerald-500" :
                          "text-orange-500"
                        )}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {activeScenario === scenario.id && scenario.status !== 'Active' && (
                    <div className="mt-4 pt-4 border-t border-zinc-800/50 flex justify-end">
                      <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20">
                        <Play size={16} /> Apply Scenario
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Activity className="text-orange-500" size={16} /> Live AI Adjustments
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              {[
                { time: 'Just now', action: 'Reduced CNC #1 spindle speed by 2% to stabilize temperature.', type: 'adjustment' },
                { time: '5m ago', action: 'Rerouted Job #402 to Assembly Line B due to predicted bottleneck.', type: 'routing' },
                { time: '12m ago', action: 'Increased cooling flow rate on Injection Molder #3.', type: 'adjustment' },
              ].map((log, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-500 group-[.is-active]:text-orange-500 group-[.is-active]:border-orange-500/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <Zap size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 shadow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{log.type}</span>
                      <span className="text-[10px] font-mono text-orange-500">{log.time}</span>
                    </div>
                    <p className="text-sm text-zinc-300">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
