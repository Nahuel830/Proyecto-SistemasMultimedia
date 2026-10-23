import clsx from 'clsx';
import { lazy, Suspense } from 'react';
import { imagenes } from '../data/imagenes';
import type { ModoConejo } from '../data/types';
import { CanvasFallback } from './three/CanvasFallback';
import styles from './RabbitVisual.module.css';

const ModelViewer = lazy(() =>
  import('./three/ModelViewer').then((module) => ({
    default: module.ModelViewer,
  })),
);

type VarianteConejo = 'heroe' | 'panel' | 'quiz';

interface RabbitVisualProps {
  readonly mode: ModoConejo;
  readonly variant?: VarianteConejo;
  readonly alt?: string;
  readonly className?: string;
  readonly eager?: boolean;
  readonly autoRotate?: boolean;
  readonly animation?: string;
}

const fuentes: Record<VarianteConejo, string> = {
  heroe: imagenes.conejos.heroe,
  panel: imagenes.conejos.panel,
  quiz: imagenes.conejos.quiz,
};

const alts: Record<VarianteConejo, string> = {
  heroe: 'Conejo blanco con camisa y chaleco, de pie en un bosque',
  panel: 'Conejo blanco con mirada serena',
  quiz: 'Conejo sonriente que acompaña el quiz',
};

export function RabbitVisual({
  mode,
  variant = 'heroe',
  alt = alts[variant],
  className,
  eager = false,
  autoRotate = false,
  animation,
}: RabbitVisualProps) {
  if (mode === '3d') {
    return (
      <div className={clsx(styles.visual, styles[variant], className)}>
        <Suspense
          fallback={<CanvasFallback alt={alt} mostrarAviso={false} />}
        >
          <ModelViewer
            src={imagenes.modelo}
            alt={alt}
            autoRotate={autoRotate}
            animation={animation}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={clsx(styles.visual, styles[variant], className)}>
      <img
        src={fuentes[variant]}
        alt={alt}
        className={styles.imagen}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
