/* =========================================================
   app.js — navegación, vistas, cronómetro y progreso
   ========================================================= */

/* ---------- helpers de datos ---------- */
const D = id => DISC[id] || null;
const movById = (d, id) => d.mov.find(m => m.id === id);
const nivelDe = (d, id) => d.niveles.find(n => n.id === id);
const hechas = (dc, nv) => [...new Set(S.reg.filter(r => r.disc === dc && r.nivel === nv && r.ses).map(r => r.ses))];
const desbloqueado = (dc, nv) => nv === 1 || hechas(dc, nv - 1).length >= Math.ceil(D(dc).niveles[nv - 2].ses.length * 0.7);
function proxima(dc, nv) {
  const h = hechas(dc, nv), n = nivelDe(D(dc), nv);
  for (let i = 1; i <= n.ses.length; i++) if (h.indexOf(i) < 0) return i;
  return n.ses.length;
}
function rondasTot(d, niv, s) { return d.bloques(niv, s).reduce((a, b) => a + (b.tipo === 'rondas' ? b.rondas : 0), 0); }
function duracion(d, niv, s) {
  let seg = 0;
  d.bloques(niv, s).forEach(b => { seg += b.tipo === 'libre' ? b.min * 60 : b.rondas * niv.work + (b.rondas - 1) * niv.rest; });
  return Math.round(seg / 60);
}
function oscuro(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function racha() {
  const dias = [...new Set(S.reg.map(r => r.fecha))].sort().reverse();
  if (!dias.length) return 0;
  const d0 = new Date(hoyISO() + 'T00:00:00');
  const dif = a => Math.round((d0 - new Date(a + 'T00:00:00')) / 864e5);
  if (dif(dias[0]) > 1) return 0;
  let c = 1, prev = dias[0];
  for (let i = 1; i < dias.length; i++) {
    const gap = Math.round((new Date(prev + 'T00:00:00') - new Date(dias[i] + 'T00:00:00')) / 864e5);
    if (gap === 1) { c++; prev = dias[i]; } else break;
  }
  return c;
}
const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
function discDelDia(fecha) {
  const pr = S.programa, dow = new Date(fecha + 'T00:00:00').getDay();
  if (!pr.discs.length || pr.dias.indexOf(dow) < 0) return null;
  const orden = pr.dias.slice().sort((a, b) => a - b);
  return pr.discs[orden.indexOf(dow) % pr.discs.length];
}

/* ---------- estado de navegación ---------- */
let vista = 'inicio', subTab = 'sesiones', filtroTec = 0;

function tema(dc) {
  document.body.dataset.disc = dc || 'hub';
  const m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = (dc && D(dc)) ? D(dc).tema.wall : '#0E1116';
}
function pintar() {
  $('#streak').innerHTML = '<b>' + racha() + '</b> días seguidos';
  document.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === vista)));
  const dAct = (vista === 'entrenar' && S.disc) ? D(S.disc) : null;
  $('#back').hidden = !dAct;
  $('#brand').innerHTML = dAct ? esc(dAct.nom) : 'Do<span>jo</span>';
  tema(dAct ? S.disc : null);
  if (vista === 'inicio') vistaInicio();
  else if (vista === 'entrenar') vistaEntrenar();
  else if (vista === 'progreso') vistaProgreso();
  else vistaPerfil();
  arrancarAnim('#view');
  window.scrollTo(0, 0);
}

