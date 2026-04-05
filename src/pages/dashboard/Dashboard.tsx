import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Package, 
  Cpu, 
  ShieldAlert 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeOrders: 12,
    completedToday: 8,
    qcPassRate: 98.5,
    avgCycleTime: '42m'
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'delay', message: 'Machine M2 predicted delay: 15m', severity: 'medium' },
    { id: 2, type: 'qc', message: 'Repeated alignment failure detected on Line 1', severity: 'high' },
    { id: 3, type: 'stock', message: 'Low stock: Battery Pack (12 left)', severity: 'low' }
  ]);

  const [productionStatus, setProductionStatus] = useState([
    { id: 'PO-001', product: 'EV Bike', progress: 65, status: 'in-progress' },
    { id: 'PO-002', product: 'EV Scooter', progress: 30, status: 'in-progress' },
    { id: 'PO-003', product: 'EV Bike', progress: 100, status: 'completed' }
  ]);

  return (
    <div className="p-6 space-y-6 bg-zinc-950 min-h-screen text-zinc-100">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FactoryFlow AI Dashboard</h1>
          <p className="text-zinc-500 mt-1">Real-time production monitoring & AI insights</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">System Live</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: stats.activeOrders, icon: Package, color: 'text-blue-500' },
          { label: 'Completed Today', value: stats.completedToday, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'QC Pass Rate', value: `${stats.qcPassRate}%`, icon: ShieldAlert, color: 'text-orange-500' },
          { label: 'Avg Cycle Time', value: stats.avgCycleTime, icon: Clock, color: 'text-purple-500' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
          >
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
              <stat.icon className={stat.color} size={20} />
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Status */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity size={20} className="text-orange-500" />
              Live Production Status
            </h2>
            <button className="text-sm text-orange-500 hover:underline">View All Orders</button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-zinc-950 border-b border-zinc-800">
                <tr>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Order ID</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Product</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Progress</th>
                  <th className="p-4 text-xs font-bold text-zinc-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {productionStatus.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 font-mono text-sm">{order.id}</td>
                    <td className="p-4 font-medium">{order.product}</td>
                    <td className="p-4">
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          className="bg-orange-500 h-full"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights & Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            AI Insights
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                whileHover={{ x: 5 }}
                className={`p-4 rounded-xl border flex gap-3 ${
                  alert.severity === 'high' ? 'bg-red-500/5 border-red-500/20' : 
                  alert.severity === 'medium' ? 'bg-orange-500/5 border-orange-500/20' : 
                  'bg-blue-500/5 border-blue-500/20'
                }`}
              >
                <div className={`mt-1 ${
                  alert.severity === 'high' ? 'text-red-500' : 
                  alert.severity === 'medium' ? 'text-orange-500' : 
                  'text-blue-500'
                }`}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <button className="text-[10px] font-bold uppercase mt-2 opacity-60 hover:opacity-100 transition-opacity">
                    Take Action
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl">
            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Optimization Suggestion</h3>
            <p className="text-sm mt-2 leading-relaxed">
              Increasing buffer size at Stage 2 could reduce idle time at Stage 3 by up to 12%.
            </p>
            <button className="mt-4 w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors">
              Apply Recommendation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
