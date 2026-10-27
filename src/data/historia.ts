import type { CapituloHistoria } from './types';

export const historiaPagina = {
  eyebrow: 'En primera persona',
  titulo: 'Mi historia',
  subtitulo:
    'La vida de un conejo que aprendió que la ternura también puede cambiarlo todo.',
  frase: 'Hay historias que se cuentan con el corazón.',
  avisoFiccion:
    'Relato ficticio: el conejo es un personaje creado para sensibilizar. Los datos reales están en Estadísticas, Tipos de maltrato y Ayuda.',
  introEyebrow: 'La voz del conejo',
  introTitulo: 'Antes de que me llamaran Esperanza',
  introParrafos: [
    'Durante mucho tiempo pensé que el mundo era un lugar de ruidos grandes y manos apuradas. Aprendí a quedarme quieto, a mirar desde un rincón y a esperar.',
    'Pero un día alguien se sentó a mi lado sin prisa. No me levantó ni me gritó: solo esperó a que yo diera el primer paso.',
  ],
  introCita: 'La paciencia fue el primer hogar que conocí.',
} as const;

export const audioHistoria = {
  boton: 'Escucha mi historia',
  botonActivo: 'Pausar mi historia',
  aria: 'Reproducir o pausar el mensaje de audio del conejo',
  error: 'No se pudo reproducir el audio. Revisa el archivo en public/audio.',
} as const;

export const qrVideo = {
  urlVideoYoutube: 'https://youtu.be/b0Zvghc0ro4',
  qrAlt: 'Código QR que abre el video completo en YouTube',
  titulo: 'Escanea y mira el video completo',
  frase: 'No al maltrato: tu voz también importa.',
  credito: 'Video: The Humane Society of the United States',
} as const;

export const historiaTarjeta = {
  titulo: 'Mi historia',
  texto: 'Un conejo, una voz y una segunda oportunidad.',
  boton: 'Ver mi historia',
  destino: '/mi-historia',
  ariaPoster: 'Póster del video Mi historia, con el conejo protagonista',
  ariaPlay: 'Vista previa del video Mi historia',
  ariaSeccion: 'Mi historia, video y relato del conejo',
} as const;

export const relatoHistoria = {
  titulo: 'El relato',
  subtitulo:
    'Cinco momentos contados por mí, con las palabras que nunca pude decir en voz alta.',
  aria: 'Capítulos de la historia del conejo',
} as const;

export const conejoHistoria = {
  eyebrow: 'Mi retrato',
  titulo: 'Mi historia también tiene un rostro',
  texto:
    'Este espacio está reservado para el modelo tridimensional del conejo. Mientras tanto, puedes verme en una vista ilustrada.',
  nota:
    'Cuando el archivo conejo.glb esté listo, este lugar mostrará mi modelo con la animación idle.',
  ariaVisual: 'Vista del conejo protagonista de la historia',
} as const;

export const cierreHistoria = {
  titulo: '¿Quieres ser parte de mi historia?',
  texto:
    'Adoptar, denunciar, acompañar o simplemente escuchar: todas las formas de ayuda cuentan.',
  boton: 'Cómo puedo ayudar',
  destino: '/ayuda',
  aria: 'Ir a la página de ayuda para conocer cómo ayudar',
} as const;

export const capitulosHistoria: readonly CapituloHistoria[] = [
  {
    id: 'calor',
    titulo: 'El calor del principio',
    parrafos: [
      'Mis primeros recuerdos son suaves: el calor de mis hermanos, el olor del heno y una luz que entraba despacio por una rendija.',
      'No sabía que aquel rincón tenía un nombre. Solo sabía que, cuando estaba allí, el mundo parecía más pequeño y más amable.',
    ],
  },
  {
    id: 'viaje',
    titulo: 'El viaje que no entendía',
    parrafos: [
      'Un día cambiaron los sonidos. Me envolvieron con cuidado, pero yo no entendía hacia dónde íbamos. Todo olía distinto y mis orejas no dejaban de moverse.',
      'Llegué a un lugar nuevo con paredes altas y pasos desconocidos. Me quedé muy quieto, intentando descubrir si aquel sitio era seguro.',
    ],
  },
  {
    id: 'voz-suave',
    titulo: 'Una voz suave',
    parrafos: [
      'Alguien se acercó sin prisa y me habló bajito. No intentó sujetarme; dejó agua fresca y unas hojas verdes cerca, y se sentó a esperar.',
      'Pasaron varios días antes de que me atreviera a salir de mi rincón. Cuando lo hice, esa voz no se movió. Solo sonrió.',
    ],
  },
  {
    id: 'confiar',
    titulo: 'Aprender a confiar',
    parrafos: [
      'Las mañanas empezaron a tener un ritmo: agua limpia, comida, un rayo de sol sobre la manta y una caricia que nunca llegaba de golpe.',
      'Un día me llamaron Esperanza. No sé si entendí el nombre enseguida, pero sí entendí que alguien me esperaba cada día.',
    ],
  },
  {
    id: 'mi-voz',
    titulo: 'Mi voz hoy',
    parrafos: [
      'Hoy cuento mi historia para que otras voces no tengan que quedarse calladas. No pido lástima: pido respeto, paciencia y un hogar.',
      'Si alguna vez ves a un animal con miedo, escucha. A veces el primer paso para ayudarle es tan simple como quedarse un momento a su lado.',
    ],
  },
] as const;
