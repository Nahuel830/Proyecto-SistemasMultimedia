# Estado de verificación de datos

Los datos ya no usan `verificado: boolean`. Cada ficha declara `estadoVerificacion` y una lista de IDs de `src/data/fuentes.ts`. Los estados posibles son:

- `verificado`: el dato se comprobó directamente en la fuente enlazada.
- `fuente-asignada`: existe una fuente pertinente, pero no se pudo leer completa o no confirma todavía el dato concreto.
- `discrepancia`: hay una contradicción entre el dossier y la fuente, o la vigencia del dato está en duda.
- `sin-verificar`: no hay fuente suficiente. No debe presentarse como dato confirmado.

## Fuentes registradas

| ID | Fuente | Tipo | Resultado de la consulta |
|---|---|---|---|
| `ley700-pl` | Proyecto de Ley 436/2023-2024 (Cámara de Diputados) | Norma | Es un proyecto de reforma, no el texto vigente. El PDF supera el límite de lectura directa. |
| `gaceta` | Gaceta Oficial de Bolivia | Institucional | Solo se abrió la portada; no se localizó allí el texto de la Ley 700. |
| `regensa-bienestar` | REGENSA, Capítulo 1.3 Bienestar Animal (SENASAG) | Norma | La consulta devolvió 403. Se mantiene como fuente asignada. |
| `regensa-remates` | REGENSA: Reglamento Nacional de Remates y Faena (SENASAG) | Norma | La consulta devolvió 403. Se mantiene como fuente asignada. |
| `can833` | Decisión 833 de la Comunidad Andina | Norma | PDF descargado y texto extraído: regula la Notificación Sanitaria Obligatoria de cosméticos. No confirma por sí solo la aplicación local de AGEMED. |
| `pofoma-linea` | POFOMA: línea gratuita 800 14 0303 (El Alto) | Institucional | Error de transporte al consultar. El número queda como fuente asignada. |
| `pofoma-cbba` | Opinión: 14 policías forestales en Cochabamba | Prensa | Artículo del 4 de enero de 2020. Confirma 76454235 y 72005779 como contactos históricos de Cochabamba. |
| `refugio-esperanza` | Refugio Esperanza Bolivia: sitio oficial | Institucional | La página oficial muestra `(+591) 60004099` y `61506208`. |
| `spat` | InfoTarija: líneas telefónicas de SPAT | Prensa | Solo se recuperó el título; no se confirmaron teléfonos. |
| `animales-sos` | Todos Negocios: Animales SOS Bolivia | Directorio | La consulta devolvió 403. El directorio figura con 77229500, distinto del dossier. |

## Datos y estado actual

| Dato | Valor | Módulo | Fuentes | Estado | Acción pendiente |
|---|---|---|---|---|---|
| Pena por biocidio | 2 a 5 años | Estadísticas, Tipos y Juego | `ley700-pl`, `gaceta` | Fuente asignada | Leer el texto vigente de la Ley 700, Art. 350 ter. |
| Resolución SENASAG | Número no mostrado en pantalla | Estadísticas, Tipos, Marco legal y Juego | `regensa-bienestar`, `regensa-remates` | Discrepancia | El dossier dice R.A. 0230/2024 y la fuente asignada, 0246/2024. Confirmar número y texto; no publicar el número hasta resolver. |
| 5 Libertades, aturdimiento y picanas | Contenido de bienestar animal | Estadísticas, Galería, Tipos, Marco legal y Juego | `regensa-bienestar`, `regensa-remates` | Discrepancia | Contrastar el texto del REGENSA y la resolución vigente. |
| Decisión 833 y NSO | Armonización cosmética andina | Marco legal, Galería y Juego | `can833` | Fuente asignada | Confirmar la aplicación concreta de AGEMED en Bolivia. |
| “Bolivia no prohíbe importar cosméticos testeados” | Afirmación interpretativa | Marco legal y Juego | `can833` | Sin verificar | Requiere una norma o comunicación oficial boliviana. |
| Línea gratuita POFOMA | 800 14 0303 | Ayuda/Recursos y Juego | `pofoma-linea` | Fuente asignada | Abrir la fuente o confirmar con POFOMA. |
| Celular/WhatsApp POFOMA | 69005708 | Ayuda/Recursos y Juego | Ninguna | Sin verificar | No presentar como canal confirmado. |
| POFOMA Cochabamba (histórico) | 76454235 / 72005779 | Ayuda/Recursos | `pofoma-cbba` | Discrepancia | Contacto de prensa de 2020; confirmar vigencia. La UI no habilita llamada. |
| Refugio Esperanza Bolivia | 60004099 / 61506208 | Ayuda/Recursos | `refugio-esperanza` | Verificado | Mantener seguimiento periódico del sitio oficial. |
| SPAT Tarija | Nombre y coordinación | Ayuda/Recursos | `spat` | Fuente asignada | Confirmar la organización y los canales; la fuente no mostró teléfonos. |
| Animales SOS Bolivia | (591-2) 2414687 o 77229500 | Ayuda/Recursos | `animales-sos` | Discrepancia | Ninguno de los dos números está confirmado. La UI no habilita llamada. |
| Radio Patrulla / Emergencias | 110 / 911 | Ayuda/Recursos | Ninguna | Sin verificar | Confirmar vigencia y alcance. |
| Casos de biocidio 2023 | 87 casos | Estadísticas e Inicio | Ninguna | Sin verificar | Solicitar datos a POFOMA y Fiscalía. |
| Sentencias condenatorias | 2 sentencias | Estadísticas e Inicio | Ninguna | Sin verificar | Seguimiento judicial de los casos de 2023. |
| Población de canes y felinos | Más de 4 millones | Galería | Ninguna | Sin verificar | Confirmar censo o estimación oficial. |
| Cosméticos sin sello Cruelty Free | 90 % | Galería | `can833` (solo contexto normativo) | Sin verificar | Precisar año, universo y fuente del porcentaje. |
| Operativos de rescate de fauna | Más de 170 al año | Galería | Ninguna | Sin verificar | Solicitar informes a POFOMA. |
| Censo Canino Nacional | Existencia y cifras | Galería | Ninguna | Sin verificar | Confirmar si existe y qué cobertura tiene. |
| Ley 1333, Art. 111 | Protección de fauna silvestre | Tipos, Galería, Marco legal y Juego | Ninguna | Sin verificar | Incorporar el texto oficial de la norma. |
| Refugio Gamaliel / APAF | Nombre y coordinación | Ayuda/Recursos | Ninguna | Sin verificar | Contactar a la organización y a la Alcaldía de Cochabamba. |
| Guías de adopción y cuidado | Textos orientativos | Recursos | Ninguna | Sin verificar | Son contenido del proyecto, no fuente oficial. |
| Redes sociales | URLs genéricas | Recursos | Ninguna | Sin verificar | Sustituir por cuentas oficiales. |

## Notas de alcance

- `refugio-esperanza` es el único dato de contacto marcado como verificado porque los dos teléfonos aparecen en el sitio oficial del refugio.
- Los datos con `discrepancia` no habilitan enlaces `tel:` ni WhatsApp en la interfaz.
- Los enlaces de fuentes se abren en una pestaña nueva con `rel="noopener noreferrer"`.
- Los porcentajes de la dona y de las barras siguen siendo ilustrativos y no usan el registro de fuentes.
- `docs/DECISIONES.md` mantiene el contexto de implementación; este documento es la lista operativa.
