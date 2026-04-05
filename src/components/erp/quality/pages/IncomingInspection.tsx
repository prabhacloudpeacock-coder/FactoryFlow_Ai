export default function IncomingInspection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Incoming Material Inspection</h2>
      <div className="p-4 bg-zinc-950 rounded border border-zinc-800">
        <p className="text-sm text-zinc-400">Material: Steel Coil A-101</p>
        <p className="text-sm text-zinc-400">Status: Pending Inspection</p>
        <button className="mt-4 bg-orange-500 text-zinc-950 px-4 py-2 rounded">Start Inspection</button>
      </div>
    </div>
  );
}
