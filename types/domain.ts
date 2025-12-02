export type Language = 'en' | 'fa';

export type TranslationTree = Record<string, string | TranslationTree>;

export type TradingSymbol = 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT' | (string & {});

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon: string;
}

export interface OrderBookRow {
  price: number;
  amount: number;
  total: number;
  side: 'bid' | 'ask';
}

export interface Trade {
  price: number;
  amount: number;
  time: string;
  side: 'buy' | 'sell';
}

export interface Position {
  symbol: TradingSymbol;
  size: number;
  entry: number;
  mark: number;
  pnl: number;
  roe: number;
  side: 'long' | 'short';
}

export interface Order {
  id: string;
  symbol: TradingSymbol;
  type: string;
  price: number;
  amount: number;
  status: 'open' | 'filled' | 'cancelled';
}

export interface PriceTick {
  symbol: TradingSymbol;
  price: number;
  timestamp: number;
}

export interface OrderBookSnapshot {
  symbol: TradingSymbol;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
  ts: number;
}

export interface AccountState {
  balance: number;
  equity: number;
  marginUsed: number;
  positions: Position[];
  orders: Order[];
}
