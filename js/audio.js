// Sonidos, música y la voz de Sofía. Los sonidos se generan en el navegador; la voz usa las
// grabaciones de Luciana cuando existen y, si no, la voz del navegador.

const Sound = (() => {
  let ctx = null, master = null, musicBus = null;
  let musicOn = false, timer = null, nextNote = 0, step = 0;

  // Safari solo deja sonar audio después de un toque: se llama en el primer clic.
  function unlock() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      musicBus = ctx.createGain();
      musicBus.gain.value = 0.10;
      musicBus.connect(master);
    }
    if (ctx.state !== 'running') ctx.resume();
    if (musicOn && !timer) startMusic();
  }
  // iPhone: que el modo silencio no apague solo una parte del sonido, y reactivar al volver a la app.
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) { clearInterval(timer); timer = null; }
    else { ctx.resume(); if (musicOn && !timer) startMusic(); }
  });

  function play(freq, t, dur, { type = 'sine', vol = 0.3, slide = null, dest = master } = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function tone(freq, delay, dur, opts) {
    if (ctx) play(freq, ctx.currentTime + delay, dur, opts);
  }
  function noise(delay, dur, { vol = 0.3, freq = 1000, q = 1, type = 'bandpass' } = {}) {
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t);
  }

  const sfx = {
    // Toque general: un "tic" suave y alegre en cada botón o cosa que se toca.
    tap: () => { tone(880, 0, 0.07, { vol: 0.12, slide: 1320 }); },
    // La balsa sube o baja: chapoteo de agua y un tonito que sube o baja con ella.
    raftUp: () => { noise(0, 0.25, { vol: 0.28, freq: 700, q: 0.7, type: 'lowpass' }); tone(330, 0, 0.18, { type: 'triangle', vol: 0.16, slide: 560 }); },
    raftDown: () => { noise(0, 0.25, { vol: 0.28, freq: 600, q: 0.7, type: 'lowpass' }); tone(560, 0, 0.18, { type: 'triangle', vol: 0.16, slide: 330 }); },
    tick: () => tone(700, 0, 0.06, { vol: 0.06 }),
    pop: () => tone(520, 0, 0.12, { vol: 0.25, slide: 900 }),
    shutter: () => { noise(0, 0.05, { vol: 0.6, freq: 3200 }); noise(0.08, 0.07, { vol: 0.45, freq: 2000 }); },
    boing: () => { tone(160, 0, 0.4, { type: 'triangle', vol: 0.35, slide: 480 }); tone(480, 0.15, 0.25, { type: 'triangle', vol: 0.15, slide: 240 }); },
    chime: () => { tone(988, 0, 0.25, { vol: 0.2 }); tone(1319, 0.08, 0.3, { vol: 0.2 }); },
    oops: () => { tone(330, 0, 0.15, { type: 'triangle', vol: 0.2 }); tone(262, 0.15, 0.25, { type: 'triangle', vol: 0.2 }); },
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.4, { type: 'triangle', vol: 0.25 })),
    rain: () => noise(0, 1.5, { vol: 0.22, freq: 4000, q: 0.4, type: 'highpass' }),
    splash: () => noise(0, 0.35, { vol: 0.35, freq: 700, q: 0.8, type: 'lowpass' }),
    snip: () => { noise(0, 0.06, { vol: 0.5, freq: 5000 }); tone(1200, 0, 0.08, { type: 'square', vol: 0.06 }); },
    whoosh: () => noise(0, 0.45, { vol: 0.25, freq: 900, q: 0.6 }),
    sparkle: () => [1568, 2093, 2637].forEach((f, i) => tone(f, i * 0.07, 0.2, { vol: 0.07 })),
    frog: () => { tone(160, 0, 0.18, { type: 'square', vol: 0.12, slide: 90 }); tone(150, 0.26, 0.2, { type: 'square', vol: 0.12, slide: 85 }); },
    toucan: () => [0, 0.13, 0.26].forEach(d => tone(950, d, 0.1, { type: 'sawtooth', vol: 0.08, slide: 600 })),
    sloth: () => tone(1300, 0, 0.7, { vol: 0.12, slide: 1900 }),
    // Paradas 4 a 8 (sonidos suaves: nada de rugidos fuertes)
    monkey: () => [0, 0.16, 0.36, 0.52].forEach((d, i) => tone(i < 2 ? 520 : 760, d, 0.14, { type: 'triangle', vol: 0.14, slide: i < 2 ? 700 : 1000 })),
    macaw: () => { tone(1100, 0, 0.18, { type: 'sawtooth', vol: 0.06, slide: 1600 }); tone(1300, 0.22, 0.16, { type: 'sawtooth', vol: 0.05, slide: 900 }); },
    tapir: () => { tone(1800, 0, 0.35, { vol: 0.1, slide: 2400 }); tone(2000, 0.4, 0.3, { vol: 0.08, slide: 1500 }); },
    jaguar: () => { noise(0, 0.6, { vol: 0.16, freq: 180, q: 2, type: 'lowpass' }); tone(95, 0, 0.6, { type: 'triangle', vol: 0.12, slide: 75 }); },
    lion: (v = 1) => { v = Math.max(0.1, Math.min(1, v)); noise(0, 0.9, { vol: 0.14 * v, freq: 240, q: 1.5, type: 'lowpass' }); tone(150, 0, 0.9, { type: 'triangle', vol: 0.12 * v, slide: 90 }); },
    sneeze: () => { tone(500, 0, 0.25, { type: 'triangle', vol: 0.15, slide: 900 }); noise(0.3, 0.25, { vol: 0.35, freq: 2500, q: 0.7 }); },
    plop: () => { tone(300, 0, 0.18, { vol: 0.3, slide: 90 }); noise(0.05, 0.3, { vol: 0.3, freq: 500, type: 'lowpass' }); },
  };

  // Música alegre de marimba con notas al azar de una escala que siempre suena bonita.
  const MELODY = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  const BASS = [130.81, 174.61, 196.0, 130.81];
  function schedule() {
    // Si la pestaña estuvo dormida, no tocar de golpe todas las notas atrasadas.
    if (nextNote < ctx.currentTime) nextNote = ctx.currentTime + 0.05;
    while (nextNote < ctx.currentTime + 0.25) {
      const beat = step % 8, root = BASS[Math.floor(step / 8) % 4];
      if (beat === 0) play(root, nextNote, 0.9, { type: 'triangle', vol: 0.35, dest: musicBus });
      if (beat === 4) play(root * 1.5, nextNote, 0.5, { type: 'triangle', vol: 0.2, dest: musicBus });
      if (Math.random() < 0.55) play(MELODY[Math.floor(Math.random() * MELODY.length)], nextNote, 0.3, { vol: 0.25, dest: musicBus });
      nextNote += 0.28;
      step++;
    }
  }
  function startMusic() {
    nextNote = ctx.currentTime + 0.1;
    timer = setInterval(schedule, 100);
  }
  function setMusic(on) {
    musicOn = on;
    clearInterval(timer);
    timer = null;
    if (on && ctx) startMusic();
  }
  // Baja la música mientras habla Sofía.
  function duck(on) {
    if (musicBus) musicBus.gain.setTargetAtTime(on ? 0.035 : 0.10, ctx.currentTime, 0.2);
  }

  // Reproduce un archivo de audio grabado (por ejemplo, la voz de Luciana) por el mismo canal
  // de sonido, que en el iPhone ya quedó activado con el primer toque. Termina al acabar el audio.
  const buffers = {};
  function playFile(url) {
    if (!ctx) return Promise.reject(new Error('sin audio'));
    const load = buffers[url] || (buffers[url] = fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(b => new Promise((ok, bad) => ctx.decodeAudioData(b, ok, bad))));
    load.catch(() => { delete buffers[url]; });
    return load.then(buf => new Promise(done => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(master);
      src.onended = done;
      const [from, to] = voiceSpan(buf);
      src.start(0, from, to - from);
      playing = src;
    }));
  }
  // Las notas de voz traen silencio al principio y al final: se salta, dejando un respiro corto.
  function voiceSpan(buf) {
    if (buf._span) return buf._span;
    const d = buf.getChannelData(0), rate = buf.sampleRate, win = Math.floor(rate * 0.02);
    let peak = 0;
    for (let i = 0; i < d.length; i += 64) peak = Math.max(peak, Math.abs(d[i]));
    const th = Math.max(0.02, peak * 0.08);
    const loud = (i) => { let m = 0; for (let k = i; k < Math.min(d.length, i + win); k += 8) m = Math.max(m, Math.abs(d[k])); return m > th; };
    let a = 0, b = d.length - win;
    while (a < b && !loud(a)) a += win;
    while (b > a && !loud(b)) b -= win;
    const from = Math.max(0, a / rate - 0.08), to = Math.min(buf.duration, (b + win) / rate + 0.25);
    buf._span = to - from > 0.3 ? [from, to] : [0, buf.duration];
    return buf._span;
  }
  let playing = null;
  function stopFile() { try { if (playing) playing.stop(); } catch (e) {} playing = null; }

  return { unlock, sfx, setMusic, duck, playFile, stopFile };
})();

