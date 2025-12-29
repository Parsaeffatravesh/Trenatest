const positions = [
  { symbol: 'BTC/USDT', entry: '65,200', mark: '67,540', pnl: '+2,120.50' },
  { symbol: 'ETH/USDT', entry: '3,020', mark: '3,148', pnl: '+560.12' },
];

export function PositionsTabsCard() {
  return (
    <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧭</span>
          <p className="text-sm font-semibold">Positions</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] bg-slate-900/60 rounded-xl p-1">
          <button className="px-2 py-1 rounded-lg bg-white/10 border border-white/10">Open</button>
          <button className="px-2 py-1 rounded-lg text-slate-400">Orders</button>
          <button className="px-2 py-1 rounded-lg text-slate-400">History</button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {positions.map((pos) => (
          <div key={pos.symbol} className="rounded-xl bg-white/5 px-3 py-2 flex items-center justify-between">
            <div>
              <p className="font-semibold">{pos.symbol}</p>
              <p className="text-xs text-slate-400">Entry {pos.entry}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Mark {pos.mark}</p>
              <p className="text-sm text-emerald-400 font-semibold">{pos.pnl}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
