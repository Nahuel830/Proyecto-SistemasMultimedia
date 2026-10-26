import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { FuenteDato } from '../../components/primitives/FuenteDato';
import { IconButton } from '../../components/primitives/IconButton';
import { Modal } from '../../components/primitives/Modal';
import { galeriaPagina } from '../../data/galeria';
import type { GaleriaItem } from '../../data/types';
import styles from './Galeria.module.css';

interface LightboxProps {
  readonly items: readonly GaleriaItem[];
  readonly indice: number | null;
  readonly onCerrar: () => void;
  readonly onAnterior: () => void;
  readonly onSiguiente: () => void;
}

export function Lightbox({
  items,
  indice,
  onCerrar,
  onAnterior,
  onSiguiente,
}: LightboxProps) {
  const abierto = indice !== null;

  useEffect(() => {
    if (!abierto) {
      return;
    }

    const alPulsar = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onAnterior();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onSiguiente();
      }
    };

    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [abierto, onAnterior, onSiguiente]);

  const item = indice === null ? undefined : items[indice];

  return (
    <Modal
      open={abierto}
      onClose={onCerrar}
      title={galeriaPagina.lightboxTitulo}
      closeLabel={galeriaPagina.cerrar}
      className={styles.modal}
    >
      {item && indice !== null && (
        <div className={styles.lightbox}>
          <div className={styles.visor}>
            <img
              src={item.src}
              alt={item.alt}
              className={styles.imagenGrande}
            />
            <div className={styles.flechas}>
              <IconButton
                label={galeriaPagina.anterior}
                variant="soft"
                onClick={onAnterior}
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </IconButton>
              <IconButton
                label={galeriaPagina.siguiente}
                variant="soft"
                onClick={onSiguiente}
              >
                <ChevronRight size={22} aria-hidden="true" />
              </IconButton>
            </div>
          </div>

          <div className={styles.pieFoto}>
            <div className={styles.ficha}>
              <strong>{item.titulo}</strong>
              <p className={styles.caso}>
                <b>{galeriaPagina.caso}:</b> {item.caso}
              </p>
              <p>{item.descripcion}</p>
              <p className={styles.entidad}>
                <b>{galeriaPagina.entidad}:</b> {item.entidad}
              </p>
              <FuenteDato
                fuente={item.fuente}
                verificado={item.verificado}
                compacto
                className={styles.fuenteFicha}
              />
            </div>
            <span aria-live="polite">
              {indice + 1} {galeriaPagina.contador} {items.length}
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
