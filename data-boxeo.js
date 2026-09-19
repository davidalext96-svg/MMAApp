/* =========================================================
   data-boxeo.js — Boxeo: movimientos, niveles y sesiones
   ========================================================= */
(function(){
const POSE={
  guard:G,
  bounce:SH(G,0,-14,['tl','tr']),
  bounce2:SH(G,6,-9,['tl','tr']),
  jab:P(G,{h:[126,60],n:[118,86],p:[108,166],sl:[124,96],el:[160,92],fl:[198,88],
           kl:[136,210],tl:[156,262],kr:[74,212],tr:[48,260]}),
  jabHalf:P(G,{h:[123,61],n:[115,87],p:[106,167],sl:[120,98],el:[146,100],fl:[168,92]}),
  cross:P(G,{h:[124,62],n:[118,86],p:[114,166],sr:[122,98],er:[160,94],fr:[200,90],
             sl:[112,104],el:[126,136],fl:[128,102],kl:[138,210],tl:[158,262],kr:[82,208],tr:[58,252]}),
  hook:P(G,{h:[120,64],n:[114,88],p:[112,167],sl:[120,96],el:[162,96],fl:[150,64],
            sr:[110,102],er:[88,130],fr:[112,98],kl:[138,208],tl:[160,258],kr:[80,206],tr:[58,248]}),
  hookBody:P(G,{h:[122,88],n:[116,110],p:[110,182],sl:[122,116],el:[160,126],fl:[184,142],
            sr:[112,122],er:[94,152],fr:[126,124],kl:[136,224],tl:[158,266],kr:[78,224],tr:[56,262]}),
  upDip:P(G,{h:[114,78],n:[108,102],p:[102,178],sr:[102,114],er:[92,150],fr:[114,142],
             sl:[112,112],el:[130,142],fl:[134,110],kl:[128,220],tl:[152,264],kr:[70,222],tr:[46,264]}),
  upper:P(G,{h:[124,60],n:[118,84],p:[114,164],sr:[122,96],er:[140,126],fr:[160,70],
             sl:[112,100],el:[124,132],fl:[126,98],kl:[138,208],tl:[158,260],kr:[82,206],tr:[58,252]}),
  slip:P(G,{h:[140,78],n:[126,96],p:[108,172],sl:[122,106],el:[140,134],fl:[150,100],
            sr:[112,108],er:[92,138],fr:[130,110],kl:[134,214],kr:[72,216]}),
  dip:P(G,{h:[118,104],n:[112,124],p:[102,186],sl:[116,130],el:[138,152],fl:[140,116],
           sr:[106,134],er:[92,158],fr:[126,120],kl:[130,226],tl:[152,264],kr:[70,228],tr:[48,264]}),
  weave:P(G,{h:[134,74],n:[124,94],p:[108,172],sl:[120,104],el:[138,130],fl:[146,96],
             sr:[110,106],er:[90,136],fr:[128,108],kl:[136,214],tl:[158,262],kr:[74,216],tr:[50,262]}),
  fwd1:P(SH(G,6,0,['kl','tl','kr','tr']),{kl:[146,212],tl:[176,262]}),
  fwd2:P(SH(G,12,0,['kl','tl','kr','tr']),{kl:[150,212],tl:[178,262],kr:[86,214],tr:[62,262]}),
  back1:P(SH(G,-6,0,['kl','tl','kr','tr']),{kr:[62,214],tr:[30,262]}),
  back2:P(SH(G,-12,0,['kl','tl','kr','tr']),{kr:[58,214],tr:[28,262],kl:[116,212],tl:[138,262]}),
  crouch:SH(G,0,14,['tl','tr'])
};

/* frames = [[pose, tiempo 0..1], ...] */
const strike=p=>[[POSE.guard,0],[p,.20],[p,.33],[POSE.guard,.52],[POSE.guard,1]];
function combo(list,pause){
  pause=pause||.26; const per=(1-pause)/list.length, f=[[POSE.guard,0]];
  list.forEach((p,i)=>{const s=i*per;f.push([p,s+per*.32],[p,s+per*.5],[POSE.guard,s+per*.88]);});
  f.push([POSE.guard,1]); return f;
}

/* ===================== TÉCNICAS ===================== */
const TEC=[
 {id:'guardia',key:0,nom:'Guardia y postura',niv:1,dur:1.5,
  frames:[[POSE.guard,0],[POSE.bounce,.25],[POSE.guard,.5],[POSE.bounce2,.75],[POSE.guard,1]],
  claves:['Pie adelantado el del lado menos hábil; el otro un paso atrás y en diagonal.',
          'Mentón hacia el pecho, hombros sueltos, codos cerrados sobre las costillas.',
          'Rodillas algo flexionadas, peso repartido y talón trasero despegado.'],
  error:'Quedarte plano y rígido. Si no puedes levantar un pie sin tambalearte, la base está mal.'},

 {id:'paso',key:2,nom:'Paso-arrastre',niv:1,dur:3.4,
  frames:[[POSE.guard,0],[POSE.fwd1,.18],[POSE.fwd2,.34],[POSE.fwd2,.44],[POSE.fwd1,.62],[POSE.guard,.8],[POSE.guard,1]],
  claves:['El pie más cercano a la dirección sale primero; el otro lo arrastra detrás.',
          'Nunca cruces los pies ni juntes los talones.',
          'Desplázate sin subir y bajar la cabeza: la mirada viaja a la misma altura.'],
  error:'Saltar con los dos pies a la vez: durante ese instante no puedes ni pegar ni defender.'},

 {id:'jab',niv:1,nom:'Jab',dur:1.5,frames:strike(POSE.jab),
  claves:['Sale desde la barbilla en línea recta; el puño gira al final del recorrido.',
          'El hombro sube y cubre el mentón en el momento del impacto.',
          'Regresa por la misma línea, más rápido de lo que salió.'],
  error:'Bajar o echar atrás la mano antes de golpear para tomar impulso.'},

 {id:'cross',niv:1,nom:'Directo de derecha',dur:1.6,frames:strike(POSE.cross),
  claves:['Empuja el suelo con el pie trasero y gira talón, cadera y hombro en ese orden.',
          'La mano adelantada se queda pegada a la mejilla.',
          'El puño viaja recto: no describe curva ni sale de afuera.'],
  error:'Golpear solo con el brazo. Sin giro de cadera no hay potencia, solo ruido.'},

 {id:'salida',key:2,niv:1,nom:'Salida atrás',dur:3,
  frames:[[POSE.guard,0],[POSE.back1,.2],[POSE.back2,.38],[POSE.back2,.5],[POSE.back1,.68],[POSE.guard,.86],[POSE.guard,1]],
  claves:['El pie trasero sale primero y el delantero lo sigue de inmediato.',
          'Sales en guardia: ni de espaldas ni con las manos abajo.',
          'Dos pasos y vuelve a fijar la mirada al frente.'],
  error:'Retroceder en línea recta demasiado tiempo: te quedas sin espacio y sin salida.'},

 {id:'doblejab',niv:2,nom:'Doble jab',dur:2,
  frames:[[POSE.guard,0],[POSE.jab,.14],[POSE.jabHalf,.26],[POSE.jab,.38],[POSE.jab,.46],[POSE.guard,.62],[POSE.guard,1]],
  claves:['El primero mide la distancia, el segundo es el que golpea.',
          'No retraigas del todo entre uno y otro: medio camino y vuelve a salir.',
          'Acompaña el segundo con medio paso adelante.'],
  error:'Lanzar dos jabs idénticos y lentos: pierden todo el efecto sorpresa.'},

 {id:'gancho',niv:2,nom:'Gancho de izquierda',dur:1.7,frames:strike(POSE.hook),
  claves:['Codo a la altura del puño y antebrazo paralelo al suelo.',
          'El giro nace del pie delantero: pivota sobre la punta.',
          'Es un golpe corto: si el brazo se estira, ya no es gancho.'],
  error:'Abrir el brazo y lanzar un manotazo amplio desde afuera.'},

 {id:'uppercut',key:2,niv:2,nom:'Uppercut',dur:1.8,
  frames:[[POSE.guard,0],[POSE.upDip,.18],[POSE.upper,.34],[POSE.upper,.44],[POSE.guard,.62],[POSE.guard,1]],
  claves:['Flexiona un poco las rodillas y baja el hombro del brazo que golpea.',
          'El puño sube desde la cadera con la palma hacia ti.',
          'El codo permanece cerca del cuerpo durante todo el recorrido.'],
  error:'Agacharte demasiado y dejar la cabeza dentro de la línea de fuego.'},

 {id:'unodos',niv:2,nom:'Combinación 1-2',dur:2.6,frames:combo([POSE.jab,POSE.cross]),
  claves:['El cross sale mientras el jab vuelve: se cruzan a mitad de camino.',
          'Los pies no se mueven entre un golpe y otro.',
          'Termina en guardia, no admirando el golpe.'],
  error:'Esperar a que el jab regrese del todo antes de tirar el cross.'},

 {id:'slip',niv:2,nom:'Esquiva lateral',dur:2.2,
  frames:[[POSE.guard,0],[POSE.slip,.22],[POSE.slip,.4],[POSE.guard,.62],[POSE.guard,1]],
  claves:['Saca la cabeza de la línea girando la cintura, no inclinando el cuello.',
          'Los ojos siguen al frente durante toda la esquiva.',
          'Quedas con el peso cargado y listo para contragolpear.'],
  error:'Cerrar los ojos o echar la cabeza hacia atrás.'},

 {id:'bob',niv:3,nom:'Bob & weave',dur:2.6,
  frames:[[POSE.guard,0],[POSE.dip,.24],[POSE.weave,.46],[POSE.weave,.56],[POSE.guard,.76],[POSE.guard,1]],
  claves:['Bajas flexionando rodillas, nunca doblando la espalda.',
          'Dibuja una U: bajas, pasas por debajo y subes al otro lado.',
          'Las manos se quedan arriba todo el recorrido.'],
  error:'Subir en el mismo punto donde bajaste: sigues dentro de la línea de tiro.'},

 {id:'pivote',key:0,niv:3,nom:'Pivote',dur:2.8,rot:[0,-26,-26,0],rotPivot:[154,262],
  frames:[[POSE.guard,0],[POSE.guard,.35],[POSE.guard,.6],[POSE.guard,1]],
  claves:['Gira sobre la punta del pie delantero.',
          'El pie trasero barre el suelo describiendo un arco.',
          'Cambias de ángulo sin cambiar la distancia.'],
  error:'Pivotar con el peso en el talón: te frena y te desequilibra.'},

 {id:'cuerpo',key:2,niv:3,nom:'Gancho al cuerpo',dur:1.9,
  frames:[[POSE.guard,0],[POSE.crouch,.14],[POSE.hookBody,.3],[POSE.hookBody,.42],[POSE.guard,.64],[POSE.guard,1]],
  claves:['Flexiona las piernas para bajar el nivel; el torso se mantiene erguido.',
          'Apunta justo bajo las costillas, no a la cadera.',
          'Sube golpeando, no quedándote quieto abajo.'],
  error:'Agacharte doblando la cintura y dejar la cabeza expuesta.'},

 {id:'unodostres',niv:3,nom:'Combinación 1-2-3',dur:3.2,frames:combo([POSE.jab,POSE.cross,POSE.hook]),
  claves:['Jab, cross y gancho: la cadera gira en un sentido y luego en el contrario.',
          'El gancho aprovecha el regreso de la cadera del cross.',
          'Exhala corto en cada impacto, una respiración por combinación.'],
  error:'Acelerar tanto que los tres golpes terminan saliendo del mismo sitio.'},

 {id:'contra',key:3,niv:3,nom:'Contragolpe tras esquiva',dur:2.6,
  frames:[[POSE.guard,0],[POSE.slip,.18],[POSE.slip,.28],[POSE.cross,.44],[POSE.cross,.54],[POSE.guard,.72],[POSE.guard,1]],
  claves:['La esquiva carga el peso en la pierna trasera: de ahí nace el cross.',
          'Contragolpea en el mismo tiempo, sin pausa entre esquivar y pegar.',
          'Sale un golpe, no tres. Y vuelves a guardia.'],
  error:'Esquivar bien y quedarte mirando en lugar de responder.'},

 {id:'finta',key:3,niv:4,nom:'Finta y cruzado',dur:2.8,
  frames:[[POSE.guard,0],[POSE.jabHalf,.16],[POSE.guard,.3],[POSE.cross,.46],[POSE.cross,.56],[POSE.guard,.74],[POSE.guard,1]],
  claves:['Insinúa el golpe con hombro y mirada, no con el brazo entero.',
          'La finta debe parecerse al golpe real en los primeros centímetros.',
          'Cambia el ritmo: finta lenta, golpe rápido.'],
  error:'Fintar siempre igual y en el mismo momento: te vuelves predecible.'},

 {id:'checkhook',niv:4,nom:'Check hook',dur:2.4,rot:[0,0,-30,-30,0],rotPivot:[154,262],
  frames:[[POSE.guard,0],[POSE.hook,.22],[POSE.hook,.36],[POSE.guard,.56],[POSE.guard,1]],
  claves:['Lanzas el gancho mientras pivotas hacia afuera, no después.',
          'El peso pasa al pie delantero y el trasero barre hacia atrás.',
          'Terminas mirando al rival desde un ángulo nuevo.'],
  error:'Pivotar primero y golpear después: pierdes el tiempo del contragolpe.'},

 {id:'largo',niv:4,nom:'1-2-3-2 al cuerpo',dur:4,frames:combo([POSE.jab,POSE.cross,POSE.hook,POSE.hookBody],.2),
  claves:['Alterna alturas: tres golpes arriba y el último abajo.',
          'Los pies se reacomodan entre el tercer y el cuarto golpe.',
          'Un soplido corto por golpe; no aguantes la respiración.'],
  error:'Terminar la combinación con las manos abajo y sin salida preparada.'}
];

const SPAR_MOV=
{id:'sparring',nom:'Sparring de sombra',niv:0,cat:'Sombra',dur:5,key:2,
  frames:[[POSE.guard,0],[POSE.fwd1,.10],[POSE.jab,.20],[POSE.jab,.26],[POSE.fwd1,.34],[POSE.cross,.44],[POSE.cross,.50],[POSE.guard,.58],[POSE.slip,.66],[POSE.hook,.76],[POSE.hook,.82],[POSE.back1,.90],[POSE.guard,1]],
  claves:['Imagina un rival concreto: su altura, su guardia y su golpe favorito.','Ataca, defiende y sal: nunca te quedes plantado después de golpear.','Trabaja a ritmo de pelea, sin frenar entre una acción y la siguiente.'],
  error:'Golpear al aire sin intención ni distancia: deja de ser boxeo y pasa a ser gimnasia.'};
const MOV=TEC.concat([SPAR_MOV]).concat(FISICO);
const CAL={1:'Movilidad de cuello, hombros y cadera. Círculos de brazos y 20 giros de muñeca por lado.',
           2:'Movilidad articular completa, círculos de brazos y 20 rotaciones de tronco.',
           3:'Movilidad de hombros, cadera y tobillo; termina con 30 s de sombra muy lenta.',
           4:'Movilidad completa con círculos amplios y una ronda de sombra progresiva para activar.'};
const CUERDA={1:'Salto básico con los dos pies, ritmo cómodo. Si no tienes cuerda, salta igual simulando el giro con las muñecas.',
              2:'Alterna 30 s de salto básico y 30 s de paso alterno (como trotando).',
              3:'Salto básico y, en los últimos 20 s de cada ronda, rodillas altas.',
              4:'Cambios de ritmo: 20 s a máxima velocidad y 40 s de recuperación, sin parar la cuerda.'};
const SPAR={1:'Rival imaginario que solo lanza jab: muévete, esquiva y responde con jab o 1-2.',
            2:'Rival que ataca con 1-2: defiende y responde con tu combinación del día.',
            3:'Rival que presiona y va al cuerpo: usa bob & weave, pivote y contragolpea.',
            4:'Rival de tu nivel: ritmo de pelea real, fintas, cambios de ángulo y series largas.'};
const RONDAS={1:{cuerda:2,tec:3,sombra:2,spar:1},2:{cuerda:2,tec:3,sombra:3,spar:2},
              3:{cuerda:3,tec:3,sombra:3,spar:3},4:{cuerda:3,tec:4,sombra:4,spar:4}};

const FRIO='Estiramiento de hombros, pectoral, cadera y gemelos. Respiración lenta durante 2 min.';

const NIVELES=[
{id:1,nom:'Principiante',lema:'Base, guardia y los dos golpes rectos',work:120,rest:45,rounds:3,ses:[
 {foco:'Guardia y base',tec:['guardia'],drill:'30 s en guardia perfecta, 15 s de pausa. Revisa mentón, codos y peso en cada repetición.',sombra:'Solo guardia y respiración: muévete lo mínimo y mantén la forma.',extra:'3×30 s de plancha y 20 sentadillas.'},
 {foco:'Paso-arrastre',tec:['paso','guardia'],drill:'10 pasos adelante y 10 atrás por ronda, sin cruzar nunca los pies.',sombra:'Recorre los cuatro lados de un ring imaginario.',extra:'2 min de cuerda y 20 zancadas por pierna.'},
 {foco:'El jab',tec:['jab'],drill:'20 jabs por ronda, uno cada 3 s. Prioriza el regreso a la barbilla.',sombra:'Jab suelto, sin buscar potencia.',extra:'3×15 flexiones.'},
 {foco:'Jab en movimiento',tec:['jab','paso'],drill:'Paso adelante y jab; paso atrás y jab. Alterna en cada repetición.',sombra:'Un jab cada vez que avances: nada de quedarte quieto.',extra:'2 min de cuerda y 30 s de plancha lateral por lado.'},
 {foco:'Directo de derecha',tec:['cross'],drill:'15 cross por ronda, lentos, vigilando el giro del talón trasero.',sombra:'Alterna jab y cross, todavía sin encadenarlos.',extra:'3×12 flexiones y 20 abdominales.'},
 {foco:'Cadera y potencia',tec:['cross','guardia'],drill:'Cross a media velocidad contando: talón, cadera, hombro, puño.',sombra:'Un cross cada cinco segundos, con toda la mecánica.',extra:'3×20 sentadillas.'},
 {foco:'Entrar y salir',tec:['salida','jab'],drill:'Jab, dos pasos atrás y vuelve a entrar con jab.',sombra:'Nunca más de tres segundos en el mismo sitio.',extra:'2 min de cuerda y 3×30 s de plancha.'},
 {foco:'Prueba de nivel 1',tec:['guardia','jab','cross','paso'],drill:'Repasa los cuatro fundamentos, una ronda por cada uno.',sombra:'Rondas libres usando solo jab, cross y desplazamiento.',extra:'Estiramiento largo de hombros, cadera y gemelos.'}]},

{id:2,nom:'Básico',lema:'Golpes curvos, primeras combinaciones y esquiva',work:150,rest:45,rounds:3,ses:[
 {foco:'Doble jab',tec:['doblejab'],drill:'12 dobles jabs por ronda; el segundo con medio paso adelante.',sombra:'Doble jab para entrar, paso atrás para salir.',extra:'3 min de cuerda y 3×20 s de plancha.'},
 {foco:'Combinación 1-2',tec:['unodos'],drill:'15 combinaciones 1-2 por ronda sin mover los pies.',sombra:'Un 1-2 cada vez que cierres distancia.',extra:'3×15 flexiones y 30 abdominales.'},
 {foco:'Gancho',tec:['gancho'],drill:'12 ganchos por ronda pivotando sobre el pie delantero.',sombra:'Jab y gancho alternados, vigilando que el codo no se abra.',extra:'3×20 sentadillas y 30 s de plancha lateral.'},
 {foco:'Uppercut',tec:['uppercut'],drill:'12 uppercuts por ronda, subiendo desde las rodillas.',sombra:'Uppercut después del 1-2, a media distancia.',extra:'3 min de cuerda.'},
 {foco:'Entrar con 1-2 y salir',tec:['unodos','salida'],drill:'1-2 y salida inmediata en dos pasos.',sombra:'Golpea y sal: nunca te quedes después de la combinación.',extra:'4×20 s de rodillas altas.'},
 {foco:'Esquiva lateral',tec:['slip'],drill:'20 esquivas por ronda alternando lados, con la guardia intacta.',sombra:'Esquiva imaginando un jab que entra cada cinco segundos.',extra:'3×30 s de plancha y 20 abdominales.'},
 {foco:'Esquivar y responder',tec:['slip','unodos'],drill:'Esquiva y responde con 1-2 en el mismo tiempo.',sombra:'Por cada esquiva, una respuesta. Sin excepción.',extra:'3 min de cuerda y estiramiento de cadera.'},
 {foco:'Prueba de nivel 2',tec:['doblejab','gancho','uppercut','slip'],drill:'Una ronda por técnica nueva, a ritmo controlado.',sombra:'Rondas libres con todo el repertorio aprendido.',extra:'Estiramiento completo, 6 min.'}]},

{id:3,nom:'Medio',lema:'Defensa con el cuerpo, ángulos y contragolpe',work:180,rest:60,rounds:4,ses:[
 {foco:'Bob & weave',tec:['bob'],drill:'15 recorridos en U por ronda, manos siempre arriba.',sombra:'Un bob & weave cada vez que "recibas" un gancho.',extra:'3×20 sentadillas y 3×30 s de plancha.'},
 {foco:'Pivote',tec:['pivote'],drill:'Jab y pivote de 45°, diez repeticiones por lado.',sombra:'Cambia de ángulo después de cada combinación.',extra:'4 min de cuerda.'},
 {foco:'Golpes al cuerpo',tec:['cuerpo'],drill:'Baja el nivel y lanza 12 ganchos al cuerpo por ronda.',sombra:'Alterna cabeza y cuerpo en cada serie.',extra:'3×15 flexiones y 40 abdominales.'},
 {foco:'Combinación 1-2-3',tec:['unodostres'],drill:'12 combinaciones por ronda; el gancho nace del regreso de la cadera.',sombra:'1-2-3 y salida lateral.',extra:'4×20 s de burpees o rodillas altas.'},
 {foco:'Contragolpe',tec:['contra'],drill:'Esquiva y cross en el mismo tiempo, 15 veces por ronda.',sombra:'Solo contragolpeas: nunca atacas primero.',extra:'4 min de cuerda.'},
 {foco:'Cambio de ritmo',tec:['unodostres','pivote'],drill:'Dentro de cada ronda: 30 s lento y técnico, 30 s explosivo.',sombra:'Alterna ritmos sin avisar.',extra:'3×30 s de plancha y estiramiento.'},
 {foco:'Sombra con rival',tec:['slip','bob','contra'],drill:'Imagina un rival concreto: altura, guardia y golpe favorito.',sombra:'Rondas completas reaccionando a sus ataques.',extra:'4 min de cuerda y movilidad de cuello y hombros.'},
 {foco:'Prueba de nivel 3',tec:['bob','pivote','cuerpo','contra'],drill:'Una ronda por cada técnica del nivel.',sombra:'Rondas libres con defensa y contra obligatorias.',extra:'Estiramiento completo, 6 min.'}]},

{id:4,nom:'Avanzado',lema:'Engaño, ángulos y ritmo de pelea',work:180,rest:45,rounds:5,ses:[
 {foco:'Fintas',tec:['finta'],drill:'Finta de jab y cross, 15 veces por ronda. Cambia el ritmo en cada serie.',sombra:'Nada entra sin finta previa.',extra:'4 min de cuerda y 3×20 sentadillas con salto.'},
 {foco:'Check hook',tec:['checkhook'],drill:'Gancho y pivote simultáneos, 10 por ronda hacia cada lado.',sombra:'Usa el check hook cada vez que el rival "avance".',extra:'4×30 s de rodillas altas.'},
 {foco:'Ángulos',tec:['pivote','checkhook'],drill:'Ataca, cambia de ángulo y vuelve a atacar desde la nueva posición.',sombra:'Prohibido golpear dos veces desde el mismo sitio.',extra:'5 min de cuerda.'},
 {foco:'Combinación larga',tec:['largo'],drill:'10 combinaciones 1-2-3-2 al cuerpo por ronda, sin perder la base.',sombra:'Combinaciones largas con salida obligatoria al terminar.',extra:'4×20 s de burpees.'},
 {foco:'Alta intensidad',tec:['largo','unodostres'],drill:'Intervalos dentro de la ronda: 15 s a máxima velocidad, 45 s técnico.',sombra:'Ritmo de pelea, respiración corta y constante.',extra:'3×40 s de plancha y 50 abdominales.'},
 {foco:'Defensa encadenada',tec:['slip','bob','contra','checkhook'],drill:'Tres defensas seguidas y una sola respuesta.',sombra:'Recibe, mueve la cabeza y responde. Siempre en ese orden.',extra:'5 min de cuerda.'},
 {foco:'Rondas con intención',tec:['finta','largo','pivote'],drill:'Cada ronda con un objetivo: presionar, contragolpear o dominar el centro.',sombra:'Simula una pelea completa con estrategia por ronda.',extra:'Movilidad y respiración diafragmática, 5 min.'},
 {foco:'Prueba final',tec:['finta','checkhook','largo','contra'],drill:'Una ronda por técnica avanzada, a velocidad real.',sombra:'Rondas libres. Graba una si puedes y revísala después.',extra:'Estiramiento completo, 8 min.'}]}
];

function bloques(niv,s){
  const r=RONDAS[niv.id];
  return [
   {nom:'Calentamiento',txt:CAL[niv.id],tipo:'libre',min:5,tec:['movilidad']},
   {nom:'Cuerda',txt:CUERDA[niv.id],tipo:'rondas',rondas:r.cuerda,tec:['cuerda']},
   {nom:'Técnica',txt:s.drill,tipo:'rondas',rondas:r.tec,tec:s.tec},
   {nom:'Sombra',txt:s.sombra,tipo:'rondas',rondas:r.sombra,tec:s.tec},
   {nom:'Sparring de sombra',txt:SPAR[niv.id],tipo:'rondas',rondas:r.spar,tec:['sparring'].concat(s.tec.slice(0,1))},
   {nom:'Acondicionamiento',txt:s.extra,tipo:'libre',min:6,tec:ejsDe(s.extra)},
   {nom:'Enfriamiento',txt:FRIO,tipo:'libre',min:4,tec:['estiramiento']}
  ];
}

DISC.boxeo={
  id:'boxeo', nom:'Boxeo', sub:'Puños, distancia y esquiva', emoji:'\u{1F94A}',
  tema:{wall:'#132FC9',ink:'#071047',fig:'#FF5B2E'},
  portada:'guardia', mov:MOV, niveles:NIVELES, bloques:bloques,
  intro:'Cuatro niveles que van de la guardia y los rectos hasta las fintas y el ritmo de pelea.'
};
})();
