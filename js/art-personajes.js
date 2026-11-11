// Juju y Sofía con más detalle (redefine Art.kid). Se carga después de art.js y art2.js.
// Caricatura suave y redondita: luz de arriba a la izquierda, sombras con degradado y un contorno
// de color (más oscuro que el relleno) para que se lean bien sobre la selva. Origen en los pies.
// Los degradados van dentro de cada personaje con ids "kid…" que dependen del color: si hay
// varias copias en pantalla, todas son idénticas y no se estorban.
(() => {
  const hex = (c) => {
    c = String(c || '#000').replace('#', '');
    if (c.length === 3) c = c.replace(/./g, '$&$&');
    return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16) || 0);
  };
  const mix = (a, b, t) => { const B = hex(b); return '#' + hex(a).map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  const key = (c) => String(c).replace(/[^0-9a-z]/gi, '');
  const warm = (c, t) => mix(c, '#5b2412', t); // sombra cálida (piel, pelo)
  const cool = (c, t) => mix(c, '#1d1238', t); // sombra fría (ropa)
  const lt = (c, t) => mix(c, '#fff', t);
  // Círculo como sub-trazo: muchos puntitos en un solo <path> (más ligero para el iPhone).
  const n2 = (v) => +v.toFixed(2);
  const dot = (x, y, r) => `M${n2(x - r)},${n2(y)}a${r},${r} 0 1,0 ${n2(2 * r)},0a${r},${r} 0 1,0 ${n2(-2 * r)},0`;
  // Espejo horizontal de un trazo escrito con pares "x,y" absolutos.
  const flip = (d) => d.replace(/(-?[\d.]+),(-?[\d.]+)/g, (m, x, y) => `${-x},${y}`);
  const both = (d) => d + flip(d);
  const line = (d, c, w, op = 1) => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"${op < 1 ? ` opacity="${op}"` : ''}/>`;
  const star = (cx, cy, R, r) => 'M' + Array.from({ length: 10 }, (_, k) => {
    const a = -Math.PI / 2 + k * Math.PI / 5, q = k % 2 ? r : R;
    return `${(cx + q * Math.cos(a)).toFixed(1)},${(cy + q * Math.sin(a)).toFixed(1)}`;
  }).join(' L') + 'Z';

  Art.kid = (o) => {
    const defs = new Map();
    const stops = (st) => st.map(([p, c, a = 1]) => `<stop offset="${p}" stop-color="${c}"${a < 1 ? ` stop-opacity="${a}"` : ''}/>`).join('');
    const lg = (id, st, x2 = 0, y2 = 1) => {
      if (!defs.has(id)) defs.set(id, `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops(st)}</linearGradient>`);
      return `url(#${id})`;
    };
    const rg = (id, st, cx = .5, cy = .5, r = .5) => {
      if (!defs.has(id)) defs.set(id, `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(st)}</radialGradient>`);
      return `url(#${id})`;
    };
    const cloth = (c) => lg('kidCl' + key(c), [[0, lt(c, .24)], [.5, c], [1, cool(c, .3)]], .8, 1);

    const skin = o.skin, hair = o.hair, up = !!o.cheer;
    const skinLine = warm(skin, .5), skinD = warm(skin, .2);
    const hairD = warm(hair, .4), hairLine = warm(hair, .55);
    const hairL = o.hairLight || mix(hair, '#b88458', .45);
    const eyes = o.eyes || '#4a2a1a';
    const gSkin = rg('kidSk' + key(skin), [[0, lt(skin, .25)], [.6, skin], [1, warm(skin, .22)]], .36, .3, .78);
    const gHair = lg('kidHr' + key(hair), [[0, lt(hair, .16)], [.55, hair], [1, warm(hair, .3)]], .35, 1);
    const gGold = lg('kidGd', [[0, '#fff3a6'], [.45, '#ffcb2e'], [1, '#e08600']], .4, 1);
    let s = '';

    // ---------- sombra en el piso ----------
    s += `<ellipse cx="0" cy="-1" rx="${o.accessory >= 1 ? 122 : 66}" ry="12" fill="${rg('kidFl', [[0, '#0b3016', .34], [1, '#0b3016', 0]])}"/>`;

    // ---------- capa de reina (detrás de todo) ----------
    if (o.accessory >= 1) {
      const cape = 'M-26,-158 Q0,-166 26,-158 C66,-120 100,-66 120,-20 Q60,-2 0,-9 Q-60,-2 -120,-20 C-100,-66 -66,-120 -26,-158 Z';
      s += `<path d="${cape}" fill="${lg('kidCp', [[0, '#f0509a'], [.55, '#c2185b'], [1, '#880e4f']], .7, 1)}" stroke="#6d0c38" stroke-width="3" stroke-linejoin="round"/>`;
      s += line('M-56,-108 Q-76,-60 -84,-14 M56,-108 Q76,-60 84,-14 M-94,-60 Q-104,-38 -106,-16 M94,-60 Q104,-38 106,-16', '#6d0c38', 3, .35);
      s += line('M-118,-20 Q-60,-2 0,-9 Q60,-2 118,-20', '#ffd23f', 6);
      s += line('M-28,-157 Q0,-167 28,-157', '#ffd23f', 6);
    }

    // ---------- pelo de atrás ----------
    if (o.wavy) {
      const back = 'M-60,-262 C-98,-252 -106,-214 -92,-190 C-112,-170 -110,-142 -96,-128 C-116,-108 -112,-80 -94,-66 C-102,-46 -84,-32 -66,-42 C-56,-30 -38,-36 -34,-50 L34,-50 C38,-36 56,-30 66,-42 C84,-32 102,-46 94,-66 C112,-80 116,-108 96,-128 C110,-142 112,-170 92,-190 C106,-214 98,-252 60,-262 C30,-292 -30,-292 -60,-262 Z';
      s += `<path d="${back}" fill="${gHair}" stroke="${hairLine}" stroke-width="3" stroke-linejoin="round"/>`;
      s += `<path d="M-68,-196 C-80,-150 -76,-98 -60,-58 L60,-58 C76,-98 80,-150 68,-196 Z" fill="${hairD}"/>`;
      s += line(both('M-80,-204 C-94,-180 -80,-160 -94,-132 C-104,-112 -88,-96 -92,-74 M-64,-176 C-72,-152 -62,-132 -74,-106 C-80,-90 -72,-78 -76,-62 '), hairD, 3, .6);
      s += line('M-88,-190 C-100,-170 -86,-150 -98,-126 C-106,-108 -94,-96 -98,-80 M-74,-152 C-82,-132 -70,-114 -82,-92 M88,-186 C98,-166 84,-148 96,-124 M78,-150 C86,-130 74,-112 86,-90', hairL, 5, .9);
      s += line('M-70,-258 C-92,-244 -100,-220 -90,-196', lt(hairL, .4), 4, .7);
    } else if (o.longHair) {
      const back = 'M-62,-262 C-92,-238 -86,-190 -84,-150 C-82,-110 -86,-80 -82,-54 Q-72,-46 -64,-54 Q-56,-44 -46,-54 L46,-54 Q56,-44 64,-54 Q72,-46 82,-54 C86,-80 82,-110 84,-150 C86,-190 92,-238 62,-262 C30,-292 -30,-292 -62,-262 Z';
      s += `<path d="${back}" fill="${gHair}" stroke="${hairLine}" stroke-width="3" stroke-linejoin="round"/>`;
      s += `<path d="M-66,-196 C-74,-150 -72,-96 -62,-58 L62,-58 C72,-96 74,-150 66,-196 Z" fill="${hairD}"/>`;
      s += line(both('M-78,-200 C-78,-160 -76,-110 -76,-62 M-70,-180 C-70,-140 -68,-100 -70,-64 '), hairLine, 2.5, .6);
      s += line('M-80,-214 C-80,-180 -78,-130 -78,-96 M78,-206 C78,-170 78,-130 78,-100', hairL, 4, .75);
      s += line('M-70,-256 C-86,-240 -88,-222 -86,-204', hairL, 4, .3);
    } else {
      s += `<circle cx="0" cy="-214" r="68" fill="${gHair}" stroke="${hairLine}" stroke-width="3"/>`;
    }

    // ---------- piernas y zapatos ----------
    const leg = 'M-23,-48 L-9,-48 L-9,-12 C-9,-4 -23,-4 -23,-12 Z ';
    s += `<path d="${both(leg)}" fill="${skin}" stroke="${skinLine}" stroke-width="2.5"/>`;
    s += line(both('M-12,-44 L-12,-12 '), skinD, 3, .6);
    if (o.dress) s += `<path d="${both('M-24,-20 L-8,-20 L-8,-9 L-24,-9 Z ')}" fill="#fff" stroke="#e5c3d3" stroke-width="2"/>`;
    const shoe = 'M-4,-4 C-4,-16 -16,-20 -26,-17 C-36,-14 -39,-6 -35,-1 Q-20,2 -6,0 Z ';
    s += `<path d="${both(shoe)}" fill="${lg('kidSh' + key(o.shoes), [[0, lt(o.shoes, .3)], [1, cool(o.shoes, .25)]])}" stroke="${cool(o.shoes, .45)}" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += line(both('M-5,-2 Q-20,1 -35,-2 '), o.dress ? cool(o.shoes, .45) : '#fff', o.dress ? 3 : 4);
    s += o.dress
      ? line(both('M-8,-15 Q-16,-19 -24,-15 '), cool(o.shoes, .35), 3)
      : line(both('M-12,-15 L-16,-12 M-17,-17 L-21,-14 '), '#fff', 2.5, .9);
    s += line(both('M-17,-15 Q-24,-17 -30,-12 '), '#fff', 3, .6);

    // ---------- ropa ----------
    if (o.dress) {
      const dc = o.dressColor, dl = cool(dc, .45);
      s += `<path d="M-66,-48 Q-58,-30 -46,-37 Q-36,-26 -24,-33 Q-12,-24 0,-31 Q12,-24 24,-33 Q36,-26 46,-37 Q58,-30 66,-48 Z" fill="${lt(o.dots, .55)}" stroke="${mix(o.dots, dc, .5)}" stroke-width="2"/>`;
      s += `<path d="M-24,-156 Q0,-162 24,-156 C30,-140 31,-124 29,-112 C44,-92 60,-68 70,-48 Q60,-36 47,-43 Q36,-32 24,-40 Q12,-30 0,-38 Q-12,-30 -24,-40 Q-36,-32 -47,-43 Q-60,-36 -70,-48 C-60,-68 -44,-92 -29,-112 C-31,-124 -30,-140 -24,-156 Z" fill="${cloth(dc)}" stroke="${dl}" stroke-width="3" stroke-linejoin="round"/>`;
      s += `<path d="${[[-46, -58], [-22, -66], [3, -54], [28, -68], [50, -60], [-36, -87], [-9, -86], [17, -90], [39, -84], [-14, -48], [26, -48], [-48, -48], [0, -126], [-15, -143], [15, -141], [-6, -104]].map(([x, y]) => dot(x, y, 4.3)).join('')}" fill="${o.dots}" opacity=".95"/>`;
      s += line('M-12,-106 Q-16,-76 -22,-46 M12,-106 Q18,-78 27,-44 M-34,-94 Q-46,-72 -55,-52 M36,-96 Q48,-74 57,-54', dl, 3, .45);
      s += line('M-22,-104 Q-34,-82 -42,-58 M-20,-150 Q-24,-134 -22,-118', lt(dc, .5), 4, .5);
      s += line('M-29,-113 Q0,-106 29,-113', o.dots, 6);
      s += `<path d="${both('M-1,-158 Q-12,-160 -21,-156 Q-20,-146 -10,-147 Q-3,-148 -1,-154 Z ')}" fill="${lt(o.dots, .6)}" stroke="${mix(o.dots, dc, .6)}" stroke-width="1.6" stroke-linejoin="round"/>`;
    } else {
      const tc = o.topColor, sc = o.skirtColor;
      s += `<path d="M-24,-156 Q0,-162 24,-156 C32,-140 36,-122 37,-102 Q0,-96 -37,-102 C-36,-122 -32,-140 -24,-156 Z" fill="${cloth(tc)}" stroke="${cool(tc, .45)}" stroke-width="3" stroke-linejoin="round"/>`;
      s += line('M-13,-158 Q0,-147 13,-158', cool(tc, .4), 3);
      s += line('M-20,-132 Q-25,-120 -28,-110 M19,-134 Q24,-122 28,-110', cool(tc, .4), 2.5, .5);
      s += `<path d="${dot(0, -139, 2.6)}${dot(0, -126, 2.6)}" fill="${lt(tc, .75)}"/>`;
      s += `<path d="M-36,-108 L36,-108 C46,-86 56,-64 64,-46 Q32,-35 0,-37 Q-32,-35 -64,-46 C-56,-64 -46,-86 -36,-108 Z" fill="${cloth(sc)}" stroke="${cool(sc, .45)}" stroke-width="3" stroke-linejoin="round"/>`;
      s += line('M-18,-104 L-31,-41 M0,-104 L0,-38 M18,-104 L31,-41 M-34,-100 L-52,-45 M34,-100 L52,-45', cool(sc, .45), 2.5, .5);
      s += line('M-14,-103 L-25,-42 M4,-103 L4,-39', lt(sc, .4), 3, .35);
      s += line('M-61,-50 Q0,-35 61,-50', lt(sc, .35), 3, .7);
      s += `<path d="M-37,-111 Q0,-105 37,-111 L37,-103 Q0,-97 -37,-103 Z" fill="${cool(sc, .15)}" stroke="${cool(sc, .45)}" stroke-width="2"/>`;
    }

    // ---------- mechones de enfrente (caen sobre los hombros) ----------
    if (o.wavy) {
      const lock = 'M-52,-224 C-76,-206 -88,-182 -76,-162 C-66,-146 -86,-128 -80,-110 C-76,-97 -62,-95 -57,-104 C-53,-114 -57,-128 -52,-142 C-47,-158 -58,-178 -48,-200 Z ';
      s += `<path d="${both(lock)}" fill="${gHair}" stroke="${hairLine}" stroke-width="2.5" stroke-linejoin="round"/>`;
      s += line(both('M-60,-198 C-74,-182 -76,-168 -68,-156 C-62,-146 -76,-130 -70,-112 '), hairD, 2.5, .55);
      s += line(both('M-56,-206 C-68,-192 -71,-178 -63,-164 '), hairL, 4, .9);
    } else if (o.longHair) {
      const lock = 'M-52,-218 C-68,-188 -72,-144 -70,-106 Q-63,-98 -56,-106 C-54,-142 -50,-180 -44,-206 Z ';
      s += `<path d="${both(lock)}" fill="${gHair}" stroke="${hairLine}" stroke-width="2.5" stroke-linejoin="round"/>`;
      s += line(both('M-58,-196 C-62,-170 -64,-140 -63,-112 '), hairL, 3, .6);
    }

    // ---------- brazos ----------
    // Mano abajo ≈ (±47,-85); arriba (celebrando) ≈ (±70,-214), un poquito por fuera de la cara.
    const armD = (k) => up ? `M${k * 28},-142 Q${k * 84},-154 ${k * 70},-210` : `M${k * 28},-142 Q${k * 50},-114 ${k * 47},-90`;
    const hand = (k) => up ? [k * 70, -214] : [k * 47, -86];
    const flashlight = ([x, y]) => `<g transform="translate(${x},${y}) rotate(${up ? -8 : 18})">
      <circle cy="-46" r="22" fill="${rg('kidBm', [[0, '#fff59d', .9], [1, '#fff59d', 0]])}"/>
      <rect x="-7" y="-32" width="14" height="40" rx="5" fill="${lg('kidMt', [[0, '#78909c'], [1, '#263238']], 1, 0)}" stroke="#1c262b" stroke-width="2"/>
      <path d="M-11,-45 L11,-45 L8,-31 L-8,-31 Z" fill="#ffca28" stroke="#d48a00" stroke-width="2" stroke-linejoin="round"/>
      <ellipse cy="-45" rx="11" ry="3.2" fill="#fffde7"/>${line('M-3,-26 L-3,0', '#fff', 2.5, .35)}</g>`;
    const wand = ([x, y]) => `<g transform="translate(${x},${y}) rotate(${up ? -12 : -20})">
      <rect x="-3.5" y="-68" width="7" height="78" rx="3.5" fill="#fff" stroke="#d81b60" stroke-width="1.5"/>
      ${line('M-3,-56 L3,-62 M-3,-40 L3,-46 M-3,-24 L3,-30', '#ff5fa2', 3)}
      <path d="${star(0, -86, 23, 10)}" fill="${gGold}" stroke="#d98200" stroke-width="3" stroke-linejoin="round"/>
      ${line('M-7,-94 L-2,-102', '#fff', 3, .8)}
      <path d="M24,-110 l2,6 6,2 -6,2 -2,6 -2,-6 -6,-2 6,-2Z M-26,-104 l1.5,4.5 4.5,1.5 -4.5,1.5 -1.5,4.5 -1.5,-4.5 -4.5,-1.5 4.5,-1.5Z M18,-62 l1.5,4 4,1.5 -4,1.5 -1.5,4 -1.5,-4 -4,-1.5 4,-1.5Z" fill="#fff59d"/></g>`;
    const bracelet = () => {
      const [bx, by] = up ? [73, -195] : [47, -97];
      return `<path d="${dot(bx - 9, by, 3.8)}${dot(bx + 3, by, 3.8)}" fill="#ff5fa2" stroke="#d81b60" stroke-width="1.2"/>` +
        `<path d="${dot(bx - 3, by + 1, 3.8)}${dot(bx + 9, by, 3.8)}" fill="#ffb3d1" stroke="#e7609a" stroke-width="1.2"/>` +
        `<path d="${[-9, -3, 3, 9].map(d => dot(bx + d - 1.2, by - 1.4, 1.1)).join('')}" fill="#fff"/>`;
    };
    const arms = () => {
      let a = '';
      for (const k of [-1, 1]) {
        const d = armD(k), h = hand(k);
        a += `<path d="${d}" stroke="${skinLine}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${skin}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
        if (k > 0 && o.flashlight) a += flashlight(h);
        if (k < 0 && o.accessory >= 2) a += wand(h);
        a += `<circle cx="${h[0]}" cy="${h[1]}" r="9.5" fill="${skin}" stroke="${skinLine}" stroke-width="2.4"/>`;
        if (k > 0 && o.bracelet) a += bracelet();
      }
      // mangas
      const sl = o.dress ? o.dressColor : o.topColor;
      const sleeve = o.dress ? 'M-18,-153 C-24,-168 -50,-164 -49,-143 C-48,-131 -36,-127 -26,-134 Z ' : 'M-18,-154 C-28,-162 -48,-158 -50,-138 L-48,-130 Q-38,-127 -27,-134 Z ';
      a += `<path d="${both(sleeve)}" fill="${cloth(sl)}" stroke="${cool(sl, .45)}" stroke-width="2.5" stroke-linejoin="round"/>`;
      a += line(both(o.dress ? 'M-27,-134 Q-38,-128 -47,-137 ' : 'M-28,-134 Q-38,-129 -48,-132 '), o.dress ? o.dots : lt(sl, .35), 3.5);
      a += line('M-24,-157 Q-38,-162 -44,-150', lt(sl, .5), 3, .55);
      return a;
    };
    if (!up) s += arms();

    // ---------- medalla (el listón va detrás de la cámara) ----------
    if (o.medal) s += `<path d="M-19,-157 L-10,-157 L1,-104 L-7,-104 Z M19,-157 L10,-157 L-1,-104 L7,-104 Z" fill="#e53935" stroke="#a31515" stroke-width="2" stroke-linejoin="round"/>`;

    // ---------- cuello y cabeza ----------
    s += `<path d="M-11,-166 L11,-166 L11,-150 Q0,-146 -11,-150 Z" fill="${skinD}" stroke="${skinLine}" stroke-width="2"/>`;
    s += `<circle cx="0" cy="-210" r="60" fill="${gSkin}" stroke="${skinLine}" stroke-width="2.5"/>`;

    // pelo de enfrente
    if (o.wavy) {
      // raya de lado, sin fleco: la frente se ve; el lado derecho cae en una onda grande
      s += `<path d="M-65,-196 C-72,-252 -40,-286 -6,-285 C40,-284 72,-252 66,-196 C62,-216 50,-232 30,-236 C10,-240 -6,-248 -16,-260 C-32,-250 -48,-232 -55,-198 Z" fill="${gHair}" stroke="${hairLine}" stroke-width="2.5" stroke-linejoin="round"/>`;
      s += line('M-16,-262 C-34,-256 -50,-240 -60,-212 M-10,-264 C12,-252 40,-242 58,-214 M-2,-276 C30,-270 54,-252 63,-226', hairD, 2.5, .55);
      s += line('M-30,-272 C-46,-264 -56,-248 -60,-228 M6,-268 C28,-260 46,-250 56,-232', hairL, 5, .9);
      s += line('M-38,-272 C-46,-268 -52,-262 -56,-254', '#fff6d8', 3.5, .75);
    } else if (o.longHair) {
      s += `<path d="M-66,-196 C-72,-252 -40,-285 2,-285 C42,-285 72,-252 66,-196 C60,-226 42,-246 16,-248 C10,-250 6,-256 4,-264 C2,-256 -4,-250 -12,-248 C-40,-246 -60,-226 -66,-196 Z" fill="${gHair}" stroke="${hairLine}" stroke-width="2.5" stroke-linejoin="round"/>`;
      s += line('M4,-264 C-16,-260 -46,-246 -60,-214 M4,-264 C24,-260 50,-246 60,-214', hairLine, 2.5, .5);
      s += line('M-26,-272 C-42,-266 -54,-252 -58,-236 M16,-274 C32,-270 44,-262 50,-252', hairL, 4.5, .8);
    } else {
      s += `<path d="M-63,-200 C-68,-262 -32,-286 0,-286 C32,-286 68,-262 63,-200 C55,-232 38,-246 20,-244 C8,-236 -8,-236 -20,-244 C-38,-246 -55,-232 -63,-200 Z" fill="${gHair}" stroke="${hairLine}" stroke-width="2.5"/>`;
    }

    // orejas (el pelo va detrás de la oreja)
    const ear = 'M-57,-217 C-74,-224 -77,-194 -59,-190 ';
    s += `<path d="${ear}Z ${flip(ear)}Z" fill="${skin}"/>` + line(both(ear), skinLine, 2.4) + line(both('M-62,-210 C-69,-209 -69,-199 -62,-198 '), skinD, 2.5, .8);
    if (o.earrings) s += `<path d="${dot(-62, -190, 3.6)}${dot(62, -190, 3.6)}" fill="${gGold}" stroke="#c77800" stroke-width="1.2"/><path d="${dot(-63.2, -191.3, 1.1)}${dot(60.8, -191.3, 1.1)}" fill="#fff"/>`;

    // ---------- cara ----------
    const er = o.bigEyes ? 1.18 : 1, ex = 22, ey = -203, rx = +(9 * er).toFixed(1), ry = +(11 * er).toFixed(1);
    const irisG = lg('kidIr' + key(eyes), [[0, warm(eyes, .6)], [.55, eyes], [1, lt(eyes, .38)]]);
    // los ojos van en un grupo aparte para poder parpadear
    s += '<g class="blink">';
    s += [-1, 1].map(k => `<ellipse cx="${k * ex}" cy="${ey}" rx="${rx}" ry="${ry}" fill="${irisG}" stroke="${warm(eyes, .6)}" stroke-width="1.5"/>`).join('');
    const pr = +(rx * .5).toFixed(1), pry = +(ry * .52).toFixed(1);
    s += `<path d="${[-1, 1].map(k => `M${k * ex - pr},${ey - 1}a${pr},${pry} 0 1,0 ${2 * pr},0a${pr},${pry} 0 1,0 ${-2 * pr},0`).join('')}" fill="#1e0f08"/>`;
    s += `<path d="${[-1, 1].map(k => dot(+(k * ex - 3.3 * er).toFixed(1), +(ey - 4.6 * er).toFixed(1), +(3.7 * er).toFixed(1)) + dot(+(k * ex + 3.6 * er).toFixed(1), +(ey + 4.4 * er).toFixed(1), +(1.8 * er).toFixed(1))).join('')}" fill="#fff"/>`;
    s += '</g>';
    // pestañas: párpado de arriba grueso y dos pestañitas hacia afuera
    const lash = [-1, 1].map(k => {
      const x0 = k * ex - rx - 1, x1 = k * ex + rx + 1, ou = k * (ex + rx);
      return `M${x0},${ey - 2} C${x0 + 2},${ey - ry - 5} ${x1 - 2},${ey - ry - 5} ${x1},${ey - 2} M${ou},${ey - 4} l${k * 6},-3 M${ou - k * 3},${ey - ry + 1} l${k * 4},-6`;
    }).join(' ');
    s += line(lash, '#2a1408', 3.2);
    const by = ey - ry - (up ? 14 : 11);
    s += line(both(`M-31,${by + 2} Q-22,${by - 3} -13,${by + 1} `), hairLine, 3.2, .9);
    s += line('M-3.5,-188 Q0,-185 3.5,-188', skinLine, 2.5, .75);
    s += `<ellipse cx="-37" cy="-184" rx="12" ry="8" fill="${rg('kidBl', [[0, '#ff5f86', .6], [1, '#ff5f86', 0]])}"/><ellipse cx="37" cy="-184" rx="12" ry="8" fill="url(#kidBl)"/>`;
    if (up) {
      s += `<path d="M-15,-180 Q0,-183 15,-180 Q13,-160 0,-160 Q-13,-160 -15,-180 Z" fill="#8e2236" stroke="#6d1a2a" stroke-width="2" stroke-linejoin="round"/>`;
      s += `<path d="M-8,-164 Q0,-172 8,-164 Q0,-159.5 -8,-164 Z" fill="#ff7f95"/>`;
      s += `<path d="M-12.5,-179.5 Q0,-181.5 12.5,-179.5 L11.5,-175.5 Q0,-177 -11.5,-175.5 Z" fill="#fff"/>`;
    } else {
      s += line('M-12,-178 Q0,-167 12,-178', '#a3374a', 3.6);
      s += line('M-13.5,-179.5 L-11,-176.5 M13.5,-179.5 L11,-176.5', '#a3374a', 2, .6);
    }
    if (o.mud) {
      s += `<path d="${dot(-42, -178, 5.5)}${dot(-48, -174, 3.2)}${dot(-36, -173, 2.4)}${dot(33, -173, 6)}${dot(40, -177, 3)}${dot(9, -236, 4.5)}${dot(15, -233, 2.4)}" fill="#7b5233" opacity=".92"/>`;
      s += `<path d="${dot(-44, -180, 1.6)}${dot(31, -175, 1.8)}${dot(8, -238, 1.3)}" fill="#b08860"/>`;
    }

    // ---------- diadema de Sofía ----------
    if (o.headband) {
      s += line('M-62,-228 Q0,-298 62,-228', cool(o.headband, .45), 14);
      s += line('M-62,-228 Q0,-298 62,-228', o.headband, 10);
      s += line('M-50,-245 Q-26,-268 0,-270', lt(o.headband, .6), 3, .8);
    }

    // ---------- corona de reina ----------
    if (o.crown) {
      s += `<g transform="translate(0,-7) rotate(-5 0 -262)"><path d="M-42,-258 L-49,-302 L-24,-280 L0,-314 L24,-280 L49,-302 L42,-258 Q0,-250 -42,-258 Z" fill="${gGold}" stroke="#c97a00" stroke-width="3" stroke-linejoin="round"/>
        ${line('M-43,-267 Q0,-259 43,-267', '#e89b00', 4, .7)}
        <circle cx="-24" cy="-270" r="6" fill="#e53935" stroke="#9e1b1b" stroke-width="1.5"/><circle cx="0" cy="-272" r="7.5" fill="#42a5f5" stroke="#1565c0" stroke-width="1.5"/><circle cx="24" cy="-270" r="6" fill="#ff5fa2" stroke="#c2185b" stroke-width="1.5"/>
        <path d="${dot(-26, -272, 1.8)}${dot(-2.5, -275, 2.2)}${dot(22, -272, 1.8)}" fill="#fff"/>
        <path d="${dot(-49, -304, 5.5)}${dot(0, -316, 6)}${dot(49, -304, 5.5)}" fill="#fff8e1" stroke="#d9a94a" stroke-width="1.5"/>
        ${line('M-38,-262 L-43,-292 M-8,-290 L-3,-302', '#fff', 3, .6)}</g>`;
    }

    // ---------- cámara al pecho ----------
    if (o.camera) {
      s += line('M-20,-155 C-24,-142 -19,-131 -14,-127 M20,-155 C24,-142 19,-131 14,-127', '#2b2b33', 3.5);
      s += `<rect x="-14" y="-137" width="12" height="8" rx="2.5" fill="#455a64" stroke="#162026" stroke-width="2"/><rect x="7" y="-136" width="9" height="6" rx="2" fill="#ff5fa2" stroke="#ad1457" stroke-width="1.5"/>`;
      s += `<rect x="-21" y="-131" width="42" height="28" rx="7" fill="${lg('kidMt', [[0, '#78909c'], [1, '#263238']], 1, 0)}" stroke="#162026" stroke-width="2.5"/>`;
      s += `<rect x="-17" y="-127" width="7" height="4" rx="1.5" fill="#e0f7fa"/><circle cx="0" cy="-117" r="11" fill="#1c262b"/>`;
      s += `<circle cx="0" cy="-117" r="7.5" fill="${rg('kidGl', [[0, '#e3f6ff'], [.5, '#64b5f6'], [1, '#1a3d63']], .35, .3, .75)}"/><path d="${dot(-2.6, -119.8, 2.2)}" fill="#fff"/>`;
      s += line('M-17,-106 L17,-106', '#000', 2, .2);
    }
    if (o.medal) {
      s += `<circle cx="0" cy="-94" r="15" fill="${gGold}" stroke="#c77800" stroke-width="2.5"/><circle cx="0" cy="-94" r="10.5" fill="none" stroke="#ffe8a0" stroke-width="2"/>`;
      s += `<path d="${star(0, -94, 7.5, 3.4)}" fill="#fff3b0" stroke="#e08a00" stroke-width="1.2"/>` + line('M-10,-101 Q-8,-106 -3,-107', '#fff', 2.5, .8);
    }

    if (up) s += arms();
    return `<g><defs>${[...defs.values()].join('')}</defs>${s}</g>`;
  };
})();
