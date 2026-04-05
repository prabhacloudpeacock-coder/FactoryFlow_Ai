export default function JobList({ onSelect }: { onSelect: (job: any) => void }) {
  const jobs = [{ id: 'J-001', name: 'CNC Part A' }, { id: 'J-002', name: 'Molding Part B' }];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Assigned Jobs</h2>
      {jobs.map(job => (
        <button key={job.id} onClick={() => onSelect(job)} className="w-full p-4 bg-zinc-950 rounded border border-zinc-800 text-left">
          {job.id} - {job.name}
        </button>
      ))}
    </div>
  );
}
