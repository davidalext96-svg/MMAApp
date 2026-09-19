/* =========================================================
   engine.js — esqueleto animado, utilidades y almacenamiento
   Un "movimiento" es: {id, nom, cat, dur, frames, claves, error}
   frames: [ [pose, tiempo 0..1, poseOponente?], ... ]
   pose: {h,n,p,sl,el,fl,sr,er,fr,kl,tl,kr,tr} en un lienzo 240x300
   ========================================================= */

/* ---------- helpers de postura ---------- */
const P = (b, o) => Object.assign({}, b, o);
const SH = (b, dx, dy, keep) => {
  const o = {};
  for (const k in b) o[k] = (keep && keep.indexOf(k) > -1) ? b[k] : [b[k][0] + dx, b[k][1] + dy];
  return o;
};
/* espejo horizontal: sirve para dibujar al oponente mirando a la izquierda */
const MIR = (b, cx) => {
  cx = (cx == null ? 120 : cx);
  const o = {};
  for (const k in b) o[k] = [2 * cx - b[k][0], b[k][1]];
  return o;
};

/* ---------- postura base: guardia ortodoxa mirando a la derecha ---------- */
const G = {h:[120,62],n:[112,88],p:[104,168],sl:[116,100],el:[134,130],fl:[142,94],
           sr:[106,102],er:[86,134],fr:[124,104],kl:[132,212],tl:[154,262],kr:[74,214],tr:[48,262]};

/* posturas genéricas reutilizables por cualquier disciplina */
const BASE = {
  guard:G,
  stand:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[126,136],fl:[132,170],sr:[104,102],er:[92,138],fr:[86,172],kl:[124,212],tl:[136,262],kr:[94,212],tr:[82,262]},
  rodillas:{h:[118,96],n:[112,122],p:[108,196],sl:[114,134],el:[128,168],fl:[136,200],sr:[104,136],er:[92,170],fr:[84,202],kl:[132,246],tl:[168,258],kr:[92,248],tr:[56,260]},
  cuatro:{h:[176,140],n:[158,154],p:[104,182],sl:[166,156],el:[172,204],fl:[178,250],sr:[160,160],er:[166,208],fr:[172,252],kl:[92,222],tl:[62,252],kr:[86,226],tr:[56,254]},
  espalda:{h:[76,224],n:[96,232],p:[152,244],sl:[98,226],el:[80,208],fl:[110,202],sr:[100,230],er:[82,212],fr:[112,206],kl:[182,206],tl:[206,232],kr:[176,212],tr:[200,238]},
  tumbado:{h:[74,232],n:[96,238],p:[152,248],sl:[98,232],el:[124,226],fl:[150,222],sr:[100,236],er:[126,230],fr:[152,226],kl:[184,244],tl:[214,248],kr:[178,250],tr:[208,254]}
};

/* ---------- construcción del SVG ---------- */
const REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const L = pts => 'M' + pts.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join('L');
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
function parts(o) {
  return {
    torso:L([o.n,o.p]), hombros:L([o.sr,o.sl]),
    brazoL:L([o.sl,o.el,o.fl]), brazoR:L([o.sr,o.er,o.fr]),
    piernaL:L([o.p,o.kl,o.tl]), piernaR:L([o.p,o.kr,o.tr]),
    shortL:L([o.p,mid(o.p,o.kl)]), shortR:L([o.p,mid(o.p,o.kr)])
  };
}
function animD(key, poses, kt, dur) {
  const v = poses.map(p => parts(p)[key]).join(';');
  const sp = new Array(poses.length - 1).fill('.4 0 .2 1').join(';');
  return `<animate attributeName="d" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="${sp}" keyTimes="${kt}" values="${v}"/>`;
}
/* punto de la cara: cada postura puede definir 'fa' para mirar a cualquier lado */
const faz = p => p.fa || [p.h[0] + 17, p.h[1] + 5];
const orj = p => [p.h[0] - (faz(p)[0] - p.h[0]) * 0.55, p.h[1] - (faz(p)[1] - p.h[1]) * 0.55];
function animFn(attr, poses, fn, i, kt, dur) {
  const v = poses.map(p => fn(p)[i].toFixed(1)).join(';');
  const sp = new Array(poses.length - 1).fill('.4 0 .2 1').join(';');
  return `<animate attributeName="${attr}" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="${sp}" keyTimes="${kt}" values="${v}"/>`;
}
function animPt(attr, key, i, poses, kt, dur, off) {
  const v = poses.map(p => (p[key][i] + (off || 0)).toFixed(1)).join(';');
  const sp = new Array(poses.length - 1).fill('.4 0 .2 1').join(';');
  return `<animate attributeName="${attr}" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines="${sp}" keyTimes="${kt}" values="${v}"/>`;
}

