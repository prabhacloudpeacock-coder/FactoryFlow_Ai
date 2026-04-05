import { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';
import { cn } from '../../../../lib/utils';

const employees = [
  { id: 'EMP-001', name: 'John Doe', role: 'Production Manager', department: 'Operations', email: 'john.doe@industrial.com', phone: '+1 (555) 123-4567', status: 'Active', joined: '2022-03-15' },
  { id: 'EMP-002', name: 'Jane Smith', role: 'Quality Engineer', department: 'Quality', email: 'jane.smith@industrial.com', phone: '+1 (555) 234-5678', status: 'Active', joined: '2023-01-10' },
  { id: 'EMP-003', name: 'Robert Brown', role: 'Maintenance Lead', department: 'Maintenance', email: 'robert.brown@industrial.com', phone: '+1 (555) 345-6789', status: 'On Leave', joined: '2021-11-20' },
  { id: 'EMP-004', name: 'Emily Davis', role: 'HR Specialist', department: 'Human Resources', email: 'emily.davis@industrial.com', phone: '+1 (555) 456-7890', status: 'Active', joined: '2024-02-01' },
];

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-all text-sm font-bold border border-zinc-700">
          <Filter size={16} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-lg border border-zinc-700 group-hover:border-orange-500/50 transition-all">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100">{emp.name}</h3>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{emp.id}</p>
                </div>
              </div>
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                emp.status === 'Active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              )}>
                {emp.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Briefcase size={14} className="text-zinc-600" />
                <span>{emp.role} • {emp.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail size={14} className="text-zinc-600" />
                <span>{emp.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Phone size={14} className="text-zinc-600" />
                <span>{emp.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Calendar size={14} className="text-zinc-600" />
                <span>Joined {emp.joined}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 flex gap-2">
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all">
                View Profile
              </button>
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-xs font-bold transition-all">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
