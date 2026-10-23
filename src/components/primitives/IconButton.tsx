import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

type VarianteIcono = 'solid' | 'soft' | 'mint' | 'ghost';

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  readonly label: string;
  readonly children: ReactNode;
  readonly variant?: VarianteIcono;
  readonly size?: 'sm' | 'md';
}

export function IconButton({
  label,
  children,
  variant = 'soft',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={clsx(
        styles.botonIcono,
        styles[variant],
        styles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
