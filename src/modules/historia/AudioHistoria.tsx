import { Pause, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/primitives/Button';
import { audioHistoria } from '../../data/historia';
import { imagenes } from '../../data/imagenes';
import styles from './AudioHistoria.module.css';

export function AudioHistoria() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [errorAudio, setErrorAudio] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const alTerminar = () => setReproduciendo(false);
    const alPausar = () => setReproduciendo(false);
    const alReproducir = () => setReproduciendo(true);

    audio.addEventListener('ended', alTerminar);
    audio.addEventListener('pause', alPausar);
    audio.addEventListener('play', alReproducir);

    return () => {
      audio.removeEventListener('ended', alTerminar);
      audio.removeEventListener('pause', alPausar);
      audio.removeEventListener('play', alReproducir);
    };
  }, []);

  const alternarAudio = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (reproduciendo) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      setErrorAudio(false);
    } catch {
      setErrorAudio(true);
    }
  };

  return (
    <div className={styles.wrap}>
      <Button
        variant="outline"
        size="sm"
        icon={
          reproduciendo ? (
            <Pause size={16} aria-hidden="true" />
          ) : (
            <Volume2 size={16} aria-hidden="true" />
          )
        }
        onClick={alternarAudio}
        aria-label={audioHistoria.aria}
        aria-pressed={reproduciendo}
      >
        {reproduciendo ? audioHistoria.botonActivo : audioHistoria.boton}
      </Button>

      <audio ref={audioRef} src={imagenes.audio} preload="metadata" />

      {errorAudio && (
        <p className={styles.error} role="status">
          {audioHistoria.error}
        </p>
      )}
    </div>
  );
}
