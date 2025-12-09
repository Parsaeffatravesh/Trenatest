export function ChartCard() {
  return (
    <div className="relative rounded-2xl glass-card overflow-hidden shadow-2xl flex-1 min-h-[400px]">
      <div className="absolute inset-0 chart-container" />
      <div className="relative p-3 sm:p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
              <button key={tf} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5">
                {tf}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded-lg bg-white/5 border border-white/5">Indicators</button>
            <button className="px-2 py-1 rounded-lg bg-white/5 border border-white/5">Draw</button>
            <button className="px-2 py-1 rounded-lg bg-white/5 border border-white/5">Fullscreen</button>
          </div>
        </div>

        <div className="flex-1 rounded-xl bg-[var(--bg-secondary)] border border-white/5 flex items-center justify-center text-slate-500">
          <span className="text-sm">Chart placeholder</span>
        </div>
      </div>
    </div>
  );
}
