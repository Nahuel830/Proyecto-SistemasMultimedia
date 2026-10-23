import {
  Check,
  ChevronRight,
  Gamepad2,
  Info,
  PawPrint,
  RotateCcw,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { PanelHeader } from '../../components/primitives/PanelHeader';
import { RabbitVisual } from '../../components/RabbitVisual';
import { Button } from '../../components/primitives/Button';
import { configuracion, juegoContenido } from '../../data/contenido';
import {
  letrasOpciones,
  preguntasJuego,
} from '../../data/preguntasJuego';
import type { ModoConejo } from '../../data/types';
import styles from './JuegoQuiz.module.css';

interface JuegoQuizProps {
  readonly rabbitMode?: ModoConejo;
}

export function JuegoQuiz({ rabbitMode = configuracion.modoConejo }: JuegoQuizProps) {
  const total = preguntasJuego.length;
  const [indice, setIndice] = useState<number>(juegoContenido.inicial.indice);
  const [puntos, setPuntos] = useState<number>(juegoContenido.inicial.puntos);
  const [seleccion, setSeleccion] = useState<number | null>(
    juegoContenido.inicial.indice === 1 ? 1 : null,
  );
  const [respondida, setRespondida] = useState(
    juegoContenido.inicial.indice === 1,
  );
  const [terminado, setTerminado] = useState(false);

  const pregunta = preguntasJuego[indice];

  const reiniciar = () => {
    setIndice(0);
    setPuntos(0);
    setSeleccion(null);
    setRespondida(false);
    setTerminado(false);
  };

  const responder = (opcion: number) => {
    if (respondida || !pregunta) {
      return;
    }

    setSeleccion(opcion);
    setRespondida(true);
    if (opcion === pregunta.correcta) {
      setPuntos((valor) => Math.min(total, valor + 1));
    }
  };

  const siguiente = () => {
    if (!respondida) {
      return;
    }

    if (indice >= total - 1) {
      setTerminado(true);
      return;
    }

    setIndice((valor) => valor + 1);
    setSeleccion(null);
    setRespondida(false);
  };

  if (!pregunta) {
    return null;
  }

  const esCorrecta = seleccion === pregunta.correcta;
  const feedback = !respondida
    ? juegoContenido.invitacion
    : esCorrecta
      ? pregunta.feedback
      : `${juegoContenido.incorrecta} ${juegoContenido.respuestaEra} ${
          letrasOpciones[pregunta.correcta] ?? ''
        }.`;

  return (
    <section
      id={juegoContenido.id}
      className={`${styles.panel} animar-entrada animar-retraso-1`}
      aria-labelledby="titulo-juego"
    >
      <PanelHeader
        icon={<Gamepad2 size={20} />}
        title={juegoContenido.titulo}
        titleId="titulo-juego"
      >
        <button
          type="button"
          className={styles.reiniciar}
          aria-label={juegoContenido.reiniciarAria}
          onClick={reiniciar}
        >
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </PanelHeader>

      <div className={styles.contenido}>
        {terminado ? (
          <div className={styles.resultado} aria-live="polite">
            <span className={styles.resultadoIcono} aria-hidden="true">
              <PawPrint size={28} />
            </span>
            <h3>{juegoContenido.resultadoTitulo}</h3>
            <p>{juegoContenido.resultadoTexto}</p>
            <strong className={styles.puntajeFinal}>
              {puntos} / {total}
            </strong>
            <Button variant="mint" size="sm" onClick={reiniciar}>
              {juegoContenido.resultadoAccion}
            </Button>
          </div>
        ) : (
          <div className={styles.cuerpo}>
            <div className={styles.columna}>
              <p className={styles.progreso}>
                <Info size={13} aria-hidden="true" />
                <span>
                  {juegoContenido.preguntaPrefijo} {indice + 1}{' '}
                  {juegoContenido.preguntaDe} {total}
                </span>
              </p>

              <h3 className={styles.pregunta}>{pregunta.pregunta}</h3>

              <div
                className={styles.opciones}
                role="group"
                aria-label={juegoContenido.opcionesAria}
              >
                {pregunta.opciones.map((opcion, opcionIndice) => {
                  const esLaCorrecta = opcionIndice === pregunta.correcta;
                  const esLaElegida = opcionIndice === seleccion;
                  const estado = respondida
                    ? esLaCorrecta
                      ? styles.correcta
                      : esLaElegida
                        ? styles.incorrecta
                        : undefined
                    : undefined;

                  return (
                    <button
                      key={opcion}
                      type="button"
                      className={`${styles.opcion} ${estado ?? ''}`}
                      onClick={() => responder(opcionIndice)}
                      disabled={respondida}
                      aria-label={`${letrasOpciones[opcionIndice] ?? ''}. ${opcion}`}
                      aria-pressed={esLaElegida}
                    >
                      <span className={styles.letra} aria-hidden="true">
                        {letrasOpciones[opcionIndice]}
                      </span>
                      <span className={styles.opcionTexto}>{opcion}</span>
                      {respondida && esLaCorrecta && (
                        <Check
                          size={14}
                          className={styles.marca}
                          aria-label={juegoContenido.respuestaCorrecta}
                        />
                      )}
                      {respondida && esLaElegida && !esLaCorrecta && (
                        <X
                          size={14}
                          className={styles.marca}
                          aria-label={juegoContenido.respuestaIncorrecta}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className={styles.pie}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={siguiente}
                  disabled={!respondida}
                  iconRight={<ChevronRight size={15} aria-hidden="true" />}
                  className={styles.siguiente}
                >
                  {juegoContenido.siguiente}
                </Button>

                <span className={styles.puntos} aria-label={juegoContenido.ariaPuntos}>
                  <PawPrint size={15} aria-hidden="true" />
                  {juegoContenido.puntos}: {puntos}/{total}
                </span>
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
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
