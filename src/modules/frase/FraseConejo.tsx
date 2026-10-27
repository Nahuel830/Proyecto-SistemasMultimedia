import { PawPrint } from 'lucide-react';
import { RabbitVisual } from '../../components/RabbitVisual';
import { configuracion, fraseContenido } from '../../data/contenido';
import type { ModoConejo } from '../../data/types';
import styles from './FraseConejo.module.css';

interface FraseConejoProps {
  readonly rabbitMode?: ModoConejo;
}

export function FraseConejo({ rabbitMode = configuracion.modoConejo }: FraseConejoProps) {
  return (
    <section
      className={`${styles.panel} animar-entrada animar-retraso-3`}
      aria-labelledby="frase-conejo"
    >
      <div className={styles.fondo} aria-hidden="true" />
      <blockquote id="frase-conejo" className={`${styles.cita} manuscrito`}>
        “{fraseContenido.cita}”
      </blockquote>

      <div className={styles.rabbit}>
        <RabbitVisual
          mode={rabbitMode}
          variant="panel"
          alt={fraseContenido.ariaImagen}
          animation="idle"
          autoRotate
        />
      </div>

      <p className={styles.sello}>
        <PawPrint size={20} aria-hidden="true" />
        <span>{fraseContenido.sello}</span>
      </p>
    </section>
  );
}
