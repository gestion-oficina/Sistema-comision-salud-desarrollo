// ===============================
// AUDITORÍA GLOBAL (SUPABASE)
// ===============================

function getUsuarioActual() {
    return sessionStorage.getItem("usuario_logueado") || "Sistema";
}

async function registrarLog(accion, tabla) {
    try {
        const { error } = await client.from("logs_sistema").insert([{
            usuario: getUsuarioActual(),
            accion: accion,
            tabla: tabla
        }]);

        if (error) {
            console.error("Error auditoría:", error.message);
        }

    } catch (err) {
        console.error("Error auditoría:", err);
    }
}