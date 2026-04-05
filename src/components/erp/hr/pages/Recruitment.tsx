import { useState } from 'react';
import { Briefcase, Users, FileText, CheckCircle2, Clock, AlertCircle, Plus, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';

const jobs = [
  { id: 'JOB-001', title: 'Senior Production Engineer', department: 'Operations', type: 'Full-time', status: 'Open', applicants: 12, posted: '2026-03-20' },
  { id: 'JOB-002', title: 'Quality Assurance Specialist', department: 'Quality', type: 'Full-time', status: 'Open', applicants: 8, posted: '2026-03-22' },
  { id: 'JOB-003', title: 'Maintenance Technician', department: 'Maintenance', type: 'Full-time', status: 'In Review', applicants: 15, posted: '2026-03-15' },
  { id: 'JOB-004', title: 'HR Coordinator', department: 'Human Resources', type: 'Contract', status: 'Closed', applicants: 25, posted: '2026-03-01' },
];

export default function Recruitment() {
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-zinc-100">8</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Total Applicants</h3>
          <p className="text-3xl font-bold text-zinc-100">124</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Interviews Today</h3>
          <p className="text-3xl font-bold text-zinc-100">3</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Hired this Month</h3>
          <p className="text-3xl font-bold text-zinc-100">5</p>
        </div>
      </div>

      {isPostingJob && (
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-zinc-100 text-lg">Post New Job</h3>
            <button onClick={() => setIsPostingJob(false)} className="text-zinc-500 hover:text-zinc-300">
              <X size={20} />
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsPostingJob(false); setNewJobTitle(''); }}>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Job Title <span className="text-orange-500">*</span>
              </label>
              <input 
                type="text" 
                required 
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="e.g. Senior Production Engineer"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setIsPostingJob(false)} 
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl text-sm font-bold transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20"
              >
                Save Job
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-zinc-100 tracking-tight">Job Openings</h3>
          <button 
            onClick={() => setIsPostingJob(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded-xl transition-all text-sm font-bold shadow-lg shadow-orange-500/20"
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="p-4">Job ID</th>
                <th className="p-4">Job Title</th>
                <th className="p-4">Department</th>
                <th className="p-4">Type</th>
                <th className="p-4">Applicants</th>
                <th className="p-4">Posted Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-4 font-mono text-orange-500 text-sm">{job.id}</td>
                  <td className="p-4 text-sm font-medium">{job.title}</td>
                  <td className="p-4 text-sm text-zinc-400">{job.department}</td>
                  <td className="p-4 text-sm text-zinc-400">{job.type}</td>
                  <td className="p-4 text-sm font-mono">{job.applicants}</td>
                  <td className="p-4 text-sm text-zinc-400">{job.posted}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                      job.status === 'Open' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                      job.status === 'In Review' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-zinc-800 text-zinc-500 border-zinc-700"
                    )}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all">
                      View Applicants
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
