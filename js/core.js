'use strict';
/* Base compartida: pantallas, temporizador, puntaje, entrada (Pointer Events), audio, escalado. */
const Core = (function () {
  const W = 960, H = 540;
  const games = {}, order = [];
  let canvas, ctx, k = 1;
  let cur = null, inst = null, state = 'menu'; // menu | intro | play | ending | end | pause
  let score = 0, timeLeft = 0, goalMax = 0, goalVal = 0;
  let muted = false, aCtx = null, last = 0, floats = [], endTimer = null;
  const $ = id => document.getElementById(id);

  function register(def) { games[def.id] = def; order.push(def.id); }

  /* ---------- audio ---------- */
  function ensureAudio() {
    if (aCtx || muted) return;
    try { aCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { aCtx = null; }
    if (aCtx && aCtx.state === 'suspended') aCtx.resume();
  }
  function tone(f, d, type, vol, slide, delay) {
    if (muted || !aCtx) return;
    try {
      const t = aCtx.currentTime + (delay || 0), o = aCtx.createOscillator(), g = aCtx.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f * slide), t + d);
      g.gain.setValueAtTime(vol || .12, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g); g.connect(aCtx.destination); o.start(t); o.stop(t + d + .02);
    } catch (e) {}
  }
  const SFX = {
    shoot: () => tone(520, .18, 'triangle', .1, .35),
    hit: () => { tone(660, .12, 'triangle', .13); tone(990, .16, 'triangle', .11, 1, .08); },
    miss: () => tone(180, .16, 'sine', .08, .6),
    wrong: () => tone(200, .22, 'square', .06, .6),
    pick: () => tone(740, .08, 'sine', .08),
    splash: () => tone(900, .3, 'sawtooth', .035, .25),
    hiss: () => tone(1800, .35, 'sawtooth', .02, .5),
    win: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, .22, 'triangle', .12, 1, i * .11)),
    lose: () => [392, 330, 262].forEach((f, i) => tone(f, .26, 'triangle', .1, 1, i * .15))
  };
  function sfx(n) { if (SFX[n]) SFX[n](); }
  function setMuted(m) {
    muted = m;
    try { localStorage.setItem('ag_muted', m ? '1' : '0'); } catch (e) {}
    $('muteBtn').textContent = m ? 'Sin sonido' : 'Sonido';
    $('muteBtn').setAttribute('aria-pressed', m);
    $('muteMenu').textContent = 'Sonido: ' + (m ? 'no' : 'sí');
    $('muteMenu').setAttribute('aria-pressed', m);
    if (!m) ensureAudio();
  }

  /* ---------- HUD / puntaje ---------- */
  function addScore(n) { score = Math.max(0, score + n); $('scoreVal').textContent = score; }
  function setGoal(v, max, label) {
    goalVal = v; if (max != null) goalMax = max; if (label) $('goalLbl').textContent = label;
    $('goalVal').textContent = goalVal + '/' + goalMax;
  }
  function float(x, y, text, color) { floats.push({ x, y, text, color: color || '#fff', t: 0 }); }

  /* ---------- flujo ---------- */
  function showMenu() {
    state = 'menu'; inst = null; cur = null;
    if (endTimer) clearTimeout(endTimer);
    $('overlay').classList.add('hidden');
    $('gameScreen').classList.add('hidden'); $('menu').classList.remove('hidden');
  }
  function openGame(id) {
    ensureAudio();
    cur = games[id]; score = 0; floats = [];
    if (endTimer) clearTimeout(endTimer);
    $('menu').classList.add('hidden'); $('gameScreen').classList.remove('hidden');
    resize();
    inst = cur.make(); timeLeft = cur.time;
    $('scoreVal').textContent = '0'; goalMax = cur.goal; setGoal(0, cur.goal, cur.goalLabel);
    inst.reset(); updateTime();
    state = 'intro';
    showOverlay({ title: cur.title, text: cur.how, edu: '', b1: 'Jugar', f1: startPlay, b2: 'Menú', f2: showMenu, thumb: true });
  }
  function startPlay() {
    ensureAudio(); hideOverlay();
    score = 0; floats = []; timeLeft = cur.time; $('scoreVal').textContent = '0'; setGoal(0, goalMax);
    inst.reset(); if (inst.start) inst.start();
    state = 'play';
  }
  function retry() { state = 'intro'; startPlay(); }
  function finish(win, text) {
    if (state !== 'play') return;
    state = 'ending'; sfx(win ? 'win' : 'lose');
    endTimer = setTimeout(() => {
      if (state !== 'ending') return;
      state = 'end';
      showOverlay({
        title: win ? '¡Muy bien!' : '¡Se acabó el tiempo!',
        text: text + ' · Puntos: ' + score,
        edu: CONFIG.SHOW_EDU ? EDU[cur.id] : '',
        b1: 'Volver a jugar', f1: retry, b2: 'Menú', f2: showMenu, thumb: false
      });
    }, 900);
  }
  function showOverlay(o) {
    $('ovTitle').textContent = o.title; $('ovText').textContent = o.text; $('ovEdu').textContent = o.edu || '';
    $('ovBtn1').textContent = o.b1; $('ovBtn1').onclick = o.f1;
    $('ovBtn2').textContent = o.b2; $('ovBtn2').onclick = o.f2;
    const t = $('ovThumb'); t.style.display = o.thumb ? '' : 'none';
    if (o.thumb) { const c = t.getContext('2d'); c.clearRect(0, 0, t.width, t.height); cur.thumb(c, t.width, t.height); }
    $('overlay').classList.remove('hidden'); $('ovBtn1').focus({ preventScroll: true });
  }
  function hideOverlay() { $('overlay').classList.add('hidden'); }
  function updateTime() {
    const t = Math.max(0, timeLeft);
    $('timeVal').textContent = Math.ceil(t);
    $('timeBar').style.transform = 'scaleX(' + (cur ? t / cur.time : 1) + ')';
  }

  /* ---------- entrada ---------- */
  function toGame(e) {
    const r = canvas.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H];
  }
  function bindInput() {
    canvas.addEventListener('pointerdown', e => {
      if (!e.isPrimary || state !== 'play') return;
      e.preventDefault(); try { canvas.setPointerCapture(e.pointerId); } catch (x) {}
      const p = toGame(e); inst.down && inst.down(p[0], p[1], e.pointerType);
    });
    canvas.addEventListener('pointermove', e => {
      if (!e.isPrimary || !inst) return;
      const p = toGame(e); if (state === 'play' || state === 'intro') inst.move && inst.move(p[0], p[1], e.pointerType);
    });
    const up = e => { if (!e.isPrimary || state !== 'play') return; const p = toGame(e); inst.up && inst.up(p[0], p[1], e.type === 'pointercancel'); };
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('contextmenu', e => e.preventDefault());
  }

  /* ---------- tamaño ---------- */
  function resize() {
    if (!canvas) return;
    const st = $('stage'), aw = st.clientWidth - 8, ah = st.clientHeight - 8;
    if (aw <= 0 || ah <= 0) return;
    const cw = Math.min(aw, ah * W / H), ch = cw * H / W;
    canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bw = Math.round(cw * dpr);
    if (canvas.width !== bw) { canvas.width = bw; canvas.height = Math.round(bw * H / W); }
    k = canvas.width / W;
    checkOrient();
  }

  /* ---------- aviso de girar el celular ---------- */
  let rotSkipped = false;
  function pauseGame() {
    if (state !== 'play') return;
    state = 'pause';
    showOverlay({ title: 'Pausa', text: 'El juego quedó en pausa.', edu: '', b1: 'Continuar', f1: () => { hideOverlay(); state = 'play'; }, b2: 'Menú', f2: showMenu, thumb: false });
  }
  function checkOrient() {
    const portrait = window.innerHeight > window.innerWidth, phone = Math.min(window.innerWidth, window.innerHeight) < 700;
    if (!portrait) rotSkipped = false;
    const show = portrait && phone && !rotSkipped;
    $('rotate').classList.toggle('hidden', !show);
    if (show) pauseGame();
  }

  /* ---------- bucle ---------- */
  function loop(ts) {
    requestAnimationFrame(loop);
    const dt = Math.min(.05, (ts - last) / 1000 || 0); last = ts;
    if (!cur || !inst) return;
    if (state === 'play') {
      timeLeft -= dt; updateTime();
      inst.update(dt);
      if (timeLeft <= 0 && state === 'play') { timeLeft = 0; updateTime(); inst.timeUp(); }
    } else if (state === 'ending') inst.update(dt);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    inst.draw(ctx);
    floats = floats.filter(f => (f.t += dt) < 1.1);
    for (const f of floats) {
      ctx.globalAlpha = Math.min(1, 2.2 - f.t * 2); ctx.font = 'bold 26px Georgia,serif'; ctx.textAlign = 'center';
      ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(30,20,10,.85)'; ctx.strokeText(f.text, f.x, f.y - f.t * 46);
      ctx.fillStyle = f.color; ctx.fillText(f.text, f.x, f.y - f.t * 46);
    }
    ctx.globalAlpha = 1;
  }

  function buildMenu() {
    const box = $('cards');
    order.forEach(id => {
      const g = games[id], b = document.createElement('button'); b.className = 'card';
      const c = document.createElement('canvas'); c.width = 440; c.height = 280; g.thumb(c.getContext('2d'), 440, 280);
      b.appendChild(c);
      const t = document.createElement('div'); t.className = 't'; t.innerHTML = '<b></b><span></span>';
      t.firstChild.textContent = g.title; t.lastChild.textContent = g.blurb; b.appendChild(t);
      b.onclick = () => openGame(id); box.appendChild(b);
    });
  }

  function init() {
    canvas = $('c'); ctx = canvas.getContext('2d');
    try { muted = localStorage.getItem('ag_muted') === '1'; } catch (e) {}
    buildMenu(); bindInput(); setMuted(muted);
    $('backBtn').onclick = showMenu;
    $('muteBtn').onclick = () => setMuted(!muted); $('muteMenu').onclick = () => setMuted(!muted);
    window.addEventListener('resize', resize); window.addEventListener('orientationchange', () => setTimeout(resize, 250));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseGame();
    });
    $('rotSkip').onclick = () => { rotSkipped = true; checkOrient(); };
    checkOrient();
    requestAnimationFrame(loop);
  }

  return {
    W, H, register, init, addScore, setGoal, float, finish, sfx,
    get score() { return score; }, get state() { return state; },
    get timeLeft() { return timeLeft; }, get timeTotal() { return cur ? cur.time : 0; }
  };
})();
