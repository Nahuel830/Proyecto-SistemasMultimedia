import { TriangleAlert } from 'lucide-react';
import { TeaserCard } from '../../components/primitives/TeaserCard';
import { iconosTipos } from '../../components/iconos';
import { tiposMaltrato, tiposPagina } from '../../data/tipos';
import styles from './TiposMaltratoTeaser.module.css';

export function TiposMaltratoTeaser() {
  return (
    <TeaserCard
      titleId="titulo-tipos-teaser"
      icon={<TriangleAlert size={20} />}
      title={tiposPagina.teaser.titulo}
      text={tiposPagina.teaser.texto}
      to="/tipos-de-maltrato"
      cta={tiposPagina.teaser.boton}
      ctaAria={tiposPagina.teaser.aria}
      className="animar-entrada animar-retraso-2"
    >
      <ul className={styles.lista} aria-label={tiposPagina.listaAria}>
        {tiposMaltrato.map((tipo) => {
          const Icono = iconosTipos[tipo.icono];

          return (
            <li key={tipo.id}>
              <span className={styles.icono} aria-hidden="true">
                <Icono size={16} />
              </span>
              <span className={styles.nombre}>{tipo.nombre}</span>
            </li>
          );
        })}
      </ul>
    </TeaserCard>
  );
}
