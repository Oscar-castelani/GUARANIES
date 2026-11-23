'use strict';
/* Juego 1 — Arco y flecha. Flechas infinitas; solo hay pausa entre disparos (cadencia). */
Core.register({
  focus: 0.85, id: 'arco', title: 'Arco y flecha', blurb: 'Apuntá y alcanzá a los animales.', time: CONFIG.arco.time, goal: CONFIG.arco.goal, goalLabel: 'Animales',
  how: 'Mové el mouse (o tocá) para apuntar y disparar. Alcanzá ' + CONFIG.arco.goal + ' animales. ¡Cada acierto acelera el juego! Las flechas son ilimitadas: solo hay una breve pausa entre tiros.',
  thumb(c, w, h) { c.drawImage(Art.huntBG(), 0, 150, 960, 330, 0, 0, w, h); Art.drawAnimal(c, 'venado', w * .62, h * .86, 1.25, true, 0, 1); Art.blit(c, Art.hunter(), w * .17, h * 1.02, .95, false, 1, 0, .5, 1); const hx = w * .17 - 75 * .95 + 88 * .95, hy = h * 1.02 - 272 * .95 + 108 * .95; Art.drawBow(c, hx, hy, hx - 30, hy + 4, -.12, .6, true); },
  make() {
    const C = CONFIG.arco, GROUND = 528, HX = 150;
    const SH = { x: HX - 75 + Art.HUNTER.shoulder.x, y: GROUND - Art.HUNTER.h + Art.HUNTER.shoulder.y };
    const FAR = { x: HX - 75 + Art.HUNTER.far.x, y: GROUND - Art.HUNTER.h + Art.HUNTER.far.y };
    let animals, arrows, parts, cd, spawnT, hits, aim, time, aimAng, bg, fg;
    const g = 520;
    function spawn() {
      const kinds = ['carpincho', 'carpincho', 'venado', 'pecari', 'pecari'], kind = kinds[Math.floor(Math.random() * kinds.length)];
      const dir = -1, depth = Math.random(), y = 395 + depth * 78, sc = .85 + depth * .3;
      const sp = { carpincho: 62, venado: 82, pecari: 70 }[kind] * (.9 + Math.random() * .2);
      const sz = Art.animalSize(kind);
      animals.push({ kind, x: Core.view.x1 + sz.w * sc * .6, y, sc, vx: dir * sp, flip: dir < 0 ? true : false, t: Math.random() * 5, dead: 0, sz, turn: 330 + Math.random() * 230 });
      // las sprites miran a la derecha: flip si va hacia la izquierda
      animals[animals.length - 1].flip = dir < 0;
    }
    function poseAng() { return aimAng; }
    function solve() {
      const v = 980, dx = aim.x - SH.x - 40, dy = aim.y - SH.y, dist = Math.max(60, Math.hypot(dx, dy)), t = dist / v;
      const vx = dx / t, vy = (dy - .5 * g * t * t) / t;
      return { vx, vy, ang: Math.max(-1.25, Math.min(.85, Math.atan2(vy, vx))) };
    }
    function shoot() {
      const s = solve(), a = s.ang, sp = Math.hypot(s.vx, s.vy);
      const hx = SH.x + Math.cos(a) * 50, hy = SH.y + Math.sin(a) * 50;
      arrows.push({ x: hx + Math.cos(a) * 50, y: hy + Math.sin(a) * 50, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, stuck: 0, alive: true });
      cd = 0; Core.sfx('shoot');
    }
    function puff(x, y, n) { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 220, vy: -60 - Math.random() * 160, rot: Math.random() * 6, life: .8, t: 0, col: ['#4f9a3a', '#7ab648', '#f2c230', '#fff'][i % 4] }); }
    return {
      reset() { animals = []; arrows = []; parts = []; cd = C.cooldown; spawnT = .3; hits = 0; time = 0; aim = { x: 520, y: 420 }; aimAng = -.1; bg = Art.huntBG(); fg = Art.huntFG(); Art.hunter(); },
      move(x, y) { aim.x = x; aim.y = y; },
      down(x, y) { aim.x = x; aim.y = y; if (cd >= C.cooldown) shoot(); },
      update(dt) {
        time += dt; cd = Math.min(C.cooldown, cd + dt);
        aimAng = solve().ang;
        const sm = 1 + Math.min(1.2, hits * .07);
        spawnT -= dt * sm;
        const alive = animals.filter(a => !a.dead).length;
        if (spawnT <= 0 && alive < C.maxAnimals + (hits >= 10 ? 1 : 0)) { spawn(); spawnT = 1.3 + Math.random() * 1.1; } else if (spawnT <= 0) spawnT = .5;
        for (const a of animals) { if (a.dead) { a.dead += dt; continue; } if (a.vx < 0 && a.x < a.turn) { a.vx = -a.vx; a.flip = false; } a.x += a.vx * dt * sm; a.t += dt * sm * (Math.abs(a.vx) / 70); }
        animals = animals.filter(a => (a.dead ? a.dead < .6 : (a.vx > 0 ? a.x < Core.view.x1 + 150 : a.x > Core.view.x0 - 150)));
        for (const ar of arrows) {
          if (ar.stuck) { ar.stuck += dt; continue; }
          const steps = 4, h = dt / steps;
          for (let i = 0; i < steps && !ar.stuck; i++) {
            ar.x += ar.vx * h; ar.y += ar.vy * h; ar.vy += g * h;
            const L = Math.hypot(ar.vx, ar.vy), tx = ar.x + ar.vx / L * 6, ty = ar.y + ar.vy / L * 6;
            for (const a of animals) {
              if (a.dead) continue;
              const spec = Art.ANIMALS[a.kind], cx = a.x, cy = a.y - a.sz.h * a.sc * .5, rx = a.sz.w * a.sc * spec.hit[0] + 8, ry = a.sz.h * a.sc * spec.hit[1] * .85 + 8;
              if (((tx - cx) / rx) ** 2 + ((ty - cy) / ry) ** 2 < 1) {
                a.dead = .001; ar.stuck = 99; ar.gone = true; hits++; const pts = C.points[a.kind];
                Core.addScore(pts); Core.setGoal(hits); Core.float(cx, cy - 40, '+' + pts, '#ffe27a'); Core.sfx('hit'); puff(cx, cy, 16);
                if (hits >= C.goal) Core.finish(true, '¡Alcanzaste ' + hits + ' animales!');
                break;
              }
            }
            if (!ar.stuck && (ar.y > 430 + Math.random() * 0 && ar.vy > 0 && ar.y > 500 || ar.x > Core.view.x1 + 50 || ar.x < Core.view.x0 - 50 || ar.y < -150 || ar.y > 560)) ar.stuck = ar.y > 480 ? .001 : 99;
          }
        }
        arrows = arrows.filter(a => !a.gone && a.stuck < 1.2);
        for (const p of parts) { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt; p.rot += dt * 8; }
        parts = parts.filter(p => p.t < p.life);
      },
      draw(c) {
        Core.drawBg(c, bg);
        const list = animals.slice().sort((a, b) => a.y - b.y);
        for (const a of list) {
          const al = a.dead ? Math.max(0, 1 - a.dead / .5) : 1, sc = a.sc * (a.dead ? 1 + a.dead * .25 : 1);
          Art.drawAnimal(c, a.kind, a.x, a.y, sc, a.flip, a.dead ? 0 : a.t, al);
        }
        // cazador
        const hs = Art.hunter(); Art.blit(c, hs, HX, GROUND, 1, false, 1, 0, .5, 1);
        const draw = Math.min(1, cd / C.cooldown), ready = cd >= C.cooldown * .35;
        Art.drawBow(c, SH.x, SH.y, FAR.x, FAR.y, aimAng, ready ? draw : 0, ready);
        // flechas
        for (const ar of arrows) { c.save(); c.translate(ar.x, ar.y); c.rotate(Math.atan2(ar.vy, ar.vx)); if (ar.stuck && ar.stuck < 99) c.globalAlpha = Math.max(0, 1 - ar.stuck / 1.2); c.translate(-62, 0); Art.drawArrowShape(c, 0, 0, 66); c.restore(); }
        Core.drawBg(c, fg);
        for (const p of parts) { c.save(); c.globalAlpha = 1 - p.t / p.life; c.translate(p.x, p.y); c.rotate(p.rot); c.fillStyle = p.col; c.beginPath(); c.ellipse(0, 0, 7, 3.2, 0, 0, 7); c.fill(); c.restore(); }
        // mira + recarga
        const k = Math.min(1, cd / C.cooldown);
        c.save(); c.translate(aim.x, aim.y);
        c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(0, 0, 17, 0, 7); c.stroke();
        c.strokeStyle = k >= 1 ? '#fff7c2' : '#f2c230'; c.beginPath(); c.arc(0, 0, 17, -Math.PI / 2, -Math.PI / 2 + k * 6.283); c.stroke();
        c.lineWidth = 2; c.strokeStyle = k >= 1 ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(-8, 0); c.lineTo(8, 0); c.moveTo(0, -8); c.lineTo(0, 8); c.stroke(); c.restore();
      },
      dbg() { return { animals, hits, arrows: arrows.length }; },
      timeUp() { Core.finish(false, 'Alcanzaste ' + hits + ' de ' + C.goal + ' animales'); }
    };
  }
});
