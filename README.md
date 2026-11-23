# Aventura Guaraní — cinco minijuegos web

Sitio estático (HTML5 + CSS + JavaScript, Canvas 2D, sin dependencias ni servidor). Sin anuncios, registro ni datos personales.
Al abrir muestra 3 segundos la portada (`assets/portada.jpg`, reemplazable) y luego el menú de juegos; se puede saltar tocando.

## Juegos
| Juego | Tiempo | Meta |
|---|---|---|
| Arco y flecha | 120 s | 30 animales; cada acierto acelera el juego; flechas ilimitadas, pausa 0,85 s |
| Encontrá los tucanes | 90 s | 5 tucanes por nivel; niveles que suben la dificultad |
| Llená la canasta | 75 s | 25 alimentos correctos (provisional) con distractores |
| Cosecha rápida | 90 s | 40 cosechas (provisional); más rápido y más topos con el tiempo |
| Apagá el fuego | 60 s | Salvar ≥2 de 4 casas (provisional); agua ilimitada, pausa 0,75 s |
| Luciérnagas en la noche | 60 s | 30 luces (provisional); las doradas valen más |

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
