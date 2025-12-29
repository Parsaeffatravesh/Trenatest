import { SectionCard } from '../components/common/SectionCard';
import { ChartPanel } from '../components/trading/ChartPanel';
import { OrderBook } from '../components/trading/OrderBook';
import { TradeTicket } from '../components/trading/TradeTicket';
import { Watchlist } from '../components/trading/Watchlist';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.grid}>
      <div className={styles.mainColumn}>
        <SectionCard title="نمای کلی بازار" description="نمودار قیمت و دفتر سفارشات زنده">
          <ChartPanel />
          <OrderBook />
        </SectionCard>
      </div>
      <div className={styles.sideColumn}>
        <SectionCard title="تیکت معامله" description="ارسال سفارش سریع" action={<span className={styles.badge}>Hotkeys فعال</span>}>
          <TradeTicket />
        </SectionCard>
        <SectionCard title="دیده‌بان زنده" description="نمادهای پیگیری شده">
          <Watchlist />
        </SectionCard>
      </div>
    </div>
  );
}
