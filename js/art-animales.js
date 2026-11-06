// Animales de las paradas 1 a 3 con más detalle (vuelve a registrar rana, tucan y perezoso).
// Caricatura redondita y pulida: degradados suaves, luz desde arriba a la izquierda, ojos grandes
// con dos brillitos y cachetes rosados. Origen en los pies (centro abajo). Ánimos: 'happy' y 'sad'
// (cualquier otro valor se dibuja feliz). Se carga después de art.js y art2.js.
(() => {
  const A = Art;
  const n = (v) => Math.round(v * 10) / 10;

  // ---------- Degradados propios (ids con prefijo an1) ----------
  // Se agregan una sola vez a <defs> del escenario; si no hay escenario, van dentro del dibujo.
  const DEFS = `
    <radialGradient id="an1FrogSkin" cx=".36" cy=".28" r=".8"><stop offset="0" stop-color="#a6f58a"/><stop offset=".45" stop-color="#45d052"/><stop offset="1" stop-color="#1f9a3b"/></radialGradient>
    <linearGradient id="an1FrogBelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf0"/><stop offset="1" stop-color="#e3f3bd"/></linearGradient>
    <linearGradient id="an1FrogFlank" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b9bff"/><stop offset="1" stop-color="#2b4fc4"/></linearGradient>
    <radialGradient id="an1FrogEye" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="#ff9a7c"/><stop offset=".5" stop-color="#f22c22"/><stop offset="1" stop-color="#a50f1c"/></radialGradient>
    <radialGradient id="an1Orange" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd27a"/><stop offset="1" stop-color="#ff8a1c"/></radialGradient>
    <radialGradient id="an1TouBody" cx=".34" cy=".22" r=".85"><stop offset="0" stop-color="#4d4d70"/><stop offset=".45" stop-color="#25253b"/><stop offset="1" stop-color="#101019"/></radialGradient>
    <linearGradient id="an1TouWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a5a"/><stop offset="1" stop-color="#14141f"/></linearGradient>
    <radialGradient id="an1TouBib" cx=".4" cy=".3" r=".75"><stop offset="0" stop-color="#fffdf0"/><stop offset=".55" stop-color="#fff0a0"/><stop offset="1" stop-color="#ffd23f"/></radialGradient>
    <linearGradient id="an1TouBill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe45c"/><stop offset=".45" stop-color="#ffb627"/><stop offset=".85" stop-color="#ff8a1f"/><stop offset="1" stop-color="#ff6d1a"/></linearGradient>
    <linearGradient id="an1BillShade" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#b34700" stop-opacity="0"/><stop offset="1" stop-color="#b34700" stop-opacity=".35"/></linearGradient>
    <radialGradient id="an1TouFace" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#b8f4ff"/><stop offset="1" stop-color="#2fa6e6"/></radialGradient>
    <radialGradient id="an1Red" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ff7a6b"/><stop offset="1" stop-color="#d32a2a"/></radialGradient>
    <linearGradient id="an1Leg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb8e6"/><stop offset="1" stop-color="#4d7fb8"/></linearGradient>
    <radialGradient id="an1Iris" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#6b4a3a"/><stop offset=".55" stop-color="#2a1a14"/><stop offset="1" stop-color="#0c0806"/></radialGradient>
    <radialGradient id="an1SloFur" cx=".36" cy=".28" r=".85"><stop offset="0" stop-color="#d9b98f"/><stop offset=".5" stop-color="#ad8962"/><stop offset="1" stop-color="#7c5a3b"/></radialGradient>
    <radialGradient id="an1SloFace" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#ecd6ae"/></radialGradient>
    <radialGradient id="an1SloMask" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#7d5536"/><stop offset="1" stop-color="#432812"/></radialGradient>
    <linearGradient id="an1Claw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#d8c49c"/></linearGradient>
    <clipPath id="an1FrogClip"><ellipse cx="0" cy="-62" rx="66" ry="54"/></clipPath>
    <clipPath id="an1TouClip"><ellipse cx="0" cy="-102" rx="52" ry="78"/></clipPath>`;
  let defsInStage = false;
  const ensureDefs = () => {
    if (defsInStage) return '';
    if (typeof document !== 'undefined') {
      if (document.getElementById('an1FrogSkin')) { defsInStage = true; return ''; }
      const defs = document.querySelector('#stage defs');
      if (defs) { defs.insertAdjacentHTML('beforeend', DEFS); defsInStage = true; return ''; }
    }
    return `<defs>${DEFS}</defs>`;
  };
  ensureDefs();

  // ---------- Piezas comunes ----------
  const blush = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ff6f96" opacity=".6"/>`;
  const sparkles = (x, y, r, sad) => sad
    ? `<circle cx="${n(x - r * .3)}" cy="${n(y + r * .36)}" r="${n(r * .22)}" fill="#fff"/><circle cx="${n(x + r * .36)}" cy="${n(y + r * .58)}" r="${n(r * .1)}" fill="#fff"/>`
    : `<circle cx="${n(x - r * .32)}" cy="${n(y - r * .36)}" r="${n(r * .34)}" fill="#fff"/><circle cx="${n(x + r * .38)}" cy="${n(y + r * .36)}" r="${n(r * .15)}" fill="#fff"/>`;
  // Párpado caído (triste): tapa la parte de arriba del ojo y baja hacia la orilla de afuera.
  const lid = (x, y, r, outerLeft, fill, ink) => {
    const lo = y + r * .34, hi = y - r * .1, yl = outerLeft ? lo : hi, yr = outerLeft ? hi : lo, cy = y + r * .2, R = r + 1.2;
    return `<path d="M${n(x - R)},${y} A${n(R)},${n(R)} 0 0 1 ${n(x + R)},${y} L${n(x + R)},${n(yr)} Q${x},${n(cy)} ${n(x - R)},${n(yl)} Z" fill="${fill}"/>` +
      `<path d="M${n(x - r)},${n(yl)} Q${x},${n(cy)} ${n(x + r)},${n(yr)}" stroke="${ink}" stroke-width="${n(Math.max(2, r * .14))}" fill="none" stroke-linecap="round"/>`;
  };
  const tear = (x, y, k = 1) => `<path d="M${x},${y} q${n(-5 * k)},${n(8 * k)} 0,${n(11 * k)} q${n(5 * k)},${n(-3 * k)} 0,${n(-11 * k)} Z" fill="#9fe0ff" stroke="#4fb3e8" stroke-width="1.2"/>`;
  // Contorno peludito: elipse con festones hacia afuera.
  const fuzz = (cx, cy, rx, ry, count, amp, a0 = 0) => {
    let d = '';
    for (let i = 0; i <= count; i++) {
      const a = a0 + (i / count) * Math.PI * 2, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      if (!i) { d += `M${n(x)},${n(y)}`; continue; }
      const m = a - Math.PI / count;
      d += `Q${n(cx + rx * (1 + amp) * Math.cos(m))},${n(cy + ry * (1 + amp) * Math.sin(m))} ${n(x)},${n(y)}`;
    }
    return d + 'Z';
  };
  // Pelitos: trazos cortos y curvos repartidos dentro de una elipse (un solo path).
  const furStrokes = (cx, cy, rx, ry, count, len, seed, from = 0, to = Math.PI * 2, rMin = .25) => {
    let d = '';
    for (let k = 0; k < count; k++) {
      const u = ((k * 0.618 + seed) % 1), v = ((k * 0.382 + seed * 1.7) % 1);
      const a = from + (to - from) * u, rr = rMin + (1 - rMin) * Math.sqrt(v) * .9;
      const x = cx + rx * rr * Math.cos(a), y = cy + ry * rr * Math.sin(a), s = k % 2 ? 1 : -1;
      d += `M${n(x)},${n(y)}q${n(s * len * .35)},${n(len * .5)} ${n(s * len * .1)},${n(len)}`;
    }
    return d;
  };

  // ===================== Rana de ojos rojos =====================
  const frog = (mood) => {
    const sad = mood === 'sad', ol = '#17803a', or = '#d9620b';
    let s = ensureDefs();
    // patas de atrás: deditos naranjas con almohadillas
    const toes = [[-54, -9, -82, -12], [-54, -9, -78, -3], [-54, -9, -66, 0]];
    const allToes = toes.concat(toes.map(([a, b, c, d]) => [-a, b, -c, d]));
    const toeD = allToes.map(([a, b, c, d]) => `M${a},${b} L${c},${d}`).join(' ');
    s += `<path d="${toeD}" stroke="${or}" stroke-width="9" stroke-linecap="round" fill="none"/><path d="${toeD}" stroke="#ff9d2e" stroke-width="5.5" stroke-linecap="round" fill="none"/>`;
    s += allToes.map(([, , c, d]) => `<circle cx="${c}" cy="${d}" r="5" fill="url(#an1Orange)" stroke="${or}" stroke-width="1.5"/>`).join('');
    // muslos
    s += `<ellipse cx="-50" cy="-32" rx="30" ry="20" transform="rotate(22 -50 -32)" fill="url(#an1FrogSkin)" stroke="${ol}" stroke-width="3"/>`;
    s += `<ellipse cx="50" cy="-32" rx="30" ry="20" transform="rotate(-22 50 -32)" fill="url(#an1FrogSkin)" stroke="${ol}" stroke-width="3"/>`;
    s += `<path d="M-74,-38 Q-56,-24 -32,-22 M74,-38 Q56,-24 32,-22" stroke="#3f6fe0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>`;
    // cuencas de los ojos (detrás del cuerpo para que se vea una sola cabeza)
    for (const x of [-34, 34]) s += `<circle cx="${x}" cy="-106" r="27" fill="url(#an1FrogSkin)"/><path d="M${x - 26},-100 A27,27 0 1 1 ${x + 26},-100" stroke="${ol}" stroke-width="3" fill="none"/>`;
    // cuerpo con costados azules a rayitas, panza clara, manchitas y brillo
    s += `<g clip-path="url(#an1FrogClip)"><ellipse cx="0" cy="-62" rx="66" ry="54" fill="url(#an1FrogSkin)"/>`;
    s += `<ellipse cx="-71" cy="-52" rx="20" ry="40" fill="url(#an1FrogFlank)"/><ellipse cx="71" cy="-52" rx="20" ry="40" fill="url(#an1FrogFlank)"/>`;
    s += `<path d="M-56,-84 l-4,9 M-58,-64 l-4,10 M-54,-42 l-4,9 M56,-84 l4,9 M58,-64 l4,10 M54,-42 l4,9" stroke="#fff3b0" stroke-width="4" stroke-linecap="round"/>`;
    s += `<ellipse cx="0" cy="-30" rx="44" ry="34" fill="url(#an1FrogBelly)"/>`;
    s += `<path d="M-30,-20 q4,3 8,0 M-6,-14 q4,3 8,0 M18,-20 q4,3 8,0" stroke="#cfe3a0" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    s += [[-44, -86, 3.2], [-36, -74, 2], [-50, -70, 2.4], [40, -88, 3], [48, -76, 2.2], [32, -94, 1.8], [-14, -104, 2.2], [16, -106, 1.8]]
      .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#c9fbb0" opacity=".75"/>`).join('');
    s += `<ellipse cx="-26" cy="-96" rx="22" ry="9" transform="rotate(-24 -26 -96)" fill="#fff" opacity=".35"/></g>`;
    s += `<ellipse cx="0" cy="-62" rx="66" ry="54" fill="none" stroke="${ol}" stroke-width="3"/>`;
    // bracitos y manitas
    const armD = 'M-44,-58 C-52,-38 -44,-18 -32,-11 M44,-58 C52,-38 44,-18 32,-11';
    s += `<path d="${armD}" stroke="${ol}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="${armD}" stroke="#4fd45d" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    const fingers = [[-32, -10, -45, -6], [-32, -10, -36, 0], [-32, -10, -22, -2]];
    const allF = fingers.concat(fingers.map(([a, b, c, d]) => [-a, b, -c, d]));
    const fD = allF.map(([a, b, c, d]) => `M${a},${b} L${c},${d}`).join(' ');
    s += `<path d="${fD}" stroke="${or}" stroke-width="7.5" stroke-linecap="round" fill="none"/><path d="${fD}" stroke="#ff9d2e" stroke-width="4.5" stroke-linecap="round" fill="none"/>`;
    s += allF.map(([, , c, d]) => `<circle cx="${c}" cy="${d}" r="4" fill="url(#an1Orange)" stroke="${or}" stroke-width="1.2"/>`).join('');
    // ojos rojos grandes
    for (const x of [-34, 34]) {
      const y = -106;
      s += `<circle cx="${x}" cy="${y}" r="19.5" fill="url(#an1FrogEye)" stroke="#8a0d14" stroke-width="1.6"/>`;
      s += `<ellipse cx="${x + 3}" cy="${y + 10}" rx="11" ry="5" fill="#ffb199" opacity=".45"/>`;
      s += `<ellipse cx="${x}" cy="${y + (sad ? 4 : 0)}" rx="6.5" ry="12" fill="#180808"/>`;
      if (sad) s += lid(x, y, 19.5, x < 0, 'url(#an1FrogSkin)', ol);
      s += sparkles(x, y, 19.5, sad);
      s += `<ellipse cx="${x - 12}" cy="${y - 20}" rx="7" ry="3.5" transform="rotate(-30 ${x - 12} ${y - 20})" fill="#fff" opacity=".45"/>`;
    }
    // carita
    s += `<circle cx="-7" cy="-92" r="2" fill="#146b2c"/><circle cx="7" cy="-92" r="2" fill="#146b2c"/>`;
    s += blush(-38, -76, 9, 5.5) + blush(38, -76, 9, 5.5);
    if (sad) {
      s += `<path d="M-14,-66 Q0,-75 14,-66" stroke="#145a2a" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      s += tear(-48, -86, 1);
    } else {
      s += `<path d="M-30,-80 Q0,-50 30,-80 Q0,-66 -30,-80 Z" fill="#8c2333" stroke="#145a2a" stroke-width="3.5" stroke-linejoin="round"/>`;
      s += `<path d="M-11,-66 Q0,-73 11,-66 Q0,-60 -11,-66 Z" fill="#ff7a95"/>`;
      s += `<path d="M-36,-82 q3,-3 6,2 M36,-82 q-3,-3 -6,2" stroke="#145a2a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }
    return s;
  };

  // ===================== Tucán =====================
  const toucan = (mood) => {
    const sad = mood === 'sad', ink = '#0a0a14';
    let s = ensureDefs();
    // cola
    s += `<path d="M-22,-52 L-40,-4 Q-32,4 -22,0 L-4,-48 Z" fill="#1a1a2b" stroke="#3d3d5c" stroke-width="2" stroke-linejoin="round"/>`;
    s += `<path d="M-8,-50 L-16,0 Q-6,6 4,0 L8,-46 Z" fill="#20203a" stroke="#3d3d5c" stroke-width="2" stroke-linejoin="round"/>`;
    // patitas azules
    const legD = 'M-8,-32 L-10,-8 M12,-32 L13,-8 M-10,-8 L-23,-3 M-10,-8 L1,-3 M13,-8 L3,-3 M13,-8 L27,-3';
    s += `<path d="${legD}" stroke="#2f5a8a" stroke-width="10" stroke-linecap="round" fill="none"/><path d="${legD}" stroke="url(#an1Leg)" stroke-width="6.5" stroke-linecap="round" fill="none"/>`;
    // cuerpo negro brillante con pecho amarillo
    s += `<path d="M-10,-176 C-12,-192 0,-200 10,-195 C3,-191 -1,-185 1,-178 Z" fill="#23233a" stroke="${ink}" stroke-width="2"/>`;
    s += `<ellipse cx="0" cy="-102" rx="52" ry="78" fill="url(#an1TouBody)"/>`;
    s += `<g clip-path="url(#an1TouClip)"><ellipse cx="28" cy="-120" rx="37" ry="47" fill="#ff7043"/><ellipse cx="28" cy="-127" rx="36" ry="45" fill="url(#an1TouBib)"/>`;
    s += `<path d="M6,-112 q5,5 10,0 q5,5 10,0 q5,5 10,0 q5,5 10,0 M12,-98 q5,5 10,0 q5,5 10,0 q5,5 10,0 M20,-140 q5,5 10,0 q5,5 10,0" stroke="#efc23e" stroke-width="2" fill="none" stroke-linecap="round" opacity=".75"/>`;
    s += `<ellipse cx="12" cy="-28" rx="30" ry="15" fill="url(#an1Red)"/><path d="M-8,-36 q5,4 10,0 q5,4 10,0 q5,4 10,0" stroke="#ff9a8a" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
    s += `<ellipse cx="-16" cy="-150" rx="16" ry="10" transform="rotate(-35 -16 -150)" fill="#fff" opacity=".2"/></g>`;
    s += `<ellipse cx="0" cy="-102" rx="52" ry="78" fill="none" stroke="${ink}" stroke-width="3"/>`;
    // ala con plumas en capas
    s += `<path d="M-30,-144 C-58,-126 -60,-82 -45,-48 Q-39,-37 -33,-45 Q-27,-33 -19,-43 Q-11,-33 -5,-47 C6,-72 6,-112 -6,-134 C-12,-143 -22,-147 -30,-144 Z" fill="url(#an1TouWing)" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += `<path d="M-46,-110 q6,7 12,0 q6,7 12,0 q6,7 12,0 M-50,-90 q6,7 12,0 q6,7 12,0 q6,7 12,0 q6,7 12,0 M-48,-70 q6,7 12,0 q6,7 12,0 q6,7 12,0 q6,7 12,0" stroke="#5a5a85" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"/>`;
    s += `<ellipse cx="-30" cy="-124" rx="7" ry="15" transform="rotate(20 -30 -124)" fill="#fff" opacity=".18"/>`;
    // cachete y ojo con piel azul
    s += blush(6, -133, 9, 5.5);
    const ex = 15, ey = -155, er = 12.5;
    s += `<ellipse cx="${ex + 1}" cy="${ey}" rx="21" ry="20" fill="url(#an1TouFace)" stroke="#1d8fc9" stroke-width="1.5"/>`;
    s += `<circle cx="${ex}" cy="${ey}" r="${er}" fill="url(#an1Iris)" stroke="${ink}" stroke-width="1.5"/>`;
    if (sad) s += lid(ex, ey, er, true, '#6fd0f5', '#1d6f9c');
    s += sparkles(ex, ey, er, sad);
    // pico grande y brillante con punta negra
    const bill = 'M30,-182 C74,-212 146,-204 176,-164 C166,-150 148,-148 126,-148 C92,-146 60,-142 32,-146 Z';
    s += `<path d="${bill}" fill="url(#an1TouBill)"/>`;
    s += `<path d="M34,-178 C78,-205 142,-199 174,-166 C138,-186 84,-188 36,-168 Z" fill="#ffe680" opacity=".85"/>`;
    s += `<path d="${bill}" fill="url(#an1BillShade)"/>`;
    s += `<path d="M156,-185 C166,-178 172,-171 176,-164 C170,-156 160,-151 148,-149 C155,-158 158,-172 156,-185 Z" fill="#26262e"/>`;
    s += `<path d="M163,-176 q5,4 7,9" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>`;
    s += `<path d="${bill}" fill="none" stroke="#c2570c" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += `<path d="M52,-184 C80,-198 112,-198 136,-190 C110,-190 82,-186 56,-176 Z" fill="#fff" opacity=".6"/><ellipse cx="46" cy="-176" rx="4" ry="2.5" fill="#fff" opacity=".7"/>`;
    s += `<path d="M31,-182 Q25,-164 32,-146" stroke="#1a1a2b" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M40,-157 C70,-160 116,-160 158,-156" stroke="#b85c00" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    s += sad
      ? `<path d="M32,-150 Q35,-157 42,-157" stroke="#b85c00" stroke-width="2.6" fill="none" stroke-linecap="round"/>` + tear(4, -138, .9)
      : `<path d="M30,-167 Q31,-155 42,-157" stroke="#b85c00" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    return s;
  };

  // ===================== Perezoso =====================
  const sloth = (mood) => {
    const sad = mood === 'sad', ol = '#6b4a30', fur = '#ad8962';
    let s = ensureDefs();
    const claw = (x, y, len, bend) => `<path d="M${x - 3},${y} C${x - 3},${n(y + len * .6)} ${n(x + bend * .3)},${y + len} ${x + bend},${y + len} C${n(x + bend * .2 + 1)},${n(y + len * .75)} ${x + 3},${n(y + len * .5)} ${x + 3},${y} Z" fill="url(#an1Claw)" stroke="#b59c74" stroke-width="1.2" stroke-linejoin="round"/>`;
    // patitas
    for (const k of [-1, 1]) {
      s += `<ellipse cx="${k * 38}" cy="-13" rx="26" ry="14" fill="url(#an1SloFur)" stroke="${ol}" stroke-width="2.5"/>`;
      s += claw(k * 28, -9, 9, k * 2) + claw(k * 38, -7, 9, k * 2) + claw(k * 48, -9, 9, k * 2);
    }
    // cuerpo peludito, pancita clara, pelitos y musgo
    s += `<path d="${fuzz(0, -78, 70, 68, 22, .07, .1)}" fill="url(#an1SloFur)" stroke="${ol}" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += `<ellipse cx="0" cy="-62" rx="42" ry="42" fill="#e6caa0" opacity=".45"/>`;
    s += `<path d="${furStrokes(0, -76, 62, 60, 20, 8, .13)}" stroke="#7a5838" stroke-width="2" fill="none" stroke-linecap="round" opacity=".38"/>`;
    s += `<path d="${furStrokes(-6, -84, 56, 52, 14, 8, .57)}" stroke="#ecd5b0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>`;
    s += `<ellipse cx="-34" cy="-56" rx="10" ry="6" fill="#8bc34a" opacity=".3"/><ellipse cx="30" cy="-40" rx="8" ry="5" fill="#8bc34a" opacity=".3"/><ellipse cx="42" cy="-94" rx="6" ry="4" fill="#8bc34a" opacity=".3"/>`;
    // brazos largos con garritas
    const armD = 'M-46,-122 C-82,-108 -90,-66 -74,-38 M46,-122 C82,-108 90,-66 74,-38';
    s += `<path d="${armD}" stroke="${ol}" stroke-width="31" fill="none" stroke-linecap="round"/><path d="${armD}" stroke="${fur}" stroke-width="26" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M-56,-118 C-80,-104 -86,-74 -80,-56 M56,-118 C80,-104 86,-74 80,-56" stroke="#d9b98f" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>`;
    s += `<path d="M-84,-80 l-4,6 M-80,-64 l-4,5 M84,-80 l4,6 M80,-64 l4,5" stroke="#7a5838" stroke-width="2" stroke-linecap="round" opacity=".6"/>`;
    for (const k of [-1, 1]) {
      s += `<path d="${fuzz(k * 74, -36, 15, 14, 9, .12)}" fill="url(#an1SloFur)" stroke="${ol}" stroke-width="2.2"/>`;
      s += claw(k * 82, -28, 20, k * 6) + claw(k * 74, -25, 22, k * 6) + claw(k * 66, -28, 20, k * 6);
    }
    // cabeza peludita con mechón
    s += `<path d="M-14,-205 Q-14,-222 -3,-213 Q1,-230 8,-212 Q18,-224 16,-204 Z" fill="url(#an1SloFur)" stroke="${ol}" stroke-width="2" stroke-linejoin="round"/>`;
    s += `<path d="${fuzz(0, -156, 60, 55, 20, .07, .15)}" fill="url(#an1SloFur)" stroke="${ol}" stroke-width="2.5" stroke-linejoin="round"/>`;
    s += `<path d="${furStrokes(0, -156, 56, 52, 14, 7, .31, Math.PI * 1.08, Math.PI * 1.92, .82)}" stroke="#7a5838" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/>`;
    s += `<ellipse cx="-24" cy="-190" rx="17" ry="9" transform="rotate(-20 -24 -190)" fill="#fff" opacity=".22"/>`;
    // carita clara con antifaz café
    s += `<path d="M0,-188 C30,-194 50,-174 48,-150 C46,-124 24,-112 0,-112 C-24,-112 -46,-124 -48,-150 C-50,-174 -30,-194 0,-188 Z" fill="url(#an1SloFace)"/>`;
    for (const k of [-1, 1]) {
      s += `<path d="M${k * 5},-161 C${k * 6},-172 ${k * 26},-174 ${k * 36},-162 C${k * 43},-153 ${k * 41},-142 ${k * 34},-139 C${k * 25},-141 ${k * 7},-149 ${k * 5},-161 Z" fill="url(#an1SloMask)"/>`;
      const x = k * 21, y = -159, r = 8.5;
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#an1Iris)" stroke="#1a0f08" stroke-width="1"/>`;
      if (sad) s += lid(x, y, r, k < 0, '#5a3820', '#2a170a');
      s += sparkles(x, y, r, sad);
    }
    s += blush(-31, -132, 8, 5) + blush(31, -132, 8, 5);
    s += `<path d="M-10,-143 C-10,-150 10,-150 10,-143 C10,-137 4,-133 0,-133 C-4,-133 -10,-137 -10,-143 Z" fill="#3a2414"/><ellipse cx="-3.5" cy="-145" rx="3.5" ry="2" fill="#fff" opacity=".55"/>`;
    if (sad) {
      s += `<path d="M-9,-120 Q0,-127 9,-120" stroke="#3a2414" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      s += tear(-30, -142, .9);
    } else {
      s += `<path d="M-12,-129 Q0,-114 12,-129 Q0,-123 -12,-129 Z" fill="#8c3a2c" stroke="#3a2414" stroke-width="2.8" stroke-linejoin="round"/>`;
      s += `<path d="M-5,-122.5 Q0,-125 5,-122.5 Q0,-119 -5,-122.5 Z" fill="#ff8a9e"/>`;
    }
    return s;
  };

  // ---------- Registro ----------
  A.frog = frog;
  A.toucan = toucan;
  A.sloth = sloth;
  A.addAnimal('rana', { draw: frog, box: { cx: 0, cy: -66, w: 178 } });
  A.addAnimal('tucan', { draw: toucan, box: { cx: 61, cy: -100, w: 232 } });
  A.addAnimal('perezoso', { draw: sloth, box: { cx: 0, cy: -110, w: 206 } });

  // Estos tres ya traen su propia luz y sombra: se les quita el brillo/sombra genérico encima
  // (tapaba los ojos con una mancha blanca), pero conservan la sombra en el piso.
  const MINE = new Set(['rana', 'tucan', 'perezoso']);
  const OVERLAY = /<ellipse [^>]*fill="url\(#(?:shine|shade)\)"[^>]*pointer-events="none"\/>/g;
  const prevAnimal = A.animal;
  A.animal = (id, mood = 'happy') => {
    const out = prevAnimal(id, mood);
    return MINE.has(id) ? out.replace(OVERLAY, '') : out;
  };
})();