/* ---------- INICIO ---------- */
function vistaInicio() {
  const nom = S.perfil.nombre ? esc(S.perfil.nombre.split(' ')[0]) : null;
  const dc0 = discDelDia(hoyISO()), dc = (dc0 && D(dc0)) ? dc0 : null;
  let html = `<h3 class="h-sec">${nom ? 'Hola, ' + nom : 'Tu dojo'}</h3>`;

  if (dc) {
    const d = D(dc), nv = S.sel[dc] || 1, niv = nivelDe(d, nv), i = proxima(dc, nv), s = niv.ses[i - 1];
    const m = movById(d, s.tec[0]) || movById(d, d.portada);
    html += `<section class="hero" style="--fig:${d.tema.fig};--fig-deep:${oscuro(d.tema.fig,.72)};background:linear-gradient(180deg,${d.tema.wall},${d.tema.ink})">
      <div class="hero-stage">${figura(m)}<div class="hero-floor" style="--floor:${d.tema.ink}"></div></div>
      <div class="hero-txt">
        <p class="eyebrow">Hoy toca ${esc(d.nom)} · nivel ${niv.id} · sesión ${i} de ${niv.ses.length}</p>
        <h2>${esc(s.foco)}</h2>
        <div class="hero-meta"><span class="pill hot">${duracion(d,niv,s)} min</span>
        <span class="pill">${rondasTot(d,niv,s)} rondas</span></div>
      </div></section>
      <button class="btn" style="background:${d.tema.fig};color:#12090A" data-go="${dc}:${nv}:${i}">Empezar sesión de ${esc(d.nom)}</button>`;
  } else {
    html += `<div class="card"><p class="eyebrow">Programa de la semana</p>
      <p style="font-size:15.5px;margin-top:6px">Hoy no hay sesión programada. Descansa, o entra a cualquier disciplina y entrena igual.</p>
      <div class="btn-row" style="margin-top:12px"><button class="btn ghost sm" data-ir="perfil">Ajustar mi programa</button></div></div>`;
  }

  html += `<h3 class="h-sec">Disciplinas</h3><div class="discs">`;
  ORDEN.forEach(id => {
    const d = D(id), m = movById(d, d.portada);
    const hechasT = S.reg.filter(r => r.disc === id).length;
    html += `<button class="disc${S.disc===id?' on':''}" data-disc="${id}" style="--d-wall:${d.tema.wall};--d-ink:${d.tema.ink};--d-fig:${d.tema.fig};--fig:${d.tema.fig};--fig-deep:${oscuro(d.tema.fig,.72)};--uke:#C9D2DC;--uke-deep:#7E8A98">
      <span class="dot"></span>${figura(m,{static:true})}<b>${esc(d.nom)}</b><s>${esc(d.sub)}</s>
      <s style="margin-top:4px;color:var(--d-fig)">${hechasT} ${hechasT===1?'sesión':'sesiones'}</s></button>`;
  });
  html += `</div>
  <h3 class="h-sec">Atajos</h3>
  <div class="btn-row">
    <button class="btn ghost sm" data-crono="1">Cronómetro libre</button>
    <button class="btn ghost sm" data-ir="progreso">Ver progreso</button>
    <button class="btn ghost sm" data-ir="perfil">Perfil y respaldos</button>
  </div>
  <p class="note">Tus datos se guardan solo en este navegador. Descarga un respaldo de vez en cuando desde Perfil.</p>`;
  $('#view').innerHTML = html;
}

/* ---------- ENTRENAR ---------- */
function vistaEntrenar() {
  if (!S.disc || !D(S.disc)) {
    let html = '<h3 class="h-sec">Elige disciplina</h3><div class="discs">';
    ORDEN.forEach(id => { const d = D(id), m = movById(d, d.portada);
      html += `<button class="disc" data-disc="${id}" style="--d-wall:${d.tema.wall};--d-ink:${d.tema.ink};--d-fig:${d.tema.fig};--fig:${d.tema.fig};--fig-deep:${oscuro(d.tema.fig,.72)}">${figura(m,{static:true})}<b>${esc(d.nom)}</b><s>${esc(d.sub)}</s></button>`; });
    $('#view').innerHTML = html + '</div>';
    return;
  }
  const d = D(S.disc), nv = S.sel[S.disc] || 1, niv = nivelDe(d, nv);
  let html = `<div class="chips">
    <button class="chip" aria-pressed="${subTab==='sesiones'}" data-sub="sesiones">Sesiones</button>
    <button class="chip" aria-pressed="${subTab==='tecnicas'}" data-sub="tecnicas">Técnicas</button></div>`;

  if (subTab === 'tecnicas') {
    const chips = [[0,'Todas'],[1,'Nivel 1'],[2,'Nivel 2'],[3,'Nivel 3'],[4,'Nivel 4'],[5,'Físico']];
    html += '<div class="levels" style="grid-template-columns:repeat(3,1fr)">';
    chips.forEach(c => html += `<button class="lvl" aria-pressed="${filtroTec===c[0]}" data-ft="${c[0]}"><b>${c[1]}</b></button>`);
    html += '</div><div class="tgrid">';
    d.mov.filter(m => !filtroTec || (filtroTec === 5 ? m.niv === 0 : m.niv === filtroTec)).forEach(m => {
      html += `<button class="tcard" data-tec="${m.id}">${figura(m,{static:true})}<b>${esc(m.nom)}</b>
        <s>${esc(m.cat || ('Nivel ' + m.niv))}${m.pareja ? ' · con compañero' : ''}</s></button>`;
    });
    html += '</div><p class="note">Toca cualquier movimiento para ver la animación, las claves y practicarlo por rondas.</p>';
    $('#view').innerHTML = html;
    return;
  }

  const i = proxima(S.disc, nv), s = niv.ses[i - 1], m = movById(d, s.tec[0]);
  const hs = hechas(S.disc, nv);
  html += `<section class="hero">
    <div class="hero-stage">${figura(m)}<div class="hero-floor"></div></div>
    <div class="hero-txt">
      <p class="eyebrow">Nivel ${niv.id} · ${esc(niv.nom)} · sesión ${i} de ${niv.ses.length}</p>
      <h2>${esc(s.foco)}</h2>
      <div class="hero-meta"><span class="pill hot">${duracion(d,niv,s)} min</span>
      <span class="pill">${rondasTot(d,niv,s)} rondas de ${Math.round(niv.work/60)} min</span>
      <span class="pill">Descanso ${niv.rest}s</span></div>
    </div></section>
  <button class="btn" data-go="${S.disc}:${nv}:${i}">Empezar sesión ${i}</button>
  <p class="note">${esc(d.intro)}</p>
  <h3 class="h-sec">Tu ruta</h3><div class="levels">`;
  d.niveles.forEach(x => {
    const ok = desbloqueado(S.disc, x.id);
    html += `<button class="lvl${ok?'':' locked'}" aria-pressed="${x.id===nv}" data-lvl="${x.id}"><b>${esc(x.nom)}</b><s>${hechas(S.disc,x.id).length}/${x.ses.length}${ok?'':' · cerrado'}</s></button>`;
  });
  html += `</div><p class="eyebrow" style="margin-bottom:8px">${esc(niv.lema)}</p><div class="slist">`;
  niv.ses.forEach((x, k) => {
    const done = hs.indexOf(k + 1) > -1;
    html += `<button class="srow${done?' done':''}${(k+1)===i?' next':''}" data-go="${S.disc}:${nv}:${k+1}">
      <span class="n">${String(k+1).padStart(2,'0')}</span>
      <span class="t"><b>${esc(x.foco)}</b><s>${x.tec.map(t=>esc((movById(d,t)||{nom:t}).nom)).join(' · ')}</s></span>
      <span class="mark">${done?'✓':''}</span></button>`;
  });
  html += '</div>';
  if (!desbloqueado(S.disc, nv)) html += '<p class="note">Este nivel se abre al completar el 70 % del anterior, pero puedes entrenarlo igual si ya dominas lo previo.</p>';
  $('#view').innerHTML = html;
}

