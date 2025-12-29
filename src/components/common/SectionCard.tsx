import { PropsWithChildren, ReactNode } from 'react';
import styles from './SectionCard.module.css';

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionCard({ title, description, action, children }: SectionCardProps) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
