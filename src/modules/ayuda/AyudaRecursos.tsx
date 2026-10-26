import clsx from 'clsx';
import { Info } from 'lucide-react';
import { iconosRecursos, iconosSociales } from '../../components/iconos';
import {
  recursosPagina,
  redesSociales,
  seccionesRecursos,
} from '../../data/recursos';
import styles from './AyudaRecursos.module.css';

export function AyudaRecursos() {
  return (
    <section
      id="recursos"
      className={`${styles.recursos} animar-entrada`}
      aria-label={recursosPagina.ariaSecciones}
    >
      <p className={styles.aviso}>
        <Info size={18} aria-hidden="true" />
        <span>{recursosPagina.aviso}</span>
      </p>

      <div className={styles.grid}>
        {seccionesRecursos.map((seccion) => {
          const Icono = iconosRecursos[seccion.icono];

          return (
            <article
              key={seccion.id}
              className={clsx(
                styles.seccion,
                seccion.id === 'consejos' && styles.ancha,
              )}
              aria-labelledby={`recursos-${seccion.id}`}
            >
              <header className={styles.cabecera}>
                <span className={styles.icono} aria-hidden="true">
                  <Icono size={22} />
                </span>
                <h2 id={`recursos-${seccion.id}`}>{seccion.titulo}</h2>
              </header>

              <p className={styles.intro}>{seccion.intro}</p>

              <ul
                className={styles.items}
                aria-label={`${seccion.titulo}: ${recursosPagina.ariaLista}`}
              >
                {seccion.items.map((item) => (
                  <li
                    key={item.id}
                    className={clsx(
                      styles.item,
                      item.pendiente && styles.pendiente,
                    )}
                  >
                    <div className={styles.itemCabecera}>
                      <h3>{item.titulo}</h3>
                      {item.pendiente && (
                        <span className={styles.badge}>
                          {recursosPagina.pendiente}
                        </span>
                      )}
                    </div>
                    <p>{item.texto}</p>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div
        id="compartir"
        className={styles.compartir}
        aria-labelledby="titulo-compartir"
      >
        <h2 id="titulo-compartir">{recursosPagina.compartirTitulo}</h2>
        <p>{recursosPagina.compartirTexto}</p>

        <ul className={styles.redes} aria-label={recursosPagina.ariaRedes}>
          {redesSociales.map((red) => {
            const Icono = iconosSociales[red.icono];

            return (
              <li key={red.id}>
                <a
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(styles.red, styles[red.id])}
                  aria-label={`${recursosPagina.compartirTitulo} en ${red.nombre}`}
                >
                  <Icono size={19} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className={`${styles.nota} manuscrito`}>{recursosPagina.nota}</p>
      </div>
    </section>
  );
}