/* ---------- PROGRESO ---------- */
const LOGROS = [
  {id:'inicio', nom:'Primer día', txt:'Registra tu primera sesión', ok:()=>S.reg.length>=1},
  {id:'diez', nom:'Diez sesiones', txt:'Constancia inicial', ok:()=>S.reg.length>=10},
  {id:'cincuenta', nom:'Cincuenta sesiones', txt:'Esto ya es un hábito', ok:()=>S.reg.length>=50},
  {id:'cien', nom:'Cien sesiones', txt:'Oficio', ok:()=>S.reg.length>=100},
  {id:'semana', nom:'Siete días seguidos', txt:'Una semana sin fallar', ok:()=>racha()>=7},
  {id:'mes', nom:'Treinta días seguidos', txt:'Un mes de racha', ok:()=>racha()>=30},
  {id:'horas', nom:'Diez horas', txt:'600 minutos de trabajo', ok:()=>S.reg.reduce((a,r)=>a+(r.min||0),0)>=600},
  {id:'poli', nom:'Polivalente', txt:'Entrena tres disciplinas distintas', ok:()=>[...new Set(S.reg.map(r=>r.disc))].length>=3},
  {id:'nivel2', nom:'Segundo nivel', txt:'Desbloquea el nivel 2 en alguna disciplina', ok:()=>ORDEN.some(id=>desbloqueado(id,2))},
  {id:'completo', nom:'Ruta completa', txt:'Termina los cuatro niveles de una disciplina', ok:()=>ORDEN.some(id=>D(id).niveles.every(n=>hechas(id,n.id).length===n.ses.length))}
];

