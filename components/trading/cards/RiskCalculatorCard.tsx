interface Props {
  className?: string;
}

export function RiskCalculatorCard({ className = '' }: Props) {
  return (
    <div className={`rounded-2xl glass-card glass-card-hover p-3 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡️</span>
          <p className="text-sm font-semibold">Risk Calculator</p>
        </div>
        <span className="text-xs text-slate-400">1.5% Risk</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Portfolio</span>
          <span className="font-mono">$124,530</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Max Loss</span>
          <span className="font-mono text-rose-400">$1,867</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Position Size</span>
          <span className="font-mono text-white">$124,460</span>
        </div>
      </div>

      <button className="mt-3 w-full py-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400 text-sm">
        Recalculate
      </button>
    </div>
  );
}