/* dibuja un cuerpo completo; c = {piel, sombra, short, punio} */
function cuerpo(poses, st, kt, dur, live, c, w) {
  const d = parts(st);
  const A = k => live ? animD(k, poses, kt, dur) : '';
  const Apt = (a, k, i, off) => live ? animPt(a, k, i, poses, kt, dur, off) : '';
  const Af = (a, fn, i) => live ? animFn(a, poses, fn, i, kt, dur) : '';
  const s = w || 1;
  return `
    <path d="${d.piernaR}" stroke="${c.sombra}" stroke-width="${17*s}">${A('piernaR')}</path>
    <path d="${d.shortR}" stroke="${c.short2}" stroke-width="${23*s}">${A('shortR')}</path>
    <path d="${d.piernaL}" stroke="${c.piel}" stroke-width="${18*s}">${A('piernaL')}</path>
    <path d="${d.torso}" stroke="${c.piel}" stroke-width="${26*s}">${A('torso')}</path>
    <path d="${d.hombros}" stroke="${c.piel}" stroke-width="${21*s}">${A('hombros')}</path>
    <path d="${d.shortL}" stroke="${c.short}" stroke-width="${27*s}">${A('shortL')}</path>
    <path d="${d.brazoR}" stroke="${c.sombra}" stroke-width="${15*s}">${A('brazoR')}</path>
    <circle cx="${st.fr[0]}" cy="${st.fr[1]}" r="${11*s}" fill="${c.sombra}">${Apt('cx','fr',0)}${Apt('cy','fr',1)}</circle>
    <circle cx="${st.h[0]}" cy="${st.h[1]}" r="${20*s}" fill="${c.piel}">${Apt('cx','h',0)}${Apt('cy','h',1)}</circle>
    <circle cx="${faz(st)[0]}" cy="${faz(st)[1]}" r="${6*s}" fill="${c.piel}">${Af('cx',faz,0)}${Af('cy',faz,1)}</circle>
    <circle cx="${orj(st)[0]}" cy="${orj(st)[1]}" r="${3.6*s}" fill="${c.sombra}">${Af('cx',orj,0)}${Af('cy',orj,1)}</circle>
    <path d="${d.brazoL}" stroke="${c.piel}" stroke-width="${15*s}">${A('brazoL')}</path>
    <circle cx="${st.fl[0]}" cy="${st.fl[1]}" r="${11.5*s}" fill="${c.punio}">${Apt('cx','fl',0)}${Apt('cy','fl',1)}</circle>`;
}

const COL_TU = {piel:'var(--fig)', sombra:'var(--fig-deep)', short:'#EDF3F6', short2:'#C3CED4', punio:'var(--fig)'};
const COL_UKE = {piel:'var(--uke)', sombra:'var(--uke-deep)', short:'#E2E8EF', short2:'#AEB8C4', punio:'var(--uke)'};

