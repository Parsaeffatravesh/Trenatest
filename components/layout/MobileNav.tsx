const navItems = [
  { label: 'Markets', icon: '📊' },
  { label: 'Trade', icon: '⚡' },
  { label: 'Portfolio', icon: '📁' },
  { label: 'More', icon: '⋯' },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 xl:hidden bg-[var(--bg-secondary)]/90 backdrop-blur border-t border-white/10 z-30">
      <div className="mx-auto max-w-[1920px] w-full px-6 py-3 grid grid-cols-4 gap-3 text-center text-xs">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition"
            type="button"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
