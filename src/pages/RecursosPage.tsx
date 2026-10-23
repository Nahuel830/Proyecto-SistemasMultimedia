import { PagePlaceholder } from '../components/PagePlaceholder';
import { paginasPlaceholder } from '../data/contenido';

export function RecursosPage() {
  const pagina = paginasPlaceholder.recursos;
  return (
    <PagePlaceholder
      eyebrow={pagina.eyebrow}
      title={pagina.titulo}
      description={pagina.descripcion}
      icon={pagina.icono}
    />
  );
}
