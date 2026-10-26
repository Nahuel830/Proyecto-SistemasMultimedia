import type {
  AccesoRapido,
  EnlaceFooter,
  EnlaceNavegacion,
  ModoConejo,
} from './types';

export const marca = {
  nombre: 'HUELLAS DE ESPERANZA',
  nombrePartes: ['HUELLAS DE', 'ESPERANZA'] as const,
  lema: 'Una voz contra el maltrato animal',
  lemaCorto: 'Una voz contra el maltrato animal',
  huella: '🐾',
} as const;

export const navegacion: readonly EnlaceNavegacion[] = [
  { id: 'inicio', etiqueta: 'Inicio', destino: '/#inicio', icono: 'inicio' },
  {
    id: 'historia',
    etiqueta: 'Mi historia',
    destino: '/mi-historia',
    icono: 'historia',
  },
  {
    id: 'estadisticas',
    etiqueta: 'Estadísticas',
    destino: '/estadisticas',
    icono: 'estadisticas',
  },
  {
    id: 'tipos',
    etiqueta: 'Tipos de maltrato',
    destino: '/tipos-de-maltrato',
    icono: 'tipos',
  },
  { id: 'ayuda', etiqueta: 'Ayuda', destino: '/ayuda', icono: 'ayuda' },
  { id: 'galeria', etiqueta: 'Galería', destino: '/galeria', icono: 'galeria' },
  { id: 'juego', etiqueta: 'Juego', destino: '/juego', icono: 'juego' },
  {
    id: 'recursos',
    etiqueta: 'Recursos',
    destino: '/recursos',
    icono: 'recursos',
  },
] as const;

export const accesibilidad = {
  saltar: 'Saltar al contenido principal',
  contenidoPrincipal: 'Contenido principal',
  abrirMenu: 'Abrir menú de navegación',
  cerrarMenu: 'Cerrar menú de navegación',
  navegacionPrincipal: 'Navegación principal',
  navegacionMovil: 'Navegación móvil',
  inicio: 'Huellas de Esperanza, ir al inicio',
} as const;

export const buscador = {
  etiqueta: 'Buscar en la revista',
  placeholder: 'Buscar en la revista...',
  vacio: 'Sin resultados. Prueba con adopción, galería o ayuda.',
  ariaLabel: 'Buscar contenido en la revista',
  ariaResultados: 'Resultados de búsqueda',
  limpiar: 'Limpiar búsqueda',
} as const;

export interface IndiceBusqueda {
  readonly etiqueta: string;
  readonly descripcion: string;
  readonly destino: string;
  readonly claves: readonly string[];
}

export const indiceBusqueda: readonly IndiceBusqueda[] = [
  {
    etiqueta: 'Inicio',
    descripcion: 'Portada de la revista',
    destino: '/#inicio',
    claves: ['inicio', 'portada', 'revista', 'huellas'],
  },
  {
    etiqueta: 'Mi historia',
    descripcion: 'La voz del conejo',
    destino: '/mi-historia',
    claves: ['historia', 'conejo', 'audio', 'voz', 'escucha'],
  },
  {
    etiqueta: 'Estadísticas',
    descripcion: '87 casos de biocidio y cifras de Bolivia',
    destino: '/estadisticas',
    claves: ['estadisticas', 'cifras', 'biocidio', 'bolivia', 'datos', 'grafico'],
  },
  {
    etiqueta: 'Tipos de maltrato',
    descripcion: 'Físico, abandono, negligencia y más',
    destino: '/tipos-de-maltrato',
    claves: ['tipos', 'maltrato', 'fisico', 'abandono', 'negligencia'],
  },
  {
    etiqueta: 'Ayuda y denuncia',
    descripcion: 'POFOMA, líneas oficiales y refugios',
    destino: '/ayuda',
    claves: ['ayuda', 'denuncia', 'pofoma', 'telefono', 'refugios'],
  },
  {
    etiqueta: 'Galería',
    descripcion: 'Cada vida importa',
    destino: '/galeria',
    claves: ['galeria', 'fotos', 'animales', 'vidas', 'imagenes'],
  },
  {
    etiqueta: 'Juego',
    descripcion: 'Quiz para aprender jugando',
    destino: '/juego',
    claves: ['juego', 'quiz', 'preguntas', 'prevencion', 'adoptar'],
  },
  {
    etiqueta: 'Ayuda y recursos',
    descripcion: 'Adopta, denuncia y aprende',
    destino: '/recursos',
    claves: ['ayuda', 'adopta', 'denuncia', 'organizaciones', 'consejos'],
  },
  {
    etiqueta: 'Comparte esta revista',
    descripcion: 'Redes sociales',
    destino: '/recursos#compartir',
    claves: ['comparte', 'redes', 'facebook', 'instagram', 'tiktok'],
  },
] as const;

