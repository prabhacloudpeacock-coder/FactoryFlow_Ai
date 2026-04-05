export default function LineAssignment() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Production Line Assignment</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <h3 className="font-bold">Line 1 (Frame Welding)</h3>
          <p className="text-sm text-zinc-400">Assigned: WO-EV-001</p>
        </div>
        <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <h3 className="font-bold">Line 2 (Motor Assembly)</h3>
          <p className="text-sm text-zinc-400">Assigned: WO-EV-002</p>
        </div>
      </div>
    </div>
  );
}

