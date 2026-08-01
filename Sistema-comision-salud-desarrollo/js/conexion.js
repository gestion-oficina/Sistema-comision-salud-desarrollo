async function consultarBaseDatos(query, params = []) {
  try {
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, params })
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    throw error;
  }
}
// --- SISTEMA DE CIERRE POR INACTIVIDAD (5 MINUTOS) ---
let temporizadorInactividad;
const tiempoLimiteInactividad = 5 * 60 * 1000; // 5 minutos

function reiniciarTemporizadorInactividad() {
    clearTimeout(temporizadorInactividad);
    temporizadorInactividad = setTimeout(ejecutarCierrePorInactividad, tiempoLimiteInactividad);
}

function ejecutarCierrePorInactividad() {
    sessionStorage.clear();
    window.location.replace("index.html");
}

// Monitorear actividad del usuario en cualquier página
['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(evento => {
    window.addEventListener(evento, reiniciarTemporizadorInactividad, true);
});

// Iniciar al cargar
reiniciarTemporizadorInactividad();