/* figura(mov, opciones) -> cadena SVG */
function figura(mov, opt) {
  opt = opt || {};
  const frames = (mov.frames && mov.frames.length > 1) ? mov.frames : [[BASE.guard,0],[BASE.guard,1]];
  const live = !opt.static && !REDUCE;
  const key = Math.min(opt.keyFrame != null ? opt.keyFrame : (mov.key != null ? mov.key : 1), frames.length - 1);
  const kt = frames.map(f => f[1]).join(';');
  const dur = mov.dur || 2;
  const poses = frames.map(f => f[0]);
  const st = poses[key];

  let uke = '';
  if (frames[0][2]) {
    const up = frames.map(f => f[2] || f[0]);
    uke = cuerpo(up, up[key], kt, dur, live, COL_UKE, mov.ukeEscala || 1);
  }
  let rope = '';
  if (mov.ropeC && mov.ropeC.length === frames.length) {
    const rd = i => `M${poses[i].fl[0]},${poses[i].fl[1]} Q${mov.ropeC[i][0]},${mov.ropeC[i][1]} ${poses[i].fr[0]},${poses[i].fr[1]}`;
    rope = `<path d="${rd(key)}" fill="none" stroke="var(--gold)" stroke-width="3.5" stroke-linecap="round">` +
      (live ? `<animate attributeName="d" dur="${dur}s" repeatCount="indefinite" keyTimes="${kt}" values="${frames.map((f,i)=>rd(i)).join(';')}"/>` : '') + `</path>`;
  }
  let rot = '';
  if (live && mov.rot) {
    const pv = mov.rotPivot || [154,262];
    const v = mov.rot.map(r => r + ' ' + pv[0] + ' ' + pv[1]).join(';');
    const rk = mov.rot.length === frames.length ? kt : mov.rot.map((_, i) => (i / (mov.rot.length - 1)).toFixed(3)).join(';');
    rot = `<animateTransform attributeName="transform" type="rotate" dur="${dur}s" repeatCount="indefinite" keyTimes="${rk}" values="${v}"/>`;
  }
  return `<svg viewBox="0 0 240 300" role="img" aria-label="Ilustración: ${(mov.nom||'figura').replace(/&/g,'y')}" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="112" cy="268" rx="86" ry="10" fill="rgba(0,0,0,.32)"/>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">${rot}
    ${rope}${uke}${cuerpo(poses, st, kt, dur, live, COL_TU)}
  </g></svg>`;
}

/* arranca las animaciones SMIL recién insertadas en el DOM */
function arrancarAnim(sel) {
  try { document.querySelectorAll((sel || '') + ' svg').forEach(sv => { if (sv.setCurrentTime) sv.setCurrentTime(0); }); } catch (e) {}
}

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const hoyISO = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
const isoDe = d => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
const mmss = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
const esc = t => String(t == null ? '' : t).replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));

/* ---------- almacenamiento local (sin servidor: apto para GitHub Pages) ---------- */
const KEY = 'dojo.v1';
const DATOS_INI = { reg: [], perfil: {}, programa: { discs: ['boxeo'], dias: [1,3,5] }, sel: {}, disc: 'boxeo', updatedAt: 0 };
let S = JSON.parse(JSON.stringify(DATOS_INI));

function cargar() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const d = JSON.parse(raw); if (d && Array.isArray(d.reg)) S = Object.assign(S, d); }
    else {
      const viejo = localStorage.getItem('sombra.v1');           // datos de la versión solo-boxeo
      if (viejo) {
        const v = JSON.parse(viejo);
        if (v && Array.isArray(v.reg)) S.reg = v.reg.map(r => Object.assign({ disc: 'boxeo' }, r));
      }
    }
  } catch (e) {}
  if (!S.perfil) S.perfil = {};
  if (!S.programa) S.programa = { discs: ['boxeo'], dias: [1,3,5] };
  if (!S.sel) S.sel = {};
}
function guardar() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('No se pudo guardar en este navegador.'); }
}
function descargarRespaldo() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'dojo-respaldo-' + hoyISO() + '.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function importarRespaldo(file, cb) {
  const fr = new FileReader();
  fr.onload = () => {
    try {
      const d = JSON.parse(fr.result);
      if (!d || !Array.isArray(d.reg)) throw 0;
      const vistos = {}; S.reg.forEach(r => vistos[r.ts] = 1);
      d.reg.forEach(r => { if (!vistos[r.ts]) S.reg.push(r); });
      S.perfil = Object.assign({}, d.perfil || {}, S.perfil.nombre ? S.perfil : d.perfil || {});
      if (d.programa) S.programa = d.programa;
      guardar(); cb(true, d.reg.length);
    } catch (e) { cb(false); }
  };
  fr.onerror = () => cb(false);
  fr.readAsText(file);
}
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(t._t); t._t = setTimeout(() => t.hidden = true, 2600);
}

