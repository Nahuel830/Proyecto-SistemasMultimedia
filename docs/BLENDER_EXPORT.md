# Exportación de Blender a la web

Este documento define el flujo para llevar el conejo de `referencia_conejo.jpeg` a la web. El archivo `.blend` es el maestro de trabajo; la web consume únicamente **glTF 2.0 binario (`.glb`)**.

## 1. Referencia de modelado

La hoja `referencia_conejo.jpeg` contiene:

- Vistas frontal, lateral, trasera y 3/4.
- Detalle de cara, ojo, boca y nariz.
- Etapas: bloqueo de formas, refinamiento, topología, esculpido y materiales.
- Vistas de cabeza para modelar.
- Materiales sugeridos: pelo/fur, ojos, tela de ropa, pantalón y detalles de cuero/algodón.

La hoja es una referencia de modelado, no una textura para proyectar directamente. Los mapas finales deben hornearse desde el modelo de alta resolución.

## 2. Materiales PBR esperados

| Material | Mapas mínimos | Notas |
| --- | --- | --- |
| Pelo / fur | Base Color, Normal, Roughness, AO | Si se usan tarjetas de pelo, exportar geometría con alpha y `alphaMode: MASK`. Si se usa pelo horneado, incluir normal map de mechones. |
| Ojos | Base Color, Normal, Roughness, Emissive opcional | Usar `MeshPhysicalMaterial` con `clearcoat` y, si el exportador lo admite, `transmission`. Mantener el iris y la pupila separados o en un solo atlas. |
| Ropa / tela | Base Color, Normal, Roughness, AO | Trama de rayas y costuras en textura. Evitar desplazamiento pesado; hornear pliegues en el normal map. |
| Pantalón | Base Color, Normal, Roughness | Tela oscura con desgaste sutil. |
| Cuero / algodón | Base Color, Normal, Roughness | Correas, botones y remates. Usar máscaras de suciedad si aplica. |

- Base Color y Emissive: **sRGB**.
- Normal, Roughness, Metallic y AO: **Non-Color / Linear**.
- Resolución recomendada: 1024 o 2048 px para el cuerpo; 512 px para detalles pequeños.
- Formato de textura: **WebP** para color/rugosidad y **PNG** para normal maps con transparencia si hace falta.
- Evitar multiresolución en el GLB: hornear el detalle a normal map. El visor asume mapas horneados, no `Multires` en vivo.

## 3. Ajustes de exportación

En Blender: `File > Export > glTF 2.0 (.glb/.gltf)`.

- **Format**: `glTF Binary (.glb)`.
- **Include**: seleccionar solo la colección del conejo y sus accesorios.
- **Transform**:
  - `+Y Up` activado.
  - `Apply Modifiers` activado.
  - `Unit Scale` = `1.0`.
  - Aplicar rotación/escala en el objeto antes de exportar.
- **Data**:
  - `Materials`: exportar materiales.
  - `Images`: automático o WebP/PNG.
  - `Shape Keys`: activado si se usan expresiones.
  - `Skinning`: activado si hay rig.
  - `Animation`: activado.
  - `Animation Mode`: `NLA Tracks` si los clips están organizados en NLA; `Actions` si se exportan acciones sueltas.
  - `Sampling Rate`: 30 fps o el fps del proyecto.
- **Compression**:
  - Activar `Draco` para geometría.
  - Si el pipeline usa Meshopt, desactivar Draco en el export y comprimir luego con `@gltf-transform/cli`.
  - `Meshopt` no se activa desde el panel de Blender; se aplica en el postproceso.
- **Normals / Tangents**:
  - Exportar normales.
  - Exportar tangentes si hay normal maps.
- **Extras**:
  - Mantener nombres legibles: `Body`, `Eyes`, `Shirt`, `Pants`, `LeatherDetails`.
  - Evitar nombres con espacios o caracteres especiales en huesos y clips.

## 4. Animaciones

- Nombres de clips recomendados: `idle`, `saludo`, `hablar`, `parpadear`.
- Exportar como una pista NLA por clip o acciones separadas con nombres claros.
- El visor reproduce el clip solicitado con `animation="idle"`; si no existe, usa el primero disponible.
- Si no hay animación, el visor cambia a `frameloop="demand"` para ahorrar GPU.
- Con `prefers-reduced-motion`, no se reproducen animaciones automáticas ni rotación.

## 5. Escala y orientación

- El modelo debe mirar hacia **-Z** en glTF (equivalente a +Y en Blender con `+Y Up`).
- Altura recomendada del conejo: 1.8–2.2 unidades métricas.
- Centro del objeto en el origen; pies apoyados en `Y = 0` si es posible.
- El componente `ModelViewer` recentra y escala automáticamente con una caja envolvente, pero un modelo bien preparado evita sorpresas.

## 6. Ubicación de archivos

```text
public/
  models/
    source/
      conejo.glb        ← GLB de trabajo, sin comprimir
    conejo.glb          ← GLB optimizado que consume la web
  textures/
    conejo/             ← texturas externas si el GLB las referencia
  draco/                ← decodificadores Draco copiados de three
```

La web busca el modelo en `/models/conejo.glb`. Si no existe, `ModelViewer` muestra la imagen del conejo y escribe un aviso en consola.

## 7. Optimización

Script disponible:

```bash
npm run models:optimize
```

Equivale a:

```bash
gltf-transform optimize public/models/source/conejo.glb public/models/conejo.glb --compress draco --texture-compress webp
```

Revisar el resultado en el visor antes de publicar. Para Meshopt, cambiar `--compress draco` por `--compress meshopt` y validar que el navegador objetivo lo soporte.

## 8. Checklist antes de subir

- [ ] GLB abre en https://gltf-viewer.donmccurdy.com/ sin errores.
- [ ] Materiales se ven correctos con el tone mapping ACES del visor.
- [ ] Normal maps y AO tienen espacio de color correcto.
- [ ] El modelo no tiene partes fuera de la caja envolvente.
- [ ] Los clips de animación tienen nombres esperados.
- [ ] El peso del GLB es razonable (objetivo: menos de 8–12 MB).
- [ ] Se probó el fallback quitando temporalmente `/models/conejo.glb`.
