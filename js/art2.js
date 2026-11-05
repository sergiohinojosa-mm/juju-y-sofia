// Animales, pistas, regalitos y utilería de las paradas 4 a 8.
// Mismo estilo que art.js: caricatura suave y redondita, con el origen en los pies (centro abajo).
(() => {
  const A = Art;

  // Lo que solo tiene el bebé (rayitas del tapir, manchitas del león) va en un grupo "kid-only".
  // Con el ánimo 'mom' no se dibuja, y en la parada la mamá lo oculta con CSS (#mom .kid-only).
  const kid = (mood, s) => (mood === 'mom' ? '' : `<g class="kid-only">${s}</g>`);
  const blush = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ff8fa3" opacity=".55"/>`;
  const eye = (x, y, r = 10, ink = '#2b1a10') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ink}"/><circle cx="${(x + r * .35).toFixed(1)}" cy="${(y - r * .4).toFixed(1)}" r="${(r * .38).toFixed(1)}" fill="#fff"/>`;
  const line = (d, c, w = 4) => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

  // ---------- Pasto alto de la sabana (también esconde al cachorro de león) ----------
  A.grassTuft = (c1 = '#e0b13a', c2 = '#c8901f') => {
    const B = [[-86, -96, -60, c2], [-70, -150, -40, c1], [-46, -118, -16, c2], [-30, -176, 2, c1], [-6, -140, 26, c2], [10, -186, 40, c1], [30, -130, 62, c2], [48, -166, 84, c1], [70, -110, 96, c2]];
    return `<g>${B.map(([a, ty, b, c]) => {
      const tx = (a + b) / 2 + (ty % 3) * 4;
      return `<path d="M${a},0 Q${tx - 14},${(ty / 2).toFixed(0)} ${tx},${ty} Q${tx + 4},${(ty / 2).toFixed(0)} ${b},0 Z" fill="${c}"/>`;
    }).join('')}<ellipse cx="0" cy="0" rx="96" ry="12" fill="${c2}"/></g>`;
  };

  // ---------- Animales ----------
  // Monito araña: cara clara de corazón, brazos largos y cola enroscada.
  const MONO = { fur: '#7a4a2b', dark: '#55331d', face: '#f3d2a8', ink: '#2b1a10' };
  const monoTorso = () => {
    const { fur, dark, face } = MONO;
    let s = line('M-20,-40 Q-28,-20 -30,-8 M20,-40 Q28,-20 30,-8', fur, 18);
    s += `<ellipse cx="-32" cy="-6" rx="16" ry="8" fill="${dark}"/><ellipse cx="32" cy="-6" rx="16" ry="8" fill="${dark}"/>`;
    s += `<ellipse cx="0" cy="-76" rx="46" ry="50" fill="${fur}"/><ellipse cx="0" cy="-68" rx="28" ry="34" fill="${face}"/>`;
    s += line('M-34,-106 Q-76,-84 -70,-32 M34,-106 Q76,-84 70,-32', fur, 15);
    s += `<circle cx="-70" cy="-28" r="10" fill="${dark}"/><circle cx="70" cy="-28" r="10" fill="${dark}"/>`;
    return s;
  };
  const monoHead = (mood) => {
    const { fur, dark, face, ink } = MONO;
    let s = `<circle cx="-54" cy="-160" r="18" fill="${fur}"/><circle cx="54" cy="-160" r="18" fill="${fur}"/><circle cx="-54" cy="-160" r="10" fill="${face}"/><circle cx="54" cy="-160" r="10" fill="${face}"/>`;
    s += `<circle cx="0" cy="-162" r="54" fill="${fur}"/>`;
    s += line('M-8,-212 Q-4,-232 6,-214 Q12,-230 18,-210', fur, 7);
    s += `<path d="M0,-188 C-14,-208 -48,-202 -46,-170 C-46,-146 -30,-122 0,-118 C30,-122 46,-146 46,-170 C48,-202 14,-208 0,-188 Z" fill="${face}"/>`;
    s += eye(-19, -166, 11, ink) + eye(19, -166, 11, ink);
    if (mood === 'sad') s += line('M-32,-184 L-12,-190 M32,-184 L12,-190', dark);
    s += `<circle cx="-5" cy="-148" r="3" fill="${dark}"/><circle cx="5" cy="-148" r="3" fill="${dark}"/>`;
    s += blush(-32, -146) + blush(32, -146);
    s += mood === 'sad' ? line('M-9,-130 Q0,-137 9,-130', dark) : line('M-13,-138 Q0,-124 13,-138', dark);
    return s;
  };
  A.monkeyTail = () => line('M0,40 C0,10 10,-20 34,-26 C56,-30 62,-6 46,2 C34,8 26,-4 34,-10', MONO.fur, 13);
  A.monkey = (mood) => mood === 'hang'
    // De cabeza, colgado de la cola: el origen es la rama. La carita queda derecha para que se vea feliz.
    ? line('M4,62 C24,40 26,8 10,-4 C-6,-14 -18,2 -6,8', MONO.fur, 13) +
      `<g transform="translate(0,34) rotate(180)">${monoTorso()}</g><g transform="translate(0,350)">${monoHead('happy')}</g>`
    : line('M34,-48 C96,-42 118,-110 96,-150 C80,-178 46,-170 50,-146 C53,-128 76,-130 76,-146', MONO.fur, 13) + monoTorso() + monoHead(mood);

  // Guacamaya roja: rojo, amarillo y azul, pico curvo.
  A.macaw = (mood) => {
    const red = '#e53935', ink = '#1b1b1b';
    let s = `<path d="M-12,-74 L-70,26 L-44,32 L4,-62 Z" fill="${red}"/><path d="M-4,-66 L-40,32 L-20,32 L10,-58 Z" fill="#1e88e5"/>`;
    s += line('M-4,-28 l-6,22 M16,-28 l6,22', '#9e9e9e', 7) + line('M-22,-5 h22 M12,-5 h22', '#9e9e9e', 6);
    s += `<ellipse cx="4" cy="-88" rx="50" ry="64" fill="${red}"/>`;
    s += `<path d="M-34,-124 C-6,-140 30,-124 32,-94 C32,-58 8,-28 -32,-20 C-50,-52 -50,-98 -34,-124 Z" fill="#1e88e5"/>`;
    s += `<path d="M-34,-124 C-6,-140 30,-124 32,-98 C10,-100 -20,-96 -45,-88 C-47,-104 -42,-116 -34,-124 Z" fill="#ffd23f"/>`;
    s += line('M-45,-88 C-20,-96 10,-100 32,-98', '#43a047', 6);
    s += `<circle cx="22" cy="-160" r="42" fill="${red}"/>` + line('M12,-198 Q8,-218 22,-212 Q22,-226 34,-212', red, 8);
    s += `<ellipse cx="40" cy="-162" rx="21" ry="25" fill="#fff6ee"/>`;
    s += mood === 'sad' ? line('M30,-166 Q38,-160 46,-166', ink) : eye(38, -168, 9, ink);
    s += blush(44, -146, 6);
    s += `<path d="M56,-178 C88,-184 102,-150 88,-120 C82,-136 72,-146 56,-146 Z" fill="#fff3d6" stroke="#d7c4a0" stroke-width="2"/>`;
    s += `<path d="M58,-148 C68,-148 76,-142 78,-132 C68,-128 60,-136 58,-148 Z" fill="#37474f"/>`;
    return s;
  };

  // Tapir (mira a la izquierda): trompita corta, orejas con borde blanco.
  // El bebé tiene rayitas y puntitos de sandía. Triste = atorado en el lodo.
  const MUD = '#6b4a32';
  A.tapir = (mood) => {
    const fur = '#6e5344', dark = '#4b372c', light = '#f4e6cc', ink = '#24170f';
    let s = `<ellipse cx="92" cy="-86" rx="9" ry="12" fill="${fur}"/>`;
    s += [-60, -28, 36, 66].map(x => `<rect x="${x - 12}" y="-46" width="24" height="44" rx="11" fill="${dark}"/><ellipse cx="${x}" cy="-5" rx="14" ry="6" fill="#33241b"/>`).join('');
    s += `<ellipse cx="6" cy="-76" rx="88" ry="52" fill="${fur}"/>`;
    s += kid(mood, [-106, -86, -66, -46].map((y, k) => line(`M${-58 + (k % 2) * 8},${y} q16,-8 32,0 t32,0 t32,0 t32,0`, light, 6)).join('') +
      [[-40, -96], [6, -96], [50, -96], [-20, -76], [26, -76], [-44, -56], [2, -56], [48, -56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${light}"/>`).join(''));
    s += `<ellipse cx="-78" cy="-98" rx="44" ry="38" fill="${fur}"/>`;
    s += line('M-112,-108 Q-140,-104 -144,-84', fur, 22) + `<ellipse cx="-146" cy="-80" rx="10" ry="8" fill="${dark}"/>`;
    s += `<ellipse cx="-56" cy="-134" rx="13" ry="19" fill="${fur}" stroke="${light}" stroke-width="5" transform="rotate(15 -56 -134)"/>`;
    s += kid(mood, `<circle cx="-58" cy="-110" r="4" fill="${light}"/><circle cx="-48" cy="-94" r="4" fill="${light}"/><circle cx="-64" cy="-88" r="3.5" fill="${light}"/>`);
    s += `<ellipse cx="-98" cy="-82" rx="18" ry="10" fill="${light}" opacity=".45"/>`;
    s += eye(-88, -108, 10, ink);
    if (mood === 'sad') s += line('M-102,-122 L-78,-128', ink);
    s += blush(-70, -86, 8);
    s += mood === 'sad' ? line('M-120,-70 Q-110,-78 -100,-72', ink) : line('M-122,-78 Q-112,-66 -100,-74', ink);
    if (mood === 'sad') s += `<path d="M-136,-30 Q-96,-56 -44,-40 Q8,-58 58,-42 Q100,-54 124,-30 Q128,8 0,8 Q-136,8 -136,-30 Z" fill="${MUD}"/>` +
      `<circle cx="-20" cy="-62" r="7" fill="${MUD}"/><circle cx="40" cy="-100" r="6" fill="${MUD}"/><circle cx="-96" cy="-122" r="5" fill="${MUD}"/>`;
    return s;
  };

  // Felinos sentados de frente: ojos grandes y redondos, boquita sin colmillos.
  const bigCat = (c) => (mood) => {
    const ink = '#2b1a10';
    let s = line('M44,-26 C104,-20 118,-74 92,-104', c.fur, 16);
    s += c.tuft ? `<ellipse cx="90" cy="-110" rx="12" ry="16" fill="${c.tuft}" transform="rotate(-30 90 -110)"/>` : line('M100,-86 Q98,-96 92,-104', c.spot, 16);
    s += `<ellipse cx="-42" cy="-18" rx="30" ry="18" fill="${c.fur}"/><ellipse cx="42" cy="-18" rx="30" ry="18" fill="${c.fur}"/>`;
    s += `<ellipse cx="0" cy="-68" rx="58" ry="58" fill="${c.fur}"/><ellipse cx="0" cy="-58" rx="32" ry="42" fill="${c.light}"/>`;
    const SP = [[-44, -92], [42, -96], [-50, -54], [50, -50], [-24, -114], [26, -114], [-46, -20], [46, -22]];
    s += c.rosettes
      ? SP.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${c.spot}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="2.5" fill="${c.spot}"/>`).join('')
      : kid(mood, SP.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${c.spot}" opacity=".45"/>`).join(''));
    s += `<rect x="-36" y="-72" width="24" height="68" rx="12" fill="${c.fur}"/><rect x="12" y="-72" width="24" height="68" rx="12" fill="${c.fur}"/>`;
    s += `<ellipse cx="-24" cy="-6" rx="17" ry="10" fill="${c.light}"/><ellipse cx="24" cy="-6" rx="17" ry="10" fill="${c.light}"/>`;
    s += `<circle cx="-44" cy="-196" r="19" fill="${c.fur}"/><circle cx="44" cy="-196" r="19" fill="${c.fur}"/><circle cx="-44" cy="-196" r="10" fill="${c.ear}"/><circle cx="44" cy="-196" r="10" fill="${c.ear}"/>`;
    s += `<ellipse cx="0" cy="-156" rx="62" ry="56" fill="${c.fur}"/>`;
    s += c.rosettes
      ? [[-22, -194], [0, -200], [22, -194], [-50, -160], [50, -160], [-42, -182], [42, -182]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${c.spot}"/>`).join('')
      : kid(mood, line('M-6,-208 Q-2,-226 6,-210 Q12,-224 16,-206', c.tuft, 6));
    s += `<ellipse cx="-15" cy="-128" rx="20" ry="16" fill="${c.light}"/><ellipse cx="15" cy="-128" rx="20" ry="16" fill="${c.light}"/><ellipse cx="0" cy="-114" rx="13" ry="8" fill="${c.light}"/>`;
    s += [[-24, -128], [-16, -122], [-26, -119], [24, -128], [16, -122], [26, -119]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${c.spot}"/>`).join('');
    s += `<path d="M-11,-144 Q0,-149 11,-144 Q6,-133 0,-131 Q-6,-133 -11,-144 Z" fill="#e57373"/>`;
    s += eye(-25, -162, 13, ink) + eye(25, -162, 13, ink);
    if (mood === 'sad') s += line('M-40,-182 L-16,-190 M40,-182 L16,-190', c.brow);
    s += blush(-46, -138, 9) + blush(46, -138, 9);
    s += mood === 'sad' ? line('M-9,-117 Q0,-125 9,-117', ink) : line('M-13,-124 Q-6,-116 0,-123 Q6,-116 13,-124', ink);
    // El cachorro de león, perdido, se asoma entre el pasto alto.
    if (c.grass && mood === 'sad') s += `<g transform="translate(0,4) scale(1,.6)">${A.grassTuft()}</g>`;
    return s;
  };
  A.jaguar = bigCat({ fur: '#f2a93b', light: '#fff1d6', spot: '#5b3416', ear: '#f7c1a0', brow: '#5b3416', rosettes: true });
  A.lion = bigCat({ fur: '#e8b450', light: '#fff3dc', spot: '#b9792a', ear: '#f7c1a0', brow: '#8d5524', tuft: '#8d5524', grass: true });

  // Tortuga del puente (de lado, sobre el agua). Ánimo 'sneeze' = ¡achú!
  A.turtle = (mood = 'happy') => {
    const shell = '#43a047', dark = '#2e7d32', skin = '#9ccc65', ink = '#1b3a12';
    let s = `<ellipse cx="0" cy="4" rx="100" ry="14" fill="#fff" opacity=".35"/>`;
    s += `<ellipse cx="-62" cy="-4" rx="24" ry="9" fill="${skin}"/><ellipse cx="58" cy="-2" rx="24" ry="9" fill="${skin}"/>`;
    s += `<path d="M-76,-6 C-72,-74 72,-74 76,-6 Z" fill="${shell}" stroke="${dark}" stroke-width="5"/>`;
    s += line('M-30,-10 L-38,-32 L-18,-46 L18,-46 L38,-32 L30,-10 M-18,-46 L-12,-54 M18,-46 L12,-54 M-38,-32 L-62,-28 M38,-32 L62,-28', dark, 4);
    s += `<circle cx="94" cy="-28" r="23" fill="${skin}"/>`;
    s += mood === 'sneeze'
      ? line('M84,-36 q6,-5 12,0', ink) + `<ellipse cx="104" cy="-18" rx="6" ry="7" fill="#7b1f1f"/>` +
        `<circle cx="126" cy="-30" r="5" fill="#e1f5fe"/><circle cx="134" cy="-20" r="4" fill="#e1f5fe"/><circle cx="130" cy="-40" r="3" fill="#e1f5fe"/>`
      : eye(98, -34, 6, ink) + line('M90,-20 Q98,-14 106,-20', ink, 3);
    s += blush(104, -24, 5);
    return s;
  };

  // ---------- Animalitos y utilería de los minijuegos ----------
  A.butterfly = (c = '#ba68c8') => `<g><ellipse cx="-16" cy="-10" rx="18" ry="22" fill="${c}" transform="rotate(-25 -16 -10)"/><ellipse cx="16" cy="-10" rx="18" ry="22" fill="${c}" transform="rotate(25 16 -10)"/>
    <ellipse cx="-12" cy="14" rx="11" ry="13" fill="${c}" opacity=".85"/><ellipse cx="12" cy="14" rx="11" ry="13" fill="${c}" opacity=".85"/>
    <circle cx="-16" cy="-12" r="6" fill="#fff" opacity=".6"/><circle cx="16" cy="-12" r="6" fill="#fff" opacity=".6"/>
    <rect x="-4" y="-22" width="8" height="40" rx="4" fill="#4a2a1a"/>${line('M-2,-22 Q-8,-34 -14,-36 M2,-22 Q8,-34 14,-36', '#4a2a1a', 3)}</g>`;
  A.birdie = (c = '#4fc3f7') => `<g><path d="M-26,-4 Q-50,-12 -46,10 Z" fill="${c}"/><ellipse cx="0" cy="0" rx="30" ry="26" fill="${c}"/>
    <ellipse cx="-2" cy="8" rx="16" ry="11" fill="#fff" opacity=".6"/><path d="M-14,-4 Q-2,-22 10,-4 Z" fill="#0288d1" opacity=".5"/>
    ${eye(12, -8, 5, '#222')}<path d="M26,-4 L40,0 L26,6 Z" fill="#ffb300"/></g>`;
  // Huella de león (almohadita y cuatro deditos, los dedos apuntan hacia arriba).
  A.paw = (c = '#b9792a') => `<g fill="${c}"><ellipse cx="0" cy="8" rx="16" ry="13"/><ellipse cx="-19" cy="-11" rx="7" ry="9"/><ellipse cx="-7" cy="-20" rx="7" ry="9"/><ellipse cx="7" cy="-20" rx="7" ry="9"/><ellipse cx="19" cy="-11" rx="7" ry="9"/></g>`;
  // Huella de tapir: tres deditos.
  const hoof = (x, y, r, c) => `<g transform="translate(${x},${y}) rotate(${r}) scale(.85)" fill="${c}"><ellipse cx="0" cy="6" rx="12" ry="10"/><ellipse cx="-15" cy="-10" rx="7" ry="10"/><ellipse cx="0" cy="-17" rx="7" ry="10"/><ellipse cx="15" cy="-10" rx="7" ry="10"/></g>`;
  const note = (x, y, c = '#ffb300') => `<g transform="translate(${x},${y})"><ellipse rx="9" ry="7" fill="${c}" transform="rotate(-20)"/>${line('M8,-3 L8,-32 Q16,-28 20,-20', c)}</g>`;

  // Árbol de la sabana (acacia de copa plana).
  A.acacia = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">${line('M-6,0 L-4,-120 L-44,-170 M-4,-120 L32,-182 M-2,-64 L40,-112', '#6d4126', 16)}
    <ellipse cx="-24" cy="-184" rx="112" ry="30" fill="#7c9a3a"/><ellipse cx="36" cy="-200" rx="92" ry="26" fill="#8bac45"/></g>`;
  // Sabana dorada: cielo rosado, sol del atardecer, lomitas y pasto alto.
  A.savanna = (ground = 600) => {
    let s = `<defs><linearGradient id="savSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3c4"/><stop offset=".55" stop-color="#ffd59e"/><stop offset="1" stop-color="#fff1c9"/></linearGradient></defs>`;
    s += `<rect width="1600" height="900" fill="url(#savSky)"/>${A.sun(1180, 190)}`;
    s += `<path d="M0,${ground - 60} C200,${ground - 140} 420,${ground - 90} 640,${ground - 120} C900,${ground - 160} 1100,${ground - 80} 1300,${ground - 130} C1450,${ground - 160} 1550,${ground - 110} 1600,${ground - 120} L1600,900 L0,900 Z" fill="#f2c56c"/>`;
    s += A.acacia(820, ground - 95, .45) + A.acacia(1500, ground - 70, .7);
    s += A.ground(ground, '#e8b84e');
    s += A.acacia(170, ground + 10, .95);
    s += [[90, ground + 120, .5], [520, ground + 40, .35], [1360, ground + 50, .4], [980, ground + 200, .45], [1500, ground + 160, .55]].map(([x, y, k]) => `<g transform="translate(${x},${y}) scale(${k})">${A.grassTuft()}</g>`).join('');
    return s;
  };

  // ---------- Registro de animales ----------
  A.addAnimal('mono', { draw: A.monkey, box: { cx: 20, cy: -112, w: 215 } });
  A.addAnimal('guacamaya', { draw: A.macaw, box: { cx: 14, cy: -98, w: 185 } });
  A.addAnimal('tapir', { draw: A.tapir, box: { cx: -26, cy: -80, w: 250 } });
  A.addAnimal('jaguar', { draw: A.jaguar, box: { cx: 18, cy: -110, w: 210 } });
  A.addAnimal('leon', { draw: A.lion, box: { cx: 18, cy: -110, w: 210 } });
  // La tortuga solo habla en el globo ("¡achú!"); no es una parada.
  A.addAnimal('tortuga', { draw: A.turtle, box: { cx: 18, cy: -30, w: 220 } });

  // En fotos, álbum y mapa, la mamá tapir y la mamá leona van sin las marcas de bebé.
  const MOM_LOOK = { tapir: true, leon: true };
  const family = A.family;
  A.family = (id, size) => (MOM_LOOK[id]
    ? `<g transform="scale(${(size / 360).toFixed(3)})"><g transform="translate(-70,0)">${A.thumb(id, 220, 'mom')}</g><g transform="translate(115,45)">${A.thumb(id, 130)}</g></g>`
    : family(id, size));

  // ---------- Pistas ----------
  A.addClue('cascaras', `<g transform="translate(-16,6) rotate(-12)">
      <path d="M-10,0 C-12,-20 -6,-36 0,-42 C6,-36 12,-20 10,0 Z" fill="#ffd54f" stroke="#e0a800" stroke-width="3"/><rect x="-3" y="-50" width="6" height="10" rx="2" fill="#6d4c41"/>
      <path d="M-10,-2 C-30,-2 -42,14 -40,32 C-30,20 -18,12 -4,8 Z" fill="#ffe082" stroke="#e0a800" stroke-width="3"/>
      <path d="M10,-2 C30,-2 42,14 40,32 C30,20 18,12 4,8 Z" fill="#ffe082" stroke="#e0a800" stroke-width="3"/>
      <path d="M-6,4 C-8,18 -4,30 2,38 C6,28 8,16 6,4 Z" fill="#ffd54f" stroke="#e0a800" stroke-width="3"/></g>
    <g transform="translate(30,26) rotate(14)"><path d="M-28,0 A28,22 0 0 1 28,0 L17,0 A17,12 0 0 0 -17,0 Z" fill="#ff9800" stroke="#e65100" stroke-width="3"/>
      <circle cx="-8" cy="-14" r="2" fill="#e65100"/><circle cx="8" cy="-15" r="2" fill="#e65100"/></g>`);
  A.addClue('sonidos', `${A.flower(0, 20, '#e53935', 1.5)}${line('M30,-6 Q40,8 30,22 M42,-14 Q58,8 42,30 M-30,-6 Q-40,8 -30,22 M-42,-14 Q-58,8 -42,30', '#ffb300', 5)}${note(-22, -30)}${note(14, -40)}`);
  A.addClue('huellas', `<ellipse cx="0" cy="8" rx="58" ry="36" fill="#8d6e4f"/><ellipse cx="0" cy="10" rx="48" ry="27" fill="#a1846a"/>${hoof(-20, 6, -15, '#5d4037')}${hoof(22, 14, 12, '#5d4037')}`);
  A.addClue('burbujas', `<ellipse cx="0" cy="36" rx="46" ry="9" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>` +
    [[-16, 12, 22], [18, -12, 16], [24, 22, 11], [-8, -30, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#b3e5fc" fill-opacity=".75" stroke="#29b6f6" stroke-width="4"/><circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .3}" fill="#fff"/>`).join(''));
  A.addClue('huellitas', `<ellipse cx="0" cy="8" rx="58" ry="34" fill="#f3d58a"/><g transform="translate(-20,14) rotate(-15) scale(.9)">${A.paw('#a0661f')}</g><g transform="translate(22,-6) rotate(12) scale(.9)">${A.paw('#a0661f')}</g>`);

  // ---------- Regalitos de las mamás ----------
  A.addGift('mono', `<g><circle r="46" fill="none" stroke="#6d8b2e" stroke-width="14"/><circle r="46" fill="none" stroke="#a5c76a" stroke-width="4" stroke-dasharray="6 9"/><circle r="26" fill="none" stroke="#8bc34a" stroke-width="12"/><circle r="26" fill="none" stroke="#c5e1a5" stroke-width="3" stroke-dasharray="5 8"/>${line('M40,22 Q70,42 56,74', '#6d8b2e', 12)}
    ${A.leaf(-36, -36, .32, -40, '#43a047')}${A.leaf(28, -44, .28, -120, '#66bb6a')}</g>`);
  A.addGift('guacamaya', `<g transform="rotate(25)"><path d="M0,80 C-26,30 -24,-50 0,-86 C24,-50 26,30 0,80 Z" fill="#e53935" stroke="rgba(0,0,0,.2)" stroke-width="3"/>
    <path d="M-20,-40 C-14,-62 -8,-74 0,-86 C8,-74 14,-62 20,-40 Z" fill="#1e88e5"/>${line('M0,96 L0,-76', '#8d6e63')}</g>`);
  A.addGift('tapir', `<g transform="rotate(-30)"><rect x="-6" y="-84" width="12" height="104" rx="6" fill="#8d5a2b"/>
    <path d="M0,8 C-36,20 -32,72 0,90 C32,72 36,20 0,8 Z" fill="#66bb6a" stroke="#2e7d32" stroke-width="4"/>${line('M0,14 L0,84', '#2e7d32', 3)}</g>`);
  A.addGift('jaguar', `<g transform="scale(1.3)"><path d="M0,40 C-62,0 -42,-52 0,-20 C42,-52 62,0 0,40 Z" fill="#b0bec5" stroke="#78909c" stroke-width="5"/>
    <ellipse cx="-20" cy="-16" rx="10" ry="6" fill="#fff" opacity=".6"/><circle cx="14" cy="6" r="3" fill="#90a4ae"/><circle cx="-6" cy="16" r="2.5" fill="#90a4ae"/></g>`);
  A.addGift('leon', `<g><path d="M0,-70 L18,-24 L68,-22 L28,8 L42,58 L0,30 L-42,58 L-28,8 L-68,-22 L-18,-24 Z" fill="#ffd23f" stroke="#ff9800" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="-12" cy="-4" r="5" fill="#8d5a00"/><circle cx="12" cy="-4" r="5" fill="#8d5a00"/>${line('M-10,12 Q0,22 10,12', '#8d5a00')}</g>`);
})();
