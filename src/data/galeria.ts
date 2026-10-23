import { imagenes } from './imagenes';
import type { GaleriaItem } from './types';

export const galeriaItems: readonly GaleriaItem[] = [
  {
    id: 'perro',
    src: imagenes.galeria.perro,
    alt: 'Imagen provisional de un perro de mirada dulce',
    titulo: 'Un amigo fiel',
  },
  {
    id: 'gato',
    src: imagenes.galeria.gato,
    alt: 'Imagen provisional de un gato curioso',
    titulo: 'Una mirada curiosa',
  },
  {
    id: 'conejo',
    src: imagenes.galeria.conejo,
    alt: 'Conejo blanco con camisa y chaleco en un bosque',
    titulo: 'Nuestra voz',
  },
  {
    id: 'vaca',
    src: imagenes.galeria.vaca,
    alt: 'Imagen provisional de una vaca en el campo',
    titulo: 'También siente',
  },
  {
    id: 'paloma',
    src: imagenes.galeria.paloma,
    alt: 'Imagen provisional de una paloma',
    titulo: 'Libertad',
  },
  {
    id: 'caballo',
    src: imagenes.galeria.caballo,
    alt: 'Imagen provisional de un caballo',
    titulo: 'Fuerza y nobleza',
  },
  {
    id: 'ojo',
    src: imagenes.galeria.ojo,
    alt: 'Primer plano de una mirada animal',
    titulo: 'Una vida que mira',
  },
  {
    id: 'perro-2',
    src: imagenes.galeria.perro2,
    alt: 'Imagen provisional de otro perro',
    titulo: 'Segunda oportunidad',
  },
  {
    id: 'gato-2',
    src: imagenes.galeria.gato2,
    alt: 'Imagen provisional de otro gato',
    titulo: 'Un hogar seguro',
  },
] as const;
