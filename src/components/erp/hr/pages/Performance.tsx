import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../../../lib/utils';

const reviews = [
  { id: 'REV-001', employee: 'John Doe', period: 'Q1 2026', rating: 4.5, status: 'Completed', date: '2026-03-25' },
  { id: 'REV-002', employee: 'Jane Smith', period: 'Q1 2026', rating: 4.8, status: 'Completed', date: '2026-03-26' },
  { id: 'REV-003', employee: 'Robert Brown', period: 'Q1 2026', rating: 3.2, status: 'In Progress', date: '2026-03-27' },
  { id: 'REV-004', employee: 'Emily Davis', period: 'Q1 2026', rating: 0, status: 'Pending', date: '-' },
];

export default function Performance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Star size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Avg Performance</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100">4.2 / 5.0</p>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 text-green-500">
            <TrendingUp size={12} />
            +0.3 from last quarter
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Reviews Completed</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100">75%</p>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
            <Clock size={12} />
            12 reviews remaining
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Top Performers</h3>
          </div>
          <p className="text-3xl font-bold text-zinc-100">5</p>
          <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1 text-orange-500">
            <Star size={12} />
            Eligible for promotion
          </p>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-zinc-100 tracking-tight">Performance Reviews</h3>
          <button className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors">
            Manage Review Cycles
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="p-4">Review ID</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Period</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-4 font-mono text-orange-500 text-sm">{rev.id}</td>
                  <td className="p-4 text-sm font-medium">{rev.employee}</td>
                  <td className="p-4 text-sm text-zinc-400">{rev.period}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className={cn(rev.rating > 0 ? "text-yellow-500 fill-yellow-500" : "text-zinc-700")} />
                      <span className="text-sm font-mono">{rev.rating > 0 ? rev.rating : 'N/A'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                      rev.status === 'Completed' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                      rev.status === 'In Progress' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-zinc-800 text-zinc-500 border-zinc-700"
                    )}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-zinc-400">{rev.date}</td>
                  <td className="p-4">
                    <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all">
                      View Review
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
