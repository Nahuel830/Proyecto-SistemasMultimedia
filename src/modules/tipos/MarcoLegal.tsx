import { Scale } from 'lucide-react';
import { FuenteDato } from '../../components/primitives/FuenteDato';
import { marcoLegal, marcoLegalPagina } from '../../data/marcoLegal';
import styles from './MarcoLegal.module.css';

export function MarcoLegal() {
  return (
    <section
      className={`${styles.panel} animar-entrada`}
      aria-labelledby="titulo-marco-legal"
    >
      <header className={styles.encabezado}>
        <span className={styles.icono} aria-hidden="true">
          <Scale size={22} />
        </span>
        <div>
          <p className={styles.eyebrow}>{marcoLegalPagina.eyebrow}</p>
          <h2 id="titulo-marco-legal">{marcoLegalPagina.titulo}</h2>
          <p>{marcoLegalPagina.subtitulo}</p>
        </div>
      </header>

      <ul className={styles.lista} aria-label={marcoLegalPagina.aria}>
        {marcoLegal.map((item) => (
          <li key={item.id} className={styles.item}>
            <p className={styles.norma}>{item.norma}</p>
            <h3>{item.titulo}</h3>
            <p>{item.resumen}</p>
            <p className={styles.aplicacion}>
              <strong>{marcoLegalPagina.aplicacionTitulo}:</strong>{' '}
              {item.aplicacion}
            </p>
            <FuenteDato
              fuente={item.fuente}
              verificado={item.verificado}
              compacto
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
