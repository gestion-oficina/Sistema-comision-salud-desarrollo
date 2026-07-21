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
          throw new Error("Error de conexión");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          window.location.href = "dashboard.html";
        } else {
          alert("Acceso denegado: El correo no se encuentra registrado.");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con el sistema de control.");
      }
    });
  }
});
