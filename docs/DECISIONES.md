# Decisiones del proyecto

## Verificación final (2026-10-23)

- `npm run build` (`tsc -b` + `vite build`) termina **sin errores de TypeScript**.
- `npm run dev` responde **HTTP 200** en `http://127.0.0.1:5173/`.
- Todas las rutas (`/`, `/mi-historia`, `/estadisticas`, `/tipos-de-maltrato`, `/ayuda`, `/galeria`, `/juego`, `/recursos`) responden 200.
- `npm run lint` no reporta errores; solo avisos menores (patrones de efectos en React, exportaciones auxiliares y el Draco vendorizado de `public/draco/`).
- El build avisa de chunks grandes (>500 kB) por Three.js y Recharts. `ModelViewer` ya se carga con `lazy`; si el peso importa, dividir el visor 3D y los gráficos en chunks separados.

## Verificación del módulo Mi historia (2026-10-23)

- `npm run build` pasa sin errores de TypeScript.
- `/mi-historia` responde 200 y renderiza la página completa.
- Accesos a `/mi-historia` verificados desde menú de escritorio y móvil, botón del hero, accesos rápidos, tarjeta del dashboard, buscador y footer.
- Capturas revisadas en escritorio (1600 px), tablet (900 px) y móvil (492 px, ancho mínimo de Edge headless).
- El video se trasladó sin duplicar código y el dashboard mantiene la rejilla sin huecos.

## Arquitectura

- **Vite + React 18 + TypeScript estricto**. React Router 6 separa el layout de las páginas y deja preparadas las rutas futuras.
- **Un módulo por sección** en `src/modules/`, con estilos CSS Modules co-ubicados. Los tokens globales viven en `src/styles/tokens.css` y `src/styles/global.css`.
- **Datos tipados** en `src/data/`. Las secciones no contienen cifras, preguntas, recursos ni textos de interfaz hardcodeados. Los textos generales están en `src/data/contenido.ts`.
- **Primitivas reutilizables**: `Button`, `IconButton`, `Card`, `Spinner`, `Modal`, `EmptyState` y `PanelHeader`.
- **Mi historia ya tiene página propia** (`/mi-historia`). Estadísticas, Tipos de maltrato, Ayuda, Galería, Juego y Recursos siguen como rutas placeholder.
- La navegación superior enlaza al dashboard y a `/mi-historia`; el resto de secciones mantiene hashes y scroll suave. Las rutas directas de las secciones pendientes quedan disponibles para la siguiente fase.

## Dashboard

- Rejilla bento de 3 filas en escritorio: fila principal de 4 paneles y fila inferior de 4 paneles. Se usan proporciones inspiradas en `referencia_dashboard.png`.
- Tableta: 2 columnas. Móvil: 1 columna, menú hamburguesa y buscador compacto.
- La dona usa **Recharts** y centro con huella. Las barras usan Recharts con una forma personalizada que coloca imagen, porcentaje y barra.
- Los datos de ejemplo suman 100% y están centralizados en `src/data/estadisticas.ts`.

## Mi historia

- `MiHistoriaPage` (`/mi-historia`) es la primera página completa después del dashboard. Orden: cabecera, video grande + texto, relato en 5 capítulos, espacio del conejo 3D y CTA a `/ayuda`.
- El video se movió desde Inicio sin duplicar código: `VideoMensaje` sigue en `src/modules/video/` y ahora se usa en la página. En Inicio se reemplazó por `HistoriaTarjeta`, una tarjeta compacta con póster, play decorativo, una línea de texto y CTA.
- El audio del hero se movió a `AudioHistoria`, dentro de la página, para que el botón del hero navegue a `/mi-historia`.
- Todos los accesos a Mi historia apuntan a `/mi-historia`: menú de escritorio y móvil, botón del hero, accesos rápidos, tarjeta del dashboard, buscador y footer.
- Los textos de la historia viven tipados en `src/data/historia.ts` (`capitulosHistoria`, `historiaPagina`, `historiaTarjeta`, `audioHistoria`, `conejoHistoria`, `cierreHistoria`). No hay textos hardcodeados en el JSX.
- Las apariciones usan `Reveal` con `IntersectionObserver`, sin librerías nuevas. Con `prefers-reduced-motion` el contenido se muestra sin animación.
- El espacio del conejo usa `ModelViewer` con `mode={configuracion.modoConejo}`; con `image` muestra el fallback y queda listo para `3d` cuando exista `conejo.glb`.

## Conejo y 3D

- `RabbitVisual` recibe `mode="image" | "3d"`. Los tres conejos del dashboard (hero, panel derecho y quiz) leen el modo desde `configuracion.modoConejo`.
- Por defecto se usa `image`, con recortes de `referencia_conejo.jpeg` en `src/assets/`.
- `ModelViewer` se carga de forma diferida, comprueba si existe `/models/conejo.glb`, configura Draco y Meshopt, usa HDRI procedural con `Environment` y `Lightformer`, ACES, sRGB, sombras suaves, `dpr` limitado a `[1, 2]` e `IntersectionObserver` para pausar el render fuera de pantalla.
- Si falta el GLB o falla la carga, se muestra la imagen del conejo y se registra un `console.info` / `console.warn`. No se rompe la página.
- Con `prefers-reduced-motion` se desactivan animaciones CSS, auto-rotación y reproducción automática del 3D.

## Interacciones

