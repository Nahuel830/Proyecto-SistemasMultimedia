import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

type ElementoCard = 'div' | 'article' | 'section' | 'aside';

interface CardProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementoCard;
  readonly tone?: 'cream' | 'forest' | 'plain';
  readonly padded?: boolean;
  readonly children: ReactNode;
}

export function Card({
  as: Elemento = 'div',
  tone = 'cream',
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Elemento
      className={clsx(
        styles.card,
        styles[tone],
        padded && styles.padded,
        className,
      )}
      {...rest}
    >
      {children}
    </Elemento>
  );
}
