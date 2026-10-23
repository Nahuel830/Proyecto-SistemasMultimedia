import type { ReactNode } from 'react';
import styles from './PanelHeader.module.css';

interface PanelHeaderProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly titleId?: string;
  readonly children?: ReactNode;
}

export function PanelHeader({
  icon,
  title,
  titleId,
  children,
}: PanelHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.icono} aria-hidden="true">
        {icon}
      </span>
      <h2 id={titleId} className={styles.titulo}>
        {title}
      </h2>
      {children && <div className={styles.extra}>{children}</div>}
    </header>
  );
}
