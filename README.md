# Aventura Guaraní — cinco minijuegos web

Sitio estático (HTML5 + CSS + JavaScript, Canvas 2D, sin dependencias ni servidor). Sin anuncios, registro ni datos personales.
**No incluye portada**: hay un menú funcional y un comentario `PORTADA` en `index.html` donde integrarla.

## Juegos
| Juego | Tiempo | Meta |
|---|---|---|
| Arco y flecha | 40 s | 6 animales; máx. 3 en pantalla; flechas ilimitadas, pausa 0,85 s |
| Encontrá los tucanes | 45 s | 5 tucanes; escena nueva en cada partida; 12 señuelos |
| Llená la canasta | 25 s | 6 alimentos correctos (provisional) con distractores |
| Cosecha rápida | 40 s | 15 cosechas (provisional); aparece cada ~1,15 s, dura 3,6–4,7 s |
| Apagá el fuego | 30 s | Salvar ≥2 de 4 casas (provisional); agua ilimitada, pausa 0,75 s |

Todos los valores están en `js/content.js` (`CONFIG`) para ajustarlos tras las pruebas. Los textos educativos (`EDU`) son **borradores sin verificar**; poné `SHOW_EDU:false` hasta validarlos.

## Controles
Mouse o toque (Pointer Events). Arco: mover/tocar para apuntar y disparar. Tucanes y cosecha: clic/toque. Canasta: arrastrar. Fuego: mover el balde y clic/toque para lanzar. Botón de sonido siempre visible; el audio solo arranca tras una interacción.

## Ejecutar localmente
```bash
cd aventura-guarani && python3 -m http.server 8000   # abrir http://localhost:8000
```
(También abre con doble clic en `index.html`.)

## Publicar en GitHub Pages (URL para WhatsApp/QR)
1. Subí esta carpeta a un repositorio de GitHub (raíz = `index.html`).
2. Settings → Pages → Branch `main` / carpeta `/ (root)` → Save.
3. Esperá un minuto: la URL será `https://TU-USUARIO.github.io/TU-REPOSITORIO/`. Con esa URL real podés generar el QR.

## Estructura
`index.html`, `css/style.css`, `js/core.js` (pantallas, temporizador, entrada, audio), `js/art.js` y `js/art2.js` (sprites y fondos), `js/games/*.js` (un archivo por juego), `docs/`.

## Estado honesto
- Probado: Chromium headless de escritorio y emulación táctil (Pixel 7) sin errores de consola. **No probado** en Safari/iPhone ni en dispositivos reales: probalo antes de la exposición.
- Arte: ver `docs/PENDIENTES.md`.
