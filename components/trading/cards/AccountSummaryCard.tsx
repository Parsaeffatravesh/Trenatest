interface Props {
  className?: string;
}

export function AccountSummaryCard({ className = '' }: Props) {
  return (
    <div className={`rounded-2xl glass-card glass-card-hover p-3 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">💼</span>
          <p className="text-sm font-semibold">Account Summary</p>
        </div>
        <span className="text-xs text-emerald-400">Pro</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Equity</span>
          <span className="font-mono">$124,530.12</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Available Margin</span>
          <span className="font-mono text-emerald-400">$38,440.00</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Unrealized PnL</span>
          <span className="font-mono text-emerald-400">+$1,240.22</span>
        </div>
      </div>
    </div>
  );
}
