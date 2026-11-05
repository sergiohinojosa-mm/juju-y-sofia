// Arte del juego: caricatura suave y redondita, dibujada con SVG para verse nítida en laptop y iPhone.
// Las figuras se dibujan con el origen en los pies (centro abajo).

const Art = (() => {
  const A = {};

  // ---------- Personajes ----------
  A.kid = (o) => {
    const skin = o.skin, hair = o.hair, ink = '#4a2a1a';
    let s = '';
    // capa de reina (premio de frutas), por detrás de todo
    if (o.accessory >= 1) s += `<path d="M-34,-150 Q0,-160 34,-150 L76,-20 Q0,0 -76,-20 Z" fill="#c2185b"/><path d="M-34,-150 Q0,-160 34,-150" stroke="#ffd23f" stroke-width="8" fill="none"/>`;
    // pelo largo y suelto (atrás); ondulado y esponjado con mechas claras si es "wavy"
    if (o.wavy) {
      s += `<path d="M-72,-236 C-100,-190 -78,-160 -98,-122 C-112,-92 -86,-70 -96,-44 Q-60,-26 -30,-38 Q0,-26 30,-38 Q60,-26 96,-44 C86,-70 112,-92 98,-122 C78,-160 100,-190 72,-236 Z" fill="${hair}"/>`;
      s += `<path d="M-84,-180 C-70,-150 -94,-120 -80,-84 M84,-176 C70,-146 94,-118 80,-80 M-66,-150 C-54,-120 -74,-96 -62,-60 M68,-146 C56,-116 76,-92 64,-58" stroke="${o.hairLight}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>`;
      s += `<circle cx="0" cy="-216" r="74" fill="${hair}"/>`;
    } else {
      if (o.longHair) s += `<path d="M-66,-222 C-76,-150 -82,-100 -64,-58 Q-32,-48 0,-56 Q32,-48 64,-58 C82,-100 76,-150 66,-222 Z" fill="${hair}"/>`;
      s += `<circle cx="0" cy="-214" r="68" fill="${hair}"/>`;
    }
    // piernas y zapatos
    s += `<rect x="-24" y="-50" width="15" height="44" rx="7" fill="${skin}"/><rect x="9" y="-50" width="15" height="44" rx="7" fill="${skin}"/>`;
    s += `<ellipse cx="-18" cy="-7" rx="17" ry="9" fill="${o.shoes}"/><ellipse cx="18" cy="-7" rx="17" ry="9" fill="${o.shoes}"/>`;
    // ropa
    if (o.dress) {
      s += `<path d="M-28,-152 Q0,-160 28,-152 L68,-46 Q0,-30 -68,-46 Z" fill="${o.dressColor}"/>`;
      s += [[-30, -80], [0, -62], [30, -84], [-12, -110], [16, -120], [-44, -56], [46, -58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${o.dots}"/>`).join('');
      s += `<path d="M-64,-50 Q0,-36 64,-50" stroke="${o.dots}" stroke-width="6" fill="none"/>`;
    } else {
      s += `<path d="M-38,-104 L38,-104 L60,-46 Q0,-36 -60,-46 Z" fill="${o.skirtColor}"/>`;
      s += `<path d="M-18,-100 L-28,-44 M0,-100 L0,-40 M18,-100 L28,-44" stroke="rgba(0,0,0,.15)" stroke-width="4"/>`;
      s += `<path d="M-30,-152 Q0,-158 30,-152 L36,-100 L-36,-100 Z" fill="${o.topColor}"/>`;
    }
    // brazos (arriba si celebra)
    const arm = (d) => `<path d="${d}" stroke="${skin}" stroke-width="15" fill="none" stroke-linecap="round"/>`;
    s += arm(o.cheer ? 'M-30,-140 Q-58,-170 -56,-212' : 'M-30,-140 Q-50,-112 -48,-84');
    s += arm(o.cheer ? 'M30,-140 Q58,-170 56,-212' : 'M30,-140 Q50,-112 48,-84');
    const sleeve = o.dress ? o.dressColor : o.topColor;
    s += `<circle cx="-31" cy="-144" r="15" fill="${sleeve}"/><circle cx="31" cy="-144" r="15" fill="${sleeve}"/>`;
    // pulsera rosa de cuentas en la muñeca derecha
    if (o.bracelet) { const [bx, by] = o.cheer ? [57, -200] : [49, -94]; s += [-8, 0, 8].map(d => `<circle cx="${bx + d}" cy="${by}" r="5" fill="${['#ff8fb8', '#ff5fa2', '#ffc1d9'][(d + 8) / 8]}"/>`).join(''); }
    if (o.flashlight) {
      const [fx, fy, fr] = o.cheer ? [56, -218, -10] : [48, -84, 20];
      s += `<g transform="translate(${fx},${fy}) rotate(${fr})"><rect x="-8" y="-28" width="16" height="34" rx="5" fill="#455a64"/><rect x="-11" y="-36" width="22" height="12" rx="4" fill="#ffd54f"/></g>`;
    }
    // varita mágica (premio de frutas), en la mano izquierda
    if (o.accessory >= 2) {
      const [wx, wy] = o.cheer ? [-56, -212] : [-48, -84];
      s += `<g transform="translate(${wx},${wy}) rotate(-20)"><rect x="-4" y="-70" width="8" height="74" rx="4" fill="#8d6e63"/><path d="M0,-100 L8,-82 L28,-80 L13,-67 L18,-48 L0,-58 L-18,-48 L-13,-67 L-28,-80 L-8,-82 Z" fill="#ffd23f" stroke="#ff9800" stroke-width="3"/></g>`;
    }
    // cabeza
    s += `<rect x="-9" y="-160" width="18" height="16" fill="${skin}"/>`;
    s += `<circle cx="-60" cy="-205" r="11" fill="${skin}"/><circle cx="60" cy="-205" r="11" fill="${skin}"/>`;
    s += `<circle cx="0" cy="-210" r="60" fill="${skin}"/>`;
    if (o.wavy) {
      // raya de lado, sin fleco: la frente se ve; mechones que enmarcan la cara
      s += `<path d="M-66,-196 C-74,-262 -36,-292 -6,-288 C-26,-266 -46,-240 -66,-196 Z" fill="${hair}"/>`;
      s += `<path d="M66,-204 C74,-266 34,-294 -6,-288 C22,-276 48,-246 66,-204 Z" fill="${hair}"/>`;
      s += `<path d="M-30,-282 C-44,-266 -54,-246 -60,-222 M26,-284 C44,-270 56,-250 60,-226" stroke="${o.hairLight}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>`;
      s += `<path d="M-62,-214 C-82,-176 -60,-148 -76,-108 C-62,-124 -52,-156 -48,-186 Z M62,-214 C82,-176 60,-148 76,-108 C62,-124 52,-156 48,-186 Z" fill="${hair}"/>`;
    } else {
      s += `<path d="M-63,-200 C-68,-262 -32,-286 0,-286 C32,-286 68,-262 63,-200 C55,-232 38,-246 20,-244 C8,-236 -8,-236 -20,-244 C-38,-246 -55,-232 -63,-200 Z" fill="${hair}"/>`;
    }
    if (o.earrings) s += `<circle cx="-60" cy="-194" r="4" fill="#ffc107"/><circle cx="60" cy="-194" r="4" fill="#ffc107"/>`;
    // cara
    const eyes = o.eyes || ink, er = o.bigEyes ? 1.2 : 1;
    s += `<ellipse cx="-22" cy="-204" rx="${8 * er}" ry="${10 * er}" fill="${eyes}"/><ellipse cx="22" cy="-204" rx="${8 * er}" ry="${10 * er}" fill="${eyes}"/>`;
    if (o.bigEyes) s += `<circle cx="-22" cy="-204" r="5" fill="${ink}"/><circle cx="22" cy="-204" r="5" fill="${ink}"/>`;
    s += `<circle cx="-19" cy="-208" r="3" fill="#fff"/><circle cx="25" cy="-208" r="3" fill="#fff"/>`;
    s += `<circle cx="-38" cy="-184" r="10" fill="#ff8fa3" opacity=".55"/><circle cx="38" cy="-184" r="10" fill="#ff8fa3" opacity=".55"/>`;
    s += o.cheer
      ? `<path d="M-16,-182 Q0,-158 16,-182 Z" fill="#b23a48"/>`
      : `<path d="M-14,-182 Q0,-168 14,-182" stroke="#b23a48" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    if (o.mud) s += `<circle cx="-30" cy="-196" r="5" fill="#795548"/><circle cx="34" cy="-176" r="6" fill="#795548"/><circle cx="8" cy="-232" r="4" fill="#795548"/>`;
    if (o.headband) s += `<path d="M-60,-232 Q0,-292 60,-232" stroke="${o.headband}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    // corona de reina
    if (o.crown) s += `<g transform="translate(0,-270)"><path d="M-46,10 L-50,-34 L-26,-12 L0,-44 L26,-12 L50,-34 L46,10 Z" fill="#ffc107" stroke="#ff8f00" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="-24" cy="0" r="7" fill="#e53935"/><circle cx="0" cy="-2" r="8" fill="#42a5f5"/><circle cx="24" cy="0" r="7" fill="#ff5fa2"/>
      <circle cx="-50" cy="-36" r="6" fill="#fff59d"/><circle cx="0" cy="-46" r="6" fill="#fff59d"/><circle cx="50" cy="-36" r="6" fill="#fff59d"/></g>`;
    if (o.camera) s += `<path d="M-24,-152 L0,-122 L24,-152" stroke="#333" stroke-width="3" fill="none"/><rect x="-20" y="-130" width="40" height="28" rx="6" fill="#37474f"/><circle cx="0" cy="-116" r="9" fill="#90caf9" stroke="#1c2a33" stroke-width="3"/><rect x="8" y="-136" width="9" height="6" rx="2" fill="#37474f"/>`;
    if (o.medal) s += `<path d="M-14,-152 L0,-112 L14,-152" stroke="#e53935" stroke-width="6" fill="none"/><circle cx="0" cy="-104" r="14" fill="#ffc107" stroke="#ff8f00" stroke-width="3"/>`;
    return `<g>${s}</g>`;
  };

  // Juju: pelo largo ondulado y esponjado, castaño claro con mechas doradas,
  // raya de lado sin fleco, piel bronceada, ojos cafés grandes, aretitos dorados, pulsera rosa,
  // vestido rosa y corona de reina.
  A.juju = (o = {}) => A.kid(Object.assign({
    skin: '#dfa77c', hair: '#8a5a32', hairLight: '#d4a462', wavy: true, eyes: '#6b4226', bigEyes: true,
    earrings: true, bracelet: true, crown: true,
    dress: true, dressColor: '#ff5fa2', dots: '#ffd6e9', shoes: '#c2185b', camera: true,
  }, o));
  // Sofía: falda y blusa verdes, pelo largo suelto.
  A.sofia = (o = {}) => A.kid(Object.assign({
    skin: '#eec09a', hair: '#3b2416', longHair: true, headband: '#a5d6a7',
    dress: false, topColor: '#66bb6a', skirtColor: '#2e7d32', shoes: '#1b5e20', flashlight: true,
  }, o));

  // ---------- Animales (la mamá y el bebé usan el mismo dibujo; el bebé va más chico) ----------
  A.frog = (mood) => {
    const g = '#3ccf4e', d = '#2aa63b';
    let s = `<ellipse cx="-58" cy="-10" rx="26" ry="11" fill="#ff9f1c"/><ellipse cx="58" cy="-10" rx="26" ry="11" fill="#ff9f1c"/>`;
    s += `<ellipse cx="0" cy="-58" rx="74" ry="54" fill="${g}"/>`;
    s += `<ellipse cx="-64" cy="-52" rx="10" ry="24" fill="#3b6fd6"/><ellipse cx="64" cy="-52" rx="10" ry="24" fill="#3b6fd6"/>`;
    s += `<ellipse cx="0" cy="-44" rx="46" ry="32" fill="#eaf7c9"/>`;
    s += `<ellipse cx="-26" cy="-10" rx="14" ry="8" fill="#ff9f1c"/><ellipse cx="26" cy="-10" rx="14" ry="8" fill="#ff9f1c"/>`;
    for (const x of [-36, 36]) {
      s += `<circle cx="${x}" cy="-104" r="27" fill="${g}"/><circle cx="${x}" cy="-104" r="19" fill="#ff2b2b"/><ellipse cx="${x}" cy="-104" rx="4" ry="12" fill="#111"/><circle cx="${x + 6}" cy="-111" r="4" fill="#fff"/>`;
      if (mood === 'sad') s += `<path d="M${x - 28},-106 A28,28 0 0 1 ${x + 28},-106 Z" fill="${d}"/>`;
    }
    s += `<circle cx="-46" cy="-70" r="8" fill="#ff8fa3" opacity=".6"/><circle cx="46" cy="-70" r="8" fill="#ff8fa3" opacity=".6"/>`;
    s += mood === 'sad'
      ? `<path d="M-20,-62 Q0,-72 20,-62" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : `<path d="M-32,-76 Q0,-50 32,-76" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    return s;
  };

  A.toucan = (mood) => {
    let s = `<path d="M-14,-40 L-30,10 L4,10 L6,-40 Z" fill="#1f1f2e"/>`;
    s += `<path d="M-6,-24 l-6,22 M10,-24 l6,22" stroke="#7aa3c9" stroke-width="6" stroke-linecap="round"/>`;
    s += `<ellipse cx="0" cy="-100" rx="50" ry="80" fill="#1f1f2e"/>`;
    s += `<ellipse cx="6" cy="-34" rx="22" ry="10" fill="#e53935"/>`;
    s += `<ellipse cx="18" cy="-128" rx="32" ry="36" fill="#fff6c2"/>`;
    s += `<ellipse cx="-16" cy="-92" rx="26" ry="52" fill="#2e2e44"/>`;
    s += `<circle cx="20" cy="-160" r="15" fill="#5fd0ff"/>`;
    s += mood === 'sad'
      ? `<path d="M12,-160 Q20,-154 28,-160" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="22" cy="-161" r="6" fill="#111"/><circle cx="24" cy="-163" r="2" fill="#fff"/>`;
    s += `<path d="M30,-178 C80,-205 152,-196 178,-162 C150,-150 84,-142 32,-148 Z" fill="#ff9800"/>`;
    s += `<path d="M30,-178 C80,-205 152,-196 178,-162 C140,-182 80,-182 34,-168 Z" fill="#ffd54f"/>`;
    s += `<path d="M162,-176 C170,-170 176,-165 178,-162 C170,-158 162,-155 154,-154 Z" fill="#212121"/>`;
    s += `<path d="M36,-160 C80,-158 130,-160 165,-160" stroke="#bf6a00" stroke-width="3" fill="none"/>`;
    return s;
  };

  A.sloth = (mood) => {
    const fur = '#a88462', face = '#f2dfbf', mask = '#5b3a22';
    let s = `<ellipse cx="-34" cy="-12" rx="24" ry="14" fill="${fur}"/><ellipse cx="34" cy="-12" rx="24" ry="14" fill="${fur}"/>`;
    s += `<ellipse cx="0" cy="-78" rx="72" ry="70" fill="${fur}"/>`;
    s += `<circle cx="-30" cy="-60" r="6" fill="#7cb342"/><circle cx="22" cy="-40" r="7" fill="#7cb342"/><circle cx="40" cy="-90" r="5" fill="#7cb342"/>`;
    s += `<path d="M-56,-100 Q-96,-64 -64,-26 M56,-100 Q96,-64 64,-26" stroke="${fur}" stroke-width="28" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M-70,-20 l-6,14 M-62,-18 l-2,15 M-54,-20 l3,14 M70,-20 l6,14 M62,-18 l2,15 M54,-20 l-3,14" stroke="#efe3c8" stroke-width="5" stroke-linecap="round"/>`;
    s += `<circle cx="0" cy="-158" r="56" fill="${fur}"/>`;
    s += `<ellipse cx="0" cy="-152" rx="44" ry="38" fill="${face}"/>`;
    s += `<ellipse cx="-20" cy="-158" rx="17" ry="10" fill="${mask}" transform="rotate(-20 -20 -158)"/><ellipse cx="20" cy="-158" rx="17" ry="10" fill="${mask}" transform="rotate(20 20 -158)"/>`;
    s += `<circle cx="-20" cy="-159" r="5" fill="#111"/><circle cx="20" cy="-159" r="5" fill="#111"/>`;
    s += `<ellipse cx="0" cy="-142" rx="10" ry="7" fill="#3a2414"/>`;
    s += mood === 'sad'
      ? `<path d="M-11,-124 Q0,-132 11,-124" stroke="#3a2414" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<path d="M-13,-131 Q0,-120 13,-131" stroke="#3a2414" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    return s;
  };

  // Cada animal: cómo se dibuja y su caja (centro y ancho) para centrarlo en fotos y miniaturas.
  const ANIMALS = {
    rana: { draw: A.frog, box: { cx: 0, cy: -65, w: 170 } },
    tucan: { draw: A.toucan, box: { cx: 64, cy: -97, w: 230 } },
    perezoso: { draw: A.sloth, box: { cx: 0, cy: -107, w: 215 } },
  };
  // js/art2.js agrega los animales y regalitos de las paradas 4 a 8.
  A.addAnimal = (id, def) => { ANIMALS[id] = def; };
  const EXTRA_GIFTS = {};
  A.addGift = (id, svg) => { EXTRA_GIFTS[id] = svg; };

  A.animal = (id, mood = 'happy') => (ANIMALS[id] ? ANIMALS[id].draw(mood) : '');
  A.thumb = (id, size, mood = 'happy') => {
    const b = ANIMALS[id] && ANIMALS[id].box;
    if (!b) return '';
    return `<g transform="scale(${(size / b.w).toFixed(3)}) translate(${-b.cx},${-b.cy})">${A.animal(id, mood)}</g>`;
  };
  // Mamá y bebé juntos, centrados en el origen, en una caja de ~size de ancho.
  A.family = (id, size) => {
    const k = size / 360;
    return `<g transform="scale(${k.toFixed(3)})"><g transform="translate(-70,0)">${A.thumb(id, 220)}</g><g transform="translate(115,45)">${A.thumb(id, 130)}</g></g>`;
  };

  // ---------- Pistas ----------
  const drop = (x, y, s = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,-30 C10,-14 16,-4 16,6 A16,16 0 0 1 -16,6 C-16,-4 -10,-14 0,-30 Z" fill="#4fc3f7" stroke="#0288d1" stroke-width="3"/>`;
  const feather = (x, y, r, c) => `<g transform="translate(${x},${y}) rotate(${r})"><path d="M0,40 C-20,12 -18,-26 0,-48 C18,-26 20,12 0,40 Z" fill="${c}" stroke="rgba(0,0,0,.2)" stroke-width="3"/><path d="M0,52 L0,-40" stroke="#8d6e63" stroke-width="4"/></g>`;
  const twig = (x, y, r) => `<g transform="translate(${x},${y}) rotate(${r})"><path d="M-46,0 L46,0 M-6,0 L18,-22 M14,0 L30,18" stroke="#8d5a2b" stroke-width="12" stroke-linecap="round" fill="none"/><ellipse cx="22" cy="-26" rx="12" ry="7" fill="#66bb6a"/></g>`;
  A.feather = feather;
  A.clue = (t) => ({
    gotas: drop(-28, 10) + drop(10, -18, .8) + drop(34, 16, 1.1),
    plumas: feather(-20, 0, -20, '#ffd54f') + feather(22, 6, 18, '#ff9800'),
    ramitas: twig(0, 0, -12) + twig(10, 26, 10),
  }[t] || EXTRA_CLUES[t] || '');
  const EXTRA_CLUES = {};
  A.addClue = (id, svg) => { EXTRA_CLUES[id] = svg; };

  // ---------- Escenario ----------
  A.tree = (x, y, s = 1, c1 = '#43a047', c2 = '#2e7d32') => `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-18" y="-260" width="36" height="260" rx="14" fill="#7b4a2a"/>
    <circle cx="-62" cy="-270" r="80" fill="${c2}"/><circle cx="62" cy="-275" r="85" fill="${c2}"/>
    <circle cx="0" cy="-330" r="95" fill="${c1}"/><circle cx="-30" cy="-250" r="60" fill="${c1}"/></g>`;
  A.leaf = (x, y, s, rot, c) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M0,0 C30,-45 100,-55 160,-20 C100,15 35,22 0,0Z" fill="${c}"/><path d="M0,0 C50,-15 100,-20 150,-20" stroke="rgba(255,255,255,.35)" stroke-width="4" fill="none"/></g>`;
  A.bush = (x, y, s = 1, c = '#4caf50') => `<g transform="translate(${x},${y}) scale(${s})"><circle cx="-40" cy="-20" r="42" fill="${c}"/><circle cx="35" cy="-24" r="46" fill="${c}"/><circle cx="0" cy="-48" r="48" fill="${c}"/><rect x="-80" y="-30" width="160" height="30" fill="${c}"/></g>`;
  A.flower = (x, y, c = '#ff5fa2', s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-14" rx="9" ry="14" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="8" fill="#ffd23f"/></g>`;
  A.sun = (x, y) => `<g transform="translate(${x},${y})"><circle r="100" fill="#fff59d" opacity=".45"/><circle r="66" fill="#ffd23f"/><circle cx="-20" cy="-8" r="6" fill="#8d5a00"/><circle cx="20" cy="-8" r="6" fill="#8d5a00"/><path d="M-20,14 Q0,30 20,14" stroke="#8d5a00" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  A.rainbow = (x, y, r) => ['#ff5252', '#ffb74d', '#fff176', '#81c784', '#64b5f6', '#ba68c8'].map((c, k) => `<path d="M${x - r + k * 14},${y} A${r - k * 14},${r - k * 14} 0 0 1 ${x + r - k * 14},${y}" stroke="${c}" stroke-width="14" fill="none" opacity=".75"/>`).join('');
  A.cloud = (grey) => `<g><circle cx="-60" cy="10" r="50" fill="${grey ? '#b0bec5' : '#fff'}"/><circle cx="0" cy="-20" r="65" fill="${grey ? '#b0bec5' : '#fff'}"/><circle cx="65" cy="8" r="50" fill="${grey ? '#b0bec5' : '#fff'}"/><rect x="-110" y="0" width="220" height="58" rx="29" fill="${grey ? '#b0bec5' : '#fff'}"/>
    ${grey ? '<path d="M-26,8 l12,0 M14,8 l12,0" stroke="#546e7a" stroke-width="5" stroke-linecap="round"/>' : '<circle cx="-20" cy="6" r="6" fill="#546e7a"/><circle cx="20" cy="6" r="6" fill="#546e7a"/><path d="M-14,22 Q0,34 14,22" stroke="#546e7a" stroke-width="5" fill="none" stroke-linecap="round"/>'}</g>`;
  A.ground = (y, c = '#6cc070') => `<path d="M0,${y} C300,${y - 30} 600,${y + 20} 900,${y - 10} C1200,${y - 35} 1400,${y + 10} 1600,${y - 15} L1600,900 L0,900 Z" fill="${c}"/>`;

  A.jungle = (ground = 620) => {
    let s = `<rect width="1600" height="900" fill="url(#sky)"/>`;
    s += `<path d="M0,${ground - 90} C220,${ground - 170} 420,${ground - 110} 640,${ground - 150} C860,${ground - 190} 1060,${ground - 100} 1280,${ground - 160} C1420,${ground - 190} 1520,${ground - 140} 1600,${ground - 150} L1600,900 L0,900 Z" fill="#9ad99a"/>`;
    [[90, .8], [300, .62], [1180, .66], [1520, .85]].forEach(([x, sc]) => { s += A.tree(x, ground + 20, sc); });
    s += A.ground(ground);
    s += A.bush(210, ground + 70, .8) + A.bush(1380, ground + 60, .9, '#43a047');
    s += A.flower(320, ground + 90) + A.flower(1250, ground + 110, '#ff8a65') + A.flower(760, ground + 140, '#ba68c8');
    return s;
  };

  // Hojas grandes en las esquinas (decoración al frente; no reciben toques).
  A.foreground = () => `<g pointer-events="none">${A.leaf(1610, 920, 2.4, -150, '#2e7d32')}${A.leaf(1620, 860, 2, -125, '#43a047')}${A.leaf(1500, 935, 1.8, -100, '#388e3c')}${A.leaf(-10, -10, 1.6, 35, '#2e7d32')}${A.leaf(1610, -10, 1.6, 145, '#2e7d32')}</g>`;

  A.river = (y, h) => `<rect y="${y}" width="1600" height="${h}" fill="url(#river)"/>` +
    Array.from({ length: 4 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<path d="M${c * 200 + (r % 2) * 100 + 30},${y + 50 + r * 70} q20,-12 40,0" stroke="#fff" stroke-width="4" fill="none" opacity=".5"/>`).join('')).join('');

  A.log = () => `<ellipse cx="0" cy="26" rx="110" ry="12" fill="#fff" opacity=".3"/><rect x="-90" y="-22" width="180" height="44" rx="22" fill="#8d5a2b"/><ellipse cx="90" cy="0" rx="14" ry="22" fill="#c8915a"/><ellipse cx="90" cy="0" rx="7" ry="11" fill="none" stroke="#8d5a2b" stroke-width="3"/>`;

  A.branch = () => `<rect x="-100" y="-14" width="200" height="28" rx="14" fill="#8d5a2b"/>`;

  // ---------- Regalitos de las mamás ----------
  A.gift = (id) => ({
    rana: A.leaf(-50, 20, .7, -30, '#7bd36b'),
    tucan: feather(0, 0, 25, '#ff9800'),
    perezoso: A.flower(0, 0, '#ff5fa2', 2.2),
  }[id] || EXTRA_GIFTS[id] || '');

  // ---------- La balsa ----------
  // La balsa mejora con cada familia reunida (idea de Juju) y los bebés rescatados viajan arriba:
  // 2 familias = barandal, 4 = techito de hoja, 6 = guirnalda de flores, 8 = balsa dorada con estrella.
  // `gifts` son los ids de las paradas rescatadas.
  A.raft = ({ gifts = [], accessory = 0, mud = false } = {}) => {
    const friends = gifts.filter(id => ANIMALS[id]), n = friends.length;
    const W = 420 + n * 74, x0 = -W / 2, gold = n >= 8;
    let s = `<ellipse cx="0" cy="56" rx="${W / 2 + 40}" ry="14" fill="#fff" opacity=".35"/>`;
    // postes del techito (atrás)
    if (n >= 4) s += `<rect x="${x0 + 92}" y="-262" width="10" height="262" rx="5" fill="#6d4126"/><rect x="${x0 + W - 64}" y="-262" width="10" height="262" rx="5" fill="#6d4126"/>`;
    // barandal
    if (n >= 2) {
      for (let x = x0 + 50; x <= x0 + W - 40; x += 90) s += `<rect x="${x}" y="-74" width="9" height="66" rx="4" fill="#8d5a2b"/>`;
      s += `<path d="M${x0 + 50},-66 Q${x0 + W / 2},-50 ${x0 + W - 32},-66" stroke="#f1d28a" stroke-width="6" fill="none"/>`;
    }
    // mástil, bandera rosa y regalitos
    s += `<rect x="${x0 + 30}" y="-250" width="10" height="250" rx="5" fill="${gold ? '#ffb300' : '#6d4126'}"/>`;
    if (gold) s += `<path d="M${x0 + 35},-290 L${x0 + 43},-272 L${x0 + 62},-270 L${x0 + 48},-257 L${x0 + 52},-238 L${x0 + 35},-248 L${x0 + 18},-238 L${x0 + 22},-257 L${x0 + 8},-270 L${x0 + 27},-272 Z" fill="#ffd23f" stroke="#ff9800" stroke-width="3"/>`;
    s += gifts.includes('tucan')
      ? `<g transform="translate(${x0 + 80},-218) rotate(90)">${A.gift('tucan')}</g>`
      : `<path d="M${x0 + 40},-246 L${x0 + 130},-218 L${x0 + 40},-190 Z" fill="#ff5fa2"/>`;
    if (gifts.includes('rana')) s += `<g transform="translate(${x0 + 60},-246) scale(1.4)">${A.gift('rana')}</g>`;
    s += `<g transform="translate(${x0 + 140},-8) scale(.62)">${A.juju({ accessory, mud })}</g>`;
    s += `<g transform="translate(${x0 + 260},-8) scale(.62)">${A.sofia({ mud })}</g>`;
    // amigos rescatados, en fila junto a Sofía
    friends.forEach((id, k) => { s += `<g transform="translate(${x0 + 356 + k * 74},-52)">${A.thumb(id, 92)}</g>`; });
    if (gifts.includes('perezoso')) s += `<g transform="translate(${x0 + W - 30},-30)">${A.gift('perezoso')}</g>`;
    // techito de hoja y guirnalda
    if (n >= 4) {
      s += `<path d="M${x0 + 70},-252 Q${x0 + W / 2 + 10},-330 ${x0 + W - 36},-252 Q${x0 + W / 2 + 10},-282 ${x0 + 70},-252 Z" fill="#43a047"/>`;
      s += `<path d="M${x0 + 90},-262 Q${x0 + W / 2 + 10},-312 ${x0 + W - 56},-262" stroke="#81c784" stroke-width="5" fill="none"/>`;
    }
    if (n >= 6) for (let k = 0; k < 7; k++) {
      const u = k / 6, x = x0 + 90 + (W - 150) * u, y = -250 + 22 * Math.sin(Math.PI * u);
      s += A.flower(x, y, ['#ff5fa2', '#ffd23f', '#ba68c8', '#ff8a65'][k % 4], .9);
    }
    // troncos (con orilla dorada al final)
    s += `<rect x="${x0}" y="-10" width="${W}" height="32" rx="16" fill="#b0743a"/>`;
    s += `<rect x="${x0 + 12}" y="18" width="${W - 24}" height="32" rx="16" fill="#8d5a2b"/>`;
    if (gold) s += `<rect x="${x0}" y="-12" width="${W}" height="8" rx="4" fill="#ffd23f"/>`;
    s += `<circle cx="${x0 + 16}" cy="6" r="13" fill="#d9a066"/><circle cx="${x0 + W - 16}" cy="6" r="13" fill="#d9a066"/>`;
    for (let x = x0 + 70; x < x0 + W - 40; x += 110) s += `<rect x="${x}" y="-12" width="10" height="64" rx="4" fill="${gold ? '#ffe082' : '#f1d28a'}"/>`;
    // Regalitos de las paradas 4 a 8: chiquitos, en fila sobre el tronco de enfrente.
    gifts.filter(id => EXTRA_GIFTS[id]).forEach((id, k) => { s += `<g transform="translate(${x0 + 70 + k * 70},34) scale(.45)">${EXTRA_GIFTS[id]}</g>`; });
    return s;
  };

  return A;
})();
