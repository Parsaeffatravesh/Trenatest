import styles from './ChartPanel.module.css';

export function ChartPanel() {
  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <h3>نمودار قیمت</h3>
        <div className={styles.meta}>BTC/USDT · تایم‌فریم 1h</div>
      </div>
      <div className={styles.body}>
        <div className={styles.placeholder}>محل ادغام کتابخانه چارت (Lightweight/Highcharts)</div>
      </div>
      <div className={styles.footer}>
        <button type="button">افزودن اندیکاتور</button>
        <button type="button">ذخیره چیدمان</button>
      </div>
    </div>
  );
}
