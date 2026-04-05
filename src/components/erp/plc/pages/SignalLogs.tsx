export default function SignalLogs() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Signal Logs</h2>
      <div className="p-4 bg-zinc-950 rounded border border-zinc-800 font-mono text-xs">
        <p>[12:45:01] PLC_01_Main: Motor_Speed = 1200</p>
        <p>[12:45:02] PLC_01_Main: Temp_Zone_1 = 45.2</p>
      </div>
    </div>
  );
}