function vistaProgreso() {
  const total = S.reg.length, min = S.reg.reduce((a, r) => a + (r.min || 0), 0);
  const dias = [];
  for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); dias.push(isoDe(d)); }
  const porDia = dias.map(f => S.reg.filter(r => r.fecha === f).reduce((a, r) => a + (r.min || 0), 0));
  const max = Math.max(30, ...porDia);
  let html = `<h3 class="h-sec">Tu progreso</h3>
  <div class="stats">
    <div class="stat"><b>${total}</b><s>sesiones</s></div>
    <div class="stat"><b>${Math.round(min/60*10)/10}</b><s>horas</s></div>
    <div class="stat"><b>${racha()}</b><s>días seguidos</s></div>
  </div>
  <p class="eyebrow">Minutos de los últimos 14 días</p>
  <div class="bars">${porDia.map(v=>`<div class="${v?'has':''}" style="height:${Math.max(3,v/max*100)}%"></div>`).join('')}</div>
  <div class="bars-x">${dias.map((f,i)=>`<span>${i%2===0?f.slice(8):''}</span>`).join('')}</div>`;

  html += '<h3 class="h-sec">Por disciplina</h3>';
  ORDEN.forEach(id => {
    const d = D(id), n = S.reg.filter(r => r.disc === id).length;
    const tot = d.niveles.reduce((a, x) => a + x.ses.length, 0);
    const hh = d.niveles.reduce((a, x) => a + hechas(id, x.id).length, 0);
    html += `<div style="margin-bottom:12px">
      <div class="mrow"><span>${esc(d.nom)}</span><s>${hh}/${tot} sesiones del plan · ${n} registradas</s></div>
      <div class="meter"><i style="width:${Math.round(hh/tot*100)}%;background:${d.tema.fig}"></i></div></div>`;
  });

  const sem = [];
  for (let i = 55; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); sem.push(isoDe(d)); }
  html += `<h3 class="h-sec">Últimas 8 semanas</h3><div class="heat">` +
    sem.map(f => { const n = S.reg.filter(r => r.fecha === f).length; return `<i data-n="${Math.min(3,n)}" title="${f}"></i>`; }).join('') + '</div>';

  html += '<h3 class="h-sec">Logros</h3><div class="medals">' +
    LOGROS.map(l => `<div class="medal${l.ok()?' on':''}"><b>${l.nom}</b><s>${l.txt}</s></div>`).join('') + '</div>';

  html += '<h3 class="h-sec">Historial</h3>';
  if (!S.reg.length) html += '<div class="empty">Todavía no has registrado nada. Termina tu primera sesión y aparecerá aquí.</div>';
  else {
    html += '<ul class="log">' + S.reg.slice().sort((a,b)=>b.ts-a.ts).slice(0,60).map(r => `<li>
      <span class="d">${r.fecha.slice(8)}/${r.fecha.slice(5,7)}</span>
      <span><b style="font-weight:600">${esc(r.titulo)}</b><br>
      <span style="font-size:12.5px;color:var(--chalk-soft)">${esc((D(r.disc)||{nom:''}).nom)} · ${r.min} min · esfuerzo ${r.rpe||'–'}/10${r.nota?' · '+esc(r.nota):''}</span></span>
      <button class="del" data-del="${r.ts}" aria-label="Borrar registro">✕</button></li>`).join('') + '</ul>';
  }
  $('#view').innerHTML = html;
}

