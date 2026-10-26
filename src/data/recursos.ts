import type {
  AccesoRecurso,
  EnlaceSocial,
  InstitucionCompetencia,
  LineaAtencion,
  PasoProtocolo,
  Refugio,
  SeccionRecursos,
} from './types';

export const ayudaPagina = {
  eyebrow: 'Canales oficiales',
  titulo: 'Ayuda: Denuncia el maltrato',
  subtitulo:
    'Protocolo, líneas directas e instituciones competentes para reportar maltrato animal en Bolivia. Prioriza tu seguridad y no confrontes al agresor.',
  frase: 'Denunciar a tiempo puede salvar una vida',
} as const;

export const recursosPagina = {
  eyebrow: 'Herramientas para ayudar',
  titulo: 'Recursos: Ayuda y herramientas',
  subtitulo:
    'Protocolo de denuncia, líneas oficiales, instituciones competentes, directorio de refugios y guías de adopción y cuidado.',
  frase: 'Una pata a tiempo cambia una vida',
  ariaSecciones: 'Recursos de ayuda para animales',
  ariaLista: 'Pasos y consejos',
  aviso:
    'Los teléfonos, direcciones y nombres de instituciones provienen del dossier o de fuentes asignadas. Cada ficha indica si está verificada, pendiente o en revisión; confirma cada dato antes de usarlo en una emergencia.',
  compartirTitulo: 'Comparte esta revista',
  compartirTexto:
    'Difundir información veraz también ayuda. Comparte Huellas de Esperanza con tu entorno.',
  ariaRedes: 'Comparte esta revista en redes sociales',
  redGenerica:
    'Enlace genérico de la plataforma; cuenta oficial pendiente.',
  nota: 'Juntos podemos hacer la diferencia',
  protocoloTitulo: 'Protocolo para denunciar',
  protocoloIntro:
    'Sigue estos pasos si presencias maltrato. No pongas en riesgo tu integridad ni la de otras personas.',
  lineasTitulo: 'Líneas de atención directa',
  lineasIntro:
    'Canales citados en el dossier o en fuentes asignadas. Los números con discrepancia no habilitan llamada; confírmalos antes de usarlos.',
  institucionesTitulo: 'Instituciones competentes',
  institucionesIntro:
    'Cada institución atiende un tipo distinto de caso. Elegir el canal correcto evita perder tiempo.',
  institucionHeader: 'Institución',
  competenciaHeader: 'Competencia',
  cuandoHeader: '¿Cuándo acudir?',
  refugiosTitulo: 'Directorio de refugios y centros de rescate',
  refugiosIntro:
    'Contactos citados en el dossier o en fuentes asignadas. Cada ficha indica su estado de verificación.',
  guiasTitulo: 'Adopción y cuidado',
  guiasIntro:
    'Pautas para asumir una tenencia responsable y cuidar a los animales del hogar.',
  fuente: 'Fuente',
  llamar: 'Llamar',
  whatsapp: 'WhatsApp',
  coordinacion: 'Coordinación',
  confirmarAntesDeLlamar: 'Confirmar antes de llamar.',
  teaser: {
    titulo: 'Ayuda y recursos',
    texto: 'Protocolo, teléfonos oficiales, refugios y consejos de cuidado.',
    boton: 'Ver todos los recursos',
    aria: 'Ir a la página de recursos de ayuda con canales oficiales de Bolivia',
  },
  accesos: [
    { id: 'adopta', etiqueta: 'Adopta', icono: 'adopta' },
    { id: 'denuncia', etiqueta: 'Denuncia', icono: 'denuncia' },
    { id: 'organizaciones', etiqueta: 'Refugios', icono: 'organizaciones' },
    { id: 'consejos', etiqueta: 'Consejos', icono: 'consejos' },
  ] satisfies readonly AccesoRecurso[],
} as const;

