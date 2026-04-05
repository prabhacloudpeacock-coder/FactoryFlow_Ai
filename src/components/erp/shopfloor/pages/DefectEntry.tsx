export default function DefectEntry() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Defect Entry</h2>
      <input type="text" placeholder="Defect Type" className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded" />
      <input type="number" placeholder="Quantity" className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded" />
      <button className="bg-red-500 text-white px-4 py-2 rounded">Report Defect</button>
    </div>
  );
}
