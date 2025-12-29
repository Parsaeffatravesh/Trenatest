export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-[var(--bg-primary)]/80 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-[1920px] w-full px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 via-cyan-500/20 to-purple-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <span className="text-xl">🪙</span>
          </div>
          <div>
            <p className="text-sm font-semibold">NeoTrader Pro</p>
            <p className="text-xs text-slate-400">Real-time trading workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-emerald-400 transition glass-card-hover">New Order</button>
          <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-400 transition glass-card-hover hidden sm:inline-flex">Alerts</button>
          <button className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-purple-400 transition glass-card-hover">Settings</button>
        </div>
      </div>
    </header>
  );
}
