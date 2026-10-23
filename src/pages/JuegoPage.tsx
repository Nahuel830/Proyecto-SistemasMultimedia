import { PagePlaceholder } from '../components/PagePlaceholder';
import { paginasPlaceholder } from '../data/contenido';

export function JuegoPage() {
  const pagina = paginasPlaceholder.juego;
  return (
    <PagePlaceholder
      eyebrow={pagina.eyebrow}
      title={pagina.titulo}
      description={pagina.descripcion}
      icon={pagina.icono}
    />
  );
}
