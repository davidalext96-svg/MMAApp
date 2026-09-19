# Dojo

Entrenador progresivo de artes marciales: **boxeo, muay thai, jiu-jitsu, judo y sambo**.
Sitio estático (HTML, CSS y JavaScript, sin dependencias ni servidor), listo para GitHub Pages.

## Qué incluye

- **Panel principal** con las cinco disciplinas, cada una con su propia interfaz y paleta.
- **112 sesiones** repartidas en 4 niveles por disciplina, con bloques encadenados y cronómetro de rondas con campana.
- **Animaciones propias** de cada técnica (SVG + SMIL), con claves de ejecución y el error más común.
- **Programa semanal** con una o varias disciplinas en rotación por días.
- **Perfil, respaldos, dashboard de progreso, logros y cronómetro libre**.
- **PWA**: se instala en el teléfono y funciona sin conexión una vez cargada.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `dojo`). Puede ser público o privado con Pages habilitado según tu plan.
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio (arrastrándolo en *Add file → Upload files*, o con git):

   ```bash
   git init
   git add .
   git commit -m "Dojo"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/dojo.git
   git push -u origin main
   ```

3. En el repositorio: **Settings → Pages**.
4. En *Build and deployment*, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
5. Espera un minuto. Tu app queda en:

   ```
   https://TU-USUARIO.github.io/dojo/
   ```

6. Ábrela en el móvil y usa *Añadir a pantalla de inicio* para instalarla.

El archivo `.nojekyll` evita que GitHub procese el sitio con Jekyll. No lo borres.

## Estructura

```
index.html                 pantalla única (shell) y navegación
manifest.webmanifest       datos de instalación como app
sw.js                      caché para uso sin conexión
css/styles.css             tema global y paleta por disciplina
js/engine.js               esqueleto animado, utilidades, almacenamiento, catálogo físico
js/data-boxeo.js           técnicas, niveles y sesiones de boxeo
js/data-muaythai.js        ídem muay thai
js/data-bjj.js             ídem jiu-jitsu
js/data-judo.js            ídem judo
js/data-sambo.js           ídem sambo
js/app.js                  vistas, cronómetro, progreso, perfil y respaldos
img/                       iconos
```

## Datos

Todo se guarda en `localStorage` del navegador, bajo la clave `dojo.v1`. No hay servidor ni cuentas:
si borras los datos del sitio o cambias de dispositivo, se pierde. Por eso existen los respaldos
(*Perfil → Respaldos*): descargan un `.json` que puedes volver a importar en cualquier navegador.

## Añadir o cambiar contenido

Cada disciplina vive en su propio archivo `js/data-*.js` con la misma forma:

```js
DISC.miDisciplina = {
  id, nom, sub, emoji, tema:{wall, ink, fig},
  portada,          // id del movimiento que se muestra en la portada
  mov: [...],       // movimientos con frames, claves y error común
  niveles: [...],   // 4 niveles con sus sesiones
  bloques(niv, s)   // qué bloques componen una sesión
};
```

Un movimiento se anima con posturas de 13 articulaciones sobre un lienzo de 240×300
(`h` cabeza, `n` cuello, `p` cadera, `sl/el/fl` hombro-codo-puño delanteros, `sr/er/fr` traseros,
`kl/tl` y `kr/tr` rodillas y pies). El campo opcional `fa` indica hacia dónde mira la cara, y un
tercer elemento en cada frame dibuja al compañero.

## Aviso

Las figuras son esquemáticas y sirven de recordatorio, no sustituyen a un entrenador.
Las técnicas de agarre, proyección y llaves se entrenan con supervisión y con un compañero:
aplica siempre despacio y suelta al primer toque.
