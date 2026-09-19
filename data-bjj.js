/* =========================================================
   data-bjj.js — Jiu-Jitsu brasileño (suelo)
   Convención: tú de espaldas con la cabeza a la izquierda.
   ========================================================= */
(function(){

const tum={h:[62,228],fa:[46,234],n:[86,236],p:[146,248],sl:[88,228],el:[112,214],fl:[136,204],sr:[90,232],er:[114,220],fr:[138,210],kl:[180,210],tl:[206,238],kr:[176,216],tr:[202,244]};
const gc=P(tum,{kl:[176,204],tl:[208,196],kr:[172,212],tr:[204,204]});
const gc2=P(gc,{sl:[88,226],el:[118,208],fl:[148,194],sr:[90,230],er:[120,214],fr:[150,200]});
const ukeK={h:[190,136],fa:[173,142],n:[192,162],p:[196,212],sl:[188,172],el:[166,188],fl:[142,198],sr:[196,174],er:[174,190],fr:[150,200],kl:[186,244],tl:[156,254],kr:[214,244],tr:[228,254]};
const ukeK2=P(SH(ukeK,-10,16),{fa:[165,166]});

const shrimp1=P(tum,{p:[132,230],kl:[168,208],tl:[190,244],kr:[162,216],tr:[184,250]});
const shrimp2=P(tum,{p:[120,226],kl:[154,204],tl:[176,244],kr:[148,212],tr:[170,250],sl:[90,226],el:[112,210],fl:[134,200]});

const plano=P(tum,{kl:[176,214],tl:[196,250],kr:[172,220],tr:[192,256]});
const puente1=P(plano,{p:[150,206],kl:[178,204],tl:[196,250],kr:[174,210],tr:[192,256],sl:[90,226],el:[116,212],fl:[142,206]});
const puente2=P(puente1,{p:[146,218],n:[88,232],h:[66,224],fa:[52,232],kl:[172,208],tl:[192,250],kr:[166,214],tr:[188,256]});
const ukeMon={h:[150,136],fa:[133,142],n:[158,160],p:[170,206],sl:[154,168],el:[132,186],fl:[108,196],sr:[160,172],er:[138,190],fr:[114,200],kl:[186,240],tl:[212,250],kr:[152,242],tr:[126,252]};
const ukeMon2=P(SH(ukeMon,-6,-14),{fa:[127,130]});
const ukeCae={h:[120,186],fa:[104,196],n:[136,200],p:[164,226],sl:[132,204],el:[112,222],fl:[92,240],sr:[138,208],er:[118,226],fr:[98,244],kl:[184,244],tl:[210,252],kr:[160,246],tr:[136,254]};

const ukeSup={h:[188,230],fa:[204,236],n:[164,238],p:[104,248],sl:[162,230],el:[138,216],fl:[114,206],sr:[160,234],er:[136,222],fr:[112,212],kl:[70,212],tl:[44,240],kr:[74,218],tr:[48,246]};
const tuMon={h:[100,134],fa:[117,140],n:[98,160],p:[94,210],sl:[102,170],el:[124,186],fl:[148,196],sr:[94,172],er:[116,188],fr:[140,198],kl:[104,242],tl:[134,252],kr:[76,242],tr:[50,252]};
const tuMon2=P(SH(tuMon,0,-10),{sl:[102,160],el:[126,172],fl:[152,178],sr:[94,162],er:[118,174],fr:[144,180]});

const tuPasoA={h:[78,120],fa:[95,126],n:[80,146],p:[82,198],sl:[84,156],el:[108,172],fl:[132,182],sr:[76,158],er:[100,174],fr:[124,184],kl:[110,224],tl:[138,236],kr:[62,236],tr:[36,250]};
const tuPasoB=P(tuPasoA,{p:[96,196],kl:[136,214],tl:[164,226],sl:[98,154],el:[124,168],fl:[150,178],sr:[90,156],er:[116,170],fr:[142,180],h:[92,118],fa:[109,124],n:[94,144]});

const ukeSit={h:[150,150],fa:[167,156],n:[144,174],p:[136,220],sl:[146,182],el:[172,196],fl:[198,204],sr:[142,184],er:[168,198],fr:[194,206],kl:[176,226],tl:[206,240],kr:[170,234],tr:[200,248]};
const tuBack={h:[96,142],fa:[113,148],n:[100,166],p:[104,216],sl:[104,176],el:[134,168],fl:[160,162],sr:[98,178],er:[126,174],fr:[152,168],kl:[136,232],tl:[166,244],kr:[78,238],tr:[52,250]};
const tuBack2=P(tuBack,{sl:[104,174],el:[138,162],fl:[166,156],sr:[98,176],er:[130,168],fr:[158,162],h:[100,140],fa:[117,146]});
const ukeSit2=P(SH(ukeSit,-6,6),{fa:[161,164]});

const MOV=[
 {id:'fugacadera',nom:'Fuga de cadera',niv:1,dur:2.6,key:2,
  frames:[[tum,0],[shrimp1,.3],[shrimp2,.5],[shrimp2,.6],[tum,.9],[tum,1]],
  claves:['Planta un pie, empuja el suelo y lleva la cadera hacia atrás, no hacia arriba.',
          'Quedas de costado, con el codo pegado a la rodilla formando un marco.',
          'La barbilla al pecho y la mirada siempre hacia el compañero.'],
  error:'Empujar con las manos en lugar de con las piernas: la cadera no se mueve.'},

 {id:'puente',nom:'Puente (upa)',niv:1,dur:2.8,key:2,pareja:true,
  frames:[[plano,0,ukeMon],[puente1,.28,ukeMon2],[puente2,.5,ukeCae],[puente2,.62,ukeCae],[plano,.92,ukeMon],[plano,1,ukeMon]],
  claves:['Atrapa un brazo y el pie del mismo lado: sin bloquear, no hay vuelco.',
          'Empuja con los talones y eleva la cadera hacia el techo, no hacia los pies.',
          'Gira por encima del hombro bloqueado en un solo movimiento.'],
  error:'Empujar al compañero con los brazos: gastas fuerza y sigues debajo.'},

 {id:'guardiacerrada',nom:'Guardia cerrada',niv:1,dur:3,key:2,pareja:true,
  frames:[[gc,0,ukeK],[gc,.2,ukeK],[gc2,.42,ukeK2],[gc2,.56,ukeK2],[gc,.86,ukeK],[gc,1,ukeK]],
  claves:['Talones cruzados por debajo, apretando justo encima de su cadera.',
          'Tira de las solapas o del cuello hacia ti para romper su postura.',
          'Tu cabeza no se queda en el suelo: sube los hombros cuando tiras.'],
  error:'Dejarlo erguido y con espacio: desde ahí él decide y tú solo aguantas.'},

 {id:'montada',nom:'Montada y control',niv:1,dur:3,key:1,pareja:true,
  frames:[[tuMon,0,ukeSup],[tuMon2,.4,ukeSup],[tuMon2,.55,ukeSup],[tuMon,.9,ukeSup],[tuMon,1,ukeSup]],
  claves:['Rodillas altas, pegadas a sus axilas, y talones enganchados bajo su cadera.',
          'Tu peso vive en el pecho de él, no en tus manos.',
          'Si se gira, acompaña el giro con la cadera en lugar de resistir con los brazos.'],
  error:'Sentarte sobre sus caderas con las rodillas abiertas: te quitan la posición con un puente.'},

 {id:'pasoguardia',nom:'Paso de guardia',niv:2,dur:3,key:2,pareja:true,
  frames:[[tuPasoA,0,ukeSup],[tuPasoA,.18,ukeSup],[tuPasoB,.46,ukeSup],[tuPasoB,.62,ukeSup],[tuPasoA,.92,ukeSup],[tuPasoA,1,ukeSup]],
  claves:['Controla primero sus caderas o sus rodillas: sin control no hay paso.',
          'La rodilla cruza en diagonal, a la altura del muslo, mientras el pecho baja.',
          'Cae a control lateral con la cabeza del lado contrario a sus piernas.'],
  error:'Correr alrededor de pie: te barren antes de llegar al costado.'},

 {id:'estrangulacion',nom:'Estrangulación desde la espalda',niv:2,dur:3,key:2,pareja:true,
  frames:[[tuBack,0,ukeSit],[tuBack,.2,ukeSit],[tuBack2,.46,ukeSit2],[tuBack2,.62,ukeSit2],[tuBack,.9,ukeSit],[tuBack,1,ukeSit]],
  claves:['Primero los ganchos con las piernas y el pecho pegado a su espalda.',
          'El brazo rodea el cuello, no la mandíbula, y la mano llega al bíceps contrario.',
          'Cierra juntando los codos y expandiendo el pecho, despacio.'],
  error:'Apretar sobre la tráquea a tirones: duele, no controla y se defiende fácil.'}
].concat(FISICO);

const CAL='Movilidad de cadera, columna y cuello. Rotaciones de cuello muy suaves y 10 puentes lentos.';
const FRIO='Estiramiento de cadera, aductores, espalda baja y cuello. Respira lento 2 min.';
const DRILLS={1:'Fuga de cadera, puentes y giros sobre el tatami. Lento y con la técnica limpia.',
  2:'Fuga de cadera, puente y paso a cuatro apoyos encadenados.',
  3:'Circuito de desplazamientos: fuga, puente, sentada técnica y recuperación de guardia.',
  4:'Circuito completo a ritmo alto, cambiando de lado sin parar.'};
const ROLL={1:'Rolling muy suave, solo posición: nadie busca finalizar.',
  2:'Rolling posicional: empieza desde la posición del día y reinicia al perderla.',
  3:'Rolling libre al 60 %, buscando las transiciones trabajadas.',
  4:'Rolling libre con objetivo: elige una posición y llega a ella en cada asalto.'};
const R={1:{dr:2,tec:3,sit:2,roll:2},2:{dr:2,tec:3,sit:2,roll:3},3:{dr:2,tec:3,sit:3,roll:4},4:{dr:2,tec:4,sit:3,roll:5}};

const NIVELES=[
{id:1,nom:'Principiante',lema:'Moverte en el suelo, guardia y fugas',work:240,rest:60,ses:[
 {foco:'Fuga de cadera y puente',tec:['fugacadera','puente'],drill:'10 fugas de cadera por lado y 10 puentes, lentos, con la barbilla al pecho.',sombra:'Desde la montada del compañero: solo intentas escapar, él solo mantiene.',extra:'3×30 s de plancha y 20 sentadillas.',solo:'Se entrena entero sin compañero.'},
 {foco:'Guardia cerrada',tec:['guardiacerrada'],drill:'Cierra la guardia, rompe la postura tirando del cuello y vuelve a colocarte. 15 repeticiones.',sombra:'Tú en guardia cerrada; el compañero solo intenta abrirla.',extra:'3×15 flexiones y 30 abdominales.',solo:'Sin compañero: repite el cierre de piernas y el tirón en el aire.'},
 {foco:'Escapar de la montada',tec:['puente','montada'],drill:'Atrapa brazo y pie, puentea y gira. 10 repeticiones por lado.',sombra:'Él monta, tú escapas. Reinicia cada vez que lo logres.',extra:'4×20 s de rodillas altas.',solo:'Sin compañero: 20 puentes con giro completo por lado.'},
 {foco:'Montada: control',tec:['montada'],drill:'Mantén la montada 60 s mientras el compañero se mueve al 50 %.',sombra:'Tú montado: solo conservas la posición, sin atacar.',extra:'3×30 s de plancha y 20 sentadillas.',solo:'Sin compañero: practica la subida a montada desde el costado.'},
 {foco:'Prueba de nivel 1',tec:['fugacadera','guardiacerrada','montada'],drill:'Una ronda por cada fundamento del nivel.',sombra:'Situacional libre entre guardia y montada.',extra:'Estiramiento largo de cadera y espalda.',solo:'La parte de drills se hace sola; el situacional necesita compañero.'}]},

{id:2,nom:'Básico',lema:'Pasar, controlar y tomar la espalda',work:300,rest:60,ses:[
 {foco:'Paso de guardia',tec:['pasoguardia'],drill:'15 pasos con rodilla cruzada por lado, controlando primero la cadera.',sombra:'Él en guardia abierta; tú solo intentas pasar.',extra:'3×20 sentadillas y 40 abdominales.',solo:'Sin compañero: repite la entrada de rodilla y la caída al costado.'},
 {foco:'Control lateral y transición',tec:['pasoguardia','montada'],drill:'Del costado a la montada, 12 transiciones por lado sin perder la presión.',sombra:'Empieza en control lateral: tú conservas, él escapa.',extra:'3×30 s de plancha y 3×15 flexiones.',solo:'Sin compañero: transiciones en seco marcando el peso del pecho.'},
 {foco:'Tomar la espalda y estrangular',tec:['estrangulacion'],drill:'Coloca ganchos y brazo al cuello 12 veces, sin apretar del todo.',sombra:'Tú a la espalda; él defiende el cuello.',extra:'4×20 s de burpees.',solo:'Sin compañero: repite el recorrido del brazo hasta el bíceps contrario.'},
 {foco:'Cadena completa',tec:['pasoguardia','montada','estrangulacion'],drill:'Pasar, montar y tomar la espalda en una sola secuencia, 8 veces.',sombra:'Situacional desde guardia abierta hasta finalización.',extra:'4 min de cuerda.',solo:'Sin compañero: secuencia en sombra marcando cada posición 5 s.'},
 {foco:'Prueba de nivel 2',tec:['pasoguardia','estrangulacion'],drill:'Una ronda por técnica del nivel.',sombra:'Rolling posicional desde guardia abierta.',extra:'Estiramiento completo, 6 min.',solo:'Los drills se hacen solos; el rolling necesita compañero.'}]},

{id:3,nom:'Medio',lema:'Barridas, defensa y retención de guardia',work:300,rest:60,ses:[
 {foco:'Barrida desde la guardia cerrada',tec:['guardiacerrada','puente'],drill:'Rompe postura, bloquea brazo y pie y barre. 12 por lado.',sombra:'Tú en guardia: solo puedes ganar barriendo.',extra:'3×20 sentadillas y 40 abdominales.',solo:'Sin compañero: 20 barridas en el aire por lado.'},
 {foco:'Defensa de estrangulación',tec:['estrangulacion'],drill:'Defiende el cuello con las dos manos y gira hacia el brazo que ataca, 15 veces.',sombra:'Él a tu espalda; tú solo defiendes y escapas.',extra:'3×30 s de plancha.',solo:'Sin compañero: repite el giro defensivo contra la pared.'},
 {foco:'Retener la guardia',tec:['guardiacerrada','fugacadera'],drill:'Recupera la guardia con fuga de cadera cada vez que "te pasan". 20 repeticiones.',sombra:'Él intenta pasar durante toda la ronda; tú solo retienes.',extra:'4×20 s de rodillas altas.',solo:'Sin compañero: circuito de fugas y recolocación de piernas.'},
 {foco:'Presión al pasar',tec:['pasoguardia','montada'],drill:'Pasa y consolida diez segundos antes de avanzar. 10 series.',sombra:'Situacional: tú pasas, él retiene.',extra:'4 min de cuerda y 3×15 flexiones.',solo:'Sin compañero: paso en seco marcando la presión del pecho.'},
 {foco:'Prueba de nivel 3',tec:['guardiacerrada','pasoguardia','estrangulacion'],drill:'Una ronda por técnica del nivel.',sombra:'Rolling posicional alternando arriba y abajo.',extra:'Estiramiento completo, 6 min.',solo:'Solo los drills; lo demás con compañero.'}]},

{id:4,nom:'Avanzado',lema:'Cadenas, presión y rolling con intención',work:360,rest:60,ses:[
 {foco:'Cadenas desde la espalda',tec:['estrangulacion','montada'],drill:'Ataca el cuello, cambia al otro lado y vuelve. Tres ataques por serie, 8 series.',sombra:'Tú a la espalda toda la ronda: si escapa, vuelves a empezar.',extra:'5 min de cuerda.',solo:'Sin compañero: secuencia de brazos y cambios de gancho en el aire.'},
 {foco:'Recuperar guardia bajo presión',tec:['fugacadera','guardiacerrada'],drill:'Desde control lateral, marco y fuga hasta recuperar guardia. 12 por lado.',sombra:'Empiezas siempre debajo, en la peor posición.',extra:'4×20 s de burpees.',solo:'Sin compañero: circuito de marcos y fugas contra una pared.'},
 {foco:'Transiciones sin soltar',tec:['pasoguardia','montada','estrangulacion'],drill:'Cuatro posiciones encadenadas sin perder contacto, 8 series.',sombra:'Situacional continuo: cada vez que escapa, retomas.',extra:'3×40 s de plancha y 50 abdominales.',solo:'Sin compañero: recorrido de posiciones marcando 5 s cada una.'},
 {foco:'Rolling con objetivo',tec:['guardiacerrada','pasoguardia'],drill:'Elige una sola posición y llega a ella en cada asalto.',sombra:'Rolling libre al 70 %, con el objetivo anunciado antes de empezar.',extra:'5 min de cuerda.',solo:'Este día necesita compañero sí o sí.'},
 {foco:'Prueba final',tec:['pasoguardia','estrangulacion','puente'],drill:'Una ronda por técnica avanzada.',sombra:'Rolling libre y análisis de lo que falló.',extra:'Estiramiento completo, 8 min.',solo:'Los drills se hacen solos; el rolling necesita compañero.'}]}
];

function bloques(niv,s){
  const r=R[niv.id];
  return [
   {nom:'Calentamiento',txt:CAL,tipo:'libre',min:7,tec:['movilidad']},
   {nom:'Drills de suelo',txt:DRILLS[niv.id],tipo:'rondas',rondas:r.dr,tec:['fugacadera','puente']},
   {nom:'Técnica',txt:s.drill+(s.solo?' · '+s.solo:''),tipo:'rondas',rondas:r.tec,tec:s.tec},
   {nom:'Situacional',txt:s.sombra,tipo:'rondas',rondas:r.sit,tec:s.tec,pareja:true},
   {nom:'Rolling',txt:ROLL[niv.id],tipo:'rondas',rondas:r.roll,tec:s.tec,pareja:true},
   {nom:'Acondicionamiento',txt:s.extra,tipo:'libre',min:6,tec:ejsDe(s.extra)},
   {nom:'Enfriamiento',txt:FRIO,tipo:'libre',min:5,tec:['estiramiento']}
  ];
}

DISC.bjj={
  id:'bjj', nom:'Jiu-Jitsu', sub:'Control en el suelo, guardia y sumisiones', emoji:'\u{1F94B}',
  tema:{wall:'#0E3F4C',ink:'#041920',fig:'#2FD4BE'},
  portada:'guardiacerrada', mov:MOV, niveles:NIVELES, bloques:bloques, pareja:true,
  intro:'Del desplazamiento en el tatami y la guardia cerrada hasta las cadenas de control y la espalda.'
};
})();
