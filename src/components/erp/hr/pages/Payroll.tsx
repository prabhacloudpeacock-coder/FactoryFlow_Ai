import { useState } from 'react';
import { DollarSign, FileText, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../../../lib/utils';

const payrollData = [
  { id: 'PAY-2026-001', month: 'March 2026', totalAmount: '$125,000', status: 'Paid', date: '2026-03-28', employees: 42 },
  { id: 'PAY-2026-002', month: 'February 2026', totalAmount: '$122,500', status: 'Paid', date: '2026-02-28', employees: 41 },
  { id: 'PAY-2026-003', month: 'January 2026', totalAmount: '$118,000', status: 'Paid', date: '2026-01-28', employees: 40 },
  { id: 'PAY-2026-004', month: 'December 2025', totalAmount: '$135,000', status: 'Paid', date: '2025-12-28', employees: 42 },
];

export default function Payroll() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <DollarSign size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Next Payroll</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100">$128,500</p>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
            <Clock size={12} />
            Due in 25 days (April 28, 2026)
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <FileText size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Pending Approvals</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100">0</p>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 text-green-500">
            <CheckCircle2 size={12} />
            All payroll requests approved
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Tax Compliance</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100">100%</p>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 text-green-500">
            <CheckCircle2 size={12} />
            All filings up to date
          </p>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-zinc-100 tracking-tight">Payroll History</h3>
          <button className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors">
            View All History
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="p-4">Payroll ID</th>
                <th className="p-4">Month</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((pay) => (
                <tr key={pay.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-4 font-mono text-orange-500 text-sm">{pay.id}</td>
                  <td className="p-4 text-sm font-medium">{pay.month}</td>
                  <td className="p-4 text-sm font-mono">{pay.totalAmount}</td>
                  <td className="p-4 text-sm text-zinc-400">{pay.employees}</td>
                  <td className="p-4 text-sm text-zinc-400">{pay.date}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase border bg-green-500/10 text-green-500 border-green-500/20">
                      {pay.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-all">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
