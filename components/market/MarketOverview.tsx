'use client';

import type { Language } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface MarketOverviewProps {
  language: Language;
  headerPrice: number;
  headerChange: number;
  t: (path: string) => string;
}

export function MarketOverview({ language, headerPrice, headerChange, t }: MarketOverviewProps) {
  return (
    <div className="rounded-2xl glass-card p-4 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">BTC/USDT</p>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-white font-mono">{formatNumber(headerPrice, language)}</p>
            <span className={`px-2 py-1 text-xs rounded-lg border ${headerChange >= 0 ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/15 text-rose-400 border-rose-500/20'}`}>
              {headerChange >= 0 ? '+' : ''}
              {headerChange.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
          <div className="p-2 rounded-xl bg-slate-900/40">
            <p className="text-slate-500">{t('market.high24h')}</p>
            <p className="font-mono text-white">67,880</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/40">
            <p className="text-slate-500">{t('market.low24h')}</p>
            <p className="font-mono text-white">65,240</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/40">
            <p className="text-slate-500">{t('market.volume')}</p>
            <p className="font-mono text-white">18,240 BTC</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/40">
            <p className="text-slate-500">{t('market.funding')}</p>
            <p className="font-mono text-emerald-400">0.012%</p>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-white/5 bg-gradient-to-b from-slate-900/50 to-slate-950/70 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{t('status.live')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:border-emerald-400 text-slate-300 text-[10px]">
              {t('chart.indicators')}
            </button>
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:border-cyan-400 text-slate-300 text-[10px]">
              {t('chart.draw')}
            </button>
          </div>
        </div>
        <div className="h-72 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-center text-slate-500 text-sm">
          <span className="skeleton h-6 w-32 rounded" />
        </div>
      </div>
    </div>
  );
}