export const heroe = {
  id: 'mi-historia',
  eyebrow: 'Una voz que no se calla',
  titulo: marca.nombrePartes,
  subtitulo: 'Una voz contra el maltrato animal',
  cita: 'No puedo pedirte ayuda con palabras, pero tú puedes ser mi voz.',
  botonHistoria: 'Escucha mi historia',
  ariaBotonHistoria:
    'Ir a la página Mi historia para escuchar el mensaje del conejo',
  ariaImagen: 'Conejo blanco con camisa y chaleco de pie en un bosque',
  ariaAccesos: 'Accesos rápidos del dashboard',
  accesos: [
    {
      id: 'acceso-historia',
      etiqueta: 'Mi historia',
      destino: '/mi-historia',
      icono: 'historia',
    },
    {
      id: 'acceso-estadisticas',
      etiqueta: 'Estadísticas',
      destino: '/estadisticas',
      icono: 'estadisticas',
    },
    {
      id: 'acceso-tipos',
      etiqueta: 'Tipos de maltrato',
      destino: '/tipos-de-maltrato',
      icono: 'tipos',
    },
    {
      id: 'acceso-ayuda',
      etiqueta: 'Ayuda',
      destino: '/ayuda',
      icono: 'ayuda',
    },
    {
      id: 'acceso-galeria',
      etiqueta: 'Galería',
      destino: '/galeria',
      icono: 'galeria',
    },
  ] satisfies readonly AccesoRapido[],
} as const;

export const fuenteDato = {
  prefijo: 'Fuente:',
  verificado: 'Verificado',
  sinVerificar: 'Sin verificar',
} as const;

export const fraseContenido = {
  cita: 'Ellos sienten, también sufren, también tienen derechos.',
  sello: 'No más maltrato. Más empatía.',
  ariaImagen:
    'Conejo blanco mirando de frente, símbolo de las voces que necesitan ser escuchadas',
} as const;

export const videoContenido = {
  titulo: 'Video: Un mensaje para ti',
  ariaVideo: 'Mensaje de video del conejo',
  subtitulo: 'Hola, soy tu amigo el conejo...',
  subtituloDos: 'No me maltrates, no me abandones...',
  notaQr: 'Escanea el código QR y mira el video completo de mi mensaje.',
  qrAlt: 'Código QR para ver el mensaje completo del conejo',
  notaManuscrita: 'Tu voz también importa ♡',
  duracion: 90,
  tiempoInicial: '0:00',
  ariaPlay: 'Reproducir mensaje',
  ariaPause: 'Pausar mensaje',
  ariaProgreso: 'Progreso del video',
  ariaVolumen: 'Volumen del video',
  ariaSilenciar: 'Silenciar o activar sonido',
  ariaAjustes: 'Ajustes del reproductor',
  ariaPantallaCompleta: 'Ver en pantalla completa',
  ajustesTitulo: 'Opciones de reproducción',
  calidad: 'Calidad: 720p',
  subtitulos: 'Subtítulos: Español',
  ajustesNota: 'Añade tu video real en /public/video/mensaje-conejo.mp4.',
  simulacion: 'Reproductor de demostración',
} as const;