/* =========================================================
   Catálogo físico compartido por todas las disciplinas
   ========================================================= */
const DISC={};
const ORDEN=['boxeo','muaythai','bjj','judo','sambo'];

const EP={
 stand:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[126,136],fl:[132,170],sr:[104,102],er:[92,138],fr:[86,172],kl:[124,212],tl:[136,262],kr:[94,212],tr:[82,262]},
 cuerdaA:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[130,138],fl:[142,158],sr:[104,102],er:[88,140],fr:[78,160],kl:[120,212],tl:[126,262],kr:[102,212],tr:[96,262]},
 flexUp:{h:[188,168],n:[170,182],p:[112,204],sl:[180,180],el:[184,214],fl:[188,248],sr:[174,184],er:[178,218],fr:[182,250],kl:[80,216],tl:[46,246],kr:[76,220],tr:[42,250]},
 flexDown:{h:[192,202],n:[174,213],p:[114,222],sl:[184,212],el:[158,230],fl:[188,250],sr:[178,216],er:[152,234],fr:[182,252],kl:[82,228],tl:[46,250],kr:[78,232],tr:[42,252]},
 plancha:{h:[188,182],n:[170,194],p:[112,212],sl:[180,194],el:[186,240],fl:[150,242],sr:[174,198],er:[180,242],fr:[146,244],kl:[80,222],tl:[46,250],kr:[76,226],tr:[42,254]},
 sqUp:{h:[120,58],n:[114,84],p:[110,162],sl:[116,96],el:[146,100],fl:[176,102],sr:[106,98],er:[136,104],fr:[166,108],kl:[124,208],tl:[130,260],kr:[96,208],tr:[88,260]},
 sqDown:{h:[128,110],n:[120,134],p:[98,192],sl:[122,146],el:[152,138],fl:[182,130],sr:[112,148],er:[142,142],fr:[172,136],kl:[138,212],tl:[130,260],kr:[112,214],tr:[88,260]},
 absDown:{h:[172,234],n:[152,242],p:[96,250],sl:[150,236],el:[128,224],fl:[160,216],sr:[148,240],er:[126,228],fr:[158,220],kl:[70,208],tl:[44,252],kr:[64,212],tr:[38,254]},
 absUp:{h:[152,186],n:[136,204],p:[96,250],sl:[134,200],el:[114,190],fl:[146,176],sr:[132,204],er:[112,194],fr:[144,180],kl:[70,208],tl:[44,252],kr:[64,212],tr:[38,254]},
 lungeUp:{h:[118,60],n:[112,86],p:[108,166],sl:[114,98],el:[124,134],fl:[130,168],sr:[104,100],er:[94,136],fr:[88,170],kl:[122,210],tl:[130,262],kr:[96,210],tr:[86,262]},
 lungeDn:{h:[118,86],n:[112,112],p:[108,190],sl:[114,122],el:[124,158],fl:[130,192],sr:[104,124],er:[94,160],fr:[88,194],kl:[152,208],tl:[158,262],kr:[84,236],tr:[62,262]},
 rodA:{h:[118,60],n:[112,86],p:[110,166],sl:[116,98],el:[112,132],fl:[108,166],sr:[106,100],er:[126,128],fr:[140,108],kl:[136,154],tl:[142,190],kr:[96,214],tr:[84,262]},
 rodB:{h:[118,56],n:[112,82],p:[110,162],sl:[116,94],el:[136,122],fl:[150,104],sr:[106,96],er:[100,130],fr:[94,164],kl:[118,212],tl:[126,262],kr:[128,154],tr:[134,190]},
 bpCrouch:{h:[160,140],n:[150,162],p:[132,200],sl:[156,168],el:[174,208],fl:[190,250],sr:[146,170],er:[164,212],fr:[184,252],kl:[150,220],tl:[140,258],kr:[126,222],tr:[108,258]},
 bpJump:{h:[120,38],n:[114,64],p:[110,144],sl:[116,82],el:[118,52],fl:[122,22],sr:[106,84],er:[104,54],fr:[100,24],kl:[124,186],tl:[134,232],kr:[96,186],tr:[84,232]},
 estUp:{h:[118,58],n:[112,84],p:[108,164],sl:[114,96],el:[116,62],fl:[120,28],sr:[104,98],er:[102,64],fr:[98,30],kl:[120,208],tl:[124,262],kr:[98,208],tr:[92,262]},
 estFold:{h:[146,186],n:[126,178],p:[104,178],sl:[130,184],el:[140,216],fl:[146,250],sr:[120,186],er:[130,218],fr:[136,252],kl:[112,212],tl:[118,262],kr:[94,212],tr:[88,262]},
 movA:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[116,140],fl:[118,180],sr:[104,102],er:[102,142],fr:[100,182],kl:[124,212],tl:[136,262],kr:[94,212],tr:[82,262]},
 movB:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[152,104],fl:[188,106],sr:[104,102],er:[140,110],fr:[176,114],kl:[124,212],tl:[136,262],kr:[94,212],tr:[82,262]},
 movC:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[118,62],fl:[122,24],sr:[104,102],er:[104,64],fr:[102,26],kl:[124,212],tl:[136,262],kr:[94,212],tr:[82,262]},
 movD:{h:[118,62],n:[112,88],p:[108,168],sl:[114,100],el:[78,108],fl:[44,114],sr:[104,102],er:[70,112],fr:[38,120],kl:[124,212],tl:[136,262],kr:[94,212],tr:[82,262]}
};
EP.cuerdaB=SH(EP.cuerdaA,0,-9);
EP.cuerdaC=P(SH(EP.cuerdaA,0,-20),{kl:[124,190],kr:[106,190]});
EP.planchaB=P(EP.plancha,{p:[112,206],h:[188,179],n:[170,191]});

