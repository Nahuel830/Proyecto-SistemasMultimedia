import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Image as ImageIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { Button } from '../../components/primitives/Button';
import { IconButton } from '../../components/primitives/IconButton';
import { Modal } from '../../components/primitives/Modal';
import { galeriaContenido } from '../../data/contenido';
import { galeriaItems } from '../../data/galeria';
import styles from './Galeria.module.css';

export function Galeria() {
  const [indice, setIndice] = useState<number | null>(null);
  const total = galeriaItems.length;
  const abierto = indice !== null;
  const itemActual = indice !== null ? galeriaItems[indice] : undefined;

  useEffect(() => {
    if (!abierto) {
      return;
    }

    const handleTeclas = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setIndice((valor) =>
          valor === null ? null : (valor - 1 + total) % total,
        );
      }
      if (event.key === 'ArrowRight') {
        setIndice((valor) => (valor === null ? null : (valor + 1) % total));
      }
    };

    document.addEventListener('keydown', handleTeclas);
    return () => document.removeEventListener('keydown', handleTeclas);
  }, [abierto, total]);

  const anterior = () => {
    setIndice((valor) => (valor === null ? null : (valor - 1 + total) % total));
  };

  const siguiente = () => {
    setIndice((valor) => (valor === null ? null : (valor + 1) % total));
  };

  return (
    <section
      id={galeriaContenido.id}
      className={`${styles.panel} animar-entrada animar-retraso-2`}
      aria-labelledby="titulo-galeria"
    >
      <PanelHeader
        icon={<ImageIcon size={19} />}
        title={galeriaContenido.titulo}
        titleId="titulo-galeria"
      />

      <div className={styles.contenido}>
        <div className={styles.cuerpo}>
          <ul className={styles.grid} aria-label={galeriaContenido.ariaGrid}>
            {galeriaItems.map((item, itemIndice) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.miniatura}
                  onClick={() => setIndice(itemIndice)}
                  aria-label={`${galeriaContenido.ariaImagen} ${item.titulo}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.lateral}>
            <p className={`${styles.cita} manuscrito`}>
              “{galeriaContenido.cita}”
            </p>
            <Heart size={17} aria-hidden="true" className={styles.corazon} />
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          className={styles.botonGaleria}
          icon={<ImageIcon size={14} aria-hidden="true" />}
          onClick={() => setIndice(0)}
        >
          {galeriaContenido.boton}
        </Button>
      </div>

      <Modal
        open={abierto}
        onClose={() => setIndice(null)}
        title={galeriaContenido.lightboxTitulo}
        closeLabel={galeriaContenido.cerrar}
        className={styles.modal}
      >
        {itemActual && indice !== null && (
          <div className={styles.lightbox}>
            <div className={styles.visor}>
              <img
                src={itemActual.src}
                alt={itemActual.alt}
                className={styles.imagenGrande}
              />
              <div className={styles.flechas}>
                <IconButton
                  label={galeriaContenido.anterior}
                  variant="soft"
                  onClick={anterior}
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </IconButton>
                <IconButton
                  label={galeriaContenido.siguiente}
                  variant="soft"
                  onClick={siguiente}
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </IconButton>
              </div>
            </div>

            <div className={styles.pieFoto}>
              <strong>{itemActual.titulo}</strong>
              <span aria-live="polite">
                {indice + 1} {galeriaContenido.contador} {total}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
