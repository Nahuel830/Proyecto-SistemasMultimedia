import {
  Check,
  ChevronRight,
  FolderOpen,
  Gamepad2,
  Info,
  PawPrint,
  Trophy,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FuenteDato } from '../../components/primitives/FuenteDato';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { RabbitVisual } from '../../components/RabbitVisual';
import { Button } from '../../components/primitives/Button';
import { configuracion, juegoContenido } from '../../data/contenido';
import { imagenes } from '../../data/imagenes';
import {
  letrasOpciones,
  preguntasJuego,
  PREGUNTAS_POR_PARTIDA,
} from '../../data/preguntasJuego';
import type {
  ModoConejo,
  OpcionJuego,
  PreguntaJuego,
} from '../../data/types';
import styles from './JuegoQuiz.module.css';

interface JuegoQuizProps {
  readonly rabbitMode?: ModoConejo;
}

interface RondaPregunta {
  readonly pregunta: PreguntaJuego;
  readonly opciones: readonly OpcionJuego[];
}

type FaseJuego = 'inicio' | 'jugando' | 'resultado';

const CLAVE_MEJOR = 'huellas-juego-mejor';
const TOTAL = PREGUNTAS_POR_PARTIDA;

function leerMejor(): number {
  try {
    const guardado = window.localStorage.getItem(CLAVE_MEJOR);
    if (guardado === null) {
      return 0;
    }
    const numero = Number.parseInt(guardado, 10);
    if (!Number.isFinite(numero) || numero < 0) {
      return 0;
    }
    return Math.min(numero, TOTAL);
  } catch {
    return 0;
  }
}

function guardarMejor(puntos: number): void {
  try {
    window.localStorage.setItem(CLAVE_MEJOR, String(puntos));
  } catch {
    // El navegador puede bloquear el almacenamiento: el juego sigue funcionando.
  }
}

function barajar<T>(items: readonly T[]): T[] {
  const orden = [...items];
  for (let i = orden.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const actual = orden[i];
    const otro = orden[j];
    if (actual !== undefined && otro !== undefined) {
      orden[i] = otro;
      orden[j] = actual;
    }
  }
  return orden;
}

