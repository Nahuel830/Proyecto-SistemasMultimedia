import clsx from 'clsx';
import {
  Link2,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { fuenteDato } from '../../data/contenido';
import {
  obtenerFuente,
  type EstadoVerificacion,
  type Fuente,
} from '../../data/fuentes';
import styles from './FuenteDato.module.css';

interface FuenteDatoProps {
  readonly estadoVerificacion: EstadoVerificacion;
  readonly fuentes: readonly string[];
  readonly compacto?: boolean;
  readonly className?: string;
}

interface PresentacionEstado {
  readonly etiqueta: string;
  readonly Icono: LucideIcon;
  readonly clase: string;
}

const presentaciones: Record<EstadoVerificacion, PresentacionEstado> = {
  verificado: {
    etiqueta: fuenteDato.verificado,
    Icono: ShieldCheck,
    clase: styles.ok,
  },
  'fuente-asignada': {
    etiqueta: fuenteDato.fuenteAsignada,
    Icono: Link2,
    clase: styles.asignada,
  },
  discrepancia: {
    etiqueta: fuenteDato.enRevision,
    Icono: ShieldAlert,
    clase: styles.revision,
  },
  'sin-verificar': {
    etiqueta: fuenteDato.sinVerificar,
    Icono: ShieldAlert,
    clase: styles.pendiente,
  },
};

function esFuente(fuente: Fuente | undefined): fuente is Fuente {
  return fuente !== undefined;
}

export function FuenteDato({
  estadoVerificacion,
  fuentes,
  compacto = false,
  className,
}: FuenteDatoProps) {
  const { etiqueta, Icono, clase } = presentaciones[estadoVerificacion];
  const enlaces = fuentes.map(obtenerFuente).filter(esFuente);
  const prefijo =
    enlaces.length > 1 ? fuenteDato.prefijoPlural : fuenteDato.prefijo;

  return (
    <p
      className={clsx(
        styles.fuente,
        compacto && styles.compacto,
        className,
      )}
    >
      <span className={clsx(styles.estado, clase)}>
        <Icono size={12} aria-hidden="true" />
        {etiqueta}
      </span>
      {enlaces.length > 0 && (
        <span className={styles.texto}>
          {prefijo}{' '}
          {enlaces.map((fuente, indice) => (
            <span key={fuente.id}>
              {indice > 0 && fuenteDato.separador}
              <a
                href={fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${fuente.titulo} · ${fuente.tipo}`}
              >
                {fuente.titulo}
              </a>
            </span>
          ))}
        </span>
      )}
    </p>
  );
}
