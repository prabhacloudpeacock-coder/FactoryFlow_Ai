export default function ConnectivityStatus() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Machine Connectivity</h2>
      <div className="flex items-center justify-between p-4 bg-zinc-950 rounded border border-zinc-800">
        <span>PLC_01_Main</span>
        <span className="text-green-500">Connected</span>
      </div>
      <div className="flex items-center justify-between p-4 bg-zinc-950 rounded border border-zinc-800">
        <span>PLC_02_Molding</span>
        <span className="text-red-500">Disconnected</span>
      </div>
    </div>
  );
}
