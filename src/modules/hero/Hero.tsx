import { Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RabbitVisual } from '../../components/RabbitVisual';
import { configuracion, heroe } from '../../data/contenido';
import type { ModoConejo } from '../../data/types';
import { iconosNavegacion } from '../../components/iconos';
import styles from './Hero.module.css';

interface HeroProps {
  readonly rabbitMode?: ModoConejo;
}

export function Hero({ rabbitMode = configuracion.modoConejo }: HeroProps) {
  return (
    <section
      id={heroe.id}
      className={`${styles.hero} animar-entrada`}
      aria-labelledby="hero-titulo"
    >
      <div className={styles.fondo} aria-hidden="true" />
      <div className={styles.rabbit}>
        <RabbitVisual
          mode={rabbitMode}
          variant="heroe"
          alt={heroe.ariaImagen}
          eager
          autoRotate={false}
          animation="idle"
        />
      </div>

      <div className={styles.contenido}>
        <p className={styles.eyebrow}>{heroe.eyebrow}</p>
        <h1 id="hero-titulo" className={styles.titulo}>
          <span className={styles.tituloBlanco}>{heroe.titulo[0]}</span>
          <span className={styles.tituloMenta}>{heroe.titulo[1]}</span>
        </h1>
        <p className={`${styles.subtitulo} manuscrito`}>{heroe.subtitulo}</p>
        <blockquote className={`${styles.cita} manuscrito`}>
          “{heroe.cita}”
        </blockquote>

        <Link
          to="/mi-historia"
          className={styles.botonHistoria}
          aria-label={heroe.ariaBotonHistoria}
        >
          <Volume2 size={16} aria-hidden="true" />
          <span>{heroe.botonHistoria}</span>
        </Link>
      </div>

      <nav className={styles.accesos} aria-label={heroe.ariaAccesos}>
        {heroe.accesos.map((acceso) => {
          const Icono = iconosNavegacion[acceso.icono];
          return (
            <Link key={acceso.id} to={acceso.destino} className={styles.acceso}>
              <Icono size={20} aria-hidden="true" />
              <span>{acceso.etiqueta}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
