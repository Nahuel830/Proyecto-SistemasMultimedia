import clsx from 'clsx';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { fuenteDato } from '../../data/contenido';
import styles from './FuenteDato.module.css';

interface FuenteDatoProps {
  readonly fuente: string;
  readonly verificado: boolean;
  readonly compacto?: boolean;
  readonly className?: string;
}

export function FuenteDato({
  fuente,
  verificado,
  compacto = false,
  className,
}: FuenteDatoProps) {
  const Icono = verificado ? ShieldCheck : ShieldAlert;

  return (
    <p
      className={clsx(
        styles.fuente,
        compacto && styles.compacto,
        className,
      )}
    >
      <span className={clsx(styles.estado, verificado && styles.ok)}>
        <Icono size={12} aria-hidden="true" />
        {verificado ? fuenteDato.verificado : fuenteDato.sinVerificar}
      </span>
      <span className={styles.texto}>
        {fuenteDato.prefijo} {fuente}
      </span>
    </p>
  );
}
