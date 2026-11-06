// Paradas 4 a 8: monito araña, guacamaya, tapir, jaguar y león (el final).
// Mismos campos que las paradas 1 a 3 de game.js. Cada setup(api) arma su minijuego con
// las ayudas de la parada (api) y los dibujos de Art (js/art2.js).
(() => {
  // Reinicia una animación de una sola vez (sacudida, brinquito).
  const bump = (el, cls) => { if (!el) return; el.classList.remove(cls); el.getBoundingClientRect(); el.classList.add(cls); };
  const sfx = (name, ...a) => { if (window.Sound && Sound.sfx[name]) Sound.sfx[name](...a); };
  // La mamá tapir y la mamá leona no llevan las rayitas o manchitas de bebé.
  const MOM_STYLE = '<style>#mom .kid-only{display:none}</style>';

  // ---------- Minijuego 4: escondidas con el monito ----------
  function setupMonkey(api) {
    const BUSH = [[300, 705], [690, 722], [1080, 705]];
    const ORDER = [1, 2, 0];   // detrás de qué arbusto se esconde en cada vuelta
    const OTHERS = [
      ['¡Una mariposa!', Art.butterfly('#ba68c8')],
      ['¡Un pajarito!', Art.birdie('#4fc3f7')],
      ['¡Una ranita!', `<g transform="translate(0,40) scale(.4)">${Art.animal('rana')}</g>`],
    ];
    api.front.innerHTML = BUSH.map(([x, y], k) => `<g class="mbush" data-k="${k}" transform="translate(${x},${y})">
      <circle cy="-60" r="95" fill="transparent"/><g class="halo"><circle cy="-50" r="96" fill="#fff59d"/></g><g class="pop-in"><g class="bush-art">${Art.bush(0, 0, 1.1, ['#43a047', '#4caf50', '#388e3c'][k])}</g></g>
      <g class="tail" pointer-events="none"></g></g>`).join('');
    const bushes = [...api.front.querySelectorAll('.mbush')];
    let round = 0, phase = 'hide', other = 0;

    // El monito brinca detrás de un arbusto y solo se le ve la colita enroscada.
    function hide() {
      phase = 'hide';
      const b = ORDER[round], [x, y] = BUSH[b];
      api.setArt(api.baby, 'happy');
      sfx('monkey');
      api.moveTo(api.baby, { x, y: y - 4, s: .5 }, 900, 160, () => {
        api.baby.style.opacity = '0';
        bushes[b].querySelector('.tail').innerHTML = `<g transform="translate(84,-60)"><g class="pop-in"><g class="wiggle">${Art.monkeyTail()}</g></g></g>`;
        phase = 'seek';
        api.Hint.restart();
      });
    }
    bushes.forEach(b => api.tap(b, () => {
      if (phase !== 'seek') return;
      const k = +b.dataset.k, [x, y] = BUSH[k];
      bump(b.querySelector('.bush-art'), 'wobble');
      if (k !== ORDER[round]) {
        // Otro arbusto: sale otro animalito y Sofía anima a buscar la colita.
        sfx('pop');
        const [line, art] = OTHERS[other++ % OTHERS.length];
        const g = api.mk('g', { transform: `translate(${x},${y - 150})`, 'pointer-events': 'none' });
        g.innerHTML = `<g class="pop-in"><g class="bob">${art}</g></g>`;
        api.front.appendChild(g);
        api.later(() => g.firstChild.setAttribute('class', 'collect'), 1400);
        api.later(() => g.remove(), 1900);
        api.say([line, '¿Y el monito? Busca su colita.']);
        return;
      }
      // ¡Lo encontró!
      phase = 'found';
      round++;
      b.querySelector('.tail').innerHTML = '';
      sfx('monkey');
      api.place(api.baby, { x, y: y - 10, s: .5 });
      api.baby.style.opacity = '1';
      api.moveTo(api.baby, { y: y - 80 }, 500, 30);
      api.hearts(x, y - 160);
      api.countPop(round, x + 140, y - 170);
      if (round < 3) api.say([`¡${api.NUM_M[round]}! ¡Te encontré, monito!`, round === 1 ? '¡Otra vez! Ya se va a esconder.' : '¡Una vez más!'], () => api.later(hide, 300));
      else { api.Hint.clear(); api.say(['¡Tres! ¡Te encontré tres veces!', '¡Ahora sí, vamos con mamá!'], toMom); }
    }));

    // Brinca a la rama de mamá y, de sorpresa, se cuelga de cabeza con su cola.
    function toMom() {
      api.moveTo(api.baby, { x: 1000, y: 430, s: .5 }, 1300, 260, () => {
        api.baby.innerHTML = `<g class="wiggle" style="transform-origin:50% 0">${Art.animal('mono', 'hang')}</g>`;
        sfx('monkey');
        api.say(['¡Mira! ¡Se cuelga de cabeza con su cola!', '¡Qué gracioso, monito!'], () => api.later(() => {
          api.setArt(api.baby, 'happy');
          api.moveTo(api.baby, { x: 1212, y: 332, s: .42 }, 1000, 90, api.reunited);
        }, 300));
      });
    }

    api.later(hide, 200);
    api.hint(() => phase === 'seek' && { x: BUSH[ORDER[round]][0], y: BUSH[ORDER[round]][1] - 60, say: 'Busca la colita del monito, Juju.' });
  }

  // ---------- Minijuego 5: plumas de colores; mamá se acerca volando ----------
  function setupMacaw(api) {
    const SPOTS = [[300, 640, '#e53935'], [1060, 680, '#ffd23f'], [640, 500, '#1e88e5'], [1180, 560, '#e53935'], [460, 590, '#1e88e5']];
    const LINES = ['¡Una pluma roja! ¡Mamá ya viene!', '¡Dos! Una pluma amarilla.', '¡Tres! Una pluma azul.', '¡Cuatro! Otra pluma roja.'];
    const FLOWERS = ['#ff5fa2', '#ffd23f', '#ff8a65', '#ba68c8', '#ff5fa2'];
    const START = Object.assign({}, api.mom._pos), END = { x: 790, y: 702, s: .85 };
    api.front.innerHTML = SPOTS.map(([x, y], k) => `<g class="fspot" data-k="${k}" transform="translate(${x},${y})">
      <circle cy="-30" r="75" fill="transparent"/><g class="plume"></g>
      <g pointer-events="none">${Art.leaf(-74, 16, .5, -20, '#43a047')}${Art.leaf(66, 20, .45, 200, '#388e3c')}${Art.flower(-34, 4, FLOWERS[k], 1.7)}${Art.flower(32, 10, FLOWERS[(k + 2) % 5], 1.5)}${Art.flower(-2, 22, FLOWERS[(k + 1) % 5], 1.6)}</g></g>`).join('');
    const spots = [...api.front.querySelectorAll('.fspot')];
    let k = 0;
    // Ignora una pluma pendiente si ya se tocaron todas (toques muy rápidos).
    const show = () => { if (k >= SPOTS.length) return; spots[k].querySelector('.plume').innerHTML = `<g transform="translate(0,-36)"><g class="halo"><circle r="64" fill="#fff59d"/></g><g class="pop-in"><g class="wiggle">${Art.feather(0, 0, k % 2 ? 18 : -18, SPOTS[k][2])}</g></g></g>`; };
    spots.forEach((el, j) => api.tap(el, () => {
      if (j !== k || !el.querySelector('.plume').childNodes.length) return;
      k++;
      el.querySelector('.plume').innerHTML = '';
      sfx('chime');
      const [x, y] = SPOTS[j];
      api.countPop(k, x, y - 120);
      // Con cada pluma, mamá se acerca volando.
      const u = k / SPOTS.length;
      api.mom.firstChild.setAttribute('class', 'wiggle');
      sfx('macaw');
      api.moveTo(api.mom, { x: START.x + (END.x - START.x) * u, y: START.y + (END.y - START.y) * u, s: START.s + (END.s - START.s) * u }, 1300, 80, () => {
        if (k < SPOTS.length) api.mom.firstChild.setAttribute('class', '');
      });
      if (k < SPOTS.length) { api.say(LINES[k - 1]); api.later(show, 700); return; }
      api.Hint.clear();
      api.say(['¡Cinco! Otra pluma azul.', 'Una, dos, tres, cuatro, cinco. ¡Llegó mamá!'], () => {
        // Sorpresa: mamá y bebé bailan moviendo las alas.
        api.setArt(api.baby, 'happy', 'wiggle');
        api.mom.firstChild.setAttribute('class', 'wiggle');
        sfx('macaw');
        api.say('¡Mira! ¡Bailan moviendo las alas!', () => api.later(() => { api.mom.firstChild.setAttribute('class', ''); api.reunited(); }, 500));
      });
    }));
    api.later(show, 300);
    api.hint(() => k < SPOTS.length && { x: SPOTS[k][0], y: SPOTS[k][1] - 40, say: 'Toca la pluma que brilla, Juju.' });
  }

  // ---------- Minijuego 6: los bebés rescatados vienen a empujar al tapircito ----------
  const FRIEND = {
    rana: ['¡La ranita empuja!', 'frog', .42], tucan: ['¡El tucancito empuja!', 'toucan', .34],
    perezoso: ['¡El perezosito empuja!', 'sloth', .38], mono: ['¡El monito empuja!', 'monkey', .38],
    guacamaya: ['¡La guacamayita empuja!', 'macaw', .42], jaguar: ['¡El jaguarcito empuja!', 'jaguar', .38],
    leon: ['¡El leoncito empuja!', 'lion', .38],
  };
  function setupTapir(api) {
    let ids = api.rescued().filter(id => FRIEND[id]);
    for (const id of ['rana', 'tucan', 'perezoso']) if (ids.length < 3 && !ids.includes(id)) ids.push(id);
    ids = ids.slice(0, 5);
    const n = ids.length;
    const POS = ids.map((id, j) => [Math.round(590 + (j - (n - 1) / 2) * 92), 638 + Math.round(Math.abs(j - (n - 1) / 2) * 8)]);
    api.back.innerHTML = ids.map((id, j) => `<g class="friend" data-j="${j}" transform="translate(${POS[j][0]},${POS[j][1]})">
      <circle cy="-45" r="62" fill="transparent"/><g class="pop-in" style="animation-delay:${(j * .35).toFixed(2)}s"><g class="fr-art"><g transform="scale(${FRIEND[id][2]})">${Art.animal(id)}</g></g></g></g>`).join('');
    const friends = [...api.back.querySelectorAll('.friend')];
    api.baby.firstChild.setAttribute('class', '');
    let pushed = 0, phase = 'push';
    const nextFriend = () => friends.find(f => !f.dataset.done);
    const glowNext = () => { const f = nextFriend(); if (f && phase === 'push') f.querySelector('.fr-art').setAttribute('class', 'fr-art pulse'); };
    api.later(glowNext, n * 350 + 700);
    friends.forEach(f => api.tap(f, () => {
      if (phase !== 'push' || f.dataset.done) return;
      f.dataset.done = '1';
      pushed++;
      const j = +f.dataset.j, id = ids[j];
      friends.forEach(o => { if (!o.dataset.done) o.querySelector('.fr-art').setAttribute('class', 'fr-art'); });
      const art = f.querySelector('.fr-art');
      art.setAttribute('class', 'fr-art');
      bump(art, 'wobble');
      bump(api.baby.firstChild, 'loosen');
      sfx(FRIEND[id][1]);
      api.countPop(pushed, POS[j][0], POS[j][1] - 120);
      if (pushed < n) { api.say(FRIEND[id][0]); glowNext(); return; }
      phase = 'plop';
      api.Hint.clear();
      api.say(['¡Todos juntos!', '¡Uno, dos, tres!'], plop);
    }));

    // ¡PLOP! Sale del lodo y nos salpica. Sorpresa: Juju y Sofía con puntitos de lodo.
    function plop() {
      sfx('plop');
      api.setArt(api.baby, 'happy');
      const { x, y } = api.baby._pos;
      const splash = api.mk('g', { 'pointer-events': 'none' });
      splash.innerHTML = Array.from({ length: 14 }, (_, k) => {
        const a = Math.PI * (1.05 + k / 13 * .9);
        return `<g transform="translate(${Math.round(x + Math.cos(a) * 120)},${Math.round(y - 40 + Math.sin(a) * 90)})"><circle class="collect" style="animation-delay:${(k % 4) * .08}s" r="${7 + (k % 3) * 4}" fill="#6b4a32"/></g>`;
      }).join('');
      api.front.appendChild(splash);
      api.later(() => splash.remove(), 1400);
      api.moveTo(api.baby, { x: 880, y: 668 }, 900, 200);
      const kids = api.mk('g', { 'pointer-events': 'none' });
      kids.innerHTML = `<g transform="translate(140,640) scale(.6)"><g class="pop-in">${Art.juju({ mud: true, cheer: true })}</g></g>
        <g transform="translate(290,640) scale(.6)"><g class="pop-in" style="animation-delay:.2s">${Art.sofia({ mud: true, cheer: true })}</g></g>`;
      api.front.appendChild(kids);
      api.say(['¡PLOP! ¡Salió del lodo!', '¡Ay! ¡Nos salpicó a nosotras también!', '¡Jajaja! Tenemos puntitos de lodo.', 'Al rato nos lavamos en el río.'], () => api.later(api.reunited, 300));
    }
    api.hint(() => {
      const f = phase === 'push' && nextFriend();
      if (!f) return null;
      const [x, y] = POS[+f.dataset.j];
      return { x, y: y - 50, say: 'Toca al amigo que brilla, Juju.' };
    });
  }

  // ---------- Minijuego 7: puente de tortugas ----------
  function setupJaguar(api) {
    const T = [[480, 676], [650, 682], [820, 676], [990, 682]];
    api.back.innerHTML = T.map(([x, y], k) => `<g class="turtle" data-k="${k}" transform="translate(${x},${y})" style="display:none">
      <circle cy="-24" r="75" fill="transparent"/><g class="halo"><circle cy="-24" r="78" fill="#fff59d"/></g><g class="pop-in"><g class="t-art pulse">${Art.turtle('happy')}</g></g><g class="t-bub" pointer-events="none"></g></g>`).join('');
    const turtles = [...api.back.querySelectorAll('.turtle')];
    let k = 0, phase = 'bridge';
    // La tortuga asoma con burbujitas.
    const rise = () => {
      const t = turtles[k];
      t.style.display = 'inline';
      t.querySelector('.t-bub').innerHTML = [-60, -20, 24, 64].map((dx, j) => `<g transform="translate(${dx},${-30 - (j % 2) * 24})"><circle class="collect" style="animation-delay:${(j * .18).toFixed(2)}s;animation-duration:.9s" r="${8 + (j % 2) * 5}" fill="#e1f5fe" stroke="#4fc3f7" stroke-width="3"/></g>`).join('');
      sfx('splash');
    };
    turtles.forEach((t, j) => api.tap(t, () => {
      if (phase !== 'bridge' || j !== k) return;
      const halo = t.querySelector('.halo');
      if (halo) halo.remove();
      k++;
      phase = 'hop';
      t.querySelector('.t-art').setAttribute('class', 't-art');
      sfx('pop');
      const [x, y] = T[j];
      api.countPop(k, x, y - 190);
      api.setArt(api.baby, 'happy');
      // Antes del estornudo se espera a que terminen la frase y el brinco.
      let both = 0;
      const waitSay = k === 2 && k < T.length;
      const after = () => { if (++both === (waitSay ? 2 : 1)) (k === 2 ? sneeze(t) : next()); };
      if (k < T.length) api.say(k === 1 ? '¡Una tortuga! ¡Brinca, cachorro!' : `¡${api.NUM[k]} tortuguitas!`, waitSay ? after : undefined);
      api.moveTo(api.baby, { x, y: y - 48 }, 700, 90, after);
    }));
    function next() {
      if (k < T.length) { phase = 'bridge'; rise(); api.Hint.restart(); return; }
      // Último brinco: a la orilla con mamá.
      api.Hint.clear();
      api.say('¡Cuatro tortugas! ¡Ya cruzó el río!', () => api.moveTo(api.baby, { x: 1195, y: 602 }, 900, 120, api.reunited));
    }
    // Sorpresa: a la mitad del puente, una tortuga estornuda.
    function sneeze(t) {
      const art = t.querySelector('.t-art');
      art.innerHTML = Art.turtle('sneeze');
      bump(art, 'wobble');
      sfx('sneeze');
      api.moveTo(api.baby, { y: api.baby._pos.y }, 600, 80);
      api.say([{ t: '¡Achú!', pitch: 1.4, who: 'tortuga' }, '¡Salud, tortuguita!', '¡El cachorro se ríe! ¡Jijí!'], () => {
        art.innerHTML = Art.turtle('happy');
        api.later(next, 200);
      });
    }
    api.later(rise, 300);
    api.hint(() => phase === 'bridge' && k < T.length && { x: T[k][0], y: T[k][1] - 30, say: 'Toca la tortuga que brilla, Juju.' });
  }

  // ---------- Minijuego 8: el pasto que se mueve y las huellitas ----------
  function setupLion(api) {
    const C = [[690, 662], [890, 560], [1060, 692], [1100, 500]];
    api.front.innerHTML = C.map(([x, y], k) => `<g class="clump" data-k="${k}" transform="translate(${x},${y})"><circle cy="-75" r="85" fill="transparent"/><g class="c-art">${Art.grassTuft()}</g></g>`).join('') +
      `<g id="bfly" pointer-events="none"><g class="bob"><g class="wiggle">${Art.butterfly('#4fc3f7')}</g></g></g>`;
    const clumps = [...api.front.querySelectorAll('.clump')];
    const bf = api.front.querySelector('#bfly');
    let k = 0, phase = 'run';
    const wiggle = (j) => {
      clumps[j].querySelector('.c-art').setAttribute('class', 'c-art wiggle');
      clumps[j].insertAdjacentHTML('afterbegin', '<g class="halo"><circle cy="-75" r="84" fill="#fff59d"/></g>');
    };

    // Pasa una mariposa y el cachorro se va brincando tras ella hasta el pasto alto.
    const b0 = api.baby._pos;
    api.place(bf, { x: b0.x + 70, y: b0.y - 150, s: .9 });
    api.setArt(api.baby, 'happy');
    api.later(() => {
      api.moveTo(bf, { x: C[0][0], y: C[0][1] - 200 }, 1600, 40);
      api.moveTo(api.baby, { x: C[0][0], y: C[0][1] - 6 }, 1600, 70, () => {
        api.baby.style.opacity = '0';
        api.moveTo(bf, { x: 1500, y: -80, s: .5 }, 2500, 0);
        wiggle(0);
        phase = 'seek';
        api.Hint.restart();
      });
    }, 600);

    function prints([x1, y1], [x2, y2]) {
      const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 90;
      const g = api.mk('g', { 'pointer-events': 'none' });
      g.innerHTML = [.3, .5, .7].map((u, j) => `<g transform="translate(${Math.round(x1 + (x2 - x1) * u + (j % 2 ? 12 : -12))},${Math.round(y1 + (y2 - y1) * u)}) rotate(${Math.round(ang)})"><g class="pop-in" style="animation-delay:${(j * .3).toFixed(1)}s">${Art.paw('#a0661f')}</g></g>`).join('');
      api.back.appendChild(g);
    }
    clumps.forEach((el, j) => api.tap(el, () => {
      if (phase !== 'seek' || j !== k) return;
      const halo = el.querySelector('.halo');
      if (halo) halo.remove();
      const art = el.querySelector('.c-art');
      art.setAttribute('class', 'c-art');
      bump(art, 'wobble');
      sfx('whoosh');
      k++;
      api.countPop(k, C[j][0], C[j][1] - 200);
      if (k < C.length) {
        // Huellitas hasta la siguiente mata; mamá ruge suavecito, un poquito más fuerte cada vez.
        phase = 'wait';
        prints(C[j], C[k]);
        api.later(() => sfx('lion', .35 + .2 * k), 1000);
        api.say(k === 1 ? ['¡Huellitas de león!', 'Síguelas hasta el pasto que se mueve.'] : `¡${api.NUM_M[k]}! ¡Más huellitas!`);
        api.later(() => { wiggle(k); phase = 'seek'; }, 1300);
        return;
      }
      found();
    }));

    // ¡Aquí está, con su mariposa! Intenta rugir y le sale un "¡miau-grr!".
    function found() {
      phase = 'found';
      api.Hint.clear();
      const [x, y] = C[C.length - 1];
      api.place(api.baby, { x, y: y - 10, s: .48 });
      api.baby.style.opacity = '1';
      api.setArt(api.baby, 'happy');
      api.moveTo(api.baby, { x: x - 20, y: y + 102 }, 800, 90);
      api.place(bf, { x: x + 120, y: y - 40, s: .7 });
      api.moveTo(bf, { x: x - 6, y: y - 14 }, 1200, 30);
      sfx('jaguar');
      api.say(['¡Aquí está! ¡Con su mariposa!', '¡Mira, quiere rugir!', { t: '¡Miau-grr!', pitch: 1.6, who: 'leon' }, '¡Jijí! Todavía es chiquito.'], momRoar);
    }
    // Mamá ruge suave, como un "te encontré", y llega la manada.
    function momRoar() {
      sfx('lion', 1);
      api.moveTo(bf, { x: 1500, y: -80, s: .5 }, 3000, 0);
      api.say({ t: '¡Te encontré, mi cachorro!', pitch: .8, who: 'leon' }, () => {
        const pride = api.mk('g', { 'pointer-events': 'none' });
        pride.innerHTML = `<g transform="translate(1480,560) scale(.72)"><g class="pop-in">${Art.animal('leon', 'mom')}</g></g>
          <g transform="translate(985,520) scale(.66)"><g class="pop-in" style="animation-delay:.4s">${Art.animal('leon', 'mom')}</g></g>`;
        api.back.appendChild(pride);
        api.moveTo(api.baby, { x: 1195, y: 604 }, 900, 60, () => api.hearts(1240, 470));
        api.say(['¡Llegó toda la manada!', 'Todas las leonas lo llenan de besitos.'], headbump);
      });
    }
    // El cachorro le da a Juju un cabezazo de cariño.
    function headbump() {
      const kids = api.mk('g', { 'pointer-events': 'none' });
      kids.innerHTML = `<g transform="translate(140,650) scale(.6)"><g class="pop-in">${Art.juju()}</g></g>
        <g transform="translate(370,650) scale(.6)"><g class="pop-in" style="animation-delay:.2s">${Art.sofia({ cheer: true })}</g></g>`;
      api.front.appendChild(kids);
      api.moveTo(api.baby, { x: 245, y: 656 }, 1600, 80, () => {
        sfx('jaguar');
        api.hearts(200, 520);
        api.say('¡Te dio un cabezazo de cariño, Juju!', () => api.moveTo(api.baby, { x: 1195, y: 604 }, 1600, 80, api.reunited));
      });
    }
    api.hint(() => phase === 'seek' && k < C.length && { x: C[k][0], y: C[k][1] - 80, say: 'Toca el pasto que se mueve, Juju.' });
  }

  window.MORE_LEVELS = [
    {
      id: 'mono', name: 'Monos araña', sound: 'monkey', clue: 'cascaras',
      mom: { x: 1160, y: 418, s: .8 }, baby: { x: 520, y: 640, s: .5 },
      clues: [{ x: 270, y: 560 }, { x: 860, y: 600 }, { x: 1170, y: 690 }],
      ask: [{ t: '¿Han visto a mi monito? ¡Uh, uh, ah, ah!', pitch: .9, who: 'mono' }, 'Mamá mono busca a su bebé. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una cáscara amarilla de plátano!', '¡Dos cáscaras! Esta es naranja.', '¡Tres cáscaras! ¡Qué glotón! ¿Quién estará aquí?'],
      found: ['¡Ahí está el monito!', 'Se fue lejos y no sabe volver. Tócalo suavecito.'],
      task: '¡Quiere jugar a las escondidas! Busca su colita en los arbustos.',
      praise: '¡Encontraste al monito y lo llevaste con su mamá!',
      quiz: { q: '¿Quién se puede colgar de su cola?', right: { animal: 'mono' }, wrong: { animal: 'rana' }, yes: '¡Sí! El monito. ¡Su cola es como otra manita!', show: 'Mira, el monito se cuelga de su cola. Tócalo.' },
      fact: 'Su cola es como una quinta mano. ¡Se puede colgar solo con ella!',
      facts: [
        'Su cola es como una quinta mano. ¡Se puede colgar solo con ella!',
        'El bebé viaja en la espalda de su mamá, a veces con su cola enredada en la de ella.',
        'Los monos araña viven en las selvas del sur de México.',
      ],
      gift: '¡Mamá mono te regaló una cuerda de lianas para la balsa!',
      bye: '¡Adiós, monito! ¡Cuida a tu mamá!',
      bg: () => Art.jungle(640) +
        `<path d="M1000,0 C1010,120 990,250 1004,420 M880,0 C890,90 870,200 884,300" stroke="#2e7d32" stroke-width="8" fill="none"/>
         <rect x="1320" y="160" width="70" height="740" rx="22" fill="#7b4a2a"/>
         <path d="M1340,436 C1220,428 1100,424 960,432" stroke="#7b4a2a" stroke-width="26" stroke-linecap="round" fill="none"/>
         ${Art.leaf(1150, 432, .45, 160, '#43a047')}${Art.leaf(1020, 434, .4, 20, '#66bb6a')}
         <circle cx="1360" cy="140" r="150" fill="#2e7d32"/><circle cx="1210" cy="140" r="100" fill="#43a047"/><circle cx="1500" cy="190" r="110" fill="#43a047"/>`,
      setup: setupMonkey,
    },
    {
      id: 'guacamaya', name: 'Guacamayas rojas', sound: 'macaw', clue: 'sonidos',
      mom: { x: 1290, y: 306, s: .5 }, baby: { x: 590, y: 700, s: .5 },
      clues: [{ x: 280, y: 560 }, { x: 900, y: 580 }, { x: 1150, y: 690 }],
      ask: [{ t: '¡Mi guacamayita se fue con el viento!', pitch: .9, who: 'guacamaya' }, 'Mamá guacamaya está preocupada. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Un sonidito! ¡Cuic! Mira las notitas amarillas.', '¡Dos sonidos! ¡Cuic, cuic! Las notitas bailan.', '¡Tres sonidos! ¡Cuic, cuic, achís! ¿Quién canta aquí?'],
      found: ['¡Ahí está la guacamayita!', 'Está aprendiendo a volar. Tócala suavecito.'],
      task: 'El viento se llevó sus plumitas. Toca la pluma que brilla, ¡y mamá vendrá volando!',
      praise: '¡Ayudaste a la guacamayita a encontrar a su mamá!',
      quiz: { q: '¿De qué color es la guacamaya?', right: { color: '#e53935' }, wrong: { color: '#43a047' }, yes: '¡Sí! Es roja, ¡como un jitomate!', show: 'Mira, es roja. Toca el rojo.' },
      fact: 'Sus plumas son rojas, amarillas y azules, ¡como un arcoíris!',
      facts: [
        'Sus plumas son rojas, amarillas y azules, ¡como un arcoíris!',
        'Mamá y papá guacamaya cuidan juntos a su bebé en un hoyito de un árbol.',
        'Puede imitar sonidos. En México vive en la selva de Chiapas.',
      ],
      gift: '¡Mamá guacamaya te regaló una pluma roja larga para la balsa!',
      bye: '¡Adiós, guacamayita! ¡Cuida a tu mamá!',
      bg: () => Art.jungle(660) +
        `<rect x="1370" y="0" width="80" height="900" fill="#7b4a2a"/>
         <path d="M1380,312 L1210,306" stroke="#7b4a2a" stroke-width="20" stroke-linecap="round"/>
         <circle cx="1420" cy="40" r="150" fill="#2e7d32"/><circle cx="1290" cy="60" r="90" fill="#43a047"/>
         ${[[120, 690, '#ff5fa2'], [380, 720, '#ffd23f'], [760, 760, '#ff8a65'], [980, 740, '#ba68c8'], [1240, 730, '#ff5fa2'], [520, 650, '#ff8a65'], [880, 660, '#ffd23f'], [200, 610, '#ba68c8']].map(([x, y, c]) => Art.flower(x, y, c, 1.3)).join('')}`,
      setup: setupMacaw,
    },
    {
      id: 'tapir', name: 'Tapires', sound: 'tapir', clue: 'huellas',
      mom: { x: 1010, y: 682, s: .9 }, baby: { x: 760, y: 712, s: .55 },
      clues: [{ x: 280, y: 560 }, { x: 560, y: 520 }, { x: 1240, y: 600 }],
      ask: [{ t: '¿Han visto a mi bebé? Se fue a jugar al lodo…', pitch: .75, who: 'tapir' }, 'Mamá tapir busca a su bebé. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una huellita café en el lodo!', '¡Dos huellitas cafés!', '¡Tres huellitas! ¡Chof, chof! ¿Quién está aquí?'],
      found: ['¡Ahí está el tapircito! Se quedó atorado en el lodo.', 'Está tranquilo. Tócalo suavecito.'],
      task: 'Mamá lo empuja, pero sola no puede. ¡Llegaron sus amigos! Toca a cada uno.',
      praise: '¡Todos juntos sacaron al tapircito del lodo!',
      quiz: { q: '¿Qué fruta parece el bebé tapir?', right: { emoji: '🍉' }, wrong: { emoji: '🍌' }, yes: '¡Sí! Con sus rayitas, ¡parece una sandía!', show: 'Mira sus rayitas. ¡Parece sandía! Toca la sandía.' },
      fact: 'Los bebés tapir tienen rayas y puntitos, ¡parecen sandía! Al crecer se les quitan.',
      facts: [
        'Los bebés tapir tienen rayas y puntitos, ¡parecen sandía! Al crecer se les quitan.',
        'Su nariz es una trompita corta con la que agarra hojas.',
        'El tapir es muy buen nadador.',
      ],
      gift: '¡Mamá tapir te regaló un remo de hoja para la balsa!',
      bye: '¡Adiós, tapircito! ¡Cuida a tu mamá!',
      bg: () => Art.jungle(620) + MOM_STYLE +
        `<ellipse cx="760" cy="702" rx="300" ry="72" fill="#5d4030"/><ellipse cx="760" cy="708" rx="276" ry="56" fill="#6b4a32"/>
         <ellipse cx="660" cy="696" rx="60" ry="10" fill="#8d6e4f" opacity=".6"/><circle cx="560" cy="716" r="9" fill="#8d6e4f"/><circle cx="930" cy="700" r="7" fill="#8d6e4f"/><circle cx="880" cy="736" r="5" fill="#8d6e4f"/>`,
      setup: setupTapir,
    },
    {
      id: 'jaguar', name: 'Jaguares', sound: 'jaguar', clue: 'burbujas',
      mom: { x: 1320, y: 600, s: .9 }, baby: { x: 300, y: 626, s: .48 },
      clues: [{ x: 560, y: 660 }, { x: 860, y: 620 }, { x: 1040, y: 740 }],
      ask: [{ t: '¿Han visto a mi cachorro? Estábamos nadando…', pitch: .8, who: 'jaguar' }, 'Mamá jaguar busca a su cachorro. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una burbuja azul!', '¡Dos burbujas azules!', '¡Tres burbujas! ¡Blub, blub! ¿Quién está aquí?'],
      found: ['¡Ahí está el cachorro, en una piedra!', 'Está sentadito y tranquilo. Tócalo suavecito.'],
      task: 'Está del otro lado del río. Toca la tortuga que brilla para hacer un puente.',
      praise: '¡Ayudaste al cachorro a cruzar el río!',
      quiz: { q: '¿Quién hizo el puente?', right: { emoji: '🐢' }, wrong: { emoji: '🦋' }, yes: '¡Sí! ¡Las tortugas hicieron un puente!', show: 'Mira, fueron las tortugas. Toca la tortuga.' },
      fact: '¡Al cachorro de jaguar le encanta nadar! Su mamá le enseña.',
      facts: [
        '¡Al cachorro de jaguar le encanta nadar! Su mamá le enseña.',
        'Cada jaguar tiene manchas distintas, como nuestras huellas de los dedos.',
        'El cachorro se queda con su mamá unos dos años.',
      ],
      gift: '¡Mamá jaguar te regaló una piedrita con forma de corazón!',
      bye: '¡Adiós, jaguarcito! ¡Cuida a tu mamá!',
      bg: () => `<rect width="1600" height="900" fill="url(#sky)"/>${Art.sun(1440, 120)}
        <path d="M0,470 C220,400 420,450 640,420 C860,390 1060,460 1280,410 C1420,380 1520,420 1600,410 L1600,600 L0,600 Z" fill="#9ad99a"/>
        ${[[90, .55], [330, .45], [620, .5], [900, .42], [1180, .5]].map(([x, s]) => Art.tree(x, 590, s)).join('')}
        <path d="M0,560 C300,540 700,580 1000,556 C1200,540 1400,566 1600,552 L1600,600 L0,600 Z" fill="#6cc070"/>
        ${Art.river(586, 314)}
        <path d="M1110,900 C1116,720 1150,618 1260,604 L1600,598 L1600,900 Z" fill="#6cc070"/><path d="M1116,820 C1124,700 1160,632 1250,622" stroke="#4caf50" stroke-width="10" fill="none"/>
        ${Art.bush(1470, 610, .7, '#43a047')}${Art.flower(1220, 640, '#ff5fa2')}${Art.flower(1440, 660, '#ffd23f')}
        <ellipse cx="300" cy="660" rx="120" ry="42" fill="#78909c"/><ellipse cx="292" cy="638" rx="100" ry="28" fill="#b0bec5"/><ellipse cx="260" cy="630" rx="30" ry="8" fill="#eceff1" opacity=".7"/>`,
      setup: setupJaguar,
    },
    {
      id: 'leon', name: 'Leones', sound: 'lion', clue: 'huellitas',
      mom: { x: 1310, y: 604, s: .95 }, baby: { x: 430, y: 664, s: .48 },
      clues: [{ x: 620, y: 640 }, { x: 960, y: 580 }, { x: 1160, y: 700 }],
      ask: [{ t: '¿Han visto a mi cachorro? Se fue tras una mariposa…', pitch: .8, who: 'leon' }, 'Mamá leona busca a su cachorro. ¡Ayudémosla, Juju! Toca lo que brilla.'],
      clueLines: ['¡Una huellita dorada!', '¡Dos huellitas doradas!', '¡Tres huellitas! ¡Son de un gatito grande! ¿Quién será?'],
      found: ['¡Mira! Unas orejitas en el pasto alto.', '¡Es el cachorro de león! Tócalo suavecito.'],
      task: '¡Uy! Vio otra mariposa y se fue brincando. Toca el pasto que se mueve.',
      praise: '¡Encontraste al cachorro de león, Juju!',
      quiz: { q: '¿Qué perseguía el cachorro?', right: { emoji: '🦋' }, wrong: { emoji: '🐢' }, yes: '¡Sí! ¡Perseguía una mariposa!', show: 'Mira, era una mariposa. Tócala.' },
      fact: 'Los leones viven en la sabana de África. ¡Sus cachorros nacen con manchitas!',
      facts: [
        'Los leones viven en la sabana de África. ¡Sus cachorros nacen con manchitas!',
        'En la manada, varias mamás leonas cuidan juntas a los cachorros.',
        'El león es el único felino que vive en familia grande: la manada.',
      ],
      gift: '¡Mamá leona te regaló una estrella dorada para la balsa!',
      bye: '¡Adiós, leoncito! ¡Cuida a tu mamá!',
      bg: () => Art.savanna(600) + MOM_STYLE,
      setup: setupLion,
    },
  ];
})();
