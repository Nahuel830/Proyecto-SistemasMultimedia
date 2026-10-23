import clsx from 'clsx';
import {
  CirclePlay,
  Maximize,
  Pause,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { videoContenido } from '../../data/contenido';
import { imagenes } from '../../data/imagenes';
import { formatearTiempo } from '../../utils/formato';
import styles from './VideoMensaje.module.css';

interface VideoMensajeProps {
  readonly className?: string;
}

export function VideoMensaje({ className }: VideoMensajeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [volumen, setVolumen] = useState(0.8);
  const [silenciado, setSilenciado] = useState(false);
  const [ajustesAbiertos, setAjustesAbiertos] = useState(false);
  const [videoDisponible, setVideoDisponible] = useState(false);

  useEffect(() => {
    let cancelado = false;

    fetch(imagenes.videoSrc, { method: 'HEAD' })
      .then((response) => {
        const tipo = response.headers.get('content-type') ?? '';
        const disponible = response.ok && tipo.startsWith('video/');
        if (!cancelado) {
          setVideoDisponible(disponible);
        }
      })
      .catch(() => {
        if (!cancelado) {
          setVideoDisponible(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (!reproduciendo || videoDisponible) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setTiempo((actual) => {
        if (actual >= videoContenido.duracion - 1) {
          setReproduciendo(false);
          return 0;
        }
        return actual + 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [reproduciendo, videoDisponible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.volume = volumen;
    video.muted = silenciado;
  }, [volumen, silenciado, videoDisponible]);

  const alternarReproduccion = async () => {
    if (reproduciendo) {
      videoRef.current?.pause();
      setReproduciendo(false);
      return;
    }

    if (tiempo >= videoContenido.duracion) {
      setTiempo(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }

    setReproduciendo(true);
    if (videoDisponible && videoRef.current) {
      try {
        await videoRef.current.play();
      } catch {
        setReproduciendo(false);
      }
    }
  };

  const cambiarTiempo = (valor: number) => {
    setTiempo(valor);
    if (videoDisponible && videoRef.current) {
      videoRef.current.currentTime = valor;
    }
  };

  const cambiarVolumen = (valor: number) => {
    setVolumen(valor);
    setSilenciado(valor === 0);
  };

  const alternarSilencio = () => {
    setSilenciado((valor) => !valor);
  };

  const alternarPantallaCompleta = async () => {
    const contenedor = contenedorRef.current;
    if (!contenedor) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (contenedor.requestFullscreen) {
      await contenedor.requestFullscreen();
    }
  };

  return (
    <section
      className={clsx(styles.panel, 'animar-entrada', className)}
      aria-labelledby="titulo-video"
    >
      <PanelHeader
        icon={<CirclePlay size={20} />}
        title={videoContenido.titulo}
        titleId="titulo-video"
      />

      <div className={styles.contenido}>
        <div ref={contenedorRef} className={styles.reproductor}>
          {videoDisponible ? (
            <video
              ref={videoRef}
              className={styles.media}
              src={imagenes.videoSrc}
              poster={imagenes.video.poster}
              preload="metadata"
              playsInline
              aria-label={videoContenido.ariaVideo}
              onTimeUpdate={(event) => {
                setTiempo(event.currentTarget.currentTime);
              }}
              onEnded={() => {
                setReproduciendo(false);
                setTiempo(videoContenido.duracion);
              }}
              onPlay={() => setReproduciendo(true)}
              onPause={() => setReproduciendo(false)}
            />
          ) : (
            <img
              src={imagenes.video.poster}
              alt={videoContenido.ariaVideo}
              className={styles.media}
            />
          )}

          <div className={styles.velo} aria-hidden="true" />

          <div className={styles.subtitulos}>
            <span>{videoContenido.subtitulo}</span>
            <span>{videoContenido.subtituloDos}</span>
          </div>

          <button
            type="button"
            className={styles.playGrande}
            aria-label={
              reproduciendo ? videoContenido.ariaPause : videoContenido.ariaPlay
            }
            onClick={alternarReproduccion}
          >
            {reproduciendo ? (
              <Pause size={25} fill="currentColor" aria-hidden="true" />
            ) : (
              <Play
                size={27}
                fill="currentColor"
                className={styles.iconoPlay}
                aria-hidden="true"
              />
            )}
          </button>

          <div className={styles.controles}>
            <button
              type="button"
              className={styles.control}
              aria-label={
                reproduciendo ? videoContenido.ariaPause : videoContenido.ariaPlay
              }
              onClick={alternarReproduccion}
            >
              {reproduciendo ? (
                <Pause size={13} fill="currentColor" aria-hidden="true" />
              ) : (
                <Play size={13} fill="currentColor" aria-hidden="true" />
              )}
            </button>

            <span className={styles.tiempo} aria-live="off">
              {formatearTiempo(tiempo)} / {formatearTiempo(videoContenido.duracion)}
            </span>

            <input
              type="range"
              min={0}
              max={videoContenido.duracion}
              step={0.1}
              value={tiempo}
              onChange={(event) => cambiarTiempo(Number(event.target.value))}
              className={styles.progreso}
              aria-label={videoContenido.ariaProgreso}
              style={{
                background: `linear-gradient(90deg, var(--color-mint-400) ${
                  (tiempo / videoContenido.duracion) * 100
                }%, rgba(255,255,255,.25) ${
                  (tiempo / videoContenido.duracion) * 100
                }%)`,
              }}
            />

            <button
              type="button"
              className={styles.control}
              aria-label={videoContenido.ariaSilenciar}
              aria-pressed={silenciado}
              onClick={alternarSilencio}
            >
              {silenciado ? (
                <VolumeX size={14} aria-hidden="true" />
              ) : (
                <Volume2 size={14} aria-hidden="true" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={silenciado ? 0 : volumen}
              onChange={(event) => cambiarVolumen(Number(event.target.value))}
              className={styles.volumen}
              aria-label={videoContenido.ariaVolumen}
            />

            <button
              type="button"
              className={styles.control}
              aria-label={videoContenido.ariaAjustes}
              aria-expanded={ajustesAbiertos}
              aria-controls="ajustes-video"
              onClick={() => setAjustesAbiertos((valor) => !valor)}
            >
              <Settings size={14} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={styles.control}
              aria-label={videoContenido.ariaPantallaCompleta}
              onClick={alternarPantallaCompleta}
            >
              <Maximize size={14} aria-hidden="true" />
            </button>
          </div>

          {ajustesAbiertos && (
            <div
              className={styles.ajustes}
              id="ajustes-video"
              role="group"
              aria-label={videoContenido.ajustesTitulo}
            >
              <strong>{videoContenido.ajustesTitulo}</strong>
              <span>{videoContenido.calidad}</span>
              <span>{videoContenido.subtitulos}</span>
              <small>{videoContenido.ajustesNota}</small>
            </div>
          )}
        </div>

        <div className={styles.qrFila}>
          <img
            className={styles.qr}
            src={imagenes.qr}
            alt={videoContenido.qrAlt}
            loading="lazy"
          />
          <div className={styles.qrTexto}>
            <p>{videoContenido.notaQr}</p>
            <p className={`${styles.manuscrita} manuscrito`}>
              {videoContenido.notaManuscrita}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
