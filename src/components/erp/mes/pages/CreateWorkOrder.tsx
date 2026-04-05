export default function CreateWorkOrder() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create New Work Order</h2>
      <form className="space-y-4">
        <select className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded">
          <option>EV-BIKE-MODEL-S</option>
          <option>EV-BIKE-MODEL-X</option>
          <option>EV-BATT-48V</option>
          <option>EV-MOTOR-1000W</option>
        </select>
        <input type="number" placeholder="Quantity" className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded" />
        <button type="submit" className="bg-orange-500 text-zinc-950 px-4 py-2 rounded font-semibold">Release Order</button>
      </form>
    </div>
  );
}

