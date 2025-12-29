import { PropsWithChildren } from 'react';
import { ConnectionStatus } from '../trading/ConnectionStatus';
import styles from './HeaderBar.module.css';

interface HeaderBarProps extends PropsWithChildren {
  title: string;
}

export function HeaderBar({ title, children }: HeaderBarProps) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.kicker}>پنل معاملاتی مدرن</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.actions}>
        <ConnectionStatus status="connected" />
        {children}
      </div>
    </header>
  );
}
