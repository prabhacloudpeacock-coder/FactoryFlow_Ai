import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, TrendingUp, Zap, Target, Calendar } from 'lucide-react';
import { cn } from '../../../lib/utils';

const tabs = [
  { id: 'analytics', label: 'Real-time Analytics', icon: BarChart3 },
  { id: 'trends', label: 'Trend Analysis', icon: LineChart },
  { id: 'forecasting', label: 'Demand Forecasting', icon: Zap },
  { id: 'kpis', label: 'KPI Tracking', icon: Target },
];

export default function BusinessIntelligence() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Business Intelligence (BI)</h1>
          <p className="text-zinc-500 mt-1">Real-time dashboards, trend analysis, and demand forecasting.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold flex items-center gap-2">
            <Calendar size={16} /> Last 30 Days
          </button>
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20">
            Generate Insights
          </button>
        </div>
      </div>

      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <BIChartCard title="Production Efficiency vs Target" type="line" />
        <BIChartCard title="Revenue Distribution by Product Line" type="pie" />
        <BIChartCard title="Demand Forecast - Next 6 Months" type="bar" />
        <BIChartCard title="Operational Downtime Analysis" type="area" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIWidget label="OEE (Overall Equipment Effectiveness)" value="84.2%" target="85.0%" status="warning" />
        <KPIWidget label="Inventory Turnover Ratio" value="12.5x" target="10.0x" status="success" />
        <KPIWidget label="Order Fulfillment Cycle Time" value="4.2 Days" target="3.5 Days" status="danger" />
      </div>
    </div>
  );
}

function BIChartCard({ title, type }: any) {
  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl h-80 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">{title}</h3>
        <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">
          <TrendingUp size={16} />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/50">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-zinc-800 mx-auto mb-2" />
          <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest">Visualizing {type} chart data...</p>
        </div>
      </div>
    </div>
  );
}

function KPIWidget({ label, value, target, status }: any) {
  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl relative overflow-hidden">
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        status === 'success' ? "bg-green-500" :
        status === 'warning' ? "bg-yellow-500" :
        "bg-red-500"
      )} />
      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-zinc-100">{value}</p>
        <div className="text-right">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Target</p>
          <p className="text-xs font-mono text-zinc-400">{target}</p>
        </div>
      </div>
    </div>
  );
}
