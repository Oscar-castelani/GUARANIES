'use strict';
/* Arte ilustrado generado por código (vectorial, renderizado una vez a sprites).
   Parte 1: utilidades, aves, animales, cazador, arco. Ver docs/ARTE.md: es un nivel intermedio,
   pensado para ser REEMPLAZADO por ilustraciones profesionales con la misma API de sprites. */
const Art = (function () {
  const S = 2, memo = {};
  const cache = (k, f) => memo[k] || (memo[k] = f());
  function rng(seed) { let a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function mk(w, h, fn, s) { s = s || S; const c = document.createElement('canvas'); c.width = Math.ceil(w * s); c.height = Math.ceil(h * s); const x = c.getContext('2d'); x.scale(s, s); fn(x, w, h); c.w = w; c.h = h; return c; }
  function shade(c, a) { const n = parseInt(c.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const t = a < 0 ? 0 : 255, p = Math.abs(a); r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b); return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1); }
  function lg(x, x0, y0, x1, y1, st) { const g = x.createLinearGradient(x0, y0, x1, y1); st.forEach(s => g.addColorStop(s[0], s[1])); return g; }
  function rg(x, cx, cy, r0, r1, st) { const g = x.createRadialGradient(cx, cy, r0, cx, cy, r1); st.forEach(s => g.addColorStop(s[0], s[1])); return g; }
  function ell(x, cx, cy, rx, ry, rot) { x.beginPath(); x.ellipse(cx, cy, rx, ry, rot || 0, 0, Math.PI * 2); }
  function blit(c, s, px, py, sc, flip, alpha, rot, ox, oy) {
    sc = sc == null ? 1 : sc; ox = ox == null ? .5 : ox; oy = oy == null ? .5 : oy;
    c.save(); c.translate(px, py); if (rot) c.rotate(rot); c.scale(flip ? -sc : sc, sc); if (alpha != null) c.globalAlpha = alpha;
    c.drawImage(s, -s.w * ox, -s.h * oy, s.w, s.h); c.restore();
  }
  function leaf(x, px, py, len, wid, ang, col) {
    x.save(); x.translate(px, py); x.rotate(ang);
    x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(len * .25, -wid * 1.15, len * .7, -wid * .85, len, 0); x.bezierCurveTo(len * .7, wid * .85, len * .25, wid * 1.15, 0, 0);
    x.fillStyle = lg(x, 0, -wid, 0, wid, [[0, shade(col, .22)], [.5, col], [1, shade(col, -.25)]]); x.fill();
    x.strokeStyle = shade(col, -.4); x.globalAlpha = .65; x.lineWidth = Math.max(.6, wid * .07);
    x.beginPath(); x.moveTo(0, 0); x.lineTo(len * .96, 0);
    if (len > 22) for (let i = 1; i < 6; i++) { const t = i / 6 * len, o = wid * .62 * (1 - i / 7); x.moveTo(t, 0); x.lineTo(t + len * .12, -o); x.moveTo(t, 0); x.lineTo(t + len * .12, o); }
    x.lineWidth = Math.max(.5, wid * .035); x.stroke(); x.restore();
  }
  function frond(x, px, py, len, ang, droop, col) {
    x.save(); x.translate(px, py); x.rotate(ang);
    const n = 15;
    x.strokeStyle = shade(col, -.35); x.lineWidth = Math.max(1, len * .018); x.beginPath(); x.moveTo(0, 0);
    for (let i = 1; i <= 12; i++) { const t = i / 12; x.lineTo(t * len, droop * t * t * len); } x.stroke();
    for (let i = 1; i <= n; i++) {
      const t = i / n, rx = t * len, ry = droop * t * t * len, tan = Math.atan(2 * droop * t), l = len * .3 * (1 - t * .6) + 4;
      leaf(x, rx, ry, l, l * .17, tan + 1.05 - t * .35, col); leaf(x, rx, ry, l, l * .17, tan - 1.05 + t * .35, col);
    }
    x.restore();
  }
  function tuft(x, px, py, h, col, r) {
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .28 + (r() - .5) * .2; x.strokeStyle = shade(col, (r() - .5) * .35); x.lineWidth = 1.4; x.beginPath(); x.moveTo(px + (i - 2.5) * 1.5, py); x.quadraticCurveTo(px + Math.cos(a) * h * .5, py + Math.sin(a) * h * .6, px + Math.cos(a) * h * .75 + (r() - .5) * 6, py + Math.sin(a) * h); x.stroke(); }
  }

  /* ---------- AVES ---------- */
  function toucan() {
    return cache('toucan', () => mk(132, 112, x => {
      // cola
      x.fillStyle = lg(x, 40, 70, 16, 102, [[0, '#1b1d2a'], [1, '#0d0e14']]);
      x.beginPath(); x.moveTo(40, 66); x.lineTo(14, 98); x.lineTo(26, 104); x.lineTo(52, 80); x.closePath(); x.fill();
      x.fillStyle = '#d8301f'; ell(x, 36, 84, 11, 6, -.7); x.fill();
      // cuerpo
      x.fillStyle = lg(x, 40, 40, 70, 84, [[0, '#2a2e44'], [.4, '#16171f'], [1, '#08090d']]); ell(x, 58, 62, 30, 22, -.6); x.fill();
      // babero
      x.fillStyle = lg(x, 80, 44, 88, 70, [[0, '#ffe36a'], [.5, '#fff4b8'], [1, '#ffffff']]); ell(x, 85, 55, 11, 14, .25); x.fill();
      // cabeza
      x.fillStyle = lg(x, 74, 24, 92, 52, [[0, '#2e3350'], [1, '#0b0c12']]); ell(x, 84, 38, 15, 15); x.fill();
      // ala
      x.fillStyle = lg(x, 36, 46, 66, 72, [[0, 'rgba(90,110,170,.55)'], [1, 'rgba(0,0,0,.15)']]); ell(x, 54, 60, 22, 11, -.55); x.fill();
      x.strokeStyle = 'rgba(160,180,230,.35)'; x.lineWidth = 1; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(40 + i * 7, 68 - i * 3); x.lineTo(48 + i * 7, 56 - i * 3); x.stroke(); }
      // ojo
      x.fillStyle = '#58bfee'; ell(x, 87, 35, 7.5, 6.2); x.fill(); x.fillStyle = '#e9772a'; ell(x, 87, 35, 8.5, 7, 0); x.globalCompositeOperation = 'destination-over'; x.fill(); x.globalCompositeOperation = 'source-over';
      x.fillStyle = '#58bfee'; ell(x, 87, 35, 7, 5.8); x.fill(); x.fillStyle = '#000'; ell(x, 88, 35, 3, 3); x.fill(); x.fillStyle = '#fff'; ell(x, 89, 34, 1, 1); x.fill();
      // pico
      const bp = () => { x.beginPath(); x.moveTo(94, 28); x.bezierCurveTo(110, 20, 126, 26, 130, 42); x.bezierCurveTo(126, 52, 112, 56, 95, 52); x.closePath(); };
      bp(); x.fillStyle = lg(x, 94, 0, 130, 0, [[0, '#ffe04a'], [.45, '#ffb21e'], [.85, '#f0721a'], [1, '#d12e1b']]); x.fill();
      bp(); x.strokeStyle = '#1a1210'; x.lineWidth = 1.6; x.stroke();
      x.strokeStyle = '#3a2214'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(97, 41); x.bezierCurveTo(110, 44, 120, 43, 129, 41); x.stroke();
      x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(99, 31); x.bezierCurveTo(110, 25, 120, 28, 125, 36); x.stroke();
      x.fillStyle = '#231510'; ell(x, 128, 37, 3.5, 5, .3); x.fill(); x.fillStyle = '#1a1210'; ell(x, 97, 33, 3.5, 3.5); x.fill();
      // patas
      x.strokeStyle = '#6c7b92'; x.lineWidth = 3.2; x.lineCap = 'round';
      [[52, 80], [64, 78]].forEach(p => { x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[0] - 1, 92); x.stroke(); x.beginPath(); x.moveTo(p[0] - 6, 94); x.lineTo(p[0] + 5, 93); x.stroke(); });
    }));
  }
  const BIRDS = {
    loro: { body: '#3fa34d', belly: '#8fd66c', head: '#47b052', cap: '#d6392b', wing: '#23743a', tail: '#2f8a3f', beak: '#e8d9a8', patch: '#f2c230', tl: 26 },
    guacamayo: { body: '#2e6fd0', belly: '#f5c92b', head: '#2e6fd0', cap: '#2e6fd0', wing: '#1c4fa0', tail: '#1c4fa0', beak: '#222', patch: '#f5c92b', tl: 32 },
    tangara: { body: '#d83a2e', belly: '#ec6e4c', head: '#d83a2e', cap: '#d83a2e', wing: '#2a2a2a', tail: '#2a2a2a', beak: '#e8d9a8', patch: '#d83a2e', tl: 20, small: 1 },
    tordo: { body: '#262626', belly: '#323232', head: '#262626', cap: '#262626', wing: '#111', tail: '#111', beak: '#f29a2a', patch: '#262626', tl: 20, ring: '#f2d02a', small: 1 }
  };
  function bird(kind) {
    return cache('bird' + kind, () => { const c = BIRDS[kind]; return mk(76, 92, x => {
      x.fillStyle = lg(x, 30, 56, 22, 56 + c.tl + 16, [[0, c.tail], [1, shade(c.tail, -.4)]]);
      x.beginPath(); x.moveTo(30, 58); x.lineTo(20, 56 + c.tl + 16); x.lineTo(34, 56 + c.tl + 12); x.lineTo(40, 60); x.closePath(); x.fill();
      x.fillStyle = lg(x, 20, 26, 52, 64, [[0, shade(c.body, .15)], [1, shade(c.body, -.3)]]); ell(x, 36, 44, 15, 24, .18); x.fill();
      x.fillStyle = c.belly; ell(x, 41, 48, 8, 17, .18); x.fill();
      x.fillStyle = c.wing; ell(x, 30, 46, 9, 19, .12); x.fill(); x.fillStyle = c.patch; ell(x, 30, 40, 4, 6, .12); x.fill();
      x.fillStyle = c.head; ell(x, 42, 20, 12, 12); x.fill();
      if (c.cap !== c.head) { x.fillStyle = c.cap; ell(x, 44, 12, 8, 4.5, -.2); x.fill(); }
      x.fillStyle = c.beak; x.beginPath();
      if (c.small) { x.moveTo(52, 17); x.lineTo(63, 21); x.lineTo(52, 25); x.closePath(); } else { x.moveTo(51, 14); x.bezierCurveTo(64, 12, 66, 24, 58, 30); x.bezierCurveTo(56, 24, 54, 22, 51, 22); x.closePath(); }
      x.fill(); x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = .8; x.stroke();
      if (c.ring) { x.fillStyle = c.ring; ell(x, 46, 18, 4.6, 4.6); x.fill(); } else { x.fillStyle = '#f6f1e0'; ell(x, 46, 18, 4.2, 4.2); x.fill(); }
      x.fillStyle = '#111'; ell(x, 46.5, 18, 2.2, 2.2); x.fill();
      x.strokeStyle = '#6a5a4a'; x.lineWidth = 2.4; x.lineCap = 'round';
      [[34, 66], [42, 64]].forEach(p => { x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[0], 74); x.stroke(); x.beginPath(); x.moveTo(p[0] - 4, 75); x.lineTo(p[0] + 4, 75); x.stroke(); });
    }); });
  }
  const BIRD_FEET = { x: 38, y: 75 };

  /* ---------- ANIMALES ---------- */
  function carpincho() {
    return cache('carpincho', () => mk(164, 96, x => {
      x.fillStyle = lg(x, 0, 20, 0, 80, [[0, '#c58c4c'], [.55, '#a87136'], [1, '#85572a']]); ell(x, 78, 52, 58, 31, -.02); x.fill();
      x.fillStyle = 'rgba(230,200,150,.28)'; ell(x, 80, 74, 44, 8); x.fill();
      x.fillStyle = lg(x, 120, 20, 150, 64, [[0, '#b27a40'], [1, '#8a5a2c']]); ell(x, 134, 45, 24, 20, .1); x.fill();
      x.fillStyle = '#7a4c26'; x.beginPath(); x.moveTo(140, 28); x.quadraticCurveTo(162, 30, 160, 50); x.quadraticCurveTo(158, 62, 140, 60); x.closePath(); x.fill();
      x.fillStyle = '#241409'; ell(x, 158, 42, 4.5, 7, .1); x.fill(); x.fillStyle = '#0f0803'; ell(x, 157, 38, 1.6, 2.2); x.fill();
      x.fillStyle = '#7a4c26'; ell(x, 124, 26, 5, 4, -.5); x.fill();
      x.fillStyle = '#0c0805'; ell(x, 140, 36, 3, 3); x.fill(); x.fillStyle = '#fff'; ell(x, 141, 35, 1, 1); x.fill();
      x.strokeStyle = 'rgba(40,22,10,.35)'; x.lineWidth = 1;
      const r = rng(3); for (let i = 0; i < 70; i++) { const px = 30 + r() * 100, py = 28 + r() * 40; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 6, py + 2 + r() * 3); x.stroke(); }
      x.strokeStyle = 'rgba(250,230,190,.35)'; for (let i = 0; i < 24; i++) { const px = 30 + r() * 100, py = 24 + r() * 14; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 6, py + 2); x.stroke(); }
    }));
  }
  function venado() {
    return cache('venado', () => mk(168, 150, x => {
      x.fillStyle = lg(x, 0, 36, 0, 90, [[0, '#d2ab7a'], [.6, '#c09462'], [1, '#f1e6d0']]); ell(x, 70, 62, 46, 24, -.05); x.fill();
      // cuello y cabeza
      x.fillStyle = lg(x, 100, 20, 120, 70, [[0, '#c99d6a'], [1, '#efe3cc']]);
      x.beginPath(); x.moveTo(98, 48); x.quadraticCurveTo(112, 38, 118, 14); x.lineTo(136, 18); x.quadraticCurveTo(128, 50, 112, 74); x.closePath(); x.fill();
      x.fillStyle = '#cfa572'; ell(x, 138, 20, 19, 10, .5); x.fill();
      x.fillStyle = '#2a1a10'; ell(x, 153, 27, 4, 3.4, .5); x.fill();
      x.fillStyle = '#efe0c0'; ell(x, 148, 29, 6, 4, .5); x.fill();
      x.fillStyle = '#a87440'; ell(x, 123, 9, 9, 4, -.9); x.fill(); x.fillStyle = '#e6c9a0'; ell(x, 123, 9, 5.5, 2, -.9); x.fill();
      x.fillStyle = '#100a06'; ell(x, 140, 17, 3, 3); x.fill(); x.fillStyle = '#fff'; ell(x, 141, 16, 1, 1); x.fill();
      x.strokeStyle = '#6d5a3c'; x.lineWidth = 2.6; x.lineCap = 'round';
      [[126, 8, 122, -10, 114, -18], [122, -10, 130, -18, 0, 0], [126, 8, 134, -6, 140, -14]].forEach(p => { x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[2], p[3]); if (p[4]) x.lineTo(p[4], p[5]); x.stroke(); });
      x.fillStyle = '#fff'; ell(x, 24, 54, 6, 9, .4); x.fill();
      x.fillStyle = 'rgba(255,255,255,.75)'; ell(x, 112, 56, 7, 12, .3); x.fill();
      x.strokeStyle = 'rgba(90,55,25,.3)'; x.lineWidth = 1; const r = rng(9); for (let i = 0; i < 40; i++) { const px = 36 + r() * 70, py = 42 + r() * 28; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 5, py + 2); x.stroke(); }
    }));
  }
  function pecari() {
    return cache('pecari', () => mk(132, 86, x => {
      // cerdas del lomo
      x.fillStyle = '#26211b'; x.beginPath(); x.moveTo(26, 36); for (let i = 0; i < 12; i++) { x.lineTo(30 + i * 6, 12 - (i % 2) * 3 + (i > 8 ? (i - 8) * 3 : 0)); x.lineTo(33 + i * 6, 24); } x.lineTo(100, 36); x.closePath(); x.fill();
      x.fillStyle = lg(x, 0, 14, 0, 66, [[0, '#6b5e50'], [.5, '#4a4036'], [1, '#2c261f']]); ell(x, 62, 42, 46, 26, .02); x.fill();
      x.strokeStyle = 'rgba(230,215,190,.35)'; x.lineWidth = 1; const r = rng(5); for (let i = 0; i < 90; i++) { const px = 22 + r() * 80, py = 22 + r() * 40; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 4, py + 3); x.stroke(); }
      x.strokeStyle = '#e2d6bb'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(80, 18); x.quadraticCurveTo(92, 42, 82, 64); x.stroke();
      x.fillStyle = lg(x, 92, 28, 112, 62, [[0, '#51463a'], [1, '#2e271f']]); ell(x, 104, 45, 20, 17); x.fill();
      x.fillStyle = lg(x, 118, 40, 130, 60, [[0, '#8a7667'], [1, '#5b4a3f']]); x.beginPath(); x.moveTo(114, 38); x.quadraticCurveTo(132, 40, 131, 52); x.quadraticCurveTo(129, 60, 114, 58); x.closePath(); x.fill();
      x.fillStyle = '#c9a8a0'; ell(x, 130, 49, 3.2, 6); x.fill(); x.fillStyle = '#2a1a16'; ell(x, 130.5, 47, 1, 2); x.fill(); ell(x, 130.5, 52, 1, 2); x.fill();
      x.fillStyle = '#2b241d'; x.beginPath(); x.moveTo(94, 33); x.lineTo(98, 18); x.lineTo(106, 32); x.closePath(); x.fill();
      x.fillStyle = '#0c0805'; ell(x, 112, 41, 2.6, 2.6); x.fill(); x.fillStyle = '#fff'; ell(x, 113, 40, .9, .9); x.fill();
    }));
  }
  const ANIMALS = {
    carpincho: { spr: carpincho, legs: [{ x: 40, y: 70, l: 24, w: 8, p: .5, far: 1 }, { x: 116, y: 70, l: 24, w: 8, p: 0, far: 1 }, { x: 54, y: 72, l: 22, w: 8, p: 0 }, { x: 128, y: 70, l: 24, w: 8, p: .5 }], col: '#8f5e30', hoof: '#3a2412', hit: [.5, .62] },
    venado: { spr: venado, legs: [{ x: 40, y: 76, l: 72, w: 6, p: .5, far: 1 }, { x: 100, y: 76, l: 72, w: 6, p: 0, far: 1 }, { x: 52, y: 78, l: 70, w: 6.5, p: 0 }, { x: 110, y: 76, l: 72, w: 6.5, p: .5 }], col: '#c09462', hoof: '#2a1a0e', hit: [.46, .62] },
    pecari: { spr: pecari, legs: [{ x: 32, y: 58, l: 26, w: 7, p: .5, far: 1 }, { x: 90, y: 60, l: 25, w: 7, p: 0, far: 1 }, { x: 44, y: 60, l: 24, w: 7, p: 0 }, { x: 100, y: 60, l: 25, w: 7, p: .5 }], col: '#3a3128', hoof: '#16110c', hit: [.5, .62] }
  };
  function animalSize(n) { const s = ANIMALS[n].spr(); return { w: s.w, h: s.h }; }
  function drawAnimal(c, name, fx, fy, sc, flip, t, alpha) {
    const a = ANIMALS[name], s = a.spr(), ph = t * 7, bob = Math.abs(Math.sin(ph)) * 1.6;
    c.save(); c.translate(fx, fy); c.scale(flip ? -sc : sc, sc); c.translate(-s.w / 2, -s.h + 2); if (alpha != null) c.globalAlpha = alpha;
    c.fillStyle = 'rgba(20,35,10,.28)'; c.beginPath(); c.ellipse(s.w / 2, s.h - 1, s.w * .42, 5, 0, 0, 7); c.fill();
    const leg = lg_ => {
      const sw = Math.sin(ph + lg_.p * Math.PI * 2) * 9, lift = Math.max(0, Math.cos(ph + lg_.p * Math.PI * 2)) * 3;
      c.strokeStyle = lg_.far ? shade(a.col, -.3) : a.col; c.lineWidth = lg_.w; c.lineCap = 'round';
      c.beginPath(); c.moveTo(lg_.x, lg_.y - bob); c.lineTo(lg_.x + sw * .7, lg_.y + lg_.l - lift - 1); c.stroke();
      c.fillStyle = a.hoof; c.beginPath(); c.ellipse(lg_.x + sw * .7 + 1, lg_.y + lg_.l - lift, lg_.w * .62, 2.6, 0, 0, 7); c.fill();
    };
    a.legs.filter(l => l.far).forEach(leg);
    c.translate(0, -bob); c.drawImage(s, 0, 0, s.w, s.h); c.translate(0, bob);
    a.legs.filter(l => !l.far).forEach(leg);
    c.restore();
  }

  /* ---------- CAZADOR + ARCO ---------- */
  const HUNTER = { w: 150, h: 272, shoulder: { x: 88, y: 108 }, far: { x: 56, y: 110 } };
  function hunter() {
    return cache('hunter', () => mk(HUNTER.w, HUNTER.h, x => {
      const skin = ['#bd6a3c', '#8f4d27'];
      // carcaj (detrás)
      x.save(); x.translate(44, 104); x.rotate(-.38); x.fillStyle = lg(x, -9, 0, 9, 0, [[0, '#6e4527'], [1, '#4a2c16']]); x.beginPath(); x.moveTo(-8, 0); x.lineTo(8, 0); x.lineTo(6, 78); x.lineTo(-6, 78); x.closePath(); x.fill();
      x.strokeStyle = '#d6b36a'; x.lineWidth = 2; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(-8, 18 + i * 22); x.lineTo(8, 18 + i * 22); x.stroke(); }
      ['#d63a2a', '#f2c230', '#2b6fd0'].forEach((c, i) => { x.strokeStyle = '#d9b57a'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(-5 + i * 5, 0); x.lineTo(-5 + i * 5 - 1, -22); x.stroke(); x.fillStyle = c; ell(x, -5 + i * 5 - 1, -26, 2.6, 7, 0); x.fill(); }); x.restore();
      // piernas
      [[56, 1], [78, 0]].forEach(p => { x.fillStyle = lg(x, p[0] - 8, 0, p[0] + 8, 0, [[0, skin[0]], [1, skin[1]]]); x.beginPath(); x.moveTo(p[0] - 8, 186); x.lineTo(p[0] + 8, 186); x.lineTo(p[0] + 6, 262); x.lineTo(p[0] - 6, 262); x.closePath(); x.fill(); ell(x, p[0] + 3, 265, 14, 5.5); x.fillStyle = shade(skin[1], -.1); x.fill(); });
      // torso
      x.fillStyle = lg(x, 50, 96, 100, 96, [[0, skin[0]], [1, skin[1]]]); x.beginPath(); x.moveTo(48, 100); x.quadraticCurveTo(70, 92, 96, 100); x.lineTo(98, 170); x.lineTo(48, 170); x.closePath(); x.fill();
      // taparrabo simple de tela cruda + cordón (sin túnica)
      x.fillStyle = lg(x, 50, 150, 100, 150, [[0, skin[0]], [1, skin[1]]]); x.fillRect(48, 158, 50, 16);
      x.fillStyle = lg(x, 0, 150, 0, 198, [[0, '#d9c49a'], [1, '#a88a58']]);
      x.beginPath(); x.moveTo(50, 150); x.lineTo(98, 150); x.lineTo(92, 190); x.quadraticCurveTo(72, 198, 56, 190); x.closePath(); x.fill();
      x.strokeStyle = 'rgba(70,45,15,.35)'; x.lineWidth = 1; for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(56 + i * 6, 152); x.lineTo(58 + i * 5.4, 192); x.stroke(); }
      x.fillStyle = '#7a3a1e'; x.fillRect(46, 146, 54, 6);
      // cuello y cabeza
      x.fillStyle = skin[1]; x.fillRect(68, 84, 14, 18);
      x.fillStyle = lg(x, 56, 40, 92, 84, [[0, '#bf7c47'], [1, '#8f552b']]); ell(x, 76, 64, 19, 23); x.fill();
      x.fillStyle = '#9a5e32'; ell(x, 59, 66, 3.5, 5); x.fill();
      // pelo
      x.fillStyle = '#12100e'; x.beginPath(); x.moveTo(54, 66); x.bezierCurveTo(46, 34, 66, 36, 78, 38); x.bezierCurveTo(94, 40, 98, 52, 95, 56); x.bezierCurveTo(88, 50, 70, 50, 62, 56); x.lineTo(60, 80); x.bezierCurveTo(54, 80, 52, 74, 54, 66); x.closePath(); x.fill();
      x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = 1; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(60 + i * 6, 42); x.quadraticCurveTo(58 + i * 6, 52, 56 + i * 5, 62); x.stroke(); }
      // diadema + plumas
      x.fillStyle = '#c4301f'; x.save(); x.translate(76, 50); x.rotate(-.1); x.fillRect(-22, -3, 44, 6); x.fillStyle = '#efdca8'; for (let i = 0; i < 5; i++) x.fillRect(-18 + i * 9, -3, 3, 6); x.restore();
      [['#d63a2a', -.7, 30], ['#f2c230', -.25, 34], ['#2b6fd0', .2, 28]].forEach(f => { x.save(); x.translate(66 + f[1] * 8, 48); x.rotate(f[1]); x.fillStyle = f[0]; ell(x, 0, -f[2] / 2, 4.2, f[2] / 2); x.fill(); x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = .8; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -f[2]); x.stroke(); x.restore(); });
      // cara
      x.fillStyle = '#fff'; ell(x, 84, 63, 3.6, 2.7); x.fill(); x.fillStyle = '#1a0f08'; ell(x, 85.2, 63, 1.9, 1.9); x.fill();
      x.strokeStyle = '#1a0f08'; x.lineWidth = 1.8; x.beginPath(); x.moveTo(79, 57.5); x.quadraticCurveTo(84, 55, 89, 57); x.stroke();
      x.strokeStyle = '#7a4524'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(92, 66); x.quadraticCurveTo(95, 71, 90, 73); x.stroke();
      x.strokeStyle = '#5a2f16'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(82, 78); x.quadraticCurveTo(87, 80, 91, 77); x.stroke();
      // collar
      x.strokeStyle = '#efdca8'; x.lineWidth = 2; x.beginPath(); x.arc(76, 100, 12, .15, Math.PI - .15); x.stroke();
      x.fillStyle = '#c4301f'; for (let i = 0; i < 4; i++) { ell(x, 66 + i * 7, 108 + Math.sin(i * 1.05) * 4, 2.2, 2.2); x.fill(); }
    }));
  }
  /* Dibuja brazo, arco y flecha (todo dinámico). (sx,sy) = hombro en mundo. ang = ángulo de apuntado. draw = 0..1 tensión; nocked = flecha puesta */
  function drawBow(c, sx, sy, fx, fy, ang, draw, nocked) {
    const reach = 50, hx = sx + Math.cos(ang) * reach, hy = sy + Math.sin(ang) * reach;
    const skinC = '#a2623a';
    c.lineCap = 'round';
    // brazo delantero
    c.strokeStyle = skinC; c.lineWidth = 11; c.beginPath(); c.moveTo(sx, sy); c.lineTo(hx, hy); c.stroke();
    c.strokeStyle = 'rgba(255,220,180,.18)'; c.lineWidth = 3; c.beginPath(); c.moveTo(sx, sy - 3); c.lineTo(hx, hy - 3); c.stroke();
    c.save(); c.translate(hx, hy); c.rotate(ang);
    // arco (hacia adelante +x). empuñadura en (0,0)
    const L = 62, bulge = 17;
    const bowPath = () => { c.beginPath(); c.moveTo(-14, -L); c.bezierCurveTo(bulge, -L * .62, bulge, L * .62, -14, L); };
    bowPath(); c.strokeStyle = '#5a4128'; c.lineWidth = 6.4; c.stroke();
    bowPath(); c.strokeStyle = lg(c, 0, -L, 0, L, [[0, '#b9955f'], [.5, '#d2b07a'], [1, '#a88450']]); c.lineWidth = 4.4; c.stroke();
    c.fillStyle = '#6a4a2a'; c.beginPath(); c.arc(-14, -L, 2.6, 0, 7); c.fill(); c.beginPath(); c.arc(-14, L, 2.6, 0, 7); c.fill();
    c.fillStyle = '#8a7a52'; c.fillRect(8, -9, 5, 18); c.strokeStyle = '#5a4a2a'; c.lineWidth = 1; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(8, -7 + i * 5); c.lineTo(13, -5 + i * 5); c.stroke(); } c.fillStyle = '#d6452a'; c.beginPath(); c.ellipse(11, -12, 2.4, 5, .5, 0, 7); c.fill(); c.fillStyle = '#e08a2a'; c.beginPath(); c.ellipse(10, 13, 2.2, 4.4, -.4, 0, 7); c.fill();
    const nx = -14 - draw * 34;
    c.strokeStyle = 'rgba(30,25,20,.85)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-14, -L); c.lineTo(nx, 0); c.lineTo(-14, L); c.stroke();
    if (nocked) drawArrowShape(c, nx + 6, 0, 78);
    c.restore();
    // brazo trasero hacia la cuerda
    const nxw = hx + Math.cos(ang) * (-14 - draw * 34) - Math.sin(ang) * 0, nyw = hy + Math.sin(ang) * (-14 - draw * 34);
    c.strokeStyle = shade(skinC, -.15); c.lineWidth = 10; c.beginPath(); c.moveTo(fx, fy); c.lineTo(nxw + Math.cos(ang) * 2, nyw + Math.sin(ang) * 2); c.stroke();
    c.fillStyle = shade(skinC, -.15); c.beginPath(); c.arc(nxw + Math.cos(ang) * 2, nyw + Math.sin(ang) * 2, 5.5, 0, 7); c.fill();
    return { x: hx + Math.cos(ang) * (-14 - draw * 34) + Math.cos(ang) * 78, y: nyw + Math.sin(ang) * 78 };
  }
  /* flecha apuntando a +x con base en x0 */
  function drawArrowShape(c, x0, y0, len) {
    c.save(); c.translate(x0, y0);
    c.strokeStyle = '#cdb67f'; c.lineWidth = 2.2; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(len - 6, 0); c.stroke();
    c.strokeStyle = '#8a7444'; c.lineWidth = .7; c.beginPath(); c.moveTo(14, 0); c.lineTo(len - 8, 0); c.stroke();
    c.fillStyle = '#5a4a30'; c.beginPath(); c.moveTo(len - 10, -2.6); c.lineTo(len + 5, 0); c.lineTo(len - 10, 2.6); c.closePath(); c.fill();
    c.strokeStyle = '#7a5a32'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(len - 16, 0); c.lineTo(len - 10, 0); c.stroke();
    // penacho de plumas rojas y azules en el extremo
    [['#c4301f', -4.5, -3], ['#2b4fb0', -2, 4], ['#d6452a', 2, -1]].forEach(f => { c.fillStyle = f[0]; c.beginPath(); c.ellipse(7 + f[1], f[2], 8, 2.6, f[2] * .08, 0, 7); c.fill(); });
    c.strokeStyle = '#6a4a2a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(12, -2); c.lineTo(12, 2); c.moveTo(16, -2); c.lineTo(16, 2); c.stroke();
    c.restore();
  }

  return { S, cache, rng, mk, shade, lg, rg, ell, blit, leaf, frond, tuft, toucan, bird, BIRDS, BIRD_FEET, ANIMALS, animalSize, drawAnimal, hunter, HUNTER, drawBow, drawArrowShape };
})();
