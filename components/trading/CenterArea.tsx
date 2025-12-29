import { ChartCard } from './cards/ChartCard';
import { OrderBookCard } from './cards/OrderBookCard';
import { RecentTradesCard } from './cards/RecentTradesCard';
import { SymbolHeader } from './cards/SymbolHeader';

export function CenterArea() {
  return (
    <>
      <SymbolHeader />
      <ChartCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <OrderBookCard />
        <RecentTradesCard />
      </div>
    </>
  );
}
