import { Search, Star, Settings, User, CheckCircle2 } from 'lucide-react';

const SKILL_DATA = [
  { id: 'EMP-001', name: 'Robert Fox', skills: [
    { machine: 'CNC Mill', level: 5 },
    { machine: 'Casting Machine', level: 3 },
    { machine: 'Welding Robot', level: 2 },
  ]},
  { id: 'EMP-002', name: 'Esther Howard', skills: [
    { machine: 'CNC Mill', level: 2 },
    { machine: 'Casting Machine', level: 5 },
    { machine: 'Welding Robot', level: 4 },
  ]},
  { id: 'EMP-003', name: 'Jenny Wilson', skills: [
    { machine: 'CNC Mill', level: 4 },
    { machine: 'Casting Machine', level: 2 },
    { machine: 'Welding Robot', level: 5 },
  ]},
];

const MACHINES = ['CNC Mill', 'Casting Machine', 'Welding Robot', 'Assembly Line'];

export default function SkillMatrix() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Star className="text-orange-500" /> Operator Skill Matrix
        </h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input 
            type="text" 
            placeholder="Search skills..." 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/50 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Operator</th>
              {MACHINES.map(m => (
                <th key={m} className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">{m}</th>
              ))}
              <th className="p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {SKILL_DATA.map(op => (
              <tr key={op.id} className="hover:bg-zinc-900/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                      <User className="text-zinc-500" size={16} />
                    </div>
                    <span className="font-medium text-zinc-200">{op.name}</span>
                  </div>
                </td>
                {MACHINES.map(m => {
                  const skill = op.skills.find(s => s.machine === m);
                  const level = skill ? skill.level : 0;
                  return (
                    <td key={m} className="p-4 text-center">
                      <div className="flex justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            size={12} 
                            className={star <= level ? 'text-orange-500 fill-orange-500' : 'text-zinc-800'} 
                          />
                        ))}
                      </div>
                    </td>
                  );
                })}
                <td className="p-4">
                  <button className="text-xs text-orange-500 hover:underline">Update Skills</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
