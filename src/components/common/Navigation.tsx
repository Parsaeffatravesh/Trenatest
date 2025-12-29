import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

interface NavigationProps {
  activePath: string;
}

const links = [
  { to: '/dashboard', label: 'داشبورد' },
  { to: '/markets', label: 'بازارها' },
  { to: '/orders', label: 'سفارشات' },
  { to: '/portfolio', label: 'پرتفوی' },
  { to: '/settings', label: 'تنظیمات' }
];

export function Navigation({ activePath }: NavigationProps) {
  return (
    <nav className={styles.nav} aria-label="ناوبری اصلی">
      <div className={styles.brand}>Trenatest</div>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                [styles.link, isActive || activePath === link.to ? styles.active : ''].join(' ')
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
