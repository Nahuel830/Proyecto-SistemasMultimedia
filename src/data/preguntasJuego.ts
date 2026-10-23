import type { PreguntaJuego } from './types';

export const preguntasJuego: readonly PreguntaJuego[] = [
  {
    id: 1,
    pregunta: '¿Qué debes hacer si presencias un caso de maltrato animal?',
    opciones: [
      'Ignorarlo y seguir caminando',
      'Grabarlo sin avisar a nadie',
      'Denunciar a las autoridades',
      'Enfrentarme al agresor',
    ],
    correcta: 2,
    feedback: 'Denunciar es la forma más segura de ayudar.',
  },
  {
    id: 2,
    pregunta:
      '¿Cuál de estas acciones ayuda a prevenir el maltrato animal?',
    opciones: [
      'Comprar animales como mascotas.',
      'Adoptar en vez de comprar.',
      'Dejar a los animales en la calle.',
      'Ignorar su sufrimiento.',
    ],
    correcta: 1,
    feedback: '¡Muy bien! Adoptar salva vidas.',
  },
  {
    id: 3,
    pregunta: '¿Qué necesita un animal para vivir con bienestar?',
    opciones: [
      'Solo comida de vez en cuando',
      'Agua, alimento, refugio y atención veterinaria',
      'Estar siempre solo y encerrado',
      'Vivir atado todo el día',
    ],
    correcta: 1,
    feedback: 'Cuidar también significa cubrir sus necesidades básicas.',
  },
  {
    id: 4,
    pregunta: '¿Qué significa abandonar a un animal?',
    opciones: [
      'Dejarlo con su familia',
      'Dejarlo en la calle o en un lugar inseguro',
      'Llevarlo regularmente al veterinario',
      'Darle un hogar lleno de cuidados',
    ],
    correcta: 1,
    feedback: 'Abandonar también es una forma de maltrato.',
  },
  {
    id: 5,
    pregunta: '¿Por qué es importante la esterilización responsable?',
    opciones: [
      'Para que el animal no tenga compañía',
      'Para evitar camadas no deseadas y el abandono',
      'Para que deje de comer',
      'Para vender más animales',
    ],
    correcta: 1,
    feedback: 'La esterilización responsable previene el abandono.',
  },
] as const;

export const letrasOpciones = ['A', 'B', 'C', 'D'] as const;
