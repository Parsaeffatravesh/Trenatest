import { SectionCard } from '../components/common/SectionCard';
import styles from './MarketsPage.module.css';

const markets = [
  { symbol: 'BTCUSDT', last: '67,240', change: '+2.4%', volume: '32K' },
  { symbol: 'ETHUSDT', last: '3,210', change: '+1.1%', volume: '120K' },
  { symbol: 'SOLUSDT', last: '155', change: '-0.9%', volume: '80K' }
];

export default function MarketsPage() {
  return (
    <SectionCard
      title="بازارها"
      description="فهرست نمادها با قیمت لحظه‌ای، درصد تغییر و حجم؛ آماده برای اتصال به WebSocket"
    >
      <div className={styles.table} role="table">
        <div className={`${styles.row} ${styles.header}`} role="row">
          <div role="columnheader">نماد</div>
          <div role="columnheader">آخرین قیمت</div>
          <div role="columnheader">تغییر</div>
          <div role="columnheader">حجم 24ساعته</div>
        </div>
        {markets.map((mkt) => (
          <div key={mkt.symbol} className={styles.row} role="row">
            <div role="cell">{mkt.symbol}</div>
            <div role="cell" className={styles.mono}>
              {mkt.last}
            </div>
            <div role="cell" className={mkt.change.startsWith('+') ? styles.up : styles.down}>
              {mkt.change}
            </div>
            <div role="cell" className={styles.mono}>
              {mkt.volume}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
