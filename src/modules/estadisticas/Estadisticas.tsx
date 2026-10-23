import { PawPrint } from 'lucide-react';
import {
  configuracion,
  estadisticasContenido,
} from '../../data/contenido';
import { datosMaltrato } from '../../data/estadisticas';
import { BarrasChart } from './BarrasChart';
import { DonaChart } from './DonaChart';
import styles from './Estadisticas.module.css';

export function Estadisticas() {
  return (
    <section
      id={estadisticasContenido.id}
      className={`${styles.panel} animar-entrada animar-retraso-1`}
      aria-labelledby="titulo-estadisticas"
    >
      <header className={styles.encabezado}>
        <h2 id="titulo-estadisticas" className="manuscrito">
          {estadisticasContenido.titulo}
        </h2>
        <p>{estadisticasContenido.subtitulo}</p>
      </header>

      <div className={styles.cuerpo}>
        <div className={styles.dona}>
          <DonaChart ariaLabel={estadisticasContenido.ariaDona} />
          <div className={styles.centroDona} aria-hidden="true">
            <PawPrint size={30} strokeWidth={2.4} />
            <span>100%</span>
          </div>
        </div>

        <ul className={styles.leyenda} aria-label={estadisticasContenido.leyendaTitulo}>
          {datosMaltrato.map((dato) => (
            <li key={dato.id}>
              <span
                className={styles.punto}
                style={{ backgroundColor: dato.color }}
                aria-hidden="true"
              />
              <span className={styles.leyendaTexto}>
                <strong>{dato.nombre}</strong>
                <small>{dato.descripcion}</small>
              </span>
              <span className={styles.porcentaje}>{dato.porcentaje}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.banner}>
        <span className={styles.bannerIcono} aria-hidden="true">
          <PawPrint size={24} />
        </span>
        <p>{estadisticasContenido.banner}</p>
      </div>

      <div className={styles.animales}>
        <h3>{estadisticasContenido.tituloAnimales}</h3>
        <BarrasChart />
      </div>

      {configuracion.mostrarNotaDatosDemo && (
        <p className={styles.nota}>{estadisticasContenido.nota}</p>
      )}
    </section>
  );
}
