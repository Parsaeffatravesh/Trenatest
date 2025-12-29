interface Props {
  className?: string;
}

const events = [
  { time: '09:30 UTC', title: 'US CPI Release', impact: 'High' },
  { time: '12:00 UTC', title: 'ECB Press Conference', impact: 'Medium' },
  { time: '15:15 UTC', title: 'FOMC Minutes', impact: 'High' },
];

export function EconomicCalendarCard({ className = '' }: Props) {
  return (
    <div className={`rounded-2xl glass-card glass-card-hover p-3 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🗓️</span>
          <p className="text-sm font-semibold">Economic Calendar</p>
        </div>
        <span className="text-xs text-slate-400">GMT</span>
      </div>

      <div className="space-y-2 text-sm">
        {events.map((event) => (
          <div key={event.title} className="flex items-center justify-between rounded-lg px-2 py-2 bg-white/5">
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-xs text-slate-400">{event.time}</p>
            </div>
            <span className="px-2 py-1 text-[10px] rounded-lg bg-amber-500/20 text-amber-300">{event.impact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
