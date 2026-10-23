import { Link } from 'react-router-dom';
import { placeholderComun } from '../data/contenido';
import type { IconoNavegacion } from '../data/types';
import { Button } from './primitives/Button';
import { EmptyState } from './primitives/EmptyState';
import { iconosNavegacion } from './iconos';

interface PagePlaceholderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconoNavegacion;
}

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  icon,
}: PagePlaceholderProps) {
  const Icono = iconosNavegacion[icon];

  return (
    <EmptyState
      eyebrow={eyebrow}
      title={title}
      description={description}
      icon={<Icono size={35} aria-hidden="true" />}
      action={
        <Link to="/">
          <Button variant="primary" size="md">
            {placeholderComun.volver}
          </Button>
        </Link>
      }
    />
  );
}