- **Audio de Mi historia**: usa `/audio/mensaje-conejo.wav`, generado como voz de demostración con la voz española de Windows. El botón del hero solo navega a `/mi-historia`; la reproducción vive en esa página. Reemplazar por una grabación real.
- **Video**: reproductor HTML5 personalizado con controles de reproducción, progreso, volumen, ajustes y pantalla completa. Vive en `/mi-historia`; en Inicio queda la tarjeta compacta “Mi historia”. Si no existe `/video/mensaje-conejo.mp4`, funciona en modo demostración con el póster del conejo. Reemplazar por el video real.
- **Quiz**: 5 preguntas funcionales. El estado inicial replica la referencia: pregunta 2 de 5, opción B correcta, 1/5 puntos y feedback del conejo. El botón de reinicio permite empezar desde la pregunta 1.
- **Galería**: grid 3x3 con hover, lightbox accesible, navegación con flechas y teclado.
- **Buscador**: índice local de secciones con resultados navegables. No consulta un backend.
- **Redes sociales**: enlaces genéricos a las plataformas. Sustituir por las cuentas reales.

## Accesibilidad

- Landmarks (`header`, `nav`, `main`, `footer`), enlace para saltar al contenido, foco visible, labels en buscador y controles, `alt` descriptivo, `aria-live` en feedback y contador de galería, `role="dialog"` con trampa de foco y cierre con Escape.
- Contraste AA en textos principales. Los textos pequeños de leyenda usan tamaños compactos por la densidad del bento; revisar si se cambia la escala base.
- `prefers-reduced-motion` desactiva animaciones y 3D automático.

## Assets que debes aportar

### Estado actual de los assets

- `public/images/`: **todos los archivos existen**, pero son placeholders con la etiqueta "IMAGEN PROVISIONAL".
- `public/audio/mensaje-conejo.wav`: existe; es voz sintética de demostración.
- `public/video/`: **vacío**; falta `mensaje-conejo.mp4`.
- `public/models/`: solo existe `models/source/` (vacío); **falta** `conejo.glb`.
- `public/textures/`: **vacío**; faltan texturas externas si no van embebidas en el GLB.
- `public/qr/qr-mensaje.png`: existe, pero es un QR de demostración.
- Datos, fuentes y enlaces: pendientes de sustituir por los reales.

### Fotografías reales (reemplazar placeholders)

- `public/images/perro.jpg` — perro principal.
- `public/images/perro-2.jpg` — segundo perro.
- `public/images/gato.jpg` — gato principal.
- `public/images/gato-2.jpg` — segundo gato.
- `public/images/vaca.jpg` — vaca / granja.
- `public/images/paloma.jpg` — paloma / aves.
- `public/images/caballo.jpg` — caballo.
- `public/images/ojo.jpg` — primer plano de mirada animal.
- `public/images/perro-tipo.jpg`, `gato-tipo.jpg`, `conejo-tipo.jpg`, `caballo-tipo.jpg` — miniaturas de la lista de tipos de maltrato.
- `public/images/conejo-galeria.jpg`, `conejo-video.jpg`, `conejo-panel.jpg` — imágenes derivadas del conejo; se pueden reemplazar por renders finales.

### Multimedia

- `public/audio/mensaje-conejo.wav` — reemplazar por una grabación real (o adaptar la ruta en `src/data/imagenes.ts` si se usa otro formato).
- `public/video/mensaje-conejo.mp4` — video vertical u horizontal del mensaje; el reproductor lo detecta automáticamente.
- `public/qr/qr-mensaje.png` — QR real que apunte al video.
- `public/models/conejo.glb` — modelo optimizado. Ver `docs/BLENDER_EXPORT.md`.
- `public/textures/` — texturas externas del GLB si no van embebidas.
- `src/assets/referencia_conejo.jpeg` y `src/assets/referencia_dashboard.png` — copias de las referencias; los originales permanecen en la raíz.

### Datos reales

- Fuentes y años de los porcentajes de maltrato.
- Enlaces reales de Facebook, Instagram, TikTok, YouTube y WhatsApp.
- Enlaces reales de refugios, ONGs y canales de denuncia.
- Textos definitivos de la historia del conejo y de las fichas de cada tipo de maltrato.

## Estado por módulo

| Módulo | Estado | Detalle |
| --- | --- | --- |
| Layout y navegación | Completo | `RootLayout`, `Navbar` (menú móvil, buscador local, hashes) y `Footer`. |
| Hero / Inicio | Completo | Portada, accesos rápidos y tarjeta compacta de Mi historia. |
| Mi historia | Completo (textos demo) | Página propia con video, 5 capítulos, espacio 3D y CTA. |
| Conejo 3D | Implementado con fallback | `ModelViewer` + `RabbitVisual`; falta el GLB para activarlo. |
| Estadísticas | Completo (datos demo) | Dona y barras Recharts; faltan fuentes reales. |
| Tipos de maltrato | Completo (contenido demo) | 5 fichas resumidas con imagen provisional. |
| Frase del conejo | Completo | Cita ilustrada. |
| Video | Completo en modo demo | Vive en `/mi-historia`; falta el MP4 real. |
| Quiz | Completo | 5 preguntas, feedback y puntaje. |
| Galería | Completo | Grid + lightbox accesible. |
| Ayuda y redes | Completo (enlaces demo) | URLs genéricas a sustituir. |
| Páginas independientes | Placeholder (6) | Estadísticas, Tipos, Ayuda, Galería, Juego y Recursos; Mi historia ya es página completa. |

## Pendiente para las siguientes fases

- Páginas completas de las secciones restantes (Estadísticas, Tipos, Ayuda, Galería, Juego y Recursos).
- Sustituir los textos demo de Mi historia por el relato definitivo.
- Buscador con contenido real o backend.
- Reproductor de audio con transcripción.
- Galería ampliada con filtros y relatos.
- Integración del GLB final y clips de animación.
- Analítica y metadatos Open Graph.
