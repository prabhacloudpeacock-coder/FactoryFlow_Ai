export default function ShiftHandover() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Shift Handover Notes</h2>
      <textarea placeholder="Handover notes..." className="w-full p-3 h-32 bg-zinc-950 border border-zinc-800 rounded" />
      <button className="bg-orange-500 text-zinc-950 px-4 py-2 rounded">Submit Notes</button>
    </div>
  );
}
