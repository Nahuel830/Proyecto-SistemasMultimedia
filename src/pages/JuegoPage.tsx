import { Gamepad2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { configuracion } from '../data/contenido';
import { juegoPagina } from '../data/preguntasJuego';
import { JuegoQuiz } from '../modules/juego/JuegoQuiz';
import RunnerGame from '../modules/juego/RunnerGame';
import styles from './Pagina.module.css';

export function JuegoPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <PageHero
        titleId="juego-pagina-titulo"
        eyebrow={juegoPagina.eyebrow}
        title={juegoPagina.titulo}
        subtitle={juegoPagina.subtitulo}
        frase={juegoPagina.frase}
        icon={<Gamepad2 size={36} />}
      />

      <div className={styles.bloque}>
        <JuegoQuiz rabbitMode={configuracion.modoConejo} />
      </div>

      <div className={styles.bloque}>
        <RunnerGame />
      </div>
    </div>
  );
}