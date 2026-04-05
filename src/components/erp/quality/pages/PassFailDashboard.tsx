export default function PassFailDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pass / Fail Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-900/20 border border-green-800 rounded">
          <p className="text-sm text-green-400">Passed</p>
          <p className="text-3xl font-bold">1,200</p>
        </div>
        <div className="p-4 bg-red-900/20 border border-red-800 rounded">
          <p className="text-sm text-red-400">Failed</p>
          <p className="text-3xl font-bold">45</p>
        </div>
      </div>
    </div>
  );
}
