/* =========================================================
   data-sambo.js — Sambo (de pie y suelo, con llaves de pierna)
   ========================================================= */
(function(){

const tuP={h:[104,64],fa:[121,70],n:[106,90],p:[104,170],sl:[110,102],el:[138,100],fl:[164,96],sr:[100,104],er:[128,114],fr:[154,124],kl:[118,214],tl:[134,262],kr:[80,214],tr:[62,262]};
const ukP={h:[190,64],fa:[173,70],n:[192,90],p:[196,170],sl:[188,102],el:[162,100],fl:[136,96],sr:[198,104],er:[172,114],fr:[146,124],kl:[186,214],tl:[172,262],kr:[218,214],tr:[230,262]};
const tuTira=P(tuP,{sl:[110,102],el:[132,108],fl:[152,118],sr:[100,104],er:[122,120],fr:[142,132],p:[100,172]});
const ukDes=P(SH(ukP,-10,4),{h:[180,72],fa:[163,82]});

const tuDer={h:[132,124],fa:[149,130],n:[124,146],p:[106,196],sl:[128,156],el:[156,176],fl:[182,188],sr:[120,158],er:[148,178],fr:[174,192],kl:[128,234],tl:[158,246],kr:[86,238],tr:[56,250]};
const ukDer=P(ukP,{h:[196,66],fa:[179,72],kl:[178,196],tl:[190,170]});
const tuDer2=P(tuDer,{p:[116,192],sl:[134,152],el:[162,168],fl:[188,176],sr:[126,154],er:[154,170],fr:[180,180]});
const ukDer2={h:[210,150],fa:[194,160],n:[208,174],p:[196,214],sl:[204,182],el:[182,190],fl:[158,192],sr:[212,184],er:[192,194],fr:[168,198],kl:[182,232],tl:[156,244],kr:[216,238],tr:[234,250]};
const ukDer3={h:[214,228],fa:[230,236],n:[190,238],p:[134,250],sl:[188,232],el:[164,218],fl:[140,208],sr:[186,236],er:[162,224],fr:[138,214],kl:[100,238],tl:[74,252],kr:[104,246],tr:[78,258]};
const tuDer3=P(tuP,{h:[112,70],fa:[129,76],p:[112,172],sl:[118,106],el:[144,122],fl:[170,136],sr:[108,108],er:[134,126],fr:[160,142]});

const tuEnt={h:[146,74],fa:[129,80],n:[140,98],p:[130,172],sl:[142,108],el:[170,104],fl:[196,100],sr:[134,110],er:[158,126],fr:[180,138],kl:[114,216],tl:[96,262],kr:[150,216],tr:[170,262]};
const ukEnt={h:[196,74],fa:[179,80],n:[194,98],p:[184,158],sl:[190,108],el:[166,116],fl:[140,120],sr:[198,110],er:[176,120],fr:[152,128],kl:[192,204],tl:[184,250],kr:[216,200],tr:[228,244]};
const tuPro={h:[122,106],fa:[105,114],n:[128,130],p:[138,184],sl:[130,138],el:[106,138],fl:[82,130],sr:[132,142],er:[110,148],fr:[86,142],kl:[128,222],tl:[112,264],kr:[158,220],tr:[176,262]};
const ukPro={h:[70,180],fa:[56,190],n:[92,168],p:[134,146],sl:[94,172],el:[84,198],fl:[78,224],sr:[96,164],er:[86,190],fr:[80,216],kl:[168,124],tl:[196,104],kr:[160,134],tr:[186,114]};
const ukSuelo={h:[46,234],fa:[32,242],n:[70,240],p:[126,250],sl:[72,234],el:[86,214],fl:[104,200],sr:[74,238],er:[92,222],fr:[112,208],kl:[156,236],tl:[180,254],kr:[152,244],tr:[178,258]};
const tuFin={h:[168,70],fa:[151,76],n:[172,96],p:[176,172],sl:[170,106],el:[148,124],fl:[122,140],sr:[178,108],er:[160,130],fr:[140,152],kl:[166,214],tl:[152,262],kr:[196,214],tr:[210,262]};

const ukeT={h:[200,228],fa:[216,236],n:[176,234],p:[130,248],sl:[174,228],el:[150,216],fl:[126,208],sr:[172,232],er:[148,222],fr:[124,214],kl:[88,240],tl:[58,234],kr:[104,250],tr:[76,256]};
const tuT={h:[40,180],fa:[57,186],n:[48,202],p:[64,236],sl:[52,210],el:[74,214],fl:[66,228],sr:[56,212],er:[78,216],fr:[70,232],kl:[96,244],tl:[126,248],kr:[84,252],tr:[114,256]};
const tuT2=P(SH(tuT,-4,-8),{fa:[49,174],fl:[62,222],fr:[66,226]});
const ukeT2=P(ukeT,{kl:[86,232],tl:[56,224],h:[202,224],fa:[218,232]});

const ukeSup={h:[188,230],fa:[204,236],n:[164,238],p:[104,248],sl:[162,230],el:[138,216],fl:[114,206],sr:[160,234],er:[136,222],fr:[112,212],kl:[70,212],tl:[44,240],kr:[74,218],tr:[48,246]};
const tuCtl={h:[104,150],fa:[121,156],n:[100,174],p:[86,212],sl:[106,182],el:[132,192],fl:[158,196],sr:[96,184],er:[122,194],fr:[148,200],kl:[62,232],tl:[34,244],kr:[92,240],tr:[62,252]};
const tuCtl2=P(SH(tuCtl,6,-6),{fa:[127,150]});

const tuSac={h:[76,214],fa:[93,218],n:[96,222],p:[136,238],sl:[98,216],el:[124,200],fl:[152,188],sr:[100,220],er:[126,206],fr:[154,194],kl:[168,196],tl:[190,176],kr:[162,220],tr:[186,238]};
const ukSac=P(ukP,{h:[178,96],fa:[161,104],n:[182,120],p:[196,172],sl:[180,128],el:[158,136],fl:[134,142],sr:[188,130],er:[166,140],fr:[142,146]});
const ukVuela={h:[64,152],fa:[48,158],n:[86,146],p:[130,130],sl:[88,152],el:[78,178],fl:[72,204],sr:[90,144],er:[80,170],fr:[74,196],kl:[164,110],tl:[192,92],kr:[156,120],tr:[184,102]};

const cStand=BASE.stand;
const cSit={h:[110,140],fa:[127,146],n:[108,164],p:[100,216],sl:[112,174],el:[140,178],fl:[166,176],sr:[102,176],er:[130,182],fr:[156,182],kl:[142,232],tl:[178,246],kr:[104,240],tr:[70,252]};
const cLado={h:[80,226],fa:[64,232],n:[104,234],p:[156,246],sl:[106,228],el:[126,212],fl:[148,202],sr:[108,232],er:[130,242],fr:[154,250],kl:[186,222],tl:[208,246],kr:[180,230],tr:[204,252]};

const MOV=[
 {id:'posturasambo',nom:'Postura y agarre',niv:1,dur:3,key:2,pareja:true,
  frames:[[tuP,0,ukP],[tuP,.18,ukP],[tuTira,.44,ukDes],[tuTira,.58,ukDes],[tuP,.88,ukP],[tuP,1,ukP]],
  claves:['Postura algo más baja y frontal que en judo: hay que defender las piernas.',
          'Agarra solapa y manga, o el cinturón si la chaqueta lo permite.',
          'Cambia de agarre constantemente: quien manda en el agarre manda en el combate.'],
  error:'Quedarte erguido y estático con las piernas juntas: es una invitación al derribo.'},

 {id:'caidas',nom:'Caídas',niv:1,dur:3.4,key:2,
  frames:[[cStand,0],[cSit,.28],[cLado,.5],[cLado,.64],[cSit,.84],[cStand,1]],
  claves:['Barbilla al pecho siempre: la cabeza no toca la colchoneta.',
          'Golpea con la palma y todo el brazo a 45°, un golpe seco y corto.',
          'Cae por el costado y rueda: nunca de plano sobre la espalda.'],
  error:'Poner la mano para frenar la caída: es la lesión más común del principiante.'},

 {id:'derribopierna',nom:'Derribo a una pierna',niv:1,dur:4,key:2,pareja:true,
  frames:[[tuP,0,ukP],[tuDer,.22,ukDer],[tuDer2,.44,ukDer2],[tuDer2,.56,ukDer2],[tuDer3,.74,ukDer3],[tuDer3,.88,ukDer3],[tuP,1,ukP]],
  claves:['Baja el nivel con las piernas y la espalda recta: el pecho nunca cae hacia adelante.',
          'Abraza la pierna pegándola a tu cuerpo, con la cabeza por el lado interno.',
          'Levanta con las piernas y gira: no tires de espaldas hacia atrás.'],
  error:'Lanzarte de cabeza a por la pierna: quedas con el cuello expuesto y sin control.'},

 {id:'proyeccioncadera',nom:'Proyección de cadera',niv:2,dur:4.4,key:3,pareja:true,
  frames:[[tuP,0,ukP],[tuEnt,.22,ukEnt],[tuPro,.46,ukPro],[tuPro,.58,ukPro],[tuFin,.74,ukSuelo],[tuFin,.88,ukSuelo],[tuP,1,ukP]],
  claves:['Rompe primero el equilibrio hacia adelante con solapa y manga.',
          'Gira metiendo la cadera por debajo de la suya, con los pies dentro de su base.',
          'Proyecta estirando las piernas y sin soltar la manga.'],
  error:'Cargar con la espalda doblada: pierdes la proyección y castigas la columna.'},

 {id:'llavetobillo',nom:'Llave de tobillo',niv:2,dur:3,key:2,pareja:true,
  frames:[[tuT,0,ukeT],[tuT,.2,ukeT],[tuT2,.44,ukeT2],[tuT2,.6,ukeT2],[tuT,.9,ukeT],[tuT,1,ukeT]],
  claves:['Controla primero su cadera con tus piernas: sin control no hay llave, solo forcejeo.',
          'El filo de tu antebrazo va bajo el tendón de Aquiles, no sobre el tobillo.',
          'Aprieta arqueando el pecho hacia atrás, despacio, y suelta al primer toque.'],
  error:'Aplicar con tirones rápidos: es la forma más fácil de lesionar al compañero.'},

 {id:'controlsuelo',nom:'Control en el suelo',niv:1,dur:3,key:1,pareja:true,
  frames:[[tuCtl,0,ukeSup],[tuCtl2,.4,ukeSup],[tuCtl2,.55,ukeSup],[tuCtl,.9,ukeSup],[tuCtl,1,ukeSup]],
  claves:['El peso del pecho sobre su esternón, las caderas bajas y las piernas abiertas como base.',
          'Un brazo controla el cuello y el otro pasa bajo su axila.',
          'Si se gira, cambia de lado por encima en vez de resistir con los brazos.'],
  error:'Apoyarte en las rodillas y los codos: le das espacio para girar y escapar.'},

 {id:'sacrificio',nom:'Técnica de sacrificio',niv:3,dur:4.4,key:2,pareja:true,
  frames:[[tuP,0,ukP],[tuSac,.24,ukSac],[tuSac,.36,ukVuela],[tuSac,.5,ukVuela],[tuCtl,.72,ukeSup],[tuCtl,.86,ukeSup],[tuP,1,ukP]],
  claves:['Tira de él hacia adelante y cae tú primero, sin soltar el agarre.',
          'El pie se apoya en su cadera, no en su estómago, y las piernas empujan hacia arriba.',
          'Sigue el giro y termina encima: la técnica no acaba con la caída.'],
  error:'Tirarte al suelo sin desequilibrio previo: le regalas la posición de arriba.'}
].concat(FISICO);

const CAL='Movilidad de cadera, hombros y cuello. Diez cambios de nivel y 20 giros de tronco.';
const FRIO='Estiramiento de cadera, isquiotibiales, espalda y cuello. Respira lento 2 min.';
const CAID={1:'Caídas laterales y hacia atrás, lentas, desde sentado y luego de pie.',
  2:'Caídas laterales de pie y rodada hacia adelante.',3:'Caídas desde derribos suaves del compañero.',
  4:'Caídas a ritmo real desde proyecciones completas.'};
const RAND={1:'Randori muy suave, solo agarres y cambios de nivel.',
  2:'Randori ligero: derribos sí, llaves no.',3:'Randori al 60 % con derribos y control en el suelo.',
  4:'Randori libre de pie y suelo, con llaves de pierna aplicadas despacio.'};
const R={1:{ca:2,pie:3,suelo:2,rand:1},2:{ca:2,pie:3,suelo:3,rand:2},3:{ca:2,pie:3,suelo:3,rand:3},4:{ca:2,pie:4,suelo:3,rand:4}};

const NIVELES=[
{id:1,nom:'Principiante',lema:'Postura, caídas, derribo y control',work:150,rest:45,ses:[
 {foco:'Postura y agarre',tec:['posturasambo'],drill:'Toma agarre, cambia de lado y rompe el suyo. 20 intercambios.',sombra:'Solo agarre y desplazamiento: nadie derriba.',extra:'3×30 s de plancha y 20 sentadillas.',solo:'Sin compañero: trabajo de manos y cambios de nivel en sombra.'},
 {foco:'Caídas',tec:['caidas'],drill:'20 caídas laterales por lado, de menos a más altura.',sombra:'El compañero te desequilibra suave y tú solo caes bien.',extra:'3×15 flexiones y 30 abdominales.',solo:'Se entrena entero sin compañero.'},
 {foco:'Derribo a una pierna',tec:['derribopierna'],drill:'15 entradas por lado bajando con las piernas, sin completar el derribo.',sombra:'Desde agarre: solo se busca la pierna.',extra:'4×20 s de rodillas altas.',solo:'Sin compañero: cambios de nivel y entradas en sombra.'},
 {foco:'Control en el suelo',tec:['controlsuelo'],drill:'Mantén el control 60 s mientras el compañero se mueve al 50 %.',sombra:'Empieza controlando: él escapa, tú conservas.',extra:'3×20 sentadillas y 30 s de plancha lateral.',solo:'Sin compañero: transiciones de control marcando el peso.'},
 {foco:'Prueba de nivel 1',tec:['posturasambo','derribopierna','controlsuelo'],drill:'Una ronda por cada fundamento del nivel.',sombra:'Randori suave de pie y suelo.',extra:'Estiramiento largo de cadera y espalda.',solo:'Caídas y entradas se hacen solas.'}]},

{id:2,nom:'Básico',lema:'Proyecciones y primeras llaves de pierna',work:180,rest:45,ses:[
 {foco:'Proyección de cadera',tec:['proyeccioncadera'],drill:'25 entradas de cadera por ronda sin proyectar.',sombra:'Desde agarre: solo proyección de cadera, con caída controlada.',extra:'3×20 sentadillas y 40 abdominales.',solo:'Sin compañero: entradas en sombra marcando la cadera.'},
 {foco:'De la proyección al control',tec:['proyeccioncadera','controlsuelo'],drill:'Proyecta y cae directo al control, 10 secuencias por lado.',sombra:'No vale la proyección si no terminas controlando.',extra:'4 min de cuerda.',solo:'Sin compañero: entrada, caída propia y colocación del control.'},
 {foco:'Llave de tobillo',tec:['llavetobillo'],drill:'12 entradas por lado aplicando muy despacio, soltando al primer toque.',sombra:'Situacional desde el suelo: solo llaves de pierna, con control previo.',extra:'3×30 s de plancha y 3×15 flexiones.',solo:'Sin compañero: colocación del antebrazo y del control de cadera en seco.'},
 {foco:'Derribo y llave',tec:['derribopierna','llavetobillo'],drill:'Derriba y entra a la pierna en la misma secuencia, 8 series.',sombra:'De pie al suelo sin pausa entre las dos fases.',extra:'4×20 s de burpees.',solo:'Sin compañero: secuencia completa en sombra.'},
 {foco:'Prueba de nivel 2',tec:['proyeccioncadera','llavetobillo'],drill:'Una ronda por técnica del nivel.',sombra:'Randori ligero de pie y suelo.',extra:'Estiramiento completo, 6 min.',solo:'Las entradas se hacen solas; el randori necesita compañero.'}]},

{id:3,nom:'Medio',lema:'Sacrificio, cadenas y defensa de piernas',work:180,rest:60,ses:[
 {foco:'Técnica de sacrificio',tec:['sacrificio'],drill:'12 entradas por ronda, cayendo tú primero y sin soltar el agarre.',sombra:'Desde agarre: solo sacrificio.',extra:'3×20 sentadillas y 3×30 s de plancha.',solo:'Sin compañero: caída de espaldas con control del pie de apoyo.'},
 {foco:'Encadenar de pie y suelo',tec:['sacrificio','llavetobillo'],drill:'Sacrificio, giro y llave de pierna en una sola secuencia. 8 series.',sombra:'La ronda no para al caer al suelo.',extra:'4 min de cuerda.',solo:'Sin compañero: secuencia marcada en sombra.'},
 {foco:'Defensa de llaves de pierna',tec:['llavetobillo'],drill:'Libera el pie girando hacia el dedo gordo, 15 salidas por lado.',sombra:'Él ataca las piernas; tú solo defiendes y sales.',extra:'3×15 flexiones y 40 abdominales.',solo:'Sin compañero: repite el giro de liberación despacio.'},
 {foco:'Randori con objetivo',tec:['derribopierna','proyeccioncadera'],drill:'Elige un derribo y búscalo durante toda la ronda.',sombra:'Randori al 60 % con el objetivo anunciado.',extra:'4×20 s de rodillas altas.',solo:'Necesita compañero.'},
 {foco:'Prueba de nivel 3',tec:['sacrificio','llavetobillo','controlsuelo'],drill:'Una ronda por técnica del nivel.',sombra:'Randori completo de pie y suelo.',extra:'Estiramiento completo, 6 min.',solo:'Las entradas se hacen solas.'}]},

{id:4,nom:'Avanzado',lema:'Agarre, contraataque y ritmo de competición',work:240,rest:60,ses:[
 {foco:'Guerra de agarres',tec:['posturasambo'],drill:'Consigue tu agarre y rompe el suyo, 20 intercambios por ronda.',sombra:'Randori solo de agarre y cambios de nivel.',extra:'5 min de cuerda.',solo:'Sin compañero: manos, nivel y desplazamiento con banda elástica.'},
 {foco:'Cadenas de ataque',tec:['derribopierna','proyeccioncadera','sacrificio'],drill:'Si falla el primer ataque, entra al segundo sin soltar. 10 cadenas.',sombra:'Prohibido soltar el agarre entre ataques.',extra:'4×20 s de burpees.',solo:'Sin compañero: cadenas de entradas en sombra.'},
 {foco:'Contra al derribo',tec:['derribopierna','controlsuelo'],drill:'Defiende la pierna, gira la cadera y pasa a control. 12 contras.',sombra:'Solo contraatacas: él entra, tú respondes.',extra:'3×40 s de plancha y 50 abdominales.',solo:'Sin compañero: defensas de cadera y giros en seco.'},
 {foco:'Randori largo',tec:['sacrificio','llavetobillo','controlsuelo'],drill:'Rondas completas de pie y suelo sin pausa.',sombra:'Randori libre al 70 %, cambiando de compañero si puedes.',extra:'5 min de cuerda.',solo:'Necesita compañero.'},
 {foco:'Prueba final',tec:['proyeccioncadera','sacrificio','llavetobillo','caidas'],drill:'Una ronda por técnica avanzada.',sombra:'Randori libre y revisión de lo que falló.',extra:'Estiramiento completo, 8 min.',solo:'Caídas y entradas se hacen solas.'}]}
];

function bloques(niv,s){
  const r=R[niv.id];
  return [
   {nom:'Calentamiento',txt:CAL,tipo:'libre',min:7,tec:['movilidad']},
   {nom:'Caídas',txt:CAID[niv.id],tipo:'rondas',rondas:r.ca,tec:['caidas']},
   {nom:'Técnica de pie',txt:s.drill+(s.solo?' · '+s.solo:''),tipo:'rondas',rondas:r.pie,tec:s.tec},
   {nom:'Técnica de suelo',txt:s.sombra,tipo:'rondas',rondas:r.suelo,tec:s.tec,pareja:true},
   {nom:'Randori',txt:RAND[niv.id],tipo:'rondas',rondas:r.rand,tec:s.tec,pareja:true},
   {nom:'Acondicionamiento',txt:s.extra,tipo:'libre',min:6,tec:ejsDe(s.extra)},
   {nom:'Enfriamiento',txt:FRIO,tipo:'libre',min:5,tec:['estiramiento']}
  ];
}

DISC.sambo={
  id:'sambo', nom:'Sambo', sub:'Derribos, proyecciones y llaves de pierna', emoji:'\u{1F93C}',
  tema:{wall:'#16255E',ink:'#070C24',fig:'#E23B2E'},
  portada:'derribopierna', mov:MOV, niveles:NIVELES, bloques:bloques, pareja:true,
  intro:'Agarre y caídas, derribos a las piernas, proyecciones y el trabajo de llaves de pierna.'
};
})();