const Voice = (() => {
  const synth = window.speechSynthesis || null;
  let voice = null, seq = 0;
  const api = { onLine: null, onDone: null, speaking: false };

  // Elige la voz en español que suene más natural: primero las "mejoradas" o "premium"
  // del aparato, luego las de Google, y al final cualquier voz de México.
  function score(v) {
    const n = v.name.toLowerCase(), lang = v.lang.replace('_', '-');
    if (!lang.toLowerCase().startsWith('es')) return -1;
    let s = 0;
    if (/premium|mejorada|enhanced|neural|natural/.test(n)) s += 50;
    if (/google/.test(n)) s += 30;
    if (/paulina|m[oó]nica|marisol|sabina|angelica|ang[eé]lica|siri/.test(n)) s += 10;
    if (/eddy|flo|grandma|grandpa|rocko|reed|sandy|shelley|abuel/.test(n)) s -= 40;
    if (lang === 'es-MX') s += 8; else if (lang === 'es-US' || lang === 'es-419') s += 5; else if (lang === 'es-ES') s += 2;
    if (v.localService === false) s += 3;
    return s;
  }
  function pick() {
    const vs = synth.getVoices().filter(v => score(v) >= 0).sort((a, b) => score(b) - score(a));
    voice = vs[0] || null;
  }
  api.voiceName = () => (voice ? voice.name + ' (' + voice.lang + ')' : 'ninguna');
  if (synth) {
    pick();
    synth.addEventListener ? synth.addEventListener('voiceschanged', pick) : (synth.onvoiceschanged = pick);
  }

  // Grabaciones de Luciana: una frase con archivo en audio/frases.js se oye con su voz;
  // las demás, con la voz del navegador.
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9ñ ]/g, '').replace(/\s+/g, ' ').trim();
  const recorded = {};
  (window.FRASES || []).forEach(f => { if (f.file) recorded[norm(f.t)] = 'audio/' + f.file; });
  api.recordedCount = () => Object.keys(recorded).length;

  // Dice una o varias frases, una tras otra. Cada frase puede ser texto o {t, pitch, rate, who}
  // (who = quién habla, para el retrato del globo). onEnd se llama al terminar.
  api.say = (lines, onEnd) => {
    lines = [].concat(lines).filter(Boolean).map(l => typeof l === 'string' ? { t: l } : l);
    if (!lines.length) return;
    const my = ++seq;
    if (synth) synth.cancel();
    Sound.stopFile();
    api.speaking = true;
    Sound.duck(true);
    let idx = 0;
    const next = () => {
      if (my !== seq) return;
      if (idx >= lines.length) {
        api.speaking = false;
        Sound.duck(false);
        if (api.onDone) api.onDone();
        if (onEnd) onEnd();
        return;
      }
      const l = lines[idx++];
      if (api.onLine) api.onLine(l.t, l);
      // Si la voz se atora, seguir de todos modos para que el juego nunca se quede esperando.
      let moved = false;
      const go = () => { if (!moved) { moved = true; clearTimeout(safety); next(); } };
      const safety = setTimeout(go, l.t.length * 110 + 3000);
      const file = recorded[norm(l.t)];
      if (file) Sound.playFile(file).then(go, () => speak(l, go));
      else speak(l, go);
    };
    next();
  };

  function speak(l, done) {
    if (!synth) { setTimeout(done, l.t.length * 70 + 800); return; }
    if (!voice) pick();
    const u = new SpeechSynthesisUtterance(l.t);
    u.lang = voice ? voice.lang : 'es-MX';
    if (voice) u.voice = voice;
    u.rate = l.rate || 0.92;
    u.pitch = l.pitch || 1.08;
    u.onend = done;
    u.onerror = done;
    synth.speak(u);
  }

  // iPhone: la voz del navegador solo funciona si se "despierta" dentro de un toque. Como el juego
  // puede empezar con una voz grabada, se despierta en el primer toque con una frase muda.
  let awake = false;
  api.unlock = () => {
    if (awake || !synth) return;
    awake = true;
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; u.lang = 'es-MX'; synth.speak(u); } catch (e) {}
  };

  api.stop = () => {
    seq++;
    api.speaking = false;
    if (synth) synth.cancel();
    Sound.stopFile();
    Sound.duck(false);
    if (api.onDone) api.onDone();
  };

  return api;
})();
