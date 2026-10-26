import { Heart, PawPrint } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { CanvasFallback } from '../components/three/CanvasFallback';
import { configuracion } from '../data/contenido';
import {
  capitulosHistoria,
  cierreHistoria,
  conejoHistoria,
  historiaPagina,
  relatoHistoria,
} from '../data/historia';
import { imagenes } from '../data/imagenes';
import { AudioHistoria } from '../modules/historia/AudioHistoria';
import { VideoMensaje } from '../modules/video/VideoMensaje';
import styles from './MiHistoriaPage.module.css';

const ModelViewer = lazy(() =>
  import('../components/three/ModelViewer').then((module) => ({
    default: module.ModelViewer,
  })),
);

const retardos = [1, 2, 3] as const;

export function MiHistoriaPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <p className={styles.avisoFiccion} role="note">
        {historiaPagina.avisoFiccion}
      </p>

      <Reveal>
        <header className={styles.cabecera} aria-labelledby="historia-titulo">
          <p className={styles.eyebrow}>{historiaPagina.eyebrow}</p>
          <h1 id="historia-titulo" className={styles.titulo}>
            {historiaPagina.titulo}
          </h1>
          <p className={styles.subtitulo}>{historiaPagina.subtitulo}</p>
          <p className={`${styles.frase} manuscrito`}>
            {historiaPagina.frase}
          </p>
          <PawPrint className={styles.huella} size={34} aria-hidden="true" />
        </header>
      </Reveal>

      <div className={styles.bloqueVideo}>
        <Reveal className={styles.columnaVideo}>
          <VideoMensaje className={styles.videoGrande} />
        </Reveal>

        <Reveal delay={1} className={styles.columnaTexto}>
          <aside className={styles.ladoTexto} aria-labelledby="historia-intro">
            <p className={styles.eyebrow}>{historiaPagina.introEyebrow}</p>
            <h2 id="historia-intro">{historiaPagina.introTitulo}</h2>
            {historiaPagina.introParrafos.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
            <blockquote className={`${styles.cita} manuscrito`}>
              “{historiaPagina.introCita}”
            </blockquote>
            <AudioHistoria />
          </aside>
        </Reveal>
      </div>

      <section className={styles.relato} aria-labelledby="historia-relato">
        <Reveal>
          <header className={styles.relatoCabecera}>
            <h2 id="historia-relato">{relatoHistoria.titulo}</h2>
            <p>{relatoHistoria.subtitulo}</p>
          </header>
        </Reveal>

        <ul className={styles.capitulos} aria-label={relatoHistoria.aria}>
          {capitulosHistoria.map((capitulo, indice) => (
            <li key={capitulo.id}>
              <Reveal delay={retardos[indice % retardos.length]}>
                <article
                  className={styles.capitulo}
                  aria-labelledby={`capitulo-${capitulo.id}`}
                >
                  <span className={styles.numero} aria-hidden="true">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <h3 id={`capitulo-${capitulo.id}`}>{capitulo.titulo}</h3>
                  {capitulo.parrafos.map((parrafo) => (
                    <p key={parrafo}>{parrafo}</p>
                  ))}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.seccionConejo} aria-labelledby="historia-conejo">
        <Reveal delay={1} className={styles.textoConejo}>
          <p className={styles.eyebrowClaro}>{conejoHistoria.eyebrow}</p>
          <h2 id="historia-conejo">{conejoHistoria.titulo}</h2>
          <p>{conejoHistoria.texto}</p>
          <p className={styles.notaConejo}>{conejoHistoria.nota}</p>
        </Reveal>

        <Reveal className={styles.visor}>
          <Suspense
            fallback={
              <CanvasFallback
                alt={conejoHistoria.ariaVisual}
                mostrarAviso={false}
              />
            }
          >
            <ModelViewer
              mode={configuracion.modoConejo}
              src={imagenes.modelo}
              alt={conejoHistoria.ariaVisual}
              animation="idle"
              controls={false}
            />
          </Suspense>
        </Reveal>
      </section>

      <Reveal>
        <section className={styles.cierre} aria-labelledby="historia-ayuda">
          <h2 id="historia-ayuda">{cierreHistoria.titulo}</h2>
          <p>{cierreHistoria.texto}</p>
          <Link
            to={cierreHistoria.destino}
            className={styles.ctaFinal}
            aria-label={cierreHistoria.aria}
          >
            <Heart size={18} aria-hidden="true" />
            <span>{cierreHistoria.boton}</span>
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
