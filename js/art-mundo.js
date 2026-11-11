// Mundo vivo: fondos con movimiento suave (nubes que pasan, pajaritos, motitas de luz, mariposas),
// plantas nuevas (palmeras, helechos, hongos, piedras, estanque) y el mapa ilustrado del río.
// Se carga después de los demás archivos de arte y vuelve a definir Art.jungle y Art.savanna.
// Todo lo de ambiente lleva pointer-events="none" para no estorbar los toques.
(() => {
  const A = Art;
  const f = (n) => +n.toFixed(1);
  const floorShadow = (w, y = 0) => `<ellipse cx="0" cy="${y}" rx="${w}" ry="${f(w * .16)}" fill="#0b3016" opacity=".18"/>`;
  const STAR = 'M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z';

  // ---------- Plantas y adornos ----------
  // Palmera: tronco curvo con anillos y una copa de seis hojas (la copa puede mecerse).
  A.palm = (x, y, s = 1, sway = false) => {
    const fronds = [165, -150, -110, -70, -30, 15].map((a, k) =>
      `<g transform="rotate(${a})${Math.abs(a) > 90 ? ' scale(1,-1)' : ''}"><path d="M0,0 C40,-40 110,-40 150,10 C100,-6 50,0 0,0 Z" fill="${k % 2 ? '#66bb6a' : '#43a047'}"/><path d="M8,-3 C50,-24 100,-22 140,6" stroke="#2e7d32" stroke-width="3" fill="none" opacity=".4"/></g>`).join('');
    const rings = [[-9, -40, 15], [-3, -95, 19], [6, -150, 24], [19, -205, 31]].map(([a, ry, b]) =>
      `<path d="M${a},${ry} q${(b - a) / 2},7 ${b - a + 12},-2" stroke="#7a4f24" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>`).join('');
    return `<g transform="translate(${x},${y}) scale(${s})">${floorShadow(60, 2)}` +
      `<path d="M-14,0 C-4,-90 8,-170 34,-250 L54,-244 C34,-166 24,-88 16,0 Z" fill="#a9763f"/>` +
      `<path d="M4,0 C12,-88 22,-166 44,-247 L54,-244 C34,-166 24,-88 16,0 Z" fill="#7a4f24" opacity=".35"/>${rings}` +
      `<g transform="translate(44,-250)"><g${sway ? ' class="sway"' : ''}>${fronds}<circle cx="-10" cy="12" r="11" fill="#6d4c2f"/><circle cx="12" cy="14" r="10" fill="#8d6238"/><circle cx="9" cy="10" r="3" fill="#fff" opacity=".3"/></g></g></g>`;
  };
  A.fern = (x, y, s = 1, c = '#43a047') => `<g transform="translate(${x},${y}) scale(${s})">` +
    [-62, -32, 0, 32, 62].map((a, k) => `<g transform="rotate(${a})"><path d="M0,0 C-12,-40 -8,-80 0,-104 C8,-80 12,-40 0,0 Z" fill="${k % 2 ? '#66bb6a' : c}"/><path d="M0,-6 L0,-92" stroke="#2e7d32" stroke-width="2.5" opacity=".4"/></g>`).join('') + `</g>`;
  A.mushroom = (x, y, s = 1, c = '#ef5350') => `<g transform="translate(${x},${y}) scale(${s})">${floorShadow(30)}` +
    `<path d="M-12,0 C-14,-14 -10,-26 -9,-34 L9,-34 C10,-26 14,-14 12,0 Z" fill="#fff3e0"/><path d="M2,0 C3,-14 5,-26 4,-34 L9,-34 C10,-26 14,-14 12,0 Z" fill="#e6cfa8" opacity=".7"/>` +
    `<path d="M-34,-30 C-34,-62 -14,-76 0,-76 C14,-76 34,-62 34,-30 C20,-24 -20,-24 -34,-30 Z" fill="${c}"/>` +
    `<circle cx="-14" cy="-48" r="6" fill="#fff"/><circle cx="8" cy="-60" r="5" fill="#fff"/><circle cx="19" cy="-40" r="4.5" fill="#fff"/>` +
    `<ellipse cx="-12" cy="-63" rx="12" ry="5" fill="#fff" opacity=".3" transform="rotate(-24 -12 -63)"/></g>`;
  A.rock = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${floorShadow(52)}` +
    `<path d="M-46,0 C-52,-26 -30,-50 -4,-48 C22,-52 48,-30 44,0 Z" fill="#9aa5a8"/>` +
    `<path d="M-46,0 C-52,-26 -30,-50 -4,-48 C-16,-34 -22,-16 -20,0 Z" fill="#b9c3c6"/>` +
    `<path d="M-30,-40 C-14,-54 16,-54 30,-40 C14,-45 -12,-45 -30,-40 Z" fill="#7cb342"/></g>`;
  A.pond = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">` +
    `<ellipse rx="136" ry="60" fill="#2f8a3c" opacity=".5"/><ellipse rx="126" ry="52" fill="#e8d39a"/><ellipse rx="115" ry="44" fill="url(#water)"/>` +
    `<ellipse cx="-36" cy="-17" rx="52" ry="11" fill="#fff" opacity=".35"/>` +
    `<g transform="translate(48,12)"><ellipse rx="25" ry="11" fill="#43a047"/><path d="M0,0 L25,-5 L25,5 Z" fill="#4fc3f7"/></g>` +
    `<g transform="translate(-52,16)"><ellipse rx="20" ry="9" fill="#66bb6a"/><path d="M0,0 L-20,-4 L-20,4 Z" fill="#4fc3f7"/></g>` +
    A.flower(-48, 12, '#ff8ac0', .42) +
    `<g transform="translate(14,-14)"><path class="twinkle" d="${STAR}" fill="#fff"/></g></g>`;
  const tuft = (x, y, k = 1, c = '#2f8a3c') =>
    `<path d="M${x},${y} q${-4 * k},${-18 * k} ${-12 * k},${-24 * k} M${x},${y} q0,${-22 * k} ${2 * k},${-30 * k} M${x},${y} q${6 * k},${-16 * k} ${14 * k},${-22 * k}" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".5"/>`;

  // ---------- Ambiente con movimiento ----------
  const CLOUD = `<ellipse rx="90" ry="26"/><ellipse cx="-40" cy="-16" rx="44" ry="30"/><ellipse cx="30" cy="-22" rx="52" ry="36"/>`;
  // Nube que cruza despacio el cielo. Empieza en x0 (el retraso negativo la coloca ahí).
  A.cloudDrift = (x0, y, k = 1, dur = 120, o = .85, fill = '#fff', shadow = 0) =>
    `<g transform="translate(0,${y})" pointer-events="none"><g class="cloud-go" style="--x0:${x0}px;animation-duration:${dur}s;animation-delay:${f(-dur * (x0 + 220) / 2040)}s">` +
    (shadow ? `<ellipse cx="30" cy="${shadow}" rx="${f(96 * k)}" ry="${f(18 * k)}" fill="#0b3016" opacity=".1"/>` : '') +
    `<g transform="scale(${k})" opacity="${o}" fill="${fill}">${CLOUD}</g></g></g>`;
  // Tres pajaritos que cruzan aleteando.
  A.birds = (x0, y, dur = 48, c = '#3a6b5a') =>
    `<g transform="translate(0,${y})" pointer-events="none"><g class="bird-go" style="--x0:${x0}px;animation-duration:${dur}s;animation-delay:${f(-dur * (x0 + 80) / 1900)}s">` +
    [[0, 0], [44, 22], [-38, 26]].map(([dx, dy], k) => `<g transform="translate(${dx},${dy})"><path class="flap" style="animation-delay:${-k * .17}s" d="M-12,0 q6,-8 12,0 q6,-8 12,0" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/></g>`).join('') +
    `</g></g>`;
  const motes = (pts) => `<g pointer-events="none">` + pts.map(([x, y], k) =>
    `<g transform="translate(${x},${y})"><circle class="mote" r="${3 + (k % 3)}" fill="#fffde7" style="animation-duration:${6 + (k % 4)}s;animation-delay:${f(-k * 1.7)}s"/></g>`).join('') + `</g>`;
  // Mariposa chiquita que revolotea alrededor de un punto.
  A.flit = (x, y, c = '#ff8ac0', k = .5, delay = 0) =>
    `<g transform="translate(${x},${y})" pointer-events="none"><g class="flit" style="animation-delay:${delay}s"><g transform="scale(${k})"><g class="flutter">${A.butterfly(c)}</g></g></g></g>`;
  A.glint = (x, y, s = 1, delay = 0) =>
    `<g transform="translate(${x},${y}) scale(${s})" pointer-events="none"><path class="twinkle" style="animation-delay:${delay}s" d="${STAR}" fill="#fff"/></g>`;

  // ---------- Detalles del mundo: cascada, lianas y bichitos ----------
  // Cascada lejana: el agua baja con rayitas que corren y levanta bruma al caer.
  const waterfall = (x, y0, y1) => {
    const h = y1 - y0, side = (d) => `C${x + d * 19},${f(y0 + h * .5)} ${x + d * 24},${f(y0 + h * .8)} ${x + d * 28},${y1}`;
    return `<g pointer-events="none"><path d="M${x - 15},${y0} ${side(-1)} L${x + 28},${y1} C${x + 24},${f(y0 + h * .8)} ${x + 19},${f(y0 + h * .5)} ${x + 15},${y0} Z" fill="#dff4ff"/>` +
      `<path d="M${x - 15},${y0} ${side(-1)} L${x - 10},${y1} L${x - 5},${y0} Z" fill="#b3e0f7" opacity=".7"/>` +
      [[-7, '16 34', 4, 1.1], [4, '22 28', 3, 1.4], [12, '10 15', 2.5, .9]].map(([dx, dash, w, dur]) =>
        `<path class="flow" style="animation-duration:${dur}s" d="M${x + dx},${y0 + 6} L${f(x + dx * 1.7)},${y1 - 6}" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${dash}" fill="none" opacity=".9"/>`).join('') +
      `<ellipse cx="${x}" cy="${y0 + 2}" rx="20" ry="6" fill="#fff" opacity=".85"/>` +
      `<g fill="#fff" opacity=".85"><ellipse cx="${x - 22}" cy="${y1}" rx="26" ry="13"/><ellipse cx="${x + 20}" cy="${y1 + 2}" rx="30" ry="14"/><ellipse cx="${x}" cy="${y1 - 8}" rx="22" ry="12"/></g>` +
      A.glint(x - 36, y1 - 24, .5) + A.glint(x + 38, y1 - 16, .4, -.8) + `</g>`;
  };
  // Liana colgante con hojitas y una flor en la punta; se mece desde arriba.
  A.vine = (x, len, c = '#2e7d32', fl = '#ff8ac0', delay = 0) => {
    let s = `<path d="M0,-20 C-14,${f(len * .3)} 14,${f(len * .65)} 0,${len}" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    for (let k = 1; k * 46 < len; k++) {
      const y = k * 46 - 10, t = (y + 20) / (len + 20), vx = f(42 * t * (1 - t) * (2 * t - 1)), d = k % 2 ? 1 : -1;
      s += `<path d="M${vx},${y} C${vx + d * 10},${y - 14} ${vx + d * 30},${y - 12} ${vx + d * 38},${y + 4} C${vx + d * 28},${y + 12} ${vx + d * 10},${y + 10} ${vx},${y} Z" fill="${k % 2 ? '#43a047' : '#66bb6a'}"/>`;
    }
    return `<g transform="translate(${x},0)" pointer-events="none"><g class="vine" style="animation-delay:${delay}s">${s}${A.flower(0, len + 6, fl, .6)}</g></g>`;
  };
  const ladybug = (x, y, k = 1, rot = 0) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${k})" pointer-events="none">` +
    `<circle cx="11" cy="0" r="6" fill="#263238"/><circle r="12" fill="#ef5350"/><path d="M-12,0 L8,0" stroke="#263238" stroke-width="2"/>` +
    [[-5, -5, 2.6], [-4, 5, 2.2], [4, -6, 2.2], [3, 5, 2.6]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#263238"/>`).join('') +
    `<ellipse cx="-4" cy="-7" rx="5" ry="2.2" fill="#fff" opacity=".45"/><circle cx="14" cy="-2.5" r="1.3" fill="#fff"/></g>`;
  const snail = (x, y, k = 1) => `<g transform="translate(${x},${y}) scale(${k})" pointer-events="none">${floorShadow(48)}` +
    `<path d="M-40,0 C-46,-10 -30,-14 -10,-12 L30,-12 C44,-12 50,-22 48,-36 L62,-36 C66,-16 54,0 36,0 Z" fill="#ffcc80"/>` +
    `<path d="M52,-36 L48,-54 M58,-36 L63,-54" stroke="#ffb74d" stroke-width="3.5" stroke-linecap="round"/><circle cx="48" cy="-56" r="4.5" fill="#3e2723"/><circle cx="63" cy="-56" r="4.5" fill="#3e2723"/><circle cx="49.5" cy="-57.5" r="1.4" fill="#fff"/><circle cx="64.5" cy="-57.5" r="1.4" fill="#fff"/>` +
    `<circle cx="-2" cy="-30" r="28" fill="#ba68c8"/><path d="M-2,-30 a4,4 0 0,1 8,0 a8,8 0 0,1 -16,0 a12,12 0 0,1 24,0 a16,16 0 0,1 -32,0" stroke="#8e24aa" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="-12" cy="-46" rx="10" ry="5" fill="#fff" opacity=".35" transform="rotate(-30 -12 -46)"/>` +
    `<path d="M51,-22 q4,4 8,0" stroke="#8d5a2b" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="46" cy="-18" r="4" fill="#ff8a80" opacity=".6"/></g>`;
  // Libélula que revolotea (mismas vueltas que la mariposa, un poco más rápido).
  const dragonfly = (x, y, k = .5, delay = 0) => `<g transform="translate(${x},${y})" pointer-events="none"><g class="flit" style="animation-duration:11s;animation-delay:${delay}s"><g transform="scale(${k})">` +
    `<g class="flutter"><ellipse cx="-6" cy="-14" rx="26" ry="8" fill="#e1f5fe" opacity=".9" transform="rotate(-18 -6 -14)"/><ellipse cx="-6" cy="12" rx="24" ry="7" fill="#e1f5fe" opacity=".75" transform="rotate(18 -6 12)"/></g>` +
    `<path d="M-46,0 L10,0" stroke="#26c6da" stroke-width="6" stroke-linecap="round"/><circle cx="16" cy="0" r="8" fill="#00acc1"/><circle cx="19" cy="-3" r="2.6" fill="#fff"/></g></g></g>`;

  // ---------- Selva (fondo de la portada y de las paradas) ----------
  // Capas de lejos a cerca: cordillera azulada, nubes, montañas, peñasco con cascada, copas, arbustos, árboles y suelo.
  A.jungle = (ground = 620) => {
    const g = ground;
    let s = `<rect width="1600" height="900" fill="url(#sky)"/>`;
    s += `<circle cx="1330" cy="110" r="380" fill="url(#sunGlow)"/>`;
    s += [[-40, 330], [110, 260], [260, 300], [420, 240]].map(([a, w]) => `<path d="M${1330 + a},40 L${1330 + a - w * 2.2},${g} L${1330 + a - w * 2.2 + w * .45},${g} Z" fill="url(#ray)" opacity=".55"/>`).join('');
    // cordillera muy lejana, casi del color del cielo
    s += `<path d="M0,${g - 250} C120,${g - 330} 240,${g - 380} 340,${g - 340} C430,${g - 300} 520,${g - 360} 640,${g - 390} C760,${g - 420} 880,${g - 330} 1000,${g - 350} C1120,${g - 370} 1220,${g - 410} 1340,${g - 380} C1440,${g - 350} 1540,${g - 300} 1600,${g - 320} L1600,${g} L0,${g} Z" fill="#bfe6d6" opacity=".8"/>`;
    // las nubes pasan por debajo de la bandeja de pistas (y >= 180) para no cruzarse con ella
    s += A.cloudDrift(220, 200, .9, 150) + A.cloudDrift(640, 180, .7, 190) + A.cloudDrift(1040, 225, .65, 230);
    // montañas lejanas con bruma
    s += `<path d="M0,${g - 170} C160,${g - 270} 300,${g - 210} 420,${g - 260} C560,${g - 320} 700,${g - 220} 860,${g - 250} C1000,${g - 290} 1150,${g - 200} 1300,${g - 240} C1420,${g - 270} 1520,${g - 220} 1600,${g - 240} L1600,${g} L0,${g} Z" fill="#93cfb1"/>`;
    s += `<rect y="${g - 330}" width="1600" height="330" fill="url(#mist)" opacity=".6"/>`;
    // peñasco con cascada
    s += `<path d="M560,${g - 150} C600,${g - 250} 660,${g - 318} 720,${g - 322} L800,${g - 322} C860,${g - 318} 930,${g - 240} 990,${g - 150} Z" fill="#7cc2a2"/>`;
    s += `<path d="M560,${g - 150} C600,${g - 250} 660,${g - 318} 720,${g - 322} L742,${g - 322} C720,${g - 260} 700,${g - 200} 690,${g - 150} Z" fill="#a8dcc2" opacity=".7"/>`;
    s += waterfall(766, g - 318, g - 172);
    // copas lejanas
    let c = '';
    for (let x = -40; x < 1680; x += 64) c += `<circle cx="${x}" cy="${g - 96 - ((x * 7) % 46)}" r="${58 + ((x * 13) % 32)}" fill="#4fa86e"/>`;
    s += c + `<rect y="${g - 120}" width="1600" height="150" fill="#4fa86e"/>` + `<rect y="${g - 160}" width="1600" height="160" fill="url(#mist)" opacity=".25"/>`;
    s += A.birds(520, 195 + (g > 660 ? 60 : 0));
    // arbustos de en medio, más oscuros, con un brillo arriba
    c = '';
    for (let x = -20; x < 1660; x += 88) {
      const cy = g - 22 - ((x * 11) % 30), r = 40 + ((x * 7) % 22);
      c += `<circle cx="${x}" cy="${cy}" r="${r}" fill="#3f9a5f"/><circle cx="${x - 12}" cy="${cy - 14}" r="${f(r * .45)}" fill="#5bb878" opacity=".5"/>`;
    }
    s += c;
    s += motes([[980, g - 200], [1110, g - 110], [1230, g - 250], [860, g - 80], [700, g - 170], [420, g - 130]]);
    s += A.palm(455, g + 10, .6) + A.palm(1345, g + 6, .5, true);
    [[90, .8, '#4caf50', '#2e7d32'], [300, .62, '#66bb6a', '#388e3c'], [1180, .66, '#3fa35a', '#256b3a'], [1520, .85, '#4caf50', '#2e7d32']]
      .forEach(([x, sc, c1, c2]) => { s += A.tree(x, g + 20, sc, c1, c2); });
    s += A.ground(g);
    s += [[420, g + 52, 1.2], [690, g + 98, 1], [1010, g + 62, 1.1], [1290, g + 150, 1.3], [860, g + 188, 1.2], [120, g + 152, 1.3]].map(([x, y, k]) => tuft(x, y, k)).join('');
    s += A.fern(52, g + 66, .7) + A.fern(1560, g + 84, .8, '#388e3c');
    s += A.bush(210, g + 70, .8) + A.bush(1380, g + 60, .9, '#43a047');
    s += A.flower(320, g + 90) + A.flower(1250, g + 110, '#ff8a65') + A.flower(760, g + 140, '#ba68c8') + A.flower(560, g + 70, '#ffd23f', .8);
    // ramitos de flores chiquitas
    s += A.flower(430, g + 150, '#4fc3f7', .5) + A.flower(462, g + 168, '#fff', .42) + A.flower(1120, g + 178, '#fff', .5) + A.flower(1152, g + 192, '#ff8ac0', .45) + A.flower(905, g + 216, '#ffd23f', .5);
    s += A.mushroom(150, g + 62, .5) + A.mushroom(118, g + 70, .34, '#ff8a65') + A.mushroom(1452, g + 92, .46, '#ff8a65');
    s += ladybug(236, g + 40, .8, -20) + snail(1330, g + 178, .5) + dragonfly(700, g - 30, .5) + A.flit(1080, g + 60, '#ffd23f', .36, -5);
    s += A.vine(236, 200) + A.vine(322, 120, '#388e3c', '#ffd23f', -2) + A.vine(1236, 104, '#2e7d32', '#ba68c8', -3.5);
    return s;
  };

  // ---------- Sabana ----------
  // Siluetas lejanas (se pintan de un solo color, medio transparentes).
  const giraffe = (x, y, k = 1, c = '#b9793f') => `<g transform="translate(${x},${y}) scale(${k})" fill="${c}" opacity=".6" pointer-events="none">` +
    `<ellipse cx="0" cy="-52" rx="26" ry="15"/><path d="M12,-58 L34,-120 L45,-115 L28,-48 Z"/><ellipse cx="44" cy="-121" rx="14" ry="7.5" transform="rotate(18 44 -121)"/>` +
    `<path d="M37,-127 l-2,-11 M43,-128 l1,-11 M-25,-56 q-10,8 -8,22" stroke="${c}" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    [-21, -9, 7, 18].map(lx => `<rect x="${lx}" y="-44" width="6" height="44" rx="3"/>`).join('') + `</g>`;
  const elephant = (x, y, k = 1, c = '#a9836b') => `<g transform="translate(${x},${y}) scale(${-k},${k})" fill="${c}" opacity=".6" pointer-events="none">` +
    `<ellipse cx="0" cy="-50" rx="44" ry="30"/><circle cx="40" cy="-62" r="24"/>` +
    `<path d="M58,-62 C70,-50 68,-28 60,-14 M-43,-56 q-10,10 -6,24" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    [-34, -10, 14].map(lx => `<rect x="${lx}" y="-34" width="14" height="34" rx="6"/>`).join('') + `<ellipse cx="26" cy="-62" rx="13" ry="19" fill="#8a6a55"/></g>`;
  const baobab = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" pointer-events="none">${floorShadow(70)}` +
    `<path d="M-22,-146 L-58,-196 M-6,-148 L-14,-206 M12,-148 L34,-204 M24,-144 L66,-184" stroke="#b98a5e" stroke-width="12" stroke-linecap="round" fill="none"/>` +
    `<path d="M-34,0 C-30,-50 -42,-100 -30,-150 L30,-150 C42,-100 30,-50 34,0 Z" fill="#b98a5e"/><path d="M4,0 C8,-50 0,-100 10,-150 L30,-150 C42,-100 30,-50 34,0 Z" fill="#9a6f47" opacity=".6"/>` +
    [[-62, -204, 30], [-16, -224, 34], [36, -218, 32], [72, -190, 26]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8bc34a"/><circle cx="${cx - 8}" cy="${cy - 9}" r="${f(r * .5)}" fill="#aed581" opacity=".7"/>`).join('') + `</g>`;
  const mound = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" pointer-events="none">${floorShadow(42)}` +
    `<path d="M-34,0 C-30,-40 -18,-58 -12,-92 C-8,-104 6,-104 10,-90 C14,-64 30,-44 34,0 Z" fill="#c98f5a"/>` +
    `<path d="M4,0 C8,-40 6,-70 2,-99 C7,-100 9,-95 10,-90 C14,-64 30,-44 34,0 Z" fill="#a8703f" opacity=".55"/>` +
    `<ellipse cx="-8" cy="-40" rx="4" ry="6" fill="#7a4f2a" opacity=".6"/><ellipse cx="5" cy="-66" rx="3" ry="4.5" fill="#7a4f2a" opacity=".6"/></g>`;
  const warmRock = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" pointer-events="none">${floorShadow(52)}` +
    `<path d="M-46,0 C-52,-26 -30,-50 -4,-48 C22,-52 48,-30 44,0 Z" fill="#c9a27a"/><path d="M-46,0 C-52,-26 -30,-50 -4,-48 C-16,-34 -22,-16 -20,0 Z" fill="#e3c39c"/></g>`;
  const waterhole = (x, y) => `<g transform="translate(${x},${y})" pointer-events="none"><ellipse rx="150" ry="36" fill="#c8973f" opacity=".5"/><ellipse rx="134" ry="28" fill="#7fd3ee"/>` +
    `<ellipse cx="-20" cy="-6" rx="96" ry="13" fill="#b6ecfb" opacity=".8"/><path d="M-70,10 q20,-6 40,0 M10,13 q24,-6 48,0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>` +
    `<path d="M-128,4 q-4,-40 -10,-58 M-118,6 q2,-36 8,-50 M-106,8 q-2,-26 -8,-38" stroke="#8a9a3a" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="-138" cy="-58" rx="5" ry="11" fill="#7a4f2a"/><ellipse cx="-110" cy="-48" rx="5" ry="10" fill="#7a4f2a"/></g>` + A.glint(x + 40, y - 6, .55) + A.glint(x - 50, y + 5, .4, -.9);

  // Atardecer dorado: montaña nevada, lomas, animales a lo lejos, baobab, termitero, charco y camino de arena.
  A.savanna = (ground = 600) => {
    const g = ground;
    let s = `<defs><linearGradient id="savSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3c4"/><stop offset=".55" stop-color="#ffd59e"/><stop offset="1" stop-color="#fff1c9"/></linearGradient></defs>`;
    s += `<rect width="1600" height="900" fill="url(#savSky)"/><circle cx="1180" cy="190" r="420" fill="url(#sunGlow)"/>`;
    s += [[-60, 300], [80, 240], [230, 280]].map(([a, w]) => `<path d="M${1180 + a},120 L${1180 + a - w * 2},${g} L${1180 + a - w * 2 + w * .45},${g} Z" fill="url(#ray)" opacity=".5"/>`).join('') + A.sun(1180, 190);
    // montaña nevada a lo lejos
    s += `<path d="M120,${g - 100} C240,${g - 190} 330,${g - 300} 400,${g - 338} C440,${g - 352} 500,${g - 352} 540,${g - 336} C620,${g - 290} 700,${g - 190} 820,${g - 100} Z" fill="#e8a196" opacity=".8"/>`;
    s += `<path d="M400,${g - 338} C440,${g - 352} 500,${g - 352} 540,${g - 336} C556,${g - 327} 570,${g - 316} 586,${g - 303} L560,${g - 291} L536,${g - 310} L508,${g - 288} L478,${g - 308} L448,${g - 286} L420,${g - 306} L392,${g - 290} L367,${g - 316} C378,${g - 326} 390,${g - 333} 400,${g - 338} Z" fill="#fff" opacity=".92"/>`;
    s += A.cloudDrift(300, 215, .9, 170, .7, '#fff3d6') + A.cloudDrift(820, 250, .65, 220, .6, '#fff3d6') + A.birds(640, 290, 54, '#8a5a2b');
    // lomas: una lejana y clara, otra más cerca
    s += `<path d="M0,${g - 150} C250,${g - 215} 500,${g - 170} 760,${g - 200} C1000,${g - 230} 1250,${g - 170} 1600,${g - 205} L1600,${g} L0,${g} Z" fill="#f7d595"/>`;
    s += `<path d="M0,${g - 60} C200,${g - 140} 420,${g - 90} 640,${g - 120} C900,${g - 160} 1100,${g - 80} 1300,${g - 130} C1450,${g - 160} 1550,${g - 110} 1600,${g - 120} L1600,900 L0,900 Z" fill="#efbd63"/>`;
    s += `<rect y="${g - 200}" width="1600" height="200" fill="url(#mist)" opacity=".5"/>`;
    s += elephant(392, g - 104, .62) + elephant(330, g - 100, .36) + baobab(590, g - 106, .5) + giraffe(742, g - 124, .66) + giraffe(690, g - 120, .44);
    s += A.acacia(820, g - 95, .45) + A.acacia(1500, g - 70, .7);
    s += A.ground(g, '#e8b84e');
    // camino de arena que se pierde hacia las lomas
    s += `<path d="M600,900 C650,820 800,770 900,720 C990,675 990,640 930,${g + 8} L975,${g + 4} C1060,650 1040,700 930,765 C840,815 800,860 790,900 Z" fill="#f6dc94" opacity=".5"/>`;
    s += waterhole(1330, g + 226) + mound(300, g - 4, .75) + warmRock(930, g + 204, .6) + warmRock(972, g + 212, .32);
    s += A.acacia(170, g + 10, .95);
    s += [[90, g + 120, .5], [520, g + 40, .35], [1360, g + 50, .4], [980, g + 200, .45], [1500, g + 160, .55]].map(([x, y, k]) => `<g transform="translate(${x},${y}) scale(${k})">${A.grassTuft()}</g>`).join('');
    s += [[420, g + 8, 1], [760, g + 2, .9], [1220, g + 6, 1], [640, g + 150, 1.3], [1100, g + 96, 1.2], [1460, g + 240, 1.3], [240, g + 216, 1.3]].map(([x, y, k]) => tuft(x, y, k, '#a8812f')).join('');
    s += A.flower(250, g + 150, '#ff7043', .6) + A.flower(285, g + 172, '#fff', .45) + A.flower(790, g + 60, '#ffca28', .5) + A.flower(1480, g + 120, '#ff7043', .55) + A.flower(1515, g + 145, '#fff', .4);
    s += motes([[300, g - 40], [700, g - 90], [1050, g - 60], [1400, g - 120], [900, g + 60]]);
    s += A.flit(820, g + 10, '#ff8ac0', .38) + A.flit(260, g + 90, '#fff59d', .34, -7);
    return s;
  };

  // ---------- Brillo extra: portada, mapa y álbum ----------
  // Nenúfar con su florecita, meciéndose en el agua.
  A.lily = (x, y, s = 1, c = '#ff8ac0', delay = 0) =>
    `<g transform="translate(${x},${y}) scale(${s})" pointer-events="none"><g class="bob" style="animation-delay:${delay}s">` +
    `<ellipse cy="6" rx="44" ry="14" fill="#0d5a6b" opacity=".2"/>` +
    `<path d="M0,0 L37.6,-4.8 A40,14 0 1 1 25.7,-10.7 Z" fill="#4caf50" stroke="#2e7d32" stroke-width="3" stroke-linejoin="round"/>` +
    `<path d="M0,0 L-34,-3 M0,0 L-22,9 M0,0 L8,12 M0,0 L-10,-11" stroke="#2e7d32" stroke-width="2" opacity=".45" stroke-linecap="round"/>` +
    `<ellipse cx="-12" cy="-5" rx="18" ry="4" fill="#a5d6a7" opacity=".6"/>` +
    `<g transform="translate(-10,-9)">` + [0, 1, 2, 3, 4].map(k => `<ellipse cy="-8" rx="5.5" ry="9" fill="${c}" stroke="#fff" stroke-width="1.5" transform="rotate(${k * 72})"/>`).join('') +
    `<circle r="5" fill="#ffd23f"/></g></g></g>`;
  // Pétalos que caen desde arriba; cada uno a su ritmo.
  A.petals = (pts) => `<g pointer-events="none">` + pts.map(([x, c], k) =>
    `<g transform="translate(${x},-30)"><g class="petal" style="animation-duration:${11 + (k % 4) * 2}s;animation-delay:${f(-k * 3.3 - 1)}s"><path d="M0,-11 C9,-6 9,6 0,11 C-9,6 -9,-6 0,-11 Z" fill="${c}"/></g></g>`).join('') + `</g>`;
  // Calcomanías del álbum: estrella, corazón o flor con su borde blanco.
  const STAR5 = Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / 5, q = k % 2 ? 14 : 30; return `${k ? 'L' : 'M'}${f(Math.cos(a) * q)},${f(Math.sin(a) * q)}`; }).join(' ') + ' Z';
  const HEART = 'M0,24 C-36,-2 -26,-36 0,-17 C26,-36 36,-2 0,24 Z';
  const stickerShape = (kind, attrs) => kind === 'flower'
    ? [0, 1, 2, 3, 4].map(k => `<circle cx="${f(Math.sin(k * 1.2566) * 16)}" cy="${f(-Math.cos(k * 1.2566) * 16)}" r="12" ${attrs}/>`).join('')
    : `<path d="${kind === 'heart' ? HEART : STAR5}" stroke-linejoin="round" ${attrs}/>`;
  A.sticker = (kind, x, y, s = 1, rot = 0, c = '#ffd23f') =>
    `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" pointer-events="none">` +
    `<g transform="translate(2,5)" opacity=".16">${stickerShape(kind, 'fill="#5d4037" stroke="#5d4037" stroke-width="12"')}</g>` +
    stickerShape(kind, 'fill="#fff" stroke="#fff" stroke-width="12"') + stickerShape(kind, `fill="${c}"`) +
    (kind === 'flower' ? `<circle r="9" fill="#ffd23f"/>` : `<ellipse cx="-9" cy="-9" rx="7" ry="3.5" fill="#fff" opacity=".55" transform="rotate(-35 -9 -9)"/>`) + `</g>`;
  // Cinta de colores que sujeta cada foto.
  A.tape = (x, y, rot = -4, c = '#ff8ac0') =>
    `<g transform="translate(${x},${y}) rotate(${rot})" pointer-events="none"><rect x="-46" y="-15" width="92" height="30" rx="2" fill="${c}" opacity=".85"/>` +
    `<path d="M-30,-15 v30 M-10,-15 v30 M10,-15 v30 M30,-15 v30" stroke="#fff" stroke-width="6" opacity=".35"/></g>`;

  // ---------- Vida: cada personaje parpadea a su propio ritmo ----------
  // En las miniaturas (mapa, álbum, balsa) no se nota y cuesta dibujarlo: ahí los ojos se quedan quietos.
  const blinkAt = (svg) => svg.replace(/class="blink"/g, `class="blink" style="animation-delay:${f(-Math.random() * 4.6)}s"`);
  const blinkOff = (svg) => svg.replace(/ class="blink"( style="[^"]*")?/g, '');
  for (const k of ['animal', 'kid']) { const prev = A[k]; A[k] = (...a) => blinkAt(prev(...a)); }
  for (const k of ['thumb', 'family']) { const prev = A[k]; A[k] = (...a) => blinkOff(prev(...a)); }

  // ---------- Mapa del río ----------
  const PAL = [['#4caf50', '#2e7d32'], ['#66bb6a', '#388e3c'], ['#3fa35a', '#256b3a'], ['#7cc45a', '#3e8e3a']];
  // Fondo ilustrado (va debajo del río): prado con claros, selva tupida y la sabana al fondo a la derecha.
  A.mapWorld = () => {
    let s = `<rect width="1600" height="900" fill="url(#grass)"/>`;
    s += [[300, 300, 230, 120], [850, 380, 260, 130], [600, 820, 280, 110], [1250, 760, 240, 120]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#b6ec8a" opacity=".35"/>`).join('');
    s += [[520, 600, 220, 90], [1060, 590, 200, 90], [150, 770, 200, 100]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#2f8a3c" opacity=".14"/>`).join('');
    // sabana: franja de transición, arena y dunas
    s += `<path d="M1140,0 C1225,255 1270,500 1600,640 L1600,0 Z" fill="#c9dd72" opacity=".8"/>`;
    s += `<path d="M1180,0 C1260,250 1300,480 1600,600 L1600,0 Z" fill="#f4cf62"/><path d="M1180,0 C1260,250 1300,480 1600,600 L1600,0 Z" fill="url(#groundShade)" opacity=".6"/>`;
    s += `<circle cx="1560" cy="60" r="300" fill="url(#sunGlow)" opacity=".7"/>`;
    s += [[1230, 60, 90], [1330, 150, 120], [1420, 300, 110], [1500, 430, 80], [1300, 380, 60]].map(([x, y, w]) => `<path d="M${x},${y} q${w / 2},-16 ${w},0" stroke="#e0a93a" stroke-width="5" fill="none" stroke-linecap="round" opacity=".5"/>`).join('');
    // pastito
    for (let k = 0; k < 44; k++) {
      const x = (k * 397 + 60) % 1600, y = 150 + (k * 211) % 740;
      if (x > 1120 + y * .75 && y < 660) continue;
      s += tuft(x, y, .8 + (k % 3) * .15);
    }
    // todo lo que "está de pie" se dibuja de atrás hacia adelante
    const items = [];
    [[55, 230, .36], [185, 185, .3], [310, 215, .38], [430, 185, .3],
      [120, 335, .4], [265, 345, .3], [400, 320, .34], [790, 280, .3], [880, 325, .36], [990, 275, .3], [1150, 245, .32],
      [60, 450, .34], [200, 470, .3], [330, 430, .36], [470, 445, .3], [700, 445, .3], [880, 470, .3], [1010, 400, .32], [1205, 335, .3],
      [290, 875, .34], [420, 845, .3], [560, 890, .32], [700, 860, .36], [830, 885, .3], [1100, 820, .36], [1230, 870, .32], [1340, 800, .34], [1460, 860, .38], [1560, 760, .34], [1450, 720, .3]]
      .forEach(([x, y, sc], k) => items.push([y, A.tree(x, y, sc, ...PAL[k % 4])]));
    [[705, 320, .3, true], [120, 580, .32], [950, 840, .36], [1560, 700, .34, true]].forEach(([x, y, sc, sw]) => items.push([y, A.palm(x, y, sc, sw)]));
    [[1300, 215, .36], [1560, 215, .34], [1545, 500, .42]].forEach(([x, y, sc]) => items.push([y, A.acacia(x, y, sc)]));
    [[500, 370, .3], [930, 410, .3], [160, 400, .3], [1250, 430, .28], [620, 830, .3], [1010, 880, .32], [1300, 880, .3], [1390, 760, .3]]
      .forEach(([x, y, sc], k) => items.push([y, A.bush(x, y, sc, PAL[k % 4][0])]));
    [[290, 480, .32], [1010, 480, .3], [1240, 790, .35], [740, 830, .3], [1380, 230, .3]].forEach(([x, y, sc]) => items.push([y, A.rock(x, y, sc)]));
    [[745, 700, .4], [790, 712, .3, '#ff8a65'], [1130, 650, .35], [1160, 662, .25, '#ff8a65'], [140, 250, .3]].forEach(([x, y, sc, c]) => items.push([y, A.mushroom(x, y, sc, c)]));
    [[1262, 120], [1450, 190], [1590, 330], [1570, 560]].forEach(([x, y]) => items.push([y, `<g transform="translate(${x},${y}) scale(.25)">${A.grassTuft()}</g>`]));
    const FL = ['#ff5fa2', '#ffd23f', '#ba68c8', '#ff8a65'];
    [[520, 345], [250, 260], [860, 400], [1090, 330], [340, 820], [880, 790], [1200, 760], [1500, 790]].forEach(([x, y], k) =>
      items.push([y + 18, A.flower(x, y, FL[k % 4], .5) + A.flower(x + 26, y + 14, FL[(k + 1) % 4], .42) + A.flower(x - 22, y + 18, FL[(k + 2) % 4], .45)]));
    s += A.pond(590, 300, .75);
    s += items.sort((a, b) => a[0] - b[0]).map(i => i[1]).join('');
    // marco de copas en la orilla de arriba (lado de la selva)
    let top = '';
    for (let x = -20; x < 1130; x += 56) top += `<circle cx="${x}" cy="${-14 + ((x * 7) % 20)}" r="${46 + ((x * 13) % 16)}" fill="#2e7d32"/>`;
    for (let x = 8; x < 1100; x += 56) top += `<circle cx="${x}" cy="${-20 + ((x * 5) % 16)}" r="${30 + ((x * 11) % 12)}" fill="#43a047"/>`;
    return s + top;
  };
  // Lo que pasa por encima del mapa: nubes con su sombra, pajaritos y mariposas.
  A.mapSky = () => A.cloudDrift(420, 178, .8, 160, .8, '#fff', 84) + A.cloudDrift(1250, 822, .7, 200, .75, '#fff', 60) +
    A.birds(900, 238, 52) + A.flit(250, 300, '#ff8ac0', .42) + A.flit(1010, 765, '#ffd23f', .4, -6);
  // Conejito de las adivinanzas, con el mismo estilo redondo que los demás animales.
  A.bunny = () => `<g>
    <ellipse cx="0" cy="88" rx="74" ry="11" fill="#0b3016" opacity=".12"/>
    <g stroke="#cbbba6" stroke-width="4"><ellipse cx="-22" cy="-74" rx="15" ry="46" fill="#f7f1e8" transform="rotate(-10 -22 -74)"/><ellipse cx="22" cy="-74" rx="15" ry="46" fill="#f7f1e8" transform="rotate(10 22 -74)"/></g>
    <ellipse cx="-22" cy="-70" rx="7" ry="31" fill="#f8bbd0" transform="rotate(-10 -22 -70)"/><ellipse cx="22" cy="-70" rx="7" ry="31" fill="#f8bbd0" transform="rotate(10 22 -70)"/>
    <circle cx="56" cy="54" r="17" fill="#fff" stroke="#cbbba6" stroke-width="4"/>
    <ellipse cx="0" cy="44" rx="56" ry="46" fill="#f7f1e8" stroke="#cbbba6" stroke-width="4"/>
    <ellipse cx="0" cy="54" rx="31" ry="29" fill="#fff"/>
    <ellipse cx="-28" cy="84" rx="22" ry="11" fill="#f7f1e8" stroke="#cbbba6" stroke-width="4"/><ellipse cx="28" cy="84" rx="22" ry="11" fill="#f7f1e8" stroke="#cbbba6" stroke-width="4"/>
    <circle cx="0" cy="-12" r="46" fill="#f7f1e8" stroke="#cbbba6" stroke-width="4"/>
    <ellipse cx="-30" cy="0" rx="10" ry="7" fill="#f8bbd0" opacity=".8"/><ellipse cx="30" cy="0" rx="10" ry="7" fill="#f8bbd0" opacity=".8"/>
    <circle cx="-17" cy="-18" r="7.5" fill="#3e2723"/><circle cx="17" cy="-18" r="7.5" fill="#3e2723"/><circle cx="-14.5" cy="-20.5" r="2.6" fill="#fff"/><circle cx="19.5" cy="-20.5" r="2.6" fill="#fff"/>
    <path d="M-6,-6 Q0,-10 6,-6 Q0,2 -6,-6 Z" fill="#f48fb1"/>
    <path d="M0,-1 V5 M0,5 Q-7,12 -13,6 M0,5 Q7,12 13,6" stroke="#8d6e63" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
})();
