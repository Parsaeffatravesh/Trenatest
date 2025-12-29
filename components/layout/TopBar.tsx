'use client';

import type { Language } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface TopBarProps {
  language: Language;
  headerPrice: number;
  headerChange: number;
  onToggleLanguage: () => void;
  t: (path: string) => string;
}

export function TopBar({ language, headerPrice, headerChange, onToggleLanguage, t }: TopBarProps) {
  return (
    <header className="border-b border-white/5 bg-[#0a0e17]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-[1920px] px-3 sm:px-4 lg:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/30 text-white">
            <span className="relative z-10">NT</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-500 blur-lg opacity-50" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-tight gradient-text">{t('appName')}</p>
            <p className="text-[10px] text-slate-500">{t('appTagline')}</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 rounded-full p-1 border border-white/5">
          {(['watchlist', 'charts', 'orders', 'portfolio', 'analytics'] as const).map((key) => (
            <button
              key={key}
              className={`nav-btn px-4 py-2 rounded-full text-xs font-medium transition-all ${key === 'charts' ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              data-nav={key}
            >
              {t(`nav.${key}`)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">{t('status.marketOpen')}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="font-mono text-slate-300">{formatNumber(headerPrice, language)}</span>
            <span className={`text-[10px] ${headerChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {headerChange >= 0 ? '+' : ''}
              {headerChange.toFixed(2)}%
            </span>
          </div>
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800 transition text-xs font-medium"
          >
            <span>{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
