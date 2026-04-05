export default function InProcessChecks() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">In-Process Quality Checks</h2>
      <div className="p-4 bg-zinc-950 rounded border border-zinc-800">
        <p className="text-sm text-zinc-400">Operation: CNC Milling</p>
        <p className="text-sm text-zinc-400">Tolerance: +/- 0.05mm</p>
        <input type="number" placeholder="Measure Value" className="w-full p-2 mt-2 bg-zinc-900 border border-zinc-800 rounded" />
      </div>
    </div>
  );
}
