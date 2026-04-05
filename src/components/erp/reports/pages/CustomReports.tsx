import { Search, Plus, FileText, Download, Filter, ChevronRight, Calendar } from 'lucide-react';

const SAVED_REPORTS = [
  { id: 'REP-001', name: 'Weekly Production Summary', type: 'Production', created: '2026-03-25', lastRun: '2026-03-30 08:00' },
  { id: 'REP-002', name: 'Machine Downtime Analysis', type: 'Downtime', created: '2026-03-10', lastRun: '2026-03-29 16:45' },
  { id: 'REP-003', name: 'Operator Efficiency Matrix', type: 'Workforce', created: '2026-03-28', lastRun: '2026-03-30 09:15' },
  { id: 'REP-004', name: 'Quality Defect Trend', type: 'Quality', created: '2026-03-15', lastRun: '2026-03-28 14:30' },
];

export default function CustomReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search Saved Reports..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus size={18} /> Create Custom Report
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Report Name</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Created Date</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Last Run</th>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {SAVED_REPORTS.map(report => (
              <tr key={report.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                      <FileText className="text-zinc-500" size={16} />
                    </div>
                    <span className="font-medium text-zinc-200">{report.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs text-zinc-400">{report.type}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Calendar size={14} />
                    {report.created}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-zinc-300">{report.lastRun}</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors">
                      <Download size={18} />
                    </button>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-100 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
