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

  // ---------- Selva (fondo de la portada y de las paradas) ----------
  A.jungle = (ground = 620) => {
    const g = ground;
    let s = `<rect width="1600" height="900" fill="url(#sky)"/>`;
    s += `<circle cx="1330" cy="110" r="380" fill="url(#sunGlow)"/>`;
    s += [[-40, 330], [110, 260], [260, 300], [420, 240]].map(([a, w]) => `<path d="M${1330 + a},40 L${1330 + a - w * 2.2},${g} L${1330 + a - w * 2.2 + w * .45},${g} Z" fill="url(#ray)" opacity=".55"/>`).join('');
    s += A.cloudDrift(220, 120, 1, 150) + A.cloudDrift(640, 80, .8, 190) + A.cloudDrift(1040, 150, .7, 230);
    // montañas lejanas con bruma
    s += `<path d="M0,${g - 170} C160,${g - 270} 300,${g - 210} 420,${g - 260} C560,${g - 320} 700,${g - 220} 860,${g - 250} C1000,${g - 290} 1150,${g - 200} 1300,${g - 240} C1420,${g - 270} 1520,${g - 220} 1600,${g - 240} L1600,${g} L0,${g} Z" fill="#93cfb1"/>`;
    s += `<rect y="${g - 330}" width="1600" height="330" fill="url(#mist)" opacity=".6"/>`;
    // copas lejanas
    let c = '';
    for (let x = -40; x < 1680; x += 64) c += `<circle cx="${x}" cy="${g - 96 - ((x * 7) % 46)}" r="${58 + ((x * 13) % 32)}" fill="#4fa86e"/>`;
    s += c + `<rect y="${g - 120}" width="1600" height="120" fill="#4fa86e"/>` + `<rect y="${g - 160}" width="1600" height="160" fill="url(#mist)" opacity=".25"/>`;
    s += A.birds(520, 195);
    s += motes([[980, g - 200], [1110, g - 110], [1230, g - 250], [860, g - 80], [700, g - 170], [420, g - 130]]);
    s += A.palm(455, g + 10, .6) + A.palm(1345, g + 6, .5, true);
    [[90, .8, '#4caf50', '#2e7d32'], [300, .62, '#66bb6a', '#388e3c'], [1180, .66, '#3fa35a', '#256b3a'], [1520, .85, '#4caf50', '#2e7d32']]
      .forEach(([x, sc, c1, c2]) => { s += A.tree(x, g + 20, sc, c1, c2); });
    s += A.ground(g);
    s += A.fern(52, g + 66, .7) + A.fern(1560, g + 84, .8, '#388e3c');
    s += A.bush(210, g + 70, .8) + A.bush(1380, g + 60, .9, '#43a047');
    s += A.flower(320, g + 90) + A.flower(1250, g + 110, '#ff8a65') + A.flower(760, g + 140, '#ba68c8') + A.flower(560, g + 70, '#ffd23f', .8);
    s += A.mushroom(150, g + 62, .5) + A.mushroom(118, g + 70, .34, '#ff8a65') + A.mushroom(1452, g + 92, .46, '#ff8a65');
    return s;
  };

  // ---------- Sabana: mismas capas, con nubes cálidas y pajaritos ----------
  const savanna0 = A.savanna;
  A.savanna = (ground = 600) => savanna0(ground) +
    A.cloudDrift(300, 110, .9, 170, .7, '#fff3d6') + A.cloudDrift(820, 70, .7, 220, .6, '#fff3d6') + A.birds(640, 250, 54, '#8a5a2b');

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
