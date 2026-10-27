import { useEffect, useRef, useState } from 'react';
import { configuracion } from '../../data/contenido';
import { imagenes } from '../../data/imagenes';
import { VisorAsomado } from './asomadoEngine';
import styles from './ConejoAsomado.module.css';

interface ConejoAsomadoProps {
  readonly titulo?: string;
  readonly texto?: string;
}

const ALT = 'Un conejo asoma la cabeza por el borde y saluda con una pata vendada, junto a una zanahoria.';

export function ConejoAsomado({
  titulo = 'No mires hacia otro lado',
  texto = 'Tu denuncia puede salvar una vida.',
}: ConejoAsomadoProps) {
  const en3d = configuracion.modoConejo === '3d';
  const visor = useRef<HTMLDivElement>(null);
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    if (!en3d) return;
    const cont = visor.current;
    if (!cont) return;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const v = new VisorAsomado(
      cont,
      `${import.meta.env.BASE_URL}${imagenes.modelos.conejoAsomado.replace(/^\//, '')}`,
      { onListo: () => setListo(true), onError: () => setFallo(true) },
      !reducido,
    );
    const io = new IntersectionObserver(([entrada]) => v.setVisible(entrada.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(cont);
    return () => {
      io.disconnect();
      v.destruir();
    };
  }, [en3d]);

  const mostrar3d = en3d && !fallo;

  return (
    <figure className={`${styles.figura} ${mostrar3d ? styles.figura3d : ''}`}>
      {mostrar3d && <div ref={visor} className={styles.visor} role="img" aria-label={ALT} />}
      {(!mostrar3d || !listo) && (
        <img
          src={`${import.meta.env.BASE_URL}images/conejo-asomado.jpg`}
          alt={ALT}
          width={1000}
          height={1000}
          loading="lazy"
          decoding="async"
          className={styles.imagen}
        />
      )}
      <figcaption className={mostrar3d ? styles.textoAbajo : styles.texto}>
        <strong className={`${styles.titulo} manuscrito`}>{titulo}</strong>
        <span className={styles.detalle}>{texto}</span>
      </figcaption>
    </figure>
  );
}
