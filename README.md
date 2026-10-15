# ReciclApp

Cuenta botellas, las guarda en un inventario de este navegador y busca basureros cerca. Las fotos no salen del dispositivo.

| | |
|---|---|
| Materia | Soporte a la toma de decisiones |
| Docente | Jesús Bautista |
| Alumno | Luishiño Pericena |

Es una página estática: no necesita servidor, base de datos ni Python. Todo corre en el navegador (`index.html`).

## Cómo ejecutarlo

Desde la raíz del proyecto:

```bash
python -m http.server 8765
```

Abre http://127.0.0.1:8765 . Si el puerto está ocupado, cambia el número. No abras `index.html` con doble clic: la cámara, la geolocalización y el service worker necesitan `http://` (o `https://`).

## Cómo se juega

**Jugar** es el tablero. **Mapa** son los basureros. El número de arriba es el total guardado.

1. **Cámara** cuenta sola. **Foto** acepta JPG, PNG, WEBP o GIF, hasta 12 MB. **Video** acepta MP4, WEBM o QuickTime.
2. Si hay dos botellas distintas, entran las dos. La misma no se vuelve a guardar mientras siga a la vista.
3. **Registrar ahora** fuerza el registro. **Nueva toma** permite contar otra vez las de esta toma.
4. En la imagen se dibujan las cajas. Por debajo del 60 % el resultado se marca como poco seguro.

Solo cuenta la clase `bottle` (COCO-SSD). Si están los pesos en `modelo_botellas/`, la red propia confirma el recorte.

El inventario queda en el navegador (`botellas-ia-inventario-v1`). Cada fila tiene fecha, cantidad editable, confianza y cajas, con etiqueta `Botella`. Se puede borrar una fila, vaciar todo, o descargar JSON y CSV.

En el mapa, **Mi ubicación** o una ciudad buscan en 1200 m. Amarillo es basurero, verde es contenedor y azul es punto de reciclaje. Esa búsqueda sí usa internet. Las fotos no se envían.

## Estructura del proyecto

```
index.html            Tablero, cámara, inventario y mapa
styles.css            Estilos de la página
js/mapa.js            Mapa (Leaflet + OpenStreetMap)
assets/               Íconos y SVG
modelo_botellas/      Red propia de TensorFlow.js (model.json + 2 .bin)
manifest.webmanifest  Datos de la PWA
service-worker.js     Caché para uso sin conexión
```

El dataset, los cuadernos y el script de entrenamiento se movieron fuera del proyecto, a `../clasificador-datos/`, por su tamaño.

## La red propia

Los archivos que carga la página son:

- `modelo_botellas/model.json`
- `modelo_botellas/group1-shard1of2.bin`
- `modelo_botellas/group1-shard2of2.bin`

La red es gris, 100×100: tres convoluciones (32, 64 y 128) con MaxPool, luego dos capas densas. La última es una sigmoide.

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
| Cuenta botellas pero no usa la red propia | Faltan los `.bin` en `modelo_botellas/` |
| El mapa no encuentra el lugar | Reintenta: hace falta internet |
| Se ve el diseño viejo | Borra la caché del sitio |
