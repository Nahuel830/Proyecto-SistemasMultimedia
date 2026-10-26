import { FolderOpen } from 'lucide-react';
import { TeaserCard } from '../../components/primitives/TeaserCard';
import { iconosRecursos } from '../../components/iconos';
import { recursosPagina } from '../../data/recursos';
import styles from './RecursosTeaser.module.css';

export function RecursosTeaser() {
  return (
    <TeaserCard
      titleId="titulo-recursos-teaser"
      icon={<FolderOpen size={19} />}
      title={recursosPagina.teaser.titulo}
      text={recursosPagina.teaser.texto}
      to="/recursos"
      cta={recursosPagina.teaser.boton}
      ctaAria={recursosPagina.teaser.aria}
      className="animar-entrada animar-retraso-3"
    >
      <ul className={styles.accesos}>
        {recursosPagina.accesos.map((acceso) => {
          const Icono = iconosRecursos[acceso.icono];

          return (
            <li key={acceso.id}>
              <span className={styles.icono} aria-hidden="true">
                <Icono size={16} />
              </span>
              <span className={styles.etiqueta}>{acceso.etiqueta}</span>
            </li>
          );
        })}
      </ul>
    </TeaserCard>
  );
}
