'use strict';
/* Juego 2 — Encontrá los tucanes (objetos ocultos). La escena se regenera en cada partida. */
Core.register({
  id: 'tucanes', title: 'Encontrá los tucanes', blurb: 'Buscalos entre las ramas y las hojas.', time: CONFIG.tucanes.time, goal: CONFIG.tucanes.count, goalLabel: 'Tucanes',
  how: 'Hay ' + CONFIG.tucanes.count + ' tucanes escondidos en la selva. Tocá cada uno cuando lo encuentres. ¡Cuidado con otras aves y flores parecidas!',
  thumb(c, w, h) { c.fillStyle = Art.lg(c, 0, 0, 0, h, [[0, '#2f7a3e'], [1, '#17482c']]); c.fillRect(0, 0, w, h); const r = Art.rng(4); for (let i = 0; i < 40; i++) Art.leaf(c, r() * w, r() * h, 30 + r() * 40, 9, r() * 6.28, ['#2f8a40', '#3f9a4a', '#256a36'][i % 3]); Art.blit(c, Art.toucan(), w * .55, h * .5, 1.6, false); for (let i = 0; i < 14; i++) Art.leaf(c, r() * w, r() * h, 50 + r() * 40, 12, r() * 6.28, ['#2f8a40', '#4aa850'][i % 2]); },
  make() {
    let scene, found, t, rings, misses, idle, level = 1;
    return {
      nextLevel() { level++; },
      reset() { Core.setGoal(0, CONFIG.tucanes.count, 'Nivel ' + level); scene = Art.tucanScene((Math.random() * 1e9) | 0, { decoys: Math.min(20, 8 + (level - 1) * 3), sMin: Math.max(.38, .56 - (level - 1) * .05), sRange: .14 }); found = 0; t = 0; idle = 0; rings = []; misses = []; },
      down(x, y) {
        for (const s of scene.spots) {
          if (s.found) continue;
          if (Math.hypot(x - s.x, y - s.y) <= s.r) {
            s.found = true; idle = 0; found++; Core.addScore(CONFIG.tucanes.pointsEach); Core.setGoal(found); Core.sfx('hit');
            Core.float(s.x, s.y - 30, '+' + CONFIG.tucanes.pointsEach, '#ffe27a');
            if (found >= CONFIG.tucanes.count) Core.finish(true, '¡Encontraste los ' + found + ' tucanes!', { next: true });
            return;
          }
        }
        misses.push({ x, y, t: 0 }); Core.sfx('miss');
      },
      update(dt) { t += dt; idle += dt; misses.forEach(m => m.t += dt); misses = misses.filter(m => m.t < .5); },
      draw(c) {
        c.drawImage(scene.canvas, 0, 0, 960, 540);
        for (const s of scene.spots) {
          if (!s.found) continue;
          const pulse = 1 + Math.sin(t * 4) * .04, rr = s.r * pulse;
          c.save(); c.lineWidth = 4; c.strokeStyle = '#fff7b0'; c.setLineDash([10, 6]); c.lineDashOffset = -t * 20; c.beginPath(); c.arc(s.x, s.y, rr, 0, 7); c.stroke();
          c.setLineDash([]); c.lineWidth = 2; c.strokeStyle = '#d68a10'; c.beginPath(); c.arc(s.x, s.y, rr + 4, 0, 7); c.stroke();
          c.fillStyle = '#2f9a4a'; c.beginPath(); c.arc(s.x + rr * .7, s.y - rr * .7, 12, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(s.x + rr * .7 - 5, s.y - rr * .7); c.lineTo(s.x + rr * .7 - 1, s.y - rr * .7 + 4); c.lineTo(s.x + rr * .7 + 6, s.y - rr * .7 - 4); c.stroke(); c.restore();
        }
        if (idle > 10) { const h = scene.spots.find(q => !q.found); if (h) { c.save(); c.globalAlpha = .35 + .3 * Math.sin(t * 5); c.strokeStyle = '#fff7b0'; c.lineWidth = 3; c.beginPath(); c.arc(h.x, h.y, h.r * 2 + Math.sin(t * 5) * 6, 0, 7); c.stroke(); c.restore(); } }
        for (const m of misses) { c.save(); c.globalAlpha = 1 - m.t / .5; c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.arc(m.x, m.y, 8 + m.t * 40, 0, 7); c.stroke(); c.restore(); }
        // contador con siluetas de tucán
        c.save(); c.fillStyle = 'rgba(0,0,0,.45)'; c.beginPath(); c.roundRect ? c.roundRect(700, 8, 252, 44, 12) : c.rect(700, 8, 252, 44); c.fill();
        for (let i = 0; i < CONFIG.tucanes.count; i++) Art.blit(c, Art.toucan(), 724 + i * 48, 32, .44, false, i < found ? 1 : .25);
        c.restore();
      },
      timeUp() { Core.finish(false, 'Encontraste ' + found + ' de ' + CONFIG.tucanes.count + ' tucanes'); }
    };
  }
});
