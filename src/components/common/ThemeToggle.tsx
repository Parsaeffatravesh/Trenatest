import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  activeTheme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ activeTheme, onToggle }: ThemeToggleProps) {
  const nextLabel = activeTheme === 'dark' ? 'تم روشن' : 'تم تیره';

  return (
    <button className={styles.toggle} onClick={onToggle} aria-label={`تغییر به ${nextLabel}`}>
      <span className={styles.dot} data-theme-dot={activeTheme} />
      <span>{activeTheme === 'dark' ? 'تیره' : 'روشن'}</span>
    </button>
  );
}
