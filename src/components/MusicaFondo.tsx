import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';
import { musicaFondo } from '../audio/musicaFondo';
import styles from './MusicaFondo.module.css';

export function MusicaFondo() {
  const estado = useSyncExternalStore(musicaFondo.suscribir, musicaFondo.obtener);

  useEffect(() => {
    musicaFondo.iniciar();
  }, []);

  const encendida = estado.deseada;
  const texto = !encendida
    ? 'Música apagada'
    : estado.porVideo
      ? 'Música en pausa (video)'
      : estado.bloqueada
        ? 'Toca para activar la música'
        : 'Música de fondo';

  return (
    <button
      type="button"
      className={styles.boton}
      onClick={musicaFondo.alternar}
      aria-pressed={encendida}
      aria-label={encendida ? 'Apagar la música de fondo' : 'Encender la música de fondo'}
    >
      {encendida ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
      <span className={styles.texto}>{texto}</span>
    </button>
  );
}
