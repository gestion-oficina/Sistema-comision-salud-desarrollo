// ======================================
// SESSION MANAGER
// Comisión Permanente de Salud
// ======================================

// Tiempo máximo de inactividad
const TIEMPO_INACTIVIDAD = 1600000; // 1 minuto

let temporizadorSesion;

// Reinicia el contador
function reiniciarTemporizadorSesion(){

    clearTimeout(temporizadorSesion);

    temporizadorSesion = setTimeout(cerrarSesionPorInactividad, TIEMPO_INACTIVIDAD);

}

// Cerrar sesión
function cerrarSesionPorInactividad(){

    sessionStorage.removeItem("usuario_logueado");

    alert("Su sesión ha expirado por inactividad.");

    window.location.replace("login.html");

}

// Eventos que mantienen viva la sesión
[
    "mousemove",
    "mousedown",
    "click",
    "keypress",
    "scroll",
    "touchstart",
    "touchmove"
].forEach(evento=>{

    document.addEventListener(evento,reiniciarTemporizadorSesion,true);

});

// Si cambia de pestaña
document.addEventListener("visibilitychange",()=>{

    if(document.visibilityState==="visible"){
        reiniciarTemporizadorSesion();
    }

});

// Al cargar
window.addEventListener("load",()=>{

    reiniciarTemporizadorSesion();

});
