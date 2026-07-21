import { neon } from 'https://cdn.jsdelivr.net/npm/@neondatabase/serverless@0.9.0/+esm';

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
        const connectionString = "postgresql://neondb_owner:npg_djCruebcPY94@ep-sparkling-math-avejx7o4-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
        const sql = neon(connectionString);

        const resultado = await sql(
          "SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1);",
          [email]
        );

        if (Array.isArray(resultado) && resultado.length > 0) {
          window.location.href = "dashboard.html";
        } else {
          alert("Acceso denegado: El correo no se encuentra registrado.");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con la base de datos.");
      }
    });
  }
});
