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
    feedback: 'Denunciar es la forma más segura de ayudar a un animal en riesgo.',
  },
  {
    id: 2,
    pregunta: '¿Cuál de estas acciones ayuda a prevenir el maltrato animal?',
    opciones: [
      'Comprar animales como mascotas',
      'Adoptar en vez de comprar',
      'Dejar a los animales en la calle',
      'Ignorar su sufrimiento',
    ],
    correcta: 1,
    feedback: 'Adoptar le da un hogar a un animal que ya necesita uno.',
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
    feedback: 'El bienestar incluye agua, alimento, refugio, salud y compañía.',
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
    feedback: 'El abandono es una forma de maltrato y expone al animal a muchos riesgos.',
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
    feedback: 'La esterilización responsable ayuda a prevenir el abandono.',
  },
  {
    id: 6,
    pregunta: '¿Cuál es una señal de que un animal puede estar sufriendo maltrato?',
    opciones: [
      'Juega y come con normalidad',
      'Muestra miedo extremo, heridas o desnutrición',
      'Duerme durante el día',
      'Ladra o maúlla para pedir atención',
    ],
    correcta: 1,
    feedback: 'El miedo constante, las heridas y la desnutrición son señales de alerta.',
  },
  {
    id: 7,
    pregunta: '¿Qué implica tener una mascota de forma responsable?',
    opciones: [
      'Un regalo temporal para los niños',
      'Un compromiso de por vida con su cuidado',
      'Tenerla solo cuando sea cachorra',
      'Dejarla sola durante semanas',
    ],
    correcta: 1,
    feedback: 'Una mascota es un compromiso de por vida, no un objeto temporal.',
  },
  {
    id: 8,
    pregunta: '¿Cada cuánto debe tener agua limpia un animal?',
    opciones: [
      'Solo una vez por semana',
      'Cuando se acuerde la persona',
      'Siempre, a libre disposición',
      'Solo en verano',
    ],
    correcta: 2,
    feedback: 'El agua limpia debe estar disponible en todo momento.',
  },
  {
    id: 9,
    pregunta: '¿Qué ejemplo corresponde a maltrato psicológico?',
    opciones: [
      'Acariciarlo con calma',
      'Jugar con él todos los días',
      'Encerrarlo y gritarle constantemente',
      'Cepillar su pelaje',
    ],
    correcta: 2,
    feedback: 'El aislamiento y los gritos constantes también son maltrato.',
  },
  {
    id: 10,
    pregunta: '¿Cómo puedes ayudar desde tus redes sociales?',
    opciones: [
      'Compartiendo información veraz y fomentando la adopción',
      'Difundiendo rumores sin comprobar',
      'Publicando datos personales de otras personas',
      'Promoviendo la compra de animales',
    ],
    correcta: 0,
    feedback: 'Compartir información verificada y promover la adopción salva vidas.',
  },
] as const;

export const letrasOpciones = ['A', 'B', 'C', 'D'] as const;

export const juegoPagina = {
  eyebrow: 'Aprende jugando',
  titulo: 'Juego: ¿Qué tanto sabes?',
  subtitulo:
    'Diez preguntas sobre maltrato animal y tenencia responsable. Cada respuesta incluye una explicación para seguir aprendiendo.',
  frase: 'Jugar también es una forma de cuidar',
  teaser: {
    texto: 'Pon a prueba lo que sabes y descubre cómo ayudar.',
    boton: 'Jugar',
    aria: 'Ir a la página del juego y empezar el quiz',
  },
} as const;
