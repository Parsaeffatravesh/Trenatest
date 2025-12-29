interface Props {
  className?: string;
}

const rows = [
  { label: 'Latency', value: '18 ms', tone: 'text-emerald-400' },
  { label: 'Region', value: 'Frankfurt (AWS)', tone: 'text-slate-200' },
  { label: 'Status', value: 'Operational', tone: 'text-emerald-400' },
];

export function ServerInfoCard({ className = '' }: Props) {
  return (
    <div className={`rounded-2xl glass-card glass-card-hover p-3 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛰️</span>
          <p className="text-sm font-semibold">Server Status</p>
        </div>
        <span className="text-[10px] text-slate-400">Live</span>
      </div>

      <div className="space-y-2 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-slate-400">{row.label}</span>
            <span className={`font-mono ${row.tone}`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
