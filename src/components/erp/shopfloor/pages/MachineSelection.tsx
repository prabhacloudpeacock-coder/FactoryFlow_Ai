export default function MachineSelection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Machine Selection</h2>
      <select className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded">
        <option>CNC Machine 1</option>
        <option>Injection Molder 2</option>
      </select>
    </div>
  );
}
