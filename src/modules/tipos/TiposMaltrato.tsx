import { ArrowRight, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FuenteDato } from '../../components/primitives/FuenteDato';
import { iconosTipos } from '../../components/iconos';
import { tiposMaltrato, tiposPagina } from '../../data/tipos';
import styles from './TiposMaltrato.module.css';

export function TiposMaltrato() {
  return (
    <section
      className={`${styles.panel} animar-entrada`}
      aria-labelledby="titulo-tipos-detalle"
    >
      <header className={styles.encabezado}>
        <span className={styles.encabezadoIcono} aria-hidden="true">
          <ShieldAlert size={22} />
        </span>
        <div>
          <h2 id="titulo-tipos-detalle">{tiposPagina.fichasTitulo}</h2>
          <p>{tiposPagina.fichasTexto}</p>
        </div>
      </header>

      <ul className={styles.lista} aria-label={tiposPagina.listaAria}>
        {tiposMaltrato.map((tipo) => {
          const Icono = iconosTipos[tipo.icono];

          return (
            <li key={tipo.id} className={styles.tarjeta}>
              <div className={styles.media}>
                <img
                  src={tipo.imagen}
                  alt={tipo.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.icono} aria-hidden="true">
                  <Icono size={20} />
                </span>
              </div>

              <div className={styles.cuerpo}>
                <h3>{tipo.nombre}</h3>
                <p className={styles.descripcion}>{tipo.descripcion}</p>

                <div className={styles.bloque}>
                  <h4>{tiposPagina.definicionTitulo}</h4>
                  <p>{tipo.definicion}</p>
                </div>

                <div className={styles.columnas}>
                  <div className={styles.bloque}>
                    <h4>{tiposPagina.senalesTitulo}</h4>
                    <ul>
                      {tipo.senales.map((senal) => (
                        <li key={senal}>{senal}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.bloque}>
                    <h4>{tiposPagina.accionesTitulo}</h4>
                    <ul>
                      {tipo.acciones.map((accion) => (
                        <li key={accion}>{accion}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className={styles.legal}>
                  <strong>{tiposPagina.baseLegalTitulo}:</strong>{' '}
                  {tipo.baseLegal}
                </p>

                <FuenteDato
                  fuente={tipo.fuente}
                  verificado={tipo.verificado}
                  compacto
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.cta}>
        <p>{tiposPagina.ctaTexto}</p>
        <Link to="/ayuda" aria-label={tiposPagina.ctaAria}>
          <span>{tiposPagina.ctaBoton}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
