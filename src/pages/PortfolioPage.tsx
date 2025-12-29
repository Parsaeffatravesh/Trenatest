import { SectionCard } from '../components/common/SectionCard';
import styles from './PortfolioPage.module.css';

const holdings = [
  { symbol: 'BTC', qty: '1.2', value: '$80,688', pnl: '+12.4%' },
  { symbol: 'ETH', qty: '10', value: '$32,100', pnl: '+4.1%' },
  { symbol: 'USDT', qty: '15,000', value: '$15,000', pnl: '0.0%' }
];

export default function PortfolioPage() {
  return (
    <div className={styles.stack}>
      <SectionCard title="پرتفوی" description="نمای دارایی‌ها، P&L و تخصیص">
        <div className={styles.holdings}>
          {holdings.map((asset) => (
            <div key={asset.symbol} className={styles.asset}>
              <div>
                <div className={styles.symbol}>{asset.symbol}</div>
                <div className={styles.qty}>موجودی: {asset.qty}</div>
              </div>
              <div className={styles.value}>{asset.value}</div>
              <div className={asset.pnl.startsWith('+') ? styles.up : styles.muted}>{asset.pnl}</div>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="پراکندگی دارایی" description="گراف جایگزین در فاز چارت اضافه می‌شود">
        <div className={styles.placeholder}>جای‌گذاری چارت دونات یا بار برای تخصیص</div>
      </SectionCard>
    </div>
  );
}
