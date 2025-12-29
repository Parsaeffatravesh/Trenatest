import { SectionCard } from '../components/common/SectionCard';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  return (
    <SectionCard title="تنظیمات" description="مدیریت تم، اعلان‌ها و امنیت">
      <div className={styles.grid}>
        <div>
          <h4>تم و زبان</h4>
          <label className={styles.row}>
            <span>تم پیش‌فرض</span>
            <select>
              <option value="dark">تیره</option>
              <option value="light">روشن</option>
            </select>
          </label>
          <label className={styles.row}>
            <span>زبان</span>
            <select>
              <option value="fa">فارسی</option>
              <option value="en">انگلیسی</option>
            </select>
          </label>
        </div>
        <div>
          <h4>امنیت</h4>
          <label className={styles.row}>
            <span>2FA</span>
            <button type="button" className={styles.secondary}>فعال‌سازی</button>
          </label>
          <label className={styles.row}>
            <span>جلسه امن</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </div>
    </SectionCard>
  );
}
