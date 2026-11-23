'use strict';
/* Arte parte 2: alimentos, cultivos, canasta, balde, casas, fuego, fondos y escena de tucanes. */
(function (A) {
  const { cache, rng, mk, shade, lg, rg, ell, leaf, frond, tuft } = A;

  /* ---------- ALIMENTOS (80x80) ---------- */
  const FOODS = {};
  FOODS.maiz = () => mk(80, 92, x => {
    leaf(x, 40, 88, 66, 15, -2.25, '#5da043'); leaf(x, 40, 88, 66, 15, -.9, '#4f9139');
    x.save(); x.translate(40, 44); x.rotate(.12);
    x.beginPath(); x.ellipse(0, 0, 15, 36, 0, 0, 7); x.fillStyle = lg(x, -15, 0, 15, 0, [[0, '#ffe680'], [.5, '#f6c22a'], [1, '#d79012']]); x.fill();
    x.save(); x.clip();
    for (let r = -9; r <= 9; r++) for (let c = -3; c <= 3; c++) { const w = r % 2 ? 2.4 : 0; x.fillStyle = (r + c) % 3 ? '#ffd23a' : '#f2b01c'; x.beginPath(); x.ellipse(c * 5.2 + w, r * 4.1, 2.5, 2.1, 0, 0, 7); x.fill(); x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.ellipse(c * 5.2 + w - .6, r * 4.1 - .7, .9, .7, 0, 0, 7); x.fill(); }
    x.restore();
    x.strokeStyle = '#8a5a2a'; x.lineWidth = 1.1; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(0, -34); x.quadraticCurveTo(-4 + i * 2, -42, -8 + i * 3.4, -46); x.stroke(); }
    x.restore();
    leaf(x, 40, 90, 50, 12, -2.5, '#6ab04c'); leaf(x, 40, 90, 52, 12, -.62, '#5da043');
  });
  FOODS.mandioca = () => mk(80, 92, x => {
    const tuber = (cx, cy, rot, sc) => {
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc);
      x.beginPath(); x.moveTo(-10, -36); x.bezierCurveTo(-15, -12, -13, 20, -3, 40); x.quadraticCurveTo(0, 46, 3, 40); x.bezierCurveTo(13, 20, 15, -12, 10, -36); x.closePath();
      x.fillStyle = lg(x, -14, 0, 14, 0, [[0, '#a2703f'], [.5, '#7c4f28'], [1, '#573418']]); x.fill();
      x.save(); x.clip(); x.strokeStyle = 'rgba(40,20,8,.45)'; x.lineWidth = 1.2; const r = rng(4);
      for (let i = 0; i < 26; i++) { const py = -34 + i * 3, px = -9 + r() * 18; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 6 + r() * 3, py + 1.5); x.stroke(); }
      x.strokeStyle = 'rgba(210,170,110,.4)'; for (let i = 0; i < 14; i++) { const py = -30 + i * 5; x.beginPath(); x.moveTo(-12, py); x.lineTo(-6 + r() * 6, py + 1); x.stroke(); } x.restore();
      x.fillStyle = '#f2e7cc'; x.beginPath(); x.ellipse(0, -36, 10.4, 4.2, 0, 0, 7); x.fill(); x.strokeStyle = '#d7c49a'; x.lineWidth = 1; x.beginPath(); x.ellipse(0, -36, 6, 2.4, 0, 0, 7); x.stroke();
      x.restore();
    };
    tuber(28, 46, -.5, .82); tuber(46, 46, .38, 1);
  });
  FOODS.zapallo = () => mk(80, 80, x => {
    x.fillStyle = 'rgba(0,0,0,.18)'; ell(x, 40, 68, 32, 6); x.fill();
    x.fillStyle = rg(x, 34, 38, 4, 38, [[0, '#ffbf4a'], [.6, '#ee8a1c'], [1, '#b85a10']]); ell(x, 40, 46, 33, 26); x.fill();
    x.strokeStyle = 'rgba(120,50,5,.45)'; x.lineWidth = 1.6;
    [-.78, -.4, 0, .4, .78].forEach(t => { x.beginPath(); x.moveTo(40 + t * 8, 21); x.quadraticCurveTo(40 + t * 46, 46, 40 + t * 11, 71); x.stroke(); });
    x.fillStyle = 'rgba(255,255,255,.25)'; ell(x, 28, 34, 9, 5, -.6); x.fill();
    x.fillStyle = '#6a7a2a'; x.beginPath(); x.moveTo(35, 22); x.quadraticCurveTo(36, 8, 44, 6); x.lineTo(48, 10); x.quadraticCurveTo(44, 14, 45, 22); x.closePath(); x.fill();
    x.strokeStyle = '#7ab04a'; x.lineWidth = 2; x.beginPath(); x.moveTo(46, 8); x.quadraticCurveTo(56, 2, 60, 10); x.stroke();
  });
  FOODS.manzana = () => mk(80, 80, x => {
    x.fillStyle = 'rgba(0,0,0,.18)'; ell(x, 40, 70, 26, 5); x.fill();
    x.beginPath(); x.moveTo(40, 24); x.bezierCurveTo(62, 10, 74, 36, 66, 54); x.bezierCurveTo(60, 70, 46, 72, 40, 68); x.bezierCurveTo(34, 72, 20, 70, 14, 54); x.bezierCurveTo(6, 36, 18, 10, 40, 24); x.closePath();
    x.fillStyle = rg(x, 30, 34, 4, 40, [[0, '#ff6a52'], [.55, '#d9261c'], [1, '#8c1010']]); x.fill();
    x.fillStyle = 'rgba(255,255,255,.4)'; ell(x, 26, 34, 5, 9, .4); x.fill();
    x.strokeStyle = '#5a3a1a'; x.lineWidth = 3; x.lineCap = 'round'; x.beginPath(); x.moveTo(40, 24); x.quadraticCurveTo(40, 14, 45, 8); x.stroke();
    leaf(x, 44, 14, 24, 8, -.5, '#4f9a3a');
  });
  FOODS.mandarina = () => mk(80, 80, x => {
    x.fillStyle = 'rgba(0,0,0,.18)'; ell(x, 40, 68, 28, 5); x.fill();
    x.fillStyle = rg(x, 32, 38, 4, 36, [[0, '#ffc15a'], [.55, '#f58a12'], [1, '#c4560a']]); ell(x, 40, 44, 30, 25); x.fill();
    const r = rng(11); x.fillStyle = 'rgba(150,60,0,.28)'; for (let i = 0; i < 50; i++) { const a = r() * 6.28, d = Math.sqrt(r()); ell(x, 40 + Math.cos(a) * d * 27, 44 + Math.sin(a) * d * 22, .8, .8); x.fill(); }
    x.fillStyle = 'rgba(255,255,255,.35)'; ell(x, 28, 33, 7, 4, -.5); x.fill();
    x.fillStyle = '#4d7a22'; ell(x, 40, 20, 4, 2.4); x.fill(); leaf(x, 40, 20, 22, 8, -.3, '#4f9a3a'); leaf(x, 40, 20, 16, 6, -2.5, '#5aa844');
  });
  FOODS.pera = () => mk(80, 84, x => {
    x.fillStyle = 'rgba(0,0,0,.18)'; ell(x, 40, 75, 24, 5); x.fill();
    x.beginPath(); x.moveTo(40, 12); x.bezierCurveTo(52, 12, 52, 34, 62, 48); x.bezierCurveTo(72, 64, 56, 76, 40, 76); x.bezierCurveTo(24, 76, 8, 64, 18, 48); x.bezierCurveTo(28, 34, 28, 12, 40, 12); x.closePath();
    x.fillStyle = rg(x, 34, 46, 4, 38, [[0, '#e6e86a'], [.6, '#b4c93a'], [1, '#7a9a22']]); x.fill();
    x.fillStyle = 'rgba(120,70,20,.25)'; const r = rng(2); for (let i = 0; i < 30; i++) { ell(x, 22 + r() * 36, 40 + r() * 30, .8, .8); x.fill(); }
    x.fillStyle = 'rgba(255,255,255,.35)'; ell(x, 30, 52, 4, 9, .3); x.fill();
    x.strokeStyle = '#5a3a1a'; x.lineWidth = 2.6; x.lineCap = 'round'; x.beginPath(); x.moveTo(40, 13); x.quadraticCurveTo(40, 6, 46, 3); x.stroke(); leaf(x, 42, 8, 20, 6, -.7, '#4f9a3a');
  });
  FOODS.banana = () => mk(80, 80, x => {
    x.lineCap = 'round';
    [[0, 0], [9, 5], [18, 10]].forEach((o, i) => {
      x.beginPath(); x.moveTo(14 + o[0], 18 + o[1] * .6); x.bezierCurveTo(12 + o[0], 56, 36 + o[0], 70, 66 + o[0] * .3, 60 + o[1] * .4);
      x.strokeStyle = '#a88612'; x.lineWidth = 17; x.stroke(); x.strokeStyle = i % 2 ? '#f5d93a' : '#ffe65a'; x.lineWidth = 14; x.stroke(); x.strokeStyle = 'rgba(255,255,255,.4)'; x.lineWidth = 3; x.beginPath(); x.moveTo(15 + o[0], 24 + o[1] * .6); x.bezierCurveTo(14 + o[0], 54, 36 + o[0], 64, 60 + o[0] * .3, 58 + o[1] * .4); x.stroke();
      x.fillStyle = '#2f2410'; ell(x, 67 + o[0] * .3, 60 + o[1] * .4, 3.2, 3.2); x.fill();
    });
    x.fillStyle = '#6a5a22'; x.beginPath(); x.moveTo(8, 10); x.lineTo(30, 10); x.lineTo(34, 22); x.lineTo(12, 26); x.closePath(); x.fill();
  });
  function food(n) { return cache('food' + n, FOODS[n]); }
  const FOOD_OK = ['maiz', 'mandioca', 'zapallo'], FOOD_BAD = ['manzana', 'mandarina', 'pera', 'banana'];

  /* ---------- CULTIVOS EN TIERRA (100x150, base inferior) ---------- */
  const CROPS = {};
  CROPS.maiz = () => mk(110, 160, x => {
    x.strokeStyle = '#5a8a2a'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(55, 156); x.quadraticCurveTo(54, 100, 56, 26); x.stroke();
    [[130, -1.2], [90, 1.0], [60, -1.45], [40, .75]].forEach((p, i) => frond2(x, 55, p[0], 66 - i * 4, p[1] > 0 ? -.2 - p[1] * .25 : -2.95 - p[1] * .25 + 0.3, '#5da043'));
    // espiga
    x.save(); x.translate(66, 76); x.rotate(.25); x.fillStyle = lg(x, -8, 0, 8, 0, [[0, '#ffe680'], [1, '#e2a416']]); ell(x, 0, 0, 7, 18); x.fill(); x.restore();
    leaf(x, 62, 100, 40, 9, -1.1, '#6ab04c'); leaf(x, 62, 100, 36, 8, -2.2, '#5da043');
    // penacho
    x.strokeStyle = '#c9a44a'; x.lineWidth = 1.3; for (let i = 0; i < 9; i++) { x.beginPath(); x.moveTo(55, 28); x.quadraticCurveTo(55 + (i - 4) * 4, 8, 55 + (i - 4) * 7, 6 + Math.abs(i - 4) * 2); x.stroke(); }
    function frond2(c, px, py, len, ang, col) { leaf(c, px, 156 - (156 - py) * 1, len, len * .17, ang, col); }
  });
  CROPS.mandioca = () => mk(110, 160, x => {
    x.lineCap = 'round';
    [[-.35, 120], [0, 134], [.35, 118]].forEach(s => {
      x.strokeStyle = '#8a4a3a'; x.lineWidth = 4; x.beginPath(); x.moveTo(55, 156); x.quadraticCurveTo(55 + s[0] * 40, 156 - s[1] * .55, 55 + s[0] * 90, 156 - s[1]); x.stroke();
      const tx = 55 + s[0] * 90, ty = 156 - s[1];
      for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .42; leaf(x, tx, ty, 38, 5.4, a, i % 2 ? '#4f9a3a' : '#3f8a30'); }
    });
    x.fillStyle = lg(x, 0, 0, 0, 1, [[0, '#8a5a34'], [1, '#573418']]); ell(x, 44, 154, 9, 5, -.4); x.fill(); ell(x, 68, 154, 10, 5, .4); x.fill();
  });
  CROPS.zapallo = () => mk(110, 160, x => {
    const lobe = (cx, cy, r, col) => { x.fillStyle = lg(x, cx - r, cy - r, cx + r, cy + r, [[0, shade(col, .2)], [1, shade(col, -.2)]]); x.beginPath(); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28; x.lineTo(cx + Math.cos(a) * r * (1 + .1 * Math.sin(i * 3)), cy + Math.sin(a) * r * .72 * (1 + .1 * Math.sin(i * 3))); } x.closePath(); x.fill(); x.strokeStyle = shade(col, -.4); x.globalAlpha = .5; x.lineWidth = 1; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(i * 1.05) * r * .9, cy + Math.sin(i * 1.05) * r * .65); x.stroke(); } x.globalAlpha = 1; };
    x.strokeStyle = '#5a8a2a'; x.lineWidth = 4; x.beginPath(); x.moveTo(55, 154); x.quadraticCurveTo(50, 110, 30, 96); x.moveTo(55, 154); x.quadraticCurveTo(66, 108, 86, 90); x.stroke();
    lobe(28, 94, 26, '#4f9a3a'); lobe(86, 86, 24, '#5aa844'); lobe(56, 70, 22, '#46903a');
    x.fillStyle = '#f7c62a'; for (let i = 0; i < 5; i++) { x.save(); x.translate(60, 52); x.rotate(i * 1.256); ell(x, 0, -6, 3.4, 7); x.fill(); x.restore(); } x.fillStyle = '#d78a10'; ell(x, 60, 52, 2.6, 2.6); x.fill();
    const f = food('zapallo'); x.drawImage(f, 32, 100, 52, 52);
  });
  function crop(n) { return cache('crop' + n, CROPS[n]); }
  const mound = () => cache('mound', () => mk(120, 44, x => {
    x.fillStyle = rg(x, 60, 20, 4, 60, [[0, '#8a5d36'], [.7, '#684225'], [1, '#4a2c16']]); ell(x, 60, 26, 54, 15); x.fill();
    x.fillStyle = 'rgba(255,220,170,.15)'; ell(x, 54, 20, 30, 7); x.fill();
    const r = rng(8); x.fillStyle = 'rgba(30,15,5,.3)'; for (let i = 0; i < 30; i++) { ell(x, 20 + r() * 80, 18 + r() * 16, 1.6, 1); x.fill(); }
  }));

  /* ---------- CANASTA / BALDE ---------- */
  const basketBack = () => cache('basketBack', () => mk(180, 70, x => {
    x.fillStyle = '#a97836'; ell(x, 90, 34, 84, 26); x.fill();
    x.fillStyle = lg(x, 0, 14, 0, 56, [[0, '#2a1708'], [1, '#4a2c12']]); ell(x, 90, 36, 76, 22); x.fill();
  }));
  const basketFront = () => cache('basketFront', () => mk(180, 100, x => {
    x.beginPath(); x.moveTo(6, 4); x.quadraticCurveTo(0, 20, 26, 82); x.quadraticCurveTo(90, 104, 154, 82); x.quadraticCurveTo(180, 20, 174, 4); x.quadraticCurveTo(90, 56, 6, 4); x.closePath();
    x.fillStyle = lg(x, 0, 0, 0, 100, [[0, '#d9a85a'], [.5, '#b8853a'], [1, '#85561f']]); x.fill();
    x.save(); x.clip(); x.strokeStyle = 'rgba(70,40,10,.5)'; x.lineWidth = 1.6;
    for (let i = -10; i < 30; i++) { x.beginPath(); x.moveTo(i * 9, 0); x.lineTo(i * 9 + 40, 110); x.stroke(); x.beginPath(); x.moveTo(i * 9 + 40, 0); x.lineTo(i * 9, 110); x.stroke(); }
    x.strokeStyle = 'rgba(255,230,170,.3)'; x.lineWidth = 1; for (let i = -10; i < 30; i++) { x.beginPath(); x.moveTo(i * 9 + 2, 0); x.lineTo(i * 9 + 42, 110); x.stroke(); }
    x.strokeStyle = '#6a4416'; x.lineWidth = 3; [30, 58].forEach(y => { x.beginPath(); x.moveTo(0, y - 12); x.quadraticCurveTo(90, y + 38, 180, y - 12); x.stroke(); });
    x.restore();
    x.strokeStyle = '#e0b668'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(6, 5); x.quadraticCurveTo(90, 58, 174, 5); x.stroke();
    x.strokeStyle = '#8a5a22'; x.lineWidth = 1.4; for (let i = 0; i < 26; i++) { const t = i / 25, px = 6 + 168 * t, py = 5 + 2 * (1 - t) * t * 53 + 0; x.beginPath(); x.moveTo(px - 2, py - 4); x.lineTo(px + 2, py + 4); x.stroke(); }
  }));
  const bucket = () => cache('bucket', () => mk(84, 84, x => {
    x.strokeStyle = '#b88a4a'; x.lineWidth = 3.2; x.beginPath(); x.moveTo(12, 24); x.bezierCurveTo(12, -12, 72, -12, 72, 24); x.stroke();
    x.beginPath(); x.moveTo(12, 24); x.lineTo(14, 70); x.quadraticCurveTo(42, 84, 70, 70); x.lineTo(72, 24); x.closePath();
    x.fillStyle = lg(x, 12, 0, 72, 0, [[0, '#b27a3a'], [.45, '#8c5a26'], [1, '#5e3a16']]); x.fill();
    x.strokeStyle = 'rgba(40,20,5,.5)'; x.lineWidth = 1.2; for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(12 + i * 10, 26); x.lineTo(14 + i * 9.4, 76); x.stroke(); }
    x.strokeStyle = '#4a4e56'; x.lineWidth = 4; [[34, 4], [58, 5]].forEach(b => { x.beginPath(); x.moveTo(12 + (b[0] - 24) * .05, b[0]); x.quadraticCurveTo(42, b[0] + b[1] + 4, 72 - (b[0] - 24) * .05, b[0]); x.stroke(); });
    x.fillStyle = '#6a3f18'; ell(x, 42, 24, 30, 8); x.fill(); x.fillStyle = lg(x, 0, 18, 0, 30, [[0, '#8fd0f0'], [1, '#3a8ac4']]); ell(x, 42, 25, 27, 6); x.fill();
    x.fillStyle = 'rgba(255,255,255,.5)'; ell(x, 34, 23, 8, 1.6); x.fill();
    x.fillStyle = '#b88a4a'; ell(x, 12, 24, 3, 3); x.fill(); ell(x, 72, 24, 3, 3); x.fill();
  }));

  /* ---------- CASA (210x190, suelo en y=176) ---------- */
  function house(burnt) {
    return cache('house' + burnt, () => mk(210, 190, x => {
      const wood = burnt ? ['#3a322c', '#241e1a'] : ['#a2693a', '#6b4224'], straw = burnt ? ['#4a4038', '#26201b'] : ['#e2bd62', '#a8802c'];
      x.fillStyle = 'rgba(20,30,10,.3)'; ell(x, 105, 176, 98, 11); x.fill();
      // paredes
      x.fillStyle = lg(x, 0, 100, 0, 176, [[0, wood[0]], [1, wood[1]]]); x.fillRect(38, 100, 134, 74);
      x.strokeStyle = 'rgba(30,15,5,.5)'; x.lineWidth = 1.6; for (let i = 0; i < 17; i++) { x.beginPath(); x.moveTo(42 + i * 8, 100); x.lineTo(42 + i * 8, 174); x.stroke(); }
      x.fillStyle = burnt ? '#120e0c' : '#2b1a0e'; x.fillRect(92, 116, 28, 58); x.fillStyle = burnt ? '#1e1814' : '#4a2e18'; x.fillRect(88, 112, 36, 6); x.fillRect(88, 112, 4, 62); x.fillRect(120, 112, 4, 62);
      x.fillStyle = burnt ? '#1e1814' : '#3a2412'; x.fillRect(138, 120, 24, 22); x.fillStyle = burnt ? '#0a0807' : '#18100a'; x.fillRect(141, 123, 18, 16);
      // techo
      x.beginPath(); x.moveTo(8, 118); x.quadraticCurveTo(40, 80, 105, 12); x.quadraticCurveTo(170, 80, 202, 118); x.quadraticCurveTo(105, 130, 8, 118); x.closePath();
      x.fillStyle = lg(x, 0, 12, 0, 124, [[0, straw[0]], [1, straw[1]]]); x.fill();
      x.save(); x.clip(); const r = rng(burnt ? 5 : 6);
      x.strokeStyle = shade(straw[1], -.25); x.lineWidth = 1.1; x.globalAlpha = .55;
      for (let i = 0; i < 260; i++) { const px = 8 + r() * 194, py = 12 + r() * 118; x.beginPath(); x.moveTo(px, py); x.lineTo(px + (px < 105 ? -6 : 6) * (.4 + r()), py + 8 + r() * 8); x.stroke(); }
      x.globalAlpha = .45; x.strokeStyle = shade(straw[0], .3); for (let i = 0; i < 140; i++) { const px = 8 + r() * 194, py = 12 + r() * 118; x.beginPath(); x.moveTo(px, py); x.lineTo(px + (px < 105 ? -5 : 5), py + 9); x.stroke(); }
      x.globalAlpha = .4; x.strokeStyle = shade(straw[1], -.4); x.lineWidth = 2; [40, 66, 92, 112].forEach(y => { x.beginPath(); x.moveTo(0, y + 14); x.quadraticCurveTo(105, y - 6, 210, y + 14); x.stroke(); });
      x.restore();
      x.strokeStyle = shade(straw[1], -.35); x.lineWidth = 2.4; x.beginPath(); x.moveTo(8, 118); x.quadraticCurveTo(105, 130, 202, 118); x.stroke();
      x.fillStyle = shade(straw[1], -.3); ell(x, 105, 14, 9, 5); x.fill();
    }));
  }

  /* ---------- FUEGO (procedural, animado) ---------- */
  function flame(c, x, y, s, t, ph) {
    c.save();
    c.globalCompositeOperation = 'lighter'; c.fillStyle = rg(c, x, y - 30 * s, 4, 70 * s, [[0, 'rgba(255,170,60,.45)'], [1, 'rgba(255,120,20,0)']]); c.fillRect(x - 90 * s, y - 120 * s, 180 * s, 150 * s); c.globalCompositeOperation = 'source-over';
    c.fillStyle = '#2a1a12'; ell(c, x, y + 2, 28 * s, 7 * s); c.fill();
    const tongues = [[-14, .78, 0], [14, .72, 1.7], [0, 1, .8]];
    tongues.forEach((tg, ti) => {
      const ox = tg[0] * s, k = tg[1];
      [[1, 1, '#d8301a', '#ff7a1a'], [.72, .78, '#ff7a1a', '#ffb52a'], [.44, .55, '#ffc83a', '#fff2a0']].forEach((L, li) => {
        const w = 24 * s * k * L[0], h = 92 * s * k * L[1], sw = Math.sin(t * 5.2 + ph + tg[2] + li * .5) * 6 * s, tip = Math.sin(t * 9 + ph * 2 + ti) * 4 * s;
        c.beginPath(); c.moveTo(x + ox - w, y);
        c.bezierCurveTo(x + ox - w * 1.15, y - h * .35, x + ox - w * .3 + sw, y - h * .62, x + ox + sw * 1.6 + tip, y - h);
        c.bezierCurveTo(x + ox + w * .3 + sw, y - h * .62, x + ox + w * 1.15, y - h * .35, x + ox + w, y);
        c.quadraticCurveTo(x + ox, y + w * .45, x + ox - w, y); c.closePath();
        c.fillStyle = lg(c, 0, y, 0, y - h, [[0, L[2]], [1, L[3]]]); c.fill();
      });
    });
    c.restore();
  }

  /* ---------- FONDOS ---------- */
  function blob(x, cx, cy, r, col, rnd, n) {
    for (let i = 0; i < (n || 7); i++) { const a = rnd() * 6.28, d = rnd() * r * .6, rr = r * (.4 + rnd() * .4), px = cx + Math.cos(a) * d, py = cy + Math.sin(a) * d * .7; x.fillStyle = rg(x, px - rr * .3, py - rr * .35, rr * .1, rr, [[0, shade(col, .2)], [1, shade(col, -.3)]]); x.beginPath(); x.arc(px, py, rr, 0, 7); x.fill(); }
  }
  function trunk(x, bx, top, bot, w, col, rnd) {
    x.fillStyle = lg(x, bx - w, 0, bx + w, 0, [[0, shade(col, -.35)], [.35, shade(col, .1)], [1, shade(col, -.45)]]);
    x.beginPath(); x.moveTo(bx - w * .5, top); x.bezierCurveTo(bx - w * .4, (top + bot) / 2, bx - w * .7, bot - 60, bx - w * 1.3, bot); x.lineTo(bx + w * 1.3, bot); x.bezierCurveTo(bx + w * .7, bot - 60, bx + w * .4, (top + bot) / 2, bx + w * .5, top); x.closePath(); x.fill();
    x.strokeStyle = 'rgba(20,12,5,.35)'; x.lineWidth = 1.2; for (let i = 0; i < 10; i++) { const o = (rnd() - .5) * w; x.beginPath(); x.moveTo(bx + o * .6, top); x.bezierCurveTo(bx + o, (top + bot) * .4, bx + o * 1.2, bot * .8, bx + o * 1.6, bot); x.stroke(); }
    x.fillStyle = 'rgba(70,120,50,.4)'; for (let i = 0; i < 8; i++) { ell(x, bx + (rnd() - .5) * w, top + rnd() * (bot - top), 3 + rnd() * 6, 8 + rnd() * 14, rnd()); x.fill(); }
  }
  function vine(x, px, py, len, rnd) {
    x.strokeStyle = '#3a6a2a'; x.lineWidth = 2; x.beginPath(); x.moveTo(px, py); x.bezierCurveTo(px + (rnd() - .5) * 20, py + len * .4, px + (rnd() - .5) * 20, py + len * .7, px + (rnd() - .5) * 14, py + len); x.stroke();
    for (let i = 0; i < 6; i++) leaf(x, px + (rnd() - .5) * 10, py + len * (i + 1) / 7, 12 + rnd() * 6, 4, rnd() * 6.28, '#4f9a3a');
  }
  function sky(x, w, h, stops) { x.fillStyle = lg(x, 0, 0, 0, h, stops); x.fillRect(0, 0, w, h); }
  function farTrees(x, w, base, rnd, layers) {
    layers.forEach((L, li) => { for (let i = 0; i < L.n; i++) { const px = (i + rnd() * .8) * w / L.n, h = L.h * (.7 + rnd() * .6); x.fillStyle = L.trunk; x.fillRect(px - 2, base - h * .5 - li * 6, 4 + li, h * .5 + li * 6); blob(x, px, base - h * .6 - li * 6, L.r * (.8 + rnd() * .5), L.col, rnd, 6); } });
  }
  function huntBG() {
    return cache('huntBG', () => mk(960, 540, x => {
      const r = rng(21);
      sky(x, 960, 400, [[0, '#2a6a3a'], [.5, '#8cc47c'], [1, '#e3f0b8']]);
      x.fillStyle = rg(x, 650, 90, 10, 330, [[0, 'rgba(255,250,210,.95)'], [1, 'rgba(255,250,210,0)']]); x.fillRect(0, 0, 960, 540);
      farTrees(x, 960, 350, r, [{ n: 14, h: 110, r: 46, col: '#8fba8a', trunk: '#7a9a80' }, { n: 11, h: 140, r: 56, col: '#5f9a5e', trunk: '#4f7a50' }, { n: 8, h: 170, r: 66, col: '#3f7e45', trunk: '#3a5a36' }]);
      x.fillStyle = 'rgba(230,245,210,.28)'; x.fillRect(0, 250, 960, 110);
      // suelo
      x.fillStyle = lg(x, 0, 340, 0, 540, [[0, '#7fa84a'], [.35, '#5f8c3a'], [1, '#34592a']]); x.beginPath(); x.moveTo(0, 352); x.quadraticCurveTo(480, 330, 960, 356); x.lineTo(960, 540); x.lineTo(0, 540); x.closePath(); x.fill();
      x.fillStyle = 'rgba(184,140,84,.55)'; x.beginPath(); x.moveTo(-20, 440); x.bezierCurveTo(260, 392, 620, 420, 980, 392); x.lineTo(980, 500); x.bezierCurveTo(640, 470, 280, 490, -20, 505); x.closePath(); x.fill();
      x.fillStyle = 'rgba(230,200,150,.35)'; x.beginPath(); x.moveTo(-20, 452); x.bezierCurveTo(260, 410, 620, 434, 980, 408); x.lineTo(980, 420); x.bezierCurveTo(640, 446, 260, 424, -20, 466); x.fill();
      for (let i = 0; i < 160; i++) tuft(x, r() * 960, 360 + r() * 180, 9 + r() * 14, ['#6aa03a', '#4a8a30', '#86b848'][i % 3], r);
      for (let i = 0; i < 40; i++) { const px = r() * 960, py = 370 + r() * 160; x.fillStyle = ['#fff2a0', '#ffffff', '#ff9ab8'][i % 3]; ell(x, px, py, 2.2, 2.2); x.fill(); }
      for (let i = 0; i < 9; i++) { const px = r() * 900 + 30, py = 400 + r() * 120; x.fillStyle = lg(x, 0, py - 6, 0, py + 6, [[0, '#a9a49a'], [1, '#6b675e']]); ell(x, px, py, 10 + r() * 8, 5 + r() * 3); x.fill(); }
      // troncos laterales
      trunk(x, 30, -10, 545, 40, '#6a4a2c', r); trunk(x, 930, -10, 545, 36, '#654528', r);
      for (let i = 0; i < 4; i++) vine(x, 70 + i * 12, 0, 120 + r() * 90, r);
      for (let i = 0; i < 4; i++) vine(x, 880 - i * 14, 0, 100 + r() * 90, r);
      // copa
      for (let i = 0; i < 9; i++) frond(x, 30 + (i % 3) * 10, 24, 150 + r() * 60, .2 + i * .28, .35, ['#2f7a3a', '#3b8c44', '#25683a'][i % 3]);
      for (let i = 0; i < 9; i++) frond(x, 930 - (i % 3) * 10, 20, 150 + r() * 60, Math.PI - .2 - i * .28, -.35, ['#2f7a3a', '#3b8c44', '#25683a'][i % 3]);
      for (let i = 0; i < 6; i++) frond(x, 200 + i * 120 + r() * 40, -6, 120 + r() * 40, 1.25 + r() * .6, .2, '#2a7038');
      // haces de luz
      x.globalAlpha = .13; [[540, 120], [640, 150], [760, 110]].forEach(b => { x.fillStyle = lg(x, 0, 0, 0, 400, [[0, '#fffbe0'], [1, 'rgba(255,251,224,0)']]); x.beginPath(); x.moveTo(b[0], 0); x.lineTo(b[0] + 70, 0); x.lineTo(b[0] + b[1] + 40, 420); x.lineTo(b[0] + b[1] - 60, 420); x.closePath(); x.fill(); }); x.globalAlpha = 1;
    }));
  }
  function huntFG() {
    return cache('huntFG', () => mk(960, 540, x => {
      const r = rng(33);
      for (let i = 0; i < 70; i++) tuft(x, r() * 960, 512 + r() * 40, 22 + r() * 26, ['#4a8a30', '#3a7a2a', '#5aa03a'][i % 3], r);
      for (let i = 0; i < 4; i++) frond(x, -10, 470 + i * 20, 130 + r() * 40, -.5 - i * .15, .1, '#2c7a38');
      for (let i = 0; i < 4; i++) frond(x, 970, 470 + i * 20, 130 + r() * 40, Math.PI + .5 + i * .15, -.1, '#2c7a38');
      for (let i = 0; i < 8; i++) { const px = 300 + r() * 600; x.fillStyle = ['#ff6aa0', '#fff', '#ffd23a'][i % 3]; ell(x, px, 520 + r() * 14, 3, 3); x.fill(); }
    }));
  }
  function fieldBG() {
    return cache('fieldBG', () => mk(960, 540, x => {
      const r = rng(55);
      sky(x, 960, 200, [[0, '#4a9a5a'], [.6, '#a9d49a'], [1, '#e4f2c0']]);
      x.fillStyle = rg(x, 760, 40, 10, 300, [[0, 'rgba(255,250,210,.9)'], [1, 'rgba(255,250,210,0)']]); x.fillRect(0, 0, 960, 300);
      farTrees(x, 960, 175, r, [{ n: 15, h: 90, r: 40, col: '#8fba8a', trunk: '#7a9a80' }, { n: 12, h: 110, r: 46, col: '#4f8e50', trunk: '#3a5a36' }]);
      for (let i = 0; i < 5; i++) { const px = 80 + i * 210 + r() * 60; trunk(x, px, 60, 190, 7, '#7a6a52', r); for (let j = 0; j < 7; j++) frond(x, px, 60, 70 + r() * 25, -Math.PI / 2 + (j - 3) * .5, .25 * (j < 3 ? -1 : 1), '#3b8c44'); }
      x.fillStyle = lg(x, 0, 170, 0, 540, [[0, '#7a5a34'], [.4, '#6b4626'], [1, '#4a2e18']]); x.beginPath(); x.moveTo(0, 178); x.quadraticCurveTo(480, 164, 960, 180); x.lineTo(960, 540); x.lineTo(0, 540); x.closePath(); x.fill();
      x.strokeStyle = 'rgba(30,15,5,.28)'; x.lineWidth = 3; for (let k = -14; k <= 14; k++) { x.beginPath(); x.moveTo(480 + k * 16, 180); x.lineTo(480 + k * 120, 545); x.stroke(); }
      x.strokeStyle = 'rgba(255,220,170,.1)'; x.lineWidth = 2; for (let k = -14; k <= 14; k++) { x.beginPath(); x.moveTo(486 + k * 16, 180); x.lineTo(490 + k * 120, 545); x.stroke(); }
      for (let i = 0; i < 70; i++) tuft(x, r() * 960, 190 + r() * 350, 8 + r() * 10, ['#6aa03a', '#4a8a30'][i % 2], r);
      for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(30,15,5,.3)'; ell(x, r() * 960, 200 + r() * 340, 2 + r() * 3, 1.3); x.fill(); }
      for (let i = 0; i < 5; i++) frond(x, -10, 520 - i * 14, 120, -.5 - i * .1, .1, '#2c7a38');
      for (let i = 0; i < 5; i++) frond(x, 970, 520 - i * 14, 120, Math.PI + .5 + i * .1, -.1, '#2c7a38');
    }));
  }
  function villageBG() {
    return cache('villageBG', () => mk(960, 540, x => {
      const r = rng(77);
      sky(x, 960, 260, [[0, '#2f7a45'], [.55, '#95c986'], [1, '#e1f0b6']]);
      x.fillStyle = rg(x, 480, 50, 10, 340, [[0, 'rgba(255,250,210,.9)'], [1, 'rgba(255,250,210,0)']]); x.fillRect(0, 0, 960, 400);
      farTrees(x, 960, 230, r, [{ n: 15, h: 110, r: 46, col: '#8fba8a', trunk: '#7a9a80' }, { n: 12, h: 140, r: 54, col: '#4f8e50', trunk: '#3a5a36' }, { n: 9, h: 160, r: 62, col: '#3a7a42', trunk: '#3a5a36' }]);
      x.fillStyle = lg(x, 0, 220, 0, 540, [[0, '#86ad52'], [.3, '#a98a58'], [1, '#8a6a40']]); x.beginPath(); x.moveTo(0, 236); x.quadraticCurveTo(480, 214, 960, 238); x.lineTo(960, 540); x.lineTo(0, 540); x.closePath(); x.fill();
      x.fillStyle = rg(x, 480, 400, 10, 440, [[0, 'rgba(214,180,120,.75)'], [1, 'rgba(214,180,120,0)']]); x.fillRect(0, 240, 960, 300);
      for (let i = 0; i < 140; i++) tuft(x, r() * 960, 245 + r() * 295, 8 + r() * 12, ['#6aa03a', '#4a8a30', '#86b848'][i % 3], r);
      for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(70,40,15,.18)'; ell(x, r() * 960, 270 + r() * 270, 5 + r() * 9, 2 + r() * 3); x.fill(); }
      trunk(x, 24, -10, 545, 34, '#6a4a2c', r); trunk(x, 940, -10, 545, 32, '#654528', r);
      for (let i = 0; i < 8; i++) frond(x, 24, 20, 150 + r() * 50, .2 + i * .3, .35, ['#2f7a3a', '#3b8c44'][i % 2]);
      for (let i = 0; i < 8; i++) frond(x, 940, 20, 150 + r() * 50, Math.PI - .2 - i * .3, -.35, ['#2f7a3a', '#3b8c44'][i % 2]);
      for (let i = 0; i < 4; i++) frond(x, -10, 520 - i * 16, 120, -.5 - i * .12, .1, '#2c7a38');
      for (let i = 0; i < 4; i++) frond(x, 970, 520 - i * 16, 120, Math.PI + .5 + i * .12, -.1, '#2c7a38');
    }));
  }

  /* ---------- ESCENA DE TUCANES (densa, cada ronda distinta) ---------- */
  const T_ANCHOR = { x: 57, y: 92 }; // pies del tucán dentro del sprite
  function tucanScene(seed, o) {
    o = o || {};
    const r = rng(seed), W = 960, H = 540, spots = [], tucs = [], perches = [];
    const tsp = A.toucan();
    const cv = mk(W, H, x => {
      sky(x, W, H, [[0, '#17482c'], [.4, '#2e7a3e'], [1, '#1b4a2a']]);
      for (let i = 0; i < 7; i++) { x.fillStyle = rg(x, r() * W, r() * 300, 10, 200, [[0, 'rgba(255,250,200,.4)'], [1, 'rgba(255,250,200,0)']]); x.fillRect(0, 0, W, H); }
      for (let i = 0; i < 70; i++) blob(x, r() * W, r() * H, 40 + r() * 40, ['#2e7040', '#3a8446', '#245c36'][i % 3], r, 3);
      // troncos + ramas
      const tx = []; for (let i = 0; i < 7; i++) tx.push(70 + i * 135 + (r() - .5) * 70);
      tx.forEach(px => trunk(x, px, -10, 550, 18 + r() * 14, ['#6a4a2c', '#5a4a38', '#7a5a38'][Math.floor(r() * 3)], r));
      tx.forEach(px => { const n = 2 + Math.floor(r() * 2); for (let b = 0; b < n; b++) {
        const by = 120 + r() * 260, dir = r() < .5 ? -1 : 1, len = 130 + r() * 150, pts = [[px, by], [px + dir * len * .35, by - 10 - r() * 20], [px + dir * len * .7, by + (r() - .5) * 40], [px + dir * len, by + (r() - .4) * 60]];
        [[16, '#2f1f12'], [12, '#5a3f26'], [4, '#8a6a46']].forEach((s, si) => { x.strokeStyle = s[1]; x.lineWidth = s[0]; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(pts[0][0], pts[0][1] + (si == 2 ? -3 : 0)); x.bezierCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1], pts[3][0], pts[3][1]); x.stroke(); });
        for (let k = 0; k < 7; k++) { const t = .3 + k * .1, mt = 1 - t; const bx = mt * mt * mt * pts[0][0] + 3 * mt * mt * t * pts[1][0] + 3 * mt * t * t * pts[2][0] + t * t * t * pts[3][0], byy = mt * mt * mt * pts[0][1] + 3 * mt * mt * t * pts[1][1] + 3 * mt * t * t * pts[2][1] + t * t * t * pts[3][1]; perches.push({ x: bx, y: byy - 5 }); }
      } });
      // hojas del fondo
      for (let i = 0; i < 130; i++) leaf(x, r() * W, r() * H, 30 + r() * 44, 8 + r() * 8, r() * 6.28, ['#2f8a40', '#3f9a4a', '#256a36', '#4aa850', '#357a3c'][Math.floor(r() * 5)]);
      for (let i = 0; i < 14; i++) frond(x, r() * W, r() * H, 60 + r() * 60, r() * 6.28, (r() - .5) * .8, ['#2f7a3a', '#3b8c44'][i % 2]);
      // elegir tucanes
      const cand = perches.filter(p => p.x > 70 && p.x < 890 && p.y > 120 && p.y < 440);
      for (let i = cand.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [cand[i], cand[j]] = [cand[j], cand[i]]; }
      for (const p of cand) { if (tucs.length >= (o.count != null ? o.count : CONFIG.tucanes.count)) break; if (tucs.every(q => Math.hypot(q.x - p.x, q.y - p.y) > 170)) tucs.push({ x: p.x, y: p.y, s: (o.sMin || .56) + r() * (o.sRange || .16), flip: r() < .5, hard: tucs.length }); }
      // señuelos
      const decoyTypes = ['loro', 'guacamayo', 'tangara', 'tordo', 'heli', 'flor', 'fruto'], dcs = [];
      for (const p of cand.slice().reverse()) { if (dcs.length >= (o.decoys != null ? o.decoys : CONFIG.tucanes.decoys)) break; if (tucs.every(q => Math.hypot(q.x - p.x, q.y - p.y) > 120) && dcs.every(q => Math.hypot(q.x - p.x, q.y - p.y) > 70)) dcs.push({ x: p.x, y: p.y, t: decoyTypes[dcs.length % decoyTypes.length], s: .6 + r() * .35, flip: r() < .5 }); }
      dcs.forEach(d => {
        if (A.BIRDS[d.t]) { A.blit(x, A.bird(d.t), d.x, d.y, d.s, d.flip, null, 0, A.BIRD_FEET.x / 76, A.BIRD_FEET.y / 92); leaf(x, d.x - 10, d.y + 4, 40 * d.s, 9, -1.2, '#3f9a4a'); }
        else if (d.t === 'heli') heliconia(x, d.x, d.y, d.s);
        else if (d.t === 'flor') hibiscus(x, d.x, d.y - 8, d.s);
        else fruto(x, d.x, d.y, d.s, r);
      });
      // tucanes + oclusión parcial
      tucs.forEach((t, i) => {
        const dir = t.flip ? -1 : 1, sc = t.s;
        A.blit(x, tsp, t.x, t.y, sc, t.flip, null, 0, T_ANCHOR.x / tsp.w, T_ANCHOR.y / tsp.h);
        const cx = t.x + dir * 18 * sc, cy = t.y - 36 * sc;
        spots.push({ x: cx, y: cy, r: Math.max(28, 52 * sc + 4), found: false, sc, hx: t.x + dir * 40 * sc, hy: t.y - 56 * sc });
        // hojas que tapan cola/abdomen/patas (nunca cabeza ni pico)
        leaf(x, t.x - dir * 40 * sc, t.y + 18 * sc, 66 * sc, 15 * sc, dir > 0 ? -.85 : Math.PI + .85, '#3a9446');
        leaf(x, t.x + dir * 8 * sc, t.y + 36 * sc, 52 * sc, 12 * sc, dir > 0 ? -1.9 : Math.PI + 1.9, '#2f8a40');
        if (true) leaf(x, t.x - dir * 14 * sc, t.y + 30 * sc, 60 * sc, 13 * sc, dir > 0 ? -.35 : Math.PI + .35, '#46a04c');
        leaf(x, t.x + dir * 22 * sc, t.y + 8 * sc, 50 * sc, 12 * sc, dir > 0 ? -.25 : Math.PI + .25, '#2f8a40');
      });
      // primer plano: hojas y flores (alejadas de cabezas)
      const ok = (px, py, rad) => spots.every(s => Math.hypot(px - s.x, py - s.y) > s.r + rad + 18);
      for (let i = 0; i < 70; i++) { const px = r() * W, py = r() * H, len = 40 + r() * 56; if (ok(px + len * .4, py, len * .6) && (px < 150 || px > 810 || py < 90 || py > 430 || r() < .45)) leaf(x, px, py, len, 10 + r() * 10, r() * 6.28, ['#2f8a40', '#3f9a4a', '#256a36', '#4aa850'][i % 4]); }
      for (let i = 0; i < 8; i++) { const px = r() * W, py = 40 + r() * 460; if (ok(px, py, 40)) { if (i % 3 === 0) heliconia(x, px, py, .8 + r() * .4); else if (i % 3 === 1) hibiscus(x, px, py, .7 + r() * .4); else frond(x, px, py, 80 + r() * 40, r() * 6.28, (r() - .5), '#2f8a40'); } }
      for (let i = 0; i < 4; i++) { frond(x, -10, 80 + i * 130, 160, -.2 + i * .1, .2, '#25683a'); frond(x, W + 10, 120 + i * 120, 160, Math.PI + .2 - i * .1, -.2, '#25683a'); }
      // la cabeza y el pico SIEMPRE quedan visibles (se redibujan encima de las hojas)
      tucs.forEach(t => { const dir = t.flip ? -1 : 1; x.save(); x.translate(t.x, t.y); x.scale(dir * t.s, t.s); x.translate(-T_ANCHOR.x, -T_ANCHOR.y); x.beginPath(); x.rect(66, 12, 70, 52); x.clip(); x.drawImage(tsp, 0, 0, tsp.w, tsp.h); x.restore(); });
      x.fillStyle = rg(x, W / 2, H / 2, 220, 620, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,25,10,.45)']]); x.fillRect(0, 0, W, H);
    });
    return { canvas: cv, spots };
  }
  function heliconia(x, px, py, s) {
    x.save(); x.translate(px, py); x.scale(s, s);
    x.strokeStyle = '#3a7a2a'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 30); x.quadraticCurveTo(4, 0, 0, -30); x.stroke();
    for (let i = 0; i < 6; i++) { x.save(); x.translate((i % 2 ? 7 : -7), 18 - i * 9); x.rotate(i % 2 ? .7 : -.7); x.fillStyle = lg(x, 0, -10, 0, 10, [[0, '#ff5a2a'], [1, '#c4121a']]); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(14, -3, 20, 8); x.quadraticCurveTo(8, 12, 0, 0); x.fill(); x.fillStyle = '#e8e03a'; x.beginPath(); x.moveTo(14, -1); x.quadraticCurveTo(19, 2, 20, 8); x.lineTo(15, 5); x.closePath(); x.fill(); x.restore(); }
    x.restore();
  }
  function hibiscus(x, px, py, s) {
    x.save(); x.translate(px, py); x.scale(s, s);
    for (let i = 0; i < 5; i++) { x.save(); x.rotate(i * 1.2566); x.fillStyle = lg(x, 0, 0, 0, -26, [[0, '#d8341a'], [1, '#ff9a2a']]); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(-14, -8, -14, -26, 0, -28); x.bezierCurveTo(14, -26, 14, -8, 0, 0); x.fill(); x.restore(); }
    x.strokeStyle = '#f7e36a'; x.lineWidth = 2.4; x.beginPath(); x.moveTo(0, 0); x.lineTo(8, -16); x.stroke(); x.fillStyle = '#f7e36a'; ell(x, 8, -17, 3, 3); x.fill();
    x.restore();
  }
  function fruto(x, px, py, s, r) {
    x.save(); x.translate(px, py); x.scale(s, s);
    for (let i = 0; i < 5; i++) { const ox = (i - 2) * 10, oy = Math.sin(i * 2) * 6; x.fillStyle = rg(x, ox - 3, oy - 3, 1, 10, [[0, '#ffb04a'], [1, '#e0701a']]); ell(x, ox, oy, 8.5, 9); x.fill(); }
    leaf(x, 0, -10, 28, 7, -2.4, '#3f9a4a'); leaf(x, 0, -10, 28, 7, -.7, '#4aa850');
    x.restore();
  }

  const topo = () => cache('topo', () => mk(84, 84, x => {
    x.fillStyle = lg(x, 0, 20, 0, 84, [[0, '#6a5a52'], [1, '#3a302c']]); ell(x, 42, 56, 26, 30); x.fill();
    x.fillStyle = lg(x, 0, 20, 0, 70, [[0, '#7a6a60'], [1, '#463a34']]); ell(x, 42, 44, 22, 20); x.fill();
    x.fillStyle = '#5a4a44'; ell(x, 42, 56, 12, 9); x.fill();
    x.fillStyle = '#f0a0a8'; for (let i = 0; i < 8; i++) { x.save(); x.translate(42, 56); x.rotate(i * .785); ell(x, 0, -6, 1.8, 4.2); x.fill(); x.restore(); } ell(x, 42, 56, 3.6, 3.6); x.fill();
    x.fillStyle = '#0a0806'; ell(x, 33, 42, 2.4, 2.4); x.fill(); ell(x, 51, 42, 2.4, 2.4); x.fill();
    x.fillStyle = '#fff'; ell(x, 33.8, 41.2, .8, .8); x.fill(); ell(x, 51.8, 41.2, .8, .8); x.fill();
    x.fillStyle = '#e8c8b8'; [[14, 70], [70, 70]].forEach(p => { ell(x, p[0], p[1], 9, 6); x.fill(); [-4, 0, 4].forEach(d => { x.strokeStyle = '#f4ece0'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(p[0] + d, p[1] - 4); x.lineTo(p[0] + d, p[1] - 9); x.stroke(); }); });
  }));
  /* ---------- NOCHE / LUCIÉRNAGAS ---------- */
  const fireflyGlow = () => cache('ffGlow', () => mk(96, 96, x => { x.fillStyle = rg(x, 48, 48, 2, 48, [[0, 'rgba(235,255,150,.95)'], [.35, 'rgba(190,255,90,.4)'], [1, 'rgba(160,255,60,0)']]); x.fillRect(0, 0, 96, 96); }, 1));
  const goldGlow = () => cache('ffGold', () => mk(96, 96, x => { x.fillStyle = rg(x, 48, 48, 2, 48, [[0, 'rgba(255,236,150,.95)'], [.35, 'rgba(255,190,70,.45)'], [1, 'rgba(255,150,30,0)']]); x.fillRect(0, 0, 96, 96); }, 1));
  function drawFirefly(c, x, y, s, b, gold, t) {
    const g = gold ? goldGlow() : fireflyGlow(), flick = 1 + Math.sin((t || 0) * 9) * .06, R = 46 * s * (.6 + .4 * b) * flick;
    c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha *= Math.min(1, b + .1); c.drawImage(g, x - R, y - R, R * 2, R * 2); c.restore();
    c.save(); c.translate(x, y); c.scale(s, s); const wing = Math.sin((t || 0) * 40) * .25;
    c.fillStyle = 'rgba(210,235,255,.5)'; c.save(); c.rotate(-.6 + wing); c.beginPath(); c.ellipse(-4, -9, 3.6, 8, 0, 0, 7); c.fill(); c.restore(); c.save(); c.rotate(.6 - wing); c.beginPath(); c.ellipse(4, -9, 3.6, 8, 0, 0, 7); c.fill(); c.restore();
    c.fillStyle = '#1c1a14'; c.beginPath(); c.ellipse(0, 0, 4.4, 7.5, 0, 0, 7); c.fill(); c.beginPath(); c.arc(0, -8, 3, 0, 7); c.fill();
    c.fillStyle = gold ? '#ffd54a' : '#d4ff5a'; c.beginPath(); c.ellipse(0, 4.5, 4, 4.8, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.globalAlpha *= .8; c.beginPath(); c.ellipse(0, 4, 2, 2.4, 0, 0, 7); c.fill();
    c.restore();
  }
  function drawJar(c, x, y, fill) {
    c.save(); c.translate(x, y);
    c.fillStyle = 'rgba(0,0,0,.35)'; ell(c, 0, 40, 34, 7); c.fill();
    const body = () => { c.beginPath(); c.moveTo(-26, -34); c.quadraticCurveTo(-36, -34, -36, -20); c.lineTo(-36, 26); c.quadraticCurveTo(-36, 40, -22, 40); c.lineTo(22, 40); c.quadraticCurveTo(36, 40, 36, 26); c.lineTo(36, -20); c.quadraticCurveTo(36, -34, 26, -34); c.closePath(); };
    body(); c.fillStyle = 'rgba(170,210,230,.16)'; c.fill();
    c.save(); body(); c.clip(); const h = 72 * fill; if (fill > 0) { c.globalCompositeOperation = 'lighter'; c.fillStyle = lg(c, 0, 40 - h, 0, 40, [[0, 'rgba(230,255,140,.55)'], [1, 'rgba(190,255,90,.9)']]); c.fillRect(-40, 40 - h, 80, h); c.drawImage(fireflyGlow(), -50, 40 - h - 40, 100, 100); } c.restore();
    body(); c.strokeStyle = 'rgba(210,235,255,.85)'; c.lineWidth = 2.5; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-24, 0, 3, 22, 0, 0, 7); c.fill();
    c.fillStyle = '#8a6a3a'; c.fillRect(-27, -44, 54, 12); c.strokeStyle = '#4a3418'; c.lineWidth = 1.5; c.strokeRect(-27, -44, 54, 12);
    c.restore();
  }
  function nightBG() {
    return cache('nightBG', () => mk(960, 540, x => {
      const r = rng(91);
      sky(x, 960, 540, [[0, '#050d24'], [.45, '#0b2a3a'], [1, '#0c2c1c']]);
      for (let i = 0; i < 70; i++) { x.fillStyle = 'rgba(255,255,255,' + (.3 + r() * .6) + ')'; ell(x, r() * 960, r() * 220, .7 + r() * .9, .7 + r() * .9); x.fill(); }
      x.fillStyle = rg(x, 780, 90, 4, 150, [[0, 'rgba(255,250,225,1)'], [.12, 'rgba(255,250,225,.9)'], [.14, 'rgba(210,235,255,.28)'], [1, 'rgba(210,235,255,0)']]); x.fillRect(560, 0, 400, 300);
      farTrees(x, 960, 340, r, [{ n: 13, h: 120, r: 50, col: '#18364a', trunk: '#12283a' }, { n: 10, h: 150, r: 60, col: '#12402e', trunk: '#0e2a22' }, { n: 8, h: 180, r: 70, col: '#0c3020', trunk: '#0a2018' }]);
      x.fillStyle = 'rgba(120,170,210,.16)'; x.fillRect(0, 250, 960, 110);
      x.fillStyle = lg(x, 0, 330, 0, 540, [[0, '#123a22'], [1, '#07180f']]); x.beginPath(); x.moveTo(0, 360); x.quadraticCurveTo(480, 335, 960, 362); x.lineTo(960, 540); x.lineTo(0, 540); x.closePath(); x.fill();
      for (let i = 0; i < 120; i++) tuft(x, r() * 960, 370 + r() * 170, 10 + r() * 18, ['#1d5a30', '#164a28', '#256a38'][i % 3], r);
      trunk(x, 28, -10, 545, 40, '#2a2218', r); trunk(x, 934, -10, 545, 36, '#2a2218', r);
      for (let i = 0; i < 9; i++) frond(x, 28, 24, 150 + r() * 60, .2 + i * .28, .35, ['#0f4a28', '#14562f', '#0b3c20'][i % 3]);
      for (let i = 0; i < 9; i++) frond(x, 934, 20, 150 + r() * 60, Math.PI - .2 - i * .28, -.35, ['#0f4a28', '#14562f', '#0b3c20'][i % 3]);
      for (let i = 0; i < 5; i++) frond(x, -10, 500 - i * 16, 130, -.5 - i * .1, .1, '#0e4a2a');
      for (let i = 0; i < 5; i++) frond(x, 970, 500 - i * 16, 130, Math.PI + .5 + i * .1, -.1, '#0e4a2a');
      x.fillStyle = rg(x, 480, 270, 160, 620, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,6,12,.5)']]); x.fillRect(0, 0, 960, 540);
    }));
  }
  Object.assign(A, { nightBG, drawFirefly, drawJar, fireflyGlow, topo, food, FOOD_OK, FOOD_BAD, crop, mound, basketBack, basketFront, bucket, house, flame, huntBG, huntFG, fieldBG, villageBG, tucanScene });
})(Art);
