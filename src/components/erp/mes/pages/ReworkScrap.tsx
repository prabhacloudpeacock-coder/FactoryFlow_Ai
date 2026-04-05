export default function ReworkScrap() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Rework / Scrap Entry (EV Bikes)</h2>
      <form className="space-y-4">
        <select className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded">
          <option>Rework - Frame Alignment</option>
          <option>Rework - Wiring Fix</option>
          <option>Scrap - Defective Battery</option>
          <option>Scrap - Damaged Motor</option>
        </select>
        <input type="number" placeholder="Quantity" className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded" />
        <textarea placeholder="Reason" className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded" />
        <button type="submit" className="bg-orange-500 text-zinc-950 px-4 py-2 rounded font-semibold">Submit Entry</button>
      </form>
    </div>
  );
}

