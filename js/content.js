'use strict';
/* Textos y parámetros ajustables.
   IMPORTANTE: los textos educativos son BORRADORES SIN VERIFICAR (ver docs/PENDIENTES.md).
   Ponelos en SHOW_EDU=false si querés ocultarlos hasta validarlos con fuentes. */
const CONFIG = {
  SHOW_EDU: true,
  arco:    { time: 120, goal: 30, maxAnimals: 3, cooldown: 0.85, points: { carpincho: 10, venado: 20, pecari: 15 } },
  tucanes: { time: 90, count: 5, decoys: 12, pointsEach: 10 },
  canasta: { time: 75, goal: 25, pointsEach: 10, onField: 6 },          // goal: PROVISIONAL
  cosecha: { time: 90, goal: 40, spawn: 1.15, lifeMin: 3.6, lifeMax: 4.7, pointsEach: 10 }, // goal: PROVISIONAL
  luciernagas: { time: 60, goal: 30 },                                // goal: PROVISIONAL
  fuego:   { time: 60, cooldown: 0.75, maxFires: 7, housesToWin: 2, splashRadius: 62 }     // umbrales: PROVISIONALES
};
const EDU = {
  arco:    'La caza fue una de las actividades para obtener alimentos, junto con la agricultura, la pesca y la recolección.',
  tucanes: 'Los tucanes forman parte de la fauna de las selvas de la región.',
  canasta: 'El maíz, la mandioca y el zapallo son cultivos importantes en la alimentación de distintas comunidades guaraníes.',
  cosecha: 'La agricultura fue una actividad importante para muchas comunidades guaraníes.',
  luciernagas: 'Las luciérnagas son insectos que producen su propia luz.',
  fuego:   'Juego ficticio: cuidar la vegetación y prevenir incendios es importante hoy para proteger el entorno.'
};

/* Videos de la sección «Videos». Para cambiar títulos o agregar videos, editá esta lista.
   id = el código que está en el enlace de YouTube (watch?v=ID o shorts/ID). */
const VIDEOS = [
  { id: 'CgthzTtvz_Y', title: 'Video 1', kind: 'Video' },
  { id: 'CGGxuRIBQK4', title: 'Video 2', kind: 'Video' },
  { id: 'KfiMn81nUXo', title: 'Video 3', kind: 'Video' },
  { id: 'CQd14YAUZcU', title: 'Video 4', kind: 'Short', short: true }
];
