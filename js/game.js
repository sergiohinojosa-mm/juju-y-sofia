// Juju y Sofía — lógica del juego. Versión de prueba: paradas 1 a 3.
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('stage');
  const sceneEl = document.getElementById('scene');
  const hud = document.getElementById('hud');

  // ---------- Paradas ----------
  // Coordenadas en el escenario de 1600x900. Las posiciones son de los pies de cada figura.
  const LEVELS = [
    {
      id: 'rana', name: 'Ranitas de ojos rojos', sound: 'frog', clue: 'gotas',
      mom: { x: 1380, y: 565, s: 1.1 }, baby: { x: 980, y: 745, s: .6 },
      clues: [{ x: 300, y: 520 }, { x: 600, y: 640 }, { x: 1150, y: 600 }],
      ask: [{ t: '¿Han visto a mi ranita? ¡Croac!', pitch: .8, who: 'rana' }, 'Mamá rana está preocupada. Busca a su bebé. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una gotita azul!', '¡Dos gotitas azules!', '¡Tres gotitas azules! ¿Quién estará aquí?'],
      found: ['¡Ahí está la ranita!', 'Está asustadita. Tócala suavecito.'],
      task: 'Su charquito se secó con el sol. Toca las nubes grises para que llueva.',
      praise: '¡Ayudaste a la ranita a llegar con su mamá!',
      quiz: { q: '¿De qué color son los ojos de la ranita?', right: { color: '#ff2b2b' }, wrong: { color: '#3b6fd6' }, yes: '¡Sí! Son rojos, ¡como una fresa!', show: 'Mira, son rojos. Toca el rojo.' },
      fact: 'Los bebés rana nacen como renacuajos y viven en el agua. ¡Luego les salen patitas!',
      facts: [
        'Los bebés rana nacen como renacuajos y viven en el agua. ¡Luego les salen patitas!',
        'Los huevitos están en una hoja sobre el agua. Al nacer, ¡plop!, caen al agua.',
        'La ranita tiene ventosas en los dedos para pegarse a las hojas.',
      ],
      gift: '¡Mamá rana te regaló una hoja verde para la balsa!',
      bye: '¡Adiós, ranita! ¡Cuida a tu mamá!',
      bg: () => Art.jungle(600) + Art.sun(1440, 120) +
        `<path d="M1380,900 C1380,760 1390,660 1380,590" stroke="#2e7d32" stroke-width="16" fill="none"/>
         <ellipse cx="1380" cy="580" rx="160" ry="36" fill="#43a047"/><ellipse cx="1360" cy="572" rx="120" ry="20" fill="#66bb6a"/>
         <ellipse cx="980" cy="752" rx="275" ry="74" fill="#8d6e4f"/><ellipse cx="980" cy="756" rx="245" ry="58" fill="#a1846a"/>
         <path d="M860,746 l30,10 l-10,18 M1050,740 l-25,15 l20,14 M970,774 l15,-12" stroke="#6d4c33" stroke-width="4" fill="none"/>`,
      setup: setupFrog,
    },
    {
      id: 'tucan', name: 'Tucanes', sound: 'toucan', clue: 'plumas',
      mom: { x: 1010, y: 335, s: .95 }, baby: { x: 760, y: 690, s: .5 },
      clues: [{ x: 280, y: 560 }, { x: 560, y: 420 }, { x: 1440, y: 520 }],
      ask: [{ t: '¡Mi tucancito se cayó del nido!', pitch: .85, who: 'tucan' }, 'Mamá tucán está preocupada. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una plumita amarilla!', '¡Dos plumitas!', '¡Tres plumitas! ¿Dónde está el tucancito?'],
      found: ['¡Ahí está el tucancito!', 'Está asustadito. Tócalo suavecito.'],
      task: 'Todavía no sabe volar. Toca la flor que brilla para hacerle una escalera.',
      praise: '¡Ayudaste al tucancito a subir con su mamá!',
      quiz: { q: '¿De qué color es el pico del tucán?', right: { color: '#ff9800' }, wrong: { color: '#43a047' }, yes: '¡Sí! Es naranja, ¡como una naranja!', show: 'Mira, es naranja. Toca el naranja.' },
      fact: 'Los tucancitos nacen sin plumas y con los ojitos cerrados.',
      facts: [
        'Los tucancitos nacen sin plumas y con los ojitos cerrados.',
        'Viven en un hoyito dentro de un árbol. Mamá y papá les llevan fruta.',
        'El pico del tucán es enorme pero ligero. ¡Le sirve para refrescarse!',
      ],
      gift: '¡Mamá tucán te regaló una pluma naranja para la balsa!',
      bye: '¡Adiós, tucancito! ¡Cuida a tu mamá!',
      bg: () => Art.jungle(700) +
        `<rect x="1150" y="0" width="140" height="900" fill="#7b4a2a"/><rect x="1180" y="0" width="20" height="900" fill="#8d5a34"/>
         <ellipse cx="1220" cy="250" rx="40" ry="52" fill="#3e2415"/>
         <path d="M1160,340 L930,330" stroke="#7b4a2a" stroke-width="26" stroke-linecap="round"/>
         <path d="M1160,700 L660,700" stroke="#7b4a2a" stroke-width="26" stroke-linecap="round"/>
         <circle cx="1220" cy="40" r="140" fill="#2e7d32"/><circle cx="1080" cy="60" r="100" fill="#43a047"/><circle cx="1380" cy="70" r="110" fill="#43a047"/>`,
      setup: setupToucan,
    },
    {
      id: 'perezoso', name: 'Perezosos', sound: 'sloth', clue: 'ramitas',
      mom: { x: 1150, y: 252, s: .85 }, baby: { x: 620, y: 712, s: .5 },
      clues: [{ x: 320, y: 560 }, { x: 900, y: 620 }, { x: 1470, y: 540 }],
      ask: [{ t: '¿Han visto a mi bebecito? Se separó de mi pancita.', pitch: .75, who: 'perezoso' }, 'Mamá perezoso está preocupada. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una ramita café!', '¡Dos ramitas cafés!', '¡Tres ramitas! ¿Quién se esconde aquí?'],
      found: ['¡Ahí está el bebé perezoso!', 'Cayó suavecito en las hojas, pero está asustadito. Tócalo suavecito.'],
      task: 'Toca la liana que brilla para hacerle una escalera.',
      praise: '¡Ayudaste al perezosito a subir con su mamá!',
      quiz: { q: '¿Quién es más lento?', right: { animal: 'perezoso' }, wrong: { emoji: '🐇' }, yes: '¡Sí! El perezoso es lentísimo. ¡Y el conejo es rapidísimo!', show: 'Mira, el perezoso es el más lento. Tócalo.' },
      fact: 'El bebé perezoso viaja agarrado a la pancita de su mamá por muchos meses.',
      facts: [
        'El bebé perezoso viaja agarrado a la pancita de su mamá por muchos meses.',
        'En su pelo crecen algas verdes que lo ayudan a esconderse.',
        'Se mueve lento en los árboles, ¡pero nada muy bien!',
      ],
      gift: '¡Mamá perezoso te regaló una flor rosa para la balsa!',
      bye: '¡Adiós, perezosito! ¡Cuida a tu mamá!',
      bg: () => Art.jungle(680) +
        `<rect x="1250" y="120" width="100" height="780" fill="#7b4a2a"/>
         <path d="M1260,262 C1000,270 760,262 540,268" stroke="#7b4a2a" stroke-width="30" stroke-linecap="round" fill="none"/>
         <circle cx="1300" cy="120" r="130" fill="#2e7d32"/><circle cx="1170" cy="150" r="90" fill="#43a047"/><circle cx="1430" cy="150" r="95" fill="#43a047"/>
         ${Art.bush(620, 740, 1, '#7cb342')}`,
      setup: setupSloth,
    },
    // Paradas que vienen en la siguiente versión
    { id: 'mono', soon: true }, { id: 'guacamaya', soon: true }, { id: 'tapir', soon: true },
    { id: 'jaguar', soon: true }, { id: 'leon', soon: true },
  ];
  // Las paradas 4 a 8 viven en js/levels2.js (window.MORE_LEVELS) y reemplazan a las de "pronto".
  (window.MORE_LEVELS || []).forEach(m => { const k = LEVELS.findIndex(L => L.id === m.id); if (k >= 0) LEVELS[k] = m; });
  const PLAYABLE = LEVELS.filter(L => !L.soon).length;
  const PLAYABLE_IDS = LEVELS.filter(L => !L.soon).map(L => L.id);

  // ---------- Guardado (si falla, el juego sigue igual) ----------
  // Perfiles: cada niña tiene su propio avance y su álbum; el personaje siempre es Juju.
  const PROFILES_KEY = 'jujuSofia.perfiles', CURRENT_KEY = 'jujuSofia.actual';
  // ?reset=todo borra el avance de todas las jugadoras (para empezar pruebas desde cero).
  if (/[?&]reset=todo(&|$)/.test(location.search)) {
    try { Object.keys(localStorage).filter(k => k.startsWith('jujuSofia')).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }
  const PROFILE_COLORS = ['#ff5fa2', '#7e57c2', '#26a69a', '#ff9800', '#42a5f5', '#ef5350'];
  const readKey = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const writeKey = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  // Perfiles válidos: id sencillo y sin repetir, y nombre que no esté vacío.
  let profiles = readKey(PROFILES_KEY);
  profiles = Array.isArray(profiles) ? profiles.filter((p, k, all) => p && typeof p.id === 'string' && /^[\w-]{1,40}$/.test(p.id) &&
    typeof p.name === 'string' && p.name.trim() && all.findIndex(q => q && q.id === p.id) === k) : [];
  if (!profiles.length) profiles = [{ id: 'juju', name: 'Juju' }, { id: 'luciana', name: 'Luciana' }];
  // Primera letra del nombre (completa aunque sea un emoji).
  const initial = (name) => (Array.from(name.trim())[0] || '?').toUpperCase();
  let current = readKey(CURRENT_KEY);
  if (!profiles.some(p => p.id === current)) current = profiles[0].id;
  // Juju conserva la llave original para no perder lo que ya jugó.
  const saveKey = (id) => (id === 'juju' ? 'jujuSofia.v1' : 'jujuSofia.v1.' + id);
  const profile = () => profiles.find(p => p.id === current);
  const profileColor = (p) => PROFILE_COLORS[profiles.indexOf(p) % PROFILE_COLORS.length];
  const fresh = () => ({ rescued: [], fruits: 0, music: true, introDone: false, finaleDone: false });
  // ?reset=1 borra una sola vez y se quita de la dirección, para que recargar no vuelva a borrar.
  if (/[?&]reset=1(&|$)/.test(location.search)) {
    try { localStorage.removeItem(saveKey(current)); } catch (e) {}
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }
  const ALL_IDS = LEVELS.map(L => L.id);
  const state = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(saveKey(current)));
      if (s && Array.isArray(s.rescued)) {
        // Se conservan todas las paradas conocidas (aunque una no cargue) y se limpian valores raros.
        return {
          rescued: [...new Set(s.rescued)].filter(id => ALL_IDS.includes(id)),
          fruits: Number.isFinite(s.fruits) ? Math.min(999, Math.max(0, Math.floor(s.fruits))) : 0,
          music: s.music !== false,
          introDone: s.introDone === true,
          finaleDone: s.finaleDone === true,
        };
      }
    } catch (e) {}
    return fresh();
  }
  // Si el juego está abierto en dos pestañas, se juntan los avances en lugar de que una borre a la otra.
  function save() {
    const disk = readKey(saveKey(current));
    if (disk && Array.isArray(disk.rescued)) {
      disk.rescued.forEach(id => { if (ALL_IDS.includes(id) && !state.rescued.includes(id)) state.rescued.push(id); });
      if (Number.isFinite(disk.fruits) && disk.fruits > state.fruits) state.fruits = Math.min(999, Math.max(0, Math.floor(disk.fruits)));
    }
    writeKey(saveKey(current), state);
  }
  // Si en otra pestaña se reinicia este perfil, esta también empieza de cero (y no lo vuelve a escribir).
  window.addEventListener('storage', (e) => {
    if ((e.key === saveKey(current) || e.key === null) && e.newValue === null) { useProfile(current); go(cover); }
  });
  function useProfile(id) {
    current = id;
    writeKey(CURRENT_KEY, id);
    const s = load();
    Object.keys(state).forEach(k => delete state[k]);
    Object.assign(state, s);
    Sound.setMusic(state.music);
  }
  function addProfile(name) {
    const id = 'p' + Date.now().toString(36);
    profiles.push({ id, name });
    writeKey(PROFILES_KEY, profiles);
    return id;
  }
  // Borra solo el avance y el álbum del perfil actual.
  function resetProfile() {
    try { localStorage.removeItem(saveKey(current)); } catch (e) {}
    useProfile(current);
  }
  const isRescued = (id) => state.rescued.includes(id);
  const nextLevel = () => { const i = LEVELS.findIndex(L => !L.soon && !isRescued(L.id)); return i < 0 ? null : i; };
  // Premios de frutas para Juju: 1 = capa de reina, 2 = capa y varita mágica.
  const accessory = () => (state.fruits >= 10 ? 2 : state.fruits >= 5 ? 1 : 0);

  // ---------- Utilidades ----------
  let token = 0, cleanup = [];
  const $ = (sel) => sceneEl.querySelector(sel);
  const $$ = (sel) => [...sceneEl.querySelectorAll(sel)];
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function mk(tag, attrs = {}) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }

  // Cada escena nueva invalida los temporizadores y animaciones de la anterior.
  let sceneAt = 0;
  function go(fn, ...args) { token++; sceneAt = Date.now(); Voice.stop(); Hint.clear(); cleanup.forEach(f => f()); cleanup = []; fn(...args); }
  function alive() { const t = token; return () => t === token; }
  function later(fn, ms) { const ok = alive(); setTimeout(() => { if (ok()) fn(); }, ms); }
  function say(lines, onEnd) { const ok = alive(); Voice.say(lines, onEnd && (() => { if (ok()) onEnd(); })); }

  // Toque o clic. Ignora toques repetidos muy seguidos para no duplicar nada.
  function onTap(el, fn) {
    if (!el) return;
    el.classList.add('tap');
    let last = 0;
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const now = Date.now();
      if (now - last < 450 || now - sceneAt < 450) return;
      last = now;
      Sound.unlock();
      Voice.unlock();
      Sound.sfx.tap();
      fn(e);
    });
  }
  function svgPoint(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
  function wrap(text, max) {
    const lines = []; let cur = '';
    for (const w of text.split(' ')) {
      if (cur && (cur + ' ' + w).length > max) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function restart(el, cls) { el.classList.remove(cls); el.getBoundingClientRect(); el.classList.add(cls); }

  // Posición y animación de figuras (atributo transform = posición; nunca lleva clase animada).
  function place(el, p) { el._pos = Object.assign({ s: 1 }, p); el.setAttribute('transform', `translate(${p.x},${p.y}) scale(${p.s ?? 1})`); }
  function moveTo(el, to, ms, hop = 0, cb) {
    const from = el._pos, ok = alive(), t0 = performance.now();
    const target = Object.assign({}, from, to);
    const step = (now) => {
      if (!ok()) return;
      const u = Math.min(1, (now - t0) / ms);
      const e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const x = from.x + (target.x - from.x) * e;
      const y = from.y + (target.y - from.y) * e - Math.sin(Math.PI * u) * hop;
      const s = from.s + (target.s - from.s) * e;
      el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s.toFixed(3)})`);
      if (u < 1) requestAnimationFrame(step);
      else { el._pos = target; if (cb) cb(); }
    };
    requestAnimationFrame(step);
  }

  // ---------- Globo de Sofía ----------
  let bubblePos = 'bottom', hideTimer = null;
  function showBubble(text, who) {
    const lines = wrap(text, 38), lh = 42, padX = 28, padY = 20;
    const w = Math.min(1100, Math.max(...lines.map(l => l.length)) * 17 + padX * 2);
    const h = lines.length * lh + padY * 2;
    const top = bubblePos === 'top';
    const px = 92, py = top ? 210 : 808, bx = 168, by = top ? 160 : 866 - h;
    hud.innerHTML = `<g class="bubble-in">
      <path d="M${bx + 6},${py - 18} L${bx - 26},${py} L${bx + 6},${py + 18} Z" fill="#fff" stroke="#66bb6a" stroke-width="5" stroke-linejoin="round" filter="url(#shadow)"/>
      <rect x="${bx}" y="${by}" width="${w}" height="${h}" rx="28" fill="#fff" stroke="#66bb6a" stroke-width="5" filter="url(#shadow)"/>
      <rect x="${bx + 3}" y="${by + 3}" width="${w - 6}" height="${Math.min(26, h / 3)}" rx="22" fill="#e8f7e9" opacity=".8"/>
      <text x="${bx + padX}" y="${by + padY + 30}" font-size="32" font-weight="600" fill="#2d3b2d">${lines.map((l, i) => `<tspan x="${bx + padX}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join('')}</text>
      <g transform="translate(${px},${py})"><circle r="62" fill="${who ? '#fff3c4' : '#c8e6c9'}" stroke="#fff" stroke-width="6" filter="url(#shadow)"/><circle r="56" fill="url(#shine)"/>
        <g clip-path="url(#portraitClip)">${who ? Art.thumb(who, 96) : `<g transform="translate(0,128) scale(.62)">${Art.sofia()}</g>`}</g></g></g>`;
  }
  Voice.onLine = (text, line) => { clearTimeout(hideTimer); showBubble(text, line && line.who); };
  Voice.onDone = () => { clearTimeout(hideTimer); hideTimer = setTimeout(() => { hud.innerHTML = ''; }, 1500); Hint.restart(); };

  // ---------- Pistas en 3 pasos: voz + brillo a los 9 s, manita a los ~20 s ----------
  const portrait = () => matchMedia('(orientation: portrait) and (max-width: 900px) and (pointer: coarse)').matches;
  const Hint = {
    timer: null, target: null, level: 0,
    set(fn) { this.target = fn; this.reset(); },
    clear() { this.target = null; clearTimeout(this.timer); this.remove(); },
    reset() { this.level = 0; this.restart(); this.remove(); },
    restart() { clearTimeout(this.timer); if (this.target) this.timer = setTimeout(() => this.fire(), 9000); },
    fire() {
      if (!this.target) return;
      if (Voice.speaking || portrait() || document.hidden) { this.timer = setTimeout(() => this.fire(), 2000); return; }
      const t = this.target();
      // Después de tres avisos con la manita ya no insiste.
      if (!t || this.level >= 4) return;
      this.remove();
      this.level++;
      const g = mk('g', { id: 'sparkle', 'pointer-events': 'none' });
      let s = [[0, -80], [70, -20], [-70, -10], [40, 60], [-45, 60]].map(([dx, dy], k) =>
        `<g transform="translate(${t.x + dx},${t.y + dy})"><path class="sparkle" style="animation-delay:${k * .15}s" d="M0,-24 L7,-7 L24,0 L7,7 L0,24 L-7,7 L-24,0 L-7,-7 Z" fill="#fff59d" stroke="#ffb300" stroke-width="3"/></g>`).join('');
      if (this.level >= 2) s += `<g transform="translate(${t.x + 20},${t.y + 40})"><g class="pulse"><text font-size="100">👆</text></g></g>`;
      g.innerHTML = s;
      sceneEl.appendChild(g);
      Sound.sfx.sparkle();
      say(this.level >= 2 ? '¡Aquí, Juju! Toca aquí.' : (t.say || 'Mira, ahí se movió algo…'));
    },
    remove() { const s = document.getElementById('sparkle'); if (s) s.remove(); },
  };
  svg.addEventListener('pointerdown', (e) => {
    if (Hint.target) Hint.reset();
    const p = svgPoint(e);
    const r = mk('circle', { cx: p.x, cy: p.y, r: 40, fill: 'none', stroke: '#fff', 'stroke-width': 8, class: 'ripple' });
    sceneEl.appendChild(r);
    setTimeout(() => r.remove(), 550);
  });

  // ---------- Efectos ----------
  function flash() { const r = mk('rect', { x: -400, y: -200, width: 2400, height: 1300, fill: '#fff', class: 'flash' }); sceneEl.appendChild(r); setTimeout(() => r.remove(), 500); }
  function confetti() {
    const g = mk('g', { 'pointer-events': 'none' });
    const colors = ['#ff5fa2', '#ffd23f', '#66bb6a', '#4fc3f7', '#ff8a65', '#ba68c8'];
    let s = '';
    for (let i = 0; i < 40; i++) {
      const dx = Math.round(Math.random() * 300 - 150);
      s += `<g transform="translate(${Math.round(Math.random() * 1600)},-40)"><rect class="confetti" style="--dx:${dx}px;animation-delay:${(Math.random() * .6).toFixed(2)}s" width="18" height="26" rx="4" fill="${colors[i % 6]}"/></g>`;
    }
    g.innerHTML = s;
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 3300);
  }
  function hearts(x, y) {
    const g = mk('g', { 'pointer-events': 'none' });
    g.innerHTML = [-90, -30, 30, 90, 0].map((dx, k) => `<g transform="translate(${x + dx},${y - 40 - (k % 2) * 30})"><path class="heart-up" style="animation-delay:${k * .18}s" d="M0,12 C-30,-10 -20,-36 0,-22 C20,-36 30,-10 0,12 Z" fill="#ff5fa2"/></g>`).join('');
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 2800);
  }

  // Número grande que aparece donde tocó Juju, mientras Sofía cuenta.
  const NUM = ['', 'Una', 'Dos', 'Tres', 'Cuatro', 'Cinco'];
  const NUM_M = ['', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco'];
  function countPop(n, x, y) {
    const g = mk('g', { 'pointer-events': 'none', transform: `translate(${x},${y})` });
    g.innerHTML = `<text class="num-pop" text-anchor="middle" font-size="150" font-weight="700" fill="#ffd23f" stroke="#5d4037" stroke-width="14" paint-order="stroke">${n}</text>`;
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 1200);
  }

  // ---------- Botones ----------
  const ICONS = {
    home: '<path d="M-30,4 L0,-26 L30,4 L22,4 L22,28 L-22,28 L-22,4 Z" fill="#fff"/>',
    album: '<path d="M-32,-24 Q-16,-32 0,-22 Q16,-32 32,-24 L32,28 Q16,20 0,30 Q-16,20 -32,28 Z" fill="#fff"/><path d="M0,-22 L0,30" stroke="#ff5fa2" stroke-width="4"/>',
    music: '<path d="M-8,18 L-8,-26 L24,-34 L24,10" stroke="#fff" stroke-width="7" fill="none" stroke-linejoin="round"/><ellipse cx="-16" cy="20" rx="12" ry="9" fill="#fff"/><ellipse cx="16" cy="12" rx="12" ry="9" fill="#fff"/>',
    up: '<path d="M0,-28 L30,18 L-30,18 Z" fill="#fff"/>',
    down: '<path d="M0,28 L30,-18 L-30,-18 Z" fill="#fff"/>',
    close: '<path d="M-20,-20 L20,20 M20,-20 L-20,20" stroke="#fff" stroke-width="10" stroke-linecap="round"/>',
    camera: '<rect x="-40" y="-24" width="80" height="54" rx="12" fill="#fff"/><rect x="-16" y="-36" width="32" height="16" rx="5" fill="#fff"/><circle cx="0" cy="3" r="18" fill="#ff5fa2"/><circle cx="0" cy="3" r="9" fill="#ffd6e9"/>',
  };
  ICONS.mute = ICONS.music + '<path d="M-34,-34 L34,34" stroke="#ff5252" stroke-width="8" stroke-linecap="round"/>';
  const emojiIcon = (e, size = 60) => `<text y="${size * .35}" text-anchor="middle" font-size="${size}">${e}</text>`;
  const button = (id, x, y, icon, fill = '#66bb6a', r = 54, cls = '') =>
    `<g id="${id}" transform="translate(${x},${y})"><g class="${cls}"><circle r="${r}" fill="${fill}" stroke="#fff" stroke-width="6" filter="url(#shadow)"/><circle r="${r - 3}" fill="url(#shade)"/><ellipse cy="${(-r * .45).toFixed(1)}" rx="${(r * .62).toFixed(1)}" ry="${(r * .32).toFixed(1)}" fill="url(#gloss)"/><g transform="scale(${(r / 54).toFixed(2)})">${ICONS[icon] || emojiIcon(icon)}</g></g></g>`;
  const musicButton = (x = 1400, y = 80) => button('musicBtn', x, y, state.music ? 'music' : 'mute', '#26a69a');
  function wireMusic() {
    onTap($('#musicBtn'), () => {
      state.music = !state.music; save();
      Sound.setMusic(state.music);
      $('#musicBtn g g').innerHTML = ICONS[state.music ? 'music' : 'mute'];
    });
  }
  const title = (x, y, txt, size) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="url(#titleG)" filter="url(#shadow)" stroke="#1b5e20" stroke-width="${Math.round(size / 6)}" paint-order="stroke" stroke-linejoin="round">${txt}</text>`;
  const raftArt = (extra = {}) => Art.raft(Object.assign({ gifts: state.rescued, accessory: accessory() }, extra));

  // Foto de Polaroid: familia + Juju + Sofía. Centrada en el origen (460x540).
  function polaroid(L) {
    return `<rect x="-230" y="-270" width="460" height="540" rx="14" fill="#fff" filter="url(#shadow)"/>
      <rect x="-200" y="-240" width="400" height="400" fill="url(#photoSky)"/><circle cx="140" cy="-190" r="90" fill="url(#sunGlow)"/>
      <path d="M-200,90 C-100,70 60,96 200,74 L200,160 L-200,160 Z" fill="url(#grass)"/>
      <rect x="-200" y="-240" width="400" height="400" fill="url(#shade)" opacity=".5"/>
      <g transform="translate(-160,150) scale(.4)">${Art.juju({ accessory: accessory() })}</g>
      <g transform="translate(165,150) scale(.4)">${Art.sofia({ cheer: true })}</g>
      <g transform="translate(0,40)">${Art.family(L.id, 230)}</g>
      <path d="M-20,-190 C-50,-215 -40,-240 -20,-226 C0,-240 10,-215 -20,-190 Z" fill="#ff5fa2"/>
      <text y="225" text-anchor="middle" font-size="34" font-weight="800" fill="#5d4037">${L.name}</text>
      <rect x="-70" y="-290" width="140" height="42" rx="6" fill="#ffd6e9" opacity=".85" transform="rotate(-4)"/>`;
  }

  // ================= ESCENAS =================

  // ---------- Portada ----------
  function cover(opts = {}) {
    bubblePos = 'bottom';
    sceneEl.innerHTML = `
      ${Art.jungle(600)}${Art.rainbow(1200, 600, 320)}
      ${Art.river(600, 300)}
      <g transform="translate(540,720)"><g class="bob">${raftArt()}</g></g>
      ${Art.foreground()}
      ${title(800, 165, 'Juju y Sofía', 150)}
      ${title(800, 250, '¡Al rescate de los bebés de la selva!', 54)}
      <g id="playBtn" transform="translate(1210,560)"><g class="pulse">
        <rect x="-190" y="-70" width="380" height="140" rx="70" fill="#ff5fa2" stroke="#fff" stroke-width="8" filter="url(#shadow)"/><rect x="-184" y="-64" width="368" height="128" rx="64" fill="url(#shade)"/><rect x="-160" y="-60" width="320" height="52" rx="26" fill="url(#gloss)"/>
        <path d="M-30,-40 L45,0 L-30,40 Z" fill="#fff"/></g></g>
      ${button('albumBtn', 1520, 80, 'album', '#ff9800')}
      ${musicButton(1400, 80)}
      <g id="whoBtn" transform="translate(90,90)"><circle r="58" fill="${profileColor(profile())}" stroke="#fff" stroke-width="6" filter="url(#shadow)"/>
        <text y="22" text-anchor="middle" font-size="64" font-weight="800" fill="#fff">${esc(initial(profile().name))}</text>
        <text y="100" text-anchor="middle" font-size="30" font-weight="800" fill="#fff" stroke="#1b5e20" stroke-width="7" paint-order="stroke">${esc(profile().name)}</text></g>
      <g id="picker"></g>`;
    onTap($('#whoBtn'), () => openPicker());
    function openPicker() {
      const canAdd = profiles.length < 5, all = profiles.length + (canAdd ? 1 : 0);
      const gap = 30, W = Math.min(300, (1500 - gap * (all - 1)) / all);
      const x0 = 800 - (all * W + (all - 1) * gap) / 2 + W / 2;
      $('#picker').innerHTML = `<rect width="1600" height="900" fill="#0b3016" opacity=".6"/>
        ${title(800, 200, '¿Quién juega?', 80)}` +
        profiles.map((p, k) => `<g class="who" data-id="${p.id}" transform="translate(${x0 + k * (W + gap)},470)">
          <rect x="${-W / 2}" y="-150" width="${W}" height="300" rx="40" fill="${profileColor(p)}" stroke="${p.id === current ? '#ffd23f' : '#fff'}" stroke-width="${p.id === current ? 14 : 6}" filter="url(#shadow)"/>
          <text y="30" text-anchor="middle" font-size="140" font-weight="800" fill="#fff">${esc(initial(p.name))}</text>
          <text y="115" text-anchor="middle" font-size="${W < 260 ? 34 : 42}" font-weight="800" fill="#fff">${esc(p.name)}</text></g>`).join('') +
        (!canAdd ? '' : `<g id="addWho" transform="translate(${x0 + profiles.length * (W + gap)},470)"><rect x="${-W / 2}" y="-150" width="${W}" height="300" rx="40" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="6" stroke-dasharray="18 12"/>
          <text y="50" text-anchor="middle" font-size="160" font-weight="800" fill="#fff">+</text></g>`);
      say('¿Quién va a jugar?');
      $$('.who').forEach(el => onTap(el, () => {
        useProfile(el.dataset.id);
        Sound.sfx.chime();
        go(cover, { greet: `¡Hola, ${profile().name}!` });
      }));
      onTap($('#addWho'), () => {
        const name = Array.from((window.prompt('¿Cómo se llama la nueva jugadora?') || '').trim()).slice(0, 14).join('');
        if (!name) return;
        useProfile(addProfile(name));
        go(cover, { greet: `¡Hola, ${name}!` });
      });
    }
    onTap($('#playBtn'), () => {
      Sound.setMusic(state.music);
      Sound.sfx.pop();
      if (!state.introDone) go(intro);
      else go(map, { hello: true });
    });
    onTap($('#albumBtn'), () => { Sound.setMusic(state.music); go(album, 'cover'); });
    wireMusic();
    if (opts.greet) say(opts.greet);
    if (opts.rest) say(['¡A descansar, Juju!', 'Ve a enseñarle tu álbum a mamá Marcela y a papá Checo.', '¡Y salta como ranita! ¡Croac, croac!']);
  }

  // ---------- Inicio de la historia: Mamá Tucán pide ayuda ----------
  function intro() {
    bubblePos = 'bottom';
    sceneEl.innerHTML = `
      ${Art.jungle(640)}${Art.rainbow(800, 640, 380)}
      <path d="M1600,300 L1150,320" stroke="#7b4a2a" stroke-width="26" stroke-linecap="round"/>
      <g transform="translate(1260,312)"><g class="fly-in">${Art.toucan('happy')}</g></g>
      <g transform="translate(430,860) scale(.9)">${Art.juju({ camera: false })}</g>
      <g transform="translate(620,860) scale(.9)">${Art.sofia()}</g>
      <g id="camGift"></g>
      ${Art.foreground()}`;
    const showCamera = () => {
      if ($('#camGift').childNodes.length) return;
      $('#camGift').innerHTML = button('camBtn', 900, 520, 'camera', '#ff5fa2', 90, 'pulse');
      Hint.set(() => ({ x: 900, y: 520, say: 'Toca la cámara, Juju.' }));
      onTap($('#camBtn'), () => {
        Sound.sfx.shutter(); flash();
        state.introDone = true; save();
        later(() => go(map, { intro: true }), 500);
      });
    };
    say([
      { t: '¡Juju! ¡Juju! La lluvia separó a los bebés de la selva. Vamos a buscar a sus mamás.', pitch: .85, who: 'tucan' },
      { t: '¿Nos ayudas a buscarlos?', pitch: .85, who: 'tucan' },
      '¡Claro que sí! Toma, Juju: tu cámara mágica. ¡Tócala!',
    ], showCamera);
    later(showCamera, 12000);
  }

  // ---------- Mapa del río ----------
  const STOPS = [[230, 640], [380, 560], [580, 690], [770, 520], [960, 640], [1130, 460], [1300, 560], [1470, 330]];
  function smoothPath(pts) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]},${p2[1]}`;
    }
    return d;
  }
  function map(opts = {}) {
    bubblePos = 'bottom';
    const next = nextLevel();
    const river = smoothPath([[-40, 820], ...STOPS, [1640, 240]]);
    const n = state.rescued.length;
    let markers = '';
    LEVELS.forEach((L, i) => {
      const [x, y] = STOPS[i];
      const done = !L.soon && isRescued(L.id), isNext = i === next, lion = i === LEVELS.length - 1;
      const ring = done ? '#66bb6a' : isNext ? '#ff5fa2' : lion ? '#ffb300' : '#b0bec5';
      const inner = done ? Art.family(L.id, 100)
        : lion ? `<text y="24" text-anchor="middle" font-size="66" opacity="${(.35 + .15 * n).toFixed(2)}">🦁</text>`
        : `<text y="26" text-anchor="middle" font-size="70" font-weight="800" fill="${isNext ? '#ff5fa2' : '#b0bec5'}">?</text>`;
      markers += `<g class="stop" data-i="${i}" transform="translate(${x},${y})"><g class="${isNext ? 'pulse' : ''}">
        <circle r="${lion ? 70 : 62}" fill="${lion ? '#fff8e1' : '#fff'}" stroke="${ring}" stroke-width="10" filter="url(#shadow)"/>${inner}<ellipse cy="${lion ? -40 : -36}" rx="${lion ? 42 : 38}" ry="16" fill="url(#gloss)" opacity=".7"/></g>
        ${done ? `<g transform="translate(46,-46)"><circle r="24" fill="#ff5fa2" stroke="#fff" stroke-width="4"/><path d="M0,10 C-18,-4 -12,-20 0,-11 C12,-20 18,-4 0,10 Z" fill="#fff"/></g>` : ''}</g>`;
    });
    // La balsa espera antes de la siguiente parada.
    // Con todas las familias reunidas, la balsa espera entre las dos últimas paradas sin tapar al león.
    const prev = next === null ? STOPS[PLAYABLE - 2] : next === 0 ? [60, 760] : STOPS[next - 1];
    const goal = next === null ? STOPS[Math.min(PLAYABLE, STOPS.length - 1)] : STOPS[next];
    const rx = (prev[0] + goal[0]) / 2, ry = (prev[1] + goal[1]) / 2 + 10;
    sceneEl.innerHTML = `
      <rect width="1600" height="900" fill="url(#grass)"/>
      ${Array.from({ length: 70 }, (_, k) => `<circle cx="${(k * 233) % 1600}" cy="${(k * 151) % 900}" r="${3 + (k % 4)}" fill="#fff" opacity=".08"/>`).join('')}
      <path d="M0,0 L420,0 C360,60 260,90 160,130 C90,160 30,150 0,170 Z" fill="#5fae6a" opacity=".6"/>
      <path d="M1180,0 C1260,250 1300,480 1600,600 L1600,0 Z" fill="#f4cf62"/>
      <path d="M1180,0 C1260,250 1300,480 1600,600 L1600,0 Z" fill="url(#groundShade)" opacity=".6"/>
      <path d="M1200,40 C1250,30 1270,70 1310,60" stroke="#e0a93a" stroke-width="5" fill="none" opacity=".5"/>
      ${[[120, 300], [300, 180], [520, 330], [700, 200], [900, 300], [1000, 140], [260, 860], [700, 860], [1100, 820], [880, 470]].map(([x, y]) => Art.tree(x, y, .3)).join('')}
      ${[[1400, 150], [1520, 470], [1330, 300]].map(([x, y]) => `<g transform="translate(${x},${y})"><rect x="-6" y="-60" width="12" height="60" fill="#8d5a2b"/><ellipse cx="0" cy="-66" rx="60" ry="18" fill="#9ccc65"/></g>`).join('')}
      <path d="${river}" stroke="#e8d39a" stroke-width="116" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="${river}" stroke="#1e88e5" stroke-width="92" fill="none" stroke-linecap="round"/>
      <path d="${river}" stroke="#5ccbff" stroke-width="64" fill="none" stroke-linecap="round"/>
      <path d="${river}" stroke="#a8e8ff" stroke-width="20" fill="none" stroke-linecap="round" opacity=".5"/>
      <path class="flow" d="${river}" stroke="#e1f5fe" stroke-width="6" fill="none" stroke-dasharray="20 30"/>
      <rect width="1600" height="900" fill="url(#vignette)" pointer-events="none"/>
      ${markers}
      <g transform="translate(${rx},${ry}) scale(${(.28 * 420 / (420 + state.rescued.length * 74)).toFixed(3)})"><g class="bob">${raftArt()}</g></g>
      ${title(800, 90, 'El río de la selva', 64)}
      ${button('homeBtn', 80, 80, 'home', '#7e57c2')}
      ${button('albumBtn', 1520, 80, 'album', '#ff9800')}
      ${musicButton(1400, 80)}
      <g id="pause"></g>`;
    onTap($('#homeBtn'), () => go(cover));
    onTap($('#albumBtn'), () => go(album, 'map'));
    wireMusic();
    $$('.stop').forEach(el => onTap(el, () => {
      const i = +el.dataset.i, L = LEVELS[i];
      if ($('#pause').childNodes.length) return;
      if (!L.soon && isRescued(L.id)) go(stop, i, { replay: true });
      else if (i === next) go(travel, i);
      else if (i === LEVELS.length - 1) say('¿Quién nos espera al final del río? ¡Muy pronto lo sabremos!');
      else if (L.soon) say('¡Esa parada viene muy pronto, Juju!');
      else say('Primero vamos a la parada que brilla.');
    }));
    const hintNext = () => next !== null && { x: STOPS[next][0], y: STOPS[next][1], say: 'Toca la parada que brilla, Juju.' };

    if (opts.after != null && next !== null) {
      // Pausa natural: ¿seguimos o descansamos?
      $('#pause').innerHTML = `<rect width="1600" height="900" fill="#0b3016" opacity=".45"/>
        ${button('goOn', 620, 500, '🛶', '#66bb6a', 130, 'pulse')}
        ${button('rest', 980, 500, '🌙', '#7e57c2', 130)}`;
      say(['¡Qué buen trabajo, Juju!', '¿Seguimos en la balsa o descansamos?']);
      Hint.set(() => ({ x: 620, y: 500, say: 'Toca la balsa para seguir, o la luna para descansar.' }));
      onTap($('#goOn'), () => go(travel, next));
      onTap($('#rest'), () => go(cover, { rest: true }));
    } else if (opts.after != null && PLAYABLE === LEVELS.length) {
      // Las 8 familias ya están juntas. Después del león: ¡la fiesta final!
      if (opts.after === LEVELS.length - 1) say(['¡Ayudaste a las ocho familias, Juju!', '¡Vamos a la fiesta!'], () => later(() => go(finale), 300));
      else say(['¡Qué bonito volver a verlos, Juju!', 'Puedes ver tu álbum o visitar otra familia.']);
    } else if (opts.after != null) {
      say(['¡Ayudaste a tres familias, Juju! Cuidaste muy bien a los bebés.', 'Ve a contarle a mamá Marcela y a papá Checo cómo nace una ranita.', 'Muy pronto el río nos llevará hasta la sabana.']);
    } else {
      const lines = [];
      if (opts.intro) lines.push('¡Ahora eres la Rescatadora Principal!');
      if (opts.hello) lines.push('¡Hola de nuevo, Juju!');
      if (next !== null) lines.push(next === 0 ? 'Toca la parada que brilla para subir a la balsa.' : 'Toca la parada que brilla, Juju.');
      else if (PLAYABLE === LEVELS.length && !state.finaleDone) {
        // Por si se cerró el juego después de la foto del león: la fiesta todavía espera.
        say([...lines, '¡Ayudaste a las ocho familias!', '¡Vamos a la fiesta!'], () => later(() => go(finale), 300));
        return;
      } else lines.push('Ya ayudaste a todas las familias. Puedes ver tu álbum o visitarlas otra vez.');
      say(lines);
      Hint.set(hintNext);
    }
  }

  // ---------- Viaje en balsa ----------
  function travel(i) {
    bubblePos = 'top';
    // La balsa crece con cada familia: se recorre a la derecha y atrapa frutas en todo su largo.
    const LANES = [500, 630, 760], RAFT_X = 370, DURATION = 32, SPEED = 420, HALF = Math.max(160, (420 + state.rescued.length * 74) * .72 / 2 * .8);
    const FRUITS = ['🍓', '🍌', '🥭', '🍊', '🍇'];
    const tile = (ox) => [80, 330, 560, 820, 1080, 1330].map(x => Art.tree(x + ox, 430, .45)).join('') + Art.bush(200 + ox, 430, .6) + Art.bush(950 + ox, 430, .6);
    const waves = Array.from({ length: 4 }, (_, r) => Array.from({ length: 10 }, (_, c) => `<path d="M${c * 200 + (r % 2) * 100},${450 + r * 100} q20,-12 40,0" stroke="#fff" stroke-width="4" fill="none" opacity=".5"/>`).join('')).join('');
    sceneEl.innerHTML = `
      <rect width="1600" height="900" fill="url(#sky)"/>
      <circle cx="1300" cy="90" r="320" fill="url(#sunGlow)"/>
      <path d="M0,330 C200,250 380,300 560,260 C760,220 940,300 1120,250 C1300,210 1460,280 1600,250 L1600,420 L0,420 Z" fill="#93cfb1"/>
      <rect y="250" width="1600" height="170" fill="url(#mist)" opacity=".6"/>
      <g id="bank">${tile(0)}${tile(1600)}</g>
      <rect y="392" width="1600" height="20" fill="#e8d39a"/>
      <rect y="400" width="1600" height="450" fill="url(#river)"/><rect y="400" width="1600" height="12" fill="#0d5f86" opacity=".3"/>
      <g id="waves">${waves}${waves.replace(/M(\d+)/g, (m, x) => 'M' + (+x + 2000))}</g>
      <g id="objs"></g>
      <g id="raftPos" transform="translate(${RAFT_X},${LANES[1]})"><g class="bob"><g id="wob"><g transform="scale(.72)" id="raftArt">${raftArt()}</g></g></g></g>
      <path d="M0,842 C400,822 1100,862 1600,837 L1600,900 L0,900 Z" fill="#e8d39a"/>
      <path d="M0,850 C400,830 1100,870 1600,845 L1600,900 L0,900 Z" fill="url(#grass)"/>
      <rect x="460" y="858" width="680" height="24" rx="12" fill="rgba(255,255,255,.7)"/>
      <rect id="prog" x="460" y="858" width="24" height="24" rx="12" fill="#ff5fa2"/>
      <text x="1160" y="884" font-size="40">🚩</text>
      <g id="jar" transform="translate(1440,110)"></g>
      ${button('upBtn', 1500, 560, 'up', '#ff9800', 66)}
      ${button('downBtn', 1500, 740, 'down', '#ff9800', 66)}
      ${button('homeBtn', 80, 80, 'home', '#7e57c2')}`;
    const objLayer = $('#objs'), raftPos = $('#raftPos'), bank = $('#bank'), wavesEl = $('#waves'), prog = $('#prog');
    function drawJar() {
      const f = state.fruits > 0 && state.fruits % 5 === 0 ? 1 : (state.fruits % 5) / 5;
      $('#jar').innerHTML = `<rect x="-50" y="-60" width="100" height="120" rx="24" fill="rgba(255,255,255,.55)" stroke="#fff" stroke-width="6"/>
        <rect x="-42" y="${(52 - 104 * f).toFixed(0)}" width="84" height="${(104 * f).toFixed(0)}" rx="16" fill="#ff7043"/>
        <rect x="-36" y="-76" width="72" height="20" rx="8" fill="#8d5a2b"/>
        <text x="0" y="22" text-anchor="middle" font-size="50">🍓</text>`;
    }
    drawJar();
    let lane = 1, raftY = LANES[1], t = 0, nextSpawn = 2.2, last = performance.now(), done = false, bumps = 0, raf = 0;
    const objs = [];
    const ok = alive();
    function spawn() {
      const log = Math.random() < .35;
      const g = mk('g');
      g.innerHTML = log ? `<g class="obj">${Art.log()}</g>` : `<g class="obj"><g class="bob"><text text-anchor="middle" y="30" font-size="84">${FRUITS[Math.floor(Math.random() * FRUITS.length)]}</text></g></g>`;
      objLayer.appendChild(g);
      objs.push({ g, x: 1720, lane: Math.floor(Math.random() * 3), log, hit: false });
    }
    function bump(o) {
      Sound.sfx.boing();
      restart($('#wob'), 'wobble');
      o.g.firstChild.classList.add('knock');
      if (bumps++ === 0 && !Voice.speaking) say('¡Boing! No pasa nada.');
    }
    function grab(o) {
      Sound.sfx.chime();
      o.g.firstChild.classList.add('collect');
      state.fruits++; save();
      drawJar();
      // Si la balsa ya llegó, el premio se ve en Juju pero no se anuncia (no debe cortar la llegada).
      if ((state.fruits === 5 || state.fruits === 10) && !done) {
        Sound.sfx.win();
        say(state.fruits === 5 ? '¡Llenaste el frasco! Ganaste una capa de reina.' : '¡Otro frasco lleno! Ganaste una varita mágica.');
        $('#raftArt').innerHTML = raftArt();
      }
    }
    function frame(now) {
      if (!ok()) return;
      // La balsa se detiene mientras el teléfono está en vertical o el juego no se ve.
      if (portrait() || document.hidden) { last = now; raf = requestAnimationFrame(frame); return; }
      const dt = Math.min(.05, (now - last) / 1000);
      last = now;
      t += dt;
      raftY += (LANES[lane] - raftY) * Math.min(1, dt * 10);
      raftPos.setAttribute('transform', `translate(${RAFT_X},${raftY.toFixed(1)})`);
      const dist = t * SPEED;
      bank.setAttribute('transform', `translate(${-(dist * .4 % 1600).toFixed(1)},0)`);
      wavesEl.setAttribute('transform', `translate(${-(dist % 2000).toFixed(1)},0)`);
      if (t < DURATION - 3 && t >= nextSpawn) { spawn(); nextSpawn = t + .9 + Math.random() * .7; }
      for (const o of objs) {
        if (o.dead) continue;
        o.x -= SPEED * dt;
        o.g.setAttribute('transform', `translate(${o.x.toFixed(1)},${LANES[o.lane] + 12})`);
        if (!o.hit && Math.abs(o.x - RAFT_X) < HALF && Math.abs(LANES[o.lane] - raftY) < 60) { o.hit = true; o.log ? bump(o) : grab(o); }
        if (o.x < -200) { o.dead = true; o.g.remove(); }
      }
      prog.setAttribute('width', (24 + 656 * Math.min(1, t / DURATION)).toFixed(1));
      if (t >= DURATION && !done) {
        done = true;
        Sound.sfx.win();
        // Parada final: el río sale de la selva y llega a la sabana.
        if (LEVELS[i].id === 'leon') say('¡El río mágico nos llevó hasta la sabana, muy lejos!', () => later(() => go(stop, i), 400));
        else later(() => go(stop, i), 600);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    cleanup.push(() => cancelAnimationFrame(raf));

    const move = (d) => { const n = Math.max(0, Math.min(2, lane + d)); if (n !== lane) { Sound.sfx[n < lane ? 'raftUp' : 'raftDown'](); lane = n; } };
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === 'ArrowUp' || key === 'w') { move(-1); e.preventDefault(); }
      if (key === 'ArrowDown' || key === 's') { move(1); e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);
    cleanup.push(() => window.removeEventListener('keydown', onKey));
    // Tocar el río: la balsa va al carril más cercano al toque.
    const onPointer = (e) => {
      if (e.target.closest('#upBtn,#downBtn,#homeBtn')) return;
      const y = svgPoint(e).y;
      let best = 0;
      LANES.forEach((ly, k) => { if (Math.abs(ly - y) < Math.abs(LANES[best] - y)) best = k; });
      move(best - lane);
    };
    svg.addEventListener('pointerdown', onPointer);
    cleanup.push(() => svg.removeEventListener('pointerdown', onPointer));
    $('#upBtn').addEventListener('pointerdown', (e) => { e.stopPropagation(); Sound.unlock(); move(-1); });
    $('#downBtn').addEventListener('pointerdown', (e) => { e.stopPropagation(); Sound.unlock(); move(1); });
    onTap($('#homeBtn'), () => go(map));
    say(i === 0 ? '¡Vámonos, Juju! Toca el río para mover la balsa y juntar frutas.'
      : LEVELS[i].id === 'leon' ? '¡Ya falta poquito para la sabana! ¿Quién nos espera?' : '¡Vámonos! ¡Ya falta menos para la sabana!');
  }

  // ---------- Parada: mamá pide ayuda, pistas, bebé, minijuego, reencuentro ----------
  function stop(i, opts = {}) {
    bubblePos = 'bottom';
    const L = LEVELS[i];
    let phase = 'clues', found = 0;
    sceneEl.innerHTML = `
      ${L.bg()}
      <g id="playBack"></g>
      <g id="clues">${L.clues.map((c, k) => `<g class="clue" data-k="${k}" transform="translate(${c.x},${c.y})">
        <circle r="85" fill="transparent"/><g class="halo"><circle r="80" fill="#fff59d"/><circle r="80" fill="none" stroke="#ffd23f" stroke-width="8"/></g>
        <g class="wiggle" style="animation-delay:${k * .4}s">${Art.clue(L.clue)}</g>
        <g pointer-events="none">${Art.leaf(-80, 40, .7, -20, '#2e7d32')}${Art.leaf(70, 46, .6, 200, '#388e3c')}</g></g>`).join('')}</g>
      <g id="mom"><g>${Art.animal(L.id)}</g></g>
      <g id="baby"></g>
      <g id="playFront"></g>
      ${Art.foreground()}
      <g id="counter">${[0, 1, 2].map(k => `<g transform="translate(${680 + k * 120},80)"><rect x="-48" y="-38" width="96" height="76" rx="14" fill="rgba(255,255,255,.6)" stroke="#fff" stroke-width="5" stroke-dasharray="12 8"/><g id="slot${k}"></g></g>`).join('')}</g>
      ${button('homeBtn', 80, 80, 'home', '#7e57c2')}`;
    const momEl = $('#mom'), babyEl = $('#baby');
    place(momEl, L.mom);
    onTap($('#homeBtn'), () => go(map));

    const api = {
      back: $('#playBack'), front: $('#playFront'), mom: momEl, baby: babyEl,
      say, later, tap: onTap, place, moveTo, alive,
      hint: (fn) => Hint.set(fn),
      setArt(el, mood, cls = '') { el.innerHTML = `<g class="${cls}">${Art.animal(L.id, mood)}</g>`; },
      reunited,
      // Ayudas para los minijuegos de js/levels2.js
      mk, countPop, hearts, confetti, flash, NUM, NUM_M, Hint, rescued: () => state.rescued.slice(),
    };

    $$('.clue').forEach(el => onTap(el, () => {
      if (phase !== 'clues' || el.dataset.done) return;
      el.dataset.done = '1';
      Sound.sfx.shutter(); flash();
      el.querySelector('.halo').remove();
      const w = el.querySelector('.wiggle');
      w.removeAttribute('style'); w.setAttribute('class', 'snapped');
      later(() => el.remove(), 650);
      $('#slot' + found).innerHTML = `<g class="pop-in"><g transform="scale(.6)">${Art.clue(L.clue)}</g></g>
        <g transform="translate(36,26)"><circle r="17" fill="#66bb6a" stroke="#fff" stroke-width="4"/><path d="M-7,0 L-2,6 L8,-6" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
      found++;
      if (found === 3) { phase = 'found'; Hint.clear(); say(L.clueLines[2], () => later(reveal, 300)); }
      else say(L.clueLines[found - 1]);
    }));

    function reveal() {
      phase = 'help';
      place(babyEl, L.baby);
      babyEl.innerHTML = `<circle cy="-90" r="150" fill="transparent"/><g class="halo"><circle cy="-80" r="140" fill="#fff59d"/></g><g class="pop-in">${Art.animal(L.id, 'sad')}</g>`;
      Sound.sfx[L.sound]();
      // Primero Juju lo calma con un toque suavecito (juego de cuidar).
      phase = 'calm';
      say(L.found);
      Hint.set(() => phase === 'calm' && { x: babyEl._pos.x, y: babyEl._pos.y - 60, say: 'Toca al bebé suavecito, Juju.' });
      onTap(babyEl, () => {
        if (phase !== 'calm') return;
        phase = 'help';
        babyEl.querySelectorAll('.halo, circle[fill="transparent"]').forEach(n => n.remove());
        hearts(babyEl._pos.x, babyEl._pos.y - 60);
        Sound.sfx.chime();
        say(['¡Suavecito! Ya se siente mejor.', L.task]);
        L.setup(api);
      });
    }

    function reunited() {
      if (phase === 'done') return;
      phase = 'done';
      Hint.clear();
      api.setArt(babyEl, 'happy', 'happy-jump');
      Sound.sfx.win();
      later(() => Sound.sfx[L.sound](), 500);
      hearts(momEl._pos.x, momEl._pos.y - 150 * momEl._pos.s);
      confetti();
      say(['¡Mira! Ya está con su mamá. Ahora están muy contentos.', L.praise], () => later(() => quiz(L, () => go(photo, i)), 300));
    }

    say([opts.replay ? '¡Hola otra vez!' : '¡Llegamos!', ...L.ask]);
    Hint.set(() => {
      const el = $$('.clue').find(e => !e.dataset.done);
      if (!el) return null;
      const c = L.clues[+el.dataset.k];
      return { x: c.x, y: c.y };
    });
  }

  // ---------- Pregunta con dos dibujos: si elige el otro, el correcto brilla y se vuelve a intentar ----------
  function quiz(L, done) {
    const Q = L.quiz;
    const draw = (o) => o.color ? `<rect x="-80" y="-80" width="160" height="160" rx="12" fill="${o.color}"/>`
      : o.animal ? Art.thumb(o.animal, 190) : `<text y="60" text-anchor="middle" font-size="170">${o.emoji}</text>`;
    const flip = Math.random() < .5;
    const opts = flip ? [Q.wrong, Q.right] : [Q.right, Q.wrong];
    const layer = mk('g');
    layer.innerHTML = `<rect width="1600" height="900" fill="#0b3016" opacity=".5"/>` + opts.map((o, k) =>
      `<g class="qopt" data-ok="${o === Q.right ? 1 : 0}" transform="translate(${560 + k * 480},470)"><g class="qin">
        <rect x="-150" y="-150" width="300" height="300" rx="24" fill="#fff" stroke="#ffd23f" stroke-width="10" filter="url(#shadow)"/>${draw(o)}</g></g>`).join('');
    sceneEl.appendChild(layer);
    let answered = false;
    say(Q.q);
    const right = layer.querySelector('[data-ok="1"]');
    Hint.set(() => !answered && { x: +right.getAttribute('transform').match(/\(([\d.]+)/)[1], y: 470, say: Q.q });
    layer.querySelectorAll('.qopt').forEach(el => onTap(el, () => {
      if (answered) return;
      if (el.dataset.ok === '1') {
        answered = true;
        Hint.clear();
        Sound.sfx.win();
        hearts(+el.getAttribute('transform').match(/\(([\d.]+)/)[1], 400);
        say(Q.yes, () => later(done, 300));
      } else {
        Sound.sfx.tick();
        right.firstElementChild.setAttribute('class', 'qin pulse');
        say(Q.show);
      }
    }));
  }

  // ---------- Minijuego 1: nubes que llenan el charco ----------
  function setupFrog(api) {
    const CLOUDS = [[760, 170], [990, 115], [1220, 170]];
    api.back.innerHTML = CLOUDS.map(([x, y], k) => `<g class="cloud" data-k="${k}" transform="translate(${x},${y})"><g class="halo"><ellipse rx="160" ry="100" fill="#fff59d"/></g><g class="drift" style="animation-delay:${-k * 2}s"><g class="pop-in cloud-art">${Art.cloud(true)}</g></g></g>`).join('') +
      `<g transform="translate(980,758)"><g id="water" class="grow" style="transform:scale(.001)"><ellipse rx="250" ry="60" fill="url(#water)"/><ellipse cx="-60" cy="-14" rx="70" ry="10" fill="#fff" opacity=".45"/></g></g>
       <g id="rainbow"></g>`;
    const water = api.back.querySelector('#water');
    const clouds = [...api.back.querySelectorAll('.cloud')];
    let filled = 0;
    clouds.forEach(c => api.tap(c, () => {
      if (c.dataset.used) return;
      c.dataset.used = '1';
      c.querySelector('.cloud-art').innerHTML = Art.cloud(false);
      c.querySelector('.halo').remove();
      Sound.sfx.rain();
      const [x, y] = CLOUDS[+c.dataset.k];
      const rain = mk('g', { 'pointer-events': 'none' });
      rain.innerHTML = Array.from({ length: 10 }, () => `<g transform="translate(${x - 90 + Math.random() * 180},${y + 40 + Math.random() * 40})"><path class="drop" style="animation-delay:${(Math.random() * .5).toFixed(2)}s" d="M0,0 L-4,22" stroke="#4fc3f7" stroke-width="6" stroke-linecap="round"/></g>`).join('');
      api.back.appendChild(rain);
      setTimeout(() => rain.remove(), 1500);
      filled++;
      api.later(() => { water.style.transform = `scale(${filled / 3})`; Sound.sfx.splash(); }, 700);
      countPop(filled, x, y + 10);
      if (filled < 3) api.say(filled === 1 ? '¡Una nube! ¡Más lluvia!' : '¡Dos nubes! ¡Falta una!');
      else {
        Hint.clear();
        api.later(() => {
          // Sorpresa: sale un arcoíris y la ranita lo usa de tobogán hasta su mamá.
          api.back.querySelector('#rainbow').innerHTML = `<g class="pop-in">${Art.rainbow(1180, 720, 210)}</g>`;
          api.say(['¡Tres nubes! Una, dos, tres. ¡El charco está lleno!', '¡Un arcoíris! ¡La ranita se va a resbalar hasta su mamá!'],
            () => api.moveTo(api.baby, { x: 1280, y: 570 }, 1600, 260, api.reunited));
          api.setArt(api.baby, 'happy');
        }, 1600);
      }
    }));
    api.hint(() => {
      const c = clouds.find(c => !c.dataset.used);
      if (!c) return null;
      const [x, y] = CLOUDS[+c.dataset.k];
      return { x, y, say: 'Toca una nube gris, Juju.' };
    });
  }

  // ---------- Minijuego 2: escalera de flores para el tucancito ----------
  function setupToucan(api) {
    const STEPS = [[860, 630], [940, 570], [1010, 510], [1070, 450], [1110, 390]];
    api.back.innerHTML = STEPS.map(([x, y], k) => `<g class="bud" data-k="${k}" transform="translate(${x},${y})" style="display:${k ? 'none' : 'inline'}">
      <circle r="70" fill="transparent"/><g class="halo"><circle r="72" fill="#fff59d"/></g><g class="pop-in"><g class="grow bud-art" style="transform:scale(.4)">
      <ellipse cx="0" cy="6" rx="58" ry="16" fill="#43a047"/>${Art.flower(0, -4, ['#ff5fa2', '#ffd23f', '#ff8a65', '#ba68c8', '#ff5fa2'][k], 2.6)}</g></g></g>`).join('') +
      `<g id="siblings"></g>`;
    const buds = [...api.back.querySelectorAll('.bud')];
    let k = 0;
    buds.forEach((b, j) => api.tap(b, () => {
      if (j !== k) return;
      k++;
      b.querySelector('.bud-art').style.transform = 'scale(1)';
      b.querySelector('.halo').remove();
      Sound.sfx.pop();
      const [x, y] = STEPS[j];
      countPop(k, x, y - 90);
      if (k < STEPS.length) api.say(`¡${NUM[k]} ${k === 1 ? 'flor' : 'flores'}!`);
      api.later(() => api.moveTo(api.baby, { x, y: y - 14 }, 600, 70, () => {
        if (k < STEPS.length) {
          buds[k].style.display = 'inline';
        } else {
          // Último brinco: a la rama con mamá. Sorpresa: salen sus hermanitos del nido.
          api.moveTo(api.baby, { x: 1100, y: 330 }, 700, 90, () => {
            api.back.querySelector('#siblings').innerHTML = [1195, 1245].map(x => `<g transform="translate(${x},270) scale(.32)"><g class="pop-in">${Art.toucan('happy')}</g></g>`).join('');
            Sound.sfx.toucan();
            api.say(['Una, dos, tres, cuatro, cinco flores. ¡Llegó arriba!', '¡Y mira, sus hermanitos! ¡Pío, pío, pío!'], () => api.later(api.reunited, 300));
          });
        }
      }), 350);
    }));
    api.hint(() => k < STEPS.length && { x: STEPS[k][0], y: STEPS[k][1], say: 'Toca la flor que brilla, Juju.' });
  }

  // ---------- Minijuego 3: liana para el bebé perezoso y mamá lentísima ----------
  function setupSloth(api) {
    const TOP = 275, BOTTOM = 700, X = 690;
    api.back.innerHTML = `<g transform="translate(${X},${TOP})"><g id="vine" class="grow" style="transform:scaleY(0);transform-origin:50% 0">
        <path d="M0,0 C-14,100 14,200 0,${BOTTOM - TOP}" stroke="#2e7d32" stroke-width="16" fill="none" stroke-linecap="round"/>
        ${[80, 180, 280, 380].map((y, k) => Art.leaf(0, y, .45, k % 2 ? 200 : -20, '#66bb6a')).join('')}</g></g>`;
    api.front.innerHTML = `<g id="bundle" transform="translate(${X},${TOP})"><circle r="80" fill="transparent"/><g class="pulse"><circle r="42" fill="#43a047" stroke="#c6ff3a" stroke-width="8"/><path d="M-20,-8 Q0,-26 20,-8 Q0,10 -20,-8" stroke="#1b5e20" stroke-width="6" fill="none"/></g></g>`;
    const vine = api.back.querySelector('#vine'), bundle = api.front.querySelector('#bundle');
    let k = 0, slow = 0, phase = 'vine';
    const bundleY = () => TOP + (BOTTOM - TOP) * k / 3;
    api.tap(bundle, () => {
      if (phase !== 'vine') return;
      k++;
      vine.style.transform = `scaleY(${k / 3})`;
      Sound.sfx.whoosh();
      bundle.setAttribute('transform', `translate(${X},${bundleY()})`);
      countPop(k, X + 120, bundleY());
      if (k < 3) { api.say([`¡${NUM_M[k]}!`, k === 1 ? '¡Baja la liana!' : '¡Un poquito más!']); return; }
      phase = 'climb';
      bundle.remove();
      Hint.clear();
      // La mamá habla cuando terminan la frase y la subida (lo que tarde más).
      let climbed = 0;
      const both = (fn) => () => { if (++climbed === 2) fn(); };
      const momComes = both(() => {
        // Sorpresa: mamá perezoso tarda y tarda. Juju la toca para animarla.
        phase = 'slow';
        Sound.sfx.sloth();
        api.say(['¡Ahí viene su mamá!', { t: '¡Yaaa voooy!', pitch: .6, rate: .7, who: 'perezoso' }, 'Mamá es muy lenta. ¡Tócala para animarla!']);
        api.mom.firstChild.setAttribute('class', 'pulse');
        api.hint(() => phase === 'slow' && { x: api.mom._pos.x, y: api.mom._pos.y - 90, say: 'Toca a mamá perezoso, Juju.' });
      });
      api.say('¡Tres! ¡Ya llegó! Sube, perezosito, despacito.', momComes);
      api.setArt(api.baby, 'happy');
      api.later(() => api.moveTo(api.baby, { x: X - 10, y: TOP - 8 }, 2600, 0, momComes), 400);
    });
    api.tap(api.mom, () => {
      if (phase !== 'slow') return;
      slow++;
      Sound.sfx.sloth();
      const x = 1150 - slow * 125;
      api.moveTo(api.mom, { x }, 1400, 0, () => {
        if (slow >= 3) { api.mom.firstChild.setAttribute('class', ''); api.reunited(); }
      });
      countPop(slow, x, 120);
      if (slow < 3) api.say(slow === 1 ? { t: 'Voooy…', pitch: .6, rate: .7, who: 'perezoso' } : '¡Ya casi llega!');
      else phase = 'done';
    });
    api.hint(() => phase === 'vine' && { x: X, y: bundleY(), say: 'Toca la liana que brilla, Juju.' });
  }

  // ---------- Foto del reencuentro, dato curioso y regalito ----------
  function photo(i) {
    bubblePos = 'top';
    const L = LEVELS[i];
    let shot = false;
    sceneEl.innerHTML = `
      ${L.bg()}<rect width="1600" height="900" fill="#fff" opacity=".3"/>
      <g transform="translate(330,860) scale(1.1)"><g class="bob">${Art.juju({ accessory: accessory() })}</g></g>
      <g transform="translate(1290,860) scale(1.1)">${Art.sofia({ cheer: true })}</g>
      <g transform="translate(810,490)"><g class="bob">${Art.family(L.id, 520)}</g></g>
      ${button('camBtn', 800, 790, 'camera', '#ff5fa2', 90, 'pulse')}
      <g id="shot"></g>`;
    say('¡Sonrían! Toca la cámara, Juju.');
    Hint.set(() => !shot && { x: 800, y: 790, say: 'Toca la cámara, Juju.' });
    onTap($('#camBtn'), () => {
      if (shot) return;
      shot = true;
      Hint.clear();
      Sound.sfx.shutter(); flash();
      // Se guarda en cuanto se toma la foto: si se cierra el juego ahora, la foto ya está en el álbum.
      if (!isRescued(L.id)) { state.rescued.push(L.id); save(); }
      $('#camBtn').remove();
      $('#shot').innerHTML = `<rect width="1600" height="900" fill="#0b3016" opacity=".5"/>
        <g transform="translate(560,450)"><g class="pop-in"><g transform="rotate(-4)">${polaroid(L)}</g></g></g>
        <g id="giftSpot"></g>`;
      say(['¡Clic! Esta foto es tuya para siempre.', L.fact], () => {
        Sound.sfx.chime();
        $('#giftSpot').innerHTML = `<g transform="translate(1150,420)"><g class="pop-in"><circle r="150" fill="#fffde7" stroke="#ffd23f" stroke-width="10" filter="url(#shadow)"/><g transform="scale(1.6)">${Art.gift(L.id)}</g></g></g>`;
        say([L.gift, 'Y el bebé quiere acompañarnos en la balsa hasta la fiesta del final del río. ¡Súbete!'], () => {
          $('#giftSpot').innerHTML += button('nextBtn', 1150, 760, '🛶', '#66bb6a', 80, 'pulse');
          Hint.set(() => ({ x: 1150, y: 760, say: 'Toca la balsa para seguir, Juju.' }));
          onTap($('#nextBtn'), () => go(map, { after: i }));
        });
      });
    });
  }

  // ---------- Final: fiesta con todas las familias, foto de grupo y medalla ----------
  function finale() {
    bubblePos = 'bottom';
    let phase = 'photo';
    const SPOTS = [[180, 300], [490, 290], [800, 280], [1110, 290], [1420, 300], [210, 560], [560, 580], [1430, 570]];
    const colors = ['#ff5fa2', '#ffd23f', '#66bb6a', '#4fc3f7', '#ff8a65', '#ba68c8'];
    // Papel picado de fiesta
    const flags = Array.from({ length: 16 }, (_, k) => {
      const x = 170 + k * 88, y = 34 + Math.round(Math.sin(k / 15 * Math.PI) * 26);
      return `<path d="M${x - 34},${y} L${x + 34},${y} L${x + 34},${y + 54} L${x + 17},${y + 46} L${x},${y + 54} L${x - 17},${y + 46} L${x - 34},${y + 54} Z" fill="${colors[k % 6]}"/><circle cx="${x}" cy="${y + 22}" r="8" fill="#fff" opacity=".6"/>`;
    }).join('');
    sceneEl.innerHTML = `
      ${LEVELS[LEVELS.length - 1].bg()}
      <path d="M130,34 Q800,90 1600,34" stroke="#8d5a2b" stroke-width="4" fill="none"/>${flags}
      ${PLAYABLE_IDS.map((id, k) => `<g transform="translate(${SPOTS[k][0]},${SPOTS[k][1]})"><g class="pop-in" style="animation-delay:${(k * .3).toFixed(1)}s">${Art.family(id, id === 'leon' ? 300 : 250)}</g></g>`).join('')}
      <g id="fJuju" transform="translate(1010,860) scale(.9)">${Art.juju({ accessory: accessory(), cheer: true })}</g>
      <g transform="translate(1200,860) scale(.9)">${Art.sofia({ cheer: true })}</g>
      <g id="fBtn"></g>
      ${button('homeBtn', 80, 80, 'home', '#7e57c2')}`;
    onTap($('#homeBtn'), () => go(cover));
    confetti();
    Sound.sfx.win();
    PLAYABLE_IDS.forEach((id, k) => later(() => Sound.sfx[LEVELS[k].sound](), 300 + k * 300));

    const showCam = () => {
      if (phase !== 'photo' || $('#camBtn')) return;
      $('#fBtn').innerHTML = button('camBtn', 760, 650, 'camera', '#ff5fa2', 90, 'pulse');
      Hint.set(() => phase === 'photo' && { x: 760, y: 650, say: 'Toca la cámara, Juju.' });
      onTap($('#camBtn'), () => {
        if (phase !== 'photo') return;
        phase = 'medal';
        Hint.clear();
        Sound.sfx.shutter(); flash();
        $('#fBtn').innerHTML = '';
        say(['¡Clic! ¡Qué foto tan bonita!', 'Mamá leona te trae algo especial. ¡Tócalo!'], showMedal);
      });
    };
    // Medalla de Rescatadora Oficial
    const showMedal = () => {
      if (phase !== 'medal' || $('#medalBtn')) return;
      $('#fBtn').innerHTML = `<g id="medalBtn" transform="translate(760,640)"><g class="pulse">
        <circle r="100" fill="#fff8e1" stroke="#ffb300" stroke-width="8" filter="url(#shadow)"/>
        <path d="M-34,-84 L0,-10 L34,-84" stroke="#e53935" stroke-width="18" fill="none"/>
        <circle cy="22" r="48" fill="#ffc107" stroke="#ff8f00" stroke-width="7"/>
        <path d="M0,-6 L9,13 L30,15 L14,29 L19,50 L0,39 L-19,50 L-14,29 L-30,15 L-9,13 Z" fill="#fff59d"/></g></g>`;
      Hint.set(() => phase === 'medal' && { x: 760, y: 640, say: 'Toca la medalla, Juju.' });
      onTap($('#medalBtn'), () => {
        if (phase !== 'medal') return;
        phase = 'done';
        state.finaleDone = true; save();
        Hint.clear();
        Sound.sfx.win(); confetti();
        $('#fBtn').innerHTML = '';
        $('#fJuju').innerHTML = `<g class="pop-in">${Art.juju({ accessory: accessory(), cheer: true, medal: true })}</g>`;
        hearts(1010, 600);
        say(['¡Juju, eres la Rescatadora Oficial de la selva!', 'Cuidaste a todos los bebés con mucho cariño.', 'Ve a contarle a mamá Marcela y a papá Checo.', '¡Y ruge suavecito como el leoncito! ¡Miau-grr!'], () => {
          $('#fBtn').innerHTML = button('endBtn', 760, 650, 'home', '#7e57c2', 80, 'pulse');
          Hint.set(() => ({ x: 760, y: 650, say: 'Toca la casita, Juju.' }));
          onTap($('#endBtn'), () => go(cover));
        });
      });
    };
    say(['¡Lo lograste, Juju! Todos los bebés están con sus mamás.', '¡Todas las familias vinieron a la fiesta!', '¡Foto de grupo! Toca la cámara.'], showCam);
    later(showCam, 16000);
  }

  // ---------- Álbum de la Selva ----------
  function album(from = 'map') {
    bubblePos = 'bottom';
    const n = state.rescued.length;
    let slots = '';
    LEVELS.forEach((L, i) => {
      const x = 260 + (i % 4) * 360, y = 370 + Math.floor(i / 4) * 330;
      const done = !L.soon && isRescued(L.id), lion = i === LEVELS.length - 1;
      slots += `<g class="slot" data-i="${i}" transform="translate(${x},${y})"><g transform="rotate(${i % 2 ? 3 : -3})">
        <rect x="-125" y="-145" width="250" height="290" rx="10" fill="#fff" stroke="${lion ? '#ffb300' : '#e0d6c8'}" stroke-width="${lion ? 8 : 3}" filter="url(#shadow)"/>
        <rect x="-110" y="-130" width="220" height="200" fill="${done ? '#bfefff' : lion ? '#fff3c4' : '#eceff1'}"/>
        ${done ? `<g transform="translate(0,-25)">${Art.family(L.id, 190)}</g><text y="118" text-anchor="middle" font-size="30" font-weight="800" fill="#5d4037">${L.name.split(' ')[0]}</text>`
          : lion ? `<text y="0" text-anchor="middle" font-size="110" opacity=".5">🦁</text>`
          : `<text y="10" text-anchor="middle" font-size="100" font-weight="800" fill="#cfd8dc">?</text>`}</g></g>`;
    });
    sceneEl.innerHTML = `
      <rect width="1600" height="900" fill="url(#paper)"/>
      ${Array.from({ length: 90 }, (_, k) => `<circle cx="${(k * 179) % 1600}" cy="${(k * 113) % 900}" r="4" fill="#e9c98f" opacity=".45"/>`).join('')}
      <rect width="1600" height="900" fill="url(#vignette)"/>
      ${Art.leaf(-20, 880, 2, -40, '#a5d6a7')}${Art.leaf(1620, 900, 2, -140, '#a5d6a7')}
      ${title(800, 110, 'Álbum de la Selva', 80)}
      ${slots}
      ${button('backBtn', 80, 80, 'home', '#7e57c2')}
      <g id="resetBtn" transform="translate(1530,840)"><circle r="40" fill="#b0bec5" stroke="#fff" stroke-width="4"/>
        <path d="M14,-14 A20,20 0 1 0 20,6" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M8,-26 L20,-12 L4,-6 Z" fill="#fff"/>
        <circle id="resetRing" r="52" fill="none" stroke="#ef5350" stroke-width="8" stroke-dasharray="327" stroke-dashoffset="327" transform="rotate(-90)"/></g>
      <g id="modal"></g>`;
    onTap($('#backBtn'), () => go(from === 'cover' ? cover : map));
    // Reinicio para papás: mantener presionado 3 segundos y confirmar. Un toque corto no hace nada.
    const resetBtn = $('#resetBtn'), ring = $('#resetRing');
    let hold = null;
    const cancelHold = () => { clearTimeout(hold); ring.style.transition = 'none'; ring.style.strokeDashoffset = '327'; };
    resetBtn.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      ring.getBoundingClientRect();
      ring.style.transition = 'stroke-dashoffset 3s linear';
      ring.style.strokeDashoffset = '0';
      hold = setTimeout(() => {
        cancelHold();
        if (window.confirm(`¿Empezar de nuevo? Se borrará el avance y el álbum de ${profile().name}.`)) {
          resetProfile();
          go(cover, { greet: 'Listo. ¡Empezamos una nueva aventura!' });
        }
      }, 3000);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => resetBtn.addEventListener(ev, cancelHold));
    cleanup.push(() => clearTimeout(hold));
    $$('.slot').forEach(el => onTap(el, () => {
      const L = LEVELS[+el.dataset.i];
      if (L.soon || !isRescued(L.id)) { say(+el.dataset.i === LEVELS.length - 1 ? '¿Quién será? ¡Lo sabremos al final del río!' : 'Esta foto todavía no la tomamos.'); return; }
      openPhoto(+el.dataset.i);
    }));
    say(n ? ['Estas son tus fotos, Juju.', `¡Ya ayudaste a ${['', 'una familia', 'dos familias', 'tres familias', 'cuatro familias', 'cinco familias', 'seis familias', 'siete familias', 'ocho familias'][n]}!`, 'Toca una foto.'] : 'Aquí van a estar tus fotos. ¡Vamos a ayudar a la primera familia!');

    function openPhoto(i) {
      const L = LEVELS[i];
      let k = 0;
      $('#modal').innerHTML = `<rect id="dim" width="1600" height="900" fill="#0b3016" opacity=".6"/>
        <g transform="translate(560,460) scale(.95)"><g class="pop-in">${polaroid(L)}</g></g>
        ${button('factBtn', 1100, 340, '🔊', '#26a69a', 100, 'pulse')}
        ${button('replayBtn', 1100, 640, '🛶', '#66bb6a', 100)}
        ${button('closeBtn', 1500, 110, 'close', '#ef5350', 54)}`;
      const tell = () => { Sound.sfx[L.sound](); say(k === 0 ? [L.name + '.', L.facts[0]] : L.facts[k % L.facts.length]); k++; };
      tell();
      // Un doble toque en la foto no debe cerrarla ni empezar la parada: se ignoran los toques del primer medio segundo.
      const opened = Date.now(), settled = () => Date.now() - opened > 600;
      onTap($('#factBtn'), () => { if (settled()) tell(); });
      onTap($('#replayBtn'), () => { if (settled()) go(stop, i, { replay: true }); });
      const close = () => { if (!settled()) return; Voice.stop(); $('#modal').innerHTML = ''; };
      onTap($('#closeBtn'), close);
      onTap($('#dim'), close);
    }
  }

  // ---------- Arranque ----------
  // iPhone: el sonido y la voz solo se pueden activar cuando el dedo se levanta (touchend o click),
  // no al apoyarlo. Se intenta en cada toque hasta que quedan activos.
  const wake = () => { Sound.unlock(); Voice.unlock(); };
  document.addEventListener('touchend', wake, { passive: true });
  document.addEventListener('click', wake, true);
  // iPhone: evitar que pellizcar haga zoom en la pantalla del juego.
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  // Sin internet también se puede jugar (en https), y se pide al navegador que no borre el álbum.
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  cover();
})();
