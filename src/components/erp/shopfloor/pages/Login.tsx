export default function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">Operator Login</h2>
      <input type="text" placeholder="Operator ID" className="w-full p-3 mb-4 bg-zinc-950 border border-zinc-800 rounded" />
      <button onClick={onLogin} className="w-full bg-orange-500 text-zinc-950 p-3 rounded font-bold">Login</button>
    </div>
  );
}
