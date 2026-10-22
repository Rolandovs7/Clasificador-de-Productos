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
  botella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 2h3v3c0 1.5 2.5 2.3 2.5 5v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9c0-2.7 2.5-3.5 2.5-5V2z"/><path d="M8 14h8"/></svg>',
  paraguas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2.5 2.5 0 0 1-5 0"/><path d="M12 3V2"/></svg>',
  control: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7.5" y="2" width="9" height="20" rx="3"/><circle cx="12" cy="6.5" r="1.3"/><path d="M10 11.5h4M10 15h4M10 18.5h4"/></svg>',
  teclado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14.5h8"/></svg>',
  florero: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="translate(0 2.5)"><path d="M9 2h6"/><path d="M10 2v3.5c0 1-3 2.2-3 6.5a5 5 0 0 0 10 0c0-4.3-3-5.5-3-6.5V2"/></g></svg>',
  mochila: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5a3 3 0 0 1 6 0"/><rect x="5" y="5" width="14" height="16" rx="4"/><path d="M9 14h6v4H9z"/></svg>'
};

window.CATEGORIAS = [
  { clase: "bottle", nombre: "Botella", icono: "svg:botella", color: "#2DD4A0", activa: true },
  { clase: "person", nombre: "Persona", icono: "bx-user", color: "#D85A9E", activa: false },
  { clase: "bicycle", nombre: "Bicicleta", icono: "bx-cycling", color: "#79D85A", activa: false },
  { clase: "car", nombre: "Coche", icono: "bx-car", color: "#5F5AD8", activa: false },
  { clase: "motorcycle", nombre: "Moto", icono: "bx-package", color: "#D8845A", activa: false },
  { clase: "airplane", nombre: "Avión", icono: "bx-paper-plane", color: "#5AD8A9", activa: false },
  { clase: "bus", nombre: "Autobús", icono: "bx-bus", color: "#CE5AD8", activa: false },
  { clase: "train", nombre: "Tren", icono: "bx-train", color: "#BED85A", activa: false },
  { clase: "truck", nombre: "Camión", icono: "bx-package", color: "#5A99D8", activa: false },
  { clase: "boat", nombre: "Barco", icono: "bx-package", color: "#D85A74", activa: false },
  { clase: "traffic light", nombre: "Semáforo", icono: "bx-package", color: "#5AD864", activa: false },
  { clase: "fire hydrant", nombre: "Hidrante", icono: "bx-water", color: "#895AD8", activa: false },
  { clase: "stop sign", nombre: "Señal de stop", icono: "bx-stop", color: "#D8AE5A", activa: false },
  { clase: "parking meter", nombre: "Parquímetro", icono: "bx-package", color: "#5AD8D3", activa: false },
  { clase: "bench", nombre: "Banco", icono: "bx-package", color: "#D85AB8", activa: false },
  { clase: "bird", nombre: "Pájaro", icono: "bx-package", color: "#93D85A", activa: false },
  { clase: "cat", nombre: "Gato", icono: "bx-package", color: "#5A6FD8", activa: false },
  { clase: "dog", nombre: "Perro", icono: "bx-bone", color: "#D86A5A", activa: false },
  { clase: "horse", nombre: "Caballo", icono: "bx-package", color: "#5AD88F", activa: false },
  { clase: "sheep", nombre: "Oveja", icono: "bx-package", color: "#B45AD8", activa: false },
  { clase: "cow", nombre: "Vaca", icono: "bx-package", color: "#D8D85A", activa: false },
  { clase: "elephant", nombre: "Elefante", icono: "bx-package", color: "#5AB3D8", activa: false },
  { clase: "bear", nombre: "Oso", icono: "bx-package", color: "#D85A8E", activa: false },
  { clase: "zebra", nombre: "Cebra", icono: "bx-package", color: "#69D85A", activa: false },
  { clase: "giraffe", nombre: "Jirafa", icono: "bx-package", color: "#6F5AD8", activa: false },
  { clase: "backpack", nombre: "Mochila", icono: "svg:mochila", color: "#D8945A", activa: true },
  { clase: "umbrella", nombre: "Paraguas", icono: "svg:paraguas", color: "#5AD8B9", activa: true },
  { clase: "handbag", nombre: "Bolso", icono: "bx-shopping-bag", color: "#D85AD3", activa: false },
  { clase: "tie", nombre: "Corbata", icono: "bx-package", color: "#AED85A", activa: false },
  { clase: "suitcase", nombre: "Maleta", icono: "bx-briefcase-alt-2", color: "#5A89D8", activa: false },
  { clase: "frisbee", nombre: "Frisbi", icono: "bx-disc", color: "#D85A64", activa: false },
  { clase: "skis", nombre: "Esquís", icono: "bx-package", color: "#5AD875", activa: false },
  { clase: "snowboard", nombre: "Tabla de snow", icono: "bx-package", color: "#9A5AD8", activa: false },
  { clase: "sports ball", nombre: "Balón", icono: "bx-ball", color: "#D8BE5A", activa: false },
  { clase: "kite", nombre: "Cometa", icono: "bx-package", color: "#5ACDD8", activa: false },
  { clase: "baseball bat", nombre: "Bate", icono: "bx-package", color: "#D85AA8", activa: false },
  { clase: "baseball glove", nombre: "Guante de béisbol", icono: "bx-package", color: "#83D85A", activa: false },
  { clase: "skateboard", nombre: "Monopatín", icono: "bx-package", color: "#5A5ED8", activa: false },
  { clase: "surfboard", nombre: "Tabla de surf", icono: "bx-package", color: "#D87A5A", activa: false },
  { clase: "tennis racket", nombre: "Raqueta", icono: "bx-package", color: "#5AD89F", activa: false },
  { clase: "wine glass", nombre: "Vaso de vino", icono: "bx-wine", color: "#C45AD8", activa: true },
  { clase: "cup", nombre: "Taza", icono: "bx-coffee", color: "#C8D85A", activa: true },
  { clase: "fork", nombre: "Tenedor", icono: "bx-fork", color: "#5AA3D8", activa: false },
  { clase: "knife", nombre: "Cuchillo", icono: "bx-knife", color: "#D85A7E", activa: false },
  { clase: "spoon", nombre: "Cuchara", icono: "bx-package", color: "#5AD85B", activa: false },
  { clase: "bowl", nombre: "Tazón", icono: "bx-dish", color: "#7F5AD8", activa: true },
  { clase: "banana", nombre: "Plátano", icono: "bx-package", color: "#D8A45A", activa: false },
  { clase: "apple", nombre: "Manzana", icono: "bx-package", color: "#5AD8C9", activa: false },
  { clase: "sandwich", nombre: "Sándwich", icono: "bx-baguette", color: "#D85AC2", activa: false },
  { clase: "orange", nombre: "Naranja", icono: "bx-lemon", color: "#9DD85A", activa: false },
  { clase: "broccoli", nombre: "Brócoli", icono: "bx-leaf", color: "#5A79D8", activa: false },
  { clase: "carrot", nombre: "Zanahoria", icono: "bx-package", color: "#D8605A", activa: false },
  { clase: "hot dog", nombre: "Perrito caliente", icono: "bx-package", color: "#5AD885", activa: false },
  { clase: "pizza", nombre: "Pizza", icono: "bx-package", color: "#AA5AD8", activa: false },
  { clase: "donut", nombre: "Donut", icono: "bx-package", color: "#D8CF5A", activa: false },
  { clase: "cake", nombre: "Pastel", icono: "bx-cake", color: "#5ABDD8", activa: false },
  { clase: "chair", nombre: "Silla", icono: "bx-chair", color: "#D85A98", activa: false },
  { clase: "couch", nombre: "Sofá", icono: "bx-package", color: "#73D85A", activa: false },
  { clase: "potted plant", nombre: "Planta", icono: "bx-spa", color: "#655AD8", activa: false },
  { clase: "bed", nombre: "Cama", icono: "bx-bed", color: "#D88A5A", activa: false },
  { clase: "dining table", nombre: "Mesa", icono: "bx-table", color: "#5AD8AF", activa: false },
  { clase: "toilet", nombre: "Inodoro", icono: "bx-package", color: "#D45AD8", activa: false },
  { clase: "tv", nombre: "Televisor", icono: "bx-tv", color: "#B8D85A", activa: false },
  { clase: "laptop", nombre: "Portátil", icono: "bx-laptop", color: "#5A93D8", activa: true },
  { clase: "mouse", nombre: "Ratón", icono: "bx-mouse", color: "#D85A6E", activa: true },
  { clase: "remote", nombre: "Control remoto", icono: "svg:control", color: "#5AD86B", activa: true },
  { clase: "keyboard", nombre: "Teclado", icono: "svg:teclado", color: "#905AD8", activa: true },
  { clase: "cell phone", nombre: "Celular", icono: "bx-mobile", color: "#D8B45A", activa: true },
  { clase: "microwave", nombre: "Microondas", icono: "bx-package", color: "#5AD7D8", activa: false },
  { clase: "oven", nombre: "Horno", icono: "bx-package", color: "#D85AB2", activa: false },
  { clase: "toaster", nombre: "Tostadora", icono: "bx-package", color: "#8DD85A", activa: false },
  { clase: "sink", nombre: "Lavabo", icono: "bx-water", color: "#5A68D8", activa: false },
  { clase: "refrigerator", nombre: "Nevera", icono: "bx-fridge", color: "#D8705A", activa: false },
  { clase: "book", nombre: "Libro", icono: "bx-book", color: "#5AD895", activa: true },
  { clase: "clock", nombre: "Reloj", icono: "bx-time-five", color: "#BA5AD8", activa: true },
  { clase: "vase", nombre: "Florero", icono: "svg:florero", color: "#D2D85A", activa: true },
  { clase: "scissors", nombre: "Tijeras", icono: "bx-cut", color: "#5AADD8", activa: true },
  { clase: "teddy bear", nombre: "Oso de peluche", icono: "bx-package", color: "#D85A88", activa: false },
  { clase: "hair drier", nombre: "Secador", icono: "bx-package", color: "#63D85A", activa: false },
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
