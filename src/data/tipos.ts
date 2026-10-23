import { imagenes } from './imagenes';
import type { TipoMaltrato } from './types';

export const tiposMaltrato: readonly TipoMaltrato[] = [
  {
    id: 'fisico',
    nombre: 'Físico',
    descripcion: 'Golpes, patadas, heridas, uso de objetos o peleas entre animales.',
    imagen: imagenes.tipos.fisico,
    alt: 'Imagen provisional de un perro para ilustrar el maltrato físico',
    icono: 'fisico',
  },
  {
    id: 'abandono',
    nombre: 'Abandono',
    descripcion: 'Dejar a los animales en la calle sin alimento, agua o refugio.',
    imagen: imagenes.tipos.abandono,
    alt: 'Imagen provisional de un gato para ilustrar el abandono',
    icono: 'abandono',
  },
  {
    id: 'negligencia',
    nombre: 'Negligencia',
    descripcion: 'Falta de cuidados, mala alimentación, enfermedades sin tratar.',
    imagen: imagenes.tipos.negligencia,
    alt: 'Imagen provisional de un conejo para ilustrar la negligencia',
    icono: 'negligencia',
  },
  {
    id: 'psicologico',
    nombre: 'Psicológico',
    descripcion: 'Miedo, encierro, abuso verbal o falta de atención.',
    imagen: imagenes.tipos.psicologico,
    alt: 'Imagen provisional de un perro para ilustrar el maltrato psicológico',
    icono: 'psicologico',
  },
  {
    id: 'explotacion',
    nombre: 'Explotación',
    descripcion: 'Trabajo forzado, peleas, venta ilegal, experimentación.',
    imagen: imagenes.tipos.explotacion,
    alt: 'Imagen provisional de un caballo para ilustrar la explotación animal',
    icono: 'explotacion',
  },
] as const;
