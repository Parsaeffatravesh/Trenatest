import { SectionCard } from '../components/common/SectionCard';
import styles from './OrdersPage.module.css';

const orders = [
  { id: '#8321', symbol: 'BTCUSDT', side: 'خرید', status: 'باز', qty: '0.5', price: '67,200' },
  { id: '#8320', symbol: 'ETHUSDT', side: 'فروش', status: 'پر شده', qty: '1', price: '3,180' },
  { id: '#8319', symbol: 'SOLUSDT', side: 'خرید', status: 'لغو شده', qty: '10', price: '150' }
];

export default function OrdersPage() {
  return (
    <SectionCard
      title="سفارشات و تاریخچه"
      description="حالت Skeleton/Empty/Error در فاز بعدی به React Query متصل می‌شود"
      action={<button className={styles.action}>خالی‌کردن فیلتر</button>}
    >
      <div className={styles.table} role="table">
        <div className={`${styles.row} ${styles.header}`} role="row">
          <div>شناسه</div>
          <div>نماد</div>
          <div>سمت</div>
          <div>وضعیت</div>
          <div>حجم</div>
          <div>قیمت</div>
        </div>
        {orders.map((order) => (
          <div key={order.id} className={styles.row} role="row">
            <div>{order.id}</div>
            <div>{order.symbol}</div>
            <div className={order.side === 'خرید' ? styles.up : styles.down}>{order.side}</div>
            <div className={styles.status}>{order.status}</div>
            <div className={styles.mono}>{order.qty}</div>
            <div className={styles.mono}>{order.price}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
