import clsx from 'clsx';
import { imagenes } from '../../data/imagenes';
import styles from './CanvasFallback.module.css';

interface CanvasFallbackProps {
  readonly alt?: string;
  readonly className?: string;
  readonly mostrarAviso?: boolean;
}

export function CanvasFallback({
  alt = 'Conejo de Huellas de Esperanza',
  className,
  mostrarAviso = true,
}: CanvasFallbackProps) {
  return (
    <div className={clsx(styles.wrap, className)}>
      <img
        src={imagenes.conejos.heroe}
        alt={alt}
        className={styles.imagen}
        loading="lazy"
      />
      {mostrarAviso && (
        <span className={styles.aviso} aria-hidden="true">
          Vista previa 2D
        </span>
      )}
    </div>
  );
}
