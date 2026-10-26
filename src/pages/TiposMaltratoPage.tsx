import { TriangleAlert } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { tiposPagina } from '../data/tipos';
import { MarcoLegal } from '../modules/tipos/MarcoLegal';
import { TiposMaltrato } from '../modules/tipos/TiposMaltrato';
import styles from './Pagina.module.css';

export function TiposMaltratoPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <PageHero
        titleId="tipos-pagina-titulo"
        eyebrow={tiposPagina.eyebrow}
        title={tiposPagina.titulo}
        subtitle={tiposPagina.subtitulo}
        frase={tiposPagina.frase}
        icon={<TriangleAlert size={36} />}
      />

      <div className={styles.bloque}>
        <TiposMaltrato />
      </div>

      <div className={styles.bloque}>
        <MarcoLegal />
      </div>
    </div>
  );
}
