/* =========================================================
   data-muaythai.js — Muay Thai
   ========================================================= */
(function(){

/* ---------- posturas ---------- */
const TH={h:[118,58],n:[112,84],p:[106,164],sl:[114,96],el:[128,124],fl:[140,74],sr:[104,98],er:[84,126],fr:[116,78],kl:[128,208],tl:[150,262],kr:[80,210],tr:[56,262]};
const THb=SH(TH,0,-12,['tl','tr']);
const THc=SH(TH,7,-8,['tl','tr']);
const teepCh=P(TH,{h:[110,62],n:[106,88],p:[100,166],kl:[136,160],tl:[152,192],kr:[84,212],tr:[60,262],sl:[110,98],el:[124,126],fl:[132,78],sr:[100,100],er:[80,128],fr:[108,82]});
const teepX={h:[98,70],fa:[115,74],n:[96,96],p:[96,172],sl:[102,106],el:[86,132],fl:[70,150],sr:[92,108],er:[84,128],fr:[106,86],kl:[146,158],tl:[196,146],kr:[80,214],tr:[56,262]};
const lkW=P(TH,{p:[100,168],kr:[66,208],tr:[34,252],sl:[112,98],el:[142,108],fl:[164,84],sr:[102,100],er:[76,116],fr:[58,96]});
const lkX={h:[92,80],fa:[109,84],n:[96,104],p:[110,172],sl:[102,112],el:[120,88],fl:[126,62],sr:[94,114],er:[70,130],fr:[46,146],kl:[130,214],tl:[152,262],kr:[142,198],tr:[196,226]};
const rkX={h:[84,96],fa:[101,98],n:[90,118],p:[110,170],sl:[96,126],el:[114,102],fl:[120,76],sr:[88,128],er:[64,144],fr:[40,160],kl:[130,212],tl:[150,262],kr:[146,168],tr:[202,150]};
const knW=P(TH,{sl:[114,96],el:[144,104],fl:[172,112],sr:[104,98],er:[134,108],fr:[162,118],p:[108,166]});
const knX={h:[108,62],n:[108,88],p:[118,166],sl:[114,98],el:[142,126],fl:[148,150],sr:[104,100],er:[132,130],fr:[140,154],kl:[130,212],tl:[152,262],kr:[158,132],tr:[124,186]};
const coX={h:[122,66],n:[114,90],p:[112,168],sl:[120,98],el:[172,88],fl:[132,72],sr:[108,102],er:[88,132],fr:[124,106],kl:[136,208],tl:[158,258],kr:[80,208],tr:[58,250]};
const chX=P(TH,{h:[116,56],n:[110,82],p:[104,166],kl:[134,166],tl:[144,214],kr:[86,208],tr:[64,262],sl:[112,96],el:[126,120],fl:[138,70],sr:[102,98],er:[82,122],fr:[114,74]});
const clA={h:[104,64],n:[102,90],p:[100,168],sl:[108,100],el:[142,82],fl:[172,66],sr:[98,102],er:[132,86],fr:[164,72],kl:[118,212],tl:[132,262],kr:[78,212],tr:[58,262]};
const clB=P(clA,{p:[108,166],kr:[150,136],tr:[116,190],kl:[116,212],tl:[130,262]});
const ukC={h:[196,68],fa:[179,74],n:[198,94],p:[202,168],sl:[194,104],el:[170,116],fl:[146,124],sr:[202,106],er:[178,120],fr:[154,130],kl:[194,212],tl:[180,262],kr:[222,212],tr:[234,262]};
const ukC2=P(SH(ukC,0,6),{fa:[181,80]});

/* ---------- movimientos ---------- */
const MOV=[
 {id:'guardiathai',nom:'Guardia thai',niv:1,dur:1.5,key:0,
  frames:[[TH,0],[THb,.25],[TH,.5],[THc,.75],[TH,1]],
  claves:['Postura más alta y frontal que en boxeo: el peso vive en la pierna trasera.',
          'Manos altas y adelantadas, codos sueltos para poder bloquear con el antebrazo.',
          'Rebota ligero sobre la punta de los pies para poder levantar la espinilla en cualquier momento.'],
  error:'Cargar el peso en la pierna delantera: no podrás ni patear ni bloquear a tiempo.'},

 {id:'teep',nom:'Teep (patada frontal)',niv:1,dur:1.8,key:2,
  frames:[[TH,0],[teepCh,.18],[teepX,.34],[teepX,.44],[teepCh,.6],[TH,.78],[TH,1]],
  claves:['Primero sube la rodilla, después extiende: nunca patees con la pierna estirada desde abajo.',
          'Empuja con la planta del pie, no con la punta, como si dieras un empujón.',
          'Recoge la pierna por la misma línea antes de apoyar.'],
  error:'Lanzar el teep como un puntapié de fútbol, sin levantar la rodilla primero.'},

 {id:'lowkick',nom:'Patada baja',niv:1,dur:1.9,key:2,
  frames:[[TH,0],[lkW,.16],[lkX,.34],[lkX,.44],[lkW,.58],[TH,.8],[TH,1]],
  claves:['Gira el pie de apoyo 90°: sin ese giro la cadera no pasa.',
          'Impacta con la espinilla, no con el empeine, apuntando al muslo.',
          'El brazo del mismo lado cae hacia atrás para acelerar el giro.'],
  error:'Patear con la rodilla doblada y el pie de apoyo clavado: pierdes potencia y castigas la rodilla.'},

 {id:'roundkick',nom:'Round kick medio',niv:2,dur:2,key:2,
  frames:[[TH,0],[lkW,.16],[rkX,.34],[rkX,.44],[lkW,.58],[TH,.8],[TH,1]],
  claves:['La patada sube en diagonal desde la cadera, como un bate: no es un latigazo de rodilla.',
          'Inclina el torso hacia atrás para elevar la pierna sin perder la base.',
          'Si falla, deja que el giro te dé la vuelta en lugar de frenarlo.'],
  error:'Quedarte erguido y levantar solo la pierna: la patada llega sin peso detrás.'},

 {id:'rodillazo',nom:'Rodillazo recto',niv:2,dur:1.7,key:2,
  frames:[[TH,0],[knW,.18],[knX,.34],[knX,.44],[knW,.58],[TH,.8],[TH,1]],
  claves:['Tira de la guardia del rival hacia abajo mientras la rodilla sube.',
          'Empuja la cadera hacia adelante en el impacto y apunta con la punta de la rodilla.',
          'El pie de apoyo pivota ligeramente hacia afuera.'],
  error:'Subir la rodilla sin adelantar la cadera: se convierte en un empujón suave.'},

 {id:'codo',nom:'Codazo horizontal',niv:3,dur:1.6,key:2,
  frames:[[TH,0],[coX,.22],[coX,.34],[TH,.55],[TH,1]],
  claves:['El codo viaja primero: la mano solo acompaña, cerca de tu propia cabeza.',
          'Distancia corta: si tienes que estirarte, estás demasiado lejos.',
          'Gira el tronco y termina protegido, con el hombro cubriendo el mentón.'],
  error:'Lanzar el codo con el brazo extendido, como un gancho: pierde el filo y te descubre.'},

 {id:'check',nom:'Bloqueo con espinilla',niv:2,dur:1.6,key:1,
  frames:[[TH,0],[chX,.24],[chX,.42],[TH,.64],[TH,1]],
  claves:['Levanta la rodilla y gira la espinilla hacia afuera, hueso contra hueso.',
          'Las manos no bajan: el bloqueo es de pierna, no de brazo.',
          'Apoya de inmediato para poder responder con la misma pierna.'],
  error:'Bloquear con el muslo o con la pierna floja: duele más a ti que al que patea.'},

 {id:'clinch',nom:'Clinch y rodilla',niv:3,dur:2.6,key:2,pareja:true,
  frames:[[clA,0,ukC],[clA,.2,ukC],[clB,.4,ukC2],[clB,.52,ukC2],[clA,.72,ukC],[clA,1,ukC]],
  claves:['Manos en la nuca, una sobre otra, codos cerrados apretando la cabeza hacia abajo.',
          'Pega tu pecho al suyo y rompe su postura antes de golpear.',
          'La rodilla sube mientras tiras hacia abajo: los dos movimientos son uno solo.'],
  error:'Agarrar por los hombros con los codos abiertos: te controlan a ti.'},

 {id:'sombrathai',nom:'Sombra thai completa',niv:0,cat:'Sombra',dur:5.4,key:3,
  frames:[[TH,0],[teepCh,.08],[teepX,.15],[TH,.26],[lkW,.34],[rkX,.44],[TH,.56],[knW,.62],[knX,.7],[TH,.8],[coX,.88],[TH,1]],
  claves:['Alterna las cuatro armas: puños, codos, rodillas y patadas.',
          'Cada serie cambia de altura: una arriba, una a la pierna, una al centro.',
          'Después de patear, vuelve a la guardia antes de dar un paso.'],
  error:'Encadenar patadas sin manos: en muay thai las manos abren el camino.'}
].concat(FISICO);

/* ---------- niveles y sesiones ---------- */
const CAL='Movilidad de cadera, tobillos y hombros. 20 elevaciones de rodilla por pierna y giros de tronco.';
const FRIO='Estiramiento de cadera, aductores, isquiotibiales y gemelos. Respira lento 2 min.';
const CUERDA={1:'Salto básico a ritmo cómodo. Si no tienes cuerda, salta simulando el giro con las muñecas.',
  2:'Alterna 30 s de salto básico y 30 s de paso alterno.',3:'Termina cada ronda con 20 s de rodillas altas.',
  4:'Cambios de ritmo: 20 s rápido, 40 s de recuperación sin parar la cuerda.'};
const SPAR={1:'Rival que solo avanza: párale con el teep y sal por un lado.',
  2:'Rival que lanza puños: bloquea, sale del centro y responde con patada media.',
  3:'Rival que busca el clinch: controla la nuca, mete rodilla y sal girando.',
  4:'Rival de tu nivel: ritmo de pelea, cambios de altura y contraataque inmediato.'};
const R={1:{cuerda:2,tec:3,sombra:2,spar:1},2:{cuerda:2,tec:3,sombra:3,spar:2},3:{cuerda:3,tec:3,sombra:3,spar:3},4:{cuerda:3,tec:4,sombra:4,spar:4}};

const NIVELES=[
{id:1,nom:'Principiante',lema:'Guardia alta, teep y patada baja',work:120,rest:45,ses:[
 {foco:'Guardia y desplazamiento',tec:['guardiathai'],drill:'30 s en guardia alta y 30 s desplazándote en cuadrado, sin cruzar los pies.',sombra:'Muévete en guardia buscando ángulos, todavía sin golpear.',extra:'3×30 s de plancha y 20 sentadillas.'},
 {foco:'Teep de pierna delantera',tec:['teep'],drill:'15 teeps por ronda: rodilla arriba, empuja con la planta y recoge.',sombra:'Un teep cada vez que sientas que el rival se acerca.',extra:'2 min de cuerda y 20 zancadas por pierna.'},
 {foco:'Patada baja',tec:['lowkick'],drill:'12 patadas bajas por ronda girando el pie de apoyo 90°.',sombra:'Alterna teep y patada baja según la distancia.',extra:'3×15 flexiones y 30 abdominales.'},
 {foco:'Patear y salir',tec:['teep','guardiathai'],drill:'Teep, dos pasos atrás y vuelve a entrar con teep.',sombra:'Nunca te quedes plantado después de patear.',extra:'3×20 sentadillas y 30 s de plancha lateral por lado.'},
 {foco:'Prueba de nivel 1',tec:['guardiathai','teep','lowkick'],drill:'Una ronda por cada fundamento del nivel.',sombra:'Rondas libres con guardia, teep y patada baja.',extra:'Estiramiento largo de cadera, aductores y gemelos.'}]},

{id:2,nom:'Básico',lema:'Patada media, rodillas y bloqueo',work:150,rest:45,ses:[
 {foco:'Round kick medio',tec:['roundkick'],drill:'12 patadas medias por ronda: gira la cadera y deja caer el brazo.',sombra:'Una patada media al final de cada serie de puños.',extra:'3 min de cuerda y 3×20 s de plancha.'},
 {foco:'Bloqueo con espinilla',tec:['check'],drill:'20 bloqueos por ronda alternando pierna, sin bajar las manos.',sombra:'Bloquea una patada imaginaria cada cinco segundos.',extra:'3×20 sentadillas y 40 abdominales.'},
 {foco:'Rodillazo recto',tec:['rodillazo'],drill:'15 rodillazos por ronda tirando de la guardia imaginaria hacia abajo.',sombra:'Entra con puños y termina en rodillazo.',extra:'4×20 s de rodillas altas.'},
 {foco:'Manos y patada',tec:['roundkick','lowkick'],drill:'Dos puños y patada, 10 series por ronda, cambiando de altura.',sombra:'Nunca patees sin antes tocar con las manos.',extra:'3 min de cuerda y 3×15 flexiones.'},
 {foco:'Prueba de nivel 2',tec:['roundkick','check','rodillazo'],drill:'Una ronda por cada técnica nueva.',sombra:'Rondas libres con todo el repertorio.',extra:'Estiramiento completo, 6 min.'}]},

{id:3,nom:'Medio',lema:'Codos, clinch y series completas',work:180,rest:60,ses:[
 {foco:'Codazo horizontal',tec:['codo'],drill:'12 codazos por ronda girando desde la cadera, a distancia corta.',sombra:'Cierra la distancia y termina siempre en codo.',extra:'3×20 sentadillas y 3×30 s de plancha.'},
 {foco:'Clinch: control de nuca',tec:['clinch'],drill:'Entra al clinch, controla la nuca 10 s y sal. Ocho entradas por ronda.',sombra:'Simula entradas al clinch con pasos cortos.',extra:'4 min de cuerda.'},
 {foco:'Rodillas desde el clinch',tec:['clinch','rodillazo'],drill:'Cinco rodillas alternas por cada entrada al clinch.',sombra:'Clinch, rodillas y salida lateral.',extra:'4×20 s de burpees.'},
 {foco:'Puño, patada y codo',tec:['codo','roundkick'],drill:'Series de cuatro impactos cambiando de altura y de distancia.',sombra:'Cada serie termina más cerca que la anterior.',extra:'3×15 flexiones y 40 abdominales.'},
 {foco:'Prueba de nivel 3',tec:['codo','clinch','rodillazo'],drill:'Una ronda por cada técnica del nivel.',sombra:'Rondas libres con clinch obligatorio.',extra:'Estiramiento completo, 6 min.'}]},

{id:4,nom:'Avanzado',lema:'Contraataque, giros y ritmo de pelea',work:180,rest:45,ses:[
 {foco:'Contra con teep',tec:['teep','check'],drill:'Teep de intercepción cada vez que el rival avanza, 15 por ronda.',sombra:'Solo contraatacas: nunca inicias tú.',extra:'5 min de cuerda.'},
 {foco:'Responder patada con patada',tec:['check','roundkick'],drill:'Bloquea y devuelve la patada en el mismo tiempo, sin apoyar entre medias.',sombra:'Después de cada bloqueo, una respuesta obligatoria.',extra:'4×30 s de rodillas altas.'},
 {foco:'Clinch con giros',tec:['clinch'],drill:'Gira al rival en el clinch y sal por el ángulo, 10 giros por ronda.',sombra:'Entradas, giros y salidas encadenadas.',extra:'3×40 s de plancha.'},
 {foco:'Series largas',tec:['codo','rodillazo','roundkick'],drill:'Puño-puño-rodilla-codo-patada sin perder la base, 8 series por ronda.',sombra:'Ritmo de pelea con cambios de nivel constantes.',extra:'4×20 s de burpees y 50 abdominales.'},
 {foco:'Prueba final',tec:['teep','roundkick','clinch','codo'],drill:'Una ronda por técnica avanzada, a velocidad real.',sombra:'Rondas libres con una intención distinta en cada una.',extra:'Estiramiento completo, 8 min.'}]}
];

function bloques(niv,s){
  const r=R[niv.id];
  return [
   {nom:'Calentamiento',txt:CAL,tipo:'libre',min:6,tec:['movilidad']},
   {nom:'Cuerda',txt:CUERDA[niv.id],tipo:'rondas',rondas:r.cuerda,tec:['cuerda']},
   {nom:'Técnica',txt:s.drill,tipo:'rondas',rondas:r.tec,tec:s.tec},
   {nom:'Sombra',txt:s.sombra,tipo:'rondas',rondas:r.sombra,tec:s.tec},
   {nom:'Sparring de sombra',txt:SPAR[niv.id],tipo:'rondas',rondas:r.spar,tec:['sombrathai']},
   {nom:'Acondicionamiento',txt:s.extra,tipo:'libre',min:6,tec:ejsDe(s.extra)},
   {nom:'Enfriamiento',txt:FRIO,tipo:'libre',min:5,tec:['estiramiento']}
  ];
}

DISC.muaythai={
  id:'muaythai', nom:'Muay Thai', sub:'Ocho armas: puños, codos, rodillas y patadas', emoji:'\u{1F9B5}',
  tema:{wall:'#7C1122',ink:'#2A040B',fig:'#F2B33D'},
  portada:'roundkick', mov:MOV, niveles:NIVELES, bloques:bloques,
  intro:'De la guardia alta y el teep hasta el clinch, los codos y el contraataque.'
};
})();
