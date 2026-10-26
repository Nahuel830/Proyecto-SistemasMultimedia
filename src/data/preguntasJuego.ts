import type { PreguntaJuego } from './types';

export const PREGUNTAS_POR_PARTIDA = 5;

export const preguntasJuego: readonly PreguntaJuego[] = [
  {
    id: 1,
    pregunta: '¿Cuál es la pena máxima por biocidio según la Ley 700 en Bolivia?',
    opciones: [
      { id: 'a', texto: '6 meses a 1 año de trabajo comunitario' },
      { id: 'b', texto: '2 a 5 años de cárcel (Art. 350 ter CP)' },
      { id: 'c', texto: 'Solo una sanción económica municipal' },
    ],
    correctaId: 'b',
    feedback:
      'La Ley 700 incorporó el Artículo 350 ter al Código Penal boliviano y fijó una reclusión de 2 a 5 años para quien mate con ensañamiento a un animal.',
    estadoVerificacion: 'fuente-asignada',
    fuentes: ['ley700-pl', 'gaceta'],
  },
  {
    id: 2,
    pregunta: 'En la campaña viral "Save Ralph", ¿qué prueba sufren los conejos?',
    opciones: [
      { id: 'a', texto: 'Test Draize de irritación ocular y cutánea' },
      { id: 'b', texto: 'Vacunación preventiva contra la rabia' },
      { id: 'c', texto: 'Pruebas de velocidad y agilidad física' },
    ],
    correctaId: 'a',
    feedback:
      'El test Draize aplica químicos y cosméticos directamente en los ojos o la piel afeitada de conejos conscientes, sin anestesia.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 3,
    pregunta: '¿Qué entidad policial especializada atiende el maltrato animal en Bolivia?',
    opciones: [
      { id: 'a', texto: 'Tránsito y Vialidad' },
      { id: 'b', texto: 'POFOMA (Policía Forestal y Medio Ambiente)' },
      { id: 'c', texto: 'Dirección de Migración' },
    ],
    correctaId: 'b',
    feedback:
      'POFOMA es la unidad especializada de la Policía Boliviana encargada de investigar biocidios, tratos crueles y tráfico ilícito de fauna.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 4,
    pregunta: '¿Cuál es la postura legal de Bolivia sobre cosméticos testeados en animales?',
    opciones: [
      { id: 'a', texto: 'Están prohibidos por ley expresa desde 2010' },
      { id: 'b', texto: 'No existe prohibición de importación ni venta' },
      { id: 'c', texto: 'El SENASAG confisca todo producto cosmético' },
    ],
    correctaId: 'b',
    feedback:
      'Bolivia no tiene una ley nacional que prohíba el testeo cosmético ni la importación de cosméticos probados en animales fuera de sus fronteras.',
    estadoVerificacion: 'sin-verificar',
    fuentes: ['can833'],
  },
  {
    id: 5,
    pregunta: '¿Cuántas Libertades del Bienestar Animal exige el SENASAG?',
    opciones: [
      { id: 'a', texto: 'Solo 2 libertades relacionadas con comida' },
      { id: 'b', texto: '5 Libertades fundamentales para el ganado' },
      { id: 'c', texto: 'No existen regulaciones de bienestar pecuario' },
    ],
    correctaId: 'b',
    feedback:
      'Las 5 Libertades incluyen estar libre de hambre y sed, dolor y enfermedad, miedo y angustia, incomodidad física y poder expresar el comportamiento natural.',
    estadoVerificacion: 'discrepancia',
    fuentes: ['regensa-bienestar'],
  },
  {
    id: 6,
    pregunta: '¿Qué exige el reglamento de mataderos del SENASAG antes del faenado?',
    opciones: [
      { id: 'a', texto: 'El uso obligatorio de picanas eléctricas' },
      { id: 'b', texto: 'Aturdimiento o insensibilización humanitaria' },
      { id: 'c', texto: 'Dejar al animal sin agua por 48 horas' },
    ],
    correctaId: 'b',
    feedback:
      'La regulación SENASAG exige aturdimiento o insensibilización previa y veta las picanas y los castigos mecánicos que generen angustia.',
    estadoVerificacion: 'discrepancia',
    fuentes: ['regensa-bienestar', 'regensa-remates'],
  },
  {
    id: 7,
    pregunta: '¿Qué organismo regula los registros sanitarios cosméticos en Bolivia?',
    opciones: [
      { id: 'a', texto: 'AGEMED (Ministerio de Salud y Deportes)' },
      { id: 'b', texto: 'Viceministerio de Defensa del Consumidor' },
      { id: 'c', texto: 'La Autoridad de Fiscalización del Juego' },
    ],
    correctaId: 'a',
    feedback:
      'La Decisión 833 de la CAN establece la Notificación Sanitaria Obligatoria (NSO) para cosméticos. En Bolivia, AGEMED es la autoridad señalada para aplicarla.',
    estadoVerificacion: 'fuente-asignada',
    fuentes: ['can833'],
  },
  {
    id: 8,
    pregunta: '¿Tener un animal silvestre (loro, mono, tortuga) como mascota es delito?',
    opciones: [
      { id: 'a', texto: 'No, si se compra en ferias zonales reconocidas' },
      { id: 'b', texto: 'Sí, está penado por la Ley 1333 de Medio Ambiente' },
      { id: 'c', texto: 'Solo si el animal es de gran tamaño' },
    ],
    correctaId: 'b',
    feedback:
      'La tenencia, compra o comercialización de fauna silvestre está prohibida por la Ley 1333 (Art. 111), con penas de privación de libertad.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 9,
    pregunta:
      '¿Qué número de mensajería se ha difundido para denuncias de POFOMA?',
    opciones: [
      { id: 'a', texto: '911 exclusivo para mascotas' },
      { id: 'b', texto: 'Celular nacional +591 69005708' },
      { id: 'c', texto: 'Línea postal sin recepción digital' },
    ],
    correctaId: 'b',
    feedback:
      'El 69005708 aparece en el dossier, pero no se confirmó en una fuente oficial: verifícalo antes de usarlo. La línea gratuita citada es 800 14 0303.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 10,
    pregunta: '¿Cuál es el método más ético y efectivo contra la sobrepoblación canina?',
    opciones: [
      { id: 'a', texto: 'Captura y eutanasia indiscriminada' },
      { id: 'b', texto: 'Esterilización masiva, temprana y gratuita' },
      { id: 'c', texto: 'Venta informal en mercados ambulantes' },
    ],
    correctaId: 'b',
    feedback:
      'La OMS, Zoonosis y los colectivos de bienestar animal confirman que la esterilización masiva junto a la tenencia responsable es la única vía humanitaria sostenible.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
] as const;

export const letrasOpciones = ['A', 'B', 'C'] as const;

export const juegoPagina = {
  eyebrow: 'Aprende jugando',
  titulo: 'Juego: ¿Qué tanto sabes?',
  subtitulo:
    'Cada partida elige 5 de 10 preguntas sobre la normativa boliviana. Las preguntas y las opciones cambian de orden, y cada respuesta incluye una explicación.',
  frase: 'Jugar también es una forma de cuidar',
  teaser: {
    texto: 'Cinco preguntas al azar sobre leyes y bienestar animal en Bolivia.',
    boton: 'Jugar',
    aria: 'Ir a la página del juego y empezar el quiz de cinco preguntas',
  },
} as const;