/* ---------- PERFIL ---------- */
function vistaPerfil() {
  const p = S.perfil, pr = S.programa;
  let html = `<h3 class="h-sec">Perfil</h3>
  <div class="card">
    <label class="fld" for="pf-nombre">Nombre</label><input id="pf-nombre" type="text" value="${esc(p.nombre||'')}" placeholder="Tu nombre">
    <div class="grid2">
      <div><label class="fld" for="pf-edad">Edad</label><input id="pf-edad" type="number" inputmode="numeric" value="${esc(p.edad||'')}"></div>
      <div><label class="fld" for="pf-guardia">Guardia</label><select id="pf-guardia">
        <option value=""></option><option${p.guardia==='Ortodoxa'?' selected':''}>Ortodoxa</option><option${p.guardia==='Zurda'?' selected':''}>Zurda</option><option${p.guardia==='Ambas'?' selected':''}>Ambas</option></select></div>
      <div><label class="fld" for="pf-peso">Peso (kg)</label><input id="pf-peso" type="number" inputmode="decimal" value="${esc(p.peso||'')}"></div>
      <div><label class="fld" for="pf-altura">Altura (cm)</label><input id="pf-altura" type="number" inputmode="numeric" value="${esc(p.altura||'')}"></div>
      <div><label class="fld" for="pf-env">Envergadura (cm)</label><input id="pf-env" type="number" inputmode="numeric" value="${esc(p.env||'')}"></div>
      <div><label class="fld" for="pf-exp">Experiencia</label><select id="pf-exp">
        <option value=""></option><option${p.exp==='Empiezo ahora'?' selected':''}>Empiezo ahora</option><option${p.exp==='Menos de 1 año'?' selected':''}>Menos de 1 año</option><option${p.exp==='1 a 3 años'?' selected':''}>1 a 3 años</option><option${p.exp==='Más de 3 años'?' selected':''}>Más de 3 años</option></select></div>
    </div>
    <label class="fld" for="pf-obj">Objetivo</label><input id="pf-obj" type="text" value="${esc(p.obj||'')}" placeholder="Ej.: entrenar 4 días por semana sin fallar">
    <div class="btn-row" style="margin-top:14px"><button class="btn sm" data-perfil="1">Guardar perfil</button></div>
  </div>

  <h3 class="h-sec">Mi programa</h3>
  <div class="card">
    <p class="eyebrow">Disciplinas que quieres entrenar</p>
    <div class="chips" style="margin-top:8px">` +
      ORDEN.map(id => `<button class="chip" aria-pressed="${pr.discs.indexOf(id)>-1}" data-pdisc="${id}">${esc(D(id).nom)}</button>`).join('') +
    `</div>
    <p class="eyebrow">Días de entrenamiento</p>
    <div class="chips" style="margin-top:8px">` +
      DIAS.map((n,i) => `<button class="chip" aria-pressed="${pr.dias.indexOf(i)>-1}" data-pdia="${i}">${n}</button>`).join('') +
    `</div>
    <p class="eyebrow" style="margin-top:6px">Así queda tu semana</p>
    <ul class="log" style="margin-top:4px">` +
      pr.dias.slice().sort((a,b)=>a-b).map(i => {
        const dc = pr.discs[pr.dias.slice().sort((a,b)=>a-b).indexOf(i) % Math.max(1,pr.discs.length)];
        return `<li><span class="d">${DIAS[i]}</span><span>${dc?esc(D(dc).nom):'—'}</span></li>`;
      }).join('') +
    `</ul>
    ${pr.discs.length>1?'<p class="note">Con varias disciplinas se reparten los días en rotación. Si entrenas dos el mismo día, entra a la segunda desde Disciplinas.</p>':''}
  </div>

  <h3 class="h-sec">Respaldos</h3>
  <div class="card">
    <p style="font-size:15px">Todo se guarda en este navegador. Si cambias de teléfono o borras los datos del sitio, se pierde: descarga un respaldo de vez en cuando.</p>
    <div class="btn-row" style="margin-top:12px">
      <button class="btn sm" data-exp="1">Descargar respaldo</button>
      <button class="btn ghost sm" data-imp="1">Importar respaldo</button>
    </div>
    <input id="fileImp" type="file" accept="application/json" hidden>
    <p class="note">${S.reg.length} sesiones guardadas · último cambio ${S.updatedAt?new Date(S.updatedAt).toLocaleDateString('es'):'—'}</p>
  </div>

  <h3 class="h-sec">Ajustes</h3>
  <div class="card">
    <div class="btn-row">
      <button class="btn ghost sm" data-crono="1">Cronómetro libre</button>
      <button class="btn ghost sm" data-borrar="1">Borrar todos mis datos</button>
    </div>
    <p class="note">Dojo v1 · funciona sin conexión una vez cargado.</p>
  </div>`;
  $('#view').innerHTML = html;
}

/* ---------- ficha de técnica ---------- */
function abrirTec(dc, id) {
  const d = D(dc); if (!d) return;
  const m = movById(d, id); if (!m) return;
  $('#sheetIn').innerHTML = `
  <div class="sheet-head"><h3>${esc(m.nom)}</h3><button class="x" data-close="1" aria-label="Cerrar">✕</button></div>
  <p class="eyebrow" style="margin-bottom:10px">${esc(d.nom)} · ${esc(m.cat||('Nivel '+m.niv))}${m.pareja?' · necesita compañero':''}</p>
  <div class="stage">${figura(m)}</div>
  <ul class="keys">${m.claves.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
  <p class="warn"><b>Error común.</b> ${esc(m.error)}</p>
  <button class="btn" data-prac="${dc}:${m.id}">Practicar 3 rondas</button>`;
  $('#sheet').hidden = false; arrancarAnim('#sheetIn');
}
function cerrarSheet() { $('#sheet').hidden = true; $('#sheetIn').innerHTML = ''; }

/* ---------- cronómetro de sesión ---------- */
let R = null, AC = null, wake = null;
function beep(f, dur, t) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = t || 'sine'; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
    const n = AC.currentTime;
    g.gain.setValueAtTime(.0015, n); g.gain.exponentialRampToValueAtTime(.28, n + .012);
    g.gain.exponentialRampToValueAtTime(.0015, n + dur); o.start(n); o.stop(n + dur + .03);
  } catch (e) {}
}
const campana = () => { beep(940, .34, 'triangle'); setTimeout(() => beep(700, .5, 'triangle'), 130); };
async function lock(on) {
  try {
    if (on && 'wakeLock' in navigator && !wake) wake = await navigator.wakeLock.request('screen');
    if (!on && wake) { wake.release(); wake = null; }
  } catch (e) {}
}
const bloqueDur = b => b.tipo === 'libre' ? b.min * 60 : R.work;
const faseDur = () => R.fase === 'rest' ? R.rest : bloqueDur(R.bloques[R.bi]);

