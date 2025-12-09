const rows = Array.from({ length: 8 }).map((_, idx) => ({
  price: (67500 - idx * 8).toLocaleString(),
  size: (1.24 + idx * 0.03).toFixed(2),
  total: (840 + idx * 12).toFixed(0),
}));

export function OrderBookCard() {
  return (
    <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📚</span>
          <p className="text-sm font-semibold">Order Book</p>
        </div>
        <span className="text-xs text-slate-400">Grouped 0.5</span>
      </div>

      <div className="space-y-1 text-sm">
        {rows.map((row, idx) => (
          <div
            key={row.price}
            className={`flex items-center justify-between rounded-lg px-2 py-1 bg-white/5 ${idx < 4 ? 'order-depth-ask' : 'order-depth-bid'} `}
          >
            <span className="font-mono text-emerald-300">{row.price}</span>
            <span className="text-slate-200">{row.size} BTC</span>
            <span className="text-slate-400">{row.total}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}
