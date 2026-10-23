export const rutas = {
  inicio: '/',
  miHistoria: '/mi-historia',
  estadisticas: '/estadisticas',
  tiposMaltrato: '/tipos-de-maltrato',
  ayuda: '/ayuda',
  galeria: '/galeria',
  juego: '/juego',
  recursos: '/recursos',
} as const;

export type RutaApp = (typeof rutas)[keyof typeof rutas];