function abrirSesion(dc, nv, sesN) {
  const d = D(dc), niv = nivelDe(d, nv), s = niv.ses[sesN - 1];
  S.disc = dc; S.sel[dc] = nv; guardar(); tema(dc);
  const bl = d.bloques(niv, s);
  R = { disc: dc, titulo: d.nom + ' · N' + nv + ' S' + sesN + ' · ' + s.foco, nivel: nv, ses: sesN,
        work: niv.work, rest: niv.rest, bloques: bl, bi: 0, fase: 'work', ronda: 1,
        left: bloqueDur.call(null, bl[0]) || (bl[0].tipo === 'libre' ? bl[0].min * 60 : niv.work),
        acum: 0, running: false, tecShow: (bl[0].tec || [])[0] };
  R.left = bl[0].tipo === 'libre' ? bl[0].min * 60 : niv.work;
  $('#runner').hidden = false; document.body.style.overflow = 'hidden'; pintarRunner();
}
function abrirPractica(dc, id) {
  const d = D(dc), m = movById(d, id), niv = d.niveles[Math.max(0, (m.niv || 1) - 1)];
  S.disc = dc; tema(dc);
  R = { disc: dc, titulo: 'Práctica · ' + m.nom, nivel: m.niv || 1, ses: null, work: niv.work, rest: niv.rest,
        bloques: [{ nom: 'Práctica de ' + m.nom, txt: m.claves[0], tipo: 'rondas', rondas: 3, tec: [m.id] }],
        bi: 0, fase: 'work', ronda: 1, left: niv.work, acum: 0, running: false, tecShow: m.id };
  cerrarSheet(); $('#runner').hidden = false; document.body.style.overflow = 'hidden'; pintarRunner();
}
function abrirCronoConfig() {
  $('#sheetIn').innerHTML = `<div class="sheet-head"><h3>Cronómetro libre</h3><button class="x" data-close="1" aria-label="Cerrar">✕</button></div>
  <div class="grid2">
    <div><label class="fld" for="cr-r">Rondas</label><input id="cr-r" type="number" inputmode="numeric" value="5"></div>
    <div><label class="fld" for="cr-w">Trabajo (min)</label><input id="cr-w" type="number" inputmode="decimal" step="0.5" value="3"></div>
    <div><label class="fld" for="cr-d">Descanso (s)</label><input id="cr-d" type="number" inputmode="numeric" value="60"></div>
  </div>
  <div class="btn-row" style="margin-top:16px"><button class="btn" data-cronogo="1">Empezar</button></div>`;
  $('#sheet').hidden = false;
}
function abrirCrono() {
  const r = Math.max(1, Math.min(20, +$('#cr-r').value || 5));
  const w = Math.round(Math.max(.5, +$('#cr-w').value || 3) * 60);
  const d = Math.max(0, +$('#cr-d').value || 0);
  R = { disc: S.disc || 'boxeo', titulo: 'Entrenamiento libre', nivel: 1, ses: null, work: w, rest: d,
        bloques: [{ nom: 'Rondas libres', txt: 'Trabaja lo que quieras: ' + r + ' rondas de ' + mmss(w) + ' con ' + d + ' s de descanso.', tipo: 'rondas', rondas: r, tec: [] }],
        bi: 0, fase: 'work', ronda: 1, left: w, acum: 0, running: false, tecShow: null };
  cerrarSheet(); $('#runner').hidden = false; document.body.style.overflow = 'hidden'; pintarRunner();
}
function play() { if (R.running) return; R.running = true; R.endAt = Date.now() + R.left * 1000; R.tid = setInterval(tick, 200); beep(880, .09); lock(true); pintarRunner(); }
function pausa() { if (!R.running) return; R.running = false; clearInterval(R.tid); R.left = Math.max(0, Math.round((R.endAt - Date.now()) / 1000)); lock(false); pintarRunner(); }
function tick() {
  const l = Math.max(0, Math.round((R.endAt - Date.now()) / 1000));
  if (l !== R.left) { if (R.fase === 'work') R.acum++; R.left = l; updDial(); if (l <= 3 && l > 0) beep(680, .07); }
  if (l <= 0) siguienteFase();
}
function siguienteFase() {
  const b = R.bloques[R.bi];
  if (R.fase === 'work') {
    if (b.tipo === 'rondas' && R.ronda < b.rondas) { R.fase = 'rest'; R.left = R.rest; campana(); }
    else return siguienteBloque();
  } else { R.ronda++; R.fase = 'work'; R.left = bloqueDur(b); campana(); }
  if (R.left <= 0) return siguienteFase();
  R.endAt = Date.now() + R.left * 1000; pintarRunner();
}
function siguienteBloque() {
  if (R.bi + 1 >= R.bloques.length) return terminar();
  R.bi++; R.ronda = 1; R.fase = 'work'; R.left = bloqueDur(R.bloques[R.bi]);
  R.endAt = Date.now() + R.left * 1000;
  if (R.bloques[R.bi].tec && R.bloques[R.bi].tec.length) R.tecShow = R.bloques[R.bi].tec[0];
  campana(); pintarRunner();
}
function updDial() {
  const d = $('#dial'); if (!d) return;
  d.style.setProperty('--p', (100 - (R.left / Math.max(1, faseDur())) * 100).toFixed(1));
  d.classList.toggle('rest', R.fase === 'rest');
  $('#dialNum').textContent = mmss(R.left);
}
function pintarRunner() {
  const b = R.bloques[R.bi], d = D(R.disc);
  const estado = R.fase === 'rest' ? 'DESCANSO' : (R.running ? (b.tipo === 'rondas' ? 'RONDA ' + R.ronda + ' DE ' + b.rondas : 'EN CURSO') : 'EN PAUSA');
  const m = R.tecShow ? movById(d, R.tecShow) : null;
  let html = `<div class="sheet-head"><h3>${esc(b.nom)}</h3><button class="x" data-runx="1" aria-label="Cerrar sesión">✕</button></div>
  <p class="eyebrow">${esc(R.titulo)} · bloque ${R.bi+1} de ${R.bloques.length}${b.pareja?' · con compañero':''}</p>
  <div class="clock"><div class="dial${R.fase==='rest'?' rest':''}" id="dial" style="--p:${(100-(R.left/Math.max(1,faseDur()))*100).toFixed(1)}">
    <div class="dial-in"><span class="num" id="dialNum">${mmss(R.left)}</span><span class="st">${estado}</span></div></div></div>
  <div class="btn-row" style="margin-bottom:10px">
    <button class="btn" style="flex:1" data-play="1">${R.running?'Pausar':'Iniciar'}</button>
    <button class="btn ghost sm" data-skip="1">Saltar</button>
  </div>
  <div class="card"><p class="eyebrow" style="margin-bottom:4px">Qué hacer ahora</p><p style="font-size:15.5px">${esc(b.txt)}</p></div>`;
  if (m) {
    html += `<div class="stage">${figura(m)}</div>`;
    if (b.tec && b.tec.length > 1) html += '<div class="btn-row" style="margin-bottom:12px">' +
      b.tec.map(id => `<button class="btn ghost sm" data-rtec="${id}" style="flex:1 1 auto;${id===R.tecShow?'border-color:var(--fig);color:var(--fig)':''}">${esc((movById(d,id)||{nom:id}).nom)}</button>`).join('') + '</div>';
    html += `<ul class="keys">${m.claves.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`;
  }
  html += '<ul class="blocks">' + R.bloques.map((x, i) => `<li class="${i===R.bi?'on':(i<R.bi?'past':'')}">
    <b>${esc(x.nom)}</b><i>${x.tipo==='rondas'?x.rondas+' rondas':x.min+' min'}</i><span class="tm">${i===R.bi?'▶':''}</span></li>`).join('') + '</ul>';
  html += '<button class="btn gold" data-fin="1">Terminar y registrar</button>';
  $('#runnerIn').innerHTML = html; arrancarAnim('#runnerIn');
}
function cerrarRunner() {
  if (R && R.tid) clearInterval(R.tid);
  lock(false); R = null;
  $('#runner').hidden = true; $('#runnerIn').innerHTML = ''; document.body.style.overflow = '';
}
function terminar() {
  if (R.tid) clearInterval(R.tid);
  R.running = false; lock(false); campana();
  const min = Math.max(1, Math.round(R.acum / 60));
  $('#sheetIn').innerHTML = `<div class="sheet-head"><h3>Sesión terminada</h3></div>
  <p style="font-size:15.5px;margin-bottom:6px">${esc(R.titulo)}</p>
  <p class="eyebrow">Trabajo efectivo: ${min} min</p>
  <label class="fld">¿Qué tan duro se sintió? (1 suave · 10 al límite)</label>
  <div class="rpe" id="rpe">${[1,2,3,4,5,6,7,8,9,10].map(v=>`<button data-rpe="${v}" aria-pressed="false">${v}</button>`).join('')}</div>
  <label class="fld" for="nota">Notas de la sesión</label>
  <textarea id="nota" rows="3" placeholder="Qué salió bien, qué corregir la próxima vez..."></textarea>
  <div class="btn-row" style="margin-top:16px">
    <button class="btn" data-save="${min}">Guardar</button>
    <button class="btn ghost sm" data-descartar="1">Descartar</button>
  </div>`;
  $('#sheet').hidden = false;
}
function guardarSesion(min) {
  const b = $('#rpe').querySelector('[aria-pressed="true"]');
  S.reg.push({ ts: Date.now(), fecha: hoyISO(), disc: R.disc, nivel: R.nivel, ses: R.ses, titulo: R.titulo,
               min: min, rpe: b ? +b.dataset.rpe : null, nota: ($('#nota').value || '').trim().slice(0, 160) });
  guardar(); cerrarSheet(); cerrarRunner();
  vista = 'entrenar'; pintar(); toast('Sesión registrada. Buen trabajo.');
}

