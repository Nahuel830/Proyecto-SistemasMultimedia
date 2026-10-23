import conejoFrontal from '../assets/conejo-frontal.png';
import conejoLateral from '../assets/conejo-lateral.png';
import conejoTresCuartos from '../assets/conejo-tres-cuartos.png';
import referenciaConejo from '../assets/referencia_conejo.jpeg';
import referenciaDashboard from '../assets/referencia_dashboard.png';

export const imagenes = {
  referencias: {
    conejo: referenciaConejo,
    dashboard: referenciaDashboard,
  },
  conejos: {
    heroe: conejoTresCuartos,
    panel: conejoTresCuartos,
    quiz: conejoFrontal,
    lateral: conejoLateral,
    fallback: referenciaConejo,
  },
  fondos: {
    bosque: '/images/bosque.jpg',
  },
  video: {
    poster: '/images/conejo-video.jpg',
  },
  galeria: {
    perro: '/images/perro.jpg',
    gato: '/images/gato.jpg',
    conejo: '/images/conejo-galeria.jpg',
    vaca: '/images/vaca.jpg',
    paloma: '/images/paloma.jpg',
    caballo: '/images/caballo.jpg',
    ojo: '/images/ojo.jpg',
    perro2: '/images/perro-2.jpg',
    gato2: '/images/gato-2.jpg',
  },
  tipos: {
    fisico: '/images/perro-tipo.jpg',
    abandono: '/images/perro-abandono.jpg',
    negligencia: '/images/gato-tipo.jpg',
    psicologico: '/images/conejo-tipo.jpg',
    explotacion: '/images/caballo-tipo.jpg',
  },
  animales: {
    perro: '/images/perro.jpg',
    gato: '/images/gato.jpg',
    conejo: '/images/conejo-galeria.jpg',
    granja: '/images/granja.jpg',
    aves: '/images/aves.jpg',
    otros: '/images/otros.jpg',
  },
  qr: '/qr/qr-mensaje.png',
  audio: '/audio/mensaje-conejo.wav',
  videoSrc: '/video/mensaje-conejo.mp4',
  modelo: '/models/conejo.glb',
} as const;