export function JuegoQuiz({
  rabbitMode = configuracion.modoConejo,
}: JuegoQuizProps) {
  const [fase, setFase] = useState<FaseJuego>('inicio');
  const [partida, setPartida] = useState<readonly RondaPregunta[]>([]);
  const [posicion, setPosicion] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [mejor, setMejor] = useState<number>(leerMejor);
  const [nuevoRecord, setNuevoRecord] = useState(false);

  const actual = partida[posicion];
  const pregunta = actual?.pregunta;
  const opciones = useMemo(() => actual?.opciones ?? [], [actual]);

  const empezar = useCallback(() => {
    const elegidas = barajar(preguntasJuego).slice(
      0,
      Math.min(TOTAL, preguntasJuego.length),
    );
    const ronda = elegidas.map((preguntaElegida) => ({
      pregunta: preguntaElegida,
      opciones: barajar(preguntaElegida.opciones),
    }));

    setPartida(ronda);
    setPosicion(0);
    setSeleccion(null);
    setRespondida(false);
    setPuntos(0);
    setNuevoRecord(false);
    setFase('jugando');
  }, []);

  const responder = useCallback(
    (opcionId: string) => {
      if (respondida || !pregunta) {
        return;
      }
      setSeleccion(opcionId);
      setRespondida(true);
      if (opcionId === pregunta.correctaId) {
        setPuntos((valor) => valor + 1);
      }
    },
    [respondida, pregunta],
  );

  const siguiente = useCallback(() => {
    if (!respondida) {
      return;
    }

    if (posicion >= TOTAL - 1) {
      const supera = puntos > mejor;
      setNuevoRecord(supera);
      if (supera) {
        setMejor(puntos);
        guardarMejor(puntos);
      }
      setFase('resultado');
      return;
    }

    setPosicion((valor) => valor + 1);
    setSeleccion(null);
    setRespondida(false);
  }, [respondida, posicion, puntos, mejor]);

  useEffect(() => {
    if (fase !== 'jugando') {
      return;
    }

    const alPulsar = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const numero = Number.parseInt(event.key, 10);
      if (numero >= 1 && numero <= 4) {
        if (!respondida && pregunta && numero <= opciones.length) {
          event.preventDefault();
          const opcion = opciones[numero - 1];
          if (opcion) {
            responder(opcion.id);
          }
        }
        return;
      }

      if (event.key === 'Enter' && respondida) {
        event.preventDefault();
        siguiente();
      }
    };

    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [fase, respondida, pregunta, opciones, responder, siguiente]);

  const esCorrecta = seleccion !== null && seleccion === pregunta?.correctaId;
  const indiceCorrecto = opciones.findIndex(
    (opcion) => opcion.id === pregunta?.correctaId,
  );
  const letraCorrecta =
    indiceCorrecto >= 0 ? (letrasOpciones[indiceCorrecto] ?? '') : '';
  const feedback = !respondida
    ? juegoContenido.invitacion
    : esCorrecta
      ? (pregunta?.feedback ?? '')
      : `${juegoContenido.incorrecta} ${juegoContenido.respuestaEra} ${letraCorrecta}. ${
          pregunta?.feedback ?? ''
        }`;

  const mensajeResultado =
    juegoContenido.resultado.mensajes.find((item) => puntos >= item.minimo) ??
    juegoContenido.resultado.mensajes[
      juegoContenido.resultado.mensajes.length - 1
    ];
  const progreso = ((posicion + 1) / TOTAL) * 100;

  return (
    <section
      id={juegoContenido.id}
      className={`${styles.panel} animar-entrada`}
      aria-labelledby="titulo-juego"
    >
      <PanelHeader
        icon={<Gamepad2 size={20} />}
        title={juegoContenido.titulo}
        titleId="titulo-juego"
      />

      <div className={styles.contenido}>
        {fase === 'inicio' && (
          <div className={styles.inicio}>
            <div className={styles.inicioInfo}>
              <span className={styles.inicioIcono} aria-hidden="true">
                <Gamepad2 size={30} />
              </span>
              <h3>{juegoContenido.inicio.titulo}</h3>
              <p>{juegoContenido.inicio.texto}</p>
              <ul className={styles.detalles}>
                {juegoContenido.inicio.detalles.map((detalle) => (
                  <li key={detalle}>
                    <PawPrint size={14} aria-hidden="true" />
                    {detalle}
                  </li>
                ))}
              </ul>
              <p className={styles.mejor}>
                <Trophy size={17} aria-hidden="true" />
                <span>
                  {juegoContenido.inicio.mejor}:{' '}
                  <strong>
                    {mejor > 0
                      ? `${mejor} / ${TOTAL}`
                      : juegoContenido.inicio.sinMejor}
                  </strong>
                </span>
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={empezar}
                aria-label={juegoContenido.inicio.ariaBoton}
                icon={<Gamepad2 size={18} aria-hidden="true" />}
                className={styles.botonEmpezar}
              >
                {juegoContenido.inicio.boton}
              </Button>
            </div>

            <div className={styles.inicioConejo}>
              <RabbitVisual
                mode={rabbitMode}
                variant="quiz"
                alt={juegoContenido.ariaImagen}
                animation="saludo"
                model={imagenes.modelos.conejoCorre}
                autoRotate
              />
            </div>
          </div>
        )}

        {fase === 'jugando' && pregunta && (
          <div className={styles.cuerpo}>
            <div className={styles.columna}>
              <div className={styles.progresoCabecera}>
                <p className={styles.progreso}>
                  <Info size={14} aria-hidden="true" />
                  <span>
                    {juegoContenido.preguntaPrefijo} {posicion + 1}{' '}
                    {juegoContenido.preguntaDe} {TOTAL}
                  </span>
                </p>
                <span
                  className={styles.puntos}
                  aria-label={juegoContenido.ariaPuntos}
                >
                  <PawPrint size={15} aria-hidden="true" />
                  {juegoContenido.puntos}: {puntos}/{TOTAL}
                </span>
              </div>

              <div
                className={styles.barra}
                role="progressbar"
                aria-label={juegoContenido.ariaBarra}
                aria-valuemin={1}
                aria-valuemax={TOTAL}
                aria-valuenow={posicion + 1}
              >
                <span style={{ width: `${progreso}%` }} />
              </div>

              <h3 className={styles.pregunta} id="juego-pregunta">
                {pregunta.pregunta}
              </h3>

              <div
                className={styles.opciones}
                role="group"
                aria-label={juegoContenido.opcionesAria}
              >
                {opciones.map((opcion, opcionIndice) => {
                  const esLaCorrecta = opcion.id === pregunta.correctaId;
                  const esLaElegida = opcion.id === seleccion;
                  const estado = respondida
                    ? esLaCorrecta
                      ? styles.correcta
                      : esLaElegida
                        ? styles.incorrecta
                        : undefined
                    : undefined;

                  return (
                    <button
                      key={opcion.id}
                      type="button"
                      className={`${styles.opcion} ${estado ?? ''}`}
                      onClick={() => responder(opcion.id)}
                      disabled={respondida}
                      aria-label={`${letrasOpciones[opcionIndice] ?? ''}. ${opcion.texto}`}
                      aria-pressed={esLaElegida}
                      aria-keyshortcuts={String(opcionIndice + 1)}
                    >
                      <span className={styles.letra} aria-hidden="true">
                        {letrasOpciones[opcionIndice]}
                      </span>
                      <span className={styles.opcionTexto}>{opcion.texto}</span>
                      <span className={styles.tecla} aria-hidden="true">
                        {opcionIndice + 1}
                      </span>
                      {respondida && esLaCorrecta && (
                        <Check
                          size={18}
                          className={styles.marca}
                          aria-label={juegoContenido.respuestaCorrecta}
                        />
                      )}
                      {respondida && esLaElegida && !esLaCorrecta && (
                        <X
                          size={18}
                          className={styles.marca}
                          aria-label={juegoContenido.respuestaIncorrecta}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {respondida && (
                <FuenteDato
                  estadoVerificacion={pregunta.estadoVerificacion}
                  fuentes={pregunta.fuentes}
                  compacto
                  className={styles.fuentePregunta}
                />
              )}

              <p className={styles.teclado}>{juegoContenido.teclado}</p>

              <div className={styles.pie}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={siguiente}
                  disabled={!respondida}
                  iconRight={<ChevronRight size={17} aria-hidden="true" />}
                  className={styles.siguiente}
                >
                  {posicion >= TOTAL - 1
                    ? juegoContenido.verResultados
                    : juegoContenido.siguiente}
                </Button>
              </div>
            </div>

            <div className={styles.columnaConejo}>
              <div
                className={`${styles.globo} ${
                  respondida
                    ? esCorrecta
                      ? styles.globoCorrecto
                      : styles.globoIncorrecto
                    : ''
                }`}
                role="status"
                aria-live="polite"
                aria-label={juegoContenido.ariaGlobo}
              >
                {feedback}
              </div>
              <div className={styles.conejo}>
                <RabbitVisual
                  mode={rabbitMode}
                  variant="quiz"
                  alt={juegoContenido.ariaImagen}
                  animation="saludo"
                  model={imagenes.modelos.conejoCorre}
                autoRotate
                />
              </div>
            </div>
          </div>
        )}

        {fase === 'resultado' && (
          <div className={styles.resultado} aria-live="polite">
            <span className={styles.resultadoIcono} aria-hidden="true">
              <Trophy size={32} />
            </span>
            <h3>{juegoContenido.resultado.titulo}</h3>
            <p className={styles.puntajeFinal}>
              {puntos} <span>/ {TOTAL}</span>
            </p>
            <p className={styles.puntajeEtiqueta}>
              {juegoContenido.resultado.aciertos}
            </p>

            {nuevoRecord ? (
              <p className={styles.record}>
                <Trophy size={16} aria-hidden="true" />
                {juegoContenido.resultado.nuevoRecord}
              </p>
            ) : (
              <p className={styles.mejorResultado}>
                {juegoContenido.resultado.mejor}: {mejor} / {TOTAL}
              </p>
            )}

            <p className={styles.mensaje}>{mensajeResultado.titulo}</p>
            <p>{mensajeResultado.texto}</p>

            <div className={styles.acciones}>
              <Button
                variant="primary"
                size="md"
                onClick={empezar}
                icon={<Gamepad2 size={17} aria-hidden="true" />}
              >
                {juegoContenido.jugarDeNuevo}
              </Button>
              <Link to="/recursos" className={styles.enlaceBoton}>
                <FolderOpen size={17} aria-hidden="true" />
                <span>{juegoContenido.verRecursos}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
