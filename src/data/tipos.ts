import { FUENTE_DOSSIER } from './estadisticas';
import { imagenes } from './imagenes';
import type { TipoMaltrato } from './types';

export const tiposMaltrato: readonly TipoMaltrato[] = [
  {
    id: 'fisico',
    nombre: 'Físico',
    descripcion: 'Golpes, patadas, heridas, uso de objetos o peleas entre animales.',
    definicion:
      'Uso intencional de fuerza física que causa dolor, lesión o sufrimiento. Incluye golpes, patadas, quemaduras, heridas con objetos y enfrentamientos forzados.',
    senales: [
      'Heridas, hematomas, cojeras o quemaduras sin explicación.',
      'Miedo intenso ante personas o ante un objeto concreto.',
      'Animales obligados a pelear o exhibidos con lesiones.',
    ],
    acciones: [
      'Documenta las lesiones sin enfrentar al agresor.',
      'Acude a POFOMA o a la Fiscalía para una denuncia penal.',
      'Busca atención veterinaria si el animal está herido.',
    ],
    baseLegal: 'Ley 700, Art. 350 ter (biocidio y maltrato con sevicia)',
    imagen: imagenes.tipos.fisico,
    alt: 'Imagen provisional de un perro para ilustrar el maltrato físico',
    icono: 'fisico',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'abandono',
    nombre: 'Abandono',
    descripcion: 'Dejar a los animales en la calle sin alimento, agua o refugio.',
    definicion:
      'Separar a un animal de su hogar y dejarlo sin supervisión, alimento, agua o refugio. También incluye dejarlo atado o encerrado de forma permanente.',
    senales: [
      'Animales solos en la vía pública durante días.',
      'Perros o gatos atados sin agua ni comida.',
      'Camadas dejadas en cajas, bolsas o terrenos baldíos.',
    ],
    acciones: [
      'Registra dirección, fecha y estado del animal.',
      'Reporta el caso a Zoonosis municipal o a POFOMA.',
      'No lo traslades sin evaluar riesgos; pide orientación a un refugio.',
    ],
    baseLegal: 'Ley 700 (maltrato animal) y normativa municipal de tenencia responsable',
    imagen: imagenes.tipos.abandono,
    alt: 'Imagen provisional de un perro en situación de abandono',
    icono: 'abandono',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'negligencia',
    nombre: 'Negligencia',
    descripcion: 'Falta de cuidados, mala alimentación, enfermedades sin tratar.',
    definicion:
      'Omisión de los cuidados básicos necesarios para vivir: agua, alimento, refugio, higiene, atención veterinaria y protección frente al clima.',
    senales: [
      'Desnutrición, sed extrema o falta de refugio.',
      'Enfermedades o heridas visibles sin tratamiento.',
      'Animales en espacios contaminados o sin ventilación.',
    ],
    acciones: [
      'Documenta el estado físico y el entorno.',
      'Denuncia ante Zoonosis municipal o POFOMA.',
      'Ofrece agua solo si es seguro y no interfiere con la denuncia.',
    ],
    baseLegal: 'Ley 700 (maltrato animal)',
    imagen: imagenes.tipos.negligencia,
    alt: 'Imagen provisional de un gato para ilustrar la negligencia',
    icono: 'negligencia',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'psicologico',
    nombre: 'Psicológico',
    descripcion: 'Miedo, encierro, abuso verbal o falta de atención.',
    definicion:
      'Conductas que generan miedo, ansiedad o aislamiento prolongado: gritos, amenazas, encierro, falta de estímulos y separación de su grupo.',
    senales: [
      'Animales que se esconden, tiemblan o evitan todo contacto.',
      'Encierro prolongado sin espacio para moverse o explorar.',
      'Conductas repetitivas o destructivas por estrés.',
    ],
    acciones: [
      'Anota patrones y horarios de la conducta observada.',
      'Consulta a un veterinario o etólogo para descartar otras causas.',
      'Denuncia el encierro o maltrato continuo ante la autoridad local.',
    ],
    baseLegal: 'Ley 700 (maltrato animal)',
    imagen: imagenes.tipos.psicologico,
    alt: 'Imagen provisional de un conejo para ilustrar el maltrato psicológico',
    icono: 'psicologico',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
  {
    id: 'explotacion',
    nombre: 'Explotación',
    descripcion: 'Trabajo forzado, peleas, venta ilegal, experimentación.',
    definicion:
      'Uso de animales para beneficio económico o recreativo sin garantizar su bienestar: trabajo forzado, peleas, venta ilegal de fauna y experimentación.',
    senales: [
      'Animales de fauna silvestre en ferias o jaulas pequeñas.',
      'Caballos o animales de carga sobreexplotados.',
      'Peleas organizadas o venta ilegal de especies.',
    ],
    acciones: [
      'No compres fauna silvestre ni promuevas su venta.',
      'Denuncia el tráfico ante POFOMA.',
      'Reporta el maltrato en transporte o faena a SENASAG.',
    ],
    baseLegal:
      'Ley 700, Ley 1333 (fauna silvestre) y R.A. SENASAG 0230/2024',
    imagen: imagenes.tipos.explotacion,
    alt: 'Imagen provisional de un caballo para ilustrar la explotación animal',
    icono: 'explotacion',
    fuente: FUENTE_DOSSIER,
    verificado: false,
  },
] as const;

export const tiposPagina = {
  eyebrow: 'Conocer para actuar',
  titulo: 'Tipos de maltrato',
  subtitulo:
    'Cinco formas de violencia animal, con señales de alerta, acciones posibles y la norma boliviana que las enmarca.',
  frase: 'Reconocer el maltrato es el primer paso para detenerlo',
  listaAria: 'Tipos de maltrato animal en Bolivia',
  fichasTitulo: 'Fichas de tipos de maltrato',
  fichasTexto:
    'Cada ficha reúne una definición, señales de alerta, acciones posibles y la norma que la enmarca.',
  definicionTitulo: 'Qué es',
  senalesTitulo: 'Señales de alerta',
  accionesTitulo: 'Qué puedes hacer',
  baseLegalTitulo: 'Base legal',
  ctaTexto:
    'Si presencias maltrato, prioriza tu seguridad y reporta por los canales oficiales.',
  ctaBoton: 'Ir a ayuda y denuncia',
  ctaAria: 'Ir a la página de ayuda para denunciar maltrato animal',
  teaser: {
    titulo: 'Tipos de maltrato',
    texto: 'Físico, abandono, negligencia, psicológico y explotación.',
    boton: 'Ver tipos',
    aria: 'Ir a la página de tipos de maltrato con sus señales y base legal',
  },
} as const;
