import { useEffect, useRef, useState } from "react";
import { DURACION_META, RunnerEngine } from "./runnerEngine";
import type { EstadoJuego } from "./runnerEngine";
import styles from "./RunnerGame.module.css";

interface RunnerGameProps {
  /** Ruta del modelo exportado desde Blender. */
  src?: string;
}

const CLAVE_MEJOR = "huellas-runner-mejor";

function leerMejor(): number {
  try {
    const v = Number(window.localStorage.getItem(CLAVE_MEJOR));
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}

function guardarMejor(valor: number): void {
  try {
    window.localStorage.setItem(CLAVE_MEJOR, String(valor));
  } catch {
    /* sin almacenamiento: no pasa nada */
  }
}

const TECLAS_SALTO = ["Tab", "Space", "ArrowUp", "KeyW"];

export default function RunnerGame({ src = `${import.meta.env.BASE_URL}models/conejo_runner.glb` }: RunnerGameProps) {
  const escenario = useRef<HTMLDivElement>(null);
  const motor = useRef<RunnerEngine | null>(null);
  const tiempoRef = useRef(0);
  const botonRef = useRef<HTMLButtonElement>(null);
  const [estado, setEstado] = useState<EstadoJuego>("cargando");
  const [tiempo, setTiempo] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [mejor, setMejor] = useState<number>(() => leerMejor());
  const [detalleError, setDetalleError] = useState("");

  // crear / destruir el motor 3D
  useEffect(() => {
    const cont = escenario.current;
    if (!cont) return;
    const m = new RunnerEngine(cont, src, {
      onEstado: (e) => {
        setEstado(e);
        if (e === "perdido" || e === "ganado") {
          const logrado = e === "ganado" ? DURACION_META : tiempoRef.current;
          setMejor((previo) => {
            const nuevo = Math.max(previo, logrado);
            if (nuevo !== previo) guardarMejor(nuevo);
            return nuevo;
          });
        }
      },
      onTiempo: (t, n) => {
        tiempoRef.current = t;
        setTiempo(t);
        setNivel(n);
      },
      onError: setDetalleError,
    });
    motor.current = m;
    const io = new IntersectionObserver(([entrada]) => m.setVisible(entrada.isIntersecting), { threshold: 0.1 });
    io.observe(cont);
    return () => {
      io.disconnect();
      m.destruir();
      motor.current = null;
    };
  }, [src]);

  // el teclado solo se captura mientras se juega (asi Tab sigue navegando el resto de la pagina)
  useEffect(() => {
    if (estado !== "corriendo") return;
    const alPulsar = (e: KeyboardEvent): void => {
      if (e.repeat || !TECLAS_SALTO.includes(e.code)) return;
      e.preventDefault();
      motor.current?.saltar();
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [estado]);

  // al terminar la partida, el foco pasa al boton para volver a jugar
  useEffect(() => {
    if (estado === "perdido" || estado === "ganado") botonRef.current?.focus();
  }, [estado]);

  const jugar = (): void => motor.current?.iniciar();
  const mostrarPanel = estado !== "corriendo" && estado !== "perdiendo" && estado !== "entrando";
  const anuncio =
    estado === "perdido"
      ? "La mano te alcanzó."
      : estado === "ganado"
        ? "¡Llegaste a tu madriguera! Ganaste."
        : estado === "corriendo"
          ? "Partida en curso."
          : "";

  return (
    <section className={styles.juego} aria-labelledby="runner-titulo">
      <div className={styles.cabecera}>
        <h3 id="runner-titulo" className={styles.titulo}>
          Corre, Esperanza
        </h3>
        <p className={styles.subtitulo}>Salta los obstáculos y escapa de la mano. ¡Resiste 30 segundos!</p>
      </div>

      <div
        ref={escenario}
        className={styles.escenario}
        role="img"
        aria-label="Juego de carrera: un conejo salta rocas y troncos mientras una mano gigante lo persigue."
        onPointerDown={() => motor.current?.saltar()}
      >
        <div className={styles.hud} aria-hidden="true">
          <span className={styles.chip}>
            ⏱ {tiempo.toFixed(1)} / {DURACION_META} s
          </span>
          <span className={styles.chip}>Nivel {nivel + 1}/4</span>
          <span className={styles.chip}>Mejor: {mejor.toFixed(1)} s</span>
        </div>

        {mostrarPanel && (
          <div className={styles.panel}>
            {estado === "cargando" && <p className={styles.texto}>Cargando el juego…</p>}

            {estado === "error" && (
              <>
                <h4 className={styles.panelTitulo}>No se pudo cargar el juego 3D</h4>
                <p className={styles.texto}>
                  Revisa que exista <code>public/models/conejo_runner.glb</code>.
                </p>
                {detalleError && <p className={styles.detalle}>{detalleError}</p>}
              </>
            )}

            {estado === "listo" && (
              <>
                <h4 className={styles.panelTitulo}>¿Puedes llegar a tu madriguera?</h4>
                <p className={styles.texto}>
                  Salta con <kbd>Tab</kbd>, <kbd>Espacio</kbd>, <kbd>↑</kbd> o tocando la pantalla.
                </p>
                <button ref={botonRef} type="button" className={styles.boton} onClick={jugar}>
                  Jugar
                </button>
              </>
            )}

            {estado === "perdido" && (
              <>
                <h4 className={styles.panelTitulo}>¡La mano te alcanzó!</h4>
                <p className={styles.texto}>
                  Aguantaste {tiempo.toFixed(1)} s de {DURACION_META}.
                </p>
                <button ref={botonRef} type="button" className={styles.boton} onClick={jugar}>
                  Reintentar
                </button>
              </>
            )}

            {estado === "ganado" && (
              <>
                <h4 className={styles.panelTitulo}>¡Llegaste a tu madriguera!</h4>
                <p className={styles.texto}>
                  Escapaste a salvo. Todos los animales merecen un hogar seguro y un trato digno.
                </p>
                <button ref={botonRef} type="button" className={styles.boton} onClick={jugar}>
                  Jugar otra vez
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <p className={styles.visualmenteOculto} role="status" aria-live="polite">
        {anuncio}
      </p>
    </section>
  );
}
