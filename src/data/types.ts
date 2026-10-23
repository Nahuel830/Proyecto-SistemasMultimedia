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

export interface DatoMaltrato {
  readonly id: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly porcentaje: number;
  readonly color: string;
}

export interface DatoAnimal {
  readonly id: string;
  readonly nombre: string;
  readonly porcentaje: number;
  readonly color: string;
  readonly imagen: string;
  readonly alt: string;
}

export interface TipoMaltrato {
  readonly id: IconoTipoMaltrato;
  readonly nombre: string;
  readonly descripcion: string;
  readonly imagen: string;
  readonly alt: string;
  readonly icono: IconoTipoMaltrato;
}

export interface PreguntaJuego {
  readonly id: number;
  readonly pregunta: string;
  readonly opciones: readonly string[];
  readonly correcta: number;
  readonly feedback: string;
}

export interface GaleriaItem {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly titulo: string;
}

export interface RecursoItem {
  readonly id: IconoRecurso;
  readonly titulo: string;
  readonly descripcion: string;
  readonly icono: IconoRecurso;
  readonly destino: string;
}

export interface EnlaceSocial {
  readonly id: IconoSocial;
  readonly nombre: string;
  readonly href: string;
  readonly icono: IconoSocial;
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
