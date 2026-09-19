/* =========================================================
   data-judo.js — Judo
   ========================================================= */
(function(){

const tuP={h:[102,62],fa:[119,68],n:[104,88],p:[102,168],sl:[108,100],el:[136,98],fl:[164,94],sr:[98,102],er:[126,112],fr:[152,122],kl:[116,212],tl:[132,262],kr:[78,212],tr:[60,262]};
const ukP={h:[190,62],fa:[173,68],n:[192,88],p:[196,168],sl:[188,100],el:[162,98],fl:[136,94],sr:[198,102],er:[172,112],fr:[146,122],kl:[186,212],tl:[172,262],kr:[218,212],tr:[230,262]};
const tuTira=P(tuP,{sl:[108,100],el:[130,106],fl:[150,116],sr:[98,102],er:[120,118],fr:[140,130],p:[98,170]});
const ukDes=P(SH(ukP,-10,4),{h:[180,70],fa:[163,80],kr:[216,206],tr:[232,244]});

const tuEnt={h:[146,74],fa:[129,80],n:[140,98],p:[130,172],sl:[142,108],el:[170,104],fl:[196,100],sr:[134,110],er:[158,126],fr:[180,138],kl:[114,216],tl:[96,262],kr:[150,216],tr:[170,262]};
const ukEnt={h:[196,74],fa:[179,80],n:[194,98],p:[184,158],sl:[190,108],el:[166,116],fl:[140,120],sr:[198,110],er:[176,120],fr:[152,128],kl:[192,204],tl:[184,250],kr:[216,200],tr:[228,244]};
const tuPro={h:[122,106],fa:[105,114],n:[128,130],p:[138,184],sl:[130,138],el:[106,138],fl:[82,130],sr:[132,142],er:[110,148],fr:[86,142],kl:[128,222],tl:[112,264],kr:[158,220],tr:[176,262]};
const ukPro={h:[70,180],fa:[56,190],n:[92,168],p:[134,146],sl:[94,172],el:[84,198],fl:[78,224],sr:[96,164],er:[86,190],fr:[80,216],kl:[168,124],tl:[196,104],kr:[160,134],tr:[186,114]};
const ukSuelo={h:[46,234],fa:[32,242],n:[70,240],p:[126,250],sl:[72,234],el:[86,214],fl:[104,200],sr:[74,238],er:[92,222],fr:[112,208],kl:[156,236],tl:[180,254],kr:[152,244],tr:[178,258]};
const tuFin={h:[168,70],fa:[151,76],n:[172,96],p:[176,172],sl:[170,106],el:[148,124],fl:[122,140],sr:[178,108],er:[160,130],fr:[140,152],kl:[166,214],tl:[152,262],kr:[196,214],tr:[210,262]};

const tuOso1=P(tuP,{h:[114,60],fa:[131,66],p:[118,168],kl:[142,210],tl:[164,258],kr:[96,212],tr:[78,262],sl:[120,98],el:[150,92],fl:[178,86],sr:[112,100],er:[140,110],fr:[166,118]});
const ukOso1=P(ukP,{h:[192,72],fa:[175,80],n:[194,98],p:[200,176],kr:[222,214],tr:[236,256]});
const tuOso2={h:[112,72],fa:[129,76],n:[116,96],p:[124,170],sl:[118,106],el:[150,98],fl:[180,88],sr:[110,108],er:[140,118],fr:[168,124],kl:[146,208],tl:[168,256],kr:[172,196],tr:[214,214]};
const ukOso2={h:[206,120],fa:[190,130],n:[206,146],p:[198,196],sl:[202,156],el:[180,166],fl:[156,168],sr:[210,158],er:[190,170],fr:[166,174],kl:[186,228],tl:[160,246],kr:[214,224],tr:[232,240]};
const ukOso3={h:[214,228],fa:[230,236],n:[190,238],p:[134,250],sl:[188,232],el:[164,218],fl:[140,208],sr:[186,236],er:[162,224],fr:[138,214],kl:[100,238],tl:[74,252],kr:[104,246],tr:[78,258]};
const tuOso3=P(tuOso2,{kr:[92,212],tr:[70,262],kl:[126,212],tl:[146,262]});

const tuSeo={h:[144,108],fa:[127,114],n:[138,130],p:[128,186],sl:[140,138],el:[168,128],fl:[192,118],sr:[132,140],er:[156,152],fr:[178,160],kl:[112,224],tl:[96,262],kr:[150,226],tr:[170,262]};
const ukSeo={h:[186,96],fa:[169,104],n:[180,118],p:[160,150],sl:[178,126],el:[156,138],fl:[134,146],sr:[182,128],er:[160,140],fr:[138,148],kl:[176,196],tl:[196,232],kr:[196,188],tr:[220,220]};

const uStand=BASE.stand;
const uSit={h:[110,140],fa:[127,146],n:[108,164],p:[100,216],sl:[112,174],el:[140,178],fl:[166,176],sr:[102,176],er:[130,182],fr:[156,182],kl:[142,232],tl:[178,246],kr:[104,240],tr:[70,252]};
const uLado={h:[80,226],fa:[64,232],n:[104,234],p:[156,246],sl:[106,228],el:[126,212],fl:[148,202],sr:[108,232],er:[130,242],fr:[154,250],kl:[186,222],tl:[208,246],kr:[180,230],tr:[204,252]};

const t1=tuP;
const t2=P(tuP,{fa:[106,82],kl:[110,212],tl:[120,262],kr:[96,212],tr:[86,262],sl:[106,100],el:[120,116],fl:[136,126],sr:[100,102],er:[114,118],fr:[130,128]});
const t3=P(tuP,{fa:[85,68],kl:[100,212],tl:[84,262],kr:[128,212],tr:[146,262],sl:[104,100],el:[80,104],fl:[56,108],sr:[100,102],er:[76,114],fr:[52,120]});

const MOV=[
 {id:'kumikata',nom:'Postura y agarre',niv:1,dur:3,key:2,pareja:true,
  frames:[[tuP,0,ukP],[tuP,.18,ukP],[tuTira,.44,ukDes],[tuTira,.58,ukDes],[tuP,.88,ukP],[tuP,1,ukP]],
  claves:['Postura natural: rodillas blandas, espalda recta y mirada al pecho del compañero.',
          'Una mano en la solapa a la altura de la clavícula, la otra en la manga a la altura del codo.',
          'Los codos bajos: el agarre se sostiene con la espalda, no con los bíceps.'],
  error:'Agarrar con los brazos rígidos y estirados: te cansas y avisas cada intento.'},

 {id:'ukemi',nom:'Caída lateral (ukemi)',niv:1,dur:3.4,key:2,
  frames:[[uStand,0],[uSit,.28],[uLado,.5],[uLado,.64],[uSit,.84],[uStand,1]],
  claves:['Barbilla al pecho durante toda la caída: la cabeza nunca toca el tatami.',
          'Golpea con la palma y todo el brazo a 45° del cuerpo, un solo golpe seco.',
          'Cae rodando por el costado, no de plano sobre la espalda.'],
  error:'Frenar la caída con la mano apoyada: es la forma más rápida de lesionarse la muñeca.'},

 {id:'taisabaki',nom:'Giro de cadera (tai sabaki)',niv:1,dur:3,key:2,
  frames:[[t1,0],[t2,.25],[t3,.5],[t2,.75],[t1,1]],
  claves:['Gira sobre la punta de los pies, sin saltar y sin subir el centro de gravedad.',
          'Termina con la espalda hacia el compañero y tus caderas por debajo de las suyas.',
          'El giro y el tirón de los brazos ocurren al mismo tiempo.'],
  error:'Girar primero y tirar después: le das tiempo de recuperar el equilibrio.'},

 {id:'osotogari',nom:'O soto gari',niv:1,dur:4.2,key:2,pareja:true,
  frames:[[tuP,0,ukP],[tuOso1,.2,ukOso1],[tuOso2,.42,ukOso2],[tuOso2,.54,ukOso2],[tuOso3,.72,ukOso3],[tuOso3,.86,ukOso3],[tuP,1,ukP]],
  claves:['Paso lateral junto a su pie: tu pie de apoyo queda a la altura del suyo.',
          'Lleva su peso hacia atrás con la solapa antes de segar.',
          'La pierna siega hacia atrás como un péndulo, con el muslo pegado al suyo.'],
  error:'Segar sin haber roto antes el equilibrio: solo consigues una patada sin efecto.'},

 {id:'ogoshi',nom:'O goshi (cadera)',niv:2,dur:4.4,key:3,pareja:true,
  frames:[[tuP,0,ukP],[tuEnt,.22,ukEnt],[tuPro,.46,ukPro],[tuPro,.58,ukPro],[tuFin,.74,ukSuelo],[tuFin,.88,ukSuelo],[tuP,1,ukP]],
  claves:['Entra girando con los dos pies y mete la cadera por debajo de la suya.',
          'El brazo rodea su cintura y tira mientras las piernas se estiran.',
          'Nunca sueltes la manga: controlas la caída y proteges al compañero.'],
  error:'Entrar con la cadera demasiado alta o demasiado lejos: lo cargas con la espalda.'},

 {id:'seoinage',nom:'Seoi nage (hombro)',niv:3,dur:4.4,key:3,pareja:true,
  frames:[[tuP,0,ukP],[tuSeo,.22,ukSeo],[tuPro,.46,ukPro],[tuPro,.58,ukPro],[tuFin,.74,ukSuelo],[tuFin,.88,ukSuelo],[tuP,1,ukP]],
  claves:['Baja flexionando las rodillas, con la espalda recta y el pecho alto.',
          'Tu codo se mete bajo su axila: el brazo no empuja, engancha.',
          'Proyecta estirando las piernas y girando la cabeza hacia donde va el compañero.'],
  error:'Doblar la espalda para cargar: lo levantas con la columna en vez de con las piernas.'}
].concat(FISICO);

const CAL='Movilidad de cuello, hombros, cadera y tobillos. Diez giros de cadera lentos en el sitio.';
const FRIO='Estiramiento de espalda, isquiotibiales, hombros y cuello. Respira lento 2 min.';
const UKEMI={1:'Caídas laterales y hacia atrás, muy lentas, desde sentado y luego desde de pie.',
  2:'Caídas laterales de pie y rodada hacia adelante.',3:'Rodadas encadenadas y caída desde una proyección suave.',
  4:'Caídas a ritmo real desde proyecciones del compañero.'};
const RAND={1:'Randori muy suave, solo agarre y desequilibrio: nadie proyecta.',
  2:'Randori ligero: se proyecta solo cuando la entrada está limpia.',
  3:'Randori al 60 % con las técnicas del nivel.',
  4:'Randori libre con cambios de agarre y combinaciones.'};
const R={1:{uk:2,uchi:3,nage:2,rand:1},2:{uk:2,uchi:3,nage:2,rand:2},3:{uk:2,uchi:3,nage:3,rand:3},4:{uk:2,uchi:4,nage:3,rand:4}};

const NIVELES=[
{id:1,nom:'Principiante',lema:'Postura, agarre, caídas y primera siega',work:150,rest:45,ses:[
 {foco:'Postura y agarre',tec:['kumikata'],drill:'Toma el agarre, desequilibra hacia adelante y suelta. 20 repeticiones por lado.',sombra:'Solo agarre: nadie proyecta, solo se busca romper el equilibrio.',extra:'3×30 s de plancha y 20 sentadillas.',solo:'Sin compañero: repite el agarre y el tirón con una toalla atada.'},
 {foco:'Caída lateral',tec:['ukemi'],drill:'20 caídas laterales por lado, primero desde sentado y luego de pie.',sombra:'El compañero te desequilibra suave y tú solo caes bien.',extra:'3×15 flexiones y 30 abdominales.',solo:'Se entrena entero sin compañero.'},
 {foco:'Giro de cadera',tec:['taisabaki'],drill:'30 giros completos por ronda, alternando el lado de entrada.',sombra:'Entra y sal sin proyectar, sintiendo la distancia.',extra:'4×20 s de rodillas altas.',solo:'Se entrena entero sin compañero.'},
 {foco:'O soto gari',tec:['osotogari'],drill:'20 entradas por lado sin proyectar, marcando el desequilibrio atrás.',sombra:'Desde agarre: solo se intenta o soto gari.',extra:'3×20 sentadillas y 30 s de plancha lateral.',solo:'Sin compañero: repite el paso y la siega marcando la pierna en el aire.'},
 {foco:'Prueba de nivel 1',tec:['kumikata','ukemi','osotogari'],drill:'Una ronda por cada fundamento del nivel.',sombra:'Randori suave solo con o soto gari.',extra:'Estiramiento largo de espalda y piernas.',solo:'Caídas y giros se hacen solos; el resto con compañero.'}]},

{id:2,nom:'Básico',lema:'Entradas limpias y primeras proyecciones',work:180,rest:45,ses:[
 {foco:'O goshi',tec:['ogoshi'],drill:'25 entradas de cadera (uchi komi) por ronda, sin proyectar.',sombra:'Desde agarre: solo o goshi, con caída controlada.',extra:'3×20 sentadillas y 40 abdominales.',solo:'Sin compañero: entradas en el aire marcando la posición de la cadera.'},
 {foco:'O soto en movimiento',tec:['osotogari','taisabaki'],drill:'Entra al o soto mientras el compañero camina. 15 entradas por lado.',sombra:'Randori ligero buscando el momento del paso.',extra:'4 min de cuerda.',solo:'Sin compañero: desplazamiento y entrada en sombra.'},
 {foco:'Uchi komi a ritmo',tec:['ogoshi','osotogari'],drill:'Series de 10 entradas rápidas alternando las dos técnicas.',sombra:'Entradas continuas sin proyectar durante toda la ronda.',extra:'3×15 flexiones y 3×30 s de plancha.',solo:'Sin compañero: series de entradas con banda elástica o toalla.'},
 {foco:'Nage komi',tec:['ogoshi'],drill:'10 proyecciones completas por lado, acompañando siempre la caída.',sombra:'Proyección y control: terminas de rodillas junto al compañero.',extra:'4×20 s de burpees.',solo:'Necesita compañero: sustitúyelo por entradas y caídas propias.'},
 {foco:'Prueba de nivel 2',tec:['ogoshi','osotogari'],drill:'Una ronda por técnica del nivel.',sombra:'Randori ligero con las dos proyecciones.',extra:'Estiramiento completo, 6 min.',solo:'Las entradas se hacen solas; el randori necesita compañero.'}]},

{id:3,nom:'Medio',lema:'Seoi nage, combinaciones y desequilibrio en movimiento',work:180,rest:60,ses:[
 {foco:'Seoi nage',tec:['seoinage'],drill:'25 entradas por ronda bajando con las piernas, espalda recta.',sombra:'Desde agarre: solo seoi nage.',extra:'3×20 sentadillas y 3×30 s de plancha.',solo:'Sin compañero: entradas bajas frente a un espejo.'},
 {foco:'Amago y proyección',tec:['seoinage','osotogari'],drill:'Amaga o soto y entra a seoi cuando reaccione. 12 series por lado.',sombra:'Cada ataque debe llevar un amago previo.',extra:'4×20 s de rodillas altas.',solo:'Sin compañero: secuencia de amago y entrada en sombra.'},
 {foco:'Desequilibrio en movimiento',tec:['kumikata','taisabaki'],drill:'Camina con el compañero y rompe su equilibrio en cada cambio de paso.',sombra:'Randori solo de agarre y desplazamiento.',extra:'4 min de cuerda.',solo:'Sin compañero: pasos y giros marcando el tirón.'},
 {foco:'Randori con objetivo',tec:['seoinage','ogoshi'],drill:'Elige una proyección y búscala durante toda la ronda.',sombra:'Randori al 60 % con objetivo anunciado.',extra:'3×15 flexiones y 40 abdominales.',solo:'Necesita compañero.'},
 {foco:'Prueba de nivel 3',tec:['seoinage','ogoshi','osotogari'],drill:'Una ronda por técnica del nivel.',sombra:'Randori con las tres proyecciones.',extra:'Estiramiento completo, 6 min.',solo:'Entradas y caídas se hacen solas.'}]},

{id:4,nom:'Avanzado',lema:'Agarre, cadenas y randori exigente',work:240,rest:60,ses:[
 {foco:'Guerra de agarres',tec:['kumikata'],drill:'Consigue tu agarre y rompe el suyo, 20 intercambios por ronda.',sombra:'Randori solo de agarre: gana quien domina la solapa.',extra:'5 min de cuerda.',solo:'Sin compañero: trabajo de manos y desplazamiento con banda.'},
 {foco:'Encadenar proyecciones',tec:['ogoshi','seoinage'],drill:'Si falla la primera, entra a la segunda sin soltar el agarre. 10 cadenas.',sombra:'Prohibido soltar: cada ataque enlaza con otro.',extra:'4×20 s de burpees.',solo:'Sin compañero: cadenas de entradas en sombra.'},
 {foco:'Contra a la entrada',tec:['osotogari','taisabaki'],drill:'Deja que entre y responde girando la cadera. 12 contras por lado.',sombra:'Solo contraatacas: nunca inicias tú.',extra:'3×40 s de plancha y 50 abdominales.',solo:'Sin compañero: giros defensivos y reentradas.'},
 {foco:'Randori largo',tec:['seoinage','ogoshi','osotogari'],drill:'Rondas completas sin parar entre técnicas.',sombra:'Randori libre al 70 %, cambiando de compañero si puedes.',extra:'5 min de cuerda.',solo:'Necesita compañero.'},
 {foco:'Prueba final',tec:['ogoshi','seoinage','osotogari','ukemi'],drill:'Una ronda por técnica avanzada.',sombra:'Randori libre y revisión de lo que falló.',extra:'Estiramiento completo, 8 min.',solo:'Caídas y entradas se hacen solas.'}]}
];

function bloques(niv,s){
  const r=R[niv.id];
  return [
   {nom:'Calentamiento',txt:CAL,tipo:'libre',min:7,tec:['movilidad']},
   {nom:'Ukemi (caídas)',txt:UKEMI[niv.id],tipo:'rondas',rondas:r.uk,tec:['ukemi']},
   {nom:'Uchi komi (entradas)',txt:s.drill+(s.solo?' · '+s.solo:''),tipo:'rondas',rondas:r.uchi,tec:s.tec},
   {nom:'Nage komi (proyecciones)',txt:s.sombra,tipo:'rondas',rondas:r.nage,tec:s.tec,pareja:true},
   {nom:'Randori',txt:RAND[niv.id],tipo:'rondas',rondas:r.rand,tec:s.tec,pareja:true},
   {nom:'Acondicionamiento',txt:s.extra,tipo:'libre',min:6,tec:ejsDe(s.extra)},
   {nom:'Enfriamiento',txt:FRIO,tipo:'libre',min:5,tec:['estiramiento']}
  ];
}

DISC.judo={
  id:'judo', nom:'Judo', sub:'Agarre, desequilibrio y proyecciones', emoji:'\u{1F94B}',
  tema:{wall:'#102A57',ink:'#061024',fig:'#EEF1F6'},
  portada:'ogoshi', mov:MOV, niveles:NIVELES, bloques:bloques, pareja:true,
  intro:'De la postura, el agarre y las caídas hasta las cadenas de proyecciones en randori.'
};
})();
