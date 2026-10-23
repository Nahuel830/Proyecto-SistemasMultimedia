# Huellas de Esperanza

Revista web interactiva contra el maltrato animal. El dashboard principal (**Inicio**) está completo; el resto de secciones existen como rutas placeholder a la espera de sus páginas definitivas.

## Requisitos

- Node.js 20 o superior (probado con Node 24).
- npm 10 o superior.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

El servidor de desarrollo queda disponible en `http://localhost:5173` (también responde en `http://127.0.0.1:5173`).

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Typecheck (`tsc -b`) + build de producción en `dist/`. |
| `npm run preview` | Sirve el build de producción. |
| `npm run lint` | Linter (oxlint). Los avisos de `public/draco/` son de código vendorizado de Three.js. |
| `npm run models:optimize` | Optimiza `public/models/source/conejo.glb` a `public/models/conejo.glb` con Draco y WebP. |

## Estado de verificación final (2026-10-23)

- `npm run build`: **OK**, sin errores de TypeScript (`tsc -b` + `vite build`).
- `npm run dev`: responde **HTTP 200** en `http://127.0.0.1:5173/`.
- Rutas verificadas con respuesta 200: `/`, `/mi-historia`, `/estadisticas`, `/tipos-de-maltrato`, `/ayuda`, `/galeria`, `/juego`, `/recursos`.
- `npm run lint`: sin errores. Quedan avisos menores de React (`set-state-in-effect`, exportaciones auxiliares) y los avisos del Draco vendorizado.

## Estructura

```text
src/
  assets/          recortes del conejo y copias de las referencias
  components/
    layout/        RootLayout, Navbar (menú + buscador), Footer, HashScroll
    primitives/    Button, IconButton, Card, Spinner, Modal, EmptyState, PanelHeader
    three/         ModelViewer, SceneLights, CanvasFallback
    iconos.tsx     mapas de iconos
    RabbitVisual   conmutador imagen / 3D
  data/            textos, rutas, estadísticas, tipos, galería, quiz y recursos tipados
  modules/
    hero/          portada, audio y accesos rápidos
    estadisticas/  dona + barras (Recharts)
    tipos/         lista de tipos de maltrato
    frase/         cita ilustrada con el conejo
    video/         reproductor personalizado + QR
    juego/         quiz de 5 preguntas
    galeria/       grid + lightbox
    ayuda/         recursos y redes sociales
  pages/           InicioPage + 7 páginas placeholder
  routing/         definición de rutas y router
  styles/          tokens y estilos globales
  utils/           formateadores y hook de movimiento reducido
public/
  images/          fotografías PROVISIONALES (etiqueta "IMAGEN PROVISIONAL")
  audio/           audio de demostración (voz sintética)
  video/           vacío: falta el MP4 real
  models/          solo existe models/source/; falta conejo.glb
  textures/        vacío: texturas externas del GLB
  qr/              QR de demostración
  draco/           decodificadores Draco
docs/
  BLENDER_EXPORT.md
  DECISIONES.md
```

## Estado de cada módulo

| Módulo | Estado | Notas |
| --- | --- | --- |
| Inicio / layout | Completo | Dashboard responsive (escritorio, tablet y móvil), navegación con scroll suave, menú móvil, buscador local y footer. |
| Hero + audio | Completo con demo | Reproduce `/audio/mensaje-conejo.wav` (voz sintética provisional). Falta grabación real. |
| Conejo (imagen/3D) | Fallback listo | Por defecto usa imágenes recortadas. `ModelViewer` está implementado, pero no hay `conejo.glb`; muestra la imagen sin romper la página. |
| Estadísticas | Completo | Dona y barras con Recharts; datos de demostración. Faltan fuentes y cifras reales. |
| Tipos de maltrato | Completo | Lista de 5 tipos con imagen provisional; faltan textos y fotos definitivas. |
| Frase del conejo | Completo | Cita ilustrada reutilizando `RabbitVisual`. |
| Video | Modo demostración | Reproductor propio (play, progreso, volumen, ajustes y pantalla completa). Sin `/video/mensaje-conejo.mp4` funciona con póster. |
| Juego / quiz | Completo | 5 preguntas funcionales, feedback, puntaje y reinicio. |
| Galería | Completo | Grid 3x3, lightbox accesible, flechas, teclado y contador. |
| Ayuda y recursos | Completo (enlaces demo) | Accesos a adopción/denuncia/organizaciones y redes genéricas. Faltan URLs reales. |
| Mi historia, Estadísticas, Tipos, Ayuda, Galería, Juego y Recursos como páginas | Placeholder | Las rutas directas muestran `PagePlaceholder`. El contenido completo vive en el dashboard de Inicio. |

## Imágenes y modelo 3D

Las fotografías actuales son **placeholders** locales con la etiqueta "IMAGEN PROVISIONAL". Reemplaza los archivos de `public/images/` manteniendo los nombres. La lista completa está en `docs/DECISIONES.md`.

El conejo usa por defecto imágenes recortadas de `referencia_conejo.jpeg`. Para activar el modelo 3D:

1. Exporta el `.glb` según `docs/BLENDER_EXPORT.md`.
2. Coloca el modelo en `public/models/conejo.glb`. Opcionalmente, deja el archivo de trabajo en `public/models/source/conejo.glb` y ejecuta `npm run models:optimize`.
3. Cambia `configuracion.modoConejo` a `'3d'` en `src/data/contenido.ts`.

Si el archivo no existe, el visor muestra la imagen de respaldo sin romper la página.

## Assets que faltan por aportar

- **Imágenes reales** en `public/images/`: `perro.jpg`, `perro-2.jpg`, `perro-abandono.jpg`, `gato.jpg`, `gato-2.jpg`, `vaca.jpg`, `granja.jpg`, `paloma.jpg`, `aves.jpg`, `caballo.jpg`, `ojo.jpg`, `otros.jpg`, `bosque.jpg`, `conejo-galeria.jpg`, `conejo-video.jpg`, `conejo-panel.jpg` y las miniaturas `perro-tipo.jpg`, `gato-tipo.jpg`, `conejo-tipo.jpg`, `caballo-tipo.jpg`.
- **Audio real** en `public/audio/mensaje-conejo.wav` (hoy es voz sintética). Si cambia el formato, ajusta la ruta en `src/data/imagenes.ts`.
- **Video real** en `public/video/mensaje-conejo.mp4` (la carpeta está vacía). El reproductor lo detecta automáticamente.
- **Modelo 3D**: `public/models/conejo.glb` (falta) y, si aplica, texturas externas en `public/textures/conejo/`.
- **QR real** en `public/qr/qr-mensaje.png`, apuntando al video definitivo.
- **Datos reales**: fuentes y años de los porcentajes, enlaces de redes sociales, refugios/ONGs/canales de denuncia y textos definitivos de la historia y de cada tipo de maltrato.

## Documentación

- `docs/BLENDER_EXPORT.md`: flujo de exportación de Blender a glTF/GLB.
- `docs/DECISIONES.md`: arquitectura, decisiones técnicas, estado de módulos y checklist de assets.
