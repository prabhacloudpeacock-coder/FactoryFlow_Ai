export default function OutputDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Output vs Target Dashboard (EV Bikes)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
          <p className="text-sm text-zinc-400">Target (EV-BIKE-MODEL-S)</p>
          <p className="text-3xl font-bold">500</p>
        </div>
        <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-center">
          <p className="text-sm text-zinc-400">Actual (EV-BIKE-MODEL-S)</p>
          <p className="text-3xl font-bold text-green-500">485</p>
        </div>
      </div>
    </div>
  );
}

