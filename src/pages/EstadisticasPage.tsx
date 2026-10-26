import { ChartBar } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { estadisticasPagina } from '../data/estadisticas';
import { Estadisticas } from '../modules/estadisticas/Estadisticas';
import styles from './Pagina.module.css';

export function EstadisticasPage() {
  return (
    <div className={`${styles.pagina} contenedor`}>
      <PageHero
        titleId="estadisticas-pagina-titulo"
        eyebrow={estadisticasPagina.eyebrow}
        title={estadisticasPagina.titulo}
        subtitle={estadisticasPagina.subtitulo}
        frase={estadisticasPagina.frase}
        icon={<ChartBar size={36} />}
      />

      <div className={styles.bloque}>
        <Estadisticas />
      </div>
    </div>
  );
}
