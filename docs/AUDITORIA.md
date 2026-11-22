# Auditoría de pantallas (celulares y tablets)

Script reproducible: `docs/audit-pantallas.js` (Playwright + Chromium; desde la raíz del proyecto: `node docs/audit-pantallas.js`).
Prueba 17 tamaños (280×653 hasta 1180×820), cada uno en vertical y horizontal, con emulación táctil. En cada uno revisa:
portada, aviso de girar, menú sin scroll ni tarjetas fuera de pantalla, panel de inicio y de fin de cada uno de los 5 juegos,
botones visibles (≥40 px), barra superior sin desbordar, lienzo dentro de la pantalla, página sin scroll y errores de JS.

**Resultado final: sin fallos** (el único aviso que queda es un artefacto del script: 717×512 ya es horizontal).
Problemas encontrados y corregidos: barra superior desbordada en 280–320 px de ancho; menú con scroll y tarjetas cortadas en celulares
horizontales de 568–667 px de ancho y en tablet pequeña 960×600.

## Límites de esta auditoría (honestidad)
- Es emulación en Chromium, **no** dispositivos reales ni todas las marcas. Safari de iPhone y navegadores de Samsung/Xiaomi pueden diferir
  (barras del navegador que cambian la altura, sin pantalla completa en iPhone, notch).
- No mide rendimiento (fluidez) en celulares de gama baja ni la sensación de los toques.
- Mejor complemento: probar en 2–3 celulares reales (un Android, un iPhone, uno modesto) antes de la exposición.
