import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly icon: ReactNode;
  readonly action?: ReactNode;
}

export function EmptyState({
  eyebrow,
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <section className={styles.wrap} aria-labelledby="titulo-proximamente">
      <div className={styles.decoracion} aria-hidden="true">
        <span>🐾</span>
        <span>🐾</span>
        <span>🐾</span>
      </div>
      <div className={styles.icono}>{icon}</div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id="titulo-proximamente" className={styles.titulo}>
        {title}
      </h1>
      <p className={styles.descripcion}>{description}</p>
      {action && <div className={styles.accion}>{action}</div>}
    </section>
  );
}
