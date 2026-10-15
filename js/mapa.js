/**
 * Mapa para buscar basureros y puntos de reciclaje cerca.
 * La foto del clasificador no sale del dispositivo.
 * La ubicación solo se envía a OpenStreetMap para pedir los puntos del mapa.
 */
(function () {
  "use strict";

  /* ----------------------------------------------------------------
     Servidores Overpass, en orden de preferencia. Edita esta lista
     para cambiar los espejos. El último que funcione se recuerda en
     sessionStorage y se prueba primero en la siguiente búsqueda.
     ---------------------------------------------------------------- */
  const SERVIDORES_OVERPASS = [
    "https://overpass-api.de/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter"
  ];
  const NOMINATIM = "https://nominatim.openstreetmap.org/search";

  const TIMEOUT_MS = 15000;
  /* Códigos que casi siempre son temporales del servidor. */
  const CODIGOS_REINTENTABLES = [406, 429, 500, 502, 503, 504];
  const CLAVE_SERVIDOR = "clasificador-mapa-servidor";
  const CLAVE_CACHE = "clasificador-mapa-cache-";
  const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
  const RADIO_M = 1200;

  const AVISO_VPN = " Si usas VPN o un bloqueador, prueba desactivándolo para este sitio.";
  const MENSAJE_SIN_INTERNET = "Parece que no hay internet." + AVISO_VPN;
  const MENSAJE_SIN_SERVICIO = "El servicio del mapa no responde ahora mismo. Inténtalo en unos minutos." + AVISO_VPN;

  const mapaNodo = document.getElementById("mapa");
  const estado = document.getElementById("mapa-estado");
  const lista = document.getElementById("mapa-lista");
  const botonAqui = document.getElementById("buscar-basureros");
  const botonLugar = document.getElementById("buscar-lugar");
  const campo = document.getElementById("lugar-basureros");
  const botonReintentar = document.getElementById("mapa-reintentar");
  if (!mapaNodo || !window.L) return;

  const mapa = L.map(mapaNodo).setView([0, 0], 2);
  window.__clasificadorMapa = mapa;
  setTimeout(() => mapa.invalidateSize(), 200);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapa);
  const marcas = L.layerGroup().addTo(mapa);

  /* Última búsqueda para poder reintentarla desde el aviso de error. */
  let ultimaBusqueda = null;

  function decir(texto, esError) {
    if (estado) {
      estado.textContent = texto;
      estado.classList.toggle("mapa-error", Boolean(esError));
    }
    if (botonReintentar) {
      botonReintentar.classList.toggle("hidden", !esError || !ultimaBusqueda);
    }
  }

  function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, (letra) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[letra]));
  }

  function tipoDe(elemento) {
    const amenity = (elemento.tags || {}).amenity;
    if (amenity === "recycling" || amenity === "waste_disposal") return amenity;
    return "waste_basket";
  }

  function titulo(elemento) {
    const etiquetas = elemento.tags || {};
    if (etiquetas.name) return etiquetas.name;
    if (tipoDe(elemento) === "recycling") return "Punto de reciclaje";
    if (tipoDe(elemento) === "waste_disposal") return "Contenedor de basura";
    return "Basurero";
  }

  function dibujoBasurero(tipo) {
    const cuerpo = tipo === "recycling" ? "#2f9bff" : tipo === "waste_disposal" ? "#1faa59" : "#ffd23f";
    const tapa = tipo === "recycling" ? "#9ad8ff" : tipo === "waste_disposal" ? "#b6f3cc" : "#fff3c4";
    const marca = tipo === "recycling"
      ? '<path fill="#fff" d="M16 16h8a4 4 0 0 1 0 8h-2v2h2a4 4 0 0 1 0 8h-6v-3h4a1 1 0 0 0 0-2h-3v-2h3a1 1 0 0 0 0-2h-6z"/>'
      : '<rect x="16" y="16" width="6" height="16" rx="1.5" fill="' + tapa + '"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44" aria-hidden="true">' +
      '<ellipse cx="18" cy="40" rx="10" ry="3" fill="rgba(0,0,0,.28)"/>' +
      '<path fill="' + tapa + '" d="M6 10h24l-2 4H8z"/>' +
      '<rect x="7" y="14" width="22" height="22" rx="3" fill="' + cuerpo + '"/>' +
      marca +
      "</svg>";
  }

  function pintar(puntos, centro) {
    marcas.clearLayers();
    if (lista) lista.replaceChildren();
    if (!puntos.length) {
      decir("No hay basureros marcados en OpenStreetMap cerca de ese punto.", true);
      mapa.setView(centro, 15);
      return;
    }
    const bounds = [];
    puntos.forEach((punto) => {
      const marca = L.marker([punto.lat, punto.lon], {
        icon: L.divIcon({
          className: "marca-basura",
          html: dibujoBasurero(punto.tipo),
          iconSize: [36, 44],
          iconAnchor: [18, 42],
          popupAnchor: [0, -36]
        })
      }).addTo(marcas);
      marca.bindPopup(escapar(punto.nombre));
      bounds.push([punto.lat, punto.lon]);
      if (!lista) return;
      const item = document.createElement("li");
      item.innerHTML = dibujoBasurero(punto.tipo).replace('width="36" height="44"', 'width="18" height="22"') + escapar(punto.nombre);
      lista.append(item);
    });
    mapa.fitBounds(bounds, { padding: [24, 24], maxZoom: 16 });
    decir(puntos.length === 1 ? "1 lugar cerca." : puntos.length + " lugares cerca.");
  }

  /* ----- Orden de servidores y utilidades de red -------------------- */

  function servidoresEnOrden() {
    let recordado = null;
    try {
      recordado = sessionStorage.getItem(CLAVE_SERVIDOR);
    } catch (error) {
      recordado = null;
    }
    if (recordado && SERVIDORES_OVERPASS.indexOf(recordado) !== -1) {
      return [recordado].concat(SERVIDORES_OVERPASS.filter((url) => url !== recordado));
    }
    return SERVIDORES_OVERPASS.slice();
  }

  function recordarServidor(url) {
    try {
      sessionStorage.setItem(CLAVE_SERVIDOR, url);
    } catch (error) {
      /* sessionStorage puede estar bloqueado; no es crítico. */
    }
  }

  function fetchConTimeout(url, opciones) {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);
    return fetch(url, Object.assign({}, opciones, { signal: controlador.signal }))
      .finally(() => clearTimeout(temporizador));
  }

  function firmaZona(lat, lon) {
    return Number(lat).toFixed(3) + "," + Number(lon).toFixed(3);
  }

  function leerCacheZona(firma) {
    try {
      const crudo = JSON.parse(localStorage.getItem(CLAVE_CACHE + firma) || "null");
      if (crudo && Array.isArray(crudo.puntos) && crudo.puntos.length &&
        Number.isFinite(crudo.guardado) && Date.now() - crudo.guardado < CACHE_TTL_MS) {
        return crudo.puntos;
      }
    } catch (error) {
      /* Datos viejos o corruptos: se ignoran. */
    }
    return null;
  }

  function guardarCacheZona(firma, puntos) {
    try {
      localStorage.setItem(CLAVE_CACHE + firma, JSON.stringify({ guardado: Date.now(), puntos }));
    } catch (error) {
      /* Sin espacio o bloqueado: no es crítico. */
    }
  }

  function construirConsulta(lat, lon) {
    return `[out:json][timeout:25];(node["amenity"="waste_basket"](around:${RADIO_M},${lat},${lon});node["amenity"="waste_disposal"](around:${RADIO_M},${lat},${lon});node["amenity"="recycling"](around:${RADIO_M},${lat},${lon});way["amenity"="recycling"](around:${RADIO_M},${lat},${lon}););out center;`;
  }

  function extraerPuntos(datos) {
    return (datos.elements || []).map((elemento) => {
      const latitud = elemento.lat || (elemento.center && elemento.center.lat);
      const longitud = elemento.lon || (elemento.center && elemento.center.lon);
      if (!Number.isFinite(latitud) || !Number.isFinite(longitud)) return null;
      return { lat: latitud, lon: longitud, nombre: titulo(elemento), tipo: tipoDe(elemento) };
    }).filter(Boolean);
  }

  function mensajeDeFallo() {
    return navigator.onLine === false ? MENSAJE_SIN_INTERNET : MENSAJE_SIN_SERVICIO;
  }

  /* Prueba cada servidor una sola vez y devuelve los datos del primero
     que responda. Lanza si todos fallan (una vuelta completa). */
  async function consultarOverpass(consulta) {
    const servidores = servidoresEnOrden();
    let ultimoError = null;
    for (let i = 0; i < servidores.length; i += 1) {
      const url = servidores[i];
      decir("Buscando… (intento " + (i + 1) + " de " + servidores.length + ")");
      try {
        const respuesta = await fetchConTimeout(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "data=" + encodeURIComponent(consulta)
        });
        if (!respuesta.ok) {
          const transitorio = CODIGOS_REINTENTABLES.indexOf(respuesta.status) !== -1 || respuesta.status >= 500;
          console.warn("Overpass " + url + " respondió " + respuesta.status + (transitorio ? " (temporal)" : ""));
          throw new Error("HTTP " + respuesta.status);
        }
        const datos = await respuesta.json();
        recordarServidor(url);
        return datos;
      } catch (error) {
        ultimoError = error;
        if (error && error.name === "AbortError") {
          console.warn("Overpass " + url + " tardó demasiado.");
          ultimoError = new Error("Tiempo de espera agotado");
        } else {
          console.warn("Overpass " + url + " falló:", error && error.message ? error.message : error);
        }
      }
    }
    throw ultimoError || new Error("Sin servidores disponibles");
  }

  async function buscarAlrededor(lat, lon) {
    ultimaBusqueda = { tipo: "aqui", lat, lon };
    const firma = firmaZona(lat, lon);
    try {
      const datos = await consultarOverpass(construirConsulta(lat, lon));
      const puntos = extraerPuntos(datos);
      guardarCacheZona(firma, puntos);
      pintar(puntos, [lat, lon]);
    } catch (error) {
      const guardados = leerCacheZona(firma);
      if (guardados) {
        pintar(guardados, [lat, lon]);
        decir("Mostrando resultados guardados, puede que no estén actualizados.");
      } else {
        decir(mensajeDeFallo(), true);
      }
    }
  }

  async function buscarLugar(texto) {
    ultimaBusqueda = { tipo: "lugar", texto };
    decir("Buscando ese lugar…");
    try {
      const respuesta = await fetchConTimeout(NOMINATIM + "?format=json&limit=1&q=" + encodeURIComponent(texto), {});
      if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
      const sitios = await respuesta.json();
      if (!Array.isArray(sitios) || !sitios.length) {
        decir("No encontré ese lugar.", true);
        return;
      }
      await buscarAlrededor(Number(sitios[0].lat), Number(sitios[0].lon));
    } catch (error) {
      console.warn("Nominatim falló:", error && error.message ? error.message : error);
      decir(mensajeDeFallo(), true);
    }
  }

  if (botonAqui) {
    botonAqui.addEventListener("click", () => {
      if (!navigator.geolocation) {
        decir("Este navegador no puede usar la ubicación. Escribe un lugar.", true);
        return;
      }
      decir("Pidiendo tu ubicación…");
      navigator.geolocation.getCurrentPosition(async (posicion) => {
        await buscarAlrededor(posicion.coords.latitude, posicion.coords.longitude);
      }, () => {
        decir("No hay permiso de ubicación. Escribe una dirección o una ciudad.", true);
      }, { enableHighAccuracy: true, timeout: 10000 });
    });
  }

  if (botonLugar && campo) {
    botonLugar.addEventListener("click", () => {
      const texto = campo.value.trim();
      if (!texto) {
        decir("Escribe una ciudad o una dirección.", true);
        return;
      }
      buscarLugar(texto);
    });
  }

  if (botonReintentar) {
    botonReintentar.addEventListener("click", () => {
      if (!ultimaBusqueda) return;
      if (ultimaBusqueda.tipo === "lugar") buscarLugar(ultimaBusqueda.texto);
      else buscarAlrededor(ultimaBusqueda.lat, ultimaBusqueda.lon);
    });
  }
})();
