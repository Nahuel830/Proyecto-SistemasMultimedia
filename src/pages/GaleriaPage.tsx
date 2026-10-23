import { PagePlaceholder } from '../components/PagePlaceholder';
import { paginasPlaceholder } from '../data/contenido';

export function GaleriaPage() {
  const pagina = paginasPlaceholder.galeria;
  return (
    <PagePlaceholder
      eyebrow={pagina.eyebrow}
      title={pagina.titulo}
      description={pagina.descripcion}
      icon={pagina.icono}
    />
  );
}
