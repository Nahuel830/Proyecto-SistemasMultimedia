import clsx from 'clsx';
import styles from './Spinner.module.css';

interface SpinnerProps {
  readonly label?: string;
  readonly tone?: 'light' | 'dark';
  readonly size?: 'sm' | 'md';
}

export function Spinner({
  label = 'Cargando...',
  tone = 'dark',
  size = 'md',
}: SpinnerProps) {
  return (
    <span
      className={clsx(styles.wrap, styles[tone], styles[size])}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
