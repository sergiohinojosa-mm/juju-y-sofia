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
  function go(fn, ...args) { token++; sceneAt = Date.now(); Voice.stop(); Hint.clear(); cleanup.forEach(f => f()); cleanup = []; fn(...args); restart(sceneEl, 'scene-in'); }
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
      squish(el);
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
  // Aplastadita elástica al tocar algo (squash & stretch). Se agrega una escala al final de la posición
  // y se quita sola; si otra animación mueve la figura mientras tanto, se hace a un lado.
  function squish(el) {
    const base = el.getAttribute('transform');
    if (!base || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t0 = performance.now(), D = 420;
    let mine = base;
    const step = (now) => {
      if (el.getAttribute('transform') !== mine) return;
      const u = Math.min(1, (now - t0) / D), k = Math.sin(u * Math.PI * 2.5) * (1 - u) * .16;
      mine = u < 1 ? `${base} scale(${(1 + k).toFixed(3)},${(1 - k).toFixed(3)})` : base;
      el.setAttribute('transform', mine);
      if (u < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Posición y animación de figuras (atributo transform = posición; nunca lleva clase animada).
  function place(el, p) { el._pos = Object.assign({ s: 1 }, p); el.setAttribute('transform', `translate(${p.x},${p.y}) scale(${p.s ?? 1})`); }
  function moveTo(el, to, ms, hop = 0, cb) {
    // Un movimiento nuevo sobre la misma figura cancela al anterior y sale de donde va la figura.
    const from = el._pos, ok = alive(), t0 = performance.now(), id = el._mv = (el._mv || 0) + 1;
    const target = Object.assign({}, from, to);
    const step = (now) => {
      if (!ok() || el._mv !== id) return;
      const u = Math.min(1, (now - t0) / ms);
      const e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const x = from.x + (target.x - from.x) * e;
      const y = from.y + (target.y - from.y) * e - Math.sin(Math.PI * u) * hop;
      const s = from.s + (target.s - from.s) * e;
      el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s.toFixed(3)})`);
      el._pos = Object.assign({}, target, { x, y: from.y + (target.y - from.y) * e, s });
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
      if (this.level >= 4) return;
      // Si lo que brilla todavía no está en pantalla, lo intenta de nuevo más tarde.
      if (!t) { this.restart(); return; }
      this.remove();
      this.level++;
      const g = mk('g', { id: 'sparkle', 'pointer-events': 'none' });
      let s = [[0, -84, 26], [74, -22, 20], [-74, -12, 22], [44, 62, 17], [-48, 62, 19]].map(([dx, dy, r], k) =>
        `<g transform="translate(${t.x + dx},${t.y + dy})">${Art.star4(r, 'sparkle', `animation-delay:${k * .15}s`)}</g>`).join('');
      // Manita dibujada que toca justo encima del objetivo, con una ondita en la punta del dedo.
      if (this.level >= 2) s += `<g transform="translate(${t.x + 12},${t.y + 8})"><circle class="tap-ring" r="46" fill="none" stroke="#fff" stroke-width="8"/><g class="hand-tap">${Art.hand()}</g></g>`;
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
    // Ondita y chispitas donde toca el dedo.
    const r = mk('g', { transform: `translate(${p.x.toFixed(0)},${p.y.toFixed(0)})`, 'pointer-events': 'none' });
    r.innerHTML = `<circle class="ripple" r="40" fill="none" stroke="#fff" stroke-width="8"/>` +
      [0, 60, 120, 180, 240, 300].map((a, k) => `<g transform="rotate(${a})"><circle class="tap-p" r="${k % 2 ? 5 : 7}" fill="${['#fff59d', '#fff', '#ffd6e9'][k % 3]}"/></g>`).join('');
    sceneEl.appendChild(r);
    setTimeout(() => r.remove(), 550);
  });

  // ---------- Efectos ----------
  // Flash de cámara: luz blanca cálida con las esquinas un poquito doradas.
  function flash() { const r = mk('rect', { x: -400, y: -200, width: 2400, height: 1300, fill: 'url(#flashG)', class: 'flash' }); sceneEl.appendChild(r); setTimeout(() => r.remove(), 500); }
  // Estallido de festejo (anillo + chispas + estrellitas) en un punto del escenario.
  function burst(x, y, size = 1) {
    const g = mk('g', { 'pointer-events': 'none', transform: `translate(${Math.round(x)},${Math.round(y)})` });
    g.innerHTML = Art.burst(size);
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 900);
  }
  // Confeti de papelitos, listones y estrellitas que giran mientras caen.
  function confetti() {
    const g = mk('g', { 'pointer-events': 'none' });
    const colors = ['#ff5fa2', '#ffd23f', '#66bb6a', '#4fc3f7', '#ff8a65', '#ba68c8'];
    const shape = (i, c) => i % 5 === 4 ? `<path d="${Art.starPath(14)}" fill="${c}" stroke="#fff" stroke-width="2"/>`
      : i % 5 === 3 ? `<path d="M0,0 q8,-8 0,-16 q-8,-8 0,-16" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`
      : i % 5 === 2 ? `<circle r="10" fill="${c}"/><circle cx="-3" cy="-3" r="3.5" fill="#fff" opacity=".6"/>`
      : `<rect x="-9" y="-13" width="18" height="26" rx="4" fill="${c}"/><rect x="-9" y="-13" width="18" height="8" rx="4" fill="#fff" opacity=".35"/>`;
    let s = '';
    for (let i = 0; i < 44; i++) {
      const dx = Math.round(Math.random() * 300 - 150);
      s += `<g transform="translate(${Math.round(Math.random() * 1600)},-40)"><g class="confetti" style="--dx:${dx}px;animation-delay:${(Math.random() * .7).toFixed(2)}s"><g class="flutter" style="animation-delay:${(Math.random() * .5).toFixed(2)}s">${shape(i, colors[i % 6])}</g></g></g>`;
    }
    g.innerHTML = s;
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 3400);
  }
  // Corazones con volumen y brillo, con estrellitas entre ellos.
  const HEART = 'M0,12 C-30,-10 -20,-36 0,-22 C20,-36 30,-10 0,12 Z';
  function hearts(x, y) {
    const g = mk('g', { 'pointer-events': 'none' });
    g.innerHTML = [-90, -30, 30, 90, 0].map((dx, k) => `<g transform="translate(${x + dx},${y - 40 - (k % 2) * 30})"><g class="heart-up" style="animation-delay:${k * .18}s">
      <path d="${HEART}" fill="url(#heartG)" stroke="#fff" stroke-width="3"/><ellipse cx="-10" cy="-16" rx="6" ry="4" fill="#fff" opacity=".7" transform="rotate(-30 -10 -16)"/></g></g>`).join('') +
      [[-60, -110], [60, -130], [0, -170]].map(([dx, dy], k) => `<g transform="translate(${x + dx},${y + dy})">${Art.star4(14, 'heart-up', `animation-delay:${.3 + k * .2}s`)}</g>`).join('');
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 2800);
  }

  // Número grande que aparece donde tocó Juju, mientras Sofía cuenta.
  const NUM = ['', 'Una', 'Dos', 'Tres', 'Cuatro', 'Cinco'];
  const NUM_M = ['', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco'];
  function countPop(n, x, y) {
    const g = mk('g', { 'pointer-events': 'none', transform: `translate(${x},${y})` });
    g.innerHTML = `<g transform="translate(0,-50)">${Art.burst(.9)}</g><g class="num-pop"><text y="8" text-anchor="middle" font-size="150" font-weight="800" fill="#3e2723" opacity=".25">${n}</text>
      <text text-anchor="middle" font-size="150" font-weight="800" fill="url(#numG)" stroke="#5d4037" stroke-width="14" paint-order="stroke" stroke-linejoin="round">${n}</text>
      <text text-anchor="middle" font-size="150" font-weight="800" fill="none" stroke="#fff" stroke-width="3" opacity=".7">${n}</text></g>`;
    sceneEl.appendChild(g);
    setTimeout(() => g.remove(), 1200);
  }

  // ---------- Botones ----------
  const ICONS = {
    home: '<path d="M-32,6 L0,-28 L32,6" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="-26" width="9" height="18" rx="2" fill="#fff"/><path d="M-22,0 L0,-22 L22,0 L22,26 Q22,30 18,30 L-18,30 Q-22,30 -22,26 Z" fill="#fff"/><rect x="-8" y="8" width="16" height="22" rx="6" fill="#ffb74d"/><circle cx="4" cy="20" r="1.8" fill="#8d5a2b"/>',
    album: '<path d="M-32,-24 Q-16,-32 0,-22 Q16,-32 32,-24 L32,28 Q16,20 0,30 Q-16,20 -32,28 Z" fill="#fff"/><path d="M-26,-16 Q-14,-22 -4,-15 L-4,20 Q-14,14 -26,19 Z" fill="#ffe0ef"/><path d="M0,-22 L0,30" stroke="#ff5fa2" stroke-width="4"/><path d="M14,-14 C10,-19 4,-16 8,-10 L14,-4 L20,-10 C24,-16 18,-19 14,-14 Z" fill="#ff5fa2"/><path d="M6,6 L24,4 M6,14 L24,12" stroke="#ffb3d1" stroke-width="3" stroke-linecap="round"/>',
    music: '<path d="M-8,18 L-8,-26 L24,-34 L24,10" stroke="#fff" stroke-width="7" fill="none" stroke-linejoin="round"/><path d="M-8,-18 L24,-26" stroke="#fff" stroke-width="7"/><ellipse cx="-16" cy="20" rx="12" ry="9" fill="#fff" transform="rotate(-15 -16 20)"/><ellipse cx="16" cy="12" rx="12" ry="9" fill="#fff" transform="rotate(-15 16 12)"/>',
    up: '<path d="M0,-28 L30,16 Q32,20 27,20 L-27,20 Q-32,20 -30,16 Z" fill="#fff" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>',
    down: '<path d="M0,28 L30,-16 Q32,-20 27,-20 L-27,-20 Q-32,-20 -30,-16 Z" fill="#fff" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>',
    close: '<path d="M-20,-20 L20,20 M20,-20 L-20,20" stroke="#fff" stroke-width="11" stroke-linecap="round"/>',
    // Cámara mágica: cuerpo con relieve, lente de vidrio con reflejos, flash y botón.
    camera: '<rect x="-24" y="-38" width="30" height="16" rx="5" fill="#fff"/><rect x="16" y="-34" width="16" height="10" rx="3" fill="#fff59d" stroke="#fff" stroke-width="2"/>' +
      '<rect x="-42" y="-26" width="84" height="58" rx="14" fill="#fff"/><rect x="-42" y="-26" width="84" height="14" rx="7" fill="#ffe0ef"/><rect x="-42" y="18" width="84" height="14" rx="7" fill="#f3d4e2" opacity=".7"/>' +
      '<circle cx="0" cy="4" r="22" fill="#ad1457"/><circle cx="0" cy="4" r="17" fill="#ff5fa2"/><circle cx="0" cy="4" r="10" fill="#4a148c"/>' +
      '<circle cx="-5" cy="-1" r="4.5" fill="#fff" opacity=".9"/><circle cx="5" cy="9" r="2" fill="#fff" opacity=".7"/><circle cx="-31" cy="-14" r="4" fill="#ff5fa2"/>',
  };
  ICONS.mute = ICONS.music + '<path d="M-34,-34 L34,34" stroke="#ff5252" stroke-width="8" stroke-linecap="round"/>';
  const emojiIcon = (e, size = 60) => `<text y="${size * .35}" text-anchor="middle" font-size="${size}">${e}</text>`;
  // Color más oscuro del mismo tono (para el borde de abajo que da relieve).
  const darker = (hex, k = .72) => '#' + [1, 3, 5].map(i => Math.round(parseInt(hex.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('');
  // Botón redondo con relieve: base oscura abajo, borde blanco, luz arriba, sombra suave y el dibujo con sombrita.
  // El primer <g> dentro del botón es el del ícono (la música lo cambia con '#musicBtn g g').
  const button = (id, x, y, icon, fill = '#66bb6a', r = 54, cls = '') => {
    const d = /^#[0-9a-f]{6}$/i.test(fill) ? darker(fill) : fill;
    return `<g id="${id}" transform="translate(${x},${y})"><g class="${cls}">` +
      `<ellipse cy="${(r * .92).toFixed(1)}" rx="${(r * .9).toFixed(1)}" ry="${(r * .2).toFixed(1)}" fill="#0b3016" opacity=".22"/>` +
      `<circle cy="${(r * .1).toFixed(1)}" r="${r + 3}" fill="${d}"/>` +
      `<circle r="${r}" fill="${fill}" stroke="#fff" stroke-width="6"/><circle r="${r - 3}" fill="url(#shade)"/>` +
      `<path d="M${(-r * .78).toFixed(1)},${(r * .3).toFixed(1)} A${(r * .82).toFixed(1)},${(r * .82).toFixed(1)} 0 0 0 ${(r * .78).toFixed(1)},${(r * .3).toFixed(1)}" stroke="${d}" stroke-width="${(r * .08).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".45"/>` +
      `<ellipse cy="${(-r * .45).toFixed(1)}" rx="${(r * .62).toFixed(1)}" ry="${(r * .32).toFixed(1)}" fill="url(#gloss)"/>` +
      `<circle cx="${(-r * .5).toFixed(1)}" cy="${(-r * .5).toFixed(1)}" r="${(r * .07).toFixed(1)}" fill="#fff" opacity=".85"/>` +
      `<g transform="scale(${(r / 54).toFixed(2)})" filter="url(#iconShadow)">${ICONS[icon] || emojiIcon(icon)}</g></g></g>`;
  };
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
    return `<rect x="-226" y="-262" width="460" height="540" rx="14" fill="#3e2a12" opacity=".18"/>
      <rect x="-230" y="-270" width="460" height="540" rx="14" fill="url(#paper)" filter="url(#shadow)"/>
      <rect x="-230" y="-270" width="460" height="540" rx="14" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
      <rect x="-200" y="-240" width="400" height="400" fill="url(#photoSky)"/><circle cx="140" cy="-190" r="90" fill="url(#sunGlow)"/>
      <path d="M-200,-120 C-150,-150 -110,-110 -60,-130 C-20,-146 20,-120 60,-128 L60,-240 L-200,-240 Z" fill="#fff" opacity=".18"/>
      <path d="M-200,90 C-100,70 60,96 200,74 L200,160 L-200,160 Z" fill="url(#grass)"/>
      <path d="M-200,98 C-100,78 60,104 200,82" stroke="#b9f6a8" stroke-width="4" fill="none" opacity=".7"/>
      <rect x="-200" y="-240" width="400" height="400" fill="url(#shade)" opacity=".5"/>
      <g transform="translate(-160,150) scale(.4)">${Art.juju({ accessory: accessory() })}</g>
      <g transform="translate(165,150) scale(.4)">${Art.sofia({ cheer: true })}</g>
      <g transform="translate(0,40)">${Art.family(L.id, 230)}</g>
      <path d="M-20,-190 C-50,-215 -40,-240 -20,-226 C0,-240 10,-215 -20,-190 Z" fill="url(#heartG)" stroke="#fff" stroke-width="3"/>
      <rect x="-200" y="-240" width="400" height="400" fill="url(#sheen)" opacity=".8"/>
      <rect x="-200" y="-240" width="400" height="400" fill="none" stroke="#3e2a12" stroke-width="3" opacity=".18"/>
      <text y="225" text-anchor="middle" font-size="34" font-weight="800" fill="#5d4037">${L.name}</text>
      <path d="M-120,242 Q0,252 120,242" stroke="#ffb3d1" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
      <g transform="rotate(-4)"><rect x="-70" y="-290" width="140" height="42" rx="6" fill="#ffd6e9" opacity=".85"/>
        <path d="M-50,-290 L-62,-248 M-20,-290 L-32,-248 M10,-290 L-2,-248 M40,-290 L28,-248 M70,-288 L58,-248" stroke="#fff" stroke-width="7" opacity=".45"/>
        <path d="M-70,-290 l6,6 l-6,6 l6,6 l-6,6 l6,6 l-6,6 M70,-290 l-6,6 l6,6 l-6,6 l6,6 l-6,6 l6,6" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/></g>`;
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
      ${Art.flit(300, 420, '#ff8ac0', .55)}${Art.flit(1010, 380, '#ffd23f', .5, -7)}
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
      ${Art.mapWorld()}
      <path d="${river}" stroke="#2f8a3c" stroke-width="134" fill="none" stroke-linecap="round" opacity=".3"/>
      <path d="${river}" stroke="#e8d39a" stroke-width="116" fill="none" stroke-linecap="round" opacity=".95"/>
      <path d="${river}" stroke="#1e88e5" stroke-width="92" fill="none" stroke-linecap="round"/>
      <path d="${river}" stroke="#5ccbff" stroke-width="64" fill="none" stroke-linecap="round"/>
      <path d="${river}" stroke="#a8e8ff" stroke-width="20" fill="none" stroke-linecap="round" opacity=".5"/>
      <path class="flow" d="${river}" stroke="#e1f5fe" stroke-width="6" fill="none" stroke-dasharray="20 30"/>
      ${STOPS.slice(1).map(([x, y], k) => Art.glint((x + STOPS[k][0]) / 2 + 14, (y + STOPS[k][1]) / 2 - 12, 1.1, -k * .45)).join('')}
      <rect width="1600" height="900" fill="url(#vignette)" pointer-events="none"/>
      ${markers}
      ${Art.mapSky()}
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
      // Frasco de vidrio: sombra, mermelada con burbujitas, reflejos, tapa de madera con listón y etiqueta de fresa.
      const top = (52 - 104 * f).toFixed(0), h = (104 * f).toFixed(0);
      $('#jar').innerHTML = `<ellipse cy="66" rx="50" ry="9" fill="#0b3016" opacity=".2"/>
        <rect x="-50" y="-60" width="100" height="120" rx="24" fill="rgba(255,255,255,.45)" stroke="#fff" stroke-width="6"/>
        ${f > 0 ? `<rect x="-42" y="${top}" width="84" height="${h}" rx="16" fill="#ff7043"/><rect x="-42" y="${top}" width="84" height="${Math.min(10, +h)}" rx="5" fill="#ffab91"/>
        <rect x="14" y="${top}" width="28" height="${h}" rx="14" fill="#bf360c" opacity=".25"/>
        <circle cx="-20" cy="${Math.min(40, +top + 20)}" r="4" fill="#fff" opacity=".5"/><circle cx="10" cy="${Math.min(46, +top + 34)}" r="3" fill="#fff" opacity=".45"/>` : ''}
        <rect x="-50" y="-60" width="100" height="120" rx="24" fill="url(#glassG)"/>
        <rect x="-38" y="-48" width="10" height="84" rx="5" fill="#fff" opacity=".6"/>
        <rect x="-38" y="-80" width="76" height="24" rx="9" fill="url(#wood)" stroke="#6d4320" stroke-width="3"/><path d="M-38,-62 L38,-62" stroke="#ff5fa2" stroke-width="5"/>
        <circle cx="0" cy="8" r="28" fill="#fff" opacity=".85"/><g transform="translate(0,10) scale(.55)">${Art.fruit('fresa')}</g>`;
    }
    drawJar();
    let lane = 1, raftY = LANES[1], t = 0, nextSpawn = 2.2, last = performance.now(), done = false, bumps = 0, raf = 0;
    const objs = [];
    const ok = alive();
    function spawn() {
      const log = Math.random() < .35;
      const g = mk('g');
      // Fruta dibujada flotando: anillo de agua, brillo suave y una chispita que titila.
      g.innerHTML = log ? `<g class="obj">${Art.log()}</g>` : `<g class="obj"><ellipse cy="36" rx="46" ry="10" fill="#fff" opacity=".35"/><circle r="56" fill="url(#haloG)" opacity=".55"/>
        <g class="bob"><g transform="scale(1.05)">${Art.fruit(Art.FRUITS[Math.floor(Math.random() * Art.FRUITS.length)])}</g>
        <g transform="translate(32,-38)">${Art.star4(11, 'twinkle')}</g></g></g>`;
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
      burst(o.x, LANES[o.lane], .7);
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
        <circle r="85" fill="transparent"/>${Art.halo(84)}
        <g pointer-events="none"><g transform="translate(0,46)">${Art.contact(46, 0, .16)}</g></g>
        <g class="wiggle" style="animation-delay:${k * .4}s"><g class="idle" style="animation-delay:${k * .3}s">${Art.clue(L.clue)}</g></g>
        <g pointer-events="none">${Art.leaf(-80, 40, .7, -20, '#2e7d32')}${Art.leaf(70, 46, .6, 200, '#388e3c')}</g></g>`).join('')}</g>
      <g id="mom"><g>${Art.animal(L.id)}</g></g>
      <g id="baby"></g>
      <g id="playFront"></g>
      ${Art.foreground()}
      <g id="counter"><rect x="604" y="30" width="392" height="104" rx="30" fill="#0b3016" opacity=".16"/><rect x="608" y="28" width="384" height="100" rx="28" fill="rgba(255,255,255,.35)" stroke="#fff" stroke-width="4"/>
        ${[0, 1, 2].map(k => `<g transform="translate(${680 + k * 120},80)"><rect x="-48" y="-38" width="96" height="76" rx="18" fill="#fff" opacity=".55"/><rect x="-48" y="-38" width="96" height="22" rx="11" fill="#fff" opacity=".5"/>
          <rect x="-48" y="-38" width="96" height="76" rx="18" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="10 7"/><g id="slot${k}"></g></g>`).join('')}</g>
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
      mk, countPop, hearts, confetti, flash, burst, NUM, NUM_M, Hint, rescued: () => state.rescued.slice(),
    };

    $$('.clue').forEach(el => onTap(el, () => {
      if (phase !== 'clues' || el.dataset.done) return;
      el.dataset.done = '1';
      Sound.sfx.shutter(); flash();
      burst(L.clues[+el.dataset.k].x, L.clues[+el.dataset.k].y);
      el.querySelector('.halo').remove();
      const w = el.querySelector('.wiggle');
      w.removeAttribute('style'); w.setAttribute('class', 'snapped');
      later(() => el.remove(), 650);
      $('#slot' + found).innerHTML = `<g class="pop-in"><g transform="scale(.6)">${Art.clue(L.clue)}</g></g>
        <g transform="translate(36,26)"><g class="pop-in"><circle cy="3" r="18" fill="#2e7d32"/><circle r="17" fill="#66bb6a" stroke="#fff" stroke-width="4"/><ellipse cy="-7" rx="10" ry="5" fill="#fff" opacity=".4"/><path d="M-7,0 L-2,6 L8,-6" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
      found++;
      if (found === 3) { phase = 'found'; Hint.clear(); say(L.clueLines[2], () => later(reveal, 300)); }
      else say(L.clueLines[found - 1]);
    }));

    function reveal() {
      phase = 'help';
      place(babyEl, L.baby);
      babyEl.innerHTML = `<circle cy="-90" r="150" fill="transparent"/>${Art.halo(140, { cy: -80 })}<g class="pop-in">${Art.animal(L.id, 'sad')}</g>`;
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
        burst(babyEl._pos.x, babyEl._pos.y - 70, .8);
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
      burst(babyEl._pos.x, babyEl._pos.y - 60 * babyEl._pos.s, 1.3);
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
    // Algunos emojis se dibujan con el mismo estilo del juego para que se vean igual en todos lados.
    const DRAWN = {
      '🦋': () => `<g transform="translate(0,6) scale(2.9)">${Art.butterfly('#ba68c8')}</g>`,
      '🐢': () => `<g transform="translate(-12,14)">${Art.thumb('tortuga', 250)}</g>`,
      '🍌': () => `<g transform="scale(2.4)">${Art.fruit('platano')}</g>`,
      '🍉': () => `<g transform="translate(0,-10) scale(2.5)">${Art.fruit('sandia')}</g>`,
      '🐇': () => Art.bunny(),
    };
    // Color: gota de pintura brillante. Animal: su dibujo. Emoji: dibujo propio si lo hay.
    const draw = (o) => o.color ? `<ellipse cx="0" cy="84" rx="76" ry="12" fill="#0b3016" opacity=".12"/>
        <path d="M0,-92 C40,-60 86,-20 86,22 A86,70 0 0 1 -86,22 C-86,-20 -40,-60 0,-92 Z" fill="${o.color}" stroke="${darker(o.color, .7)}" stroke-width="5"/>
        <path d="M86,22 A86,70 0 0 1 -86,22 C-60,62 60,62 86,22 Z" fill="#000" opacity=".12"/>
        <ellipse cx="-34" cy="-6" rx="16" ry="30" fill="#fff" opacity=".55" transform="rotate(30 -34 -6)"/><circle cx="-14" cy="-44" r="7" fill="#fff" opacity=".7"/>`
      : o.animal ? `<g transform="translate(0,70)">${Art.contact(80, 0, .14)}</g>${Art.thumb(o.animal, 190)}`
      : DRAWN[o.emoji] ? DRAWN[o.emoji]() : `<text y="60" text-anchor="middle" font-size="170">${o.emoji}</text>`;
    const flip = Math.random() < .5;
    const opts = flip ? [Q.wrong, Q.right] : [Q.right, Q.wrong];
    const layer = mk('g');
    // Tarjetas con relieve: base de color, papel, brillo de esquina y marco dorado.
    layer.innerHTML = `<rect width="1600" height="900" fill="url(#dimG)"/>
      <g transform="translate(800,470)" pointer-events="none">${Art.rays(560, 18, '#fff59d', .1)}</g>
      <g transform="translate(800,250)" pointer-events="none"><g class="bob"><circle cy="6" r="58" fill="#0b3016" opacity=".25"/><circle r="56" fill="#fff" stroke="#ffd23f" stroke-width="8"/>
        <text y="34" text-anchor="middle" font-size="96" font-weight="800" fill="#ff9800" stroke="#fff" stroke-width="4" paint-order="stroke">?</text></g></g>` + opts.map((o, k) =>
      `<g class="qopt" data-ok="${o === Q.right ? 1 : 0}" transform="translate(${560 + k * 480},470)"><g class="qin"><g class="qbob" style="animation-delay:${k * -1.3}s">
        <rect x="-150" y="-138" width="300" height="300" rx="30" fill="#0b3016" opacity=".25"/>
        <rect x="-150" y="-150" width="300" height="300" rx="30" fill="#f5a623"/>
        <rect x="-150" y="-158" width="300" height="300" rx="30" fill="url(#cardG)" stroke="#ffd23f" stroke-width="10"/>
        <rect x="-134" y="-142" width="268" height="268" rx="22" fill="none" stroke="#fff" stroke-width="4" opacity=".9"/>
        <g transform="translate(0,-8)">${draw(o)}</g>
        <path d="M-128,-118 Q-128,-136 -110,-136 L40,-136 Q-60,-110 -128,10 Z" fill="#fff" opacity=".35"/>
        <g class="qmark"></g></g></g></g>`).join('');
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
        const x = +el.getAttribute('transform').match(/\(([\d.]+)/)[1];
        // Palomita verde con brillo y festejo.
        el.querySelector('.qmark').innerHTML = `<g transform="translate(118,-128)"><g class="pop-in"><circle cy="5" r="44" fill="#1b5e20"/><circle r="44" fill="#43a047" stroke="#fff" stroke-width="7"/>
          <ellipse cy="-18" rx="26" ry="12" fill="#fff" opacity=".35"/><path d="M-20,0 L-6,15 L22,-16" stroke="#fff" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
        burst(x, 470, 1.6);
        hearts(x, 400);
        say(Q.yes, () => later(done, 300));
      } else {
        Sound.sfx.tick();
        restart(el.firstElementChild, 'shake');
        right.firstElementChild.setAttribute('class', 'qin pulse');
        say(Q.show);
      }
    }));
  }

  // ---------- Minijuego 1: nubes que llenan el charco ----------
  function setupFrog(api) {
    const CLOUDS = [[700, 240], [985, 225], [1270, 240]];
    api.back.innerHTML = CLOUDS.map(([x, y], k) => `<g class="cloud" data-k="${k}" transform="translate(${x},${y})">${Art.halo(0, { rx: 165, ry: 105 })}<g class="drift" style="animation-delay:${-k * 2}s"><g class="pop-in cloud-art">${Art.cloud(true)}</g></g></g>`).join('') +
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
      <circle r="70" fill="transparent"/>${Art.halo(76)}<g class="pop-in"><g class="grow bud-art" style="transform:scale(.4)">
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
      burst(x, y, .8);
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
    // Rollito de liana: espiral de bejuco con hojitas, brillo alrededor.
    api.front.innerHTML = `<g id="bundle" transform="translate(${X},${TOP})"><circle r="80" fill="transparent"/>${Art.halo(78)}<g class="pulse">
      <circle cy="4" r="46" fill="#1b5e20"/><circle r="46" fill="#43a047" stroke="#c6ff3a" stroke-width="7"/>
      <path d="M0,0 m-6,0 a6,6 0 1 1 12,0 a12,12 0 1 1 -24,0 a18,18 0 1 1 36,0 a24,24 0 1 1 -48,0 a30,30 0 1 1 60,0" stroke="#2e7d32" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M0,0 m-6,0 a6,6 0 1 1 12,0 a12,12 0 1 1 -24,0 a18,18 0 1 1 36,0 a24,24 0 1 1 -48,0" stroke="#8bc34a" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>
      <ellipse cx="-16" cy="-22" rx="14" ry="7" fill="#fff" opacity=".35" transform="rotate(-30 -16 -22)"/>
      ${Art.leaf(30, -30, .32, -40, '#7cb342')}${Art.leaf(-34, 30, .3, 150, '#66bb6a')}</g></g>`;
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
      <g id="camGlow" transform="translate(800,790)">${Art.halo(124)}</g>
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
      $('#camGlow').remove();
      burst(800, 790, 1.4);
      // La foto sale con un brillo que la cruza.
      $('#shot').innerHTML = `<rect width="1600" height="900" fill="url(#dimG)"/>
        <g transform="translate(560,450)"><g class="pop-in"><g transform="rotate(-4)">${polaroid(L)}
          <g clip-path="url(#photoClip)"><rect class="sweep" x="-200" y="-240" width="400" height="400" fill="url(#sheen)"/></g></g></g></g>
        <g id="giftSpot"></g>`;
      say(['¡Clic! Esta foto es tuya para siempre.', L.fact], () => {
        Sound.sfx.chime();
        // Regalito sobre rayos de sol que giran, con estrellitas alrededor.
        $('#giftSpot').innerHTML = `<g transform="translate(1150,420)" pointer-events="none"><g class="rays-spin">${Art.rays(240, 16, '#fff59d', .5)}</g></g>
          <g transform="translate(1150,420)"><g class="pop-in"><circle cy="10" r="150" fill="#f5a623"/><circle r="150" fill="url(#cardG)" stroke="#ffd23f" stroke-width="10" filter="url(#shadow)"/>
            <circle r="128" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/><circle r="140" fill="url(#shade)" opacity=".5"/>
            <g transform="scale(1.6)">${Art.gift(L.id)}</g><ellipse cx="-56" cy="-84" rx="46" ry="20" fill="#fff" opacity=".5" transform="rotate(-30 -56 -84)"/></g></g>
          ${[[-170, -120, 22], [160, -150, 18], [190, 90, 24], [-180, 110, 16]].map(([dx, dy, r], k) => `<g transform="translate(${1150 + dx},${420 + dy})" pointer-events="none">${Art.star4(r, 'twinkle', `animation-delay:${k * .4}s`)}</g>`).join('')}`;
        burst(1150, 420, 1.5);
        say([L.gift, 'Y el bebé quiere acompañarnos en la balsa hasta la fiesta del final del río. ¡Súbete!'], () => {
          $('#giftSpot').insertAdjacentHTML('beforeend', `<g transform="translate(1150,760)">${Art.halo(112)}</g>` + button('nextBtn', 1150, 760, '🛶', '#66bb6a', 80, 'pulse'));
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
      // Papel picado: banderita con sombra, recortes (flor y rombos) y luz de un lado.
      return `<path d="M${x - 34},${y} L${x + 34},${y} L${x + 34},${y + 54} L${x + 17},${y + 46} L${x},${y + 54} L${x - 17},${y + 46} L${x - 34},${y + 54} Z" fill="${colors[k % 6]}"/>
        <path d="M${x + 6},${y} L${x + 34},${y} L${x + 34},${y + 54} L${x + 17},${y + 46} L${x + 6},${y + 51} Z" fill="#000" opacity=".1"/>
        <circle cx="${x}" cy="${y + 22}" r="8" fill="#fff" opacity=".6"/><path d="M${x},${y + 8} l3,6 l-3,6 l-3,-6 Z M${x},${y + 36} l3,-6 l-3,-6 l-3,6 Z M${x - 14},${y + 22} l6,-3 l6,3 l-6,3 Z M${x + 14},${y + 22} l-6,-3 l-6,3 l6,3 Z" fill="#fff" opacity=".55"/>
        <path d="M${x - 26},${y + 40} h6 M${x + 20},${y + 40} h6 M${x - 26},${y + 8} h6 M${x + 20},${y + 8} h6" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/>`;
    }).join('');
    sceneEl.innerHTML = `
      ${LEVELS[LEVELS.length - 1].bg()}
      <path d="M130,34 Q800,90 1600,34" stroke="#8d5a2b" stroke-width="4" fill="none"/>${flags}
      ${[[330, 200], [640, 170], [960, 180], [1280, 200], [400, 470], [1300, 450], [100, 420], [1520, 420]].map(([x, y], k) => `<g transform="translate(${x},${y})" pointer-events="none">${Art.star4(14 + (k % 3) * 5, 'twinkle', `animation-delay:${(k * .37).toFixed(2)}s`)}</g>`).join('')}
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
      $('#fBtn').innerHTML = `<g transform="translate(760,650)">${Art.halo(124)}</g>` + button('camBtn', 760, 650, 'camera', '#ff5fa2', 90, 'pulse');
      Hint.set(() => phase === 'photo' && { x: 760, y: 650, say: 'Toca la cámara, Juju.' });
      onTap($('#camBtn'), () => {
        if (phase !== 'photo') return;
        phase = 'medal';
        Hint.clear();
        Sound.sfx.shutter(); flash();
        burst(760, 650, 1.4);
        $('#fBtn').innerHTML = '';
        say(['¡Clic! ¡Qué foto tan bonita!', 'Mamá leona te trae algo especial. ¡Tócalo!'], showMedal);
      });
    };
    // Medalla de Rescatadora Oficial
    const showMedal = () => {
      if (phase !== 'medal' || $('#medalBtn')) return;
      // Medalla dorada sobre rayos de luz, colgada de su listón y meciéndose.
      $('#fBtn').innerHTML = `<g transform="translate(760,640)" pointer-events="none"><g class="rays-spin">${Art.rays(230, 16, '#fff59d', .55)}</g></g>
        <g id="medalBtn" transform="translate(760,640)"><circle r="130" fill="transparent"/>${Art.halo(128)}<g class="pulse">
        <circle r="108" fill="#0b3016" opacity=".18" cy="10"/><circle r="104" fill="url(#cardG)" stroke="#ffb300" stroke-width="8"/><circle r="92" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>
        <g transform="translate(0,26) scale(.95)"><g class="swing">${Art.medal()}</g></g></g></g>
        ${[[-150, -90, 22], [150, -110, 18], [170, 80, 20], [-160, 100, 16]].map(([dx, dy, r], k) => `<g transform="translate(${760 + dx},${640 + dy})" pointer-events="none">${Art.star4(r, 'twinkle', `animation-delay:${k * .4}s`)}</g>`).join('')}`;
      Hint.set(() => phase === 'medal' && { x: 760, y: 640, say: 'Toca la medalla, Juju.' });
      onTap($('#medalBtn'), () => {
        if (phase !== 'medal') return;
        phase = 'done';
        state.finaleDone = true; save();
        Hint.clear();
        Sound.sfx.win(); confetti();
        burst(760, 640, 1.8);
        $('#fBtn').innerHTML = '';
        $('#fJuju').innerHTML = `<g class="pop-in">${Art.juju({ accessory: accessory(), cheer: true, medal: true })}</g>`;
        hearts(1010, 600);
        say(['¡Juju, eres la Rescatadora Oficial de la selva!', 'Cuidaste a todos los bebés con mucho cariño.', 'Ve a contarle a mamá Marcela y a papá Checo.', '¡Y ruge suavecito como el leoncito! ¡Miau-grr!'], () => {
          $('#fBtn').innerHTML = `<g transform="translate(760,650)">${Art.halo(112)}</g>` + button('endBtn', 760, 650, 'home', '#7e57c2', 80, 'pulse');
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
    // Fondo de cada foto: cielo, sol, nube y lomas (doradas en la sabana del león).
    const photoBack = (lion) => `<circle cx="72" cy="-92" r="28" fill="#ffd54f" opacity=".3"/><circle cx="72" cy="-92" r="19" fill="#ffd54f"/>
        <g fill="#fff" opacity=".92"><ellipse cx="-58" cy="-96" rx="26" ry="11"/><ellipse cx="-44" cy="-104" rx="16" ry="11"/><ellipse cx="-72" cy="-101" rx="13" ry="9"/></g>
        <path d="M-110,20 C-60,0 -20,15 30,5 C60,-2 90,10 110,2 L110,70 L-110,70 Z" fill="${lion ? '#edc76f' : '#7cc96b'}"/>
        <path d="M-110,46 C-50,32 20,48 110,34 L110,70 L-110,70 Z" fill="${lion ? '#dba945' : '#58b04f'}"/>`;
    LEVELS.forEach((L, i) => {
      const x = 260 + (i % 4) * 360, y = 370 + Math.floor(i / 4) * 330;
      const done = !L.soon && isRescued(L.id), lion = i === LEVELS.length - 1;
      slots += `<g class="slot" data-i="${i}" transform="translate(${x},${y})"><g transform="rotate(${i % 2 ? 3 : -3})">
        <rect x="-125" y="-145" width="250" height="290" rx="10" fill="#fff" stroke="${lion ? '#ffb300' : '#e0d6c8'}" stroke-width="${lion ? 8 : 3}" filter="url(#shadow)"/>
        <rect x="-110" y="-130" width="220" height="200" fill="${done ? 'url(#photoSky)' : lion ? '#fff3c4' : '#eceff1'}"/>
        ${done ? `${photoBack(lion)}<g transform="translate(0,-25)">${Art.family(L.id, 190)}</g><text y="118" text-anchor="middle" font-size="30" font-weight="800" fill="#5d4037">${L.name.split(' ')[0]}</text>`
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
      clearTimeout(hold);
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
