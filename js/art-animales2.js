// Animales de las paradas 4 a 8 con más detalle (vuelve a registrar mono, guacamaya, tapir, jaguar, leon y tortuga).
// Caricatura redondita: capas, degradados suaves con luz de arriba a la izquierda, contorno del mismo tono,
// textura suave y ojos grandes con dos brillitos. El origen sigue en los pies (y = 0 es el piso).
// Se carga después de art2.js: el envoltorio de Art.family (mamá sin marcas de bebé) se sigue usando tal cual.
(() => {
  const A = Art;
  const f = (n) => +n.toFixed(1);

  // ---------- Degradados (ids "an2…"): se agregan una sola vez a los <defs> del escenario ----------
  const stops = (list) => list.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}"${a < 1 ? ` stop-opacity="${a}"` : ''}/>`).join('');
  const rg = (id, list, cx = .35, cy = .3, r = .8) => `<radialGradient id="an2${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(list)}</radialGradient>`;
  const fur3 = (id, a, b, c) => rg(id, [[0, a], [.55, b], [1, c]]);
  const DEFS = [
    fur3('MonoFur', '#a8703f', '#7a4a2b', '#4e2d18'),
    fur3('MonoFace', '#fff0d6', '#f3d2a8', '#ddb07c'),
    fur3('Red', '#ff7a6b', '#e53935', '#a91b1b'),
    fur3('Blue', '#7cc4ff', '#1e88e5', '#0b54ab'),
    fur3('Yellow', '#fff59a', '#ffd23f', '#f0a500'),
    `<linearGradient id="an2Beak" x1="0" y1="0" x2=".8" y2="1">${stops([[0, '#ffffff'], [.5, '#f5ead2'], [1, '#c4ad86']])}</linearGradient>`,
    fur3('BeakDark', '#78909c', '#37474f', '#1c262b'),
    fur3('TapFur', '#94735f', '#6e5344', '#47342a'),
    fur3('TapDark', '#6a4f40', '#4b372c', '#33251d'),
    fur3('Mud', '#9a7253', '#6b4a32', '#47301f'),
    fur3('JagFur', '#ffcf6e', '#f2a33a', '#c9761a'),
    fur3('LionFur', '#fcdc8e', '#e9b552', '#c58b2c'),
    fur3('Mane', '#e3a04e', '#c27a34', '#8f5220'),
    fur3('Mane2', '#f6c46f', '#dc9a45', '#b8742c'),
    fur3('Tuft', '#a8693a', '#7d4a22', '#5a3315'),
    fur3('Cream', '#ffffff', '#fff3dc', '#efd6ad'),
    fur3('Ear', '#ffd6dc', '#f7b2bd', '#e48f9e'),
    fur3('Nose', '#ff9e9e', '#e57373', '#c24f55'),
    fur3('Shell', '#86d985', '#43a047', '#276b2b'),
    fur3('Scute', '#c8f0a0', '#8fd16a', '#5fae45'),
    fur3('TurSkin', '#d4f0a2', '#a5d36d', '#73a843'),
    rg('Eye', [[0, '#8a5d3b'], [.5, '#2e1b10'], [1, '#160c06']], .5, .78, .8),
    rg('Blush', [[0, '#ff7f9a', .8], [1, '#ff7f9a', 0]], .5, .5, .5),
    `<clipPath id="an2TapBody"><ellipse cx="6" cy="-76" rx="86" ry="50"/></clipPath>`,
  ].join('');
  const addDefs = () => {
    const d = document.querySelector('#stage defs');
    if (d && !document.getElementById('an2Eye')) d.insertAdjacentHTML('beforeend', DEFS);
    return !!d;
  };
  if (!addDefs()) document.addEventListener('DOMContentLoaded', addDefs);

  // ---------- Ayudas de dibujo ----------
  const U = (id) => `url(#an2${id})`;
  const strokeAt = (st, sw) => (st ? ` stroke="${st}" stroke-width="${sw}" stroke-linejoin="round"` : '');
  const P = (d, fill, st = '', sw = 3, x = '') => `<path d="${d}" fill="${fill}"${strokeAt(st, sw)}${x}/>`;
  const E = (cx, cy, rx, ry, fill, st = '', sw = 3, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"${strokeAt(st, sw)}${x}/>`;
  const C = (cx, cy, r, fill, st = '', sw = 3, x = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${strokeAt(st, sw)}${x}/>`;
  const L = (d, c, w = 4, x = '') => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"${x}/>`;
  // Trazo grueso con contorno (brazos, piernas, colas): contorno, relleno y un brillito arriba a la izquierda.
  const limb = (d, out, fill, w, hi) => L(d, out, w + 6) + L(d, fill, w) + (hi ? L(d, hi, Math.max(2, f(w * .28)), ' opacity=".5" transform="translate(-2,-2)"') : '');
  // Muchos puntitos en un solo <path>.
  const dots = (list) => list.map(([x, y, r]) => `M${f(x - r)},${y}a${r},${r} 0 1,0 ${f(2 * r)},0a${r},${r} 0 1,0 ${f(-2 * r)},0`).join('');
  // Ojo grande con dos brillitos.
  const eye = (x, y, r) => C(x, y, r, U('Eye'), '#140a04', 1.5) + C(f(x + r * .32), f(y - r * .36), f(r * .38), '#fff') +
    C(f(x - r * .36), f(y + r * .36), f(r * .17), '#fff', '', 0, ' opacity=".9"');
  const blush = (x, y, rx, ry = rx * .65) => E(x, y, rx, f(ry), U('Blush'));
  const shine = (x, y, rx, ry, rot = -20, o = .35) => E(x, y, rx, ry, '#fff', '', 0, ` opacity="${o}" transform="rotate(${rot} ${x} ${y})"`);
  const tear = (x, y, s = 1) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,-9 C-3,-3 -6,1 -6,4 A6,6 0 0 0 6,4 C6,1 3,-3 0,-9 Z" fill="#bfeaff" stroke="#5bbbe8" stroke-width="1.5"/>`;
  // Lo que solo tiene el bebé va en "kid-only": con 'mom' no se dibuja y en la parada lo oculta #mom .kid-only.
  const kid = (mood, s) => (mood === 'mom' ? '' : `<g class="kid-only">${s}</g>`);

  // ---------- Monito araña ----------
  const MO = { fur: '#7a4a2b', out: '#43260f', hi: '#c08a58', ink: '#2b1a10', mouth: '#7a2e22' };
  const monoTail = (d) => limb(d, MO.out, MO.fur, 13, MO.hi);
  const monoTorso = (arms = true) => {
    let s = limb('M-18,-46 Q-30,-28 -32,-12 M18,-46 Q30,-28 32,-12', MO.out, MO.fur, 16);
    s += E(-35, -9, 18, 9, U('MonoFace'), MO.out, 3) + E(35, -9, 18, 9, U('MonoFace'), MO.out, 3);
    s += E(0, -80, 44, 48, U('MonoFur'), MO.out, 3.5);
    s += E(0, -73, 27, 33, U('MonoFace'));
    s += L('M-10,-92 q4,-3 8,-2 M4,-80 q4,-3 8,-2 M-8,-64 q4,-3 8,-2 M6,-54 q3,-3 7,-2', '#d4a372', 2.5, ' opacity=".7"');
    s += L('M-30,-108 q-4,-4 -4,-10 M32,-104 q4,-4 4,-10 M-34,-62 q-4,-2 -6,-7 M34,-58 q4,-2 6,-7', '#3a200c', 3, ' opacity=".45"');
    if (arms) {
      s += limb('M-32,-110 Q-76,-94 -70,-30 M32,-110 Q76,-94 70,-30', MO.out, MO.fur, 15, MO.hi);
      s += C(-70, -24, 12, U('MonoFace'), MO.out, 3) + C(70, -24, 12, U('MonoFace'), MO.out, 3);
      s += L('M-76,-17 l2,-6 M-68,-14 l1,-6 M76,-17 l-2,-6 M68,-14 l-1,-6', '#c08a5a', 2);
    }
    return s;
  };
  const monoHead = (mood, tuft = true) => {
    let s = C(-56, -162, 19, U('MonoFur'), MO.out, 3.5) + C(56, -162, 19, U('MonoFur'), MO.out, 3.5);
    s += C(-56, -162, 11, U('MonoFace')) + C(56, -162, 11, U('MonoFace'));
    if (tuft) s += P('M-18,-206 Q-16,-236 -2,-216 Q4,-242 14,-214 Q26,-234 26,-204 Z', MO.fur, MO.out, 3);
    s += C(0, -166, 55, U('MonoFur'), MO.out, 3.5);
    s += L('M-34,-196 q-3,-5 -2,-10 M34,-196 q3,-5 2,-10 M-44,-182 q-4,-2 -5,-7 M44,-182 q4,-2 5,-7', '#3a200c', 3, ' opacity=".4"');
    s += P('M0,-192 C-14,-212 -50,-206 -48,-174 C-48,-148 -30,-122 0,-118 C30,-122 48,-148 48,-174 C50,-206 14,-212 0,-192 Z', U('MonoFace'), '#c9925e', 2);
    s += eye(-19, -170, 13) + eye(19, -170, 13);
    if (mood === 'sad') s += L('M-34,-190 L-12,-196 M34,-190 L12,-196', MO.out, 3.5) + tear(-31, -146);
    s += P(dots([[-5, -151, 3], [5, -151, 3]]), '#6b3f22');
    s += blush(-34, -146, 9) + blush(34, -146, 9);
    s += mood === 'sad'
      ? L('M-9,-130 Q0,-137 9,-130', MO.ink, 3.5)
      : P('M-14,-141 Q0,-121 14,-141 Q0,-135 -14,-141 Z', MO.mouth, MO.ink, 2.5) + E(0, -131, 5, 2.5, '#ff8a95');
    s += shine(-22, -200, 16, 8);
    return s;
  };
  A.monkeyTail = () => monoTail('M0,40 C0,10 10,-20 34,-26 C56,-30 62,-6 46,2 C34,8 26,-4 34,-10');
  A.monkey = (mood) => (mood === 'hang'
    // De cabeza, colgado de la cola: el origen es la rama. Los brazos cuelgan y la carita queda derecha.
    ? monoTail('M0,64 C2,40 -2,24 -14,14 C-30,2 -26,-22 -4,-22 C16,-22 22,-4 10,6') +
      `<g transform="translate(0,30) rotate(180)">${monoTorso(false)}</g>` +
      limb('M-30,146 Q-72,172 -64,250 M30,146 Q72,172 64,250', MO.out, MO.fur, 15, MO.hi) +
      C(-64, 256, 12, U('MonoFace'), MO.out, 3) + C(64, 256, 12, U('MonoFace'), MO.out, 3) +
      `<g transform="translate(0,374)">${monoHead('happy', false)}</g>`
    : monoTail('M34,-48 C96,-42 118,-110 96,-150 C80,-178 46,-170 50,-146 C53,-128 76,-130 76,-146') + monoTorso() + monoHead(mood));

  // ---------- Guacamaya roja (mira a la derecha) ----------
  const MC = { rout: '#8e1616', bout: '#0b4f9c', yout: '#c98a00', ink: '#1b1b1b' };
  A.macaw = (mood) => {
    // cola larga en capas
    let s = '<g transform="matrix(1,0,0,.75,0,-18)">' + P('M-12,-72 C-36,-42 -62,-2 -76,30 C-64,34 -52,28 -44,20 C-30,-12 -12,-40 4,-60 Z', U('Blue'), MC.bout, 3);
    s += P('M-2,-68 C-22,-30 -36,10 -46,42 C-34,44 -24,38 -18,30 C-8,-2 4,-32 14,-56 Z', U('Red'), MC.rout, 3);
    s += P('M-42,28 C-44,34 -45,38 -46,42 C-34,44 -24,38 -18,30 C-24,24 -34,24 -42,28 Z', U('Blue'));
    s += L('M-6,-56 C-20,-24 -30,6 -38,32 M-16,-56 C-34,-28 -50,0 -62,24', '#fff', 2, ' opacity=".35"') + '</g>';
    // patitas
    s += L('M-4,-32 L-6,-10 M16,-32 L18,-10', '#6f6f6f', 11) + L('M-4,-32 L-6,-10 M16,-32 L18,-10', '#a9a9a9', 7);
    s += E(-8, -7, 14, 7, '#b4b4b4', '#6f6f6f', 2.5) + E(20, -7, 14, 7, '#b4b4b4', '#6f6f6f', 2.5);
    s += L('M-13,-10 v5 M-4,-10 v5 M15,-10 v5 M24,-10 v5', '#6f6f6f', 2);
    // cuerpo con plumitas en el pecho
    s += E(4, -90, 50, 64, U('Red'), MC.rout, 3.5);
    s += L('M20,-118 q6,6 12,0 q6,6 12,0 M14,-100 q6,6 12,0 q6,6 12,0 M14,-82 q6,6 12,0 q6,6 12,0 M18,-64 q6,6 12,0', '#a91b1b', 2.5, ' opacity=".55"');
    // ala: plumas azules, franja amarilla con puntitas verdes y plumitas rojas arriba
    s += P('M-30,-118 C-4,-128 26,-114 30,-90 C30,-62 14,-40 -10,-26 L-22,-10 L-28,-26 L-40,-16 L-42,-34 L-52,-30 C-54,-62 -50,-96 -30,-118 Z', U('Blue'), MC.bout, 3);
    s += L('M-2,-62 L-20,-22 M10,-64 L-4,-34 M-16,-62 L-36,-24 M-30,-66 L-46,-34', MC.bout, 2.5, ' opacity=".6"');
    const scal = 'C26,-92 22,-84 14,-86 C8,-78 0,-80 -6,-82 C-12,-74 -22,-76 -26,-78 C-34,-72 -44,-76 -46,-84';
    s += P(`M-34,-122 C-6,-138 30,-124 32,-98 ${scal} C-48,-100 -44,-114 -34,-122 Z`, U('Yellow'), MC.yout, 2.5);
    s += L(`M32,-98 ${scal}`, '#43a047', 4.5);
    s += P('M-34,-122 C-6,-138 30,-124 32,-106 C24,-104 20,-98 12,-102 C6,-96 -2,-98 -8,-102 C-14,-96 -24,-98 -28,-104 C-34,-100 -40,-104 -42,-110 C-41,-115 -38,-119 -34,-122 Z', U('Red'), MC.rout, 2);
    s += shine(-12, -118, 16, 5, -12, .4);
    // cabeza con copete
    s += P('M0,-190 Q-8,-220 10,-210 Q12,-230 26,-208 Q36,-224 40,-198 Z', U('Red'), MC.rout, 3);
    s += C(22, -160, 42, U('Red'), MC.rout, 3.5);
    s += E(42, -160, 22, 26, '#fff7ef');
    s += L('M30,-146 q5,2 10,0 M34,-138 q5,2 10,0 M48,-140 q4,2 8,0', '#f2b3a6', 2);
    s += eye(40, -168, 10.5);
    if (mood === 'sad') s += L('M29,-183 L49,-188', MC.ink, 3) + tear(32, -150, .9);
    s += blush(48, -146, 7, 5);
    // pico curvo y brillante
    s += P('M58,-150 C70,-150 80,-144 80,-132 C70,-126 60,-134 58,-150 Z', U('BeakDark'));
    s += P('M56,-182 C86,-190 104,-158 92,-120 C88,-112 82,-114 84,-122 C86,-138 76,-148 56,-148 Z', U('Beak'), '#a8926a', 2.5);
    s += L('M64,-176 C78,-178 88,-168 92,-152', '#fff', 4, ' opacity=".85"');
    s += L('M56,-182 C52,-170 52,-158 56,-148', '#e6d6b8', 3);
    s += shine(6, -184, 14, 7);
    return s;
  };

  // ---------- Tapir (mira a la izquierda) ----------
  // El bebé tiene rayitas y puntitos de sandía (kid-only). Triste = atorado en el lodo.
  const TP = { out: '#33241b', light: '#f6e9d0', ink: '#24170f', hoof: '#2a1c14' };
  A.tapir = (mood) => {
    const sad = mood === 'sad';
    let s = E(94, -88, 9, 12, U('TapDark'), TP.out, 2.5);
    // patas de atrás (más oscuras) y de adelante
    const leg = (x, grad, w) => `<rect x="${x - w / 2}" y="-52" width="${w}" height="50" rx="${w / 2 - 1}" fill="${U(grad)}" stroke="${TP.out}" stroke-width="2.5"/>` + E(x, -6, w / 2 + 2, 6.5, TP.hoof);
    s += leg(-40, 'TapDark', 24) + leg(54, 'TapDark', 24) + leg(-64, 'TapFur', 26) + leg(30, 'TapFur', 26);
    s += L('M-68,-10 v6 M-60,-10 v6 M26,-10 v6 M34,-10 v6', '#6b5546', 2);
    s += kid(mood, P(dots([[-66, -36, 3.5], [-60, -24, 3], [28, -36, 3.5], [34, -24, 3]]), TP.light));
    // cuerpo
    s += E(6, -76, 88, 52, U('TapFur'), TP.out, 3.5);
    s += L('M-10,-120 q8,-3 14,0 M30,-118 q8,-3 14,0 M60,-106 q6,-2 12,2 M-30,-40 q8,3 14,0 M20,-32 q8,3 14,0', '#3b2a20', 3, ' opacity=".35"');
    s += kid(mood, `<g clip-path="url(#an2TapBody)">${L('M-90,-108 Q6,-140 100,-108 M-92,-88 Q6,-118 102,-88 M-92,-68 Q6,-96 102,-68 M-90,-48 Q6,-74 100,-48', TP.light, 6, ' stroke-dasharray="24 12"')}` +
      `${P(dots([[-44, -104, 4], [0, -114, 4.5], [46, -106, 4], [-24, -86, 4], [24, -92, 4], [66, -82, 4], [-56, -64, 4], [4, -70, 4], [52, -62, 4]]), TP.light)}</g>`);
    // oreja de atrás, cabeza, trompita y oreja con borde blanco
    s += E(-42, -132, 10, 15, U('TapDark'), TP.out, 2.5, ' transform="rotate(28 -42 -132)"');
    s += E(-80, -100, 44, 38, U('TapFur'), TP.out, 3.5);
    s += kid(mood, P(dots([[-60, -114, 3.5], [-50, -98, 3.5], [-62, -86, 3], [-46, -116, 3]]), TP.light));
    const snout = 'M-110,-123 C-130,-126 -146,-116 -153,-102 C-156,-94 -149,-87 -142,-91 C-136,-101 -126,-105 -110,-101';
    s += P(snout + ' Z', U('TapFur')) + L(snout, TP.out, 3);
    s += E(-149, -95, 7, 5.5, '#3d2b21', '', 0, ' transform="rotate(-40 -149 -95)"');
    s += L('M-124,-122 q3,7 0,15 M-135,-118 q3,6 0,13', TP.out, 2.2, ' opacity=".45"');
    s += E(-112, -84, 16, 8, TP.light, '', 0, ' opacity=".4"');
    s += E(-56, -136, 17, 23, TP.out, '', 0, ' transform="rotate(15 -56 -136)"');
    s += E(-56, -136, 13, 19, U('TapFur'), TP.light, 4, ' transform="rotate(15 -56 -136)"');
    s += E(-55, -134, 5.5, 11, '#d9a094', '', 0, ' transform="rotate(15 -55 -134)"');
    s += eye(-92, -110, 11.5);
    if (sad) s += L('M-106,-130 L-82,-125', TP.ink, 3.5) + tear(-98, -88, .95);
    s += blush(-68, -90, 9);
    s += sad ? L('M-122,-77 Q-113,-84 -103,-79', TP.ink, 3.5) : L('M-124,-85 Q-114,-74 -102,-82', TP.ink, 3.5);
    s += shine(-96, -126, 12, 6) + shine(-20, -114, 28, 9, -8, .25);
    // lodo
    if (sad) s += P('M-140,-30 Q-100,-58 -46,-42 Q8,-60 58,-44 Q102,-56 126,-30 Q130,8 0,8 Q-140,8 -140,-30 Z', U('Mud'), '#3f2a1b', 3) +
      L('M-112,-36 Q-82,-48 -52,-38 M8,-44 Q34,-52 60,-40', '#a77c5a', 4, ' opacity=".7"') +
      P(dots([[-20, -62, 7], [40, -100, 6], [-100, -126, 5], [72, -72, 5], [-62, -122, 4], [12, -128, 3.5]]), '#5a3d28') +
      C(-120, -44, 6, 'none', '#a77c5a', 2.5) + C(96, -40, 5, 'none', '#a77c5a', 2.5);
    return s;
  };

  // ---------- Felinos sentados de frente (jaguar y león): ojos grandes, boquita sin colmillos ----------
  // Rosetas del jaguar: anillos abiertos (tres arquitos) con el centro más oscuro.
  const rosettes = (list) => {
    let ring = '', mid = '';
    list.forEach(([x, y, r], i) => {
      const a0 = (i * 47) % 120;
      for (let k = 0; k < 3; k++) {
        const a1 = (a0 + k * 120) * Math.PI / 180, a2 = (a0 + k * 120 + 84) * Math.PI / 180;
        ring += `M${f(x + r * Math.cos(a1))},${f(y + r * Math.sin(a1))}A${r},${r} 0 0 1 ${f(x + r * Math.cos(a2))},${f(y + r * Math.sin(a2))}`;
      }
      mid += dots([[x, y, f(r * .55)]]);
    });
    return { ring, mid };
  };
  // Melena: mechones en capas alrededor de la cara.
  const ruff = (cx, cy, R, r, n, rot) => {
    const st = Math.PI * 2 / n, pt = (rad, a) => `${f(cx + rad * Math.cos(a))},${f(cy + rad * Math.sin(a) * .94)}`;
    let d = `M${pt(r, rot)}`;
    for (let k = 0; k < n; k++) { const a = rot + k * st; d += `C${pt(R, a + st * .15)} ${pt(R * 1.08, a + st * .75)} ${pt(r, a + st)}`; }
    return d + 'Z';
  };
  const HEAD = 'M0,-212 C38,-212 64,-190 64,-160 C64,-148 61,-138 56,-130 L66,-124 L52,-118 L58,-110 C40,-101 20,-99 0,-99 C-20,-99 -40,-101 -58,-110 L-52,-118 L-66,-124 L-56,-130 C-61,-138 -64,-148 -64,-160 C-64,-190 -38,-212 0,-212 Z';
  const bigCat = (c) => (mood) => {
    const sad = mood === 'sad', ink = '#2b1a10';
    // cola
    let s = limb('M44,-26 C104,-20 118,-74 92,-104', c.out, c.base, 15, c.hi);
    s += c.lion
      ? P('M84,-100 C76,-112 80,-128 92,-134 C90,-126 98,-124 100,-132 C108,-122 104,-106 96,-100 Z', U('Tuft'), '#5a3315', 2.5)
      : L('M98,-93 C96,-98 94,-102 92,-104', c.spot, 15) + L('M94,-52 h14 M97,-84 l12,7', c.spot, 5);
    // ancas, cuerpo y pechito
    s += E(-42, -20, 32, 20, U(c.grad), c.out, 3) + E(42, -20, 32, 20, U(c.grad), c.out, 3);
    s += E(0, -70, 56, 58, U(c.grad), c.out, 3.5);
    s += P('M-30,-110 C-36,-62 -24,-26 0,-20 C24,-26 36,-62 30,-110 Q0,-94 -30,-110 Z', U('Cream'));
    s += L('M-12,-84 l4,6 l4,-6 M2,-64 l4,6 l4,-6 M-14,-48 l4,6 l4,-6', '#e2c08e', 2.2);
    // manchas: rosetas del jaguar; manchitas del cachorro de león (solo bebé)
    if (c.lion) s += kid(mood, P(dots([[-44, -92, 6], [44, -94, 6], [-48, -60, 5.5], [48, -56, 5.5], [-46, -22, 5], [48, -24, 5], [-34, -40, 4.5], [36, -42, 4.5]]), c.spot, '', 0, ' opacity=".45"'));
    else {
      const r = rosettes([[-40, -94, 9], [42, -96, 9], [-46, -60, 8.5], [48, -58, 8.5], [-52, -22, 7.5], [54, -24, 7.5], [-24, -122, 6], [26, -122, 6]]);
      s += P(r.mid, '#d9862a') + L(r.ring, c.spot, 4.2);
    }
    // patitas
    s += `<rect x="-36" y="-76" width="24" height="72" rx="12" fill="${U(c.grad)}" stroke="${c.out}" stroke-width="3"/><rect x="12" y="-76" width="24" height="72" rx="12" fill="${U(c.grad)}" stroke="${c.out}" stroke-width="3"/>`;
    if (!c.lion) s += P(dots([[-28, -58, 3], [-19, -42, 2.6], [-29, -30, 2.4], [22, -60, 3], [29, -44, 2.6], [20, -30, 2.4]]), c.spot);
    s += E(-24, -8, 18, 11, U('Cream'), c.out, 3) + E(24, -8, 18, 11, U('Cream'), c.out, 3);
    s += L('M-30,-12 v6 M-18,-12 v6 M18,-12 v6 M30,-12 v6', c.out, 2.2);
    // melena en capas (leones)
    if (c.lion) {
      s += P(ruff(0, -152, 98, 70, 16, 0), U('Mane'), c.out, 3);
      s += P(ruff(0, -150, 86, 64, 14, .3), U('Mane2'));
      s += L('M-62,-200 q-6,-6 -8,-14 M62,-200 q6,-6 8,-14 M-78,-160 q-6,-2 -10,-8 M78,-160 q6,-2 10,-8 M-70,-112 q-6,2 -10,0 M70,-112 q6,2 10,0 M-24,-222 q-2,-6 0,-10 M24,-222 q2,-6 0,-10', '#9a5a22', 2.5, ' opacity=".6"');
    }
    // orejas y cabeza con cachetitos peluditos
    s += C(-44, -198, 20, U(c.grad), c.earOut, 3) + C(44, -198, 20, U(c.grad), c.earOut, 3);
    s += C(-44, -197, 11, U('Ear')) + C(44, -197, 11, U('Ear'));
    s += P(HEAD, U(c.grad), c.out, 3.5);
    s += c.lion
      ? kid(mood, L('M-8,-208 Q-6,-230 6,-212 Q12,-228 18,-206', c.tuft, 6) + P(dots([[-20, -192, 3.5], [0, -198, 3.5], [20, -192, 3.5]]), c.spot, '', 0, ' opacity=".4"'))
      : P(dots([[-20, -194, 4.5], [0, -200, 5], [20, -194, 4.5], [-10, -183, 3], [10, -183, 3], [-50, -164, 4], [50, -164, 4], [-44, -184, 4.2], [44, -184, 4.2], [-55, -144, 3.2], [55, -144, 3.2]]), c.spot);
    // hocico, bigotes y naricita
    s += E(-16, -128, 21, 16, U('Cream')) + E(16, -128, 21, 16, U('Cream')) + E(0, -113, 13, 8, U('Cream'));
    s += P(dots([[-26, -130, 2], [-18, -124, 2], [-28, -121, 2], [26, -130, 2], [18, -124, 2], [28, -121, 2]]), c.whisk);
    s += L('M-38,-132 l-18,-5 M-38,-125 l-19,1 M38,-132 l18,-5 M38,-125 l19,1', '#fff', 2, ' opacity=".85"');
    s += P('M-12,-148 Q0,-154 12,-148 Q8,-136 0,-133 Q-8,-136 -12,-148 Z', U('Nose'), '#b5484e', 2);
    s += E(-4, -147, 4, 2, '#fff', '', 0, ' opacity=".75"');
    s += sad
      ? L('M0,-133 v4 M-9,-116 Q0,-124 9,-116', ink, 3)
      : P('M-6,-123 Q0,-126 6,-123 Q5,-113 0,-112 Q-5,-113 -6,-123 Z', '#ff8a95') + L('M0,-133 v7 M-13,-124 Q-6,-115 0,-125 Q6,-115 13,-124', ink, 3);
    // ojos
    s += eye(-25, -164, 14.5) + eye(25, -164, 14.5);
    if (sad) s += L('M-41,-187 L-16,-194 M41,-187 L16,-194', c.brow, 4) + tear(-38, -140);
    s += blush(-47, -138, 10) + blush(47, -138, 10);
    s += shine(-24, -198, 16, 8);
    // El cachorro de león, perdido, se asoma entre el pasto alto.
    if (c.grass && sad) s += `<g transform="translate(0,4) scale(1,.6)">${A.grassTuft()}</g>`;
    return s;
  };
  A.jaguar = bigCat({ grad: 'JagFur', base: '#f2a33a', hi: '#ffd98a', out: '#9a5a14', spot: '#4a2a10', earOut: '#4a2a10', whisk: '#6b3d14', brow: '#4a2a10' });
  A.lion = bigCat({ grad: 'LionFur', base: '#e9b552', hi: '#fde3a0', out: '#9c6a22', spot: '#b9792a', earOut: '#9c6a22', whisk: '#a0661f', brow: '#8d5524', tuft: '#8d5524', lion: true, grass: true });

  // ---------- Tortuga del puente (de lado, sobre el agua). Ánimo 'sneeze' = ¡achú! ----------
  A.turtle = (mood = 'happy') => {
    const out = '#24561f', skinOut = '#5a8a2c', ink = '#1b3a12';
    let s = E(0, 4, 104, 15, '#fff', '', 0, ' opacity=".35"') + E(0, 5, 86, 10, 'none', '#fff', 2.5, ' opacity=".6"');
    // colita y aletas
    s += P('M-74,-12 L-98,-5 L-72,-2 Z', U('TurSkin'), skinOut, 2.5);
    s += E(-60, -4, 26, 10, U('TurSkin'), skinOut, 2.5, ' transform="rotate(12 -60 -4)"') + E(58, -2, 26, 10, U('TurSkin'), skinOut, 2.5, ' transform="rotate(-12 58 -2)"');
    s += P(dots([[-66, -5, 2.5], [-55, -2, 2], [54, -3, 2.5], [65, -1, 2]]), '#73a843');
    // cuello y cabeza
    s += limb('M62,-14 Q80,-20 90,-30', skinOut, '#a5d36d', 16);
    s += C(98, -36, 24, U('TurSkin'), skinOut, 3);
    s += P(dots([[86, -50, 2.5], [79, -40, 2], [96, -56, 2]]), '#73a843');
    // caparazón con placas
    s += P('M-78,-6 C-74,-78 74,-78 78,-6 Z', U('Shell'), out, 4);
    s += P('M-28,-48 L-25,-37 L-28,-18 L-50,-16 L-56,-28 L-44,-42 Z M28,-48 L25,-37 L28,-18 L50,-16 L56,-28 L44,-42 Z', U('Scute'), out, 3);
    s += P('M-15,-56 L15,-56 L24,-38 L15,-20 L-15,-20 L-24,-38 Z', U('Scute'), out, 3);
    s += L('M-8,-48 l4,-3 M-40,-36 l4,-3 M34,-38 l4,-3', '#fff', 2.5, ' opacity=".55"');
    s += P('M-82,-8 Q0,-24 82,-8 Q84,2 76,3 Q0,-10 -76,3 Q-84,2 -82,-8 Z', '#b8e07c', out, 3);
    s += L('M-62,-10 l-2,8 M-42,-13 l-1,8 M-21,-15 v8 M0,-16 v8 M21,-15 v8 M42,-13 l1,8 M62,-10 l2,8', out, 2.5);
    s += shine(-32, -52, 22, 7, -18, .4) + C(-52, -42, 3, '#fff', '', 0, ' opacity=".6"');
    // carita
    if (mood === 'sneeze') {
      s += L('M98,-48 L108,-42 L98,-37', ink, 3.5);
      s += E(110, -24, 7, 8, '#7b1f1f') + E(110, -20, 4, 3, '#ff8a95');
      s += C(134, -36, 6, '#e1f5fe', '#81d4fa', 2) + C(144, -24, 4.5, '#e1f5fe', '#81d4fa', 2) + C(140, -48, 3.5, '#e1f5fe', '#81d4fa', 2) + C(152, -38, 3, '#e1f5fe', '#81d4fa', 2);
      s += L('M126,-56 l8,-8 M128,-14 l9,6', '#81d4fa', 3);
    } else {
      s += eye(104, -42, 9) + L('M94,-26 Q104,-17 114,-26', ink, 3);
    }
    s += C(119, -40, 2, '#3d6b1f');
    s += blush(90, -28, 6, 4);
    s += shine(88, -52, 9, 5);
    return s;
  };

  // ---------- Registro ----------
  A.addAnimal('mono', { draw: A.monkey, box: { cx: 20, cy: -114, w: 215 } });
  A.addAnimal('guacamaya', { draw: A.macaw, box: { cx: 12, cy: -104, w: 200 } });
  A.addAnimal('tapir', { draw: A.tapir, box: { cx: -26, cy: -82, w: 250 } });
  A.addAnimal('jaguar', { draw: A.jaguar, box: { cx: 18, cy: -112, w: 212 } });
  A.addAnimal('leon', { draw: A.lion, box: { cx: 8, cy: -122, w: 232 } });
  // La tortuga solo habla en el globo ("¡achú!"); no es una parada.
  A.addAnimal('tortuga', { draw: (m) => A.turtle(m === 'sneeze' ? 'sneeze' : 'happy'), box: { cx: 22, cy: -32, w: 228 } });

  // Estos animales ya traen su propia luz y sombra: se les quita el brillo/sombra genérico de art.js
  // (tapaba un ojo con una mancha blanca y oscurecía un disco alrededor), pero conservan la sombra en el piso.
  const MINE = new Set(['mono', 'guacamaya', 'tapir', 'jaguar', 'leon', 'tortuga']);
  const OVERLAY = /<ellipse [^>]*fill="url\(#(?:shine|shade)\)"[^>]*pointer-events="none"\/>/g;
  const prevAnimal = A.animal;
  A.animal = (id, mood = 'happy') => {
    const out = prevAnimal(id, mood);
    if (!MINE.has(id)) return out;
    const clean = out.replace(OVERLAY, '');
    // Colgado de la rama no lleva sombra en el piso.
    return id === 'mono' && mood === 'hang' ? clean.replace(/^<ellipse [^>]*fill="#0b3016"[^>]*\/>/, '') : clean;
  };
})();
