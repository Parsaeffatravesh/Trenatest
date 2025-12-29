'use client';

import type { WatchlistItem, Language } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface LeftSidebarProps {
  t: (path: string) => string;
  language: Language;
  watchlistItems: WatchlistItem[];
  watchlistTab: 'crypto' | 'fx' | 'stocks';
  setWatchlistTab: (tab: 'crypto' | 'fx' | 'stocks') => void;
  totalBalance: number;
  todayPnL: number;
}

export function LeftSidebar({ t, language, watchlistItems, watchlistTab, setWatchlistTab, totalBalance, todayPnL }: LeftSidebarProps) {
  return (
    <aside className="w-full xl:w-72 flex-shrink-0 flex flex-col gap-3">
      <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
              <span className="text-emerald-400 text-sm">★</span>
            </div>
            <p className="text-xs font-semibold text-white">{t('watchlist.title')}</p>
          </div>
        </div>
        <div className="flex gap-1 mb-3 p-1 bg-slate-900/50 rounded-xl">
          {(['crypto', 'fx', 'stocks'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setWatchlistTab(tab)}
              className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-medium border transition-all ${watchlistTab === tab ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'text-slate-400 hover:bg-white/5 border-transparent'}`}
            >
              {tab === 'stocks' ? t('watchlist.stocks') : tab.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="space-y-1 max-h-[280px] overflow-y-auto scrollbar-thin">
          {watchlistItems.map((item) => {
            const isPositive = item.change >= 0;
            return (
              <button
                key={item.symbol}
                className="w-full text-start p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${isPositive ? 'from-emerald-500/20 to-cyan-500/20' : 'from-rose-500/20 to-orange-500/20'} flex items-center justify-center text-sm`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>{item.symbol}</span>
                    <span className="font-mono">{formatNumber(item.price, language)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{item.name}</span>
                    <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                      {isPositive ? '+' : ''}
                      {item.change}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl glass-card glass-card-hover p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <span className="text-purple-400 text-sm">⍟</span>
            </div>
            <p className="text-xs font-semibold text-white">{t('account.title')}</p>
          </div>
          <button className="text-[10px] text-slate-400 hover:text-emerald-400 transition">{t('account.deposit')}</button>
        </div>
        <div className="relative p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10 border border-emerald-500/20 mb-3 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl" />
          <p className="text-[10px] text-slate-400 mb-1">{t('account.totalBalance')}</p>
          <p className="text-xl font-bold text-white font-mono">${formatNumber(totalBalance, language)}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              +2.58%
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">+{formatNumber(todayPnL, language)}</span>
            <span className="text-[10px] text-slate-500">{t('account.today')}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 mb-0.5">{t('account.equity')}</p>
            <p className="font-mono text-white font-medium">$126,320.82</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 mb-0.5">{t('account.margin')}</p>
            <p className="font-mono text-white font-medium">$12,540.00</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 mb-0.5">{t('account.freeMargin')}</p>
            <p className="font-mono text-emerald-400 font-medium">$113,780.82</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 mb-0.5">{t('account.marginLevel')}</p>
            <p className="font-mono text-cyan-400 font-medium">1,007%</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl glass-card p-3 text-[11px]">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400">{t('server.connected')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-emerald-400">18ms</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 text-[9px] mb-0.5">{t('server.server')}</p>
            <p className="font-mono text-white">LDN-02</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 text-[9px] mb-0.5">{t('server.leverage')}</p>
            <p className="font-mono text-white">1:100</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-slate-900/50">
            <p className="text-slate-500 text-[9px] mb-0.5">{t('server.session')}</p>
            <p className="font-mono text-cyan-400">London</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
