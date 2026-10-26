import { galeriaPagina } from '../../data/galeria';
import type { GaleriaItem } from '../../data/types';
import styles from './Galeria.module.css';

interface GaleriaGridProps {
  readonly items: readonly GaleriaItem[];
  readonly onAbrir: (indice: number) => void;
}

export function GaleriaGrid({ items, onAbrir }: GaleriaGridProps) {
  return (
    <ul className={styles.grid} aria-label={galeriaPagina.ariaGrid}>
      {items.map((item, indice) => (
        <li key={item.id} className={styles.celda}>
          <button
            type="button"
            className={styles.miniatura}
            onClick={() => onAbrir(indice)}
            aria-label={`${galeriaPagina.ariaImagen} ${item.titulo}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.velo} aria-hidden="true" />
            <span className={styles.pie} aria-hidden="true">
              <strong>{item.titulo}</strong>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
