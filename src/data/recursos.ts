import type { EnlaceSocial, RecursoItem } from './types';

export const recursosAyuda: readonly RecursoItem[] = [
  {
    id: 'adopta',
    titulo: 'Adopta',
    descripcion: 'Dale una segunda oportunidad.',
    icono: 'adopta',
    destino: '/ayuda',
  },
  {
    id: 'denuncia',
    titulo: 'Denuncia',
    descripcion: 'Reporta casos de maltrato animal.',
    icono: 'denuncia',
    destino: '/ayuda',
  },
  {
    id: 'organizaciones',
    titulo: 'Organizaciones',
    descripcion: 'Conoce refugios y ONGs.',
    icono: 'organizaciones',
    destino: '/ayuda',
  },
  {
    id: 'consejos',
    titulo: 'Consejos',
    descripcion: 'Cómo cuidar a tu mascota.',
    icono: 'consejos',
    destino: '/recursos',
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
