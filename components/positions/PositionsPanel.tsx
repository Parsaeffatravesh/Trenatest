'use client';

import type { Language, Position } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface PositionsPanelProps {
  t: (path: string) => string;
  language: Language;
  positions: Position[];
}

export function PositionsPanel({ t, language, positions }: PositionsPanelProps) {
  return (
    <div className="rounded-2xl glass-card p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
            <span className="text-blue-300 text-sm">⚓</span>
          </div>
          <p className="text-xs font-semibold text-white">{t('positions.title')}</p>
        </div>
        <span className="px-2 py-1 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">{positions.length}</span>
      </div>
      <div className="space-y-2">
        {positions.map((pos) => (
          <div key={pos.symbol} className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${pos.side === 'long' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                  {pos.side === 'long' ? t('order.long') : t('order.short')}
                </span>
                <p className="text-sm font-semibold text-white">{pos.symbol}</p>
              </div>
              <button className="text-[10px] text-slate-400 hover:text-white">{t('positions.close')}</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
              <div>
                <p>{t('order.amount')}</p>
                <p className="font-mono text-white">{pos.size} BTC</p>
              </div>
              <div>
                <p>{t('order.price')}</p>
                <p className="font-mono text-white">${formatNumber(pos.entry, language)}</p>
              </div>
              <div>
                <p>{t('market.mark')}</p>
                <p className="font-mono text-white">${formatNumber(pos.mark, language)}</p>
              </div>
              <div>
                <p>{t('positions.pnl')}</p>
                <p className={`font-mono ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>${formatNumber(pos.pnl, language)}</p>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>{t('positions.roe')}</span>
              <span className={`font-mono ${pos.roe >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pos.roe}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
