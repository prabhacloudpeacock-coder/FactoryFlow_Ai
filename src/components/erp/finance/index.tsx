import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, PieChart, TrendingUp, FileText, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

const tabs = [
  { id: 'ledger', label: 'General Ledger', icon: FileText },
  { id: 'ap', label: 'Accounts Payable', icon: ArrowDownLeft },
  { id: 'ar', label: 'Accounts Receivable', icon: ArrowUpRight },
  { id: 'costing', label: 'Costing', icon: DollarSign },
  { id: 'reports', label: 'Financial Reports', icon: PieChart },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState('ledger');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Financial Management</h1>
          <p className="text-zinc-500 mt-1">Costing, AR/AP, and General Ledger.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold">
            Export Reports
          </button>
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20">
            Post Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$2,450,000" trend="+12.5%" icon={TrendingUp} color="text-green-500" />
        <StatCard label="Total Expenses" value="$1,820,000" trend="+5.2%" icon={ArrowDownLeft} color="text-red-500" />
        <StatCard label="Accounts Receivable" value="$450,000" trend="-2.1%" icon={ArrowUpRight} color="text-blue-500" />
        <StatCard label="Net Profit" value="$630,000" trend="+18.4%" icon={DollarSign} color="text-orange-500" />
      </div>

      <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
      >
        {activeTab === 'ledger' && <GeneralLedger />}
        {activeTab === 'ap' && <AccountsPayable />}
        {activeTab === 'ar' && <AccountsReceivable />}
        {activeTab === 'costing' && <CostingModule />}
        {activeTab === 'reports' && <FinancialReports />}
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, trend, icon: Icon, color }: any) {
  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <Icon className={cn("w-5 h-5", color)} />
        <span className={cn("text-[10px] font-bold uppercase tracking-wider", trend.startsWith('+') ? "text-green-500" : "text-red-500")}>
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-zinc-100">{value}</p>
      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

function GeneralLedger() {
  const transactions = [
    { id: 'TX-1001', date: '2026-03-31', description: 'Raw Material Purchase - Steel', account: 'Inventory', amount: '-$45,000', status: 'Posted' },
    { id: 'TX-1002', date: '2026-03-31', description: 'Sales Order SO-2026-001', account: 'Revenue', amount: '+$125,000', status: 'Posted' },
    { id: 'TX-1003', date: '2026-03-30', description: 'Monthly Utility Bill', account: 'Utilities', amount: '-$12,400', status: 'Pending' },
    { id: 'TX-1004', date: '2026-03-30', description: 'Payroll - Production Team', account: 'Labor', amount: '-$85,000', status: 'Posted' },
  ];

  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">TX ID</th>
            <th className="p-4">Date</th>
            <th className="p-4">Description</th>
            <th className="p-4">Account</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{tx.id}</td>
              <td className="p-4 text-sm text-zinc-400">{tx.date}</td>
              <td className="p-4 text-sm font-medium">{tx.description}</td>
              <td className="p-4 text-sm text-zinc-400">{tx.account}</td>
              <td className={cn("p-4 text-sm font-mono text-right", tx.amount.startsWith('+') ? "text-green-500" : "text-red-500")}>
                {tx.amount}
              </td>
              <td className="p-4 text-center">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  tx.status === 'Posted' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                )}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccountsPayable() {
  const data = [
    { id: 'AP-001', vendor: 'Steel Supply Co', dueDate: '2026-04-05', amount: '$45,000', status: 'Pending' },
    { id: 'AP-002', vendor: 'Energy Grid', dueDate: '2026-04-10', amount: '$12,400', status: 'Approved' },
    { id: 'AP-003', vendor: 'Logistics Plus', dueDate: '2026-04-02', amount: '$8,500', status: 'Overdue' },
  ];
  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">ID</th>
            <th className="p-4">Vendor</th>
            <th className="p-4">Due Date</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{item.id}</td>
              <td className="p-4 text-sm font-medium">{item.vendor}</td>
              <td className="p-4 text-sm text-zinc-400">{item.dueDate}</td>
              <td className="p-4 text-sm font-mono text-right">{item.amount}</td>
              <td className="p-4 text-center">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  item.status === 'Approved' ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                  item.status === 'Overdue' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                  "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                )}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccountsReceivable() {
  const data = [
    { id: 'AR-001', customer: 'Global Motors', dueDate: '2026-04-15', amount: '$125,000', status: 'Sent' },
    { id: 'AR-002', customer: 'TechFlow Systems', dueDate: '2026-04-20', amount: '$42,500', status: 'Partial' },
    { id: 'AR-003', customer: 'Apex Engineering', dueDate: '2026-03-25', amount: '$89,000', status: 'Overdue' },
  ];
  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Due Date</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 font-mono text-orange-500 text-sm">{item.id}</td>
              <td className="p-4 text-sm font-medium">{item.customer}</td>
              <td className="p-4 text-sm text-zinc-400">{item.dueDate}</td>
              <td className="p-4 text-sm font-mono text-right">{item.amount}</td>
              <td className="p-4 text-center">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                  item.status === 'Sent' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : 
                  item.status === 'Overdue' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                  "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                )}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CostingModule() {
  const data = [
    { id: 'COST-001', product: 'Precision Shaft X1', directLabor: '$12.50', material: '$45.00', overhead: '$8.20', total: '$65.70' },
    { id: 'COST-002', product: 'Hydraulic Valve V2', directLabor: '$18.00', material: '$62.00', overhead: '$12.40', total: '$92.40' },
  ];
  return (
    <div className="p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            <th className="p-4">Product</th>
            <th className="p-4 text-right">Labor</th>
            <th className="p-4 text-right">Material</th>
            <th className="p-4 text-right">Overhead</th>
            <th className="p-4 text-right">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
              <td className="p-4 text-sm font-medium">{item.product}</td>
              <td className="p-4 text-sm font-mono text-right">{item.directLabor}</td>
              <td className="p-4 text-sm font-mono text-right">{item.material}</td>
              <td className="p-4 text-sm font-mono text-right">{item.overhead}</td>
              <td className="p-4 text-sm font-mono text-right font-bold text-orange-500">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinancialReports() {
  return (
    <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
        <h3 className="text-sm font-bold text-zinc-100 mb-4">Profit & Loss Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm"><span className="text-zinc-500">Revenue</span><span className="text-green-500">+$2.45M</span></div>
          <div className="flex justify-between text-sm"><span className="text-zinc-500">COGS</span><span className="text-red-500">-$1.32M</span></div>
          <div className="flex justify-between text-sm border-t border-zinc-800 pt-2 font-bold"><span className="text-zinc-100">Gross Profit</span><span>$1.13M</span></div>
        </div>
      </div>
      <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
        <h3 className="text-sm font-bold text-zinc-100 mb-4">Cash Flow Forecast</h3>
        <div className="h-32 flex items-end gap-2">
          {[40, 65, 45, 90, 75, 85].map((h, i) => (
            <div key={i} className="flex-1 bg-orange-500/20 border-t-2 border-orange-500 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-mono">
          <span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span>
        </div>
      </div>
    </div>
  );
}
