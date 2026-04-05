export default function JobControl({ job }: { job: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Job Control: {job.id}</h2>
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded">Start</button>
        <button className="bg-yellow-600 text-white px-6 py-3 rounded">Pause</button>
        <button className="bg-red-600 text-white px-6 py-3 rounded">Stop</button>
      </div>
    </div>
  );
}
