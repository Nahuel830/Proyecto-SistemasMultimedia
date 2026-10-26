import { Heart, Image as ImageIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
  galeriaCategorias,
  galeriaItems,
  galeriaPagina,
} from '../../data/galeria';
import type { CategoriaGaleriaItem } from '../../data/types';
import { GaleriaGrid } from './GaleriaGrid';
import { Lightbox } from './Lightbox';
import styles from './Galeria.module.css';

type CategoriaId = CategoriaGaleriaItem['id'];

export function Galeria() {
  const [categoria, setCategoria] = useState<CategoriaId>('todas');
  const [indice, setIndice] = useState<number | null>(null);

  const items = useMemo(
    () =>
      categoria === 'todas'
        ? galeriaItems
        : galeriaItems.filter((item) => item.categoria === categoria),
    [categoria],
  );

  const total = items.length;

  const cerrar = useCallback(() => setIndice(null), []);

  const anterior = useCallback(() => {
    setIndice((valor) => (valor === null ? null : (valor - 1 + total) % total));
  }, [total]);

  const siguiente = useCallback(() => {
    setIndice((valor) => (valor === null ? null : (valor + 1) % total));
  }, [total]);

  const cambiarCategoria = (id: CategoriaId) => {
    setCategoria(id);
    setIndice(null);
  };

  return (
    <section
      className={`${styles.galeria} animar-entrada`}
      aria-labelledby="galeria-grid-titulo"
    >
      <header className={styles.cabecera}>
        <span className={styles.icono} aria-hidden="true">
          <ImageIcon size={22} />
        </span>
        <div>
          <h2 id="galeria-grid-titulo">{galeriaPagina.gridTitulo}</h2>
          <p>{galeriaPagina.gridTexto}</p>
        </div>
      </header>

      <div
        className={styles.filtros}
        role="group"
        aria-label={galeriaPagina.ariaFiltros}
      >
        {galeriaCategorias.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={`${styles.filtro} ${
              categoria === opcion.id ? styles.activo : ''
            }`}
            aria-pressed={categoria === opcion.id}
            onClick={() => cambiarCategoria(opcion.id)}
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>

      {total > 0 ? (
        <GaleriaGrid items={items} onAbrir={setIndice} />
      ) : (
        <p className={styles.vacio}>{galeriaPagina.vacio}</p>
      )}

      <div className={styles.cierre}>
        <Heart size={20} aria-hidden="true" className={styles.corazon} />
        <p className={`${styles.frase} manuscrito`}>
          “{galeriaPagina.frase}”
        </p>
      </div>

      <Lightbox
        items={items}
        indice={indice}
        onCerrar={cerrar}
        onAnterior={anterior}
        onSiguiente={siguiente}
      />
    </section>
  );
}
