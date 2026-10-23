import { PagePlaceholder } from '../components/PagePlaceholder';
import { paginasPlaceholder } from '../data/contenido';

export function MiHistoriaPage() {
  const pagina = paginasPlaceholder.miHistoria;
  return (
    <PagePlaceholder
      eyebrow={pagina.eyebrow}
      title={pagina.titulo}
      description={pagina.descripcion}
      icon={pagina.icono}
    />
  );
}
