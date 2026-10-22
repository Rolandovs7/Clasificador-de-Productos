/* ==========================================================================
   Catálogo de categorías de Clasificador.
   Son las 80 clases que distingue COCO-SSD. Cada una tiene:
     - clase:  etiqueta exacta que devuelve el detector (no se cambia).
     - nombre: nombre en español para la interfaz.
     - icono:  icono de boxicons 2.1.4 (todos verificados en esa versión) o un
               SVG propio con el prefijo "svg:" (ver ICONOS_SVG).
     - color:  color propio, visible en tema claro y oscuro.
     - activa: si viene marcada por defecto.

   Los iconos son una aproximación: boxicons no trae dibujos para todas las
   clases (por ejemplo animales o comidas), así que se elige el más cercano.
   El color y el nombre permiten distinguirlas.
   ========================================================================== */
/* Dibujos propios que Boxicons no tiene. Se referencian con "svg:<clave>".
   Heredan el color con currentColor y el tamaño del contenedor. */
window.ICONOS_SVG = {
  botella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 2h3v3c0 1.5 2.5 2.3 2.5 5v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9c0-2.7 2.5-3.5 2.5-5V2z"/><path d="M8 14h8"/></svg>'
};

window.CATEGORIAS = [
  { clase: "bottle", nombre: "Botella", icono: "svg:botella", color: "#2DD4A0", activa: true },
  { clase: "person", nombre: "Persona", icono: "bx-user", color: "#D85A9E", activa: false },
  { clase: "bicycle", nombre: "Bicicleta", icono: "bx-cycling", color: "#79D85A", activa: false },
  { clase: "car", nombre: "Coche", icono: "bx-car", color: "#5F5AD8", activa: false },
  { clase: "motorcycle", nombre: "Moto", icono: "bx-taxi", color: "#D8845A", activa: false },
  { clase: "airplane", nombre: "Avión", icono: "bx-paper-plane", color: "#5AD8A9", activa: false },
  { clase: "bus", nombre: "Autobús", icono: "bx-bus", color: "#CE5AD8", activa: false },
  { clase: "train", nombre: "Tren", icono: "bx-train", color: "#BED85A", activa: false },
  { clase: "truck", nombre: "Camión", icono: "bx-bus-school", color: "#5A99D8", activa: false },
  { clase: "boat", nombre: "Barco", icono: "bx-anchor", color: "#D85A74", activa: false },
  { clase: "traffic light", nombre: "Semáforo", icono: "bx-traffic-cone", color: "#5AD864", activa: false },
  { clase: "fire hydrant", nombre: "Hidrante", icono: "bx-water", color: "#895AD8", activa: false },
  { clase: "stop sign", nombre: "Señal de stop", icono: "bx-stop", color: "#D8AE5A", activa: false },
  { clase: "parking meter", nombre: "Parquímetro", icono: "bx-time", color: "#5AD8D3", activa: false },
  { clase: "bench", nombre: "Banco", icono: "bx-chair", color: "#D85AB8", activa: false },
  { clase: "bird", nombre: "Pájaro", icono: "bx-star", color: "#93D85A", activa: false },
  { clase: "cat", nombre: "Gato", icono: "bx-ghost", color: "#5A6FD8", activa: false },
  { clase: "dog", nombre: "Perro", icono: "bx-bone", color: "#D86A5A", activa: false },
  { clase: "horse", nombre: "Caballo", icono: "bx-run", color: "#5AD88F", activa: false },
  { clase: "sheep", nombre: "Oveja", icono: "bx-cloud", color: "#B45AD8", activa: false },
  { clase: "cow", nombre: "Vaca", icono: "bx-droplet", color: "#D8D85A", activa: false },
  { clase: "elephant", nombre: "Elefante", icono: "bx-cube", color: "#5AB3D8", activa: false },
  { clase: "bear", nombre: "Oso", icono: "bx-circle", color: "#D85A8E", activa: false },
  { clase: "zebra", nombre: "Cebra", icono: "bx-dots-horizontal-rounded", color: "#69D85A", activa: false },
  { clase: "giraffe", nombre: "Jirafa", icono: "bx-trending-up", color: "#6F5AD8", activa: false },
  { clase: "backpack", nombre: "Mochila", icono: "bx-briefcase", color: "#D8945A", activa: true },
  { clase: "umbrella", nombre: "Paraguas", icono: "bx-shield-alt", color: "#5AD8B9", activa: true },
  { clase: "handbag", nombre: "Bolso", icono: "bx-shopping-bag", color: "#D85AD3", activa: false },
  { clase: "tie", nombre: "Corbata", icono: "bx-closet", color: "#AED85A", activa: false },
  { clase: "suitcase", nombre: "Maleta", icono: "bx-briefcase-alt-2", color: "#5A89D8", activa: false },
  { clase: "frisbee", nombre: "Frisbi", icono: "bx-disc", color: "#D85A64", activa: false },
  { clase: "skis", nombre: "Esquís", icono: "bx-trip", color: "#5AD875", activa: false },
  { clase: "snowboard", nombre: "Tabla de snow", icono: "bx-cloud-snow", color: "#9A5AD8", activa: false },
  { clase: "sports ball", nombre: "Balón", icono: "bx-ball", color: "#D8BE5A", activa: false },
  { clase: "kite", nombre: "Cometa", icono: "bx-flag", color: "#5ACDD8", activa: false },
  { clase: "baseball bat", nombre: "Bate", icono: "bx-baseball", color: "#D85AA8", activa: false },
  { clase: "baseball glove", nombre: "Guante de béisbol", icono: "bx-cricket-ball", color: "#83D85A", activa: false },
  { clase: "skateboard", nombre: "Monopatín", icono: "bx-slider-alt", color: "#5A5ED8", activa: false },
  { clase: "surfboard", nombre: "Tabla de surf", icono: "bx-swim", color: "#D87A5A", activa: false },
  { clase: "tennis racket", nombre: "Raqueta", icono: "bx-tennis-ball", color: "#5AD89F", activa: false },
  { clase: "wine glass", nombre: "Vaso de vino", icono: "bx-wine", color: "#C45AD8", activa: true },
  { clase: "cup", nombre: "Taza", icono: "bx-coffee", color: "#C8D85A", activa: true },
  { clase: "fork", nombre: "Tenedor", icono: "bx-fork", color: "#5AA3D8", activa: false },
  { clase: "knife", nombre: "Cuchillo", icono: "bx-knife", color: "#D85A7E", activa: false },
  { clase: "spoon", nombre: "Cuchara", icono: "bx-restaurant", color: "#5AD85B", activa: false },
  { clase: "bowl", nombre: "Tazón", icono: "bx-dish", color: "#7F5AD8", activa: true },
  { clase: "banana", nombre: "Plátano", icono: "bx-lemon", color: "#D8A45A", activa: false },
  { clase: "apple", nombre: "Manzana", icono: "bx-circle", color: "#5AD8C9", activa: false },
  { clase: "sandwich", nombre: "Sándwich", icono: "bx-baguette", color: "#D85AC2", activa: false },
  { clase: "orange", nombre: "Naranja", icono: "bx-radio-circle-marked", color: "#9DD85A", activa: false },
  { clase: "broccoli", nombre: "Brócoli", icono: "bx-leaf", color: "#5A79D8", activa: false },
  { clase: "carrot", nombre: "Zanahoria", icono: "bx-food-tag", color: "#D8605A", activa: false },
  { clase: "hot dog", nombre: "Perrito caliente", icono: "bx-food-menu", color: "#5AD885", activa: false },
  { clase: "pizza", nombre: "Pizza", icono: "bx-pie-chart-alt-2", color: "#AA5AD8", activa: false },
  { clase: "donut", nombre: "Donut", icono: "bx-doughnut-chart", color: "#D8CF5A", activa: false },
  { clase: "cake", nombre: "Pastel", icono: "bx-cake", color: "#5ABDD8", activa: false },
  { clase: "chair", nombre: "Silla", icono: "bx-chair", color: "#D85A98", activa: false },
  { clase: "couch", nombre: "Sofá", icono: "bx-cabinet", color: "#73D85A", activa: false },
  { clase: "potted plant", nombre: "Planta", icono: "bx-spa", color: "#655AD8", activa: false },
  { clase: "bed", nombre: "Cama", icono: "bx-bed", color: "#D88A5A", activa: false },
  { clase: "dining table", nombre: "Mesa", icono: "bx-table", color: "#5AD8AF", activa: false },
  { clase: "toilet", nombre: "Inodoro", icono: "bx-shower", color: "#D45AD8", activa: false },
  { clase: "tv", nombre: "Televisor", icono: "bx-tv", color: "#B8D85A", activa: false },
  { clase: "laptop", nombre: "Portátil", icono: "bx-laptop", color: "#5A93D8", activa: true },
  { clase: "mouse", nombre: "Ratón", icono: "bx-mouse", color: "#D85A6E", activa: true },
  { clase: "remote", nombre: "Control remoto", icono: "bx-mouse-alt", color: "#5AD86B", activa: true },
  { clase: "keyboard", nombre: "Teclado", icono: "bx-grid", color: "#905AD8", activa: true },
  { clase: "cell phone", nombre: "Celular", icono: "bx-mobile", color: "#D8B45A", activa: true },
  { clase: "microwave", nombre: "Microondas", icono: "bx-radio", color: "#5AD7D8", activa: false },
  { clase: "oven", nombre: "Horno", icono: "bx-cube-alt", color: "#D85AB2", activa: false },
  { clase: "toaster", nombre: "Tostadora", icono: "bx-box", color: "#8DD85A", activa: false },
  { clase: "sink", nombre: "Lavabo", icono: "bx-droplet", color: "#5A68D8", activa: false },
  { clase: "refrigerator", nombre: "Nevera", icono: "bx-fridge", color: "#D8705A", activa: false },
  { clase: "book", nombre: "Libro", icono: "bx-book", color: "#5AD895", activa: true },
  { clase: "clock", nombre: "Reloj", icono: "bx-time-five", color: "#BA5AD8", activa: true },
  { clase: "vase", nombre: "Florero", icono: "bx-candles", color: "#D2D85A", activa: true },
  { clase: "scissors", nombre: "Tijeras", icono: "bx-cut", color: "#5AADD8", activa: true },
  { clase: "teddy bear", nombre: "Oso de peluche", icono: "bx-smile", color: "#D85A88", activa: false },
  { clase: "hair drier", nombre: "Secador", icono: "bx-wind", color: "#63D85A", activa: false },
  { clase: "toothbrush", nombre: "Cepillo de dientes", icono: "bx-brush", color: "#755AD8", activa: true }
];

/* Índice por etiqueta del detector y lista de activas por defecto. */
window.CATEGORIA_POR_CLASE = {};
window.CATEGORIAS.forEach((categoria) => {
  window.CATEGORIA_POR_CLASE[categoria.clase] = categoria;
});
window.CLASES_ACTIVAS_POR_DEFECTO = window.CATEGORIAS
  .filter((categoria) => categoria.activa)
  .map((categoria) => categoria.clase);

/* Devuelve el HTML del icono de una clase: un SVG propio si el catálogo usa
   "svg:<clave>", o el <i> de Boxicons en cualquier otro caso. */
window.iconoCategoria = function (clase) {
  const categoria = window.CATEGORIA_POR_CLASE[clase];
  const nombre = categoria && categoria.icono ? categoria.icono : "bx-box";
  if (nombre.indexOf("svg:") === 0) {
    const svg = window.ICONOS_SVG[nombre.slice(4)];
    if (svg) return svg.replace("<svg ", '<svg width="1em" height="1em" ');
  }
  return '<i class="bx ' + nombre + '" aria-hidden="true"></i>';
};
