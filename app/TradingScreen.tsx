'use client';

import { useEffect, useMemo, useState } from 'react';
import { LeftSidebar } from '../components/sidebars/LeftSidebar';
import { TopBar } from '../components/layout/TopBar';
import { MarketOverview } from '../components/market/MarketOverview';
import { OrderBook } from '../components/market/OrderBook';
import { RecentTrades } from '../components/market/RecentTrades';
import { QuickTradePanel } from '../components/trade/QuickTradePanel';
import { PositionsPanel } from '../components/positions/PositionsPanel';
import { OrdersPanel } from '../components/positions/OrdersPanel';
import { getNestedTranslation, translations } from '../lib/i18n';
import { watchlistData, baseOrders, basePositions } from '../lib/mockData';
import { generateOrderBook, generateTrades } from '../lib/data/mockMarket';
import type { Language, OrderBookRow, Trade } from '../types/domain';

export function TradingScreen() {
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

  useEffect(() => {
    setAmount((sliderValue / 100) * maxAmount);
  }, [sliderValue]);

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
      <TopBar
        language={language}
        headerPrice={headerPrice}
        headerChange={headerChange}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'en' ? 'fa' : 'en'))}
        t={t}
      />

      <main className="mx-auto max-w-[1920px] w-full px-3 sm:px-4 lg:px-6 py-3 flex flex-col xl:flex-row gap-3 pb-6">
        <LeftSidebar
          t={t}
          language={language}
          watchlistItems={watchlistItems}
          watchlistTab={watchlistTab}
          setWatchlistTab={setWatchlistTab}
          totalBalance={totalBalance}
          todayPnL={todayPnL}
        />

        <section className="flex-1 flex flex-col gap-3">
          <MarketOverview language={language} headerPrice={headerPrice} headerChange={headerChange} t={t} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <OrderBook t={t} language={language} orderBook={orderBook} />
            <RecentTrades t={t} language={language} trades={trades} />
          </div>
        </section>

        <aside className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-3">
          <QuickTradePanel
            t={t}
            language={language}
            orderType={orderType}
            setOrderType={setOrderType}
            isBuyMode={isBuyMode}
            setIsBuyMode={setIsBuyMode}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            amount={amount}
            setAmount={setAmount}
            maxAmount={maxAmount}
            headerPrice={headerPrice}
            orderValue={orderValue}
            feeValue={feeValue}
            totalValue={totalValue}
          />
          <PositionsPanel t={t} language={language} positions={basePositions} />
          <OrdersPanel t={t} language={language} orders={baseOrders} />
        </aside>
      </main>
    </div>
  );
}
