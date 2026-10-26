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
    destino: '/#estadisticas',
    icono: 'estadisticas',
  },
  {
    id: 'tipos',
    etiqueta: 'Tipos de maltrato',
    destino: '/#tipos-maltrato',
    icono: 'tipos',
  },
  { id: 'ayuda', etiqueta: 'Ayuda', destino: '/#ayuda', icono: 'ayuda' },
  { id: 'galeria', etiqueta: 'Galería', destino: '/galeria', icono: 'galeria' },
  { id: 'juego', etiqueta: 'Juego', destino: '/juego', icono: 'juego' },
  {
    id: 'recursos',
    etiqueta: 'Recursos',
    destino: '/#recursos',
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
    descripcion: 'Cifras del maltrato animal',
    destino: '/#estadisticas',
    claves: ['estadisticas', 'cifras', 'porcentajes', 'datos', 'grafico'],
  },
  {
    etiqueta: 'Tipos de maltrato',
    descripcion: 'Físico, abandono, negligencia y más',
    destino: '/#tipos-maltrato',
    claves: ['tipos', 'maltrato', 'fisico', 'abandono', 'negligencia'],
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
    destino: '/#ayuda',
    claves: ['ayuda', 'adopta', 'denuncia', 'organizaciones', 'consejos'],
  },
  {
    etiqueta: 'Comparte esta revista',
    descripcion: 'Redes sociales',
    destino: '/#recursos',
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
      destino: '/#estadisticas',
      icono: 'estadisticas',
    },
    {
      id: 'acceso-tipos',
      etiqueta: 'Tipos de maltrato',
      destino: '/#tipos-maltrato',
      icono: 'tipos',
    },
    {
      id: 'acceso-ayuda',
      etiqueta: 'Ayuda',
      destino: '/#ayuda',
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

export const estadisticasContenido = {
  id: 'estadisticas',
  titulo: 'Las cifras también hablan',
  subtitulo: 'El maltrato animal es una realidad. Conoce los porcentajes:',
  ariaDona: 'Distribución porcentual de los tipos de maltrato animal',
  banner:
    'En total, el 100% de los casos representa una forma de violencia hacia los animales.',
  tituloAnimales: 'Porcentaje de maltrato según el tipo de animal',
  ariaAnimales:
    'Gráfico de barras del porcentaje de maltrato según el tipo de animal',
  captionTabla: 'Porcentaje de maltrato por tipo de animal',
  leyendaTitulo: 'Tipos de maltrato',
  nota: 'Datos de demostración. Sustituye los valores en src/data/estadisticas.ts.',
} as const;

export const tiposContenido = {
  id: 'tipos-maltrato',
  titulo: 'Tipos de maltrato',
  subtitulo: 'El maltrato animal puede ser:',
  ariaLista: 'Tipos de maltrato animal',
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
  teclado: 'Usa las teclas 1 a 4 para responder y Enter para continuar.',
  inicio: {
    titulo: '¿Listo para poner a prueba lo que sabes?',
    texto:
      'Responde 10 preguntas de opción múltiple sobre maltrato animal y tenencia responsable. El orden cambia en cada partida y verás una explicación después de cada respuesta.',
    detalles: [
      '10 preguntas',
      'Orden aleatorio',
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
        minimo: 9,
        titulo: '¡Eres una voz experta!',
        texto:
          'Sabes muy bien cómo proteger a los animales. Comparte lo que aprendiste.',
      },
      {
        minimo: 7,
        titulo: '¡Muy buen trabajo!',
        texto:
          'Tienes una base sólida. Repasa las respuestas y vuelve a intentarlo.',
      },
      {
        minimo: 5,
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

export const ayudaContenido = {
  id: 'ayuda',
  titulo: 'Ayuda y recursos',
  subtitulo: 'Hay muchas formas de tender una pata.',
  compartir: 'Comparte esta revista',
  nota: 'Juntos podemos hacer la diferencia',
  idRecursos: 'recursos',
  ariaRedes: 'Comparte esta revista en redes sociales',
} as const;

export const footerContenido = {
  cita: 'Pequeñas acciones, grandes cambios',
  sello: '¡Los animales también importan! ♡',
  enlaces: [
    { etiqueta: 'Inicio', destino: '/' },
    { etiqueta: 'Mi historia', destino: '/mi-historia' },
    { etiqueta: 'Estadísticas', destino: '/estadisticas' },
    { etiqueta: 'Galería', destino: '/galeria' },
    { etiqueta: 'Juego', destino: '/juego' },
  ] satisfies readonly EnlaceFooter[],
  copyright: '© 2026 Huellas de Esperanza. Hecho con empatía.',
  ariaEnlaces: 'Enlaces del pie de página',
} as const;

export const configuracion = {
  modoConejo: 'image' as ModoConejo,
  mostrarNotaDatosDemo: false,
  mostrarEnlacesFooter: true,
} as const;

export const placeholderComun = {
  volver: 'Volver al inicio',
} as const;

export const paginasPlaceholder = {
  miHistoria: {
    eyebrow: 'Próximamente',
    titulo: 'Mi historia',
    descripcion:
      'Aquí compartiremos la historia del conejo y las voces que inspiran esta revista.',
    icono: 'historia',
  },
  estadisticas: {
    eyebrow: 'Próximamente',
    titulo: 'Estadísticas',
    descripcion:
      'Ampliaremos los datos, fuentes y comparativas sobre el maltrato animal.',
    icono: 'estadisticas',
  },
  tiposMaltrato: {
    eyebrow: 'Próximamente',
    titulo: 'Tipos de maltrato',
    descripcion:
      'Cada tipo de maltrato tendrá su propia ficha con señales de alerta y recursos.',
    icono: 'tipos',
  },
  ayuda: {
    eyebrow: 'Próximamente',
    titulo: 'Ayuda',
    descripcion:
      'Encontrarás guías de denuncia, adopción responsable y apoyo profesional.',
    icono: 'ayuda',
  },
  galeria: {
    eyebrow: 'Próximamente',
    titulo: 'Galería',
    descripcion:
      'Una galería completa con historias, retratos y finales felices.',
    icono: 'galeria',
  },
  juego: {
    eyebrow: 'Próximamente',
    titulo: 'Juego',
    descripcion:
      'Más preguntas, niveles y retos para aprender jugando en familia.',
    icono: 'juego',
  },
  recursos: {
    eyebrow: 'Próximamente',
    titulo: 'Recursos',
    descripcion:
      'Documentos, contactos de refugios y materiales descargables.',
    icono: 'recursos',
  },
} as const;
