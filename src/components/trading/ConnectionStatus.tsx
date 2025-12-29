import styles from './ConnectionStatus.module.css';

type Status = 'connected' | 'degraded' | 'disconnected';

const statusLabel: Record<Status, string> = {
  connected: 'اتصال پایدار',
  degraded: 'اتصال ناپایدار',
  disconnected: 'قطع اتصال'
};

export function ConnectionStatus({ status }: { status: Status }) {
  return (
    <span className={styles.badge} data-state={status} role="status">
      <span className={styles.dot} />
      {statusLabel[status]}
    </span>
  );
}
