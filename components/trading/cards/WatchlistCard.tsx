const tabs = ['Crypto', 'Forex', 'Stocks'];
const items = [
  { name: 'BTC/USDT', price: '67,540', change: '+2.4%' },
  { name: 'ETH/USDT', price: '3,148', change: '+1.1%' },
  { name: 'SOL/USDT', price: '146.2', change: '-0.8%' },
  { name: 'XAU/USD', price: '2,152', change: '+0.2%' },
];

export function WatchlistCard() {
  return (
    <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <p className="text-sm font-semibold">Watchlist</p>
        </div>
        <button className="text-xs text-emerald-400">+ Add</button>
      </div>

      <div className="flex gap-1 mb-3 p-1 bg-slate-900/50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="flex-1 px-2 py-1 rounded-lg text-[10px] font-medium border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-1 max-h-[280px] overflow-y-auto scrollbar-thin">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-slate-400">Perpetual</p>
            </div>
            <div className="text-right">
              <p className="font-mono">{item.price}</p>
              <p className={item.change.startsWith('-') ? 'text-rose-400 text-xs' : 'text-emerald-400 text-xs'}>{item.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
