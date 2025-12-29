import styles from './FooterBar.module.css';

export function FooterBar() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Trenatest — پلتفرم معاملاتی مدرن</span>
      <span className={styles.meta}>فاز فعال: وایرفریم Hi-Fi و کیت کامپوننت</span>
    </footer>
  );
}