const FISICO=[
 {id:'cuerda',nom:'Salto de cuerda',niv:0,cat:'Acondicionamiento',dur:1.1,key:2,
  frames:[[EP.cuerdaA,0],[EP.cuerdaB,.25],[EP.cuerdaC,.5],[EP.cuerdaB,.75],[EP.cuerdaA,1]],
  ropeC:[[110,-130],[330,150],[110,390],[-110,150],[110,-130]],
  claves:['Salta con la punta de los pies, apenas dos centímetros del suelo.','Codos pegados al cuerpo: la cuerda gira con las muñecas, no con los brazos.','Torso erguido y mirada al frente, respiración por la nariz.'],
  error:'Saltar muy alto y con las rodillas rígidas: te agota en un minuto y castiga las articulaciones.'},

 {id:'movilidad',nom:'Círculos de brazos',niv:0,cat:'Calentamiento',dur:3.2,key:2,
  frames:[[EP.movA,0],[EP.movB,.25],[EP.movC,.5],[EP.movD,.75],[EP.movA,1]],
  claves:['Círculos amplios y lentos: 20 hacia adelante y 20 hacia atrás.','Hombros lejos de las orejas y cuello relajado.','Inhala al subir los brazos, exhala al bajarlos.'],
  error:'Hacer círculos rápidos y cortos sin llegar nunca al rango completo.'},

 {id:'lagartija',nom:'Flexiones',niv:0,cat:'Acondicionamiento',dur:2.4,key:1,
  frames:[[EP.flexUp,0],[EP.flexDown,.38],[EP.flexDown,.5],[EP.flexUp,.88],[EP.flexUp,1]],
  claves:['Manos bajo los hombros y cuerpo en línea recta de la cabeza a los talones.','Baja hasta que el pecho quede a un puño del suelo.','Codos a 45°, nunca abiertos en cruz.'],
  error:'Dejar caer la cadera o bajar solo la cabeza en lugar de todo el cuerpo.'},

 {id:'plancha',nom:'Plancha',niv:0,cat:'Acondicionamiento',dur:3,key:1,
  frames:[[EP.plancha,0],[EP.planchaB,.5],[EP.plancha,1]],
  claves:['Codos justo bajo los hombros y antebrazos apoyados.','Aprieta glúteos y abdomen: la cadera ni sube ni se hunde.','Respira de forma continua, no aguantes el aire.'],
  error:'Subir la cadera para descansar: el abdomen deja de trabajar.'},

 {id:'sentadilla',nom:'Sentadillas',niv:0,cat:'Acondicionamiento',dur:2.6,key:1,
  frames:[[EP.sqUp,0],[EP.sqDown,.4],[EP.sqDown,.52],[EP.sqUp,.92],[EP.sqUp,1]],
  claves:['Pies al ancho de los hombros, puntas ligeramente hacia afuera.','Empuja la cadera atrás y baja hasta que el muslo quede paralelo al suelo.','Rodillas en línea con los pies y talones siempre apoyados.'],
  error:'Juntar las rodillas hacia adentro al subir.'},

 {id:'abdominal',nom:'Abdominales',niv:0,cat:'Acondicionamiento',dur:2.2,key:1,
  frames:[[EP.absDown,0],[EP.absUp,.4],[EP.absUp,.52],[EP.absDown,.92],[EP.absDown,1]],
  claves:['Despega los omóplatos del suelo; las manos solo acompañan la cabeza.','Exhala al subir y baja controlado, sin dejarte caer.','Rodillas flexionadas y pies apoyados en el suelo.'],
  error:'Tirar del cuello con las manos y tomar impulso con los brazos.'},

 {id:'zancada',nom:'Zancadas',niv:0,cat:'Acondicionamiento',dur:2.8,key:1,
  frames:[[EP.lungeUp,0],[EP.lungeDn,.4],[EP.lungeDn,.52],[EP.lungeUp,.92],[EP.lungeUp,1]],
  claves:['Paso largo y baja en vertical: la rodilla trasera casi roza el suelo.','La rodilla delantera no sobrepasa la punta del pie.','Torso erguido; empuja con el talón delantero para volver arriba.'],
  error:'Dar un paso corto y cargar todo el peso sobre la rodilla delantera.'},

 {id:'rodillas',nom:'Rodillas altas',niv:0,cat:'Acondicionamiento',dur:.9,key:1,
  frames:[[EP.rodA,0],[EP.rodB,.5],[EP.rodA,1]],
  claves:['Sube la rodilla por encima de la altura de la cadera.','Apoya en la punta del pie: contacto corto y rápido.','Brazos acompañando el movimiento, como en carrera.'],
  error:'Inclinar el torso hacia atrás para poder subir más la rodilla.'},

 {id:'burpee',nom:'Burpees',niv:0,cat:'Acondicionamiento',dur:3.2,key:2,
  frames:[[EP.stand,0],[EP.bpCrouch,.16],[EP.flexUp,.32],[EP.flexDown,.42],[EP.flexUp,.52],[EP.bpCrouch,.64],[EP.bpJump,.76],[EP.stand,.9],[EP.stand,1]],
  claves:['Manos al suelo, salta los pies atrás y queda en plancha recta.','Una flexión abajo, regresa los pies junto a las manos y salta con los brazos arriba.','Ritmo constante: mejor lento y limpio que rápido y roto.'],
  error:'Dejar caer la cadera en la plancha o aterrizar con las rodillas rígidas.'},

 {id:'estiramiento',nom:'Estiramiento final',niv:0,cat:'Enfriamiento',dur:4.5,key:2,
  frames:[[EP.estUp,0],[EP.estUp,.14],[EP.estFold,.44],[EP.estFold,.6],[EP.estUp,.92],[EP.estUp,1]],
  claves:['Mantén cada posición 30 s, sin rebotes.','Respira lento: el músculo cede al exhalar.','Recorre hombros, pectoral, cadera y gemelos.'],
  error:'Estirar con rebotes o forzar hasta el dolor.'}
];
const MAPA=[['cuerda','cuerda'],['plancha','plancha'],['flexion','lagartija'],['sentadilla','sentadilla'],
            ['abdominal','abdominal'],['zancada','zancada'],['rodillas altas','rodillas'],['burpee','burpee'],
            ['sprint','rodillas'],['salto','sentadilla'],['estiramiento','estiramiento'],['movilidad','movilidad'],
            ['respiracion','estiramiento']];
function ejsDe(t){const x=(t||'').toLowerCase();const r=[];
  MAPA.forEach(m=>{if(x.indexOf(m[0])>-1&&r.indexOf(m[1])<0)r.push(m[1]);});
  return r.length?r.slice(0,3):['plancha'];}
