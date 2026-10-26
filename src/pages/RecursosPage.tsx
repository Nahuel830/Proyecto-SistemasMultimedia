import { FolderOpen } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { recursosPagina } from '../data/recursos';
import { AyudaRecursos } from '../modules/ayuda/AyudaRecursos';
import styles from './Pagina.module.css';

export function RecursosPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <PageHero
        titleId="recursos-pagina-titulo"
        eyebrow={recursosPagina.eyebrow}
        title={recursosPagina.titulo}
        subtitle={recursosPagina.subtitulo}
        frase={recursosPagina.frase}
        icon={<FolderOpen size={36} />}
      />

      <div className={styles.bloque}>
        <AyudaRecursos />
      </div>
    </div>
  );
}
