export default function DowntimeEntry() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Downtime Reason</h2>
      <select className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded">
        <option>Maintenance</option>
        <option>No Material</option>
        <option>Power Outage</option>
      </select>
      <button className="bg-yellow-500 text-zinc-950 px-4 py-2 rounded">Log Downtime</button>
    </div>
  );
}
