'use strict';
/* Juego 4 — Cosecha rápida. Tocar/clic cultivos antes de que desaparezcan. Ritmo suave y accesible. */
Core.register({
  focus: 0.5, id: 'cosecha', title: 'Cosecha rápida', blurb: 'Recogé los cultivos antes de que se escondan.', time: CONFIG.cosecha.time, goal: CONFIG.cosecha.goal, goalLabel: 'Cosechas',
  how: 'En la chacra van apareciendo maíz, mandioca y zapallo. Tocalos para cosecharlos antes de que se escondan. Juntá ' + CONFIG.cosecha.goal + '. Cada vez va más rápido y salen más topos: ¡no los toques! Si tocás un topo perdés 5 puntos.',
  thumb(c, w, h) { c.drawImage(Art.fieldBG(), 0, 120, 960, 420, 0, 0, w, h); [['maiz', .22], ['zapallo', .5], ['mandioca', .78]].forEach(p => { Art.blit(c, Art.mound(), w * p[1], h * .86, 1, false); Art.blit(c, Art.crop(p[0]), w * p[1], h * .88, .95, false, 1, 0, .5, 1); }); },
  make() {
    const C = CONFIG.cosecha;
    // 12 lugares de siembra en 3 hileras con perspectiva
    const spots = []; [[250, .8], [345, .92], [450, 1.04]].forEach((row, ri) => { for (let i = 0; i < 4; i++) spots.push({ x: 150 + i * (150 + ri * 20) + (ri % 2 ? 40 : 0), y: row[0], s: row[1], crop: null }); });
    const BASKET = { x: 872, y: 470 };
    let moles, moleT, crops, spawnT, got, parts, t, bg;
    function spawn() {
      const free = spots.filter(s => !s.crop); if (!free.length) return;
      const sp = free[Math.floor(Math.random() * free.length)], kind = ['maiz', 'mandioca', 'zapallo'][Math.floor(Math.random() * 3)];
      const cr = { kind, sp, age: 0, life: (C.lifeMin + Math.random() * (C.lifeMax - C.lifeMin)) * (1 - .45 * Math.min(1, t / C.time)), state: 'grow' }; sp.crop = cr; crops.push(cr);
    }
    return {
      reset() { moles = []; moleT = 3.5; crops = []; spots.forEach(s => s.crop = null); spawnT = .5; got = 0; parts = []; t = 0; bg = Art.fieldBG(); },
      down(x, y) {
        for (const m of moles) { if (m.state !== 'up') continue; if (Math.hypot(x - m.sp.x, (y - (m.sp.y - 30 * m.sp.s)) * .85) < 46 * m.sp.s + 14) { m.state = 'hit'; m.ht = 0; Core.addScore(-5); Core.float(m.sp.x, m.sp.y - 80, '-5', '#ff9a8a'); Core.sfx('wrong'); return; } }
        let best = null, bd = 1e9;
        for (const cr of crops) { if (cr.state !== 'grow') continue; const cy = cr.sp.y - 40 * cr.sp.s, d = Math.hypot(x - cr.sp.x, (y - cy) * .8); if (d < 64 * cr.sp.s + 14 && d < bd) { best = cr; bd = d; } }
        if (!best) return;
        best.state = 'fly'; best.ft = 0; best.sp.crop = null; got++; Core.addScore(C.pointsEach); Core.setGoal(got); Core.sfx('pick');
        Core.float(best.sp.x, best.sp.y - 100 * best.sp.s, '+' + C.pointsEach, '#ffe27a');
        for (let i = 0; i < 10; i++) parts.push({ x: best.sp.x, y: best.sp.y - 8, vx: (Math.random() - .5) * 200, vy: -50 - Math.random() * 130, t: 0, c: ['#7a5230', '#9a6a3a', '#5a3a1e'][i % 3] });
        if (got >= C.goal) Core.finish(true, '¡Cosechaste ' + got + ' cultivos!');
      },
      update(dt) {
        t += dt; spawnT -= dt; if (spawnT <= 0) { spawn(); spawnT = C.spawn * (.9 + Math.random() * .25) * (1 - .5 * Math.min(1, t / C.time)); }
        for (const cr of crops) {
          if (cr.state === 'grow') { cr.age += dt; if (cr.age > cr.life) { cr.state = 'gone'; cr.sp.crop = null; cr.gt = 0; } }
          else if (cr.state === 'gone') { cr.gt += dt; if (cr.gt > .35) cr.dead = true; }
          else if (cr.state === 'fly') { cr.ft += dt * 1.8; if (cr.ft >= 1) cr.dead = true; }
        }
        crops = crops.filter(c => !c.dead);
        moleT -= dt; if (moleT <= 0) { const free = spots.filter(s => !s.crop); if (free.length > 2) { const sp = free[Math.floor(Math.random() * free.length)], m = { sp, age: 0, life: 2.4 * (1 - .4 * Math.min(1, t / C.time)), state: 'up' }; sp.crop = m; moles.push(m); } moleT = (4 + Math.random() * 2.5) * (1 - .65 * Math.min(1, t / C.time)); }
        for (const m of moles) { m.age += dt; if (m.state === 'hit') { m.ht += dt; if (m.ht > .35) m.dead = true; } else if (m.age > m.life) m.dead = true; if (m.dead) m.sp.crop = null; }
        moles = moles.filter(m => !m.dead);
        for (const p of parts) { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 520 * dt; } parts = parts.filter(p => p.t < .7);
      },
      draw(c) {
        c.drawImage(bg, 0, 0, 960, 540);
        spots.forEach(s => Art.blit(c, Art.mound(), s.x, s.y, s.s * .95, false, .9));
        for (const m of moles) { const s = m.sp.s, rise = m.state === 'hit' ? Math.max(0, 1 - m.ht / .3) : Math.min(1, m.age / .25) * (m.life - m.age < .3 ? (m.life - m.age) / .3 : 1); c.save(); c.beginPath(); c.rect(m.sp.x - 70, m.sp.y - 130, 140, 136); c.clip(); Art.blit(c, Art.topo(), m.sp.x + (m.state === 'hit' ? Math.sin(m.ht * 50) * 4 : 0), m.sp.y + 6 + (1 - rise) * 70 * s, 1.15 * s, false, 1, 0, .5, 1); c.restore(); }
        const list = crops.filter(cr => cr.state === 'grow' || cr.state === 'gone').sort((a, b) => a.sp.y - b.sp.y);
        for (const cr of list) {
          const s = cr.sp.s; let sc = Math.min(1, cr.age / .45); sc = 1 - Math.pow(1 - sc, 3) + Math.sin(sc * Math.PI) * .08; let a = 1; const left = cr.life - cr.age;
          if (cr.state === 'gone') { sc = Math.max(0, 1 - cr.gt / .35); a = sc; } else if (left < .9) a = .5 + .5 * Math.abs(Math.sin(left * 12));
          Art.blit(c, Art.crop(cr.kind), cr.sp.x, cr.sp.y + 6, s * sc * .95, false, a, 0, .5, 1);
          // anillo de tiempo restante (indicador no solo de color)
          if (cr.state === 'grow' && cr.age > .45) { const k = Math.max(0, left / cr.life); c.save(); c.lineWidth = 4; c.lineCap = 'round'; c.strokeStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(cr.sp.x + 44 * s, cr.sp.y - 120 * s, 11, 0, 7); c.stroke(); c.strokeStyle = left < 1.2 ? '#ff9a6a' : '#fff3a0'; c.beginPath(); c.arc(cr.sp.x + 44 * s, cr.sp.y - 120 * s, 11, -Math.PI / 2, -Math.PI / 2 + k * 6.283); c.stroke(); c.restore(); }
        }
        // canasta
        Art.blit(c, Art.basketBack(), BASKET.x, BASKET.y - 18, .7, false);
        for (const cr of crops) if (cr.state === 'fly') { const k = cr.ft, e = k * k * (3 - 2 * k), x = cr.sp.x + (BASKET.x - cr.sp.x) * e, y = cr.sp.y - 40 + (BASKET.y - 30 - cr.sp.y + 40) * e - Math.sin(k * Math.PI) * 120; Art.blit(c, Art.food(cr.kind), x, y, .9 - .35 * k, false, 1, k * 5); }
        Art.blit(c, Art.basketFront(), BASKET.x, BASKET.y + 36, .7, false, 1, 0, .5, 1);
        for (const p of parts) { c.globalAlpha = 1 - p.t / .7; c.fillStyle = p.c; c.beginPath(); c.arc(p.x, p.y, 3.4, 0, 7); c.fill(); } c.globalAlpha = 1;
      },
      timeUp() { Core.finish(false, 'Cosechaste ' + got + ' de ' + C.goal + ' cultivos'); }
    };
  }
});
