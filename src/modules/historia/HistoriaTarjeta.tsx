import { ArrowRight, PawPrint, Play } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { configuracion } from '../../data/contenido';
import { historiaTarjeta } from '../../data/historia';
import { imagenes } from '../../data/imagenes';
import styles from './HistoriaTarjeta.module.css';

const ModelViewer = lazy(() =>
  import('../../components/three/ModelViewer').then((module) => ({
    default: module.ModelViewer,
  })),
);

export function HistoriaTarjeta() {
  return (
    <section
      className={`${styles.panel} animar-entrada`}
      aria-labelledby="titulo-historia-tarjeta"
    >
      <PanelHeader
        icon={<PawPrint size={20} />}
        title={historiaTarjeta.titulo}
        titleId="titulo-historia-tarjeta"
      />

      <div className={styles.contenido}>
        <div className={styles.poster}>
          {configuracion.modoConejo === '3d' ? (
            <div className={styles.visor3d}>
              <Suspense fallback={null}>
                <ModelViewer
                  src={imagenes.modelos.conejoSentado}
                  alt={historiaTarjeta.ariaPoster}
                  autoRotate
                  zoom={false}
                />
              </Suspense>
            </div>
          ) : (
            <img
              src={imagenes.video.poster}
              alt={historiaTarjeta.ariaPoster}
              loading="lazy"
              decoding="async"
            />
          )}
          {configuracion.modoConejo !== '3d' && (
            <>
              <span className={styles.velo} aria-hidden="true" />
              <span
                className={styles.play}
                role="img"
                aria-label={historiaTarjeta.ariaPlay}
              >
                <Play size={20} fill="currentColor" aria-hidden="true" />
              </span>
            </>
          )}
        </div>

        <p className={styles.texto}>{historiaTarjeta.texto}</p>

        <Link to={historiaTarjeta.destino} className={styles.cta}>
          <span>{historiaTarjeta.boton}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