export const protocoloDenuncia: readonly PasoProtocolo[] = [
  {
    id: 'registro',
    titulo: 'Registra las pruebas',
    texto:
      'Toma fotos y videos claros del maltrato o del estado del animal sin confrontar al agresor. Anota la dirección exacta, la fecha, la hora y los testigos presenciales.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'denuncia',
    titulo: 'Acude a la autoridad',
    texto:
      'Presenta la denuncia en la Estación Policial Integral (EPI) más cercana o en las oficinas de POFOMA de la capital de tu departamento.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'linea',
    titulo: 'Usa el canal adecuado',
    texto:
      'Para delitos penales y fauna silvestre, contacta a POFOMA. Si hay flagrancia, llama a Radio Patrulla (110); para una emergencia general, marca 911.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
] as const;

export const lineasAtencion: readonly LineaAtencion[] = [
  {
    id: 'pofoma-celular',
    nombre: 'POFOMA · celular y WhatsApp',
    descripcion: 'Denuncias inmediatas de maltrato y tráfico de fauna.',
    telefono: '+591 69005708',
    tel: 'tel:+59169005708',
    whatsapp: 'https://wa.me/59169005708',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'pofoma-gratuita',
    nombre: 'POFOMA · línea gratuita',
    descripcion: 'Recepción de denuncias ciudadanas a nivel nacional.',
    telefono: '800 14 0303',
    tel: 'tel:800140303',
    estadoVerificacion: 'fuente-asignada',
    fuentes: ['pofoma-linea'],
  },
  {
    id: 'radio-patrulla',
    nombre: 'Radio Patrulla',
    descripcion: 'Flagrancia y emergencias policiales.',
    telefono: '110',
    tel: 'tel:110',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'emergencias',
    nombre: 'Emergencias generales',
    descripcion: 'Riesgo inmediato para personas o animales.',
    telefono: '911',
    tel: 'tel:911',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'pofoma-cochabamba-2020',
    nombre: 'POFOMA Cochabamba · contacto histórico (2020)',
    descripcion:
      'Números publicados por prensa en 2020 para denuncias en Cochabamba. Confirmar vigencia; no usar como canal principal.',
    telefono: '76454235 / 72005779',
    tel: 'tel:76454235',
    estadoVerificacion: 'discrepancia',
    fuentes: ['pofoma-cbba'],
  },
] as const;

export const institucionesCompetencia: readonly InstitucionCompetencia[] = [
  {
    id: 'pofoma',
    institucion: 'POFOMA / Policía',
    competencia:
      'Delitos penales contra la vida animal y fauna silvestre (Ley 700 / Ley 1333).',
    cuando:
      'Biocidio, golpizas severas, envenenamiento y tenencia o tráfico de loros, monos y quirquinchos.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'zoonosis',
    institucion: 'Zoonosis Municipal / Casa de la Mascota',
    competencia:
      'Control sanitario, mordeduras, abandono urbano, registro y campañas de vacunación.',
    cuando:
      'Canes en la vía pública sin control, denuncias por ruidos o hacinamiento en viviendas vecinas y campañas antirrábicas.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'senasag',
    institucion: 'SENASAG',
    competencia:
      'Sanidad agropecuaria, transporte interdepartamental y faenado en mataderos.',
    cuando:
      'Crueldad en transporte de ganado, mataderos clandestinos o incumplimiento de bienestar animal en granjas pecuarias.',
    estadoVerificacion: 'fuente-asignada',
    fuentes: ['regensa-bienestar', 'regensa-remates'],
  },
] as const;

export const refugios: readonly Refugio[] = [
  {
    id: 'animales-sos',
    departamento: 'La Paz',
    nombre: 'Animales SOS Bolivia',
    descripcion:
      'Pioneros en rescate, albergue y adopción responsable.',
    telefonos: [
      {
        etiqueta: 'Teléfono',
        numero: '(591-2) 2414687',
        tel: 'tel:+59122414687',
      },
    ],
    coordinacion:
      'El directorio comercial lista 77229500; ningún número está confirmado.',
    estadoVerificacion: 'discrepancia',
    fuentes: ['animales-sos'],
  },
  {
    id: 'refugio-esperanza',
    departamento: 'Santa Cruz',
    nombre: 'Refugio Esperanza Bolivia',
    descripcion:
      'Rehabilitación de animales víctimas de violencia.',
    telefonos: [
      {
        etiqueta: 'Contacto 1',
        numero: '+591 60004099',
        tel: 'tel:+59160004099',
      },
      {
        etiqueta: 'Contacto 2',
        numero: '+591 61506208',
        tel: 'tel:+59161506208',
      },
    ],
    coordinacion: 'Santa Cruz de la Sierra',
    estadoVerificacion: 'verificado',
    fuentes: ['refugio-esperanza'],
  },
  {
    id: 'gamaliel-apaf',
    departamento: 'Cochabamba',
    nombre: 'Refugio Gamaliel / APAF',
    descripcion:
      'Rescate y acogida de animales comunitarios maltratados.',
    telefonos: [],
    coordinacion: 'Redes sociales y campañas de adopción dominicales',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'spat',
    departamento: 'Tarija',
    nombre: 'SPAT · Sociedad Protectora de Tarija',
    descripcion:
      'Defensa animal y fomento de esterilizaciones junto al Albergue Municipal San Roque y rescatistas independientes locales.',
    telefonos: [],
    coordinacion: 'Albergue Municipal San Roque y rescatistas locales',
    estadoVerificacion: 'fuente-asignada',
    fuentes: ['spat'],
  },
] as const;

export const seccionesRecursos: readonly SeccionRecursos[] = [
  {
    id: 'adopta',
    titulo: 'Adopta',
    intro:
      'Adoptar es un compromiso de por vida. Antes de dar el paso, revisa estos puntos y consulta el directorio de refugios.',
    icono: 'adopta',
    items: [
      {
        id: 'adopta-evalua',
        titulo: 'Evalúa tu tiempo y espacio',
        texto:
          'Piensa cuántas horas estará sola la mascota, si tu hogar es seguro y si puedes cubrir alimento, veterinario y cuidados durante toda su vida.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
      },
      {
        id: 'adopta-proceso',
        titulo: 'Elige un refugio o rescatista',
        texto:
          'Busca una organización verificable, visita el lugar y pregunta por su proceso de adopción. Usa el directorio de refugios de esta página como punto de partida.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
      },
      {
        id: 'adopta-prepara',
        titulo: 'Prepara el hogar',
        texto:
          'Reserva un espacio tranquilo, retira objetos peligrosos y ten agua, alimento y un transportín listos antes de la llegada.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
      },
      {
        id: 'adopta-compromiso',
        titulo: 'Asume el compromiso',
        texto:
          'Esterilización, vacunas, identificación y revisiones veterinarias forman parte de una tenencia responsable.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
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
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
      },
      {
        id: 'consejo-gatos',
        titulo: 'Gatos',
        texto:
          'Arena limpia, espacios para trepar y esconderse, agua fresca, alimento según su etapa y revisiones veterinarias. Necesitan estimulación y un lugar seguro.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
      },
      {
        id: 'consejo-conejos',
        titulo: 'Conejos',
        texto:
          'Heno disponible todo el día, agua limpia, espacio para moverse y un refugio tranquilo. Evita el calor extremo y consulta al veterinario ante cambios de apetito.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
      },
      {
        id: 'consejo-general',
        titulo: 'Todos los animales',
        texto:
          'Observa su comportamiento, mantén su entorno limpio y evita el maltrato psicológico: gritos, aislamiento o amenazas también causan sufrimiento.',
        estadoVerificacion: 'sin-verificar',
        fuentes: [],
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
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'instagram',
    nombre: 'Instagram',
    href: 'https://www.instagram.com',
    icono: 'instagram',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'tiktok',
    nombre: 'TikTok',
    href: 'https://www.tiktok.com',
    icono: 'tiktok',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'youtube',
    nombre: 'YouTube',
    href: 'https://www.youtube.com',
    icono: 'youtube',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'whatsapp',
    nombre: 'WhatsApp',
    href: 'https://www.whatsapp.com',
    icono: 'whatsapp',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
] as const;
