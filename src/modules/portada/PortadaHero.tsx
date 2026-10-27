import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PortadaEngine } from "./portadaEngine";
import styles from "./PortadaHero.module.css";

interface PortadaHeroProps {
  /** Escena exportada desde Blender con huellas_inicio_escena.py */
  src?: string;
}

type Estado = "cargando" | "listo" | "error";

export default function PortadaHero({ src = `${import.meta.env.BASE_URL}models/huellas_inicio.glb` }: PortadaHeroProps) {
  const escena = useRef<HTMLDivElement>(null);
  const motor = useRef<PortadaEngine | null>(null);
  const [cerca, setCerca] = useState(false);
  const [estado, setEstado] = useState<Estado>("cargando");
  const [detalle, setDetalle] = useState("");

  useEffect(() => {
    const cont = escena.current;
    if (!cont) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = new PortadaEngine(
      cont,
      src,
      {
        onListo: () => setEstado("listo"),
        onError: (mensaje) => {
          setDetalle(mensaje);
          setEstado("error");
        },
      },
      !reducido,
    );
    motor.current = m;
    const io = new IntersectionObserver(([entrada]) => m.setVisible(entrada.isIntersecting), { threshold: 0.05 });
    io.observe(cont);
    return () => {
      io.disconnect();
      m.destruir();
      motor.current = null;
    };
  }, [src]);

  return (
    <section className={styles.portada} aria-labelledby="portada-titulo">
      <h1 id="portada-titulo" className={estado === "error" ? styles.tituloVisible : styles.tituloOculto}>
        Huellas de Esperanza
      </h1>

      <div
        ref={escena}
        className={styles.escena}
        role="img"
        aria-label="Escena en 3D: un conejo junto a una lámpara encendida y, detrás, las letras Huellas de Esperanza."
      />

      {estado === "cargando" && <p className={styles.aviso}>Cargando la escena…</p>}
      {estado === "error" && (
        <p className={styles.aviso}>
          No se pudo cargar la escena 3D. Revisa que exista <code>public/models/huellas_inicio.glb</code>.
          {detalle && <small className={styles.detalle}>{detalle}</small>}
        </p>
      )}

      {estado === "listo" && (
        <div className={styles.controles} role="group" aria-label="Controles de la escena 3D">
          <button type="button" className={styles.control} onClick={() => motor.current?.zoom(-1)} aria-label="Alejar">
            −
          </button>
          <button type="button" className={styles.control} onClick={() => motor.current?.zoom(1)} aria-label="Acercar">
            +
          </button>
          <button
            type="button"
            className={styles.controlTexto}
            aria-pressed={cerca}
            onClick={() => setCerca(motor.current?.alternarEnfoque() ?? false)}
          >
            {cerca ? "Ver toda la escena" : "Acercar al conejo"}
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={() => {
              motor.current?.restablecer();
              setCerca(false);
            }}
            aria-label="Restablecer la vista"
          >
            ↺
          </button>
        </div>
      )}
      {estado === "listo" && <p className={styles.ayuda}>Arrastra para girar · Ctrl + rueda para acercar</p>}

      <div className={styles.pie}>
        <p className={`${styles.lema} manuscrito`}>Una voz contra el maltrato animal</p>
        <div className={styles.acciones}>
          <Link to="/mi-historia" className={styles.botonPrincipal}>
            Conoce mi historia
          </Link>
          <Link to="/juego" className={styles.botonSecundario}>
            Ponte a prueba
          </Link>
        </div>
      </div>
    </section>
  );
}
