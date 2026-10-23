import { Pause, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RabbitVisual } from '../../components/RabbitVisual';
import { Button } from '../../components/primitives/Button';
import { configuracion, heroe } from '../../data/contenido';
import { imagenes } from '../../data/imagenes';
import type { ModoConejo } from '../../data/types';
import { iconosNavegacion } from '../../components/iconos';
import styles from './Hero.module.css';

interface HeroProps {
  readonly rabbitMode?: ModoConejo;
}

export function Hero({ rabbitMode = configuracion.modoConejo }: HeroProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [errorAudio, setErrorAudio] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const alTerminar = () => setReproduciendo(false);
    const alPausar = () => setReproduciendo(false);
    const alReproducir = () => setReproduciendo(true);

    audio.addEventListener('ended', alTerminar);
    audio.addEventListener('pause', alPausar);
    audio.addEventListener('play', alReproducir);

    return () => {
      audio.removeEventListener('ended', alTerminar);
      audio.removeEventListener('pause', alPausar);
      audio.removeEventListener('play', alReproducir);
    };
  }, []);

  const alternarAudio = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (reproduciendo) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      setErrorAudio(false);
    } catch {
      setErrorAudio(true);
    }
  };

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

        <Button
          variant="outline"
          size="sm"
          className={styles.botonAudio}
          icon={reproduciendo ? <Pause size={16} /> : <Volume2 size={16} />}
          onClick={alternarAudio}
          aria-label={heroe.ariaAudio}
          aria-pressed={reproduciendo}
        >
          {reproduciendo ? heroe.botonAudioActivo : heroe.botonAudio}
        </Button>

        <audio ref={audioRef} src={imagenes.audio} preload="metadata" />
        {errorAudio && (
          <p className={styles.errorAudio} role="status">
            {heroe.ariaErrorAudio}
          </p>
        )}
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
