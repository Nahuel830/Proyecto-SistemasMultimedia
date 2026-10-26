import { Gamepad2 } from 'lucide-react';
import { TeaserCard } from '../../components/primitives/TeaserCard';
import {
  juegoPagina,
  letrasOpciones,
  preguntasJuego,
} from '../../data/preguntasJuego';
import styles from './JuegoTeaser.module.css';

const muestra = preguntasJuego[0];

export function JuegoTeaser() {
  return (
    <TeaserCard
      titleId="titulo-juego-teaser"
      icon={<Gamepad2 size={20} />}
      title={juegoPagina.titulo}
      text={juegoPagina.teaser.texto}
      to="/juego"
      cta={juegoPagina.teaser.boton}
      ctaAria={juegoPagina.teaser.aria}
      className="animar-entrada animar-retraso-1"
    >
      <div className={styles.vista}>
        {muestra && (
          <>
            <p className={styles.pregunta}>{muestra.pregunta}</p>
            <ul className={styles.opciones}>
              {muestra.opciones.slice(0, 3).map((opcion, opcionIndice) => (
                <li
                  key={opcion.id}
                  className={opcionIndice === 0 ? styles.activa : undefined}
                >
                  <span className={styles.letra} aria-hidden="true">
                    {letrasOpciones[opcionIndice]}
                  </span>
                  <span className={styles.texto}>{opcion.texto}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </TeaserCard>
  );
}
