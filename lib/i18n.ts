import type { Language, TranslationTree } from '../types/domain';

export const translations: Record<Language, TranslationTree> = {
  en: {
    appName: 'NeoTrader',
    appTagline: 'Professional Trading Terminal',
    nav: { watchlist: 'Watchlist', charts: 'Charts', orders: 'Orders', portfolio: 'Portfolio', analytics: 'Analytics', trade: 'Trade', more: 'More' },
    status: { marketOpen: 'Market Open', live: 'Live' },
    user: { name: 'John Doe', plan: 'Pro Account' },
    watchlist: { title: 'Watchlist', add: 'Add', stocks: 'Stocks' },
    server: { connected: 'Connected', server: 'Server', leverage: 'Leverage', session: 'Session' },
    account: { title: 'Account', deposit: 'Deposit', totalBalance: 'Total Balance', equity: 'Equity', margin: 'Margin', freeMargin: 'Free Margin', marginLevel: 'Margin Level', today: 'today' },
    chart: { indicators: 'Indicators', draw: 'Draw', volume: 'Volume' },
    market: { high24h: '24h High', low24h: '24h Low', volume: 'Volume', funding: 'Funding', mark: 'Mark' },
    orderBook: { title: 'Order Book', price: 'Price (USDT)', amount: 'Amount (BTC)', total: 'Total', buyers: 'Buyers', sellers: 'Sellers' },
    recentTrades: { title: 'Recent Trades', price: 'Price (USDT)', amount: 'Amount (BTC)', time: 'Time' },
    trades: { count: 'Trades', buyVolume: 'Buy Vol', sellVolume: 'Sell Vol' },
    order: { quickTrade: 'Quick Trade', market: 'Market', limit: 'Limit', stopLimit: 'Stop Limit', trailing: 'Trailing Stop', buy: 'Buy', sell: 'Sell', long: 'Long', short: 'Short', price: 'Price', lastPrice: 'Last Price', amount: 'Amount', available: 'Avbl:', takeProfit: 'Take Profit', stopLoss: 'Stop Loss', tpsl: 'TP/SL', orderValue: 'Order Value', fee: 'Fee (0.1%)', total: 'Total', buyMarket: 'Buy / Long BTC', sellMarket: 'Sell / Short BTC' },
    positions: { title: 'Positions', close: 'Close', pnl: 'PnL', roe: 'ROE' },
    orders: { pending: 'Orders', history: 'History', cancel: 'Cancel', modify: 'Modify' },
    calendar: { title: 'Economic Calendar' },
    risk: { title: 'Risk Calculator', riskReward: 'Risk/Reward', maxLoss: 'Max Loss', potentialProfit: 'Potential Profit', breakeven: 'Break-even' },
    toast: { orderPlaced: 'Order placed successfully!', orderCancelled: 'Order cancelled', connected: 'Connected to market', priceAlert: 'Price alert triggered!' },
  },
  fa: {
    appName: 'نئوتریدر',
    appTagline: 'ترمینال معاملاتی حرفه‌ای',
    nav: { watchlist: 'لیست نظارت', charts: 'نمودارها', orders: 'سفارشات', portfolio: 'سبد', analytics: 'تحلیل‌ها', trade: 'معامله', more: 'بیشتر' },
    status: { marketOpen: 'بازار باز', live: 'زنده' },
    user: { name: 'کاربر عزیز', plan: 'حساب حرفه‌ای' },
    watchlist: { title: 'لیست نظارت', add: 'افزودن', stocks: 'سهام' },
    server: { connected: 'متصل', server: 'سرور', leverage: 'اهرم', session: 'نشست' },
    account: { title: 'حساب', deposit: 'واریز', totalBalance: 'موجودی کل', equity: 'ارزش خالص', margin: 'مارجین', freeMargin: 'مارجین آزاد', marginLevel: 'سطح مارجین', today: 'امروز' },
    chart: { indicators: 'اندیکاتورها', draw: 'رسم', volume: 'حجم' },
    market: { high24h: 'بیشترین ۲۴ساعت', low24h: 'کمترین ۲۴ساعت', volume: 'حجم', funding: 'فاندینگ', mark: 'مارک' },
    orderBook: { title: 'دفتر سفارشات', price: 'قیمت (USDT)', amount: 'مقدار (BTC)', total: 'مجموع', buyers: 'خریداران', sellers: 'فروشندگان' },
    recentTrades: { title: 'معاملات اخیر', price: 'قیمت (USDT)', amount: 'مقدار (BTC)', time: 'زمان' },
    trades: { count: 'معاملات', buyVolume: 'حجم خرید', sellVolume: 'حجم فروش' },
    order: { quickTrade: 'معامله سریع', market: 'مارکت', limit: 'لیمیت', stopLimit: 'استاپ لیمیت', trailing: 'تریلینگ استاپ', buy: 'خرید', sell: 'فروش', long: 'لانگ', short: 'شورت', price: 'قیمت', lastPrice: 'آخرین قیمت', amount: 'مقدار', available: 'موجود:', takeProfit: 'حد سود', stopLoss: 'حد ضرر', tpsl: 'TP/SL', orderValue: 'ارزش سفارش', fee: 'کارمزد (0.1%)', total: 'مجموع', buyMarket: 'خرید / لانگ BTC', sellMarket: 'فروش / شورت BTC' },
    positions: { title: 'پوزیشن‌ها', close: 'بستن', pnl: 'سود/زیان', roe: 'بازده' },
    orders: { pending: 'سفارشات', history: 'تاریخچه', cancel: 'لغو', modify: 'ویرایش' },
    calendar: { title: 'تقویم اقتصادی' },
    risk: { title: 'محاسبه‌گر ریسک', riskReward: 'ریسک/ریوارد', maxLoss: 'حداکثر ضرر', potentialProfit: 'سود بالقوه', breakeven: 'سربه‌سر' },
    toast: { orderPlaced: 'سفارش با موفقیت ثبت شد!', orderCancelled: 'سفارش لغو شد', connected: 'به بازار متصل شدید', priceAlert: 'هشدار قیمت!' },
  },
};

export function getNestedTranslation(tree: TranslationTree, path: string): string | undefined {
  return path.split('.').reduce<string | TranslationTree | undefined>((acc, key) => {
    if (typeof acc === 'object' && acc !== null) {
      return acc[key] as string | TranslationTree | undefined;
    }
    return undefined;
  }, tree) as string | undefined;
}
