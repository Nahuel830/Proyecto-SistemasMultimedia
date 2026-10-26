import { ChartBar } from 'lucide-react';
import { TeaserCard } from '../../components/primitives/TeaserCard';
import {
  cifrasBolivia,
  estadisticasPagina,
} from '../../data/estadisticas';
import styles from './EstadisticasTeaser.module.css';

const biocidios = cifrasBolivia.find((cifra) => cifra.id === 'biocidios');

export function EstadisticasTeaser() {
  return (
    <TeaserCard
      titleId="titulo-estadisticas-teaser"
      icon={<ChartBar size={20} />}
      title={estadisticasPagina.teaser.titulo}
      text={estadisticasPagina.teaser.texto}
      to="/estadisticas"
      cta={estadisticasPagina.teaser.boton}
      ctaAria={estadisticasPagina.teaser.aria}
      className="animar-entrada animar-retraso-1"
    >
      <div className={styles.vista}>
        <p className={styles.valor}>{biocidios?.valor ?? '87'}</p>
        <p className={styles.etiqueta}>{estadisticasPagina.teaser.etiqueta}</p>
        <p className={styles.detalle}>{estadisticasPagina.teaser.detalle}</p>
      </div>
    </TeaserCard>
  );
}
