import { PropsWithChildren, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { HeaderBar } from './HeaderBar';
import { FooterBar } from './FooterBar';
import { ThemeToggle } from './ThemeToggle';
import styles from './AppLayout.module.css';

const pageTitles: Record<string, string> = {
  '/dashboard': 'داشبورد',
  '/markets': 'بازارها',
  '/orders': 'سفارشات',
  '/portfolio': 'پرتفوی',
  '/settings': 'تنظیمات'
};

export function AppLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const title = useMemo(() => pageTitles[location.pathname] ?? 'پنل معاملاتی', [location.pathname]);

  return (
    <div className={styles.app} data-theme={theme}>
      <HeaderBar title={title}>
        <ThemeToggle
          activeTheme={theme}
          onToggle={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        />
      </HeaderBar>
      <div className={styles.body}>
        <Navigation activePath={location.pathname} />
        <main className={styles.main}>{children}</main>
      </div>
      <FooterBar />
    </div>
  );
}
