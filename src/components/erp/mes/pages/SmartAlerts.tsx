import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Settings, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  Bell,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';

export default function SmartAlerts() {
  const [activeTab, setActiveTab] = useState<'all' | 'machine' | 'human'>('all');

  const alerts = [
    { 
      id: '1', 
      type: 'machine', 
      title: 'Vibration Anomaly - Motor Assembly Line', 
      detail: 'Abnormal vibration detected in the main spindle. Potential bearing wear.',
      severity: 'high',
      time: '10:45 AM',
      status: 'Active'
    },
    { 
      id: '2', 
      type: 'human', 
      title: 'Missed Step - Frame Prep', 
      detail: 'Operator skipped the visual inspection step for unit EV-SN-002.',
      severity: 'critical',
      time: '11:12 AM',
      status: 'Active'
    },
    { 
      id: '3', 
      type: 'machine', 
      title: 'Voltage Drop - Frame Welding Station', 
      detail: 'Input voltage dropped below 220V. Power supply check recommended.',
      severity: 'medium',
      time: '11:30 AM',
      status: 'Active'
    },
    { 
      id: '4', 
      type: 'human', 
      title: 'Quality Deviation - Final QA Dyno', 
      detail: 'Output voltage (47.1V) is outside the tolerance range (47.5V - 48.5V).',
      severity: 'high',
      time: '11:45 AM',
      status: 'Resolved'
    },
  ];

  const filteredAlerts = alerts.filter(a => activeTab === 'all' || a.type === activeTab);

  const handleResolve = (id: string) => {
    toast.success(`Alert ${id} resolved and logged.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <Bell className="text-orange-500" /> Smart Alerts
          </h2>
          <p className="text-sm text-zinc-500">Real-time detection of machine anomalies and human errors</p>
        </div>
        <div className="flex bg-zinc-950 border border-zinc-800 rounded-xl p-1">
          {['all', 'machine', 'human'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={clsx(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize",
                activeTab === tab ? "bg-orange-500 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={clsx(
                "p-6 bg-zinc-950 border rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center transition-all",
                alert.status === 'Resolved' ? "border-zinc-800 opacity-60" : 
                alert.severity === 'critical' ? "border-rose-500/30 bg-rose-500/5" : 
                alert.severity === 'high' ? "border-orange-500/30 bg-orange-500/5" : 
                "border-yellow-500/30 bg-yellow-500/5"
              )}
            >
              <div className={clsx(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                alert.type === 'machine' ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"
              )}>
                {alert.type === 'machine' ? <Cpu size={24} /> : <User size={24} />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-zinc-100">{alert.title}</h3>
                  <span className={clsx(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    alert.severity === 'critical' ? "bg-rose-500 text-zinc-950" : 
                    alert.severity === 'high' ? "bg-orange-500 text-zinc-950" : 
                    "bg-yellow-500 text-zinc-950"
                  )}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">{alert.detail}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {alert.time}</span>
                  <span className="flex items-center gap-1"><ShieldAlert size={12} /> {alert.type === 'machine' ? 'Sensor Data' : 'Process Log'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                {alert.status === 'Active' ? (
                  <button 
                    onClick={() => handleResolve(alert.id)}
                    className="flex-1 md:flex-none px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-100 font-bold rounded-xl text-xs transition-all active:scale-95"
                  >
                    Resolve Alert
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-500 font-bold text-xs px-4 py-2 bg-green-500/10 rounded-xl">
                    <CheckCircle2 size={14} /> Resolved
                  </div>
                )}
                <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-100 transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
