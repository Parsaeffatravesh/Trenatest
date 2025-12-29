import styles from './Watchlist.module.css';

const items = [
  { symbol: 'BTCUSDT', price: '67,240', change: '+2.4%' },
  { symbol: 'ETHUSDT', price: '3,210', change: '+1.1%' },
  { symbol: 'BNBUSDT', price: '410', change: '-0.5%' }
];

export function Watchlist() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>دیده‌بان</h3>
        <button type="button">+ افزودن نماد</button>
      </div>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.symbol} className={styles.item}>
            <div>
              <div className={styles.symbol}>{item.symbol}</div>
              <div className={styles.price}>{item.price}</div>
            </div>
            <div className={item.change.startsWith('+') ? styles.up : styles.down}>{item.change}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
