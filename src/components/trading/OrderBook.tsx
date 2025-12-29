import styles from './OrderBook.module.css';

const asks = [
  { price: '67,245', size: '0.8' },
  { price: '67,240', size: '1.2' },
  { price: '67,235', size: '0.6' }
];

const bids = [
  { price: '67,230', size: '1.4' },
  { price: '67,225', size: '0.9' },
  { price: '67,220', size: '1.1' }
];

export function OrderBook() {
  return (
    <div className={styles.book}>
      <div className={styles.header}>
        <h3>دفتر سفارشات</h3>
        <span className={styles.depth}>عمق 10 سطح</span>
      </div>
      <div className={styles.grid}>
        <div>
          <div className={styles.groupTitle}>فروشندگان</div>
          {asks.map((ask) => (
            <div key={ask.price} className={styles.row}>
              <span className={styles.priceAsk}>{ask.price}</span>
              <span className={styles.size}>{ask.size}</span>
            </div>
          ))}
        </div>
        <div>
          <div className={styles.groupTitle}>خریداران</div>
          {bids.map((bid) => (
            <div key={bid.price} className={styles.row}>
              <span className={styles.priceBid}>{bid.price}</span>
              <span className={styles.size}>{bid.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
