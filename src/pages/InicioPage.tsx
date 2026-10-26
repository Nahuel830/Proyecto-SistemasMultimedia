import { configuracion } from '../data/contenido';
import { Hero } from '../modules/hero/Hero';
import { Estadisticas } from '../modules/estadisticas/Estadisticas';
import { TiposMaltrato } from '../modules/tipos/TiposMaltrato';
import { FraseConejo } from '../modules/frase/FraseConejo';
import { HistoriaTarjeta } from '../modules/historia/HistoriaTarjeta';
import { JuegoTeaser } from '../modules/juego/JuegoTeaser';
import { GaleriaTeaser } from '../modules/galeria/GaleriaTeaser';
import { RecursosTeaser } from '../modules/ayuda/RecursosTeaser';
import styles from './InicioPage.module.css';

export function InicioPage() {
  return (
    <div id="inicio" className={`${styles.pagina} contenedor`}>
      <div className={styles.superior}>
        <Hero rabbitMode={configuracion.modoConejo} />
        <Estadisticas />
        <TiposMaltrato />
        <FraseConejo rabbitMode={configuracion.modoConejo} />
      </div>

      <div className={styles.inferior}>
        <HistoriaTarjeta />
        <JuegoTeaser />
        <GaleriaTeaser />
        <RecursosTeaser />
      </div>
    </div>
  );
}