export const juegoContenido = {
  id: 'juego',
  titulo: 'Juego: ¿Qué tanto sabes?',
  subtitulo: 'Pon a prueba lo que sabes y ayuda a salvar vidas.',
  preguntaPrefijo: 'Pregunta',
  preguntaDe: 'de',
  puntos: 'Puntos',
  siguiente: 'Siguiente',
  verResultados: 'Ver resultados',
  jugarDeNuevo: 'Jugar de nuevo',
  verRecursos: 'Ver recursos',
  correcta: '¡Muy bien!',
  incorrecta: 'Casi...',
  respuestaCorrecta: 'Respuesta correcta',
  respuestaIncorrecta: 'Respuesta incorrecta',
  respuestaEra: 'La respuesta correcta era',
  opcionesAria: 'Opciones de respuesta',
  invitacion: 'Elige la opción que más ayuda a los animales.',
  ariaGlobo: 'Mensaje del conejo',
  ariaImagen: 'Conejo acompañando el quiz',
  ariaPuntos: 'Puntos acumulados',
  ariaBarra: 'Progreso del quiz',
  teclado: 'Usa las teclas 1 a 3 para responder y Enter para continuar.',
  inicio: {
    titulo: '¿Listo para poner a prueba lo que sabes?',
    texto:
      'Cada partida elige 5 de 10 preguntas sobre la normativa boliviana. Las preguntas y las opciones cambian de orden, y verás una explicación después de cada respuesta.',
    detalles: [
      '5 preguntas por partida',
      '10 preguntas en el banco',
      'Preguntas y opciones aleatorias',
      'Explicación en cada respuesta',
    ],
    boton: 'Empezar',
    ariaBoton: 'Empezar la partida del quiz',
    mejor: 'Mejor puntaje',
    sinMejor: 'Aún no hay récord',
  },
  resultado: {
    titulo: 'Resultado final',
    aciertos: 'aciertos',
    mejor: 'Mejor puntaje',
    nuevoRecord: '¡Nuevo récord!',
    mensajes: [
      {
        minimo: 5,
        titulo: '¡Eres una voz experta!',
        texto:
          'Sabes muy bien cómo proteger a los animales. Comparte lo que aprendiste.',
      },
      {
        minimo: 4,
        titulo: '¡Muy buen trabajo!',
        texto:
          'Tienes una base sólida. Repasa las respuestas y vuelve a intentarlo.',
      },
      {
        minimo: 3,
        titulo: 'Vas por buen camino',
        texto:
          'Cada respuesta te acerca a cuidar mejor a los animales. Sigue aprendiendo.',
      },
      {
        minimo: 0,
        titulo: 'Sigue aprendiendo',
        texto:
          'Aprender es el primer paso para ayudar. Juega otra vez y visita los recursos.',
      },
    ],
  },
} as const;

export const footerContenido = {
  cita: 'Pequeñas acciones, grandes cambios',
  sello: '¡Los animales también importan! ♡',
  notaDatos:
    'Datos recopilados de fuentes oficiales; pendientes de verificación final.',
  enlaces: [
    { etiqueta: 'Inicio', destino: '/' },
    { etiqueta: 'Mi historia', destino: '/mi-historia' },
    { etiqueta: 'Estadísticas', destino: '/estadisticas' },
    { etiqueta: 'Tipos de maltrato', destino: '/tipos-de-maltrato' },
    { etiqueta: 'Ayuda', destino: '/ayuda' },
    { etiqueta: 'Galería', destino: '/galeria' },
    { etiqueta: 'Juego', destino: '/juego' },
    { etiqueta: 'Recursos', destino: '/recursos' },
  ] satisfies readonly EnlaceFooter[],
  copyright: '© 2026 Huellas de Esperanza. Hecho con empatía.',
  ariaEnlaces: 'Enlaces del pie de página',
} as const;

export const configuracion = {
  modoConejo: 'image' as ModoConejo,
  mostrarNotaDatosDemo: true,
  mostrarEnlacesFooter: true,
} as const;

export const placeholderComun = {
  volver: 'Volver al inicio',
} as const;


