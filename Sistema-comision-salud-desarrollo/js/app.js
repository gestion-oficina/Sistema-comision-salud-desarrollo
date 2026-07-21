document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const emailInput = document.querySelector("input[type='email']") || document.querySelector("input");
      const email = emailInput ? emailInput.value.trim() : "";
      
      if (!email) {
        alert("Por favor ingrese un correo válido.");
        return;
      }

      // Si estamos en entorno local, acceso directo para pruebas
      if (window.location.hostname.includes("local") || window.location.hostname.includes("stackblitz") || window.location.hostname.includes("webcontainer")) {
        console.log("Modo local detectado: Acceso concedido para pruebas.");
        window.location.href = "dashboard.html";
        return;
      }

      try {
        const response = await fetch("/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: "SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1);",
            params: [email]
          })
        });

        if (!response.ok) {
          throw new Error(`Respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          window.location.href = "dashboard.html";
        } else {
          alert("Acceso denegado: El correo no se encuentra registrado.");
        }

      } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("Error de conexión con el sistema de control.");
      }
    });
  }
});
