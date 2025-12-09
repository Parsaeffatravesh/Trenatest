const trades = Array.from({ length: 10 }).map((_, idx) => ({
  time: `12:${(idx + 10).toString().padStart(2, '0')}:15`,
  price: (67500 + idx * 3).toLocaleString(),
  size: (0.18 + idx * 0.02).toFixed(3),
  side: idx % 2 === 0 ? 'buy' : 'sell',
}));

export function RecentTradesCard() {
  return (
    <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <p className="text-sm font-semibold">Recent Trades</p>
        </div>
        <span className="text-xs text-slate-400">Live</span>
      </div>

      <div className="space-y-1 text-sm max-h-[280px] overflow-y-auto scrollbar-thin">
        {trades.map((trade) => (
          <div
            key={trade.time + trade.price}
            className="flex items-center justify-between rounded-lg px-2 py-1 bg-white/5"
          >
            <span className="text-slate-400 w-16">{trade.time}</span>
            <span className={trade.side === 'buy' ? 'text-emerald-300 font-mono' : 'text-rose-400 font-mono'}>
              {trade.price}
            </span>
            <span className="text-slate-200 font-mono">{trade.size} BTC</span>
          </div>
        ))}
      </div>
    </div>
  );
}
