'use client';

import type { Language, Trade } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface RecentTradesProps {
  t: (path: string) => string;
  language: Language;
  trades: Trade[];
}

export function RecentTrades({ t, language, trades }: RecentTradesProps) {
  return (
    <div className="rounded-2xl glass-card p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <span className="text-green-400 text-sm">↻</span>
          </div>
          <p className="text-xs font-semibold text-white">{t('recentTrades.title')}</p>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">{t('status.live')}</span>
        </div>
      </div>
      <div className="flex justify-between text-[9px] text-slate-500 mb-2 px-2">
        <span>{t('recentTrades.price')}</span>
        <span>{t('recentTrades.amount')}</span>
        <span>{t('recentTrades.time')}</span>
      </div>
      <div className="space-y-0.5 max-h-[220px] overflow-y-auto scrollbar-thin">
        {trades.map((trade, idx) => (
          <div
            key={`${trade.time}-${idx}`}
            className={`grid grid-cols-3 items-center px-2 py-1.5 rounded-lg text-xs ${trade.side === 'buy' ? 'bg-emerald-500/5 text-emerald-100' : 'bg-rose-500/5 text-rose-100'}`}
          >
            <span className="font-mono">{formatNumber(trade.price, language)}</span>
            <span className="text-center text-slate-200 font-mono">{trade.amount.toFixed(4)}</span>
            <span className="text-right text-slate-400">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
