import { Images } from 'lucide-react';
import { TeaserCard } from '../../components/primitives/TeaserCard';
import { galeriaItems, galeriaPagina } from '../../data/galeria';
import styles from './GaleriaTeaser.module.css';

const muestra = galeriaItems.slice(0, 4);

export function GaleriaTeaser() {
  return (
    <TeaserCard
      titleId="titulo-galeria-teaser"
      icon={<Images size={19} />}
      title={galeriaPagina.titulo}
      text={galeriaPagina.teaser.texto}
      to="/galeria"
      cta={galeriaPagina.teaser.boton}
      ctaAria={galeriaPagina.teaser.aria}
      className="animar-entrada animar-retraso-2"
    >
      <div className={styles.mosaico}>
        {muestra.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </TeaserCard>
  );
}
