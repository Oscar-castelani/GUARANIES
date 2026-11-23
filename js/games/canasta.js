'use strict';
/* Juego 3 — Llená la canasta. Arrastrar (Pointer Events: mouse y táctil). Correctos: maíz, mandioca, zapallo. */
Core.register({
  focus: 0.75, id: 'canasta', title: 'Llená la canasta', blurb: 'Arrastrá solo maíz, mandioca y zapallo.', time: CONFIG.canasta.time, goal: CONFIG.canasta.goal, goalLabel: 'En la canasta',
  how: 'Arrastrá a la canasta solo el maíz, la mandioca y el zapallo. Las otras frutas son distractores de este juego: ¡no las pongas! Llená ' + CONFIG.canasta.goal + '.',
  thumb(c, w, h) { c.fillStyle = Art.lg(c, 0, 0, 0, h, [[0, '#b9dc9a'], [1, '#7a9a4a']]); c.fillRect(0, 0, w, h); Art.blit(c, Art.basketBack(), w * .5, h * .74, 1, false); Art.blit(c, Art.food('maiz'), w * .44, h * .62, 1.1, false, 1, -.2); Art.blit(c, Art.food('zapallo'), w * .56, h * .6, 1, false); Art.blit(c, Art.basketFront(), w * .5, h * .94, 1, false, 1, 0, .5, 1); Art.blit(c, Art.food('mandarina'), w * .14, h * .3, 1, false); Art.blit(c, Art.food('manzana'), w * .86, h * .3, 1, false); Art.blit(c, Art.food('mandioca'), w * .8, h * .66, .9, false, 1, .3); },
  make() {
    const C = CONFIG.canasta, BASKET = { x: 480, y: 440 }, ZONE = { x: 480, y: 410, rx: 128, ry: 80 };
    const FIELD = { x0: 70, x1: 890, y0: 112, y1: 315 };
    let items, drag, got, parts, bgc, t, shakes;
    function bg() {
      return Art.cache('canastaBG', () => Art.mk(960, 540, x => {
        const r = Art.rng(12);
        x.fillStyle = Art.lg(x, 0, 0, 0, 540, [[0, '#6fa24a'], [.55, '#a4b86a'], [1, '#8a6a3c']]); x.fillRect(0, 0, 960, 540);
        for (let i = 0; i < 110; i++) Art.tuft(x, r() * 960, 20 + r() * 520, 10 + r() * 14, ['#5a9a3a', '#7ab648', '#4a8a30'][i % 3], r);
        // esterilla tejida
        x.save(); x.translate(480, 215); x.fillStyle = 'rgba(0,0,0,.16)'; x.beginPath(); x.ellipse(6, 12, 430, 150, 0, 0, 7); x.fill();
        x.fillStyle = Art.lg(x, 0, -150, 0, 150, [[0, '#e0c280'], [1, '#c4a05a']]); x.beginPath(); x.ellipse(0, 0, 424, 142, 0, 0, 7); x.fill();
        x.save(); x.clip(); x.strokeStyle = 'rgba(120,80,30,.3)'; x.lineWidth = 2; for (let i = -60; i < 60; i++) { x.beginPath(); x.moveTo(i * 14, -150); x.lineTo(i * 14 + 60, 150); x.stroke(); x.beginPath(); x.moveTo(i * 14 + 60, -150); x.lineTo(i * 14, 150); x.stroke(); } x.restore();
        x.strokeStyle = '#8a5a2a'; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 0, 424, 142, 0, 0, 7); x.stroke(); x.restore();
        for (let i = 0; i < 6; i++) Art.frond(x, i < 3 ? -10 : 970, 80 + (i % 3) * 170, 130, i < 3 ? -.2 + (i % 3) * .2 : Math.PI + .2 - (i % 3) * .2, i < 3 ? .2 : -.2, '#2f7a3a');
      }));
    }
    function place() {
      for (let n = 0; n < 40; n++) {
        const x = FIELD.x0 + Math.random() * (FIELD.x1 - FIELD.x0), y = FIELD.y0 + Math.random() * (FIELD.y1 - FIELD.y0);
        if (!(x < 280 && y < 165) && items.every(i => Math.hypot(i.x - x, i.y - y) > 104)) return { x, y };
      }
      return { x: FIELD.x0 + Math.random() * 800, y: FIELD.y0 + Math.random() * 250 };
    }
    function addItem() {
      const okCount = items.filter(i => Art.FOOD_OK.includes(i.kind)).length;
      const wantOk = okCount < 3 || (okCount < 4 && Math.random() < .55) || Math.random() < .45;
      const pool = wantOk ? Art.FOOD_OK : Art.FOOD_BAD, kind = pool[Math.floor(Math.random() * pool.length)], p = place();
      items.push({ kind, x: p.x, y: p.y, hx: p.x, hy: p.y, age: 0, life: 6 + Math.random() * 3, rot: (Math.random() - .5) * .5, ph: Math.random() * 6, state: 'idle', st: 0, sc: 0 });
    }
    function hit(x, y) { let best = null, bd = 1e9; for (const i of items) { if (i.state !== 'idle') continue; const d = Math.hypot(x - i.x, y - i.y); if (d < 50 && d < bd) { best = i; bd = d; } } return best; }
    function inZone(x, y) { return ((x - ZONE.x) / ZONE.rx) ** 2 + ((y - ZONE.y) / ZONE.ry) ** 2 <= 1; }
    return {
      reset() { items = []; drag = null; got = 0; parts = []; t = 0; shakes = 0; bgc = bg(); for (let i = 0; i < C.onField; i++) addItem(); },
      down(x, y) { const it = hit(x, y); if (it) { drag = { it, ox: it.x - x, oy: it.y - y + 0 }; it.state = 'drag'; Core.sfx('pick'); } },
      move(x, y) { if (drag && drag.it.state === 'drag') { drag.it.x = x + drag.ox * .3; drag.it.y = y - 26; } },
      up(x, y, cancel) {
        if (!drag) return; const it = drag.it; drag = null; if (it.state !== 'drag') return;
        if (!cancel && inZone(it.x, it.y)) {
          if (Art.FOOD_OK.includes(it.kind)) { it.state = 'in'; it.st = 0; it.fx = it.x; it.fy = it.y; got++; Core.addScore(C.pointsEach); Core.setGoal(got); Core.float(ZONE.x, ZONE.y - 60, '+' + C.pointsEach, '#ffe27a'); Core.sfx('hit'); if (got >= C.goal) Core.finish(true, '¡Llenaste la canasta con ' + got + ' alimentos!'); }
          else { it.state = 'bounce'; it.st = 0; it.fx = it.x; it.fy = it.y; Core.float(ZONE.x, ZONE.y - 60, 'Ese no', '#ffb0a0'); Core.sfx('wrong'); }
        } else { it.state = 'idle'; it.age = 0; it.x = Math.max(FIELD.x0 - 10, Math.min(FIELD.x1 + 10, it.x)); it.y = Math.max(50, Math.min(FIELD.y1 + 60, it.y)); }
      },
      update(dt) {
        t += dt;
        for (const it of items) {
          it.sc = Math.min(1, it.sc + dt * 4);
          if (it.state === 'idle') { it.age += dt; if (it.age > it.life) { it.state = 'fade'; it.st = 0; } }
          else if (it.state === 'fade') { it.st += dt; if (it.st > .4) it.dead = true; }
          else if (it.state === 'in') { it.st += dt * 2.2; const k = Math.min(1, it.st); it.x = it.fx + (ZONE.x - it.fx) * k; it.y = it.fy + (ZONE.y + 10 - it.fy) * k - Math.sin(k * Math.PI) * 50; if (k >= 1) it.dead = true; }
          else if (it.state === 'bounce') { it.st += dt * 2; const k = Math.min(1, it.st); it.x = it.fx + (it.hx - it.fx) * k; it.y = it.fy + (it.hy + 0 - it.fy) * k - Math.sin(k * Math.PI) * 80; if (k >= 1) { it.state = 'idle'; it.age = 0; } }
        }
        const before = items.length; items = items.filter(i => !i.dead);
        const need = C.onField - items.length; for (let i = 0; i < need; i++) addItem();
      },
      draw(c) {
        Core.drawBg(c, bgc);
        const sorted = items.slice().sort((a, b) => (a.state === 'drag') - (b.state === 'drag') || a.y - b.y);
        const inside = sorted.filter(i => i.state === 'in' && i.st > .55), others = sorted.filter(i => !(i.state === 'in' && i.st > .55));
        const drawItem = i => {
          const s = Art.food(i.kind), big = i.state === 'drag' ? 1.2 : 1, bob = i.state === 'idle' ? Math.sin(t * 2 + i.ph) * 2 : 0;
          let a = i.state === 'fade' ? 1 - i.st / .4 : 1, sc = (i.state === 'in' ? 1 - Math.min(1, i.st) * .35 : 1) * big * (.4 + i.sc * .6);
          if (i.state === 'idle' && i.age > i.life - 1.2) a = .55 + .45 * Math.abs(Math.sin(t * 10));
          if (i.state === 'drag') { c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(i.x + 6, i.y + 34, 28, 8, 0, 0, 7); c.fill(); }
          else if (i.state === 'idle') { c.fillStyle = 'rgba(40,25,5,.22)'; c.beginPath(); c.ellipse(i.x, i.y + 32, 26, 6, 0, 0, 7); c.fill(); }
          Art.blit(c, s, i.x, i.y + bob, sc * 1.05, false, a, i.rot + (i.state === 'bounce' ? Math.sin(i.st * 30) * .3 : 0));
        };
        others.forEach(i => { if (i.state !== 'in') drawItem(i); });
        Art.blit(c, Art.basketBack(), BASKET.x, BASKET.y - 20, 1, false);
        others.forEach(i => { if (i.state === 'in') drawItem(i); });
        inside.forEach(drawItem);
        // frutas dentro (acumuladas, visuales)
        for (let k = 0; k < Math.min(got, 8); k++) { const kind = Art.FOOD_OK[k % 3]; Art.blit(c, Art.food(kind), BASKET.x - 60 + (k % 4) * 40, BASKET.y - 28 - Math.floor(k / 4) * 8, .62, false, 1, ((k * 53) % 7 - 3) * .12); }
        Art.blit(c, Art.basketFront(), BASKET.x, BASKET.y + 52, 1, false, 1, 0, .5, 1);
        // guía: alimentos correctos
        c.save(); c.fillStyle = 'rgba(20,35,15,.6)'; c.beginPath(); c.roundRect ? c.roundRect(14, 96, 238, 56, 12) : c.rect(14, 96, 238, 56); c.fill();
        c.fillStyle = '#fff'; c.font = 'bold 14px Georgia,serif'; c.textAlign = 'left'; c.fillText('Van en la canasta:', 24, 112);
        Art.FOOD_OK.forEach((k, i) => Art.blit(c, Art.food(k), 44 + i * 76, 130, .42, false)); c.restore();
        // indicador de zona al arrastrar
        if (drag) { c.save(); c.setLineDash([12, 8]); c.lineDashOffset = -t * 24; c.strokeStyle = inZone(drag.it.x, drag.it.y) ? '#fff7b0' : 'rgba(255,255,255,.55)'; c.lineWidth = 4; c.beginPath(); c.ellipse(ZONE.x, ZONE.y, ZONE.rx, ZONE.ry, 0, 0, 7); c.stroke(); c.restore(); }
      },
      dbg() { return items.map(i => ({ kind: i.kind, x: i.x, y: i.y, state: i.state })); },
      timeUp() { Core.finish(false, 'Pusiste ' + got + ' de ' + C.goal + ' alimentos'); }
    };
  }
});
