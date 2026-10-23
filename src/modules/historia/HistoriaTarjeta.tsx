import { ArrowRight, PawPrint, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { historiaTarjeta } from '../../data/historia';
import { imagenes } from '../../data/imagenes';
import styles from './HistoriaTarjeta.module.css';

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
          <img
            src={imagenes.video.poster}
            alt={historiaTarjeta.ariaPoster}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.velo} aria-hidden="true" />
          <span
            className={styles.play}
            role="img"
            aria-label={historiaTarjeta.ariaPlay}
          >
            <Play size={20} fill="currentColor" aria-hidden="true" />
          </span>
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
