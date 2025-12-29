export function OverviewChart() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-transparent" />
      <svg
        viewBox="0 0 600 300"
        className="relative h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="overview-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="overview-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0)" />
          </linearGradient>
        </defs>
        <g stroke="rgba(148,163,184,0.2)" strokeWidth="1">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={40 + i * 50} x2="600" y2={40 + i * 50} />
          ))}
        </g>
        <path
          d="M 0 230 C 80 180 140 190 200 150 C 260 110 320 130 380 90 C 440 50 520 70 600 40 L 600 300 L 0 300 Z"
          fill="url(#overview-fill)"
        />
        <path
          d="M 0 230 C 80 180 140 190 200 150 C 260 110 320 130 380 90 C 440 50 520 70 600 40"
          fill="none"
          stroke="url(#overview-line)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
