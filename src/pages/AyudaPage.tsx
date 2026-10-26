import { HeartHandshake } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ayudaPagina } from '../data/recursos';
import { AyudaRecursos } from '../modules/ayuda/AyudaRecursos';
import styles from './Pagina.module.css';

export function AyudaPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <PageHero
        titleId="ayuda-pagina-titulo"
        eyebrow={ayudaPagina.eyebrow}
        title={ayudaPagina.titulo}
        subtitle={ayudaPagina.subtitulo}
        frase={ayudaPagina.frase}
        icon={<HeartHandshake size={36} />}
      />

      <div className={styles.bloque}>
        <AyudaRecursos mostrarGuias={false} />
      </div>
    </div>
  );
}
