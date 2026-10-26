export type IconoNavegacion =
  | 'inicio'
  | 'historia'
  | 'estadisticas'
  | 'tipos'
  | 'ayuda'
  | 'galeria'
  | 'juego'
  | 'recursos';

export type IconoTipoMaltrato =
  | 'fisico'
  | 'abandono'
  | 'negligencia'
  | 'psicologico'
  | 'explotacion';

export type IconoRecurso =
  | 'adopta'
  | 'denuncia'
  | 'organizaciones'
  | 'consejos';

export type IconoSocial =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'whatsapp';

export type IconoCifra = 'casos' | 'sentencias' | 'pena' | 'norma';

export type ModoConejo = 'image' | '3d';

export interface EnlaceNavegacion {
  readonly id: IconoNavegacion;
  readonly etiqueta: string;
  readonly destino: string;
  readonly icono: IconoNavegacion;
}

export interface AccesoRapido {
  readonly id: string;
  readonly etiqueta: string;
  readonly destino: string;
  readonly icono: IconoNavegacion;
}

export interface CifraBolivia {
  readonly id: string;
  readonly valor: string;
  readonly etiqueta: string;
  readonly detalle: string;
  readonly icono: IconoCifra;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface DatoMaltrato {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly porcentaje: number;
  readonly color: string;
  readonly ilustrativo: true;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface DatoAnimal {
  readonly id: string;
  readonly nombre: string;
  readonly porcentaje: number;
  readonly color: string;
  readonly imagen: string;
  readonly alt: string;
  readonly ilustrativo: true;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface MarcoLegalItem {
  readonly id: string;
  readonly titulo: string;
  readonly norma: string;
  readonly resumen: string;
  readonly aplicacion: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface TipoMaltrato {
  readonly id: IconoTipoMaltrato;
  readonly nombre: string;
  readonly descripcion: string;
  readonly definicion: string;
  readonly senales: readonly string[];
  readonly acciones: readonly string[];
  readonly baseLegal: string;
  readonly imagen: string;
  readonly alt: string;
  readonly icono: IconoTipoMaltrato;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface OpcionJuego {
  readonly id: string;
  readonly texto: string;
}

export interface PreguntaJuego {
  readonly id: number;
  readonly pregunta: string;
  readonly opciones: readonly OpcionJuego[];
  readonly correctaId: string;
  readonly feedback: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export type CategoriaGaleria =
  | 'perros'
  | 'gatos'
  | 'conejos'
  | 'granja'
  | 'aves'
  | 'otros';

export interface GaleriaItem {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly titulo: string;
  readonly caso: string;
  readonly entidad: string;
  readonly descripcion: string;
  readonly categoria: CategoriaGaleria;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface CategoriaGaleriaItem {
  readonly id: 'todas' | CategoriaGaleria;
  readonly etiqueta: string;
}

export interface RecursoDetalle {
  readonly id: string;
  readonly titulo: string;
  readonly texto: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface SeccionRecursos {
  readonly id: IconoRecurso;
  readonly titulo: string;
  readonly intro: string;
  readonly icono: IconoRecurso;
  readonly items: readonly RecursoDetalle[];
}

export interface AccesoRecurso {
  readonly id: IconoRecurso;
  readonly etiqueta: string;
  readonly icono: IconoRecurso;
}

export interface EnlaceSocial {
  readonly id: IconoSocial;
  readonly nombre: string;
  readonly href: string;
  readonly icono: IconoSocial;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface PasoProtocolo {
  readonly id: string;
  readonly titulo: string;
  readonly texto: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface LineaAtencion {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly telefono: string;
  readonly tel: string;
  readonly whatsapp?: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface InstitucionCompetencia {
  readonly id: string;
  readonly institucion: string;
  readonly competencia: string;
  readonly cuando: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface TelefonoRefugio {
  readonly etiqueta: string;
  readonly numero: string;
  readonly tel: string;
}

export interface Refugio {
  readonly id: string;
  readonly departamento: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly telefonos: readonly TelefonoRefugio[];
  readonly coordinacion?: string;
  readonly fuente: string;
  readonly verificado: boolean;
}

export interface EnlaceFooter {
  readonly etiqueta: string;
  readonly destino: string;
}

export interface CapituloHistoria {
  readonly id: string;
  readonly titulo: string;
  readonly parrafos: readonly string[];
}
