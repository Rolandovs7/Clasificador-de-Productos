# Clasificador

Cuenta productos con la cámara, una foto o un video, los guarda en un inventario por categoría de este navegador y busca basureros cerca. Las imágenes no salen del dispositivo.

Es un sitio estático: no necesita servidor, base de datos ni Python. Todo corre en el navegador (`index.html`).

## Estructura de la interfaz

Tres secciones en un mismo panel:

- **Escáner**: visor de cámara, foto o video con las cajas dibujadas encima, un contador en vivo y contadores por categoría.
- **Inventario**: tarjetas de resumen, gráficos por categoría y la lista de registros, con búsqueda, filtro por categoría y exportación a JSON y CSV.
- **Mapa**: basureros y puntos de reciclaje cercanos (Leaflet + OpenStreetMap).

En móvil hay una barra inferior con las tres pestañas. En escritorio, una barra lateral con el mismo menú. El botón de ajustes (⚙) abre la lista de categorías y la sensibilidad.

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
python -m http.server 8765
```

Abre http://127.0.0.1:8765 . Si el puerto está ocupado, cambia el número. No abras `index.html` con doble clic: la cámara, la geolocalización y el service worker necesitan `http://` (o `https://`).

## Cómo se usa

1. **Cámara** cuenta sola. **Foto** acepta JPG, PNG, WEBP o GIF, hasta 12 MB. **Video** acepta MP4, WEBM o QuickTime.
2. Detecta varias categorías a la vez (hasta 80 clases de COCO-SSD, 16 activas por defecto). Cada categoría se cuenta por separado y la misma no se vuelve a guardar mientras siga a la vista.
3. **Registrar ahora** fuerza el registro. **Nueva toma** permite contar otra vez los productos de esta toma.
4. En la imagen se dibujan las cajas con el color e icono de cada categoría. Por debajo del 60 % el resultado se marca como poco seguro.
5. **Agregar producto** añade una categoría y una cantidad a mano, sin cámara.
6. En **Ajustes** eliges qué categorías detectar y la sensibilidad mínima (más baja detecta más pero puede equivocarse).

Solo se detecta la clase `bottle` con la red propia. Si están los pesos en `modelo_botellas/`, esa red confirma el recorte de botella.

El inventario v2 queda en el navegador (`clasificador-inventario-v2`): totales por categoría y una lista de registros con fecha, clase, categoría, cantidad editable, confianza y cajas. Se puede borrar una fila, vaciar todo, o descargar JSON y CSV. Si existe el inventario antiguo (`botellas-ia-inventario-v1`) se importa como Botella sin borrarlo.

En el mapa, **Mi ubicación** o una ciudad buscan en 1200 m. Amarillo es basurero, verde es contenedor y azul es punto de reciclaje. Esa búsqueda sí usa internet. Las fotos no se envían.

## Autoría y pie de página

El nombre y la materia del autor se editan en un solo sitio: la constante `PIE_INFO` al final de `index.html`.

```js
const PIE_INFO = { autor: "Rolando Velasco Soliz", materia: "INF432" };
```

## Estructura del proyecto

```
index.html            Escáner, inventario y mapa (todo el panel)
styles.css            Estilos (tema oscuro, variables en :root)
js/categorias.js      Catálogo de 80 categorías (nombre, icono, color, activa)
js/mapa.js            Mapa (Leaflet + OpenStreetMap)
assets/               Logotipo, ícono PWA e imágenes
modelo_botellas/      Red propia de TensorFlow.js (model.json + 2 .bin)
manifest.webmanifest  Datos de la PWA
service-worker.js     Caché para uso sin conexión
```

El dataset, los cuadernos y el script de entrenamiento se movieron fuera del proyecto, a `../clasificador-datos/`, por su tamaño.

## Las categorías

`js/categorias.js` define las 80 clases de COCO-SSD con su nombre en español, un icono de boxicons y un color propio. Expone `window.CATEGORIAS`, `window.CATEGORIA_POR_CLASE` y `window.CLASES_ACTIVAS_POR_DEFECTO`. Para cambiar nombres, iconos o qué categorías vienen activas, se edita ese archivo.

## La red propia

Los archivos que carga la página son:

- `modelo_botellas/model.json`
- `modelo_botellas/group1-shard1of2.bin`
- `modelo_botellas/group1-shard2of2.bin`

La red es gris, 100×100: tres convoluciones (32, 64 y 128) con MaxPool, luego dos capas densas. La última es una sigmoide. Solo se usa para confirmar la clase Botella.

### Volver a entrenar los pesos

El material está en `../clasificador-datos/objecto/`. Con el dataset ya descargado por kagglehub y TensorFlow instalado:

```bash
py -3 -u ../clasificador-datos/objecto/entrenamiento/exportar_bins.py
```

El script escribe los dos `.bin`. Esos nombres no se cambian: la página los busca así. Al terminar, copia los `.bin` generados a `modelo_botellas/`.

## Si algo falla

| Qué pasa | Qué hacer |
|---|---|
| La cámara no arranca | Autoriza el permiso, usa `http://` o `https://`, y cierra otras apps que usen la cámara |
| No detecta lo que quiero | Activa esa categoría en Ajustes y baja la sensibilidad |
| Cuenta botellas pero no usa la red propia | Faltan los `.bin` en `modelo_botellas/` |
| El mapa no encuentra el lugar | Reintenta: hace falta internet |
| Se ve el diseño viejo | Borra la caché del sitio (el service worker cambió de versión) |
