'use client';

import type { Language } from '../../types/domain';
import { formatNumber } from '../../lib/format';

interface QuickTradePanelProps {
  t: (path: string) => string;
  language: Language;
  orderType: 'market' | 'limit' | 'stop' | 'trailing';
  setOrderType: (type: 'market' | 'limit' | 'stop' | 'trailing') => void;
  isBuyMode: boolean;
  setIsBuyMode: (val: boolean) => void;
  sliderValue: number;
  setSliderValue: (val: number) => void;
  amount: number;
  setAmount: (val: number) => void;
  maxAmount: number;
  headerPrice: number;
  orderValue: number;
  feeValue: number;
  totalValue: number;
}

export function QuickTradePanel({
  t,
  language,
  orderType,
  setOrderType,
  isBuyMode,
  setIsBuyMode,
  sliderValue,
  setSliderValue,
  amount,
  setAmount,
  maxAmount,
  headerPrice,
  orderValue,
  feeValue,
  totalValue,
}: QuickTradePanelProps) {
  return (
    <div className="rounded-2xl glass-card p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-sm">⚡</span>
          </div>
          <p className="text-xs font-semibold text-white">{t('order.quickTrade')}</p>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <button
            onClick={() => setIsBuyMode(true)}
            className={`px-2 py-1 rounded-lg border ${isBuyMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'border-white/10 text-slate-300'}`}
          >
            {t('order.buy')}
          </button>
          <button
            onClick={() => setIsBuyMode(false)}
            className={`px-2 py-1 rounded-lg border ${!isBuyMode ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'border-white/10 text-slate-300'}`}
          >
            {t('order.sell')}
          </button>
        </div>
      </div>

      <div className="flex gap-1 mb-3 p-1 bg-slate-900/50 rounded-xl">
        {(['market', 'limit', 'stop', 'trailing'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 px-2 py-1 rounded-lg text-[10px] font-medium border transition-all ${orderType === type ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'text-slate-400 hover:bg-white/5 border-transparent'}`}
          >
            {t(`order.${type === 'stop' ? 'stopLimit' : type === 'trailing' ? 'trailing' : type}`)}
          </button>
        ))}
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">{t('order.price')}</span>
          <div className="flex items-center gap-2 text-white font-mono text-sm">
            <span>${formatNumber(headerPrice, language)}</span>
            <span className="text-[10px] text-slate-500">{t('order.lastPrice')}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">{t('order.amount')}</span>
          <div className="flex items-center gap-2 text-white font-mono">
            <input
              type="number"
              value={amount.toFixed(3)}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-24 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-right text-sm"
            />
            <span className="text-[10px] text-slate-500">BTC</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>{t('order.available')}</span>
          <span className="text-white font-mono">{maxAmount} BTC</span>
        </div>
        <div className="relative py-2">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="absolute -bottom-1 left-0 w-full flex justify-between text-[10px] text-slate-500">
            {[0, 25, 50, 75, 100].map((mark) => (
              <span key={mark}>{mark}%</span>
            ))}
          </div>
          <span className="text-xs text-slate-400 w-10 text-end block mt-1">{sliderValue}%</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-slate-900 hover:border-emerald-400 text-slate-200">{t('order.takeProfit')}</button>
          <button className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-slate-900 hover:border-rose-400 text-slate-200">{t('order.stopLoss')}</button>
        </div>
        <div className="space-y-1 text-[10px] text-slate-400">
          <div className="flex items-center justify-between">
            <span>{t('order.orderValue')}</span>
            <span className="font-mono text-white">${formatNumber(orderValue, language)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('order.fee')}</span>
            <span className="font-mono text-white">${formatNumber(feeValue, language)}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-white">
            <span>{t('order.total')}</span>
            <span className="font-mono">${formatNumber(totalValue, language)}</span>
          </div>
        </div>
        <button className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-500/10 ${isBuyMode ? 'gradient-btn-buy' : 'gradient-btn-sell'}`}>
          {isBuyMode ? t('order.buyMarket') : t('order.sellMarket')}
        </button>
      </div>
    </div>
  );
}
