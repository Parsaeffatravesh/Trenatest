import type { Order, Position, WatchlistItem } from '../types/domain';

export const watchlistData: Record<'crypto' | 'fx' | 'stocks', WatchlistItem[]> = {
  crypto: [
    { symbol: 'BTC', name: 'Bitcoin', price: 67542.3, change: 2.41, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: 1.86, icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', price: 145.67, change: 5.67, icon: '◎' },
    { symbol: 'BNB', name: 'BNB', price: 598.45, change: -0.92, icon: '🔶' },
    { symbol: 'XRP', name: 'Ripple', price: 0.6234, change: -1.23, icon: '✕' },
    { symbol: 'ADA', name: 'Cardano', price: 0.4521, change: 3.45, icon: '₳' },
  ],
  fx: [
    { symbol: 'EUR/USD', name: 'Euro/Dollar', price: 1.08241, change: 0.34, icon: '€' },
    { symbol: 'GBP/USD', name: 'Pound/Dollar', price: 1.25412, change: -0.18, icon: '£' },
    { symbol: 'USD/JPY', name: 'Dollar/Yen', price: 147.234, change: 0.09, icon: '¥' },
    { symbol: 'AUD/USD', name: 'Aussie/Dollar', price: 0.65123, change: -0.52, icon: 'A$' },
    { symbol: 'USD/CHF', name: 'Dollar/Franc', price: 0.88432, change: 0.21, icon: '₣' },
  ],
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 1.23, icon: '🍎' },
    { symbol: 'GOOGL', name: 'Alphabet', price: 141.23, change: 0.87, icon: 'G' },
    { symbol: 'MSFT', name: 'Microsoft', price: 378.91, change: -0.34, icon: 'M' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 721.33, change: 4.56, icon: 'N' },
    { symbol: 'TSLA', name: 'Tesla', price: 245.67, change: -2.34, icon: 'T' },
  ],
};

export const basePositions: Position[] = [
  { symbol: 'BTCUSDT', size: 1.25, entry: 65200, mark: 67542.3, pnl: 2890.37, roe: 4.2, side: 'long' },
  { symbol: 'ETHUSDT', size: -5.2, entry: 3320, mark: 3456.78, pnl: -712.45, roe: -2.1, side: 'short' },
];

export const baseOrders: Order[] = [
  { id: '#NT-1001', symbol: 'BTCUSDT', type: 'Limit', price: 67000, amount: 0.5, status: 'open' },
  { id: '#NT-1002', symbol: 'ETHUSDT', type: 'Stop', price: 3500, amount: 3, status: 'open' },
  { id: '#NT-0999', symbol: 'SOLUSDT', type: 'Limit', price: 140, amount: 15, status: 'filled' },
];
