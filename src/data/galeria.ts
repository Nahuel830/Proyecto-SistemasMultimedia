import { imagenes } from './imagenes';
import type { CategoriaGaleriaItem, GaleriaItem } from './types';

export const galeriaCategorias: readonly CategoriaGaleriaItem[] = [
  { id: 'todas', etiqueta: 'Todos' },
  { id: 'perros', etiqueta: 'Perros' },
  { id: 'conejos', etiqueta: 'Conejos' },
  { id: 'granja', etiqueta: 'Animales de granja' },
  { id: 'aves', etiqueta: 'Aves y silvestres' },
] as const;

export const galeriaItems: readonly GaleriaItem[] = [
  {
    id: 'conejo-ralph',
    src: imagenes.galeria.propia.conejo,
    alt: 'Conejo de pelaje claro, imagen de la ficha Serenidad sobre el testeo cosmético',
    titulo: 'Serenidad',
    caso: 'El Conejo Ralph: testeo cosmético ocular y cutáneo',
    entidad: 'AGEMED / CAN 833 · Humane Society',
    descripcion:
      'Inspirado en la campaña viral que impactó a Bolivia. Aunque en el país no operan bioterios cosméticos masivos, el 90% de productos importados carece de sello Cruelty Free. Ralph representa a los miles de animales que sufren pruebas de toxicidad en el mundo.',
    categoria: 'conejos',
    estadoVerificacion: 'sin-verificar',
    fuentes: ['can833'],
  },
  {
    id: 'perros-calle',
    src: imagenes.galeria.propia.perro,
    alt: 'Perro de mirada atenta, imagen de la ficha Un amigo fiel sobre el abandono',
    titulo: 'Un amigo fiel',
    caso: 'Sobrepoblación urbana y animales en situación de calle',
    entidad: 'Zoonosis Bolivia · Censo Canino Nacional',
    descripcion:
      'En Bolivia se estima más de 4 millones de canes y felinos; un alto porcentaje carece de tenencia responsable. La esterilización temprana y la adopción son las únicas soluciones éticas frente al abandono sistemático en aceras y mercados.',
    categoria: 'perros',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'granja-bienestar',
    src: imagenes.galeria.propia.vaca,
    alt: 'Vaca en el campo, imagen de la ficha También siente sobre bienestar animal',
    titulo: 'También siente',
    caso: 'Bovinos y camélidos: transporte y beneficio pecuario',
    entidad: 'SENASAG · Cap. 1.3 Bienestar',
    descripcion:
      'Normado por SENASAG bajo el principio de las 5 Libertades: libres de sed, hambre, miedo y dolor, y libres de expresar su comportamiento natural. Se prohíbe el maltrato físico y el transporte sin ventilación ni descanso.',
    categoria: 'granja',
    estadoVerificacion: 'discrepancia',
    fuentes: ['regensa-bienestar'],
  },
  {
    id: 'aves-trafico',
    src: imagenes.galeria.propia.loro,
    alt: 'Loro de plumaje colorido, imagen de la ficha Alas que importan sobre el tráfico de aves',
    titulo: 'Alas que importan',
    caso: 'Parabas y loros víctimas de tráfico ilegal',
    entidad: 'POFOMA · Ley 1333, Art. 111',
    descripcion:
      'Más de 170 operativos anuales de rescate de fauna silvestre en ferias bolivianas. Arrancados de la Amazonía y el Chaco para venta ilegal como mascotas enjauladas, sufriendo estrés y desnutrición severa.',
    categoria: 'aves',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
] as const;

export const galeriaPagina = {
  eyebrow: 'Casos reales de Bolivia',
  titulo: 'Galería: Cada vida importa',
  subtitulo:
    'Cuatro fichas basadas en el dossier oficial: testeo cosmético, sobrepoblación canina, bienestar pecuario y tráfico de fauna silvestre.',
  frase: 'No son solo animales, son vidas que sienten',
  gridTitulo: 'Cuatro casos, cuatro realidades',
  gridTexto:
    'Filtra por especie y abre cada ficha para leer el caso, la entidad competente y su fuente.',
  ariaFiltros: 'Filtrar la galería por categoría',
  ariaGrid: 'Fichas reales de animales y maltrato en Bolivia',
  ariaImagen: 'Abrir la ficha de',
  lightboxTitulo: 'Galería de Huellas de Esperanza',
  anterior: 'Ficha anterior',
  siguiente: 'Ficha siguiente',
  cerrar: 'Cerrar galería',
  contador: 'de',
  caso: 'Caso',
  entidad: 'Entidad / norma',
  fuente: 'Fuente',
  vacio: 'No hay fichas en esta categoría.',
  teaser: {
    texto: 'Cuatro casos reales de Bolivia, con entidad y fuente.',
    boton: 'Ver galería',
    aria: 'Ir a la página de la galería con fichas reales de Bolivia',
  },
} as const;
