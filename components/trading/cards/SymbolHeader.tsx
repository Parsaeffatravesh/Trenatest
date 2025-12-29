const highlights = [
  { label: '24h High', value: '$68,420' },
  { label: '24h Low', value: '$66,180' },
  { label: 'Funding', value: '+0.0100%' },
  { label: 'OI', value: '$1.42B' },
];

export function SymbolHeader() {
  return (
    <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
            ₿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">BTC/USDT</p>
              <span className="text-xs px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300">Perpetual</span>
            </div>
            <p className="text-sm text-slate-400">Liquidity: Deep · Volatility: Medium</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="text-xs text-slate-400">Last Price</p>
            <p className="text-2xl font-bold text-emerald-300">$67,542.12</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Change</p>
            <p className="text-sm font-semibold text-emerald-400">+2.48%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm">
        {highlights.map((item) => (
          <div key={item.label} className="rounded-xl bg-white/5 px-3 py-2 flex items-center justify-between">
            <span className="text-slate-400">{item.label}</span>
            <span className="font-mono text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
