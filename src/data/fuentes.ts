export type TipoFuente =
  | 'norma'
  | 'institucional'
  | 'prensa'
  | 'directorio';

export type EstadoVerificacion =
  | 'verificado'
  | 'fuente-asignada'
  | 'discrepancia'
  | 'sin-verificar';

export interface Fuente {
  readonly id: string;
  readonly titulo: string;
  readonly url: string;
  readonly tipo: TipoFuente;
  readonly fechaFuente?: string;
  readonly fechaConsulta: string;
}

const FECHA_CONSULTA = '2026-10-26';

export const fuentes = {
  'ley700-pl': {
    id: 'ley700-pl',
    titulo:
      'Proyecto de Ley 436/2023-2024: reforma de la Ley 700 (Cámara de Diputados)',
    url: 'https://diputados.gob.bo/wp-content/uploads/2024/06/PL-436-2023-2024.pdf',
    tipo: 'norma',
    fechaFuente: '2024',
    fechaConsulta: FECHA_CONSULTA,
  },
  gaceta: {
    id: 'gaceta',
    titulo: 'Gaceta Oficial de Bolivia',
    url: 'http://www.gacetaoficialdebolivia.gob.bo/',
    tipo: 'institucional',
    fechaConsulta: FECHA_CONSULTA,
  },
  'regensa-bienestar': {
    id: 'regensa-bienestar',
    titulo: 'REGENSA, Capítulo 1.3 Bienestar Animal (SENASAG)',
    url: 'https://www.senasag.gob.bo/index.php/tramites-y-servicios/convocatorias/regensa-en-linea/459-capitulo-1-3-bienestar-animal',
    tipo: 'norma',
    fechaConsulta: FECHA_CONSULTA,
  },
  'regensa-remates': {
    id: 'regensa-remates',
    titulo: 'REGENSA: Reglamento Nacional de Remates y Faena (SENASAG)',
    url: 'https://www.senasag.gob.bo/index.php/institucional/unidades-nacionales/administracion/area-nacional-de-recursos-humano/category/25-consulta-publica?download=1884:reglamento-nacional&start=20',
    tipo: 'norma',
    fechaConsulta: FECHA_CONSULTA,
  },
  can833: {
    id: 'can833',
    titulo:
      'Decisión 833 de la Comunidad Andina: armonización en materia de productos cosméticos',
    url: 'http://www.sice.oas.org/trade/JUNAC/Decisiones/DEC833_s.pdf',
    tipo: 'norma',
    fechaConsulta: FECHA_CONSULTA,
  },
  'pofoma-linea': {
    id: 'pofoma-linea',
    titulo: 'POFOMA: línea gratuita 800 14 0303 (El Alto)',
    url: 'https://elalto.gob.bo/noticias/?p=24343',
    tipo: 'institucional',
    fechaConsulta: FECHA_CONSULTA,
  },
  'pofoma-cbba': {
    id: 'pofoma-cbba',
    titulo:
      'Opinión: 14 policías forestales atienden denuncias en toda Cochabamba',
    url: 'https://www.opinion.com.bo/cochabamba/14-policias-forestales-atienden-denuncias-toda-cochabamba/20200104190108744300.html',
    tipo: 'prensa',
    fechaFuente: '2020-01-04',
    fechaConsulta: FECHA_CONSULTA,
  },
  'refugio-esperanza': {
    id: 'refugio-esperanza',
    titulo: 'Refugio Esperanza Bolivia: sitio oficial',
    url: 'https://refugioesperanzabolivia.com/',
    tipo: 'institucional',
    fechaConsulta: FECHA_CONSULTA,
  },
  spat: {
    id: 'spat',
    titulo:
      'InfoTarija: SPAT hace conocer las líneas telefónicas para denunciar maltrato animal',
    url: 'https://www.infotarija.com/noticias/tarija-spat-hace-conocer-las-lineas-telefonicas-para-denunciar-maltrato-animal-318',
    tipo: 'prensa',
    fechaConsulta: FECHA_CONSULTA,
  },
  'animales-sos': {
    id: 'animales-sos',
    titulo: 'Todos Negocios: Animales SOS Bolivia (directorio)',
    url: 'https://bo.todosnegocios.com/animales-s-o-s-bolivia-77229500',
    tipo: 'directorio',
    fechaConsulta: FECHA_CONSULTA,
  },
} as const satisfies Record<string, Fuente>;

export type FuenteId = keyof typeof fuentes;

export function obtenerFuente(id: string): Fuente | undefined {
  return id in fuentes ? fuentes[id as FuenteId] : undefined;
}
