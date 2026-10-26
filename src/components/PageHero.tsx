import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly frase?: string;
  readonly icon?: ReactNode;
  readonly titleId: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  frase,
  icon,
  titleId,
}: PageHeroProps) {
  return (
    <header className={styles.cabecera} aria-labelledby={titleId}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id={titleId} className={styles.titulo}>
        {title}
      </h1>
      <p className={styles.subtitulo}>{subtitle}</p>
      {frase && <p className={`${styles.frase} manuscrito`}>{frase}</p>}
      {icon && (
        <span className={styles.icono} aria-hidden="true">
          {icon}
        </span>
      )}
    </header>
  );
}
