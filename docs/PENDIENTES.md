# Pendientes y advertencias

## Arte (importante)
Todas las ilustraciones (cazador, animales, tucanes, cultivos, casas, fondos, llamas) están **dibujadas por código** con degradados, volumen y detalle, y se renderizan una vez a sprites. Son bastante mejores que figuras básicas, pero **no equivalen a ilustración profesional**. El cazador y los animales tienen animación limitada (patas oscilantes, arco que se tensa). Para el nivel final conviene encargar o generar spritesheets/PNG y reemplazar las funciones de `js/art*.js` manteniendo su API (`Art.toucan()`, `Art.drawAnimal()`, `Art.food()`, etc.). Usar solo recursos con licencia clara.

## Historia / cultura (sin verificar)
- Vestimenta del cazador (túnica con guarda geométrica, diadema con plumas, collar), arco, carcaj y viviendas de paja son **representaciones genéricas inventadas**, no reconstrucción verificada de un pueblo guaraní específico. Revisar con fuentes y comunidades.
- Textos educativos en `js/content.js` (`EDU`): borradores sin fuente. Registrar fuente, enlace y fecha antes de presentarlos.
- Los distractores de la canasta (manzana, mandarina, pera, banana) son elementos de juego, no afirmación histórica.
- «Apagá el fuego» es ficticio; no atribuirlo a una práctica ancestral.

## Balance provisional
Metas de canasta (6), cosecha (15) y umbral de fuego (≥2 casas), puntos por especie en arco (10/20/15). Probar con visitantes nuevos, sobre todo niños en celular.

## Otros
Sonidos: solo tonos sintéticos simples, sin música. Portada: la integra el usuario. URL final: se define al publicar.
