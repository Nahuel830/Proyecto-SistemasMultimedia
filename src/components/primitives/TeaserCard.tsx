import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PanelHeader } from './PanelHeader';
import styles from './TeaserCard.module.css';

interface TeaserCardProps {
  readonly titleId: string;
  readonly icon: ReactNode;
  readonly title: string;
  readonly text: string;
  readonly to: string;
  readonly cta: string;
  readonly ctaAria?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function TeaserCard({
  titleId,
  icon,
  title,
  text,
  to,
  cta,
  ctaAria,
  className,
  children,
}: TeaserCardProps) {
  return (
    <section
      className={`${styles.panel} ${className ?? ''}`}
      aria-labelledby={titleId}
    >
      <PanelHeader icon={icon} title={title} titleId={titleId} />

      <div className={styles.contenido}>
        <div className={styles.vista}>{children}</div>

        <p className={styles.texto}>{text}</p>

        <Link to={to} className={styles.cta} aria-label={ctaAria}>
          <span>{cta}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
