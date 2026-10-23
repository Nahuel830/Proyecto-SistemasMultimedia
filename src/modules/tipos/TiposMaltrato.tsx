import { tiposContenido } from '../../data/contenido';
import { tiposMaltrato } from '../../data/tipos';
import { iconosTipos } from '../../components/iconos';
import styles from './TiposMaltrato.module.css';

export function TiposMaltrato() {
  return (
    <section
      id={tiposContenido.id}
      className={`${styles.panel} animar-entrada animar-retraso-2`}
      aria-labelledby="titulo-tipos"
    >
      <header className={styles.encabezado}>
        <h2 id="titulo-tipos" className="manuscrito">
          {tiposContenido.titulo}
        </h2>
        <p>{tiposContenido.subtitulo}</p>
      </header>

      <ul className={styles.lista} aria-label={tiposContenido.ariaLista}>
        {tiposMaltrato.map((tipo) => {
          const Icono = iconosTipos[tipo.icono];
          return (
            <li key={tipo.id} className={styles.item}>
              <span className={styles.icono} aria-hidden="true">
                <Icono size={20} strokeWidth={2.1} />
              </span>
              <span className={styles.texto}>
                <strong>{tipo.nombre}</strong>
                <small>{tipo.descripcion}</small>
              </span>
              <img
                className={styles.imagen}
                src={tipo.imagen}
                alt={tipo.alt}
                loading="lazy"
                decoding="async"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