/* ---------- eventos ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-tab],[data-ir],[data-disc],[data-sub],[data-lvl],[data-ft],[data-tec],[data-close],[data-prac],[data-go],[data-del],[data-play],[data-skip],[data-fin],[data-runx],[data-rtec],[data-rpe],[data-save],[data-descartar],[data-perfil],[data-pdisc],[data-pdia],[data-exp],[data-imp],[data-borrar],[data-crono],[data-cronogo]');
  if (!el) return;
  const d = el.dataset;
  if (d.tab) { vista = d.tab; pintar(); }
  else if (d.ir) { vista = d.ir; pintar(); }
  else if (d.disc) { S.disc = d.disc; subTab = 'sesiones'; vista = 'entrenar'; guardar(); pintar(); }
  else if (d.sub) { subTab = d.sub; pintar(); }
  else if (d.lvl) { S.sel[S.disc] = +d.lvl; guardar(); pintar(); }
  else if (d.ft) { filtroTec = +d.ft; pintar(); }
  else if (d.tec) { abrirTec(S.disc, d.tec); }
  else if (d.close) { cerrarSheet(); }
  else if (d.prac) { const [a, b] = d.prac.split(':'); abrirPractica(a, b); }
  else if (d.go) { const [a, b, c] = d.go.split(':'); abrirSesion(a, +b, +c); }
  else if (d.del) { S.reg = S.reg.filter(r => r.ts !== +d.del); guardar(); pintar(); toast('Registro borrado.'); }
  else if (d.play) { R.running ? pausa() : play(); }
  else if (d.skip) { siguienteBloque(); }
  else if (d.fin) { terminar(); }
  else if (d.runx) { if (R.acum > 60) terminar(); else cerrarRunner(); }
  else if (d.rtec) { R.tecShow = d.rtec; pintarRunner(); }
  else if (d.rpe) { $('#rpe').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false')); el.setAttribute('aria-pressed', 'true'); }
  else if (d.save) { guardarSesion(+d.save); }
  else if (d.descartar) { cerrarSheet(); cerrarRunner(); }
  else if (d.perfil) {
    S.perfil = { nombre: $('#pf-nombre').value.trim().slice(0,40), edad: $('#pf-edad').value, guardia: $('#pf-guardia').value,
                 peso: $('#pf-peso').value, altura: $('#pf-altura').value, env: $('#pf-env').value,
                 exp: $('#pf-exp').value, obj: $('#pf-obj').value.trim().slice(0,120) };
    guardar(); pintar(); toast('Perfil guardado.');
  }
  else if (d.pdisc) {
    const i = S.programa.discs.indexOf(d.pdisc);
    if (i > -1) S.programa.discs.splice(i, 1); else S.programa.discs.push(d.pdisc);
    guardar(); pintar();
  }
  else if (d.pdia) {
    const n = +d.pdia, i = S.programa.dias.indexOf(n);
    if (i > -1) S.programa.dias.splice(i, 1); else S.programa.dias.push(n);
    guardar(); pintar();
  }
  else if (d.exp) { descargarRespaldo(); toast('Respaldo descargado.'); }
  else if (d.imp) { $('#fileImp').click(); }
  else if (d.borrar) {
    if (confirm('Esto borra sesiones, perfil y programa de este navegador. ¿Seguro? Descarga antes un respaldo si quieres conservarlo.')) {
      localStorage.removeItem(KEY); S = JSON.parse(JSON.stringify(DATOS_INI)); guardar(); pintar(); toast('Datos borrados.');
    }
  }
  else if (d.crono) { abrirCronoConfig(); }
  else if (d.cronogo) { abrirCrono(); }
});
document.addEventListener('change', e => {
  if (e.target.id === 'fileImp' && e.target.files[0]) {
    importarRespaldo(e.target.files[0], (ok, n) => {
      if (ok) { pintar(); toast('Respaldo importado (' + n + ' sesiones revisadas).'); }
      else toast('Ese archivo no es un respaldo válido.');
    });
    e.target.value = '';
  }
});
$('#back').addEventListener('click', () => { S.disc = null; vista = 'inicio'; pintar(); });
$('#sheet').addEventListener('click', e => { if (e.target.id === 'sheet' && !R) cerrarSheet(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!$('#sheet').hidden) cerrarSheet();
    else if (!$('#runner').hidden && R && !R.running) cerrarRunner();
  }
});

/* ---------- arranque ---------- */
cargar();
if (!S.disc) S.disc = null;
pintar();
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
