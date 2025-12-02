'use client';

import { useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'fa';

type TranslationTree = Record<string, string | TranslationTree>;

type WatchlistItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon: string;
};

type OrderBookRow = {
  price: number;
  amount: number;
  total: number;
  side: 'bid' | 'ask';
};

type Trade = {
  price: number;
  amount: number;
  time: string;
  side: 'buy' | 'sell';
};

type Position = {
  symbol: string;
  size: number;
  entry: number;
  mark: number;
  pnl: number;
  roe: number;
  side: 'long' | 'short';
};

type Order = {
  id: string;
  symbol: string;
  type: string;
  price: number;
  amount: number;
  status: 'open' | 'filled' | 'cancelled';
};

const translations: Record<Language, TranslationTree> = {
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

const watchlistData: Record<'crypto' | 'fx' | 'stocks', WatchlistItem[]> = {
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

const basePositions: Position[] = [
  { symbol: 'BTCUSDT', size: 1.25, entry: 65200, mark: 67542.3, pnl: 2890.37, roe: 4.2, side: 'long' },
  { symbol: 'ETHUSDT', size: -5.2, entry: 3320, mark: 3456.78, pnl: -712.45, roe: -2.1, side: 'short' },
];

const baseOrders: Order[] = [
  { id: '#NT-1001', symbol: 'BTCUSDT', type: 'Limit', price: 67000, amount: 0.5, status: 'open' },
  { id: '#NT-1002', symbol: 'ETHUSDT', type: 'Stop', price: 3500, amount: 3, status: 'open' },
  { id: '#NT-0999', symbol: 'SOLUSDT', type: 'Limit', price: 140, amount: 15, status: 'filled' },
];

function getNestedTranslation(tree: TranslationTree, path: string): string | undefined {
  return path.split('.').reduce<string | TranslationTree | undefined>((acc, key) => {
    if (typeof acc === 'object' && acc !== null) {
      return acc[key] as string | TranslationTree | undefined;
    }
    return undefined;
  }, tree) as string | undefined;
}

function formatNumber(num: number, lang: Language, decimals = 2) {
  const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
  return new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);
}

function formatCompact(num: number) {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

function generateOrderBook(): OrderBookRow[] {
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

function generateTrades(language: Language): Trade[] {
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

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [watchlistTab, setWatchlistTab] = useState<'crypto' | 'fx' | 'stocks'>('crypto');
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop' | 'trailing'>('market');
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [sliderValue, setSliderValue] = useState(25);
  const [orderBook, setOrderBook] = useState<OrderBookRow[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [amount, setAmount] = useState(0.25 * 1.234);
  const maxAmount = 1.234;

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    setOrderBook(generateOrderBook());
    setTrades(generateTrades(language));

    const interval = setInterval(() => {
      setOrderBook(generateOrderBook());
      setTrades(generateTrades(language));
    }, 5000);
    return () => clearInterval(interval);
  }, [language]);

  const t = (path: string) => getNestedTranslation(translations[language], path) ?? path;

  const watchlistItems = useMemo(() => watchlistData[watchlistTab], [watchlistTab]);

  const totalBalance = 125430.5;
  const todayPnL = 3240;
  const headerPrice = trades[0]?.price ?? 67542.3;
  const headerBasePrice = 67000;
  const headerChange = ((headerPrice - headerBasePrice) / headerBasePrice) * 100;

  const normalizedAmount = amount > maxAmount ? maxAmount : amount;
  const feeRate = 0.001;
  const orderValue = headerPrice * normalizedAmount;
  const feeValue = orderValue * feeRate;
  const totalValue = orderValue + feeValue;

  return (
    <div className="min-h-screen pb-10">
      <div className="h-1 gradient-bar" />
      <header className="border-b border-white/5 bg-[#0a0e17]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-[1920px] px-3 sm:px-4 lg:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/30 text-white">
              <span className="relative z-10">NT</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-purple-500 blur-lg opacity-50" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-tight gradient-text">{t('appName')}</p>
              <p className="text-[10px] text-slate-500">{t('appTagline')}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 rounded-full p-1 border border-white/5">
            {(['watchlist', 'charts', 'orders', 'portfolio', 'analytics'] as const).map((key) => (
              <button
                key={key}
                className={`nav-btn px-4 py-2 rounded-full text-xs font-medium transition-all ${key === 'charts' ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                data-nav={key}
              >
                {t(`nav.${key}`)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">{t('status.marketOpen')}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-300">{formatNumber(headerPrice, language)}</span>
              <span className={`text-[10px] ${headerChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {headerChange >= 0 ? '+' : ''}
                {headerChange.toFixed(2)}%
              </span>
            </div>
            <button
              onClick={() => setLanguage((prev) => (prev === 'en' ? 'fa' : 'en'))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800 transition text-xs font-medium"
            >
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1920px] w-full px-3 sm:px-4 lg:px-6 py-3 flex flex-col xl:flex-row gap-3 pb-6">
        <aside className="w-full xl:w-72 flex-shrink-0 flex flex-col gap-3">
          <div className="rounded-2xl glass-card glass-card-hover p-3 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-sm">★</span>
                </div>
                <p className="text-xs font-semibold text-white">{t('watchlist.title')}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3 p-1 bg-slate-900/50 rounded-xl">
              {(['crypto', 'fx', 'stocks'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setWatchlistTab(tab)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-medium border transition-all ${watchlistTab === tab ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'text-slate-400 hover:bg-white/5 border-transparent'}`}
                >
                  {tab === 'stocks' ? t('watchlist.stocks') : tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="space-y-1 max-h-[280px] overflow-y-auto scrollbar-thin">
              {watchlistItems.map((item) => {
                const isPositive = item.change >= 0;
                return (
                  <button
                    key={item.symbol}
                    className="w-full text-start p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group flex items-center gap-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${isPositive ? 'from-emerald-500/20 to-cyan-500/20' : 'from-rose-500/20 to-orange-500/20'} flex items-center justify-center text-sm`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>{item.symbol}</span>
                        <span className="font-mono">{formatNumber(item.price, language)}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{item.name}</span>
                        <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                          {isPositive ? '+' : ''}
                          {item.change}%
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl glass-card glass-card-hover p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <span className="text-purple-400 text-sm">⍟</span>
                </div>
                <p className="text-xs font-semibold text-white">{t('account.title')}</p>
              </div>
              <button className="text-[10px] text-slate-400 hover:text-emerald-400 transition">{t('account.deposit')}</button>
            </div>
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10 border border-emerald-500/20 mb-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl" />
              <p className="text-[10px] text-slate-400 mb-1">{t('account.totalBalance')}</p>
              <p className="text-xl font-bold text-white font-mono">${formatNumber(totalBalance, language)}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +2.58%
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">+{formatNumber(todayPnL, language)}</span>
                <span className="text-[10px] text-slate-500">{t('account.today')}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 mb-0.5">{t('account.equity')}</p>
                <p className="font-mono text-white font-medium">$126,320.82</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 mb-0.5">{t('account.margin')}</p>
                <p className="font-mono text-white font-medium">$12,540.00</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 mb-0.5">{t('account.freeMargin')}</p>
                <p className="font-mono text-emerald-400 font-medium">$113,780.82</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 mb-0.5">{t('account.marginLevel')}</p>
                <p className="font-mono text-cyan-400 font-medium">1,007%</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-3 text-[11px]">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-slate-400">{t('server.connected')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-emerald-400">18ms</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 text-[9px] mb-0.5">{t('server.server')}</p>
                <p className="font-mono text-white">LDN-02</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 text-[9px] mb-0.5">{t('server.leverage')}</p>
                <p className="font-mono text-white">1:100</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-900/50">
                <p className="text-slate-500 text-[9px] mb-0.5">{t('server.session')}</p>
                <p className="font-mono text-cyan-400">London</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-3">
          <div className="rounded-2xl glass-card p-4 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">BTC/USDT</p>
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold text-white font-mono">{formatNumber(headerPrice, language)}</p>
                    <span className={`px-2 py-1 text-xs rounded-lg border ${headerChange >= 0 ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/15 text-rose-400 border-rose-500/20'}`}>
                      {headerChange >= 0 ? '+' : ''}
                      {headerChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-900/40">
                  <p className="text-slate-500">{t('market.high24h')}</p>
                  <p className="font-mono text-white">67,880</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/40">
                  <p className="text-slate-500">{t('market.low24h')}</p>
                  <p className="font-mono text-white">65,240</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/40">
                  <p className="text-slate-500">{t('market.volume')}</p>
                  <p className="font-mono text-white">18,240 BTC</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/40">
                  <p className="text-slate-500">{t('market.funding')}</p>
                  <p className="font-mono text-emerald-400">0.012%</p>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-white/5 bg-gradient-to-b from-slate-900/50 to-slate-950/70 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{t('status.live')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-lg border border-white/10 hover:border-emerald-400 text-slate-300 text-[10px]">
                    {t('chart.indicators')}
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-white/10 hover:border-cyan-400 text-slate-300 text-[10px]">
                    {t('chart.draw')}
                  </button>
                </div>
              </div>
              <div className="h-72 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-center text-slate-500 text-sm">
                <span className="skeleton h-6 w-32 rounded" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
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
                    className={`grid grid-cols-3 items-center px-2 py-1.5 rounded-lg text-xs ${trade.side === 'buy' ? 'bg-emerald-500/5' : 'bg-rose-500/5'}`}
                  >
                    <span className={`font-mono ${trade.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatNumber(trade.price, language)}
                    </span>
                    <span className="text-slate-200 text-center font-mono">{trade.amount.toFixed(4)}</span>
                    <span className="text-end text-slate-400">{trade.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-[10px]">
                <div className="text-center">
                  <p className="text-slate-500">{t('trades.count')}</p>
                  <p className="font-mono text-white font-medium">1,234</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500">{t('trades.buyVolume')}</p>
                  <p className="font-mono text-emerald-400 font-medium">234.5 BTC</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-500">{t('trades.sellVolume')}</p>
                  <p className="font-mono text-rose-400 font-medium">198.2 BTC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-3">
          <div className="rounded-2xl glass-card p-4 shadow-xl border border-emerald-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-sm">⚡</span>
                </div>
                <p className="text-sm font-semibold text-white">{t('order.quickTrade')}</p>
              </div>
              <select
                value={orderType}
                onChange={(event) => setOrderType(event.target.value as typeof orderType)}
                className="text-[10px] px-2 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 focus:outline-none focus:border-emerald-500/50"
              >
                <option value="market">{t('order.market')}</option>
                <option value="limit">{t('order.limit')}</option>
                <option value="stop">{t('order.stopLimit')}</option>
                <option value="trailing">{t('order.trailing')}</option>
              </select>
            </div>
            <div className="flex gap-1 p-1 bg-slate-900/50 rounded-xl mb-4">
              <button
                onClick={() => setIsBuyMode(true)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${isBuyMode ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <span>{t('order.buy')}</span> / <span>{t('order.long')}</span>
              </button>
              <button
                onClick={() => setIsBuyMode(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${!isBuyMode ? 'bg-rose-500 text-white' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <span>{t('order.sell')}</span> / <span>{t('order.short')}</span>
              </button>
            </div>
            <div className="space-y-3 text-[11px]">
              {orderType !== 'market' && (
                <div>
                  <label className="flex items-center justify-between text-slate-400 mb-1">
                    <span>{t('order.price')}</span>
                    <button className="text-emerald-400 hover:underline text-[10px]">{t('order.lastPrice')}</button>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue={formatNumber(headerPrice, language)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">USDT</span>
                  </div>
                </div>
              )}
              <div>
                <label className="flex items-center justify-between text-slate-400 mb-1">
                  <span>{t('order.amount')}</span>
                  <span className="text-slate-500">
                    {t('order.available')} <span className="text-white font-mono">{formatNumber(maxAmount, language, 3)} BTC</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={normalizedAmount.toFixed(3)}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      if (Number.isNaN(value)) return;
                      const clamped = Math.max(0, Math.min(maxAmount, value));
                      setAmount(clamped);
                      setSliderValue(Math.round((clamped / maxAmount) * 100));
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">BTC</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={(event) => {
                    const nextSlider = Number(event.target.value);
                    setSliderValue(nextSlider);
                    setAmount(Number(((nextSlider / 100) * maxAmount).toFixed(3)));
                  }}
                  className="range-slider flex-1"
                />
                <span className="text-xs text-slate-400 w-10 text-end">{sliderValue}%</span>
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
              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-500/10 ${isBuyMode ? 'gradient-btn-buy' : 'gradient-btn-sell'}`}
              >
                {isBuyMode ? t('order.buyMarket') : t('order.sellMarket')}
              </button>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                  <span className="text-blue-300 text-sm">⚓</span>
                </div>
                <p className="text-xs font-semibold text-white">{t('positions.title')}</p>
              </div>
              <span className="px-2 py-1 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">2</span>
            </div>
            <div className="space-y-2">
              {basePositions.map((pos) => (
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

          <div className="rounded-2xl glass-card p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                  <span className="text-orange-300 text-sm">⏳</span>
                </div>
                <p className="text-xs font-semibold text-white">{t('orders.pending')}</p>
              </div>
              <span className="px-2 py-1 rounded-full text-[10px] bg-slate-800 text-slate-200 border border-white/10">{baseOrders.length}</span>
            </div>
            <div className="space-y-2">
              {baseOrders.map((order) => (
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
        </aside>
      </main>
    </div>
  );
}
