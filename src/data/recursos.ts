import type {
  AccesoRecurso,
  EnlaceSocial,
  SeccionRecursos,
} from './types';

export const recursosPagina = {
  eyebrow: 'Herramientas para ayudar',
  titulo: 'Recursos: Ayuda y herramientas',
  subtitulo:
    'Guías prácticas para adoptar, denunciar, cuidar y compartir. Los datos de contacto y las organizaciones son provisionales y están marcados como «Por completar».',
  frase: 'Una pata a tiempo cambia una vida',
  ariaSecciones: 'Recursos de ayuda para animales',
  ariaLista: 'Pasos y consejos',
  aviso:
    'Los teléfonos, correos, direcciones y nombres de organizaciones están pendientes de verificación. No uses estos datos hasta completarlos con fuentes oficiales.',
  pendiente: 'Por completar',
  compartirTitulo: 'Comparte esta revista',
  compartirTexto:
    'Difundir información veraz también ayuda. Comparte Huellas de Esperanza con tu entorno.',
  ariaRedes: 'Comparte esta revista en redes sociales',
  nota: 'Juntos podemos hacer la diferencia',
  teaser: {
    titulo: 'Ayuda y recursos',
    texto: 'Adopta, denuncia y aprende a cuidar.',
    boton: 'Ver todos los recursos',
    aria: 'Ir a la página de recursos de ayuda',
  },
  accesos: [
    { id: 'adopta', etiqueta: 'Adopta', icono: 'adopta' },
    { id: 'denuncia', etiqueta: 'Denuncia', icono: 'denuncia' },
    { id: 'consejos', etiqueta: 'Consejos', icono: 'consejos' },
  ] satisfies readonly AccesoRecurso[],
} as const;

export const seccionesRecursos: readonly SeccionRecursos[] = [
  {
    id: 'adopta',
    titulo: 'Adopta',
    intro:
      'Adoptar es un compromiso de por vida. Antes de dar el paso, revisa estos puntos.',
    icono: 'adopta',
    items: [
      {
        id: 'adopta-evalua',
        titulo: 'Evalúa tu tiempo y espacio',
        texto:
          'Piensa cuántas horas estará sola la mascota, si tu hogar es seguro y si puedes cubrir alimento, veterinario y cuidados durante toda su vida.',
      },
      {
        id: 'adopta-proceso',
        titulo: 'Elige un refugio o rescatista',
        texto:
          'Busca una organización verificable, visita el lugar y pregunta por su proceso de adopción. Contacto de referencia: Por completar.',
      },
      {
        id: 'adopta-prepara',
        titulo: 'Prepara el hogar',
        texto:
          'Reserva un espacio tranquilo, retira objetos peligrosos y ten agua, alimento y un transportín listos antes de la llegada.',
      },
      {
        id: 'adopta-compromiso',
        titulo: 'Asume el compromiso',
        texto:
          'Esterilización, vacunas, identificación y revisiones veterinarias forman parte de una tenencia responsable.',
      },
    ],
  },
  {
    id: 'denuncia',
    titulo: 'Denuncia',
    intro:
      'Si presencias maltrato, tu seguridad es lo primero. Documenta y reporta por los canales adecuados.',
    icono: 'denuncia',
    items: [
      {
        id: 'denuncia-documenta',
        titulo: 'Documenta sin exponerte',
        texto:
          'Toma fotos o video desde una distancia segura. No enfrentes al agresor ni pongas en riesgo a la persona que reporta.',
      },
      {
        id: 'denuncia-datos',
        titulo: 'Anota los datos',
        texto:
          'Registra lugar, fecha, hora, descripción de los hechos y, si es posible, testigos. Guarda una copia de las pruebas.',
      },
      {
        id: 'denuncia-reporta',
        titulo: 'Reporta a la autoridad',
        texto:
          'Acude a la autoridad local o a la línea de protección animal de tu zona. Contacto: Por completar.',
      },
      {
        id: 'denuncia-seguimiento',
        titulo: 'Haz seguimiento',
        texto:
          'Pide un número de radicado o referencia y consulta el estado del caso. Evita difundir datos personales en redes.',
      },
    ],
  },
  {
    id: 'organizaciones',
    titulo: 'Organizaciones',
    intro:
      'Refugios, rescatistas y veterinarias pueden orientarte. Verifica siempre que la organización exista y sea confiable.',
    icono: 'organizaciones',
    items: [
      {
        id: 'organizacion-refugio',
        titulo: 'Refugio local',
        texto: 'Nombre, dirección y contacto: Por completar.',
        pendiente: true,
      },
      {
        id: 'organizacion-proteccion',
        titulo: 'Organización de protección animal',
        texto: 'Nombre, cobertura y contacto: Por completar.',
        pendiente: true,
      },
      {
        id: 'organizacion-veterinaria',
        titulo: 'Veterinaria de apoyo',
        texto: 'Nombre, dirección y contacto: Por completar.',
        pendiente: true,
      },
    ],
  },
  {
    id: 'consejos',
    titulo: 'Consejos de cuidado',
    intro:
      'Cuidados básicos para el día a día. Ante cualquier duda de salud, consulta a un veterinario.',
    icono: 'consejos',
    items: [
      {
        id: 'consejo-perros',
        titulo: 'Perros',
        texto:
          'Agua limpia siempre, paseos diarios, alimento adecuado a su edad y peso, vacunas al día y compañía. Evita dejarlo atado o encerrado durante largas horas.',
      },
      {
        id: 'consejo-gatos',
        titulo: 'Gatos',
        texto:
          'Arena limpia, espacios para trepar y esconderse, agua fresca, alimento según su etapa y revisiones veterinarias. Necesitan estimulación y un lugar seguro.',
      },
      {
        id: 'consejo-conejos',
        titulo: 'Conejos',
        texto:
          'Heno disponible todo el día, agua limpia, espacio para moverse y un refugio tranquilo. Evita el calor extremo y consulta al veterinario ante cambios de apetito.',
      },
      {
        id: 'consejo-general',
        titulo: 'Todos los animales',
        texto:
          'Observa su comportamiento, mantén su entorno limpio y evita el maltrato psicológico: gritos, aislamiento o amenazas también causan sufrimiento.',
      },
    ],
  },
] as const;

export const redesSociales: readonly EnlaceSocial[] = [
  {
    id: 'facebook',
    nombre: 'Facebook',
    href: 'https://www.facebook.com',
    icono: 'facebook',
  },
  {
    id: 'instagram',
    nombre: 'Instagram',
    href: 'https://www.instagram.com',
    icono: 'instagram',
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    href: 'https://www.tiktok.com',
    icono: 'tiktok',
  },
  {
    id: 'youtube',
    nombre: 'YouTube',
    href: 'https://www.youtube.com',
    icono: 'youtube',
  },
  {
    id: 'whatsapp',
    nombre: 'WhatsApp',
    href: 'https://www.whatsapp.com',
    icono: 'whatsapp',
  },
] as const;
