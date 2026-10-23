import {
  Brain,
  Building2,
  ChartBar,
  Facebook,
  FolderOpen,
  Gamepad2,
  Heart,
  House,
  Image,
  Instagram,
  Lightbulb,
  Link2,
  MessageCircle,
  Music2,
  PawPrint,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
  Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type {
  IconoNavegacion,
  IconoRecurso,
  IconoSocial,
  IconoTipoMaltrato,
} from '../data/types';

export const iconosNavegacion: Record<IconoNavegacion, LucideIcon> = {
  inicio: House,
  historia: PawPrint,
  estadisticas: ChartBar,
  tipos: TriangleAlert,
  ayuda: Heart,
  galeria: Image,
  juego: Gamepad2,
  recursos: FolderOpen,
};

export const iconosTipos: Record<IconoTipoMaltrato, LucideIcon> = {
  fisico: ShieldAlert,
  abandono: House,
  negligencia: Stethoscope,
  psicologico: Brain,
  explotacion: Link2,
};

export const iconosRecursos: Record<IconoRecurso, LucideIcon> = {
  adopta: House,
  denuncia: ShieldCheck,
  organizaciones: Building2,
  consejos: Lightbulb,
};

export const iconosSociales: Record<IconoSocial, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  youtube: Youtube,
  whatsapp: MessageCircle,
};

export function IconoHuella({ size = 24 }: { readonly size?: number }) {
  return <PawPrint size={size} aria-hidden="true" />;
}
