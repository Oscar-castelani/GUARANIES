'use strict';
/* Pantalla de inicio (accesos directos), sección de Videos y sección de Recursos y enlaces. */
const Hub = (function () {
  const $ = id => document.getElementById(id);
  let toastT = null;

  function toast(msg) {
    const t = $('toast'); t.textContent = msg; t.classList.remove('hidden');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.add('hidden'), 2200);
  }

  /* ---- iconos dibujados para las tarjetas ---- */
  function playIcon(c, w, h) { c.fillStyle = 'rgba(0,0,0,.55)'; c.beginPath(); c.arc(w / 2, h / 2, 54, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(w / 2 - 16, h / 2 - 28); c.lineTo(w / 2 + 32, h / 2); c.lineTo(w / 2 - 16, h / 2 + 28); c.closePath(); c.fill(); }
  function bookIcon(c, w, h) {
    c.save(); c.translate(w / 2, h / 2 + 6);
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 62, 96, 12, 0, 0, 7); c.fill();
    [[-1, '#e8d9a8'], [1, '#f6ead0']].forEach(([s, col]) => { c.save(); c.scale(s, 1); c.fillStyle = col; c.strokeStyle = '#7a4a22'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, -44); c.quadraticCurveTo(48, -64, 92, -48); c.lineTo(92, 52); c.quadraticCurveTo(48, 36, 0, 56); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = 'rgba(90,60,30,.35)'; c.lineWidth = 2; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(14, -30 + i * 16); c.quadraticCurveTo(48, -42 + i * 16, 80, -30 + i * 16); c.stroke(); } c.restore(); });
    c.restore();
  }
  function linkIcon(c, w, h) {
    c.save(); c.translate(w / 2, h / 2); c.rotate(-.7); c.lineWidth = 16; c.lineCap = 'round';
    [[-26, '#f6ead0'], [26, '#e0a54a']].forEach(([o, col]) => { c.strokeStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.roundRect ? c.roundRect(o - 46 + 3, -22 + 4, 92, 44, 22) : c.rect(o - 46, -22, 92, 44); c.stroke(); c.strokeStyle = col; c.beginPath(); c.roundRect ? c.roundRect(o - 46, -22, 92, 44, 22) : c.rect(o - 46, -22, 92, 44); c.stroke(); });
    c.restore();
  }
  const HUB = [
    { id: 'hubGames', title: 'Juegos', blurb: 'Seis minijuegos para jugar.', go: () => Core.showMenu(),
      thumb(c, w, h) { c.drawImage(Art.huntBG(), 0, 150, 960, 330, 0, 0, w, h); Art.drawAnimal(c, 'venado', w * .68, h * .9, 1.25, true, 0, 1); Art.blit(c, Art.toucan(), w * .3, h * .5, 1.5, false); } },
    { id: 'hubVideos', title: 'Videos', blurb: 'Mirá videos sobre los guaraníes.', go: () => Core.showSection('videos'),
      thumb(c, w, h) { c.drawImage(Art.villageBG(), 0, 160, 960, 380, 0, 0, w, h); Art.blit(c, Art.house(false), w * .3, h * 1.0, 1.1, false, 1, 0, .5, .93); playIcon(c, w, h); } },
    { id: 'hubStory', title: 'Cuento', blurb: 'Una historia para leer y jugar.', soon: true, go: () => toast('El cuento estará muy pronto'),
      thumb(c, w, h) { c.drawImage(Art.nightBG(), 0, 60, 960, 440, 0, 0, w, h); [[.2, .3], [.78, .25], [.85, .7]].forEach((p, i) => Art.drawFirefly(c, p[0] * w, p[1] * h, 1.6, 1, i === 1)); bookIcon(c, w, h); } },
    { id: 'hubLinks', title: 'Recursos y enlaces', blurb: 'Enlaces para seguir aprendiendo.', go: () => Core.showSection('resources'),
      thumb(c, w, h) { c.drawImage(Art.fieldBG(), 0, 120, 960, 420, 0, 0, w, h); linkIcon(c, w, h); } }
  ];

  function buildHub() {
    const box = $('hubCards'); box.style.setProperty('--n', HUB.length);
    HUB.forEach(it => {
      const b = document.createElement('button'); b.className = 'card' + (it.soon ? ' soon' : ''); b.id = it.id;
      const cv = document.createElement('canvas'); cv.width = 440; cv.height = 280; it.thumb(cv.getContext('2d'), 440, 280); b.appendChild(cv);
      const t = document.createElement('div'); t.className = 't'; t.innerHTML = '<b></b><span></span>';
      t.firstChild.textContent = it.title; t.lastChild.textContent = it.blurb;
      if (it.soon) { const g = document.createElement('i'); g.className = 'badge'; g.style.fontStyle = 'normal'; g.textContent = 'Próximamente'; t.firstChild.appendChild(g); }
      b.appendChild(t); b.onclick = it.go; box.appendChild(b);
    });
  }

  /* ---- videos ---- */
  const thumbUrl = id => 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
  const watchUrl = v => v.short ? 'https://www.youtube.com/shorts/' + v.id : 'https://www.youtube.com/watch?v=' + v.id;
  function openVideo(v) {
    const f = $('vframe'); f.className = v.short ? 'short' : '';
    f.innerHTML = '';
    const i = document.createElement('iframe');
    i.src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0&playsinline=1';
    i.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; i.allowFullscreen = true; i.title = v.title; i.referrerPolicy = 'strict-origin-when-cross-origin';
    f.appendChild(i); $('vopen').href = watchUrl(v); $('vmodal').classList.remove('hidden');
  }
  function closeVideo() { $('vmodal').classList.add('hidden'); $('vframe').innerHTML = ''; }
  function buildVideos() {
    const box = $('videoCards'); box.style.setProperty('--n', VIDEOS.length);
    VIDEOS.forEach(v => {
      const b = document.createElement('button'); b.className = 'card vcard'; b.setAttribute('aria-label', 'Ver ' + v.title);
      const th = document.createElement('div'); th.className = 'th';
      const img = document.createElement('img'); img.alt = ''; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer'; img.src = thumbUrl(v.id); img.onerror = () => img.remove();
      th.appendChild(img); const pl = document.createElement('span'); pl.className = 'play'; th.appendChild(pl); b.appendChild(th);
      const t = document.createElement('div'); t.className = 't'; t.innerHTML = '<b></b><span></span>'; t.firstChild.textContent = v.title; t.lastChild.textContent = v.kind + ' · YouTube';
      b.appendChild(t); b.onclick = () => openVideo(v); box.appendChild(b);
    });
  }

  /* ---- recursos y enlaces ---- */
  function buildLinks() {
    const box = $('linkList');
    VIDEOS.forEach(v => { const a = document.createElement('a'); a.href = watchUrl(v); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.innerHTML = '<b></b><small></small>'; a.firstChild.textContent = v.title + ' (' + v.kind + ')'; a.lastChild.textContent = watchUrl(v); box.appendChild(a); });
    const p = document.createElement('p'); p.textContent = 'Más recursos muy pronto.'; box.appendChild(p);
  }

  function init() {
    buildHub(); buildVideos(); buildLinks();
    document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => Core.showSection(b.dataset.go));
    $('vclose').onclick = closeVideo; $('vmodal').addEventListener('pointerdown', e => { if (e.target === $('vmodal')) closeVideo(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo(); });
  }
  return { init, toast };
})();
