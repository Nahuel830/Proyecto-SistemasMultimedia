import { ArrowRight, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FuenteDato } from '../../components/primitives/FuenteDato';
import { iconosCifras } from '../../components/iconos';
import { configuracion } from '../../data/contenido';
import {
  cifrasBolivia,
  datosIlustrativos,
  estadisticasPagina,
} from '../../data/estadisticas';
import { BarrasChart } from './BarrasChart';
import { DonaChart } from './DonaChart';
import styles from './Estadisticas.module.css';

const fuentes = Array.from(
  new Map([
    ...cifrasBolivia.map((cifra) => [cifra.fuente, cifra.verificado] as const),
    ...datosIlustrativos.maltrato.map(
      (dato) => [dato.fuente, dato.verificado] as const,
    ),
  ]).entries(),
).map(([fuente, verificado]) => ({ fuente, verificado }));

export function Estadisticas() {
  return (
    <section
      className={`${styles.panel} animar-entrada`}
      aria-labelledby="titulo-estadisticas-detalle"
    >
      <header className={styles.encabezado}>
        <p className={styles.eyebrow}>{estadisticasPagina.kpiTitulo}</p>
        <h2 id="titulo-estadisticas-detalle">{estadisticasPagina.kpiTitulo}</h2>
        <p>{estadisticasPagina.kpiTexto}</p>
      </header>

      <ul className={styles.kpis}>
        {cifrasBolivia.map((cifra) => {
          const Icono = iconosCifras[cifra.icono];

          return (
            <li key={cifra.id} className={styles.kpi}>
              <span className={styles.kpiIcono} aria-hidden="true">
                <Icono size={20} />
              </span>
              <span className={styles.kpiValor}>{cifra.valor}</span>
              <span className={styles.kpiEtiqueta}>{cifra.etiqueta}</span>
              <span className={styles.kpiDetalle}>{cifra.detalle}</span>
              <FuenteDato
                fuente={cifra.fuente}
                verificado={cifra.verificado}
                compacto
              />
            </li>
          );
        })}
      </ul>

      {configuracion.mostrarNotaDatosDemo && (
        <p className={styles.avisoDatos} role="note">
          {estadisticasPagina.notaDatosDemo}
        </p>
      )}

      <div className={styles.graficos} aria-label={estadisticasPagina.graficosAria}>
        <article className={styles.grafico}>
          <div className={styles.graficoCabecera}>
            <h3>{estadisticasPagina.graficosTitulo}</h3>
            <p>{estadisticasPagina.graficosTexto}</p>
          </div>

          <div className={styles.dona}>
            <DonaChart
              datos={datosIlustrativos.maltrato}
              ariaLabel={estadisticasPagina.ariaDona}
            />
            <div className={styles.centroDona} aria-hidden="true">
              <PawPrint size={26} strokeWidth={2.4} />
              <span>100%</span>
            </div>
          </div>

          <ul
            className={styles.leyenda}
            aria-label={estadisticasPagina.leyendaTitulo}
          >
            {datosIlustrativos.maltrato.map((dato) => (
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

          <p className={styles.nota}>{estadisticasPagina.notaIlustrativa}</p>
        </article>

        <article className={styles.grafico}>
          <div className={styles.graficoCabecera}>
            <h3>{estadisticasPagina.animalesTitulo}</h3>
            <p>{estadisticasPagina.notaIlustrativa}</p>
          </div>

          <div className={styles.animales}>
            <BarrasChart
              datos={datosIlustrativos.porAnimal}
              ariaLabel={estadisticasPagina.ariaAnimales}
              caption={estadisticasPagina.captionTabla}
            />
          </div>
        </article>
      </div>

      <div className={styles.fuentes}>
        <h3>{estadisticasPagina.fuentesTitulo}</h3>
        <p>{estadisticasPagina.fuentesTexto}</p>
        <ul>
          {fuentes.map((fuente) => (
            <li key={fuente.fuente}>
              <FuenteDato
                fuente={fuente.fuente}
                verificado={fuente.verificado}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cta}>
        <p>{estadisticasPagina.ctaTexto}</p>
        <Link to="/tipos-de-maltrato" aria-label={estadisticasPagina.ctaAria}>
          <span>{estadisticasPagina.ctaBoton}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
