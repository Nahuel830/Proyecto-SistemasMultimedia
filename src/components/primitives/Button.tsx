import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type VarianteBoton = 'primary' | 'mint' | 'outline' | 'ghost' | 'cream';
type TamanoBoton = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: VarianteBoton;
  readonly size?: TamanoBoton;
  readonly icon?: ReactNode;
  readonly iconRight?: ReactNode;
  readonly fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.boton,
        styles[variant],
        styles[size],
        fullWidth && styles.ancho,
        className,
      )}
      {...rest}
    >
      {icon && <span className={styles.icono}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className={styles.icono}>{iconRight}</span>}
    </button>
  );
}
