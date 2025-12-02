'use client';

import type { Language, OrderBookRow } from '../../types/domain';
import { formatCompact, formatNumber } from '../../lib/format';

interface OrderBookProps {
  t: (path: string) => string;
  language: Language;
  orderBook: OrderBookRow[];
}

export function OrderBook({ t, language, orderBook }: OrderBookProps) {
  return (
    <div className="rounded-2xl glass-card p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <span className="text-cyan-400 text-sm">⥮</span>
          </div>
          <p className="text-xs font-semibold text-white">{t('orderBook.title')}</p>
        </div>
        <div className="text-[10px] text-slate-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{t('status.live')}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 text-[10px] text-slate-500 px-2 mb-2">
        <span>{t('orderBook.price')}</span>
        <span className="text-center">{t('orderBook.amount')}</span>
        <span className="text-end">{t('orderBook.total')}</span>
      </div>
      <div className="space-y-1 max-h-[260px] overflow-y-auto scrollbar-thin">
        {orderBook.map((row, idx) => (
          <div
            key={`${row.price}-${idx}`}
            className={`grid grid-cols-3 items-center text-xs px-2 py-1.5 rounded-lg ${row.side === 'ask' ? 'order-depth-ask' : 'order-depth-bid'} bg-white/0 hover:bg-white/5 transition`}
          >
            <span className={row.side === 'ask' ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
              {formatNumber(row.price, language)}
            </span>
            <span className="text-center text-slate-200 font-mono">{row.amount.toFixed(3)}</span>
            <span className="text-end text-slate-400 font-mono">{formatCompact(row.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
