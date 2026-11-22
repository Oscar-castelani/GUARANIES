'use strict';
/* Juego 5 — Apagá el fuego. Juego ficticio de cuidado ambiental (no es una práctica tradicional documentada).
   Agua ilimitada; una sola descarga por pulsación con pausa de 0,75 s. */
Core.register({
  focus: 0.6, id: 'fuego', title: 'Apagá el fuego', blurb: 'Cuidá las casas del incendio con tu balde.', time: CONFIG.fuego.time, goal: CONFIG.fuego.housesToWin, goalLabel: 'Casas a salvo',
  how: 'Pequeños fuegos amenazan las casas. Mové el balde, tocá donde hay llamas y apagalas. El agua no se acaba, pero hay una pausa entre cada descarga. ¡Mantené a salvo al menos ' + CONFIG.fuego.housesToWin + ' de 4 casas!',
  thumb(c, w, h) { c.drawImage(Art.villageBG(), 0, 150, 960, 390, 0, 0, w, h); Art.blit(c, Art.house(false), w * .3, h * .86, 1.05, false, 1, 0, .5, .93); Art.blit(c, Art.house(false), w * .74, h * .8, .85, false, 1, 0, .5, .93); Art.flame(c, w * .5, h * .9, 1.1, 1, 0); Art.blit(c, Art.bucket(), w * .62, h * .5, 1.1, false, 1, .5); },
  make() {
    const C = CONFIG.fuego, HOUSES = [{ x: 175, y: 330 }, { x: 430, y: 400 }, { x: 700, y: 322 }, { x: 850, y: 410 }];
    let houses, fires, drops, splashes, puffs, cd, putout, bucket, ptr, pour, nextFire, t, bg;
    const clampP = (x, y) => [Math.max(30, Math.min(930, x)), Math.max(150, Math.min(520, y))];
    function addFire(x, y) { if (fires.length >= C.maxFires) return; const p = clampP(x, y); fires.push({ x: p[0], y: p[1], size: .5, ph: Math.random() * 6, spread: 4 + Math.random() * 2.5, grow: 0 }); }
    function nearHouseFire() { const alive = houses.filter(h => h.hp > 0), hh = alive.length ? alive[Math.floor(Math.random() * alive.length)] : houses[0]; addFire(hh.x + (Math.random() - .5) * 220, hh.y + 20 + Math.random() * 60); }
    function throwWater() {
      cd = 0; pour = { t: 0, x: ptr.x, y: ptr.y, applied: false }; Core.sfx('splash');
    }
    function splash(x, y) {
      splashes.push({ x, y, t: 0 });
      for (let i = 0; i < 12; i++) drops.push({ kind: 'spl', x, y, vx: (Math.random() - .5) * 220, vy: -80 - Math.random() * 160, t: 0 });
      for (let i = fires.length - 1; i >= 0; i--) {
        const f = fires[i];
        if (Math.hypot(f.x - x, (f.y - y) * 1.2) < C.splashRadius + 24 * f.size) {
          f.size -= .62; for (let k = 0; k < 4; k++) puffs.push({ x: f.x + (Math.random() - .5) * 20, y: f.y - 20, vx: (Math.random() - .5) * 20, vy: -40 - Math.random() * 30, t: 0, life: 1.1, r: 10, steam: 1 });
          if (f.size <= 0) { fires.splice(i, 1); putout++; Core.addScore(10); Core.float(f.x, f.y - 70, '+10', '#bfe8ff'); Core.sfx('hiss'); }
        }
      }
    }
    function houseCount() { return houses.filter(h => h.hp > 0).length; }
    return {
      reset() { houses = HOUSES.map(h => ({ x: h.x, y: h.y, hp: 100, smoke: 0 })); fires = []; drops = []; splashes = []; puffs = []; cd = C.cooldown; putout = 0; t = 0; nextFire = 4; ptr = { x: 480, y: 300 }; bucket = { x: 480, y: 230 }; pour = null; bg = Art.villageBG();
        addFire(250, 380); addFire(640, 400); addFire(480, 330); Core.setGoal(4, 4); },
      move(x, y) { ptr.x = x; ptr.y = y; },
      down(x, y) { ptr.x = x; ptr.y = y; if (cd >= C.cooldown && !pour) throwWater(); },
      update(dt) {
        t += dt; cd = Math.min(C.cooldown, cd + dt);
        const bx = ptr.x, by = ptr.y - 72; bucket.x += (bx - bucket.x) * Math.min(1, dt * 16); bucket.y += (by - bucket.y) * Math.min(1, dt * 16);
        if (pour) {
          pour.t += dt;
          if (pour.t > .1 && pour.t < .4) for (let i = 0; i < 3; i++) drops.push({ kind: 'str', sx: bucket.x + 30, sy: bucket.y - 6, tx: pour.x + (Math.random() - .5) * 36, ty: pour.y + (Math.random() - .5) * 18, t: 0, d: .24 + Math.random() * .1 });
          if (pour.t > .42 && !pour.applied) { pour.applied = true; splash(pour.x, pour.y); }
          if (pour.t > .6) pour = null;
        }
        drops.forEach(d => { d.t += dt; if (d.kind === 'spl') { d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 700 * dt; } });
        drops = drops.filter(d => d.t < (d.kind === 'str' ? d.d : .5)); splashes.forEach(s => s.t += dt); splashes = splashes.filter(s => s.t < .5);
        // fuegos
        nextFire -= dt; if (nextFire <= 0) { if (fires.length < 4 + Math.floor(t / 12)) nearHouseFire(); nextFire = 3.6 + Math.random() * 1.4; }
        for (const f of fires) {
          f.size = Math.min(1, f.size + dt * .085);
          f.spread -= dt; if (f.spread <= 0 && f.size > .8) { f.spread = 5 + Math.random() * 3; const a = Math.random() * 6.28; addFire(f.x + Math.cos(a) * 95, f.y + Math.sin(a) * 45); } else if (f.spread <= 0) f.spread = 1;
          for (const h of houses) if (h.hp > 0 && Math.hypot(f.x - h.x, (f.y - (h.y - 40)) * 1.4) < 105) { h.hp -= dt * 2.4 * f.size; h.near = true; }
        }
        if (Math.random() < dt * 8) fires.forEach(f => { if (Math.random() < .3) puffs.push({ x: f.x + (Math.random() - .5) * 20, y: f.y - 70 * f.size, vx: (Math.random() - .5) * 20, vy: -50, t: 0, life: 1.6, r: 8 }); });
        for (const h of houses) { if (h.hp < 90 && h.hp > 0 && Math.random() < dt * 3) puffs.push({ x: h.x + (Math.random() - .5) * 120, y: h.y - 80 - Math.random() * 40, vx: 10, vy: -34, t: 0, life: 2, r: 12 }); if (h.hp <= 0 && Math.random() < dt * 2) puffs.push({ x: h.x + (Math.random() - .5) * 100, y: h.y - 90, vx: 8, vy: -26, t: 0, life: 2.2, r: 14 }); }
        puffs.forEach(p => { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += dt * 9; }); puffs = puffs.filter(p => p.t < p.life);
        Core.setGoal(houseCount());
      },
      draw(c) {
        c.drawImage(bg, 0, 0, 960, 540);
        const objs = houses.map(h => ({ y: h.y, h })).concat(fires.map(f => ({ y: f.y + 1, f })).sort((a, b) => a.y - b.y)).sort((a, b) => a.y - b.y);
        for (const o of objs) {
          if (o.h) {
            const h = o.h, sc = .72 + (h.y - 300) / 400 * .45, dmg = Math.max(0, Math.min(1, 1 - h.hp / 100));
            Art.blit(c, Art.house(false), h.x, h.y + 4, sc, false, 1, 0, .5, 176 / 190);
            if (dmg > 0) Art.blit(c, Art.house(true), h.x, h.y + 4, sc, false, Math.min(.92, dmg * 1.05), 0, .5, 176 / 190);
            if (h.hp <= 0) { c.save(); c.fillStyle = 'rgba(0,0,0,.55)'; c.font = 'bold 15px Georgia,serif'; c.textAlign = 'center'; c.fillText('Quemada', h.x, h.y + 24); c.restore(); }
          } else Art.flame(c, o.f.x, o.f.y, o.f.size * .85 + .1, t, o.f.ph);
        }
        // humo / vapor
        for (const p of puffs) { c.globalAlpha = Math.max(0, (1 - p.t / p.life) * (p.steam ? .6 : .38)); c.fillStyle = p.steam ? '#f4fbff' : '#3a3a3a'; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill(); } c.globalAlpha = 1;
        // chorro y salpicaduras
        for (const d of drops) {
          if (d.kind === 'str') { const k = d.t / d.d, x = d.sx + (d.tx - d.sx) * k, y = d.sy + (d.ty - d.sy) * k - Math.sin(k * Math.PI) * 26 + k * k * 30; c.fillStyle = 'rgba(120,200,245,.95)'; c.beginPath(); c.ellipse(x, y, 3.2, 5.4, .2, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(x - 1, y - 2, 1.2, 0, 7); c.fill(); }
          else { c.globalAlpha = 1 - d.t / .5; c.fillStyle = '#9fd8f7'; c.beginPath(); c.arc(d.x, d.y, 2.8, 0, 7); c.fill(); c.globalAlpha = 1; }
        }
        for (const s of splashes) { c.save(); c.globalAlpha = 1 - s.t / .5; c.strokeStyle = '#d8f2ff'; c.lineWidth = 3; c.beginPath(); c.ellipse(s.x, s.y, 14 + s.t * 120, 6 + s.t * 50, 0, 0, 7); c.stroke(); c.restore(); }
        // mira de objetivo (radio real del chorro)
        const k = Math.min(1, cd / C.cooldown);
        c.save(); c.translate(ptr.x, ptr.y); c.setLineDash([6, 6]); c.lineWidth = 2.5; c.strokeStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(0, 0, C.splashRadius, C.splashRadius * .8, 0, 0, 7); c.stroke(); c.setLineDash([]);
        c.lineWidth = 4; c.strokeStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.arc(0, 0, 14, 0, 7); c.stroke(); c.strokeStyle = k >= 1 ? '#bfe8ff' : '#4aa8e0'; c.beginPath(); c.arc(0, 0, 14, -Math.PI / 2, -Math.PI / 2 + k * 6.283); c.stroke(); c.restore();
        // balde
        const rot = pour ? Math.min(.95, Math.sin(Math.min(1, pour.t / .45) * Math.PI) * 1.0) : 0;
        Art.blit(c, Art.bucket(), bucket.x, bucket.y, 1.15, false, 1, rot, .5, .5);
      },
      timeUp() { const n = houseCount(), ok = n >= C.housesToWin; Core.setGoal(n); Core.finish(ok, ok ? 'Salvaste ' + n + ' de 4 casas y apagaste ' + putout + ' fuegos' : 'Quedaron ' + n + ' de 4 casas a salvo (necesitabas ' + C.housesToWin + ')'); }
    };
  }
});
