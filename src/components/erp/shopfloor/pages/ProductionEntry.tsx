export default function ProductionEntry() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Production Entry</h2>
      <input type="number" placeholder="Quantity" className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded" />
      <button className="bg-orange-500 text-zinc-950 px-4 py-2 rounded">Submit</button>
    </div>
  );
}
