import type { MarcoLegalItem } from './types';

export const marcoLegal: readonly MarcoLegalItem[] = [
  {
    id: 'ley-700',
    titulo: 'Biocidio y maltrato con sevicia',
    norma: 'Ley 700 · Código Penal, Art. 350 ter',
    resumen:
      'La Ley 700 incorporó el Artículo 350 ter al Código Penal boliviano y fijó una pena de 2 a 5 años de cárcel para quien mate con ensañamiento a un animal.',
    aplicacion:
      'Aplica a casos de biocidio, golpizas severas y maltrato con sevicia. La denuncia penal se canaliza ante POFOMA o la Fiscalía.',
    estadoVerificacion: 'fuente-asignada',
    fuentes: ['ley700-pl', 'gaceta'],
  },
  {
    id: 'senasag',
    titulo: 'Bienestar animal en faena y transporte',
    norma: 'REGENSA · Capítulo 1.3 Bienestar Animal (SENASAG)',
    resumen:
      'La regulación exige aturdimiento humanitario obligatorio y prohíbe el uso de picanas y castigos mecánicos durante la faena.',
    aplicacion:
      'Aplica a mataderos, transporte de ganado y establecimientos pecuarios. Las denuncias por incumplimiento corresponden a SENASAG.',
    estadoVerificacion: 'discrepancia',
    fuentes: ['regensa-bienestar', 'regensa-remates'],
  },
  {
    id: 'ley-1333',
    titulo: 'Fauna silvestre y tráfico ilegal',
    norma: 'Ley 1333 · Art. 111',
    resumen:
      'La tenencia, compra o comercialización de fauna silvestre está prohibida por la Ley 1333, con penas de privación de libertad.',
    aplicacion:
      'Aplica a loros, parabas, monos, tortugas y otras especies silvestres ofrecidas como mascotas. POFOMA investiga el tráfico y los rescates.',
    estadoVerificacion: 'sin-verificar',
    fuentes: [],
  },
  {
    id: 'agemed',
    titulo: 'Cosméticos y testeo en animales',
    norma: 'AGEMED · Decisión CAN 833',
    resumen:
      'AGEMED regula los registros sanitarios cosméticos bajo la Decisión 833 de la Comunidad Andina. Bolivia no prohíbe la importación ni la venta de marcas que testean en animales en terceros países.',
    aplicacion:
      'La normativa nacional no realiza testeo cosmético masivo en conejos, pero tampoco impide el ingreso de productos testeados fuera del país. El consumo ético y la información al comprador son claves.',
    estadoVerificacion: 'sin-verificar',
    fuentes: ['can833'],
  },
] as const;

export const marcoLegalPagina = {
  eyebrow: 'Marco normativo',
  titulo: 'Qué dice la ley en Bolivia',
  subtitulo:
    'Normas citadas en el dossier oficial. Cada ficha indica su aplicación, su estado de verificación y las fuentes asignadas.',
  aria: 'Marco legal boliviano sobre maltrato animal',
  aplicacionTitulo: 'Aplicación',
} as const;
