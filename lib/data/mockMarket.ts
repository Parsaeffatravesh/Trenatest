import type { Language, OrderBookRow, Trade } from '../../types/domain';

export function generateOrderBook(): OrderBookRow[] {
  const asks: OrderBookRow[] = [];
  const bids: OrderBookRow[] = [];
  const mid = 67500;

  for (let i = 0; i < 5; i += 1) {
    const askPrice = mid + 20 + Math.random() * 200;
    const askAmount = 0.1 + Math.random() * 5;
    asks.push({ price: askPrice, amount: askAmount, total: askPrice * askAmount, side: 'ask' });

    const bidPrice = mid - 20 - Math.random() * 200;
    const bidAmount = 0.1 + Math.random() * 5;
    bids.push({ price: bidPrice, amount: bidAmount, total: bidPrice * bidAmount, side: 'bid' });
  }

  return [...asks.sort((a, b) => a.price - b.price), ...bids.sort((a, b) => b.price - a.price)];
}

export function generateTrades(language: Language): Trade[] {
  const trades: Trade[] = [];
  const locale = language === 'fa' ? 'fa-IR' : 'en-US';

  for (let i = 0; i < 15; i += 1) {
    const side = Math.random() > 0.5 ? 'buy' : 'sell';
    const price = 67500 + (Math.random() - 0.5) * 150;
    const amount = Math.random() * 2;
    const time = new Date(Date.now() - i * 20_000).toLocaleTimeString(locale, { hour12: false });
    trades.push({ side, price, amount, time });
  }
  return trades;
}
