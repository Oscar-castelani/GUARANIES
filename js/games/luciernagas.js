'use strict';
/* Juego 6 — Luciérnagas en la noche. Tocar las luces antes de que se apaguen y llenar el frasco. */
Core.register({
  focus: 0.5, id: 'luciernagas', title: 'Luciérnagas en la noche', blurb: 'Tocá las luces antes de que se apaguen.', time: CONFIG.luciernagas.time, goal: CONFIG.luciernagas.goal, goalLabel: 'Luces',
  how: 'Es de noche en la selva. Tocá las luciérnagas cuando brillan, antes de que se apaguen, y llená el frasco con ' + CONFIG.luciernagas.goal + ' luces. Las doradas valen más y brillan menos tiempo.',
  thumb(c, w, h) { c.drawImage(Art.nightBG(), 0, 60, 960, 440, 0, 0, w, h); [[.25, .35], [.5, .55], [.72, .3], [.82, .62], [.38, .72]].forEach((p, i) => Art.drawFirefly(c, p[0] * w, p[1] * h, 1.6, 1, i === 3)); },
  make() {
    const C = CONFIG.luciernagas, JAR = { x: 860, y: 420 };
    let flies, parts, flights, got, spawnT, t, bg, shake;
    function spawn() {
      const prog = Math.min(1, t / C.time), gold = Math.random() < .12;
      flies.push({ x: 60 + Math.random() * 840, y: 120 + Math.random() * 320, bx: 0, by: 0, ph: Math.random() * 6, age: 0, life: (3.8 - 2.0 * prog) * (gold ? .75 : 1), gold, dead: 0, vx: (Math.random() - .5) * 26, vy: (Math.random() - .5) * 18 });
    }
    const bright = f => f.age < .35 ? f.age / .35 : (f.life - f.age < .7 ? Math.max(0, (f.life - f.age) / .7) : 1);
    return {
      reset() { flies = []; parts = []; flights = []; got = 0; spawnT = .3; t = 0; shake = 0; bg = Art.nightBG(); Art.fireflyGlow(); },
      down(x, y) {
        let best = null, bd = 1e9;
        for (const f of flies) { if (f.dead) continue; const d = Math.hypot(x - f.x, y - f.y); if (bright(f) > .25 && d < 54 && d < bd) { best = f; bd = d; } }
        if (!best) return;
        best.dead = .001; const pts = best.gold ? 30 : 10, n = best.gold ? 3 : 1;
        Core.addScore(pts); Core.float(best.x, best.y - 24, '+' + pts, best.gold ? '#ffd86a' : '#e8ff9a'); Core.sfx('pick');
        flights.push({ x: best.x, y: best.y, t: 0, gold: best.gold, n });
        for (let i = 0; i < 10; i++) parts.push({ x: best.x, y: best.y, vx: (Math.random() - .5) * 200, vy: (Math.random() - .5) * 200, t: 0, gold: best.gold });
      },
      update(dt) {
        t += dt; const prog = Math.min(1, t / C.time);
        spawnT -= dt; if (spawnT <= 0 && flies.filter(f => !f.dead).length < 8) { spawn(); spawnT = (.95 - .5 * prog) * (.85 + Math.random() * .3); } else if (spawnT <= 0) spawnT = .3;
        for (const f of flies) { f.age += dt; f.x += (f.vx + Math.sin(t * 1.3 + f.ph) * 20) * dt; f.y += (f.vy + Math.cos(t * 1.1 + f.ph) * 16) * dt; f.y = Math.max(100, Math.min(450, f.y)); if (f.dead) f.dead += dt; }
        flies = flies.filter(f => f.age < f.life && !(f.dead > .3));
        for (const p of parts) { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; } parts = parts.filter(p => p.t < .6);
        for (const fl of flights) { fl.t += dt * 1.6; if (fl.t >= 1 && !fl.done) { fl.done = true; got += fl.n; Core.setGoal(Math.min(got, C.goal)); shake = .25; if (got >= C.goal) Core.finish(true, '¡Llenaste el frasco con ' + got + ' luces!'); } }
        flights = flights.filter(f => f.t < 1.05); shake = Math.max(0, shake - dt);
      },
      draw(c) {
        Core.drawBg(c, bg);
        for (const f of flies) { const b = bright(f) * (f.dead ? Math.max(0, 1 - f.dead / .3) : 1); if (b <= .01) continue; c.globalAlpha = Math.min(1, b + .25); Art.drawFirefly(c, f.x, f.y, 1.5, b, f.gold, t + f.ph);
          if (!f.dead && b > .3) { c.globalAlpha = .55 * b; c.strokeStyle = f.gold ? '#ffd86a' : '#d8ff80'; c.lineWidth = 2; c.beginPath(); c.arc(f.x, f.y, 30 + 10 * (1 - (f.life - f.age) / f.life), 0, 7); c.stroke(); } c.globalAlpha = 1; }
        for (const p of parts) { c.globalAlpha = 1 - p.t / .6; c.fillStyle = p.gold ? '#ffd86a' : '#e8ff9a'; c.beginPath(); c.arc(p.x, p.y, 3, 0, 7); c.fill(); } c.globalAlpha = 1;
        for (const fl of flights) { const k = fl.t, e = k * k * (3 - 2 * k), x = fl.x + (JAR.x - fl.x) * e, y = fl.y + (JAR.y - 30 - fl.y) * e - Math.sin(k * Math.PI) * 70; Art.drawFirefly(c, x, y, 1.2, 1, fl.gold, t * 3); }
        Art.drawJar(c, JAR.x + (shake ? Math.sin(shake * 60) * 2 : 0), JAR.y, Math.min(1, got / C.goal));
      },
      dbg() { return { flies: flies.filter(f => !f.dead && bright(f) > .4).map(f => ({ x: f.x, y: f.y })), got }; },
      timeUp() { Core.finish(false, 'Juntaste ' + got + ' de ' + C.goal + ' luces'); }
    };
  }
});
