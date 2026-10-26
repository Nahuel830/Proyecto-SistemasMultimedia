import { imagenes } from './imagenes';
import type {
  CifraBolivia,
  DatoAnimal,
  DatoMaltrato,
} from './types';

export const FUENTE_DOSSIER =
  'Dossier Oficial de Datos Reales de Bolivia (POFOMA / Fiscalía, SENASAG, AGEMED)';

const fuenteIlustrativa = {
  ilustrativo: true,
  fuente:
    'Datos ilustrativos del proyecto; no provienen del dossier ni de una fuente oficial.',
  verificado: false,
} as const;

export const cifrasBolivia: readonly CifraBolivia[] = [
  {
    id: 'biocidios',
    valor: '87',
    etiqueta: 'casos de biocidio en Bolivia',
    detalle:
      'Registro 2023 de POFOMA / Fiscalía. Solo 2 casos llegaron a sentencia condenatoria efectiva.',
    icono: 'casos',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'sentencias',
    valor: '2',
    etiqueta: 'sentencias condenatorias efectivas',
    detalle:
      'De los 87 casos de biocidio registrados en Bolivia durante 2023.',
    icono: 'sentencias',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'pena',
    valor: '2 a 5',
    etiqueta: 'años de cárcel',
    detalle:
      'Ley 700, Artículo 350 ter del Código Penal: biocidio y maltrato con sevicia.',
    icono: 'pena',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'senasag',
    valor: 'R.A. 0230/2024',
    etiqueta: 'regulación SENASAG',
    detalle:
      'Aturdimiento humanitario obligatorio y prohibición de picanas y castigos mecánicos en faena.',
    icono: 'norma',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
] as const;

export const datosIlustrativos = {
  maltrato: [
    {
      ...fuenteIlustrativa,
      id: 'fisico',
      nombre: 'Maltrato físico',
      descripcion: 'Golpes, patadas, heridas, etc.',
      porcentaje: 44,
      color: '#0F3D2E',
    },
    {
      ...fuenteIlustrativa,
      id: 'abandono',
      nombre: 'Abandono',
      descripcion: 'Dejar a los animales en la calle o en lugares inseguros.',
      porcentaje: 20,
      color: '#2E8B7A',
    },
    {
      ...fuenteIlustrativa,
      id: 'negligencia',
      nombre: 'Negligencia',
      descripcion: 'Falta de agua o cuidados básicos.',
      porcentaje: 16,
      color: '#F28C28',
    },
    {
      ...fuenteIlustrativa,
      id: 'psicologico',
      nombre: 'Maltrato psicológico',
      descripcion: 'Encierro, miedo, abuso verbal.',
      porcentaje: 10,
      color: '#7B3FA0',
    },
    {
      ...fuenteIlustrativa,
      id: 'explotacion',
      nombre: 'Explotación',
      descripcion: 'Trabajo forzado, peleas, venta ilegal.',
      porcentaje: 6,
      color: '#2F6DB5',
    },
    {
      ...fuenteIlustrativa,
      id: 'otros',
      nombre: 'Otros',
      descripcion: 'Tráfico, experimentación, etc.',
      porcentaje: 4,
      color: '#7A7A7A',
    },
  ] satisfies readonly DatoMaltrato[],
  porAnimal: [
    {
      ...fuenteIlustrativa,
      id: 'perros',
      nombre: 'Perros',
      porcentaje: 34,
      color: '#0F3D2E',
      imagen: imagenes.animales.perro,
      alt: 'Perro de la galería',
    },
    {
      ...fuenteIlustrativa,
      id: 'gatos',
      nombre: 'Gatos',
      porcentaje: 24,
      color: '#F28C28',
      imagen: imagenes.animales.gato,
      alt: 'Gato de la ficha de negligencia',
    },
    {
      ...fuenteIlustrativa,
      id: 'conejos',
      nombre: 'Conejos',
      porcentaje: 12,
      color: '#7B3FA0',
      imagen: imagenes.animales.conejo,
      alt: 'Conejo de la galería',
    },
    {
      ...fuenteIlustrativa,
      id: 'granja',
      nombre: 'Animales de granja',
      porcentaje: 8,
      color: '#2F6DB5',
      imagen: imagenes.animales.granja,
      alt: 'Vaca de la galería',
    },
    {
      ...fuenteIlustrativa,
      id: 'aves',
      nombre: 'Aves',
      porcentaje: 6,
      color: '#2E8B7A',
      imagen: imagenes.animales.aves,
      alt: 'Loro de plumaje colorido',
    },
    {
      ...fuenteIlustrativa,
      id: 'otros-animales',
      nombre: 'Otros',
      porcentaje: 4,
      color: '#7A7A7A',
      alt: 'Icono de huella animal',
    },
  ] satisfies readonly DatoAnimal[],
} as const;

export const estadisticasPagina = {
  eyebrow: 'Datos con fuente',
  titulo: 'Estadísticas: Lo que dicen los datos',
  subtitulo:
    'Cifras del dossier oficial de Bolivia sobre biocidio, sentencias y bienestar animal. Los gráficos de porcentajes son ilustrativos y están separados de los datos con fuente.',
  frase: 'Cada cifra representa una vida',
  kpiTitulo: 'Bolivia en cifras',
  kpiTexto:
    'Datos tomados del dossier de POFOMA, Fiscalía y SENASAG. Todas las cifras quedan marcadas como sin verificar hasta contar con validación independiente.',
  graficosTitulo: 'Datos ilustrativos del proyecto',
  graficosTexto:
    'Estos porcentajes no son cifras oficiales de Bolivia. Se mantienen como apoyo visual y están marcados como ilustrativos para no confundirlos con los datos del dossier.',
  notaIlustrativa:
    'Los gráficos de esta sección son ilustrativos. No uses estos porcentajes como datos oficiales.',
  notaDatosDemo: 'Datos ilustrativos, pendientes de fuente oficial.',
  ariaDona: 'Distribución porcentual ilustrativa de los tipos de maltrato animal',
  ariaAnimales:
    'Gráfico de barras ilustrativo del porcentaje de maltrato según el tipo de animal',
  captionTabla: 'Porcentajes ilustrativos de maltrato por tipo de animal',
  leyendaTitulo: 'Tipos de maltrato ilustrativos',
  animalesTitulo: 'Porcentaje ilustrativo según el tipo de animal',
  graficosAria: 'Gráficos ilustrativos del proyecto',
  fuentesTitulo: 'Fuentes y verificación',
  fuentesTexto:
    'El dossier reúne referencias de POFOMA y la Fiscalía, la Ley 700, la Ley 1333, la R.A. SENASAG 0230/2024 y AGEMED / CAN 833. Antes de publicar, contrasta cada cifra y contacto con la fuente primaria.',
  ctaTexto:
    'Conocer qué conductas constituyen maltrato y qué instituciones intervienen en Bolivia.',
  ctaBoton: 'Ver tipos de maltrato',
  ctaAria: 'Ir a la página de tipos de maltrato para conocer las conductas y el marco legal',
  teaser: {
    titulo: 'Estadísticas',
    texto:
      '87 casos de biocidio en 2023 y solo 2 sentencias condenatorias efectivas.',
    boton: 'Ver estadísticas',
    aria: 'Ir a la página de estadísticas con los datos reales de Bolivia',
    etiqueta: 'casos de biocidio en Bolivia (2023)',
    detalle: 'POFOMA / Fiscalía · sin verificar',
  },
} as const;
