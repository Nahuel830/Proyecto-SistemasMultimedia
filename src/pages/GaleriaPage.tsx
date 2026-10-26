import { Images } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { galeriaPagina } from '../data/galeria';
import { Galeria } from '../modules/galeria/Galeria';
import styles from './Pagina.module.css';

export function GaleriaPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <PageHero
        titleId="galeria-pagina-titulo"
        eyebrow={galeriaPagina.eyebrow}
        title={galeriaPagina.titulo}
        subtitle={galeriaPagina.subtitulo}
        frase={galeriaPagina.frase}
        icon={<Images size={36} />}
      />

      <div className={styles.bloque}>
        <Galeria />
      </div>
    </div>
  );
}
