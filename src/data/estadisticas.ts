import { imagenes } from './imagenes';
import type { DatoAnimal, DatoMaltrato } from './types';

export const datosMaltrato: readonly DatoMaltrato[] = [
  {
    id: 'fisico',
    nombre: 'Maltrato físico',
    descripcion: 'Golpes, patadas, heridas, etc.',
    porcentaje: 44,
    color: '#0F3D2E',
  },
  {
    id: 'abandono',
    nombre: 'Abandono',
    descripcion: 'Dejar a los animales en la calle o en lugares inseguros.',
    porcentaje: 20,
    color: '#2E8B7A',
  },
  {
    id: 'negligencia',
    nombre: 'Negligencia',
    descripcion: 'Falta de agua o cuidados básicos.',
    porcentaje: 16,
    color: '#F28C28',
  },
  {
    id: 'psicologico',
    nombre: 'Maltrato psicológico',
    descripcion: 'Encierro, miedo, abuso verbal.',
    porcentaje: 10,
    color: '#7B3FA0',
  },
  {
    id: 'explotacion',
    nombre: 'Explotación',
    descripcion: 'Trabajo forzado, peleas, venta ilegal.',
    porcentaje: 6,
    color: '#2F6DB5',
  },
  {
    id: 'otros',
    nombre: 'Otros',
    descripcion: 'Tráfico, experimentación, etc.',
    porcentaje: 4,
    color: '#7A7A7A',
  },
] as const;

export const datosPorAnimal: readonly DatoAnimal[] = [
  {
    id: 'perros',
    nombre: 'Perros',
    porcentaje: 34,
    color: '#0F3D2E',
    imagen: imagenes.animales.perro,
    alt: 'Imagen provisional de un perro',
  },
  {
    id: 'gatos',
    nombre: 'Gatos',
    porcentaje: 24,
    color: '#F28C28',
    imagen: imagenes.animales.gato,
    alt: 'Imagen provisional de un gato',
  },
  {
    id: 'conejos',
    nombre: 'Conejos',
    porcentaje: 12,
    color: '#7B3FA0',
    imagen: imagenes.animales.conejo,
    alt: 'Imagen provisional de un conejo',
  },
  {
    id: 'granja',
    nombre: 'Animales de granja',
    porcentaje: 8,
    color: '#2F6DB5',
    imagen: imagenes.animales.granja,
    alt: 'Imagen provisional de una vaca',
  },
  {
    id: 'aves',
    nombre: 'Aves',
    porcentaje: 6,
    color: '#2E8B7A',
    imagen: imagenes.animales.aves,
    alt: 'Imagen provisional de una paloma',
  },
  {
    id: 'otros-animales',
    nombre: 'Otros',
    porcentaje: 4,
    color: '#7A7A7A',
    imagen: imagenes.animales.otros,
    alt: 'Imagen provisional de una huella de animal',
  },
] as const;
