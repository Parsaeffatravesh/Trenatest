import styles from './TradeTicket.module.css';

export function TradeTicket() {
  return (
    <div className={styles.ticket}>
      <div className={styles.tabs}>
        <button className={styles.active}>مارکت</button>
        <button>لیمیت</button>
        <button>استاپ</button>
      </div>
      <form className={styles.form}>
        <label>
          نماد
          <input type="text" defaultValue="BTCUSDT" />
        </label>
        <label>
          مقدار
          <input type="number" defaultValue={0.5} />
        </label>
        <label>
          قیمت (در حالت لیمیت)
          <input type="number" placeholder="67,240" />
        </label>
        <div className={styles.summary}>
          <span>کارمزد تخمینی</span>
          <strong>0.04%</strong>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.buy}>خرید</button>
          <button type="button" className={styles.sell}>فروش</button>
        </div>
      </form>
    </div>
  );
}
