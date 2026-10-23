import clsx from 'clsx';
import { ChevronRight, Heart, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { iconosRecursos, iconosSociales } from '../../components/iconos';
import { ayudaContenido } from '../../data/contenido';
import { redesSociales, recursosAyuda } from '../../data/recursos';
import styles from './AyudaRecursos.module.css';

export function AyudaRecursos() {
  return (
    <section
      id={ayudaContenido.id}
      className={`${styles.panel} animar-entrada animar-retraso-3`}
      aria-labelledby="titulo-ayuda"
    >
      <PanelHeader
        icon={<Heart size={20} />}
        title={ayudaContenido.titulo}
        titleId="titulo-ayuda"
      >
        <span className={styles.huella} aria-hidden="true">
          <PawPrint size={18} />
        </span>
      </PanelHeader>

      <div className={styles.contenido}>
        <ul className={styles.lista}>
          {recursosAyuda.map((recurso) => {
            const Icono = iconosRecursos[recurso.icono];
            return (
              <li key={recurso.id}>
                <Link to={recurso.destino} className={styles.recurso}>
                  <span className={styles.icono} aria-hidden="true">
                    <Icono size={18} strokeWidth={2.2} />
                  </span>
                  <span className={styles.texto}>
                    <strong>{recurso.titulo}</strong>
                    <small>{recurso.descripcion}</small>
                  </span>
                  <ChevronRight
                    size={15}
                    className={styles.flecha}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          id={ayudaContenido.idRecursos}
          className={styles.compartir}
          aria-labelledby="titulo-compartir"
        >
          <h3 id="titulo-compartir">{ayudaContenido.compartir}</h3>
          <ul className={styles.redes} aria-label={ayudaContenido.ariaRedes}>
            {redesSociales.map((red) => {
              const Icono = iconosSociales[red.icono];
              return (
                <li key={red.id}>
                  <a
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(styles.red, styles[red.id])}
                    aria-label={`${ayudaContenido.compartir} en ${red.nombre}`}
                  >
                    <Icono size={17} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className={`${styles.nota} manuscrito`}>{ayudaContenido.nota}</p>
        </div>
      </div>
    </section>
  );
}
