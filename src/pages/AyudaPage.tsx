import { PagePlaceholder } from '../components/PagePlaceholder';
import { paginasPlaceholder } from '../data/contenido';

export function AyudaPage() {
  const pagina = paginasPlaceholder.ayuda;
  return (
    <PagePlaceholder
      eyebrow={pagina.eyebrow}
      title={pagina.titulo}
      description={pagina.descripcion}
      icon={pagina.icono}
    />
  );
}
