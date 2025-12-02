'use client';

import type { Language, Order } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface OrdersPanelProps {
  t: (path: string) => string;
  language: Language;
  orders: Order[];
}

export function OrdersPanel({ t, language, orders }: OrdersPanelProps) {
  return (
    <div className="rounded-2xl glass-card p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
            <span className="text-orange-300 text-sm">⏳</span>
          </div>
          <p className="text-xs font-semibold text-white">{t('orders.pending')}</p>
        </div>
        <span className="px-2 py-1 rounded-full text-[10px] bg-slate-800 text-slate-200 border border-white/10">{orders.length}</span>
      </div>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px]">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white font-semibold">{order.symbol}</p>
              <span className="text-slate-500">{order.id}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>
                {order.type} · {order.amount} BTC
              </span>
              <span className="font-mono text-white">${formatNumber(order.price, language)}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px]">
              <button className="flex-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{t('orders.modify')}</button>
              <button className="flex-1 px-2 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20">{t('orders.cancel')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
