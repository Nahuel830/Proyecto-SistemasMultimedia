import conejoFrontal from '../assets/conejo-frontal.png';
import conejoLateral from '../assets/conejo-lateral.png';
import conejoTresCuartos from '../assets/conejo-tres-cuartos.png';
import referenciaConejo from '../assets/referencia_conejo.jpeg';
import referenciaDashboard from '../assets/referencia_dashboard.png';

const galeriaPropia = {
  conejo: '/images/galeria/galeria-conejo.jpg',
  perro: '/images/galeria/galeria-perro.jpg',
  vaca: '/images/galeria/galeria-vaca.jpg',
  loro: '/images/galeria/galeria-loro.jpg',
} as const;

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
    propia: galeriaPropia,
    perro: '/images/perro.jpg',
    gato: '/images/gato.jpg',
    conejo: '/images/conejo-galeria.jpg',
    conejo2: '/images/conejo-panel.jpg',
    vaca: '/images/vaca.jpg',
    granja: '/images/granja.jpg',
    paloma: '/images/paloma.jpg',
    aves: '/images/aves.jpg',
    caballo: '/images/caballo.jpg',
    ojo: '/images/ojo.jpg',
    otros: '/images/otros.jpg',
    perro2: '/images/perro-2.jpg',
    gato2: '/images/gato-2.jpg',
    perroAbandono: '/images/perro-abandono.jpg',
  },
  tipos: {
    fisico: '/images/tipos-fisico.jpg',
    abandono: '/images/tipos-abandono.jpg',
    negligencia: '/images/tipos-negligencia.jpg',
    psicologico: '/images/tipos-psicologico.jpg',
    explotacion: '/images/tipos-explotacion.jpg',
  },
  animales: {
    perro: galeriaPropia.perro,
    gato: '/images/tipos-negligencia.jpg',
    conejo: galeriaPropia.conejo,
    granja: galeriaPropia.vaca,
    aves: galeriaPropia.loro,
    otros: '/images/otros.jpg',
  },
  qr: '/qr/qr-mensaje.png',
  audio: '/audio/mensaje-conejo.wav',
  videoSrc: '/video/mensaje-conejo.mp4',
  modelo: '/models/conejo.glb',
  modelos: {
    conejo: '/models/conejo.glb',
    conejoSentado: '/models/conejosentado.glb',
    conejoCorre: '/models/conejocorre.glb',
    tigre: '/models/tigre.glb',
  },
} as const;
