import { useState } from 'react';

export function QuickTradeCard() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop' | 'trailing'>('market');
  const [amountPercent, setAmountPercent] = useState(25);

  return (
    <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <p className="text-sm font-semibold">Quick Trade</p>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <button
            onClick={() => setSide('buy')}
            className={`px-2 py-1 rounded-lg border ${
              side === 'buy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'border-white/10 text-slate-300'
            }`}
            type="button"
          >
            Buy
          </button>
          <button
            onClick={() => setSide('sell')}
            className={`px-2 py-1 rounded-lg border ${
              side === 'sell' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'border-white/10 text-slate-300'
            }`}
            type="button"
          >
            Sell
          </button>
        </div>
      </div>

      <div className="flex gap-1 mb-3 p-1 bg-slate-900/50 rounded-xl text-[10px]">
        {(['market', 'limit', 'stop', 'trailing'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 px-2 py-1 rounded-lg font-medium border transition-all ${
              orderType === type
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'text-slate-400 hover:bg-white/5 border-transparent'
            }`}
            type="button"
          >
            {type === 'stop' ? 'Stop Limit' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Price</span>
          <span className="font-mono text-white">$67,542.12</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Amount</span>
          <div className="flex items-center gap-2 text-white font-mono">
            <input
              type="number"
              value={(amountPercent / 100).toFixed(3)}
              onChange={(e) => setAmountPercent(Math.min(100, Math.max(0, Number(e.target.value) * 100)))}
              className="w-24 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-right text-sm"
            />
            <span className="text-[10px] text-slate-500">BTC</span>
          </div>
        </div>

        <div className="relative py-2">
          <input
            type="range"
            min={0}
            max={100}
            value={amountPercent}
            onChange={(e) => setAmountPercent(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="absolute -bottom-1 left-0 w-full flex justify-between text-[10px] text-slate-500">
            {[0, 25, 50, 75, 100].map((mark) => (
              <span key={mark}>{mark}%</span>
            ))}
          </div>
          <span className="text-xs text-slate-400 w-10 text-end block mt-1">{amountPercent}%</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-slate-900 hover:border-emerald-400 text-slate-200">
            Take Profit
          </button>
          <button className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-slate-900 hover:border-rose-400 text-slate-200">
            Stop Loss
          </button>
        </div>

        <div className="space-y-1 text-[10px] text-slate-400">
          <div className="flex items-center justify-between">
            <span>Order Value</span>
            <span className="font-mono text-white">$12,420</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Fee</span>
            <span className="font-mono text-white">$7.20</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-white">
            <span>Total</span>
            <span className="font-mono">$12,427.20</span>
          </div>
        </div>

        <button
          className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-500/10 ${
            side === 'buy' ? 'gradient-btn-buy' : 'gradient-btn-sell'
          }`}
          type="button"
        >
          {side === 'buy' ? 'Buy Market' : 'Sell Market'}
        </button>
      </div>
    </div>
  );
}
